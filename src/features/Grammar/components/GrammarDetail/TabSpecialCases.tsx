import { motion, type Variants } from 'motion/react';
import { Lightbulb } from '@phosphor-icons/react';
import { SpellingRules } from './SpellingRules';
import { Exceptions } from './Exceptions';
import { AdditionalUses } from './AdditionalUses';
import type { GrammarTopic } from '@features/Grammar/types';

interface Props {
  topic: GrammarTopic;
  containerVariants: Variants;
  itemVariants: Variants;
}

export const TabSpecialCases = ({ topic, containerVariants, itemVariants }: Props) => {
  return (
    <motion.div key={`especiales-${topic.id}`} variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
      {topic.spellingRules && topic.spellingRules.length > 0 && (
        <motion.div variants={itemVariants}>
          <SpellingRules rules={topic.spellingRules} />
        </motion.div>
      )}

      {topic.exceptions && topic.exceptions.length > 0 && (
        <motion.div variants={itemVariants}>
          <Exceptions exceptions={topic.exceptions} />
        </motion.div>
      )}

      {topic.additionalUses && topic.additionalUses.length > 0 && (
        <motion.div variants={itemVariants}>
          <AdditionalUses uses={topic.additionalUses} />
        </motion.div>
      )}

      {topic.note && (
        <motion.div variants={itemVariants} className="text-sm text-text-main flex gap-2 items-start bg-yellow/10 p-4 rounded-xl border border-yellow/20">
          <Lightbulb size={20} weight="fill" className="text-yellow shrink-0 mt-0.5" />
          <p>{topic.note}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
