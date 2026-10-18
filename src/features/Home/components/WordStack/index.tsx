import { getVocabHint } from '@features/Vocabulary/store/progress'
import { cn } from '../../cn'
import { HOME_SKELETON, HOME_STACK_ROTATION } from '../../constant'
import type { WordStackProps } from './type'

const SKELETON_CARDS = [0, 1] as const

export function WordStack({ words, isLoading }: WordStackProps) {
  if (isLoading) {
    return (
      <div
        className="flex min-h-[104px] flex-col justify-center gap-3 sm:min-h-[196px]"
        aria-hidden="true"
      >
        {SKELETON_CARDS.map(card => (
          <div key={card} className={cn(HOME_SKELETON, 'h-14')} />
        ))}
      </div>
    )
  }

  if (words.length === 0) return null

  return (
    <ul className="flex min-h-[104px] flex-col justify-center gap-3 sm:min-h-[196px]">
      {words.map((word, index) => (
        <li
          key={word.id}
          aria-hidden={index > 0 ? true : undefined}
          className={cn(
            'rounded-2xl border-[1.5px] border-border-subtle bg-surface p-3.5 shadow-[0_6px_24px_rgba(20,23,31,0.07)] transition-transform duration-200 hover:rotate-0 motion-reduce:transform-none max-sm:rotate-0',
            HOME_STACK_ROTATION[index],
            index > 0 && 'hidden sm:block',
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-text-main">{word.word}</p>
              <p className="truncate font-mono text-[10px] text-text-secondary">
                {getVocabHint(word)}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              Caja {word.box}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
