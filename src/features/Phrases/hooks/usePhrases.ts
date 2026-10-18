import { useState } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import type { PhraseDTO } from '../dto'
import type { PhraseFilter } from '../type'

interface UsePhrasesReturn {
  phrases: PhraseDTO[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  activeFilter: PhraseFilter
  setFilter: (f: PhraseFilter) => void
  filteredPhrases: PhraseDTO[]
  copiedId: string | null
  copyPhrase: (id: string, text: string) => void
  speakPhrase: (text: string) => void
}

export function usePhrases(): UsePhrasesReturn {
  const { data, isLoading, error, refetch } = useFetch<PhraseDTO[]>('/data/phrases.json')
  const [activeFilter, setActiveFilter] = useState<PhraseFilter>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { speak } = useSpeechSynthesis()

  const phrases = data ?? []

  const filteredPhrases =
    activeFilter === 'all'
      ? phrases
      : phrases.filter((p) => p.contextTag === activeFilter)

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
    phrases,
    isLoading,
    error,
    refetch,
    activeFilter,
    setFilter,
    filteredPhrases,
    copiedId,
    copyPhrase,
    speakPhrase,
  }
}
