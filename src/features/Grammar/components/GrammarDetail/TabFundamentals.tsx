import { motion, type Variants } from 'motion/react';
import { Banner } from '../Banner';
import { Example } from '../Example';
import type { GrammarTopic } from '@features/Grammar/types';

interface Props {
  topic: GrammarTopic;
  containerVariants: Variants;
  itemVariants: Variants;
}

export const TabFundamentals = ({ topic, containerVariants, itemVariants }: Props) => {
  return (
    <motion.div key={`fundamentos-${topic.id}`} variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
      <motion.div variants={itemVariants}>
        <Banner
          title={topic.title}
          category={topic.category}
          level={topic.level}
          explanation={topic.explanation}
          formula={topic.formula}
          formulas={topic.formulas}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
          EJEMPLOS EN CONTEXTO
        </span>
        {topic.examples.map((ex, index) => <Example key={index} en={ex.en} es={ex.es} />)}
      </motion.div>
    </motion.div>
  );
};
