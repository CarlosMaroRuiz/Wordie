import { useReducedMotion } from 'motion/react'
import {
  BUTTON_ARROW,
  BUTTON_BASE,
  BUTTON_ICON_SIZE,
  BUTTON_MOTION_LIFT,
  BUTTON_SECONDARY_SIZE,
  BUTTON_SIZE,
  BUTTON_TAP,
  BUTTON_TOUCH_TARGET,
  BUTTON_VARIANT,
} from './constant'
import type { ButtonProps, ButtonSize, ButtonVariant } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function isIconVariant(variant: ButtonVariant) {
  return variant === 'icon' || variant === 'iconPrimary'
}

function getSizeClass(variant: ButtonVariant, size: ButtonSize, isIcon: boolean) {
  if (isIcon) return BUTTON_ICON_SIZE[size]
  if (variant === 'secondary') return BUTTON_SECONDARY_SIZE[size]
  return BUTTON_SIZE[size]
}

function shouldStretch({
  fullWidth,
  isIcon,
  variant,
  size,
}: {
  fullWidth?: boolean
  isIcon: boolean
  variant: ButtonVariant
  size: ButtonSize
}) {
  return (
    fullWidth ??
    (!isIcon && variant !== 'secondary' && variant !== 'ghost' && size === 'lg')
  )
}

export function useButton({
  variant = 'primary',
  size = 'lg',
  fullWidth,
  arrow = false,
  className,
}: Pick<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'arrow' | 'className'>) {
  const isIcon = isIconVariant(variant)
  const showArrow = Boolean(arrow && !isIcon)
  const reduceMotion = useReducedMotion()

  const buttonClassName = cn(
    BUTTON_BASE,
    BUTTON_TOUCH_TARGET,
    BUTTON_VARIANT[variant],
    getSizeClass(variant, size, isIcon),
    shouldStretch({ fullWidth, isIcon, variant, size }) && 'w-full',
    className,
  )

  const arrowClassName = cn(BUTTON_ARROW.wrap, BUTTON_ARROW.wrapSize[size])
  const arrowIconSize = BUTTON_ARROW.iconSize[size]

  const lift = reduceMotion ? 0 : (BUTTON_MOTION_LIFT[variant] ?? 0)
  const whileHover = lift ? { y: lift } : undefined
  const whileTap = reduceMotion ? undefined : { scale: BUTTON_TAP[size] }

  return {
    isIcon,
    showArrow,
    buttonClassName,
    arrowClassName,
    arrowIconSize,
    whileHover,
    whileTap,
  }
}
