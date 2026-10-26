import type { ElementType } from 'react'
import {
  BookIcon,
  CardsIcon,
  ChatCircleIcon,
  CoffeeIcon,
  GameControllerIcon,
  HouseIcon,
  PuzzlePieceIcon,
  WaveformIcon,
} from '@phosphor-icons/react'
import { PATHS } from '@core/routes/types/paths'
import type { NavItem } from '@common/components/Navbar'

export interface ExtraNavItem {
  key: string
  to: string
  label: string
  description: string
  icon: ElementType
  badge?: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'Home', to: PATHS.Home, label: 'Inicio', icon: HouseIcon, tour: 'home' },
  { key: 'Grammar', to: PATHS.Grammar, label: 'Gramática', icon: BookIcon, tour: 'grammar' },
  { key: 'Vocabulary', to: PATHS.Vocabulary, label: 'Vocabulario', icon: CardsIcon, tour: 'vocabulary' },
  { key: 'Stories', to: PATHS.Stories, label: 'Lectura', icon: CoffeeIcon, tour: 'stories' },
  { key: 'Phrases', to: PATHS.Phrases, label: 'Frases', icon: ChatCircleIcon, tour: 'phrases' },
]

export const EXTRA_NAV_ITEMS: ExtraNavItem[] = [
  {
    key: 'Phonetics',
    to: PATHS.Phonetics,
    label: 'Fonética',
    description: '44 símbolos IPA, sonidos reales y guía de pronunciación técnica',
    icon: WaveformIcon,
    badge: 'IPA 44',
  },
  {
    key: 'PhrasalVerbs',
    to: PATHS.PhrasalVerbs,
    label: 'Phrasal Verbs',
    description: 'Verbos compuestos esenciales, separabilidad, ejemplos y audio',
    icon: PuzzlePieceIcon,
    badge: 'Nuevo',
  },
  {
    key: 'Games',
    to: PATHS.Games,
    label: 'Minijuegos',
    description: 'Aprende jugando: memorama de vocabulario, retos y memoria activa',
    icon: GameControllerIcon,
    badge: 'Juegos',
  },
]
