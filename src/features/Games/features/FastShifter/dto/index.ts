import type { TopicValue } from '@common/layouts/MainLayout/topics'

export type ShiftType = 'polarity' | 'tense' | 'inversion' | 'wh'

export interface ShiftTextTokenDTO {
  type: 'text'
  text: string
}

export interface ShiftSlotTokenDTO {
  type: 'slot'
  id: string
  label: string
  correct: string
  options: string[]
}

export type ShiftTokenDTO = ShiftTextTokenDTO | ShiftSlotTokenDTO

export interface FastShifterDTO {
  id: string
  topic: TopicValue
  level: string
  baseSentence: string
  shiftType: ShiftType
  shiftInstruction: string
  tokens: ShiftTokenDTO[]
  fullCorrect: string
  translation: string
  trapExplanation: string
}
