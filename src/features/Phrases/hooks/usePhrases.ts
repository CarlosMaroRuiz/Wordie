import { useState, useMemo } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type { PhraseDTO, PhraseFilter } from '../type'
import type { PhraseFilterOption } from '../components/PhraseFilters/type'

interface UsePhrasesReturn {
  phrases: PhraseDTO[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  activeFilter: PhraseFilter
  setFilter: (f: PhraseFilter) => void
  filteredPhrases: PhraseDTO[]
  filterOptions: PhraseFilterOption[]
  copiedId: string | null
  copyPhrase: (id: string, text: string) => void
  speakPhrase: (text: string) => void
}

export function usePhrases(): UsePhrasesReturn {
  const { data, isLoading, error, refetch } = useFetch<PhraseDTO[]>('/data/phrases.json')
  const topic = useTopicStore((s) => s.topic)
  const [activeFilter, setActiveFilter] = useState<PhraseFilter>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { speak } = useSpeechSynthesis()

  const allPhrases = useMemo(() => data ?? [], [data])

  // Filtrar estrictamente por el tema global activo
  const topicPhrases = useMemo(() => {
    return allPhrases.filter((p) => p.topic === topic)
  }, [allPhrases, topic])

  // Opciones de filtro dinámicas según las categorías presentes en el tema actual
  const filterOptions = useMemo<PhraseFilterOption[]>(() => {
    const tags = Array.from(new Set(topicPhrases.map((p) => p.contextTag)))
    return [
      { label: 'Todas', value: 'all' },
      ...tags.map((tag) => ({ label: tag, value: tag })),
    ]
  }, [topicPhrases])

  // Si el filtro seleccionado no pertenece al tema actual, se muestran todas las del tema
  const filteredPhrases = useMemo(() => {
    if (activeFilter === 'all') return topicPhrases
    const matches = topicPhrases.filter((p) => p.contextTag === activeFilter)
    return matches.length > 0 ? matches : topicPhrases
  }, [topicPhrases, activeFilter])

  function setFilter(f: PhraseFilter) {
    setActiveFilter(f)
  }

  function copyPhrase(id: string, text: string) {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  function speakPhrase(text: string) {
    speak(text)
  }

  return {
    phrases: topicPhrases,
    isLoading,
    error,
    refetch,
    activeFilter,
    setFilter,
    filteredPhrases,
    filterOptions,
    copiedId,
    copyPhrase,
    speakPhrase,
  }
}
