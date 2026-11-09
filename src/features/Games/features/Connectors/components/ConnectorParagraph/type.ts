import type { ConnectorParagraphDTO, SeamAnswers } from '../../type'

export interface ConnectorParagraphProps {
  paragraph: ConnectorParagraphDTO
  answers: SeamAnswers
  activeSeam: number
  isChecked: boolean
  onSelectSeam: (seamIndex: number) => void
}
