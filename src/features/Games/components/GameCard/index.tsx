import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Badge } from '@common/components/Badge'
import { cn } from '@common/utils/cn'
import { ACTIVE_CARD, DIFFICULTY_TONE, INACTIVE_CARD } from './constant'
import type { GameCardProps } from './type'

export function GameCard({ game }: GameCardProps) {
  const Icon = game.icon

  const cardContent = (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div
          className={cn(
            'flex size-14 items-center justify-center rounded-2xl text-primary shadow-xs transition-transform duration-200 group-hover:scale-105',
            game.color,
          )}
        >
          <Icon size={30} weight="duotone" />
        </div>

        <div className="flex items-center gap-2">
          {game.badge ? (
            <Badge tone="brand-soft" size="sm">
              {game.badge}
            </Badge>
          ) : null}
          <Badge tone={DIFFICULTY_TONE[game.difficulty]} size="sm" uppercase>
            {game.difficulty}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-text-main transition-colors group-hover:text-primary">
            {game.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">
            {game.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary">
          <span>{game.active ? 'Jugar ahora' : 'En desarrollo'}</span>
          {game.active ? (
            <ArrowRightIcon
              size={14}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          ) : null}
        </div>
      </div>
    </>
  )

  if (!game.active) {
    return <div className={INACTIVE_CARD}>{cardContent}</div>
  }

  return (
    <Link to={game.to} className={ACTIVE_CARD}>
      {cardContent}
    </Link>
  )
}

export type { GameCardProps } from './type'
