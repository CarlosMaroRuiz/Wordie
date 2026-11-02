import { Trophy, Flame, SpeakerHigh, BookOpen } from '@phosphor-icons/react'
import type { SentenceBuilderStatsProps } from './type'

const METRIC_LABEL = 'text-[8px] font-bold uppercase tracking-wider text-text-tertiary sm:text-[10px]'
const METRIC_VALUE = 'text-xs font-extrabold leading-tight text-text-main sm:text-sm'

export function SentenceBuilderStats({
  currentRound,
  totalRounds,
  score,
  streak,
  isSpeaking,
  onSpeak,
}: SentenceBuilderStatsProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface p-2.5 shadow-xs sm:gap-3 sm:p-3">
      <div className="grid flex-1 grid-cols-3 items-center gap-2 sm:gap-3">
        <div className="flex min-w-0 items-center gap-1.5 rounded-xl px-1 py-1">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen size={16} weight="bold" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className={METRIC_LABEL}>Progreso</span>
            <span className={METRIC_VALUE}>
              {currentRound}/{totalRounds}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 rounded-xl px-1 py-1">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Trophy size={16} weight="bold" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className={METRIC_LABEL}>Puntos</span>
            <span className={METRIC_VALUE}>{score}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 rounded-xl px-1 py-1">
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
              streak > 0
                ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
                : 'bg-bg-page text-text-tertiary'
            }`}
          >
            <Flame size={16} weight={streak > 0 ? 'fill' : 'bold'} />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className={METRIC_LABEL}>Racha</span>
            <span
              className={`text-[13px] font-extrabold leading-tight sm:text-sm ${
                streak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-text-main'
              }`}
            >
              {streak}
              <span className="hidden lg:inline"> {streak === 1 ? 'acierto' : 'aciertos'}</span>
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onSpeak}
        title="Escuchar pronunciación correcta"
        aria-label="Escuchar pronunciación de la oración en inglés"
        className={`flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border transition-all ${
          isSpeaking
            ? 'border-primary bg-primary text-white shadow-xs animate-pulse'
            : 'border-border-subtle bg-bg-page text-text-secondary hover:border-primary/40 hover:bg-surface hover:text-primary'
        }`}
      >
        <SpeakerHigh size={18} weight="bold" />
      </button>
    </div>
  )
}
