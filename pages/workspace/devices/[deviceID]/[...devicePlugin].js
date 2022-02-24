import dynamic from 'next/dynamic'
import getDevicePageComponent from 'components/page-layouts/getDevicePageComponent.js'
import { useRouter } from 'next/router'
import useDevice from 'hooks/useDevice'
import useDevicePlugin from 'hooks/useDevicePlugin'

export default function DevicePluginPage() {
  
  const router = useRouter()
  const { query } = router
  const { deviceID, devicePlugin } = query

  // TODO - Error on missing device
  const device = useDevice(deviceID)

  const pluginUrl = devicePlugin.join('/')
  const plugin = useDevicePlugin(deviceID, pluginUrl)

  if (!plugin) {
    return (
      <span>Plugin for device not found</span>
    )
  }

  // Check plugin is active
  if (!plugin.fuse.isActive) {
    return (
      <span>Plugin not active</span>
    )
  }

  // TODO - Avoid?
  // Check plugin suitable for required device
  if (!plugin.fuse.devices.includes(device.profile.type)) {
    return (
      <span>Plugin do not support device type {device.profile.type}</span>
    )
  }

  const DevicePageComponent = getDevicePageComponent(device.profile.type);
  const PluginComponent = dynamic(_ => import(`plugins/${plugin.name}/pages/index.js`))

	return (
		<DevicePageComponent device={device}>
			<PluginComponent />
		</DevicePageComponent>
	)
}