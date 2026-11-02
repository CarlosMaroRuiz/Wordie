import type { ReactNode } from 'react'

export interface ModalBaseProps {
  /** Controla si el modal está abierto */
  open: boolean
  /** Callback al cerrar (Escape, backdrop, botón X) */
  onClose: () => void
  /** Título del modal renderizado en DialogTitle */
  title?: ReactNode
  /** Subtítulo o categoría que aparece encima del título */
  subtitle?: string
  /** Contenido libre dentro del cuerpo del modal */
  children?: ReactNode
  /** Contenido libre del footer (botones de acción). Si no se pasa, no se renderiza footer */
  footer?: ReactNode
  /** Slot que reemplaza el encabezado completo (título + botón cerrar). Omite el header estándar */
  headerSlot?: ReactNode
  /** Tamaño máximo del panel */
  size?: 'sm' | 'md' | 'lg'
  /** Variante de fondo del panel ('surface' para blanco/tarjeta, 'page' para fondo de app) */
  variant?: 'surface' | 'page'
  /** Si true, oculta el botón X de cierre del encabezado */
  hideCloseButton?: boolean
  /** Si true, permite scroll interno del contenido si excede el alto máximo */
  scrollable?: boolean
  /** Padding interno del cuerpo ('normal' aplica p-6, 'none' sin padding) */
  padding?: 'normal' | 'none'
  /** Clases CSS adicionales para el panel */
  className?: string
  /** Clases CSS adicionales para el contenedor del cuerpo */
  bodyClassName?: string
}
