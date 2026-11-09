import { NavLink } from 'react-router-dom'
import { NavExtraMenu } from '@common/components/NavExtraMenu'
import { EXTRA_NAV_ITEMS } from '@common/layouts/MainLayout/navItems'
import {
  BOTTOM_NAV_BASE,
  BOTTOM_NAV_ITEM_ACTIVE,
  BOTTOM_NAV_ITEM_IDLE,
  BOTTOM_NAV_WRAPPER,
} from './constant'
import type { BottomNavProps } from './type'

export function BottomNav({ items, extraItems = EXTRA_NAV_ITEMS }: BottomNavProps) {
  const hasExtras = Boolean(extraItems && extraItems.length > 0)

  return (
    <div className={BOTTOM_NAV_WRAPPER}>
      <nav aria-label="Navegación principal" data-tour="nav" className={BOTTOM_NAV_BASE}>
        <ul className="flex w-full items-center justify-between">
          {items.map(item => {
            const Icon = item.icon

            return (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  data-tour={item.tour}
                  aria-label={item.label}
                  className={({ isActive }) =>
                    isActive ? BOTTOM_NAV_ITEM_ACTIVE : BOTTOM_NAV_ITEM_IDLE
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={isActive ? 20 : 22} weight={isActive ? 'duotone' : 'regular'} />
                      {isActive ? <span>{item.label}</span> : null}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}

          {hasExtras ? (
            <li className="flex items-center justify-center">
              <NavExtraMenu items={extraItems} align="start" buttonLabel="Más opciones" />
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  )
}

export type { BottomNavProps } from './type'
