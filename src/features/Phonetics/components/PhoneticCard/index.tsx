import { SpeakerHighIcon } from '@phosphor-icons/react'
import { CATEGORY_BADGE_STYLE, CATEGORY_LABEL } from '../../constant'
import { CARD_BASE, SOUND_BUTTON } from './constant'
import type { PhoneticCardProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PhoneticCard({ item, onSelect, onSpeak }: PhoneticCardProps) {
  const primaryWord = item.examples[0]?.word ?? ''

  return (
    <article className={CARD_BASE}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border',
              CATEGORY_BADGE_STYLE[item.category],
            )}
          >
            {CATEGORY_LABEL[item.category]}
          </span>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onSpeak(primaryWord)
            }}
            aria-label={`Escuchar ejemplo ${primaryWord}`}
            title={`Escuchar ${primaryWord}`}
            className={SOUND_BUTTON}
          >
            <SpeakerHighIcon size={18} weight="bold" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className="text-left w-full group/btn focus:outline-none"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-primary group-hover/btn:underline decoration-2 underline-offset-4">
              {item.symbol}
            </span>
            <span className="text-sm font-semibold text-text-main truncate">
              {item.name}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
            {item.description}
          </p>
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
        <span className="text-text-tertiary">Ejemplos:</span>
        <div className="flex items-center gap-1.5 font-mono font-medium text-text-main">
          {item.examples.slice(0, 2).map(ex => (
            <span key={ex.word} className="rounded-md bg-surface-muted px-1.5 py-0.5">
              {ex.word}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export type { PhoneticCardProps } from './type'
