import type { PhoneticCategory } from '../../types'

export interface PhoneticFiltersProps {
  activeCategory: PhoneticCategory | 'all'
  onSelectCategory: (category: PhoneticCategory | 'all') => void
}
