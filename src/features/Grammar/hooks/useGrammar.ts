import { useState, useCallback } from 'react';
import type { GrammarTopic, GrammarCategory } from '../types';
import { useFetch } from '@common/hooks/useFetch';

export const useGrammar = () => {
  const { data: fetchedData, isLoading, error, refetch } = useFetch<GrammarTopic[]>('/data/grammar.json');
  
  const data = fetchedData || [];
  const [activeFilter, setActiveFilter] = useState<GrammarCategory>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const filteredData = activeFilter === 'all' 
    ? data 
    : data.filter(topic => topic.category.toLowerCase() === activeFilter.toLowerCase());

  const effectiveId = selectedTopicId ?? filteredData[0]?.id ?? null;
  const selectedTopic = filteredData.find(t => t.id === effectiveId)
    ?? filteredData[0]
    ?? null;
  const handleFilterChange = useCallback((category: GrammarCategory) => {
    setActiveFilter(category);
    setSelectedTopicId(null);
  }, []);

  return {
    data: filteredData,
    isLoading,
    error,
    activeFilter,
    setActiveFilter: handleFilterChange,
    selectedTopic,
    selectedTopicId: effectiveId,
    setSelectedTopicId,
    refetch,
  };
};
