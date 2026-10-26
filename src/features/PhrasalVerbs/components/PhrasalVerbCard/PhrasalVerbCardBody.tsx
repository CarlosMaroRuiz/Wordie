import { LightbulbFilamentIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { CardBodyProps } from './type'

export function PhrasalVerbCardBody({ item, onSpeak }: CardBodyProps) {
  const example = item.examples[0]

  return (
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-text-main">
              {item.verb}
            </span>
            <span className="text-2xl font-extrabold text-primary">{item.particle}</span>
          </div>
          <p className="mt-0.5 text-sm font-semibold text-text-secondary">
            {item.translation}
          </p>
        </div>

        <Button
          variant="icon"
          size="sm"
          onClick={() => onSpeak(item.phrasalVerb)}
          aria-label={`Escuchar ${item.phrasalVerb}`}
          className="shrink-0 text-text-secondary hover:text-primary"
        >
          <SpeakerHighIcon size={18} weight="bold" />
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-text-secondary line-clamp-3">
        {item.definition}
      </p>

      {example ? (
        <div className="flex flex-col gap-1 rounded-xl bg-surface-muted/50 p-3">
          <p className="text-xs font-semibold text-text-main italic">
            &ldquo;{example.en}&rdquo;
          </p>
          <p className="text-xs text-text-tertiary">{example.es}</p>
        </div>
      ) : null}

      {item.tip ? (
        <div className="flex items-start gap-1.5 text-xs text-text-tertiary">
          <LightbulbFilamentIcon
            size={14}
            weight="fill"
            className="mt-0.5 shrink-0 text-amber-500"
          />
          <span>{item.tip}</span>
        </div>
      ) : null}
    </div>
  )
}
