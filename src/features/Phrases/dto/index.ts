export type PhraseContextTag =
  | 'Commandment'
  | 'Daily Standup'
  | 'PR Review'
  | 'Blocker'
  | string;

export interface PhraseDTO {
  id: string;
  en: string;
  es: string;
  contextTag: PhraseContextTag;
  note?: string;
}
