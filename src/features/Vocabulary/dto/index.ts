export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export interface VocabExampleDTO {
  en: string;
  es: string;
}

/** Raw shape from vocabulary.json */
export interface VocabRawDTO {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  domain: string;
  level: string;
  phonetic: string;
  definition?: string;
  imageUrl?: string;
  examples: VocabExampleDTO[];
}

/** Enriched card with Leitner progress */
export interface VocabCardDTO extends VocabRawDTO {
  box: LeitnerBox;
  nextReview: number; // timestamp ms
}
