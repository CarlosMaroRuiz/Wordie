import type { ReactNode } from 'react'

export type TourStep = {
  target: string
  route?: string
  title: string
  description: ReactNode
}

export type TourRect = {
  top: number
  left: number
  width: number
  height: number
}

export type OnboardingTourProps = {
  open: boolean
  onClose: () => void
  steps: TourStep[]
}

export type TourPosition = 'top' | 'bottom'
