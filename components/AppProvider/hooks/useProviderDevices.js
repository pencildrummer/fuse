import coreSocket from "lib/client/socket"
import { useEffect, useState } from "react"
import ClientDevice from "lib/client/models/ClientDevice"

export default function useProviderDevices(fetchedDevices) {

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
    return fetchedDevices?.map(deviceData => new ClientDevice(deviceData)) || []
  }

  function addDevice(deviceData) {
    let device = new ClientDevice(deviceData)
    setDevices(devices => [...devices, device])
  }

  function updateDevice(deviceData) {
    setDevices(devices => {
      let device = devices.find(d => d.id === deviceData.id)
      if (device) {
        device.update(deviceData)
      } else {
        console.log('Received request to update local device but no device has been found with id', deviceData.id)
      }
      return [...devices]
    })
  }

  function removeDevice(deviceData) {
    setDevices(devices => devices.filter(device => device.id !== deviceData.id))
  }

  return devices
}