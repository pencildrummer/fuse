import classNames from "classnames";
import { useMemo } from "react";

export default function Button({
  variant,
  size,
  shape,
  className,
  ...props
}) {

  const sizeClassName = useMemo(_ => {
    switch (size) {
      case 'xs':    return 'btn-xs'
      case 'sm':    return 'btn-sm'
      case 'md':    return 'btn-md'
      case 'lg':    return 'btn-lg'
    }
  }, [size])

  const variantClassName = useMemo(_ => {
    switch (variant) {
      case 'primary':   return 'btn-primary'
      case 'secondary': return 'btn-secondary'
      case 'accent':    return 'btn-accent'
      case 'info':      return 'btn-info'
      case 'success':   return 'btn-success'
      case 'warning':   return 'btn-warning'
      case 'error':     return 'btn-error'
      case 'ghost':     return 'btn-ghost'
      case 'link':      return 'btn-link'
    }
  }, [variant])

  const shapeClassName = useMemo(_ => {
    switch (shape) {
      case 'circle':  return 'btn-circle'
      case 'square':  return 'btn-square'
    }
  }, [shape])

  return (
    <button className={classNames(
      'btn',
      sizeClassName,
      variantClassName,
      shapeClassName,
      className
    )} {...props} />
  )
}