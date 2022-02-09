import dynamic from 'next/dynamic'
import getServerSideDeviceProp from '../../../lib/server/getServerSideDeviceProp.js'
import DevicePage from '../../../components/page-layouts/DevicePage.js'
import PrinterDevicePage from '../../../components/page-layouts/PrinterDevicePage.js'
import CNCDevicePage from '../../../components/page-layouts/CNCDevicePage.js'
import { getActivePluginsWithInfo } from '../../../lib/core/plugins.js'
import signale from 'signale'
import chalk from 'chalk'

// Return which type of page (in pages-layout) to use based on device type
function getPageComponent(deviceType) {
  switch (deviceType) {
    case 'fdm_printer':   return PrinterDevicePage
    case 'cnc':           return CNCDevicePage
    default:              return DevicePage
  }
}

export default function DevicePluginPage({
  device,
  plugin
}) {

  const DevicePageComponent = getPageComponent(device.type);
  const PluginComponent = dynamic(_ => import(`../../../plugins/${plugin.name}/pages/index.js`))

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
  let plugins = getActivePluginsWithInfo()

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