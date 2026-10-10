import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import type { HTMLMotionProps, MotionProps } from 'motion/react'
import type { To } from 'react-router-dom'

export type ChipSize = 'md' | 'sm'

type MotionOwnedKeys = keyof MotionProps &
  keyof (ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>)

type ChipMotionProps = HTMLMotionProps<'button'> | HTMLMotionProps<'a'>

export type ChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  MotionOwnedKeys
> &
  ChipMotionProps & {
    to?: To
    size?: ChipSize
    active?: boolean
    icon?: ReactNode
    children?: ReactNode
    ref?: Ref<HTMLElement>
  }
