import { MagnifyingGlassIcon, WaveformIcon } from '@phosphor-icons/react'
import { PHONETIC_HERO_SUBTITLE, PHONETIC_HERO_TITLE } from './constant'
import type { PhoneticHeroProps } from './type'

export function PhoneticHero({
  searchQuery,
  onSearchChange,
  totalCount,
}: PhoneticHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border-subtle bg-surface p-6 sm:p-10 shadow-sm">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-4">
          <WaveformIcon size={16} weight="bold" />
          <span>GUÍA OFICIAL IPA · {totalCount} FONEMAS</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
          {PHONETIC_HERO_TITLE}
        </h1>

        <p className="mt-3 text-base text-text-secondary leading-relaxed sm:text-lg">
          {PHONETIC_HERO_SUBTITLE}
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por símbolo (/æ/, /θ/), palabra (cache, async) o sonido..."
            className="w-full rounded-2xl border border-border-subtle bg-surface-muted/60 py-3 pl-10 pr-4 text-sm text-text-main placeholder:text-text-tertiary transition focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  )
}

export type { PhoneticHeroProps } from './type'
