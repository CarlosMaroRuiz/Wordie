import { Chip } from '@common/Chip';
import type { CardMediaProps } from './type';

const LEITNER_LEVELS = [1, 2, 3, 4, 5] as const;

export function CardMedia({ imageUrl, word, domain, box }: CardMediaProps) {
  return (
    <div className="w-full bg-primary-light/40 h-[140px] flex flex-col justify-between p-4 relative">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={word} 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" 
        />
      )}
      {imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30 z-0" />
      )}

      <div className="flex justify-between items-start w-full relative z-10">
        <Chip size="sm" active className="bg-primary/90 text-white border-transparent pointer-events-none rounded-xl text-xs px-3 shadow-sm backdrop-blur-md">
          {domain}
        </Chip>
        
        <div className="flex gap-1 items-center bg-bg-page/70 px-2 py-1.5 rounded-lg backdrop-blur-md shadow-sm border border-border-subtle/50">
          {LEITNER_LEVELS.map(level => (
            <div 
              key={level} 
              className={`h-1.5 w-4 rounded-full ${level <= box ? 'bg-orange-500' : 'bg-border-subtle/80'}`} 
            />
          ))}
        </div>
      </div>
      
      {!imageUrl && (
        <div className="text-primary/50 text-[11px] font-bold uppercase tracking-wider text-center m-auto relative z-10">
          esquema visual / imageUrl
        </div>
      )}
    </div>
  );
}
