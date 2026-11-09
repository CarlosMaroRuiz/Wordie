import type { Variants } from 'motion/react'
import type { TenseId, TenseOption } from './type'

export const ROUNDS_PER_GAME = 5

export const OPTIONS_PER_ROUND = 4

export const TENSE_CATALOG: TenseOption[] = [
  { id: 'present-simple', label: 'Present Simple' },
  { id: 'present-continuous', label: 'Present Continuous' },
  { id: 'present-perfect', label: 'Present Perfect' },
  { id: 'past-simple', label: 'Past Simple' },
  { id: 'past-continuous', label: 'Past Continuous' },
  { id: 'past-perfect', label: 'Past Perfect' },
  { id: 'future-will', label: 'Future (will)' },
  { id: 'going-to', label: 'Going to' },
]

/** Pista corta de cada tiempo para el modal de ayuda. */
export const TENSE_CUE: Record<TenseId, string> = {
  'present-simple': 'Rutinas y horarios: every day, on Mondays, at nine.',
  'present-continuous': 'Algo en curso: right now, at the moment, this week.',
  'present-perfect': 'Pasado con efecto presente: already, just, yet, ever, since.',
  'past-simple': 'Momento pasado cerrado: yesterday, last week, two days ago.',
  'past-continuous': 'Acción de fondo interrumpida: was/were + -ing.',
  'past-perfect': 'Un pasado anterior a otro pasado: had + participio.',
  'future-will': 'Decisión o promesa: will + verbo base.',
  'going-to': 'Plan ya decidido: be going to + verbo base.',
}

/** Etiqueta legible de un tiempo, para no repetir el `find` en cada componente. */
export function tenseLabel(id: TenseId): string {
  return TENSE_CATALOG.find(option => option.id === id)?.label ?? id
}

export const OPTION_BASE =
  'flex min-h-12 w-full touch-manipulation items-center justify-between gap-2 rounded-2xl border-[1.5px] px-4 py-3 text-left text-sm font-bold transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default active:scale-[0.98]'

export const OPTION_IDLE =
  'border-border-subtle bg-surface text-text-main hover:border-primary hover:bg-primary-light/40'

export const OPTION_CORRECT = 'border-success/40 bg-success-light text-success'

export const OPTION_WRONG = 'border-error/40 bg-error-light text-error'

export const OPTION_DIM = 'border-border-subtle bg-surface text-text-tertiary opacity-60'

export const HIGHLIGHT =
  'rounded-md bg-primary/15 px-1.5 font-extrabold text-primary decoration-2 underline-offset-4'

export const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
}
