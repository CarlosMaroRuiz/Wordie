import { motion } from 'motion/react'
import { EmptyState } from '@common/components/EmptyState'
import { VocabCard } from '../VocabCard'
import type { VocabGridProps } from './type'
import { containerVariants, itemVariants } from './constant'

export function VocabGrid({ cards }: VocabGridProps) {
  if (cards.length === 0) {
    return (
      <EmptyState
        variant="card"
        size="lg"
        title="No se encontraron tarjetas de vocabulario."
      />
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map(card => (
        <motion.div key={card.id} variants={itemVariants}>
          <VocabCard card={card} />
        </motion.div>
      ))}
    </motion.div>
  )
}
