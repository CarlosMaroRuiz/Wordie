import { HOME_COPY } from '../../constant'
import { HeroStatsBar } from './HeroStatsBar'
import type { HomeHeroProps } from './type'

export function HomeHero({
  tourSeen,
  counts,
  onStart,
  onStartTour,
}: HomeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden rounded-[32px] border-[1.5px] border-border-subtle bg-surface px-5 py-8 sm:px-10 sm:py-12 text-center shadow-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 size-[340px] bg-[radial-gradient(circle,var(--color-primary-light)_0%,transparent_70%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-[320px] bg-[radial-gradient(circle,rgba(255,138,61,0.18)_0%,transparent_70%)] opacity-80"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <h1
          id="home-hero-title"
          className="text-balance text-3xl font-extrabold leading-[1.14] tracking-tight text-text-main sm:text-5xl lg:text-6xl"
        >
          {HOME_COPY.titleLine1} {HOME_COPY.titleLine2} {HOME_COPY.titleLine3}
        </h1>

        <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg">
          {HOME_COPY.subtitle}
        </p>

        <HeroStatsBar
          counts={counts}
          tourSeen={tourSeen}
          onStart={onStart}
          onStartTour={onStartTour}
        />
      </div>
    </section>
  )
}
