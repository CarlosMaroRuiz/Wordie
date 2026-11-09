import { motion } from 'motion/react'
import { Badge } from '@common/components/Badge'
import { GamePanel } from '@features/Games/components/GamePanel'
import { cn } from '@common/utils/cn'
import {
  CARD_VARIANTS,
  TOKEN_BASE,
  TOKEN_CORRECT,
  TOKEN_IDLE,
  TOKEN_PLAIN,
  TOKEN_WRONG,
} from '../../constant'
import type { TokenState } from '../../type'
import type { IntruderSentenceProps } from './type'

const TOKEN_STYLE: Record<TokenState, string> = {
  idle: TOKEN_IDLE,
  correct: TOKEN_CORRECT,
  wrong: TOKEN_WRONG,
  plain: TOKEN_PLAIN,
}

export function IntruderSentence({
  question,
  selectedIndex,
  isAnswered,
  onSelect,
}: IntruderSentenceProps) {
  return (
    <motion.div variants={CARD_VARIANTS} initial="hidden" animate="show">
      <GamePanel
        badge={
          <Badge tone="primary-tint" size="sm">
            {question.level}
          </Badge>
        }
        hint="¿Qué palabra sobra?"
      >
        <div className="flex flex-wrap items-center gap-2 leading-relaxed sm:gap-2.5">
          {question.words.map((word, wordIndex) => {
            const state: TokenState = !isAnswered
              ? 'idle'
              : wordIndex === question.extraIndex
                ? 'correct'
                : wordIndex === selectedIndex
                  ? 'wrong'
                  : 'plain'

            return (
              <button
                key={`${question.id}-${wordIndex}`}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelect(wordIndex)}
                className={cn(TOKEN_BASE, TOKEN_STYLE[state])}
              >
                {word}
              </button>
            )
          })}
        </div>
      </GamePanel>
    </motion.div>
  )
}

export type { IntruderSentenceProps } from './type'
