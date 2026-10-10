import React from 'react';
import { motion } from 'motion/react';
import { VocabCard } from '../VocabCard';
import type { VocabCardDTO } from '../../dto';

interface VocabGridProps {
  cards: VocabCardDTO[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const VocabGrid: React.FC<VocabGridProps> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div className="py-12 text-center text-text-secondary bg-surface rounded-2xl border border-border-subtle">
        <p className="text-lg">No vocabulary cards found.</p>
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
};
