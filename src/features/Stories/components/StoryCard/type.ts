import type { StoryDTO } from '../../type'

export interface StoryCardProps {
  story: StoryDTO
  selectedKeyword: string | null
  onSelectKeyword: (term: string) => void
  isNarrating: boolean
  onToggleNarration: () => void
}

export interface StoryParagraphsProps {
  paragraphs: string[]
  keywords: StoryDTO['keywords']
  selectedKeyword: string | null
  onSelectKeyword: (term: string) => void
}
