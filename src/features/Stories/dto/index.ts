export interface StoryKeywordDTO {
  term: string;
  translation: string;
  definition?: string;
}

export interface StoryQuizQuestionDTO {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StoryDTO {
  id: string;
  title: string;
  readTime: string;
  level: string;
  paragraphs: string[];
  keywords: StoryKeywordDTO[];
  quiz: StoryQuizQuestionDTO[];
}
