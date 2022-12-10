import {
  Plugin,
  PluginManager,
  ProfileManager,
  DeviceManager,
  ConfigManager,
  CoreSocket,
  AppManager,
} from "../index.js";
import { SerialPort } from "serialport";
import { DeviceType } from "../models/index.js";

export default class CorePlugin extends Plugin {
  get installPath() {
    return [
      DeviceType.FDMPrinter,
      DeviceType.CNC,
      DeviceType.Laser,
      DeviceType.MSLAPrinter,
    ];
  }

  initSocket(socket: CoreSocket): void {
    /**
     * Core data
     */
    // Respond with app data when requested
    socket.on("app:data:get", (fn) => {
      fn?.(AppManager.data);
    });

    /**
     * Serial ports
     */

    socket.on("serial:list", async (fn) => {
      SerialPort.list()
        .then((list) => {
          fn(list);
        })
        .catch((e) => fn(e));
    });

    /**
     * Plugins
     */

    socket.on("plugins:activate", (pluginName, fn) => {
      PluginManager.activate(pluginName);
      socket.emit("plugins:activated", pluginName);
      fn?.(true);
    });

    socket.on("plugins:deactivate", (pluginName, fn) => {
      PluginManager.deactivate(pluginName);
      socket.emit("plugins:deactivated", pluginName);
      fn?.(true);
    });

    /*
     * Devices
     */

    socket.on("devices:add", async (data, fn) => {
      // TODO - Add device profile on the go, for custom profiles while saving device
      // if (profile) {  }
      // Add device to the system
      console.log("Socket device:add handler in CorePlugin - fn:", fn);
      let device = DeviceManager.addDevice(data);
      if (device) {
        // Broadcast new device creation
        socket.emit("devices:added", device);
      }
      // Return created device to callback function
      fn(device);
    });

    // Update

    socket.on("devices:update", async (deviceId, data, fn) => {
      // Add device to the system
      let device = DeviceManager.updateDevice(deviceId, data);
      if (device) {
        // Broadcast new device creation
        socket.emit("devices:updated", device);
      }
      // Return updated device to callback function
      fn?.(device);
    });

    // Remove

    socket.on("devices:remove", async (deviceId, fn) => {
      // Add device to the system
      let device = DeviceManager.removeDevice(deviceId);
      if (device) {
        // Broadcast new device creation
        socket.emit("devices:removed", device);
        // Return updated device to callback function
        fn?.(device);
      }
    });

    /**
     * Device connections
     */

    // Check if device is available by searching and comparing metadata of serial ports avaialble
    socket.on("devices:connection:check", async (deviceId, fn) => {
      let device = DeviceManager.getDevice(deviceId);
      let list = await SerialPort.list();
      let devicePort = list.find((port) => port.path == device.portPath);
      return fn?.(devicePort);
    });

    /**
     * Profiles
     */
    socket.on("profiles:add", async (profileData, fn) => {
      let profile = ProfileManager.addProfile(profileData);
      if (profile) {
        socket.emit("profiles:added", profile);
      }
      fn(profile);
    });

    socket.on("profiles:update", async (id, profileData, fn) => {
      let profile = ProfileManager.updateProfile(id, profileData);
      if (profile) {
        socket.emit("profiles:updated", profile);
      }
      fn(profile);
    });

    socket.on("profiles:delete", async (id, fn) => {
      if (ProfileManager.deleteProfile(id)) {
        socket.emit("profiles:deleted", id);
        fn(true);
      }
      fn(false);
    });
  }
}
