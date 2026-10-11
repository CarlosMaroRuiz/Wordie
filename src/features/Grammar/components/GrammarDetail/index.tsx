import { CardBase } from '@common/CardBase';
import type { GrammarDetailProps } from './type';
import { BookOpenText, ListMagnifyingGlass, Target } from '@phosphor-icons/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TabFundamentals } from './TabFundamentals';
import { TabSpecialCases } from './TabSpecialCases';
import { TabPractice } from './TabPractice';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
} as const;

export const GrammarDetail = ({ topic }: GrammarDetailProps) => {
  if (!topic) return null;

  const hasSpecialCases = !!(
    topic.spellingRules?.length || 
    topic.exceptions?.length || 
    topic.additionalUses?.length || 
    topic.note
  );
  
  const hasPractice = !!(topic.quizzes?.length);

  // Estilo nativo tipo "Segmented Control" (iOS) para móviles, expandible en desktop
  const tabClassName = "flex-1 lg:flex-none flex items-center justify-center gap-2 outline-none px-3 py-2.5 text-[13px] md:text-[14px] font-bold rounded-lg transition-all data-[selected]:bg-surface data-[selected]:text-primary data-[selected]:shadow-sm text-text-secondary hover:text-text-main cursor-pointer";

  return (
    <CardBase className="h-[calc(100vh-140px)] lg:h-full border-none lg:border-solid border-border-subtle shadow-none lg:shadow-sm rounded-none lg:rounded-2xl bg-surface overflow-hidden flex flex-col p-0 -mx-4 lg:mx-0">
      <TabGroup>
        <div className="px-3 md:px-8 pt-3 pb-2 bg-surface z-10 shrink-0">
          <TabList className="flex w-full bg-bg-page p-1 rounded-xl">
            <Tab className={tabClassName}>
              <BookOpenText size={18} />
              <span className="hidden sm:inline">Fundamentos</span>
              <span className="sm:hidden">Teoría</span>
            </Tab>
            {hasSpecialCases && (
              <Tab className={tabClassName}>
                <ListMagnifyingGlass size={18} />
                <span className="hidden sm:inline">Casos Especiales</span>
                <span className="sm:hidden">Especial</span>
              </Tab>
            )}
            {hasPractice && (
              <Tab className={tabClassName}>
                <Target size={18} />
                <span>Práctica</span>
              </Tab>
            )}
          </TabList>
        </div>

        <TabPanels className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
          
          <TabPanel className="outline-none">
            <TabFundamentals 
              topic={topic} 
              containerVariants={containerVariants} 
              itemVariants={itemVariants} 
            />
          </TabPanel>

          {hasSpecialCases && (
            <TabPanel className="outline-none">
              <TabSpecialCases 
                topic={topic} 
                containerVariants={containerVariants} 
                itemVariants={itemVariants} 
              />
            </TabPanel>
          )}

          {hasPractice && (
            <TabPanel className="outline-none">
              <TabPractice 
                topic={topic} 
                containerVariants={containerVariants} 
                itemVariants={itemVariants} 
              />
            </TabPanel>
          )}

        </TabPanels>
      </TabGroup>
    </CardBase>
  );
};