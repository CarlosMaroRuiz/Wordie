export type AudioButtonAppearance = 'soft' | 'tinted' | 'outlined'

export type AudioButtonSize = 'sm' | 'md'

export interface AudioButtonProps {
  text: string
  rate?: number
  label?: string
  appearance?: AudioButtonAppearance
  size?: AudioButtonSize
  className?: string
}
