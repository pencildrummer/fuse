var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
import { Group, Label, Switch, Input } from "@fuse-labs/core-ui";
import * as React from "react";
import React__default from "react";
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
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
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
var b = typeof Symbol === "function" && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f$1 = b ? Symbol.for("react.strict_mode") : 60108, g$1 = b ? Symbol.for("react.profiler") : 60114, h$1 = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m$1 = b ? Symbol.for("react.concurrent_mode") : 60111, n$1 = b ? Symbol.for("react.forward_ref") : 60112, p$1 = b ? Symbol.for("react.suspense") : 60113, q$1 = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if (typeof a === "object" && a !== null) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m$1:
          case e:
          case g$1:
          case f$1:
          case p$1:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n$1:
              case t:
              case r:
              case h$1:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m$1;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m$1;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h$1;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n$1;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g$1;
reactIs_production_min.StrictMode = f$1;
reactIs_production_min.Suspense = p$1;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h$1;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n$1;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g$1;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f$1;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p$1;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === e || a === m$1 || a === g$1 || a === f$1 || a === p$1 || a === q$1 || typeof a === "object" && a !== null && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h$1 || a.$$typeof === k || a.$$typeof === n$1 || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
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
function invariant(condition, message, Err) {
  if (Err === void 0) {
    Err = Error;
  }
  if (!condition) {
    throw new Err(message);
  }
}
var defaultErrorHandler = function(error) {
};
var DEFAULT_INTL_CONFIG = {
  formats: {},
  messages: {},
  timeZone: void 0,
  defaultLocale: "en",
  defaultFormats: {},
  fallbackOnEmptyString: true,
  onError: defaultErrorHandler
};
function invariantIntlContext(intl) {
  invariant(intl, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
__assign(__assign({}, DEFAULT_INTL_CONFIG), { textComponent: React.Fragment });
var IntlContext = React.createContext(null);
IntlContext.Consumer;
IntlContext.Provider;
var Context = IntlContext;
function useIntl() {
  var intl = React.useContext(Context);
  invariantIntlContext(intl);
  return intl;
}
const GRBLSettingId = Object.freeze({
  STEP_PULSE: 0,
  STEP_DELAY: 1,
  STEP_PORT_INVERT: 2,
  DIRECTION_PORT_INVERT: 3,
  STEP_ENABLE_INVERT: 4,
  LIMIT_PINS_INVERT: 5,
  PROBE_PIN_INVERT: 6,
  STATUS_REPORT: 10,
  JUNCTION_DEVIATION: 11,
  ARC_TOLERANCE: 12,
  REPORT_INCHES: 13,
  SOFT_LIMITS: 20,
  HARD_LIMITS: 21,
  HOMING_CYCLE: 22,
  HOMING_DIR_INVERT: 23,
  HOMING_FEED: 24,
  HOMING_SEEK: 25,
  HOMING_DEBOUNCE: 26,
  HOMING_PULL_OFF: 27,
  MAX_SPINDLE_SPEED: 30,
  MIN_SPINDLE_SPEED: 31,
  LASER_MODE: 32,
  X_STEPS_ON_MM: 100,
  Y_STEPS_ON_MM: 101,
  Z_STEPS_ON_MM: 102,
  X_MAX_RATE: 110,
  Y_MAX_RATE: 111,
  Z_MAX_RATE: 112,
  X_ACCELERATION: 120,
  Y_ACCELERATION: 121,
  Z_ACCELERATION: 122,
  X_MAX_TRAVEL: 130,
  Y_MAX_TRAVEL: 131,
  Z_MAX_TRAVEL: 132
});
const GRBLSettingKey = Object.freeze({
  STEP_PULSE: "grbl.setting.step_pulse",
  STEP_DELAY: "grbl.setting.step_delay",
  STEP_PORT_INVERT: "grbl.setting.step_port_invert",
  DIRECTION_PORT_INVERT: "grbl.setting.direction_port_invert",
  STEP_ENABLE_INVERT: "grbl.setting.step_enable_invert",
  LIMIT_PINS_INVERT: "grbl.setting.limit_pins_invert",
  PROBE_PIN_INVERT: "grbl.setting.probe_pin_invert",
  STATUS_REPORT: "grbl.setting.status_report",
  JUNCTION_DEVIATION: "grbl.setting.junction_deviation",
  ARC_TOLERANCE: "grbl.setting.arc_tolerance",
  REPORT_INCHES: "grbl.setting.report_inches",
  SOFT_LIMITS: "grbl.setting.soft_limits",
  HARD_LIMITS: "grbl.setting.hard_limits",
  HOMING_CYCLE: "grbl.setting.homing_cycle",
  HOMING_DIR_INVERT: "grbl.setting.homing_dir_invert",
  HOMING_FEED: "grbl.setting.homing_feed",
  HOMING_SEEK: "grbl.setting.homing_seek",
  HOMING_DEBOUNCE: "grbl.setting.homing_debounce",
  HOMING_PULL_OFF: "grbl.setting.homing_pull_off",
  MAX_SPINDLE_SPEED: "grbl.setting.max_spindle_speed",
  MIN_SPINDLE_SPEED: "grbl.setting.min_spindle_speed",
  LASER_MODE: "grbl.setting.laser_mode",
  X_STEPS_ON_MM: "grbl.setting.x_steps_on_mm",
  Y_STEPS_ON_MM: "grbl.setting.y_steps_on_mm",
  Z_STEPS_ON_MM: "grbl.setting.z_steps_on_mm",
  X_MAX_RATE: "grbl.setting.x_max_rate",
  Y_MAX_RATE: "grbl.setting.y_max_rate",
  Z_MAX_RATE: "grbl.setting.z_max_rate",
  X_ACCELERATION: "grbl.setting.x_acceleration",
  Y_ACCELERATION: "grbl.setting.y_acceleration",
  Z_ACCELERATION: "grbl.setting.z_acceleration",
  X_MAX_TRAVEL: "grbl.setting.x_max_travel",
  Y_MAX_TRAVEL: "grbl.setting.y_max_travel",
  Z_MAX_TRAVEL: "grbl.setting.z_max_travel"
});
function getSettingFieldType(settingId) {
  switch (parseInt(settingId)) {
    case GRBLSettingId.STEP_ENABLE_INVERT:
    case GRBLSettingId.LIMIT_PINS_INVERT:
    case GRBLSettingId.PROBE_PIN_INVERT:
    case GRBLSettingId.REPORT_INCHES:
    case GRBLSettingId.SOFT_LIMITS:
    case GRBLSettingId.HARD_LIMITS:
    case GRBLSettingId.HOMING_CYCLE:
    case GRBLSettingId.LASER_MODE:
      return Boolean;
    default:
      return Number;
  }
}
function getSettingFieldUnit(settingId) {
  switch (parseInt(settingId)) {
    case GRBLSettingId.STEP_PULSE:
      return "\u03BCs";
    case GRBLSettingId.STEP_DELAY:
      return "ms";
    case GRBLSettingId.JUNCTION_DEVIATION:
      return "mm";
    case GRBLSettingId.ARC_TOLERANCE:
      return "mm";
    case GRBLSettingId.HOMING_FEED:
      return "mm/min";
    case GRBLSettingId.HOMING_SEEK:
      return "mm/min";
    case GRBLSettingId.HOMING_DEBOUNCE:
      return "ms";
    case GRBLSettingId.HOMING_PULL_OFF:
      return "mm";
    case GRBLSettingId.MAX_SPINDLE_SPEED:
      return "RPM";
    case GRBLSettingId.MIN_SPINDLE_SPEED:
      return "RPM";
    case GRBLSettingId.X_STEPS_ON_MM:
      return "steps/mm";
    case GRBLSettingId.Y_STEPS_ON_MM:
      return "steps/mm";
    case GRBLSettingId.Z_STEPS_ON_MM:
      return "steps/mm";
    case GRBLSettingId.X_MAX_RATE:
      return "mm/min";
    case GRBLSettingId.Y_MAX_RATE:
      return "mm/min";
    case GRBLSettingId.Z_MAX_RATE:
      return "mm/min";
    case GRBLSettingId.X_ACCELERATION:
      return "mm/s^2";
    case GRBLSettingId.Y_ACCELERATION:
      return "mm/s^2";
    case GRBLSettingId.Z_ACCELERATION:
      return "mm/s^2";
    case GRBLSettingId.X_MAX_TRAVEL:
      return "mm";
    case GRBLSettingId.Y_MAX_TRAVEL:
      return "mm";
    case GRBLSettingId.Z_MAX_TRAVEL:
      return "mm";
    default:
      return null;
  }
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
var f = React__default, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c2, a, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a.key !== void 0 && (e2 = "" + a.key);
  a.ref !== void 0 && (l2 = a.ref);
  for (b2 in a)
    n.call(a, b2) && !p.hasOwnProperty(b2) && (d2[b2] = a[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a = c2.defaultProps, a)
      d2[b2] === void 0 && (d2[b2] = a[b2]);
  return { $$typeof: g, type: c2, key: e2, ref: l2, props: d2, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
function SettingField(_a) {
  var _b = _a, {
    fieldKey,
    disabled
  } = _b, props = __objRest(_b, [
    "fieldKey",
    "disabled"
  ]);
  const {
    formatMessage
  } = useIntl();
  const fieldType = getSettingFieldType(GRBLSettingId[fieldKey]);
  return /* @__PURE__ */ jsxs(Group, {
    children: [/* @__PURE__ */ jsxs(Label, {
      htmlFor: fieldKey,
      className: "truncate flex flex-row space-x-1 items-center",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex-none w-8 text-xs text-gray-600 text-right",
        children: ["$", GRBLSettingId[fieldKey]]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-sm truncate",
        children: formatMessage({
          id: GRBLSettingKey[fieldKey],
          defaultMessage: GRBLSettingKey[fieldKey]
        })
      })]
    }), fieldType == Boolean && /* @__PURE__ */ jsx(Switch, {
      id: fieldKey,
      name: fieldKey,
      disabled
    }), fieldType == Number && /* @__PURE__ */ jsx(Input, {
      type: "number",
      id: fieldKey,
      name: fieldKey,
      disabled,
      className: "w-36",
      detailContent: getSettingFieldUnit(GRBLSettingId[fieldKey])
    })]
  }, `setting-${GRBLSettingKey[fieldKey]}`);
}
export { SettingField };
