import type { ReactNode } from 'react'

export interface FloatingHelpButtonProps {
  /** Contenido del modal (guías, explicaciones, etc.) */
  children?: ReactNode
  /** Título principal del modal */
  title?: string
  /** Subtítulo o categoría superior */
  subtitle?: string
  /** Texto del tooltip sobre el botón flotante */
  tooltip?: string
  /** Etiqueta ARIA para accesibilidad */
  ariaLabel?: string
  /** Clases CSS adicionales para el botón flotante */
  className?: string
  /** Icono alternativo al QuestionIcon por defecto */
  icon?: ReactNode
  /** Texto del botón de cierre inferior */
  closeLabel?: string
  /** Opcional: estado controlado de apertura si se requiere */
  isOpen?: boolean
  /** Opcional: callback al cambiar estado de apertura */
  onOpenChange?: (open: boolean) => void
  /** Opcional: callback si se desea controlar el click manualmente */
  onClick?: () => void
}

export interface HelpModalDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children?: ReactNode
  closeLabel?: string
}
