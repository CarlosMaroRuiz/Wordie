import { Trash, Sparkle, ArrowRight, Check } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { GameBackButton } from '@features/Games/components/GameBackButton'
import { CONTROLS_ROW } from '../../constant'
import type { SentenceBuilderControlsProps } from './type'

export function SentenceBuilderControls({
  gameStatus,
  hasPlacedChips,
  canPlaceWordHint,
  onClear,
  onHintWord,
  onCheck,
  onNext,
}: SentenceBuilderControlsProps) {
  const isCorrect = gameStatus === 'correct'

  return (
    <div className={CONTROLS_ROW}>
      <GameBackButton className="lg:hidden" />
      {!isCorrect && (
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClear}
            disabled={!hasPlacedChips}
            className="min-h-11 min-w-11"
            aria-label="Limpiar oración y devolver palabras al banco"
          >
            <Trash size={17} weight="bold" />
            <span className="hidden sm:inline">Limpiar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onHintWord}
            disabled={!canPlaceWordHint}
            className="min-h-11 min-w-11 text-text-secondary hover:text-primary"
            aria-label="Pista: colocar la siguiente palabra correcta"
          >
            <Sparkle size={17} weight="bold" />
            <span className="hidden sm:inline">Colocar siguiente</span>
          </Button>
        </>
      )}

      <div className="ml-auto flex-1 lg:flex-none">
        {isCorrect ? (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            arrow
            aria-label="Siguiente oración"
            className="w-full gap-2 shadow-sm lg:w-auto"
          >
            <ArrowRight size={16} weight="bold" />
            <span className="sm:hidden">Siguiente</span>
            <span className="hidden sm:inline">Siguiente oración</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onCheck}
            disabled={!hasPlacedChips}
            aria-label="Comprobar respuesta"
            className="w-full gap-2 shadow-sm lg:w-auto"
          >
            <Check size={16} weight="bold" />
            <span className="sm:hidden">Comprobar</span>
            <span className="hidden sm:inline">Comprobar respuesta</span>
          </Button>
        )}
      </div>
    </div>
  )
}
