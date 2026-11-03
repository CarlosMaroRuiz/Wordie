import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '@common/hooks/useFetch';
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore';
import type { AsyncStatusShape } from '@common/types/async';
import { useVocabStore } from '../store/useVocabStore';
import type { VocabRawDTO } from '../dto';

export function useVocabulary() {
  const { data, isLoading: fetchLoading, error, refetch } = useFetch<VocabRawDTO[]>('/data/vocabulary.json');
  const topic = useTopicStore((s) => s.topic);
  const { cards, isLoaded, loadCards } = useVocabStore();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [nowTimestamp] = useState(() => Date.now());

  useEffect(() => {
    if (data) {
      loadCards(data);
    }
  }, [data, loadCards]);

  const topicCards = useMemo(() => {
    return cards.filter(card => card.topic === topic || (!card.topic && topic === 'dev'));
  }, [cards, topic]);

  const domainOptions = useMemo(() => {
    const domains = new Set<string>();
    topicCards.forEach(card => {
      if (card.domain) {
        domains.add(card.domain);
      }
    });
    return Array.from(domains);
  }, [topicCards]);

  const filteredCards = useMemo(() => {
    if (activeFilter === 'all') return topicCards;
    const matches = topicCards.filter(card => card.domain === activeFilter);
    return matches.length > 0 ? matches : topicCards;
  }, [topicCards, activeFilter]);

  const dueCards = useMemo(() => {
    return filteredCards.filter(card => nowTimestamp >= card.nextReview);
  }, [filteredCards, nowTimestamp]);

  const isLoading = fetchLoading || (!isLoaded && !error);

  return {
    topic,
    cards: filteredCards,
    allTopicCards: topicCards,
    isLoading,
    error,
    refetch,
    activeFilter,
    setActiveFilter,
    dueCards,
    domainOptions,
  } satisfies AsyncStatusShape;
}
