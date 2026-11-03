import { AudioButton } from '@common/components/AudioButton'
import { Badge } from '@common/components/Badge'
import { CATEGORY_LABEL, CATEGORY_TONE } from '../../constant'
import { CARD_BASE } from './constant'
import type { PhoneticCardProps } from './type'

export function PhoneticCard({ item, onSelect }: PhoneticCardProps) {
  const primaryWord = item.examples[0]?.word ?? ''

  return (
    <article className={CARD_BASE}>
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <Badge tone={CATEGORY_TONE[item.category]} size="sm" uppercase>
            {CATEGORY_LABEL[item.category]}
          </Badge>

          <AudioButton
            text={primaryWord}
            appearance="soft"
            label={`Escuchar ejemplo ${primaryWord}`}
          />
        </div>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className="group/btn w-full text-left focus:outline-none"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold text-primary decoration-2 underline-offset-4 group-hover/btn:underline">
              {item.symbol}
            </span>
            <span className="truncate text-sm font-semibold text-text-main">
              {item.name}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
            {item.description}
          </p>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3 text-xs">
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
