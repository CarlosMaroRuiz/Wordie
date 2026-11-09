export type IntruderCategory =
  | 'redundant-preposition'
  | 'redundant-adverb'
  | 'double-comparative'
  | 'duplicated-subject'
  | 'redundant-noun'
  | 'extra-article'

/** Contrato de `/public/data/extra-words.json`. */
export interface IntruderItemDTO {
  id: string
  topic: string
  level: string
  words: string[]
  extraIndex: number
  extra: string
  es: string
  reason: string
  category: IntruderCategory
}

/** Ítem listo para jugar, con la oración corregida ya calculada. */
export interface IntruderQuestion {
  id: string
  level: string
  words: string[]
  extraIndex: number
  extra: string
  translation: string
  reason: string
  category: IntruderCategory
  corrected: string
}

export type TokenState = 'idle' | 'correct' | 'wrong' | 'plain'
