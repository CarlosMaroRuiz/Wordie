import { motion } from 'motion/react'
import { Clock } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { Badge } from '@common/components/Badge'
import type { StoryCardProps } from './type'
import { STORY_CARD_VARIANTS } from './constant'
import { StoryParagraphs } from './StoryParagraphs'
import { StoryAudioControls } from './StoryAudioControls'

export function StoryCard({
  story,
  selectedKeyword,
  onSelectKeyword,
  isNarrating,
  narratingParagraphIndex,
  narratingCharIndex,
  onToggleNarration,
  playbackRate,
  onPlaybackRateChange,
}: StoryCardProps) {
  return (
    <motion.article
      variants={STORY_CARD_VARIANTS}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <CardBase padding="md" className="flex flex-col gap-4">
        {/* Metadatos superiores */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/60 pb-3">
          <Badge tone="primary-tint" size="md">
            {story.level}
          </Badge>
          <Badge
            tone="outline"
            size="md"
            weight="semibold"
            className="gap-1.5"
            icon={<Clock size={14} weight="bold" />}
          >
            {story.readTime} de lectura
          </Badge>
        </div>

        {/* Título de la historia */}
        <h2 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
          {story.title}
        </h2>

        {/* Párrafos interactivos con marcado en vivo */}
        <StoryParagraphs
          paragraphs={story.paragraphs}
          keywords={story.keywords}
          selectedKeyword={selectedKeyword}
          isNarrating={isNarrating}
          narratingParagraphIndex={narratingParagraphIndex}
          narratingCharIndex={narratingCharIndex}
          onSelectKeyword={onSelectKeyword}
        />

        {/* Barra integrada de reproducción y configuración de audio */}
        <StoryAudioControls
          isNarrating={isNarrating}
          onToggleNarration={onToggleNarration}
          playbackRate={playbackRate}
          onPlaybackRateChange={onPlaybackRateChange}
        />
      </CardBase>
    </motion.article>
  )
}
