import { CheckIcon, CopyIcon, QuotesIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { CardBase } from '@common/CardBase'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { cn } from '@common/utils/cn'
import { HOME_CARD, HOME_COPY, HOME_PILL, HOME_SKELETON } from '../../constant'
import { useCopyPhrase } from '../../hooks/useCopyPhrase'
import type { PhraseOfDayCardProps } from './type'

export function PhraseOfDayCard({ phrase, isLoading, hasError, className }: PhraseOfDayCardProps) {
  const { state, copy } = useCopyPhrase()
  const { supported: speechSupported, speak } = useSpeechSynthesis()

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
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
            <QuotesIcon size={18} weight="fill" />
          </div>
          <h3 id="home-phrase-title" className="text-base font-black text-text-main">
            {HOME_COPY.phraseTitle}
          </h3>
        </div>

        {phrase ? <span className={HOME_PILL}>{phrase.contextTag}</span> : null}
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-2" aria-hidden="true">
          <div className={cn(HOME_SKELETON, 'h-6 w-4/5')} />
          <div className={cn(HOME_SKELETON, 'h-4 w-3/5')} />
        </div>
      ) : hasError || !phrase ? (
        <p className="text-sm text-text-secondary">{HOME_COPY.phraseEmpty}</p>
      ) : (
        <blockquote className="flex flex-col gap-2 rounded-2xl bg-surface-muted/60 p-4 border border-border-subtle/50">
          <p lang="en" className="text-lg font-black leading-snug text-text-main sm:text-xl">
            “{phrase.en}”
          </p>
          <p lang="es" className="text-sm font-semibold leading-relaxed text-text-secondary">
            {phrase.es}
          </p>
        </blockquote>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {speechSupported && phrase ? (
          <Button
            variant="secondary"
            size="md"
            fullWidth={false}
            onClick={() => speak(phrase.en)}
            aria-label={`Escuchar pronunciación: ${phrase.en}`}
            className="rounded-full"
          >
            <SpeakerHighIcon size={18} weight="bold" aria-hidden="true" />
            <span>Escuchar</span>
          </Button>
        ) : null}

        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={!phrase}
          onClick={() => {
            if (phrase) copy(phrase.en)
          }}
          className="rounded-full min-w-[120px]"
        >
          {state === 'copied' ? (
            <CheckIcon size={16} weight="bold" aria-hidden="true" />
          ) : (
            <CopyIcon size={16} aria-hidden="true" />
          )}
          <span>{label}</span>
        </Button>

        <span className="sr-only" aria-live="polite">
          {announcement}
        </span>
      </div>
    </CardBase>
  )
}
