import { motion, type Variants } from 'motion/react';
import { Button } from '@common/Button';
import { GrammarQuiz } from '../GrammarQuiz';
import type { GrammarTopic } from '@features/Grammar/types';

interface Props {
  topic: GrammarTopic;
  containerVariants: Variants;
  itemVariants: Variants;
}

export const TabPractice = ({ topic, containerVariants, itemVariants }: Props) => {
  if (!topic.quizzes) return null;

  return (
    <motion.div key={`practica-${topic.id}`} variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
      <motion.div variants={itemVariants}>
        <GrammarQuiz key={topic.id} quizzes={topic.quizzes} />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 flex flex-col items-center gap-2">
        <Button variant="primary" size="lg" fullWidth arrow disabled>
          Practicar ejercicios completos
        </Button>
        <span className="text-xs font-semibold text-text-secondary">
          (Próximamente SRS)
        </span>
      </motion.div>
    </motion.div>
  );
};
