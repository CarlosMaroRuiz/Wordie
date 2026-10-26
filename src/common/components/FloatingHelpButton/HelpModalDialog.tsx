import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react'
import { Button } from '@common/Button'
import { HELP_MODAL_BACKDROP, HELP_MODAL_PANEL } from './constant'
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className={HELP_MODAL_BACKDROP} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className={HELP_MODAL_PANEL}>
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              {subtitle ? (
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {subtitle}
                </span>
              ) : null}
              {title ? (
                <DialogTitle className="mt-0.5 text-xl font-extrabold text-text-main sm:text-2xl">
                  {title}
                </DialogTitle>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal de ayuda"
              className="rounded-full p-1.5 text-text-tertiary transition hover:bg-surface-muted hover:text-text-main"
            >
              <XIcon size={22} weight="bold" />
            </button>
          </div>

          <div className="flex flex-col gap-4">{children}</div>

          <div className="mt-6 border-t border-border-subtle pt-4 text-center">
            <Button
              variant="primary"
              size="md"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              {closeLabel}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
