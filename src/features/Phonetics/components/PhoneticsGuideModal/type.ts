import type { ReactNode } from 'react'

export interface GuideSection {
  id: string
  title: string
  subtitle: string
  content: string
  bullets?: string[]
  iconName: 'ipa' | 'count' | 'sound' | 'read'
}

export interface PhoneticsGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface GuideSectionCardProps {
  section: GuideSection
  icon: ReactNode
}
