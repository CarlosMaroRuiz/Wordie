import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ArrowLeftIcon, SparkleIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { Button } from '@common/Button'
import {
  TOUR_BADGE,
  TOUR_DESC,
  TOUR_DOTS,
  TOUR_DOT,
  TOUR_DOT_ACTIVE,
  TOUR_FOOTER,
  TOUR_HIGHLIGHT,
  TOUR_POPOVER,
  TOUR_TITLE,
} from './constant'
import { usePopoverPosition } from './hooks/usePopoverPosition'
import { useTourStep } from './hooks/useTourStep'
import { useTourTarget } from './hooks/useTourTarget'
import type { OnboardingTourProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function OnboardingTour({ open, onClose, steps }: OnboardingTourProps) {
  const { index, step, isFirst, isLast, next, prev } = useTourStep(steps, { open, onClose })
  const { rect, position } = useTourTarget(open, step?.target, index)
  const popoverStyle = usePopoverPosition(rect, position)

  return (
    <Dialog open={open} onClose={onClose} className="relative z-60">
      <DialogBackdrop className="fixed inset-0 z-55 bg-transparent" />

      <DialogPanel className="pointer-events-none fixed inset-0 z-60">
        <DialogTitle className="sr-only">Tour de la aplicación</DialogTitle>

        {open ? (
          <>
            {rect ? (
              <div
                className={TOUR_HIGHLIGHT}
                style={{
                  position: 'fixed',
                  top: rect.top - 6,
                  left: rect.left - 6,
                  width: rect.width + 12,
                  height: rect.height + 12,
                }}
              />
            ) : (
              <div className="pointer-events-none fixed inset-0 z-55 bg-black/55" />
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={cn(TOUR_POPOVER, 'pointer-events-auto')}
              style={popoverStyle}
              role="group"
              aria-label={`Paso ${index + 1} de ${steps.length}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={TOUR_BADGE}>
                  <SparkleIcon size={13} weight="fill" aria-hidden="true" />
                  Paso {index + 1} de {steps.length}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar tour"
                  className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-primary-light hover:text-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <XIcon size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>

              <h2 className={TOUR_TITLE}>{step.title}</h2>
              <p className={TOUR_DESC}>{step.description}</p>

              <div className={TOUR_FOOTER}>
                <div className={TOUR_DOTS} aria-hidden="true">
                  {steps.map((s, i) => (
                    <span key={s.target} className={i === index ? TOUR_DOT_ACTIVE : TOUR_DOT} />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {!isFirst ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth={false}
                      onClick={prev}
                      aria-label="Paso anterior"
                    >
                      <ArrowLeftIcon size={14} weight="bold" aria-hidden="true" />
                    </Button>
                  ) : null}
                  <Button size="sm" fullWidth={false} arrow onClick={next}>
                    {isLast ? 'Terminar' : 'Siguiente'}
                  </Button>
                </div>
              </div>

              {!rect ? (
                <p className="mt-3 text-[12px] text-text-secondary">
                  Este elemento no está visible aquí; puedes continuar el tour.
                </p>
              ) : null}
            </motion.div>
          </>
        ) : null}

        <span className="sr-only" aria-live="polite">
          {open ? `Paso ${index + 1}: ${step?.title ?? ''}` : 'Tour cerrado'}
        </span>
      </DialogPanel>
    </Dialog>
  )
}

export type { OnboardingTourProps, TourStep } from './type'
