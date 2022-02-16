import classNames from "classnames";

export default function DisplayLabel(props) {
  return <div {...props} className={classNames(
    'font-semibold',
    'select-none cursor-default',
    'text-gray-800 dark:text-gray-400',
    props.className
  )}/>
}