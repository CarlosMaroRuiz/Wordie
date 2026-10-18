import { useState, useEffect, useMemo, useCallback } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import type { StoryDTO, StoryTopic, QuizState } from '../type'

export function useStories() {
  const { data: stories, isLoading, error, refetch } = useFetch<StoryDTO[]>('/data/stories.json')
  const [activeTopic, setActiveTopic] = useState<StoryTopic>('all')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const { stop, toggle, isSpeaking } = useSpeechSynthesis()
  const [quizState, setQuizState] = useState<QuizState>({
    answers: {},
    isSubmitted: false,
  })

  // Filter stories by topic
  const filteredStories = useMemo(() => {
    if (!stories) return []
    if (activeTopic === 'all') return stories
    return stories.filter((story) => story.topic === activeTopic)
  }, [stories, activeTopic])

  // Current active story
  const currentStory = useMemo(() => {
    if (filteredStories.length === 0) return null
    if (!selectedStoryId) return filteredStories[0]
    return filteredStories.find((s) => s.id === selectedStoryId) ?? filteredStories[0]
  }, [filteredStories, selectedStoryId])

  // Reset quiz and audio narration when story changes
  useEffect(() => {
    setQuizState({ answers: {}, isSubmitted: false })
    setSelectedKeyword(null)
    stop()
  }, [currentStory?.id, stop])

  // Narracion delegada al hook comun (una sola voz global)
  const toggleNarration = useCallback(() => {
    if (!currentStory) return
    toggle(currentStory.paragraphs.join(' '), { rate: 0.9 })
  }, [currentStory, toggle])

  // Quiz actions
  const selectQuizAnswer = useCallback((questionId: string, optionIndex: number) => {
    setQuizState((prev) => {
      if (prev.answers[questionId] !== undefined) return prev
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: optionIndex,
        },
      }
    })
  }, [])

  const resetQuiz = useCallback(() => {
    setQuizState({ answers: {}, isSubmitted: false })
  }, [])

  // Calculate quiz score
  const quizScore = useMemo(() => {
    if (!currentStory) return { correct: 0, total: 0, completed: false }
    const total = currentStory.quiz.length
    let correct = 0
    let answered = 0

    currentStory.quiz.forEach((q) => {
      const selected = quizState.answers[q.id]
      if (selected !== undefined) {
        answered++
        if (selected === q.correctAnswer) {
          correct++
        }
      }
    })

    return {
      correct,
      total,
      completed: total > 0 && answered === total,
    }
  }, [currentStory, quizState.answers])

  return {
    stories: filteredStories,
    allStories: stories ?? [],
    currentStory,
    selectedStoryId: currentStory?.id ?? null,
    setSelectedStoryId,
    activeTopic,
    setActiveTopic,
    selectedKeyword,
    setSelectedKeyword,
    isNarrating: isSpeaking,
    toggleNarration,
    quizAnswers: quizState.answers,
    selectQuizAnswer,
    resetQuiz,
    quizScore,
    isLoading,
    error,
    refetch,
  }
}
