import type { PhraseFilter } from '../../type'

export const FILTER_OPTIONS: Array<{ label: string; value: PhraseFilter }> = [
  { label: 'Todas', value: 'all' },
  { label: 'Commandment', value: 'Commandment' },
  { label: 'Daily Standup', value: 'Daily Standup' },
  { label: 'PR Review', value: 'PR Review' },
  { label: 'Blocker', value: 'Blocker' },
]
