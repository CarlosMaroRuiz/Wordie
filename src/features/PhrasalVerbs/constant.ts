import type { BadgeTone } from '@common/components/Badge'
import type { PhrasalVerbCategory } from './types'

export interface CategoryFilterOption {
  value: PhrasalVerbCategory | 'all'
  label: string
}

export const CATEGORY_FILTERS: CategoryFilterOption[] = [
  { value: 'all', label: 'Todos los verbos' },
  { value: 'problem-solving', label: 'Resolución de problemas' },
  { value: 'productivity', label: 'Productividad y Trabajo' },
  { value: 'communication', label: 'Comunicación y Reuniones' },
  { value: 'daily-life', label: 'Vida diaria' },
]

export const CATEGORY_TONE: Record<PhrasalVerbCategory, BadgeTone> = {
  'problem-solving': 'success',
  productivity: 'info',
  communication: 'primary',
  'daily-life': 'warning',
}

export const CATEGORY_LABEL: Record<PhrasalVerbCategory, string> = {
  'problem-solving': 'Resolución',
  productivity: 'Productividad',
  communication: 'Comunicación',
  'daily-life': 'Vida diaria',
}
