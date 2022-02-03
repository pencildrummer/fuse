import classNames from "classnames";

export default function Menu({
  ...props
}) {
  return (
    <ul className={classNames(
      'menu',
      props.className
    )}>
      {props.children}
    </ul>
  )
}