import classNames from "classnames";

export default function Artboard({
  demo,
  phone,
  horizontal,
  ...props
}) {
  return (
    <div className={classNames(
      'artboard',
      {
        'artboard-demo': demo,
        'horizontal': horizontal
      },
      props.className
    )}>
      {props.children}
    </div>
  )
}