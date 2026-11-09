import { Check, X } from '@phosphor-icons/react'
import { cn } from '@common/utils/cn'
import {
  OPTION_BASE,
  OPTION_CORRECT,
  OPTION_DIM,
  OPTION_IDLE,
  OPTION_WRONG,
} from '../../constant'
import type { OptionState } from '../../type'
import type { TenseOptionsProps } from './type'

const STATE_STYLE: Record<OptionState, string> = {
  idle: OPTION_IDLE,
  correct: OPTION_CORRECT,
  wrong: OPTION_WRONG,
  dim: OPTION_DIM,
}

export function TenseOptions({ question, selected, onSelect }: TenseOptionsProps) {
  const isAnswered = selected !== null

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {question.options.map(option => {
        const isCorrect = option.id === question.correctTense
        const isPicked = option.id === selected

        const state: OptionState = !isAnswered
          ? 'idle'
          : isCorrect
            ? 'correct'
            : isPicked
              ? 'wrong'
              : 'dim'

        return (
          <button
            key={option.id}
            type="button"
            disabled={isAnswered}
            aria-pressed={isPicked}
            onClick={() => onSelect(option.id)}
            className={cn(OPTION_BASE, STATE_STYLE[state])}
          >
            <span>{option.label}</span>
            {state === 'correct' ? <Check size={18} weight="bold" /> : null}
            {state === 'wrong' ? <X size={18} weight="bold" /> : null}
          </button>
        )
      })}
    </div>
  )
}

export type { TenseOptionsProps } from './type'
