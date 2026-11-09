import { ArrowsClockwiseIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { CardBase } from '@common/CardBase'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { getVocabHint } from '@features/Vocabulary/store/progress'
import { cn } from '@common/utils/cn'
import { HOME_CARD, HOME_COPY, HOME_PILL, HOME_SKELETON } from '../../constant'
import type { ReviewWordsCardProps } from './type'

const SKELETON_ROWS = [0, 1, 2] as const

export function ReviewWordsCard({ words, isLoading, hasError, className }: ReviewWordsCardProps) {
  const { supported, speak } = useSpeechSynthesis()

  return (
    <CardBase
      as="article"
      padding="md"
      aria-labelledby="home-review-title"
      aria-busy={isLoading}
      className={cn(HOME_CARD, className)}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ArrowsClockwiseIcon size={18} weight="bold" />
          </div>
          <div>
            <h3 id="home-review-title" className="text-base font-black text-text-main">
              {HOME_COPY.reviewTitle}
            </h3>
            <p className="text-xs font-semibold text-text-secondary">{HOME_COPY.reviewHint}</p>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-2.5" aria-hidden="true">
          {SKELETON_ROWS.map(row => (
            <div key={row} className={cn(HOME_SKELETON, 'h-12')} />
          ))}
        </div>
      ) : hasError ? (
        <p className="text-sm text-text-secondary">No se pudieron cargar las palabras.</p>
      ) : words.length === 0 ? (
        <p className="text-sm text-text-secondary">{HOME_COPY.reviewEmpty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {words.map(word => (
            <li
              key={word.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border-subtle/70 bg-surface-muted/40 p-3 transition-colors hover:bg-surface-muted"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-text-main">{word.word}</p>
                <p className="truncate font-mono text-[11px] text-text-secondary">
                  {getVocabHint(word)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={HOME_PILL}>Caja {word.box}</span>
                {supported ? (
                  <Button
                    variant="icon"
                    size="sm"
                    aria-label={`Escuchar ${word.word}`}
                    onClick={() => speak(word.word)}
                    className="size-10 rounded-full"
                  >
                    <SpeakerHighIcon size={17} weight="bold" aria-hidden="true" />
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  )
}
