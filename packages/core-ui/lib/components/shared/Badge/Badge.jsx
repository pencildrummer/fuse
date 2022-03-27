import classNames from "classnames";
import styles from './Badge.module.scss';

export default function Badge({
  className,
  size,
  ...props
}) {
  return <div className={classNames(
    styles.badge,
    {
      'badge-sm': size == 'sm',
    },
    className
  )}>
    {props.children}
  </div>
}