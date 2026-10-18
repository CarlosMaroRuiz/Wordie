import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CardBase } from '@common/CardBase'
import { PATHS } from '@core/routes/types/paths'
import { cn } from '../../cn'
import {
  HOME_COPY,
  HOME_PILL,
  HOME_SKELETON,
  STORY_COVER_BASE,
  STORY_SIZES,
} from '../../constant'
import type { StoryOfDayCardProps } from './type'

export function StoryOfDayCard({ story, isLoading, hasError, className }: StoryOfDayCardProps) {
  const emptyMessage = hasError ? HOME_COPY.storyError : HOME_COPY.storyEmpty

  return (
    <CardBase
      as="article"
      padding="none"
      aria-labelledby="home-story-title"
      aria-busy={isLoading}
      className={cn('group relative grid overflow-hidden lg:grid-cols-12', className)}
    >
      <div className="relative aspect-[3/2] w-full bg-primary-light lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-[380px]">
        {isLoading ? (
          <div className={cn(HOME_SKELETON, 'h-full w-full rounded-none')} aria-hidden="true" />
        ) : (
          <img
            src={`${STORY_COVER_BASE}-1080.webp`}
            srcSet={`${STORY_COVER_BASE}-540.webp 540w, ${STORY_COVER_BASE}-810.webp 810w, ${STORY_COVER_BASE}-1080.webp 1080w`}
            sizes={STORY_SIZES}
            width={1080}
            height={720}
            alt="Libro abierto con páginas y figuras de papel flotando"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-3 p-5 sm:p-6 lg:order-1 lg:col-span-5 lg:justify-center">
        {isLoading ? (
          <div className="flex gap-2" aria-hidden="true">
            <div className={cn(HOME_SKELETON, 'h-6 w-20')} />
            <div className={cn(HOME_SKELETON, 'h-6 w-16')} />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className={HOME_PILL}>
              {story ? `${HOME_COPY.storyLevel} ${story.level}` : HOME_COPY.storyTitle}
            </span>
            {story ? <span className={HOME_PILL}>{story.readTime}</span> : null}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-2" aria-hidden="true">
            <div className={cn(HOME_SKELETON, 'h-6 w-4/5')} />
            <div className={cn(HOME_SKELETON, 'h-4 w-full')} />
            <div className={cn(HOME_SKELETON, 'h-4 w-2/3')} />
          </div>
        ) : (
          <>
            <h3
              id="home-story-title"
              className="text-xl font-extrabold leading-tight tracking-tight text-text-main sm:text-2xl"
            >
              {story ? story.title : emptyMessage}
            </h3>
            {story ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
                {story.excerpt}
              </p>
            ) : null}
          </>
        )}

        {story ? (
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
            {HOME_COPY.storyReading}
            <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      {story ? (
        <Link
          to={PATHS.Stories}
          aria-label={`Leer ${story.title}`}
          className="absolute inset-0 rounded-[22px] outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      ) : null}
    </CardBase>
  )
}
