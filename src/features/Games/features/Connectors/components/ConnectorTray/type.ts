import type { ConnectorSeamDTO } from '../../type'

export interface ConnectorTrayProps {
  seam: ConnectorSeamDTO
  selected: string | null
  disabled: boolean
  onChoose: (text: string) => void
}
