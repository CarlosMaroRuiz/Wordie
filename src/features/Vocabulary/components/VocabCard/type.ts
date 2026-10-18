import type { VocabCardDTO, LeitnerBox } from '../../dto';

export interface VocabCardProps {
  card: VocabCardDTO;
}

export interface CardMediaProps {
  imageUrl?: string;
  word: string;
  domain: string;
  box: LeitnerBox;
}
