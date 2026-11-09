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
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
          {questionIndex + 1}
        </span>
        <p className="font-bold text-sm text-text-main leading-snug">
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
              optionStyle = 'border-success bg-success-light text-text-main font-bold shadow-soft'
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-error bg-error-light text-text-main font-bold shadow-soft'
            } else if (isCorrect) {
              optionStyle = 'border-success/60 bg-success-light/60 text-text-main'
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
              className={`flex min-h-[44px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
            >
              <span>{option}</span>
              {isAnswered && isSelected && (
                <span className="ml-2 shrink-0">
                  {isCorrect ? (
                    <Check size={18} weight="bold" className="text-success" />
                  ) : (
                    <X size={18} weight="bold" className="text-error" />
                  )}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <p className="rounded-2xl border border-border-subtle bg-surface-muted/60 p-3 text-xs leading-relaxed text-text-secondary">
          <span className="font-bold text-text-main">Explicación: </span>
          {question.explanation}
        </p>
      )}
    </div>
  )
}
