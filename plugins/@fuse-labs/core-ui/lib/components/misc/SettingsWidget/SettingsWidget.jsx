import classNames from "classnames"

export default function SettingsWidget({
  className,
  ...props
}) {
  return <div className={classNames(
    'relative',
    'flex flex-col items-stretch justify-start',
    'p-3',
    'space-y-2',
    'rounded-md',
    'overflow-hidden',
    'text-sm',
    'text-gray-900 dark:text-gray-200',
    'bg-gray-300 dark:bg-gray-900',
    className,
  )}>
    {props.children}
  </div>
}