import { BookIcon, CardsIcon, ChatCircleIcon, CoffeeIcon, HouseIcon } from '@phosphor-icons/react'
import { PATHS } from '@core/routes/types/paths'
import type { NavItem } from '@common/components/Navbar'

export const NAV_ITEMS: NavItem[] = [
  { key: 'Home', to: PATHS.Home, label: 'Inicio', icon: HouseIcon, tour: 'home' },
  { key: 'Grammar', to: PATHS.Grammar, label: 'Gramática', icon: BookIcon, tour: 'grammar' },
  { key: 'Vocabulary', to: PATHS.Vocabulary, label: 'Vocabulario', icon: CardsIcon, tour: 'vocabulary' },
  { key: 'Stories', to: PATHS.Stories, label: 'Lectura', icon: CoffeeIcon, tour: 'stories' },
  { key: 'Phrases', to: PATHS.Phrases, label: 'Frases', icon: ChatCircleIcon, tour: 'phrases' },
]
