import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";
import socket from "lib/client/socket";
import { Button, Widget } from "plugins/@fuse-labs/core-ui";

export default function GRBLMoveWidget() {
  const { device } = useDeviceContext()

  function handleMove() {
    console.log('Requesting move')
    socket.emit('@fuse-labs.grbl-move.move.x', device.id, 123, res => {
      console.log('Response from socket', res)
    })
  }

  return (
    <Widget>
      <Button onClick={handleMove}>Test move</Button>
    </Widget>
  )
}