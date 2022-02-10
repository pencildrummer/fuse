import classNames from "classnames"
import React, { useMemo } from "react"
import styles from './Button.module.scss'

const Button = React.forwardRef(({
  as: Component = "a",
  squared,
  rounded,
  className,
  size,
  ...props
}, ref) => {
  return <Component
    ref={ref}
    className={classNames(
      'inline-flex select-none items-center justify-center text-sm font-medium',
      styles.btn,
      {
        'btn-sm': size == 'sm',
      },
      {
        'squared': squared,
        'rounded-md': !rounded,
        'rounded-full': rounded
      },
      'transition-colors duration-100',
      'bg-white text-gray-700 hover:bg-gray-50',
      'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-opacity-75',
      'disabled:select-none disabled:touch-none',
      'dark:disabled:opacity-40 dark:disabled:bg-gray-800',
      className
    )}
    {...props} />
})

export default Button