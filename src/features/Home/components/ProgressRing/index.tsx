import type { ProgressRingProps } from './type'

const SIZE = 104
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CENTER = SIZE / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing({ value, label }: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)))
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="relative grid size-[88px] shrink-0 place-items-center min-[400px]:size-[104px]"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden="true">
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-border-subtle"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          className="stroke-primary transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
        />
      </svg>
      <span className="text-lg font-extrabold tabular-nums text-text-main min-[400px]:text-xl">
        {clamped}%
      </span>
    </div>
  )
}
