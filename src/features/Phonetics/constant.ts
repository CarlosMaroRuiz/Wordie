import type { BadgeTone } from '@common/components/Badge'
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

export const CATEGORY_TONE: Record<PhoneticCategory, BadgeTone> = {
  'short-vowel': 'success',
  'long-vowel': 'info',
  diphthong: 'primary',
  'consonant-voiceless': 'warning',
  'consonant-voiced': 'error',
}

export const CATEGORY_LABEL: Record<PhoneticCategory, string> = {
  'short-vowel': 'Vocal Corta',
  'long-vowel': 'Vocal Larga',
  diphthong: 'Diptongo',
  'consonant-voiceless': 'Consonante Sorda',
  'consonant-voiced': 'Consonante Sonora',
}
