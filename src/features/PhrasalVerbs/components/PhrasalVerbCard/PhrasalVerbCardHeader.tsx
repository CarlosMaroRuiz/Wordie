import { ArrowsLeftRightIcon } from '@phosphor-icons/react'
import { CATEGORY_BADGE_STYLE, CATEGORY_LABEL } from '../../constant'
import { LEVEL_STYLE } from './constant'
import type { CardHeaderProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PhrasalVerbCardHeader({ item }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-surface-muted/50 px-5 py-3">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
            CATEGORY_BADGE_STYLE[item.category],
          )}
        >
          {CATEGORY_LABEL[item.category]}
        </span>
        <span
          className={cn(
            'rounded-full border px-2 py-0.5 text-[10px] font-bold',
            LEVEL_STYLE[item.level] ?? LEVEL_STYLE['B1'],
          )}
        >
          {item.level}
        </span>
      </div>

      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold',
          item.separable
            ? 'border-primary/20 bg-primary/5 text-primary'
            : 'border-border-subtle bg-surface-muted text-text-tertiary',
        )}
      >
        <ArrowsLeftRightIcon size={10} weight="bold" />
        {item.separable ? 'Separable' : 'Inseparable'}
      </div>
    </div>
  )
}
