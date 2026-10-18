import { NavLink } from 'react-router-dom'
import {
  BOTTOM_NAV_BASE,
  BOTTOM_NAV_INDICATOR,
  BOTTOM_NAV_INDICATOR_ACTIVE,
  BOTTOM_NAV_ITEM,
  BOTTOM_NAV_ITEM_ACTIVE,
  BOTTOM_NAV_ITEM_IDLE,
  BOTTOM_NAV_LABEL,
} from './constant'
import type { BottomNavProps } from './type'

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav aria-label="Navegación principal" data-tour="nav" className={BOTTOM_NAV_BASE}>
      <ul className="grid grid-cols-5">
        {items.map(item => {
          const Icon = item.icon

          return (
            <li key={item.key}>
              <NavLink
                to={item.to}
                data-tour={item.tour}
                className={({ isActive }) =>
                  [BOTTOM_NAV_ITEM, isActive ? BOTTOM_NAV_ITEM_ACTIVE : BOTTOM_NAV_ITEM_IDLE].join(
                    ' ',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={isActive ? BOTTOM_NAV_INDICATOR_ACTIVE : BOTTOM_NAV_INDICATOR}
                    />
                    <Icon size={22} />
                    <span className={BOTTOM_NAV_LABEL}>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
