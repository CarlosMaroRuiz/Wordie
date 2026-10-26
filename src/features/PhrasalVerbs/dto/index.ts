export type PhrasalVerbCategory =
  | 'productivity'
  | 'problem-solving'
  | 'communication'
  | 'daily-life'

export interface PhrasalVerbExampleDTO {
  en: string
  es: string
}

export interface PhrasalVerbItemDTO {
  id: string
  verb: string
  particle: string
  phrasalVerb: string
  translation: string
  definition: string
  category: PhrasalVerbCategory
  separable: boolean
  transitive: boolean
  level: string
  examples: PhrasalVerbExampleDTO[]
  tip: string
}
