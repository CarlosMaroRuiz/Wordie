import { CardBase } from '@common/CardBase'
import { cn } from '../../cn'
import { HOME_CARD, HOME_COPY, HOME_LABEL, HOME_VALUE, LIBRARY_ITEMS } from '../../constant'
import type { LibraryStatsProps } from './type'

export function LibraryStats({ counts, isLoading, hasError, className }: LibraryStatsProps) {
  return (
    <CardBase
      as="article"
      padding="md"
      aria-labelledby="home-library-title"
      aria-busy={isLoading}
      className={cn(HOME_CARD, className)}
    >
      <header>
        <h3 id="home-library-title" className="text-[17px] font-bold text-text-main">
          {HOME_COPY.libraryTitle}
        </h3>
        <p className="mt-0.5 text-sm text-text-secondary">{HOME_COPY.libraryHint}</p>
      </header>

      <dl className="mt-1 grid grid-cols-2 gap-4">
        {LIBRARY_ITEMS.map(item => (
          <div key={item.key}>
            <dt className={HOME_LABEL}>{item.label}</dt>
            <dd className={HOME_VALUE}>{counts && !hasError ? counts[item.key] : '—'}</dd>
          </div>
        ))}
      </dl>
    </CardBase>
  )
}
