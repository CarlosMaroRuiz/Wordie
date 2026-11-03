import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { SentenceStrip } from './SentenceStrip'
import { WordBank } from './WordBank'
import type { SentenceWorkspaceProps } from './type'

export function SentenceWorkspace({
  placedChips,
  availableChips,
  gameStatus,
  onPlaceChip,
  onRemoveChip,
}: SentenceWorkspaceProps) {
  const isCorrect = gameStatus === 'correct'
  const isIncorrect = gameStatus === 'incorrect'

  return (
    <div className="flex flex-col gap-3">
      <CardBase
        padding="md"
        className={`flex flex-col gap-2 transition-all duration-200 ${
          isCorrect
            ? 'border-success bg-success-light ring-2 ring-success/20'
            : isIncorrect
              ? 'border-error bg-error-light ring-2 ring-error/20 animate-shake'
              : 'border-border-subtle bg-surface'
        }`}
      >
        <div
          aria-live="polite"
          className="flex flex-col gap-0.5 text-[11px] font-semibold text-text-tertiary sm:flex-row sm:items-center sm:justify-between sm:text-xs"
        >
          <span>Tu oración en inglés:</span>
          {isCorrect && (
            <span className="flex items-center gap-1 font-bold text-success">
              <CheckCircle size={15} weight="fill" />
              ¡Excelente! Oración correcta
            </span>
          )}
          {isIncorrect && (
            <span className="flex items-center gap-1 font-bold text-error">
              <WarningCircle size={15} weight="fill" />
              Revisa el orden de las palabras
            </span>
          )}
        </div>

        <SentenceStrip
          placedChips={placedChips}
          gameStatus={gameStatus}
          onRemoveChip={onRemoveChip}
        />
      </CardBase>

      <WordBank
        availableChips={availableChips}
        gameStatus={gameStatus}
        onPlaceChip={onPlaceChip}
      />
    </div>
  )
}
