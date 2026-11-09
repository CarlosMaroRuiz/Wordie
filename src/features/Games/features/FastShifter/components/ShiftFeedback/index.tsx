import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { AudioButton } from '@common/components/AudioButton'
import { cn } from '@common/utils/cn'
import type { ShiftFeedbackProps } from '../../type'

export function ShiftFeedback({
  isCorrect,
  trapExplanation,
  fullCorrect,
  translation,
  reflexRating,
}: ShiftFeedbackProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[24px] border p-4 shadow-soft sm:p-5',
        isCorrect
          ? 'border-success/30 bg-success-light text-text-main'
          : 'border-error/30 bg-error-light text-text-main',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircleIcon size={24} weight="fill" className="text-success" />
          ) : (
            <WarningCircleIcon size={24} weight="fill" className="text-error" />
          )}
          <span className={cn('text-base font-black', isCorrect ? 'text-success' : 'text-error')}>
            {isCorrect ? '¡Mutación Correcta!' : 'Atención al cambio'}
          </span>
        </div>

        {isCorrect && reflexRating && (
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-black text-success">
            +{100 * reflexRating.multiplier} pts
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="text-base font-black text-text-main sm:text-lg">
            {fullCorrect}
          </p>
          <AudioButton text={fullCorrect} label="Escuchar oración completa" />
        </div>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          {translation}
        </p>
      </div>

      {!isCorrect && trapExplanation && (
        <div className="rounded-2xl border border-warning/30 bg-warning-light p-3 text-xs leading-relaxed text-text-main">
          <strong className="block font-black text-warning mb-0.5">Regla clave:</strong>
          {trapExplanation}
        </div>
      )}
    </div>
  )
}
