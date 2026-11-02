import { SpeakerHigh, Pause, Gauge } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import type { StoryAudioControlsProps } from './type'
import { PLAYBACK_RATE_OPTIONS } from './constant'

export function StoryAudioControls({
  isNarrating,
  onToggleNarration,
  playbackRate,
  onPlaybackRateChange,
}: StoryAudioControlsProps) {
  return (
    <div className="mt-3 flex flex-col gap-3.5 border-t border-border-subtle/60 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Botón principal de narración completa */}
        <Button
          variant={isNarrating ? 'primary' : 'secondary'}
          size="sm"
          onClick={onToggleNarration}
          className="flex items-center gap-2"
        >
          {isNarrating ? (
            <>
              <Pause size={16} weight="bold" />
              <span>Detener narración</span>
            </>
          ) : (
            <>
              <SpeakerHigh size={16} weight="bold" />
              <span>Escuchar narración completa</span>
            </>
          )}
        </Button>

        {/* Ajuste de velocidad de voz */}
        <div
          className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-page/80 px-2.5 py-1 text-xs"
          role="group"
          aria-label="Velocidad de reproducción de audio"
        >
          <span
            className="flex items-center gap-1 font-semibold text-text-tertiary select-none"
            title="Velocidad de reproducción de la narración y palabras clave"
          >
            <Gauge size={14} weight="bold" />
            <span>Velocidad:</span>
          </span>
          <div className="flex items-center gap-0.5">
            {PLAYBACK_RATE_OPTIONS.map((rate) => {
              const isSelected = playbackRate === rate.value
              return (
                <button
                  key={rate.value}
                  type="button"
                  onClick={() => onPlaybackRateChange(rate.value)}
                  aria-pressed={isSelected}
                  title={`Velocidad ${rate.label}`}
                  className={`cursor-pointer rounded-lg px-2 py-0.5 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-text-secondary hover:bg-surface hover:text-text-main'
                  }`}
                >
                  {rate.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="text-xs text-text-secondary">
        Haz clic en los términos resaltados para ver su traducción y escuchar su pronunciación (a{' '}
        <span className="font-semibold text-text-main">{playbackRate}x</span> de velocidad).
      </p>
    </div>
  )
}
