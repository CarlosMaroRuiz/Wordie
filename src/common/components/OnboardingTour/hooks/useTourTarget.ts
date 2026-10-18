import { useCallback, useEffect, useRef, useState } from 'react'
import { POPOVER_HEIGHT } from '../constant'
import type { TourPosition, TourRect } from '../type'

type TourTarget = {
  rect: TourRect | null
  position: TourPosition
}

const RETRY_DELAY = 100

const MAX_RETRIES = 20

function findTargets(target: string): Element[] {
  if (typeof document === 'undefined') return []
  return Array.from(document.querySelectorAll(`[data-tour="${target}"]`))
}

/**
 * Hay anclas duplicadas (nav superior en escritorio, nav inferior en móvil).
 * Se elige la primera que esté realmente visible, no la primera del DOM.
 */
function findTarget(target: string): Element | null {
  return (
    findTargets(target).find(element => {
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }) ?? null
  )
}

function measure(target: string): TourRect | null {
  const el = findTarget(target)
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (!r.width || !r.height) return null
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

function measureTarget(active: boolean, target?: string): TourTarget {
  if (!active || !target) return { rect: null, position: 'bottom' }

  const rect = measure(target)
  if (!rect) return { rect: null, position: 'bottom' }

  const spaceBelow = window.innerHeight - (rect.top + rect.height)
  return { rect, position: spaceBelow > POPOVER_HEIGHT ? 'bottom' : 'top' }
}

export function useTourTarget(active: boolean, target?: string, stepKey?: unknown): TourTarget {
  const [state, setState] = useState<TourTarget>({ rect: null, position: 'bottom' })
  const timer = useRef<number | undefined>(undefined)

  const key = `${active}|${target ?? ''}|${String(stepKey ?? '')}`
  const [lastKey, setLastKey] = useState(key)

  if (lastKey !== key) {
    setLastKey(key)
    setState(measureTarget(active, target))
  }

  const update = useCallback(() => {
    setState(measureTarget(active, target))
  }, [active, target])

  useEffect(() => {
    if (!active || !target) return

    let cancelled = false
    let attempts = 0

    const tick = () => {
      if (cancelled) return
      update()
      if (!findTarget(target) && attempts < MAX_RETRIES) {
        attempts += 1
        timer.current = window.setTimeout(tick, RETRY_DELAY)
      }
    }

    timer.current = window.setTimeout(tick, 0)

    return () => {
      cancelled = true
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, target, lastKey, update])

  useEffect(() => {
    if (!active) return
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [active, update])

  return state
}
