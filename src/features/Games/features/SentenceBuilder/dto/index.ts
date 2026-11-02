export interface SentenceDTO {
  id: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  es: string
  enWords: string[]
  distractors?: string[]
  hint?: string
  explanation?: string
}
