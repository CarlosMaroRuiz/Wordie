import type { PhrasalVerbCategory } from '../../types'

export interface PhrasalVerbFiltersProps {
  activeCategory: PhrasalVerbCategory | 'all'
  onSelectCategory: (category: PhrasalVerbCategory | 'all') => void
  separableFilter: 'all' | 'separable' | 'inseparable'
  onSeparableChange: (filter: 'all' | 'separable' | 'inseparable') => void
}
