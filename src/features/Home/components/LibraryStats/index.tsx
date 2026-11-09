import { BooksIcon } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { cn } from '@common/utils/cn'
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
      <header className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
          <BooksIcon size={18} weight="duotone" />
        </div>
        <div>
          <h3 id="home-library-title" className="text-base font-black text-text-main">
            {HOME_COPY.libraryTitle}
          </h3>
          <p className="text-xs font-semibold text-text-secondary">{HOME_COPY.libraryHint}</p>
        </div>
      </header>

      <dl className="mt-1 grid grid-cols-2 gap-3">
        {LIBRARY_ITEMS.map(item => (
          <div
            key={item.key}
            className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface-muted/50 p-3 text-center"
          >
            <dt className={HOME_LABEL}>{item.label}</dt>
            <dd className={HOME_VALUE}>{counts && !hasError ? counts[item.key] : '—'}</dd>
          </div>
        ))}
      </dl>
    </CardBase>
  )
}
