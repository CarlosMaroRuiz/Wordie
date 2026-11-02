import type { GrammarTopic } from '@features/Grammar/types'
import type { GrammarFormulaDTO } from '@features/Grammar/dto'

export type BannerProps = Pick<
  GrammarTopic,
  'title' | 'category' | 'level' | 'explanation' | 'formula' | 'formulas'
>

export interface FormulaSliderProps {
  formulas: GrammarFormulaDTO[]
}
