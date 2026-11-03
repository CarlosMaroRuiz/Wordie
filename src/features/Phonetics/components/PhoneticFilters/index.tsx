import { Chip } from '@common/Chip'
import { ChipRow } from '@common/components/ChipRow'
import { CATEGORY_FILTERS } from '../../constant'
import type { PhoneticFiltersProps } from './type'

export function PhoneticFilters({ activeCategory, onSelectCategory }: PhoneticFiltersProps) {
  return (
    <ChipRow role="tablist" label="Filtro de categorías fonéticas">
      {CATEGORY_FILTERS.map(filter => {
        const isActive = activeCategory === filter.value
        return (
          <Chip
            key={filter.value}
            active={isActive}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(filter.value)}
          >
            {filter.label}
          </Chip>
        )
      })}
    </ChipRow>
  )
}

export type { PhoneticFiltersProps } from './type'
