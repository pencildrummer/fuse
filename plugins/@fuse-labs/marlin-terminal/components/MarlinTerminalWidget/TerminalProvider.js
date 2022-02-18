import React, { useContext, useState } from "react"

const TerminalContext = React.createContext()

export function useTerminalContext() {
  let ctx = useContext(TerminalContext)
  if (!ctx)
    throw new Error('useTerminalContext can only be used inside a TerminalProvider')
  return ctx
}

export default function TerminalProvider({
  terminal,
  ...props
}) {

  const [data, setData] = useState([])

  const appendData = newItem => {
    setData(data => {
      // Check if already in data array based on message id
      let itemIndex = data.findIndex(item => item.id == newItem.id)
      // If server broadcasted same user message, then replace it in the array
      if (itemIndex > -1) {
        let newData = [...data]
        newData[itemIndex] = newItem
        return newData
      } else {
        // Simply add, do not check for duplicates?
        return [...data, newItem]
      }
    })
  }

  return <TerminalContext.Provider value={{
    terminal,

    data,
    appendData,
  }}>
    {props.children}
  </TerminalContext.Provider>
}