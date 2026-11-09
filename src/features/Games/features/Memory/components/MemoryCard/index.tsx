import { BrainIcon, CheckCircleIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import { cn } from '@common/utils/cn'
import type { MemoryCardProps } from './type'

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  const isVisible = card.isFlipped || card.isMatched

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isVisible}
      aria-label={isVisible ? card.text : 'Carta boca abajo'}
      className={cn(
        'relative flex h-20 sm:h-32 min-h-[4.75rem] sm:min-h-[7.5rem] w-full touch-manipulation flex-col items-center justify-between rounded-2xl sm:rounded-[24px] border-2 p-1.5 sm:p-3 text-center transition-all duration-200 select-none focus-visible:outline-3 focus-visible:outline-primary',
        isVisible
          ? card.isMatched
            ? 'border-success bg-success-light text-text-main shadow-soft cursor-default scale-[0.98]'
            : 'border-primary bg-surface shadow-brand cursor-default scale-[1.02]'
          : 'border-border-subtle bg-surface text-text-tertiary shadow-soft hover:border-primary/50 hover:bg-primary-light/30 hover:shadow-brand cursor-pointer active:scale-95',
      )}
    >
      {isVisible ? (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-black',
                card.lang === 'en'
                  ? 'bg-primary-light text-primary border border-primary/20'
                  : 'bg-warning-light text-warning border border-warning/20',
              )}
            >
              <span className="sm:hidden">{card.lang === 'en' ? 'EN' : 'ES'}</span>
              <span className="hidden sm:inline">{card.lang === 'en' ? 'Inglés' : 'Español'}</span>
            </span>

            {card.isMatched ? (
              <CheckCircleIcon size={16} weight="fill" className="text-success" />
            ) : card.lang === 'en' ? (
              <SpeakerHighIcon size={16} weight="bold" className="text-primary" />
            ) : null}
          </div>

          <div className="my-auto px-0.5">
            <p className="text-xs sm:text-lg font-black tracking-tight text-text-main leading-tight line-clamp-2">
              {card.text}
            </p>
            {card.phonetic ? (
              <p className="mt-0.5 hidden sm:block font-mono text-[11px] font-semibold text-text-tertiary">
                {card.phonetic}
              </p>
            ) : null}
          </div>

          <div className="h-1.5 sm:h-2 w-full" />
        </div>
      ) : (
        <div className="my-auto flex flex-col items-center justify-center text-primary/40">
          <BrainIcon size={24} weight="duotone" className="sm:hidden" />
          <BrainIcon size={32} weight="duotone" className="hidden sm:block" />
        </div>
      )}
    </button>
  )
}

export type { MemoryCardProps } from './type'
