import { motion } from 'motion/react'
import { Clock, BookOpen } from '@phosphor-icons/react'
import { CardBase } from '@common/CardBase'
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
      <CardBase
        padding="md"
        className="flex flex-col gap-5 rounded-[28px] sm:rounded-[32px] border border-border-subtle bg-surface shadow-soft"
      >
        {/* 1. Metadatos superiores estilo destino de la referencia */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/60 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-black text-primary shadow-soft">
              <BookOpen size={14} weight="bold" />
              <span>Nivel {story.level}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-bold text-text-secondary shadow-soft">
              <Clock size={13} weight="bold" />
              <span>{story.readTime} de lectura</span>
            </span>
          </div>

          <span className="text-xs font-semibold text-text-secondary">
            {story.paragraphs.length} párrafos
          </span>
        </div>

        {/* 2. Título de la historia en Nunito black */}
        <h2 className="text-2xl font-black tracking-tight text-text-main sm:text-3xl">
          {story.title}
        </h2>

        {/* 3. Párrafos interactivos con marcado en vivo */}
        <StoryParagraphs
          paragraphs={story.paragraphs}
          keywords={story.keywords}
          selectedKeyword={selectedKeyword}
          isNarrating={isNarrating}
          narratingParagraphIndex={narratingParagraphIndex}
          narratingCharIndex={narratingCharIndex}
          onSelectKeyword={onSelectKeyword}
        />

        {/* 4. Barra integrada de reproducción y configuración de audio */}
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
