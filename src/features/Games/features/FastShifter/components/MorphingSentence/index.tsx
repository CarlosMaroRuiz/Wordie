import { SlotToken } from '../SlotToken'
import type { MorphingSentenceProps } from '../../type'

export function MorphingSentence({
  tokens,
  answers,
  activeSlotId,
  isAnswered,
  onSelectSlot,
}: MorphingSentenceProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 rounded-2xl border border-border-subtle bg-surface p-4 text-base font-bold leading-relaxed text-text-main shadow-xs sm:p-6 sm:text-xl">
      {tokens.map((token, index) => {
        if (token.type === 'text') {
          return (
            <span key={`text-${index}`} className="select-text">
              {token.text}
            </span>
          )
        }

        const isSelected = activeSlotId === token.id
        const value = answers[token.id]
        const isCorrect = isAnswered && value === token.correct

        return (
          <SlotToken
            key={token.id}
            slot={token}
            value={value}
            isSelected={isSelected}
            isEvaluated={isAnswered}
            isCorrect={isCorrect}
            onClick={() => onSelectSlot(token.id)}
          />
        )
      })}
    </div>
  )
}
