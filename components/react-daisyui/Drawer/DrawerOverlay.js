import classNames from "classnames"

export default function DrawerOverlay({
  ...props
}) {
  return (
    <div className={classNames(
      'drawer-overlay',
      props.className
    )}>
      {props.children}
    </div>
  )
}