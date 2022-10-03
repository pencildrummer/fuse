import { socket } from "@fuse-labs/core-client";
import { useDeviceContext } from '@fuse-labs/core-client'
import { Button, Widget } from "@fuse-labs/core-ui";

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