import type { MouseEvent } from 'react'
import { BookOpen, SpeakerSimpleHigh } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import type { StoryGlossaryProps } from './type'

export function StoryGlossary({
  keywords,
  selectedKeyword,
  onSelectKeyword,
}: StoryGlossaryProps) {
  const { speak } = useSpeechSynthesis()

  const speakTerm = (e: MouseEvent<HTMLButtonElement>, term: string) => {
    e.stopPropagation()
    speak(term, { rate: 0.85 })
  }

  return (
    <CardBase padding="md" className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
        <BookOpen size={18} className="text-primary" weight="bold" />
        <h3 className="text-base font-bold text-text-main">Glosario de la lectura</h3>
      </div>

      <div className="flex flex-col divide-y divide-border/50">
        {keywords.map((k) => {
          const isSelected = selectedKeyword?.toLowerCase() === k.term.toLowerCase()
          return (
            <div
              key={k.term}
              onClick={() => onSelectKeyword(k.term)}
              className={`group flex cursor-pointer flex-col py-2.5 transition-colors ${
                isSelected ? 'rounded-lg bg-primary/10 px-2 dark:bg-primary/20' : 'hover:bg-bg-page px-1'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">
                    {k.term}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => speakTerm(e, k.term)}
                    title={`Pronunciar ${k.term}`}
                    aria-label={`Pronunciar ${k.term}`}
                    className="cursor-pointer text-text-secondary hover:text-primary transition-colors"
                  >
                    <SpeakerSimpleHigh size={15} />
                  </button>
                </div>
                <span className="text-xs text-text-secondary font-medium text-right">
                  {k.translation}
                </span>
              </div>
              {k.definition && (
                <p className="mt-1 text-xs text-text-secondary leading-normal">
                  {k.definition}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </CardBase>
  )
}
