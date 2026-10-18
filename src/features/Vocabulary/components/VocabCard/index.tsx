import type { MouseEvent } from 'react';
import { SpeakerHigh } from '@phosphor-icons/react';
import { CardBase } from '@common/CardBase';
import { Button } from '@common/Button';
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis';
import { CardMedia } from './CardMedia';
import type { VocabCardProps } from './type';

export function VocabCard({ card }: VocabCardProps) {
  const { speak: speakText } = useSpeechSynthesis();

  const speak = (e: MouseEvent<HTMLButtonElement>, text: string) => {
    e.stopPropagation();
    speakText(text, { rate: 0.9 });
  };

  const example = card.examples[0];

  return (
    <CardBase padding="none" className="overflow-hidden flex flex-col items-start text-left bg-surface border border-border-subtle hover:border-primary/30 transition-colors shadow-sm">
      <CardMedia 
        imageUrl={card.imageUrl}
        word={card.word}
        domain={card.domain}
        box={card.box}
      />

      <div className="p-6 flex flex-col gap-4 w-full">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-[22px] font-extrabold text-text-main mb-0.5 tracking-tight">
              {card.word}
            </h3>
            <p className="text-[13px] text-text-secondary font-medium">
              {card.phonetic} · Caja {card.box}
            </p>
          </div>
          <Button 
            variant="icon"
            size="sm"
            onClick={(e) => speak(e, card.word)}
            aria-label="Escuchar pronunciación"
            className="shrink-0 text-text-secondary hover:text-primary hover:bg-primary-light/50 transition-colors"
          >
            <SpeakerHigh size={18} weight="regular" />
          </Button>
        </div>

        <div>
          <h5 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">
            Traducción
          </h5>
          <p className="font-bold text-text-main text-[15px]">
            {card.translation}
          </p>
        </div>

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
}