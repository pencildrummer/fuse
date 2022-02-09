import Link from 'next/link'
import classNames from 'classnames'
import styles from './TabItem.module.scss'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function TabItem({
  href,
  ...props
}) {

  const router = useRouter()
  const active = useMemo(_ => router.pathname.startsWith(href), [router.pathname])
  console.log(router.pathname)
  return (
    <li className={classNames(
      'relative',
      'flex items-center',
      'text-sm leading-none',
      'font-medium',
      'rounded-t-lg',
      'transition-colors duration-150',
      {
        'hover:bg-gray-800 hover:bg-opacity-30': !active,
        'bg-gray-800 text-gray-100': active
      }
    )}>
      <Link href={href} passHref>
        <a className='w-full h-full flex flex-row items-center space-x-2 px-3 py-2.5'>
          {props.children}
        </a>
      </Link>
      {active && <div className={styles["corner-bl"]} />}
      {active && <div className={styles["corner-br"]} />}
    </li>
  )
}