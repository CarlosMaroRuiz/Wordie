import type { ReactNode } from 'react'

export interface GameResultMetric {
  label: string
  value: string | number
}

export interface GameResultModalProps {
  open: boolean
  title: string
  subtitle?: string
  metrics: GameResultMetric[]
  onPlayAgain: () => void
  playAgainLabel?: string
  note?: string
  secondaryAction?: ReactNode
}
