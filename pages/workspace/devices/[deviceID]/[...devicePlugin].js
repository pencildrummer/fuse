import dynamic from 'next/dynamic'
import getServerSideDeviceProp from '../../../../lib/server/getServerSideDeviceProp.js'
import signale from 'signale'
import chalk from 'chalk'
import { getActivePlugins } from '../../../../lib/core/plugins.js'
import getDevicePageComponent from 'components/page-layouts/getDevicePageComponent.js'

export default function DevicePluginPage({
  device,
  plugin
}) {

  const DevicePageComponent = getDevicePageComponent(device.profile.type);
  const PluginComponent = dynamic(_ => import(`plugins/${plugin.name}/pages/index.js`))

	return (
		<DevicePageComponent device={device}>
			<PluginComponent />
		</DevicePageComponent>
	)
}

export async function getServerSideProps(ctx) {

  // Get device from server render context (key: deviceID)
  let device = await getServerSideDeviceProp(ctx)

  if (!device) {
    signale.warn('No device found in [...devicePlugin].js')
    return { notFound: true }
  }

  // Retrieve active plugins with info to find the requested one to render
  let plugins = getActivePlugins()

  let pluginUrl = ctx.query.devicePlugin.join('/')
  // Get the requested plugin from URL,
  // find first for configured 'pagesUrl' in plugin package.json otherwise fallback finding plugin name with same url requested
  let plugin = plugins.find(plugin => plugin.fuse.url == pluginUrl || plugin.name === pluginUrl)

  if (!plugin) {
    signale.warn(`No plugin found with name or url "${chalk.yellow(pluginUrl)}"`)
    return { notFound: true }
  }

  return {
    props: {
      device,
      plugin: plugin
    }
  }
}