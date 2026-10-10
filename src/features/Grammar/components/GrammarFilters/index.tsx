import { Chip } from '@common/Chip';
import { CATEGORIES } from './constants';
import type { GrammarFiltersProps } from './type';

export const GrammarFilters = ({ activeFilter, onFilterChange }: GrammarFiltersProps) => {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map(({ label, value }) => (
        <Chip
          key={value}
          active={activeFilter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Chip>
      ))}
    </nav>
  );
};
