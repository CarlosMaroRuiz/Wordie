import { Chip } from '@common/Chip'
import { ChipRow } from '@common/components/ChipRow'
import type { StorySelectorProps } from './type'

export function StorySelector({
  stories,
  selectedStoryId,
  onSelectStory,
}: StorySelectorProps) {
  if (stories.length <= 1) {
    return null
  }

  return (
    <ChipRow as="nav" label="Historias disponibles">
      {stories.map(story => (
        <Chip
          key={story.id}
          active={story.id === selectedStoryId}
          onClick={() => onSelectStory(story.id)}
        >
          {story.title}
          <span className="ml-2 opacity-60">· {story.readTime}</span>
        </Chip>
      ))}
    </ChipRow>
  )
}
