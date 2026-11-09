import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { SLIDER_VARIANTS } from './constant'
import type { FormulaSliderProps } from './type'

export function FormulaSlider({ formulas }: FormulaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (formulas.length === 0) return null

  const current = formulas[currentIndex] ?? formulas[0]

  const goTo = (index: number) => {
    if (index === currentIndex) return
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1)
    } else {
      // Ciclar al final
      setDirection(-1)
      setCurrentIndex(formulas.length - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < formulas.length - 1) {
      goTo(currentIndex + 1)
    } else {
      // Ciclar al inicio
      setDirection(1)
      setCurrentIndex(0)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Controles de navegación y pestañas superiores */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {formulas.map((f, i) => {
            const isActive = i === currentIndex
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => goTo(i)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {formulas.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              title="Estructura anterior"
              aria-label="Estructura anterior"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-surface text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-main cursor-pointer"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <span className="px-1 text-xs font-semibold text-text-secondary select-none">
              {currentIndex + 1} / {formulas.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              title="Siguiente estructura"
              aria-label="Siguiente estructura"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-surface text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-main cursor-pointer"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>

      {/* Cuadro principal interactivo deslizable */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-xs sm:p-7">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current.label}
            custom={direction}
            variants={SLIDER_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) handleNext()
              else if (info.offset.x > 50) handlePrev()
            }}
            className="cursor-grab active:cursor-grabbing flex flex-col justify-center"
          >
            <div className="flex items-center justify-between gap-2 border-b border-primary/15 pb-2.5">
              <span className="text-xs font-bold text-primary">
                Estructura: {current.label}
              </span>
              <span className="text-[11px] font-medium text-text-secondary select-none hidden sm:inline">
                Desliza hacia los lados ↔
              </span>
            </div>

            <p className="mt-4 text-base sm:text-lg lg:text-xl font-bold font-mono text-primary leading-relaxed break-words select-text">
              {current.value}
            </p>

            {/* Espacio base para interactividad personalizada */}
            <div className="mt-3 flex items-center justify-end">
              <div className="flex gap-1.5">
                {formulas.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentIndex ? 'w-5 bg-primary' : 'w-1.5 bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
