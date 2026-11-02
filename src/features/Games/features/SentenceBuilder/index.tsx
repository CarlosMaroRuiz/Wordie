import { useState } from 'react'
import { motion } from 'motion/react'
import { SkeletonPage } from '@common/components/SkeletonPage'
import { ErrorState } from '@common/components/ErrorState'
import { COCKPIT, CONTAINER_VARIANTS } from './constant'
import { useSentenceBuilder } from './hooks/useSentenceBuilder'
import { SentenceBuilderHeader } from './components/SentenceBuilderHeader'
import { SentenceBuilderStats } from './components/SentenceBuilderStats'
import { SentencePromptCard } from './components/SentencePromptCard'
import { SentenceWorkspace } from './components/SentenceWorkspace'
import { SentenceBuilderControls } from './components/SentenceBuilderControls'
import { SentenceWinModal } from './components/SentenceWinModal'
import { SentenceHelpModal } from './components/SentenceHelpModal'

export default function SentenceBuilder() {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const {
    currentSentence,
    currentIndex,
    totalRounds,
    availableChips,
    placedChips,
    gameStatus,
    score,
    streak,
    mistakes,
    isHintActive,
    isCompleted,
    isSpeaking,
    isAllTargetWordsPlaced,
    isLoading,
    error,
    refetch,
    placeChip,
    removeChip,
    clearPlacedChips,
    checkAnswer,
    nextSentence,
    toggleHint,
    placeNextWordHint,
    speakCurrentSentence,
    restartGame,
  } = useSentenceBuilder()

  if (isLoading) {
    return <SkeletonPage />
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <ErrorState
          title="Error al cargar las oraciones"
          message={error.message}
          onRetry={refetch}
        />
      </div>
    )
  }

  if (!currentSentence) {
    return null
  }

  return (
    <motion.section
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-4xl flex-col gap-3 pb-2 pt-4 sm:gap-5 sm:py-8"
    >
      <SentenceBuilderHeader
        onRestart={restartGame}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <div className="[@media(max-height:700px)]:hidden">
        <SentenceBuilderStats
          currentRound={currentIndex + 1}
          totalRounds={totalRounds}
          score={score}
          streak={streak}
          mistakes={mistakes}
          isSpeaking={isSpeaking}
          onSpeak={speakCurrentSentence}
        />
      </div>

      <div className={COCKPIT}>
        <div className="flex min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain lg:gap-5 lg:overflow-visible">
          <SentencePromptCard
            sentence={currentSentence}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />

          <SentenceWorkspace
            placedChips={placedChips}
            availableChips={availableChips}
            gameStatus={gameStatus}
            onPlaceChip={placeChip}
            onRemoveChip={removeChip}
          />
        </div>

        <SentenceBuilderControls
          gameStatus={gameStatus}
          hasPlacedChips={placedChips.length > 0}
          canPlaceWordHint={!isAllTargetWordsPlaced && gameStatus !== 'correct'}
          onClear={clearPlacedChips}
          onHintWord={placeNextWordHint}
          onCheck={checkAnswer}
          onNext={nextSentence}
        />
      </div>

      <SentenceWinModal
        open={isCompleted}
        score={score}
        streak={streak}
        mistakes={mistakes}
        totalRounds={totalRounds}
        onPlayAgain={restartGame}
        onClose={restartGame}
      />

      <SentenceHelpModal
        open={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </motion.section>
  )
}
