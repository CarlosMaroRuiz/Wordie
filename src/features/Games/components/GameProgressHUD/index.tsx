import { Link } from 'react-router-dom'
import { FlameIcon, LightningIcon, QuestionIcon, TimerIcon, XIcon } from '@phosphor-icons/react'
import { cn } from '@common/utils/cn'
import { PATHS } from '@core/routes/types/paths'
import { REFLEX_TONE_CLASS } from './constant'
import type { GameProgressHUDProps } from './type'

export function GameProgressHUD({
  currentRound,
  totalRounds,
  streak = 0,
  elapsedSeconds,
  speedMultiplier,
  reflexTone = 'analytical',
  isTimerStopped = false,
  onExit,
  onOpenHelp,
  className = '',
}: GameProgressHUDProps) {
  const progressPercent =
    totalRounds > 0 ? Math.min(100, Math.max(0, (currentRound / totalRounds) * 100)) : 0

  return (
    <header
      className={cn(
        'flex h-12 w-full shrink-0 touch-manipulation select-none items-center justify-between gap-2.5 px-3 py-1.5 sm:h-14 sm:gap-4 sm:px-4',
        className,
      )}
    >
      {/* 1. Botón salir / volver (izq) estilo píldora circular táctil */}
      {onExit ? (
        <button
          type="button"
          onClick={onExit}
          aria-label="Salir del juego"
          className="flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary shadow-soft transition-all hover:border-primary/40 hover:text-text-main active:scale-95 cursor-pointer"
        >
          <XIcon size={18} weight="bold" />
        </button>
      ) : (
        <Link
          to={PATHS.Games}
          aria-label="Volver a Minijuegos"
          className="flex size-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary shadow-soft transition-all hover:border-primary/40 hover:text-text-main active:scale-95"
        >
          <XIcon size={18} weight="bold" />
        </Link>
      )}

      {/* 2. Barra de progreso Duolingo (centro) */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={currentRound}
          aria-valuemin={1}
          aria-valuemax={totalRounds}
          className="relative h-2.5 w-full overflow-hidden rounded-full bg-border-subtle/80 sm:h-3"
        >
          <div
            className="h-full rounded-full bg-primary shadow-brand transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-[11px] font-black text-text-tertiary sm:text-xs">
          {currentRound}/{totalRounds}
        </span>
      </div>

      {/* 3. Indicadores de estatus ágil (der) en píldoras rounded-full */}
      <div className="flex shrink-0 items-center gap-1.5">
        {/* Cronómetro compacto con multiplicador */}
        {elapsedSeconds !== undefined ? (
          <div
            className={cn(
              'inline-flex min-h-8 items-center gap-1 rounded-full border px-2.5 text-xs font-black shadow-soft transition-colors',
              REFLEX_TONE_CLASS[reflexTone],
              isTimerStopped ? 'opacity-90' : '',
            )}
          >
            {reflexTone === 'native' ? (
              <LightningIcon size={14} weight="fill" className="text-success" />
            ) : (
              <TimerIcon size={14} weight="bold" />
            )}
            <span className="font-mono tabular-nums">{elapsedSeconds.toFixed(1)}s</span>
            {speedMultiplier !== undefined ? (
              <span className="rounded-full bg-surface/70 px-1.5 py-0.5 text-[10px] font-black uppercase">
                {typeof speedMultiplier === 'number' ? `x${speedMultiplier}` : speedMultiplier}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Fuego de racha (sólo si hay racha activa > 0) */}
        {streak > 0 ? (
          <div className="inline-flex min-h-8 items-center gap-1 rounded-full border border-warning/30 bg-warning-light px-2.5 text-xs font-black text-warning shadow-soft animate-in fade-in zoom-in-95">
            <FlameIcon size={15} weight="fill" />
            <span>{streak}</span>
          </div>
        ) : null}

        {/* Botón de ayuda */}
        {onOpenHelp ? (
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label="Ver ayuda del juego"
            className="flex size-9 touch-manipulation items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-surface-muted hover:text-text-main active:scale-95 cursor-pointer"
          >
            <QuestionIcon size={18} weight="bold" />
          </button>
        ) : null}
      </div>
    </header>
  )
}

export type { GameProgressHUDProps, ReflexTone } from './type'
