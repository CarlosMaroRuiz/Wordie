import { NavLink } from 'react-router-dom'
import { NavExtraMenu } from '@common/components/NavExtraMenu'
import { EXTRA_NAV_ITEMS } from '@common/layouts/MainLayout/navItems'
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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function BottomNav({ items, extraItems = EXTRA_NAV_ITEMS }: BottomNavProps) {
  const hasExtras = Boolean(extraItems && extraItems.length > 0)

  return (
    <nav aria-label="Navegación principal" data-tour="nav" className={BOTTOM_NAV_BASE}>
      <ul className={cn('grid', hasExtras ? 'grid-cols-6' : 'grid-cols-5')}>
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

        {hasExtras ? (
          <li className="flex items-center justify-center">
            <NavExtraMenu items={extraItems} align="start" buttonLabel="Más opciones" />
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
