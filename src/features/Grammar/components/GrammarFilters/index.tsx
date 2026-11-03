import { Chip } from '@common/Chip'
import { ChipRow } from '@common/components/ChipRow'
import { CATEGORIES } from './constants'
import type { GrammarFiltersProps } from './type'

export function GrammarFilters({ activeFilter, onFilterChange }: GrammarFiltersProps) {
  return (
    <ChipRow as="nav" label="Filtrar lecciones por categoría">
      {CATEGORIES.map(({ label, value }) => (
        <Chip
          key={value}
          active={activeFilter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Chip>
      ))}
    </ChipRow>
  )
}
