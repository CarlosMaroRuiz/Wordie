import { Link } from 'react-router-dom'
import { ArrowRightIcon, LightningIcon, LockIcon } from '@phosphor-icons/react'
import { Badge } from '@common/components/Badge'
import { cn } from '@common/utils/cn'
import { ACTIVE_CARD, DIFFICULTY_TONE, INACTIVE_CARD } from './constant'
import type { GameCardProps } from './type'

export function GameCard({ game, className = '' }: GameCardProps) {
  const Icon = game.icon

  const cardContent = (
    <>
      {/* 1. Cabecera con Icono Escudo + Habilidad y Dificultad */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex size-13 sm:size-14 shrink-0 items-center justify-center rounded-2xl shadow-soft transition-transform group-hover:scale-105',
              game.color,
            )}
          >
            <Icon size={28} weight="duotone" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <Badge tone={DIFFICULTY_TONE[game.difficulty]} size="xs">
              {game.difficulty}
            </Badge>
            {game.skill ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">
                {game.skill}
              </span>
            ) : null}
          </div>
        </div>

        {/* 2. Título, Descripción y Formato */}
        <div className="mt-4">
          <h3 className="text-lg font-black tracking-tight text-text-main transition-colors group-hover:text-primary sm:text-xl">
            {game.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-text-secondary line-clamp-2 sm:line-clamp-3">
            {game.description}
          </p>

          {game.format ? (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-muted/80 px-2.5 py-0.5 font-mono text-[11px] font-bold text-text-tertiary">
                <LightningIcon size={12} weight="fill" className="text-amber-500" aria-hidden="true" />
                <span>{game.format}</span>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* 3. Botón CTA táctil en píldora con elevación suave */}
      <div className="mt-5">
        {game.active ? (
          <div className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-on-primary shadow-brand transition-all group-hover:bg-primary-hover group-active:scale-[0.98]">
            <span>Entrenar ahora</span>
            <ArrowRightIcon
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        ) : (
          <div className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-dashed border-border-subtle bg-surface-muted/70 px-4 py-2 text-xs font-semibold text-text-tertiary">
            <LockIcon size={14} weight="bold" />
            <span>Próximamente</span>
          </div>
        )}
      </div>
    </>
  )

  if (!game.active) {
    return <div className={cn(INACTIVE_CARD, className)}>{cardContent}</div>
  }

  return (
    <Link to={game.to} className={cn(ACTIVE_CARD, className)}>
      {cardContent}
    </Link>
  )
}

export type { GameCardProps } from './type'
