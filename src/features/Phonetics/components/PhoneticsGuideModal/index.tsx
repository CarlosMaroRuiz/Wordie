import {
  BookOpenIcon,
  EyeIcon,
  GridFourIcon,
  WaveformIcon,
} from '@phosphor-icons/react'
import { GUIDE_SECTIONS } from './constant'
import { GuideSectionCard } from './GuideSectionCard'

const ICON_MAP = {
  ipa: <BookOpenIcon size={20} weight="bold" />,
  count: <GridFourIcon size={20} weight="bold" />,
  sound: <WaveformIcon size={20} weight="bold" />,
  read: <EyeIcon size={20} weight="bold" />,
}

export function PhoneticsGuideContent() {
  return (
    <div className="flex flex-col gap-4">
      {GUIDE_SECTIONS.map(section => (
        <GuideSectionCard
          key={section.id}
          section={section}
          icon={ICON_MAP[section.iconName]}
        />
      ))}
    </div>
  )
}
