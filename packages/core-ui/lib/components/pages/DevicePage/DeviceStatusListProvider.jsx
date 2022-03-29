import React, { useState } from "react"

const DeviceStatusListContext = React.createContext()

export function useDeviceStatusListContext() {
  const ctx = React.useContext(DeviceStatusListContext)
  if (!ctx)
    throw new Error('useDeviceStatusListContext can only be used inside DeviceStatusListProvider')
  return ctx
}

export default function DeviceStatusListProvider(props) {

  const [statusList, setStatusList] = useState([])

  function addStatus(message, opts) {
    let statusObj = {
      id: opts?.id || Date.now(),
      message: message,
      date: Date.now(),
      type: 'normal',
      ...opts
    }
    setStatusList(prev => {
      return [...prev, statusObj].sort((a, b) => b.date - a.date)
    })
    return statusObj
  }

  function removeStatus(id) {
    setStatusList(prev => prev.filter(s => s.id != id))
  }

  return <DeviceStatusListContext.Provider value={{
    statusList,
    addStatus,
    removeStatus,
  }}>{props.children}</DeviceStatusListContext.Provider>
}