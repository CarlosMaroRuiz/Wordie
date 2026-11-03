import { AsyncBoundary } from '@common/components/AsyncBoundary'
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
    filterOptions,
    copiedId,
    copyPhrase,
  } = usePhrases()

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="No se pudieron cargar las frases"
    >
      <section className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
        <header className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
            Frases listas para usar
          </h1>
          <p className="text-text-secondary">
            Expresiones contextuales para desarrollo, viajes y comunicación profesional en el trabajo.
          </p>
        </header>

        <PhraseFilters
          options={filterOptions}
          activeFilter={activeFilter}
          onFilter={setFilter}
        />

        <PhraseGrid phrases={filteredPhrases} copiedId={copiedId} onCopy={copyPhrase} />
      </section>
    </AsyncBoundary>
  )
}
