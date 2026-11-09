import { ArrowRightIcon, CompassIcon } from '@phosphor-icons/react'
import { HOME_COPY } from '../../constant'
import type { HomeCounts } from '../../type'

interface HeroStatsBarProps {
  counts?: HomeCounts | null
  tourSeen: boolean
  onStartTour: () => void
}

/**
 * Banner de Tour interactivo intuitivo y accesible:
 * Guía clara al usuario sobre el propósito del tour y cómo explorar la plataforma.
 * Texto 100% limpio sin emojis.
 */
export function HeroStatsBar({ tourSeen, onStartTour }: HeroStatsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 rounded-2xl sm:rounded-3xl border border-primary/20 bg-surface/90 backdrop-blur-xs p-3.5 sm:px-5 sm:py-3.5 shadow-soft">
      {/* Icono guía y mensaje contextual */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary-light text-primary shadow-soft">
          <CompassIcon size={24} weight="duotone" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black tracking-tight text-text-main">
            {tourSeen ? 'Tour Guiado de la Plataforma' : '¿Primera vez aquí? Explora Wordie'}
          </p>
          <p className="text-[11px] sm:text-xs text-text-secondary leading-snug line-clamp-1 sm:line-clamp-none">
            {tourSeen
              ? 'Repasa el método Leitner, lecturas contextuales y dinámicas de juego.'
              : 'Descubre en 30 segundos cómo acelerar tu fluidez diaria de forma práctica.'}
          </p>
        </div>
      </div>

      {/* Botón táctil en píldora interactiva con texto limpio y flecha funcional */}
      <button
        type="button"
        onClick={onStartTour}
        className="group flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-black text-on-primary shadow-brand transition-all hover:bg-primary-hover active:scale-95 cursor-pointer"
        aria-label={tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}
      >
        <span>{tourSeen ? HOME_COPY.tourRepeat : HOME_COPY.tourStart}</span>
        <ArrowRightIcon
          size={14}
          weight="bold"
          className="transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
