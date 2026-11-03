import { CheckCircleIcon, ClockIcon, FootprintsIcon } from '@phosphor-icons/react'
import { formatSeconds } from '@common/utils/formatTime'
import type { MemoryStatsProps } from './type'

export function MemoryStats({ moves, matches, totalPairs, seconds }: MemoryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-border-subtle bg-surface p-2 shadow-xs sm:gap-3 sm:rounded-2xl sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
          <CheckCircleIcon size={16} weight="bold" className="sm:hidden" />
          <CheckCircleIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-text-tertiary sm:text-[10px]">
            Pares
          </span>
          <p className="truncate text-xs font-extrabold text-text-main sm:text-base">
            {matches}/{totalPairs}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-x border-border-subtle px-1.5 sm:gap-3 sm:px-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-warning-light text-warning sm:size-10 sm:rounded-xl">
          <FootprintsIcon size={16} weight="bold" className="sm:hidden" />
          <FootprintsIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-text-tertiary sm:text-[10px]">
            Intentos
          </span>
          <p className="truncate text-xs font-extrabold text-text-main sm:text-base">{moves}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pl-1 sm:gap-3 sm:pl-0">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-info-light text-info sm:size-10 sm:rounded-xl">
          <ClockIcon size={16} weight="bold" className="sm:hidden" />
          <ClockIcon size={20} weight="bold" className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-text-tertiary sm:text-[10px]">
            Tiempo
          </span>
          <p className="truncate font-mono text-xs font-extrabold text-text-main sm:text-base">
            {formatSeconds(seconds)}
          </p>
        </div>
      </div>
    </div>
  )
}

export type { MemoryStatsProps } from './type'
