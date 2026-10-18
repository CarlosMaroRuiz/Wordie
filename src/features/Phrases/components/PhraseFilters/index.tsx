import { Chip } from '@common/Chip'
import { FILTER_OPTIONS } from './constant'
import type { PhraseFiltersProps } from './type'

export function PhraseFilters({ activeFilter, onFilter }: PhraseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((opt) => (
        <Chip
          key={opt.value}
          active={activeFilter === opt.value}
          onClick={() => onFilter(opt.value)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  )
}
