import type { GrammarUsageDTO } from '@features/Grammar/dto';
import { Info } from '@phosphor-icons/react';
import { Example } from '../Example';

interface AdditionalUsesProps {
  uses: GrammarUsageDTO[];
}

export function AdditionalUses({ uses }: AdditionalUsesProps) {
  if (!uses || uses.length === 0) return null;

  return (
    <>
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-text-secondary">
        <Info size={16} weight="bold" />
        Otros usos comunes
      </h3>
      <div className="flex flex-col gap-4">
        {uses.map((use, i) => (
          <div 
            key={i} 
            className="bg-surface p-5 rounded-2xl border border-border-subtle hover:border-primary/40 transition-colors shadow-soft"
          >
            <p className="font-semibold text-text-main text-[15px] mb-3">{use.description}</p>
            <Example en={use.example.en} es={use.example.es} />
          </div>
        ))}
      </div>
    </>
  );
}
