import { CompassIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { HOME_COPY, HOME_EYEBROW, HOME_HIGHLIGHT } from '../../constant'
import { WordStack } from '../WordStack'
import type { HomeHeroProps } from './type'

export function HomeHero({
  previewWords,
  isLoadingPreview,
  tourSeen,
  onStart,
  onStartTour,
}: HomeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden rounded-[28px] border-[1.5px] border-border-subtle bg-surface px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 size-[320px] bg-[radial-gradient(circle,var(--color-primary-light)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-10 size-[260px] bg-[radial-gradient(circle,rgba(255,138,61,0.16)_0%,transparent_70%)]"
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className={HOME_EYEBROW}>{HOME_COPY.eyebrow}</p>
          <h1
            id="home-hero-title"
      className="mt-3 text-balance text-[30px] font-extrabold leading-[1.06] tracking-tight text-text-main min-[360px]:text-[32px] sm:text-5xl lg:text-[54px]"
          >
            {HOME_COPY.titleStart}{' '}
            <span className={HOME_HIGHLIGHT}>{HOME_COPY.titleHighlight}</span>{' '}
            {HOME_COPY.titleEnd}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary sm:text-base">
            {HOME_COPY.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              arrow
              fullWidth={false}
              onClick={onStart}
              className="w-full sm:w-auto"
            >
              {HOME_COPY.start}
            </Button>
            <Button
              variant="secondary"
              size="md"
              fullWidth={false}
              onClick={onStartTour}
              aria-label={tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}
            >
              <CompassIcon size={18} weight="bold" aria-hidden="true" />
              {tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}
            </Button>
          </div>
          <p className="mt-3 text-[13px] text-text-secondary">{HOME_COPY.tourHint}</p>
        </div>

        <div className="lg:col-span-5">
          <WordStack words={previewWords} isLoading={isLoadingPreview} />
        </div>
      </div>
    </section>
  )
}
