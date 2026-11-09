import type { ReactNode } from 'react'

export interface GamePanelProps {
  children: ReactNode
  badge?: ReactNode
  hint?: string
  className?: string
}
