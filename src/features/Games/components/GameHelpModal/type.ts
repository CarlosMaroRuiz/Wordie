import type { ReactNode } from 'react'

export interface GameHelpSection {
  title: string
  body: string
  icon?: ReactNode
}

export interface GameHelpModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle: string
  sections: GameHelpSection[]
  closeLabel?: string
}
