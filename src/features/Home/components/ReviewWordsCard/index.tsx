import { SpeakerHighIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { CardBase } from '@common/CardBase'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { getVocabHint } from '@features/Vocabulary/store/progress'
import { cn } from '../../cn'
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
      <header>
        <h3 id="home-review-title" className="text-[17px] font-bold text-text-main">
          {HOME_COPY.reviewTitle}
        </h3>
        <p className="mt-0.5 text-sm text-text-secondary">{HOME_COPY.reviewHint}</p>
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-2" aria-hidden="true">
          {SKELETON_ROWS.map(row => (
            <div key={row} className={cn(HOME_SKELETON, 'h-11')} />
          ))}
        </div>
      ) : hasError ? (
        <p className="text-sm text-text-secondary">No se pudieron cargar las palabras.</p>
      ) : words.length === 0 ? (
        <p className="text-sm text-text-secondary">{HOME_COPY.reviewEmpty}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border-subtle">
          {words.map(word => (
            <li key={word.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-text-main">{word.word}</p>
                <p className="truncate font-mono text-[11px] text-text-secondary">
                  {getVocabHint(word)}
                </p>
              </div>
              <span className={HOME_PILL}>Caja {word.box}</span>
              {supported ? (
                <Button
                  variant="icon"
                  size="sm"
                  aria-label={`Escuchar ${word.word}`}
                  onClick={() => speak(word.word)}
                  className="size-11 sm:size-10"
                >
                  <SpeakerHighIcon size={18} aria-hidden="true" />
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  )
}
