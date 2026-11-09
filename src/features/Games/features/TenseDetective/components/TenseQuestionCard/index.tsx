import { motion } from 'motion/react'
import { Badge } from '@common/components/Badge'
import { GamePanel } from '@features/Games/components/GamePanel'
import { CARD_VARIANTS, HIGHLIGHT } from '../../constant'
import type { TenseQuestionCardProps } from './type'

export function TenseQuestionCard({ question }: TenseQuestionCardProps) {
  const [before, after] = question.sentence.split(question.verb)

  return (
    <motion.div variants={CARD_VARIANTS} initial="hidden" animate="show">
      <GamePanel
        badge={
          <Badge tone="primary-tint" size="sm">
            {question.level}
          </Badge>
        }
        hint="¿Qué tiempo verbal es?"
      >
        <p className="text-xl font-bold leading-relaxed text-text-main sm:text-2xl">
          {before}
          <span className={HIGHLIGHT}>{question.verb}</span>
          {after}
        </p>
      </GamePanel>
    </motion.div>
  )
}

export type { TenseQuestionCardProps } from './type'
