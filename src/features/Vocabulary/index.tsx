import { useState } from 'react';
import { useVocabulary } from './hooks/useVocabulary';
import { useVocabStore } from './store/useVocabStore';
import { VocabFilters } from './components/VocabFilters';
import { VocabGrid } from './components/VocabGrid';
import { PracticeModal } from './components/PracticeModal';
import { AsyncBoundary } from '@common/components/AsyncBoundary';
import { Button } from '@common/Button';
import { CheckCircle } from '@phosphor-icons/react';

export default function VocabularyModule() {
  const {
    cards,
    isLoading,
    error,
    refetch,
    activeFilter,
    setActiveFilter,
    dueCards,
    domainOptions
  } = useVocabulary();

  const { markEasy, markHard } = useVocabStore();
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  return (
    <AsyncBoundary
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      errorTitle="No se pudo cargar el vocabulario"
    >
      <div className="flex flex-col gap-8 p-4 md:p-8 max-w-[1360px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-text-main mb-1 tracking-tight">
              Vocabulario contextual
            </h1>
            <p className="text-text-secondary text-base max-w-2xl leading-relaxed">
              Términos clave para desarrollo, viajes y trabajo con pronunciación, significado y práctica Leitner.
            </p>
          </div>

          {/* Practice CTA */}
          {dueCards.length > 0 ? (
            <Button
              variant="primary"
              onClick={() => setIsPracticeModalOpen(true)}
              className="flex items-center gap-2 w-full md:w-auto justify-center"
            >
              Practicar tarjetas ({dueCards.length}) ↗
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-success font-bold bg-success/10 px-4 py-2.5 rounded-xl text-sm border border-success/20 w-full md:w-auto justify-center">
              <CheckCircle size={20} weight="fill" />
              ¡Todo al día!
            </div>
          )}
        </header>

        <section>
          <VocabFilters
            domains={domainOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </section>

        <section>
          <VocabGrid cards={cards} />
        </section>

        <PracticeModal
          open={isPracticeModalOpen}
          onClose={() => setIsPracticeModalOpen(false)}
          cards={dueCards}
          onEasy={markEasy}
          onHard={markHard}
        />
      </div>
    </AsyncBoundary>
  );
}
