import { motion } from 'motion/react';
import { VocabCard } from '../VocabCard';
import type { VocabGridProps } from './type';
import { containerVariants, itemVariants } from './constant';

export function VocabGrid({ cards }: VocabGridProps) {
  if (cards.length === 0) {
    return (
      <div className="py-12 text-center text-text-secondary bg-surface rounded-2xl border border-border-subtle">
        <p className="text-lg">No se encontraron tarjetas de vocabulario.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
  );
}
