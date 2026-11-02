import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useFetch } from '@common/hooks/useFetch'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { useTopicStore } from '@common/layouts/MainLayout/useTopicStore'
import type {
  StoryDTO,
  QuizState,
  StoryKeywordDTO,
  PlaybackRate,
} from '../type'

const AUDIO_SETTINGS_STORAGE_KEY = 'wordie_reading_audio_settings'

function getInitialAudioSettings(): { playbackRate: PlaybackRate } {
  try {
    const raw = localStorage.getItem(AUDIO_SETTINGS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const validRate: PlaybackRate = [0.75, 1, 1.25].includes(parsed.playbackRate)
        ? parsed.playbackRate
        : 1
      return { playbackRate: validRate }
    }
  } catch {
    // ignorar error de acceso a storage
  }
  return { playbackRate: 1 }
}

export function useStories() {
  const { data: stories, isLoading, error, refetch } = useFetch<StoryDTO[]>('/data/stories.json')
  const topic = useTopicStore((s) => s.topic)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [activeKeyword, setActiveKeyword] = useState<StoryKeywordDTO | null>(null)
  const [narratingParagraphIndex, setNarratingParagraphIndex] = useState<number | null>(null)
  const [narratingCharIndex, setNarratingCharIndex] = useState<number | null>(null)
  const [playbackRate, setPlaybackRateState] = useState<PlaybackRate>(
    () => getInitialAudioSettings().playbackRate,
  )
  const isNarratingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playParagraphRef = useRef<(pIndex: number, story: StoryDTO) => void>(() => {})

  const setPlaybackRate = useCallback((rate: PlaybackRate) => {
    setPlaybackRateState(rate)
    try {
      localStorage.setItem(
        AUDIO_SETTINGS_STORAGE_KEY,
        JSON.stringify({ playbackRate: rate }),
      )
    } catch {
      // storage no disponible
    }
  }, [])

  const { stop, speak, isSpeaking } = useSpeechSynthesis()
  const [quizState, setQuizState] = useState<QuizState>({
    answers: {},
    isSubmitted: false,
  })

  // Filter stories by global topic
  const filteredStories = useMemo(() => {
    if (!stories) return []
    return stories.filter((story) => story.topic === topic)
  }, [stories, topic])

  // Current active story (fallback to first story if selected ID does not belong to the topic)
  const currentStory = useMemo(() => {
    if (filteredStories.length === 0) return null
    return filteredStories.find((s) => s.id === selectedStoryId) ?? filteredStories[0]
  }, [filteredStories, selectedStoryId])

  // Stop narration helper
  const stopNarration = useCallback(() => {
    isNarratingRef.current = false
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    stop()
    setNarratingParagraphIndex(null)
    setNarratingCharIndex(null)
  }, [stop])

  // Play sequential paragraphs
  const playParagraph = useCallback(
    (pIndex: number, story: StoryDTO) => {
      if (!isNarratingRef.current) return
      if (pIndex >= story.paragraphs.length) {
        stopNarration()
        return
      }

      setNarratingParagraphIndex(pIndex)
      setNarratingCharIndex(null)

      speak(story.paragraphs[pIndex], {
        rate: playbackRate,
        onBoundary: (e) => {
          if (!isNarratingRef.current) return
          if (typeof e.charIndex === 'number') {
            setNarratingCharIndex(e.charIndex)
          }
        },
        onEnd: () => {
          if (!isNarratingRef.current) return
          timeoutRef.current = setTimeout(() => {
            playParagraphRef.current(pIndex + 1, story)
          }, 300)
        },
      })
    },
    [speak, stopNarration, playbackRate],
  )

  useEffect(() => {
    playParagraphRef.current = playParagraph
  }, [playParagraph])

  // Reset quiz, active keyword and audio narration when story changes
  useEffect(() => {
    setQuizState({ answers: {}, isSubmitted: false })
    setActiveKeyword(null)
    stopNarration()
  }, [currentStory?.id, stopNarration])

  // Toggle narration
  const toggleNarration = useCallback(() => {
    if (!currentStory) return

    if (isNarratingRef.current || isSpeaking) {
      stopNarration()
    } else {
      isNarratingRef.current = true
      playParagraph(0, currentStory)
    }
  }, [currentStory, isSpeaking, playParagraph, stopNarration])

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

  const closeKeywordModal = useCallback(() => {
    setActiveKeyword(null)
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
    topic,
    stories: filteredStories,
    allStories: stories ?? [],
    currentStory,
    selectedStoryId: currentStory?.id ?? null,
    setSelectedStoryId,
    activeKeyword,
    selectedKeyword: activeKeyword?.term ?? null,
    setActiveKeyword,
    closeKeywordModal,
    isNarrating: narratingParagraphIndex !== null,
    narratingParagraphIndex,
    narratingCharIndex,
    toggleNarration,
    playbackRate,
    setPlaybackRate,
    quizAnswers: quizState.answers,
    selectQuizAnswer,
    resetQuiz,
    quizScore,
    isLoading,
    error,
    refetch,
  }
}
