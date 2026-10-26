import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PlusIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import {
  NAV_EXTRA_BADGE,
  NAV_EXTRA_BUTTON,
  NAV_EXTRA_BUTTON_ACTIVE,
  NAV_EXTRA_ICON_WRAPPER,
  NAV_EXTRA_ITEM,
  NAV_EXTRA_PANEL,
} from './constant'
import type { NavExtraMenuProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function NavExtraMenu({
  items,
  className,
  align = 'end',
  buttonLabel = 'Más módulos',
}: NavExtraMenuProps) {
  return (
    <Menu as="div" className={cn('relative inline-block text-left', className)}>
      {({ open }) => (
        <>
          <MenuButton
            type="button"
            aria-label={buttonLabel}
            title={buttonLabel}
            className={cn(NAV_EXTRA_BUTTON, open && NAV_EXTRA_BUTTON_ACTIVE)}
          >
            <PlusIcon
              size={18}
              weight="bold"
              className={cn(
                'transition-transform duration-200 ease-out',
                open && 'rotate-45 text-primary',
              )}
            />
          </MenuButton>

          <MenuItems
            anchor={{ to: align === 'end' ? 'bottom end' : 'bottom start', gap: 8 }}
            className={NAV_EXTRA_PANEL}
          >
            <div className="border-b border-border-subtle px-3 py-2 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                Módulos complementarios
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {items.map(item => {
                const Icon = item.icon
                return (
                  <MenuItem key={item.key}>
                    <Link to={item.to} className={NAV_EXTRA_ITEM}>
                      <div className={NAV_EXTRA_ICON_WRAPPER}>
                        <Icon size={20} weight="duotone" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text-main group-hover:text-primary">
                            {item.label}
                          </span>
                          {item.badge ? (
                            <span className={NAV_EXTRA_BADGE}>{item.badge}</span>
                          ) : null}
                        </div>
                        {item.description ? (
                          <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-text-secondary">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </MenuItem>
                )
              })}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  )
}

export type { NavExtraMenuItem, NavExtraMenuProps } from './type'
