import { Chip } from '@common/Chip'
import type { StorySelectorProps } from './type'
import { TOPIC_OPTIONS } from './constant'

export function StorySelector({
  stories,
  selectedStoryId,
  activeTopic,
  onSelectStory,
  onSelectTopic,
}: StorySelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Selector de modo/tema */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtrar historias por tema">
        {TOPIC_OPTIONS.map((opt) => (
          <Chip
            key={opt.id}
            size="sm"
            active={activeTopic === opt.id}
            onClick={() => onSelectTopic(opt.id)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>

      {/* Selector de historias disponibles */}
      {stories.length > 1 && (
        <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Historias disponibles">
          {stories.map((story) => {
            const isSelected = story.id === selectedStoryId
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => onSelectStory(story.id)}
                className={`cursor-pointer rounded-xl border px-3.5 py-2 text-left text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                    : 'border-border-subtle bg-surface text-text-secondary hover:border-text-main/50'
                }`}
              >
                <span>{story.title}</span>
                <span className="ml-2 opacity-60">· {story.readTime}</span>
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}
