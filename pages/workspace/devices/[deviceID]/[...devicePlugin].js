import dynamic from 'next/dynamic'
import getDevicePageComponent from 'components/page-layouts/getDevicePageComponent.js'
import { useRouter } from 'next/router'
import { useAppContext } from 'components/AppProvider/AppProvider'

export default function DevicePluginPage() {

  const { devices, plugins } = useAppContext()

  const router = useRouter()
  const { query } = router
  const { deviceID, devicePlugin } = query
  const pluginUrl = devicePlugin.join('/')

  // Get the requested plugin from URL,
  // find first for configured 'pagesUrl' in plugin package.json otherwise fallback finding plugin name with same url requested
  const plugin = plugins.find(plugin => plugin.fuse.url == pluginUrl || plugin.name === pluginUrl)
  
  // Check plugin is active
  if (!plugin.fuse.isActive) {
    return (
      <span>Plugin not active</span>
    )
  }

  // Get device
  const device = devices.find(device => device.id == deviceID )
  // TODO - Error on missing device

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