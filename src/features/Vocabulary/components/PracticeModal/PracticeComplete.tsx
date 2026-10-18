import { motion } from 'motion/react';
import { Trophy } from '@phosphor-icons/react';
import { Button } from '@common/Button';
import type { PracticeCompleteProps } from './type';

export function PracticeComplete({ totalPracticed, onClose }: PracticeCompleteProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center flex-grow text-center"
    >
      <Trophy size={56} weight="duotone" className="text-primary mb-4" />
      <h3 className="text-2xl font-bold text-text-main mb-2">¡Sesión Completada!</h3>
      <p className="text-text-secondary mb-6">Repasaste {totalPracticed} palabras.</p>
      <Button variant="primary" onClick={onClose}>
        Finalizar
      </Button>
    </motion.div>
  );
}
