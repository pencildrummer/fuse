import classNames from "classnames";

export default function DrawerContent({
  ...props
}) {
  return (
    <div className={classNames(
      'drawer-content',
      props.className
    )}>
      {props.children}
    </div>
  )
}