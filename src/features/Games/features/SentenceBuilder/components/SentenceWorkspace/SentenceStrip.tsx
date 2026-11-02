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
      className={`flex max-h-20 min-h-14 flex-wrap content-start items-center gap-2 overflow-y-auto overscroll-contain rounded-xl border border-dashed p-2.5 transition-colors sm:min-h-20 sm:p-3 lg:max-h-none ${
        placedChips.length === 0
          ? 'border-border-subtle/80 bg-bg-page/50'
          : 'border-primary/30 bg-surface'
      }`}
    >
      {placedChips.length === 0 ? (
        <p className="flex w-full items-center justify-center gap-1.5 px-2 text-center text-[13px] leading-snug text-text-tertiary select-none sm:text-xs">
          <CursorClick size={16} className="shrink-0" />
          <span>Toca las palabras de abajo para armar la frase</span>
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
