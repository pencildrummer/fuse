import { Plugin, PluginManager, ProfileManager, DeviceManager } from "../../lib/index.js"
import { SerialPort } from "serialport"

export default class CorePlugin extends Plugin {

  initSocket(socket) {
    /**
     * Core data
     */
    socket.on('app:data', fn => {
      let data = {
        devices: DeviceManager.shared.devices,
        plugins: PluginManager.shared.plugins,
        profiles: ProfileManager.shared.profiles
      }
      fn?.(data)
    })

    /**
     * Serial ports
     */
    
    socket.on('serial:list', async (fn) => {
      SerialPort.list().then(list => {
        fn(list)
      }).catch(e => fn(e))
    })

    /**
     * Plugins
     */

    socket.on('plugins:activate', async (pluginName, fn) => {
      PluginManager.shared.activate(pluginName)
      socket.emit('plugins:activated', pluginName)
      fn?.(true)
    })

    socket.on('plugins:deactivate', async (pluginName, fn) => {
      PluginManager.shared.deactivate(pluginName)
      socket.emit('plugins:deactivated', pluginName)
      fn?.(true)
    })


    /*
    * Devices
    */

    socket.on('devices:add', async ({
      name, 
      profile,
      profileId,
      port,
      baudrate,
      serialNumber,
      vendorId,
      productId
    }, fn) => {
      if (profile) {
        // TODO - Add device profile on the go, for custom profiles while saving device
        profileId = profile.id
      }
      // Add device to the system
      DeviceManager.shared.addDevice({
        name,
        profileId,
        port,
        baudrate,
        serialNumber,
        vendorId,
        productId
      })
      if (device) {
        // Broadcast new device creation
        socket.emit('devices:added', device)
      }
      // Return created device to callback function
      fn(device)
    })

    // Update

    socket.on('devices:update', async (deviceId, data, fn) => {
      // Add device to the system
      let device = DeviceManager.shared.updateDevice(deviceId, data)
      if (device) {
        // Broadcast new device creation
        socket.emit('devices:updated', device)
      }
      // Return updated device to callback function
      fn?.(device)
    })

    // Remove

    socket.on('devices:remove', async (deviceId, fn) => {
      // Add device to the system
      let device = DeviceManager.shared.removeDevice(deviceId)
      if (device) {
        // Broadcast new device creation
        socket.emit('devices:removed', device)
      }
      // Return updated device to callback function
      fn?.(device)
    })

    /**
     * Device connections
     */

    // Check if device is available by searching and comparing metadata of serial ports avaialble
    socket.on('devices:connection:check', async (deviceId, fn) => {
      let device = DeviceManager.shared.getDevice(deviceId)
      let list = await SerialPort.list()
      let devicePort = list.find(port => port.path == device.port)
      return fn?.(devicePort)
    })

    /**
     * Profiles
     */
    socket.on('profiles:add', async(profileData, fn) => {
      let profile = ProfileManager.shared.addProfile(profileData)
      if (profile) {
        socket.emit('profiles:added', profile)
      }
      fn(profile)
    })

    socket.on('profiles:update', async(id, profileData, fn) => {
      let profile = ProfileManager.shared.updateProfile(id, profileData)
      if (profile) {
        socket.emit('profiles:updated', profile)
      }
      fn(profile)
    })

    socket.on('profiles:delete', async(id, fn) => {
      if (ProfileManager.shared.deleteProfile(id)) {
        socket.emit('profiles:deleted', id)
        fn(true)
      }
      fn(false)
    })
  }

}