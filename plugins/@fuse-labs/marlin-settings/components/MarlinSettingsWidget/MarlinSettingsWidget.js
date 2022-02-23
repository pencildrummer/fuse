import { useDeviceContext } from 'components/DeviceProvider/DeviceProvider'
import socket from 'lib/client/socket'
import { Widget } from 'plugins/@fuse-labs/core-ui/index'
import { useEffect } from 'react'

export default function MarlinSettingsWidget() {

  const { device } = useDeviceContext()

  useEffect(_ => {
    socket.emit('@fuse-labs.marlin-settings.settings:read', device.id, (sent) => {
      console.log('Sent request for Marlin settings', sent)
    })
  }, [])

  return (
    <Widget title="Marlin settings">
      TODO - Show Marlin settings
    </Widget>
  )
}