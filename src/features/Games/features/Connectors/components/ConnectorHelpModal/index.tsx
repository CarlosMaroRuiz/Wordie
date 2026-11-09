import { GameHelpModal } from '@features/Games/components/GameHelpModal'
import { RELATION_CUE, RELATION_LABEL, RELATION_ORDER } from '../../constant'
import type { ConnectorHelpModalProps } from './type'

const SECTIONS = [
  ...RELATION_ORDER.map(relation => ({
    title: RELATION_LABEL[relation],
    body: RELATION_CUE[relation],
  })),
  {
    title: 'Cláusula o sustantivo',
    body: 'Although, even though, because y unless piden sujeto + verbo. Despite, in spite of y due to piden sustantivo o gerundio.',
  },
  {
    title: 'Posición y coma',
    body: 'However, therefore y moreover abren la oración y llevan coma detrás. Never ponen coma entre el conector y su cláusula: «Although, the coverage» está mal.',
  },
]

export function ConnectorHelpModal({ open, onClose }: ConnectorHelpModalProps) {
  return (
    <GameHelpModal
      open={open}
      onClose={onClose}
      title="Conectores y patrones"
      subtitle="Guía rápida"
      sections={SECTIONS}
    />
  )
}

export type { ConnectorHelpModalProps } from './type'
