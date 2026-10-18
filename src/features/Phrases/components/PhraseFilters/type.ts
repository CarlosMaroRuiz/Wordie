import type { PhraseFilter } from '../../type'

export interface PhraseFiltersProps {
  activeFilter: PhraseFilter
  onFilter: (f: PhraseFilter) => void
}
