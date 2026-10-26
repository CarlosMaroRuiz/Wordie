import { CATEGORY_FILTERS } from '../../constant'
import {
  FILTER_PILL_ACTIVE,
  FILTER_PILL_BASE,
  FILTER_PILL_IDLE,
  SEPARABLE_OPTIONS,
} from './constant'
import type { PhrasalVerbFiltersProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PhrasalVerbFilters({
  activeCategory,
  onSelectCategory,
  separableFilter,
  onSeparableChange,
}: PhrasalVerbFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Filtro por categoría"
        className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORY_FILTERS.map(filter => {
          const isActive = activeCategory === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(filter.value)}
              className={cn(FILTER_PILL_BASE, isActive ? FILTER_PILL_ACTIVE : FILTER_PILL_IDLE)}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
          Separabilidad:
        </span>
        {SEPARABLE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSeparableChange(opt.value)}
            className={cn(
              FILTER_PILL_BASE,
              separableFilter === opt.value ? FILTER_PILL_ACTIVE : FILTER_PILL_IDLE,
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export type { PhrasalVerbFiltersProps } from './type'
