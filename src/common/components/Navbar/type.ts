import type { ComponentType, ReactNode } from 'react'
import type { NavExtraMenuItem } from '@common/components/NavExtraMenu'

export type NavItem = {
  key: string
  to: string
  label: string
  icon: ComponentType<{ size?: number | string }>
  tour?: string
}

export type NavbarProps = {
  brand?: string
  brandTo?: string
  items: NavItem[]
  extraItems?: NavExtraMenuItem[]
  actions?: ReactNode
  showTopicSelector?: boolean
  hideNavOnMobile?: boolean
  className?: string
}
