import React from 'react'
import classNames from "classnames";
import Link from 'next/link'

export default React.forwardRef( ({
  icon: Icon,
  iconClassName,
  href,
  ...props
}, ref) => {

  const contents = (<>
    {Icon && <Icon className={classNames('w-5 h-5', iconClassName)} />}
    {props.children}
  </>)

  return <li ref={ref} className="dark:hover:bg-gray-500 hover:bg-opacity-10 p-3 rounded-md transition-colors duration-150" {...props}>
    {href ? (
      <Link href={href}>
        <a>
          {contents}
        </a>    
      </Link>
    ) : contents}
  </li>
})