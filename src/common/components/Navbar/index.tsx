import { Link } from 'react-router-dom'
import { Chip } from '@common/Chip'
import { Dropdown } from '@common/components/Dropdown'
import { NavExtraMenu } from '@common/components/NavExtraMenu'
import { EXTRA_NAV_ITEMS } from '@common/layouts/MainLayout/navItems'
import { SlidersIcon } from '@phosphor-icons/react'
import { useScrolled } from '@common/hooks/useScrolled'
import { TOPICS } from '@common/layouts/MainLayout/topics'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import {
  NAVBAR_ACTIONS,
  NAVBAR_BRAND,
  NAVBAR_HEADER,
  NAVBAR_HEADER_SCROLLED,
  NAVBAR_INNER,
  NAVBAR_NAV,
  NAVBAR_NAV_ROW,
  NAVBAR_TOPIC,
  NAVBAR_TOP_ROW,
  NAV_ICON_SIZE,
} from './constant'
import type { NavbarProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Navbar({
  brand = 'Wordie',
  brandTo = '/',
  items,
  extraItems = EXTRA_NAV_ITEMS,
  actions,
  showTopicSelector = true,
  hideNavOnMobile = false,
  className,
}: NavbarProps) {
  const scrolled = useScrolled()
  const topic = useTopicStore(s => s.topic)
  const setTopic = useTopicStore(s => s.setTopic)

  return (
    <header className={cn(NAVBAR_HEADER, scrolled && NAVBAR_HEADER_SCROLLED, className)}>
      <div className={NAVBAR_INNER}>
        <div className={NAVBAR_TOP_ROW}>
          <Link to={brandTo} className={NAVBAR_BRAND}>
            {brand}
          </Link>

          {actions ? <div className={NAVBAR_ACTIONS}>{actions}</div> : null}
        </div>

        <div className={NAVBAR_NAV_ROW}>
          <nav
            className={cn(NAVBAR_NAV, hideNavOnMobile && 'max-lg:hidden')}
            aria-label="Navegación principal"
            data-tour="nav"
          >
            {items.map(item => {
              const Icon = item.icon
              return (
                <Chip
                  key={item.key}
                  to={item.to}
                  icon={<Icon size={NAV_ICON_SIZE} />}
                  data-tour={item.tour}
                >
                  {item.label}
                </Chip>
              )
            })}

            {extraItems && extraItems.length > 0 ? (
              <NavExtraMenu items={extraItems} />
            ) : null}
          </nav>

          {showTopicSelector ? (
            <Dropdown
              size="sm"
              label="Tema de contenido"
              labelHidden
              ariaLabel="Seleccionar tema de contenido"
              dataTour="topic"
              icon={<SlidersIcon size={15} weight="bold" />}
              options={TOPICS}
              value={topic}
              onChange={setTopic}
              className={NAVBAR_TOPIC}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}

export type { NavItem, NavbarProps } from './type'
