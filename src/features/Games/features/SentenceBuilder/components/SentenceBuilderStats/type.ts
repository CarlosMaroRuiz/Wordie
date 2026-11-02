export interface SentenceBuilderStatsProps {
  currentRound: number
  totalRounds: number
  score: number
  streak: number
  mistakes: number
  isSpeaking: boolean
  onSpeak: () => void
}
