import { MagnifyingGlassIcon, WaveformIcon } from '@phosphor-icons/react'
import { Badge } from '@common/components/Badge'
import { PHONETIC_HERO_SUBTITLE, PHONETIC_HERO_TITLE } from './constant'
import type { PhoneticHeroProps } from './type'

export function PhoneticHero({ searchQuery, onSearchChange, totalCount }: PhoneticHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border-subtle bg-surface p-6 shadow-sm sm:p-10">
      <div className="max-w-3xl">
        <Badge
          tone="primary"
          size="lg"
          className="mb-4 gap-2"
          icon={<WaveformIcon size={16} weight="bold" />}
        >
          GUÍA OFICIAL IPA · {totalCount} FONEMAS
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
          {PHONETIC_HERO_TITLE}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-text-secondary sm:text-lg">
          {PHONETIC_HERO_SUBTITLE}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por símbolo (/æ/, /θ/), palabra (cache, async) o sonido..."
            className="w-full rounded-2xl border border-border-subtle bg-surface-muted/60 py-3 pl-10 pr-4 text-sm text-text-main transition placeholder:text-text-tertiary focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  )
}

export type { PhoneticHeroProps } from './type'
