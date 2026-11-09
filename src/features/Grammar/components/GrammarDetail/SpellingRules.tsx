import type { GrammarSpellingRuleDTO } from '@features/Grammar/dto';

interface SpellingRulesProps {
  rules: GrammarSpellingRuleDTO[];
}

export function SpellingRules({ rules }: SpellingRulesProps) {
  if (!rules || rules.length === 0) return null;

  return (
    <>
      <h3 className="mb-3 text-sm font-bold text-text-secondary">
        Reglas ortográficas (Spelling Rules)
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {rules.map((rule, i) => (
          <div 
            key={i} 
            className="bg-surface p-4 rounded-2xl border border-border-subtle hover:border-primary/40 transition-colors shadow-soft cursor-default"
          >
            <p className="font-bold text-text-main text-[15px] mb-2">{rule.rule}</p>
            <code className="text-primary bg-primary-light/50 px-2 py-1 rounded text-sm font-bold font-mono">
              {rule.transformation}
            </code>
          </div>
        ))}
      </div>
    </>
  );
}
