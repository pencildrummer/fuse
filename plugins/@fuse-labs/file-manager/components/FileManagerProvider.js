import React, { useContext, useState } from "react"

const FileManagerContext = React.createContext()

export const FileManagerContextConsumer = FileManagerContext.Consumer

export function useFileManagerContext() {
  const ctx = useContext(FileManagerContext)
  if (!ctx)
    throw new Error('useFileManagerContext cannot be used oustide FileManagerProvider')
  return ctx
}

export default function FileManagerProvider(props) {

  const [file, setFile] = useState()

  return <FileManagerContext.Provider value={{
    file,
    setFile
  }}>{props.children}</FileManagerContext.Provider>
}