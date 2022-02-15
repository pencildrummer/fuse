import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useField } from 'formik'
import { useEffect, useRef, useMemo, useState } from 'react'

function SelectOption(props) {
  return <DropdownMenu.Item className={classNames(
    'flex flex-row space-x-2 items-center',
    'text-sm font-medium',
    'py-0.5 px-1.5',
    'w-full',
    'rounded-sm',
    'transition-colors duration-75',
    'focus:outline-none border-0',
    'cursor-default',
    'text-gray-800 dark:text-gray-300',
    'focus:text-gray-50 focus:bg-blue-600'
  )} {...props}>
    <div className="flex-1">
      {props.children}
    </div>
    {props.selected && (
      <div>
        <CheckIcon className='text-gray-800 bg-blue-600 rounded-full'/>
      </div>
    )}
  </DropdownMenu.Item>
}

export function SelectRaw({
  trigger: TriggerComponent,
  error,
  options,
  className,
  defaultValue,
  onChange,
  onBlur,
  onOpenChange,
  ...props
}) {
  const triggerContainerEl = useRef()
  const [selectedOption, setSelectedOption] = useState(_ => {
    if (!defaultValue) return undefined
    return getOptionForValue(defaultValue)
  })
  const [contentWidth, setContentWidth] = useState()

  // Listen for changes on default value and update selection if no selected option is already present
  useEffect(_ => {
    if (selectedOption) return
    setSelectedOption(getOptionForValue(defaultValue))
  }, [defaultValue])

  // Internal helper
  function getOptionForValue(value) {
    return options?.find(o => (typeof o == 'object') ? o.value == value : o === value)
  }

  useEffect(_ => {
    let size = triggerContainerEl.current.getBoundingClientRect()
    setContentWidth(size.width)
  }, [triggerContainerEl.current])

  useEffect(_ => {
    if (typeof selectedOption == 'object')
      onChange?.(selectedOption?.value)
    else
      onChange?.(selectedOption)
  }, [selectedOption])

  let selectedOptionDisplayText = useMemo(_ => {
    if (!selectedOption) return 'No option selected'
    return selectedOption.label || selectedOption.value || selectedOption
  }, [selectedOption])

  function isSelected(option) {
    return typeof option === 'object'
      ? selectedOption?.value === option.value
      : selectedOption === option
  }

  return <div>
    <DropdownMenu.Root
      onOpenChange={onOpenChange}>
      <div ref={triggerContainerEl} className={classNames(
        'flex flex-row items-center space-x-2',
        className
      )}>
        {(TriggerComponent || props.children) ? (
          <DropdownMenu.Trigger asChild disabled={props.disabled}>
            {TriggerComponent ? <TriggerComponent /> : props.children}
          </DropdownMenu.Trigger>
        ) : (
          <DropdownMenu.Trigger 
            disabled={props.disabled}
            onBlur={onBlur}
            className={classNames(
              'w-full min-w-[180px]',
              'flex flex-row items-center justify-between space-x-2',
              'text-xs',
              'px-1.5 h-[26px]',
              'leading-none',
              'rounded-md',
              'select-none touch-none',
              'font-mono font-medium',
              'bg-gray-900 border border-gray-600 text-gray-300',
              'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
              'disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800',
              {
                'border-red-600 ring-1 ring-red-600': error
              },
            )} >
            <span className='whitespace-nowrap truncate'>
              {selectedOptionDisplayText}
            </span>
            <ChevronDownIcon />
          </DropdownMenu.Trigger>
        )}
      </div>

      <DropdownMenu.Content className={classNames(
        'w-full',
        'flex flex-col items-start',
        'bg-gray-300 dark:bg-gray-800',
        'shadow-md',
        'p-1',
        'rounded-md'
      )} style={{ width: contentWidth || 'auto' }}
        align='end' sideOffset={6}>
        {options?.map((option, i) => 
          <SelectOption key={`option-${i}`}
            value={option.value || option}
            selected={isSelected(option)}
            onClick={_ => setSelectedOption(option)}>
            {option.label || option.value || option}
          </SelectOption>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
}

export default function Select(props) {
  
  const [field, meta, helpers] = useField(props.name)
  const { initialValue } = meta
  const { setValue, setTouched } = helpers

  return <SelectRaw error={meta.touched && meta.error}
    defaultValue={initialValue}
    onChange={setValue}
    onOpenChange={open => open && setTouched(true)}
    onBlur={_ => field.onBlur(field.name)}
    {...props} />
}