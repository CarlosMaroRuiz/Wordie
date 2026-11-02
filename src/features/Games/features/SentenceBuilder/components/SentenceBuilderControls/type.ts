import type { GameStatus } from '../../type'

export interface SentenceBuilderControlsProps {
  gameStatus: GameStatus
  hasPlacedChips: boolean
  canPlaceWordHint: boolean
  onClear: () => void
  onHintWord: () => void
  onCheck: () => void
  onNext: () => void
}
