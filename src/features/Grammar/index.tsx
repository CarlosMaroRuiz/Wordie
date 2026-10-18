import { useState } from 'react';
import { useGrammar } from './hooks/useGrammar';
import { GrammarFilters } from './components/GrammarFilters';
import { GrammarSidebar } from './components/GrammarSidebar';
import { GrammarDetail } from './components/GrammarDetail';
import { SkeletonPage } from '@common/components/SkeletonPage';
import { ErrorState } from '@common/components/ErrorState';
import { CaretLeft, SidebarSimple } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

export const GrammarModule = () => {
  const { 
    data, 
    isLoading, 
    error, 
    activeFilter, 
    setActiveFilter, 
    selectedTopic, 
    selectedTopicId, 
    setSelectedTopicId,
    refetch,
  } = useGrammar();

  const [showSidebar, setShowSidebar] = useState(true);

  if (isLoading) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        <SkeletonPage />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-[1360px] mx-auto">
      {/* Header y Filtros */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            className="lg:!block lg:!h-auto lg:!opacity-100"
          >
            <header className="mb-6">
              <h1 className="text-3xl font-extrabold text-text-main mb-2 tracking-tight">
                Gramática aplicada
              </h1>
              <p className="text-text-secondary text-base">
                Estructuras esenciales nivel A1-B1 contextualizadas a la práctica profesional.
              </p>
            </header>

            <section>
              <GrammarFilters 
                activeFilter={activeFilter} 
                onFilterChange={(filter) => {
                  setActiveFilter(filter);
                  setShowSidebar(true);
                }} 
              />
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Master-Detail Layout Dinámico animado fluidamente */}
      <motion.section 
        layout 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`grid grid-cols-1 ${showSidebar ? 'lg:grid-cols-[360px_1fr]' : 'lg:grid-cols-1'} gap-6 items-start mt-4`}
      >
        
        {/* Panel Izquierdo (Sidebar) */}
        <motion.div 
          layout 
          className={`${showSidebar ? 'block' : 'hidden'} origin-left`}
        >
          <GrammarSidebar
            topics={data}
            selectedId={selectedTopicId}
            onSelect={(id) => {
              setSelectedTopicId(id);
              if (window.innerWidth < 1024) {
                setShowSidebar(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </motion.div>

        {/* Panel Derecho (Detalle) */}
        <motion.div layout className={`relative flex flex-col h-full ${!showSidebar ? 'block' : 'hidden lg:block'}`}>
          <motion.div layout className="pb-3 pt-2 mb-2 flex items-center lg:mb-4">
            <button
              onClick={() => {
                setShowSidebar(!showSidebar);
                if (!showSidebar) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 text-primary font-bold hover:bg-primary-light/50 px-3 py-2 rounded-xl transition-all"
            >
              <span className="flex lg:hidden items-center gap-2">
                <CaretLeft size={20} weight="bold" /> Volver a temas
              </span>
              <span className="hidden lg:flex items-center gap-2">
                <SidebarSimple size={22} weight={showSidebar ? 'fill' : 'regular'} />
                {showSidebar ? 'Ocultar lista' : 'Mostrar temas'}
              </span>
            </button>
          </motion.div>

          <GrammarDetail topic={selectedTopic} />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default GrammarModule;

