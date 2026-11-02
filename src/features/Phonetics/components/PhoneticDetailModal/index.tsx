import { LightbulbFilamentIcon, SpeakerHighIcon } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { CATEGORY_BADGE_STYLE, CATEGORY_LABEL } from '../../constant'
import type { PhoneticDetailModalProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PhoneticDetailModal({
  item,
  onClose,
  onSpeak,
}: PhoneticDetailModalProps) {
  if (!item) return null

  return (
    <ModalBase
      open={Boolean(item)}
      onClose={onClose}
      size="md"
      scrollable
      title={
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-extrabold text-primary">
            {item.symbol}
          </span>
          <div>
            <span className="block text-lg font-bold text-text-main">
              {item.name}
            </span>
            <span
              className={cn(
                'mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border',
                CATEGORY_BADGE_STYLE[item.category],
              )}
            >
              {CATEGORY_LABEL[item.category]}
            </span>
          </div>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
            Cómo articular el sonido
          </h3>
          <p className="mt-1 leading-relaxed text-text-secondary">
            {item.description}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-text-secondary">
          <div className="mb-1 flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <LightbulbFilamentIcon size={16} weight="fill" />
            <span>Consejo para hispanohablantes</span>
          </div>
          <p className="leading-relaxed">{item.tip}</p>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
            Palabras de ejemplo (Clic para escuchar)
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.examples.map((ex) => (
              <button
                key={ex.word}
                type="button"
                onClick={() => onSpeak(ex.word)}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-muted/50 p-2.5 text-left transition hover:border-primary/40 hover:bg-surface-muted focus:outline-none cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-text-main">
                    <span>{ex.word}</span>
                    <span className="text-text-tertiary">{ex.phonetic}</span>
                  </div>
                  <span className="text-[11px] text-text-secondary">{ex.es}</span>
                </div>
                <SpeakerHighIcon size={16} weight="bold" className="shrink-0 text-primary" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalBase>
  )
}

export type { PhoneticDetailModalProps } from './type'
