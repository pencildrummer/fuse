import { ChevronLeftIcon, ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Widget, Label, SelectRaw, Separator, Button, Slider } from "@fuse-labs/core-ui";
import require$$0, { useState, useEffect } from "react";
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
function ExtruderWidget() {
  const [motor, setMotor] = useState();
  const [disabled, setDisabled] = useState();
  useEffect((_) => setDisabled(!motor), [motor]);
  return /* @__PURE__ */ jsxs(Widget, {
    title: "Extruder",
    version: "0.1",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col space-y-1",
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "e-motor",
        children: "Motor"
      }), /* @__PURE__ */ jsx(SelectRaw, {
        id: "e-motor",
        options: [{
          value: "all",
          label: "All motors"
        }, {
          value: "e1",
          label: "Extruder 1"
        }, {
          value: "e2",
          label: "Extruder 2"
        }],
        onChange: (v) => setMotor(v)
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row space-x-2",
      children: [/* @__PURE__ */ jsxs(Button, {
        disabled,
        children: [/* @__PURE__ */ jsx(ChevronLeftIcon, {}), /* @__PURE__ */ jsx("span", {
          children: "Retract"
        })]
      }), /* @__PURE__ */ jsxs(Button, {
        disabled,
        children: [/* @__PURE__ */ jsx("span", {
          children: "Extrude"
        }), /* @__PURE__ */ jsx(ChevronRightIcon, {})]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-stretch space-y-1",
      children: [/* @__PURE__ */ jsxs("div", {
        className: classNames("flex flex-row items-center justify-between text-sm", {
          "opacity-30": disabled
        }),
        children: [/* @__PURE__ */ jsx("span", {
          className: "font-medium",
          children: "Flow rate"
        }), /* @__PURE__ */ jsx("span", {
          className: "font-mono text-xs",
          children: "100%"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-row space-x-2",
        children: [/* @__PURE__ */ jsx(Slider, {
          defaultValue: [50],
          max: 100,
          step: 0.1,
          className: "flex-1",
          disabled
        }), /* @__PURE__ */ jsx(Button, {
          squared: true,
          disabled,
          children: /* @__PURE__ */ jsx(ReloadIcon, {})
        })]
      })]
    })]
  });
}
export { ExtruderWidget };
