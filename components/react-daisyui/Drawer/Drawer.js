import classNames from "classnames"

export default function Drawer({
  mobile,
  ...props
}) {
  return (
    <div className={classNames(
      'drawer',
      {
        'drawer-mobile': mobile
      },
      props.className
    )}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {props.children}
    </div>
  )
}