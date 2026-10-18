export interface VocabFiltersProps {
  domains: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}
