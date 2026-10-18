import { useNavigate } from 'react-router-dom'
import { useTourStore } from '@common/components/OnboardingTour/hooks/useTourStore'
import { PATHS } from '@core/routes/types/paths'
import { HomeHero } from './components/HomeHero'
import { LibraryStats } from './components/LibraryStats'
import { ModuleGrid } from './components/ModuleGrid'
import { PhraseOfDayCard } from './components/PhraseOfDayCard'
import { ReviewWordsCard } from './components/ReviewWordsCard'
import { SectionHead } from './components/SectionHead'
import { StoryOfDayCard } from './components/StoryOfDayCard'
import { VocabProgressCard } from './components/VocabProgressCard'
import {
  HOME_COPY,
  HOME_GRID,
  HOME_SECTION,
  HOME_SPAN_5,
  HOME_SPAN_7,
} from './constant'
import { useHomeStats } from './hooks/useHomeStats'

export default function Home() {
  const navigate = useNavigate()
  const startTour = useTourStore(state => state.start)
  const tourSeen = useTourStore(state => state.seen)
  const { counts, vocab, reviewWords, previewWords, phrase, story, isLoading, error } =
    useHomeStats()

  return (
    <div className="flex flex-col gap-10 pb-14 pt-4 sm:gap-14 sm:pt-8">
      <HomeHero
        previewWords={previewWords}
        isLoadingPreview={isLoading.vocab}
        tourSeen={tourSeen}
        onStart={() => navigate(PATHS.Vocabulary)}
        onStartTour={startTour}
      />

      <section aria-labelledby="home-progress-title" className={HOME_SECTION}>
        <SectionHead
          id="home-progress-title"
          title={HOME_COPY.progressTitle}
          hint={HOME_COPY.progressHint}
        />
        <div className={HOME_GRID}>
          <VocabProgressCard
            className={HOME_SPAN_7}
            stats={vocab}
            isLoading={isLoading.vocab}
            hasError={error.vocab}
            onPractice={() => navigate(PATHS.Vocabulary)}
          />
          <ReviewWordsCard
            className={HOME_SPAN_5}
            words={reviewWords}
            isLoading={isLoading.vocab}
            hasError={error.vocab}
          />
        </div>
      </section>

      <section aria-labelledby="home-daily-title" className={HOME_SECTION}>
        <SectionHead
          id="home-daily-title"
          title={HOME_COPY.dailyTitle}
          hint={HOME_COPY.dailyHint}
        />
        <div className={HOME_GRID}>
          <PhraseOfDayCard
            className={HOME_SPAN_7}
            phrase={phrase}
            isLoading={isLoading.counts}
            hasError={error.counts}
          />
          <LibraryStats
            className={HOME_SPAN_5}
            counts={counts}
            isLoading={isLoading.counts}
            hasError={error.counts}
          />
        </div>
      </section>

      <section aria-labelledby="home-story-section" className={HOME_SECTION}>
        <SectionHead
          id="home-story-section"
          title={HOME_COPY.storyTitle}
          hint={HOME_COPY.storyHint}
        />
        <StoryOfDayCard
          story={story}
          isLoading={isLoading.counts}
          hasError={error.counts}
        />
      </section>

      <section aria-labelledby="home-modules-title" className={HOME_SECTION}>
        <SectionHead
          id="home-modules-title"
          title={HOME_COPY.modulesTitle}
          hint={HOME_COPY.modulesHint}
        />
        <ModuleGrid />
      </section>
    </div>
  )
}

