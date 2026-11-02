import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { PATHS } from '@core/routes/types/paths'
import type { GameBackButtonProps } from './type'

/** Control de regreso al hub de minijuegos, siempre presente en la barra de acciones. */
export function GameBackButton({
  label = 'Volver a Minijuegos',
  className = '',
}: GameBackButtonProps) {
  return (
    <Link
      to={PATHS.Games}
      aria-label={label}
      className={`inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-[14px] border-[1.5px] border-border-subtle bg-surface px-2.5 text-primary shadow-xs transition-colors hover:border-primary ${className}`}
    >
      <ArrowLeftIcon size={17} weight="bold" />
    </Link>
  )
}
