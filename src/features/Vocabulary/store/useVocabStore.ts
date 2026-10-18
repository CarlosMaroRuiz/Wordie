import { create } from 'zustand';
import type { VocabCardDTO, VocabRawDTO, LeitnerBox } from '../dto';
import { readVocabProgress, toVocabCards, VOCAB_PROGRESS_KEY } from './progress';

const INTERVALS: Record<LeitnerBox, number> = {
  1: 60_000,       // 1 min
  2: 600_000,      // 10 min
  3: 86_400_000,   // 1 day
  4: 259_200_000,  // 3 days
  5: 604_800_000,  // 7 days
};

interface VocabState {
  cards: VocabCardDTO[];
  isLoaded: boolean;
  loadCards: (raw: VocabRawDTO[]) => void;
  markEasy: (id: string) => void;
  markHard: (id: string) => void;
}

const _persist = (cards: VocabCardDTO[]) => {
  const progress: Record<string, { box: LeitnerBox; nextReview: number }> = {};
  cards.forEach(card => {
    progress[card.id] = { box: card.box, nextReview: card.nextReview };
  });
  localStorage.setItem(VOCAB_PROGRESS_KEY, JSON.stringify(progress));
};

export const useVocabStore = create<VocabState>((set, get) => ({
  cards: [],
  isLoaded: false,

  loadCards: (raw: VocabRawDTO[]) => {
    const cards: VocabCardDTO[] = toVocabCards(raw, readVocabProgress());
    set({ cards, isLoaded: true });
  },

  markEasy: (id: string) => {
    const { cards } = get();
    const updatedCards = cards.map(c => {
      if (c.id === id) {
        const nextBox = Math.min(c.box + 1, 5) as LeitnerBox;
        const nextReview = Date.now() + INTERVALS[nextBox];
        return { ...c, box: nextBox, nextReview };
      }
      return c;
    });
    
    _persist(updatedCards);
    set({ cards: updatedCards });
  },

  markHard: (id: string) => {
    const { cards } = get();
    const updatedCards = cards.map(c => {
      if (c.id === id) {
        const defaultBox: LeitnerBox = 1;
        return { ...c, box: defaultBox, nextReview: 0 };
      }
      return c;
    });
    
    _persist(updatedCards);
    set({ cards: updatedCards });
  }
}));