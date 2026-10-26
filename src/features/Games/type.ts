import type { ElementType } from 'react'

export interface GameRegistryItem {
  id: string
  to: string
  title: string
  description: string
  icon: ElementType
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  badge?: string
  active: boolean
  color: string
}
