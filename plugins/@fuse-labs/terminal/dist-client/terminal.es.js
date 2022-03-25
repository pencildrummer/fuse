var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
import { useDeviceContext, ClientPlugin, ClientDeviceManager } from "@fuse-labs/core-client";
import { useDeviceStatusListContext, SettingsWidget, Group, Button, Label, InputRaw, ScrollArea, CheckboxRaw, Widget } from "@fuse-labs/core-ui";
import require$$0, { useState, useContext, useEffect, useRef } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { generateUniqueID } from "@fuse-labs/shared-utils";
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
var f = require$$0, g = 60103;
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
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
function MarlinTerminalSettingsWidget(_a) {
  var props = __objRest(_a, []);
  const {
    device
  } = useDeviceContext();
  const {
    addStatus,
    removeStatus
  } = useDeviceStatusListContext();
  function handleConnectClick() {
    device.terminal.connect();
    let status = addStatus("Prova messaggio di testo dello stato device", {
      type: "warning"
    });
    setTimeout((_) => removeStatus(status.id), 1500);
  }
  function handleDisconnectClick() {
    device.terminal.disconnect();
  }
  return /* @__PURE__ */ jsxs(SettingsWidget, {
    children: [/* @__PURE__ */ jsxs(Group, {
      className: "!justify-start",
      children: [/* @__PURE__ */ jsx(Button, {
        onClick: handleConnectClick,
        children: "Connect"
      }), /* @__PURE__ */ jsx(Button, {
        onClick: handleDisconnectClick,
        children: "Disconnect"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-2 gap-4",
      children: [/* @__PURE__ */ jsxs(Group, {
        orientation: "vertical",
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "serial-port",
          children: "Serial port"
        }), /* @__PURE__ */ jsx(InputRaw, {
          id: "serial-port",
          disabled: true,
          value: device.port
        })]
      }), /* @__PURE__ */ jsxs(Group, {
        orientation: "vertical",
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "baud-rate",
          children: "Baud rate"
        }), /* @__PURE__ */ jsx(InputRaw, {
          id: "baud-rate",
          value: device.baudrate,
          disabled: true
        })]
      })]
    })]
  });
}
const TerminalContext = require$$0.createContext();
function useTerminalContext() {
  let ctx = useContext(TerminalContext);
  if (!ctx)
    throw new Error("useTerminalContext can only be used inside a TerminalProvider");
  return ctx;
}
function TerminalProvider(_b) {
  var _c = _b, {
    terminal
  } = _c, props = __objRest(_c, [
    "terminal"
  ]);
  const [data, setData] = useState(terminal.log);
  const [autoscroll, setAutoscroll] = useState(true);
  const appendData = (newItem) => {
    setData((data2) => {
      let itemIndex = data2.findIndex((item) => item.id == newItem.id);
      if (itemIndex > -1) {
        let newData = [...data2];
        newData[itemIndex] = newItem;
        return newData;
      } else {
        return [...data2, newItem];
      }
    });
  };
  return /* @__PURE__ */ jsx(TerminalContext.Provider, {
    value: {
      terminal,
      data,
      appendData,
      autoscroll,
      setAutoscroll
    },
    children: props.children
  });
}
function TerminalPrompt() {
  const {
    terminal,
    appendData
  } = useTerminalContext();
  const [inputMessage, setInputMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (inputMessage.length) {
      let data = terminal.sendMessage(inputMessage);
      appendData(data);
      setInputMessage("");
    }
  }
  return /* @__PURE__ */ jsxs("form", {
    onSubmit: handleSubmit,
    className: "flex flex-row space-x-2",
    children: [/* @__PURE__ */ jsx(InputRaw, {
      type: "text",
      value: inputMessage,
      onChange: (e) => setInputMessage(e.target.value),
      className: classNames("flex-1", "text-xs px-1.5 py-1", "rounded-md", "font-mono font-medium", "bg-gray-900 border border-gray-600 text-gray-300", "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"),
      autoCorrect: "false",
      autoComplete: "false",
      spellCheck: "false"
    }), /* @__PURE__ */ jsx(Button, {
      type: "submit",
      children: /* @__PURE__ */ jsx(PaperPlaneIcon, {})
    })]
  });
}
function TerminalSpinner() {
  const frames = ["\u28FE", "\u28FD", "\u28FB", "\u28BF", "\u287F", "\u28DF", "\u28EF", "\u28F7"];
  const [frame, setFrame] = useState(0);
  useEffect((_) => {
    let timer = setInterval((_2) => setFrame((frame2) => frame2 >= frames.length - 1 ? 0 : frame2 + 1), 80);
    return (_2) => clearInterval(timer);
  });
  return frames[frame];
}
function TerminalLine({
  data
}) {
  const {
    message,
    from,
    received
  } = data;
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("span", {
      className: classNames("font-bold", "whitespace-pre", {
        "text-purple-500": from == "user",
        "text-cyan-400": from == "server",
        "text-amber-400": from == "device",
        "text-pink-500": from == "controller"
      }),
      children: [from.padEnd(10, " "), "\xA0", from == "user" && !received ? /* @__PURE__ */ jsx(TerminalSpinner, {}) : ">", "\xA0"]
    }), /* @__PURE__ */ jsx("span", {
      children: message
    })]
  });
}
function TerminalWindow() {
  const {
    terminal,
    data,
    appendData,
    autoscroll,
    setAutoscroll
  } = useTerminalContext();
  const scrollArea = useRef();
  const scrollAreaViewport = useRef();
  function scrollToBottom() {
    if (scrollArea.current) {
      if (!scrollAreaViewport.current) {
        scrollAreaViewport.current = Array.from(scrollArea.current.children).find((e) => e.hasAttribute("data-radix-scroll-area-viewport"));
      }
      scrollAreaViewport.current.scrollTop = scrollAreaViewport.current.scrollHeight;
    }
  }
  useEffect((_) => {
    if (autoscroll) {
      setTimeout((_2) => {
        scrollToBottom();
        setAutoscroll(true);
      }, 50);
    }
  }, [autoscroll, data, setAutoscroll]);
  useEffect((_) => {
    if (!terminal)
      return;
    let listener = (data2) => appendData(data2);
    terminal.onMessageReceived(listener);
    return (_2) => terminal.offMessageReceived(listener);
  }, [appendData, terminal]);
  function handleScroll(e) {
    if (autoscroll) {
      setAutoscroll(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex-1 flex flex-col space-y-3 overflow-hidden",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex-1 overflow-hidden",
      children: /* @__PURE__ */ jsx(ScrollArea, {
        ref: scrollArea,
        className: "h-full px-1 rounded-md bg-gray-800 text-gray-200 font-semibold font-mono text-xs",
        onScroll: handleScroll,
        children: data == null ? void 0 : data.map((dataItem, i) => /* @__PURE__ */ jsx(TerminalLine, {
          data: dataItem
        }, `line-${dataItem.id}`))
      })
    }), /* @__PURE__ */ jsxs(Group, {
      className: "!justify-start text-xs font-normal",
      children: [/* @__PURE__ */ jsx(CheckboxRaw, {
        checked: autoscroll,
        onCheckedChange: setAutoscroll
      }), /* @__PURE__ */ jsx(Label, {
        children: "Scroll automatically to bottom on new message"
      })]
    })]
  });
}
function MarlinTerminalWidget() {
  const {
    device
  } = useDeviceContext();
  return /* @__PURE__ */ jsx(Widget, {
    title: "Terminal",
    version: "0.1",
    className: "h-96",
    children: /* @__PURE__ */ jsxs(TerminalProvider, {
      terminal: device.terminal,
      children: [/* @__PURE__ */ jsx(TerminalWindow, {}), /* @__PURE__ */ jsx(TerminalPrompt, {})]
    })
  });
}
const LineEnding = Object.freeze({
  None: 0,
  CarriageReturn: 1,
  NewLine: 2,
  CarriageReturnAndNewLine: 3
});
class ClientTerminal {
  constructor(device, { autoConnect = true } = {}) {
    __publicField(this, "_socket");
    __publicField(this, "_isOpen", false);
    __publicField(this, "deviceId");
    __publicField(this, "lineEnding", LineEnding.NewLine);
    __publicField(this, "useCarriageReturn", false);
    __publicField(this, "_log", []);
    console.log("Creating terminal for device ID", device.id);
    this.deviceId = device.id;
    this._socket = device.sockets.fuseLabs.terminal;
    if (!this._socket) {
      console.log(device);
      throw new Error("Missing terminal socket for device");
    }
    this.onMessageReceived((data) => {
      this._log.push(data);
      if (this._log.length > 30)
        this._log.shift();
    });
    if (autoConnect) {
      this.connect();
    }
  }
  get isOpen() {
    return this._isOpen;
  }
  get log() {
    return this._log;
  }
  connect(onConnect) {
    this._socket.emit("open", this.deviceId, (open) => {
      console.log("Callback on connect, result:", open);
      this._isOpen = open;
      if (open)
        onConnect == null ? void 0 : onConnect(open);
    });
  }
  disconnect() {
    this._socket.emit("close", this.deviceId);
  }
  sendMessage(message) {
    console.log("Sending message:", message);
    let data = {
      id: generateUniqueID(),
      message: this._formatMessage(message),
      from: "user",
      deviceId: this.deviceId
    };
    this._socket.emit("message", data);
    return data;
  }
  onMessageReceived(listener) {
    this._socket.on("message", listener);
  }
  offMessageReceived(listener) {
    this._socket.off("message", listener);
  }
  clearLog() {
    this._log = [];
  }
  _formatMessage(message) {
    switch (this.lineEnding) {
      case LineEnding.NewLine:
        return message.trim() + "\n";
      case LineEnding.CarriageReturn:
        return message.trim() + "\r";
      case LineEnding.CarriageReturnAndNewLine:
        return message.trim() + "\r\n";
      case LineEnding.None:
      default:
        return message.trim();
    }
  }
}
function TerminalPage() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(MarlinTerminalWidget, {}), /* @__PURE__ */ jsx(MarlinTerminalSettingsWidget, {})]
  });
}
class TerminalClientPlugin extends ClientPlugin {
  constructor(data) {
    super(data);
    ClientDeviceManager.shared.addEventListener("updatedDevices", this.provision);
  }
  deviceComponents(device) {
    return {
      page: {
        plugin: TerminalPage
      }
    };
  }
  provision() {
    const devices = ClientDeviceManager.shared.devices;
    devices.forEach((device) => {
      if (device.terminal) {
        console.warn("Trying setting terminal on device but device.terminal already exists");
      } else {
        device.terminal = new ClientTerminal(device);
        console.log("Added terminal plugin to device", device.name);
      }
    });
    return (_) => {
      devices.forEach((device) => {
        if (typeof device.terminal == ClientTerminal) {
          delete device.terminal;
        }
      });
    };
  }
}
export { MarlinTerminalSettingsWidget, MarlinTerminalWidget, TerminalProvider, TerminalClientPlugin as default, useTerminalContext };
