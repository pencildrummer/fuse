import classNames from "classnames";
import styles from './Progress.module.scss';

export default function Progress({
  className,
  ...props
}) {
  return <progress className={classNames(
    'h-1 w-full',
    'appearance-none',
    //'rounded-sm overflow-hidden',
    'dark:bg-gray-700',
    styles.progress,
    className
  )} {...props}/>
}