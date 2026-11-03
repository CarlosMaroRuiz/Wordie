import { Lightbulb, CursorClick, Flame, SpeakerHigh } from '@phosphor-icons/react'
import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import type { SentenceHelpModalProps } from './type'

export function SentenceHelpModal({ open, onClose }: SentenceHelpModalProps) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      size="md"
      scrollable
      title="¿Cómo jugar Sentence Builder?"
      subtitle="Guía rápida"
      footer={
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose} className="w-full sm:w-auto">
            ¡Entendido!
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5 py-1 text-sm text-text-secondary">
        <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-page/50 p-3">
          <CursorClick size={20} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <span className="font-bold text-text-main">1. Arma la oración: </span>
            Toca los bloques de palabras del banco para colocarlos en orden lógico en inglés. Si te
            equivocas, toca cualquier palabra colocada para regresarla.
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-page/50 p-3">
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-warning" />
          <div>
            <span className="font-bold text-text-main">2. Consejos gramaticales: </span>
            Usa "Ver pista gramatical" para recordar reglas de gerundios, preposiciones y verbos
            modales del inglés diario.
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-page/50 p-3">
          <Flame size={20} className="mt-0.5 shrink-0 text-warning" />
          <div>
            <span className="font-bold text-text-main">3. Multiplicador de racha: </span>
            Cada acierto consecutivo suma puntos extra por racha activa.
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-page/50 p-3">
          <SpeakerHigh size={20} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <span className="font-bold text-text-main">4. Pronunciación auditiva: </span>
            Al acertar, escucharás la oración leída con voz nativa para reforzar entonación y ritmo.
          </div>
        </div>
      </div>
    </ModalBase>
  )
}
