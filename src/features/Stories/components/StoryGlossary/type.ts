import type { StoryKeywordDTO } from '../../type'

export interface StoryGlossaryProps {
  keywords: StoryKeywordDTO[]
  selectedKeyword: string | null
  onSelectKeyword: (term: string) => void
}
