export type GrammarCategory =
  | 'all'
  | 'presente'
  | 'pasado'
  | 'futuro'
  | 'condicionales'
  | (string & {});

export interface GrammarExampleDTO {
  en: string;
  es: string;
}

export interface GrammarQuizDTO {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface GrammarFormulaDTO {
  label: string;
  value: string;
}

export interface GrammarExceptionDTO {
  description: string;
  incorrect: string;
  correct: string;
}

export interface GrammarSpellingRuleDTO {
  rule: string;
  transformation: string;
}

export interface GrammarUsageDTO {
  description: string;
  example: GrammarExampleDTO;
}

export interface GrammarTopicDTO {
  id: string;
  category: string;
  level: string;
  title: string;
  subtitle?: string;
  explanation: string;
  formula?: string; // Mantener por compatibilidad con temas no migrados
  formulas?: GrammarFormulaDTO[];
  examples: GrammarExampleDTO[];
  note?: string;
  spellingRules?: GrammarSpellingRuleDTO[];
  exceptions?: GrammarExceptionDTO[];
  additionalUses?: GrammarUsageDTO[];
  quizzes?: GrammarQuizDTO[];
}
