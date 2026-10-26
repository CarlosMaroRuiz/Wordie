import { BrainIcon, CheckCircleIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import type { MemoryCardProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  const isVisible = card.isFlipped || card.isMatched

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isVisible}
      aria-label={isVisible ? card.text : 'Carta boca abajo'}
      className={cn(
        'relative flex h-20 sm:h-32 min-h-[5rem] sm:min-h-[8rem] w-full flex-col items-center justify-between rounded-xl sm:rounded-2xl border p-1.5 sm:p-3 text-center transition-all duration-300 select-none focus-visible:outline-3 focus-visible:outline-primary',
        isVisible
          ? card.isMatched
            ? 'border-emerald-500/40 bg-emerald-500/10 text-text-main shadow-xs cursor-default'
            : 'border-primary bg-surface shadow-md cursor-default scale-[1.02]'
          : 'border-border-subtle bg-surface-muted/60 text-text-tertiary hover:border-primary/40 hover:bg-surface-elevated hover:shadow-xs cursor-pointer active:scale-95',
      )}
    >
      {isVisible ? (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                'rounded sm:rounded-md px-1 py-0.5 sm:px-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider',
                card.lang === 'en'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              )}
            >
              <span className="sm:hidden">{card.lang === 'en' ? 'EN' : 'ES'}</span>
              <span className="hidden sm:inline">{card.lang === 'en' ? 'Inglés' : 'Español'}</span>
            </span>

            {card.isMatched ? (
              <CheckCircleIcon size={14} weight="bold" className="text-emerald-500" />
            ) : card.lang === 'en' ? (
              <SpeakerHighIcon size={14} weight="bold" className="text-primary/70" />
            ) : null}
          </div>

          <div className="my-auto px-0.5">
            <p className="text-xs sm:text-lg font-bold sm:font-extrabold tracking-tight text-text-main leading-tight line-clamp-2">
              {card.text}
            </p>
            {card.phonetic ? (
              <p className="mt-0.5 hidden sm:block font-mono text-[11px] text-text-tertiary">
                {card.phonetic}
              </p>
            ) : null}
          </div>

          <div className="h-2 sm:h-3 w-full" />
        </div>
      ) : (
        <div className="my-auto flex flex-col items-center justify-center opacity-40">
          <BrainIcon size={22} weight="duotone" className="sm:hidden" />
          <BrainIcon size={28} weight="duotone" className="hidden sm:block" />
        </div>
      )}
    </button>
  )
}

export type { MemoryCardProps } from './type'
