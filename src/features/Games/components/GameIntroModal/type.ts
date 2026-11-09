import type { ReactNode } from 'react'

export interface GameIntroModalProps {
  open: boolean
  title: string
  description: string
  icon: ReactNode
  onAccept: () => void
  steps?: string[]
  note?: string
}
