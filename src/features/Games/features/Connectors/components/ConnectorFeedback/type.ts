import type { ConnectorSeamDTO } from '../../type'

export interface SeamResult {
  seam: ConnectorSeamDTO
  given: string | null
  isRight: boolean
}

export interface ConnectorFeedbackProps {
  results: SeamResult[]
  isChecked: boolean
  allFilled: boolean
  isLast: boolean
  onCheck: () => void
  onNext: () => void
}
