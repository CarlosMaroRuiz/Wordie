import { motion, type HTMLMotionProps } from 'motion/react'
import type { AnchorHTMLAttributes, Ref } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CHIP_ACTIVE,
  CHIP_BASE,
  CHIP_IDLE,
  CHIP_LABEL,
  CHIP_SIZE,
  CHIP_TOUCH_TARGET,
} from './constant'
import type { ChipProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const CHIP_SPRING = { type: 'spring', stiffness: 400, damping: 17 } as const

export function Chip({
  to,
  size = 'md',
  active = false,
  className,
  type = 'button',
  icon,
  children,
  ref,
  ...props
}: ChipProps) {
  const content = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className={CHIP_LABEL}>{children}</span>
    </>
  )

  if (to) {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
      cn(
        CHIP_BASE,
        CHIP_TOUCH_TARGET,
        CHIP_SIZE[size],
        isActive ? CHIP_ACTIVE : CHIP_IDLE,
        className,
      )

    return (
      <NavLink
        to={to}
        className={linkClass}
        ref={ref as Ref<HTMLAnchorElement>}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </NavLink>
    )
  }

  return (
    <motion.button
      type={type ?? 'button'}
      className={cn(
        CHIP_BASE,
        CHIP_TOUCH_TARGET,
        CHIP_SIZE[size],
        active ? CHIP_ACTIVE : CHIP_IDLE,
        className,
      )}
      ref={ref as Ref<HTMLButtonElement>}
      transition={CHIP_SPRING}
      whileTap={{ scale: 0.97 }}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {content}
    </motion.button>
  )
}

export type { ChipProps, ChipSize } from './type'
