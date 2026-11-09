import { Chip } from '@common/Chip'
import { ChipRow } from '@common/components/ChipRow'
import { CATEGORY_FILTERS } from '../../constant'
import { SEPARABLE_OPTIONS } from './constant'
import type { PhrasalVerbFiltersProps } from './type'

export function PhrasalVerbFilters({
  activeCategory,
  onSelectCategory,
  separableFilter,
  onSeparableChange,
}: PhrasalVerbFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <ChipRow role="tablist" label="Filtro por categoría">
        {CATEGORY_FILTERS.map(filter => {
          const isActive = activeCategory === filter.value
          return (
            <Chip
              key={filter.value}
              active={isActive}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(filter.value)}
            >
              {filter.label}
            </Chip>
          )
        })}
      </ChipRow>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-text-secondary">
          Separabilidad:
        </span>
        {SEPARABLE_OPTIONS.map(opt => (
          <Chip
            key={opt.value}
            active={separableFilter === opt.value}
            onClick={() => onSeparableChange(opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}

export type { PhrasalVerbFiltersProps } from './type'
