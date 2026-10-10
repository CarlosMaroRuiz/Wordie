import type { GrammarSpellingRuleDTO } from '@features/Grammar/dto';
import { motion } from 'motion/react';

interface SpellingRulesProps {
  rules: GrammarSpellingRuleDTO[];
}

export const SpellingRules = ({ rules }: SpellingRulesProps) => {
  if (!rules || rules.length === 0) return null;

  return (
    <>
      <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
        REGLAS ORTOGRÁFICAS (SPELLING RULES)
      </span>
      <div className="grid grid-cols-1 gap-3">
        {rules.map((rule, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-bg-page p-4 rounded-xl border border-border-subtle hover:border-primary/40 hover:shadow-md transition-all cursor-default"
          >
            <p className="font-bold text-text-main text-[15px] mb-2">{rule.rule}</p>
            <code className="text-primary bg-primary-light/50 px-2 py-1 rounded text-sm font-bold">
              {rule.transformation}
            </code>
          </motion.div>
        ))}
      </div>
    </>
  );
};
