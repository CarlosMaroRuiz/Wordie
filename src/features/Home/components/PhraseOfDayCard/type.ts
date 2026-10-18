import type { HomePhrase } from '../../type'

export interface PhraseOfDayCardProps {
  phrase: HomePhrase | null
  isLoading: boolean
  hasError: boolean
  className?: string
}
