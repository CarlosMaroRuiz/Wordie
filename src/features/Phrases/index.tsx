import { SkeletonPage } from '@common/components/SkeletonPage'
import { ErrorState } from '@common/components/ErrorState'
import { usePhrases } from './hooks/usePhrases'
import { PhraseFilters } from './components/PhraseFilters'
import { PhraseGrid } from './components/PhraseGrid'

export default function Phrases() {
  const {
    isLoading,
    error,
    refetch,
    activeFilter,
    setFilter,
    filteredPhrases,
    copiedId,
    copyPhrase,
    speakPhrase,
  } = usePhrases()

  if (isLoading) return <SkeletonPage />
  if (error != null) {
    return (
      <ErrorState
        title="No se pudieron cargar las frases"
        message={error.message}
        onRetry={refetch}
      />
    )
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
          Frases listas para el trabajo
        </h1>
        <p className="text-text-secondary">
          Plantillas en ingles profesional para Pull Requests, Dailies y
          comunicacion asincrona.
        </p>
      </header>

      <PhraseFilters activeFilter={activeFilter} onFilter={setFilter} />

      <PhraseGrid
        phrases={filteredPhrases}
        copiedId={copiedId}
        onCopy={copyPhrase}
        onSpeak={speakPhrase}
      />
    </section>
  )
}
