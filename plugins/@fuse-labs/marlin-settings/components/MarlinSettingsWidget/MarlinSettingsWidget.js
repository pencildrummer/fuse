import { useDeviceContext } from 'components/DeviceProvider/DeviceProvider'
import { Widget } from 'plugins/@fuse-labs/core-ui/index'
import { useEffect } from 'react'

export default function MarlinSettingsWidget() {

  const { device } = useDeviceContext()

  useEffect(_ => {
    device.sockets.fuseLabs.marlinSettings.emit('settings:read', device.id, (sent) => {
      console.log('NEW SYSTEM - Sent request for Marlin settings', sent)
    })
  }, [])

  return (
    <Widget title="Marlin settings">
      TODO - Show Marlin settings
    </Widget>
  )
}