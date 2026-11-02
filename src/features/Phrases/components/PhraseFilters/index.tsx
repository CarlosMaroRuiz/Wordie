import { Chip } from '@common/Chip'
import type { PhraseFiltersProps } from './type'

export function PhraseFilters({ options, activeFilter, onFilter }: PhraseFiltersProps) {
  if (options.length <= 1) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar frases por contexto">
      {options.map((opt) => (
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
