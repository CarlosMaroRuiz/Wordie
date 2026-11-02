import { Lightbulb, Translate } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import type { SentencePromptCardProps } from './type'

const DIFFICULTY_MAP = {
  easy: { label: 'Básico', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  medium: { label: 'Intermedio', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  hard: { label: 'Avanzado', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
}

export function SentencePromptCard({
  sentence,
  isHintActive,
  onToggleHint,
}: SentencePromptCardProps) {
  const diffInfo = DIFFICULTY_MAP[sentence.difficulty]

  return (
    <CardBase padding="md" className="flex flex-col gap-2 sm:gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/50 pb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-text-tertiary sm:text-xs">
          <Translate size={15} weight="bold" className="shrink-0 text-primary" />
          <span>Traduce y construye la oración</span>
        </div>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${diffInfo.color}`}
        >
          {diffInfo.label}
        </span>
      </div>

      <p className="text-[17px] font-bold leading-snug text-text-main sm:text-xl">
        «{sentence.es}»
      </p>

      {sentence.hint && (
        <div className="border-t border-border-subtle/50 pt-1.5">
          <button
            type="button"
            onClick={onToggleHint}
            className="inline-flex min-h-9 cursor-pointer touch-manipulation select-none items-center gap-1.5 rounded-lg text-xs font-bold text-primary hover:underline"
          >
            <Lightbulb size={15} weight={isHintActive ? 'fill' : 'bold'} />
            <span>{isHintActive ? 'Ocultar pista' : 'Ver pista gramatical'}</span>
          </button>

          {isHintActive && (
            <div className="mt-1 rounded-xl border border-primary/15 bg-primary/5 p-3 text-xs leading-relaxed text-text-secondary dark:bg-primary/10">
              <span className="font-bold text-primary">💡 Consejo: </span>
              {sentence.hint}
            </div>
          )}
        </div>
      )}
    </CardBase>
  )
}
