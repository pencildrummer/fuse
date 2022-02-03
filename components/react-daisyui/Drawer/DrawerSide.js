import classNames from "classnames";

export default function DrawerSide({
  ...props
}) {
  return (
    <div className={classNames(
      'drawer-side',
      props.className
    )}>
      {props.children}
    </div>
  )
}