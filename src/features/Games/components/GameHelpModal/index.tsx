import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import type { GameHelpModalProps } from './type'

/** Modal de ayuda genérico: lista de bloques con título y cuerpo. */
export function GameHelpModal({
  open,
  onClose,
  title,
  subtitle,
  sections,
  closeLabel = '¡Entendido!',
}: GameHelpModalProps) {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      size="md"
      scrollable
      title={title}
      subtitle={subtitle}
      footer={
        <div className="flex w-full justify-end">
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="min-h-12 w-full text-base font-bold sm:min-h-10 sm:w-auto sm:text-sm"
          >
            {closeLabel}
          </Button>
        </div>
      }
    >
      <ul className="flex flex-col gap-2.5">
        {sections.map(section => (
          <li
            key={section.title}
            className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-muted/50 p-3"
          >
            {section.icon ? <span className="mt-0.5 shrink-0">{section.icon}</span> : null}
            <div>
              <p className="text-sm font-bold text-text-main">{section.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{section.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </ModalBase>
  )
}

export type { GameHelpModalProps, GameHelpSection } from './type'
