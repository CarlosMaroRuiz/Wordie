import { motion } from 'motion/react'
import { CHIP_BANK, CHIP_BASE } from '../../constant'
import type { WordBankProps } from './type'

export function WordBank({ availableChips, gameStatus, onPlaceChip }: WordBankProps) {
  const isCorrect = gameStatus === 'correct'

  return (
    <div className="flex flex-col gap-2 rounded-[24px] border border-border-subtle bg-surface/90 p-3 shadow-soft sm:p-4">
      <span className="text-xs font-bold text-text-secondary">
        Banco de palabras
      </span>

      <div className="flex min-h-14 max-h-36 flex-wrap items-center gap-2 overflow-y-auto overscroll-contain sm:min-h-16 lg:max-h-none">
        {availableChips.length === 0 ? (
          <p className="text-xs italic font-semibold text-text-tertiary select-none">
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
