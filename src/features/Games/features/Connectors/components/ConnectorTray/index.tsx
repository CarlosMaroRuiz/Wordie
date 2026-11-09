import { cn } from '@common/utils/cn'
import { CARD_BASE, CARD_IDLE, CARD_USED, PATTERN_LABEL, RELATION_LABEL } from '../../constant'
import type { ConnectorTrayProps } from './type'

export function ConnectorTray({ seam, selected, disabled, onChoose }: ConnectorTrayProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {seam.options.map(option => (
        <button
          key={option.text}
          type="button"
          disabled={disabled}
          onClick={() => onChoose(option.text)}
          className={cn(CARD_BASE, option.text === selected ? CARD_USED : CARD_IDLE)}
        >
          <span className="text-sm font-bold text-text-main">{option.text}</span>
          <span className="text-[11px] font-semibold text-text-secondary">
            {RELATION_LABEL[option.relation]} · {PATTERN_LABEL[option.pattern]}
          </span>
        </button>
      ))}
    </div>
  )
}

export type { ConnectorTrayProps } from './type'
