import { useCallback, useEffect } from 'react'
import { SpeakerHigh, Translate, BookOpen, Pause } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import type { StoryKeywordModalProps } from './type'

export function StoryKeywordModal({
  keyword,
  isOpen,
  onClose,
  playbackRate = 1,
}: StoryKeywordModalProps) {
  const { speak, stop, isSpeaking } = useSpeechSynthesis()

  const handleStop = useCallback(() => {
    stop()
  }, [stop])

  const handleClose = useCallback(() => {
    handleStop()
    onClose()
  }, [handleStop, onClose])

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      handleStop()
    }
  }, [handleStop])

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      handleStop()
    } else if (keyword) {
      speak(keyword.term, { rate: playbackRate })
    }
  }

  if (!keyword) return null

  return (
    <ModalBase
      open={isOpen}
      onClose={handleClose}
      size="md"
      title={
        <div className="flex items-center gap-2.5">
          <span className="text-2xl font-extrabold tracking-tight text-text-main">
            {keyword.term}
          </span>

          <button
            type="button"
            onClick={handleToggleSpeak}
            title={
              isSpeaking
                ? 'Detener pronunciación'
                : `Escuchar pronunciación (a ${playbackRate}x)`
            }
            aria-label={
              isSpeaking
                ? 'Detener pronunciación'
                : `Escuchar pronunciación de ${keyword.term}`
            }
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-primary text-white shadow-sm ring-2 ring-primary/40 ring-offset-2 animate-pulse'
                : 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30'
            }`}
          >
            {isSpeaking ? (
              <Pause size={18} weight="bold" />
            ) : (
              <SpeakerHigh size={20} weight="bold" />
            )}
          </button>
        </div>
      }
      footer={
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={handleClose}>
            Entendido
          </Button>
        </div>
      }
    >
      {/* Traducción al español */}
      <div className="flex items-start gap-3 rounded-2xl bg-primary/5 p-4 border border-primary/15 dark:bg-primary/10">
        <Translate size={22} weight="bold" className="mt-0.5 text-primary shrink-0" />
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-text-tertiary">
            Traducción
          </span>
          <p className="mt-0.5 text-base font-bold text-text-main">
            {keyword.translation}
          </p>
        </div>
      </div>

      {/* Definición o contexto técnico */}
      {keyword.definition && (
        <div className="flex items-start gap-3 rounded-2xl bg-bg-page/70 p-4 border border-border-subtle">
          <BookOpen size={22} weight="bold" className="mt-0.5 text-text-secondary shrink-0" />
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-text-tertiary">
              Definición en contexto
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
              {keyword.definition}
            </p>
          </div>
        </div>
      )}
    </ModalBase>
  )
}
