import type { Variants } from 'motion/react'
import type { IntruderCategory } from './type'

export const ROUNDS_PER_GAME = 5

export const CATEGORY_LABEL: Record<IntruderCategory, string> = {
  'redundant-preposition': 'Preposición redundante',
  'redundant-adverb': 'Adverbio redundante',
  'double-comparative': 'Doble comparativo',
  'duplicated-subject': 'Sujeto duplicado',
  'redundant-noun': 'Sustantivo redundante',
  'extra-article': 'Artículo sobrante',
}

/** Pista de cada categoría para el modal de ayuda. */
export const CATEGORY_CUE: Record<IntruderCategory, string> = {
  'redundant-preposition':
    'Verbos transitivos que no llevan preposición: discuss, contact, emphasize, mention.',
  'redundant-adverb':
    'El verbo ya contiene la idea: return back, repeat again, merge together, reply back.',
  'double-comparative': 'Un comparativo no admite "more" delante: more better, more faster.',
  'duplicated-subject': 'El sujeto se repite con un pronombre: "The client he approved".',
  'redundant-noun': 'Dos sustantivos dicen lo mismo: past history, fee price, salary pay.',
  'extra-article': 'Artículo de más: the Rome, by the train, go to the work, the honesty.',
}

/** Orden de presentación de las categorías en la ayuda. */
export const CATEGORY_ORDER = [
  'redundant-preposition',
  'redundant-adverb',
  'double-comparative',
  'duplicated-subject',
  'redundant-noun',
  'extra-article',
] as const satisfies readonly IntruderCategory[]

export const TOKEN_BASE =
  'inline-flex min-h-11 min-w-[2.75rem] cursor-pointer touch-manipulation select-none items-center justify-center rounded-2xl border-2 border-transparent px-3.5 py-1.5 text-base font-black transition-all focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:cursor-default active:scale-95 sm:text-lg'

export const TOKEN_IDLE =
  'border-border-subtle bg-surface text-text-main shadow-soft hover:border-primary/50 hover:bg-primary/10 hover:text-primary'

export const TOKEN_CORRECT = 'border-success/40 bg-success-light text-success shadow-soft'

export const TOKEN_WRONG = 'border-error/40 bg-error-light text-error shadow-soft'

export const TOKEN_PLAIN = 'border-transparent bg-transparent text-text-main opacity-80'

export const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
}
