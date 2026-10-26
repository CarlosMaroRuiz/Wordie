import { ErrorState } from '@common/components/ErrorState'
import { FloatingHelpButton } from '@common/components/FloatingHelpButton'
import { SkeletonPage } from '@common/components/SkeletonPage'
import { PhrasalVerbCard } from './components/PhrasalVerbCard'
import { PhrasalVerbFilters } from './components/PhrasalVerbFilters'
import { PhrasalVerbHero } from './components/PhrasalVerbHero'
import { usePhrasalVerbs } from './hooks/usePhrasalVerbs'

const GUIDE_CONTENT = (
  <div className="flex flex-col gap-4 text-sm text-text-secondary">
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">¿Qué es un Phrasal Verb?</h3>
      <p className="leading-relaxed">
        Es un verbo base combinado con una preposición o adverbio (partícula) que crea un
        significado completamente nuevo. Por ejemplo: <strong>give</strong> (dar) +{' '}
        <strong>up</strong> = <em>give up</em> (rendirse). ¡El significado cambia radicalmente!
      </p>
    </section>
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">Separables vs Inseparables</h3>
      <p className="leading-relaxed">
        Un Phrasal Verb <strong>separable</strong> permite colocar el pronombre entre verbo y
        partícula: <em>&ldquo;Turn it off&rdquo;</em> ✅, pero nunca{' '}
        <em>&ldquo;Turn off it&rdquo;</em> ❌.{' '}
        Un <strong>inseparable</strong> siempre se mantiene unido: <em>&ldquo;Look into it&rdquo;</em> ✅.
      </p>
    </section>
    <section className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
      <h3 className="mb-1 font-bold text-text-main">Cómo estudiarlos eficientemente</h3>
      <ul className="mt-1 space-y-1.5">
        {['Aprende su contexto, no el verbo aislado.', 'Practica con ejemplos reales de tu área laboral.', 'Usa el audio para fijar la pronunciación natural y las contracciones.', 'Agrupa los de una misma partícula: out, up, down, off…'].map(tip => (
          <li key={tip} className="flex items-start gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

export default function PhrasalVerbsModule() {
  const {
    items,
    filteredItems,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    separableFilter,
    setSeparableFilter,
    speak,
    refetch,
  } = usePhrasalVerbs()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <SkeletonPage />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md p-6">
        <ErrorState onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <PhrasalVerbHero
        totalCount={items.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PhrasalVerbFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            separableFilter={separableFilter}
            onSeparableChange={setSeparableFilter}
          />
          <span className="shrink-0 text-xs font-semibold text-text-tertiary">
            {filteredItems.length} de {items.length} verbos
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border-subtle p-12 text-center">
            <p className="text-sm text-text-secondary">
              No se encontraron Phrasal Verbs para &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map(item => (
              <PhrasalVerbCard key={item.id} item={item} onSpeak={speak} />
            ))}
          </div>
        )}
      </section>

      <FloatingHelpButton
        title="Guía de Phrasal Verbs"
        subtitle="GUÍA DE ESTUDIO"
        tooltip="¿Cómo estudiar Phrasal Verbs?"
        closeLabel="¡Entendido, a practicar!"
      >
        {GUIDE_CONTENT}
      </FloatingHelpButton>
    </div>
  )
}
