import { Pause, SpeakerHigh } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { useSpeechSynthesis } from '@common/hooks/useSpeechSynthesis'
import { cn } from '@common/utils/cn'
import { AUDIO_BASE, AUDIO_ICON_SIZE, AUDIO_SOFT, AUDIO_SPEAKING, AUDIO_TINTED } from './constant'
import type { AudioButtonProps } from './type'

export function AudioButton({
  text,
  rate = 1,
  label,
  appearance = 'soft',
  size = 'sm',
  className,
}: AudioButtonProps) {
  const { isSpeaking, toggle } = useSpeechSynthesis()
  const ariaLabel = label ?? (isSpeaking ? 'Detener pronunciación' : `Escuchar "${text}"`)
  const iconSize = appearance === 'outlined' ? AUDIO_ICON_SIZE[size] : 18
  const icon = isSpeaking ? (
    <Pause size={iconSize} weight="bold" />
  ) : (
    <SpeakerHigh size={iconSize} weight="bold" />
  )

  const handleClick = () => {
    toggle(text, { rate })
  }

  if (appearance === 'outlined') {
    return (
      <Button
        variant="icon"
        size={size}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-pressed={isSpeaking}
        className={className}
      >
        {icon}
      </Button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isSpeaking}
      className={cn(
        AUDIO_BASE,
        appearance === 'soft' ? AUDIO_SOFT : AUDIO_TINTED,
        isSpeaking ? AUDIO_SPEAKING : '',
        className,
      )}
    >
      {icon}
    </button>
  )
}

export type { AudioButtonAppearance, AudioButtonProps, AudioButtonSize } from './type'
