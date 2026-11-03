import { BrainIcon, GameControllerIcon, PuzzlePieceIcon } from '@phosphor-icons/react'
import type { GameRegistryItem } from './type'

export const GAME_REGISTRY: GameRegistryItem[] = [
  {
    id: 'memory',
    to: '/games/memory',
    title: 'Memorama de Vocabulario',
    description:
      'Encuentra los pares de palabra ↔ traducción según el tema activo: desarrollo, viajes o trabajo.',
    icon: BrainIcon,
    difficulty: 'Fácil',
    active: true,
    color: 'bg-primary-light',
  },
  {
    id: 'sentence-builder',
    to: '/games/sentence-builder',
    title: 'Sentence Builder',
    description:
      'Ordena bloques de palabras para construir oraciones en inglés: desarrollo, viajes y trabajo.',
    icon: PuzzlePieceIcon,
    difficulty: 'Medio',
    badge: 'Nuevo',
    active: true,
    color: 'bg-info-light',
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
    color: 'bg-primary-light',
  },
]
