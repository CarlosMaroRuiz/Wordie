import type { GrammarCategory } from '../../types';

export interface GrammarFiltersProps {
  activeFilter: GrammarCategory;
  onFilterChange: (category: GrammarCategory) => void;
}
