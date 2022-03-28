var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { io } from "socket.io-client";
import lodash from "lodash";
import { object, string, array, boolean, number } from "yup";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { pathCase } from "@fuse-labs/shared-utils";
import { IntlProvider } from "react-intl";
function fetcher(url, opts) {
  return fetch(url, opts).then((res) => res.json());
}
function fetcherPOST(url, data) {
  return fetcher(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
const SOCKET_HOST = "http://localhost:8888";
function socket(namespace) {
  let ns = [SOCKET_HOST, namespace].join("/").replace("@", "scope:");
  let socket2 = io(ns);
  socket2.on("connect", (_) => {
  });
  return socket2;
}
const coreSocket = socket("@fuse-labs/core");
const ClientDeviceType = Object.freeze({
  FDMPrinter: "fdm_printer",
  MSLAPrinter: "msla_printer",
  CNC: "cnc",
  Laser: "laser"
});
const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  version: string().required(),
  deviceTypes: array().required(),
  _settings: boolean().required(),
  _hasPages: boolean().required(),
  _hasTabs: boolean().required(),
  _hasSocket: boolean().required(),
  _hasDeviceSocket: boolean().required(),
  _active: boolean().required(),
  _system: boolean().required()
});
object({
  name: string().required(),
  version: string().required(),
  fuse: object().required()
});
class ClientPlugin {
  constructor(data) {
    __publicField(this, "name");
    __publicField(this, "version");
    __publicField(this, "_settings", false);
    __publicField(this, "_hasPages", false);
    __publicField(this, "_hasTabs", false);
    __publicField(this, "_hasSocket");
    __publicField(this, "_hasDeviceSocket");
    __publicField(this, "_active", false);
    __publicField(this, "_system");
    let pluginData = CONSTRUCTOR_SCHEMA.validateSync(data);
    Object.assign(this, pluginData);
    if (this.hasSocket) {
      this.socket = socket(this.name);
    }
    if (typeof this.provision === "function") {
      this.provision();
    }
  }
  get settings() {
    return this._settings;
  }
  get hasPages() {
    return this._hasPages;
  }
  get url() {
    return this.name;
  }
  get hasTabs() {
    return this._hasTabs;
  }
  get tabsUrl() {
    return this.name;
  }
  get hasSocket() {
    return this._hasSocket;
  }
  get hasDeviceSocket() {
    return this._hasDeviceSocket;
  }
  get active() {
    return this._active;
  }
  get system() {
    return this._system;
  }
  get icon() {
    return QuestionMarkIcon;
  }
  get displayTitle() {
    return this.name;
  }
  components() {
    return {};
  }
  deviceComponents(device) {
    return {};
  }
}
const _ClientPluginManager = class {
  constructor() {
    __publicField(this, "_initialized", false);
    __publicField(this, "_plugins", []);
    __publicField(this, "_activePluginsNames", []);
  }
  get initialized() {
    return this._initialized;
  }
  get plugins() {
    return this._plugins;
  }
  get activePluginsNames() {
    return this._activePluginsNames;
  }
  get activePlugins() {
    return this._plugins.filter((plugin) => plugin.active);
  }
  getPlugin(name) {
    return this._plugins.find((plugin) => plugin.name == name);
  }
  init(fetchedPluginsData) {
    this._plugins = (fetchedPluginsData == null ? void 0 : fetchedPluginsData.map((data) => {
      let PluginClass = _ClientPluginManager._registeredPlugins[data.name];
      if (PluginClass) {
        return new PluginClass(data);
      } else {
        return new ClientPlugin(data);
      }
    })) || [];
    console.log("INIT MANAGER Plugins", this._plugins);
    this._initialized = true;
  }
  static registerPlugin(pluginName, pluginClass) {
    _ClientPluginManager._registeredPlugins[pluginName] = pluginClass;
  }
};
let ClientPluginManager = _ClientPluginManager;
__publicField(ClientPluginManager, "_registeredPlugins", {});
class Singleton$1 {
  constructor() {
    throw new Error("Use ClienPluginManager.shared instead");
  }
  static get shared() {
    if (!Singleton$1.sharedInstance) {
      Singleton$1.sharedInstance = new ClientPluginManager();
    }
    return Singleton$1.sharedInstance;
  }
}
Singleton$1.registerPlugin = ClientPluginManager.registerPlugin;
const SCHEMA = object({
  id: string().required(),
  name: string().defined().required(),
  port: string().defined().required(),
  baudrate: number().defined().required(),
  profileId: string().defined().required(),
  serialNumber: string().nullable().default(null),
  vendorId: string().nullable().default(null),
  productId: string().nullable().default(null)
});
class ClientDevice {
  constructor(data) {
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "port");
    __publicField(this, "baudrate");
    __publicField(this, "profileId");
    __publicField(this, "profile");
    __publicField(this, "serialNumber");
    __publicField(this, "vendorId");
    __publicField(this, "productId");
    __publicField(this, "plugins");
    var _a, _b;
    let device = SCHEMA.validateSync(data);
    Object.assign(this, device);
    if (!this.socket)
      this.socket = socket(`device:${device.id}`);
    this.plugins = (_a = Singleton$1.shared.plugins) == null ? void 0 : _a.filter((plugin) => {
      var _a2;
      return (_a2 = plugin.deviceTypes) == null ? void 0 : _a2.includes(device.profile.type);
    });
    (_b = this.plugins) == null ? void 0 : _b.forEach((plugin) => {
      if (!plugin.hasDeviceSocket)
        return;
      let keyPath = plugin.name.split("/").map((key) => lodash.camelCase(key)).join(".");
      if (!lodash.get(this, "sockets." + keyPath)) {
        let pluginDeviceSocket = socket(`device:${this.id}/${plugin.name}`);
        lodash.set(this, "sockets." + keyPath, pluginDeviceSocket);
      }
    });
  }
  get immutableKeys() {
    return [
      "id",
      "profile",
      "serialNumber",
      "vendorId",
      "productId"
    ];
  }
  update(data) {
    let cleanData = Object.keys(data).reduce((res, key) => {
      if (this.immutableKeys.includes(key)) {
        console.warn("Trying to update an immutable ClientDevice property:", key);
      } else {
        console.log("RES", res);
        res[key] = data[key];
      }
      return res;
    }, __spreadValues({}, this));
    let newData = SCHEMA.validateSync(cleanData);
    Object.assign(this, newData);
  }
}
class ClientDeviceManager extends EventTarget {
  constructor() {
    super();
    __publicField(this, "_initialized", false);
    __publicField(this, "_devices", []);
  }
  get initialized() {
    return this._initialized;
  }
  get devices() {
    return this._devices;
  }
  init(fetchedDevicesData) {
    this._devices = (fetchedDevicesData == null ? void 0 : fetchedDevicesData.map((deviceData) => new ClientDevice(deviceData))) || [];
    this.dispatchEvent(new Event("updatedDevices"));
    coreSocket.on("devices:added", this._handleDeviceAdded);
    coreSocket.on("devices:updated", this._handleDeviceUpdated);
    coreSocket.on("devices:removed", this._handleDeviceRemoved);
    console.log("INITED MANAGER Devices", this._devices);
    this._initialized = true;
  }
  getDevice(deviceId) {
    return this._devices.find((device) => device.id == deviceId);
  }
  _handleDeviceAdded(deviceData) {
    let device = new ClientDevice(deviceData);
    this._devices = [...this._devices, device];
    this.dispatchEvent(new Event("updatedDevices"));
  }
  _handleDeviceUpdated(deviceData) {
    let device = this._devices.find((d) => d.id === deviceData.id);
    if (device) {
      device.update(deviceData);
    } else {
      console.log("Received request to update local device but no device has been found with id", deviceData.id);
    }
    this.dispatchEvent(new Event("updatedDevices"));
  }
  _handleDeviceRemoved(deviceData) {
    this._devices = this._devices.filter((device) => device.id !== deviceData.id);
    this.dispatchEvent(new Event("updatedDevices"));
  }
}
class Singleton {
  constructor() {
    throw new Error("Use ClientDeviceManager.shared instead");
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientDeviceManager();
    }
    return Singleton.sharedInstance;
  }
}
const AppContext = React.createContext();
function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext can only be used inside an AppProvider");
  return ctx;
}
const DeviceContext = React.createContext();
function useDeviceContext() {
  const ctx = useContext(DeviceContext);
  if (!ctx)
    throw new Error("useDeviceContext can be used only inside a DeviceProvider");
  return ctx;
}
function useDevice(deviceId) {
  const { devices } = useAppContext();
  return useMemo((_) => devices.find((device) => device.id == deviceId), [deviceId, devices]);
}
function useDevicePlugin(deviceId, pluginNameOrURL) {
  let device = useDevice(deviceId);
  return useMemo((_) => {
    var _a;
    return (_a = device == null ? void 0 : device.plugins) == null ? void 0 : _a.find((plugin) => plugin.url == pluginNameOrURL || plugin.name === pluginNameOrURL);
  }, [device, pluginNameOrURL]);
}
function usePlugin(nameOrURL) {
  const { plugins } = useAppContext();
  return useMemo((_) => plugins.find((plugin) => plugin.url == nameOrURL || plugin.name === nameOrURL), [nameOrURL, plugins]);
}
function useProviderDevices(data) {
  if (!Singleton.shared.initialized) {
    Singleton.shared.init(data);
  }
  const [devices, setDevices] = useState(Singleton.shared.devices);
  useEffect((_) => {
    const updateState = (_2) => setDevices(Singleton.shared.devices);
    Singleton.shared.addEventListener("updatedDevices", updateState);
    return (_2) => {
      Singleton.shared.removeEventListener("updatedDevices", updateState);
    };
  }, []);
  return devices;
}
function useProviderPlugins(data) {
  if (!Singleton$1.shared.initialized) {
    Singleton$1.shared.init(data);
  }
  useEffect((_) => {
    function handleActivation(pluginName) {
      let plugin = Singleton$1.shared.getPlugin(pluginName);
      plugin._active = true;
      setPlugins((data2) => [...data2]);
    }
    function handleDeactivation(pluginName) {
      let plugin = Singleton$1.shared.getPlugin(pluginName);
      plugin._active = false;
      setPlugins((data2) => [...data2]);
    }
    coreSocket.on("plugins:activated", handleActivation);
    coreSocket.on("plugins:deactivated", handleDeactivation);
  }, []);
  const [plugins, setPlugins] = useState(Singleton$1.shared.plugins);
  return plugins;
}
function useProviderProfiles(data) {
  const [profiles, setProfiles] = useState(data || {});
  useEffect((_) => {
    coreSocket.on("profiles:added", (profile) => {
      const brand = pathCase(profile.brand);
      setProfiles((profiles2) => {
        let newProfiles = __spreadValues({}, profiles2);
        newProfiles[brand] = newProfiles[brand] || [];
        newProfiles[brand].push(profile);
        return newProfiles;
      });
    });
    coreSocket.on("profiles:updated", (profile) => {
      setProfiles((profiles2) => {
        let brand = pathCase(profile.brand);
        let editIndex = profiles2[brand].findIndex((p2) => p2.id == profile.id);
        if (editIndex == -1) {
          console.error("Unable to find index for received updated profile with id", profile.id);
          return profiles2;
        }
        let updatedProfiles = __spreadValues({}, profiles2);
        updatedProfiles[brand].splice(editIndex, 1, profile);
        return updatedProfiles;
      });
    });
    coreSocket.on("profiles:deleted", (id) => {
      setProfiles((profiles2) => {
        let keyPath = id.split(".");
        let brand = pathCase(keyPath[0]);
        pathCase(keyPath[1]);
        if (profiles2[brand]) {
          let updateProfiles = __spreadValues({}, profiles2);
          updateProfiles[brand] = updateProfiles[brand].filter((p2) => p2.id != id);
          return updateProfiles;
        } else {
          console.warn('Received deleted profile event for profile "' + id + '" but profile is not found');
          return profiles2;
        }
      });
    });
  }, []);
  return profiles;
}
function useSerialPorts() {
  const [ports, setPorts] = useState([]);
  useEffect((_) => {
    coreSocket.emit("serial:list", (data) => {
      setPorts(data);
    });
  }, []);
  return ports;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = React, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  k !== void 0 && (e = "" + k);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
function AppProvider(_a) {
  var _b = _a, {
    devices: fetchedDevices,
    profiles: fetchedProfiles,
    plugins: fetchedPlugins,
    locale = "en",
    messages
  } = _b, props = __objRest(_b, [
    "devices",
    "profiles",
    "plugins",
    "locale",
    "messages"
  ]);
  const profiles = useProviderProfiles(fetchedProfiles);
  const plugins = useProviderPlugins(fetchedPlugins);
  const activePlugins = useMemo((_) => plugins == null ? void 0 : plugins.filter((p2) => p2.active), [plugins]);
  const devices = useProviderDevices(fetchedDevices);
  return /* @__PURE__ */ jsx(AppContext.Provider, {
    value: {
      devices,
      profiles,
      plugins,
      activePlugins
    },
    children: /* @__PURE__ */ jsx(IntlProvider, {
      defaultLocale: "en",
      locale,
      messages,
      children: props.children
    })
  });
}
function DeviceProvider(_c) {
  var _d = _c, {
    device
  } = _d, props = __objRest(_d, [
    "device"
  ]);
  return /* @__PURE__ */ jsx(DeviceContext.Provider, {
    value: {
      device
    },
    children: props.children
  });
}
export { AppProvider, ClientDevice, Singleton as ClientDeviceManager, ClientDeviceType, ClientPlugin, Singleton$1 as ClientPluginManager, DeviceProvider, coreSocket, fetcher, fetcherPOST, socket, useAppContext, useDevice, useDeviceContext, useDevicePlugin, usePlugin, useProviderDevices, useProviderPlugins, useProviderProfiles, useSerialPorts };
