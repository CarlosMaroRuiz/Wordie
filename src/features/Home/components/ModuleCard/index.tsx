import { Link } from 'react-router-dom'
import { ArrowRightIcon, BookmarkSimpleIcon } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { cn } from '@common/utils/cn'
import type { ModuleCardProps } from './type'

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon
  const isFeatured = Boolean(module.featured)

  return (
    <CardBase
      as="article"
      padding="none"
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-border-subtle bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-float',
        isFeatured && 'ring-2 ring-primary/20',
      )}
    >
      {/* 1. Cabecera visual de tarjeta con miniatura y badge flotante estilo referencia */}
      <div className="relative overflow-hidden border-b border-border-subtle/50 bg-gradient-to-b from-primary-light/80 to-surface-muted/60 p-4 sm:p-5">
        {/* Halo decorativo */}
        <div
          className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-primary/10 blur-xl transition-transform duration-300 group-hover:scale-125"
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between gap-3">
          {/* Icono en badge elevado */}
          <div className="flex size-12 items-center justify-center rounded-2xl border border-border-subtle bg-surface text-primary shadow-soft transition-transform duration-200 group-hover:scale-105">
            <Icon size={24} weight="duotone" />
          </div>

          {/* Badge flotante estilo tag de la referencia */}
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-surface/90 px-3 py-1 text-xs font-black tracking-wide text-primary shadow-soft backdrop-blur-xs">
            {module.badge}
          </span>
        </div>
      </div>

      {/* 2. Cuerpo de la tarjeta con tipografía audaz y metadatos */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
            <BookmarkSimpleIcon size={14} weight="bold" className="text-primary" aria-hidden="true" />
            <span>{module.format}</span>
          </div>

          <h3 className="mt-1.5 text-lg font-black tracking-tight text-text-main transition-colors group-hover:text-primary">
            {module.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-text-secondary line-clamp-2">
            {module.description}
          </p>
        </div>

        {/* 3. Footer con micro-botón CTA de flecha */}
        <div className="mt-4 flex items-center justify-between border-t border-border-subtle/60 pt-3">
          <span className="text-xs font-bold text-primary group-hover:underline">
            Empezar módulo
          </span>

          <div
            className="flex size-8 items-center justify-center rounded-full border border-border-subtle bg-surface-muted text-text-secondary shadow-icon transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <ArrowRightIcon size={14} weight="bold" />
          </div>
        </div>
      </div>

      {/* Hit Area accesible para toda la tarjeta */}
      <Link
        to={module.to}
        aria-label={`Abrir módulo ${module.title}: ${module.description}`}
        className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
    </CardBase>
  )
}
