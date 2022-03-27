var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
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
import * as React from "react";
import React__default, { useContext, createContext as createContext$1, forwardRef, createElement, useState, useMemo, useEffect, useRef } from "react";
import classNames from "classnames";
import { ChevronRightIcon, CaretDownIcon, CheckIcon, QuestionMarkCircledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import e$4 from "react-dom";
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var re$1 = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts$1 = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
var parseuri$1 = function parseuri(str) {
  var src = str, b2 = str.indexOf("["), e2 = str.indexOf("]");
  if (b2 != -1 && e2 != -1) {
    str = str.substring(0, b2) + str.substring(b2, e2).replace(/:/g, ";") + str.substring(e2, str.length);
  }
  var m2 = re$1.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts$1[i2]] = m2[i2] || "";
  }
  if (b2 != -1 && e2 != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames$1(uri, uri["path"]);
  uri.queryKey = queryKey$1(uri, uri["query"]);
  return uri;
};
function pathNames$1(obj, path) {
  var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.substr(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.substr(path.length - 1, 1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey$1(uri, query) {
  var data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}
function url$1(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (uri == null)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if (uri.charAt(0) === "/") {
      if (uri.charAt(1) === "/") {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if (typeof loc !== "undefined") {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parseuri$1(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
var hasCors$1 = { exports: {} };
try {
  hasCors$1.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
  hasCors$1.exports = false;
}
var hasCORS$1 = hasCors$1.exports;
var globalThis$2 = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
function XMLHttpRequest$2(opts) {
  const xdomain = opts.xdomain;
  try {
    if (typeof XMLHttpRequest !== "undefined" && (!xdomain || hasCORS$1)) {
      return new XMLHttpRequest();
    }
  } catch (e2) {
  }
  if (!xdomain) {
    try {
      return new globalThis$2[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e2) {
    }
  }
}
function pick$1(obj, ...attr) {
  return attr.reduce((acc, k2) => {
    if (obj.hasOwnProperty(k2)) {
      acc[k2] = obj[k2];
    }
    return acc;
  }, {});
}
const NATIVE_SET_TIMEOUT$1 = setTimeout;
const NATIVE_CLEAR_TIMEOUT$1 = clearTimeout;
function installTimerFunctions$1(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT$1.bind(globalThis$2);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT$1.bind(globalThis$2);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThis$2);
    obj.clearTimeoutFn = clearTimeout.bind(globalThis$2);
  }
}
var Emitter_1$1 = Emitter$1;
function Emitter$1(obj) {
  if (obj)
    return mixin$1(obj);
}
function mixin$1(obj) {
  for (var key in Emitter$1.prototype) {
    obj[key] = Emitter$1.prototype[key];
  }
  return obj;
}
Emitter$1.prototype.on = Emitter$1.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter$1.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter$1.prototype.off = Emitter$1.prototype.removeListener = Emitter$1.prototype.removeAllListeners = Emitter$1.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (arguments.length == 0) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (arguments.length == 1) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter$1.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter$1.prototype.emitReserved = Emitter$1.prototype.emit;
Emitter$1.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter$1.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};
const PACKET_TYPES$1 = /* @__PURE__ */ Object.create(null);
PACKET_TYPES$1["open"] = "0";
PACKET_TYPES$1["close"] = "1";
PACKET_TYPES$1["ping"] = "2";
PACKET_TYPES$1["pong"] = "3";
PACKET_TYPES$1["message"] = "4";
PACKET_TYPES$1["upgrade"] = "5";
PACKET_TYPES$1["noop"] = "6";
const PACKET_TYPES_REVERSE$1 = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES$1).forEach((key) => {
  PACKET_TYPES_REVERSE$1[PACKET_TYPES$1[key]] = key;
});
const ERROR_PACKET$1 = { type: "error", data: "parser error" };
const withNativeBlob$3 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer$5 = typeof ArrayBuffer === "function";
const isView$3 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket$1 = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob$3 && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64$1(data, callback);
    }
  } else if (withNativeArrayBuffer$5 && (data instanceof ArrayBuffer || isView$3(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64$1(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES$1[type] + (data || ""));
};
const encodeBlobAsBase64$1 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};
var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$3 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$7 = 0; i$7 < chars$1.length; i$7++) {
  lookup$3[chars$1.charCodeAt(i$7)] = i$7;
}
var decode$3 = function(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i2, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup$3[base64.charCodeAt(i2)];
    encoded2 = lookup$3[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup$3[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup$3[base64.charCodeAt(i2 + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
const withNativeArrayBuffer$4 = typeof ArrayBuffer === "function";
const decodePacket$1 = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary$1(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet$1(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE$1[type];
  if (!packetType) {
    return ERROR_PACKET$1;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE$1[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE$1[type]
  };
};
const decodeBase64Packet$1 = (data, binaryType) => {
  if (withNativeArrayBuffer$4) {
    const decoded = decode$3(data);
    return mapBinary$1(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
const mapBinary$1 = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data;
  }
};
const SEPARATOR$1 = String.fromCharCode(30);
const encodePayload$1 = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket$1(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR$1));
      }
    });
  });
};
const decodePayload$1 = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR$1);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket$1(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
const protocol$3 = 4;
class Transport$1 extends Emitter_1$1 {
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions$1(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }
  onError(msg, desc) {
    const err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    super.emit("error", err);
    return this;
  }
  open() {
    if (this.readyState === "closed" || this.readyState === "") {
      this.readyState = "opening";
      this.doOpen();
    }
    return this;
  }
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    }
  }
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emit("open");
  }
  onData(data) {
    const packet = decodePacket$1(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  onPacket(packet) {
    super.emit("packet", packet);
  }
  onClose() {
    this.readyState = "closed";
    super.emit("close");
  }
}
var alphabet$1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length$1 = 64, map$2 = {}, seed$1 = 0, i$6 = 0, prev$1;
function encode$1(num) {
  var encoded = "";
  do {
    encoded = alphabet$1[num % length$1] + encoded;
    num = Math.floor(num / length$1);
  } while (num > 0);
  return encoded;
}
function decode$2(str) {
  var decoded = 0;
  for (i$6 = 0; i$6 < str.length; i$6++) {
    decoded = decoded * length$1 + map$2[str.charAt(i$6)];
  }
  return decoded;
}
function yeast$1() {
  var now = encode$1(+new Date());
  if (now !== prev$1)
    return seed$1 = 0, prev$1 = now;
  return now + "." + encode$1(seed$1++);
}
for (; i$6 < length$1; i$6++)
  map$2[alphabet$1[i$6]] = i$6;
yeast$1.encode = encode$1;
yeast$1.decode = decode$2;
var yeast_1$1 = yeast$1;
var parseqs$1 = {};
parseqs$1.encode = function(obj) {
  var str = "";
  for (var i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
};
parseqs$1.decode = function(qs) {
  var qry = {};
  var pairs = qs.split("&");
  for (var i2 = 0, l2 = pairs.length; i2 < l2; i2++) {
    var pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};
class Polling$1 extends Transport$1 {
  constructor() {
    super(...arguments);
    this.polling = false;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  poll() {
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }
  onData(data) {
    const callback = (packet) => {
      if (this.readyState === "opening" && packet.type === "open") {
        this.onOpen();
      }
      if (packet.type === "close") {
        this.onClose();
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload$1(data, this.socket.binaryType).forEach(callback);
    if (this.readyState !== "closed") {
      this.polling = false;
      this.emit("pollComplete");
      if (this.readyState === "open") {
        this.poll();
      }
    }
  }
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if (this.readyState === "open") {
      close();
    } else {
      this.once("open", close);
    }
  }
  write(packets) {
    this.writable = false;
    encodePayload$1(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";
    if (this.opts.timestampRequests !== false) {
      query[this.opts.timestampParam] = yeast_1$1();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    const encodedQuery = parseqs$1.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
}
function empty$1() {
}
const hasXHR2$1 = function() {
  const xhr = new XMLHttpRequest$2({
    xdomain: false
  });
  return xhr.responseType != null;
}();
class XHR$1 extends Polling$1 {
  constructor(opts) {
    super(opts);
    if (typeof location !== "undefined") {
      const isSSL = location.protocol === "https:";
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2$1 && !forceBase64;
  }
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request$1(this.uri(), opts);
  }
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (err) => {
      this.onError("xhr post error", err);
    });
  }
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (err) => {
      this.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }
}
class Request$1 extends Emitter_1$1 {
  constructor(uri, opts) {
    super();
    installTimerFunctions$1(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = opts.async !== false;
    this.data = opts.data !== void 0 ? opts.data : null;
    this.create();
  }
  create() {
    const opts = pick$1(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;
    const xhr = this.xhr = new XMLHttpRequest$2(opts);
    try {
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e2) {
      }
      if (this.method === "POST") {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e2) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e2) {
      }
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4)
          return;
        if (xhr.status === 200 || xhr.status === 1223) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e2) {
      this.setTimeoutFn(() => {
        this.onError(e2);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request$1.requestsCount++;
      Request$1.requests[this.index] = this;
    }
  }
  onSuccess() {
    this.emit("success");
    this.cleanup();
  }
  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }
  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }
  cleanup(fromError) {
    if (typeof this.xhr === "undefined" || this.xhr === null) {
      return;
    }
    this.xhr.onreadystatechange = empty$1;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e2) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request$1.requests[this.index];
    }
    this.xhr = null;
  }
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.onData(data);
    }
  }
  abort() {
    this.cleanup();
  }
}
Request$1.requestsCount = 0;
Request$1.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler$1);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis$2 ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler$1, false);
  }
}
function unloadHandler$1() {
  for (let i2 in Request$1.requests) {
    if (Request$1.requests.hasOwnProperty(i2)) {
      Request$1.requests[i2].abort();
    }
  }
}
const nextTick$1 = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
const WebSocket$1 = globalThis$2.WebSocket || globalThis$2.MozWebSocket;
const usingBrowserWebSocket$1 = true;
const defaultBinaryType$1 = "arraybuffer";
const isReactNative$1 = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS$1 extends Transport$1 {
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative$1 ? {} : pick$1(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket$1 && !isReactNative$1 ? protocols ? new WebSocket$1(uri, protocols) : new WebSocket$1(uri) : new WebSocket$1(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }
    this.ws.binaryType = this.socket.binaryType || defaultBinaryType$1;
    this.addEventListeners();
  }
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e2) => this.onError("websocket error", e2);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket$1(packet, this.supportsBinary, (data) => {
        const opts = {};
        try {
          if (usingBrowserWebSocket$1) {
            this.ws.send(data);
          }
        } catch (e2) {
        }
        if (lastPacket) {
          nextTick$1(() => {
            this.writable = true;
            this.emit("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";
    if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast_1$1();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    const encodedQuery = parseqs$1.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  check() {
    return !!WebSocket$1 && !("__initialize" in WebSocket$1 && this.name === WS$1.prototype.name);
  }
}
const transports$1 = {
  websocket: WS$1,
  polling: XHR$1
};
class Socket$3 extends Emitter_1$1 {
  constructor(uri, opts = {}) {
    super();
    if (uri && typeof uri === "object") {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parseuri$1(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri$1(opts.host).host;
    }
    installTimerFunctions$1(this, opts);
    this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: true
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs$1.decode(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        addEventListener("beforeunload", () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        }, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close");
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  createTransport(name) {
    const query = clone$2(this.opts.query);
    query.EIO = protocol$3;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    });
    return new transports$1[name](opts);
  }
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket$3.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e2) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
      this.onClose("transport close");
    });
  }
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket$3.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if (msg.type === "pong" && msg.data === "probe") {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          Socket$3.priorWebsocketSuccess = transport.name === "websocket";
          this.transport.pause(() => {
            if (failed)
              return;
            if (this.readyState === "closed")
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport.open();
  }
  onOpen() {
    this.readyState = "open";
    Socket$3.priorWebsocketSuccess = this.transport.name === "websocket";
    this.emitReserved("open");
    this.flush();
    if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
      let i2 = 0;
      const l2 = this.upgrades.length;
      for (; i2 < l2; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  onPacket(packet) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    }
  }
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    if (this.readyState === "closed")
      return;
    this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (this.writeBuffer.length === 0) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      this.transport.send(this.writeBuffer);
      this.prevBufferLen = this.writeBuffer.length;
      this.emitReserved("flush");
    }
  }
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  sendPacket(type, data, options, fn) {
    if (typeof data === "function") {
      fn = data;
      data = void 0;
    }
    if (typeof options === "function") {
      fn = options;
      options = null;
    }
    if (this.readyState === "closing" || this.readyState === "closed") {
      return;
    }
    options = options || {};
    options.compress = options.compress !== false;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if (this.readyState === "opening" || this.readyState === "open") {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  onError(err) {
    Socket$3.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  onClose(reason, desc) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, desc);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
}
Socket$3.protocol = protocol$3;
function clone$2(obj) {
  const o2 = {};
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      o2[i2] = obj[i2];
    }
  }
  return o2;
}
Socket$3.protocol;
const withNativeArrayBuffer$3 = typeof ArrayBuffer === "function";
const isView$2 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString$8 = Object.prototype.toString;
const withNativeBlob$2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString$8.call(Blob) === "[object BlobConstructor]";
const withNativeFile$1 = typeof File === "function" || typeof File !== "undefined" && toString$8.call(File) === "[object FileConstructor]";
function isBinary$1(obj) {
  return withNativeArrayBuffer$3 && (obj instanceof ArrayBuffer || isView$2(obj)) || withNativeBlob$2 && obj instanceof Blob || withNativeFile$1 && obj instanceof File;
}
function hasBinary$1(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      if (hasBinary$1(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary$1(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary$1(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary$1(obj[key])) {
      return true;
    }
  }
  return false;
}
function deconstructPacket$1(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket$1(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket$1(data, buffers) {
  if (!data)
    return data;
  if (isBinary$1(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket$1(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket$1(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket$1(packet, buffers) {
  packet.data = _reconstructPacket$1(packet.data, buffers);
  packet.attachments = void 0;
  return packet;
}
function _reconstructPacket$1(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder) {
    return buffers[data.num];
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket$1(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket$1(data[key], buffers);
      }
    }
  }
  return data;
}
const protocol$2 = 5;
var PacketType$1;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType$1 || (PacketType$1 = {}));
class Encoder$1 {
  encode(obj) {
    if (obj.type === PacketType$1.EVENT || obj.type === PacketType$1.ACK) {
      if (hasBinary$1(obj)) {
        obj.type = obj.type === PacketType$1.EVENT ? PacketType$1.BINARY_EVENT : PacketType$1.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }
    return [this.encodeAsString(obj)];
  }
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType$1.BINARY_EVENT || obj.type === PacketType$1.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && obj.nsp !== "/") {
      str += obj.nsp + ",";
    }
    if (obj.id != null) {
      str += obj.id;
    }
    if (obj.data != null) {
      str += JSON.stringify(obj.data);
    }
    return str;
  }
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket$1(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
}
class Decoder$1 extends Emitter_1$1 {
  constructor() {
    super();
  }
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      packet = this.decodeString(obj);
      if (packet.type === PacketType$1.BINARY_EVENT || packet.type === PacketType$1.BINARY_ACK) {
        this.reconstructor = new BinaryReconstructor$1(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary$1(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  decodeString(str) {
    let i2 = 0;
    const p2 = {
      type: Number(str.charAt(0))
    };
    if (PacketType$1[p2.type] === void 0) {
      throw new Error("unknown packet type " + p2.type);
    }
    if (p2.type === PacketType$1.BINARY_EVENT || p2.type === PacketType$1.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p2.attachments = Number(buf);
    }
    if (str.charAt(i2 + 1) === "/") {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (c2 === ",")
          break;
        if (i2 === str.length)
          break;
      }
      p2.nsp = str.substring(start, i2);
    } else {
      p2.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if (next !== "" && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (c2 == null || Number(c2) != c2) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p2.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = tryParse$1(str.substr(i2));
      if (Decoder$1.isPayloadValid(p2.type, payload)) {
        p2.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p2;
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType$1.CONNECT:
        return typeof payload === "object";
      case PacketType$1.DISCONNECT:
        return payload === void 0;
      case PacketType$1.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";
      case PacketType$1.EVENT:
      case PacketType$1.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;
      case PacketType$1.ACK:
      case PacketType$1.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }
}
function tryParse$1(str) {
  try {
    return JSON.parse(str);
  } catch (e2) {
    return false;
  }
}
class BinaryReconstructor$1 {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket$1(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}
var parser$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  protocol: protocol$2,
  get PacketType() {
    return PacketType$1;
  },
  Encoder: Encoder$1,
  Decoder: Decoder$1
}, Symbol.toStringTag, { value: "Module" }));
function on$1(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
const RESERVED_EVENTS$1 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1
});
class Socket$2 extends Emitter_1$1 {
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.disconnected = true;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    if (this.io._autoConnect)
      this.open();
  }
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on$1(io, "open", this.onopen.bind(this)),
      on$1(io, "packet", this.onpacket.bind(this)),
      on$1(io, "error", this.onerror.bind(this)),
      on$1(io, "close", this.onclose.bind(this))
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if (this.io._readyState === "open")
      this.onopen();
    return this;
  }
  open() {
    return this.connect();
  }
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  emit(ev, ...args) {
    if (RESERVED_EVENTS$1.hasOwnProperty(ev)) {
      throw new Error('"' + ev + '" is a reserved event name');
    }
    args.unshift(ev);
    const packet = {
      type: PacketType$1.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if (typeof args[args.length - 1] === "function") {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket)
      ;
    else if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  _registerAckCallback(id, ack) {
    const timeout = this.flags.timeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this.packet({ type: PacketType$1.CONNECT, data });
      });
    } else {
      this.packet({ type: PacketType$1.CONNECT, data: this.auth });
    }
  }
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  onclose(reason) {
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emitReserved("disconnect", reason);
  }
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType$1.CONNECT:
        if (packet.data && packet.data.sid) {
          const id = packet.data.sid;
          this.onconnect(id);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType$1.EVENT:
        this.onevent(packet);
        break;
      case PacketType$1.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType$1.ACK:
        this.onack(packet);
        break;
      case PacketType$1.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType$1.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType$1.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  onevent(packet) {
    const args = packet.data || [];
    if (packet.id != null) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
  }
  ack(id) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType$1.ACK,
        id,
        data: args
      });
    };
  }
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack === "function") {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    }
  }
  onconnect(id) {
    this.id = id;
    this.connected = true;
    this.disconnected = false;
    this.emitBuffered();
    this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => this.packet(packet));
    this.sendBuffer = [];
  }
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType$1.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  close() {
    return this.disconnect();
  }
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
}
var backo2$1 = Backoff$1;
function Backoff$1(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff$1.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff$1.prototype.reset = function() {
  this.attempts = 0;
};
Backoff$1.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff$1.prototype.setMax = function(max) {
  this.max = max;
};
Backoff$1.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};
class Manager$1 extends Emitter_1$1 {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions$1(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new backo2$1({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser$1;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v2) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v2;
    return this;
  }
  reconnectionAttempts(v2) {
    if (v2 === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v2;
    return this;
  }
  reconnectionDelay(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v2);
    return this;
  }
  randomizationFactor(v2) {
    var _a;
    if (v2 === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v2);
    return this;
  }
  reconnectionDelayMax(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v2);
    return this;
  }
  timeout(v2) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v2;
    return this;
  }
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket$3(this.uri, this.opts);
    const socket2 = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on$1(socket2, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const errorSub = on$1(socket2, "error", (err) => {
      self2.cleanup();
      self2._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        self2.maybeReconnectOnOpen();
      }
    });
    if (this._timeout !== false) {
      const timeout = this._timeout;
      if (timeout === 0) {
        openSubDestroy();
      }
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        socket2.close();
        socket2.emit("error", new Error("timeout"));
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  connect(fn) {
    return this.open(fn);
  }
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket2 = this.engine;
    this.subs.push(on$1(socket2, "ping", this.onping.bind(this)), on$1(socket2, "data", this.ondata.bind(this)), on$1(socket2, "error", this.onerror.bind(this)), on$1(socket2, "close", this.onclose.bind(this)), on$1(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(data) {
    this.decoder.add(data);
  }
  ondecoded(packet) {
    this.emitReserved("packet", packet);
  }
  onerror(err) {
    this.emitReserved("error", err);
  }
  socket(nsp, opts) {
    let socket2 = this.nsps[nsp];
    if (!socket2) {
      socket2 = new Socket$2(this, nsp, opts);
      this.nsps[nsp] = socket2;
    }
    return socket2;
  }
  _destroy(socket2) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket3 = this.nsps[nsp];
      if (socket3.active) {
        return;
      }
    }
    this._close();
  }
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(reason) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
  }
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}
const cache$1 = {};
function lookup$2(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url$1(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache$1[id] && path in cache$1[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager$1(source, opts);
  } else {
    if (!cache$1[id]) {
      cache$1[id] = new Manager$1(source, opts);
    }
    io = cache$1[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup$2, {
  Manager: Manager$1,
  Socket: Socket$2,
  io: lookup$2,
  connect: lookup$2
});
var lodash$2 = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(module, exports) {
  (function() {
    var undefined$1;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE2 = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT2 = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE2 = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY2 = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", domExcTag = "[object DOMException]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", nullTag2 = "[object Null]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag2 = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp2 = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar2.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar2 = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint2 = /^(?:0|[1-9]\d*)$/;
    var reLatin2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange2 = "\\ud800-\\udfff", rsComboMarksRange2 = "\\u0300-\\u036f", reComboHalfMarksRange2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange2 = "\\u20d0-\\u20ff", rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2, rsDingbatRange2 = "\\u2700-\\u27bf", rsLowerRange2 = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange2 = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange2 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange2 = "\\u2000-\\u206f", rsSpaceRange2 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange2 = "\\ufe0e\\ufe0f", rsBreakRange2 = rsMathOpRange2 + rsNonCharRange2 + rsPunctuationRange2 + rsSpaceRange2;
    var rsApos2 = "['\u2019]", rsAstral2 = "[" + rsAstralRange2 + "]", rsBreak2 = "[" + rsBreakRange2 + "]", rsCombo2 = "[" + rsComboRange2 + "]", rsDigits2 = "\\d+", rsDingbat2 = "[" + rsDingbatRange2 + "]", rsLower2 = "[" + rsLowerRange2 + "]", rsMisc2 = "[^" + rsAstralRange2 + rsBreakRange2 + rsDigits2 + rsDingbatRange2 + rsLowerRange2 + rsUpperRange2 + "]", rsFitz2 = "\\ud83c[\\udffb-\\udfff]", rsModifier2 = "(?:" + rsCombo2 + "|" + rsFitz2 + ")", rsNonAstral2 = "[^" + rsAstralRange2 + "]", rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper2 = "[" + rsUpperRange2 + "]", rsZWJ2 = "\\u200d";
    var rsMiscLower2 = "(?:" + rsLower2 + "|" + rsMisc2 + ")", rsMiscUpper2 = "(?:" + rsUpper2 + "|" + rsMisc2 + ")", rsOptContrLower2 = "(?:" + rsApos2 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper2 = "(?:" + rsApos2 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod2 = rsModifier2 + "?", rsOptVar2 = "[" + rsVarRange2 + "]?", rsOptJoin2 = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*", rsOrdLower2 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper2 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2, rsEmoji2 = "(?:" + [rsDingbat2, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2, rsSymbol2 = "(?:" + [rsNonAstral2 + rsCombo2 + "?", rsCombo2, rsRegional2, rsSurrPair2, rsAstral2].join("|") + ")";
    var reApos2 = RegExp(rsApos2, "g");
    var reComboMark2 = RegExp(rsCombo2, "g");
    var reUnicode2 = RegExp(rsFitz2 + "(?=" + rsFitz2 + ")|" + rsSymbol2 + rsSeq2, "g");
    var reUnicodeWord2 = RegExp([
      rsUpper2 + "?" + rsLower2 + "+" + rsOptContrLower2 + "(?=" + [rsBreak2, rsUpper2, "$"].join("|") + ")",
      rsMiscUpper2 + "+" + rsOptContrUpper2 + "(?=" + [rsBreak2, rsUpper2 + rsMiscLower2, "$"].join("|") + ")",
      rsUpper2 + "?" + rsMiscLower2 + "+" + rsOptContrLower2,
      rsUpper2 + "+" + rsOptContrUpper2,
      rsOrdUpper2,
      rsOrdLower2,
      rsDigits2,
      rsEmoji2
    ].join("|"), "g");
    var reHasUnicode2 = RegExp("[" + rsZWJ2 + rsAstralRange2 + rsComboRange2 + rsVarRange2 + "]");
    var reHasUnicodeWord2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags2 = {};
    typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
    typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
    var cloneableTags = {};
    cloneableTags[argsTag2] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag2] = cloneableTags[dataViewTag2] = cloneableTags[boolTag2] = cloneableTags[dateTag2] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag2] = cloneableTags[numberTag2] = cloneableTags[objectTag2] = cloneableTags[regexpTag2] = cloneableTags[setTag2] = cloneableTags[stringTag2] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
    cloneableTags[errorTag2] = cloneableTags[funcTag2] = cloneableTags[weakMapTag2] = false;
    var deburredLetters2 = {
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal2 = typeof commonjsGlobal$1 == "object" && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;
    var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal2.process;
    var nodeUtil2 = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil2 && nodeUtil2.isArrayBuffer, nodeIsDate = nodeUtil2 && nodeUtil2.isDate, nodeIsMap = nodeUtil2 && nodeUtil2.isMap, nodeIsRegExp = nodeUtil2 && nodeUtil2.isRegExp, nodeIsSet = nodeUtil2 && nodeUtil2.isSet, nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array2, setter, iteratee, accumulator) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        var value = array2[index];
        setter(accumulator, value, iteratee(value), array2);
      }
      return accumulator;
    }
    function arrayEach(array2, iteratee) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (iteratee(array2[index], index, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayEachRight(array2, iteratee) {
      var length2 = array2 == null ? 0 : array2.length;
      while (length2--) {
        if (iteratee(array2[length2], length2, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayEvery(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (!predicate(array2[index], index, array2)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter2(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array2[index];
        if (predicate(value, index, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array2, value) {
      var length2 = array2 == null ? 0 : array2.length;
      return !!length2 && baseIndexOf(array2, value, 0) > -1;
    }
    function arrayIncludesWith(array2, value, comparator) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (comparator(value, array2[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap2(array2, iteratee) {
      var index = -1, length2 = array2 == null ? 0 : array2.length, result = Array(length2);
      while (++index < length2) {
        result[index] = iteratee(array2[index], index, array2);
      }
      return result;
    }
    function arrayPush2(array2, values) {
      var index = -1, length2 = values.length, offset = array2.length;
      while (++index < length2) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    function arrayReduce2(array2, iteratee, accumulator, initAccum) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      if (initAccum && length2) {
        accumulator = array2[++index];
      }
      while (++index < length2) {
        accumulator = iteratee(accumulator, array2[index], index, array2);
      }
      return accumulator;
    }
    function arrayReduceRight(array2, iteratee, accumulator, initAccum) {
      var length2 = array2 == null ? 0 : array2.length;
      if (initAccum && length2) {
        accumulator = array2[--length2];
      }
      while (length2--) {
        accumulator = iteratee(accumulator, array2[length2], length2, array2);
      }
      return accumulator;
    }
    function arraySome2(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (predicate(array2[index], index, array2)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty2("length");
    function asciiToArray2(string2) {
      return string2.split("");
    }
    function asciiWords2(string2) {
      return string2.match(reAsciiWord2) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length2 = array2.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length2) {
        if (predicate(array2[index], index, array2)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array2, value, fromIndex) {
      return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array2, value, fromIndex, comparator) {
      var index = fromIndex - 1, length2 = array2.length;
      while (++index < length2) {
        if (comparator(array2[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array2, iteratee) {
      var length2 = array2 == null ? 0 : array2.length;
      return length2 ? baseSum(array2, iteratee) / length2 : NAN;
    }
    function baseProperty2(key) {
      return function(object2) {
        return object2 == null ? undefined$1 : object2[key];
      };
    }
    function basePropertyOf2(object2) {
      return function(key) {
        return object2 == null ? undefined$1 : object2[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array2, comparer) {
      var length2 = array2.length;
      array2.sort(comparer);
      while (length2--) {
        array2[length2] = array2[length2].value;
      }
      return array2;
    }
    function baseSum(array2, iteratee) {
      var result, index = -1, length2 = array2.length;
      while (++index < length2) {
        var current = iteratee(array2[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes2(n2, iteratee) {
      var index = -1, result = Array(n2);
      while (++index < n2) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object2, props) {
      return arrayMap2(props, function(key) {
        return [key, object2[key]];
      });
    }
    function baseTrim(string2) {
      return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
    }
    function baseUnary2(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object2, props) {
      return arrayMap2(props, function(key) {
        return object2[key];
      });
    }
    function cacheHas2(cache2, key) {
      return cache2.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length2 = strSymbols.length;
      while (++index < length2 && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array2, placeholder) {
      var length2 = array2.length, result = 0;
      while (length2--) {
        if (array2[length2] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter2 = basePropertyOf2(deburredLetters2);
    var escapeHtmlChar = basePropertyOf2(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue2(object2, key) {
      return object2 == null ? undefined$1 : object2[key];
    }
    function hasUnicode2(string2) {
      return reHasUnicode2.test(string2);
    }
    function hasUnicodeWord2(string2) {
      return reHasUnicodeWord2.test(string2);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray2(map2) {
      var index = -1, result = Array(map2.size);
      map2.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array2, placeholder) {
      var index = -1, length2 = array2.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array2[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array2[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray2(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array2, value, fromIndex) {
      var index = fromIndex - 1, length2 = array2.length;
      while (++index < length2) {
        if (array2[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array2, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array2[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string2) {
      return hasUnicode2(string2) ? unicodeSize(string2) : asciiSize(string2);
    }
    function stringToArray2(string2) {
      return hasUnicode2(string2) ? unicodeToArray2(string2) : asciiToArray2(string2);
    }
    function trimmedEndIndex(string2) {
      var index = string2.length;
      while (index-- && reWhitespace.test(string2.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf2(htmlUnescapes);
    function unicodeSize(string2) {
      var result = reUnicode2.lastIndex = 0;
      while (reUnicode2.test(string2)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray2(string2) {
      return string2.match(reUnicode2) || [];
    }
    function unicodeWords2(string2) {
      return string2.match(reUnicodeWord2) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root2 : _2.defaults(root2.Object(), context, _2.pick(root2, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto2 = Array2.prototype, funcProto2 = Function2.prototype, objectProto2 = Object2.prototype;
      var coreJsData2 = context["__core-js_shared__"];
      var funcToString2 = funcProto2.toString;
      var hasOwnProperty2 = objectProto2.hasOwnProperty;
      var idCounter2 = 0;
      var maskSrcKey2 = function() {
        var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString2 = objectProto2.toString;
      var objectCtorString = funcToString2.call(Object2);
      var oldDash = root2._;
      var reIsNative2 = RegExp2("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer2 = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype = overArg2(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : undefined$1;
      var defineProperty2 = function() {
        try {
          var func = getNative2(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e2) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols2 = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto2.join, nativeKeys2 = overArg2(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto2.reverse;
      var DataView2 = getNative2(context, "DataView"), Map2 = getNative2(context, "Map"), Promise2 = getNative2(context, "Promise"), Set2 = getNative2(context, "Set"), WeakMap2 = getNative2(context, "WeakMap"), nativeCreate2 = getNative2(Object2, "create");
      var metaMap = WeakMap2 && new WeakMap2();
      var realNames = {};
      var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
      var symbolProto2 = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : undefined$1, symbolToString2 = symbolProto2 ? symbolProto2.toString : undefined$1;
      function lodash2(value) {
        if (isObjectLike2(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty2.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object2() {
        }
        return function(proto) {
          if (!isObject2(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object2.prototype = proto;
          var result2 = new object2();
          object2.prototype = undefined$1;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash2.templateSettings = {
        "escape": reEscape,
        "evaluate": reEvaluate,
        "interpolate": reInterpolate,
        "variable": "",
        "imports": {
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array2 = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array2), isRight = dir < 0, arrLength = isArr ? array2.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length2 = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length2, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length2 && takeCount == length2) {
          return baseWrapperValue(array2, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length2-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array2[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear2() {
        this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
        this.size = 0;
      }
      function hashDelete2(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet2(key) {
        var data = this.__data__;
        if (nativeCreate2) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED2 ? undefined$1 : result2;
        }
        return hasOwnProperty2.call(data, key) ? data[key] : undefined$1;
      }
      function hashHas2(key) {
        var data = this.__data__;
        return nativeCreate2 ? data[key] !== undefined$1 : hasOwnProperty2.call(data, key);
      }
      function hashSet2(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate2 && value === undefined$1 ? HASH_UNDEFINED2 : value;
        return this;
      }
      Hash2.prototype.clear = hashClear2;
      Hash2.prototype["delete"] = hashDelete2;
      Hash2.prototype.get = hashGet2;
      Hash2.prototype.has = hashHas2;
      Hash2.prototype.set = hashSet2;
      function ListCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear2() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice2.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        return index < 0 ? undefined$1 : data[index][1];
      }
      function listCacheHas2(key) {
        return assocIndexOf2(this.__data__, key) > -1;
      }
      function listCacheSet2(key, value) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache2.prototype.clear = listCacheClear2;
      ListCache2.prototype["delete"] = listCacheDelete2;
      ListCache2.prototype.get = listCacheGet2;
      ListCache2.prototype.has = listCacheHas2;
      ListCache2.prototype.set = listCacheSet2;
      function MapCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear2() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash2(),
          "map": new (Map2 || ListCache2)(),
          "string": new Hash2()
        };
      }
      function mapCacheDelete2(key) {
        var result2 = getMapData2(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet2(key) {
        return getMapData2(this, key).get(key);
      }
      function mapCacheHas2(key) {
        return getMapData2(this, key).has(key);
      }
      function mapCacheSet2(key, value) {
        var data = getMapData2(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache2.prototype.clear = mapCacheClear2;
      MapCache2.prototype["delete"] = mapCacheDelete2;
      MapCache2.prototype.get = mapCacheGet2;
      MapCache2.prototype.has = mapCacheHas2;
      MapCache2.prototype.set = mapCacheSet2;
      function SetCache2(values2) {
        var index = -1, length2 = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache2();
        while (++index < length2) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd2(value) {
        this.__data__.set(value, HASH_UNDEFINED2);
        return this;
      }
      function setCacheHas2(value) {
        return this.__data__.has(value);
      }
      SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
      SetCache2.prototype.has = setCacheHas2;
      function Stack2(entries) {
        var data = this.__data__ = new ListCache2(entries);
        this.size = data.size;
      }
      function stackClear2() {
        this.__data__ = new ListCache2();
        this.size = 0;
      }
      function stackDelete2(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet2(key) {
        return this.__data__.get(key);
      }
      function stackHas2(key) {
        return this.__data__.has(key);
      }
      function stackSet2(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache2) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache2(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack2.prototype.clear = stackClear2;
      Stack2.prototype["delete"] = stackDelete2;
      Stack2.prototype.get = stackGet2;
      Stack2.prototype.has = stackHas2;
      Stack2.prototype.set = stackSet2;
      function arrayLikeKeys2(value, inherited) {
        var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes2(value.length, String2) : [], length2 = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length2)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array2) {
        var length2 = array2.length;
        return length2 ? array2[baseRandom(0, length2 - 1)] : undefined$1;
      }
      function arraySampleSize(array2, n2) {
        return shuffleSelf(copyArray(array2), baseClamp(n2, 0, array2.length));
      }
      function arrayShuffle(array2) {
        return shuffleSelf(copyArray(array2));
      }
      function assignMergeValue(object2, key, value) {
        if (value !== undefined$1 && !eq2(object2[key], value) || value === undefined$1 && !(key in object2)) {
          baseAssignValue2(object2, key, value);
        }
      }
      function assignValue(object2, key, value) {
        var objValue = object2[key];
        if (!(hasOwnProperty2.call(object2, key) && eq2(objValue, value)) || value === undefined$1 && !(key in object2)) {
          baseAssignValue2(object2, key, value);
        }
      }
      function assocIndexOf2(array2, key) {
        var length2 = array2.length;
        while (length2--) {
          if (eq2(array2[length2][0], key)) {
            return length2;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object2, source) {
        return object2 && copyObject(source, keys2(source), object2);
      }
      function baseAssignIn(object2, source) {
        return object2 && copyObject(source, keysIn(source), object2);
      }
      function baseAssignValue2(object2, key, value) {
        if (key == "__proto__" && defineProperty2) {
          defineProperty2(object2, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object2[key] = value;
        }
      }
      function baseAt(object2, paths) {
        var index = -1, length2 = paths.length, result2 = Array2(length2), skip = object2 == null;
        while (++index < length2) {
          result2[index] = skip ? undefined$1 : get2(object2, paths[index]);
        }
        return result2;
      }
      function baseClamp(number2, lower, upper) {
        if (number2 === number2) {
          if (upper !== undefined$1) {
            number2 = number2 <= upper ? number2 : upper;
          }
          if (lower !== undefined$1) {
            number2 = number2 >= lower ? number2 : lower;
          }
        }
        return number2;
      }
      function baseClone2(value, bitmask, customizer, key, object2, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object2 ? customizer(value, key, object2, stack) : customizer(value);
        }
        if (result2 !== undefined$1) {
          return result2;
        }
        if (!isObject2(value)) {
          return value;
        }
        var isArr = isArray2(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
          if (isBuffer2(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag2 || tag == argsTag2 || isFunc && !object2) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object2 ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack2());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone2(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys2 : isFlat ? keysIn : keys2;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys2(source);
        return function(object2) {
          return baseConformsTo(object2, source, props);
        };
      }
      function baseConformsTo(object2, source, props) {
        var length2 = props.length;
        if (object2 == null) {
          return !length2;
        }
        object2 = Object2(object2);
        while (length2--) {
          var key = props[length2], predicate = source[key], value = object2[key];
          if (value === undefined$1 && !(key in object2) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        return setTimeout2(function() {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array2, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length2 = array2.length, result2 = [], valuesLength = values2.length;
        if (!length2) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap2(values2, baseUnary2(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE2) {
          includes2 = cacheHas2;
          isCommon = false;
          values2 = new SetCache2(values2);
        }
        outer:
          while (++index < length2) {
            var value = array2[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn2);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array2, iteratee2, comparator) {
        var index = -1, length2 = array2.length;
        while (++index < length2) {
          var value = array2[index], current = iteratee2(value);
          if (current != null && (computed === undefined$1 ? current === current && !isSymbol2(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array2, value, start, end) {
        var length2 = array2.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length2 ? 0 : length2 + start;
        }
        end = end === undefined$1 || end > length2 ? length2 : toInteger(end);
        if (end < 0) {
          end += length2;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array2[start++] = value;
        }
        return array2;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array2, depth, predicate, isStrict, result2) {
        var index = -1, length2 = array2.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length2) {
          var value = array2[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush2(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor2 = createBaseFor2();
      var baseForRight = createBaseFor2(true);
      function baseForOwn2(object2, iteratee2) {
        return object2 && baseFor2(object2, iteratee2, keys2);
      }
      function baseForOwnRight(object2, iteratee2) {
        return object2 && baseForRight(object2, iteratee2, keys2);
      }
      function baseFunctions(object2, props) {
        return arrayFilter2(props, function(key) {
          return isFunction2(object2[key]);
        });
      }
      function baseGet2(object2, path) {
        path = castPath2(path, object2);
        var index = 0, length2 = path.length;
        while (object2 != null && index < length2) {
          object2 = object2[toKey2(path[index++])];
        }
        return index && index == length2 ? object2 : undefined$1;
      }
      function baseGetAllKeys2(object2, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object2);
        return isArray2(object2) ? result2 : arrayPush2(result2, symbolsFunc(object2));
      }
      function baseGetTag2(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag2 : nullTag2;
        }
        return symToStringTag2 && symToStringTag2 in Object2(value) ? getRawTag2(value) : objectToString2(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas2(object2, key) {
        return object2 != null && hasOwnProperty2.call(object2, key);
      }
      function baseHasIn2(object2, key) {
        return object2 != null && key in Object2(object2);
      }
      function baseInRange(number2, start, end) {
        return number2 >= nativeMin(start, end) && number2 < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length2 = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array2 = arrays[othIndex];
          if (othIndex && iteratee2) {
            array2 = arrayMap2(array2, baseUnary2(iteratee2));
          }
          maxLength = nativeMin(array2.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length2 >= 120 && array2.length >= 120) ? new SetCache2(othIndex && array2) : undefined$1;
        }
        array2 = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length2 && result2.length < maxLength) {
            var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas2(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas2(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object2, setter, iteratee2, accumulator) {
        baseForOwn2(object2, function(value, key, object3) {
          setter(accumulator, iteratee2(value), key, object3);
        });
        return accumulator;
      }
      function baseInvoke(object2, path, args) {
        path = castPath2(path, object2);
        object2 = parent(object2, path);
        var func = object2 == null ? object2 : object2[toKey2(last(path))];
        return func == null ? undefined$1 : apply(func, object2, args);
      }
      function baseIsArguments2(value) {
        return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike2(value) && baseGetTag2(value) == arrayBufferTag2;
      }
      function baseIsDate(value) {
        return isObjectLike2(value) && baseGetTag2(value) == dateTag2;
      }
      function baseIsEqual2(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
      }
      function baseIsEqualDeep2(object2, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray2(object2), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag2(object2), othTag = othIsArr ? arrayTag2 : getTag2(other);
        objTag = objTag == argsTag2 ? objectTag2 : objTag;
        othTag = othTag == argsTag2 ? objectTag2 : othTag;
        var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer2(object2)) {
          if (!isBuffer2(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack2());
          return objIsArr || isTypedArray2(object2) ? equalArrays2(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object2, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG2)) {
          var objIsWrapped = objIsObj && hasOwnProperty2.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack2());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack2());
        return equalObjects2(object2, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike2(value) && getTag2(value) == mapTag2;
      }
      function baseIsMatch2(object2, source, matchData, customizer) {
        var index = matchData.length, length2 = index, noCustomizer = !customizer;
        if (object2 == null) {
          return !length2;
        }
        object2 = Object2(object2);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
            return false;
          }
        }
        while (++index < length2) {
          data = matchData[index];
          var key = data[0], objValue = object2[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object2)) {
              return false;
            }
          } else {
            var stack = new Stack2();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object2, source, stack);
            }
            if (!(result2 === undefined$1 ? baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative2(value) {
        if (!isObject2(value) || isMasked2(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
        return pattern.test(toSource2(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike2(value) && baseGetTag2(value) == regexpTag2;
      }
      function baseIsSet(value) {
        return isObjectLike2(value) && getTag2(value) == setTag2;
      }
      function baseIsTypedArray2(value) {
        return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
      }
      function baseIteratee2(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity2;
        }
        if (typeof value == "object") {
          return isArray2(value) ? baseMatchesProperty2(value[0], value[1]) : baseMatches2(value);
        }
        return property2(value);
      }
      function baseKeys2(object2) {
        if (!isPrototype2(object2)) {
          return nativeKeys2(object2);
        }
        var result2 = [];
        for (var key in Object2(object2)) {
          if (hasOwnProperty2.call(object2, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object2) {
        if (!isObject2(object2)) {
          return nativeKeysIn(object2);
        }
        var isProto = isPrototype2(object2), result2 = [];
        for (var key in object2) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object2, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches2(source) {
        var matchData = getMatchData2(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable2(matchData[0][0], matchData[0][1]);
        }
        return function(object2) {
          return object2 === source || baseIsMatch2(object2, source, matchData);
        };
      }
      function baseMatchesProperty2(path, srcValue) {
        if (isKey2(path) && isStrictComparable2(srcValue)) {
          return matchesStrictComparable2(toKey2(path), srcValue);
        }
        return function(object2) {
          var objValue = get2(object2, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn2(object2, path) : baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2);
        };
      }
      function baseMerge(object2, source, srcIndex, customizer, stack) {
        if (object2 === source) {
          return;
        }
        baseFor2(source, function(srcValue, key) {
          stack || (stack = new Stack2());
          if (isObject2(srcValue)) {
            baseMergeDeep(object2, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object2, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object2, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object2, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray2(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject2(srcValue) || isArguments2(srcValue)) {
            newValue = objValue;
            if (isArguments2(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject2(objValue) || isFunction2(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object2, key, newValue);
      }
      function baseNth(array2, n2) {
        var length2 = array2.length;
        if (!length2) {
          return;
        }
        n2 += n2 < 0 ? length2 : 0;
        return isIndex2(n2, length2) ? array2[n2] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap2(iteratees, function(iteratee2) {
            if (isArray2(iteratee2)) {
              return function(value) {
                return baseGet2(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity2];
        }
        var index = -1;
        iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap2(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result2, function(object2, other) {
          return compareMultiple(object2, other, orders);
        });
      }
      function basePick(object2, paths) {
        return basePickBy(object2, paths, function(value, path) {
          return hasIn2(object2, path);
        });
      }
      function basePickBy(object2, paths, predicate) {
        var index = -1, length2 = paths.length, result2 = {};
        while (++index < length2) {
          var path = paths[index], value = baseGet2(object2, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath2(path, object2), value);
          }
        }
        return result2;
      }
      function basePropertyDeep2(path) {
        return function(object2) {
          return baseGet2(object2, path);
        };
      }
      function basePullAll(array2, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length2 = values2.length, seen = array2;
        if (array2 === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap2(array2, baseUnary2(iteratee2));
        }
        while (++index < length2) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array2) {
              splice2.call(seen, fromIndex, 1);
            }
            splice2.call(array2, fromIndex, 1);
          }
        }
        return array2;
      }
      function basePullAt(array2, indexes) {
        var length2 = array2 ? indexes.length : 0, lastIndex = length2 - 1;
        while (length2--) {
          var index = indexes[length2];
          if (length2 == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex2(index)) {
              splice2.call(array2, index, 1);
            } else {
              baseUnset(array2, index);
            }
          }
        }
        return array2;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length2 = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length2);
        while (length2--) {
          result2[fromRight ? length2 : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string2, n2) {
        var result2 = "";
        if (!string2 || n2 < 1 || n2 > MAX_SAFE_INTEGER2) {
          return result2;
        }
        do {
          if (n2 % 2) {
            result2 += string2;
          }
          n2 = nativeFloor(n2 / 2);
          if (n2) {
            string2 += string2;
          }
        } while (n2);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity2), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n2) {
        var array2 = values(collection);
        return shuffleSelf(array2, baseClamp(n2, 0, array2.length));
      }
      function baseSet(object2, path, value, customizer) {
        if (!isObject2(object2)) {
          return object2;
        }
        path = castPath2(path, object2);
        var index = -1, length2 = path.length, lastIndex = length2 - 1, nested = object2;
        while (nested != null && ++index < length2) {
          var key = toKey2(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object2;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject2(objValue) ? objValue : isIndex2(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object2;
      }
      var baseSetData = !metaMap ? identity2 : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty2 ? identity2 : function(func, string2) {
        return defineProperty2(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string2),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice2(array2, start, end) {
        var index = -1, length2 = array2.length;
        if (start < 0) {
          start = -start > length2 ? 0 : length2 + start;
        }
        end = end > length2 ? length2 : end;
        if (end < 0) {
          end += length2;
        }
        length2 = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length2);
        while (++index < length2) {
          result2[index] = array2[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array2, value, retHighest) {
        var low = 0, high = array2 == null ? low : array2.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array2[mid];
            if (computed !== null && !isSymbol2(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array2, value, identity2, retHighest);
      }
      function baseSortedIndexBy(array2, value, iteratee2, retHighest) {
        var low = 0, high = array2 == null ? 0 : array2.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array2[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol2(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array2, iteratee2) {
        var index = -1, length2 = array2.length, resIndex = 0, result2 = [];
        while (++index < length2) {
          var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq2(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString2(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray2(value)) {
          return arrayMap2(value, baseToString2) + "";
        }
        if (isSymbol2(value)) {
          return symbolToString2 ? symbolToString2.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
      }
      function baseUniq(array2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length2 = array2.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length2 >= LARGE_ARRAY_SIZE2) {
          var set3 = iteratee2 ? null : createSet(array2);
          if (set3) {
            return setToArray2(set3);
          }
          isCommon = false;
          includes2 = cacheHas2;
          seen = new SetCache2();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length2) {
            var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object2, path) {
        path = castPath2(path, object2);
        object2 = parent(object2, path);
        return object2 == null || delete object2[toKey2(last(path))];
      }
      function baseUpdate(object2, path, updater, customizer) {
        return baseSet(object2, path, updater(baseGet2(object2, path)), customizer);
      }
      function baseWhile(array2, predicate, isDrop, fromRight) {
        var length2 = array2.length, index = fromRight ? length2 : -1;
        while ((fromRight ? index-- : ++index < length2) && predicate(array2[index], index, array2)) {
        }
        return isDrop ? baseSlice2(array2, fromRight ? 0 : index, fromRight ? index + 1 : length2) : baseSlice2(array2, fromRight ? index + 1 : 0, fromRight ? length2 : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce2(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush2([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length2 = arrays.length;
        if (length2 < 2) {
          return length2 ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length2);
        while (++index < length2) {
          var array2 = arrays[index], othIndex = -1;
          while (++othIndex < length2) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array2, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length2 = props.length, valsLength = values2.length, result2 = {};
        while (++index < length2) {
          var value = index < valsLength ? values2[index] : undefined$1;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity2;
      }
      function castPath2(value, object2) {
        if (isArray2(value)) {
          return value;
        }
        return isKey2(value, object2) ? [value] : stringToPath2(toString2(value));
      }
      var castRest = baseRest;
      function castSlice2(array2, start, end) {
        var length2 = array2.length;
        end = end === undefined$1 ? length2 : end;
        return !start && end >= length2 ? array2 : baseSlice2(array2, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root2.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length2 = buffer.length, result2 = allocUnsafe ? allocUnsafe(length2) : new buffer.constructor(length2);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf2 ? Object2(symbolValueOf2.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
          var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object2, other, orders) {
        var index = -1, objCriteria = object2.criteria, othCriteria = other.criteria, length2 = objCriteria.length, ordersLength = orders.length;
        while (++index < length2) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object2.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array2) {
        var index = -1, length2 = source.length;
        array2 || (array2 = Array2(length2));
        while (++index < length2) {
          array2[index] = source[index];
        }
        return array2;
      }
      function copyObject(source, props, object2, customizer) {
        var isNew = !object2;
        object2 || (object2 = {});
        var index = -1, length2 = props.length;
        while (++index < length2) {
          var key = props[index];
          var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue2(object2, key, newValue);
          } else {
            assignValue(object2, key, newValue);
          }
        }
        return object2;
      }
      function copySymbols(source, object2) {
        return copyObject(source, getSymbols2(source), object2);
      }
      function copySymbolsIn(source, object2) {
        return copyObject(source, getSymbolsIn(source), object2);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object2, sources) {
          var index = -1, length2 = sources.length, customizer = length2 > 1 ? sources[length2 - 1] : undefined$1, guard = length2 > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length2--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length2 < 3 ? undefined$1 : customizer;
            length2 = 1;
          }
          object2 = Object2(object2);
          while (++index < length2) {
            var source = sources[index];
            if (source) {
              assigner(object2, source, index, customizer);
            }
          }
          return object2;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike2(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length2 = collection.length, index = fromRight ? length2 : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length2) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor2(fromRight) {
        return function(object2, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object2), props = keysFunc(object2), length2 = props.length;
          while (length2--) {
            var key = props[fromRight ? length2 : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object2;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst2(methodName) {
        return function(string2) {
          string2 = toString2(string2);
          var strSymbols = hasUnicode2(string2) ? stringToArray2(string2) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
          var trailing = strSymbols ? castSlice2(strSymbols, 1).join("") : string2.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder2(callback) {
        return function(string2) {
          return arrayReduce2(words2(deburr2(string2).replace(reApos2, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject2(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length2 = arguments.length, args = Array2(length2), index = length2, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length2 < 3 && args[0] !== placeholder && args[length2 - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length2 -= holders.length;
          if (length2 < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length2);
          }
          var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike2(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys2(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length2 = funcs.length, index = length2, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT2);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length2;
          while (++index < length2) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray2(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length2 ? funcs[index2].apply(this, args) : value;
            while (++index2 < length2) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length2 = arguments.length, args = Array2(length2), index = length2;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length2 -= holdersCount;
          if (isCurried && length2 < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length2);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length2 = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length2 > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length2) {
            args.length = ary2;
          }
          if (this && this !== root2 && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object2, iteratee2) {
          return baseInverter(object2, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result2 = value;
          }
          if (other !== undefined$1) {
            if (result2 === undefined$1) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString2(value);
              other = baseToString2(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length2, chars2) {
        chars2 = chars2 === undefined$1 ? " " : baseToString2(chars2);
        var charsLength = chars2.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars2, length2) : chars2;
        }
        var result2 = baseRepeat(chars2, nativeCeil(length2 / stringSize(chars2)));
        return hasUnicode2(chars2) ? castSlice2(stringToArray2(result2), 0, length2).join("") : result2.slice(0, length2);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number2, precision) {
          number2 = toNumber(number2);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number2)) {
            var pair = (toString2(number2) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString2(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number2);
        };
      }
      var createSet = !(Set2 && 1 / setToArray2(new Set2([, -0]))[1] == INFINITY2) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object2) {
          var tag = getTag2(object2);
          if (tag == mapTag2) {
            return mapToArray2(object2);
          }
          if (tag == setTag2) {
            return setToPairs(object2);
          }
          return baseToPairs(object2, keysFunc(object2));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        var length2 = partials ? partials.length : 0;
        if (!length2) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length2 -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length2, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object2) {
        if (objValue === undefined$1 || eq2(objValue, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object2, source, stack) {
        if (isObject2(objValue) && isObject2(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject2(value) ? undefined$1 : value;
      }
      function equalArrays2(array2, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, arrLength = array2.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array2);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array2;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG2 ? new SetCache2() : undefined$1;
        stack.set(array2, other);
        stack.set(other, array2);
        while (++index < arrLength) {
          var arrValue = array2[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome2(other, function(othValue2, othIndex) {
              if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array2);
        stack["delete"](other);
        return result2;
      }
      function equalByTag2(object2, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag2:
            if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
              return false;
            }
            object2 = object2.buffer;
            other = other.buffer;
          case arrayBufferTag2:
            if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object2), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag2:
          case dateTag2:
          case numberTag2:
            return eq2(+object2, +other);
          case errorTag2:
            return object2.name == other.name && object2.message == other.message;
          case regexpTag2:
          case stringTag2:
            return object2 == other + "";
          case mapTag2:
            var convert = mapToArray2;
          case setTag2:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
            convert || (convert = setToArray2);
            if (object2.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object2);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG2;
            stack.set(object2, other);
            var result2 = equalArrays2(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object2);
            return result2;
          case symbolTag2:
            if (symbolValueOf2) {
              return symbolValueOf2.call(object2) == symbolValueOf2.call(other);
            }
        }
        return false;
      }
      function equalObjects2(object2, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, objProps = getAllKeys2(object2), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object2);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object2;
        }
        var result2 = true;
        stack.set(object2, other);
        stack.set(other, object2);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object2[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
          }
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object2.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object2);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + "");
      }
      function getAllKeys2(object2) {
        return baseGetAllKeys2(object2, keys2, getSymbols2);
      }
      function getAllKeysIn(object2) {
        return baseGetAllKeys2(object2, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array2 = realNames[result2], length2 = hasOwnProperty2.call(realNames, result2) ? array2.length : 0;
        while (length2--) {
          var data = array2[length2], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object2 = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
        return object2.placeholder;
      }
      function getIteratee() {
        var result2 = lodash2.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee2 : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData2(map3, key) {
        var data = map3.__data__;
        return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData2(object2) {
        var result2 = keys2(object2), length2 = result2.length;
        while (length2--) {
          var key = result2[length2], value = object2[key];
          result2[length2] = [key, value, isStrictComparable2(value)];
        }
        return result2;
      }
      function getNative2(object2, key) {
        var value = getValue2(object2, key);
        return baseIsNative2(value) ? value : undefined$1;
      }
      function getRawTag2(value) {
        var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
        try {
          value[symToStringTag2] = undefined$1;
          var unmasked = true;
        } catch (e2) {
        }
        var result2 = nativeObjectToString2.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag2] = tag;
          } else {
            delete value[symToStringTag2];
          }
        }
        return result2;
      }
      var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object2) {
        if (object2 == null) {
          return [];
        }
        object2 = Object2(object2);
        return arrayFilter2(nativeGetSymbols2(object2), function(symbol) {
          return propertyIsEnumerable2.call(object2, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols2 ? stubArray2 : function(object2) {
        var result2 = [];
        while (object2) {
          arrayPush2(result2, getSymbols2(object2));
          object2 = getPrototype(object2);
        }
        return result2;
      };
      var getTag2 = baseGetTag2;
      if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
        getTag2 = function(value) {
          var result2 = baseGetTag2(value), Ctor = result2 == objectTag2 ? value.constructor : undefined$1, ctorString = Ctor ? toSource2(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString2:
                return dataViewTag2;
              case mapCtorString2:
                return mapTag2;
              case promiseCtorString2:
                return promiseTag2;
              case setCtorString2:
                return setTag2;
              case weakMapCtorString2:
                return weakMapTag2;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length2 = transforms.length;
        while (++index < length2) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source) {
        var match2 = source.match(reWrapDetails);
        return match2 ? match2[1].split(reSplitDetails) : [];
      }
      function hasPath2(object2, path, hasFunc) {
        path = castPath2(path, object2);
        var index = -1, length2 = path.length, result2 = false;
        while (++index < length2) {
          var key = toKey2(path[index]);
          if (!(result2 = object2 != null && hasFunc(object2, key))) {
            break;
          }
          object2 = object2[key];
        }
        if (result2 || ++index != length2) {
          return result2;
        }
        length2 = object2 == null ? 0 : object2.length;
        return !!length2 && isLength2(length2) && isIndex2(key, length2) && (isArray2(object2) || isArguments2(object2));
      }
      function initCloneArray(array2) {
        var length2 = array2.length, result2 = new array2.constructor(length2);
        if (length2 && typeof array2[0] == "string" && hasOwnProperty2.call(array2, "index")) {
          result2.index = array2.index;
          result2.input = array2.input;
        }
        return result2;
      }
      function initCloneObject(object2) {
        return typeof object2.constructor == "function" && !isPrototype2(object2) ? baseCreate(getPrototype(object2)) : {};
      }
      function initCloneByTag(object2, tag, isDeep) {
        var Ctor = object2.constructor;
        switch (tag) {
          case arrayBufferTag2:
            return cloneArrayBuffer(object2);
          case boolTag2:
          case dateTag2:
            return new Ctor(+object2);
          case dataViewTag2:
            return cloneDataView(object2, isDeep);
          case float32Tag2:
          case float64Tag2:
          case int8Tag2:
          case int16Tag2:
          case int32Tag2:
          case uint8Tag2:
          case uint8ClampedTag2:
          case uint16Tag2:
          case uint32Tag2:
            return cloneTypedArray(object2, isDeep);
          case mapTag2:
            return new Ctor();
          case numberTag2:
          case stringTag2:
            return new Ctor(object2);
          case regexpTag2:
            return cloneRegExp(object2);
          case setTag2:
            return new Ctor();
          case symbolTag2:
            return cloneSymbol(object2);
        }
      }
      function insertWrapDetails(source, details) {
        var length2 = details.length;
        if (!length2) {
          return source;
        }
        var lastIndex = length2 - 1;
        details[lastIndex] = (length2 > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length2 > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray2(value) || isArguments2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex2(value, length2) {
        var type = typeof value;
        length2 = length2 == null ? MAX_SAFE_INTEGER2 : length2;
        return !!length2 && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
      }
      function isIterateeCall(value, index, object2) {
        if (!isObject2(object2)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike2(object2) && isIndex2(index, object2.length) : type == "string" && index in object2) {
          return eq2(object2[index], value);
        }
        return false;
      }
      function isKey2(value, object2) {
        if (isArray2(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
          return true;
        }
        return reIsPlainProp2.test(value) || !reIsDeepProp2.test(value) || object2 != null && value in Object2(object2);
      }
      function isKeyable2(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked2(func) {
        return !!maskSrcKey2 && maskSrcKey2 in func;
      }
      var isMaskable = coreJsData2 ? isFunction2 : stubFalse2;
      function isPrototype2(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
        return value === proto;
      }
      function isStrictComparable2(value) {
        return value === value && !isObject2(value);
      }
      function matchesStrictComparable2(key, srcValue) {
        return function(object2) {
          if (object2 == null) {
            return false;
          }
          return object2[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object2));
        };
      }
      function memoizeCapped2(func) {
        var result2 = memoize2(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE2) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object2) {
        var result2 = [];
        if (object2 != null) {
          for (var key in Object2(object2)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString2(value) {
        return nativeObjectToString2.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length2 = nativeMax(args.length - start, 0), array2 = Array2(length2);
          while (++index < length2) {
            array2[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array2);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object2, path) {
        return path.length < 2 ? object2 : baseGet2(object2, baseSlice2(path, 0, -1));
      }
      function reorder(array2, indexes) {
        var arrLength = array2.length, length2 = nativeMin(indexes.length, arrLength), oldArray = copyArray(array2);
        while (length2--) {
          var index = indexes[length2];
          array2[length2] = isIndex2(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array2;
      }
      function safeGet(object2, key) {
        if (key === "constructor" && typeof object2[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object2[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root2.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array2, size2) {
        var index = -1, length2 = array2.length, lastIndex = length2 - 1;
        size2 = size2 === undefined$1 ? length2 : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array2[rand];
          array2[rand] = array2[index];
          array2[index] = value;
        }
        array2.length = size2;
        return array2;
      }
      var stringToPath2 = memoizeCapped2(function(string2) {
        var result2 = [];
        if (string2.charCodeAt(0) === 46) {
          result2.push("");
        }
        string2.replace(rePropName2, function(match2, number2, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar2, "$1") : number2 || match2);
        });
        return result2;
      });
      function toKey2(value) {
        if (typeof value == "string" || isSymbol2(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
      }
      function toSource2(func) {
        if (func != null) {
          try {
            return funcToString2.call(func);
          } catch (e2) {
          }
          try {
            return func + "";
          } catch (e2) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array2, size2, guard) {
        if (guard ? isIterateeCall(array2, size2, guard) : size2 === undefined$1) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2 || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length2 / size2));
        while (index < length2) {
          result2[resIndex++] = baseSlice2(array2, index, index += size2);
        }
        return result2;
      }
      function compact(array2) {
        var index = -1, length2 = array2 == null ? 0 : array2.length, resIndex = 0, result2 = [];
        while (++index < length2) {
          var value = array2[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length2 = arguments.length;
        if (!length2) {
          return [];
        }
        var args = Array2(length2 - 1), array2 = arguments[0], index = length2;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush2(isArray2(array2) ? copyArray(array2) : [array2], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array2, values2) {
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array2, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array2, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice2(array2, n2 < 0 ? 0 : n2, length2);
      }
      function dropRight(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length2 - n2;
        return baseSlice2(array2, 0, n2 < 0 ? 0 : n2);
      }
      function dropRightWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true) : [];
      }
      function fill(array2, value, start, end) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array2, value, start)) {
          start = 0;
          end = length2;
        }
        return baseFill(array2, value, start, end);
      }
      function findIndex2(array2, predicate, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length2 + index, 0);
        }
        return baseFindIndex(array2, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array2, predicate, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = length2 - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
        }
        return baseFindIndex(array2, getIteratee(predicate, 3), index, true);
      }
      function flatten(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseFlatten(array2, 1) : [];
      }
      function flattenDeep(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseFlatten(array2, INFINITY2) : [];
      }
      function flattenDepth(array2, depth) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array2, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length2 = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length2) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array2) {
        return array2 && array2.length ? array2[0] : undefined$1;
      }
      function indexOf(array2, value, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length2 + index, 0);
        }
        return baseIndexOf(array2, value, index);
      }
      function initial(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseSlice2(array2, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap2(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array2, separator) {
        return array2 == null ? "" : nativeJoin.call(array2, separator);
      }
      function last(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? array2[length2 - 1] : undefined$1;
      }
      function lastIndexOf(array2, value, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = length2;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
        }
        return value === value ? strictLastIndexOf(array2, value, index) : baseFindIndex(array2, baseIsNaN, index, true);
      }
      function nth(array2, n2) {
        return array2 && array2.length ? baseNth(array2, toInteger(n2)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array2, values2) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2) : array2;
      }
      function pullAllBy(array2, values2, iteratee2) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, getIteratee(iteratee2, 2)) : array2;
      }
      function pullAllWith(array2, values2, comparator) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, undefined$1, comparator) : array2;
      }
      var pullAt = flatRest(function(array2, indexes) {
        var length2 = array2 == null ? 0 : array2.length, result2 = baseAt(array2, indexes);
        basePullAt(array2, arrayMap2(indexes, function(index) {
          return isIndex2(index, length2) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array2, predicate) {
        var result2 = [];
        if (!(array2 && array2.length)) {
          return result2;
        }
        var index = -1, indexes = [], length2 = array2.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length2) {
          var value = array2[index];
          if (predicate(value, index, array2)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array2, indexes);
        return result2;
      }
      function reverse(array2) {
        return array2 == null ? array2 : nativeReverse.call(array2);
      }
      function slice(array2, start, end) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array2, start, end)) {
          start = 0;
          end = length2;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length2 : toInteger(end);
        }
        return baseSlice2(array2, start, end);
      }
      function sortedIndex(array2, value) {
        return baseSortedIndex(array2, value);
      }
      function sortedIndexBy(array2, value, iteratee2) {
        return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array2, value) {
        var length2 = array2 == null ? 0 : array2.length;
        if (length2) {
          var index = baseSortedIndex(array2, value);
          if (index < length2 && eq2(array2[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array2, value) {
        return baseSortedIndex(array2, value, true);
      }
      function sortedLastIndexBy(array2, value, iteratee2) {
        return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array2, value) {
        var length2 = array2 == null ? 0 : array2.length;
        if (length2) {
          var index = baseSortedIndex(array2, value, true) - 1;
          if (eq2(array2[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array2) {
        return array2 && array2.length ? baseSortedUniq(array2) : [];
      }
      function sortedUniqBy(array2, iteratee2) {
        return array2 && array2.length ? baseSortedUniq(array2, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseSlice2(array2, 1, length2) : [];
      }
      function take(array2, n2, guard) {
        if (!(array2 && array2.length)) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice2(array2, 0, n2 < 0 ? 0 : n2);
      }
      function takeRight(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length2 - n2;
        return baseSlice2(array2, n2 < 0 ? 0 : n2, length2);
      }
      function takeRightWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array2) {
        return array2 && array2.length ? baseUniq(array2) : [];
      }
      function uniqBy(array2, iteratee2) {
        return array2 && array2.length ? baseUniq(array2, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array2, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return array2 && array2.length ? baseUniq(array2, undefined$1, comparator) : [];
      }
      function unzip(array2) {
        if (!(array2 && array2.length)) {
          return [];
        }
        var length2 = 0;
        array2 = arrayFilter2(array2, function(group) {
          if (isArrayLikeObject(group)) {
            length2 = nativeMax(group.length, length2);
            return true;
          }
        });
        return baseTimes2(length2, function(index) {
          return arrayMap2(array2, baseProperty2(index));
        });
      }
      function unzipWith(array2, iteratee2) {
        if (!(array2 && array2.length)) {
          return [];
        }
        var result2 = unzip(array2);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap2(result2, function(group) {
          return apply(iteratee2, undefined$1, group);
        });
      }
      var without = baseRest(function(array2, values2) {
        return isArrayLikeObject(array2) ? baseDifference(array2, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter2(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseXor(arrayFilter2(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseXor(arrayFilter2(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length2 = arrays.length, iteratee2 = length2 > 1 ? arrays[length2 - 1] : undefined$1;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash2(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length2 = paths.length, start = length2 ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object2) {
          return baseAt(object2, paths);
        };
        if (length2 > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex2(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length2 ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array2) {
          if (length2 && !array2.length) {
            array2.push(undefined$1);
          }
          return array2;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray2(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone3 = wrapperClone(parent2);
          clone3.__index__ = 0;
          clone3.__values__ = undefined$1;
          if (result2) {
            previous.__wrapped__ = clone3;
          } else {
            result2 = clone3;
          }
          var previous = clone3;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty2.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue2(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray2(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter2 : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex2);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), INFINITY2);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map2(collection, iteratee2), depth);
      }
      function forEach2(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty2.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue2(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike2(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length2 = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length2 + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length2 && collection.indexOf(value, fromIndex) > -1 : !!length2 && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue2(result2, key, value);
      });
      function map2(collection, iteratee2) {
        var func = isArray2(collection) ? arrayMap2 : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray2(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray2(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduce2 : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter2 : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray2(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n2, guard) {
        if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n2);
      }
      function shuffle(collection) {
        var func = isArray2(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike2(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag2(collection);
        if (tag == mapTag2 || tag == setTag2) {
          return collection.size;
        }
        return baseKeys2(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray2(collection) ? arraySome2 : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length2 = iteratees.length;
        if (length2 > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length2 > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root2.Date.now();
      };
      function after(n2, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n2, guard) {
        n2 = guard ? undefined$1 : n2;
        n2 = func && n2 == null ? func.length : n2;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n2);
      }
      function before(n2, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n2 <= 1) {
            func = undefined$1;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object2, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object2, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize2(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache2.set(key, result2) || cache2;
          return result2;
        };
        memoized.cache = new (memoize2.Cache || MapCache2)();
        return memoized;
      }
      memoize2.Cache = MapCache2;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once2(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap2(transforms[0], baseUnary2(getIteratee())) : arrayMap2(baseFlatten(transforms, 1), baseUnary2(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length2 = nativeMin(args.length, funcsLength);
          while (++index < length2) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array2 = args[start], otherArgs = castSlice2(args, 0, start);
          if (array2) {
            arrayPush2(otherArgs, array2);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        if (isObject2(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray2(value) ? value : [value];
      }
      function clone2(value) {
        return baseClone2(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone2(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone2(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone2(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object2, source) {
        return source == null || baseConformsTo(object2, source, keys2(source));
      }
      function eq2(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments2 = baseIsArguments2(function() {
        return arguments;
      }()) ? baseIsArguments2 : function(value) {
        return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
      };
      var isArray2 = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary2(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike2(value) {
        return value != null && isLength2(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike2(value) && isArrayLike2(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike2(value) && baseGetTag2(value) == boolTag2;
      }
      var isBuffer2 = nativeIsBuffer || stubFalse2;
      var isDate2 = nodeIsDate ? baseUnary2(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike2(value) && value.nodeType === 1 && !isPlainObject2(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike2(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments2(value))) {
          return !value.length;
        }
        var tag = getTag2(value);
        if (tag == mapTag2 || tag == setTag2) {
          return !value.size;
        }
        if (isPrototype2(value)) {
          return !baseKeys2(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty2.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual2(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        var result2 = customizer ? customizer(value, other) : undefined$1;
        return result2 === undefined$1 ? baseIsEqual2(value, other, undefined$1, customizer) : !!result2;
      }
      function isError2(value) {
        if (!isObjectLike2(value)) {
          return false;
        }
        var tag = baseGetTag2(value);
        return tag == errorTag2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction2(value) {
        if (!isObject2(value)) {
          return false;
        }
        var tag = baseGetTag2(value);
        return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength2(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
      }
      function isObject2(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike2(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary2(nodeIsMap) : baseIsMap;
      function isMatch(object2, source) {
        return object2 === source || baseIsMatch2(object2, source, getMatchData2(source));
      }
      function isMatchWith(object2, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseIsMatch2(object2, source, getMatchData2(source), customizer);
      }
      function isNaN2(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative2(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike2(value) && baseGetTag2(value) == numberTag2;
      }
      function isPlainObject2(value) {
        if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary2(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER2 && value <= MAX_SAFE_INTEGER2;
      }
      var isSet = nodeIsSet ? baseUnary2(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag2;
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
      }
      var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
      function isUndefined(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike2(value) && getTag2(value) == weakMapTag2;
      }
      function isWeakSet(value) {
        return isObjectLike2(value) && baseGetTag2(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray2(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike2(value)) {
          return isString(value) ? stringToArray2(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag2(value), func = tag == mapTag2 ? mapToArray2 : tag == setTag2 ? setToArray2 : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY2 || value === -INFINITY2) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary2 = reIsBinary.test(value);
        return isBinary2 || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2) : value === 0 ? value : 0;
      }
      function toString2(value) {
        return value == null ? "" : baseToString2(value);
      }
      var assign2 = createAssigner(function(object2, source) {
        if (isPrototype2(source) || isArrayLike2(source)) {
          copyObject(source, keys2(source), object2);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty2.call(source, key)) {
            assignValue(object2, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object2, source) {
        copyObject(source, keysIn(source), object2);
      });
      var assignInWith = createAssigner(function(object2, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object2, customizer);
      });
      var assignWith = createAssigner(function(object2, source, srcIndex, customizer) {
        copyObject(source, keys2(source), object2, customizer);
      });
      var at = flatRest(baseAt);
      function create2(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object2, sources) {
        object2 = Object2(object2);
        var index = -1;
        var length2 = sources.length;
        var guard = length2 > 2 ? sources[2] : undefined$1;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length2 = 1;
        }
        while (++index < length2) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object2[key];
            if (value === undefined$1 || eq2(value, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
              object2[key] = source[key];
            }
          }
        }
        return object2;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object2, predicate) {
        return baseFindKey(object2, getIteratee(predicate, 3), baseForOwn2);
      }
      function findLastKey(object2, predicate) {
        return baseFindKey(object2, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object2, iteratee2) {
        return object2 == null ? object2 : baseFor2(object2, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object2, iteratee2) {
        return object2 == null ? object2 : baseForRight(object2, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object2, iteratee2) {
        return object2 && baseForOwn2(object2, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object2, iteratee2) {
        return object2 && baseForOwnRight(object2, getIteratee(iteratee2, 3));
      }
      function functions(object2) {
        return object2 == null ? [] : baseFunctions(object2, keys2(object2));
      }
      function functionsIn(object2) {
        return object2 == null ? [] : baseFunctions(object2, keysIn(object2));
      }
      function get2(object2, path, defaultValue) {
        var result2 = object2 == null ? undefined$1 : baseGet2(object2, path);
        return result2 === undefined$1 ? defaultValue : result2;
      }
      function has2(object2, path) {
        return object2 != null && hasPath2(object2, path, baseHas2);
      }
      function hasIn2(object2, path) {
        return object2 != null && hasPath2(object2, path, baseHasIn2);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString2.call(value);
        }
        result2[value] = key;
      }, constant(identity2));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString2.call(value);
        }
        if (hasOwnProperty2.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys2(object2) {
        return isArrayLike2(object2) ? arrayLikeKeys2(object2) : baseKeys2(object2);
      }
      function keysIn(object2) {
        return isArrayLike2(object2) ? arrayLikeKeys2(object2, true) : baseKeysIn(object2);
      }
      function mapKeys2(object2, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn2(object2, function(value, key, object3) {
          baseAssignValue2(result2, iteratee2(value, key, object3), value);
        });
        return result2;
      }
      function mapValues2(object2, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn2(object2, function(value, key, object3) {
          baseAssignValue2(result2, key, iteratee2(value, key, object3));
        });
        return result2;
      }
      var merge = createAssigner(function(object2, source, srcIndex) {
        baseMerge(object2, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object2, source, srcIndex, customizer) {
        baseMerge(object2, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object2, paths) {
        var result2 = {};
        if (object2 == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap2(paths, function(path) {
          path = castPath2(path, object2);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object2, getAllKeysIn(object2), result2);
        if (isDeep) {
          result2 = baseClone2(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length2 = paths.length;
        while (length2--) {
          baseUnset(result2, paths[length2]);
        }
        return result2;
      });
      function omitBy(object2, predicate) {
        return pickBy(object2, negate(getIteratee(predicate)));
      }
      var pick2 = flatRest(function(object2, paths) {
        return object2 == null ? {} : basePick(object2, paths);
      });
      function pickBy(object2, predicate) {
        if (object2 == null) {
          return {};
        }
        var props = arrayMap2(getAllKeysIn(object2), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object2, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object2, path, defaultValue) {
        path = castPath2(path, object2);
        var index = -1, length2 = path.length;
        if (!length2) {
          length2 = 1;
          object2 = undefined$1;
        }
        while (++index < length2) {
          var value = object2 == null ? undefined$1 : object2[toKey2(path[index])];
          if (value === undefined$1) {
            index = length2;
            value = defaultValue;
          }
          object2 = isFunction2(value) ? value.call(object2) : value;
        }
        return object2;
      }
      function set2(object2, path, value) {
        return object2 == null ? object2 : baseSet(object2, path, value);
      }
      function setWith(object2, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object2 == null ? object2 : baseSet(object2, path, value, customizer);
      }
      var toPairs = createToPairs(keys2);
      var toPairsIn = createToPairs(keysIn);
      function transform(object2, iteratee2, accumulator) {
        var isArr = isArray2(object2), isArrLike = isArr || isBuffer2(object2) || isTypedArray2(object2);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object2 && object2.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject2(object2)) {
            accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object2)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn2)(object2, function(value, index, object3) {
          return iteratee2(accumulator, value, index, object3);
        });
        return accumulator;
      }
      function unset(object2, path) {
        return object2 == null ? true : baseUnset(object2, path);
      }
      function update(object2, path, updater) {
        return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater));
      }
      function updateWith(object2, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater), customizer);
      }
      function values(object2) {
        return object2 == null ? [] : baseValues(object2, keys2(object2));
      }
      function valuesIn(object2) {
        return object2 == null ? [] : baseValues(object2, keysIn(object2));
      }
      function clamp2(number2, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number2), lower, upper);
      }
      function inRange(number2, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number2 = toNumber(number2);
        return baseInRange(number2, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase2 = createCompounder2(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize2(word) : word);
      });
      function capitalize2(string2) {
        return upperFirst2(toString2(string2).toLowerCase());
      }
      function deburr2(string2) {
        string2 = toString2(string2);
        return string2 && string2.replace(reLatin2, deburrLetter2).replace(reComboMark2, "");
      }
      function endsWith(string2, target, position) {
        string2 = toString2(string2);
        target = baseToString2(target);
        var length2 = string2.length;
        position = position === undefined$1 ? length2 : baseClamp(toInteger(position), 0, length2);
        var end = position;
        position -= target.length;
        return position >= 0 && string2.slice(position, end) == target;
      }
      function escape(string2) {
        string2 = toString2(string2);
        return string2 && reHasUnescapedHtml.test(string2) ? string2.replace(reUnescapedHtml, escapeHtmlChar) : string2;
      }
      function escapeRegExp(string2) {
        string2 = toString2(string2);
        return string2 && reHasRegExpChar.test(string2) ? string2.replace(reRegExpChar2, "\\$&") : string2;
      }
      var kebabCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst2("toLowerCase");
      function pad(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        if (!length2 || strLength >= length2) {
          return string2;
        }
        var mid = (length2 - strLength) / 2;
        return createPadding(nativeFloor(mid), chars2) + string2 + createPadding(nativeCeil(mid), chars2);
      }
      function padEnd(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        return length2 && strLength < length2 ? string2 + createPadding(length2 - strLength, chars2) : string2;
      }
      function padStart(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        return length2 && strLength < length2 ? createPadding(length2 - strLength, chars2) + string2 : string2;
      }
      function parseInt2(string2, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString2(string2).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string2, n2, guard) {
        if (guard ? isIterateeCall(string2, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        return baseRepeat(toString2(string2), n2);
      }
      function replace() {
        var args = arguments, string2 = toString2(args[0]);
        return args.length < 3 ? string2 : string2.replace(args[1], args[2]);
      }
      var snakeCase2 = createCompounder2(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split2(string2, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string2, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string2 = toString2(string2);
        if (string2 && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString2(separator);
          if (!separator && hasUnicode2(string2)) {
            return castSlice2(stringToArray2(string2), 0, limit);
          }
        }
        return string2.split(separator, limit);
      }
      var startCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst2(word);
      });
      function startsWith(string2, target, position) {
        string2 = toString2(string2);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string2.length);
        target = baseToString2(target);
        return string2.slice(position, position + target.length) == target;
      }
      function template(string2, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string2, options, guard)) {
          options = undefined$1;
        }
        string2 = toString2(string2);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys2(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string2.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string2.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match2.length;
          return match2;
        });
        source += "';\n";
        var variable = hasOwnProperty2.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
        });
        result2.source = source;
        if (isError2(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString2(value).toLowerCase();
      }
      function toUpper(value) {
        return toString2(value).toUpperCase();
      }
      function trim2(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return baseTrim(string2);
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), chrSymbols = stringToArray2(chars2), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice2(strSymbols, start, end).join("");
      }
      function trimEnd(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return string2.slice(0, trimmedEndIndex(string2) + 1);
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), end = charsEndIndex(strSymbols, stringToArray2(chars2)) + 1;
        return castSlice2(strSymbols, 0, end).join("");
      }
      function trimStart(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return string2.replace(reTrimStart, "");
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), start = charsStartIndex(strSymbols, stringToArray2(chars2));
        return castSlice2(strSymbols, start).join("");
      }
      function truncate(string2, options) {
        var length2 = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject2(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length2 = "length" in options ? toInteger(options.length) : length2;
          omission = "omission" in options ? baseToString2(options.omission) : omission;
        }
        string2 = toString2(string2);
        var strLength = string2.length;
        if (hasUnicode2(string2)) {
          var strSymbols = stringToArray2(string2);
          strLength = strSymbols.length;
        }
        if (length2 >= strLength) {
          return string2;
        }
        var end = length2 - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice2(strSymbols, 0, end).join("") : string2.slice(0, end);
        if (separator === undefined$1) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string2.slice(end).search(separator)) {
            var match2, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match2 = separator.exec(substring)) {
              var newEnd = match2.index;
            }
            result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string2.indexOf(baseToString2(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string2) {
        string2 = toString2(string2);
        return string2 && reHasEscapedHtml.test(string2) ? string2.replace(reEscapedHtml, unescapeHtmlChar) : string2;
      }
      var upperCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst2 = createCaseFirst2("toUpperCase");
      function words2(string2, pattern, guard) {
        string2 = toString2(string2);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord2(string2) ? unicodeWords2(string2) : asciiWords2(string2);
        }
        return string2.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e2) {
          return isError2(e2) ? e2 : new Error2(e2);
        }
      });
      var bindAll = flatRest(function(object2, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey2(key);
          baseAssignValue2(object2, key, bind(object2[key], object2));
        });
        return object2;
      });
      function cond(pairs) {
        var length2 = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length2 ? [] : arrayMap2(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length2) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone2(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity2(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee2(typeof func == "function" ? func : baseClone2(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches2(baseClone2(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty2(path, baseClone2(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object2) {
          return baseInvoke(object2, path, args);
        };
      });
      var methodOf = baseRest(function(object2, args) {
        return function(path) {
          return baseInvoke(object2, path, args);
        };
      });
      function mixin2(object2, source, options) {
        var props = keys2(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object2;
          object2 = this;
          methodNames = baseFunctions(source, keys2(source));
        }
        var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object2);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object2[methodName] = func;
          if (isFunc) {
            object2.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object2(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object2 });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object2, arrayPush2([this.value()], arguments));
            };
          }
        });
        return object2;
      }
      function noConflict() {
        if (root2._ === this) {
          root2._ = oldDash;
        }
        return this;
      }
      function noop() {
      }
      function nthArg(n2) {
        n2 = toInteger(n2);
        return baseRest(function(args) {
          return baseNth(args, n2);
        });
      }
      var over = createOver(arrayMap2);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome2);
      function property2(path) {
        return isKey2(path) ? baseProperty2(toKey2(path)) : basePropertyDeep2(path);
      }
      function propertyOf(object2) {
        return function(path) {
          return object2 == null ? undefined$1 : baseGet2(object2, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray2() {
        return [];
      }
      function stubFalse2() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n2, iteratee2) {
        n2 = toInteger(n2);
        if (n2 < 1 || n2 > MAX_SAFE_INTEGER2) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length2 = nativeMin(n2, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n2 -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes2(length2, iteratee2);
        while (++index < n2) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray2(value)) {
          return arrayMap2(value, toKey2);
        }
        return isSymbol2(value) ? [value] : copyArray(stringToPath2(toString2(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter2;
        return toString2(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array2) {
        return array2 && array2.length ? baseExtremum(array2, identity2, baseGt) : undefined$1;
      }
      function maxBy(array2, iteratee2) {
        return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseGt) : undefined$1;
      }
      function mean(array2) {
        return baseMean(array2, identity2);
      }
      function meanBy(array2, iteratee2) {
        return baseMean(array2, getIteratee(iteratee2, 2));
      }
      function min(array2) {
        return array2 && array2.length ? baseExtremum(array2, identity2, baseLt) : undefined$1;
      }
      function minBy(array2, iteratee2) {
        return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array2) {
        return array2 && array2.length ? baseSum(array2, identity2) : 0;
      }
      function sumBy(array2, iteratee2) {
        return array2 && array2.length ? baseSum(array2, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign2;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at;
      lodash2.before = before;
      lodash2.bind = bind;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create2;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys2;
      lodash2.keysIn = keysIn;
      lodash2.map = map2;
      lodash2.mapKeys = mapKeys2;
      lodash2.mapValues = mapValues2;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize2;
      lodash2.merge = merge;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin2;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once2;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick2;
      lodash2.pickBy = pickBy;
      lodash2.property = property2;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set2;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split2;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray2;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words2;
      lodash2.wrap = wrap;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin2(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase2;
      lodash2.capitalize = capitalize2;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp2;
      lodash2.clone = clone2;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr2;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq2;
      lodash2.escape = escape;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex2;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor;
      lodash2.forEach = forEach2;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get2;
      lodash2.gt = gt;
      lodash2.gte = gte;
      lodash2.has = has2;
      lodash2.hasIn = hasIn2;
      lodash2.head = head;
      lodash2.identity = identity2;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments2;
      lodash2.isArray = isArray2;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike2;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean;
      lodash2.isBuffer = isBuffer2;
      lodash2.isDate = isDate2;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError2;
      lodash2.isFinite = isFinite;
      lodash2.isFunction = isFunction2;
      lodash2.isInteger = isInteger;
      lodash2.isLength = isLength2;
      lodash2.isMap = isMap;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN2;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull;
      lodash2.isNumber = isNumber;
      lodash2.isObject = isObject2;
      lodash2.isObjectLike = isObjectLike2;
      lodash2.isPlainObject = isPlainObject2;
      lodash2.isRegExp = isRegExp;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet;
      lodash2.isString = isString;
      lodash2.isSymbol = isSymbol2;
      lodash2.isTypedArray = isTypedArray2;
      lodash2.isUndefined = isUndefined;
      lodash2.isWeakMap = isWeakMap;
      lodash2.isWeakSet = isWeakSet;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt;
      lodash2.lte = lte;
      lodash2.max = max;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray2;
      lodash2.stubFalse = stubFalse2;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat;
      lodash2.replace = replace;
      lodash2.result = result;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase2;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString2;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim2;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst2;
      lodash2.each = forEach2;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin2(lodash2, function() {
        var source = {};
        baseForOwn2(lodash2, function(func, methodName) {
          if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n2) {
          n2 = n2 === undefined$1 ? 1 : nativeMax(toInteger(n2), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
          } else {
            result2.__views__.push({
              "size": nativeMin(n2, MAX_ARRAY_LENGTH),
              "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n2) {
          return this.reverse()[methodName](n2).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity2);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash2, arrayPush2([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto2[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray2(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray2(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty2.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _2 = runInContext();
    if (freeModule) {
      (freeModule.exports = _2)._ = _2;
      freeExports._ = _2;
    } else {
      root2._ = _2;
    }
  }).call(commonjsGlobal$1);
})(lodash$2, lodash$2.exports);
var lodash$1 = lodash$2.exports;
var map$1;
try {
  map$1 = Map;
} catch (_2) {
}
var set;
try {
  set = Set;
} catch (_2) {
}
function baseClone(src, circulars, clones) {
  if (!src || typeof src !== "object" || typeof src === "function") {
    return src;
  }
  if (src.nodeType && "cloneNode" in src) {
    return src.cloneNode(true);
  }
  if (src instanceof Date) {
    return new Date(src.getTime());
  }
  if (src instanceof RegExp) {
    return new RegExp(src);
  }
  if (Array.isArray(src)) {
    return src.map(clone$1);
  }
  if (map$1 && src instanceof map$1) {
    return new Map(Array.from(src.entries()));
  }
  if (set && src instanceof set) {
    return new Set(Array.from(src.values()));
  }
  if (src instanceof Object) {
    circulars.push(src);
    var obj = Object.create(src);
    clones.push(obj);
    for (var key in src) {
      var idx = circulars.findIndex(function(i2) {
        return i2 === src[key];
      });
      obj[key] = idx > -1 ? clones[idx] : baseClone(src[key], circulars, clones);
    }
    return obj;
  }
  return src;
}
function clone$1(src) {
  return baseClone(src, [], []);
}
const toString$7 = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString$1 = typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val)
    return "NaN";
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? "-0" : "" + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false)
    return "" + val;
  const typeOf = typeof val;
  if (typeOf === "number")
    return printNumber(val);
  if (typeOf === "string")
    return quoteStrings ? `"${val}"` : val;
  if (typeOf === "function")
    return "[Function " + (val.name || "anonymous") + "]";
  if (typeOf === "symbol")
    return symbolToString$1.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  const tag = toString$7.call(val).slice(8, -1);
  if (tag === "Date")
    return isNaN(val.getTime()) ? "" + val : val.toISOString(val);
  if (tag === "Error" || val instanceof Error)
    return "[" + errorToString.call(val) + "]";
  if (tag === "RegExp")
    return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null)
    return result;
  return JSON.stringify(value, function(key, value2) {
    let result2 = printSimpleValue(this[key], quoteStrings);
    if (result2 !== null)
      return result2;
    return value2;
  }, 2);
}
let mixed = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path,
    type,
    value,
    originalValue
  }) => {
    let isCast = originalValue != null && originalValue !== value;
    let msg = `${path} must be a \`${type}\` type, but the final value was: \`${printValue(value, true)}\`` + (isCast ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : ".");
    if (value === null) {
      msg += `
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }
    return msg;
  },
  defined: "${path} must be defined"
};
let string = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
};
let number = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
};
let date = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
};
let boolean = {
  isValue: "${path} field must be ${value}"
};
let object = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
};
let array = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must have ${length} items"
};
Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});
var objectProto$h = Object.prototype;
var hasOwnProperty$h = objectProto$h.hasOwnProperty;
function baseHas$1(object2, key) {
  return object2 != null && hasOwnProperty$h.call(object2, key);
}
var _baseHas = baseHas$1;
var isArray$8 = Array.isArray;
var isArray_1 = isArray$8;
var freeGlobal$3 = typeof commonjsGlobal$1 == "object" && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;
var _freeGlobal = freeGlobal$3;
var freeGlobal$2 = _freeGlobal;
var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
var root$a = freeGlobal$2 || freeSelf$1 || Function("return this")();
var _root = root$a;
var root$9 = _root;
var Symbol$7 = root$9.Symbol;
var _Symbol = Symbol$7;
var Symbol$6 = _Symbol;
var objectProto$g = Object.prototype;
var hasOwnProperty$g = objectProto$g.hasOwnProperty;
var nativeObjectToString$3 = objectProto$g.toString;
var symToStringTag$3 = Symbol$6 ? Symbol$6.toStringTag : void 0;
function getRawTag$2(value) {
  var isOwn = hasOwnProperty$g.call(value, symToStringTag$3), tag = value[symToStringTag$3];
  try {
    value[symToStringTag$3] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$3.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$3] = tag;
    } else {
      delete value[symToStringTag$3];
    }
  }
  return result;
}
var _getRawTag = getRawTag$2;
var objectProto$f = Object.prototype;
var nativeObjectToString$2 = objectProto$f.toString;
function objectToString$2(value) {
  return nativeObjectToString$2.call(value);
}
var _objectToString = objectToString$2;
var Symbol$5 = _Symbol, getRawTag$1 = _getRawTag, objectToString$1 = _objectToString;
var nullTag$1 = "[object Null]", undefinedTag$1 = "[object Undefined]";
var symToStringTag$2 = Symbol$5 ? Symbol$5.toStringTag : void 0;
function baseGetTag$6(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag$1 : nullTag$1;
  }
  return symToStringTag$2 && symToStringTag$2 in Object(value) ? getRawTag$1(value) : objectToString$1(value);
}
var _baseGetTag = baseGetTag$6;
function isObjectLike$5(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$5;
var baseGetTag$5 = _baseGetTag, isObjectLike$4 = isObjectLike_1;
var symbolTag$1 = "[object Symbol]";
function isSymbol$3(value) {
  return typeof value == "symbol" || isObjectLike$4(value) && baseGetTag$5(value) == symbolTag$1;
}
var isSymbol_1 = isSymbol$3;
var isArray$7 = isArray_1, isSymbol$2 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$3(value, object2) {
  if (isArray$7(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object(object2);
}
var _isKey = isKey$3;
function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$5;
var baseGetTag$4 = _baseGetTag, isObject$4 = isObject_1;
var asyncTag$1 = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag$1 = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$4(value)) {
    return false;
  }
  var tag = baseGetTag$4(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag$1 || tag == proxyTag$1;
}
var isFunction_1 = isFunction$3;
var root$8 = _root;
var coreJsData$3 = root$8["__core-js_shared__"];
var _coreJsData = coreJsData$3;
var coreJsData$2 = _coreJsData;
var maskSrcKey$1 = function() {
  var uid = /[^.]+$/.exec(coreJsData$2 && coreJsData$2.keys && coreJsData$2.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$2(func) {
  return !!maskSrcKey$1 && maskSrcKey$1 in func;
}
var _isMasked = isMasked$2;
var funcProto$3 = Function.prototype;
var funcToString$3 = funcProto$3.toString;
function toSource$3(func) {
  if (func != null) {
    try {
      return funcToString$3.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var _toSource = toSource$3;
var isFunction$2 = isFunction_1, isMasked$1 = _isMasked, isObject$3 = isObject_1, toSource$2 = _toSource;
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;
var funcProto$2 = Function.prototype, objectProto$e = Object.prototype;
var funcToString$2 = funcProto$2.toString;
var hasOwnProperty$f = objectProto$e.hasOwnProperty;
var reIsNative$1 = RegExp("^" + funcToString$2.call(hasOwnProperty$f).replace(reRegExpChar$1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$2(value) {
  if (!isObject$3(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$2(value));
}
var _baseIsNative = baseIsNative$2;
function getValue$2(object2, key) {
  return object2 == null ? void 0 : object2[key];
}
var _getValue = getValue$2;
var baseIsNative$1 = _baseIsNative, getValue$1 = _getValue;
function getNative$8(object2, key) {
  var value = getValue$1(object2, key);
  return baseIsNative$1(value) ? value : void 0;
}
var _getNative = getNative$8;
var getNative$7 = _getNative;
var nativeCreate$6 = getNative$7(Object, "create");
var _nativeCreate = nativeCreate$6;
var nativeCreate$5 = _nativeCreate;
function hashClear$2() {
  this.__data__ = nativeCreate$5 ? nativeCreate$5(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$2;
function hashDelete$2(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$2;
var nativeCreate$4 = _nativeCreate;
var HASH_UNDEFINED$4 = "__lodash_hash_undefined__";
var objectProto$d = Object.prototype;
var hasOwnProperty$e = objectProto$d.hasOwnProperty;
function hashGet$2(key) {
  var data = this.__data__;
  if (nativeCreate$4) {
    var result = data[key];
    return result === HASH_UNDEFINED$4 ? void 0 : result;
  }
  return hasOwnProperty$e.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$2;
var nativeCreate$3 = _nativeCreate;
var objectProto$c = Object.prototype;
var hasOwnProperty$d = objectProto$c.hasOwnProperty;
function hashHas$2(key) {
  var data = this.__data__;
  return nativeCreate$3 ? data[key] !== void 0 : hasOwnProperty$d.call(data, key);
}
var _hashHas = hashHas$2;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$3 = "__lodash_hash_undefined__";
function hashSet$2(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$2 && value === void 0 ? HASH_UNDEFINED$3 : value;
  return this;
}
var _hashSet = hashSet$2;
var hashClear$1 = _hashClear, hashDelete$1 = _hashDelete, hashGet$1 = _hashGet, hashHas$1 = _hashHas, hashSet$1 = _hashSet;
function Hash$2(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$2.prototype.clear = hashClear$1;
Hash$2.prototype["delete"] = hashDelete$1;
Hash$2.prototype.get = hashGet$1;
Hash$2.prototype.has = hashHas$1;
Hash$2.prototype.set = hashSet$1;
var _Hash = Hash$2;
function listCacheClear$2() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$2;
function eq$3(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$3;
var eq$2 = eq_1;
function assocIndexOf$5(array2, key) {
  var length2 = array2.length;
  while (length2--) {
    if (eq$2(array2[length2][0], key)) {
      return length2;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$5;
var assocIndexOf$4 = _assocIndexOf;
var arrayProto$1 = Array.prototype;
var splice$1 = arrayProto$1.splice;
function listCacheDelete$2(key) {
  var data = this.__data__, index = assocIndexOf$4(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$2;
var assocIndexOf$3 = _assocIndexOf;
function listCacheGet$2(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$2;
var assocIndexOf$2 = _assocIndexOf;
function listCacheHas$2(key) {
  return assocIndexOf$2(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$2;
var assocIndexOf$1 = _assocIndexOf;
function listCacheSet$2(key, value) {
  var data = this.__data__, index = assocIndexOf$1(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$2;
var listCacheClear$1 = _listCacheClear, listCacheDelete$1 = _listCacheDelete, listCacheGet$1 = _listCacheGet, listCacheHas$1 = _listCacheHas, listCacheSet$1 = _listCacheSet;
function ListCache$5(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$5.prototype.clear = listCacheClear$1;
ListCache$5.prototype["delete"] = listCacheDelete$1;
ListCache$5.prototype.get = listCacheGet$1;
ListCache$5.prototype.has = listCacheHas$1;
ListCache$5.prototype.set = listCacheSet$1;
var _ListCache = ListCache$5;
var getNative$6 = _getNative, root$7 = _root;
var Map$5 = getNative$6(root$7, "Map");
var _Map = Map$5;
var Hash$1 = _Hash, ListCache$4 = _ListCache, Map$4 = _Map;
function mapCacheClear$2() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash$1(),
    "map": new (Map$4 || ListCache$4)(),
    "string": new Hash$1()
  };
}
var _mapCacheClear = mapCacheClear$2;
function isKeyable$2(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$2;
var isKeyable$1 = _isKeyable;
function getMapData$5(map2, key) {
  var data = map2.__data__;
  return isKeyable$1(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$5;
var getMapData$4 = _getMapData;
function mapCacheDelete$2(key) {
  var result = getMapData$4(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$2;
var getMapData$3 = _getMapData;
function mapCacheGet$2(key) {
  return getMapData$3(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$2;
var getMapData$2 = _getMapData;
function mapCacheHas$2(key) {
  return getMapData$2(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$2;
var getMapData$1 = _getMapData;
function mapCacheSet$2(key, value) {
  var data = getMapData$1(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$2;
var mapCacheClear$1 = _mapCacheClear, mapCacheDelete$1 = _mapCacheDelete, mapCacheGet$1 = _mapCacheGet, mapCacheHas$1 = _mapCacheHas, mapCacheSet$1 = _mapCacheSet;
function MapCache$4(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$4.prototype.clear = mapCacheClear$1;
MapCache$4.prototype["delete"] = mapCacheDelete$1;
MapCache$4.prototype.get = mapCacheGet$1;
MapCache$4.prototype.has = mapCacheHas$1;
MapCache$4.prototype.set = mapCacheSet$1;
var _MapCache = MapCache$4;
var MapCache$3 = _MapCache;
var FUNC_ERROR_TEXT$1 = "Expected a function";
function memoize$2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize$2.Cache || MapCache$3)();
  return memoized;
}
memoize$2.Cache = MapCache$3;
var memoize_1 = memoize$2;
var memoize$1 = memoize_1;
var MAX_MEMOIZE_SIZE$1 = 500;
function memoizeCapped$2(func) {
  var result = memoize$1(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE$1) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$2;
var memoizeCapped$1 = _memoizeCapped;
var rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar$1 = /\\(\\)?/g;
var stringToPath$1 = memoizeCapped$1(function(string2) {
  var result = [];
  if (string2.charCodeAt(0) === 46) {
    result.push("");
  }
  string2.replace(rePropName$1, function(match2, number2, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar$1, "$1") : number2 || match2);
  });
  return result;
});
var _stringToPath = stringToPath$1;
function arrayMap$1(array2, iteratee) {
  var index = -1, length2 = array2 == null ? 0 : array2.length, result = Array(length2);
  while (++index < length2) {
    result[index] = iteratee(array2[index], index, array2);
  }
  return result;
}
var _arrayMap = arrayMap$1;
var Symbol$4 = _Symbol, arrayMap = _arrayMap, isArray$6 = isArray_1, isSymbol$1 = isSymbol_1;
var INFINITY$1 = 1 / 0;
var symbolProto$2 = Symbol$4 ? Symbol$4.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$6(value)) {
    return arrayMap(value, baseToString$1) + "";
  }
  if (isSymbol$1(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$6(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$6;
var isArray$5 = isArray_1, isKey$2 = _isKey, stringToPath = _stringToPath, toString$5 = toString_1;
function castPath$2(value, object2) {
  if (isArray$5(value)) {
    return value;
  }
  return isKey$2(value, object2) ? [value] : stringToPath(toString$5(value));
}
var _castPath = castPath$2;
var baseGetTag$3 = _baseGetTag, isObjectLike$3 = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$3(value) && baseGetTag$3(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$2 = isObjectLike_1;
var objectProto$b = Object.prototype;
var hasOwnProperty$c = objectProto$b.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
var isArguments$2 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$2(value) && hasOwnProperty$c.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$2;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$2(value, length2) {
  var type = typeof value;
  length2 = length2 == null ? MAX_SAFE_INTEGER$1 : length2;
  return !!length2 && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
}
var _isIndex = isIndex$2;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$3(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$3;
var isSymbol = isSymbol_1;
var INFINITY = 1 / 0;
function toKey$4(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey = toKey$4;
var castPath$1 = _castPath, isArguments$1 = isArguments_1, isArray$4 = isArray_1, isIndex$1 = _isIndex, isLength$2 = isLength_1, toKey$3 = _toKey;
function hasPath$2(object2, path, hasFunc) {
  path = castPath$1(path, object2);
  var index = -1, length2 = path.length, result = false;
  while (++index < length2) {
    var key = toKey$3(path[index]);
    if (!(result = object2 != null && hasFunc(object2, key))) {
      break;
    }
    object2 = object2[key];
  }
  if (result || ++index != length2) {
    return result;
  }
  length2 = object2 == null ? 0 : object2.length;
  return !!length2 && isLength$2(length2) && isIndex$1(key, length2) && (isArray$4(object2) || isArguments$1(object2));
}
var _hasPath = hasPath$2;
var baseHas = _baseHas, hasPath$1 = _hasPath;
function has(object2, path) {
  return object2 != null && hasPath$1(object2, path, baseHas);
}
var has_1 = has;
const isSchema = (obj) => obj && obj.__isYupSchema__;
class Condition {
  constructor(refs, options) {
    this.fn = void 0;
    this.refs = refs;
    this.refs = refs;
    if (typeof options === "function") {
      this.fn = options;
      return;
    }
    if (!has_1(options, "is"))
      throw new TypeError("`is:` is required for `when()` conditions");
    if (!options.then && !options.otherwise)
      throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is,
      then,
      otherwise
    } = options;
    let check = typeof is === "function" ? is : (...values) => values.every((value) => value === is);
    this.fn = function(...args) {
      let options2 = args.pop();
      let schema = args.pop();
      let branch = check(...args) ? then : otherwise;
      if (!branch)
        return void 0;
      if (typeof branch === "function")
        return branch(schema);
      return schema.concat(branch.resolve(options2));
    };
  }
  resolve(base, options) {
    let values = this.refs.map((ref) => ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema = this.fn.apply(base, values.concat(base, options));
    if (schema === void 0 || schema === base)
      return base;
    if (!isSchema(schema))
      throw new TypeError("conditions must return a schema object");
    return schema.resolve(options);
  }
}
function toArray(value) {
  return value == null ? [] : [].concat(value);
}
function _extends$4() {
  _extends$4 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
let strReg = /\$\{\s*(\w+)\s*\}/g;
class ValidationError extends Error {
  static formatError(message, params) {
    const path = params.label || params.path || "this";
    if (path !== params.path)
      params = _extends$4({}, params, {
        path
      });
    if (typeof message === "string")
      return message.replace(strReg, (_2, key) => printValue(params[key]));
    if (typeof message === "function")
      return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === "ValidationError";
  }
  constructor(errorOrErrors, value, field, type) {
    super();
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.errors = void 0;
    this.params = void 0;
    this.inner = void 0;
    this.name = "ValidationError";
    this.value = value;
    this.path = field;
    this.type = type;
    this.errors = [];
    this.inner = [];
    toArray(errorOrErrors).forEach((err) => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        this.inner = this.inner.concat(err.inner.length ? err.inner : err);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, ValidationError);
  }
}
const once = (cb) => {
  let fired = false;
  return (...args) => {
    if (fired)
      return;
    fired = true;
    cb(...args);
  };
};
function runTests(options, cb) {
  let {
    endEarly,
    tests,
    args,
    value,
    errors,
    sort,
    path
  } = options;
  let callback = once(cb);
  let count = tests.length;
  const nestedErrors = [];
  errors = errors ? errors : [];
  if (!count)
    return errors.length ? callback(new ValidationError(errors, value, path)) : callback(null, value);
  for (let i2 = 0; i2 < tests.length; i2++) {
    const test = tests[i2];
    test(args, function finishTestRun(err) {
      if (err) {
        if (!ValidationError.isError(err)) {
          return callback(err, value);
        }
        if (endEarly) {
          err.value = value;
          return callback(err, value);
        }
        nestedErrors.push(err);
      }
      if (--count <= 0) {
        if (nestedErrors.length) {
          if (sort)
            nestedErrors.sort(sort);
          if (errors.length)
            nestedErrors.push(...errors);
          errors = nestedErrors;
        }
        if (errors.length) {
          callback(new ValidationError(errors, value, path), value);
          return;
        }
        callback(null, value);
      }
    });
  }
}
var getNative$5 = _getNative;
var defineProperty$1 = function() {
  try {
    var func = getNative$5(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var _defineProperty = defineProperty$1;
var defineProperty = _defineProperty;
function baseAssignValue$2(object2, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object2, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object2[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$2;
function createBaseFor$1(fromRight) {
  return function(object2, iteratee, keysFunc) {
    var index = -1, iterable = Object(object2), props = keysFunc(object2), length2 = props.length;
    while (length2--) {
      var key = props[fromRight ? length2 : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object2;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
function baseTimes$1(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var isBuffer$2 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$2, isBuffer$2.exports);
var baseGetTag$2 = _baseGetTag, isLength$1 = isLength_1, isObjectLike$1 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$1(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$2(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$1;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e2) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary = _baseUnary, nodeUtil = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
var baseTimes = _baseTimes, isArguments = isArguments_1, isArray$3 = isArray_1, isBuffer$1 = isBuffer$2.exports, isIndex = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$a = Object.prototype;
var hasOwnProperty$b = objectProto$a.hasOwnProperty;
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$3(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$b.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length2)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$1;
var objectProto$9 = Object.prototype;
function isPrototype$1(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
  return value === proto;
}
var _isPrototype = isPrototype$1;
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$1;
var overArg = _overArg;
var nativeKeys$1 = overArg(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$8 = Object.prototype;
var hasOwnProperty$a = objectProto$8.hasOwnProperty;
function baseKeys$1(object2) {
  if (!isPrototype(object2)) {
    return nativeKeys(object2);
  }
  var result = [];
  for (var key in Object(object2)) {
    if (hasOwnProperty$a.call(object2, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction$1 = isFunction_1, isLength = isLength_1;
function isArrayLike$1(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike = isArrayLike_1;
function keys$3(object2) {
  return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
}
var keys_1 = keys$3;
var baseFor = _baseFor, keys$2 = keys_1;
function baseForOwn$2(object2, iteratee) {
  return object2 && baseFor(object2, iteratee, keys$2);
}
var _baseForOwn = baseForOwn$2;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var ListCache$2 = _ListCache, Map$3 = _Map, MapCache$2 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$2) {
    var pairs = data.__data__;
    if (!Map$3 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache$1 = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$2(entries) {
  var data = this.__data__ = new ListCache$1(entries);
  this.size = data.size;
}
Stack$2.prototype.clear = stackClear;
Stack$2.prototype["delete"] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;
var _Stack = Stack$2;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}
var _setCacheAdd = setCacheAdd$1;
function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache$1 = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
function SetCache$1(values) {
  var index = -1, length2 = values == null ? 0 : values.length;
  this.__data__ = new MapCache$1();
  while (++index < length2) {
    this.add(values[index]);
  }
}
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;
var _SetCache = SetCache$1;
function arraySome$1(array2, predicate) {
  var index = -1, length2 = array2 == null ? 0 : array2.length;
  while (++index < length2) {
    if (predicate(array2[index], index, array2)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$1;
function cacheHas$1(cache2, key) {
  return cache2.has(key);
}
var _cacheHas = cacheHas$1;
var SetCache = _SetCache, arraySome = _arraySome, cacheHas = _cacheHas;
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays$2(array2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array2.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array2);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array2;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  stack.set(array2, other);
  stack.set(other, array2);
  while (++index < arrLength) {
    var arrValue = array2[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array2);
  stack["delete"](other);
  return result;
}
var _equalArrays = equalArrays$2;
var root$6 = _root;
var Uint8Array$2 = root$6.Uint8Array;
var _Uint8Array = Uint8Array$2;
function mapToArray$1(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray$1;
function setToArray$1(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray$1;
var Symbol$3 = _Symbol, Uint8Array$1 = _Uint8Array, eq$1 = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray = _setToArray;
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag$1 = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]";
var symbolProto$1 = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag$1(object2, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
        return false;
      }
      object2 = object2.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object2), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq$1(+object2, +other);
    case errorTag:
      return object2.name == other.name && object2.message == other.message;
    case regexpTag:
    case stringTag:
      return object2 == other + "";
    case mapTag$1:
      var convert = mapToArray;
    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object2.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object2);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack.set(object2, other);
      var result = equalArrays$1(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object2);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object2) == symbolValueOf.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$1;
function arrayPush$1(array2, values) {
  var index = -1, length2 = values.length, offset = array2.length;
  while (++index < length2) {
    array2[offset + index] = values[index];
  }
  return array2;
}
var _arrayPush = arrayPush$1;
var arrayPush = _arrayPush, isArray$2 = isArray_1;
function baseGetAllKeys$1(object2, keysFunc, symbolsFunc) {
  var result = keysFunc(object2);
  return isArray$2(object2) ? result : arrayPush(result, symbolsFunc(object2));
}
var _baseGetAllKeys = baseGetAllKeys$1;
function arrayFilter$1(array2, predicate) {
  var index = -1, length2 = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
  while (++index < length2) {
    var value = array2[index];
    if (predicate(value, index, array2)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$1() {
  return [];
}
var stubArray_1 = stubArray$1;
var arrayFilter = _arrayFilter, stubArray = stubArray_1;
var objectProto$7 = Object.prototype;
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols$1 = !nativeGetSymbols ? stubArray : function(object2) {
  if (object2 == null) {
    return [];
  }
  object2 = Object(object2);
  return arrayFilter(nativeGetSymbols(object2), function(symbol) {
    return propertyIsEnumerable.call(object2, symbol);
  });
};
var _getSymbols = getSymbols$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object2) {
  return baseGetAllKeys(object2, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var getAllKeys = _getAllKeys;
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$9 = objectProto$6.hasOwnProperty;
function equalObjects$1(object2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object2), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$9.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object2);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object2;
  }
  var result = true;
  stack.set(object2, other);
  stack.set(other, object2);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object2[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object2.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object2);
  stack["delete"](other);
  return result;
}
var _equalObjects = equalObjects$1;
var getNative$4 = _getNative, root$5 = _root;
var DataView$1 = getNative$4(root$5, "DataView");
var _DataView = DataView$1;
var getNative$3 = _getNative, root$4 = _root;
var Promise$2 = getNative$3(root$4, "Promise");
var _Promise = Promise$2;
var getNative$2 = _getNative, root$3 = _root;
var Set$2 = getNative$2(root$3, "Set");
var _Set = Set$2;
var getNative$1 = _getNative, root$2 = _root;
var WeakMap$2 = getNative$1(root$2, "WeakMap");
var _WeakMap = WeakMap$2;
var DataView = _DataView, Map$2 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource$1 = _toSource;
var mapTag = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource$1(DataView), mapCtorString = toSource$1(Map$2), promiseCtorString = toSource$1(Promise$1), setCtorString = toSource$1(Set$1), weakMapCtorString = toSource$1(WeakMap$1);
var getTag$1 = baseGetTag$1;
if (DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$2 && getTag$1(new Map$2()) != mapTag || Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag || Set$1 && getTag$1(new Set$1()) != setTag || WeakMap$1 && getTag$1(new WeakMap$1()) != weakMapTag) {
  getTag$1 = function(value) {
    var result = baseGetTag$1(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource$1(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
var _getTag = getTag$1;
var Stack$1 = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag = _getTag, isArray$1 = isArray_1, isBuffer = isBuffer$2.exports, isTypedArray = isTypedArray_1;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto$5 = Object.prototype;
var hasOwnProperty$8 = objectProto$5.hasOwnProperty;
function baseIsEqualDeep$1(object2, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object2), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag(object2), othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer(object2)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$1());
    return objIsArr || isTypedArray(object2) ? equalArrays(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$8.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack$1());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$1());
  return equalObjects(object2, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep$1;
var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike = isObjectLike_1;
function baseIsEqual$2(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack);
}
var _baseIsEqual = baseIsEqual$2;
var Stack = _Stack, baseIsEqual$1 = _baseIsEqual;
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch$1(object2, source, matchData, customizer) {
  var index = matchData.length, length2 = index, noCustomizer = !customizer;
  if (object2 == null) {
    return !length2;
  }
  object2 = Object(object2);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
      return false;
    }
  }
  while (++index < length2) {
    data = matchData[index];
    var key = data[0], objValue = object2[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object2)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object2, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch$1;
var isObject$2 = isObject_1;
function isStrictComparable$2(value) {
  return value === value && !isObject$2(value);
}
var _isStrictComparable = isStrictComparable$2;
var isStrictComparable$1 = _isStrictComparable, keys = keys_1;
function getMatchData$1(object2) {
  var result = keys(object2), length2 = result.length;
  while (length2--) {
    var key = result[length2], value = object2[key];
    result[length2] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}
var _getMatchData = getMatchData$1;
function matchesStrictComparable$2(key, srcValue) {
  return function(object2) {
    if (object2 == null) {
      return false;
    }
    return object2[key] === srcValue && (srcValue !== void 0 || key in Object(object2));
  };
}
var _matchesStrictComparable = matchesStrictComparable$2;
var baseIsMatch = _baseIsMatch, getMatchData = _getMatchData, matchesStrictComparable$1 = _matchesStrictComparable;
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function(object2) {
    return object2 === source || baseIsMatch(object2, source, matchData);
  };
}
var _baseMatches = baseMatches$1;
var castPath = _castPath, toKey$2 = _toKey;
function baseGet$2(object2, path) {
  path = castPath(path, object2);
  var index = 0, length2 = path.length;
  while (object2 != null && index < length2) {
    object2 = object2[toKey$2(path[index++])];
  }
  return index && index == length2 ? object2 : void 0;
}
var _baseGet = baseGet$2;
var baseGet$1 = _baseGet;
function get$1(object2, path, defaultValue) {
  var result = object2 == null ? void 0 : baseGet$1(object2, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get$1;
function baseHasIn$1(object2, key) {
  return object2 != null && key in Object(object2);
}
var _baseHasIn = baseHasIn$1;
var baseHasIn = _baseHasIn, hasPath = _hasPath;
function hasIn$1(object2, path) {
  return object2 != null && hasPath(object2, path, baseHasIn);
}
var hasIn_1 = hasIn$1;
var baseIsEqual = _baseIsEqual, get = get_1, hasIn = hasIn_1, isKey$1 = _isKey, isStrictComparable = _isStrictComparable, matchesStrictComparable = _matchesStrictComparable, toKey$1 = _toKey;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$1(path), srcValue);
  }
  return function(object2) {
    var objValue = get(object2, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object2, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
var _baseMatchesProperty = baseMatchesProperty$1;
function identity$1(value) {
  return value;
}
var identity_1 = identity$1;
function baseProperty$1(key) {
  return function(object2) {
    return object2 == null ? void 0 : object2[key];
  };
}
var _baseProperty = baseProperty$1;
var baseGet = _baseGet;
function basePropertyDeep$1(path) {
  return function(object2) {
    return baseGet(object2, path);
  };
}
var _basePropertyDeep = basePropertyDeep$1;
var baseProperty = _baseProperty, basePropertyDeep = _basePropertyDeep, isKey = _isKey, toKey = _toKey;
function property$1(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
var property_1 = property$1;
var baseMatches = _baseMatches, baseMatchesProperty = _baseMatchesProperty, identity = identity_1, isArray = isArray_1, property = property_1;
function baseIteratee$2(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == "object") {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
var _baseIteratee = baseIteratee$2;
var baseAssignValue$1 = _baseAssignValue, baseForOwn$1 = _baseForOwn, baseIteratee$1 = _baseIteratee;
function mapValues(object2, iteratee) {
  var result = {};
  iteratee = baseIteratee$1(iteratee);
  baseForOwn$1(object2, function(value, key, object3) {
    baseAssignValue$1(result, key, iteratee(value, key, object3));
  });
  return result;
}
var mapValues_1 = mapValues;
function Cache(maxSize) {
  this._maxSize = maxSize;
  this.clear();
}
Cache.prototype.clear = function() {
  this._size = 0;
  this._values = /* @__PURE__ */ Object.create(null);
};
Cache.prototype.get = function(key) {
  return this._values[key];
};
Cache.prototype.set = function(key, value) {
  this._size >= this._maxSize && this.clear();
  if (!(key in this._values))
    this._size++;
  return this._values[key] = value;
};
var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g, DIGIT_REGEX = /^\d+$/, LEAD_DIGIT_REGEX = /^\d/, SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/, MAX_CACHE_SIZE = 512;
var pathCache = new Cache(MAX_CACHE_SIZE), setCache = new Cache(MAX_CACHE_SIZE), getCache = new Cache(MAX_CACHE_SIZE);
var propertyExpr = {
  Cache,
  split,
  normalizePath,
  setter: function(path) {
    var parts2 = normalizePath(path);
    return setCache.get(path) || setCache.set(path, function setter(obj, value) {
      var index = 0;
      var len = parts2.length;
      var data = obj;
      while (index < len - 1) {
        var part = parts2[index];
        if (part === "__proto__" || part === "constructor" || part === "prototype") {
          return obj;
        }
        data = data[parts2[index++]];
      }
      data[parts2[index]] = value;
    });
  },
  getter: function(path, safe) {
    var parts2 = normalizePath(path);
    return getCache.get(path) || getCache.set(path, function getter(data) {
      var index = 0, len = parts2.length;
      while (index < len) {
        if (data != null || !safe)
          data = data[parts2[index++]];
        else
          return;
      }
      return data;
    });
  },
  join: function(segments) {
    return segments.reduce(function(path, part) {
      return path + (isQuoted(part) || DIGIT_REGEX.test(part) ? "[" + part + "]" : (path ? "." : "") + part);
    }, "");
  },
  forEach: function(path, cb, thisArg) {
    forEach(Array.isArray(path) ? path : split(path), cb, thisArg);
  }
};
function normalizePath(path) {
  return pathCache.get(path) || pathCache.set(path, split(path).map(function(part) {
    return part.replace(CLEAN_QUOTES_REGEX, "$2");
  }));
}
function split(path) {
  return path.match(SPLIT_REGEX) || [""];
}
function forEach(parts2, iter, thisArg) {
  var len = parts2.length, part, idx, isArray2, isBracket;
  for (idx = 0; idx < len; idx++) {
    part = parts2[idx];
    if (part) {
      if (shouldBeQuoted(part)) {
        part = '"' + part + '"';
      }
      isBracket = isQuoted(part);
      isArray2 = !isBracket && /^\d+$/.test(part);
      iter.call(thisArg, part, isBracket, isArray2, idx, parts2);
    }
  }
}
function isQuoted(str) {
  return typeof str === "string" && str && ["'", '"'].indexOf(str.charAt(0)) !== -1;
}
function hasLeadingNumber(part) {
  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX);
}
function hasSpecialChars(part) {
  return SPEC_CHAR_REGEX.test(part);
}
function shouldBeQuoted(part) {
  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part));
}
const prefixes = {
  context: "$",
  value: "."
};
class Reference {
  constructor(key, options = {}) {
    this.key = void 0;
    this.isContext = void 0;
    this.isValue = void 0;
    this.isSibling = void 0;
    this.path = void 0;
    this.getter = void 0;
    this.map = void 0;
    if (typeof key !== "string")
      throw new TypeError("ref must be a string, got: " + key);
    this.key = key.trim();
    if (key === "")
      throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : "";
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && propertyExpr.getter(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter)
      result = this.getter(result || {});
    if (this.map)
      result = this.map(result);
    return result;
  }
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
}
Reference.prototype.__isYupRef = true;
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function createValidation(config) {
  function validate(_ref, cb) {
    let {
      value,
      path = "",
      label,
      options,
      originalValue,
      sync
    } = _ref, rest = _objectWithoutPropertiesLoose$1(_ref, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name,
      test,
      params,
      message
    } = config;
    let {
      parent,
      context
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = mapValues_1(_extends$3({
        value,
        originalValue,
        label,
        path: overrides.path || path
      }, params, overrides.params), resolve);
      const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
      error.params = nextParams;
      return error;
    }
    let ctx = _extends$3({
      path,
      parent,
      type: name,
      createError,
      resolve,
      options,
      originalValue
    }, rest);
    if (!sync) {
      try {
        Promise.resolve(test.call(ctx, value, ctx)).then((validOrError) => {
          if (ValidationError.isError(validOrError))
            cb(validOrError);
          else if (!validOrError)
            cb(createError());
          else
            cb(null, validOrError);
        }).catch(cb);
      } catch (err) {
        cb(err);
      }
      return;
    }
    let result;
    try {
      var _ref2;
      result = test.call(ctx, value, ctx);
      if (typeof ((_ref2 = result) == null ? void 0 : _ref2.then) === "function") {
        throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
      }
    } catch (err) {
      cb(err);
      return;
    }
    if (ValidationError.isError(result))
      cb(result);
    else if (!result)
      cb(createError());
    else
      cb(null, result);
  }
  validate.OPTIONS = config;
  return validate;
}
let trim = (part) => part.substr(0, part.length - 1).substr(1);
function getIn(schema, path, value, context = value) {
  let parent, lastPart, lastPartDebug;
  if (!path)
    return {
      parent,
      parentPath: path,
      schema
    };
  propertyExpr.forEach(path, (_part, isBracket, isArray2) => {
    let part = isBracket ? trim(_part) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    if (schema.innerType) {
      let idx = isArray2 ? parseInt(part, 10) : 0;
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = schema.innerType;
    }
    if (!isArray2) {
      if (!schema.fields || !schema.fields[part])
        throw new Error(`The schema does not contain the path: ${path}. (failed at: ${lastPartDebug} which is a type: "${schema._type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
class ReferenceSet {
  constructor() {
    this.list = void 0;
    this.refs = void 0;
    this.list = /* @__PURE__ */ new Set();
    this.refs = /* @__PURE__ */ new Map();
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const description = [];
    for (const item of this.list)
      description.push(item);
    for (const [, ref] of this.refs)
      description.push(ref.describe());
    return description;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  resolveAll(resolve) {
    return this.toArray().reduce((acc, e2) => acc.concat(Reference.isRef(e2) ? resolve(e2) : e2), []);
  }
  add(value) {
    Reference.isRef(value) ? this.refs.set(value.key, value) : this.list.add(value);
  }
  delete(value) {
    Reference.isRef(value) ? this.refs.delete(value.key) : this.list.delete(value);
  }
  clone() {
    const next = new ReferenceSet();
    next.list = new Set(this.list);
    next.refs = new Map(this.refs);
    return next;
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.list.forEach((value) => next.add(value));
    newItems.refs.forEach((value) => next.add(value));
    removeItems.list.forEach((value) => next.delete(value));
    removeItems.refs.forEach((value) => next.delete(value));
    return next;
  }
}
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
class BaseSchema {
  constructor(options) {
    this.deps = [];
    this.tests = void 0;
    this.transforms = void 0;
    this.conditions = [];
    this._mutate = void 0;
    this._typeError = void 0;
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = /* @__PURE__ */ Object.create(null);
    this.spec = void 0;
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = (options == null ? void 0 : options.type) || "mixed";
    this.spec = _extends$2({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      nullable: false,
      presence: "optional"
    }, options == null ? void 0 : options.spec);
  }
  get _type() {
    return this.type;
  }
  _typeCheck(_value) {
    return true;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec)
        Object.assign(this.spec, spec);
      return this;
    }
    const next = Object.create(Object.getPrototypeOf(this));
    next.type = this.type;
    next._typeError = this._typeError;
    next._whitelistError = this._whitelistError;
    next._blacklistError = this._blacklistError;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.exclusiveTests = _extends$2({}, this.exclusiveTests);
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone$1(_extends$2({}, this.spec, spec));
    return next;
  }
  label(label) {
    let next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0)
      return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  withMutation(fn) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn(this);
    this._mutate = before;
    return result;
  }
  concat(schema) {
    if (!schema || schema === this)
      return this;
    if (schema.type !== this.type && this.type !== "mixed")
      throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
    let base = this;
    let combined = schema.clone();
    const mergedSpec = _extends$2({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined._typeError || (combined._typeError = base._typeError);
    combined._whitelistError || (combined._whitelistError = base._whitelistError);
    combined._blacklistError || (combined._blacklistError = base._blacklistError);
    combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
    combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;
    combined.withMutation((next) => {
      schema.tests.forEach((fn) => {
        next.test(fn.OPTIONS);
      });
    });
    combined.transforms = [...base.transforms, ...combined.transforms];
    return combined;
  }
  isType(v2) {
    if (this.spec.nullable && v2 === null)
      return true;
    return this._typeCheck(v2);
  }
  resolve(options) {
    let schema = this;
    if (schema.conditions.length) {
      let conditions = schema.conditions;
      schema = schema.clone();
      schema.conditions = [];
      schema = conditions.reduce((schema2, condition) => condition.resolve(schema2, options), schema);
      schema = schema.resolve(options);
    }
    return schema;
  }
  cast(value, options = {}) {
    let resolvedSchema = this.resolve(_extends$2({
      value
    }, options));
    let result = resolvedSchema._cast(value, options);
    if (value !== void 0 && options.assert !== false && resolvedSchema.isType(result) !== true) {
      let formattedValue = printValue(value);
      let formattedResult = printValue(result);
      throw new TypeError(`The value of ${options.path || "field"} could not be cast to a value that satisfies the schema type: "${resolvedSchema._type}". 

attempted value: ${formattedValue} 
` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ""));
    }
    return result;
  }
  _cast(rawValue, _options) {
    let value = rawValue === void 0 ? rawValue : this.transforms.reduce((value2, fn) => fn.call(this, value2, rawValue, this), rawValue);
    if (value === void 0) {
      value = this.getDefault();
    }
    return value;
  }
  _validate(_value, options = {}, cb) {
    let {
      sync,
      path,
      from = [],
      originalValue = _value,
      strict = this.spec.strict,
      abortEarly = this.spec.abortEarly
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, _extends$2({
        assert: false
      }, options));
    }
    let args = {
      value,
      path,
      options,
      originalValue,
      schema: this,
      label: this.spec.label,
      sync,
      from
    };
    let initialTests = [];
    if (this._typeError)
      initialTests.push(this._typeError);
    let finalTests = [];
    if (this._whitelistError)
      finalTests.push(this._whitelistError);
    if (this._blacklistError)
      finalTests.push(this._blacklistError);
    runTests({
      args,
      value,
      path,
      sync,
      tests: initialTests,
      endEarly: abortEarly
    }, (err) => {
      if (err)
        return void cb(err, value);
      runTests({
        tests: this.tests.concat(finalTests),
        args,
        path,
        sync,
        value,
        endEarly: abortEarly
      }, cb);
    });
  }
  validate(value, options, maybeCb) {
    let schema = this.resolve(_extends$2({}, options, {
      value
    }));
    return typeof maybeCb === "function" ? schema._validate(value, options, maybeCb) : new Promise((resolve, reject) => schema._validate(value, options, (err, value2) => {
      if (err)
        reject(err);
      else
        resolve(value2);
    }));
  }
  validateSync(value, options) {
    let schema = this.resolve(_extends$2({}, options, {
      value
    }));
    let result;
    schema._validate(value, _extends$2({}, options, {
      sync: true
    }), (err, value2) => {
      if (err)
        throw err;
      result = value2;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, (err) => {
      if (ValidationError.isError(err))
        return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err))
        return false;
      throw err;
    }
  }
  _getDefault() {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === "function" ? defaultValue.call(this) : clone$1(defaultValue);
  }
  getDefault(options) {
    let schema = this.resolve(options || {});
    return schema._getDefault();
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    let next = this.clone();
    next.spec.strict = isStrict;
    return next;
  }
  _isPresent(value) {
    return value != null;
  }
  defined(message = mixed.defined) {
    return this.test({
      message,
      name: "defined",
      exclusive: true,
      test(value) {
        return value !== void 0;
      }
    });
  }
  required(message = mixed.required) {
    return this.clone({
      presence: "required"
    }).withMutation((s2) => s2.test({
      message,
      name: "required",
      exclusive: true,
      test(value) {
        return this.schema._isPresent(value);
      }
    }));
  }
  notRequired() {
    let next = this.clone({
      presence: "optional"
    });
    next.tests = next.tests.filter((test) => test.OPTIONS.name !== "required");
    return next;
  }
  nullable(isNullable = true) {
    let next = this.clone({
      nullable: isNullable !== false
    });
    return next;
  }
  transform(fn) {
    let next = this.clone();
    next.transforms.push(fn);
    return next;
  }
  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === "function") {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === void 0)
      opts.message = mixed.default;
    if (typeof opts.test !== "function")
      throw new TypeError("`test` is a required parameters");
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name)
        throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    }
    if (opts.name)
      next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter((fn) => {
      if (fn.OPTIONS.name === opts.name) {
        if (isExclusive)
          return false;
        if (fn.OPTIONS.test === validate.OPTIONS.test)
          return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys2, options) {
    if (!Array.isArray(keys2) && typeof keys2 !== "string") {
      options = keys2;
      keys2 = ".";
    }
    let next = this.clone();
    let deps = toArray(keys2).map((key) => new Reference(key));
    deps.forEach((dep) => {
      if (dep.isSibling)
        next.deps.push(dep.key);
    });
    next.conditions.push(new Condition(deps, options));
    return next;
  }
  typeError(message) {
    let next = this.clone();
    next._typeError = createValidation({
      message,
      name: "typeError",
      test(value) {
        if (value !== void 0 && !this.schema.isType(value))
          return this.createError({
            params: {
              type: this.schema._type
            }
          });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    let next = this.clone();
    enums.forEach((val) => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next._whitelistError = createValidation({
      message,
      name: "oneOf",
      test(value) {
        if (value === void 0)
          return true;
        let valids = this.schema._whitelist;
        let resolved = valids.resolveAll(this.resolve);
        return resolved.includes(value) ? true : this.createError({
          params: {
            values: valids.toArray().join(", "),
            resolved
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    let next = this.clone();
    enums.forEach((val) => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next._blacklistError = createValidation({
      message,
      name: "notOneOf",
      test(value) {
        let invalids = this.schema._blacklist;
        let resolved = invalids.resolveAll(this.resolve);
        if (resolved.includes(value))
          return this.createError({
            params: {
              values: invalids.toArray().join(", "),
              resolved
            }
          });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }
  describe() {
    const next = this.clone();
    const {
      label,
      meta
    } = next.spec;
    const description = {
      meta,
      label,
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map((fn) => ({
        name: fn.OPTIONS.name,
        params: fn.OPTIONS.params
      })).filter((n2, idx, list) => list.findIndex((c2) => c2.name === n2.name) === idx)
    };
    return description;
  }
}
BaseSchema.prototype.__isYupSchema__ = true;
for (const method of ["validate", "validateSync"])
  BaseSchema.prototype[`${method}At`] = function(path, value, options = {}) {
    const {
      parent,
      parentPath,
      schema
    } = getIn(this, path, value, options.context);
    return schema[method](parent && parent[parentPath], _extends$2({}, options, {
      parent,
      path
    }));
  };
for (const alias of ["equals", "is"])
  BaseSchema.prototype[alias] = BaseSchema.prototype.oneOf;
for (const alias of ["not", "nope"])
  BaseSchema.prototype[alias] = BaseSchema.prototype.notOneOf;
BaseSchema.prototype.optional = BaseSchema.prototype.notRequired;
const isAbsent = (value) => value == null;
function create$3() {
  return new BooleanSchema();
}
class BooleanSchema extends BaseSchema {
  constructor() {
    super({
      type: "boolean"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (!this.isType(value)) {
          if (/^(true|1)$/i.test(String(value)))
            return true;
          if (/^(false|0)$/i.test(String(value)))
            return false;
        }
        return value;
      });
    });
  }
  _typeCheck(v2) {
    if (v2 instanceof Boolean)
      v2 = v2.valueOf();
    return typeof v2 === "boolean";
  }
  isTrue(message = boolean.isValue) {
    return this.test({
      message,
      name: "is-value",
      exclusive: true,
      params: {
        value: "true"
      },
      test(value) {
        return isAbsent(value) || value === true;
      }
    });
  }
  isFalse(message = boolean.isValue) {
    return this.test({
      message,
      name: "is-value",
      exclusive: true,
      params: {
        value: "false"
      },
      test(value) {
        return isAbsent(value) || value === false;
      }
    });
  }
}
create$3.prototype = BooleanSchema.prototype;
let rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
let rUrl = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
let rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
let isTrimmed = (value) => isAbsent(value) || value === value.trim();
let objStringTag = {}.toString();
function create$2() {
  return new StringSchema();
}
class StringSchema extends BaseSchema {
  constructor() {
    super({
      type: "string"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value))
          return value;
        if (Array.isArray(value))
          return value;
        const strValue = value != null && value.toString ? value.toString() : value;
        if (strValue === objStringTag)
          return value;
        return strValue;
      });
    });
  }
  _typeCheck(value) {
    if (value instanceof String)
      value = value.valueOf();
    return typeof value === "string";
  }
  _isPresent(value) {
    return super._isPresent(value) && !!value.length;
  }
  length(length2, message = string.length) {
    return this.test({
      message,
      name: "length",
      exclusive: true,
      params: {
        length: length2
      },
      test(value) {
        return isAbsent(value) || value.length === this.resolve(length2);
      }
    });
  }
  min(min, message = string.min) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      test(value) {
        return isAbsent(value) || value.length >= this.resolve(min);
      }
    });
  }
  max(max, message = string.max) {
    return this.test({
      name: "max",
      exclusive: true,
      message,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value.length <= this.resolve(max);
      }
    });
  }
  matches(regex, options) {
    let excludeEmptyString = false;
    let message;
    let name;
    if (options) {
      if (typeof options === "object") {
        ({
          excludeEmptyString = false,
          message,
          name
        } = options);
      } else {
        message = options;
      }
    }
    return this.test({
      name: name || "matches",
      message: message || string.matches,
      params: {
        regex
      },
      test: (value) => isAbsent(value) || value === "" && excludeEmptyString || value.search(regex) !== -1
    });
  }
  email(message = string.email) {
    return this.matches(rEmail, {
      name: "email",
      message,
      excludeEmptyString: true
    });
  }
  url(message = string.url) {
    return this.matches(rUrl, {
      name: "url",
      message,
      excludeEmptyString: true
    });
  }
  uuid(message = string.uuid) {
    return this.matches(rUUID, {
      name: "uuid",
      message,
      excludeEmptyString: false
    });
  }
  ensure() {
    return this.default("").transform((val) => val === null ? "" : val);
  }
  trim(message = string.trim) {
    return this.transform((val) => val != null ? val.trim() : val).test({
      message,
      name: "trim",
      test: isTrimmed
    });
  }
  lowercase(message = string.lowercase) {
    return this.transform((value) => !isAbsent(value) ? value.toLowerCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toLowerCase()
    });
  }
  uppercase(message = string.uppercase) {
    return this.transform((value) => !isAbsent(value) ? value.toUpperCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toUpperCase()
    });
  }
}
create$2.prototype = StringSchema.prototype;
let isNaN$1 = (value) => value != +value;
function create$1() {
  return new NumberSchema();
}
class NumberSchema extends BaseSchema {
  constructor() {
    super({
      type: "number"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        let parsed = value;
        if (typeof parsed === "string") {
          parsed = parsed.replace(/\s/g, "");
          if (parsed === "")
            return NaN;
          parsed = +parsed;
        }
        if (this.isType(parsed))
          return parsed;
        return parseFloat(parsed);
      });
    });
  }
  _typeCheck(value) {
    if (value instanceof Number)
      value = value.valueOf();
    return typeof value === "number" && !isNaN$1(value);
  }
  min(min, message = number.min) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      test(value) {
        return isAbsent(value) || value >= this.resolve(min);
      }
    });
  }
  max(max, message = number.max) {
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value <= this.resolve(max);
      }
    });
  }
  lessThan(less, message = number.lessThan) {
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        less
      },
      test(value) {
        return isAbsent(value) || value < this.resolve(less);
      }
    });
  }
  moreThan(more, message = number.moreThan) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        more
      },
      test(value) {
        return isAbsent(value) || value > this.resolve(more);
      }
    });
  }
  positive(msg = number.positive) {
    return this.moreThan(0, msg);
  }
  negative(msg = number.negative) {
    return this.lessThan(0, msg);
  }
  integer(message = number.integer) {
    return this.test({
      name: "integer",
      message,
      test: (val) => isAbsent(val) || Number.isInteger(val)
    });
  }
  truncate() {
    return this.transform((value) => !isAbsent(value) ? value | 0 : value);
  }
  round(method) {
    var _method;
    let avail = ["ceil", "floor", "round", "trunc"];
    method = ((_method = method) == null ? void 0 : _method.toLowerCase()) || "round";
    if (method === "trunc")
      return this.truncate();
    if (avail.indexOf(method.toLowerCase()) === -1)
      throw new TypeError("Only valid options for round() are: " + avail.join(", "));
    return this.transform((value) => !isAbsent(value) ? Math[method](value) : value);
  }
}
create$1.prototype = NumberSchema.prototype;
var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date2) {
  var numericKeys = [1, 4, 5, 6, 7, 10, 11], minutesOffset = 0, timestamp, struct;
  if (struct = isoReg.exec(date2)) {
    for (var i2 = 0, k2; k2 = numericKeys[i2]; ++i2)
      struct[k2] = +struct[k2] || 0;
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;
    struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0;
    if ((struct[8] === void 0 || struct[8] === "") && (struct[9] === void 0 || struct[9] === ""))
      timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);
    else {
      if (struct[8] !== "Z" && struct[9] !== void 0) {
        minutesOffset = struct[10] * 60 + struct[11];
        if (struct[9] === "+")
          minutesOffset = 0 - minutesOffset;
      }
      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
  } else
    timestamp = Date.parse ? Date.parse(date2) : NaN;
  return timestamp;
}
let invalidDate = new Date("");
let isDate = (obj) => Object.prototype.toString.call(obj) === "[object Date]";
class DateSchema extends BaseSchema {
  constructor() {
    super({
      type: "date"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value))
          return value;
        value = parseIsoDate(value);
        return !isNaN(value) ? new Date(value) : invalidDate;
      });
    });
  }
  _typeCheck(v2) {
    return isDate(v2) && !isNaN(v2.getTime());
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast))
        throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min, message = date.min) {
    let limit = this.prepareParam(min, "min");
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      test(value) {
        return isAbsent(value) || value >= this.resolve(limit);
      }
    });
  }
  max(max, message = date.max) {
    let limit = this.prepareParam(max, "max");
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value <= this.resolve(limit);
      }
    });
  }
}
DateSchema.INVALID_DATE = invalidDate;
function arrayReduce$1(array2, iteratee, accumulator, initAccum) {
  var index = -1, length2 = array2 == null ? 0 : array2.length;
  if (initAccum && length2) {
    accumulator = array2[++index];
  }
  while (++index < length2) {
    accumulator = iteratee(accumulator, array2[index], index, array2);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce$1;
function basePropertyOf$1(object2) {
  return function(key) {
    return object2 == null ? void 0 : object2[key];
  };
}
var _basePropertyOf = basePropertyOf$1;
var basePropertyOf = _basePropertyOf;
var deburredLetters = {
  "\xC0": "A",
  "\xC1": "A",
  "\xC2": "A",
  "\xC3": "A",
  "\xC4": "A",
  "\xC5": "A",
  "\xE0": "a",
  "\xE1": "a",
  "\xE2": "a",
  "\xE3": "a",
  "\xE4": "a",
  "\xE5": "a",
  "\xC7": "C",
  "\xE7": "c",
  "\xD0": "D",
  "\xF0": "d",
  "\xC8": "E",
  "\xC9": "E",
  "\xCA": "E",
  "\xCB": "E",
  "\xE8": "e",
  "\xE9": "e",
  "\xEA": "e",
  "\xEB": "e",
  "\xCC": "I",
  "\xCD": "I",
  "\xCE": "I",
  "\xCF": "I",
  "\xEC": "i",
  "\xED": "i",
  "\xEE": "i",
  "\xEF": "i",
  "\xD1": "N",
  "\xF1": "n",
  "\xD2": "O",
  "\xD3": "O",
  "\xD4": "O",
  "\xD5": "O",
  "\xD6": "O",
  "\xD8": "O",
  "\xF2": "o",
  "\xF3": "o",
  "\xF4": "o",
  "\xF5": "o",
  "\xF6": "o",
  "\xF8": "o",
  "\xD9": "U",
  "\xDA": "U",
  "\xDB": "U",
  "\xDC": "U",
  "\xF9": "u",
  "\xFA": "u",
  "\xFB": "u",
  "\xFC": "u",
  "\xDD": "Y",
  "\xFD": "y",
  "\xFF": "y",
  "\xC6": "Ae",
  "\xE6": "ae",
  "\xDE": "Th",
  "\xFE": "th",
  "\xDF": "ss",
  "\u0100": "A",
  "\u0102": "A",
  "\u0104": "A",
  "\u0101": "a",
  "\u0103": "a",
  "\u0105": "a",
  "\u0106": "C",
  "\u0108": "C",
  "\u010A": "C",
  "\u010C": "C",
  "\u0107": "c",
  "\u0109": "c",
  "\u010B": "c",
  "\u010D": "c",
  "\u010E": "D",
  "\u0110": "D",
  "\u010F": "d",
  "\u0111": "d",
  "\u0112": "E",
  "\u0114": "E",
  "\u0116": "E",
  "\u0118": "E",
  "\u011A": "E",
  "\u0113": "e",
  "\u0115": "e",
  "\u0117": "e",
  "\u0119": "e",
  "\u011B": "e",
  "\u011C": "G",
  "\u011E": "G",
  "\u0120": "G",
  "\u0122": "G",
  "\u011D": "g",
  "\u011F": "g",
  "\u0121": "g",
  "\u0123": "g",
  "\u0124": "H",
  "\u0126": "H",
  "\u0125": "h",
  "\u0127": "h",
  "\u0128": "I",
  "\u012A": "I",
  "\u012C": "I",
  "\u012E": "I",
  "\u0130": "I",
  "\u0129": "i",
  "\u012B": "i",
  "\u012D": "i",
  "\u012F": "i",
  "\u0131": "i",
  "\u0134": "J",
  "\u0135": "j",
  "\u0136": "K",
  "\u0137": "k",
  "\u0138": "k",
  "\u0139": "L",
  "\u013B": "L",
  "\u013D": "L",
  "\u013F": "L",
  "\u0141": "L",
  "\u013A": "l",
  "\u013C": "l",
  "\u013E": "l",
  "\u0140": "l",
  "\u0142": "l",
  "\u0143": "N",
  "\u0145": "N",
  "\u0147": "N",
  "\u014A": "N",
  "\u0144": "n",
  "\u0146": "n",
  "\u0148": "n",
  "\u014B": "n",
  "\u014C": "O",
  "\u014E": "O",
  "\u0150": "O",
  "\u014D": "o",
  "\u014F": "o",
  "\u0151": "o",
  "\u0154": "R",
  "\u0156": "R",
  "\u0158": "R",
  "\u0155": "r",
  "\u0157": "r",
  "\u0159": "r",
  "\u015A": "S",
  "\u015C": "S",
  "\u015E": "S",
  "\u0160": "S",
  "\u015B": "s",
  "\u015D": "s",
  "\u015F": "s",
  "\u0161": "s",
  "\u0162": "T",
  "\u0164": "T",
  "\u0166": "T",
  "\u0163": "t",
  "\u0165": "t",
  "\u0167": "t",
  "\u0168": "U",
  "\u016A": "U",
  "\u016C": "U",
  "\u016E": "U",
  "\u0170": "U",
  "\u0172": "U",
  "\u0169": "u",
  "\u016B": "u",
  "\u016D": "u",
  "\u016F": "u",
  "\u0171": "u",
  "\u0173": "u",
  "\u0174": "W",
  "\u0175": "w",
  "\u0176": "Y",
  "\u0177": "y",
  "\u0178": "Y",
  "\u0179": "Z",
  "\u017B": "Z",
  "\u017D": "Z",
  "\u017A": "z",
  "\u017C": "z",
  "\u017E": "z",
  "\u0132": "IJ",
  "\u0133": "ij",
  "\u0152": "Oe",
  "\u0153": "oe",
  "\u0149": "'n",
  "\u017F": "s"
};
var deburrLetter$1 = basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter$1;
var deburrLetter = _deburrLetter, toString$4 = toString_1;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsCombo$2 = "[" + rsComboRange$3 + "]";
var reComboMark = RegExp(rsCombo$2, "g");
function deburr$1(string2) {
  string2 = toString$4(string2);
  return string2 && string2.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var deburr_1 = deburr$1;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords$1(string2) {
  return string2.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords$1;
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord$1(string2) {
  return reHasUnicodeWord.test(string2);
}
var _hasUnicodeWord = hasUnicodeWord$1;
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange$2 = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['\u2019]", rsBreak = "[" + rsBreakRange + "]", rsCombo$1 = "[" + rsComboRange$2 + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$1 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$2 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ$2 = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$2 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$2 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsEmoji = "(?:" + [rsDingbat, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsSeq$1;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords$1(string2) {
  return string2.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords$1;
var asciiWords = _asciiWords, hasUnicodeWord = _hasUnicodeWord, toString$3 = toString_1, unicodeWords = _unicodeWords;
function words$1(string2, pattern, guard) {
  string2 = toString$3(string2);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string2) ? unicodeWords(string2) : asciiWords(string2);
  }
  return string2.match(pattern) || [];
}
var words_1 = words$1;
var arrayReduce = _arrayReduce, deburr = deburr_1, words = words_1;
var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, "g");
function createCompounder$2(callback) {
  return function(string2) {
    return arrayReduce(words(deburr(string2).replace(reApos, "")), callback, "");
  };
}
var _createCompounder = createCompounder$2;
var createCompounder$1 = _createCompounder;
var snakeCase = createCompounder$1(function(result, word, index) {
  return result + (index ? "_" : "") + word.toLowerCase();
});
var snakeCase_1 = snakeCase;
function baseSlice$1(array2, start, end) {
  var index = -1, length2 = array2.length;
  if (start < 0) {
    start = -start > length2 ? 0 : length2 + start;
  }
  end = end > length2 ? length2 : end;
  if (end < 0) {
    end += length2;
  }
  length2 = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length2);
  while (++index < length2) {
    result[index] = array2[index + start];
  }
  return result;
}
var _baseSlice = baseSlice$1;
var baseSlice = _baseSlice;
function castSlice$1(array2, start, end) {
  var length2 = array2.length;
  end = end === void 0 ? length2 : end;
  return !start && end >= length2 ? array2 : baseSlice(array2, start, end);
}
var _castSlice = castSlice$1;
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode$2(string2) {
  return reHasUnicode.test(string2);
}
var _hasUnicode = hasUnicode$2;
function asciiToArray$1(string2) {
  return string2.split("");
}
var _asciiToArray = asciiToArray$1;
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray$1(string2) {
  return string2.match(reUnicode) || [];
}
var _unicodeToArray = unicodeToArray$1;
var asciiToArray = _asciiToArray, hasUnicode$1 = _hasUnicode, unicodeToArray = _unicodeToArray;
function stringToArray$1(string2) {
  return hasUnicode$1(string2) ? unicodeToArray(string2) : asciiToArray(string2);
}
var _stringToArray = stringToArray$1;
var castSlice = _castSlice, hasUnicode = _hasUnicode, stringToArray = _stringToArray, toString$2 = toString_1;
function createCaseFirst$1(methodName) {
  return function(string2) {
    string2 = toString$2(string2);
    var strSymbols = hasUnicode(string2) ? stringToArray(string2) : void 0;
    var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string2.slice(1);
    return chr[methodName]() + trailing;
  };
}
var _createCaseFirst = createCaseFirst$1;
var createCaseFirst = _createCaseFirst;
var upperFirst$1 = createCaseFirst("toUpperCase");
var upperFirst_1 = upperFirst$1;
var toString = toString_1, upperFirst = upperFirst_1;
function capitalize$1(string2) {
  return upperFirst(toString(string2).toLowerCase());
}
var capitalize_1 = capitalize$1;
var capitalize = capitalize_1, createCompounder = _createCompounder;
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});
var camelCase_1 = camelCase;
var baseAssignValue = _baseAssignValue, baseForOwn = _baseForOwn, baseIteratee = _baseIteratee;
function mapKeys(object2, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee);
  baseForOwn(object2, function(value, key, object3) {
    baseAssignValue(result, iteratee(value, key, object3), value);
  });
  return result;
}
var mapKeys_1 = mapKeys;
var toposort$2 = { exports: {} };
toposort$2.exports = function(edges) {
  return toposort(uniqueNodes(edges), edges);
};
toposort$2.exports.array = toposort;
function toposort(nodes, edges) {
  var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i2 = cursor, outgoingEdges = makeOutgoingEdges(edges), nodesHash = makeNodesHash(nodes);
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
    }
  });
  while (i2--) {
    if (!visited[i2])
      visit(nodes[i2], i2, /* @__PURE__ */ new Set());
  }
  return sorted;
  function visit(node, i3, predecessors) {
    if (predecessors.has(node)) {
      var nodeRep;
      try {
        nodeRep = ", node was:" + JSON.stringify(node);
      } catch (e2) {
        nodeRep = "";
      }
      throw new Error("Cyclic dependency" + nodeRep);
    }
    if (!nodesHash.has(node)) {
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(node));
    }
    if (visited[i3])
      return;
    visited[i3] = true;
    var outgoing = outgoingEdges.get(node) || /* @__PURE__ */ new Set();
    outgoing = Array.from(outgoing);
    if (i3 = outgoing.length) {
      predecessors.add(node);
      do {
        var child = outgoing[--i3];
        visit(child, nodesHash.get(child), predecessors);
      } while (i3);
      predecessors.delete(node);
    }
    sorted[--cursor] = node;
  }
}
function uniqueNodes(arr) {
  var res = /* @__PURE__ */ new Set();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    var edge = arr[i2];
    res.add(edge[0]);
    res.add(edge[1]);
  }
  return Array.from(res);
}
function makeOutgoingEdges(arr) {
  var edges = /* @__PURE__ */ new Map();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    var edge = arr[i2];
    if (!edges.has(edge[0]))
      edges.set(edge[0], /* @__PURE__ */ new Set());
    if (!edges.has(edge[1]))
      edges.set(edge[1], /* @__PURE__ */ new Set());
    edges.get(edge[0]).add(edge[1]);
  }
  return edges;
}
function makeNodesHash(arr) {
  var res = /* @__PURE__ */ new Map();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    res.set(arr[i2], i2);
  }
  return res;
}
var toposort$1 = toposort$2.exports;
function sortFields(fields, excludedEdges = []) {
  let edges = [];
  let nodes = /* @__PURE__ */ new Set();
  let excludes = new Set(excludedEdges.map(([a2, b2]) => `${a2}-${b2}`));
  function addNode(depPath, key) {
    let node = propertyExpr.split(depPath)[0];
    nodes.add(node);
    if (!excludes.has(`${key}-${node}`))
      edges.push([key, node]);
  }
  for (const key in fields)
    if (has_1(fields, key)) {
      let value = fields[key];
      nodes.add(key);
      if (Reference.isRef(value) && value.isSibling)
        addNode(value.path, key);
      else if (isSchema(value) && "deps" in value)
        value.deps.forEach((path) => addNode(path, key));
    }
  return toposort$1.array(Array.from(nodes), edges).reverse();
}
function findIndex(arr, err) {
  let idx = Infinity;
  arr.some((key, ii) => {
    var _err$path;
    if (((_err$path = err.path) == null ? void 0 : _err$path.indexOf(key)) !== -1) {
      idx = ii;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys2) {
  return (a2, b2) => {
    return findIndex(keys2, a2) - findIndex(keys2, b2);
  };
}
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
let isObject$1 = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter((key) => known.indexOf(key) === -1);
}
const defaultSort = sortByKeyOrder([]);
class ObjectSchema extends BaseSchema {
  constructor(spec) {
    super({
      type: "object"
    });
    this.fields = /* @__PURE__ */ Object.create(null);
    this._sortErrors = defaultSort;
    this._nodes = [];
    this._excludedEdges = [];
    this.withMutation(() => {
      this.transform(function coerce(value) {
        if (typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch (err) {
            value = null;
          }
        }
        if (this.isType(value))
          return value;
        return null;
      });
      if (spec) {
        this.shape(spec);
      }
    });
  }
  _typeCheck(value) {
    return isObject$1(value) || typeof value === "function";
  }
  _cast(_value, options = {}) {
    var _options$stripUnknown;
    let value = super._cast(_value, options);
    if (value === void 0)
      return this.getDefault();
    if (!this._typeCheck(value))
      return value;
    let fields = this.fields;
    let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
    let props = this._nodes.concat(Object.keys(value).filter((v2) => this._nodes.indexOf(v2) === -1));
    let intermediateValue = {};
    let innerOptions = _extends$1({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });
    let isChanged = false;
    for (const prop of props) {
      let field = fields[prop];
      let exists = has_1(value, prop);
      if (field) {
        let fieldValue;
        let inputValue = value[prop];
        innerOptions.path = (options.path ? `${options.path}.` : "") + prop;
        field = field.resolve({
          value: inputValue,
          context: options.context,
          parent: intermediateValue
        });
        let fieldSpec = "spec" in field ? field.spec : void 0;
        let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
        if (fieldSpec == null ? void 0 : fieldSpec.strip) {
          isChanged = isChanged || prop in value;
          continue;
        }
        fieldValue = !options.__validating || !strict ? field.cast(value[prop], innerOptions) : value[prop];
        if (fieldValue !== void 0) {
          intermediateValue[prop] = fieldValue;
        }
      } else if (exists && !strip) {
        intermediateValue[prop] = value[prop];
      }
      if (intermediateValue[prop] !== value[prop]) {
        isChanged = true;
      }
    }
    return isChanged ? intermediateValue : value;
  }
  _validate(_value, opts = {}, callback) {
    let errors = [];
    let {
      sync,
      from = [],
      originalValue = _value,
      abortEarly = this.spec.abortEarly,
      recursive = this.spec.recursive
    } = opts;
    from = [{
      schema: this,
      value: originalValue
    }, ...from];
    opts.__validating = true;
    opts.originalValue = originalValue;
    opts.from = from;
    super._validate(_value, opts, (err, value) => {
      if (err) {
        if (!ValidationError.isError(err) || abortEarly) {
          return void callback(err, value);
        }
        errors.push(err);
      }
      if (!recursive || !isObject$1(value)) {
        callback(errors[0] || null, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = this._nodes.map((key) => (_2, cb) => {
        let path = key.indexOf(".") === -1 ? (opts.path ? `${opts.path}.` : "") + key : `${opts.path || ""}["${key}"]`;
        let field = this.fields[key];
        if (field && "validate" in field) {
          field.validate(value[key], _extends$1({}, opts, {
            path,
            from,
            strict: true,
            parent: value,
            originalValue: originalValue[key]
          }), cb);
          return;
        }
        cb(null);
      });
      runTests({
        sync,
        tests,
        value,
        errors,
        endEarly: abortEarly,
        sort: this._sortErrors,
        path: opts.path
      }, callback);
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.fields = _extends$1({}, this.fields);
    next._nodes = this._nodes;
    next._excludedEdges = this._excludedEdges;
    next._sortErrors = this._sortErrors;
    return next;
  }
  concat(schema) {
    let next = super.concat(schema);
    let nextFields = next.fields;
    for (let [field, schemaOrRef] of Object.entries(this.fields)) {
      const target = nextFields[field];
      if (target === void 0) {
        nextFields[field] = schemaOrRef;
      } else if (target instanceof BaseSchema && schemaOrRef instanceof BaseSchema) {
        nextFields[field] = schemaOrRef.concat(target);
      }
    }
    return next.withMutation(() => next.shape(nextFields, this._excludedEdges));
  }
  getDefaultFromShape() {
    let dft = {};
    this._nodes.forEach((key) => {
      const field = this.fields[key];
      dft[key] = "default" in field ? field.getDefault() : void 0;
    });
    return dft;
  }
  _getDefault() {
    if ("default" in this.spec) {
      return super._getDefault();
    }
    if (!this._nodes.length) {
      return void 0;
    }
    return this.getDefaultFromShape();
  }
  shape(additions, excludes = []) {
    let next = this.clone();
    let fields = Object.assign(next.fields, additions);
    next.fields = fields;
    next._sortErrors = sortByKeyOrder(Object.keys(fields));
    if (excludes.length) {
      if (!Array.isArray(excludes[0]))
        excludes = [excludes];
      next._excludedEdges = [...next._excludedEdges, ...excludes];
    }
    next._nodes = sortFields(fields, next._excludedEdges);
    return next;
  }
  pick(keys2) {
    const picked = {};
    for (const key of keys2) {
      if (this.fields[key])
        picked[key] = this.fields[key];
    }
    return this.clone().withMutation((next) => {
      next.fields = {};
      return next.shape(picked);
    });
  }
  omit(keys2) {
    const next = this.clone();
    const fields = next.fields;
    next.fields = {};
    for (const key of keys2) {
      delete fields[key];
    }
    return next.withMutation(() => next.shape(fields));
  }
  from(from, to, alias) {
    let fromGetter = propertyExpr.getter(from, true);
    return this.transform((obj) => {
      if (obj == null)
        return obj;
      let newObj = obj;
      if (has_1(obj, from)) {
        newObj = _extends$1({}, obj);
        if (!alias)
          delete newObj[from];
        newObj[to] = fromGetter(obj);
      }
      return newObj;
    });
  }
  noUnknown(noAllow = true, message = object.noUnknown) {
    if (typeof noAllow === "string") {
      message = noAllow;
      noAllow = true;
    }
    let next = this.test({
      name: "noUnknown",
      exclusive: true,
      message,
      test(value) {
        if (value == null)
          return true;
        const unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(", ")
          }
        });
      }
    });
    next.spec.noUnknown = noAllow;
    return next;
  }
  unknown(allow = true, message = object.noUnknown) {
    return this.noUnknown(!allow, message);
  }
  transformKeys(fn) {
    return this.transform((obj) => obj && mapKeys_1(obj, (_2, key) => fn(key)));
  }
  camelCase() {
    return this.transformKeys(camelCase_1);
  }
  snakeCase() {
    return this.transformKeys(snakeCase_1);
  }
  constantCase() {
    return this.transformKeys((key) => snakeCase_1(key).toUpperCase());
  }
  describe() {
    let base = super.describe();
    base.fields = mapValues_1(this.fields, (value) => value.describe());
    return base;
  }
}
function create(spec) {
  return new ObjectSchema(spec);
}
create.prototype = ObjectSchema.prototype;
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$2 = typeof Symbol === "function" && Symbol.for, c$4 = b$2 ? Symbol.for("react.element") : 60103, d$4 = b$2 ? Symbol.for("react.portal") : 60106, e$3 = b$2 ? Symbol.for("react.fragment") : 60107, f$8 = b$2 ? Symbol.for("react.strict_mode") : 60108, g$6 = b$2 ? Symbol.for("react.profiler") : 60114, h$7 = b$2 ? Symbol.for("react.provider") : 60109, k = b$2 ? Symbol.for("react.context") : 60110, l$2 = b$2 ? Symbol.for("react.async_mode") : 60111, m$7 = b$2 ? Symbol.for("react.concurrent_mode") : 60111, n$9 = b$2 ? Symbol.for("react.forward_ref") : 60112, p$7 = b$2 ? Symbol.for("react.suspense") : 60113, q$4 = b$2 ? Symbol.for("react.suspense_list") : 60120, r$4 = b$2 ? Symbol.for("react.memo") : 60115, t$4 = b$2 ? Symbol.for("react.lazy") : 60116, v$1 = b$2 ? Symbol.for("react.block") : 60121, w$2 = b$2 ? Symbol.for("react.fundamental") : 60117, x$3 = b$2 ? Symbol.for("react.responder") : 60118, y = b$2 ? Symbol.for("react.scope") : 60119;
function z$1(a2) {
  if (typeof a2 === "object" && a2 !== null) {
    var u2 = a2.$$typeof;
    switch (u2) {
      case c$4:
        switch (a2 = a2.type, a2) {
          case l$2:
          case m$7:
          case e$3:
          case g$6:
          case f$8:
          case p$7:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k:
              case n$9:
              case t$4:
              case r$4:
              case h$7:
                return a2;
              default:
                return u2;
            }
        }
      case d$4:
        return u2;
    }
  }
}
function A$2(a2) {
  return z$1(a2) === m$7;
}
reactIs_production_min.AsyncMode = l$2;
reactIs_production_min.ConcurrentMode = m$7;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h$7;
reactIs_production_min.Element = c$4;
reactIs_production_min.ForwardRef = n$9;
reactIs_production_min.Fragment = e$3;
reactIs_production_min.Lazy = t$4;
reactIs_production_min.Memo = r$4;
reactIs_production_min.Portal = d$4;
reactIs_production_min.Profiler = g$6;
reactIs_production_min.StrictMode = f$8;
reactIs_production_min.Suspense = p$7;
reactIs_production_min.isAsyncMode = function(a2) {
  return A$2(a2) || z$1(a2) === l$2;
};
reactIs_production_min.isConcurrentMode = A$2;
reactIs_production_min.isContextConsumer = function(a2) {
  return z$1(a2) === k;
};
reactIs_production_min.isContextProvider = function(a2) {
  return z$1(a2) === h$7;
};
reactIs_production_min.isElement = function(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === c$4;
};
reactIs_production_min.isForwardRef = function(a2) {
  return z$1(a2) === n$9;
};
reactIs_production_min.isFragment = function(a2) {
  return z$1(a2) === e$3;
};
reactIs_production_min.isLazy = function(a2) {
  return z$1(a2) === t$4;
};
reactIs_production_min.isMemo = function(a2) {
  return z$1(a2) === r$4;
};
reactIs_production_min.isPortal = function(a2) {
  return z$1(a2) === d$4;
};
reactIs_production_min.isProfiler = function(a2) {
  return z$1(a2) === g$6;
};
reactIs_production_min.isStrictMode = function(a2) {
  return z$1(a2) === f$8;
};
reactIs_production_min.isSuspense = function(a2) {
  return z$1(a2) === p$7;
};
reactIs_production_min.isValidElementType = function(a2) {
  return typeof a2 === "string" || typeof a2 === "function" || a2 === e$3 || a2 === m$7 || a2 === g$6 || a2 === f$8 || a2 === p$7 || a2 === q$4 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === t$4 || a2.$$typeof === r$4 || a2.$$typeof === h$7 || a2.$$typeof === k || a2.$$typeof === n$9 || a2.$$typeof === w$2 || a2.$$typeof === x$3 || a2.$$typeof === y || a2.$$typeof === v$1);
};
reactIs_production_min.typeOf = z$1;
{
  reactIs$1.exports = reactIs_production_min;
}
var reactIs = reactIs$1.exports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$1.call(b2, prop))
      __defNormalProp$1(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b2)) {
      if (__propIsEnum$1.call(b2, prop))
        __defNormalProp$1(a2, prop, b2[prop]);
    }
  return a2;
};
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const SOCKET_HOST$1 = "http://localhost:8888";
function socket$1(namespace) {
  let ns = [SOCKET_HOST$1, namespace].join("/").replace("@", "scope:");
  let socket2 = lookup$2(ns);
  socket2.on("connect", (_2) => {
  });
  return socket2;
}
const coreSocket = socket$1("@fuse-labs/core");
const ClientDeviceType$1 = Object.freeze({
  FDMPrinter: "fdm_printer",
  MSLAPrinter: "msla_printer",
  CNC: "cnc",
  Laser: "laser"
});
const CONSTRUCTOR_SCHEMA$1 = create({
  name: create$2().required(),
  version: create$2().required(),
  _settings: create$3().required(),
  _hasPages: create$3().required(),
  _hasTabs: create$3().required(),
  _hasSocket: create$3().required(),
  _hasDeviceSocket: create$3().required(),
  _fuse: create().required(),
  _active: create$3().required(),
  _system: create$3().required()
});
create({
  name: create$2().required(),
  version: create$2().required(),
  fuse: create().required()
});
class ClientPlugin$1 {
  constructor(data) {
    __publicField$1(this, "name");
    __publicField$1(this, "version");
    __publicField$1(this, "_fuse");
    __publicField$1(this, "_settings", false);
    __publicField$1(this, "_hasPages", false);
    __publicField$1(this, "_hasTabs", false);
    __publicField$1(this, "_hasSocket");
    __publicField$1(this, "_hasDeviceSocket");
    __publicField$1(this, "_active", false);
    __publicField$1(this, "_system");
    let pluginData = CONSTRUCTOR_SCHEMA$1.validateSync(data);
    Object.assign(this, pluginData);
    if (this.hasSocket) {
      this.socket = socket$1(this.name);
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
    return this._fuse.pagesUrl || this.name;
  }
  get hasTabs() {
    return this._hasTabs;
  }
  get tabsUrl() {
    return this._fuse.tabsUrl || this.name;
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
  get deviceTypes() {
    if (this._fuse.devices == "*")
      return Object.values(ClientDeviceType$1);
    return this._fuse.devices;
  }
  get displayTitle() {
    return this._fuse.title || this.name;
  }
  components() {
    return {};
  }
  deviceComponents(device) {
    return {};
  }
}
const _ClientPluginManager$1 = class {
  constructor() {
    __publicField$1(this, "_initialized", false);
    __publicField$1(this, "_plugins", []);
    __publicField$1(this, "_activePluginsNames", []);
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
      let PluginClass = _ClientPluginManager$1._registeredPlugins[data.name];
      if (PluginClass) {
        return new PluginClass(data);
      } else {
        return new ClientPlugin$1(data);
      }
    })) || [];
    console.log("INIT MANAGER Plugins", this._plugins);
    this._initialized = true;
  }
  static registerPlugin(pluginName, pluginClass) {
    _ClientPluginManager$1._registeredPlugins[pluginName] = pluginClass;
  }
};
let ClientPluginManager$1 = _ClientPluginManager$1;
__publicField$1(ClientPluginManager$1, "_registeredPlugins", {});
class Singleton$1 {
  constructor() {
    throw new Error("Use ClienPluginManager.shared instead");
  }
  static get shared() {
    if (!Singleton$1.sharedInstance) {
      Singleton$1.sharedInstance = new ClientPluginManager$1();
    }
    return Singleton$1.sharedInstance;
  }
}
Singleton$1.registerPlugin = ClientPluginManager$1.registerPlugin;
const SCHEMA = create({
  id: create$2().required(),
  name: create$2().defined().required(),
  port: create$2().defined().required(),
  baudrate: create$1().defined().required(),
  profileId: create$2().defined().required(),
  serialNumber: create$2().nullable().default(null),
  vendorId: create$2().nullable().default(null),
  productId: create$2().nullable().default(null)
});
class ClientDevice {
  constructor(data) {
    __publicField$1(this, "id");
    __publicField$1(this, "name");
    __publicField$1(this, "port");
    __publicField$1(this, "baudrate");
    __publicField$1(this, "profileId");
    __publicField$1(this, "profile");
    __publicField$1(this, "serialNumber");
    __publicField$1(this, "vendorId");
    __publicField$1(this, "productId");
    __publicField$1(this, "plugins");
    var _a, _b;
    let device = SCHEMA.validateSync(data);
    Object.assign(this, device);
    if (!this.socket)
      this.socket = socket$1(`device:${device.id}`);
    this.plugins = (_a = Singleton$1.shared.plugins) == null ? void 0 : _a.filter((plugin) => {
      var _a2;
      return (_a2 = plugin.deviceTypes) == null ? void 0 : _a2.includes(device.profile.type);
    });
    (_b = this.plugins) == null ? void 0 : _b.forEach((plugin) => {
      if (!plugin.hasDeviceSocket)
        return;
      let keyPath = plugin.name.split("/").map((key) => lodash$1.camelCase(key)).join(".");
      if (!lodash$1.get(this, "sockets." + keyPath)) {
        let pluginDeviceSocket = socket$1(`device:${this.id}/${plugin.name}`);
        lodash$1.set(this, "sockets." + keyPath, pluginDeviceSocket);
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
    }, __spreadValues$1({}, this));
    let newData = SCHEMA.validateSync(cleanData);
    Object.assign(this, newData);
  }
}
class ClientDeviceManager extends EventTarget {
  constructor() {
    super();
    __publicField$1(this, "_initialized", false);
    __publicField$1(this, "_devices", []);
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
    let device = this._devices.find((d2) => d2.id === deviceData.id);
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
React__default.createContext();
const DeviceContext = React__default.createContext();
function useDeviceContext() {
  const ctx = useContext(DeviceContext);
  if (!ctx)
    throw new Error("useDeviceContext can be used only inside a DeviceProvider");
  return ctx;
}
var jsxRuntime$3 = { exports: {} };
var reactJsxRuntime_production_min$3 = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$3 = Object.getOwnPropertySymbols;
var hasOwnProperty$7 = Object.prototype.hasOwnProperty;
var propIsEnumerable$3 = Object.prototype.propertyIsEnumerable;
function toObject$3(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative$3() {
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
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
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
shouldUseNative$3() ? Object.assign : function(target, source) {
  var from;
  var to = toObject$3(target);
  var symbols;
  for (var s2 = 1; s2 < arguments.length; s2++) {
    from = Object(arguments[s2]);
    for (var key in from) {
      if (hasOwnProperty$7.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols$3) {
      symbols = getOwnPropertySymbols$3(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable$3.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
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
var f$7 = React__default, g$5 = 60103;
reactJsxRuntime_production_min$3.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h$6 = Symbol.for;
  g$5 = h$6("react.element");
  reactJsxRuntime_production_min$3.Fragment = h$6("react.fragment");
}
var m$6 = f$7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n$8 = Object.prototype.hasOwnProperty, p$6 = { key: true, ref: true, __self: true, __source: true };
function q$3(c2, a2, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (l2 = a2.ref);
  for (b2 in a2)
    n$8.call(a2, b2) && !p$6.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: g$5, type: c2, key: e2, ref: l2, props: d2, _owner: m$6.current };
}
reactJsxRuntime_production_min$3.jsx = q$3;
reactJsxRuntime_production_min$3.jsxs = q$3;
{
  jsxRuntime$3.exports = reactJsxRuntime_production_min$3;
}
jsxRuntime$3.exports.jsx;
function useCallbackRef$1(r2) {
  const t2 = React.useRef(r2);
  return React.useEffect(() => {
    t2.current = r2;
  }), React.useMemo(() => (...e2) => {
    var r3;
    return (r3 = t2.current) === null || r3 === void 0 ? void 0 : r3.call(t2, ...e2);
  }, []);
}
function useControllableState({ prop: o2, defaultProp: r2, onChange: n2 = () => {
} }) {
  const [a2, u2] = function({ defaultProp: o3, onChange: r3 }) {
    const n3 = React.useState(o3), [a3] = n3, u3 = React.useRef(a3), c3 = useCallbackRef$1(r3);
    return React.useEffect(() => {
      u3.current !== a3 && (c3(a3), u3.current = a3);
    }, [a3, u3, c3]), n3;
  }({ defaultProp: r2, onChange: n2 }), c2 = o2 !== void 0, f2 = c2 ? o2 : a2, l2 = useCallbackRef$1(n2);
  return [f2, React.useCallback((e2) => {
    if (c2) {
      const t2 = e2, r3 = typeof e2 == "function" ? t2(o2) : e2;
      r3 !== o2 && l2(r3);
    } else
      u2(e2);
  }, [c2, o2, u2, l2])];
}
function composeRefs(...o2) {
  return (e2) => o2.forEach((o3) => function(o4, e3) {
    typeof o4 == "function" ? o4(e3) : o4 != null && (o4.current = e3);
  }(o3, e2));
}
function useComposedRefs(...e2) {
  return React.useCallback(composeRefs(...e2), e2);
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const Slot = /* @__PURE__ */ React.forwardRef((e2, o2) => {
  const _a = e2, { children: a2 } = _a, s2 = __objRest(_a, ["children"]);
  return React.Children.toArray(a2).some(l$1) ? /* @__PURE__ */ React.createElement(React.Fragment, null, React.Children.map(a2, (e3) => l$1(e3) ? /* @__PURE__ */ React.createElement(n$7, _extends({}, s2, { ref: o2 }), e3.props.children) : e3)) : /* @__PURE__ */ React.createElement(n$7, _extends({}, s2, { ref: o2 }), a2);
});
Slot.displayName = "Slot";
const n$7 = /* @__PURE__ */ React.forwardRef((r2, n2) => {
  const _a = r2, { children: l2 } = _a, a2 = __objRest(_a, ["children"]);
  return React.isValidElement(l2) ? /* @__PURE__ */ React.cloneElement(l2, __spreadProps(__spreadValues({}, o$4(a2, l2.props)), { ref: composeRefs(n2, l2.ref) })) : React.Children.count(l2) > 1 ? React.Children.only(null) : null;
});
n$7.displayName = "SlotClone";
const Slottable = ({ children: e2 }) => /* @__PURE__ */ React.createElement(React.Fragment, null, e2);
function l$1(e2) {
  return React.isValidElement(e2) && e2.type === Slottable;
}
function o$4(e2, t2) {
  const r2 = __spreadValues({}, t2);
  for (const n2 in t2) {
    const l2 = e2[n2], o2 = t2[n2];
    /^on[A-Z]/.test(n2) ? r2[n2] = (...e3) => {
      o2 == null || o2(...e3), l2 == null || l2(...e3);
    } : n2 === "style" ? r2[n2] = __spreadValues(__spreadValues({}, l2), o2) : n2 === "className" && (r2[n2] = [l2, o2].filter(Boolean).join(" "));
  }
  return __spreadValues(__spreadValues({}, e2), r2);
}
const Primitive = ["a", "button", "div", "h2", "h3", "img", "li", "nav", "ol", "p", "span", "svg", "ul"].reduce((o2, i2) => __spreadProps(__spreadValues({}, o2), { [i2]: /* @__PURE__ */ React.forwardRef((o3, m2) => {
  const _a = o3, { asChild: a2 } = _a, s2 = __objRest(_a, ["asChild"]), n2 = a2 ? Slot : i2;
  return React.useEffect(() => {
    window[Symbol.for("radix-ui")] = true;
  }, []), /* @__PURE__ */ React.createElement(n2, _extends({}, s2, { ref: m2 }));
}) }), {});
function composeEventHandlers(e2, n2, { checkForDefaultPrevented: t2 = true } = {}) {
  return function(r2) {
    if (e2 == null || e2(r2), t2 === false || !r2.defaultPrevented)
      return n2 == null ? void 0 : n2(r2);
  };
}
const useLayoutEffect = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? React.useLayoutEffect : () => {
};
const r$3 = React["useId".toString()] || (() => {
});
let n$6 = 0;
function useId(o2) {
  const [u2, i2] = React.useState(r$3());
  return useLayoutEffect(() => {
    o2 || i2((t2) => t2 != null ? t2 : String(n$6++));
  }, [o2]), o2 || (u2 ? `radix-${u2}` : "");
}
function createContext(t2, n2) {
  const o2 = /* @__PURE__ */ React.createContext(n2);
  function r2(t3) {
    const _a = t3, { children: n3 } = _a, r3 = __objRest(_a, ["children"]), c2 = React.useMemo(() => r3, Object.values(r3));
    return React.createElement(o2.Provider, { value: c2 }, n3);
  }
  return r2.displayName = t2 + "Provider", [r2, function(r3) {
    const c2 = React.useContext(o2);
    if (c2)
      return c2;
    if (n2 !== void 0)
      return n2;
    throw new Error(`\`${r3}\` must be used within \`${t2}\``);
  }];
}
function createContextScope(n2, o2 = []) {
  let r2 = [];
  const c2 = () => {
    const t2 = r2.map((t3) => /* @__PURE__ */ React.createContext(t3));
    return function(o3) {
      const r3 = (o3 == null ? void 0 : o3[n2]) || t2;
      return React.useMemo(() => ({ [`__scope${n2}`]: __spreadProps(__spreadValues({}, o3), { [n2]: r3 }) }), [o3, r3]);
    };
  };
  return c2.scopeName = n2, [function(t2, o3) {
    const c3 = /* @__PURE__ */ React.createContext(o3), u2 = r2.length;
    function s2(t3) {
      const _a = t3, { scope: o4, children: r3 } = _a, s3 = __objRest(_a, ["scope", "children"]), i2 = (o4 == null ? void 0 : o4[n2][u2]) || c3, a2 = React.useMemo(() => s3, Object.values(s3));
      return React.createElement(i2.Provider, { value: a2 }, r3);
    }
    return r2 = [...r2, o3], s2.displayName = t2 + "Provider", [s2, function(r3, s3) {
      const i2 = (s3 == null ? void 0 : s3[n2][u2]) || c3, a2 = React.useContext(i2);
      if (a2)
        return a2;
      if (o3 !== void 0)
        return o3;
      throw new Error(`\`${r3}\` must be used within \`${t2}\``);
    }];
  }, t$3(c2, ...o2)];
}
function t$3(...t2) {
  const n2 = t2[0];
  if (t2.length === 1)
    return n2;
  const o2 = () => {
    const o3 = t2.map((e2) => ({ useScope: e2(), scopeName: e2.scopeName }));
    return function(t3) {
      const r2 = o3.reduce((e2, { useScope: n3, scopeName: o4 }) => __spreadValues(__spreadValues({}, e2), n3(t3)[`__scope${o4}`]), {});
      return React.useMemo(() => ({ [`__scope${n2.scopeName}`]: r2 }), [r2]);
    };
  };
  return o2.scopeName = n2.scopeName, o2;
}
function useSize(r2) {
  const [i2, t2] = React.useState(void 0);
  return React.useEffect(() => {
    if (r2) {
      const e2 = new ResizeObserver((e3) => {
        if (!Array.isArray(e3))
          return;
        if (!e3.length)
          return;
        const i3 = e3[0];
        let o2, n2;
        if ("borderBoxSize" in i3) {
          const e4 = i3.borderBoxSize, r3 = Array.isArray(e4) ? e4[0] : e4;
          o2 = r3.inlineSize, n2 = r3.blockSize;
        } else {
          const e4 = r2.getBoundingClientRect();
          o2 = e4.width, n2 = e4.height;
        }
        t2({ width: o2, height: n2 });
      });
      return e2.observe(r2, { box: "border-box" }), () => e2.unobserve(r2);
    }
    t2(void 0);
  }, [r2]), i2;
}
function usePrevious(r2) {
  const u2 = React.useRef({ value: r2, previous: r2 });
  return React.useMemo(() => (u2.current.value !== r2 && (u2.current.previous = u2.current.value, u2.current.value = r2), u2.current.previous), [r2]);
}
function useDirection(t2, n2) {
  const [r2, o2] = React.useState("ltr"), [i2, u2] = React.useState(), c2 = React.useRef(0);
  return React.useEffect(() => {
    if (n2 === void 0 && t2 != null && t2.parentElement) {
      const e2 = getComputedStyle(t2.parentElement);
      u2(e2);
    }
  }, [t2, n2]), React.useEffect(() => (n2 === void 0 && function e2() {
    c2.current = requestAnimationFrame(() => {
      const t3 = i2 == null ? void 0 : i2.direction;
      t3 && o2(t3), e2();
    });
  }(), () => cancelAnimationFrame(c2.current)), [i2, n2, o2]), n2 || r2;
}
function clamp(t2, [a2, n2]) {
  return Math.min(n2, Math.max(a2, t2));
}
const [i$5, a$2] = createContext("Label", { id: void 0, controlRef: { current: null } });
const Label$1 = /* @__PURE__ */ React.forwardRef((o2, a2) => {
  const _a = o2, { htmlFor: c2, id: u2 } = _a, s2 = __objRest(_a, ["htmlFor", "id"]), d2 = React.useRef(null), f2 = React.useRef(null), m2 = useComposedRefs(a2, f2), b2 = useId(u2);
  return React.useEffect(() => {
    if (c2) {
      const e2 = document.getElementById(c2);
      if (f2.current && e2) {
        const t2 = () => e2.getAttribute("aria-labelledby"), r2 = [b2, t2()].filter(Boolean).join(" ");
        return e2.setAttribute("aria-labelledby", r2), d2.current = e2, () => {
          var r3;
          const o3 = (r3 = t2()) === null || r3 === void 0 ? void 0 : r3.replace(b2, "");
          o3 === "" ? e2.removeAttribute("aria-labelledby") : o3 && e2.setAttribute("aria-labelledby", o3);
        };
      }
    }
  }, [b2, c2]), /* @__PURE__ */ React.createElement(i$5, { id: b2, controlRef: d2 }, /* @__PURE__ */ React.createElement(Primitive.span, _extends({ role: "label", id: b2 }, s2, { ref: m2, onMouseDown: (e2) => {
    var t2;
    (t2 = o2.onMouseDown) === null || t2 === void 0 || t2.call(o2, e2), !e2.defaultPrevented && e2.detail > 1 && e2.preventDefault();
  }, onClick: (e2) => {
    var t2;
    if ((t2 = o2.onClick) === null || t2 === void 0 || t2.call(o2, e2), !d2.current || e2.defaultPrevented)
      return;
    const r2 = d2.current.contains(e2.target), l2 = e2.isTrusted === true;
    !r2 && l2 && (d2.current.click(), d2.current.focus());
  } })));
});
const useLabelContext = (e2) => {
  const t2 = a$2("LabelConsumer"), { controlRef: r2 } = t2;
  return React.useEffect(() => {
    e2 && (r2.current = e2);
  }, [e2, r2]), t2.id;
};
const Root$5 = Label$1;
var isProduction = true;
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x2) {
    }
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var FormikContext = /* @__PURE__ */ createContext$1(void 0);
FormikContext.displayName = "FormikContext";
FormikContext.Provider;
FormikContext.Consumer;
function useFormikContext() {
  var formik = useContext(FormikContext);
  !!!formik ? warning(false) : void 0;
  return formik;
}
var Form = /* @__PURE__ */ forwardRef(function(props, ref) {
  var action = props.action, rest = _objectWithoutPropertiesLoose(props, ["action"]);
  var _action = action != null ? action : "#";
  var _useFormikContext = useFormikContext(), handleReset = _useFormikContext.handleReset, handleSubmit = _useFormikContext.handleSubmit;
  return createElement("form", Object.assign({
    onSubmit: handleSubmit,
    ref,
    onReset: handleReset,
    action: _action
  }, rest));
});
Form.displayName = "Form";
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (parentNode === void 0) {
    parentNode = getDefaultParent(originalTarget);
  }
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.isArray(originalTarget) ? originalTarget : [originalTarget];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || targets.indexOf(parent) >= 0) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        var attr = node.getAttribute("aria-hidden");
        var alreadyHidden = attr !== null && attr !== "false";
        var counterValue = (counterMap.get(node) || 0) + 1;
        var markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenNodes.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledNodes.set(node, true);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "true");
        }
        if (!alreadyHidden) {
          node.setAttribute("aria-hidden", "true");
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute("aria-hidden");
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign$1.apply(this, arguments);
};
function __rest$1(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
}
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
}
function ItoI(a2) {
  return a2;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x2) {
          return x2 !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x2) {
          return cb(x2);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x2) {
          pendingQueue.push(x2);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = useState(function() {
    return {
      value: initialValue,
      callback,
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef(defaultValue, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
}
var nothing = function() {
  return;
};
var RemoveScroll = React.forwardRef(function(props, parentRef) {
  var ref = React.useRef(null);
  var _a = React.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, rest = __rest$1(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([
    ref,
    parentRef
  ]);
  var containerProps = __assign$1({}, rest, callbacks);
  return React.createElement(React.Fragment, null, enabled && React.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref }), forwardProps ? React.cloneElement(React.Children.only(children), __assign$1({}, containerProps, { ref: containerRef })) : React.createElement(Container, __assign$1({}, containerProps, { className, ref: containerRef }), children));
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles) {
    React.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, []);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles = _a.styles;
    useStyle(styles);
    return null;
  };
  return Sheet;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse$1 = function(x2) {
  return parseInt(x2 || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [
    parse$1(left),
    parse$1(top),
    parse$1(right)
  ];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  ." + noScrollbarsClassName + " {\n   overflow: hidden " + important + ";\n   padding-right: " + gap + "px " + important + ";\n  }\n  body {\n    overflow: hidden " + important + ";\n    " + [
    allowRelative && "position: relative " + important + ";",
    gapMode === "margin" && "\n    padding-left: " + left + "px;\n    padding-top: " + top + "px;\n    padding-right: " + right + "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: " + gap + "px " + important + ";\n    ",
    gapMode === "padding" && "padding-right: " + gap + "px " + important + ";"
  ].filter(Boolean).join("") + "\n  }\n  \n  ." + zeroRightClassName + " {\n    right: " + gap + "px " + important + ";\n  }\n  \n  ." + fullWidthClassName + " {\n    margin-right: " + gap + "px " + important + ";\n  }\n  \n  ." + zeroRightClassName + " ." + zeroRightClassName + " {\n    right: 0 " + important + ";\n  }\n  \n  ." + fullWidthClassName + " ." + fullWidthClassName + " {\n    margin-right: 0 " + important + ";\n  }\n  \n  body {\n    " + removedBarSizeVariable + ": " + gap + "px;\n  }\n";
};
var RemoveScrollBar = function(props) {
  var _a = React.useState(getGapWidth(props.gapMode)), gap = _a[0], setGap = _a[1];
  React.useEffect(function() {
    setGap(getGapWidth(props.gapMode));
  }, [props.gapMode]);
  var noRelative = props.noRelative, noImportant = props.noImportant, _b = props.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  return React.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var elementCouldBeVScrolled = function(node) {
  var styles = window.getComputedStyle(node);
  return styles.overflowY !== "hidden" && !(styles.overflowY === styles.overflowX && styles.overflowY === "visible");
};
var elementCouldBeHScrolled = function(node) {
  var styles = window.getComputedStyle(node);
  if (node.type === "range") {
    return true;
  }
  return styles.overflowX !== "hidden" && !(styles.overflowY === styles.overflowX && styles.overflowX === "visible");
};
var locationCouldBeScrolled = function(axis, node) {
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), s2 = _a[1], d2 = _a[2];
      if (s2 > d2) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
  if (isDeltaPositive && (noOverscroll && availableScroll === 0 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && availableScrollTop === 0 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x2, y2) {
  return x2[0] === y2[0] && x2[1] === y2[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-" + id + " {pointer-events: none;}\n  .allow-interactivity-" + id + " {pointer-events: all;}\n";
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React.useRef([]);
  var touchStartRef = React.useRef([0, 0]);
  var activeAxis = React.useRef();
  var id = React.useState(idCounter++)[0];
  var Style2 = React.useState(function() {
    return styleSingleton();
  })[0];
  var lastProps = React.useRef(props);
  React.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-" + id);
      var allow_1 = [
        props.lockRef.current
      ].concat((props.shards || []).map(extractRef)).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-" + id);
      });
      return function() {
        document.body.classList.remove("block-interactivity-" + id);
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-" + id);
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e2) {
      return e2.name === event.type && e2.target === event.target && deltaCompare(e2.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        event.preventDefault();
      }
    }
  }, []);
  var shouldCancel = React.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e2) {
        return e2 !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React.createElement(React.Fragment, null, inert ? React.createElement(Style2, { styles: generateStyle(id) }) : null, removeScrollBar ? React.createElement(RemoveScrollBar, { gapMode: "margin" }) : null);
}
var SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = React.forwardRef(function(props, ref) {
  return React.createElement(RemoveScroll, __assign$1({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var o$3 = ReactRemoveScroll;
let t$2 = 0;
function useFocusGuards() {
  React.useEffect(() => {
    var e2, n2;
    const r2 = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", (e2 = r2[0]) !== null && e2 !== void 0 ? e2 : o$2()), document.body.insertAdjacentElement("beforeend", (n2 = r2[1]) !== null && n2 !== void 0 ? n2 : o$2()), t$2++, () => {
      t$2 === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e3) => e3.remove()), t$2--;
    };
  }, []);
}
function o$2() {
  const e2 = document.createElement("span");
  return e2.setAttribute("data-radix-focus-guard", ""), e2.tabIndex = 0, e2.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e2;
}
const Presence = (u2) => {
  const { present: o2, children: i2 } = u2, s2 = function(n2) {
    const [u3, o3] = React.useState(), i3 = React.useRef({}), s3 = React.useRef(n2), c3 = React.useRef("none"), a3 = n2 ? "mounted" : "unmounted", [d2, m2] = function(e2, n3) {
      return React.useReducer((e3, t2) => {
        const r2 = n3[e3][t2];
        return r2 != null ? r2 : e3;
      }, e2);
    }(a3, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
    return React.useEffect(() => {
      const e2 = r$2(i3.current);
      c3.current = d2 === "mounted" ? e2 : "none";
    }, [d2]), useLayoutEffect(() => {
      const e2 = i3.current, t2 = s3.current;
      if (t2 !== n2) {
        const u4 = c3.current, o4 = r$2(e2);
        if (n2)
          m2("MOUNT");
        else if (o4 === "none" || (e2 == null ? void 0 : e2.display) === "none")
          m2("UNMOUNT");
        else {
          const e3 = u4 !== o4;
          m2(t2 && e3 ? "ANIMATION_OUT" : "UNMOUNT");
        }
        s3.current = n2;
      }
    }, [n2, m2]), useLayoutEffect(() => {
      if (u3) {
        const e2 = (e3) => {
          const n4 = r$2(i3.current).includes(e3.animationName);
          e3.target === u3 && n4 && m2("ANIMATION_END");
        }, n3 = (e3) => {
          e3.target === u3 && (c3.current = r$2(i3.current));
        };
        return u3.addEventListener("animationstart", n3), u3.addEventListener("animationcancel", e2), u3.addEventListener("animationend", e2), () => {
          u3.removeEventListener("animationstart", n3), u3.removeEventListener("animationcancel", e2), u3.removeEventListener("animationend", e2);
        };
      }
      m2("ANIMATION_END");
    }, [u3, m2]), { isPresent: ["mounted", "unmountSuspended"].includes(d2), ref: React.useCallback((e2) => {
      e2 && (i3.current = getComputedStyle(e2)), o3(e2);
    }, []) };
  }(o2), c2 = typeof i2 == "function" ? i2({ present: s2.isPresent }) : React.Children.only(i2), a2 = useComposedRefs(s2.ref, c2.ref);
  return typeof i2 == "function" || s2.isPresent ? /* @__PURE__ */ React.cloneElement(c2, { ref: a2 }) : null;
};
function r$2(e2) {
  return (e2 == null ? void 0 : e2.animationName) || "none";
}
Presence.displayName = "Presence";
const Portal = /* @__PURE__ */ React.forwardRef((a2, i2) => {
  var n2, d2;
  const _a = a2, { containerRef: s2, style: u2 } = _a, c2 = __objRest(_a, ["containerRef", "style"]), m2 = (n2 = s2 == null ? void 0 : s2.current) !== null && n2 !== void 0 ? n2 : globalThis === null || globalThis === void 0 || (d2 = globalThis.document) === null || d2 === void 0 ? void 0 : d2.body, [, f2] = React.useState({});
  return useLayoutEffect(() => {
    f2({});
  }, []), m2 ? /* @__PURE__ */ e$4.createPortal(/* @__PURE__ */ React.createElement(Primitive.div, _extends({ "data-radix-portal": "" }, c2, { ref: i2, style: m2 === document.body ? __spreadValues({ position: "absolute", top: 0, left: 0, zIndex: 2147483647 }, u2) : void 0 })), m2) : null;
});
const c$3 = { bubbles: false, cancelable: true };
const FocusScope = /* @__PURE__ */ React.forwardRef((i2, f2) => {
  const _a = i2, { loop: l2 = false, trapped: m2 = false, onMountAutoFocus: p2, onUnmountAutoFocus: v2 } = _a, E2 = __objRest(_a, ["loop", "trapped", "onMountAutoFocus", "onUnmountAutoFocus"]), [F, S2] = React.useState(null), b2 = useCallbackRef$1(p2), T2 = useCallbackRef$1(v2), y2 = React.useRef(null), L2 = useComposedRefs(f2, (e2) => S2(e2)), h = React.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  React.useEffect(() => {
    if (m2) {
      let e2 = function(e3) {
        if (h.paused || !F)
          return;
        const t3 = e3.target;
        F.contains(t3) ? y2.current = t3 : a$1(y2.current, { select: true });
      }, t2 = function(e3) {
        !h.paused && F && (F.contains(e3.relatedTarget) || a$1(y2.current, { select: true }));
      };
      return document.addEventListener("focusin", e2), document.addEventListener("focusout", t2), () => {
        document.removeEventListener("focusin", e2), document.removeEventListener("focusout", t2);
      };
    }
  }, [m2, F, h.paused]), React.useEffect(() => {
    if (F) {
      d$3.add(h);
      const t2 = document.activeElement;
      if (!F.contains(t2)) {
        const n2 = new Event("focusScope.autoFocusOnMount", c$3);
        F.addEventListener("focusScope.autoFocusOnMount", b2), F.dispatchEvent(n2), n2.defaultPrevented || (!function(e3, { select: t3 = false } = {}) {
          const n3 = document.activeElement;
          for (const o2 of e3)
            if (a$1(o2, { select: t3 }), document.activeElement !== n3)
              return;
        }((e2 = r$1(F), e2.filter((e3) => e3.tagName !== "A")), { select: true }), document.activeElement === t2 && a$1(F));
      }
      return () => {
        F.removeEventListener("focusScope.autoFocusOnMount", b2), setTimeout(() => {
          const e3 = new Event("focusScope.autoFocusOnUnmount", c$3);
          F.addEventListener("focusScope.autoFocusOnUnmount", T2), F.dispatchEvent(e3), e3.defaultPrevented || a$1(t2 != null ? t2 : document.body, { select: true }), F.removeEventListener("focusScope.autoFocusOnUnmount", T2), d$3.remove(h);
        }, 0);
      };
    }
    var e2;
  }, [F, b2, T2, h]);
  const N = React.useCallback((e2) => {
    if (!l2 && !m2)
      return;
    if (h.paused)
      return;
    const t2 = e2.key === "Tab" && !e2.altKey && !e2.ctrlKey && !e2.metaKey, n2 = document.activeElement;
    if (t2 && n2) {
      const t3 = e2.currentTarget, [o2, u2] = function(e3) {
        const t4 = r$1(e3), n3 = s$1(t4, e3), o3 = s$1(t4.reverse(), e3);
        return [n3, o3];
      }(t3);
      o2 && u2 ? e2.shiftKey || n2 !== u2 ? e2.shiftKey && n2 === o2 && (e2.preventDefault(), l2 && a$1(u2, { select: true })) : (e2.preventDefault(), l2 && a$1(o2, { select: true })) : n2 === t3 && e2.preventDefault();
    }
  }, [l2, m2, h.paused]);
  return React.createElement(Primitive.div, _extends({ tabIndex: -1 }, E2, { ref: L2, onKeyDown: N }));
});
function r$1(e2) {
  const t2 = [], n2 = document.createTreeWalker(e2, NodeFilter.SHOW_ELEMENT, { acceptNode: (e3) => {
    const t3 = e3.tagName === "INPUT" && e3.type === "hidden";
    return e3.disabled || e3.hidden || t3 ? NodeFilter.FILTER_SKIP : e3.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n2.nextNode(); )
    t2.push(n2.currentNode);
  return t2;
}
function s$1(e2, t2) {
  for (const n2 of e2)
    if (!i$4(n2, { upTo: t2 }))
      return n2;
}
function i$4(e2, { upTo: t2 }) {
  if (getComputedStyle(e2).visibility === "hidden")
    return true;
  for (; e2; ) {
    if (t2 !== void 0 && e2 === t2)
      return false;
    if (getComputedStyle(e2).display === "none")
      return true;
    e2 = e2.parentElement;
  }
  return false;
}
function a$1(e2, { select: t2 = false } = {}) {
  if (e2 && e2.focus) {
    const n2 = document.activeElement;
    e2.focus({ preventScroll: true }), e2 !== n2 && function(e3) {
      return e3 instanceof HTMLInputElement && "select" in e3;
    }(e2) && t2 && e2.select();
  }
}
const d$3 = function() {
  let e2 = [];
  return { add(t2) {
    const n2 = e2[0];
    t2 !== n2 && (n2 == null || n2.pause()), e2 = f$6(e2, t2), e2.unshift(t2);
  }, remove(t2) {
    var n2;
    e2 = f$6(e2, t2), (n2 = e2[0]) === null || n2 === void 0 || n2.resume();
  } };
}();
function f$6(e2, t2) {
  const n2 = [...e2], o2 = n2.indexOf(t2);
  return o2 !== -1 && n2.splice(o2, 1), n2;
}
function useEscapeKeydown(n2) {
  const o2 = useCallbackRef$1(n2);
  React.useEffect(() => {
    const e2 = (e3) => {
      e3.key === "Escape" && o2(e3);
    };
    return document.addEventListener("keydown", e2), () => document.removeEventListener("keydown", e2);
  }, [o2]);
}
let n$5, o$1 = 0;
function useBodyPointerEvents({ disabled: r2 }) {
  const i2 = React.useRef(false);
  useLayoutEffect(() => {
    if (r2) {
      let e2 = function() {
        o$1--, o$1 === 0 && (document.body.style.pointerEvents = n$5);
      }, t2 = function(e3) {
        i2.current = e3.pointerType !== "mouse";
      };
      return o$1 === 0 && (n$5 = document.body.style.pointerEvents), document.body.style.pointerEvents = "none", o$1++, document.addEventListener("pointerup", t2), () => {
        i2.current ? document.addEventListener("click", e2, { once: true }) : e2(), document.removeEventListener("pointerup", t2);
      };
    }
  }, [r2]);
}
const u$2 = /* @__PURE__ */ React.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set() });
const DismissableLayer = /* @__PURE__ */ React.forwardRef((l2, m2) => {
  const _a = l2, { disableOutsidePointerEvents: f2 = false, onEscapeKeyDown: p2, onPointerDownOutside: v2, onFocusOutside: b2, onInteractOutside: E2, onDismiss: y2 } = _a, w2 = __objRest(_a, ["disableOutsidePointerEvents", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss"]), h = React.useContext(u$2), [D2, x2] = React.useState(null), [, C2] = React.useState({}), L2 = useComposedRefs(m2, (e2) => x2(e2)), P2 = Array.from(h.layers), [O2] = [...h.layersWithOutsidePointerEventsDisabled].slice(-1), g2 = P2.indexOf(O2), B = D2 ? P2.indexOf(D2) : -1, R2 = h.layersWithOutsidePointerEventsDisabled.size > 0, F = B >= g2, S2 = function(e2) {
    const n2 = useCallbackRef$1(e2), r2 = React.useRef(false);
    return React.useEffect(() => {
      const e3 = (e4) => {
        if (e4.target && !r2.current) {
          d$2("dismissableLayer.pointerDownOutside", n2, { originalEvent: e4 });
        }
        r2.current = false;
      }, t2 = window.setTimeout(() => {
        document.addEventListener("pointerdown", e3);
      }, 0);
      return () => {
        window.clearTimeout(t2), document.removeEventListener("pointerdown", e3);
      };
    }, [n2]), { onPointerDownCapture: () => r2.current = true };
  }((e2) => {
    const t2 = e2.target, n2 = [...h.branches].some((e3) => e3.contains(t2));
    F && !n2 && (v2 == null || v2(e2), E2 == null || E2(e2), e2.defaultPrevented || y2 == null || y2());
  }), W = function(e2) {
    const n2 = useCallbackRef$1(e2), r2 = React.useRef(false);
    return React.useEffect(() => {
      const e3 = (e4) => {
        if (e4.target && !r2.current) {
          d$2("dismissableLayer.focusOutside", n2, { originalEvent: e4 });
        }
      };
      return document.addEventListener("focusin", e3), () => document.removeEventListener("focusin", e3);
    }, [n2]), { onFocusCapture: () => r2.current = true, onBlurCapture: () => r2.current = false };
  }((e2) => {
    const t2 = e2.target;
    [...h.branches].some((e3) => e3.contains(t2)) || (b2 == null || b2(e2), E2 == null || E2(e2), e2.defaultPrevented || y2 == null || y2());
  });
  return useEscapeKeydown((e2) => {
    B === h.layers.size - 1 && (p2 == null || p2(e2), e2.defaultPrevented || y2 == null || y2());
  }), useBodyPointerEvents({ disabled: f2 }), React.useEffect(() => {
    D2 && (f2 && h.layersWithOutsidePointerEventsDisabled.add(D2), h.layers.add(D2), c$2());
  }, [D2, f2, h]), React.useEffect(() => () => {
    D2 && (h.layers.delete(D2), h.layersWithOutsidePointerEventsDisabled.delete(D2), c$2());
  }, [D2, h]), React.useEffect(() => {
    const e2 = () => C2({});
    return document.addEventListener("dismissableLayer.update", e2), () => document.removeEventListener("dismissableLayer.update", e2);
  }, []), /* @__PURE__ */ React.createElement(Primitive.div, _extends({}, w2, { ref: L2, style: __spreadValues({ pointerEvents: R2 ? F ? "auto" : "none" : void 0 }, l2.style), onFocusCapture: composeEventHandlers(l2.onFocusCapture, W.onFocusCapture), onBlurCapture: composeEventHandlers(l2.onBlurCapture, W.onBlurCapture), onPointerDownCapture: composeEventHandlers(l2.onPointerDownCapture, S2.onPointerDownCapture) }));
});
function c$2() {
  const e2 = new Event("dismissableLayer.update");
  document.dispatchEvent(e2);
}
function d$2(e2, t2, n2) {
  const r2 = n2.originalEvent.target, s2 = new CustomEvent(e2, { bubbles: false, cancelable: true, detail: n2 });
  return t2 && r2.addEventListener(e2, t2, { once: true }), !r2.dispatchEvent(s2);
}
const e$2 = "horizontal", n$4 = ["horizontal", "vertical"];
const Separator$1 = /* @__PURE__ */ React.forwardRef((n2, a2) => {
  const _a = n2, { decorative: p2, orientation: l2 = e$2 } = _a, c2 = __objRest(_a, ["decorative", "orientation"]), s2 = i$3(l2) ? l2 : e$2, u2 = p2 ? { role: "none" } : { "aria-orientation": s2 === "vertical" ? s2 : void 0, role: "separator" };
  return React.createElement(Primitive.div, _extends({ "data-orientation": s2 }, u2, c2, { ref: a2 }));
});
function i$3(r2) {
  return n$4.includes(r2);
}
Separator$1.propTypes = { orientation(r2, o2, t2) {
  const n2 = r2[o2], a2 = String(n2);
  return n2 && !i$3(n2) ? new Error(function(r3, o3) {
    return `Invalid prop \`orientation\` of value \`${r3}\` supplied to \`${o3}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${e$2}\`.`;
  }(a2, t2)) : null;
} };
const Root$4 = Separator$1;
function observeElementRect(n2, o2) {
  const i2 = e$1.get(n2);
  return i2 === void 0 ? (e$1.set(n2, { rect: {}, callbacks: [o2] }), e$1.size === 1 && (t$1 = requestAnimationFrame(c$1))) : (i2.callbacks.push(o2), o2(n2.getBoundingClientRect())), () => {
    const c2 = e$1.get(n2);
    if (c2 === void 0)
      return;
    const i3 = c2.callbacks.indexOf(o2);
    i3 > -1 && c2.callbacks.splice(i3, 1), c2.callbacks.length === 0 && (e$1.delete(n2), e$1.size === 0 && cancelAnimationFrame(t$1));
  };
}
let t$1;
const e$1 = /* @__PURE__ */ new Map();
function c$1() {
  const n2 = [];
  e$1.forEach((t2, e2) => {
    const c2 = e2.getBoundingClientRect();
    var o2, i2;
    o2 = t2.rect, i2 = c2, (o2.width !== i2.width || o2.height !== i2.height || o2.top !== i2.top || o2.right !== i2.right || o2.bottom !== i2.bottom || o2.left !== i2.left) && (t2.rect = c2, n2.push(t2));
  }), n2.forEach((t2) => {
    t2.callbacks.forEach((e2) => e2(t2.rect));
  }), t$1 = requestAnimationFrame(c$1);
}
function useRect(e2) {
  const [o2, c2] = React.useState();
  return React.useEffect(() => {
    if (e2) {
      const r2 = observeElementRect(e2, c2);
      return () => {
        c2(void 0), r2();
      };
    }
  }, [e2]), o2;
}
function getPlacementData({ anchorRect: p2, popperSize: c2, arrowSize: f2, arrowOffset: l2 = 0, side: d2, sideOffset: h = 0, align: x2, alignOffset: g2 = 0, shouldAvoidCollisions: u2 = true, collisionBoundariesRect: w2, collisionTolerance: m2 = 0 }) {
  if (!p2 || !c2 || !w2)
    return { popperStyles: o, arrowStyles: n$3 };
  const y2 = function(e2, r2, o2 = 0, n2 = 0, i2) {
    const p3 = i2 ? i2.height : 0, a2 = t(r2, e2, "x"), s2 = t(r2, e2, "y"), c3 = s2.before - o2 - p3, f3 = s2.after + o2 + p3, l3 = a2.before - o2 - p3, d3 = a2.after + o2 + p3;
    return { top: { start: { x: a2.start + n2, y: c3 }, center: { x: a2.center, y: c3 }, end: { x: a2.end - n2, y: c3 } }, right: { start: { x: d3, y: s2.start + n2 }, center: { x: d3, y: s2.center }, end: { x: d3, y: s2.end - n2 } }, bottom: { start: { x: a2.start + n2, y: f3 }, center: { x: a2.center, y: f3 }, end: { x: a2.end - n2, y: f3 } }, left: { start: { x: l3, y: s2.start + n2 }, center: { x: l3, y: s2.center }, end: { x: l3, y: s2.end - n2 } } };
  }(c2, p2, h, g2, f2), b2 = y2[d2][x2];
  if (u2 === false) {
    const t2 = e(b2);
    let o2 = n$3;
    f2 && (o2 = i$2({ popperSize: c2, arrowSize: f2, arrowOffset: l2, side: d2, align: x2 }));
    return { popperStyles: __spreadProps(__spreadValues({}, t2), { "--radix-popper-transform-origin": r(c2, d2, x2, l2, f2) }), arrowStyles: o2, placedSide: d2, placedAlign: x2 };
  }
  const S2 = DOMRect.fromRect(__spreadValues(__spreadValues({}, c2), b2)), $ = (O2 = w2, z2 = m2, DOMRect.fromRect({ width: O2.width - 2 * z2, height: O2.height - 2 * z2, x: O2.left + z2, y: O2.top + z2 }));
  var O2, z2;
  const R2 = s(S2, $), M = y2[a(d2)][x2], D2 = function(t2, e2, r2) {
    const o2 = a(t2);
    return e2[t2] && !r2[o2] ? o2 : t2;
  }(d2, R2, s(DOMRect.fromRect(__spreadValues(__spreadValues({}, c2), M)), $)), A2 = function(t2, e2, r2, o2, n2) {
    const i2 = r2 === "top" || r2 === "bottom", p3 = i2 ? "left" : "top", a2 = i2 ? "right" : "bottom", s2 = i2 ? "width" : "height", c3 = e2[s2] > t2[s2];
    if ((o2 === "start" || o2 === "center") && (n2[p3] && c3 || n2[a2] && !c3))
      return "end";
    if ((o2 === "end" || o2 === "center") && (n2[a2] && c3 || n2[p3] && !c3))
      return "start";
    return o2;
  }(c2, p2, d2, x2, R2), I = e(y2[D2][A2]);
  let C2 = n$3;
  f2 && (C2 = i$2({ popperSize: c2, arrowSize: f2, arrowOffset: l2, side: D2, align: A2 }));
  return { popperStyles: __spreadProps(__spreadValues({}, I), { "--radix-popper-transform-origin": r(c2, D2, A2, l2, f2) }), arrowStyles: C2, placedSide: D2, placedAlign: A2 };
}
function t(t2, e2, r2) {
  const o2 = t2[r2 === "x" ? "left" : "top"], n2 = r2 === "x" ? "width" : "height", i2 = t2[n2], p2 = e2[n2];
  return { before: o2 - p2, start: o2, center: o2 + (i2 - p2) / 2, end: o2 + i2 - p2, after: o2 + i2 };
}
function e(t2) {
  return { position: "absolute", top: 0, left: 0, minWidth: "max-content", willChange: "transform", transform: `translate3d(${Math.round(t2.x + window.scrollX)}px, ${Math.round(t2.y + window.scrollY)}px, 0)` };
}
function r(t2, e2, r2, o2, n2) {
  const i2 = e2 === "top" || e2 === "bottom", p2 = n2 ? n2.width : 0, a2 = n2 ? n2.height : 0, s2 = p2 / 2 + o2;
  let c2 = "", f2 = "";
  return i2 ? (c2 = { start: `${s2}px`, center: "center", end: t2.width - s2 + "px" }[r2], f2 = e2 === "top" ? `${t2.height + a2}px` : -a2 + "px") : (c2 = e2 === "left" ? `${t2.width + a2}px` : -a2 + "px", f2 = { start: `${s2}px`, center: "center", end: t2.height - s2 + "px" }[r2]), `${c2} ${f2}`;
}
const o = { position: "fixed", top: 0, left: 0, opacity: 0, transform: "translate3d(0, -200%, 0)" }, n$3 = { position: "absolute", opacity: 0 };
function i$2({ popperSize: t2, arrowSize: e2, arrowOffset: r2, side: o2, align: n2 }) {
  const i2 = (t2.width - e2.width) / 2, a2 = (t2.height - e2.width) / 2, s2 = { top: 0, right: 90, bottom: 180, left: -90 }[o2], c2 = Math.max(e2.width, e2.height), f2 = { width: `${c2}px`, height: `${c2}px`, transform: `rotate(${s2}deg)`, willChange: "transform", position: "absolute", [o2]: "100%", direction: p$5(o2, n2) };
  return o2 !== "top" && o2 !== "bottom" || (n2 === "start" && (f2.left = `${r2}px`), n2 === "center" && (f2.left = `${i2}px`), n2 === "end" && (f2.right = `${r2}px`)), o2 !== "left" && o2 !== "right" || (n2 === "start" && (f2.top = `${r2}px`), n2 === "center" && (f2.top = `${a2}px`), n2 === "end" && (f2.bottom = `${r2}px`)), f2;
}
function p$5(t2, e2) {
  return (t2 !== "top" && t2 !== "right" || e2 !== "end") && (t2 !== "bottom" && t2 !== "left" || e2 === "end") ? "ltr" : "rtl";
}
function a(t2) {
  return { top: "bottom", right: "left", bottom: "top", left: "right" }[t2];
}
function s(t2, e2) {
  return { top: t2.top < e2.top, right: t2.right > e2.right, bottom: t2.bottom > e2.bottom, left: t2.left < e2.left };
}
const [c, l] = createContextScope("Popper");
const [f$5, d$1] = c("Popper");
const Popper = (e2) => {
  const { __scopePopper: o2, children: r2 } = e2, [t2, n2] = React.useState(null);
  return React.createElement(f$5, { scope: o2, anchor: t2, onAnchorChange: n2 }, r2);
};
const PopperAnchor = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { __scopePopper: t2, virtualRef: n2 } = _a, p2 = __objRest(_a, ["__scopePopper", "virtualRef"]), c2 = d$1("PopperAnchor", t2), l2 = React.useRef(null), f2 = useComposedRefs(r2, l2);
  return React.useEffect(() => {
    c2.onAnchorChange((n2 == null ? void 0 : n2.current) || l2.current);
  }), n2 ? null : /* @__PURE__ */ React.createElement(Primitive.div, _extends({}, p2, { ref: f2 }));
});
const [u$1, m$5] = c("PopperContent");
const PopperContent = /* @__PURE__ */ React.forwardRef((e2, n2) => {
  const _a = e2, { __scopePopper: c2, side: l2 = "bottom", sideOffset: f2, align: m2 = "center", alignOffset: w2, collisionTolerance: h, avoidCollisions: x2 = true } = _a, v2 = __objRest(_a, ["__scopePopper", "side", "sideOffset", "align", "alignOffset", "collisionTolerance", "avoidCollisions"]), P2 = d$1("PopperContent", c2), [A2, g2] = React.useState(), E2 = useRect(P2.anchor), [y2, C2] = React.useState(null), S2 = useSize(y2), [R2, O2] = React.useState(null), _2 = useSize(R2), b2 = useComposedRefs(n2, (e3) => C2(e3)), z2 = function() {
    const [e3, o2] = React.useState(void 0);
    return React.useEffect(() => {
      let e4;
      function r2() {
        o2({ width: window.innerWidth, height: window.innerHeight });
      }
      function t2() {
        window.clearTimeout(e4), e4 = window.setTimeout(r2, 100);
      }
      return r2(), window.addEventListener("resize", t2), () => window.removeEventListener("resize", t2);
    }, []), e3;
  }(), T2 = z2 ? DOMRect.fromRect(__spreadProps(__spreadValues({}, z2), { x: 0, y: 0 })) : void 0, { popperStyles: k2, arrowStyles: L2, placedSide: B, placedAlign: D2 } = getPlacementData({ anchorRect: E2, popperSize: S2, arrowSize: _2, arrowOffset: A2, side: l2, sideOffset: f2, align: m2, alignOffset: w2, shouldAvoidCollisions: x2, collisionBoundariesRect: T2, collisionTolerance: h }), H2 = B !== void 0;
  return React.createElement("div", { style: k2, "data-radix-popper-content-wrapper": "" }, /* @__PURE__ */ React.createElement(u$1, { scope: c2, arrowStyles: L2, onArrowChange: O2, onArrowOffsetChange: g2 }, /* @__PURE__ */ React.createElement(Primitive.div, _extends({ "data-side": B, "data-align": D2 }, v2, { style: __spreadProps(__spreadValues({}, v2.style), { animation: H2 ? void 0 : "none" }), ref: b2 }))));
});
const Root$3 = Popper;
const Anchor = PopperAnchor;
const Content$1 = PopperContent;
const [u, p$4] = createContextScope("Checkbox");
const [m$4, b$1] = u("Checkbox");
const Checkbox = /* @__PURE__ */ React.forwardRef((t2, o2) => {
  const _a = t2, { __scopeCheckbox: a2, "aria-labelledby": i2, name: u2, checked: p2, defaultChecked: b2, required: k2, disabled: C2, value: y2 = "on", onCheckedChange: v2 } = _a, E2 = __objRest(_a, ["__scopeCheckbox", "aria-labelledby", "name", "checked", "defaultChecked", "required", "disabled", "value", "onCheckedChange"]), [w2, g2] = React.useState(null), I = useComposedRefs(o2, (e2) => g2(e2)), R2 = useLabelContext(w2), D2 = i2 || R2, P2 = React.useRef(false), _2 = !w2 || Boolean(w2.closest("form")), [q2 = false, K] = useControllableState({ prop: p2, defaultProp: b2, onChange: v2 });
  return React.createElement(m$4, { scope: a2, state: q2, disabled: C2 }, /* @__PURE__ */ React.createElement(Primitive.button, _extends({ type: "button", role: "checkbox", "aria-checked": x$2(q2) ? "mixed" : q2, "aria-labelledby": D2, "aria-required": k2, "data-state": h$5(q2), "data-disabled": C2 ? "" : void 0, disabled: C2, value: y2 }, E2, { ref: I, onKeyDown: composeEventHandlers(t2.onKeyDown, (e2) => {
    e2.key === "Enter" && e2.preventDefault();
  }), onClick: composeEventHandlers(t2.onClick, (e2) => {
    K((e3) => !!x$2(e3) || !e3), _2 && (P2.current = e2.isPropagationStopped(), P2.current || e2.stopPropagation());
  }) })), _2 && /* @__PURE__ */ React.createElement(f$4, { control: w2, bubbles: !P2.current, name: u2, value: y2, checked: q2, required: k2, disabled: C2, style: { transform: "translateX(-100%)" } }));
});
const CheckboxIndicator = /* @__PURE__ */ React.forwardRef((r2, o2) => {
  const _a = r2, { __scopeCheckbox: a2, forceMount: n2 } = _a, c2 = __objRest(_a, ["__scopeCheckbox", "forceMount"]), i2 = b$1("CheckboxIndicator", a2);
  return React.createElement(Presence, { present: n2 || x$2(i2.state) || i2.state === true }, /* @__PURE__ */ React.createElement(Primitive.span, _extends({ "data-state": h$5(i2.state), "data-disabled": i2.disabled ? "" : void 0 }, c2, { ref: o2, style: __spreadValues({ pointerEvents: "none" }, r2.style) })));
});
const f$4 = (e2) => {
  const _a = e2, { control: t2, checked: r2, bubbles: n2 = true } = _a, c2 = __objRest(_a, ["control", "checked", "bubbles"]), i2 = React.useRef(null), s2 = usePrevious(r2), u2 = useSize(t2);
  return React.useEffect(() => {
    const e3 = i2.current, t3 = window.HTMLInputElement.prototype, o2 = Object.getOwnPropertyDescriptor(t3, "checked").set;
    if (s2 !== r2 && o2) {
      const t4 = new Event("click", { bubbles: n2 });
      e3.indeterminate = x$2(r2), o2.call(e3, !x$2(r2) && r2), e3.dispatchEvent(t4);
    }
  }, [s2, r2, n2]), /* @__PURE__ */ React.createElement("input", _extends({ type: "checkbox", "aria-hidden": true, defaultChecked: !x$2(r2) && r2 }, c2, { tabIndex: -1, ref: i2, style: __spreadProps(__spreadValues(__spreadValues({}, e2.style), u2), { position: "absolute", pointerEvents: "none", opacity: 0, margin: 0 }) }));
};
function x$2(e2) {
  return e2 === "indeterminate";
}
function h$5(e2) {
  return x$2(e2) ? "indeterminate" : e2 ? "checked" : "unchecked";
}
const Root$2 = Checkbox;
const Indicator = CheckboxIndicator;
const [d, p$3] = createContextScope("ScrollArea");
const [f$3, h$4] = d("ScrollArea");
const ScrollArea$1 = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { __scopeScrollArea: t2, type: n2 = "hover", scrollHideDelay: i2 = 600 } = _a, a2 = __objRest(_a, ["__scopeScrollArea", "type", "scrollHideDelay"]), [d2, p2] = React.useState(null), [h, m2] = React.useState(null), [w2, b2] = React.useState(null), [v2, S2] = React.useState(null), [g2, E2] = React.useState(null), [C2, T2] = React.useState(0), [y2, A2] = React.useState(0), [x2, R2] = React.useState(false), [P2, L2] = React.useState(false), _2 = useComposedRefs(r2, (e3) => p2(e3)), D2 = useDirection(d2, a2.dir);
  return React.createElement(f$3, { scope: t2, type: n2, dir: D2, scrollHideDelay: i2, scrollArea: d2, viewport: h, onViewportChange: m2, content: w2, onContentChange: b2, scrollbarX: v2, onScrollbarXChange: S2, scrollbarXEnabled: x2, onScrollbarXEnabledChange: R2, scrollbarY: g2, onScrollbarYChange: E2, scrollbarYEnabled: P2, onScrollbarYEnabledChange: L2, onCornerWidthChange: T2, onCornerHeightChange: A2 }, /* @__PURE__ */ React.createElement(Primitive.div, _extends({}, a2, { ref: _2, style: __spreadValues({ position: "relative", "--radix-scroll-area-corner-width": C2 + "px", "--radix-scroll-area-corner-height": y2 + "px" }, e2.style) })));
});
const ScrollAreaViewport = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { __scopeScrollArea: t2, children: o2 } = _a, n2 = __objRest(_a, ["__scopeScrollArea", "children"]), i2 = h$4("ScrollAreaViewport", t2), a2 = React.useRef(null), d2 = useComposedRefs(r2, a2, i2.onViewportChange);
  return React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" } }), /* @__PURE__ */ React.createElement(Primitive.div, _extends({ "data-radix-scroll-area-viewport": "" }, n2, { ref: d2, style: __spreadValues({ overflowX: i2.scrollbarXEnabled ? "scroll" : "hidden", overflowY: i2.scrollbarYEnabled ? "scroll" : "hidden" }, e2.style) }), /* @__PURE__ */ React.createElement("div", { ref: i2.onContentChange, style: { minWidth: "100%", display: "table" } }, o2)));
});
const ScrollAreaScrollbar = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { forceMount: t2 } = _a, o2 = __objRest(_a, ["forceMount"]), n2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), { onScrollbarXEnabledChange: l2, onScrollbarYEnabledChange: i2 } = n2, a2 = e2.orientation === "horizontal";
  return React.useEffect(() => (a2 ? l2(true) : i2(true), () => {
    a2 ? l2(false) : i2(false);
  }), [a2, l2, i2]), n2.type === "hover" ? /* @__PURE__ */ React.createElement(m$3, _extends({}, o2, { ref: r2, forceMount: t2 })) : n2.type === "scroll" ? /* @__PURE__ */ React.createElement(w$1, _extends({}, o2, { ref: r2, forceMount: t2 })) : n2.type === "auto" ? /* @__PURE__ */ React.createElement(b, _extends({}, o2, { ref: r2, forceMount: t2 })) : n2.type === "always" ? /* @__PURE__ */ React.createElement(v, _extends({}, o2, { ref: r2 })) : null;
});
const m$3 = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { forceMount: t2 } = _a, o2 = __objRest(_a, ["forceMount"]), n2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), [l2, i2] = React.useState(false);
  return React.useEffect(() => {
    const e3 = n2.scrollArea;
    let r3 = 0;
    if (e3) {
      const t3 = () => {
        window.clearTimeout(r3), i2(true);
      }, o3 = () => {
        r3 = window.setTimeout(() => i2(false), n2.scrollHideDelay);
      };
      return e3.addEventListener("pointerenter", t3), e3.addEventListener("pointerleave", o3), () => {
        e3.removeEventListener("pointerenter", t3), e3.removeEventListener("pointerleave", o3);
      };
    }
  }, [n2.scrollArea, n2.scrollHideDelay]), /* @__PURE__ */ React.createElement(Presence, { present: t2 || l2 }, /* @__PURE__ */ React.createElement(b, _extends({ "data-state": l2 ? "visible" : "hidden" }, o2, { ref: r2 })));
}), w$1 = /* @__PURE__ */ React.forwardRef((r2, t2) => {
  const _a = r2, { forceMount: o2 } = _a, n2 = __objRest(_a, ["forceMount"]), l2 = h$4("ScrollAreaScrollbar", r2.__scopeScrollArea), i2 = r2.orientation === "horizontal", c2 = z(() => p2("SCROLL_END"), 100), [d2, p2] = (f2 = "hidden", m2 = { hidden: { SCROLL: "scrolling" }, scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" }, interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" }, idle: { HIDE: "hidden", SCROLL: "scrolling", POINTER_ENTER: "interacting" } }, React.useReducer((e2, r3) => {
    const t3 = m2[e2][r3];
    return t3 != null ? t3 : e2;
  }, f2));
  var f2, m2;
  return React.useEffect(() => {
    if (d2 === "idle") {
      const e2 = window.setTimeout(() => p2("HIDE"), l2.scrollHideDelay);
      return () => window.clearTimeout(e2);
    }
  }, [d2, l2.scrollHideDelay, p2]), React.useEffect(() => {
    const e2 = l2.viewport, r3 = i2 ? "scrollLeft" : "scrollTop";
    if (e2) {
      let t3 = e2[r3];
      const o3 = () => {
        const o4 = e2[r3];
        t3 !== o4 && (p2("SCROLL"), c2()), t3 = o4;
      };
      return e2.addEventListener("scroll", o3), () => e2.removeEventListener("scroll", o3);
    }
  }, [l2.viewport, i2, p2, c2]), /* @__PURE__ */ React.createElement(Presence, { present: o2 || d2 !== "hidden" }, /* @__PURE__ */ React.createElement(v, _extends({ "data-state": d2 === "hidden" ? "hidden" : "visible" }, n2, { ref: t2, onPointerEnter: composeEventHandlers(r2.onPointerEnter, () => p2("POINTER_ENTER")), onPointerLeave: composeEventHandlers(r2.onPointerLeave, () => p2("POINTER_LEAVE")) })));
}), b = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const t2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), _a = e2, { forceMount: o2 } = _a, n2 = __objRest(_a, ["forceMount"]), [l2, i2] = React.useState(false), c2 = e2.orientation === "horizontal", d2 = z(() => {
    if (t2.viewport) {
      const e3 = t2.viewport.offsetWidth < t2.viewport.scrollWidth, r3 = t2.viewport.offsetHeight < t2.viewport.scrollHeight;
      i2(c2 ? e3 : r3);
    }
  }, 10);
  return H(t2.viewport, d2), H(t2.content, d2), /* @__PURE__ */ React.createElement(Presence, { present: o2 || l2 }, /* @__PURE__ */ React.createElement(v, _extends({ "data-state": l2 ? "visible" : "hidden" }, n2, { ref: r2 })));
}), v = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { orientation: t2 = "vertical" } = _a, o2 = __objRest(_a, ["orientation"]), n2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), l2 = React.useRef(null), i2 = React.useRef(0), [a2, c2] = React.useState({ content: 0, viewport: 0, scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 } }), d2 = x$1(a2.viewport, a2.content), p2 = __spreadProps(__spreadValues({}, o2), { sizes: a2, onSizesChange: c2, hasThumb: Boolean(d2 > 0 && d2 < 1), onThumbChange: (e3) => l2.current = e3, onThumbPointerUp: () => i2.current = 0, onThumbPointerDown: (e3) => i2.current = e3 });
  function f2(e3, r3) {
    return function(e4, r4, t3, o3 = "ltr") {
      const n3 = R$1(t3), l3 = n3 / 2, i3 = r4 || l3, a3 = n3 - i3, c3 = t3.scrollbar.paddingStart + i3, s2 = t3.scrollbar.size - t3.scrollbar.paddingEnd - a3, u2 = t3.content - t3.viewport;
      return L([c3, s2], o3 === "ltr" ? [0, u2] : [-1 * u2, 0])(e4);
    }(e3, i2.current, a2, r3);
  }
  return t2 === "horizontal" ? /* @__PURE__ */ React.createElement(S, _extends({}, p2, { ref: r2, onThumbPositionChange: () => {
    if (n2.viewport && l2.current) {
      const e3 = P(n2.viewport.scrollLeft, a2, n2.dir);
      l2.current.style.transform = `translate3d(${e3}px, 0, 0)`;
    }
  }, onWheelScroll: (e3) => {
    n2.viewport && (n2.viewport.scrollLeft = e3);
  }, onDragScroll: (e3) => {
    n2.viewport && (n2.viewport.scrollLeft = f2(e3, n2.dir));
  } })) : t2 === "vertical" ? /* @__PURE__ */ React.createElement(g$4, _extends({}, p2, { ref: r2, onThumbPositionChange: () => {
    if (n2.viewport && l2.current) {
      const e3 = P(n2.viewport.scrollTop, a2);
      l2.current.style.transform = `translate3d(0, ${e3}px, 0)`;
    }
  }, onWheelScroll: (e3) => {
    n2.viewport && (n2.viewport.scrollTop = e3);
  }, onDragScroll: (e3) => {
    n2.viewport && (n2.viewport.scrollTop = f2(e3));
  } })) : null;
}), S = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { sizes: t2, onSizesChange: o2 } = _a, n2 = __objRest(_a, ["sizes", "onSizesChange"]), i2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), [a2, c2] = React.useState(), d2 = React.useRef(null), p2 = useComposedRefs(r2, d2, i2.onScrollbarXChange);
  return React.useEffect(() => {
    d2.current && c2(getComputedStyle(d2.current));
  }, [d2]), /* @__PURE__ */ React.createElement(T, _extends({ "data-orientation": "horizontal" }, n2, { ref: p2, sizes: t2, style: __spreadValues({ bottom: 0, left: i2.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0, right: i2.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0, "--radix-scroll-area-thumb-width": R$1(t2) + "px" }, e2.style), onThumbPointerDown: (r3) => e2.onThumbPointerDown(r3.x), onDragScroll: (r3) => e2.onDragScroll(r3.x), onWheelScroll: (r3, t3) => {
    if (i2.viewport) {
      const o3 = i2.viewport.scrollLeft + r3.deltaX;
      e2.onWheelScroll(o3), _(o3, t3) && r3.preventDefault();
    }
  }, onResize: () => {
    d2.current && i2.viewport && a2 && o2({ content: i2.viewport.scrollWidth, viewport: i2.viewport.offsetWidth, scrollbar: { size: d2.current.clientWidth, paddingStart: A$1(a2.paddingLeft), paddingEnd: A$1(a2.paddingRight) } });
  } }));
}), g$4 = /* @__PURE__ */ React.forwardRef((e2, r2) => {
  const _a = e2, { sizes: t2, onSizesChange: o2 } = _a, n2 = __objRest(_a, ["sizes", "onSizesChange"]), i2 = h$4("ScrollAreaScrollbar", e2.__scopeScrollArea), [a2, c2] = React.useState(), d2 = React.useRef(null), p2 = useComposedRefs(r2, d2, i2.onScrollbarYChange);
  return React.useEffect(() => {
    d2.current && c2(getComputedStyle(d2.current));
  }, [d2]), /* @__PURE__ */ React.createElement(T, _extends({ "data-orientation": "vertical" }, n2, { ref: p2, sizes: t2, style: __spreadValues({ top: 0, right: i2.dir === "ltr" ? 0 : void 0, left: i2.dir === "rtl" ? 0 : void 0, bottom: "var(--radix-scroll-area-corner-height)", "--radix-scroll-area-thumb-height": R$1(t2) + "px" }, e2.style), onThumbPointerDown: (r3) => e2.onThumbPointerDown(r3.y), onDragScroll: (r3) => e2.onDragScroll(r3.y), onWheelScroll: (r3, t3) => {
    if (i2.viewport) {
      const o3 = i2.viewport.scrollTop + r3.deltaY;
      e2.onWheelScroll(o3), _(o3, t3) && r3.preventDefault();
    }
  }, onResize: () => {
    d2.current && i2.viewport && a2 && o2({ content: i2.viewport.scrollHeight, viewport: i2.viewport.offsetHeight, scrollbar: { size: d2.current.clientHeight, paddingStart: A$1(a2.paddingTop), paddingEnd: A$1(a2.paddingBottom) } });
  } }));
}), [E$1, C$1] = d("ScrollAreaScrollbar"), T = /* @__PURE__ */ React.forwardRef((r2, t2) => {
  const _a = r2, { __scopeScrollArea: o2, sizes: i2, hasThumb: a2, onThumbChange: d2, onThumbPointerUp: p2, onThumbPointerDown: f2, onThumbPositionChange: m2, onDragScroll: w2, onWheelScroll: b2, onResize: v2 } = _a, S2 = __objRest(_a, ["__scopeScrollArea", "sizes", "hasThumb", "onThumbChange", "onThumbPointerUp", "onThumbPointerDown", "onThumbPositionChange", "onDragScroll", "onWheelScroll", "onResize"]), g2 = h$4("ScrollAreaScrollbar", o2), [C2, T2] = React.useState(null), y2 = useComposedRefs(t2, (e2) => T2(e2)), A2 = React.useRef(null), x2 = React.useRef(""), R2 = g2.viewport, P2 = i2.content - i2.viewport, L2 = useCallbackRef$1(b2), _2 = useCallbackRef$1(m2), D2 = z(v2, 10);
  function W(e2) {
    if (A2.current) {
      const r3 = e2.clientX - A2.current.left, t3 = e2.clientY - A2.current.top;
      w2({ x: r3, y: t3 });
    }
  }
  return React.useEffect(() => {
    const e2 = (e3) => {
      const r3 = e3.target;
      (C2 == null ? void 0 : C2.contains(r3)) && L2(e3, P2);
    };
    return document.addEventListener("wheel", e2, { passive: false }), () => document.removeEventListener("wheel", e2, { passive: false });
  }, [R2, C2, P2, L2]), React.useEffect(_2, [i2, _2]), H(C2, D2), H(g2.content, D2), /* @__PURE__ */ React.createElement(E$1, { scope: o2, scrollbar: C2, hasThumb: a2, onThumbChange: useCallbackRef$1(d2), onThumbPointerUp: useCallbackRef$1(p2), onThumbPositionChange: _2, onThumbPointerDown: useCallbackRef$1(f2) }, /* @__PURE__ */ React.createElement(Primitive.div, _extends({}, S2, { ref: y2, style: __spreadValues({ position: "absolute" }, S2.style), onPointerDown: composeEventHandlers(r2.onPointerDown, (e2) => {
    if (e2.button === 0) {
      e2.target.setPointerCapture(e2.pointerId), A2.current = C2.getBoundingClientRect(), x2.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", W(e2);
    }
  }), onPointerMove: composeEventHandlers(r2.onPointerMove, W), onPointerUp: composeEventHandlers(r2.onPointerUp, (e2) => {
    e2.target.releasePointerCapture(e2.pointerId), document.body.style.webkitUserSelect = x2.current, A2.current = null;
  }) })));
});
const ScrollAreaThumb = /* @__PURE__ */ React.forwardRef((r2, t2) => {
  const _a = r2, { __scopeScrollArea: o2, style: n2 } = _a, i2 = __objRest(_a, ["__scopeScrollArea", "style"]), a2 = h$4("ScrollbarThumb", o2), d2 = C$1("ScrollbarThumb", o2), { onThumbPositionChange: p2 } = d2, f2 = useComposedRefs(t2, (e2) => d2.onThumbChange(e2)), m2 = React.useRef(), w2 = z(() => {
    m2.current && (m2.current(), m2.current = void 0);
  }, 100);
  return React.useEffect(() => {
    const e2 = a2.viewport;
    if (e2) {
      const r3 = () => {
        if (w2(), !m2.current) {
          const r4 = D(e2, p2);
          m2.current = r4, p2();
        }
      };
      return p2(), e2.addEventListener("scroll", r3), () => e2.removeEventListener("scroll", r3);
    }
  }, [a2.viewport, w2, p2]), d2.hasThumb ? /* @__PURE__ */ React.createElement(Primitive.div, _extends({}, i2, { ref: f2, style: __spreadValues({ width: "var(--radix-scroll-area-thumb-width)", height: "var(--radix-scroll-area-thumb-height)" }, n2), onPointerDownCapture: composeEventHandlers(r2.onPointerDownCapture, (e2) => {
    const r3 = e2.target.getBoundingClientRect(), t3 = e2.clientX - r3.left, o3 = e2.clientY - r3.top;
    d2.onThumbPointerDown({ x: t3, y: o3 });
  }), onPointerUp: composeEventHandlers(r2.onPointerUp, d2.onThumbPointerUp) })) : null;
});
function A$1(e2) {
  return e2 ? parseInt(e2, 10) : 0;
}
function x$1(e2, r2) {
  const t2 = e2 / r2;
  return isNaN(t2) ? 0 : t2;
}
function R$1(e2) {
  const r2 = x$1(e2.viewport, e2.content), t2 = e2.scrollbar.paddingStart + e2.scrollbar.paddingEnd, o2 = (e2.scrollbar.size - t2) * r2;
  return Math.max(o2, 18);
}
function P(e2, t2, o2 = "ltr") {
  const n2 = R$1(t2), l2 = t2.scrollbar.paddingStart + t2.scrollbar.paddingEnd, i2 = t2.scrollbar.size - l2, a2 = t2.content - t2.viewport, c2 = i2 - n2, s2 = clamp(e2, o2 === "ltr" ? [0, a2] : [-1 * a2, 0]);
  return L([0, a2], [0, c2])(s2);
}
function L(e2, r2) {
  return (t2) => {
    if (e2[0] === e2[1] || r2[0] === r2[1])
      return r2[0];
    const o2 = (r2[1] - r2[0]) / (e2[1] - e2[0]);
    return r2[0] + o2 * (t2 - e2[0]);
  };
}
function _(e2, r2) {
  return e2 > 0 && e2 < r2;
}
const D = (e2, r2 = () => {
}) => {
  let t2 = { left: e2.scrollLeft, top: e2.scrollTop }, o2 = 0;
  return function n2() {
    const l2 = { left: e2.scrollLeft, top: e2.scrollTop }, i2 = t2.left !== l2.left, a2 = t2.top !== l2.top;
    (i2 || a2) && r2(), t2 = l2, o2 = window.requestAnimationFrame(n2);
  }(), () => window.cancelAnimationFrame(o2);
};
function z(e2, r2) {
  const t2 = useCallbackRef$1(e2), o2 = React.useRef(0);
  return React.useEffect(() => () => window.clearTimeout(o2.current), []), React.useCallback(() => {
    window.clearTimeout(o2.current), o2.current = window.setTimeout(t2, r2);
  }, [t2, r2]);
}
function H(e2, r2) {
  const o2 = useCallbackRef$1(r2);
  useLayoutEffect(() => {
    let r3 = 0;
    if (e2) {
      const t2 = new ResizeObserver(() => {
        cancelAnimationFrame(r3), r3 = window.requestAnimationFrame(o2);
      });
      return t2.observe(e2), () => {
        window.cancelAnimationFrame(r3), t2.unobserve(e2);
      };
    }
  }, [e2, o2]);
}
const Root$1 = ScrollArea$1;
const Viewport = ScrollAreaViewport;
const Scrollbar = ScrollAreaScrollbar;
const [C, g$3] = createContextScope("Popover", [l]);
const x = l(), [h$3, E] = C("Popover");
const Popover$1 = (e2) => {
  const { __scopePopover: o2, children: t2, open: n2, defaultOpen: c2, onOpenChange: a2, modal: s2 = false } = e2, i2 = x(o2), u2 = React.useRef(null), [d2, m2] = React.useState(false), [f2 = false, P2] = useControllableState({ prop: n2, defaultProp: c2, onChange: a2 });
  return React.createElement(Root$3, i2, /* @__PURE__ */ React.createElement(h$3, { scope: o2, contentId: useId(), triggerRef: u2, open: f2, onOpenChange: P2, onOpenToggle: React.useCallback(() => P2((e3) => !e3), [P2]), hasCustomAnchor: d2, onCustomAnchorAdd: React.useCallback(() => m2(true), []), onCustomAnchorRemove: React.useCallback(() => m2(false), []), modal: s2 }, t2));
};
const PopoverTrigger = /* @__PURE__ */ React.forwardRef((e2, o2) => {
  const _a = e2, { __scopePopover: r2 } = _a, n2 = __objRest(_a, ["__scopePopover"]), c2 = E("PopoverTrigger", r2), a2 = x(r2), s2 = useComposedRefs(o2, c2.triggerRef), i2 = /* @__PURE__ */ React.createElement(Primitive.button, _extends({ type: "button", "aria-haspopup": "dialog", "aria-expanded": c2.open, "aria-controls": c2.contentId, "data-state": w(c2.open) }, n2, { ref: s2, onClick: composeEventHandlers(e2.onClick, c2.onOpenToggle) }));
  return c2.hasCustomAnchor ? i2 : /* @__PURE__ */ React.createElement(Anchor, _extends({ asChild: true }, a2), i2);
});
const PopoverContent$1 = /* @__PURE__ */ React.forwardRef((e2, o2) => {
  const _a = e2, { forceMount: r2 } = _a, t2 = __objRest(_a, ["forceMount"]), c2 = E("PopoverContent", e2.__scopePopover);
  return React.createElement(Presence, { present: r2 || c2.open }, c2.modal ? /* @__PURE__ */ React.createElement(A, _extends({}, t2, { ref: o2 })) : /* @__PURE__ */ React.createElement(O, _extends({}, t2, { ref: o2 })));
});
const A = /* @__PURE__ */ React.forwardRef((r2, t2) => {
  const _a = r2, { allowPinchZoom: n2, portalled: c2 = true } = _a, s2 = __objRest(_a, ["allowPinchZoom", "portalled"]), i2 = E("PopoverContent", r2.__scopePopover), p2 = React.useRef(null), u2 = useComposedRefs(t2, p2), l2 = React.useRef(false);
  React.useEffect(() => {
    const o2 = p2.current;
    if (o2)
      return hideOthers(o2);
  }, []);
  const d2 = c2 ? Portal : React.Fragment;
  return React.createElement(d2, null, /* @__PURE__ */ React.createElement(o$3, { allowPinchZoom: n2 }, /* @__PURE__ */ React.createElement(R, _extends({}, s2, { ref: u2, trapFocus: i2.open, disableOutsidePointerEvents: true, onCloseAutoFocus: composeEventHandlers(r2.onCloseAutoFocus, (e2) => {
    var o2;
    e2.preventDefault(), l2.current || (o2 = i2.triggerRef.current) === null || o2 === void 0 || o2.focus();
  }), onPointerDownOutside: composeEventHandlers(r2.onPointerDownOutside, (e2) => {
    const o2 = e2.detail.originalEvent, r3 = o2.button === 0 && o2.ctrlKey === true, t3 = o2.button === 2 || r3;
    l2.current = t3;
  }, { checkForDefaultPrevented: false }), onFocusOutside: composeEventHandlers(r2.onFocusOutside, (e2) => e2.preventDefault(), { checkForDefaultPrevented: false }) }))));
}), O = /* @__PURE__ */ React.forwardRef((e2, o2) => {
  const _a = e2, { portalled: r2 = true } = _a, t2 = __objRest(_a, ["portalled"]), n2 = E("PopoverContent", e2.__scopePopover), c2 = React.useRef(false), s2 = r2 ? Portal : React.Fragment;
  return React.createElement(s2, null, /* @__PURE__ */ React.createElement(R, _extends({}, t2, { ref: o2, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (o3) => {
    var r3, t3;
    ((r3 = e2.onCloseAutoFocus) === null || r3 === void 0 || r3.call(e2, o3), o3.defaultPrevented) || (c2.current || (t3 = n2.triggerRef.current) === null || t3 === void 0 || t3.focus(), o3.preventDefault());
    c2.current = false;
  }, onInteractOutside: (o3) => {
    var r3, t3;
    (r3 = e2.onInteractOutside) === null || r3 === void 0 || r3.call(e2, o3), o3.defaultPrevented || (c2.current = true);
    const a2 = o3.target;
    ((t3 = n2.triggerRef.current) === null || t3 === void 0 ? void 0 : t3.contains(a2)) && o3.preventDefault();
  } })));
}), R = /* @__PURE__ */ React.forwardRef((e2, o2) => {
  const _a = e2, { __scopePopover: r2, trapFocus: t2, onOpenAutoFocus: n2, onCloseAutoFocus: a2, disableOutsidePointerEvents: u2, onEscapeKeyDown: l2, onPointerDownOutside: d2, onFocusOutside: m2, onInteractOutside: f2 } = _a, C2 = __objRest(_a, ["__scopePopover", "trapFocus", "onOpenAutoFocus", "onCloseAutoFocus", "disableOutsidePointerEvents", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside"]), g2 = E("PopoverContent", r2), h = x(r2);
  return useFocusGuards(), /* @__PURE__ */ React.createElement(FocusScope, { asChild: true, loop: true, trapped: t2, onMountAutoFocus: n2, onUnmountAutoFocus: a2 }, /* @__PURE__ */ React.createElement(DismissableLayer, { asChild: true, disableOutsidePointerEvents: u2, onInteractOutside: f2, onEscapeKeyDown: l2, onPointerDownOutside: d2, onFocusOutside: m2, onDismiss: () => g2.onOpenChange(false) }, /* @__PURE__ */ React.createElement(Content$1, _extends({ "data-state": w(g2.open), role: "dialog", id: g2.contentId }, h, C2, { ref: o2, style: __spreadProps(__spreadValues({}, C2.style), { "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)" }) }))));
});
function w(e2) {
  return e2 ? "open" : "closed";
}
const Root = Popover$1;
const Trigger = PopoverTrigger;
const Content = PopoverContent$1;
var link$1 = {};
var router$1 = {};
var normalizeTrailingSlash = {};
Object.defineProperty(normalizeTrailingSlash, "__esModule", {
  value: true
});
normalizeTrailingSlash.removePathTrailingSlash = removePathTrailingSlash;
normalizeTrailingSlash.normalizePathTrailingSlash = void 0;
function removePathTrailingSlash(path) {
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}
const normalizePathTrailingSlash = {}.__NEXT_TRAILING_SLASH ? (path) => {
  if (/\.[^/]+\/?$/.test(path)) {
    return removePathTrailingSlash(path);
  } else if (path.endsWith("/")) {
    return path;
  } else {
    return path + "/";
  }
} : removePathTrailingSlash;
normalizeTrailingSlash.normalizePathTrailingSlash = normalizePathTrailingSlash;
var routeLoader = {};
var getAssetPathFromRoute$1 = {};
Object.defineProperty(getAssetPathFromRoute$1, "__esModule", {
  value: true
});
getAssetPathFromRoute$1.default = getAssetPathFromRoute;
function getAssetPathFromRoute(route, ext = "") {
  const path = route === "/" ? "/index" : /^\/index(\/|$)/.test(route) ? `/index${route}` : `${route}`;
  return path + ext;
}
var requestIdleCallback$1 = {};
Object.defineProperty(requestIdleCallback$1, "__esModule", {
  value: true
});
requestIdleCallback$1.cancelIdleCallback = requestIdleCallback$1.requestIdleCallback = void 0;
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
  let start = Date.now();
  return setTimeout(function() {
    cb({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
requestIdleCallback$1.requestIdleCallback = requestIdleCallback;
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
  return clearTimeout(id);
};
requestIdleCallback$1.cancelIdleCallback = cancelIdleCallback;
Object.defineProperty(routeLoader, "__esModule", {
  value: true
});
routeLoader.markAssetError = markAssetError;
routeLoader.isAssetError = isAssetError;
routeLoader.getClientBuildManifest = getClientBuildManifest;
routeLoader.getMiddlewareManifest = getMiddlewareManifest;
routeLoader.createRouteLoader = createRouteLoader;
_interopRequireDefault$5(getAssetPathFromRoute$1);
var _requestIdleCallback$1 = requestIdleCallback$1;
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const MS_MAX_IDLE_DELAY = 3800;
function withFuture(key, map2, generator) {
  let entry = map2.get(key);
  if (entry) {
    if ("future" in entry) {
      return entry.future;
    }
    return Promise.resolve(entry);
  }
  let resolver;
  const prom = new Promise((resolve) => {
    resolver = resolve;
  });
  map2.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? generator().then((value) => (resolver(value), value)).catch((err) => {
    map2.delete(key);
    throw err;
  }) : prom;
}
function hasPrefetch(link2) {
  try {
    link2 = document.createElement("link");
    return !!window.MSInputMethodContext && !!document.documentMode || link2.relList.supports("prefetch");
  } catch (e2) {
    return false;
  }
}
const canPrefetch = hasPrefetch();
function prefetchViaDom(href, as, link2) {
  return new Promise((res, rej) => {
    const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
    if (document.querySelector(selector)) {
      return res();
    }
    link2 = document.createElement("link");
    if (as)
      link2.as = as;
    link2.rel = `prefetch`;
    link2.crossOrigin = {}.__NEXT_CROSS_ORIGIN;
    link2.onload = res;
    link2.onerror = rej;
    link2.href = href;
    document.head.appendChild(link2);
  });
}
const ASSET_LOAD_ERROR = Symbol("ASSET_LOAD_ERROR");
function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}
function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}
function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement("script");
    script.onload = resolve;
    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`)));
    script.crossOrigin = {}.__NEXT_CROSS_ORIGIN;
    script.src = src;
    document.body.appendChild(script);
  });
}
function resolvePromiseWithTimeout(p2, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p2.then((r2) => {
      cancelled = true;
      resolve(r2);
    }).catch(reject);
    {
      _requestIdleCallback$1.requestIdleCallback(() => setTimeout(() => {
        if (!cancelled) {
          reject(err);
        }
      }, ms));
    }
  });
}
function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }
  const onBuildManifest = new Promise((resolve) => {
    const cb = self.__BUILD_MANIFEST_CB;
    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client build manifest")));
}
function getMiddlewareManifest() {
  if (self.__MIDDLEWARE_MANIFEST) {
    return Promise.resolve(self.__MIDDLEWARE_MANIFEST);
  }
  const onMiddlewareManifest = new Promise((resolve) => {
    const cb = self.__MIDDLEWARE_MANIFEST_CB;
    self.__MIDDLEWARE_MANIFEST_CB = () => {
      resolve(self.__MIDDLEWARE_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onMiddlewareManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client middleware manifest")));
}
function getFilesForRoute(assetPrefix, route) {
  return getClientBuildManifest().then((manifest) => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }
    const allFiles = manifest[route].map((entry) => assetPrefix + "/_next/" + encodeURI(entry));
    return {
      scripts: allFiles.filter((v2) => v2.endsWith(".js")),
      css: allFiles.filter((v2) => v2.endsWith(".css"))
    };
  });
}
function createRouteLoader(assetPrefix) {
  const entrypoints = /* @__PURE__ */ new Map();
  const loadedScripts = /* @__PURE__ */ new Map();
  const styleSheets = /* @__PURE__ */ new Map();
  const routes = /* @__PURE__ */ new Map();
  function maybeExecuteScript(src) {
    {
      let prom = loadedScripts.get(src);
      if (prom) {
        return prom;
      }
      if (document.querySelector(`script[src^="${src}"]`)) {
        return Promise.resolve();
      }
      loadedScripts.set(src, prom = appendScript(src));
      return prom;
    }
  }
  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);
    if (prom) {
      return prom;
    }
    styleSheets.set(href, prom = fetch(href).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }
      return res.text().then((text) => ({
        href,
        content: text
      }));
    }).catch((err) => {
      throw markAssetError(err);
    }));
    return prom;
  }
  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },
    onEntrypoint(route, execute) {
      (execute ? Promise.resolve().then(() => execute()).then((exports) => ({
        component: exports && exports.default || exports,
        exports
      }), (err) => ({
        error: err
      })) : Promise.resolve(void 0)).then((input) => {
        const old = entrypoints.get(route);
        if (old && "resolve" in old) {
          if (input) {
            entrypoints.set(route, input);
            old.resolve(input);
          }
        } else {
          if (input) {
            entrypoints.set(route, input);
          } else {
            entrypoints.delete(route);
          }
          routes.delete(route);
        }
      });
    },
    loadRoute(route, prefetch2) {
      return withFuture(route, routes, () => {
        return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({ scripts, css }) => {
          return Promise.all([
            entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)),
            Promise.all(css.map(fetchStyleSheet))
          ]);
        }).then((res) => {
          return this.whenEntrypoint(route).then((entrypoint) => ({
            entrypoint,
            styles: res[1]
          }));
        }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({ entrypoint, styles }) => {
          const res = Object.assign({
            styles
          }, entrypoint);
          return "error" in entrypoint ? entrypoint : res;
        }).catch((err) => {
          if (prefetch2) {
            throw err;
          }
          return {
            error: err
          };
        }).finally(() => {
          return void 0;
        });
      });
    },
    prefetch(route) {
      let cn;
      if (cn = navigator.connection) {
        if (cn.saveData || /2g/.test(cn.effectiveType))
          return Promise.resolve();
      }
      return getFilesForRoute(assetPrefix, route).then((output) => Promise.all(canPrefetch ? output.scripts.map((script) => prefetchViaDom(script, "script")) : [])).then(() => {
        _requestIdleCallback$1.requestIdleCallback(() => this.loadRoute(route, true).catch(() => {
        }));
      }).catch(() => {
      });
    }
  };
}
var isError$1 = {};
var isPlainObject$1 = {};
Object.defineProperty(isPlainObject$1, "__esModule", {
  value: true
});
isPlainObject$1.getObjectClassLabel = getObjectClassLabel;
isPlainObject$1.isPlainObject = isPlainObject;
function getObjectClassLabel(value) {
  return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
  if (getObjectClassLabel(value) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
Object.defineProperty(isError$1, "__esModule", {
  value: true
});
isError$1.default = isError;
isError$1.getProperError = getProperError;
var _isPlainObject = isPlainObject$1;
function isError(err) {
  return typeof err === "object" && err !== null && "name" in err && "message" in err;
}
function getProperError(err) {
  if (isError(err)) {
    return err;
  }
  return new Error(_isPlainObject.isPlainObject(err) ? JSON.stringify(err) : err + "");
}
var denormalizePagePath$1 = {};
var utils$1 = {};
var getMiddlewareRegex$1 = {};
var routeRegex = {};
Object.defineProperty(routeRegex, "__esModule", {
  value: true
});
routeRegex.getParametrizedRoute = getParametrizedRoute;
routeRegex.getRouteRegex = getRouteRegex;
function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
}
function parseParameter(param) {
  const optional = param.startsWith("[") && param.endsWith("]");
  if (optional) {
    param = param.slice(1, -1);
  }
  const repeat = param.startsWith("...");
  if (repeat) {
    param = param.slice(3);
  }
  return {
    key: param,
    repeat,
    optional
  };
}
function getParametrizedRoute(route) {
  const segments = (route.replace(/\/$/, "") || "/").slice(1).split("/");
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map((segment) => {
    if (segment.startsWith("[") && segment.endsWith("]")) {
      const { key, optional, repeat } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join("");
  if (typeof window === "undefined") {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1;
    const getSafeRouteKey = () => {
      let routeKey = "";
      for (let i2 = 0; i2 < routeKeyCharLength; i2++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;
        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }
      return routeKey;
    };
    const routeKeys = {};
    let namedParameterizedRoute = segments.map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const { key, optional, repeat } = parseParameter(segment.slice(1, -1));
        let cleanedKey = key.replace(/\W/g, "");
        let invalidKey = false;
        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }
        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }
        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }
        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join("");
    return {
      parameterizedRoute,
      namedParameterizedRoute,
      groups,
      routeKeys
    };
  }
  return {
    parameterizedRoute,
    groups
  };
}
function getRouteRegex(normalizedRoute) {
  const result = getParametrizedRoute(normalizedRoute);
  if ("routeKeys" in result) {
    return {
      re: new RegExp(`^${result.parameterizedRoute}(?:/)?$`),
      groups: result.groups,
      routeKeys: result.routeKeys,
      namedRegex: `^${result.namedParameterizedRoute}(?:/)?$`
    };
  }
  return {
    re: new RegExp(`^${result.parameterizedRoute}(?:/)?$`),
    groups: result.groups
  };
}
Object.defineProperty(getMiddlewareRegex$1, "__esModule", {
  value: true
});
getMiddlewareRegex$1.getMiddlewareRegex = getMiddlewareRegex;
var _routeRegex$1 = routeRegex;
function getMiddlewareRegex(normalizedRoute, catchAll = true) {
  const result = _routeRegex$1.getParametrizedRoute(normalizedRoute);
  let catchAllRegex = catchAll ? "(?!_next).*" : "";
  let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
  if ("routeKeys" in result) {
    if (result.parameterizedRoute === "/") {
      return {
        groups: {},
        namedRegex: `^/${catchAllRegex}$`,
        re: new RegExp(`^/${catchAllRegex}$`),
        routeKeys: {}
      };
    }
    return {
      groups: result.groups,
      namedRegex: `^${result.namedParameterizedRoute}${catchAllGroupedRegex}$`,
      re: new RegExp(`^${result.parameterizedRoute}${catchAllGroupedRegex}$`),
      routeKeys: result.routeKeys
    };
  }
  if (result.parameterizedRoute === "/") {
    return {
      groups: {},
      re: new RegExp(`^/${catchAllRegex}$`)
    };
  }
  return {
    groups: {},
    re: new RegExp(`^${result.parameterizedRoute}${catchAllGroupedRegex}$`)
  };
}
var routeMatcher = {};
var utils = {};
var formatUrl$1 = {};
var querystring$1 = {};
Object.defineProperty(querystring$1, "__esModule", {
  value: true
});
querystring$1.searchParamsToUrlQuery = searchParamsToUrlQuery;
querystring$1.urlQueryToSearchParams = urlQueryToSearchParams;
querystring$1.assign = assign;
function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === "undefined") {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      query[key].push(value);
    } else {
      query[key] = [
        query[key],
        value
      ];
    }
  });
  return query;
}
function stringifyUrlQueryParam(param) {
  if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
    return String(param);
  } else {
    return "";
  }
}
function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}
function assign(target, ...searchParamsList) {
  searchParamsList.forEach((searchParams) => {
    Array.from(searchParams.keys()).forEach((key) => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}
Object.defineProperty(formatUrl$1, "__esModule", {
  value: true
});
formatUrl$1.formatUrl = formatUrl;
var querystring = _interopRequireWildcard$2(querystring$1);
function _interopRequireWildcard$2(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
  let { auth, hostname } = urlObj;
  let protocol2 = urlObj.protocol || "";
  let pathname = urlObj.pathname || "";
  let hash = urlObj.hash || "";
  let query = urlObj.query || "";
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
    if (urlObj.port) {
      host += ":" + urlObj.port;
    }
  }
  if (query && typeof query === "object") {
    query = String(querystring.urlQueryToSearchParams(query));
  }
  let search = urlObj.search || query && `?${query}` || "";
  if (protocol2 && protocol2.substr(-1) !== ":")
    protocol2 += ":";
  if (urlObj.slashes || (!protocol2 || slashedProtocols.test(protocol2)) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname[0] !== "/")
      pathname = "/" + pathname;
  } else if (!host) {
    host = "";
  }
  if (hash && hash[0] !== "#")
    hash = "#" + hash;
  if (search && search[0] !== "?")
    search = "?" + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace("#", "%23");
  return `${protocol2}${host}${pathname}${search}${hash}`;
}
Object.defineProperty(utils, "__esModule", {
  value: true
});
utils.execOnce = execOnce;
utils.getLocationOrigin = getLocationOrigin;
utils.getURL = getURL;
utils.getDisplayName = getDisplayName;
utils.isResSent = isResSent;
utils.normalizeRepeatedSlashes = normalizeRepeatedSlashes;
utils.loadGetInitialProps = loadGetInitialProps;
utils.formatWithValidation = formatWithValidation;
utils.HtmlContext = utils.ST = utils.SP = utils.urlObjectKeys = void 0;
var _react$4 = React__default;
var _formatUrl = formatUrl$1;
function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }
    return result;
  };
}
function getLocationOrigin() {
  const { protocol: protocol2, hostname, port } = window.location;
  return `${protocol2}//${hostname}${port ? ":" + port : ""}`;
}
function getURL() {
  const { href } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}
function getDisplayName(Component) {
  return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
}
function isResSent(res) {
  return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url2) {
  const urlParts = url2.split("?");
  const urlNoQuery = urlParts[0];
  return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
}
async function loadGetInitialProps(App, ctx) {
  const res = ctx.res || ctx.ctx && ctx.ctx.res;
  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }
    return {};
  }
  const props = await App.getInitialProps(ctx);
  if (res && isResSent(res)) {
    return props;
  }
  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }
  return props;
}
const urlObjectKeys = [
  "auth",
  "hash",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "slashes"
];
utils.urlObjectKeys = urlObjectKeys;
function formatWithValidation(url2) {
  return _formatUrl.formatUrl(url2);
}
const SP = typeof performance !== "undefined";
utils.SP = SP;
const ST = SP && typeof performance.mark === "function" && typeof performance.measure === "function";
utils.ST = ST;
class DecodeError extends Error {
}
utils.DecodeError = DecodeError;
const HtmlContext = _react$4.createContext(null);
utils.HtmlContext = HtmlContext;
Object.defineProperty(routeMatcher, "__esModule", {
  value: true
});
routeMatcher.getRouteMatcher = getRouteMatcher;
var _utils$3 = utils;
function getRouteMatcher(routeRegex2) {
  const { re: re2, groups } = routeRegex2;
  return (pathname) => {
    const routeMatch = re2.exec(pathname);
    if (!routeMatch) {
      return false;
    }
    const decode2 = (param) => {
      try {
        return decodeURIComponent(param);
      } catch (_2) {
        throw new _utils$3.DecodeError("failed to decode param");
      }
    };
    const params = {};
    Object.keys(groups).forEach((slugName) => {
      const g2 = groups[slugName];
      const m2 = routeMatch[g2.pos];
      if (m2 !== void 0) {
        params[slugName] = ~m2.indexOf("/") ? m2.split("/").map((entry) => decode2(entry)) : g2.repeat ? [
          decode2(m2)
        ] : decode2(m2);
      }
    });
    return params;
  };
}
var sortedRoutes = {};
Object.defineProperty(sortedRoutes, "__esModule", {
  value: true
});
sortedRoutes.getSortedRoutes = getSortedRoutes;
class UrlNode {
  insert(urlPath) {
    this._insert(urlPath.split("/").filter(Boolean), [], false);
  }
  smoosh() {
    return this._smoosh();
  }
  _smoosh(prefix = "/") {
    const childrenPaths = [
      ...this.children.keys()
    ].sort();
    if (this.slugName !== null) {
      childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
    }
    if (this.restSlugName !== null) {
      childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
    }
    if (this.optionalRestSlugName !== null) {
      childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
    }
    const routes = childrenPaths.map((c2) => this.children.get(c2)._smoosh(`${prefix}${c2}/`)).reduce((prev2, curr) => [
      ...prev2,
      ...curr
    ], []);
    if (this.slugName !== null) {
      routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
    }
    if (!this.placeholder) {
      const r2 = prefix === "/" ? "/" : prefix.slice(0, -1);
      if (this.optionalRestSlugName != null) {
        throw new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r2}" and "${r2}[[...${this.optionalRestSlugName}]]").`);
      }
      routes.unshift(r2);
    }
    if (this.restSlugName !== null) {
      routes.push(...this.children.get("[...]")._smoosh(`${prefix}[...${this.restSlugName}]/`));
    }
    if (this.optionalRestSlugName !== null) {
      routes.push(...this.children.get("[[...]]")._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
    }
    return routes;
  }
  _insert(urlPaths, slugNames, isCatchAll) {
    if (urlPaths.length === 0) {
      this.placeholder = false;
      return;
    }
    if (isCatchAll) {
      throw new Error(`Catch-all must be the last part of the URL.`);
    }
    let nextSegment = urlPaths[0];
    if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
      let handleSlug = function(previousSlug, nextSlug) {
        if (previousSlug !== null) {
          if (previousSlug !== nextSlug) {
            throw new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`);
          }
        }
        slugNames.forEach((slug) => {
          if (slug === nextSlug) {
            throw new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`);
          }
          if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
            throw new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`);
          }
        });
        slugNames.push(nextSlug);
      };
      let segmentName = nextSegment.slice(1, -1);
      let isOptional = false;
      if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
        segmentName = segmentName.slice(1, -1);
        isOptional = true;
      }
      if (segmentName.startsWith("...")) {
        segmentName = segmentName.substring(3);
        isCatchAll = true;
      }
      if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
        throw new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`);
      }
      if (segmentName.startsWith(".")) {
        throw new Error(`Segment names may not start with erroneous periods ('${segmentName}').`);
      }
      if (isCatchAll) {
        if (isOptional) {
          if (this.restSlugName != null) {
            throw new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`);
          }
          handleSlug(this.optionalRestSlugName, segmentName);
          this.optionalRestSlugName = segmentName;
          nextSegment = "[[...]]";
        } else {
          if (this.optionalRestSlugName != null) {
            throw new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`);
          }
          handleSlug(this.restSlugName, segmentName);
          this.restSlugName = segmentName;
          nextSegment = "[...]";
        }
      } else {
        if (isOptional) {
          throw new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`);
        }
        handleSlug(this.slugName, segmentName);
        this.slugName = segmentName;
        nextSegment = "[]";
      }
    }
    if (!this.children.has(nextSegment)) {
      this.children.set(nextSegment, new UrlNode());
    }
    this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
  }
  constructor() {
    this.placeholder = true;
    this.children = /* @__PURE__ */ new Map();
    this.slugName = null;
    this.restSlugName = null;
    this.optionalRestSlugName = null;
  }
}
function getSortedRoutes(normalizedPages) {
  const root2 = new UrlNode();
  normalizedPages.forEach((pagePath) => root2.insert(pagePath));
  return root2.smoosh();
}
var isDynamic = {};
Object.defineProperty(isDynamic, "__esModule", {
  value: true
});
isDynamic.isDynamicRoute = isDynamicRoute;
const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "getMiddlewareRegex", {
    enumerable: true,
    get: function() {
      return _getMiddlewareRegex2.getMiddlewareRegex;
    }
  });
  Object.defineProperty(exports, "getRouteMatcher", {
    enumerable: true,
    get: function() {
      return _routeMatcher2.getRouteMatcher;
    }
  });
  Object.defineProperty(exports, "getRouteRegex", {
    enumerable: true,
    get: function() {
      return _routeRegex2.getRouteRegex;
    }
  });
  Object.defineProperty(exports, "getSortedRoutes", {
    enumerable: true,
    get: function() {
      return _sortedRoutes.getSortedRoutes;
    }
  });
  Object.defineProperty(exports, "isDynamicRoute", {
    enumerable: true,
    get: function() {
      return _isDynamic2.isDynamicRoute;
    }
  });
  var _getMiddlewareRegex2 = getMiddlewareRegex$1;
  var _routeMatcher2 = routeMatcher;
  var _routeRegex2 = routeRegex;
  var _sortedRoutes = sortedRoutes;
  var _isDynamic2 = isDynamic;
})(utils$1);
Object.defineProperty(denormalizePagePath$1, "__esModule", {
  value: true
});
denormalizePagePath$1.normalizePathSep = normalizePathSep;
denormalizePagePath$1.denormalizePagePath = denormalizePagePath;
var _utils$2 = utils$1;
function normalizePathSep(path) {
  return path.replace(/\\/g, "/");
}
function denormalizePagePath(page) {
  page = normalizePathSep(page);
  if (page.startsWith("/index/") && !_utils$2.isDynamicRoute(page)) {
    page = page.slice(6);
  } else if (page === "/index") {
    page = "/";
  }
  return page;
}
var normalizeLocalePath$1 = {};
Object.defineProperty(normalizeLocalePath$1, "__esModule", {
  value: true
});
normalizeLocalePath$1.normalizeLocalePath = normalizeLocalePath;
function normalizeLocalePath(pathname, locales) {
  let detectedLocale;
  const pathnameParts = pathname.split("/");
  (locales || []).some((locale) => {
    if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join("/") || "/";
      return true;
    }
    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}
var mitt$1 = {};
Object.defineProperty(mitt$1, "__esModule", {
  value: true
});
mitt$1.default = mitt;
function mitt() {
  const all = /* @__PURE__ */ Object.create(null);
  return {
    on(type, handler) {
      (all[type] || (all[type] = [])).push(handler);
    },
    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },
    emit(type, ...evts) {
      (all[type] || []).slice().map((handler) => {
        handler(...evts);
      });
    }
  };
}
var parseRelativeUrl$1 = {};
Object.defineProperty(parseRelativeUrl$1, "__esModule", {
  value: true
});
parseRelativeUrl$1.parseRelativeUrl = parseRelativeUrl;
var _utils$1 = utils;
var _querystring$2 = querystring$1;
function parseRelativeUrl(url2, base) {
  const globalBase = new URL(typeof window === "undefined" ? "http://n" : _utils$1.getLocationOrigin());
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const { pathname, searchParams, search, hash, href, origin } = new URL(url2, resolvedBase);
  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url2}`);
  }
  return {
    pathname,
    query: _querystring$2.searchParamsToUrlQuery(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}
var resolveRewrites$1 = {};
var pathMatch = {};
var pathToRegexp$2 = {};
Object.defineProperty(pathToRegexp$2, "__esModule", { value: true });
function lexer(str) {
  var tokens = [];
  var i2 = 0;
  while (i2 < str.length) {
    var char = str[i2];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i2 + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at " + i2);
      tokens.push({ type: "NAME", index: i2, value: name });
      i2 = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i2 + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at ' + j);
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at " + j);
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at " + i2);
      if (!pattern)
        throw new TypeError("Missing pattern at " + i2);
      tokens.push({ type: "PATTERN", index: i2, value: pattern });
      i2 = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
  }
  tokens.push({ type: "END", index: i2, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes2 = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
  var result = [];
  var key = 0;
  var i2 = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i2 < tokens.length && tokens[i2].type === type)
      return tokens[i2++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i2], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i2 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes2.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
pathToRegexp$2.parse = parse;
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
pathToRegexp$2.compile = compile;
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode2 = _a === void 0 ? function(x2) {
    return x2;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:" + token.pattern + ")$", reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i2 = 0; i2 < tokens.length; i2++) {
      var token = tokens[i2];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "' + token.name + '" to not be empty');
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode2(value[j], token);
          if (validate && !matches[i2].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode2(String(value), token);
        if (validate && !matches[i2].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
    }
    return path;
  };
}
pathToRegexp$2.tokensToFunction = tokensToFunction;
function match(str, options) {
  var keys2 = [];
  var re2 = pathToRegexp$1(str, keys2, options);
  return regexpToFunction(re2, keys2, options);
}
pathToRegexp$2.match = match;
function regexpToFunction(re2, keys2, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode2 = _a === void 0 ? function(x2) {
    return x2;
  } : _a;
  return function(pathname) {
    var m2 = re2.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i3) {
      if (m2[i3] === void 0)
        return "continue";
      var key = keys2[i3 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i3].split(key.prefix + key.suffix).map(function(value) {
          return decode2(value, key);
        });
      } else {
        params[key.name] = decode2(m2[i3], key);
      }
    };
    for (var i2 = 1; i2 < m2.length; i2++) {
      _loop_1(i2);
    }
    return { path, index, params };
  };
}
pathToRegexp$2.regexpToFunction = regexpToFunction;
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys2) {
  if (!keys2)
    return path;
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i2 = 0; i2 < groups.length; i2++) {
      keys2.push({
        name: i2,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      });
    }
  }
  return path;
}
function arrayToRegexp(paths, keys2, options) {
  var parts2 = paths.map(function(path) {
    return pathToRegexp$1(path, keys2, options).source;
  });
  return new RegExp("(?:" + parts2.join("|") + ")", flags(options));
}
function stringToRegexp(path, keys2, options) {
  return tokensToRegexp(parse(path, options), keys2, options);
}
function tokensToRegexp(tokens, keys2, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode2 = _d === void 0 ? function(x2) {
    return x2;
  } : _d;
  var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
  var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode2(token));
    } else {
      var prefix = escapeString(encode2(token.prefix));
      var suffix = escapeString(encode2(token.suffix));
      if (token.pattern) {
        if (keys2)
          keys2.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
          } else {
            route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
          }
        } else {
          route += "(" + token.pattern + ")" + token.modifier;
        }
      } else {
        route += "(?:" + prefix + suffix + ")" + token.modifier;
      }
    }
  }
  if (end) {
    if (!strict)
      route += delimiter + "?";
    route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:" + delimiter + "(?=" + endsWith + "))?";
    }
    if (!isEndDelimited) {
      route += "(?=" + delimiter + "|" + endsWith + ")";
    }
  }
  return new RegExp(route, flags(options));
}
pathToRegexp$2.tokensToRegexp = tokensToRegexp;
function pathToRegexp$1(path, keys2, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys2);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys2, options);
  return stringToRegexp(path, keys2, options);
}
pathToRegexp$2.pathToRegexp = pathToRegexp$1;
Object.defineProperty(pathMatch, "__esModule", {
  value: true
});
pathMatch.default = pathMatch.customRouteMatcherOptions = pathMatch.matcherOptions = pathMatch.pathToRegexp = void 0;
var pathToRegexp = _interopRequireWildcard$1(pathToRegexp$2);
function _interopRequireWildcard$1(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
pathMatch.pathToRegexp = pathToRegexp;
const matcherOptions = {
  sensitive: false,
  delimiter: "/"
};
pathMatch.matcherOptions = matcherOptions;
const customRouteMatcherOptions = __spreadProps(__spreadValues({}, matcherOptions), {
  strict: true
});
pathMatch.customRouteMatcherOptions = customRouteMatcherOptions;
var _default$1 = (customRoute = false) => {
  return (path, regexModifier) => {
    const keys2 = [];
    let matcherRegex = pathToRegexp.pathToRegexp(path, keys2, customRoute ? customRouteMatcherOptions : matcherOptions);
    if (regexModifier) {
      const regexSource = regexModifier(matcherRegex.source);
      matcherRegex = new RegExp(regexSource, matcherRegex.flags);
    }
    const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys2);
    return (pathname, params) => {
      const res = pathname == null ? false : matcher(pathname);
      if (!res) {
        return false;
      }
      if (customRoute) {
        for (const key of keys2) {
          if (typeof key.name === "number") {
            delete res.params[key.name];
          }
        }
      }
      return __spreadValues(__spreadValues({}, params), res.params);
    };
  };
};
pathMatch.default = _default$1;
var prepareDestination$1 = {};
var escapeRegexp = {};
Object.defineProperty(escapeRegexp, "__esModule", {
  value: true
});
escapeRegexp.escapeStringRegexp = escapeStringRegexp;
function escapeStringRegexp(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
}
var parseUrl$1 = {};
Object.defineProperty(parseUrl$1, "__esModule", {
  value: true
});
parseUrl$1.parseUrl = parseUrl;
var _querystring$1 = querystring$1;
var _parseRelativeUrl$2 = parseRelativeUrl$1;
function parseUrl(url2) {
  if (url2.startsWith("/")) {
    return _parseRelativeUrl$2.parseRelativeUrl(url2);
  }
  const parsedURL = new URL(url2);
  return {
    hash: parsedURL.hash,
    hostname: parsedURL.hostname,
    href: parsedURL.href,
    pathname: parsedURL.pathname,
    port: parsedURL.port,
    protocol: parsedURL.protocol,
    query: _querystring$1.searchParamsToUrlQuery(parsedURL.searchParams),
    search: parsedURL.search
  };
}
Object.defineProperty(prepareDestination$1, "__esModule", {
  value: true
});
prepareDestination$1.matchHas = matchHas;
prepareDestination$1.compileNonPath = compileNonPath;
prepareDestination$1.prepareDestination = prepareDestination;
var _pathToRegexp = pathToRegexp$2;
var _escapeRegexp = escapeRegexp;
var _parseUrl = parseUrl$1;
function matchHas(req, has2, query) {
  const params = {};
  const allMatch = has2.every((hasItem) => {
    let value;
    let key = hasItem.key;
    switch (hasItem.type) {
      case "header": {
        key = key.toLowerCase();
        value = req.headers[key];
        break;
      }
      case "cookie": {
        value = req.cookies[hasItem.key];
        break;
      }
      case "query": {
        value = query[key];
        break;
      }
      case "host": {
        const { host } = (req === null || req === void 0 ? void 0 : req.headers) || {};
        const hostname = host === null || host === void 0 ? void 0 : host.split(":")[0].toLowerCase();
        value = hostname;
        break;
      }
    }
    if (!hasItem.value && value) {
      params[getSafeParamName(key)] = value;
      return true;
    } else if (value) {
      const matcher = new RegExp(`^${hasItem.value}$`);
      const matches = Array.isArray(value) ? value.slice(-1)[0].match(matcher) : value.match(matcher);
      if (matches) {
        if (Array.isArray(matches)) {
          if (matches.groups) {
            Object.keys(matches.groups).forEach((groupKey) => {
              params[groupKey] = matches.groups[groupKey];
            });
          } else if (hasItem.type === "host" && matches[0]) {
            params.host = matches[0];
          }
        }
        return true;
      }
    }
    return false;
  });
  if (allMatch) {
    return params;
  }
  return false;
}
function compileNonPath(value, params) {
  if (!value.includes(":")) {
    return value;
  }
  for (const key of Object.keys(params)) {
    if (value.includes(`:${key}`)) {
      value = value.replace(new RegExp(`:${key}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
    }
  }
  value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISKS/g, "*");
  return _pathToRegexp.compile(`/${value}`, {
    validate: false
  })(params).substr(1);
}
function prepareDestination(args) {
  const query = Object.assign({}, args.query);
  delete query.__nextLocale;
  delete query.__nextDefaultLocale;
  let escapedDestination = args.destination;
  for (const param of Object.keys(__spreadValues(__spreadValues({}, args.params), query))) {
    escapedDestination = escapeSegment(escapedDestination, param);
  }
  const parsedDestination = _parseUrl.parseUrl(escapedDestination);
  const destQuery = parsedDestination.query;
  const destPath = unescapeSegments(`${parsedDestination.pathname}${parsedDestination.hash || ""}`);
  const destHostname = unescapeSegments(parsedDestination.hostname || "");
  const destPathParamKeys = [];
  const destHostnameParamKeys = [];
  _pathToRegexp.pathToRegexp(destPath, destPathParamKeys);
  _pathToRegexp.pathToRegexp(destHostname, destHostnameParamKeys);
  const destParams = [];
  destPathParamKeys.forEach((key) => destParams.push(key.name));
  destHostnameParamKeys.forEach((key) => destParams.push(key.name));
  const destPathCompiler = _pathToRegexp.compile(destPath, {
    validate: false
  });
  const destHostnameCompiler = _pathToRegexp.compile(destHostname, {
    validate: false
  });
  for (const [key, strOrArray] of Object.entries(destQuery)) {
    if (Array.isArray(strOrArray)) {
      destQuery[key] = strOrArray.map((value) => compileNonPath(unescapeSegments(value), args.params));
    } else {
      destQuery[key] = compileNonPath(unescapeSegments(strOrArray), args.params);
    }
  }
  let paramKeys = Object.keys(args.params).filter((name) => name !== "nextInternalLocale");
  if (args.appendParamsToQuery && !paramKeys.some((key) => destParams.includes(key))) {
    for (const key of paramKeys) {
      if (!(key in destQuery)) {
        destQuery[key] = args.params[key];
      }
    }
  }
  let newUrl;
  try {
    newUrl = destPathCompiler(args.params);
    const [pathname, hash] = newUrl.split("#");
    parsedDestination.hostname = destHostnameCompiler(args.params);
    parsedDestination.pathname = pathname;
    parsedDestination.hash = `${hash ? "#" : ""}${hash || ""}`;
    delete parsedDestination.search;
  } catch (err) {
    if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
      throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`);
    }
    throw err;
  }
  parsedDestination.query = __spreadValues(__spreadValues({}, query), parsedDestination.query);
  return {
    newUrl,
    parsedDestination
  };
}
function getSafeParamName(paramName) {
  let newParamName = "";
  for (let i2 = 0; i2 < paramName.length; i2++) {
    const charCode = paramName.charCodeAt(i2);
    if (charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123) {
      newParamName += paramName[i2];
    }
  }
  return newParamName;
}
function escapeSegment(str, segmentName) {
  return str.replace(new RegExp(`:${_escapeRegexp.escapeStringRegexp(segmentName)}`, "g"), `__ESC_COLON_${segmentName}`);
}
function unescapeSegments(str) {
  return str.replace(/__ESC_COLON_/gi, ":");
}
Object.defineProperty(resolveRewrites$1, "__esModule", {
  value: true
});
resolveRewrites$1.default = resolveRewrites;
var _pathMatch = _interopRequireDefault$4(pathMatch);
var _prepareDestination = prepareDestination$1;
var _normalizeTrailingSlash$1 = normalizeTrailingSlash;
var _normalizeLocalePath$1 = normalizeLocalePath$1;
var _parseRelativeUrl$1 = parseRelativeUrl$1;
var _router$2 = router$1;
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const customRouteMatcher = _pathMatch.default(true);
function resolveRewrites(asPath, pages, rewrites, query, resolveHref2, locales) {
  let matchedPage = false;
  let externalDest = false;
  let parsedAs = _parseRelativeUrl$1.parseRelativeUrl(asPath);
  let fsPathname = _normalizeTrailingSlash$1.removePathTrailingSlash(_normalizeLocalePath$1.normalizeLocalePath(_router$2.delBasePath(parsedAs.pathname), locales).pathname);
  let resolvedHref;
  const handleRewrite = (rewrite) => {
    const matcher = customRouteMatcher(rewrite.source);
    let params = matcher(parsedAs.pathname);
    if (rewrite.has && params) {
      const hasParams = _prepareDestination.matchHas({
        headers: {
          host: document.location.hostname
        },
        cookies: document.cookie.split("; ").reduce((acc, item) => {
          const [key, ...value] = item.split("=");
          acc[key] = value.join("=");
          return acc;
        }, {})
      }, rewrite.has, parsedAs.query);
      if (hasParams) {
        Object.assign(params, hasParams);
      } else {
        params = false;
      }
    }
    if (params) {
      if (!rewrite.destination) {
        externalDest = true;
        return true;
      }
      const destRes = _prepareDestination.prepareDestination({
        appendParamsToQuery: true,
        destination: rewrite.destination,
        params,
        query
      });
      parsedAs = destRes.parsedDestination;
      asPath = destRes.newUrl;
      Object.assign(query, destRes.parsedDestination.query);
      fsPathname = _normalizeTrailingSlash$1.removePathTrailingSlash(_normalizeLocalePath$1.normalizeLocalePath(_router$2.delBasePath(asPath), locales).pathname);
      if (pages.includes(fsPathname)) {
        matchedPage = true;
        resolvedHref = fsPathname;
        return true;
      }
      resolvedHref = resolveHref2(fsPathname);
      if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
        matchedPage = true;
        return true;
      }
    }
  };
  let finished = false;
  for (let i2 = 0; i2 < rewrites.beforeFiles.length; i2++) {
    finished = handleRewrite(rewrites.beforeFiles[i2]) || false;
  }
  matchedPage = pages.includes(fsPathname);
  if (!matchedPage) {
    if (!finished) {
      for (let i2 = 0; i2 < rewrites.afterFiles.length; i2++) {
        if (handleRewrite(rewrites.afterFiles[i2])) {
          finished = true;
          break;
        }
      }
    }
    if (!finished) {
      resolvedHref = resolveHref2(fsPathname);
      matchedPage = pages.includes(resolvedHref);
      finished = matchedPage;
    }
    if (!finished) {
      for (let i2 = 0; i2 < rewrites.fallback.length; i2++) {
        if (handleRewrite(rewrites.fallback[i2])) {
          finished = true;
          break;
        }
      }
    }
  }
  return {
    asPath,
    parsedAs,
    matchedPage,
    resolvedHref,
    externalDest
  };
}
var detectDomainLocale$2 = {};
Object.defineProperty(detectDomainLocale$2, "__esModule", {
  value: true
});
detectDomainLocale$2.detectDomainLocale = detectDomainLocale$1;
function detectDomainLocale$1(domainItems, hostname, detectedLocale) {
  let domainItem;
  if (domainItems) {
    if (detectedLocale) {
      detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems) {
      var ref, ref1;
      const domainHostname = (ref = item.domain) === null || ref === void 0 ? void 0 : ref.split(":")[0].toLowerCase();
      if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((ref1 = item.locales) === null || ref1 === void 0 ? void 0 : ref1.some((locale) => locale.toLowerCase() === detectedLocale))) {
        domainItem = item;
        break;
      }
    }
  }
  return domainItem;
}
Object.defineProperty(router$1, "__esModule", {
  value: true
});
router$1.getDomainLocale = getDomainLocale;
router$1.addLocale = addLocale;
router$1.delLocale = delLocale;
router$1.hasBasePath = hasBasePath;
router$1.addBasePath = addBasePath;
router$1.delBasePath = delBasePath;
router$1.isLocalURL = isLocalURL;
router$1.interpolateAs = interpolateAs;
router$1.resolveHref = resolveHref;
router$1.default = void 0;
var _normalizeTrailingSlash = normalizeTrailingSlash;
var _routeLoader = routeLoader;
var _isError = _interopRequireWildcard(isError$1);
var _denormalizePagePath = denormalizePagePath$1;
var _normalizeLocalePath = normalizeLocalePath$1;
var _mitt = _interopRequireDefault$3(mitt$1);
var _utils = utils;
var _isDynamic = isDynamic;
var _parseRelativeUrl = parseRelativeUrl$1;
var _querystring = querystring$1;
var _resolveRewrites = _interopRequireDefault$3(resolveRewrites$1);
var _routeMatcher = routeMatcher;
var _routeRegex = routeRegex;
var _getMiddlewareRegex = getMiddlewareRegex$1;
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
let detectDomainLocale;
if ({}.__NEXT_I18N_SUPPORT) {
  detectDomainLocale = detectDomainLocale$2.detectDomainLocale;
}
const basePath = {}.__NEXT_ROUTER_BASEPATH || "";
function buildCancellationError() {
  return Object.assign(new Error("Route Cancelled"), {
    cancelled: true
  });
}
function addPathPrefix(path, prefix) {
  if (!path.startsWith("/") || !prefix) {
    return path;
  }
  const pathname = pathNoQueryHash(path);
  return _normalizeTrailingSlash.normalizePathTrailingSlash(`${prefix}${pathname}`) + path.substr(pathname.length);
}
function getDomainLocale(path, locale, locales, domainLocales) {
  if ({}.__NEXT_I18N_SUPPORT) {
    locale = locale || _normalizeLocalePath.normalizeLocalePath(path, locales).detectedLocale;
    const detectedDomain = detectDomainLocale(domainLocales, void 0, locale);
    if (detectedDomain) {
      return `http${detectedDomain.http ? "" : "s"}://${detectedDomain.domain}${basePath || ""}${locale === detectedDomain.defaultLocale ? "" : `/${locale}`}${path}`;
    }
    return false;
  } else {
    return false;
  }
}
function addLocale(path, locale, defaultLocale) {
  if ({}.__NEXT_I18N_SUPPORT) {
    const pathname = pathNoQueryHash(path);
    const pathLower = pathname.toLowerCase();
    const localeLower = locale && locale.toLowerCase();
    return locale && locale !== defaultLocale && !pathLower.startsWith("/" + localeLower + "/") && pathLower !== "/" + localeLower ? addPathPrefix(path, "/" + locale) : path;
  }
  return path;
}
function delLocale(path, locale) {
  if ({}.__NEXT_I18N_SUPPORT) {
    const pathname = pathNoQueryHash(path);
    const pathLower = pathname.toLowerCase();
    const localeLower = locale && locale.toLowerCase();
    return locale && (pathLower.startsWith("/" + localeLower + "/") || pathLower === "/" + localeLower) ? (pathname.length === locale.length + 1 ? "/" : "") + path.substr(locale.length + 1) : path;
  }
  return path;
}
function pathNoQueryHash(path) {
  const queryIndex = path.indexOf("?");
  const hashIndex = path.indexOf("#");
  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }
  return path;
}
function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + "/");
}
function addBasePath(path) {
  return addPathPrefix(path, basePath);
}
function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith("/"))
    path = `/${path}`;
  return path;
}
function isLocalURL(url2) {
  if (url2.startsWith("/") || url2.startsWith("#") || url2.startsWith("?"))
    return true;
  try {
    const locationOrigin = (0, _utils).getLocationOrigin();
    const resolved = new URL(url2, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_2) {
    return false;
  }
}
function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = "";
  const dynamicRegex = _routeRegex.getRouteRegex(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = (asPathname !== route ? _routeMatcher.getRouteMatcher(dynamicRegex)(asPathname) : "") || query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);
  if (!params.every((param) => {
    let value = dynamicMatches[param] || "";
    const { repeat, optional } = dynamicGroups[param];
    let replaced = `[${repeat ? "..." : ""}${param}]`;
    if (optional) {
      replaced = `${!value ? "/" : ""}[${replaced}]`;
    }
    if (repeat && !Array.isArray(value))
      value = [
        value
      ];
    return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map((segment) => encodeURIComponent(segment)).join("/") : encodeURIComponent(value)) || "/");
  })) {
    interpolatedRoute = "";
  }
  return {
    params,
    result: interpolatedRoute
  };
}
function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach((key) => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
function resolveHref(router2, href, resolveAs) {
  let base;
  let urlAsString = typeof href === "string" ? href : _utils.formatWithValidation(href);
  const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
  const urlAsStringNoProto = urlProtoMatch ? urlAsString.substr(urlProtoMatch[0].length) : urlAsString;
  const urlParts = urlAsStringNoProto.split("?");
  if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
    console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
    const normalizedUrl = _utils.normalizeRepeatedSlashes(urlAsStringNoProto);
    urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
  }
  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [
      urlAsString
    ] : urlAsString;
  }
  try {
    base = new URL(urlAsString.startsWith("#") ? router2.asPath : router2.pathname, "http://n");
  } catch (_2) {
    base = new URL("/", "http://n");
  }
  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
    let interpolatedAs = "";
    if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
      const { result, params } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);
      if (result) {
        interpolatedAs = (0, _utils).formatWithValidation({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    }
    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [
      resolvedHref,
      interpolatedAs || resolvedHref
    ] : resolvedHref;
  } catch (_1) {
    return resolveAs ? [
      urlAsString
    ] : urlAsString;
  }
}
function stripOrigin(url2) {
  const origin = _utils.getLocationOrigin();
  return url2.startsWith(origin) ? url2.substring(origin.length) : url2;
}
function prepareUrlAs(router2, url2, as) {
  let [resolvedHref, resolvedAs] = resolveHref(router2, url2, true);
  const origin = _utils.getLocationOrigin();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router2, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}
function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = _normalizeTrailingSlash.removePathTrailingSlash(_denormalizePagePath.denormalizePagePath(pathname));
  if (cleanPathname === "/404" || cleanPathname === "/_error") {
    return pathname;
  }
  if (!pages.includes(cleanPathname)) {
    pages.some((page) => {
      if (_isDynamic.isDynamicRoute(page) && _routeRegex.getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }
  return _normalizeTrailingSlash.removePathTrailingSlash(pathname);
}
const manualScrollRestoration = {}.__NEXT_SCROLL_RESTORATION && typeof window !== "undefined" && "scrollRestoration" in window.history && !!function() {
  try {
    let v2 = "__next";
    return sessionStorage.setItem(v2, v2), sessionStorage.removeItem(v2), true;
  } catch (n2) {
  }
}();
const SSG_DATA_NOT_FOUND = Symbol("SSG_DATA_NOT_FOUND");
function fetchRetry(url2, attempts, opts) {
  return fetch(url2, {
    credentials: "same-origin"
  }).then((res) => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url2, attempts - 1, opts);
      }
      if (res.status === 404) {
        return res.json().then((data) => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }
          throw new Error(`Failed to load static props`);
        });
      }
      throw new Error(`Failed to load static props`);
    }
    return opts.text ? res.text() : res.json();
  });
}
function fetchNextData(dataHref, isServerRender, text, inflightCache, persistCache) {
  const { href: cacheKey } = new URL(dataHref, window.location.href);
  if (inflightCache[cacheKey] !== void 0) {
    return inflightCache[cacheKey];
  }
  return inflightCache[cacheKey] = fetchRetry(dataHref, isServerRender ? 3 : 1, {
    text
  }).catch((err) => {
    if (!isServerRender) {
      _routeLoader.markAssetError(err);
    }
    throw err;
  }).then((data) => {
    if (!persistCache || false) {
      delete inflightCache[cacheKey];
    }
    return data;
  }).catch((err) => {
    delete inflightCache[cacheKey];
    throw err;
  });
}
class Router {
  constructor(pathname, query, as, { initialProps, pageLoader, App, wrapApp, Component, err, subscription, isFallback, locale, locales, defaultLocale, domainLocales, isPreview }) {
    this.sdc = {};
    this.sdr = {};
    this.sde = {};
    this._idx = 0;
    this.onPopState = (e2) => {
      const state = e2.state;
      if (!state) {
        const { pathname: pathname3, query: query2 } = this;
        this.changeState("replaceState", _utils.formatWithValidation({
          pathname: addBasePath(pathname3),
          query: query2
        }), _utils.getURL());
        return;
      }
      if (!state.__N) {
        return;
      }
      let forcedScroll;
      const { url: url2, as: as2, options, idx } = state;
      if ({}.__NEXT_SCROLL_RESTORATION) {
        if (manualScrollRestoration) {
          if (this._idx !== idx) {
            try {
              sessionStorage.setItem("__next_scroll_" + this._idx, JSON.stringify({
                x: self.pageXOffset,
                y: self.pageYOffset
              }));
            } catch {
            }
            try {
              const v2 = sessionStorage.getItem("__next_scroll_" + idx);
              forcedScroll = JSON.parse(v2);
            } catch {
              forcedScroll = {
                x: 0,
                y: 0
              };
            }
          }
        }
      }
      this._idx = idx;
      const { pathname: pathname2 } = _parseRelativeUrl.parseRelativeUrl(url2);
      if (this.isSsr && as2 === addBasePath(this.asPath) && pathname2 === addBasePath(this.pathname)) {
        return;
      }
      if (this._bps && !this._bps(state)) {
        return;
      }
      this.change("replaceState", url2, as2, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    };
    const route = _normalizeTrailingSlash.removePathTrailingSlash(pathname);
    this.components = {};
    if (pathname !== "/_error") {
      var ref;
      this.components[route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP,
        __N_RSC: !!((ref = Component) === null || ref === void 0 ? void 0 : ref.__next_rsc__)
      };
    }
    this.components["/_app"] = {
      Component: App,
      styleSheets: []
    };
    this.events = Router.events;
    this.pageLoader = pageLoader;
    const autoExportDynamic = _isDynamic.isDynamicRoute(pathname) && self.__NEXT_DATA__.autoExport;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp;
    this.isSsr = true;
    this.isLocaleDomain = false;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !{}.__NEXT_HAS_REWRITES);
    if ({}.__NEXT_I18N_SUPPORT) {
      this.locales = locales;
      this.defaultLocale = defaultLocale;
      this.domainLocales = domainLocales;
      this.isLocaleDomain = !!detectDomainLocale(domainLocales, self.location.hostname);
    }
    this.state = {
      route,
      pathname,
      query,
      asPath: autoExportDynamic ? pathname : as,
      isPreview: !!isPreview,
      locale: {}.__NEXT_I18N_SUPPORT ? locale : void 0,
      isFallback
    };
    if (typeof window !== "undefined") {
      if (as.substr(0, 2) !== "//") {
        const options = {
          locale
        };
        options._shouldResolveHref = as !== pathname;
        this.changeState("replaceState", _utils.formatWithValidation({
          pathname: addBasePath(pathname),
          query
        }), _utils.getURL(), options);
      }
      window.addEventListener("popstate", this.onPopState);
      if ({}.__NEXT_SCROLL_RESTORATION) {
        if (manualScrollRestoration) {
          window.history.scrollRestoration = "manual";
        }
      }
    }
  }
  reload() {
    window.location.reload();
  }
  back() {
    window.history.back();
  }
  push(url2, as, options = {}) {
    if ({}.__NEXT_SCROLL_RESTORATION) {
      if (manualScrollRestoration) {
        try {
          sessionStorage.setItem("__next_scroll_" + this._idx, JSON.stringify({
            x: self.pageXOffset,
            y: self.pageYOffset
          }));
        } catch {
        }
      }
    }
    ({ url: url2, as } = prepareUrlAs(this, url2, as));
    return this.change("pushState", url2, as, options);
  }
  replace(url2, as, options = {}) {
    ({ url: url2, as } = prepareUrlAs(this, url2, as));
    return this.change("replaceState", url2, as, options);
  }
  async change(method, url2, as, options, forcedScroll) {
    if (!isLocalURL(url2)) {
      window.location.href = url2;
      return false;
    }
    const shouldResolveHref = options._h || options._shouldResolveHref || pathNoQueryHash(url2) === pathNoQueryHash(as);
    const nextState = __spreadValues({}, this.state);
    if (options._h) {
      this.isReady = true;
    }
    const prevLocale = nextState.locale;
    if ({}.__NEXT_I18N_SUPPORT) {
      nextState.locale = options.locale === false ? this.defaultLocale : options.locale || nextState.locale;
      if (typeof options.locale === "undefined") {
        options.locale = nextState.locale;
      }
      const parsedAs = _parseRelativeUrl.parseRelativeUrl(hasBasePath(as) ? delBasePath(as) : as);
      const localePathResult = _normalizeLocalePath.normalizeLocalePath(parsedAs.pathname, this.locales);
      if (localePathResult.detectedLocale) {
        nextState.locale = localePathResult.detectedLocale;
        parsedAs.pathname = addBasePath(parsedAs.pathname);
        as = _utils.formatWithValidation(parsedAs);
        url2 = addBasePath(_normalizeLocalePath.normalizeLocalePath(hasBasePath(url2) ? delBasePath(url2) : url2, this.locales).pathname);
      }
      let didNavigate = false;
      if ({}.__NEXT_I18N_SUPPORT) {
        var ref;
        if (!((ref = this.locales) === null || ref === void 0 ? void 0 : ref.includes(nextState.locale))) {
          parsedAs.pathname = addLocale(parsedAs.pathname, nextState.locale);
          window.location.href = _utils.formatWithValidation(parsedAs);
          didNavigate = true;
        }
      }
      const detectedDomain = detectDomainLocale(this.domainLocales, void 0, nextState.locale);
      if ({}.__NEXT_I18N_SUPPORT) {
        if (!didNavigate && detectedDomain && this.isLocaleDomain && self.location.hostname !== detectedDomain.domain) {
          const asNoBasePath = delBasePath(as);
          window.location.href = `http${detectedDomain.http ? "" : "s"}://${detectedDomain.domain}${addBasePath(`${nextState.locale === detectedDomain.defaultLocale ? "" : `/${nextState.locale}`}${asNoBasePath === "/" ? "" : asNoBasePath}` || "/")}`;
          didNavigate = true;
        }
      }
      if (didNavigate) {
        return new Promise(() => {
        });
      }
    }
    if (!options._h) {
      this.isSsr = false;
    }
    if (_utils.ST) {
      performance.mark("routeChange");
    }
    const { shallow = false, scroll = true } = options;
    const routeProps = {
      shallow
    };
    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }
    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, nextState.locale);
    this._inFlightRoute = as;
    let localeChange = prevLocale !== nextState.locale;
    if (!options._h && this.onlyAHashChange(cleanedAs) && !localeChange) {
      nextState.asPath = cleanedAs;
      Router.events.emit("hashChangeStart", as, routeProps);
      this.changeState(method, url2, as, __spreadProps(__spreadValues({}, options), {
        scroll: false
      }));
      if (scroll) {
        this.scrollToHash(cleanedAs);
      }
      this.set(nextState, this.components[nextState.route], null);
      Router.events.emit("hashChangeComplete", as, routeProps);
      return true;
    }
    let parsed = _parseRelativeUrl.parseRelativeUrl(url2);
    let { pathname, query } = parsed;
    let pages, rewrites;
    try {
      [pages, { __rewrites: rewrites }] = await Promise.all([
        this.pageLoader.getPageList(),
        (0, _routeLoader).getClientBuildManifest(),
        this.pageLoader.getMiddlewareList()
      ]);
    } catch (err) {
      window.location.href = as;
      return false;
    }
    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = "replaceState";
    }
    let resolvedAs = as;
    pathname = pathname ? _normalizeTrailingSlash.removePathTrailingSlash(delBasePath(pathname)) : pathname;
    if (shouldResolveHref && pathname !== "/_error") {
      options._shouldResolveHref = true;
      if ({}.__NEXT_HAS_REWRITES && as.startsWith("/")) {
        const rewritesResult = _resolveRewrites.default(addBasePath(addLocale(cleanedAs, nextState.locale)), pages, rewrites, query, (p2) => resolveDynamicRoute(p2, pages), this.locales);
        if (rewritesResult.externalDest) {
          location.href = as;
          return true;
        }
        resolvedAs = rewritesResult.asPath;
        if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
          pathname = rewritesResult.resolvedHref;
          parsed.pathname = addBasePath(pathname);
          url2 = _utils.formatWithValidation(parsed);
        }
      } else {
        parsed.pathname = resolveDynamicRoute(pathname, pages);
        if (parsed.pathname !== pathname) {
          pathname = parsed.pathname;
          parsed.pathname = addBasePath(pathname);
          url2 = _utils.formatWithValidation(parsed);
        }
      }
    }
    if (!isLocalURL(as)) {
      window.location.href = as;
      return false;
    }
    resolvedAs = delLocale(delBasePath(resolvedAs), nextState.locale);
    if (options._h !== 1 || _isDynamic.isDynamicRoute(_normalizeTrailingSlash.removePathTrailingSlash(pathname))) {
      const effect = await this._preflightRequest({
        as,
        cache: true,
        pages,
        pathname,
        query,
        locale: nextState.locale,
        isPreview: nextState.isPreview
      });
      if (effect.type === "rewrite") {
        query = __spreadValues(__spreadValues({}, query), effect.parsedAs.query);
        resolvedAs = effect.asPath;
        pathname = effect.resolvedHref;
        parsed.pathname = effect.resolvedHref;
        url2 = _utils.formatWithValidation(parsed);
      } else if (effect.type === "redirect" && effect.newAs) {
        return this.change(method, effect.newUrl, effect.newAs, options);
      } else if (effect.type === "redirect" && effect.destination) {
        window.location.href = effect.destination;
        return new Promise(() => {
        });
      } else if (effect.type === "refresh" && as !== window.location.pathname) {
        window.location.href = as;
        return new Promise(() => {
        });
      }
    }
    const route = _normalizeTrailingSlash.removePathTrailingSlash(pathname);
    if (_isDynamic.isDynamicRoute(route)) {
      const parsedAs = _parseRelativeUrl.parseRelativeUrl(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex2 = _routeRegex.getRouteRegex(route);
      const routeMatch = _routeMatcher.getRouteMatcher(routeRegex2)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};
      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex2.groups).filter((param) => !query[param]);
        if (missingParams.length > 0) {
          throw new Error((shouldInterpolate ? `The provided \`href\` (${url2}) value is missing query values (${missingParams.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? "href-interpolation-failed" : "incompatible-href-as"}`);
        }
      } else if (shouldInterpolate) {
        as = _utils.formatWithValidation(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        Object.assign(query, routeMatch);
      }
    }
    Router.events.emit("routeChangeStart", as, routeProps);
    try {
      var ref, ref1;
      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps, nextState.locale, nextState.isPreview);
      let { error, props, __N_SSG, __N_SSP } = routeInfo;
      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT;
          if (destination.startsWith("/") && props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
            const { url: newUrl, as: newAs } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }
          window.location.href = destination;
          return new Promise(() => {
          });
        }
        nextState.isPreview = !!props.__N_PREVIEW;
        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;
          try {
            await this.fetchComponent("/404");
            notFoundRoute = "/404";
          } catch (_2) {
            notFoundRoute = "/_error";
          }
          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          }, nextState.locale, nextState.isPreview);
        }
      }
      Router.events.emit("beforeHistoryChange", as, routeProps);
      this.changeState(method, url2, as, options);
      if (options._h && pathname === "/_error" && ((ref = self.__NEXT_DATA__.props) === null || ref === void 0 ? void 0 : (ref1 = ref.pageProps) === null || ref1 === void 0 ? void 0 : ref1.statusCode) === 500 && (props === null || props === void 0 ? void 0 : props.pageProps)) {
        props.pageProps.statusCode = 500;
      }
      const isValidShallowRoute = options.shallow && nextState.route === route;
      var _scroll;
      const shouldScroll = (_scroll = options.scroll) !== null && _scroll !== void 0 ? _scroll : !isValidShallowRoute;
      const resetScroll = shouldScroll ? {
        x: 0,
        y: 0
      } : null;
      await this.set(__spreadProps(__spreadValues({}, nextState), {
        route,
        pathname,
        query,
        asPath: cleanedAs,
        isFallback: false
      }), routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch((e2) => {
        if (e2.cancelled)
          error = error || e2;
        else
          throw e2;
      });
      if (error) {
        Router.events.emit("routeChangeError", error, cleanedAs, routeProps);
        throw error;
      }
      if ({}.__NEXT_I18N_SUPPORT) {
        if (nextState.locale) {
          document.documentElement.lang = nextState.locale;
        }
      }
      Router.events.emit("routeChangeComplete", as, routeProps);
      return true;
    } catch (err1) {
      if (_isError.default(err1) && err1.cancelled) {
        return false;
      }
      throw err1;
    }
  }
  changeState(method, url2, as, options = {}) {
    if (method !== "pushState" || _utils.getURL() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url: url2,
        as,
        options,
        __N: true,
        idx: this._idx = method !== "pushState" ? this._idx : this._idx + 1
      }, "", as);
    }
  }
  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      throw err;
    }
    if (_routeLoader.isAssetError(err) || loadErrorFail) {
      Router.events.emit("routeChangeError", err, as, routeProps);
      window.location.href = as;
      throw buildCancellationError();
    }
    try {
      let Component;
      let styleSheets;
      let props;
      if (typeof Component === "undefined" || typeof styleSheets === "undefined") {
        ({ page: Component, styleSheets } = await this.fetchComponent("/_error"));
      }
      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };
      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error("Error in error page `getInitialProps`: ", gipErr);
          routeInfo.props = {};
        }
      }
      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(_isError.default(routeInfoErr) ? routeInfoErr : new Error(routeInfoErr + ""), pathname, query, as, routeProps, true);
    }
  }
  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps, locale, isPreview) {
    try {
      const existingRouteInfo = this.components[route];
      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }
      let cachedRouteInfo = void 0;
      if (existingRouteInfo && !("initial" in existingRouteInfo)) {
        cachedRouteInfo = existingRouteInfo;
      }
      const routeInfo = cachedRouteInfo || await this.fetchComponent(route).then((res) => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP,
        __N_RSC: !!res.page.__next_rsc__
      }));
      const { Component, __N_SSG, __N_SSP, __N_RSC } = routeInfo;
      if (false)
        ;
      let dataHref;
      if (__N_SSG || __N_SSP || __N_RSC) {
        dataHref = this.pageLoader.getDataHref({
          href: (0, _utils).formatWithValidation({
            pathname,
            query
          }),
          asPath: resolvedAs,
          ssg: __N_SSG,
          rsc: __N_RSC,
          locale
        });
      }
      const props = await this._getData(() => __N_SSG || __N_SSP ? fetchNextData(dataHref, this.isSsr, false, __N_SSG ? this.sdc : this.sdr, !!__N_SSG && !isPreview) : this.getInitialProps(Component, {
        pathname,
        query,
        asPath: as,
        locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      if (__N_RSC) {
        const { fresh, data } = await this._getData(() => this._getFlightData(dataHref));
        props.pageProps = Object.assign(props.pageProps, {
          __flight_serialized__: data,
          __flight_fresh__: fresh
        });
      }
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(_isError.getProperError(err), pathname, query, as, routeProps);
    }
  }
  set(state, data, resetScroll) {
    this.state = state;
    return this.sub(data, this.components["/_app"].Component, resetScroll);
  }
  beforePopState(cb) {
    this._bps = cb;
  }
  onlyAHashChange(as) {
    if (!this.asPath)
      return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split("#");
    const [newUrlNoHash, newHash] = as.split("#");
    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    }
    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    }
    return oldHash !== newHash;
  }
  scrollToHash(as) {
    const [, hash = ""] = as.split("#");
    if (hash === "" || hash === "top") {
      window.scrollTo(0, 0);
      return;
    }
    const idEl = document.getElementById(hash);
    if (idEl) {
      idEl.scrollIntoView();
      return;
    }
    const nameEl = document.getElementsByName(hash)[0];
    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }
  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  async prefetch(url2, asPath = url2, options = {}) {
    let parsed = _parseRelativeUrl.parseRelativeUrl(url2);
    let { pathname, query } = parsed;
    if ({}.__NEXT_I18N_SUPPORT) {
      if (options.locale === false) {
        pathname = _normalizeLocalePath.normalizeLocalePath(pathname, this.locales).pathname;
        parsed.pathname = pathname;
        url2 = _utils.formatWithValidation(parsed);
        let parsedAs = _parseRelativeUrl.parseRelativeUrl(asPath);
        const localePathResult = _normalizeLocalePath.normalizeLocalePath(parsedAs.pathname, this.locales);
        parsedAs.pathname = localePathResult.pathname;
        options.locale = localePathResult.detectedLocale || this.defaultLocale;
        asPath = _utils.formatWithValidation(parsedAs);
      }
    }
    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;
    if ({}.__NEXT_HAS_REWRITES && asPath.startsWith("/")) {
      let rewrites;
      ({ __rewrites: rewrites } = await _routeLoader.getClientBuildManifest());
      const rewritesResult = _resolveRewrites.default(addBasePath(addLocale(asPath, this.locale)), pages, rewrites, parsed.query, (p2) => resolveDynamicRoute(p2, pages), this.locales);
      if (rewritesResult.externalDest) {
        return;
      }
      resolvedAs = delLocale(delBasePath(rewritesResult.asPath), this.locale);
      if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
        pathname = rewritesResult.resolvedHref;
        parsed.pathname = pathname;
        url2 = _utils.formatWithValidation(parsed);
      }
    } else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);
      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        parsed.pathname = pathname;
        url2 = _utils.formatWithValidation(parsed);
      }
    }
    const effects = await this._preflightRequest({
      as: addBasePath(asPath),
      cache: true,
      pages,
      pathname,
      query,
      locale: this.locale,
      isPreview: this.isPreview
    });
    if (effects.type === "rewrite") {
      parsed.pathname = effects.resolvedHref;
      pathname = effects.resolvedHref;
      query = __spreadValues(__spreadValues({}, query), effects.parsedAs.query);
      resolvedAs = effects.asPath;
      url2 = _utils.formatWithValidation(parsed);
    }
    const route = _normalizeTrailingSlash.removePathTrailingSlash(pathname);
    await Promise.all([
      this.pageLoader._isSsg(route).then((isSsg) => {
        return isSsg ? fetchNextData(this.pageLoader.getDataHref({
          href: url2,
          asPath: resolvedAs,
          ssg: true,
          locale: typeof options.locale !== "undefined" ? options.locale : this.locale
        }), false, false, this.sdc, true) : false;
      }),
      this.pageLoader[options.priority ? "loadPage" : "prefetch"](route)
    ]);
  }
  async fetchComponent(route) {
    let cancelled = false;
    const cancel = this.clc = () => {
      cancelled = true;
    };
    const handleCancelled = () => {
      if (cancelled) {
        const error = new Error(`Abort fetching component for route: "${route}"`);
        error.cancelled = true;
        throw error;
      }
      if (cancel === this.clc) {
        this.clc = null;
      }
    };
    try {
      const componentResult = await this.pageLoader.loadPage(route);
      handleCancelled();
      return componentResult;
    } catch (err) {
      handleCancelled();
      throw err;
    }
  }
  _getData(fn) {
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    this.clc = cancel;
    return fn().then((data) => {
      if (cancel === this.clc) {
        this.clc = null;
      }
      if (cancelled) {
        const err = new Error("Loading initial props cancelled");
        err.cancelled = true;
        throw err;
      }
      return data;
    });
  }
  _getFlightData(dataHref) {
    return fetchNextData(dataHref, true, true, this.sdc, false).then((serialized) => {
      return {
        fresh: true,
        data: serialized
      };
    });
  }
  async _preflightRequest(options) {
    const cleanedAs = delLocale(hasBasePath(options.as) ? delBasePath(options.as) : options.as, options.locale);
    const fns = await this.pageLoader.getMiddlewareList();
    const requiresPreflight = fns.some(([middleware, isSSR]) => {
      return _routeMatcher.getRouteMatcher(_getMiddlewareRegex.getMiddlewareRegex(middleware, !isSSR))(cleanedAs);
    });
    if (!requiresPreflight) {
      return {
        type: "next"
      };
    }
    const preflight = await this._getPreflightData({
      preflightHref: options.as,
      shouldCache: options.cache,
      isPreview: options.isPreview
    });
    if (preflight.rewrite) {
      if (!preflight.rewrite.startsWith("/")) {
        return {
          type: "redirect",
          destination: options.as
        };
      }
      const parsed = _parseRelativeUrl.parseRelativeUrl(_normalizeLocalePath.normalizeLocalePath(hasBasePath(preflight.rewrite) ? delBasePath(preflight.rewrite) : preflight.rewrite, this.locales).pathname);
      const fsPathname = _normalizeTrailingSlash.removePathTrailingSlash(parsed.pathname);
      let matchedPage;
      let resolvedHref;
      if (options.pages.includes(fsPathname)) {
        matchedPage = true;
        resolvedHref = fsPathname;
      } else {
        resolvedHref = resolveDynamicRoute(fsPathname, options.pages);
        if (resolvedHref !== parsed.pathname && options.pages.includes(resolvedHref)) {
          matchedPage = true;
        }
      }
      return {
        type: "rewrite",
        asPath: parsed.pathname,
        parsedAs: parsed,
        matchedPage,
        resolvedHref
      };
    }
    if (preflight.redirect) {
      if (preflight.redirect.startsWith("/")) {
        const cleanRedirect = _normalizeTrailingSlash.removePathTrailingSlash(_normalizeLocalePath.normalizeLocalePath(hasBasePath(preflight.redirect) ? delBasePath(preflight.redirect) : preflight.redirect, this.locales).pathname);
        const { url: newUrl, as: newAs } = prepareUrlAs(this, cleanRedirect, cleanRedirect);
        return {
          type: "redirect",
          newUrl,
          newAs
        };
      }
      return {
        type: "redirect",
        destination: preflight.redirect
      };
    }
    if (preflight.refresh && !preflight.ssr) {
      return {
        type: "refresh"
      };
    }
    return {
      type: "next"
    };
  }
  _getPreflightData(params) {
    const { preflightHref, shouldCache = false, isPreview } = params;
    const { href: cacheKey } = new URL(preflightHref, window.location.href);
    if (!isPreview && shouldCache && this.sde[cacheKey]) {
      return Promise.resolve(this.sde[cacheKey]);
    }
    return fetch(preflightHref, {
      method: "HEAD",
      credentials: "same-origin",
      headers: {
        "x-middleware-preflight": "1"
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to preflight request`);
      }
      return {
        cache: res.headers.get("x-middleware-cache"),
        redirect: res.headers.get("Location"),
        refresh: res.headers.has("x-middleware-refresh"),
        rewrite: res.headers.get("x-middleware-rewrite"),
        ssr: !!res.headers.get("x-middleware-ssr")
      };
    }).then((data) => {
      if (shouldCache && data.cache !== "no-cache") {
        this.sde[cacheKey] = data;
      }
      return data;
    }).catch((err) => {
      delete this.sde[cacheKey];
      throw err;
    });
  }
  getInitialProps(Component, ctx) {
    const { Component: App } = this.components["/_app"];
    const AppTree = this._wrapApp(App);
    ctx.AppTree = AppTree;
    return _utils.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }
  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit("routeChangeError", buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }
  get route() {
    return this.state.route;
  }
  get pathname() {
    return this.state.pathname;
  }
  get query() {
    return this.state.query;
  }
  get asPath() {
    return this.state.asPath;
  }
  get locale() {
    return this.state.locale;
  }
  get isFallback() {
    return this.state.isFallback;
  }
  get isPreview() {
    return this.state.isPreview;
  }
}
Router.events = _mitt.default();
router$1.default = Router;
var router = {};
var routerContext = {};
Object.defineProperty(routerContext, "__esModule", {
  value: true
});
routerContext.RouterContext = void 0;
var _react$3 = _interopRequireDefault$2(React__default);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const RouterContext = _react$3.default.createContext(null);
routerContext.RouterContext = RouterContext;
var withRouter$1 = {};
Object.defineProperty(withRouter$1, "__esModule", {
  value: true
});
withRouter$1.default = withRouter;
var _react$2 = _interopRequireDefault$1(React__default);
var _router$1 = router;
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /* @__PURE__ */ _react$2.default.createElement(ComposedComponent, Object.assign({
      router: _router$1.useRouter()
    }, props));
  }
  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;
  return WithRouterWrapper;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "Router", {
    enumerable: true,
    get: function() {
      return _router2.default;
    }
  });
  Object.defineProperty(exports, "withRouter", {
    enumerable: true,
    get: function() {
      return _withRouter.default;
    }
  });
  exports.useRouter = useRouter;
  exports.createRouter = createRouter;
  exports.makePublicRouterInstance = makePublicRouterInstance;
  exports.default = void 0;
  var _react2 = _interopRequireDefault2(React__default);
  var _router2 = _interopRequireDefault2(router$1);
  var _routerContext = routerContext;
  var _isError2 = _interopRequireDefault2(isError$1);
  var _withRouter = _interopRequireDefault2(withRouter$1);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const singletonRouter = {
    router: null,
    readyCallbacks: [],
    ready(cb) {
      if (this.router)
        return cb();
      if (typeof window !== "undefined") {
        this.readyCallbacks.push(cb);
      }
    }
  };
  const urlPropertyFields = [
    "pathname",
    "route",
    "query",
    "asPath",
    "components",
    "isFallback",
    "basePath",
    "locale",
    "locales",
    "defaultLocale",
    "isReady",
    "isPreview",
    "isLocaleDomain",
    "domainLocales"
  ];
  const routerEvents = [
    "routeChangeStart",
    "beforeHistoryChange",
    "routeChangeComplete",
    "routeChangeError",
    "hashChangeStart",
    "hashChangeComplete"
  ];
  const coreMethodFields = [
    "push",
    "replace",
    "reload",
    "back",
    "prefetch",
    "beforePopState"
  ];
  Object.defineProperty(singletonRouter, "events", {
    get() {
      return _router2.default.events;
    }
  });
  urlPropertyFields.forEach((field) => {
    Object.defineProperty(singletonRouter, field, {
      get() {
        const router2 = getRouter();
        return router2[field];
      }
    });
  });
  coreMethodFields.forEach((field) => {
    singletonRouter[field] = (...args) => {
      const router2 = getRouter();
      return router2[field](...args);
    };
  });
  routerEvents.forEach((event) => {
    singletonRouter.ready(() => {
      _router2.default.events.on(event, (...args) => {
        const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
        const _singletonRouter = singletonRouter;
        if (_singletonRouter[eventField]) {
          try {
            _singletonRouter[eventField](...args);
          } catch (err) {
            console.error(`Error when running the Router event: ${eventField}`);
            console.error(_isError2.default(err) ? `${err.message}
${err.stack}` : err + "");
          }
        }
      });
    });
  });
  function getRouter() {
    if (!singletonRouter.router) {
      const message = 'No router instance found.\nYou should only use "next/router" on the client side of your app.\n';
      throw new Error(message);
    }
    return singletonRouter.router;
  }
  var _default2 = singletonRouter;
  exports.default = _default2;
  function useRouter() {
    return _react2.default.useContext(_routerContext.RouterContext);
  }
  function createRouter(...args) {
    singletonRouter.router = new _router2.default(...args);
    singletonRouter.readyCallbacks.forEach((cb) => cb());
    singletonRouter.readyCallbacks = [];
    return singletonRouter.router;
  }
  function makePublicRouterInstance(router2) {
    const scopedRouter = router2;
    const instance = {};
    for (const property2 of urlPropertyFields) {
      if (typeof scopedRouter[property2] === "object") {
        instance[property2] = Object.assign(Array.isArray(scopedRouter[property2]) ? [] : {}, scopedRouter[property2]);
        continue;
      }
      instance[property2] = scopedRouter[property2];
    }
    instance.events = _router2.default.events;
    coreMethodFields.forEach((field) => {
      instance[field] = (...args) => {
        return scopedRouter[field](...args);
      };
    });
    return instance;
  }
})(router);
var useIntersection$1 = {};
Object.defineProperty(useIntersection$1, "__esModule", {
  value: true
});
useIntersection$1.useIntersection = useIntersection;
var _react$1 = React__default;
var _requestIdleCallback = requestIdleCallback$1;
const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";
function useIntersection({ rootRef, rootMargin, disabled }) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = _react$1.useRef();
  const [visible, setVisible] = _react$1.useState(false);
  const [root2, setRoot] = _react$1.useState(rootRef ? rootRef.current : null);
  const setRef = _react$1.useCallback((el) => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = void 0;
    }
    if (isDisabled || visible)
      return;
    if (el && el.tagName) {
      unobserve.current = observe(el, (isVisible) => isVisible && setVisible(isVisible), {
        root: root2,
        rootMargin
      });
    }
  }, [
    isDisabled,
    root2,
    rootMargin,
    visible
  ]);
  _react$1.useEffect(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = _requestIdleCallback.requestIdleCallback(() => setVisible(true));
        return () => _requestIdleCallback.cancelIdleCallback(idleCallback);
      }
    }
  }, [
    visible
  ]);
  _react$1.useEffect(() => {
    if (rootRef)
      setRoot(rootRef.current);
  }, [
    rootRef
  ]);
  return [
    setRef,
    visible
  ];
}
function observe(element, callback, options) {
  const { id, observer, elements } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element);
    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
      let index = idList.findIndex((obj) => obj.root === id.root && obj.margin === id.margin);
      if (index > -1) {
        idList.splice(index, 1);
      }
    }
  };
}
const observers = /* @__PURE__ */ new Map();
const idList = [];
function createObserver(options) {
  const id = {
    root: options.root || null,
    margin: options.rootMargin || ""
  };
  let existing = idList.find((obj) => obj.root === id.root && obj.margin === id.margin);
  let instance;
  if (existing) {
    instance = observers.get(existing);
  } else {
    instance = observers.get(id);
    idList.push(id);
  }
  if (instance) {
    return instance;
  }
  const elements = /* @__PURE__ */ new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}
Object.defineProperty(link$1, "__esModule", {
  value: true
});
link$1.default = void 0;
var _react = _interopRequireDefault(React__default);
var _router = router$1;
var _router1 = router;
var _useIntersection = useIntersection$1;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const prefetched = {};
function prefetch(router2, href, as, options) {
  if (typeof window === "undefined" || !router2)
    return;
  if (!_router.isLocalURL(href))
    return;
  router2.prefetch(href, as, options).catch((err) => {
  });
  const curLocale = options && typeof options.locale !== "undefined" ? options.locale : router2 && router2.locale;
  prefetched[href + "%" + as + (curLocale ? "%" + curLocale : "")] = true;
}
function isModifiedEvent(event) {
  const { target } = event.currentTarget;
  return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e2, router2, href, as, replace, shallow, scroll, locale) {
  const { nodeName } = e2.currentTarget;
  const isAnchorNodeName = nodeName.toUpperCase() === "A";
  if (isAnchorNodeName && (isModifiedEvent(e2) || !_router.isLocalURL(href))) {
    return;
  }
  e2.preventDefault();
  router2[replace ? "replace" : "push"](href, as, {
    shallow,
    locale,
    scroll
  });
}
function Link(props) {
  const p2 = props.prefetch !== false;
  const router2 = _router1.useRouter();
  const { href, as } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = _router.resolveHref(router2, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? _router.resolveHref(router2, props.as) : resolvedAs || resolvedHref
    };
  }, [
    router2,
    props.href,
    props.as
  ]);
  let { children, replace, shallow, scroll, locale } = props;
  if (typeof children === "string") {
    children = /* @__PURE__ */ _react.default.createElement("a", null, children);
  }
  let child;
  {
    child = _react.default.Children.only(children);
  }
  const childRef = child && typeof child === "object" && child.ref;
  const [setIntersectionRef, isVisible] = _useIntersection.useIntersection({
    rootMargin: "200px"
  });
  const setRef = _react.default.useCallback((el) => {
    setIntersectionRef(el);
    if (childRef) {
      if (typeof childRef === "function")
        childRef(el);
      else if (typeof childRef === "object") {
        childRef.current = el;
      }
    }
  }, [
    childRef,
    setIntersectionRef
  ]);
  _react.default.useEffect(() => {
    const shouldPrefetch = isVisible && p2 && _router.isLocalURL(href);
    const curLocale = typeof locale !== "undefined" ? locale : router2 && router2.locale;
    const isPrefetched = prefetched[href + "%" + as + (curLocale ? "%" + curLocale : "")];
    if (shouldPrefetch && !isPrefetched) {
      prefetch(router2, href, as, {
        locale: curLocale
      });
    }
  }, [
    as,
    href,
    isVisible,
    locale,
    p2,
    router2
  ]);
  const childProps = {
    ref: setRef,
    onClick: (e2) => {
      if (child.props && typeof child.props.onClick === "function") {
        child.props.onClick(e2);
      }
      if (!e2.defaultPrevented) {
        linkClicked(e2, router2, href, as, replace, shallow, scroll, locale);
      }
    }
  };
  childProps.onMouseEnter = (e2) => {
    if (child.props && typeof child.props.onMouseEnter === "function") {
      child.props.onMouseEnter(e2);
    }
    if (_router.isLocalURL(href)) {
      prefetch(router2, href, as, {
        priority: true
      });
    }
  };
  if (props.passHref || child.type === "a" && !("href" in child.props)) {
    const curLocale = typeof locale !== "undefined" ? locale : router2 && router2.locale;
    const localeDomain = router2 && router2.isLocaleDomain && _router.getDomainLocale(as, curLocale, router2 && router2.locales, router2 && router2.domainLocales);
    childProps.href = localeDomain || _router.addBasePath(_router.addLocale(as, curLocale, router2 && router2.defaultLocale));
  }
  return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
}
var _default = Link;
link$1.default = _default;
var link = link$1;
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp2.call(b2, prop))
      __defNormalProp2(a2, prop, b2[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b2)) {
      if (__propIsEnum2.call(b2, prop))
        __defNormalProp2(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps2 = (a2, b2) => __defProps2(a2, __getOwnPropDescs2(b2));
var __objRest2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var jsxRuntime$1 = { exports: {} };
var reactJsxRuntime_production_min$1 = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;
function toObject$1(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative$1() {
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
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
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
shouldUseNative$1() ? Object.assign : function(target, source) {
  var from;
  var to = toObject$1(target);
  var symbols;
  for (var s2 = 1; s2 < arguments.length; s2++) {
    from = Object(arguments[s2]);
    for (var key in from) {
      if (hasOwnProperty$5.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols$1) {
      symbols = getOwnPropertySymbols$1(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable$1.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
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
var f$1 = React__default, g$1 = 60103;
reactJsxRuntime_production_min$1.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h$1 = Symbol.for;
  g$1 = h$1("react.element");
  reactJsxRuntime_production_min$1.Fragment = h$1("react.fragment");
}
var m$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n$1 = Object.prototype.hasOwnProperty, p$1 = { key: true, ref: true, __self: true, __source: true };
function q$1(c2, a2, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (l2 = a2.ref);
  for (b2 in a2)
    n$1.call(a2, b2) && !p$1.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: g$1, type: c2, key: e2, ref: l2, props: d2, _owner: m$1.current };
}
reactJsxRuntime_production_min$1.jsx = q$1;
reactJsxRuntime_production_min$1.jsxs = q$1;
{
  jsxRuntime$1.exports = reactJsxRuntime_production_min$1;
}
const jsx$1 = jsxRuntime$1.exports.jsx;
const jsxs$1 = jsxRuntime$1.exports.jsxs;
const Fragment$1 = jsxRuntime$1.exports.Fragment;
function WidgetTitle(_a) {
  var props = __objRest2(_a, []);
  return /* @__PURE__ */ jsx$1("div", {
    className: classNames("flex flex-row items-center", "dark:text-gray-500", "border-b dark:border-gray-800", "text-xxs uppercase", "font-syncopate leading-none", "pb-1.5"),
    children: props.children
  });
}
function WidgetVersion(_b) {
  var props = __objRest2(_b, []);
  return /* @__PURE__ */ jsx$1("div", {
    className: "relative !mt-auto pt-2 h-0 flex items-center justify-end",
    children: /* @__PURE__ */ jsxs$1("span", {
      className: "font-mono text-xxs opacity-30 leading-none",
      children: ["v. ", props.children]
    })
  });
}
const Widget = React__default.forwardRef((_c, ref) => {
  var _d = _c, {
    title,
    version,
    full = false,
    className
  } = _d, props = __objRest2(_d, [
    "title",
    "version",
    "full",
    "className"
  ]);
  return /* @__PURE__ */ jsxs$1("div", __spreadProps2(__spreadValues2({
    ref
  }, props), {
    className: classNames("relative", "flex flex-col items-stretch justify-start", {
      "p-3": !full
    }, "space-y-3", "rounded-md", "overflow-hidden", "text-sm", "text-gray-900 dark:text-gray-200", "bg-gray-300 dark:bg-gray-900", className),
    children: [title && /* @__PURE__ */ jsx$1(WidgetTitle, {
      children: title
    }), props.children, version && /* @__PURE__ */ jsx$1(WidgetVersion, {
      children: version
    })]
  }));
});
Widget.displayName = "Widget";
const btn = "_btn_40lfp_1";
var styles$2 = {
  btn
};
const Button = React__default.forwardRef((_g, ref) => {
  var _h = _g, {
    as = "button",
    squared,
    rounded,
    className,
    size,
    mode = "normal"
  } = _h, props = __objRest2(_h, [
    "as",
    "squared",
    "rounded",
    "className",
    "size",
    "mode"
  ]);
  let ButtonComponent = as;
  if (props.type == "submit") {
    ButtonComponent = "button";
  }
  return /* @__PURE__ */ jsx$1(ButtonComponent, __spreadValues2({
    ref,
    className: classNames("inline-flex select-none items-center justify-center text-sm font-medium", styles$2.btn, {
      "btn-xs": size == "xs",
      "btn-sm": size == "sm"
    }, {
      "btn-normal": mode == "normal",
      "btn-ghost": mode == "ghost"
    }, {
      "squared": squared,
      "rounded-md": !rounded,
      "rounded-full": rounded
    }, "focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-opacity-75", {
      "select-none touch-none disabled": props.disabled
    }, "dark:disabled:opacity-40 dark:disabled:bg-gray-800", className)
  }, props));
});
Button.displayName = "Button";
function Group(_q) {
  var _r = _q, {
    orientation = "horizontal",
    className
  } = _r, props = __objRest2(_r, [
    "orientation",
    "className"
  ]);
  return /* @__PURE__ */ jsx$1("div", __spreadValues2({
    className: classNames("flex", {
      "flex-row space-x-2 items-center justify-between": orientation == "horizontal",
      "flex-col space-y-2": orientation == "vertical"
    }, className)
  }, props));
}
function Label(_y) {
  var _z = _y, {
    className
  } = _z, props = __objRest2(_z, [
    "className"
  ]);
  return /* @__PURE__ */ jsx$1(Root$5, __spreadValues2({
    className: classNames("font-semibold", "select-none cursor-default", "text-gray-800 dark:text-gray-300", className)
  }, props));
}
const Separator = React__default.forwardRef((_C, ref) => {
  var props = __objRest2(_C, []);
  return /* @__PURE__ */ jsx$1(Root$4, __spreadProps2(__spreadValues2({
    ref
  }, props), {
    asChild: true,
    children: /* @__PURE__ */ jsx$1("div", {
      className: classNames("flex-none", "border-gray-500 dark:border-gray-600", {
        "my-2 border-b": props.orientation == "horizontal" || !props.orientation,
        "h-px min-w-full self-stretch": props.orientation == "horizontal" || !props.orientation,
        "mx-2 border-r": props.orientation == "vertical",
        "min-h-full w-px self-stretch": props.orientation == "vertical"
      }, props.className)
    })
  }));
});
Separator.displayName = "Separator";
function InputRaw(_F) {
  var _G = _F, {
    error,
    dirty,
    detailContent
  } = _G, props = __objRest2(_G, [
    "error",
    "dirty",
    "detailContent"
  ]);
  if (props.type == "hidden") {
    return /* @__PURE__ */ jsx$1("input", __spreadProps2(__spreadValues2({}, props), {
      hidden: true
    }));
  }
  return /* @__PURE__ */ jsxs$1("div", {
    className: classNames("flex flex-row items-center", "rounded-md overflow-hidden flex-shrink-0", "h-[26px]", "font-mono font-medium", "bg-gray-900 border border-gray-600 text-gray-300", "focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600", {
      "border-red-600 ring-1 ring-red-600": error,
      "border-yellow-500 ring-1 ring-yellow-500": !error && dirty
    }, props.className),
    children: [/* @__PURE__ */ jsx$1("input", __spreadProps2(__spreadValues2({}, props), {
      className: classNames("text-xs px-1.5", "h-full min-w-0 w-full", "ring-0 outline-none", "bg-gray-900 text-gray-300", "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800", "transition-colors duration-150"),
      style: {
        textAlign: "inherit"
      }
    })), detailContent && /* @__PURE__ */ jsx$1(Label$1, {
      htmlFor: props.id,
      className: "flex-none select-none cursor-default text-xs bg-white/10 border-l border-gray-600 self-stretch flex items-center px-1",
      children: detailContent
    })]
  });
}
function CheckboxRaw(_H) {
  var _I = _H, {
    error
  } = _I, props = __objRest2(_I, [
    "error"
  ]);
  return /* @__PURE__ */ jsx$1(Root$2, __spreadProps2(__spreadValues2({}, props), {
    className: classNames("h-[24px] w-[24px]", "rounded-md", "bg-gray-900 border border-gray-600 text-gray-300", "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600", "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800", {
      "border-red-600 ring-1 ring-red-600": error
    }, "transition-colors duration-150", props.className),
    children: /* @__PURE__ */ jsx$1(Indicator, {
      className: classNames("flex items-center justify-center"),
      children: /* @__PURE__ */ jsx$1(CheckIcon, {})
    })
  }));
}
React__default.createContext();
React__default.createContext();
const ScrollArea = React__default.forwardRef((_ba, ref) => {
  var _ca = _ba, {
    type = "scroll",
    onScroll,
    children
  } = _ca, props = __objRest2(_ca, [
    "type",
    "onScroll",
    "children"
  ]);
  return /* @__PURE__ */ jsxs$1(Root$1, __spreadProps2(__spreadValues2({
    ref,
    type
  }, props), {
    className: classNames("overflow-hidden", "flex", props.className),
    children: [/* @__PURE__ */ jsx$1(Viewport, {
      className: "flex-1",
      onScroll,
      children
    }), /* @__PURE__ */ jsx$1(Scrollbar, {
      orientation: "vertical",
      className: "flex select-none touch-none px-0.5 py-1 radix-orientation-vertical:w-[11px]",
      children: /* @__PURE__ */ jsx$1(ScrollAreaThumb, {
        className: "flex-1 dark:bg-black dark:bg-opacity-50 hover:dark:bg-opacity-75 dark:shadow-gray-700 shadow-sm rounded-full relative"
      })
    })]
  }));
});
ScrollArea.displayName = "ScrollArea";
const Popover = Root;
Popover.Trigger = Trigger;
function PopoverContent(_da) {
  var _ea = _da, {
    className
  } = _ea, props = __objRest2(_ea, [
    "className"
  ]);
  return /* @__PURE__ */ jsx$1(Content, __spreadProps2(__spreadValues2({
    sideOffset: 3
  }, props), {
    className: classNames("rounded-lg text-gray-300 bg-gray-700", "shadow-md", "min-w-[180px]", "p-1", className)
  }));
}
Popover.Content = PopoverContent;
const MenuContent = React__default.forwardRef((_fa, ref) => {
  var _ga = _fa, props = __objRest2(_ga, [
    "items"
  ]);
  return /* @__PURE__ */ jsx$1("div", __spreadProps2(__spreadValues2({
    ref
  }, props), {
    className: classNames("text-gray-300 bg-gray-700", "rounded-lg", "shadow-md", "min-w-[180px]", "p-1", props.className),
    children: props.children
  }));
});
MenuContent.displayName = "MenuContent";
const MenuItem$1 = React__default.forwardRef((_ha, ref) => {
  var _ia = _ha, {
    item,
    children
  } = _ia, props = __objRest2(_ia, [
    "item",
    "children"
  ]);
  return /* @__PURE__ */ jsxs$1("div", __spreadProps2(__spreadValues2({
    ref,
    className: classNames("relative", "rounded-md", "text-xs leading-none font-medium", "flex flex-row items-center", "pl-6 pr-1 h-6", "focus:bg-blue-700 focus:outline-none", "radix-state-open:bg-blue-900", "radix-disabled:opacity-60 disabled:opacity-60", {
      "cursor-default": !item.action && !item.items,
      "cursor-pointer": item.action || item.items
    })
  }, props), {
    children: [item.icon && /* @__PURE__ */ jsx$1("div", {
      className: "absolute left-0 w-6 inline-flex items-center justify-center",
      children: /* @__PURE__ */ jsx$1(item.icon, {
        className: "opacity-60"
      })
    }), item.label, item.detail && /* @__PURE__ */ jsx$1("div", {
      className: "ml-auto text-gray-400 text-xs",
      children: item.detail
    }), item.items && /* @__PURE__ */ jsx$1("div", {
      className: "ml-auto",
      children: /* @__PURE__ */ jsx$1(ChevronRightIcon, {})
    }), children]
  }));
});
MenuItem$1.displayName = "MenuItem";
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
var parseuri2 = function parseuri22(str) {
  var src = str, b2 = str.indexOf("["), e2 = str.indexOf("]");
  if (b2 != -1 && e2 != -1) {
    str = str.substring(0, b2) + str.substring(b2, e2).replace(/:/g, ";") + str.substring(e2, str.length);
  }
  var m2 = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m2[i2] || "";
  }
  if (b2 != -1 && e2 != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
};
function pathNames(obj, path) {
  var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.substr(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.substr(path.length - 1, 1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  var data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (uri == null)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if (uri.charAt(0) === "/") {
      if (uri.charAt(1) === "/") {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if (typeof loc !== "undefined") {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parseuri2(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
var hasCors = { exports: {} };
try {
  hasCors.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
  hasCors.exports = false;
}
var hasCORS = hasCors.exports;
var globalThis$1 = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
function XMLHttpRequest$1(opts) {
  const xdomain = opts.xdomain;
  try {
    if (typeof XMLHttpRequest !== "undefined" && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e2) {
  }
  if (!xdomain) {
    try {
      return new globalThis$1[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e2) {
    }
  }
}
function pick(obj, ...attr) {
  return attr.reduce((acc, k2) => {
    if (obj.hasOwnProperty(k2)) {
      acc[k2] = obj[k2];
    }
    return acc;
  }, {});
}
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis$1);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis$1);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThis$1);
    obj.clearTimeoutFn = clearTimeout.bind(globalThis$1);
  }
}
var Emitter_1 = Emitter;
function Emitter(obj) {
  if (obj)
    return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (arguments.length == 0) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (arguments.length == 1) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};
const PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };
const withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
const isView$1 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob$1 && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$1 = 0; i$1 < chars.length; i$1++) {
  lookup$1[chars.charCodeAt(i$1)] = i$1;
}
var decode$1 = function(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i2, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup$1[base64.charCodeAt(i2)];
    encoded2 = lookup$1[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup$1[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup$1[base64.charCodeAt(i2 + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer$1) {
    const decoded = decode$1(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data;
  }
};
const SEPARATOR = String.fromCharCode(30);
const encodePayload = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
const protocol$1 = 4;
class Transport extends Emitter_1 {
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }
  onError(msg, desc) {
    const err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    super.emit("error", err);
    return this;
  }
  open() {
    if (this.readyState === "closed" || this.readyState === "") {
      this.readyState = "opening";
      this.doOpen();
    }
    return this;
  }
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    }
  }
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emit("open");
  }
  onData(data) {
    const packet = decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  onPacket(packet) {
    super.emit("packet", packet);
  }
  onClose() {
    this.readyState = "closed";
    super.emit("close");
  }
}
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {}, seed = 0, i = 0, prev;
function encode(num) {
  var encoded = "";
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
function decode(str) {
  var decoded = 0;
  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }
  return decoded;
}
function yeast() {
  var now = encode(+new Date());
  if (now !== prev)
    return seed = 0, prev = now;
  return now + "." + encode(seed++);
}
for (; i < length; i++)
  map[alphabet[i]] = i;
yeast.encode = encode;
yeast.decode = decode;
var yeast_1 = yeast;
var parseqs = {};
parseqs.encode = function(obj) {
  var str = "";
  for (var i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
};
parseqs.decode = function(qs) {
  var qry = {};
  var pairs = qs.split("&");
  for (var i2 = 0, l2 = pairs.length; i2 < l2; i2++) {
    var pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};
class Polling extends Transport {
  constructor() {
    super(...arguments);
    this.polling = false;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  poll() {
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }
  onData(data) {
    const callback = (packet) => {
      if (this.readyState === "opening" && packet.type === "open") {
        this.onOpen();
      }
      if (packet.type === "close") {
        this.onClose();
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if (this.readyState !== "closed") {
      this.polling = false;
      this.emit("pollComplete");
      if (this.readyState === "open") {
        this.poll();
      }
    }
  }
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if (this.readyState === "open") {
      close();
    } else {
      this.once("open", close);
    }
  }
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";
    if (this.opts.timestampRequests !== false) {
      query[this.opts.timestampParam] = yeast_1();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    const encodedQuery = parseqs.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
}
function empty() {
}
const hasXHR2 = function() {
  const xhr = new XMLHttpRequest$1({
    xdomain: false
  });
  return xhr.responseType != null;
}();
class XHR extends Polling {
  constructor(opts) {
    super(opts);
    if (typeof location !== "undefined") {
      const isSSL = location.protocol === "https:";
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (err) => {
      this.onError("xhr post error", err);
    });
  }
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (err) => {
      this.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }
}
class Request extends Emitter_1 {
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = opts.async !== false;
    this.data = opts.data !== void 0 ? opts.data : null;
    this.create();
  }
  create() {
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;
    const xhr = this.xhr = new XMLHttpRequest$1(opts);
    try {
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e2) {
      }
      if (this.method === "POST") {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e2) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e2) {
      }
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4)
          return;
        if (xhr.status === 200 || xhr.status === 1223) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e2) {
      this.setTimeoutFn(() => {
        this.onError(e2);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  onSuccess() {
    this.emit("success");
    this.cleanup();
  }
  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }
  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }
  cleanup(fromError) {
    if (typeof this.xhr === "undefined" || this.xhr === null) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e2) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  }
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.onData(data);
    }
  }
  abort() {
    this.cleanup();
  }
}
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis$1 ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request.requests) {
    if (Request.requests.hasOwnProperty(i2)) {
      Request.requests[i2].abort();
    }
  }
}
const nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
const WebSocket = globalThis$1.WebSocket || globalThis$1.MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS extends Transport {
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }
    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
    this.addEventListeners();
  }
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e2) => this.onError("websocket error", e2);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket(packet, this.supportsBinary, (data) => {
        try {
          if (usingBrowserWebSocket) {
            this.ws.send(data);
          }
        } catch (e2) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emit("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";
    if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast_1();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    const encodedQuery = parseqs.encode(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  check() {
    return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
  }
}
const transports = {
  websocket: WS,
  polling: XHR
};
class Socket$1 extends Emitter_1 {
  constructor(uri, opts = {}) {
    super();
    if (uri && typeof uri === "object") {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parseuri2(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri2(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: true
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs.decode(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        addEventListener("beforeunload", () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        }, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close");
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  createTransport(name) {
    const query = clone(this.opts.query);
    query.EIO = protocol$1;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    });
    return new transports[name](opts);
  }
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket$1.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e2) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
      this.onClose("transport close");
    });
  }
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket$1.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if (msg.type === "pong" && msg.data === "probe") {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          Socket$1.priorWebsocketSuccess = transport.name === "websocket";
          this.transport.pause(() => {
            if (failed)
              return;
            if (this.readyState === "closed")
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport.open();
  }
  onOpen() {
    this.readyState = "open";
    Socket$1.priorWebsocketSuccess = this.transport.name === "websocket";
    this.emitReserved("open");
    this.flush();
    if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
      let i2 = 0;
      const l2 = this.upgrades.length;
      for (; i2 < l2; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  onPacket(packet) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    }
  }
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    if (this.readyState === "closed")
      return;
    this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (this.writeBuffer.length === 0) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      this.transport.send(this.writeBuffer);
      this.prevBufferLen = this.writeBuffer.length;
      this.emitReserved("flush");
    }
  }
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  sendPacket(type, data, options, fn) {
    if (typeof data === "function") {
      fn = data;
      data = void 0;
    }
    if (typeof options === "function") {
      fn = options;
      options = null;
    }
    if (this.readyState === "closing" || this.readyState === "closed") {
      return;
    }
    options = options || {};
    options.compress = options.compress !== false;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if (this.readyState === "opening" || this.readyState === "open") {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  onError(err) {
    Socket$1.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  onClose(reason, desc) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, desc);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
}
Socket$1.protocol = protocol$1;
function clone(obj) {
  const o2 = {};
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      o2[i2] = obj[i2];
    }
  }
  return o2;
}
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString$1 = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString$1.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString$1.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = void 0;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder) {
    return buffers[data.num];
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}
const protocol = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }
    return [this.encodeAsString(obj)];
  }
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && obj.nsp !== "/") {
      str += obj.nsp + ",";
    }
    if (obj.id != null) {
      str += obj.id;
    }
    if (obj.data != null) {
      str += JSON.stringify(obj.data);
    }
    return str;
  }
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
}
class Decoder extends Emitter_1 {
  constructor() {
    super();
  }
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      packet = this.decodeString(obj);
      if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  decodeString(str) {
    let i2 = 0;
    const p2 = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p2.type] === void 0) {
      throw new Error("unknown packet type " + p2.type);
    }
    if (p2.type === PacketType.BINARY_EVENT || p2.type === PacketType.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p2.attachments = Number(buf);
    }
    if (str.charAt(i2 + 1) === "/") {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (c2 === ",")
          break;
        if (i2 === str.length)
          break;
      }
      p2.nsp = str.substring(start, i2);
    } else {
      p2.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if (next !== "" && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (c2 == null || Number(c2) != c2) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p2.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = tryParse(str.substr(i2));
      if (Decoder.isPayloadValid(p2.type, payload)) {
        p2.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p2;
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === "object";
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }
}
function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e2) {
    return false;
  }
}
class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}
var parser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  protocol,
  get PacketType() {
    return PacketType;
  },
  Encoder,
  Decoder
}, Symbol.toStringTag, { value: "Module" }));
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1
});
class Socket extends Emitter_1 {
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.disconnected = true;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    if (this.io._autoConnect)
      this.open();
  }
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if (this.io._readyState === "open")
      this.onopen();
    return this;
  }
  open() {
    return this.connect();
  }
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev + '" is a reserved event name');
    }
    args.unshift(ev);
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if (typeof args[args.length - 1] === "function") {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket)
      ;
    else if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  _registerAckCallback(id, ack) {
    const timeout = this.flags.timeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this.packet({ type: PacketType.CONNECT, data });
      });
    } else {
      this.packet({ type: PacketType.CONNECT, data: this.auth });
    }
  }
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  onclose(reason) {
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emitReserved("disconnect", reason);
  }
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          const id = packet.data.sid;
          this.onconnect(id);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
        this.onevent(packet);
        break;
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
        this.onack(packet);
        break;
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  onevent(packet) {
    const args = packet.data || [];
    if (packet.id != null) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
  }
  ack(id) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id,
        data: args
      });
    };
  }
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack === "function") {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    }
  }
  onconnect(id) {
    this.id = id;
    this.connected = true;
    this.disconnected = false;
    this.emitBuffered();
    this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => this.packet(packet));
    this.sendBuffer = [];
  }
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  close() {
    return this.disconnect();
  }
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
}
var backo2 = Backoff;
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff.prototype.setMax = function(max) {
  this.max = max;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};
class Manager extends Emitter_1 {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new backo2({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v2) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v2;
    return this;
  }
  reconnectionAttempts(v2) {
    if (v2 === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v2;
    return this;
  }
  reconnectionDelay(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v2);
    return this;
  }
  randomizationFactor(v2) {
    var _a;
    if (v2 === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v2);
    return this;
  }
  reconnectionDelayMax(v2) {
    var _a;
    if (v2 === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v2;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v2);
    return this;
  }
  timeout(v2) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v2;
    return this;
  }
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket$1(this.uri, this.opts);
    const socket2 = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket2, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const errorSub = on(socket2, "error", (err) => {
      self2.cleanup();
      self2._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        self2.maybeReconnectOnOpen();
      }
    });
    if (this._timeout !== false) {
      const timeout = this._timeout;
      if (timeout === 0) {
        openSubDestroy();
      }
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        socket2.close();
        socket2.emit("error", new Error("timeout"));
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  connect(fn) {
    return this.open(fn);
  }
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket2 = this.engine;
    this.subs.push(on(socket2, "ping", this.onping.bind(this)), on(socket2, "data", this.ondata.bind(this)), on(socket2, "error", this.onerror.bind(this)), on(socket2, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(data) {
    this.decoder.add(data);
  }
  ondecoded(packet) {
    this.emitReserved("packet", packet);
  }
  onerror(err) {
    this.emitReserved("error", err);
  }
  socket(nsp, opts) {
    let socket2 = this.nsps[nsp];
    if (!socket2) {
      socket2 = new Socket(this, nsp, opts);
      this.nsps[nsp] = socket2;
    }
    return socket2;
  }
  _destroy(socket2) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket3 = this.nsps[nsp];
      if (socket3.active) {
        return;
      }
    }
    this._close();
  }
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(reason) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
  }
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}
const cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
  Manager,
  Socket,
  io: lookup,
  connect: lookup
});
var lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(module, exports) {
  (function() {
    var undefined$1;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE2 = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT2 = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE2 = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY2 = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", domExcTag = "[object DOMException]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", nullTag2 = "[object Null]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag2 = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp2 = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar2.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar2 = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint2 = /^(?:0|[1-9]\d*)$/;
    var reLatin2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange2 = "\\ud800-\\udfff", rsComboMarksRange2 = "\\u0300-\\u036f", reComboHalfMarksRange2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange2 = "\\u20d0-\\u20ff", rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2, rsDingbatRange2 = "\\u2700-\\u27bf", rsLowerRange2 = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange2 = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange2 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange2 = "\\u2000-\\u206f", rsSpaceRange2 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange2 = "\\ufe0e\\ufe0f", rsBreakRange2 = rsMathOpRange2 + rsNonCharRange2 + rsPunctuationRange2 + rsSpaceRange2;
    var rsApos2 = "['\u2019]", rsAstral2 = "[" + rsAstralRange2 + "]", rsBreak2 = "[" + rsBreakRange2 + "]", rsCombo2 = "[" + rsComboRange2 + "]", rsDigits2 = "\\d+", rsDingbat2 = "[" + rsDingbatRange2 + "]", rsLower2 = "[" + rsLowerRange2 + "]", rsMisc2 = "[^" + rsAstralRange2 + rsBreakRange2 + rsDigits2 + rsDingbatRange2 + rsLowerRange2 + rsUpperRange2 + "]", rsFitz2 = "\\ud83c[\\udffb-\\udfff]", rsModifier2 = "(?:" + rsCombo2 + "|" + rsFitz2 + ")", rsNonAstral2 = "[^" + rsAstralRange2 + "]", rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper2 = "[" + rsUpperRange2 + "]", rsZWJ2 = "\\u200d";
    var rsMiscLower2 = "(?:" + rsLower2 + "|" + rsMisc2 + ")", rsMiscUpper2 = "(?:" + rsUpper2 + "|" + rsMisc2 + ")", rsOptContrLower2 = "(?:" + rsApos2 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper2 = "(?:" + rsApos2 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod2 = rsModifier2 + "?", rsOptVar2 = "[" + rsVarRange2 + "]?", rsOptJoin2 = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*", rsOrdLower2 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper2 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2, rsEmoji2 = "(?:" + [rsDingbat2, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2, rsSymbol2 = "(?:" + [rsNonAstral2 + rsCombo2 + "?", rsCombo2, rsRegional2, rsSurrPair2, rsAstral2].join("|") + ")";
    var reApos2 = RegExp(rsApos2, "g");
    var reComboMark2 = RegExp(rsCombo2, "g");
    var reUnicode2 = RegExp(rsFitz2 + "(?=" + rsFitz2 + ")|" + rsSymbol2 + rsSeq2, "g");
    var reUnicodeWord2 = RegExp([
      rsUpper2 + "?" + rsLower2 + "+" + rsOptContrLower2 + "(?=" + [rsBreak2, rsUpper2, "$"].join("|") + ")",
      rsMiscUpper2 + "+" + rsOptContrUpper2 + "(?=" + [rsBreak2, rsUpper2 + rsMiscLower2, "$"].join("|") + ")",
      rsUpper2 + "?" + rsMiscLower2 + "+" + rsOptContrLower2,
      rsUpper2 + "+" + rsOptContrUpper2,
      rsOrdUpper2,
      rsOrdLower2,
      rsDigits2,
      rsEmoji2
    ].join("|"), "g");
    var reHasUnicode2 = RegExp("[" + rsZWJ2 + rsAstralRange2 + rsComboRange2 + rsVarRange2 + "]");
    var reHasUnicodeWord2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags2 = {};
    typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
    typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
    var cloneableTags = {};
    cloneableTags[argsTag2] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag2] = cloneableTags[dataViewTag2] = cloneableTags[boolTag2] = cloneableTags[dateTag2] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag2] = cloneableTags[numberTag2] = cloneableTags[objectTag2] = cloneableTags[regexpTag2] = cloneableTags[setTag2] = cloneableTags[stringTag2] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
    cloneableTags[errorTag2] = cloneableTags[funcTag2] = cloneableTags[weakMapTag2] = false;
    var deburredLetters2 = {
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal2.process;
    var nodeUtil2 = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil2 && nodeUtil2.isArrayBuffer, nodeIsDate = nodeUtil2 && nodeUtil2.isDate, nodeIsMap = nodeUtil2 && nodeUtil2.isMap, nodeIsRegExp = nodeUtil2 && nodeUtil2.isRegExp, nodeIsSet = nodeUtil2 && nodeUtil2.isSet, nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array2, setter, iteratee, accumulator) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        var value = array2[index];
        setter(accumulator, value, iteratee(value), array2);
      }
      return accumulator;
    }
    function arrayEach(array2, iteratee) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (iteratee(array2[index], index, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayEachRight(array2, iteratee) {
      var length2 = array2 == null ? 0 : array2.length;
      while (length2--) {
        if (iteratee(array2[length2], length2, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayEvery(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (!predicate(array2[index], index, array2)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter2(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array2[index];
        if (predicate(value, index, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array2, value) {
      var length2 = array2 == null ? 0 : array2.length;
      return !!length2 && baseIndexOf(array2, value, 0) > -1;
    }
    function arrayIncludesWith(array2, value, comparator) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (comparator(value, array2[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap2(array2, iteratee) {
      var index = -1, length2 = array2 == null ? 0 : array2.length, result = Array(length2);
      while (++index < length2) {
        result[index] = iteratee(array2[index], index, array2);
      }
      return result;
    }
    function arrayPush2(array2, values) {
      var index = -1, length2 = values.length, offset = array2.length;
      while (++index < length2) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    function arrayReduce2(array2, iteratee, accumulator, initAccum) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      if (initAccum && length2) {
        accumulator = array2[++index];
      }
      while (++index < length2) {
        accumulator = iteratee(accumulator, array2[index], index, array2);
      }
      return accumulator;
    }
    function arrayReduceRight(array2, iteratee, accumulator, initAccum) {
      var length2 = array2 == null ? 0 : array2.length;
      if (initAccum && length2) {
        accumulator = array2[--length2];
      }
      while (length2--) {
        accumulator = iteratee(accumulator, array2[length2], length2, array2);
      }
      return accumulator;
    }
    function arraySome2(array2, predicate) {
      var index = -1, length2 = array2 == null ? 0 : array2.length;
      while (++index < length2) {
        if (predicate(array2[index], index, array2)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty2("length");
    function asciiToArray2(string2) {
      return string2.split("");
    }
    function asciiWords2(string2) {
      return string2.match(reAsciiWord2) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length2 = array2.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length2) {
        if (predicate(array2[index], index, array2)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array2, value, fromIndex) {
      return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array2, value, fromIndex, comparator) {
      var index = fromIndex - 1, length2 = array2.length;
      while (++index < length2) {
        if (comparator(array2[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array2, iteratee) {
      var length2 = array2 == null ? 0 : array2.length;
      return length2 ? baseSum(array2, iteratee) / length2 : NAN;
    }
    function baseProperty2(key) {
      return function(object2) {
        return object2 == null ? undefined$1 : object2[key];
      };
    }
    function basePropertyOf2(object2) {
      return function(key) {
        return object2 == null ? undefined$1 : object2[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array2, comparer) {
      var length2 = array2.length;
      array2.sort(comparer);
      while (length2--) {
        array2[length2] = array2[length2].value;
      }
      return array2;
    }
    function baseSum(array2, iteratee) {
      var result, index = -1, length2 = array2.length;
      while (++index < length2) {
        var current = iteratee(array2[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes2(n2, iteratee) {
      var index = -1, result = Array(n2);
      while (++index < n2) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object2, props) {
      return arrayMap2(props, function(key) {
        return [key, object2[key]];
      });
    }
    function baseTrim(string2) {
      return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
    }
    function baseUnary2(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object2, props) {
      return arrayMap2(props, function(key) {
        return object2[key];
      });
    }
    function cacheHas2(cache2, key) {
      return cache2.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length2 = strSymbols.length;
      while (++index < length2 && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array2, placeholder) {
      var length2 = array2.length, result = 0;
      while (length2--) {
        if (array2[length2] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter2 = basePropertyOf2(deburredLetters2);
    var escapeHtmlChar = basePropertyOf2(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue2(object2, key) {
      return object2 == null ? undefined$1 : object2[key];
    }
    function hasUnicode2(string2) {
      return reHasUnicode2.test(string2);
    }
    function hasUnicodeWord2(string2) {
      return reHasUnicodeWord2.test(string2);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray2(map2) {
      var index = -1, result = Array(map2.size);
      map2.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array2, placeholder) {
      var index = -1, length2 = array2.length, resIndex = 0, result = [];
      while (++index < length2) {
        var value = array2[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array2[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray2(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array2, value, fromIndex) {
      var index = fromIndex - 1, length2 = array2.length;
      while (++index < length2) {
        if (array2[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array2, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array2[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string2) {
      return hasUnicode2(string2) ? unicodeSize(string2) : asciiSize(string2);
    }
    function stringToArray2(string2) {
      return hasUnicode2(string2) ? unicodeToArray2(string2) : asciiToArray2(string2);
    }
    function trimmedEndIndex(string2) {
      var index = string2.length;
      while (index-- && reWhitespace.test(string2.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf2(htmlUnescapes);
    function unicodeSize(string2) {
      var result = reUnicode2.lastIndex = 0;
      while (reUnicode2.test(string2)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray2(string2) {
      return string2.match(reUnicode2) || [];
    }
    function unicodeWords2(string2) {
      return string2.match(reUnicodeWord2) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root2 : _2.defaults(root2.Object(), context, _2.pick(root2, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto2 = Array2.prototype, funcProto2 = Function2.prototype, objectProto2 = Object2.prototype;
      var coreJsData2 = context["__core-js_shared__"];
      var funcToString2 = funcProto2.toString;
      var hasOwnProperty2 = objectProto2.hasOwnProperty;
      var idCounter2 = 0;
      var maskSrcKey2 = function() {
        var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString2 = objectProto2.toString;
      var objectCtorString = funcToString2.call(Object2);
      var oldDash = root2._;
      var reIsNative2 = RegExp2("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer2 = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype = overArg2(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : undefined$1;
      var defineProperty2 = function() {
        try {
          var func = getNative2(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e2) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols2 = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto2.join, nativeKeys2 = overArg2(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto2.reverse;
      var DataView2 = getNative2(context, "DataView"), Map2 = getNative2(context, "Map"), Promise2 = getNative2(context, "Promise"), Set2 = getNative2(context, "Set"), WeakMap2 = getNative2(context, "WeakMap"), nativeCreate2 = getNative2(Object2, "create");
      var metaMap = WeakMap2 && new WeakMap2();
      var realNames = {};
      var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
      var symbolProto2 = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : undefined$1, symbolToString2 = symbolProto2 ? symbolProto2.toString : undefined$1;
      function lodash2(value) {
        if (isObjectLike2(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty2.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object2() {
        }
        return function(proto) {
          if (!isObject2(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object2.prototype = proto;
          var result2 = new object2();
          object2.prototype = undefined$1;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash2.templateSettings = {
        "escape": reEscape,
        "evaluate": reEvaluate,
        "interpolate": reInterpolate,
        "variable": "",
        "imports": {
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array2 = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array2), isRight = dir < 0, arrLength = isArr ? array2.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length2 = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length2, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length2 && takeCount == length2) {
          return baseWrapperValue(array2, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length2-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array2[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear2() {
        this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
        this.size = 0;
      }
      function hashDelete2(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet2(key) {
        var data = this.__data__;
        if (nativeCreate2) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED2 ? undefined$1 : result2;
        }
        return hasOwnProperty2.call(data, key) ? data[key] : undefined$1;
      }
      function hashHas2(key) {
        var data = this.__data__;
        return nativeCreate2 ? data[key] !== undefined$1 : hasOwnProperty2.call(data, key);
      }
      function hashSet2(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate2 && value === undefined$1 ? HASH_UNDEFINED2 : value;
        return this;
      }
      Hash2.prototype.clear = hashClear2;
      Hash2.prototype["delete"] = hashDelete2;
      Hash2.prototype.get = hashGet2;
      Hash2.prototype.has = hashHas2;
      Hash2.prototype.set = hashSet2;
      function ListCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear2() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice2.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        return index < 0 ? undefined$1 : data[index][1];
      }
      function listCacheHas2(key) {
        return assocIndexOf2(this.__data__, key) > -1;
      }
      function listCacheSet2(key, value) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache2.prototype.clear = listCacheClear2;
      ListCache2.prototype["delete"] = listCacheDelete2;
      ListCache2.prototype.get = listCacheGet2;
      ListCache2.prototype.has = listCacheHas2;
      ListCache2.prototype.set = listCacheSet2;
      function MapCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear2() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash2(),
          "map": new (Map2 || ListCache2)(),
          "string": new Hash2()
        };
      }
      function mapCacheDelete2(key) {
        var result2 = getMapData2(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet2(key) {
        return getMapData2(this, key).get(key);
      }
      function mapCacheHas2(key) {
        return getMapData2(this, key).has(key);
      }
      function mapCacheSet2(key, value) {
        var data = getMapData2(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache2.prototype.clear = mapCacheClear2;
      MapCache2.prototype["delete"] = mapCacheDelete2;
      MapCache2.prototype.get = mapCacheGet2;
      MapCache2.prototype.has = mapCacheHas2;
      MapCache2.prototype.set = mapCacheSet2;
      function SetCache2(values2) {
        var index = -1, length2 = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache2();
        while (++index < length2) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd2(value) {
        this.__data__.set(value, HASH_UNDEFINED2);
        return this;
      }
      function setCacheHas2(value) {
        return this.__data__.has(value);
      }
      SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
      SetCache2.prototype.has = setCacheHas2;
      function Stack2(entries) {
        var data = this.__data__ = new ListCache2(entries);
        this.size = data.size;
      }
      function stackClear2() {
        this.__data__ = new ListCache2();
        this.size = 0;
      }
      function stackDelete2(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet2(key) {
        return this.__data__.get(key);
      }
      function stackHas2(key) {
        return this.__data__.has(key);
      }
      function stackSet2(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache2) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache2(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack2.prototype.clear = stackClear2;
      Stack2.prototype["delete"] = stackDelete2;
      Stack2.prototype.get = stackGet2;
      Stack2.prototype.has = stackHas2;
      Stack2.prototype.set = stackSet2;
      function arrayLikeKeys2(value, inherited) {
        var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes2(value.length, String2) : [], length2 = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length2)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array2) {
        var length2 = array2.length;
        return length2 ? array2[baseRandom(0, length2 - 1)] : undefined$1;
      }
      function arraySampleSize(array2, n2) {
        return shuffleSelf(copyArray(array2), baseClamp(n2, 0, array2.length));
      }
      function arrayShuffle(array2) {
        return shuffleSelf(copyArray(array2));
      }
      function assignMergeValue(object2, key, value) {
        if (value !== undefined$1 && !eq2(object2[key], value) || value === undefined$1 && !(key in object2)) {
          baseAssignValue2(object2, key, value);
        }
      }
      function assignValue(object2, key, value) {
        var objValue = object2[key];
        if (!(hasOwnProperty2.call(object2, key) && eq2(objValue, value)) || value === undefined$1 && !(key in object2)) {
          baseAssignValue2(object2, key, value);
        }
      }
      function assocIndexOf2(array2, key) {
        var length2 = array2.length;
        while (length2--) {
          if (eq2(array2[length2][0], key)) {
            return length2;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object2, source) {
        return object2 && copyObject(source, keys2(source), object2);
      }
      function baseAssignIn(object2, source) {
        return object2 && copyObject(source, keysIn(source), object2);
      }
      function baseAssignValue2(object2, key, value) {
        if (key == "__proto__" && defineProperty2) {
          defineProperty2(object2, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object2[key] = value;
        }
      }
      function baseAt(object2, paths) {
        var index = -1, length2 = paths.length, result2 = Array2(length2), skip = object2 == null;
        while (++index < length2) {
          result2[index] = skip ? undefined$1 : get2(object2, paths[index]);
        }
        return result2;
      }
      function baseClamp(number2, lower, upper) {
        if (number2 === number2) {
          if (upper !== undefined$1) {
            number2 = number2 <= upper ? number2 : upper;
          }
          if (lower !== undefined$1) {
            number2 = number2 >= lower ? number2 : lower;
          }
        }
        return number2;
      }
      function baseClone2(value, bitmask, customizer, key, object2, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object2 ? customizer(value, key, object2, stack) : customizer(value);
        }
        if (result2 !== undefined$1) {
          return result2;
        }
        if (!isObject2(value)) {
          return value;
        }
        var isArr = isArray2(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
          if (isBuffer2(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag2 || tag == argsTag2 || isFunc && !object2) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object2 ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack2());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone2(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys2 : isFlat ? keysIn : keys2;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys2(source);
        return function(object2) {
          return baseConformsTo(object2, source, props);
        };
      }
      function baseConformsTo(object2, source, props) {
        var length2 = props.length;
        if (object2 == null) {
          return !length2;
        }
        object2 = Object2(object2);
        while (length2--) {
          var key = props[length2], predicate = source[key], value = object2[key];
          if (value === undefined$1 && !(key in object2) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        return setTimeout2(function() {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array2, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length2 = array2.length, result2 = [], valuesLength = values2.length;
        if (!length2) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap2(values2, baseUnary2(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE2) {
          includes2 = cacheHas2;
          isCommon = false;
          values2 = new SetCache2(values2);
        }
        outer:
          while (++index < length2) {
            var value = array2[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn2);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array2, iteratee2, comparator) {
        var index = -1, length2 = array2.length;
        while (++index < length2) {
          var value = array2[index], current = iteratee2(value);
          if (current != null && (computed === undefined$1 ? current === current && !isSymbol2(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array2, value, start, end) {
        var length2 = array2.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length2 ? 0 : length2 + start;
        }
        end = end === undefined$1 || end > length2 ? length2 : toInteger(end);
        if (end < 0) {
          end += length2;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array2[start++] = value;
        }
        return array2;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array2, depth, predicate, isStrict, result2) {
        var index = -1, length2 = array2.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length2) {
          var value = array2[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush2(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor2 = createBaseFor2();
      var baseForRight = createBaseFor2(true);
      function baseForOwn2(object2, iteratee2) {
        return object2 && baseFor2(object2, iteratee2, keys2);
      }
      function baseForOwnRight(object2, iteratee2) {
        return object2 && baseForRight(object2, iteratee2, keys2);
      }
      function baseFunctions(object2, props) {
        return arrayFilter2(props, function(key) {
          return isFunction2(object2[key]);
        });
      }
      function baseGet2(object2, path) {
        path = castPath2(path, object2);
        var index = 0, length2 = path.length;
        while (object2 != null && index < length2) {
          object2 = object2[toKey2(path[index++])];
        }
        return index && index == length2 ? object2 : undefined$1;
      }
      function baseGetAllKeys2(object2, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object2);
        return isArray2(object2) ? result2 : arrayPush2(result2, symbolsFunc(object2));
      }
      function baseGetTag2(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag2 : nullTag2;
        }
        return symToStringTag2 && symToStringTag2 in Object2(value) ? getRawTag2(value) : objectToString2(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas2(object2, key) {
        return object2 != null && hasOwnProperty2.call(object2, key);
      }
      function baseHasIn2(object2, key) {
        return object2 != null && key in Object2(object2);
      }
      function baseInRange(number2, start, end) {
        return number2 >= nativeMin(start, end) && number2 < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length2 = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array2 = arrays[othIndex];
          if (othIndex && iteratee2) {
            array2 = arrayMap2(array2, baseUnary2(iteratee2));
          }
          maxLength = nativeMin(array2.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length2 >= 120 && array2.length >= 120) ? new SetCache2(othIndex && array2) : undefined$1;
        }
        array2 = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length2 && result2.length < maxLength) {
            var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas2(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas2(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object2, setter, iteratee2, accumulator) {
        baseForOwn2(object2, function(value, key, object3) {
          setter(accumulator, iteratee2(value), key, object3);
        });
        return accumulator;
      }
      function baseInvoke(object2, path, args) {
        path = castPath2(path, object2);
        object2 = parent(object2, path);
        var func = object2 == null ? object2 : object2[toKey2(last(path))];
        return func == null ? undefined$1 : apply(func, object2, args);
      }
      function baseIsArguments2(value) {
        return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike2(value) && baseGetTag2(value) == arrayBufferTag2;
      }
      function baseIsDate(value) {
        return isObjectLike2(value) && baseGetTag2(value) == dateTag2;
      }
      function baseIsEqual2(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
      }
      function baseIsEqualDeep2(object2, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray2(object2), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag2(object2), othTag = othIsArr ? arrayTag2 : getTag2(other);
        objTag = objTag == argsTag2 ? objectTag2 : objTag;
        othTag = othTag == argsTag2 ? objectTag2 : othTag;
        var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer2(object2)) {
          if (!isBuffer2(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack2());
          return objIsArr || isTypedArray2(object2) ? equalArrays2(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object2, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG2)) {
          var objIsWrapped = objIsObj && hasOwnProperty2.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack2());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack2());
        return equalObjects2(object2, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike2(value) && getTag2(value) == mapTag2;
      }
      function baseIsMatch2(object2, source, matchData, customizer) {
        var index = matchData.length, length2 = index, noCustomizer = !customizer;
        if (object2 == null) {
          return !length2;
        }
        object2 = Object2(object2);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
            return false;
          }
        }
        while (++index < length2) {
          data = matchData[index];
          var key = data[0], objValue = object2[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object2)) {
              return false;
            }
          } else {
            var stack = new Stack2();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object2, source, stack);
            }
            if (!(result2 === undefined$1 ? baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative2(value) {
        if (!isObject2(value) || isMasked2(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
        return pattern.test(toSource2(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike2(value) && baseGetTag2(value) == regexpTag2;
      }
      function baseIsSet(value) {
        return isObjectLike2(value) && getTag2(value) == setTag2;
      }
      function baseIsTypedArray2(value) {
        return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
      }
      function baseIteratee2(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity2;
        }
        if (typeof value == "object") {
          return isArray2(value) ? baseMatchesProperty2(value[0], value[1]) : baseMatches2(value);
        }
        return property2(value);
      }
      function baseKeys2(object2) {
        if (!isPrototype2(object2)) {
          return nativeKeys2(object2);
        }
        var result2 = [];
        for (var key in Object2(object2)) {
          if (hasOwnProperty2.call(object2, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object2) {
        if (!isObject2(object2)) {
          return nativeKeysIn(object2);
        }
        var isProto = isPrototype2(object2), result2 = [];
        for (var key in object2) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object2, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches2(source) {
        var matchData = getMatchData2(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable2(matchData[0][0], matchData[0][1]);
        }
        return function(object2) {
          return object2 === source || baseIsMatch2(object2, source, matchData);
        };
      }
      function baseMatchesProperty2(path, srcValue) {
        if (isKey2(path) && isStrictComparable2(srcValue)) {
          return matchesStrictComparable2(toKey2(path), srcValue);
        }
        return function(object2) {
          var objValue = get2(object2, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn2(object2, path) : baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2);
        };
      }
      function baseMerge(object2, source, srcIndex, customizer, stack) {
        if (object2 === source) {
          return;
        }
        baseFor2(source, function(srcValue, key) {
          stack || (stack = new Stack2());
          if (isObject2(srcValue)) {
            baseMergeDeep(object2, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object2, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object2, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object2, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray2(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject2(srcValue) || isArguments2(srcValue)) {
            newValue = objValue;
            if (isArguments2(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject2(objValue) || isFunction2(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object2, key, newValue);
      }
      function baseNth(array2, n2) {
        var length2 = array2.length;
        if (!length2) {
          return;
        }
        n2 += n2 < 0 ? length2 : 0;
        return isIndex2(n2, length2) ? array2[n2] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap2(iteratees, function(iteratee2) {
            if (isArray2(iteratee2)) {
              return function(value) {
                return baseGet2(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity2];
        }
        var index = -1;
        iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap2(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result2, function(object2, other) {
          return compareMultiple(object2, other, orders);
        });
      }
      function basePick(object2, paths) {
        return basePickBy(object2, paths, function(value, path) {
          return hasIn2(object2, path);
        });
      }
      function basePickBy(object2, paths, predicate) {
        var index = -1, length2 = paths.length, result2 = {};
        while (++index < length2) {
          var path = paths[index], value = baseGet2(object2, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath2(path, object2), value);
          }
        }
        return result2;
      }
      function basePropertyDeep2(path) {
        return function(object2) {
          return baseGet2(object2, path);
        };
      }
      function basePullAll(array2, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length2 = values2.length, seen = array2;
        if (array2 === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap2(array2, baseUnary2(iteratee2));
        }
        while (++index < length2) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array2) {
              splice2.call(seen, fromIndex, 1);
            }
            splice2.call(array2, fromIndex, 1);
          }
        }
        return array2;
      }
      function basePullAt(array2, indexes) {
        var length2 = array2 ? indexes.length : 0, lastIndex = length2 - 1;
        while (length2--) {
          var index = indexes[length2];
          if (length2 == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex2(index)) {
              splice2.call(array2, index, 1);
            } else {
              baseUnset(array2, index);
            }
          }
        }
        return array2;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length2 = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length2);
        while (length2--) {
          result2[fromRight ? length2 : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string2, n2) {
        var result2 = "";
        if (!string2 || n2 < 1 || n2 > MAX_SAFE_INTEGER2) {
          return result2;
        }
        do {
          if (n2 % 2) {
            result2 += string2;
          }
          n2 = nativeFloor(n2 / 2);
          if (n2) {
            string2 += string2;
          }
        } while (n2);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity2), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n2) {
        var array2 = values(collection);
        return shuffleSelf(array2, baseClamp(n2, 0, array2.length));
      }
      function baseSet(object2, path, value, customizer) {
        if (!isObject2(object2)) {
          return object2;
        }
        path = castPath2(path, object2);
        var index = -1, length2 = path.length, lastIndex = length2 - 1, nested = object2;
        while (nested != null && ++index < length2) {
          var key = toKey2(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object2;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject2(objValue) ? objValue : isIndex2(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object2;
      }
      var baseSetData = !metaMap ? identity2 : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty2 ? identity2 : function(func, string2) {
        return defineProperty2(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string2),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice2(array2, start, end) {
        var index = -1, length2 = array2.length;
        if (start < 0) {
          start = -start > length2 ? 0 : length2 + start;
        }
        end = end > length2 ? length2 : end;
        if (end < 0) {
          end += length2;
        }
        length2 = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length2);
        while (++index < length2) {
          result2[index] = array2[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array2, value, retHighest) {
        var low = 0, high = array2 == null ? low : array2.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array2[mid];
            if (computed !== null && !isSymbol2(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array2, value, identity2, retHighest);
      }
      function baseSortedIndexBy(array2, value, iteratee2, retHighest) {
        var low = 0, high = array2 == null ? 0 : array2.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array2[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol2(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array2, iteratee2) {
        var index = -1, length2 = array2.length, resIndex = 0, result2 = [];
        while (++index < length2) {
          var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq2(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString2(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray2(value)) {
          return arrayMap2(value, baseToString2) + "";
        }
        if (isSymbol2(value)) {
          return symbolToString2 ? symbolToString2.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
      }
      function baseUniq(array2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length2 = array2.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length2 >= LARGE_ARRAY_SIZE2) {
          var set22 = iteratee2 ? null : createSet(array2);
          if (set22) {
            return setToArray2(set22);
          }
          isCommon = false;
          includes2 = cacheHas2;
          seen = new SetCache2();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length2) {
            var value = array2[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object2, path) {
        path = castPath2(path, object2);
        object2 = parent(object2, path);
        return object2 == null || delete object2[toKey2(last(path))];
      }
      function baseUpdate(object2, path, updater, customizer) {
        return baseSet(object2, path, updater(baseGet2(object2, path)), customizer);
      }
      function baseWhile(array2, predicate, isDrop, fromRight) {
        var length2 = array2.length, index = fromRight ? length2 : -1;
        while ((fromRight ? index-- : ++index < length2) && predicate(array2[index], index, array2)) {
        }
        return isDrop ? baseSlice2(array2, fromRight ? 0 : index, fromRight ? index + 1 : length2) : baseSlice2(array2, fromRight ? index + 1 : 0, fromRight ? length2 : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce2(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush2([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length2 = arrays.length;
        if (length2 < 2) {
          return length2 ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length2);
        while (++index < length2) {
          var array2 = arrays[index], othIndex = -1;
          while (++othIndex < length2) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array2, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length2 = props.length, valsLength = values2.length, result2 = {};
        while (++index < length2) {
          var value = index < valsLength ? values2[index] : undefined$1;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity2;
      }
      function castPath2(value, object2) {
        if (isArray2(value)) {
          return value;
        }
        return isKey2(value, object2) ? [value] : stringToPath2(toString2(value));
      }
      var castRest = baseRest;
      function castSlice2(array2, start, end) {
        var length2 = array2.length;
        end = end === undefined$1 ? length2 : end;
        return !start && end >= length2 ? array2 : baseSlice2(array2, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root2.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length2 = buffer.length, result2 = allocUnsafe ? allocUnsafe(length2) : new buffer.constructor(length2);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf2 ? Object2(symbolValueOf2.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
          var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object2, other, orders) {
        var index = -1, objCriteria = object2.criteria, othCriteria = other.criteria, length2 = objCriteria.length, ordersLength = orders.length;
        while (++index < length2) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object2.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array2) {
        var index = -1, length2 = source.length;
        array2 || (array2 = Array2(length2));
        while (++index < length2) {
          array2[index] = source[index];
        }
        return array2;
      }
      function copyObject(source, props, object2, customizer) {
        var isNew = !object2;
        object2 || (object2 = {});
        var index = -1, length2 = props.length;
        while (++index < length2) {
          var key = props[index];
          var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue2(object2, key, newValue);
          } else {
            assignValue(object2, key, newValue);
          }
        }
        return object2;
      }
      function copySymbols(source, object2) {
        return copyObject(source, getSymbols2(source), object2);
      }
      function copySymbolsIn(source, object2) {
        return copyObject(source, getSymbolsIn(source), object2);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object2, sources) {
          var index = -1, length2 = sources.length, customizer = length2 > 1 ? sources[length2 - 1] : undefined$1, guard = length2 > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length2--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length2 < 3 ? undefined$1 : customizer;
            length2 = 1;
          }
          object2 = Object2(object2);
          while (++index < length2) {
            var source = sources[index];
            if (source) {
              assigner(object2, source, index, customizer);
            }
          }
          return object2;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike2(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length2 = collection.length, index = fromRight ? length2 : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length2) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor2(fromRight) {
        return function(object2, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object2), props = keysFunc(object2), length2 = props.length;
          while (length2--) {
            var key = props[fromRight ? length2 : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object2;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst2(methodName) {
        return function(string2) {
          string2 = toString2(string2);
          var strSymbols = hasUnicode2(string2) ? stringToArray2(string2) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
          var trailing = strSymbols ? castSlice2(strSymbols, 1).join("") : string2.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder2(callback) {
        return function(string2) {
          return arrayReduce2(words2(deburr2(string2).replace(reApos2, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject2(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length2 = arguments.length, args = Array2(length2), index = length2, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length2 < 3 && args[0] !== placeholder && args[length2 - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length2 -= holders.length;
          if (length2 < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length2);
          }
          var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike2(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys2(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length2 = funcs.length, index = length2, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT2);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length2;
          while (++index < length2) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray2(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length2 ? funcs[index2].apply(this, args) : value;
            while (++index2 < length2) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length2 = arguments.length, args = Array2(length2), index = length2;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length2 -= holdersCount;
          if (isCurried && length2 < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length2);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length2 = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length2 > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length2) {
            args.length = ary2;
          }
          if (this && this !== root2 && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object2, iteratee2) {
          return baseInverter(object2, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result2 = value;
          }
          if (other !== undefined$1) {
            if (result2 === undefined$1) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString2(value);
              other = baseToString2(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length2, chars2) {
        chars2 = chars2 === undefined$1 ? " " : baseToString2(chars2);
        var charsLength = chars2.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars2, length2) : chars2;
        }
        var result2 = baseRepeat(chars2, nativeCeil(length2 / stringSize(chars2)));
        return hasUnicode2(chars2) ? castSlice2(stringToArray2(result2), 0, length2).join("") : result2.slice(0, length2);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number2, precision) {
          number2 = toNumber(number2);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number2)) {
            var pair = (toString2(number2) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString2(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number2);
        };
      }
      var createSet = !(Set2 && 1 / setToArray2(new Set2([, -0]))[1] == INFINITY2) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object2) {
          var tag = getTag2(object2);
          if (tag == mapTag2) {
            return mapToArray2(object2);
          }
          if (tag == setTag2) {
            return setToPairs(object2);
          }
          return baseToPairs(object2, keysFunc(object2));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        var length2 = partials ? partials.length : 0;
        if (!length2) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length2 -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length2, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object2) {
        if (objValue === undefined$1 || eq2(objValue, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object2, source, stack) {
        if (isObject2(objValue) && isObject2(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject2(value) ? undefined$1 : value;
      }
      function equalArrays2(array2, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, arrLength = array2.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array2);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array2;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG2 ? new SetCache2() : undefined$1;
        stack.set(array2, other);
        stack.set(other, array2);
        while (++index < arrLength) {
          var arrValue = array2[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome2(other, function(othValue2, othIndex) {
              if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array2);
        stack["delete"](other);
        return result2;
      }
      function equalByTag2(object2, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag2:
            if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
              return false;
            }
            object2 = object2.buffer;
            other = other.buffer;
          case arrayBufferTag2:
            if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object2), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag2:
          case dateTag2:
          case numberTag2:
            return eq2(+object2, +other);
          case errorTag2:
            return object2.name == other.name && object2.message == other.message;
          case regexpTag2:
          case stringTag2:
            return object2 == other + "";
          case mapTag2:
            var convert = mapToArray2;
          case setTag2:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
            convert || (convert = setToArray2);
            if (object2.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object2);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG2;
            stack.set(object2, other);
            var result2 = equalArrays2(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object2);
            return result2;
          case symbolTag2:
            if (symbolValueOf2) {
              return symbolValueOf2.call(object2) == symbolValueOf2.call(other);
            }
        }
        return false;
      }
      function equalObjects2(object2, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, objProps = getAllKeys2(object2), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object2);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object2;
        }
        var result2 = true;
        stack.set(object2, other);
        stack.set(other, object2);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object2[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
          }
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object2.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object2);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + "");
      }
      function getAllKeys2(object2) {
        return baseGetAllKeys2(object2, keys2, getSymbols2);
      }
      function getAllKeysIn(object2) {
        return baseGetAllKeys2(object2, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array2 = realNames[result2], length2 = hasOwnProperty2.call(realNames, result2) ? array2.length : 0;
        while (length2--) {
          var data = array2[length2], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object2 = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
        return object2.placeholder;
      }
      function getIteratee() {
        var result2 = lodash2.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee2 : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData2(map3, key) {
        var data = map3.__data__;
        return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData2(object2) {
        var result2 = keys2(object2), length2 = result2.length;
        while (length2--) {
          var key = result2[length2], value = object2[key];
          result2[length2] = [key, value, isStrictComparable2(value)];
        }
        return result2;
      }
      function getNative2(object2, key) {
        var value = getValue2(object2, key);
        return baseIsNative2(value) ? value : undefined$1;
      }
      function getRawTag2(value) {
        var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
        try {
          value[symToStringTag2] = undefined$1;
          var unmasked = true;
        } catch (e2) {
        }
        var result2 = nativeObjectToString2.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag2] = tag;
          } else {
            delete value[symToStringTag2];
          }
        }
        return result2;
      }
      var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object2) {
        if (object2 == null) {
          return [];
        }
        object2 = Object2(object2);
        return arrayFilter2(nativeGetSymbols2(object2), function(symbol) {
          return propertyIsEnumerable2.call(object2, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols2 ? stubArray2 : function(object2) {
        var result2 = [];
        while (object2) {
          arrayPush2(result2, getSymbols2(object2));
          object2 = getPrototype(object2);
        }
        return result2;
      };
      var getTag2 = baseGetTag2;
      if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
        getTag2 = function(value) {
          var result2 = baseGetTag2(value), Ctor = result2 == objectTag2 ? value.constructor : undefined$1, ctorString = Ctor ? toSource2(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString2:
                return dataViewTag2;
              case mapCtorString2:
                return mapTag2;
              case promiseCtorString2:
                return promiseTag2;
              case setCtorString2:
                return setTag2;
              case weakMapCtorString2:
                return weakMapTag2;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length2 = transforms.length;
        while (++index < length2) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source) {
        var match2 = source.match(reWrapDetails);
        return match2 ? match2[1].split(reSplitDetails) : [];
      }
      function hasPath2(object2, path, hasFunc) {
        path = castPath2(path, object2);
        var index = -1, length2 = path.length, result2 = false;
        while (++index < length2) {
          var key = toKey2(path[index]);
          if (!(result2 = object2 != null && hasFunc(object2, key))) {
            break;
          }
          object2 = object2[key];
        }
        if (result2 || ++index != length2) {
          return result2;
        }
        length2 = object2 == null ? 0 : object2.length;
        return !!length2 && isLength2(length2) && isIndex2(key, length2) && (isArray2(object2) || isArguments2(object2));
      }
      function initCloneArray(array2) {
        var length2 = array2.length, result2 = new array2.constructor(length2);
        if (length2 && typeof array2[0] == "string" && hasOwnProperty2.call(array2, "index")) {
          result2.index = array2.index;
          result2.input = array2.input;
        }
        return result2;
      }
      function initCloneObject(object2) {
        return typeof object2.constructor == "function" && !isPrototype2(object2) ? baseCreate(getPrototype(object2)) : {};
      }
      function initCloneByTag(object2, tag, isDeep) {
        var Ctor = object2.constructor;
        switch (tag) {
          case arrayBufferTag2:
            return cloneArrayBuffer(object2);
          case boolTag2:
          case dateTag2:
            return new Ctor(+object2);
          case dataViewTag2:
            return cloneDataView(object2, isDeep);
          case float32Tag2:
          case float64Tag2:
          case int8Tag2:
          case int16Tag2:
          case int32Tag2:
          case uint8Tag2:
          case uint8ClampedTag2:
          case uint16Tag2:
          case uint32Tag2:
            return cloneTypedArray(object2, isDeep);
          case mapTag2:
            return new Ctor();
          case numberTag2:
          case stringTag2:
            return new Ctor(object2);
          case regexpTag2:
            return cloneRegExp(object2);
          case setTag2:
            return new Ctor();
          case symbolTag2:
            return cloneSymbol(object2);
        }
      }
      function insertWrapDetails(source, details) {
        var length2 = details.length;
        if (!length2) {
          return source;
        }
        var lastIndex = length2 - 1;
        details[lastIndex] = (length2 > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length2 > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray2(value) || isArguments2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex2(value, length2) {
        var type = typeof value;
        length2 = length2 == null ? MAX_SAFE_INTEGER2 : length2;
        return !!length2 && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
      }
      function isIterateeCall(value, index, object2) {
        if (!isObject2(object2)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike2(object2) && isIndex2(index, object2.length) : type == "string" && index in object2) {
          return eq2(object2[index], value);
        }
        return false;
      }
      function isKey2(value, object2) {
        if (isArray2(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
          return true;
        }
        return reIsPlainProp2.test(value) || !reIsDeepProp2.test(value) || object2 != null && value in Object2(object2);
      }
      function isKeyable2(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked2(func) {
        return !!maskSrcKey2 && maskSrcKey2 in func;
      }
      var isMaskable = coreJsData2 ? isFunction2 : stubFalse2;
      function isPrototype2(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
        return value === proto;
      }
      function isStrictComparable2(value) {
        return value === value && !isObject2(value);
      }
      function matchesStrictComparable2(key, srcValue) {
        return function(object2) {
          if (object2 == null) {
            return false;
          }
          return object2[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object2));
        };
      }
      function memoizeCapped2(func) {
        var result2 = memoize2(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE2) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object2) {
        var result2 = [];
        if (object2 != null) {
          for (var key in Object2(object2)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString2(value) {
        return nativeObjectToString2.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length2 = nativeMax(args.length - start, 0), array2 = Array2(length2);
          while (++index < length2) {
            array2[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array2);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object2, path) {
        return path.length < 2 ? object2 : baseGet2(object2, baseSlice2(path, 0, -1));
      }
      function reorder(array2, indexes) {
        var arrLength = array2.length, length2 = nativeMin(indexes.length, arrLength), oldArray = copyArray(array2);
        while (length2--) {
          var index = indexes[length2];
          array2[length2] = isIndex2(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array2;
      }
      function safeGet(object2, key) {
        if (key === "constructor" && typeof object2[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object2[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root2.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array2, size2) {
        var index = -1, length2 = array2.length, lastIndex = length2 - 1;
        size2 = size2 === undefined$1 ? length2 : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array2[rand];
          array2[rand] = array2[index];
          array2[index] = value;
        }
        array2.length = size2;
        return array2;
      }
      var stringToPath2 = memoizeCapped2(function(string2) {
        var result2 = [];
        if (string2.charCodeAt(0) === 46) {
          result2.push("");
        }
        string2.replace(rePropName2, function(match2, number2, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar2, "$1") : number2 || match2);
        });
        return result2;
      });
      function toKey2(value) {
        if (typeof value == "string" || isSymbol2(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
      }
      function toSource2(func) {
        if (func != null) {
          try {
            return funcToString2.call(func);
          } catch (e2) {
          }
          try {
            return func + "";
          } catch (e2) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array2, size2, guard) {
        if (guard ? isIterateeCall(array2, size2, guard) : size2 === undefined$1) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2 || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length2 / size2));
        while (index < length2) {
          result2[resIndex++] = baseSlice2(array2, index, index += size2);
        }
        return result2;
      }
      function compact(array2) {
        var index = -1, length2 = array2 == null ? 0 : array2.length, resIndex = 0, result2 = [];
        while (++index < length2) {
          var value = array2[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length2 = arguments.length;
        if (!length2) {
          return [];
        }
        var args = Array2(length2 - 1), array2 = arguments[0], index = length2;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush2(isArray2(array2) ? copyArray(array2) : [array2], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array2, values2) {
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array2, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array2, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice2(array2, n2 < 0 ? 0 : n2, length2);
      }
      function dropRight(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length2 - n2;
        return baseSlice2(array2, 0, n2 < 0 ? 0 : n2);
      }
      function dropRightWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true) : [];
      }
      function fill(array2, value, start, end) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array2, value, start)) {
          start = 0;
          end = length2;
        }
        return baseFill(array2, value, start, end);
      }
      function findIndex2(array2, predicate, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length2 + index, 0);
        }
        return baseFindIndex(array2, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array2, predicate, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = length2 - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
        }
        return baseFindIndex(array2, getIteratee(predicate, 3), index, true);
      }
      function flatten(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseFlatten(array2, 1) : [];
      }
      function flattenDeep(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseFlatten(array2, INFINITY2) : [];
      }
      function flattenDepth(array2, depth) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array2, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length2 = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length2) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array2) {
        return array2 && array2.length ? array2[0] : undefined$1;
      }
      function indexOf(array2, value, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length2 + index, 0);
        }
        return baseIndexOf(array2, value, index);
      }
      function initial(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseSlice2(array2, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap2(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array2, separator) {
        return array2 == null ? "" : nativeJoin.call(array2, separator);
      }
      function last(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? array2[length2 - 1] : undefined$1;
      }
      function lastIndexOf(array2, value, fromIndex) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return -1;
        }
        var index = length2;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
        }
        return value === value ? strictLastIndexOf(array2, value, index) : baseFindIndex(array2, baseIsNaN, index, true);
      }
      function nth(array2, n2) {
        return array2 && array2.length ? baseNth(array2, toInteger(n2)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array2, values2) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2) : array2;
      }
      function pullAllBy(array2, values2, iteratee2) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, getIteratee(iteratee2, 2)) : array2;
      }
      function pullAllWith(array2, values2, comparator) {
        return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, undefined$1, comparator) : array2;
      }
      var pullAt = flatRest(function(array2, indexes) {
        var length2 = array2 == null ? 0 : array2.length, result2 = baseAt(array2, indexes);
        basePullAt(array2, arrayMap2(indexes, function(index) {
          return isIndex2(index, length2) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array2, predicate) {
        var result2 = [];
        if (!(array2 && array2.length)) {
          return result2;
        }
        var index = -1, indexes = [], length2 = array2.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length2) {
          var value = array2[index];
          if (predicate(value, index, array2)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array2, indexes);
        return result2;
      }
      function reverse(array2) {
        return array2 == null ? array2 : nativeReverse.call(array2);
      }
      function slice(array2, start, end) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array2, start, end)) {
          start = 0;
          end = length2;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length2 : toInteger(end);
        }
        return baseSlice2(array2, start, end);
      }
      function sortedIndex(array2, value) {
        return baseSortedIndex(array2, value);
      }
      function sortedIndexBy(array2, value, iteratee2) {
        return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array2, value) {
        var length2 = array2 == null ? 0 : array2.length;
        if (length2) {
          var index = baseSortedIndex(array2, value);
          if (index < length2 && eq2(array2[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array2, value) {
        return baseSortedIndex(array2, value, true);
      }
      function sortedLastIndexBy(array2, value, iteratee2) {
        return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array2, value) {
        var length2 = array2 == null ? 0 : array2.length;
        if (length2) {
          var index = baseSortedIndex(array2, value, true) - 1;
          if (eq2(array2[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array2) {
        return array2 && array2.length ? baseSortedUniq(array2) : [];
      }
      function sortedUniqBy(array2, iteratee2) {
        return array2 && array2.length ? baseSortedUniq(array2, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array2) {
        var length2 = array2 == null ? 0 : array2.length;
        return length2 ? baseSlice2(array2, 1, length2) : [];
      }
      function take(array2, n2, guard) {
        if (!(array2 && array2.length)) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice2(array2, 0, n2 < 0 ? 0 : n2);
      }
      function takeRight(array2, n2, guard) {
        var length2 = array2 == null ? 0 : array2.length;
        if (!length2) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length2 - n2;
        return baseSlice2(array2, n2 < 0 ? 0 : n2, length2);
      }
      function takeRightWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array2, predicate) {
        return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array2) {
        return array2 && array2.length ? baseUniq(array2) : [];
      }
      function uniqBy(array2, iteratee2) {
        return array2 && array2.length ? baseUniq(array2, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array2, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return array2 && array2.length ? baseUniq(array2, undefined$1, comparator) : [];
      }
      function unzip(array2) {
        if (!(array2 && array2.length)) {
          return [];
        }
        var length2 = 0;
        array2 = arrayFilter2(array2, function(group) {
          if (isArrayLikeObject(group)) {
            length2 = nativeMax(group.length, length2);
            return true;
          }
        });
        return baseTimes2(length2, function(index) {
          return arrayMap2(array2, baseProperty2(index));
        });
      }
      function unzipWith(array2, iteratee2) {
        if (!(array2 && array2.length)) {
          return [];
        }
        var result2 = unzip(array2);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap2(result2, function(group) {
          return apply(iteratee2, undefined$1, group);
        });
      }
      var without = baseRest(function(array2, values2) {
        return isArrayLikeObject(array2) ? baseDifference(array2, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter2(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseXor(arrayFilter2(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseXor(arrayFilter2(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length2 = arrays.length, iteratee2 = length2 > 1 ? arrays[length2 - 1] : undefined$1;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash2(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length2 = paths.length, start = length2 ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object2) {
          return baseAt(object2, paths);
        };
        if (length2 > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex2(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length2 ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array2) {
          if (length2 && !array2.length) {
            array2.push(undefined$1);
          }
          return array2;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray2(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone3 = wrapperClone(parent2);
          clone3.__index__ = 0;
          clone3.__values__ = undefined$1;
          if (result2) {
            previous.__wrapped__ = clone3;
          } else {
            result2 = clone3;
          }
          var previous = clone3;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty2.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue2(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray2(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter2 : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex2);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), INFINITY2);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map2(collection, iteratee2), depth);
      }
      function forEach2(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty2.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue2(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike2(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length2 = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length2 + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length2 && collection.indexOf(value, fromIndex) > -1 : !!length2 && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue2(result2, key, value);
      });
      function map2(collection, iteratee2) {
        var func = isArray2(collection) ? arrayMap2 : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray2(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray2(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduce2 : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter2 : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray2(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n2, guard) {
        if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n2);
      }
      function shuffle(collection) {
        var func = isArray2(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike2(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag2(collection);
        if (tag == mapTag2 || tag == setTag2) {
          return collection.size;
        }
        return baseKeys2(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray2(collection) ? arraySome2 : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length2 = iteratees.length;
        if (length2 > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length2 > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root2.Date.now();
      };
      function after(n2, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n2, guard) {
        n2 = guard ? undefined$1 : n2;
        n2 = func && n2 == null ? func.length : n2;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n2);
      }
      function before(n2, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n2 <= 1) {
            func = undefined$1;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object2, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object2, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize2(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache2.set(key, result2) || cache2;
          return result2;
        };
        memoized.cache = new (memoize2.Cache || MapCache2)();
        return memoized;
      }
      memoize2.Cache = MapCache2;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once2(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap2(transforms[0], baseUnary2(getIteratee())) : arrayMap2(baseFlatten(transforms, 1), baseUnary2(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length2 = nativeMin(args.length, funcsLength);
          while (++index < length2) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array2 = args[start], otherArgs = castSlice2(args, 0, start);
          if (array2) {
            arrayPush2(otherArgs, array2);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT2);
        }
        if (isObject2(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray2(value) ? value : [value];
      }
      function clone2(value) {
        return baseClone2(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone2(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone2(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone2(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object2, source) {
        return source == null || baseConformsTo(object2, source, keys2(source));
      }
      function eq2(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments2 = baseIsArguments2(function() {
        return arguments;
      }()) ? baseIsArguments2 : function(value) {
        return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
      };
      var isArray2 = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary2(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike2(value) {
        return value != null && isLength2(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike2(value) && isArrayLike2(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike2(value) && baseGetTag2(value) == boolTag2;
      }
      var isBuffer2 = nativeIsBuffer || stubFalse2;
      var isDate2 = nodeIsDate ? baseUnary2(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike2(value) && value.nodeType === 1 && !isPlainObject2(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike2(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments2(value))) {
          return !value.length;
        }
        var tag = getTag2(value);
        if (tag == mapTag2 || tag == setTag2) {
          return !value.size;
        }
        if (isPrototype2(value)) {
          return !baseKeys2(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty2.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual2(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        var result2 = customizer ? customizer(value, other) : undefined$1;
        return result2 === undefined$1 ? baseIsEqual2(value, other, undefined$1, customizer) : !!result2;
      }
      function isError2(value) {
        if (!isObjectLike2(value)) {
          return false;
        }
        var tag = baseGetTag2(value);
        return tag == errorTag2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction2(value) {
        if (!isObject2(value)) {
          return false;
        }
        var tag = baseGetTag2(value);
        return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength2(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
      }
      function isObject2(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike2(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary2(nodeIsMap) : baseIsMap;
      function isMatch(object2, source) {
        return object2 === source || baseIsMatch2(object2, source, getMatchData2(source));
      }
      function isMatchWith(object2, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseIsMatch2(object2, source, getMatchData2(source), customizer);
      }
      function isNaN2(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative2(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike2(value) && baseGetTag2(value) == numberTag2;
      }
      function isPlainObject2(value) {
        if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary2(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER2 && value <= MAX_SAFE_INTEGER2;
      }
      var isSet = nodeIsSet ? baseUnary2(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag2;
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
      }
      var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
      function isUndefined(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike2(value) && getTag2(value) == weakMapTag2;
      }
      function isWeakSet(value) {
        return isObjectLike2(value) && baseGetTag2(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray2(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike2(value)) {
          return isString(value) ? stringToArray2(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag2(value), func = tag == mapTag2 ? mapToArray2 : tag == setTag2 ? setToArray2 : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY2 || value === -INFINITY2) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary2 = reIsBinary.test(value);
        return isBinary2 || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2) : value === 0 ? value : 0;
      }
      function toString2(value) {
        return value == null ? "" : baseToString2(value);
      }
      var assign2 = createAssigner(function(object2, source) {
        if (isPrototype2(source) || isArrayLike2(source)) {
          copyObject(source, keys2(source), object2);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty2.call(source, key)) {
            assignValue(object2, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object2, source) {
        copyObject(source, keysIn(source), object2);
      });
      var assignInWith = createAssigner(function(object2, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object2, customizer);
      });
      var assignWith = createAssigner(function(object2, source, srcIndex, customizer) {
        copyObject(source, keys2(source), object2, customizer);
      });
      var at = flatRest(baseAt);
      function create2(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object2, sources) {
        object2 = Object2(object2);
        var index = -1;
        var length2 = sources.length;
        var guard = length2 > 2 ? sources[2] : undefined$1;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length2 = 1;
        }
        while (++index < length2) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object2[key];
            if (value === undefined$1 || eq2(value, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
              object2[key] = source[key];
            }
          }
        }
        return object2;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object2, predicate) {
        return baseFindKey(object2, getIteratee(predicate, 3), baseForOwn2);
      }
      function findLastKey(object2, predicate) {
        return baseFindKey(object2, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object2, iteratee2) {
        return object2 == null ? object2 : baseFor2(object2, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object2, iteratee2) {
        return object2 == null ? object2 : baseForRight(object2, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object2, iteratee2) {
        return object2 && baseForOwn2(object2, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object2, iteratee2) {
        return object2 && baseForOwnRight(object2, getIteratee(iteratee2, 3));
      }
      function functions(object2) {
        return object2 == null ? [] : baseFunctions(object2, keys2(object2));
      }
      function functionsIn(object2) {
        return object2 == null ? [] : baseFunctions(object2, keysIn(object2));
      }
      function get2(object2, path, defaultValue) {
        var result2 = object2 == null ? undefined$1 : baseGet2(object2, path);
        return result2 === undefined$1 ? defaultValue : result2;
      }
      function has2(object2, path) {
        return object2 != null && hasPath2(object2, path, baseHas2);
      }
      function hasIn2(object2, path) {
        return object2 != null && hasPath2(object2, path, baseHasIn2);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString2.call(value);
        }
        result2[value] = key;
      }, constant(identity2));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString2.call(value);
        }
        if (hasOwnProperty2.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys2(object2) {
        return isArrayLike2(object2) ? arrayLikeKeys2(object2) : baseKeys2(object2);
      }
      function keysIn(object2) {
        return isArrayLike2(object2) ? arrayLikeKeys2(object2, true) : baseKeysIn(object2);
      }
      function mapKeys2(object2, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn2(object2, function(value, key, object3) {
          baseAssignValue2(result2, iteratee2(value, key, object3), value);
        });
        return result2;
      }
      function mapValues2(object2, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn2(object2, function(value, key, object3) {
          baseAssignValue2(result2, key, iteratee2(value, key, object3));
        });
        return result2;
      }
      var merge = createAssigner(function(object2, source, srcIndex) {
        baseMerge(object2, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object2, source, srcIndex, customizer) {
        baseMerge(object2, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object2, paths) {
        var result2 = {};
        if (object2 == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap2(paths, function(path) {
          path = castPath2(path, object2);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object2, getAllKeysIn(object2), result2);
        if (isDeep) {
          result2 = baseClone2(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length2 = paths.length;
        while (length2--) {
          baseUnset(result2, paths[length2]);
        }
        return result2;
      });
      function omitBy(object2, predicate) {
        return pickBy(object2, negate(getIteratee(predicate)));
      }
      var pick2 = flatRest(function(object2, paths) {
        return object2 == null ? {} : basePick(object2, paths);
      });
      function pickBy(object2, predicate) {
        if (object2 == null) {
          return {};
        }
        var props = arrayMap2(getAllKeysIn(object2), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object2, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object2, path, defaultValue) {
        path = castPath2(path, object2);
        var index = -1, length2 = path.length;
        if (!length2) {
          length2 = 1;
          object2 = undefined$1;
        }
        while (++index < length2) {
          var value = object2 == null ? undefined$1 : object2[toKey2(path[index])];
          if (value === undefined$1) {
            index = length2;
            value = defaultValue;
          }
          object2 = isFunction2(value) ? value.call(object2) : value;
        }
        return object2;
      }
      function set2(object2, path, value) {
        return object2 == null ? object2 : baseSet(object2, path, value);
      }
      function setWith(object2, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object2 == null ? object2 : baseSet(object2, path, value, customizer);
      }
      var toPairs = createToPairs(keys2);
      var toPairsIn = createToPairs(keysIn);
      function transform(object2, iteratee2, accumulator) {
        var isArr = isArray2(object2), isArrLike = isArr || isBuffer2(object2) || isTypedArray2(object2);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object2 && object2.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject2(object2)) {
            accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object2)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn2)(object2, function(value, index, object3) {
          return iteratee2(accumulator, value, index, object3);
        });
        return accumulator;
      }
      function unset(object2, path) {
        return object2 == null ? true : baseUnset(object2, path);
      }
      function update(object2, path, updater) {
        return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater));
      }
      function updateWith(object2, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater), customizer);
      }
      function values(object2) {
        return object2 == null ? [] : baseValues(object2, keys2(object2));
      }
      function valuesIn(object2) {
        return object2 == null ? [] : baseValues(object2, keysIn(object2));
      }
      function clamp2(number2, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number2), lower, upper);
      }
      function inRange(number2, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number2 = toNumber(number2);
        return baseInRange(number2, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase2 = createCompounder2(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize2(word) : word);
      });
      function capitalize2(string2) {
        return upperFirst2(toString2(string2).toLowerCase());
      }
      function deburr2(string2) {
        string2 = toString2(string2);
        return string2 && string2.replace(reLatin2, deburrLetter2).replace(reComboMark2, "");
      }
      function endsWith(string2, target, position) {
        string2 = toString2(string2);
        target = baseToString2(target);
        var length2 = string2.length;
        position = position === undefined$1 ? length2 : baseClamp(toInteger(position), 0, length2);
        var end = position;
        position -= target.length;
        return position >= 0 && string2.slice(position, end) == target;
      }
      function escape(string2) {
        string2 = toString2(string2);
        return string2 && reHasUnescapedHtml.test(string2) ? string2.replace(reUnescapedHtml, escapeHtmlChar) : string2;
      }
      function escapeRegExp(string2) {
        string2 = toString2(string2);
        return string2 && reHasRegExpChar.test(string2) ? string2.replace(reRegExpChar2, "\\$&") : string2;
      }
      var kebabCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst2("toLowerCase");
      function pad(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        if (!length2 || strLength >= length2) {
          return string2;
        }
        var mid = (length2 - strLength) / 2;
        return createPadding(nativeFloor(mid), chars2) + string2 + createPadding(nativeCeil(mid), chars2);
      }
      function padEnd(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        return length2 && strLength < length2 ? string2 + createPadding(length2 - strLength, chars2) : string2;
      }
      function padStart(string2, length2, chars2) {
        string2 = toString2(string2);
        length2 = toInteger(length2);
        var strLength = length2 ? stringSize(string2) : 0;
        return length2 && strLength < length2 ? createPadding(length2 - strLength, chars2) + string2 : string2;
      }
      function parseInt2(string2, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString2(string2).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string2, n2, guard) {
        if (guard ? isIterateeCall(string2, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        return baseRepeat(toString2(string2), n2);
      }
      function replace() {
        var args = arguments, string2 = toString2(args[0]);
        return args.length < 3 ? string2 : string2.replace(args[1], args[2]);
      }
      var snakeCase2 = createCompounder2(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split2(string2, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string2, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string2 = toString2(string2);
        if (string2 && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString2(separator);
          if (!separator && hasUnicode2(string2)) {
            return castSlice2(stringToArray2(string2), 0, limit);
          }
        }
        return string2.split(separator, limit);
      }
      var startCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst2(word);
      });
      function startsWith(string2, target, position) {
        string2 = toString2(string2);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string2.length);
        target = baseToString2(target);
        return string2.slice(position, position + target.length) == target;
      }
      function template(string2, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string2, options, guard)) {
          options = undefined$1;
        }
        string2 = toString2(string2);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys2(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string2.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string2.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match2.length;
          return match2;
        });
        source += "';\n";
        var variable = hasOwnProperty2.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
        });
        result2.source = source;
        if (isError2(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString2(value).toLowerCase();
      }
      function toUpper(value) {
        return toString2(value).toUpperCase();
      }
      function trim2(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return baseTrim(string2);
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), chrSymbols = stringToArray2(chars2), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice2(strSymbols, start, end).join("");
      }
      function trimEnd(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return string2.slice(0, trimmedEndIndex(string2) + 1);
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), end = charsEndIndex(strSymbols, stringToArray2(chars2)) + 1;
        return castSlice2(strSymbols, 0, end).join("");
      }
      function trimStart(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$1)) {
          return string2.replace(reTrimStart, "");
        }
        if (!string2 || !(chars2 = baseToString2(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray2(string2), start = charsStartIndex(strSymbols, stringToArray2(chars2));
        return castSlice2(strSymbols, start).join("");
      }
      function truncate(string2, options) {
        var length2 = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject2(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length2 = "length" in options ? toInteger(options.length) : length2;
          omission = "omission" in options ? baseToString2(options.omission) : omission;
        }
        string2 = toString2(string2);
        var strLength = string2.length;
        if (hasUnicode2(string2)) {
          var strSymbols = stringToArray2(string2);
          strLength = strSymbols.length;
        }
        if (length2 >= strLength) {
          return string2;
        }
        var end = length2 - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice2(strSymbols, 0, end).join("") : string2.slice(0, end);
        if (separator === undefined$1) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string2.slice(end).search(separator)) {
            var match2, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match2 = separator.exec(substring)) {
              var newEnd = match2.index;
            }
            result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string2.indexOf(baseToString2(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string2) {
        string2 = toString2(string2);
        return string2 && reHasEscapedHtml.test(string2) ? string2.replace(reEscapedHtml, unescapeHtmlChar) : string2;
      }
      var upperCase = createCompounder2(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst2 = createCaseFirst2("toUpperCase");
      function words2(string2, pattern, guard) {
        string2 = toString2(string2);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord2(string2) ? unicodeWords2(string2) : asciiWords2(string2);
        }
        return string2.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e2) {
          return isError2(e2) ? e2 : new Error2(e2);
        }
      });
      var bindAll = flatRest(function(object2, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey2(key);
          baseAssignValue2(object2, key, bind(object2[key], object2));
        });
        return object2;
      });
      function cond(pairs) {
        var length2 = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length2 ? [] : arrayMap2(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length2) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone2(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity2(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee2(typeof func == "function" ? func : baseClone2(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches2(baseClone2(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty2(path, baseClone2(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object2) {
          return baseInvoke(object2, path, args);
        };
      });
      var methodOf = baseRest(function(object2, args) {
        return function(path) {
          return baseInvoke(object2, path, args);
        };
      });
      function mixin2(object2, source, options) {
        var props = keys2(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object2;
          object2 = this;
          methodNames = baseFunctions(source, keys2(source));
        }
        var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object2);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object2[methodName] = func;
          if (isFunc) {
            object2.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object2(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object2 });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object2, arrayPush2([this.value()], arguments));
            };
          }
        });
        return object2;
      }
      function noConflict() {
        if (root2._ === this) {
          root2._ = oldDash;
        }
        return this;
      }
      function noop() {
      }
      function nthArg(n2) {
        n2 = toInteger(n2);
        return baseRest(function(args) {
          return baseNth(args, n2);
        });
      }
      var over = createOver(arrayMap2);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome2);
      function property2(path) {
        return isKey2(path) ? baseProperty2(toKey2(path)) : basePropertyDeep2(path);
      }
      function propertyOf(object2) {
        return function(path) {
          return object2 == null ? undefined$1 : baseGet2(object2, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray2() {
        return [];
      }
      function stubFalse2() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n2, iteratee2) {
        n2 = toInteger(n2);
        if (n2 < 1 || n2 > MAX_SAFE_INTEGER2) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length2 = nativeMin(n2, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n2 -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes2(length2, iteratee2);
        while (++index < n2) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray2(value)) {
          return arrayMap2(value, toKey2);
        }
        return isSymbol2(value) ? [value] : copyArray(stringToPath2(toString2(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter2;
        return toString2(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array2) {
        return array2 && array2.length ? baseExtremum(array2, identity2, baseGt) : undefined$1;
      }
      function maxBy(array2, iteratee2) {
        return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseGt) : undefined$1;
      }
      function mean(array2) {
        return baseMean(array2, identity2);
      }
      function meanBy(array2, iteratee2) {
        return baseMean(array2, getIteratee(iteratee2, 2));
      }
      function min(array2) {
        return array2 && array2.length ? baseExtremum(array2, identity2, baseLt) : undefined$1;
      }
      function minBy(array2, iteratee2) {
        return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array2) {
        return array2 && array2.length ? baseSum(array2, identity2) : 0;
      }
      function sumBy(array2, iteratee2) {
        return array2 && array2.length ? baseSum(array2, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign2;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at;
      lodash2.before = before;
      lodash2.bind = bind;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create2;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys2;
      lodash2.keysIn = keysIn;
      lodash2.map = map2;
      lodash2.mapKeys = mapKeys2;
      lodash2.mapValues = mapValues2;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize2;
      lodash2.merge = merge;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin2;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once2;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick2;
      lodash2.pickBy = pickBy;
      lodash2.property = property2;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set2;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split2;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray2;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words2;
      lodash2.wrap = wrap;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin2(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase2;
      lodash2.capitalize = capitalize2;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp2;
      lodash2.clone = clone2;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr2;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq2;
      lodash2.escape = escape;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex2;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor;
      lodash2.forEach = forEach2;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get2;
      lodash2.gt = gt;
      lodash2.gte = gte;
      lodash2.has = has2;
      lodash2.hasIn = hasIn2;
      lodash2.head = head;
      lodash2.identity = identity2;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments2;
      lodash2.isArray = isArray2;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike2;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean;
      lodash2.isBuffer = isBuffer2;
      lodash2.isDate = isDate2;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError2;
      lodash2.isFinite = isFinite;
      lodash2.isFunction = isFunction2;
      lodash2.isInteger = isInteger;
      lodash2.isLength = isLength2;
      lodash2.isMap = isMap;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN2;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull;
      lodash2.isNumber = isNumber;
      lodash2.isObject = isObject2;
      lodash2.isObjectLike = isObjectLike2;
      lodash2.isPlainObject = isPlainObject2;
      lodash2.isRegExp = isRegExp;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet;
      lodash2.isString = isString;
      lodash2.isSymbol = isSymbol2;
      lodash2.isTypedArray = isTypedArray2;
      lodash2.isUndefined = isUndefined;
      lodash2.isWeakMap = isWeakMap;
      lodash2.isWeakSet = isWeakSet;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt;
      lodash2.lte = lte;
      lodash2.max = max;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray2;
      lodash2.stubFalse = stubFalse2;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat;
      lodash2.replace = replace;
      lodash2.result = result;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase2;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString2;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim2;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst2;
      lodash2.each = forEach2;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin2(lodash2, function() {
        var source = {};
        baseForOwn2(lodash2, function(func, methodName) {
          if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n2) {
          n2 = n2 === undefined$1 ? 1 : nativeMax(toInteger(n2), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
          } else {
            result2.__views__.push({
              "size": nativeMin(n2, MAX_ARRAY_LENGTH),
              "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n2) {
          return this.reverse()[methodName](n2).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity2);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash2, arrayPush2([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto2[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray2(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray2(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty2.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _2 = runInContext();
    if (freeModule) {
      (freeModule.exports = _2)._ = _2;
      freeExports._ = _2;
    } else {
      root2._ = _2;
    }
  }).call(commonjsGlobal);
})(lodash, lodash.exports);
var __defProp22 = Object.defineProperty;
var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp22(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const SOCKET_HOST = "http://localhost:8888";
function socket(namespace) {
  let ns = [SOCKET_HOST, namespace].join("/").replace("@", "scope:");
  let socket2 = lookup(ns);
  socket2.on("connect", (_2) => {
  });
  return socket2;
}
socket("@fuse-labs/core");
const ClientDeviceType = Object.freeze({
  FDMPrinter: "fdm_printer",
  MSLAPrinter: "msla_printer",
  CNC: "cnc",
  Laser: "laser"
});
const CONSTRUCTOR_SCHEMA = create({
  name: create$2().required(),
  version: create$2().required(),
  _settings: create$3().required(),
  _hasPages: create$3().required(),
  _hasTabs: create$3().required(),
  _hasSocket: create$3().required(),
  _hasDeviceSocket: create$3().required(),
  _fuse: create().required(),
  _active: create$3().required(),
  _system: create$3().required()
});
create({
  name: create$2().required(),
  version: create$2().required(),
  fuse: create().required()
});
class ClientPlugin {
  constructor(data) {
    __publicField2(this, "name");
    __publicField2(this, "version");
    __publicField2(this, "_fuse");
    __publicField2(this, "_settings", false);
    __publicField2(this, "_hasPages", false);
    __publicField2(this, "_hasTabs", false);
    __publicField2(this, "_hasSocket");
    __publicField2(this, "_hasDeviceSocket");
    __publicField2(this, "_active", false);
    __publicField2(this, "_system");
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
    return this._fuse.pagesUrl || this.name;
  }
  get hasTabs() {
    return this._hasTabs;
  }
  get tabsUrl() {
    return this._fuse.tabsUrl || this.name;
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
  get deviceTypes() {
    if (this._fuse.devices == "*")
      return Object.values(ClientDeviceType);
    return this._fuse.devices;
  }
  get displayTitle() {
    return this._fuse.title || this.name;
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
    __publicField2(this, "_initialized", false);
    __publicField2(this, "_plugins", []);
    __publicField2(this, "_activePluginsNames", []);
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
__publicField2(ClientPluginManager, "_registeredPlugins", {});
create({
  id: create$2().required(),
  name: create$2().defined().required(),
  port: create$2().defined().required(),
  baudrate: create$1().defined().required(),
  profileId: create$2().defined().required(),
  serialNumber: create$2().nullable().default(null),
  vendorId: create$2().nullable().default(null),
  productId: create$2().nullable().default(null)
});
React__default.createContext();
React__default.createContext();
var jsxRuntime$2 = { exports: {} };
var reactJsxRuntime_production_min$2 = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$2 = Object.getOwnPropertySymbols;
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
var propIsEnumerable$2 = Object.prototype.propertyIsEnumerable;
function toObject$2(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative$2() {
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
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
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
shouldUseNative$2() ? Object.assign : function(target, source) {
  var from;
  var to = toObject$2(target);
  var symbols;
  for (var s2 = 1; s2 < arguments.length; s2++) {
    from = Object(arguments[s2]);
    for (var key in from) {
      if (hasOwnProperty$4.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols$2) {
      symbols = getOwnPropertySymbols$2(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable$2.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
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
var f$2 = React__default, g$2 = 60103;
reactJsxRuntime_production_min$2.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h$2 = Symbol.for;
  g$2 = h$2("react.element");
  reactJsxRuntime_production_min$2.Fragment = h$2("react.fragment");
}
var m$2 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n$2 = Object.prototype.hasOwnProperty, p$2 = { key: true, ref: true, __self: true, __source: true };
function q$2(c2, a2, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (l2 = a2.ref);
  for (b2 in a2)
    n$2.call(a2, b2) && !p$2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: g$2, type: c2, key: e2, ref: l2, props: d2, _owner: m$2.current };
}
reactJsxRuntime_production_min$2.jsx = q$2;
reactJsxRuntime_production_min$2.jsxs = q$2;
{
  jsxRuntime$2.exports = reactJsxRuntime_production_min$2;
}
jsxRuntime$2.exports.jsx;
Object.freeze({
  Loading: 0,
  PortNotFound: 1,
  DifferentDevice: 2,
  Connected: 10
});
const ReactComponent$3 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues2({
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: 15,
  height: 15,
  viewBox: "0 0 15 15"
}, props), /* @__PURE__ */ React.createElement("path", {
  d: "M-158.762,87.6l1.484,4.019h2.125l1.391-4.019Z",
  transform: "translate(163.762 -86.099)",
  fill: "currentColor"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M-159.48,87.1h6.42l-1.737,5.019h-2.829Zm5.016,1h-3.58l1.115,3.019h1.42Z",
  transform: "translate(163.762 -86.099)",
  fill: "currentColor"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M12.5.5H-.5v-1h13Z",
  transform: "translate(1.5 13.5)",
  fill: "currentColor"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M.5,2.5h-1v-3h1Z",
  transform: "translate(7.5 7.5)",
  fill: "currentColor"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M8.5.5h-9v-1h9Z",
  transform: "translate(3.5 11.5)",
  fill: "currentColor"
}));
function FDMPrinterIcon(props) {
  return /* @__PURE__ */ jsx$1(ReactComponent$3, __spreadValues2({
    viewBox: "0 0 15 15"
  }, props));
}
const ReactComponent$2 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues2({
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: 15,
  height: 15,
  viewBox: "0 0 15 15",
  fill: "currentColor"
}, props), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_1",
  "data-name": "Linea 1",
  d: "M12.5.5H-.5v-1h13Z",
  transform: "translate(1.5 3.5)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_1",
  "data-name": "Rettangolo 1",
  width: 7,
  height: 2,
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_1_-_Contorno",
  "data-name": "Rettangolo 1 - Contorno",
  d: "M0,0H7V2H0Z",
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Tracciato_3",
  "data-name": "Tracciato 3",
  d: "M-140.564,98.413l-1-1h-1v1h12v-1h-1l-1,1Z",
  transform: "translate(144.064 -84.913)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Tracciato_3_-_Contorno",
  "data-name": "Tracciato 3 - Contorno",
  d: "M-130.064,98.913h-13v-2h1.707l1,1h7.589l1-1h1.7Z",
  transform: "translate(144.064 -84.913)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_4",
  "data-name": "Linea 4",
  d: "M10,.5H0v-1H10Z",
  transform: "translate(2.5 5.5)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_5",
  "data-name": "Linea 5",
  d: "M.5,5.5h-1v-6h1Z",
  transform: "translate(2.5 5.5)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_6",
  "data-name": "Linea 6",
  d: "M.5,5.5h-1v-6h1Z",
  transform: "translate(12.5 5.5)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_2",
  "data-name": "Rettangolo 2",
  d: "M0,0H1V1H0Z",
  transform: "translate(10 10)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_3",
  "data-name": "Rettangolo 3",
  d: "M0,0H1V1H0Z",
  transform: "translate(8 10)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_4",
  "data-name": "Rettangolo 4",
  d: "M0,0H1V1H0Z",
  transform: "translate(6 10)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_5",
  "data-name": "Rettangolo 5",
  d: "M0,0H1V1H0Z",
  transform: "translate(4 10)"
}));
function MSLAPrinterIcon(props) {
  return /* @__PURE__ */ jsx$1(ReactComponent$2, __spreadValues2({}, props));
}
const ReactComponent$1 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues2({
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: 15,
  height: 15,
  viewBox: "0 0 15 15",
  fill: "currentColor"
}, props), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_1",
  "data-name": "Rettangolo 1",
  width: 7,
  height: 7,
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_1_-_Contorno",
  "data-name": "Rettangolo 1 - Contorno",
  d: "M1,1V6H6V1H1M0,0H7V7H0Z",
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_6",
  "data-name": "Rettangolo 6",
  width: 5,
  height: 2,
  transform: "translate(1 12)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_6_-_Contorno",
  "data-name": "Rettangolo 6 - Contorno",
  d: "M0,0H5V2H0Z",
  transform: "translate(1 12)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_7",
  "data-name": "Rettangolo 7",
  width: 5,
  height: 2,
  transform: "translate(9 12)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_7_-_Contorno",
  "data-name": "Rettangolo 7 - Contorno",
  d: "M0,0H5V2H0Z",
  transform: "translate(9 12)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_7",
  "data-name": "Linea 7",
  d: "M.5,4.5h-1v-5h1Z",
  transform: "translate(7.5 9.5)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_8",
  "data-name": "Rettangolo 8",
  width: 3,
  height: 2,
  transform: "translate(6 8)",
  fill: "#fff"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_8_-_Contorno",
  "data-name": "Rettangolo 8 - Contorno",
  d: "M0,0H3V2H0Z",
  transform: "translate(6 8)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_9",
  "data-name": "Rettangolo 9",
  width: 1,
  height: 1,
  transform: "translate(4 10)",
  fill: "#fff"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_9_-_Contorno",
  "data-name": "Rettangolo 9 - Contorno",
  d: "M0,0H1V1H0Z",
  transform: "translate(4 10)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_10",
  "data-name": "Rettangolo 10",
  width: 1,
  height: 1,
  transform: "translate(2 9)",
  fill: "#fff"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_10_-_Contorno",
  "data-name": "Rettangolo 10 - Contorno",
  d: "M0,0H1V1H0Z",
  transform: "translate(2 9)"
}));
function CNCIcon(props) {
  return /* @__PURE__ */ jsx$1(ReactComponent$1, __spreadValues2({}, props));
}
const ReactComponent = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues2({
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: 15,
  height: 15,
  viewBox: "0 0 15 15",
  fill: "currentColor"
}, props), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_1",
  "data-name": "Rettangolo 1",
  width: 7,
  height: 3,
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_1_-_Contorno",
  "data-name": "Rettangolo 1 - Contorno",
  d: "M1,1V2H6V1H1M0,0H7V3H0Z",
  transform: "translate(4 1)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_6",
  "data-name": "Rettangolo 6",
  width: 13,
  height: 1,
  transform: "translate(1 13)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_6_-_Contorno",
  "data-name": "Rettangolo 6 - Contorno",
  d: "M0,0H13V1H0Z",
  transform: "translate(1 13)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_7",
  "data-name": "Linea 7",
  d: "M.5,4.5h-1v-5h1Z",
  transform: "translate(7.5 5.5)"
}), /* @__PURE__ */ React.createElement("rect", {
  id: "Rettangolo_8",
  "data-name": "Rettangolo 8",
  width: 3,
  height: 2,
  transform: "translate(6 3)",
  fill: "#fff"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Rettangolo_8_-_Contorno",
  "data-name": "Rettangolo 8 - Contorno",
  d: "M0,0H3V2H0Z",
  transform: "translate(6 3)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_8",
  "data-name": "Linea 8",
  d: "M1.646,2.354l-2-2L.354-.354l2,2Z",
  transform: "translate(3.5 9.5)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Tracciato_5",
  "data-name": "Tracciato 5",
  d: "M1.5,0A1.5,1.5,0,0,1,3,1.5H0A1.5,1.5,0,0,1,1.5,0Z",
  transform: "translate(6 11)",
  fill: "#fff"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Tracciato_5_-_Contorno",
  "data-name": "Tracciato 5 - Contorno",
  d: "M1.5,0A1.5,1.5,0,0,1,3,1.5H0A1.5,1.5,0,0,1,1.5,0Z",
  transform: "translate(6 11)"
}), /* @__PURE__ */ React.createElement("path", {
  id: "Linea_9",
  "data-name": "Linea 9",
  d: "M.354,2.354l-.707-.707,2-2,.707.707Z",
  transform: "translate(9.5 9.5)"
}));
function LaserIcon(props) {
  return /* @__PURE__ */ jsx$1(ReactComponent, __spreadValues2({}, props));
}
function DeviceTypeIcon(_Ea) {
  var _Fa = _Ea, {
    device
  } = _Fa, props = __objRest2(_Fa, [
    "device"
  ]);
  const IconComponent = useMemo((_2) => {
    switch (device.profile.type) {
      case ClientDeviceType.FDMPrinter:
        return FDMPrinterIcon;
      case ClientDeviceType.MSLAPrinter:
        return MSLAPrinterIcon;
      case ClientDeviceType.CNC:
        return CNCIcon;
      case ClientDeviceType.Laser:
        return LaserIcon;
      default:
        return QuestionMarkCircledIcon;
    }
  }, [device == null ? void 0 : device.profile.type]);
  return /* @__PURE__ */ jsx$1(IconComponent, __spreadValues2({}, props));
}
function SettingsWidget(_Ma) {
  var _Na = _Ma, {
    className
  } = _Na, props = __objRest2(_Na, [
    "className"
  ]);
  return /* @__PURE__ */ jsx$1("div", {
    className: classNames("relative", "flex flex-col items-stretch justify-start", "p-3", "space-y-2", "rounded-md", "overflow-hidden", "text-sm", "text-gray-900 dark:text-gray-200", "bg-gray-300 dark:bg-gray-900", className),
    children: props.children
  });
}
const SidebarMenuItem = React__default.forwardRef((_Sa, ref) => {
  var _Ta = _Sa, {
    icon: Icon,
    iconClassName,
    href
  } = _Ta, props = __objRest2(_Ta, [
    "icon",
    "iconClassName",
    "href"
  ]);
  const contents = /* @__PURE__ */ jsxs$1(Fragment$1, {
    children: [Icon && /* @__PURE__ */ jsx$1(Icon, {
      className: classNames("w-5 h-5", iconClassName)
    }), props.children]
  });
  return /* @__PURE__ */ jsx$1("li", __spreadProps2(__spreadValues2({
    ref,
    className: "flex items-center justify-center"
  }, props), {
    children: href ? /* @__PURE__ */ jsx$1(link, {
      href,
      children: /* @__PURE__ */ jsx$1("a", {
        className: "dark:hover:bg-gray-700 hover:bg-opacity-10 p-3 rounded-md transition-colors duration-150",
        children: contents
      })
    }) : contents
  }));
});
SidebarMenuItem.displayName = "SidebarMenuItem";
const DevicePickerTrigger = React__default.forwardRef((_Ua, ref) => {
  var _Va = _Ua, {
    device,
    open
  } = _Va, props = __objRest2(_Va, [
    "device",
    "open"
  ]);
  return /* @__PURE__ */ jsxs$1("div", __spreadProps2(__spreadValues2({
    ref
  }, props), {
    className: classNames("relative", "group", "cursor-pointer", "select-none", "flex flex-row space-x-2 items-center", "rounded-sm", "ring-[3px]", {
      "bg-transparent ring-transparent": !open,
      "hover:ring-gray-700 hover:bg-gray-700": !open,
      "bg-gray-700 ring-gray-700": open
    }, "pl-[3px] ml-[-3px]", "transition-all duration-300"),
    children: [/* @__PURE__ */ jsx$1(DeviceTypeIcon, {
      device
    }), /* @__PURE__ */ jsx$1("span", {
      children: device.name
    }), /* @__PURE__ */ jsx$1("span", {
      className: "text-gray-500",
      children: "\u2022"
    }), /* @__PURE__ */ jsxs$1("span", {
      className: "text-xxs text-gray-500",
      children: [device.profile.brand, " ", device.profile.model]
    }), /* @__PURE__ */ jsx$1("div", {
      className: classNames("absolute right-0", "bg-gray-700", "pl-1", {
        "opacity-0 group-hover:opacity-100 duration-300": !open
      }),
      children: /* @__PURE__ */ jsx$1(CaretDownIcon, {})
    })]
  }));
});
DevicePickerTrigger.displayName = "DevicePickerTrigger";
const DeviceStatusListContext = React__default.createContext();
function useDeviceStatusListContext() {
  const ctx = React__default.useContext(DeviceStatusListContext);
  if (!ctx)
    throw new Error("useDeviceStatusListContext can only be used inside DeviceStatusListProvider");
  return ctx;
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
var root$1 = root;
var Symbol$1 = root$1.Symbol;
var Symbol$2 = Symbol$1;
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var nativeObjectToString$1 = objectProto$4.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$3 = Object.prototype;
var nativeObjectToString = objectProto$3.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
var coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object2, key) {
  return object2 == null ? void 0 : object2[key];
}
function getNative(object2, key) {
  var value = getValue(object2, key);
  return baseIsNative(value) ? value : void 0;
}
var nativeCreate = getNative(Object, "create");
var nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : void 0;
}
var objectProto = Object.prototype;
var hasOwnProperty$6 = objectProto.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
function assocIndexOf(array2, key) {
  var length2 = array2.length;
  while (length2--) {
    if (eq(array2[length2][0], key)) {
      return length2;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
var Map$1$1 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length2) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
memoizeCapped(function(string2) {
  var result = [];
  if (string2.charCodeAt(0) === 46) {
    result.push("");
  }
  string2.replace(rePropName, function(match2, number2, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match2);
  });
  return result;
});
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0;
symbolProto ? symbolProto.toString : void 0;
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
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
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
  for (var s2 = 1; s2 < arguments.length; s2++) {
    from = Object(arguments[s2]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
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
var f = React__default, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (l2 = a2.ref);
  for (b2 in a2)
    n.call(a2, b2) && !p.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: g, type: c2, key: e2, ref: l2, props: d2, _owner: m.current };
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
    setTimeout((_2) => removeStatus(status.id), 1500);
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
const TerminalContext = React__default.createContext();
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
  function handleSubmit(e2) {
    e2.preventDefault();
    e2.stopPropagation();
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
      onChange: (e2) => setInputMessage(e2.target.value),
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
  useEffect((_2) => {
    let timer = setInterval((_22) => setFrame((frame2) => frame2 >= frames.length - 1 ? 0 : frame2 + 1), 80);
    return (_22) => clearInterval(timer);
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
        scrollAreaViewport.current = Array.from(scrollArea.current.children).find((e2) => e2.hasAttribute("data-radix-scroll-area-viewport"));
      }
      scrollAreaViewport.current.scrollTop = scrollAreaViewport.current.scrollHeight;
    }
  }
  useEffect((_2) => {
    if (autoscroll) {
      setTimeout((_22) => {
        scrollToBottom();
        setAutoscroll(true);
      }, 50);
    }
  }, [autoscroll, data, setAutoscroll]);
  useEffect((_2) => {
    if (!terminal)
      return;
    let listener = (data2) => appendData(data2);
    terminal.onMessageReceived(listener);
    return (_22) => terminal.offMessageReceived(listener);
  }, [appendData, terminal]);
  function handleScroll2(e2) {
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
        onScroll: handleScroll2,
        children: data == null ? void 0 : data.map((dataItem, i2) => /* @__PURE__ */ jsx(TerminalLine, {
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
const generateUniqueID = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  };
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};
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
class TerminalClientPlugin extends ClientPlugin$1 {
  constructor(data) {
    super(data);
    Singleton.shared.addEventListener("updatedDevices", this.provision);
  }
  deviceComponents(device) {
    return {
      page: {
        plugin: TerminalPage
      }
    };
  }
  provision() {
    const devices = Singleton.shared.devices;
    devices.forEach((device) => {
      if (device.terminal) {
        console.warn("Trying setting terminal on device but device.terminal already exists");
      } else {
        device.terminal = new ClientTerminal(device);
        console.log("Added terminal plugin to device", device.name);
      }
    });
    return (_2) => {
      devices.forEach((device) => {
        if (typeof device.terminal == ClientTerminal) {
          delete device.terminal;
        }
      });
    };
  }
}
export { MarlinTerminalSettingsWidget, MarlinTerminalWidget, TerminalProvider, TerminalClientPlugin as default, useTerminalContext };
