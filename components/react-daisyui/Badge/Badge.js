import classNames from "classnames";
import { useMemo } from "react";

export default function Badge({
  variant,
  className,
  ...props
}) {

  const variantClassName = useMemo(_ => {
    switch (variant) {
      case 'primary': return 'bg-primary'
      default:        return 'bg-neutral'
    }
  }, [variant])

  return <div className={classNames(
    'badge',
    variantClassName,
    className
  )} {...props} />
}