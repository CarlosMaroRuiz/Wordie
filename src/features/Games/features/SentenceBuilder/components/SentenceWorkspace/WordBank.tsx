import { motion } from 'motion/react'
import { CHIP_BANK, CHIP_BASE } from '../../constant'
import type { WordBankProps } from './type'

export function WordBank({ availableChips, gameStatus, onPlaceChip }: WordBankProps) {
  const isCorrect = gameStatus === 'correct'

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface/60 p-2.5 shadow-xs sm:p-4">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary sm:text-xs">
        Banco de palabras
      </span>

      <div className="flex max-h-24 min-h-12 flex-wrap items-center gap-2 overflow-y-auto overscroll-contain lg:max-h-none">
        {availableChips.length === 0 ? (
          <p className="text-xs italic text-text-tertiary select-none">
            Todas las palabras han sido colocadas en la oración.
          </p>
        ) : (
          availableChips.map(chip => (
            <motion.button
              key={chip.id}
              layout
              type="button"
              onClick={() => onPlaceChip(chip)}
              disabled={isCorrect}
              title="Toca para colocar en la oración"
              aria-label={`Colocar palabra ${chip.text}`}
              className={`${CHIP_BASE} ${CHIP_BANK} disabled:pointer-events-none disabled:opacity-60`}
            >
              {chip.text}
            </motion.button>
          ))
        )}
      </div>
    </div>
  )
}
