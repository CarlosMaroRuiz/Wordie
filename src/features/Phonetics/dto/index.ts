export type PhoneticCategory =
  | 'short-vowel'
  | 'long-vowel'
  | 'diphthong'
  | 'consonant-voiceless'
  | 'consonant-voiced'

export type SoundType = 'vowel' | 'diphthong' | 'consonant'

export interface PhoneticExampleDTO {
  word: string
  phonetic: string
  es: string
}

export interface PhoneticItemDTO {
  id: string
  symbol: string
  name: string
  category: PhoneticCategory
  soundType: SoundType
  description: string
  tip: string
  examples: PhoneticExampleDTO[]
}
