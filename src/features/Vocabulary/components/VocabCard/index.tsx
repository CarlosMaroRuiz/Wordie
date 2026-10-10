import { SpeakerHigh } from '@phosphor-icons/react';
import { CardBase } from '@common/CardBase';
import { Chip } from '@common/Chip';
import type { VocabCardDTO } from '../../dto';

interface VocabCardProps {
  card: VocabCardDTO;
}

export const VocabCard = ({ card }: VocabCardProps) => {
  const speak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  const example = card.examples[0];

  return (
    <CardBase padding="none" className="overflow-hidden flex flex-col items-start text-left bg-surface border border-border-subtle hover:border-primary/30 transition-colors shadow-sm">
      {/* Top Image Area */}
      <div className="w-full bg-primary-light/40 h-[140px] flex flex-col justify-between p-4 relative">
        {card.imageUrl && (
          <img 
            src={card.imageUrl} 
            alt={card.word} 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" 
          />
        )}
        {card.imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30 z-0" />
        )}

        <div className="flex justify-between items-start w-full relative z-10">
          {/* Domain Tag */}
          <Chip size="sm" active as="span" className="bg-primary/90 text-white border-transparent pointer-events-none rounded-xl text-xs px-3 shadow-sm backdrop-blur-md">
            {card.domain}
          </Chip>
          
          {/* Leitner Box Indicators */}
          <div className="flex gap-1 items-center bg-bg-page/70 px-2 py-1.5 rounded-lg backdrop-blur-md shadow-sm border border-border-subtle/50">
            {[1, 2, 3, 4, 5].map(level => (
              <div 
                key={level} 
                className={`h-1.5 w-4 rounded-full ${level <= card.box ? 'bg-orange-500' : 'bg-border-subtle/80'}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Placeholder Text (Only shown if no image) */}
        {!card.imageUrl && (
          <div className="text-primary/50 text-[11px] font-bold uppercase tracking-wider text-center m-auto relative z-10">
            esquema visual / imageUrl
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col gap-4 w-full">
        
        {/* Header: Word & Pronunciation */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-[22px] font-extrabold text-text-main mb-0.5 tracking-tight">
              {card.word}
            </h3>
            <p className="text-[13px] text-text-secondary font-medium">
              {card.phonetic} · Caja {card.box}
            </p>
          </div>
          <button 
            onClick={(e) => speak(e, card.word)}
            className="shrink-0 p-2 text-text-secondary hover:text-primary hover:bg-primary-light/50 transition-colors border border-border-subtle rounded-xl shadow-sm"
            aria-label="Escuchar pronunciación"
          >
            <SpeakerHigh size={18} weight="regular" />
          </button>
        </div>

        {/* Translation */}
        <div>
          <h5 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">
            Traducción
          </h5>
          <p className="font-bold text-text-main text-[15px]">
            {card.translation}
          </p>
        </div>

        {/* Definition */}
        {card.definition && (
          <div>
            <h5 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">
              Definición
            </h5>
            <p className="text-[13px] text-text-main leading-relaxed">
              {card.definition}
            </p>
          </div>
        )}

        {/* Example */}
        {example && (
          <div>
            <h5 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">
              Ejemplo Técnico
            </h5>
            <p className="text-[13px] text-text-main font-medium leading-relaxed">
              {example.en}
            </p>
          </div>
        )}
      </div>
    </CardBase>
  );
};
