import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TourStep } from '../type'

type UseTourStepOptions = {
  open: boolean
  onClose: () => void
}

export function useTourStep(steps: TourStep[], { open, onClose }: UseTourStepOptions) {
  const [index, setIndex] = useState(0)
  const [wasOpen, setWasOpen] = useState(open)
  const navigate = useNavigate()

  if (wasOpen !== open) {
    setWasOpen(open)
    if (open) setIndex(0)
  }

  const total = steps.length
  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === total - 1

  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(i, total - 1))),
    [total],
  )

  const next = useCallback(() => {
    if (index >= total - 1) onClose()
    else goTo(index + 1)
  }, [index, total, onClose, goTo])

  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  useEffect(() => {
    if (!open) return
    const route = steps[index]?.route
    if (route) navigate(route)
  }, [open, index, steps, navigate])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [open, next, prev, onClose])

  return { index, step, isFirst, isLast, goTo, next, prev }
}
