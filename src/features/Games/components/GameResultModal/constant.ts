import type { GameResultMetric } from './type'

export const METRICS_GRID: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}

export const metricColumns = (metrics: GameResultMetric[]): string =>
  METRICS_GRID[metrics.length] ?? 'grid-cols-2'
