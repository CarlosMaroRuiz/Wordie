import type { VocabCardDTO } from '../../dto';

export interface PracticeModalProps {
  open: boolean;
  onClose: () => void;
  cards: VocabCardDTO[];
  onEasy: (id: string) => void;
  onHard: (id: string) => void;
}

export interface PracticeHeaderProps {
  onClose: () => void;
}

export interface PracticeCompleteProps {
  totalPracticed: number;
  onClose: () => void;
}

export interface PracticeCardProps {
  card: VocabCardDTO;
  currentIndex: number;
  totalCards: number;
  isRevealed: boolean;
  onReveal: () => void;
  onNext: (difficulty: 'easy' | 'hard') => void;
}
