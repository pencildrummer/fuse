import { useDeviceContext } from "@fuse-labs/core-ui/components/common/DeviceProvider/DeviceProvider";
import { socket } from "plugins/@fuse-labs/core-client/lib/socket";
import { Button, Widget } from "@fuse-labs/core-ui/index";

export default function GRBLMoveWidget() {
  const { device } = useDeviceContext()

  function handleMove() {
    console.log('Requesting move')
    socket.emit('move:x', device.id, 123, res => {
      console.log('Response from socket', res)
    })
  }

  return (
    <Widget>
      <Button onClick={handleMove}>Test move</Button>
    </Widget>
  )
}