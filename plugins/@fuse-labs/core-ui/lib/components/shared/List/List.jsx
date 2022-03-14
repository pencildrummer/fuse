import classNames from "classnames"
import React, { useContext } from "react"

const ListContext = React.createContext()

function List({
  size = 'normal',
  divide = true,
  className,
  ...props
}) {
  return <ul className={classNames(
    'flex flex-col',
    {
      'divide-y divide-gray-700': divide,
    },
    className
  )}>
    <ListContext.Provider value={{
      size,
      divide,
    }}>
      {props.children}
    </ListContext.Provider>
  </ul>
}

function Item({
  className,
  ...props
}) {

  const { size } = useContext(ListContext)

  return <li className={classNames(
    'flex flex-row items-center',
    {
      'space-x-3 py-2': size == 'normal',
      'space-x-1 py-1': size == 'compact',
    },
    className
  )} {...props} />
}

List.Item = Item
export default List