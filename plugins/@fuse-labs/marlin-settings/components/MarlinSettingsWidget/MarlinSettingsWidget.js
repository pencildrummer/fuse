import { useDeviceContext } from '@fuse-labs/core-client'
import { Widget } from '@fuse-labs/core-ui'
import { useEffect } from 'react'

export default function MarlinSettingsWidget() {

  const { device } = useDeviceContext()

  useEffect(_ => {
    device.sockets.fuseLabs.marlinSettings.emit('settings:read', device.id, (sent) => {
      console.log('NEW SYSTEM - Sent request for Marlin settings', sent)
    })
  }, [device.id, device.sockets.fuseLabs.marlinSettings])

  return (
    <Widget title="Marlin settings">
      TODO - Show Marlin settings
    </Widget>
  )
}