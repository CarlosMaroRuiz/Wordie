import { Trophy, ArrowCounterClockwise } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { QuizScoreCardProps } from './type'

export function QuizScoreCard({ correct, total, onReset }: QuizScoreCardProps) {
  const isPerfect = correct === total

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-success/40 bg-success/10 p-4 dark:bg-success/15">
      <div className="flex items-center gap-2 text-text-main">
        <Trophy size={20} weight="fill" className="text-success" />
        <span className="font-bold text-sm">
          Puntaje: {correct}/{total} respuestas correctas
        </span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        {isPerfect
          ? '¡Excelente retención de vocabulario y comprensión del texto técnico!'
          : 'Buen intento. Puedes repasar el glosario o volver a realizar el quiz para consolidar el aprendizaje.'}
      </p>

      <div className="pt-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-1.5"
        >
          <ArrowCounterClockwise size={14} weight="bold" />
          <span>Reintentar quiz</span>
        </Button>
      </div>
    </div>
  )
}
