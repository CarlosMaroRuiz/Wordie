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

export const CATEGORY_BADGE_STYLE: Record<PhrasalVerbCategory, string> = {
  'problem-solving':
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  productivity:
    'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  communication:
    'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'daily-life':
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
}

export const CATEGORY_LABEL: Record<PhrasalVerbCategory, string> = {
  'problem-solving': 'Resolución',
  productivity: 'Productividad',
  communication: 'Comunicación',
  'daily-life': 'Vida diaria',
}
