import { CardBase } from '@common/CardBase'
import type { GrammarDetailProps } from './type'
import { BookOpenText, ListMagnifyingGlass, Target } from '@phosphor-icons/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { TabFundamentals } from './TabFundamentals'
import { TabSpecialCases } from './TabSpecialCases'
import { TabPractice } from './TabPractice'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
} as const

export function GrammarDetail({ topic }: GrammarDetailProps) {
  if (!topic) return null

  const hasSpecialCases = Boolean(
    topic.spellingRules?.length ||
      topic.exceptions?.length ||
      topic.additionalUses?.length ||
      topic.note,
  )

  const hasPractice = Boolean(topic.quizzes?.length)

  // Estilo píldora segmentada amigable estilo Duolingo / Mobile EdTech
  const tabClassName =
    'flex-1 lg:flex-none flex items-center justify-center gap-2 outline-none px-4 py-2 min-h-[40px] text-xs sm:text-sm font-black rounded-full transition-all data-[selected]:bg-surface data-[selected]:text-primary data-[selected]:shadow-soft text-text-secondary hover:text-text-main cursor-pointer'

  return (
    <CardBase className="flex flex-col rounded-[24px] lg:rounded-[28px] border border-border-subtle bg-surface p-0 shadow-soft -mx-2 sm:mx-0">
      <TabGroup>
        <div className="shrink-0 bg-surface px-3 py-3 sm:px-6 sm:pt-4">
          <TabList className="flex w-full items-center gap-1 rounded-full border border-border-subtle bg-surface-muted/70 p-1.5 shadow-soft">
            <Tab className={tabClassName}>
              <BookOpenText size={18} weight="bold" />
              <span className="hidden sm:inline">Fundamentos</span>
              <span className="sm:hidden">Teoría</span>
            </Tab>
            {hasSpecialCases && (
              <Tab className={tabClassName}>
                <ListMagnifyingGlass size={18} weight="bold" />
                <span className="hidden sm:inline">Casos Especiales</span>
                <span className="sm:hidden">Especial</span>
              </Tab>
            )}
            {hasPractice && (
              <Tab className={tabClassName}>
                <Target size={18} weight="bold" />
                <span>Práctica</span>
              </Tab>
            )}
          </TabList>
        </div>

        <TabPanels className="p-4 sm:p-6 lg:p-8 outline-none">
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
  )
}
