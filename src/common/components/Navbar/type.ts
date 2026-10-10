import type { ComponentType } from 'react'

export type NavItem = {
  key: string
  to: string
  label: string
  icon: ComponentType<{ size?: number | string }>
  tour?: string
}
