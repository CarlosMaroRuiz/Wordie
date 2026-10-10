import type { ButtonSize, ButtonVariant } from './type'

export const BUTTON_BASE =
  'inline-flex items-center justify-center font-sans font-bold tracking-[-0.015em] cursor-pointer transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none motion-reduce:transition-none'

export const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    'border-0 bg-primary text-on-primary shadow-[0_4px_14px_rgba(108,92,231,0.25)] hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(108,92,231,0.32)]',
  secondary:
    'border-[1.5px] border-border-subtle bg-surface text-primary shadow-none hover:border-primary',
  ghost: 'border-0 bg-transparent text-primary shadow-none',
  success:
    'border-0 bg-success text-text-main shadow-[0_4px_14px_rgba(32,201,151,0.3)]',
  danger:
    'border-0 bg-error text-text-main shadow-[0_4px_14px_rgba(255,71,87,0.3)]',
  icon: 'border-[1.5px] border-border-subtle bg-surface text-text-main shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-primary',
  iconPrimary:
    'border-[1.5px] border-primary bg-primary text-on-primary shadow-[0_4px_12px_rgba(108,92,231,0.25)]',
}

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  lg: 'min-h-[50px] gap-2.5 rounded-2xl px-[22px] py-3.5 text-base',
  md: 'min-h-11 gap-2.5 rounded-2xl px-[18px] py-2.5 text-[15px] sm:px-[22px]',
  sm: 'min-h-9 gap-2 rounded-[14px] px-3.5 py-[7px] text-sm sm:px-4',
}

export const BUTTON_TOUCH_TARGET = '[@media(pointer:coarse)]:min-h-11'

export const BUTTON_ICON_SIZE: Record<ButtonSize, string> = {
  lg: 'size-11 rounded-[14px]',
  md: 'size-11 rounded-[14px]',
  sm: 'size-10 rounded-xl',
}

export const BUTTON_SECONDARY_SIZE: Record<ButtonSize, string> = {
  lg: 'min-h-11 gap-2 rounded-[14px] px-[18px] py-2.5 text-sm',
  md: 'min-h-11 gap-2 rounded-[14px] px-[18px] py-2.5 text-sm',
  sm: 'min-h-9 gap-1.5 rounded-[14px] px-4 py-[7px] text-[13px]',
}

export const BUTTON_ARROW = {
  wrap: 'ml-auto grid shrink-0 place-items-center rounded-full bg-white/22',
  wrapSize: {
    lg: 'size-7',
    md: 'size-6',
    sm: 'size-6',
  } satisfies Record<ButtonSize, string>,
  iconSize: {
    lg: 16,
    md: 14,
    sm: 14,
  } satisfies Record<ButtonSize, number>,
}

export const BUTTON_MOTION_LIFT: Partial<Record<ButtonVariant, number>> = {
  primary: -1,
  success: -1,
  danger: -1,
}

export const BUTTON_TAP: Record<ButtonSize, number> = {
  lg: 0.98,
  md: 0.98,
  sm: 0.97,
}
