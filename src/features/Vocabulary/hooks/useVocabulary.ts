import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '@common/hooks/useFetch';
import { useVocabStore } from '../store/useVocabStore';
import type { VocabRawDTO } from '../dto';

export function useVocabulary() {
  const { data, isLoading: fetchLoading, error, refetch } = useFetch<VocabRawDTO[]>('/data/vocabulary.json');
  const { cards, isLoaded, loadCards } = useVocabStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (data) {
      loadCards(data);
    }
  }, [data, loadCards]);

  const domainOptions = useMemo(() => {
    const domains = new Set<string>();
    cards.forEach(card => {
      if (card.domain) {
        domains.add(card.domain);
      }
    });
    return Array.from(domains);
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (activeFilter === 'all') return cards;
    return cards.filter(card => card.domain === activeFilter);
  }, [cards, activeFilter]);

  const dueCards = useMemo(() => {
    const now = Date.now();
    return filteredCards.filter(card => now >= card.nextReview);
  }, [filteredCards]);

  const isLoading = fetchLoading || (!isLoaded && !error);

  return {
    cards: filteredCards,
    isLoading,
    error,
    refetch,
    activeFilter,
    setActiveFilter,
    dueCards,
    domainOptions,
  };
}
