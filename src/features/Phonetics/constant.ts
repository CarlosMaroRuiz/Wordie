import type { PhoneticCategory } from './types'

export interface CategoryFilterOption {
  value: PhoneticCategory | 'all'
  label: string
}

export const CATEGORY_FILTERS: CategoryFilterOption[] = [
  { value: 'all', label: 'Todos los símbolos (44)' },
  { value: 'short-vowel', label: 'Vocales cortas (7)' },
  { value: 'long-vowel', label: 'Vocales largas (5)' },
  { value: 'diphthong', label: 'Diptongos (8)' },
  { value: 'consonant-voiceless', label: 'Consonantes sordas (9)' },
  { value: 'consonant-voiced', label: 'Consonantes sonoras (15)' },
]

export const CATEGORY_BADGE_STYLE: Record<PhoneticCategory, string> = {
  'short-vowel': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'long-vowel': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  diphthong: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'consonant-voiceless': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'consonant-voiced': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
}

export const CATEGORY_LABEL: Record<PhoneticCategory, string> = {
  'short-vowel': 'Vocal Corta',
  'long-vowel': 'Vocal Larga',
  diphthong: 'Diptongo',
  'consonant-voiceless': 'Consonante Sorda',
  'consonant-voiced': 'Consonante Sonora',
}
