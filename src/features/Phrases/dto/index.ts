import type { TopicValue } from '@common/layouts/MainLayout/topics';

export type PhraseContextTag = string;

export interface PhraseDTO {
  id: string;
  en: string;
  es: string;
  topic?: TopicValue;
  contextTag: PhraseContextTag;
  note?: string;
}
