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
      <CardBase as="article" padding="md" className="flex h-full flex-col gap-3">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {phrase.contextTag}
        </span>

        <p className="text-[1.0625rem] font-bold leading-snug text-text-main">{phrase.en}</p>

        <p className="text-sm text-text-secondary">{phrase.es}</p>

        {phrase.note != null && (
          <p className="rounded-md bg-bg-page px-3 py-2 text-xs text-text-secondary">
            {phrase.note}
          </p>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCopy(phrase.id, phrase.en)}
            aria-label={isCopied ? 'Copiado' : 'Copiar frase'}
          >
            {isCopied ? (
              <>
                <Check size={14} weight="bold" className="text-success" />
                <span className="text-success">Copiado</span>
              </>
            ) : (
              <>
                <Copy size={14} weight="bold" aria-hidden />
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
