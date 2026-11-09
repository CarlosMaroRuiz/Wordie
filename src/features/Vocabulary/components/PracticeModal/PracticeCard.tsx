import { motion, AnimatePresence } from 'motion/react'
import { Check, ArrowClockwise } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { PracticeCardProps } from './type'

export function PracticeCard({
  card,
  currentIndex,
  totalCards,
  isRevealed,
  onReveal,
  onNext,
}: PracticeCardProps) {
  return (
    <>
      <div className="mb-4 text-center text-xs sm:text-sm font-bold text-text-secondary">
        Tarjeta {currentIndex + 1} de {totalCards}
      </div>

      <div className="relative flex flex-grow items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center rounded-[28px] border border-border-subtle bg-surface p-6 sm:p-8 text-center shadow-soft"
          >
            <h2 className="mb-1 text-3xl sm:text-4xl font-black text-text-main">{card.word}</h2>
            <p className="mb-6 font-mono text-base text-text-secondary">{card.phonetic}</p>

            <div className="relative flex min-h-[140px] w-full flex-col items-center justify-center">
              {!isRevealed && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl border border-border-subtle/80 bg-surface/90 backdrop-blur-xs p-4">
                  <Button variant="primary" size="md" onClick={onReveal} className="rounded-full shadow-brand">
                    Mostrar respuesta
                  </Button>
                </div>
              )}

              <div
                className={`w-full transition-opacity duration-200 ${
                  !isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <p className="mb-4 text-2xl font-black text-primary">{card.translation}</p>

                {card.definition && (
                  <div className="mb-3 w-full rounded-2xl border border-border-subtle/60 bg-surface-muted/50 p-3.5 text-left">
                    <p className="mb-0.5 text-xs font-bold text-text-secondary">Definición</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-text-main">{card.definition}</p>
                  </div>
                )}

                {card.examples[0] && (
                  <div className="w-full rounded-2xl border border-border-subtle/60 bg-surface-muted/50 p-3.5 text-left">
                    <p className="mb-0.5 text-xs font-bold text-text-secondary">Ejemplo</p>
                    <p className="mb-0.5 text-xs sm:text-sm font-bold text-text-main italic">
                      "{card.examples[0].en}"
                    </p>
                    <p className="text-xs text-text-secondary">"{card.examples[0].es}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-2 gap-3.5"
        >
          <Button
            variant="danger"
            size="md"
            onClick={() => onNext('hard')}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <ArrowClockwise weight="bold" size={18} />
            <span>Difícil</span>
          </Button>
          <Button
            variant="success"
            size="md"
            onClick={() => onNext('easy')}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <Check weight="bold" size={18} />
            <span>Fácil</span>
          </Button>
        </motion.div>
      )}
    </>
  )
}
