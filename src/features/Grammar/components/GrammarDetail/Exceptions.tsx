import type { GrammarExceptionDTO } from '@features/Grammar/dto';
import { WarningCircle, CheckCircle, XCircle } from '@phosphor-icons/react';
import { motion } from 'motion/react';

interface ExceptionsProps {
  exceptions: GrammarExceptionDTO[];
}

export const Exceptions = ({ exceptions }: ExceptionsProps) => {
  if (!exceptions || exceptions.length === 0) return null;

  return (
    <>
      <span className="block text-xs font-bold text-error uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <WarningCircle size={16} weight="bold" />
        EXCEPCIONES IMPORTANTES
      </span>
      <div className="flex flex-col gap-4">
        {exceptions.map((exc, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }}
            className="bg-[#FFF4F4] border border-[#FFE1E1] p-5 rounded-xl hover:shadow-md hover:border-error/40 transition-all cursor-default"
          >
            <p className="text-error font-semibold text-[15px] mb-4">{exc.description}</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <XCircle size={18} weight="fill" className="text-error shrink-0" />
                <span className="text-text-main line-through opacity-70">{exc.incorrect}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-success shrink-0" />
                <span className="text-text-main font-bold">{exc.correct}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
