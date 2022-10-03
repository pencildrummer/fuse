import { useDeviceContext } from "@fuse-labs/core-client";
import FileManagerWidget from "../FileManagerWidget/FileManagerWidget.jsx";

export default function DeviceFileManagerWidget() {

  const { device } = useDeviceContext()

  function handleFileAction(action, args) {
    if (action == 'print') {
      handlePrint(args.path)
      return true
    } else {
      return false
    }
  }

  function handlePrint(path) {
    console.log('PRINTING', path)

    device.sockets.fuseLabs.marlinCore.emit('print:file', path, (res) => {
      console.log('Result', res)
    })
  }

  return (
    <FileManagerWidget onFileAction={handleFileAction}/>
  )
}