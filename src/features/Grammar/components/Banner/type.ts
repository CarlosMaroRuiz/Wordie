import type { GrammarTopic } from '@features/Grammar/types';

export type BannerProps = Pick<GrammarTopic, 'title' | 'category' | 'level' | 'explanation' | 'formula' | 'formulas'>;