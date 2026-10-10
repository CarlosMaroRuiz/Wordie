import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import type { HTMLMotionProps, MotionProps } from 'motion/react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'icon'
  | 'iconPrimary'

export type ButtonSize = 'lg' | 'md' | 'sm'

type MotionOwnedKeys = keyof MotionProps & keyof ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionOwnedKeys> &
  HTMLMotionProps<'button'> & {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    arrow?: boolean
    children?: ReactNode
    ref?: Ref<HTMLButtonElement>
  }
