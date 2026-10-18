import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { CardBase } from '@common/CardBase'
import { cn } from '../../cn'
import { HOME_CARD, HOME_COPY, HOME_PILL, HOME_SKELETON } from '../../constant'
import { useCopyPhrase } from '../../hooks/useCopyPhrase'
import type { PhraseOfDayCardProps } from './type'

export function PhraseOfDayCard({ phrase, isLoading, hasError, className }: PhraseOfDayCardProps) {
  const { state, copy } = useCopyPhrase()
  const label =
    state === 'copied'
      ? HOME_COPY.phraseCopied
      : state === 'error'
        ? HOME_COPY.phraseError
        : HOME_COPY.phraseCopy
  const announcement = state === 'idle' ? '' : label

  return (
    <CardBase
      as="article"
      padding="md"
      aria-labelledby="home-phrase-title"
      aria-busy={isLoading}
      className={cn(HOME_CARD, className)}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 id="home-phrase-title" className="text-[17px] font-bold text-text-main">
          {HOME_COPY.phraseTitle}
        </h3>
        {phrase ? <span className={HOME_PILL}>{phrase.contextTag}</span> : null}
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-2" aria-hidden="true">
          <div className={cn(HOME_SKELETON, 'h-5 w-4/5')} />
          <div className={cn(HOME_SKELETON, 'h-4 w-3/5')} />
        </div>
      ) : hasError || !phrase ? (
        <p className="text-sm text-text-secondary">{HOME_COPY.phraseEmpty}</p>
      ) : (
        <blockquote className="flex flex-col gap-2">
          <p lang="en" className="text-[17px] font-bold leading-snug text-text-main">
            {phrase.en}
          </p>
          <p lang="es" className="text-sm leading-relaxed text-text-secondary">
            {phrase.es}
          </p>
        </blockquote>
      )}

      <div className="mt-auto flex items-center gap-3 pt-1">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={!phrase}
          onClick={() => {
            if (phrase) copy(phrase.en)
          }}
          className="w-[132px]"
        >
          {state === 'copied' ? (
            <CheckIcon size={16} weight="bold" aria-hidden="true" />
          ) : (
            <CopyIcon size={16} aria-hidden="true" />
          )}
          {label}
        </Button>
        <span className="sr-only" aria-live="polite">
          {announcement}
        </span>
      </div>
    </CardBase>
  )
}
