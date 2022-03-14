import classNames from "classnames"

export default function Table({
  headers,
  className,
  ...props
}) {
  return (
    <table {...props} className={`table-auto border-collapse border border-transparent rounded-lg overflow-hidden ${className}`}>
      {headers?.length && <TableHead headers={headers} />}
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}

function TableHead({
  headers,
  ...props
}) {
  return (
    <thead {...props}>
      <tr>
      {headers.map((header, i) => (
        <th key={`header-${i}`} className="bg-gray-800 text-gray-300 font-semibold text-left p-1">
          <div>{header}</div>
        </th>
      ))}
      </tr>
    </thead>
  )
}
function TableRow({
  ...props
}) {
  return (
    <tr {...props} className={classNames(
      'font-medium group border-l border-gray-100 last:border-l-0',
      props.className
    )}>
      {props.children}
    </tr>
  )
}
Table.Row = TableRow

function TableData({
  ...props
}) {
  return (
    <td {...props} className={classNames(
      'border-b border-gray-700 px-1 py-2 group-hover:bg-gray-600/10 transition-colors duration-150',
      props.className
    )}>
      {props.children}
    </td>
  )
}
Table.Data = TableData