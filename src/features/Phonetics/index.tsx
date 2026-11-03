import { AsyncBoundary } from '@common/components/AsyncBoundary'
import { EmptyState } from '@common/components/EmptyState'
import { FloatingHelpButton } from '@common/components/FloatingHelpButton'
import { PhoneticCard } from './components/PhoneticCard'
import { PhoneticDetailModal } from './components/PhoneticDetailModal'
import { PhoneticFilters } from './components/PhoneticFilters'
import { PhoneticsGuideContent } from './components/PhoneticsGuideModal'
import { PhoneticHero } from './components/PhoneticHero'
import { usePhonetics } from './hooks/usePhonetics'

export default function PhoneticsModule() {
  const {
    items,
    filteredItems,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedItem,
    setSelectedItem,
    speak,
    refetch,
  } = usePhonetics()

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="No se pudo cargar la guía de fonética"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8">
        <PhoneticHero
          totalCount={items.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PhoneticFilters
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            <span className="text-xs font-semibold text-text-tertiary">
              Mostrando {filteredItems.length} fonemas
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <EmptyState
              variant="dashed"
              size="sm"
              title={`No se encontraron fonemas que coincidan con “${searchQuery}”.`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredItems.map(item => (
                <PhoneticCard key={item.id} item={item} onSelect={setSelectedItem} />
              ))}
            </div>
          )}
        </section>

        <PhoneticDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSpeak={speak}
        />

        <FloatingHelpButton
          title="Introducción a la Fonética Técnica e IPA"
          subtitle="GUÍA FUNDAMENTAL"
          tooltip="Guía IPA 44 y Fonemas"
          closeLabel="¡Entendido, volver a los fonemas!"
        >
          <PhoneticsGuideContent />
        </FloatingHelpButton>
      </div>
    </AsyncBoundary>
  )
}
