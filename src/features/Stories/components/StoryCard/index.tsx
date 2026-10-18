import { motion } from 'motion/react'
import { Clock, SpeakerHigh, Pause } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
import { Button } from '@common/Button'
import type { StoryCardProps } from './type'
import { STORY_CARD_VARIANTS } from './constant'
import { StoryParagraphs } from './StoryParagraphs'

export function StoryCard({
  story,
  selectedKeyword,
  onSelectKeyword,
  isNarrating,
  onToggleNarration,
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
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/20">
            {story.level}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-page px-3 py-1 text-xs font-semibold text-text-secondary">
            <Clock size={14} weight="bold" />
            <span>{story.readTime} de lectura</span>
          </span>
        </div>

        {/* Título de la historia */}
        <h2 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
          {story.title}
        </h2>

        {/* Párrafos interactivos */}
        <StoryParagraphs
          paragraphs={story.paragraphs}
          keywords={story.keywords}
          selectedKeyword={selectedKeyword}
          onSelectKeyword={onSelectKeyword}
        />

        {/* Pie con reproductor de audio narración */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle/60 pt-4">
          <Button
            variant={isNarrating ? 'primary' : 'secondary'}
            size="sm"
            onClick={onToggleNarration}
            className="flex items-center gap-2"
          >
            {isNarrating ? (
              <>
                <Pause size={16} weight="bold" />
                <span>Detener narración</span>
              </>
            ) : (
              <>
                <SpeakerHigh size={16} weight="bold" />
                <span>Escuchar narración completa</span>
              </>
            )}
          </Button>

          <span className="text-xs text-text-secondary">
            Haz clic en los términos resaltados para ver su traducción.
          </span>
        </div>
      </CardBase>
    </motion.article>
  )
}
