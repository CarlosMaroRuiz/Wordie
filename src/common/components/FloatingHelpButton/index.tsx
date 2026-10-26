import { useState } from 'react'
import { QuestionIcon } from '@phosphor-icons/react'
import { FLOATING_HELP_BUTTON, FLOATING_HELP_TOOLTIP } from './constant'
import { HelpModalDialog } from './HelpModalDialog'
import type { FloatingHelpButtonProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function FloatingHelpButton({
  children,
  title,
  subtitle,
  onClick,
  isOpen: controlledIsOpen,
  onOpenChange,
  ariaLabel = 'Abrir guía de ayuda',
  tooltip = 'Guía de ayuda',
  closeLabel,
  className,
  icon,
}: FloatingHelpButtonProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isControlled = controlledIsOpen !== undefined
  const open = isControlled ? controlledIsOpen : internalIsOpen

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(next)
    }
    onOpenChange?.(next)
  }

  const handleButtonClick = () => {
    if (onClick) {
      onClick()
    } else {
      setOpen(true)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={ariaLabel}
        className={cn(FLOATING_HELP_BUTTON, className)}
      >
        {icon ?? <QuestionIcon size={26} weight="bold" />}

        {tooltip && isHovered ? (
          <span role="tooltip" className={FLOATING_HELP_TOOLTIP}>
            {tooltip}
          </span>
        ) : null}
      </button>

      {children ? (
        <HelpModalDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title={title}
          subtitle={subtitle}
          closeLabel={closeLabel}
        >
          {children}
        </HelpModalDialog>
      ) : null}
    </>
  )
}

export type { FloatingHelpButtonProps } from './type'
export { HelpModalDialog } from './HelpModalDialog'
