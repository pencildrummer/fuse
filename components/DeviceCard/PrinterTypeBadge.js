import classNames from 'classnames'
import { useMemo } from 'react'
import Badge from '../react-daisyui/Badge/Badge'

export default function PrinterTypeBadge({
  printer
}) {

  const humanType = useMemo(_ => {
    switch (printer.type) {
      case 'fdm':
        return 'Fuse deposit'
      case 'sla':
        return 'Resin'
      default:
        return 'Unknown'
    }
  }, [printer])

  const bgColorClassName = useMemo(_ => {
    switch (printer.type) {
      case 'fdm': return 'bg-lime-600'
      case 'sla': return 'bg-teal-400'
      default:    return 'bg-base-100'
    }
  }, [printer.type])

  return (
    <Badge className={classNames(
      'text-xs',
      bgColorClassName
    )}>
      {humanType}
    </Badge>
  )
}