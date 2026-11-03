import type { ReactNode } from 'react'

export type ChipRowRole = 'tablist' | 'navigation'

export interface ChipRowProps {
  children: ReactNode
  as?: 'div' | 'nav'
  role?: ChipRowRole
  label?: string
  wrap?: boolean
  className?: string
}
