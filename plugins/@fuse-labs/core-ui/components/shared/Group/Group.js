import classNames from "classnames";

export default function Group({
  orientation = 'horizontal',
  className,
  ...props
}) {
  return <div className={classNames(
    'flex',
    {
      'flex-row space-x-2 items-center': orientation == 'horizontal',
      'flex-col space-y-2': orientation == 'vertical',
    },
    className
  )} {...props} />
}