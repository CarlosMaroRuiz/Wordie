import type { PhraseFilter } from '../../type'

export interface PhraseFilterOption {
  label: string
  value: PhraseFilter
}

export interface PhraseFiltersProps {
  options: PhraseFilterOption[]
  activeFilter: PhraseFilter
  onFilter: (f: PhraseFilter) => void
}
