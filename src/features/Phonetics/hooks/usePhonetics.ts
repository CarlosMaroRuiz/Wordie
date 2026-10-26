import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import type { PhoneticCategory, PhoneticItemDTO } from '../types'

export function usePhonetics() {
  const { data, isLoading, error, refetch } =
    useFetch<PhoneticItemDTO[]>('/data/phonetics.json')
  const [activeCategory, setActiveCategory] = useState<PhoneticCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<PhoneticItemDTO | null>(null)

  const items = useMemo(() => data ?? [], [data])

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        item.symbol.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.examples.some(
          ex =>
            ex.word.toLowerCase().includes(query) ||
            ex.es.toLowerCase().includes(query) ||
            ex.phonetic.toLowerCase().includes(query),
        )

      return matchesCategory && matchesSearch
    })
  }, [items, activeCategory, searchQuery])

  return {
    items,
    filteredItems,
    isLoading,
    error: error?.message ?? null,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedItem,
    setSelectedItem,
    speak,
    refetch,
  }
}
