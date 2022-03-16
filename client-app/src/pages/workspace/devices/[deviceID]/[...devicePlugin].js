import dynamic from 'next/dynamic'
import getDevicePageComponent from '@fuse-labs/core-ui/components/pages/getDevicePageComponent.js'
import { useRouter } from 'next/router'
import { useDevice, useDevicePlugin } from '@fuse-labs/core-client'
import { BlockingView, Group, InactivePluginView } from '@fuse-labs/core-ui'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function DevicePluginPage() {
  
  const router = useRouter()
  const { query } = router
  const { deviceID, devicePlugin } = query

  // TODO - Error on missing device
  const device = useDevice(deviceID)

  const pluginUrl = devicePlugin.join('/')
  const plugin = useDevicePlugin(deviceID, pluginUrl)

  if (!plugin) {
    router.replace('/workspace')
    return null
  }

  // Check plugin is active
  if (!plugin.active) {
    return <InactivePluginView />
  }

  // TODO - Avoid?
  // Check plugin suitable for required device
  if (!plugin.deviceTypes.includes(device.profile.type)) {
    return (
      <BlockingView>
        <Group orientation='vertical' className="items-center">
          <ExclamationTriangleIcon className='w-20 h-20 text-gray-700'/>
          <span className="font-bold text-gray-500">
            Plugin do not support device type {device.profile.type}
          </span>
        </Group>
      </BlockingView>
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