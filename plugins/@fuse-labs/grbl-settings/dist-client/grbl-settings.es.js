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
import { useIntl } from "react-intl";
import require$$0 from "react";
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
