import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from '@phosphor-icons/react'
import {
  MODAL_BACKDROP,
  MODAL_PANEL_SIZE,
  MODAL_PANEL_VARIANT,
  MODAL_SCROLLABLE,
  MODAL_HEADER,
  MODAL_BODY_BASE,
  MODAL_FOOTER,
  MODAL_CLOSE_BUTTON,
} from './constant'
import type { ModalBaseProps } from './type'

export function ModalBase({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  headerSlot,
  size = 'md',
  variant = 'surface',
  hideCloseButton = false,
  scrollable = false,
  padding = 'normal',
  className = '',
  bodyClassName = '',
}: ModalBaseProps) {
  const panelClasses = [
    MODAL_PANEL_SIZE[size],
    MODAL_PANEL_VARIANT[variant],
    scrollable ? MODAL_SCROLLABLE : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const bodyClasses = [
    MODAL_BODY_BASE,
    padding === 'normal' ? 'p-6' : '',
    bodyClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const hasDefaultHeader = Boolean(title || subtitle || !hideCloseButton)

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className={MODAL_BACKDROP} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className={panelClasses}>
          {/* Encabezado: slot personalizado o header estándar con título y botón cerrar */}
          {headerSlot !== undefined ? (
            headerSlot
          ) : hasDefaultHeader ? (
            <div className={MODAL_HEADER}>
              <div>
                {subtitle ? (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {subtitle}
                  </span>
                ) : null}
                {title ? (
                  <DialogTitle as="div" className="text-lg font-bold text-text-main flex items-center">
                    {title}
                  </DialogTitle>
                ) : null}
              </div>

              {!hideCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar modal"
                  className={MODAL_CLOSE_BUTTON}
                >
                  <X size={20} weight="bold" />
                </button>
              )}
            </div>
          ) : null}

          {/* Cuerpo */}
          {children ? <div className={bodyClasses}>{children}</div> : null}

          {/* Footer opcional */}
          {footer ? <div className={MODAL_FOOTER}>{footer}</div> : null}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export type { ModalBaseProps } from './type'
