import classNames from "classnames";

export default function DisplayValue(props) {
  return (
    <div className={classNames(
      'font-bold',
      'font-semibold',
      'cursor-default',
      'text-gray-200',
    )}>
      {props.value}
      {props.children}
    </div>
  )
}