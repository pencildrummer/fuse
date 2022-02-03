import classNames from "classnames";
import Link from 'next/link'

export default function MenuItem({
  icon: Icon,
  iconClassName,
  href,
  ...props
}) {

  const contents = (<>
    {Icon && <Icon className={classNames('w-5 h-5', iconClassName)} />}
  {props.children}
  </>)

  return <li className="dark:hover:bg-gray-500 hover:bg-opacity-10 p-3 rounded-md transition-colors duration-150">
    {href ? (
      <Link href={href} passHref>
        <a>
          {contents}
        </a>    
      </Link>
    ) : contents}
  </li>
}