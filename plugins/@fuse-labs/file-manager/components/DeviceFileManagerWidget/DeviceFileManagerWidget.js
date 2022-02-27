import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";
import FileManagerWidget from "../FileManagerWidget/FileManagerWidget";

export default function DeviceFileManagerWidget() {

  const { device } = useDeviceContext()

  function handlePrint(file) {
    console.log('PRINTING')
    // DEMO
    let testFile = {
      path: 'storage/LLK4PRO_20mm_hollow_cube.gcode'
    }
    device.sockets.fuseLabs.marlinCore.emit('print:file', testFile, (res) => {
      console.log('Result', res)
    })
  }

  return (
    <FileManagerWidget onContextMenuPrint={handlePrint}/>
  )
}