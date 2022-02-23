import { useDeviceContext } from 'components/DeviceProvider/DeviceProvider'
import { Widget } from 'plugins/@fuse-labs/core-ui/index'
import { useEffect } from 'react'

export default function MarlinSettingsWidget() {

  const { device, socket } = useDeviceContext()

  useEffect(_ => {
    console.log('Device Socket', socket)
    socket?.emit('@fuse-labs.marlin-settings.settings:read', device.id, (sent) => {
      console.log('Sent request for Marlin settings', sent)
    })
  }, [])

  return (
    <Widget title="Marlin settings">
      TODO - Show Marlin settings
    </Widget>
  )
}