import { Trash, Sparkle, ArrowRight, Check } from '@phosphor-icons/react'
import { Button } from '@common/Button'
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
      {!isCorrect && (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClear}
            disabled={!hasPlacedChips}
            className="min-h-11 min-w-11 rounded-full"
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
            className="min-h-11 min-w-11 rounded-full text-text-secondary hover:text-primary"
            aria-label="Pista: colocar la siguiente palabra correcta"
          >
            <Sparkle size={17} weight="bold" />
            <span className="hidden sm:inline">Colocar siguiente</span>
          </Button>
        </div>
      )}

      <div className="ml-auto flex-1 lg:flex-none">
        {isCorrect ? (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            arrow
            aria-label="Siguiente oración"
            className="min-h-12 w-full gap-2 rounded-full text-base font-bold shadow-brand sm:min-h-11 sm:text-sm lg:w-auto"
          >
            <ArrowRight size={18} weight="bold" />
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
            className="min-h-12 w-full gap-2 rounded-full text-base font-bold shadow-brand sm:min-h-11 sm:text-sm lg:w-auto"
          >
            <Check size={18} weight="bold" />
            <span className="sm:hidden">Comprobar</span>
            <span className="hidden sm:inline">Comprobar respuesta</span>
          </Button>
        )}
      </div>
    </div>
  )
}
