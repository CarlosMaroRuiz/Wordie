import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { ButtonProps } from './type'
import { useButton } from './useButton'

const BUTTON_SPRING = { type: 'spring', stiffness: 400, damping: 17 } as const

export function Button({
  variant = 'primary',
  size = 'lg',
  fullWidth,
  arrow = false,
  className,
  type = 'button',
  ref,
  children,
  ...props
}: ButtonProps) {
  const {
    showArrow,
    buttonClassName,
    arrowClassName,
    arrowIconSize,
    whileHover,
    whileTap,
  } = useButton({ variant, size, fullWidth, arrow, className })

  return (
    <motion.button
      type={type ?? 'button'}
      className={buttonClassName}
      ref={ref}
      transition={BUTTON_SPRING}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
      {showArrow ? (
        <span className={arrowClassName} aria-hidden="true">
          <ArrowUpRightIcon size={arrowIconSize} weight="bold" />
        </span>
      ) : null}
    </motion.button>
  )
}

export type { ButtonProps, ButtonSize, ButtonVariant } from './type'
