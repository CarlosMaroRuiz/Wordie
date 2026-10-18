import type { HomeStory } from '../../type'

export interface StoryOfDayCardProps {
  story: HomeStory | null
  isLoading: boolean
  hasError: boolean
  className?: string
}
