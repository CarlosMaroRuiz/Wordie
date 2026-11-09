import type { GrammarExceptionDTO } from '@features/Grammar/dto';
import { WarningCircle, CheckCircle, XCircle } from '@phosphor-icons/react';

interface ExceptionsProps {
  exceptions: GrammarExceptionDTO[];
}

export function Exceptions({ exceptions }: ExceptionsProps) {
  if (!exceptions || exceptions.length === 0) return null;

  return (
    <>
      <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-error">
        <WarningCircle size={16} weight="bold" />
        Excepciones importantes
      </h3>
      <div className="flex flex-col gap-4">
        {exceptions.map((exc, i) => (
          <div 
            key={i} 
            className="bg-error-light border border-error/20 p-5 rounded-2xl transition-colors cursor-default"
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
          </div>
        ))}
      </div>
    </>
  );
}
