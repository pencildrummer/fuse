import classNames from "classnames";

export default function Input({
  className,
  ...props
}) {
  return <input type="text" className={classNames(
    'text-xs px-1.5',
    'h-[26px]',
    'rounded-md',
    'font-mono font-medium',
    'bg-gray-900 border border-gray-600 text-gray-300',
    'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
    'disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800',
    className
  )} {...props} />
}