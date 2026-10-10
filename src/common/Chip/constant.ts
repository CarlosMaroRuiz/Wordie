import type { ChipSize } from './type'

export const CHIP_BASE =
  'inline-flex max-w-full items-center justify-center gap-1.5 whitespace-nowrap font-sans font-semibold tracking-[-0.01em] cursor-pointer rounded-full border-[1.5px] transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45 motion-reduce:transition-none'

export const CHIP_LABEL = 'truncate'

export const CHIP_SIZE: Record<ChipSize, string> = {
  md: 'px-[18px] py-2 text-sm',
  sm: 'px-3.5 py-1.5 text-[13px]',
}

export const CHIP_TOUCH_TARGET = '[@media(pointer:coarse)]:min-h-11'

export const CHIP_IDLE =
  'border-border-subtle bg-surface text-text-main hover:border-primary'

export const CHIP_ACTIVE =
  'border-primary bg-primary text-on-primary shadow-[0_4px_14px_rgba(108,92,231,0.25)]'
