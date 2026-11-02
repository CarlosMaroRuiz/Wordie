import type { StoryDTO } from '../../type'

export interface StorySelectorProps {
  stories: StoryDTO[]
  selectedStoryId: string | null
  onSelectStory: (id: string) => void
}
