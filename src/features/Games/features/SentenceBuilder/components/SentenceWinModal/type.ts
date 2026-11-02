export interface SentenceWinModalProps {
  open: boolean
  score: number
  streak: number
  mistakes: number
  totalRounds: number
  onPlayAgain: () => void
  onClose: () => void
}
