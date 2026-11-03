import { Chip } from '@common/Chip'
import { ChipRow } from '@common/components/ChipRow'
import type { VocabFiltersProps } from './type'

export function VocabFilters({ domains, activeFilter, onFilterChange }: VocabFiltersProps) {
  return (
    <ChipRow as="nav" label="Filtrar vocabulario por dominio">
      <Chip active={activeFilter === 'all'} onClick={() => onFilterChange('all')}>
        Todos
      </Chip>
      {domains.map(domain => (
        <Chip
          key={domain}
          active={activeFilter === domain}
          onClick={() => onFilterChange(domain)}
        >
          {domain.charAt(0).toUpperCase() + domain.slice(1)}
        </Chip>
      ))}
    </ChipRow>
  )
}
