import { CATEGORY_FILTERS } from '../../constant'
import { FILTER_PILL_ACTIVE, FILTER_PILL_BASE, FILTER_PILL_IDLE } from './constant'
import type { PhoneticFiltersProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PhoneticFilters({
  activeCategory,
  onSelectCategory,
}: PhoneticFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtro de categorías fonéticas"
      className="flex items-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
  )
}

export type { PhoneticFiltersProps } from './type'
