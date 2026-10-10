import type { GrammarUsageDTO } from '@features/Grammar/dto';
import { Info } from '@phosphor-icons/react';
import { Example } from '../Example';
import { motion } from 'motion/react';

interface AdditionalUsesProps {
  uses: GrammarUsageDTO[];
}

export const AdditionalUses = ({ uses }: AdditionalUsesProps) => {
  if (!uses || uses.length === 0) return null;

  return (
    <>
      <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <Info size={16} weight="bold" />
        OTROS USOS COMUNES
      </span>
      <div className="flex flex-col gap-4">
        {uses.map((use, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.01, y: -2 }}
            className="bg-bg-page p-5 rounded-xl border border-border-subtle hover:border-primary/40 hover:shadow-md transition-all"
          >
            <p className="font-semibold text-text-main text-[15px] mb-3">{use.description}</p>
            <Example en={use.example.en} es={use.example.es} />
          </motion.div>
        ))}
      </div>
    </>
  );
};
