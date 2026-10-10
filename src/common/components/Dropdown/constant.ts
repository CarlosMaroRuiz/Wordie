import type { DropdownSize } from './type'

export const DROPDOWN_BUTTON =
  'inline-flex w-full cursor-pointer items-center gap-2 rounded-[16px] border-[1.5px] border-border-subtle bg-surface font-semibold text-text-main transition-colors duration-150 ease-out hover:border-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none'

export const DROPDOWN_CONTROL =
  'inline-flex w-full items-center gap-2 rounded-[16px] border-[1.5px] border-border-subtle bg-surface font-semibold text-text-main transition-colors duration-150 ease-out hover:border-primary motion-reduce:transition-none'

export const DROPDOWN_SIZE: Record<DropdownSize, string> = {
  sm: 'min-h-9 px-3.5 text-[13px]',
  md: 'min-h-11 px-4 text-sm',
}

export const DROPDOWN_LABEL =
  'mb-1.5 block text-[12px] font-bold tracking-[0.5px] text-text-secondary uppercase'

export const DROPDOWN_OPTIONS =
  'z-50 max-h-72 overflow-auto rounded-[16px] border-[1.5px] border-border-subtle bg-surface p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] focus:outline-none'

export const DROPDOWN_PANEL_POSITION = 'absolute top-full left-0 mt-1.5 w-full'

export const DROPDOWN_OPTION =
  'group flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-text-main transition-colors duration-100 ease-out data-focus:bg-primary-light data-focus:text-primary data-selected:font-bold motion-reduce:transition-none'

export const DROPDOWN_OPTION_DESC = 'mt-0.5 text-[12px] font-normal text-text-secondary'

export const DROPDOWN_INPUT =
  'w-full min-w-0 border-0 bg-transparent p-0 font-semibold text-text-main outline-none placeholder:font-normal placeholder:text-text-secondary'

export const DROPDOWN_EMPTY = 'px-3 py-2.5 text-sm text-text-secondary'

export const DROPDOWN_ICON = 'shrink-0 text-text-secondary'

export const DROPDOWN_CARET = 'ml-auto shrink-0 text-text-secondary'

export const DROPDOWN_OVERLAY_BUTTON = 'absolute inset-0 cursor-pointer rounded-[16px]'
