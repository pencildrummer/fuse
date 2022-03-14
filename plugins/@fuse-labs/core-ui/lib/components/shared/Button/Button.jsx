import classNames from "classnames"
import React, { useMemo } from "react"
import styles from './Button.module.scss'

const Button = React.forwardRef(({
  as = "button",
  squared,
  rounded,
  className,
  size,
  mode = 'normal',
  ...props
}, ref) => {

  let ButtonComponent = as
  if (props.type == 'submit') { ButtonComponent = 'button' }

  return <ButtonComponent
    ref={ref}
    className={classNames(
      'inline-flex select-none items-center justify-center text-sm font-medium',
      styles.btn,
      {
        'btn-xs': size == 'xs',
        'btn-sm': size == 'sm',
      },
      {
        'btn-normal': mode == 'normal',
        'btn-ghost': mode == 'ghost',
      },
      {
        'squared': squared,
        'rounded-md': !rounded,
        'rounded-full': rounded
      },
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-opacity-75',
      {
        'select-none touch-none disabled': props.disabled,
      },
      'dark:disabled:opacity-40 dark:disabled:bg-gray-800',
      className
    )}
    {...props} />
})
Button.displayName = "Button"
export default Button