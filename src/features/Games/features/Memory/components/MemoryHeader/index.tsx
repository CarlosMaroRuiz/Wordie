import { Link } from 'react-router-dom'
import { ArrowClockwiseIcon, ArrowLeftIcon, QuestionIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { MemoryHeaderProps } from './type'

export function MemoryHeader({ onRestart, onOpenHelp }: MemoryHeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        to="/games"
        aria-label="Volver a Minijuegos"
        className="hidden min-h-11 shrink-0 touch-manipulation items-center gap-1.5 rounded-[14px] border-[1.5px] border-border-subtle bg-surface px-3 text-sm font-bold text-primary shadow-xs transition-colors hover:border-primary lg:inline-flex"
      >
        <ArrowLeftIcon size={16} weight="bold" />
        <span className="hidden sm:inline">Volver a Minijuegos</span>
        <span className="sm:hidden">Juegos</span>
      </Link>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xl font-extrabold tracking-tight text-text-main sm:text-3xl">
          Memorama
        </h1>
        <p className="mt-0.5 hidden text-xs text-text-secondary sm:block">
          Encuentra el par correcto entre la palabra en inglés y su traducción al español.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {onOpenHelp ? (
          <Button
            variant="icon"
            size="sm"
            onClick={onOpenHelp}
            aria-label="Ver consejos pedagógicos"
          >
            <QuestionIcon size={18} weight="bold" />
          </Button>
        ) : null}

        <Button
          variant="secondary"
          size="sm"
          onClick={onRestart}
          className="min-h-11 min-w-11"
          aria-label="Reiniciar juego"
        >
          <ArrowClockwiseIcon size={16} weight="bold" />
          <span className="hidden sm:inline">Reiniciar</span>
        </Button>
      </div>
    </div>
  )
}
