import { create } from 'zustand';
import type { VocabCardDTO, VocabRawDTO, LeitnerBox } from '../dto';

const INTERVALS: Record<LeitnerBox, number> = {
  1: 60_000,        // 1 min
  2: 600_000,       // 10 min
  3: 86_400_000,    // 1 day
  4: 259_200_000,   // 3 days
  5: 604_800_000,   // 7 days
};

const STORAGE_KEY = 'wordie_vocab_progress';

interface ProgressData {
  [id: string]: { box: LeitnerBox; nextReview: number };
}

interface VocabState {
  cards: VocabCardDTO[];
  isLoaded: boolean;
  loadCards: (raw: VocabRawDTO[]) => void;
  markEasy: (id: string) => void;
  markHard: (id: string) => void;
}

const _persist = (cards: VocabCardDTO[]) => {
  const progress: ProgressData = {};
  cards.forEach(card => {
    progress[card.id] = { box: card.box, nextReview: card.nextReview };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const useVocabStore = create<VocabState>((set, get) => ({
  cards: [],
  isLoaded: false,

  loadCards: (raw: VocabRawDTO[]) => {
    let savedProgress: ProgressData = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        savedProgress = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to parse vocabulary progress', error);
    }

    const cards: VocabCardDTO[] = raw.map((item) => {
      const savedItem = savedProgress[item.id];
      if (savedItem) {
        return {
          ...item,
          box: savedItem.box,
          nextReview: savedItem.nextReview,
        };
      }
      return {
        ...item,
        box: 1,
        nextReview: 0,
      };
    });

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
        return { ...c, box: 1, nextReview: 0 };
      }
      return c;
    });
    
    _persist(updatedCards);
    set({ cards: updatedCards });
  }
}));
