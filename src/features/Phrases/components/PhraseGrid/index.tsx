import { motion } from 'motion/react'
import { EmptyState } from '@common/components/EmptyState'
import { PhraseCard } from '../PhraseCard'
import { CONTAINER_VARIANTS } from './constant'
import type { PhraseGridProps } from './type'

export function PhraseGrid({ phrases, copiedId, onCopy }: PhraseGridProps) {
  if (phrases.length === 0) {
    return <EmptyState title="No hay frases para este filtro." />
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="show"
    >
      {phrases.map((phrase) => (
        <PhraseCard key={phrase.id} phrase={phrase} copiedId={copiedId} onCopy={onCopy} />
      ))}
    </motion.div>
  )
}
