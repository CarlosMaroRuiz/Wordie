import { useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import type { PhrasalVerbCategory, PhrasalVerbItemDTO } from '../types'

export function usePhrasalVerbs() {
  const { data, isLoading, error, refetch } =
    useFetch<PhrasalVerbItemDTO[]>('/data/phrasal-verbs.json')
  const { speak } = useSpeechSynthesis()
  const [activeCategory, setActiveCategory] = useState<PhrasalVerbCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [separableFilter, setSeparableFilter] = useState<'all' | 'separable' | 'inseparable'>('all')

  const items = useMemo(() => data ?? [], [data])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory

      const matchesSeparable =
        separableFilter === 'all'
          ? true
          : separableFilter === 'separable'
            ? item.separable
            : !item.separable

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory && matchesSeparable

      const matchesSearch =
        item.phrasalVerb.toLowerCase().includes(query) ||
        item.translation.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.examples.some(
          ex =>
            ex.en.toLowerCase().includes(query) ||
            ex.es.toLowerCase().includes(query),
        )

      return matchesCategory && matchesSeparable && matchesSearch
    })
  }, [items, activeCategory, separableFilter, searchQuery])

  return {
    items,
    filteredItems,
    isLoading,
    error: error?.message ?? null,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    separableFilter,
    setSeparableFilter,
    speak,
    refetch,
  }
}
