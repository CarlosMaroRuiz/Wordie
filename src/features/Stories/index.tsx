import { SkeletonPage } from '@common/components/SkeletonPage'
import { ErrorState } from '@common/components/ErrorState'
import { useStories } from './hooks/useStories'
import { StorySelector } from './components/StorySelector'
import { StoryCard } from './components/StoryCard'
import { StoryGlossary } from './components/StoryGlossary'
import { StoryQuiz } from './components/StoryQuiz'

export default function Stories() {
  const {
    stories,
    currentStory,
    selectedStoryId,
    setSelectedStoryId,
    activeTopic,
    setActiveTopic,
    selectedKeyword,
    setSelectedKeyword,
    isNarrating,
    toggleNarration,
    quizAnswers,
    selectQuizAnswer,
    resetQuiz,
    quizScore,
    isLoading,
    error,
    refetch,
  } = useStories()

  if (isLoading) {
    return <SkeletonPage />
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <ErrorState
          title="Error al cargar lecturas"
          message={error.message}
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
      {/* Encabezado y selector de historias */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
          Lectura técnica guiada
        </h1>
        <p className="text-sm text-text-secondary">
          Historias y situaciones del día a día laboral con glosario y quiz integrado.
        </p>

        <div className="mt-3">
          <StorySelector
            stories={stories}
            selectedStoryId={selectedStoryId}
            activeTopic={activeTopic}
            onSelectStory={setSelectedStoryId}
            onSelectTopic={setActiveTopic}
          />
        </div>
      </div>

      {/* Cuadrícula responsiva: lectura (65ch) + glosario y quiz pegajoso */}
      {currentStory ? (
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="w-full">
            <StoryCard
              story={currentStory}
              selectedKeyword={selectedKeyword}
              onSelectKeyword={setSelectedKeyword}
              isNarrating={isNarrating}
              onToggleNarration={toggleNarration}
            />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20">
            <StoryGlossary
              keywords={currentStory.keywords}
              selectedKeyword={selectedKeyword}
              onSelectKeyword={setSelectedKeyword}
            />

            <StoryQuiz
              quiz={currentStory.quiz}
              answers={quizAnswers}
              score={quizScore}
              onSelectAnswer={selectQuizAnswer}
              onResetQuiz={resetQuiz}
            />
          </aside>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border-subtle p-8 text-center text-text-secondary">
          No hay historias disponibles para el tema seleccionado.
        </div>
      )}
    </section>
  )
}
