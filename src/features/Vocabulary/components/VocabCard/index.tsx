import { AudioButton } from '@common/components/AudioButton'
import { CardBase } from '@common/CardBase'
import { CardMedia } from './CardMedia'
import type { VocabCardProps } from './type'

export function VocabCard({ card }: VocabCardProps) {
  const example = card.examples[0]

  return (
    <CardBase
      padding="none"
      className="flex flex-col items-start overflow-hidden border border-border-subtle bg-surface text-left shadow-sm transition-colors hover:border-primary/30"
    >
      <CardMedia
        imageUrl={card.imageUrl}
        word={card.word}
        domain={card.domain}
        box={card.box}
      />

      <div className="flex w-full flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-0.5 text-[22px] font-extrabold tracking-tight text-text-main">
              {card.word}
            </h3>
            <p className="text-[13px] font-medium text-text-secondary">
              {card.phonetic} · Caja {card.box}
            </p>
          </div>
          <AudioButton
            text={card.word}
            appearance="outlined"
            label="Escuchar pronunciación"
            className="shrink-0 text-text-secondary transition-colors hover:bg-primary-light/50 hover:text-primary"
          />
        </div>

        <div>
          <span className="mb-0.5 block text-xs font-semibold text-text-secondary">
            Traducción
          </span>
          <p className="text-[15px] font-bold text-text-main">{card.translation}</p>
        </div>

        {card.definition && (
          <div>
            <span className="mb-0.5 block text-xs font-semibold text-text-secondary">
              Definición
            </span>
            <p className="text-[13px] leading-relaxed text-text-main">{card.definition}</p>
          </div>
        )}

        {example && (
          <div>
            <span className="mb-0.5 block text-xs font-semibold text-text-secondary">
              Ejemplo en contexto
            </span>
            <p className="text-[13px] font-medium leading-relaxed text-text-main">{example.en}</p>
          </div>
        )}
      </div>
    </CardBase>
  )
}
