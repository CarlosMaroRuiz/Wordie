import { Check, X } from '@phosphor-icons/react'
import type { QuizQuestionProps } from './type'

export function QuizQuestion({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  const isAnswered = selectedAnswer !== undefined

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-start gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {questionIndex + 1}
        </span>
        <p className="font-semibold text-sm text-text-main leading-snug">
          {question.question}
        </p>
      </div>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label={question.question}>
        {question.options.map((option, optIdx) => {
          const isSelected = selectedAnswer === optIdx
          const isCorrect = optIdx === question.correctAnswer

          let optionStyle = 'border-border-subtle bg-surface text-text-main hover:border-primary/60'
          if (isAnswered) {
            if (isSelected && isCorrect) {
              optionStyle = 'border-success bg-success/15 text-text-main font-bold dark:bg-success/20'
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-error bg-error/15 text-text-main font-bold dark:bg-error/20'
            } else if (isCorrect) {
              optionStyle = 'border-success/60 bg-success/5 text-text-main dark:bg-success/10'
            } else {
              optionStyle = 'border-border-subtle/60 bg-surface text-text-secondary opacity-60'
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelectAnswer(question.id, optIdx)}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer disabled:cursor-default ${optionStyle}`}
            >
              <span>{option}</span>
              {isAnswered && isSelected && (
                <span className="ml-2 shrink-0">
                  {isCorrect ? (
                    <Check size={16} weight="bold" className="text-success" />
                  ) : (
                    <X size={16} weight="bold" className="text-error" />
                  )}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <p className="rounded-lg bg-bg-page px-3 py-2 text-xs text-text-secondary">
          <span className="font-bold text-text-main">Explicación: </span>
          {question.explanation}
        </p>
      )}
    </div>
  )
}
