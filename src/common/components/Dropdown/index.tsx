import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react'
import { useRef, useState, type ElementType } from 'react'
import {
  DROPDOWN_BUTTON,
  DROPDOWN_CARET,
  DROPDOWN_CONTROL,
  DROPDOWN_EMPTY,
  DROPDOWN_ICON,
  DROPDOWN_INPUT,
  DROPDOWN_LABEL,
  DROPDOWN_OPTION,
  DROPDOWN_OPTION_DESC,
  DROPDOWN_OPTIONS,
  DROPDOWN_OVERLAY_BUTTON,
  DROPDOWN_PANEL_POSITION,
  DROPDOWN_SIZE,
  DROPDOWN_TEXT_SIZE,
} from './constant'
import type { DropdownOption, DropdownProps } from './type'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const ICON_SIZE = 16

function matches(option: DropdownOption, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [option.label, option.description ?? '', ...(option.keywords ?? [])]
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export function Dropdown<T extends string = string>({
  options,
  value,
  onChange,
  label,
  labelHidden = false,
  icon,
  size = 'md',
  placeholder = 'Selecciona una opción',
  disabled = false,
  className,
  menuClassName,
  ariaLabel,
  searchable = true,
  dataTour,
}: DropdownProps<T>) {
  const [query, setQuery] = useState('')
  const selected = options.find(o => o.value === value)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const labelClass = labelHidden ? 'sr-only' : DROPDOWN_LABEL

  const optionListClass = cn(
    DROPDOWN_OPTIONS,
    'origin-top transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none',
    menuClassName,
  )

  const renderOption = (Option: ElementType, option: DropdownOption<T>) => {
    const OptionIcon = option.icon
    return (
      <Option key={option.value} value={option.value} className={DROPDOWN_OPTION}>
        {OptionIcon ? (
          <span className={DROPDOWN_ICON}>
            <OptionIcon size={ICON_SIZE} weight="bold" />
          </span>
        ) : null}

        <span className="min-w-0 flex-1">
          <span className="block truncate">{option.label}</span>
          {option.description ? (
            <span className={DROPDOWN_OPTION_DESC}>{option.description}</span>
          ) : null}
        </span>

        <CheckIcon
          size={ICON_SIZE}
          weight="bold"
          className="shrink-0 text-primary opacity-0 group-data-selected:opacity-100"
          aria-hidden="true"
        />
      </Option>
    )
  }

  if (searchable) {
    const filtered = options.filter(o => matches(o, query))

    return (
      <Combobox
        value={value}
        onChange={next => {
          if (next !== null) onChange(next as T)
        }}
        onClose={() => setQuery('')}
        disabled={disabled}
      >
        {({ open }) => (
          <div className={cn('relative', className)}>
            {label ? <ComboboxLabel className={labelClass}>{label}</ComboboxLabel> : null}

            <div
              data-tour={dataTour}
              className={cn(
                DROPDOWN_CONTROL,
                DROPDOWN_SIZE[size],
                'relative cursor-text focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-primary',
                disabled && 'cursor-not-allowed opacity-45',
              )}
              onPointerDown={e => {
                if (disabled || open || e.button !== 0) return
                if (buttonRef.current?.contains(e.target as Node)) return
                buttonRef.current?.click()
                inputRef.current?.focus()
              }}
            >
              <ComboboxButton
                ref={buttonRef}
                type="button"
                aria-label="Mostrar opciones"
                className={DROPDOWN_OVERLAY_BUTTON}
              />

              {icon ? (
                <span className={cn(DROPDOWN_ICON, 'relative pointer-events-none')}>{icon}</span>
              ) : null}

              <ComboboxInput
                ref={inputRef}
                className={cn(DROPDOWN_INPUT, DROPDOWN_TEXT_SIZE[size], 'relative cursor-text')}
                displayValue={() => selected?.label ?? ''}
                onChange={e => setQuery(e.target.value)}
                placeholder={selected ? undefined : placeholder}
                aria-label={ariaLabel}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                inputMode="search"
                enterKeyHint="search"
                spellCheck={false}
              />

              <CaretUpDownIcon
                size={ICON_SIZE}
                weight="bold"
                className={cn(DROPDOWN_CARET, 'relative pointer-events-none')}
                aria-hidden="true"
              />
            </div>

            <ComboboxOptions className={cn(optionListClass, DROPDOWN_PANEL_POSITION)}>
              {filtered.length === 0 ? (
                <div className={DROPDOWN_EMPTY}>Sin resultados</div>
              ) : (
                filtered.map(o => renderOption(ComboboxOption, o))
              )}
            </ComboboxOptions>
          </div>
        )}
      </Combobox>
    )
  }

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className={cn('relative', className)}>
        {label ? <ListboxLabel className={labelClass}>{label}</ListboxLabel> : null}

        <ListboxButton className={cn(DROPDOWN_BUTTON, DROPDOWN_SIZE[size])} aria-label={ariaLabel}>
          {icon ? <span className={DROPDOWN_ICON}>{icon}</span> : null}
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <CaretUpDownIcon
            size={ICON_SIZE}
            weight="bold"
            className={DROPDOWN_CARET}
            aria-hidden="true"
          />
        </ListboxButton>

        <ListboxOptions className={cn(optionListClass, DROPDOWN_PANEL_POSITION)}>
          {options.map(o => renderOption(ListboxOption, o))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export type { DropdownOption, DropdownProps, DropdownSize } from './type'
