import { useCallback, useEffect, useRef, useState } from 'react'
import { COPY_RESET_MS } from '../constant'

export type CopyState = 'idle' | 'copied' | 'error'

export interface UseCopyPhraseResult {
  state: CopyState
  copy: (text: string) => void
}

export function useCopyPhrase(resetMs = COPY_RESET_MS): UseCopyPhraseResult {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  const copy = useCallback(
    (text: string) => {
      if (timer.current !== null) window.clearTimeout(timer.current)

      const finish = (next: CopyState) => {
        setState(next)
        timer.current = window.setTimeout(() => setState('idle'), resetMs)
      }

      if (!text) {
        finish('error')
        return
      }

      try {
        void navigator.clipboard
          .writeText(text)
          .then(() => finish('copied'))
          .catch(() => finish('error'))
      } catch {
        finish('error')
      }
    },
    [resetMs],
  )

  return { state, copy }
}
