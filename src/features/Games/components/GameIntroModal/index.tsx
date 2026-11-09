import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import {
  INTRO_DESCRIPTION,
  INTRO_ICON_WRAP,
  INTRO_NOTE,
  INTRO_STEP,
  INTRO_STEP_INDEX,
  INTRO_STEPS,
  INTRO_TITLE,
} from './constant'
import type { GameIntroModalProps } from './type'

export function GameIntroModal({
  open,
  title,
  description,
  icon,
  steps,
  note,
  onAccept,
}: GameIntroModalProps) {
  return (
    <ModalBase
      open={open}
      onClose={onAccept}
      size="md"
      hideCloseButton
      headerSlot={
        <div className="px-6 pt-6 text-center">
          <div className={INTRO_ICON_WRAP}>{icon}</div>
          <h2 className={INTRO_TITLE}>{title}</h2>
          <p className={INTRO_DESCRIPTION}>{description}</p>
        </div>
      }
      footer={
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onAccept}
          className="min-h-12 rounded-full text-base font-bold shadow-brand"
        >
          ¡Entendido, a jugar!
        </Button>
      }
    >
      {steps && steps.length > 0 ? (
        <div className={INTRO_STEPS}>
          {steps.map((step, index) => (
            <p key={step} className={INTRO_STEP}>
              <span className={INTRO_STEP_INDEX}>{index + 1}</span>
              <span>{step}</span>
            </p>
          ))}
        </div>
      ) : null}

      {note ? <p className={INTRO_NOTE}>{note}</p> : null}
    </ModalBase>
  )
}

export type { GameIntroModalProps } from './type'
