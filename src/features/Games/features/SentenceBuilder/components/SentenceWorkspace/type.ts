import type { GameStatus, WordChip } from '../../type'

export interface SentenceStripProps {
  placedChips: WordChip[]
  gameStatus: GameStatus
  onRemoveChip: (chip: WordChip) => void
}

export interface WordBankProps {
  availableChips: WordChip[]
  gameStatus: GameStatus
  onPlaceChip: (chip: WordChip) => void
}
