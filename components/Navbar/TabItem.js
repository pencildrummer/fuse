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
  const active = useMemo(_ => router.asPath.startsWith(href), [router.pathname])

  return (
    <li className={classNames(
      'relative',
      'z-0 hover:z-20',
      'flex items-center',
      'text-sm leading-none',
      'font-medium',
      'rounded-t-lg',
      'transition-all duration-300',
      'group',
      {
        'z-30': active,
        'hover:bg-gray-800/40': !active,
        'bg-gray-800 text-gray-100': active
      },
      {
        'active': active
      },
      styles['tab-item']
    )}>
      <Link href={href} passHref>
        <a className='w-full h-full flex flex-row items-center space-x-2 px-3 py-2.5'>
          {props.children}
        </a>
      </Link>
      <div className={classNames(
        'text-gray-800',
        {
          'opacity-0 group-hover:opacity-40': !active,
        },
        'transition-opacity duration-300',
        styles["corner-bl"])
      } />
      <div className={classNames(
        'text-gray-800',
        {
          'opacity-0 group-hover:opacity-40': !active,
        },
        'transition-opacity duration-300',
        styles["corner-br"])
      } />
    </li>
  )
}