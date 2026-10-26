import { ArrowRightIcon, CompassIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { HOME_COPY } from '../../constant'
import type { HomeCounts } from '../../type'

interface HeroStatsBarProps {
  counts?: HomeCounts | null
  tourSeen: boolean
  onStart: () => void
  onStartTour: () => void
}

export function HeroStatsBar({
  counts,
  tourSeen,
  onStart,
  onStartTour,
}: HeroStatsBarProps) {
  const statsDetail = counts
    ? `${counts.vocabulary} Palabras · ${counts.grammar} Temas · ${counts.stories} Historias`
    : HOME_COPY.statsSuffix

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:gap-6">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
          {HOME_COPY.statsPrefix}
        </p>
        <p className="text-sm font-bold text-text-main sm:text-base">
          {statsDetail}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2.5 min-[440px]:w-auto min-[440px]:flex-row">
        <Button
          size="md"
          fullWidth={false}
          onClick={onStart}
          className="w-full sm:w-auto"
        >
          {HOME_COPY.start}
          <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          onClick={onStartTour}
          aria-label={tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}
          className="w-full sm:w-auto"
        >
          <CompassIcon size={18} weight="bold" aria-hidden="true" />
          {tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}
        </Button>
      </div>
    </div>
  )
}
