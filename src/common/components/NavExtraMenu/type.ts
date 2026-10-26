import type { ElementType } from 'react'

export interface NavExtraMenuItem {
  key: string
  to: string
  label: string
  description?: string
  icon: ElementType
  badge?: string
}

export interface NavExtraMenuProps {
  items: NavExtraMenuItem[]
  className?: string
  align?: 'end' | 'start'
  buttonLabel?: string
}
