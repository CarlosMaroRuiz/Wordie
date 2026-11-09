import { motion } from 'motion/react'
import { Copy, Check } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { Button } from '@common/Button'
import { AudioButton } from '@common/components/AudioButton'
import { ITEM_VARIANTS } from './constant'
import type { PhraseCardProps } from './type'

export function PhraseCard({ phrase, copiedId, onCopy }: PhraseCardProps) {
  const isCopied = copiedId === phrase.id

  return (
    <motion.div variants={ITEM_VARIANTS}>
      <CardBase as="article" padding="md" className="flex h-full flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-black text-primary shadow-soft">
            {phrase.contextTag}
          </span>
        </div>

        <p className="text-lg font-black leading-snug text-text-main">{phrase.en}</p>

        <p className="text-sm font-semibold text-text-secondary">{phrase.es}</p>

        {phrase.note != null && (
          <p className="rounded-2xl border border-border-subtle/60 bg-surface-muted/60 p-3 text-xs leading-relaxed text-text-secondary">
            {phrase.note}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onCopy(phrase.id, phrase.en)}
            aria-label={isCopied ? 'Copiado' : 'Copiar frase'}
            className="rounded-full"
          >
            {isCopied ? (
              <>
                <Check size={16} weight="bold" className="text-success" />
                <span className="text-success font-bold">Copiado</span>
              </>
            ) : (
              <>
                <Copy size={16} weight="bold" aria-hidden="true" />
                <span>Copiar</span>
              </>
            )}
          </Button>

          <AudioButton text={phrase.en} appearance="outlined" label="Pronunciar frase" />
        </div>
      </CardBase>
    </motion.div>
  )
}
