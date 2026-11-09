import { ArrowRightIcon, CheckIcon, SparkleIcon, FireIcon, StudentIcon } from '@phosphor-icons/react'
import { HeroMascot } from './HeroMascot'
import { HeroStatsBar } from './HeroStatsBar'
import type { HomeHeroProps } from './type'

export function HomeHero({
  tourSeen,
  counts,
  topicLabel = 'General',
  onStart,
  onStartTour,
}: HomeHeroProps) {
  return (
    <section aria-labelledby="home-hero-title" className="flex flex-col gap-4">
      {/* 1. Cabecera Humanizada estilo Mobile EdTech */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          {/* Avatar circular con badge decorativo */}
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary-light text-primary shadow-soft">
            <StudentIcon size={24} weight="duotone" aria-hidden="true" />
            <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-on-primary shadow-icon">
              <CheckIcon size={10} weight="bold" aria-hidden="true" />
            </span>
          </div>

          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
              <span>¡Hola de nuevo!</span>
            </p>
            <h2 className="truncate text-base font-black tracking-tight text-text-main sm:text-lg">
              Estudiante de Inglés
            </h2>
          </div>
        </div>

        {/* Indicador de Racha y Tema Activo */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 shadow-soft"
            title="Racha de estudio activa"
          >
            <FireIcon size={16} weight="fill" className="text-amber-500" aria-hidden="true" />
            <span>Racha Diaria</span>
          </div>

          <div className="hidden min-[480px]:flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-xs font-bold text-text-secondary shadow-soft">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            <span className="truncate max-w-[120px]">{topicLabel}</span>
          </div>
        </div>
      </div>

      {/* 2. Banner Interactivo de Misión Diaria */}
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-primary/20 bg-gradient-to-br from-primary-light/90 via-surface to-primary-light/40 p-4 sm:p-7 shadow-soft">
        {/* Decoraciones de fondo sutiles */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-primary/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Ilustración amigable del personaje */}
          <div className="flex shrink-0 items-center justify-center">
            <HeroMascot className="size-28 sm:size-36 transition-transform hover:scale-105 duration-300" />
          </div>

          {/* Tarjeta flotante integrada de Misión con botón circular */}
          <div className="w-full flex-1 rounded-2xl sm:rounded-3xl border border-border-subtle/80 bg-surface/95 p-4 sm:p-5 shadow-soft backdrop-blur-xs">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-primary">
                  <SparkleIcon size={14} weight="fill" aria-hidden="true" />
                  <span>Tu Misión de Hoy</span>
                </div>

                <h1
                  id="home-hero-title"
                  className="mt-1 text-lg font-black tracking-tight text-text-main sm:text-2xl"
                >
                  Acelera tu Fluidez Práctica
                </h1>

                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-text-secondary line-clamp-2">
                  Entrena vocabulario con el sistema Leitner o pon a prueba tus reflejos en los
                  minijuegos.
                </p>
              </div>

              {/* Botón circular táctil distintivo estilo referencia */}
              <button
                type="button"
                onClick={onStart}
                aria-label="Empezar misión de hoy"
                className="group flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-brand transition-all hover:scale-105 hover:bg-primary-hover active:scale-95 cursor-pointer"
              >
                <ArrowRightIcon
                  size={22}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Acceso interactivo al Tour guiado */}
        <div className="mt-3.5 pt-1">
          <HeroStatsBar counts={counts} tourSeen={tourSeen} onStartTour={onStartTour} />
        </div>
      </div>
    </section>
  )
}
