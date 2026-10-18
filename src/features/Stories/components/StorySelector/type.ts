import type { StoryDTO, StoryTopic } from '../../type'

export interface StorySelectorProps {
  stories: StoryDTO[]
  selectedStoryId: string | null
  activeTopic: StoryTopic
  onSelectStory: (id: string) => void
  onSelectTopic: (topic: StoryTopic) => void
}
