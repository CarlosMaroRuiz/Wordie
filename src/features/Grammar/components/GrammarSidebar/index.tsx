import type { GrammarTopic } from '@features/Grammar/types';
import { motion } from 'motion/react';

export interface GrammarSidebarProps {
  topics: GrammarTopic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const GrammarSidebar = ({ topics, selectedId, onSelect }: GrammarSidebarProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
          LECCIONES
        </span>
        <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
          {topics.length} temas
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {topics.map(topic => {
          const isActive = selectedId === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => onSelect(topic.id)}
              className={`relative text-left p-4 rounded-2xl border transition-colors ${
                isActive 
                  ? 'border-transparent' 
                  : 'bg-surface border-border-subtle hover:border-primary/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-primary-light border border-primary/30 rounded-2xl z-0 shadow-sm"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-primary">
                  {topic.category} - {topic.level}
                </span>
                <span className={`text-xl transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                  ›
                </span>
              </div>
              <h3 className="relative z-10 text-lg font-bold text-text-main mb-1">
                {topic.title}
              </h3>
              <p className="relative z-10 text-sm text-text-secondary line-clamp-1">
                {topic.subtitle}
              </p>
            </button>
          );
        })}
        
        {topics.length === 0 && (
          <p className="text-text-secondary py-8 text-center text-sm">
            No hay lecciones en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};
