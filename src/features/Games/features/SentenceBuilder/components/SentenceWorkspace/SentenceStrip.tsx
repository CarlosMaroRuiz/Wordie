import { motion, AnimatePresence } from 'motion/react'
import { CursorClick } from '@phosphor-icons/react'
import {
  CHIP_BASE,
  CHIP_PLACED_CORRECT,
  CHIP_PLACED_IDLE,
  CHIP_PLACED_WRONG,
  CHIP_VARIANTS,
} from '../../constant'
import type { SentenceStripProps } from './type'

export function SentenceStrip({ placedChips, gameStatus, onRemoveChip }: SentenceStripProps) {
  const isCorrect = gameStatus === 'correct'
  const isIncorrect = gameStatus === 'incorrect'

  return (
    <div
      className={`flex min-h-16 max-h-32 flex-wrap content-start items-center gap-2 overflow-y-auto overscroll-contain rounded-2xl border-2 border-dashed p-3 transition-colors sm:min-h-20 sm:max-h-none sm:p-4 ${
        placedChips.length === 0
          ? 'border-border-subtle bg-surface-muted/40'
          : 'border-primary/40 bg-surface shadow-soft'
      }`}
    >
      {placedChips.length === 0 ? (
        <p className="flex w-full items-center justify-center gap-1.5 px-2 text-center text-[13px] font-semibold leading-snug text-text-tertiary select-none sm:text-xs">
          <CursorClick size={16} className="shrink-0 text-primary" />
          <span>Toca las palabras del banco inferior para armar la oración</span>
        </p>
      ) : (
        <AnimatePresence mode="popLayout">
          {placedChips.map(chip => (
            <motion.button
              key={chip.id}
              layout
              variants={CHIP_VARIANTS}
              initial="hidden"
              animate="show"
              exit="exit"
              type="button"
              onClick={() => onRemoveChip(chip)}
              disabled={isCorrect}
              title="Toca para regresar al banco"
              aria-label={`Quitar palabra ${chip.text}`}
              className={`${CHIP_BASE} ${
                isCorrect
                  ? CHIP_PLACED_CORRECT
                  : isIncorrect
                    ? CHIP_PLACED_WRONG
                    : CHIP_PLACED_IDLE
              } ${isCorrect ? 'cursor-default' : ''}`}
            >
              {chip.text}
            </motion.button>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}
