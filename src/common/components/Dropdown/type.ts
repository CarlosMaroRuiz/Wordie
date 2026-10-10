import type { ComponentType, ReactNode } from 'react'

export type DropdownSize = 'sm' | 'md'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  description?: string
  keywords?: string[]
  icon?: ComponentType<{ size?: number | string; weight?: 'regular' | 'bold' | 'fill' }>
}

export type DropdownProps<T extends string = string> = {
  options: DropdownOption<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
  labelHidden?: boolean
  icon?: ReactNode
  size?: DropdownSize
  placeholder?: string
  disabled?: boolean
  className?: string
  menuClassName?: string
  ariaLabel?: string
  searchable?: boolean
  dataTour?: string
}
