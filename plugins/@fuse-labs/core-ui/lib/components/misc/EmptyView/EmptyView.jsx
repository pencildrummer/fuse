import classNames from 'classnames'

export default function EmptyView({
  text,
  ...props
}) {
  return (
    <div {...props} className={classNames(
      'flex items-center justify-center',
      props.className
    )}>
      <span className="font-bold">
        {text}
        {props.children}
      </span>
    </div>
  )
}