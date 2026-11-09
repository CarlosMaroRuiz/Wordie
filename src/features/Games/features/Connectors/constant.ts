import type { ConnectorPattern, ConnectorRelation } from './type'

/** Cada tema tiene 5 párrafos: la ronda los baraja y usa los 5 (15 costuras). */
export const ROUNDS_PER_GAME = 5

export const RELATION_LABEL: Record<ConnectorRelation, string> = {
  contrast: 'Contraste',
  concession: 'Concesión',
  cause: 'Causa',
  consequence: 'Consecuencia',
  addition: 'Adición',
  example: 'Ejemplo',
  sequence: 'Secuencia',
  condition: 'Condición',
}

export const RELATION_CUE: Record<ConnectorRelation, string> = {
  contrast: 'Dos ideas opuestas: however, on the other hand, in contrast.',
  concession: 'Una objeción que no cambia el resultado: although, even though, despite.',
  cause: 'El motivo: because, since, due to.',
  consequence: 'El efecto: therefore, as a result, consequently.',
  addition: 'Suma información: moreover, furthermore, in addition.',
  example: 'Concreta lo dicho: for example, for instance, such as.',
  sequence: 'Ordena en el tiempo: first, then, afterwards, finally.',
  condition: 'Pone una condición: if, unless, otherwise.',
}

export const PATTERN_LABEL: Record<ConnectorPattern, string> = {
  clause: '+ cláusula',
  noun: '+ sustantivo / -ing',
}

export const TRAP_LABEL = {
  relación: 'Encajaba la gramática, pero no la relación.',
  patrón: 'Encajaba la idea, pero no la estructura.',
} as const

export const RELATION_ORDER: ConnectorRelation[] = [
  'contrast',
  'concession',
  'cause',
  'consequence',
  'addition',
  'example',
  'sequence',
  'condition',
]

export const SLOT_BASE =
  'inline-flex min-h-11 cursor-pointer touch-manipulation select-none items-center justify-center rounded-2xl border-2 px-3.5 py-1.5 text-sm font-black transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default active:scale-95 sm:text-base'

export const SLOT_EMPTY =
  'border-dashed border-border-subtle bg-surface-muted/40 text-text-tertiary hover:border-primary hover:text-primary'

export const SLOT_FILLED = 'border-primary bg-primary-light text-primary shadow-soft'

export const SLOT_CORRECT = 'border-success bg-success-light text-success shadow-soft'

export const SLOT_WRONG = 'border-error bg-error-light text-error shadow-soft'

export const SLOT_ACTIVE = 'ring-2 ring-primary/40'

export const CARD_BASE =
  'flex min-h-14 w-full cursor-pointer touch-manipulation flex-col items-start justify-center gap-1 rounded-2xl border-2 p-3.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98]'

export const CARD_IDLE =
  'border-border-subtle bg-surface shadow-soft hover:border-primary hover:bg-primary-light/40'

export const CARD_USED = 'border-primary bg-primary-light text-primary shadow-brand ring-2 ring-primary/20'
