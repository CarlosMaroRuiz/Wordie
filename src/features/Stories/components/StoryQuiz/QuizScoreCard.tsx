import { Trophy, ArrowCounterClockwise } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { QuizScoreCardProps } from './type'

export function QuizScoreCard({ correct, total, onReset }: QuizScoreCardProps) {
  const isPerfect = correct === total

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-success/40 bg-success-light p-4 shadow-soft">
      <div className="flex items-center gap-2 text-text-main">
        <Trophy size={20} weight="fill" className="text-success" />
        <span className="font-black text-sm">
          Puntaje: {correct}/{total} respuestas correctas
        </span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        {isPerfect
          ? '¡Excelente retención de vocabulario y comprensión del texto!'
          : 'Buen intento. Puedes repasar el glosario o volver a realizar el quiz para consolidar el aprendizaje.'}
      </p>

      <div className="pt-1">
        <Button
          variant="secondary"
          size="md"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-full"
        >
          <ArrowCounterClockwise size={16} weight="bold" />
          <span>Reintentar quiz</span>
        </Button>
      </div>
    </div>
  )
}
