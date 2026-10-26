import { CheckCircleIcon, ClockIcon, FootprintsIcon } from '@phosphor-icons/react'
import type { MemoryStatsProps } from './type'

function formatSeconds(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function MemoryStats({
  moves,
  matches,
  totalPairs,
  seconds,
}: MemoryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border-subtle bg-surface p-2 sm:p-4 shadow-xs">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex size-7 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary">
          <CheckCircleIcon size={16} weight="bold" className="sm:hidden" />
          <CheckCircleIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
            Pares
          </span>
          <p className="text-xs sm:text-base font-extrabold text-text-main truncate">
            {matches}/{totalPairs}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 border-x border-border-subtle px-1.5 sm:px-3">
        <div className="flex size-7 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <FootprintsIcon size={16} weight="bold" className="sm:hidden" />
          <FootprintsIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
            Intentos
          </span>
          <p className="text-xs sm:text-base font-extrabold text-text-main truncate">{moves}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-0">
        <div className="flex size-7 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <ClockIcon size={16} weight="bold" className="sm:hidden" />
          <ClockIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
            Tiempo
          </span>
          <p className="text-xs sm:text-base font-extrabold font-mono text-text-main truncate">
            {formatSeconds(seconds)}
          </p>
        </div>
      </div>
    </div>
  )
}

export type { MemoryStatsProps } from './type'
