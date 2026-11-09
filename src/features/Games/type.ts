import type { ElementType } from 'react'

export type GameCategory = 'grammar' | 'vocabulary' | 'structure'

export interface GameRegistryItem {
  id: string
  to: string
  title: string
  description: string
  icon: ElementType
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  category?: GameCategory
  skill?: string
  format?: string
  badge?: string
  active: boolean
  color: string
}
