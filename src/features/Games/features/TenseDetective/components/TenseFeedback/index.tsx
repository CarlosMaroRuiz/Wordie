import { AnimatePresence, motion } from 'motion/react'
import { CheckCircleIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { Badge } from '@common/components/Badge'
import { cn } from '@common/utils/cn'
import { tenseLabel } from '../../constant'
import type { TenseFeedbackProps } from './type'

export function TenseFeedback({
  question,
  isAnswered,
  isCorrect,
  isLast,
  onNext,
}: TenseFeedbackProps) {
  return (
    <AnimatePresence mode="wait">
      {isAnswered ? (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={cn(
            'rounded-[24px] border p-4 shadow-soft',
            isCorrect ? 'border-success/30 bg-success-light' : 'border-error/30 bg-error-light',
          )}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircleIcon size={22} weight="fill" className="shrink-0 text-success" />
            ) : (
              <XIcon size={22} weight="bold" className="shrink-0 text-error" />
            )}
            <span
              className={cn(
                'text-base font-black',
                isCorrect ? 'text-success' : 'text-error',
              )}
            >
              {isCorrect ? '¡Correcto!' : 'No era esa'}
            </span>
            <Badge tone="primary" size="xs" className="ml-auto">
              {tenseLabel(question.correctTense)}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-text-main">{question.translation}</p>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            {question.explanation}
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            className="mt-3.5 min-h-12 w-full rounded-full text-base font-bold shadow-brand sm:min-h-11 sm:w-auto sm:text-sm"
          >
            {isLast ? 'Ver resultado' : 'Siguiente oración'}
          </Button>
        </motion.div>
      ) : (
        <motion.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-xs font-semibold text-text-tertiary"
        >
          Elige una de las cuatro opciones.
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export type { TenseFeedbackProps } from './type'
