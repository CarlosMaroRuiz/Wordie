import { motion } from 'motion/react'
import { CheckCircleIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { Badge } from '@common/components/Badge'
import { cn } from '@common/utils/cn'
import { RELATION_LABEL, TRAP_LABEL } from '../../constant'
import type { ConnectorFeedbackProps } from './type'

export function ConnectorFeedback({
  results,
  isChecked,
  allFilled,
  isLast,
  onCheck,
  onNext,
}: ConnectorFeedbackProps) {
  if (!isChecked) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="primary"
          size="md"
          onClick={onCheck}
          disabled={!allFilled}
          className="min-h-12 w-full rounded-full text-base font-bold shadow-brand sm:w-auto sm:text-sm"
        >
          Comprobar
        </Button>
        <p className="text-center text-xs font-semibold text-text-tertiary">
          {allFilled
            ? 'Revisa los tres conectores antes de comprobar.'
            : 'Elige un conector para cada hueco.'}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2.5"
    >
      {results.map((result, seamIndex) => {
        const picked = result.seam.options.find(option => option.text === result.given)
        const trap = picked?.trap ?? null

        return (
          <div
            key={seamIndex}
            className={cn(
              'rounded-[22px] border p-3.5 shadow-soft',
              result.isRight
                ? 'border-success/30 bg-success-light'
                : 'border-error/30 bg-error-light',
            )}
          >
            <div className="flex items-center gap-2">
              {result.isRight ? (
                <CheckCircleIcon size={20} weight="fill" className="shrink-0 text-success" />
              ) : (
                <XIcon size={20} weight="bold" className="shrink-0 text-error" />
              )}
              <span
                className={cn(
                  'text-sm font-black',
                  result.isRight ? 'text-success' : 'text-error',
                )}
              >
                {result.isRight
                  ? `${seamIndex + 1}. Correcto`
                  : `${seamIndex + 1}. Era «${result.seam.answer}»`}
              </span>
              <Badge tone="primary" size="xs" className="ml-auto">
                {RELATION_LABEL[result.seam.relation]}
              </Badge>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              {result.seam.explanation}
            </p>

            {!result.isRight && trap ? (
              <p className="mt-1 text-[11px] font-semibold text-text-tertiary">
                Elegiste «{result.given}»: {TRAP_LABEL[trap]}
              </p>
            ) : null}
          </div>
        )
      })}

      <Button
        variant="primary"
        size="md"
        onClick={onNext}
        className="min-h-12 w-full rounded-full text-base font-bold shadow-brand sm:w-auto sm:text-sm"
      >
        {isLast ? 'Ver resultado' : 'Siguiente párrafo'}
      </Button>
    </motion.div>
  )
}

export type { ConnectorFeedbackProps, SeamResult } from './type'
