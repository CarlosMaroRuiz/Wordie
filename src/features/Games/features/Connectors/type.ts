export type ConnectorRelation =
  | 'contrast'
  | 'concession'
  | 'cause'
  | 'consequence'
  | 'addition'
  | 'example'
  | 'sequence'
  | 'condition'

/** `clause` = sujeto + verbo; `noun` = sustantivo o gerundio. */
export type ConnectorPattern = 'clause' | 'noun'

export type ConnectorTrap = 'relación' | 'patrón' | null

export interface ConnectorOptionDTO {
  text: string
  relation: ConnectorRelation
  pattern: ConnectorPattern
  trap: ConnectorTrap
}

export interface ConnectorSeamDTO {
  relation: ConnectorRelation
  answer: string
  rest: string
  options: ConnectorOptionDTO[]
  explanation: string
}

/** Contrato de `/public/data/connectors.json`. */
export interface ConnectorParagraphDTO {
  id: string
  topic: string
  level: string
  register: 'formal' | 'neutral'
  opening: string
  seams: ConnectorSeamDTO[]
}

export type SeamAnswers = Array<string | null>
