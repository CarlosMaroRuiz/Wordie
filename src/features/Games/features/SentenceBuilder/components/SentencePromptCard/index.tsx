import { Lightbulb } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { Badge } from '@common/components/Badge'
import type { SentencePromptCardProps } from './type'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
}

export function SentencePromptCard({
  sentence,
  isHintActive,
  onToggleHint,
}: SentencePromptCardProps) {
  return (
    <CardBase
      as="section"
      padding="sm"
      aria-label="Oración a construir"
      className="flex flex-col gap-2 rounded-[24px] border border-border-subtle bg-surface shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge tone="primary-tint" size="sm">
          {DIFFICULTY_LABEL[sentence.difficulty] ?? sentence.difficulty}
        </Badge>
        <span className="text-xs font-semibold text-text-secondary">
          Ordena las palabras
        </span>
      </div>

      <p className="text-base font-bold leading-snug text-text-main sm:text-lg">
        {sentence.es}
      </p>

      {sentence.hint && (
        <div className="border-t border-border-subtle/50 pt-1.5">
          <button
            type="button"
            onClick={onToggleHint}
            className="inline-flex min-h-9 cursor-pointer touch-manipulation select-none items-center gap-1.5 rounded-full text-xs font-bold text-primary hover:underline"
          >
            <Lightbulb size={15} weight={isHintActive ? 'fill' : 'bold'} />
            <span>{isHintActive ? 'Ocultar pista' : 'Ver pista gramatical'}</span>
          </button>

          {isHintActive && (
            <div className="mt-1.5 flex items-start gap-2 rounded-2xl border border-primary/20 bg-primary-light p-3 text-xs leading-relaxed text-text-secondary">
              <Lightbulb size={16} weight="fill" className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <span className="font-bold text-primary">Consejo: </span>
                <span>{sentence.hint}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </CardBase>
  )
}
