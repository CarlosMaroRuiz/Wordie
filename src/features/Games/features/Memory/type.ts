import type { MemoryPairDTO } from './dto'

export type RawMemoryPair = MemoryPairDTO

export interface MemoryCardItem {
  uid: string
  pairId: string
  text: string
  lang: 'en' | 'es'
  phonetic?: string
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryGameStats {
  moves: number
  matches: number
  totalPairs: number
  seconds: number
  isWon: boolean
}

export type { MemoryPairDTO }
