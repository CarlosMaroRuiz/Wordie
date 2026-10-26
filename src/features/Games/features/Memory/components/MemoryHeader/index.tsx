import { Link } from 'react-router-dom'
import { ArrowClockwiseIcon, ArrowLeftIcon, QuestionIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { MemoryHeaderProps } from './type'

export function MemoryHeader({ onRestart, onOpenHelp }: MemoryHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 sm:gap-4">
      <div className="min-w-0 flex-1">
        <Link
          to="/games"
          className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-text-tertiary transition-colors hover:text-primary"
        >
          <ArrowLeftIcon size={14} weight="bold" />
          <span className="hidden sm:inline">Volver a Minijuegos</span>
          <span className="sm:hidden">Minijuegos</span>
        </Link>
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-text-main truncate">
          Memorama
        </h1>
        <p className="hidden sm:block mt-0.5 text-xs text-text-secondary">
          Encuentra el par correcto entre la palabra en inglés y su traducción al español.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {onOpenHelp ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenHelp}
            className="flex items-center justify-center p-2 text-text-secondary hover:text-primary"
            aria-label="Ver consejos pedagógicos"
          >
            <QuestionIcon size={18} weight="bold" />
          </Button>
        ) : null}

        <Button
          variant="secondary"
          size="sm"
          onClick={onRestart}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2"
          aria-label="Reiniciar juego"
        >
          <ArrowClockwiseIcon size={16} weight="bold" />
          <span className="hidden sm:inline">Reiniciar</span>
        </Button>
      </div>
    </div>
  )
}

export type { MemoryHeaderProps } from './type'
