import coreSocket, { socket } from "lib/client/socket"
import { useEffect, useState } from "react"
import { string } from "yup"
import { object } from "yup"
import lodash from 'lodash'
import { Terminal } from "plugins/@fuse-labs/marlin-terminal/lib/client/terminal"

export default function useProviderDevices(fetchedDevices, providerPlugins) {

  const [devices, setDevices] = useState(_ => initDevices(fetchedDevices))

  useEffect(_ => {
		// Add socket listener for newly created device
		coreSocket.on('devices:added', addDevice)
    // Add socket listener for updated device
    coreSocket.on('devices:updated', updateDevice)
    // Add socket listener for removed device
    coreSocket.on('devices:removed', removeDevice)
	}, [])

  function initDevices(fetchedDevices) {
    return fetchedDevices?.map(deviceData => initDevice(deviceData, providerPlugins)) || []
  }

  function addDevice(deviceData) {
    let device = initDevice(deviceData, providerPlugins)
    setDevices(devices => [...devices, device])
  }

  function updateDevice(deviceData) {
    let device = initDevice(deviceData)
    setDevices(devices => {
      let index = devices.findIndex(d => d.id === device.id)
      if (index < 0) {
        console.error('Received updated device but not found in current ones', device)
        return devices
      } else {
        let newDevices = [...devices]
        newDevices[index] = device
        return newDevices
      }
    })
  }

  function removeDevice(deviceData) {
    setDevices(devices => devices.filter(device => device.id !== deviceData.id))
  }

  return devices
}

/**
 * Create a new validated device, with attached plugins and sockets.
 * TODO - Move into a class later on
 * @param {object} deviceData 
 * @param {array} providerPlugins 
 * @returns 
 */
function initDevice(deviceData, providerPlugins) {

  console.log('INIT device', deviceData)
  // Validate deviceData
  let deviceSchema = object({
    id: string().required('Missing device ID'),
    name: string().required('Missing device name'),
    profile: object({
      type: string().required('Missing device profile type')
    }).required('Missing profile on device')
  })
  
  // Create device object
  let device = deviceSchema.validateSync(deviceData)

  // Init device socket
  if (!device.socket)
    device.socket = socket(`device:${device.id}`)

  // Load and set active plugins on device
  device.plugins = providerPlugins?.filter(plugin => plugin.fuse.devices?.includes(device.profile.type))

  //Create socket for active plugins
  device.plugins?.forEach((plugin) => {
    if (!plugin.fuse.hasSocket) return
    let keyPath = plugin.name.split('/').map(key => lodash.camelCase(key)).join('.')
    if (!lodash.get(device, 'sockets.'+keyPath)) {
      let pluginDeviceSocket = socket(`device:${device.id}/${plugin.name}`)
      lodash.set(device, 'sockets.'+keyPath, pluginDeviceSocket)
    }
  })

  // TODO - Dynamic import of file in plugin directory to customise behaviour
  
  // DEV ONLY
  if (device.plugins.find(p => p.name == '@fuse-labs/marlin-terminal')) {
    // Init terminal for device
    device.terminal = new Terminal(device, { autoConnect: false })
    console.log(`Terminal for device "${device.id}" initialized`)
  }

  return device
}