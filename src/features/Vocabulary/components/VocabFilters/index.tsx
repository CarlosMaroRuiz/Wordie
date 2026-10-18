import { Chip } from '@common/Chip';
import type { VocabFiltersProps } from './type';

export function VocabFilters({ domains, activeFilter, onFilterChange }: VocabFiltersProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Chip
        active={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
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
    </nav>
  );
}
