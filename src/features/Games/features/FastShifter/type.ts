import type { FastShifterDTO, ShiftSlotTokenDTO } from './dto'

export type ReflexSpeed = 'native' | 'fluent' | 'analytical'

export interface ReflexRating {
  speed: ReflexSpeed
  label: string
  multiplier: number
  colorClass: string
}

export type SlotAnswers = Record<string, string>

export interface FastShifterStats {
  score: number
  streak: number
  bestStreak: number
  correctCount: number
  nativeReflexCount: number
}

export interface ShiftPromptProps {
  baseSentence: string
  shiftInstruction: string
  shiftType: string
}

export interface SlotTokenProps {
  slot: ShiftSlotTokenDTO
  value: string | undefined
  isSelected: boolean
  isEvaluated: boolean
  isCorrect: boolean
  onClick: () => void
}

export interface MorphingSentenceProps {
  tokens: FastShifterDTO['tokens']
  answers: SlotAnswers
  activeSlotId: string | null
  isAnswered: boolean
  onSelectSlot: (slotId: string) => void
}

export interface ThumbPaletteProps {
  activeSlot: ShiftSlotTokenDTO | null
  selectedAnswer: string | undefined
  disabled: boolean
  onChooseOption: (option: string) => void
}

export interface ShiftFeedbackProps {
  isCorrect: boolean
  trapExplanation: string
  fullCorrect: string
  translation: string
  reflexRating?: ReflexRating
}
