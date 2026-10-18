import { motion } from 'motion/react'
import { PhraseCard } from '../PhraseCard'
import { CONTAINER_VARIANTS } from './constant'
import type { PhraseGridProps } from './type'

export function PhraseGrid({ phrases, copiedId, onCopy, onSpeak }: PhraseGridProps) {
  if (phrases.length === 0) {
    return (
      <p className="py-12 text-center text-text-secondary">
        No hay frases para este filtro.
      </p>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="show"
    >
      {phrases.map((phrase) => (
        <PhraseCard
          key={phrase.id}
          phrase={phrase}
          copiedId={copiedId}
          onCopy={onCopy}
          onSpeak={onSpeak}
        />
      ))}
    </motion.div>
  )
}
