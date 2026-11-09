export type TenseId =
  | 'present-simple'
  | 'present-continuous'
  | 'present-perfect'
  | 'past-simple'
  | 'past-continuous'
  | 'past-perfect'
  | 'future-will'
  | 'going-to'

/** Contrato de `/public/data/tenses.json`. */
export interface TenseItemDTO {
  id: string
  topic: string
  level: string
  sentence: string
  verb: string
  tense: TenseId
  es: string
  explanation: string
}

export interface TenseOption {
  id: TenseId
  label: string
}

/** Pregunta ya preparada para renderizar: incluye sus 4 opciones barajadas. */
export interface TenseQuestion {
  id: string
  level: string
  sentence: string
  verb: string
  correctTense: TenseId
  translation: string
  explanation: string
  options: TenseOption[]
}

export type OptionState = 'idle' | 'correct' | 'wrong' | 'dim'
