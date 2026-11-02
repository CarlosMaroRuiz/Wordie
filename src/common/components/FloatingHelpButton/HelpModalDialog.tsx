import { ModalBase } from '@common/ModalBase'
import { Button } from '@common/Button'
import type { HelpModalDialogProps } from './type'

export function HelpModalDialog({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  closeLabel = '¡Entendido, continuar!',
}: HelpModalDialogProps) {
  return (
    <ModalBase
      open={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="lg"
      scrollable
      footer={
        <div className="text-center">
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {closeLabel}
          </Button>
        </div>
      }
    >
      {children}
    </ModalBase>
  )
}
