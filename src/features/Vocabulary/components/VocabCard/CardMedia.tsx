import { Chip } from '@common/Chip'
import type { CardMediaProps } from './type'

const LEITNER_LEVELS = [1, 2, 3, 4, 5] as const

export function CardMedia({ imageUrl, word, domain, box }: CardMediaProps) {
  return (
    <div className="relative flex h-[140px] w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-primary-light/70 to-surface-muted/60 p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={word}
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-80"
        />
      )}
      {imageUrl && <div className="absolute inset-0 z-0 bg-scrim/30" />}

      <div className="relative z-10 flex w-full items-start justify-between">
        <Chip
          size="sm"
          active
          className="pointer-events-none rounded-full border-transparent bg-primary px-3 text-xs font-bold text-on-primary shadow-soft"
        >
          {domain}
        </Chip>

        <div className="flex items-center gap-1 rounded-full border border-border-subtle bg-surface/90 px-2.5 py-1.5 shadow-soft backdrop-blur-xs">
          {LEITNER_LEVELS.map(level => (
            <div
              key={level}
              className={`h-1.5 w-3.5 rounded-full ${
                level <= box ? 'bg-primary' : 'bg-border-subtle/80'
              }`}
            />
          ))}
        </div>
      </div>

      {!imageUrl && (
        <div className="relative z-10 m-auto text-center text-xs font-semibold text-text-tertiary">
          Esquema visual
        </div>
      )}
    </div>
  )
}
