import type { NavItem } from '@common/components/Navbar'
import type { NavExtraMenuItem } from '@common/components/NavExtraMenu'

export interface BottomNavProps {
  items: NavItem[]
  extraItems?: NavExtraMenuItem[]
}
