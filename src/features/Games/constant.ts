import { BrainIcon, GameControllerIcon } from '@phosphor-icons/react'
import type { GameRegistryItem } from './type'

export const GAME_REGISTRY: GameRegistryItem[] = [
  {
    id: 'memory',
    to: '/games/memory',
    title: 'Memorama de Vocabulario',
    description:
      'Encuentra los pares de palabra ↔ traducción. Pon a prueba tu memoria y vocabulario técnico.',
    icon: BrainIcon,
    difficulty: 'Fácil',
    badge: 'Nuevo',
    active: true,
    color: 'from-primary/20 to-primary/5',
  },
  {
    id: 'hangman',
    to: '/games/hangman',
    title: 'Ahorcado Técnico',
    description:
      'Adivina palabras clave de ingeniería en inglés letra a letra antes de agotar tus intentos.',
    icon: GameControllerIcon,
    difficulty: 'Medio',
    badge: 'Próximamente',
    active: false,
    color: 'from-purple-500/20 to-purple-500/5',
  },
]
