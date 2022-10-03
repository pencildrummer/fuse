var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
import { ReloadIcon, ThickArrowUpIcon, ThickArrowLeftIcon, ThickArrowRightIcon, ThickArrowDownIcon, HomeIcon, Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Widget, Slider, Button, ToggleGroup, Separator, Group } from "@fuse-labs/core-ui";
import require$$0, { useState } from "react";
import { useDeviceContext } from "@fuse-labs/core-client";
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
function FeedRateWidget() {
  return /* @__PURE__ */ jsx(Widget, {
    title: "Movement",
    version: "0.1",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-stretch space-y-1",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-row items-center justify-between text-sm",
        children: [/* @__PURE__ */ jsx("span", {
          className: "font-medium",
          children: "Feedrate"
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
          className: "flex-1"
        }), /* @__PURE__ */ jsx(Button, {
          squared: true,
          children: /* @__PURE__ */ jsx(ReloadIcon, {})
        })]
      })]
    })
  });
}
function MoveButton(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(Button, __spreadProps(__spreadValues({
    squared: true
  }, props), {
    children: props.children
  }));
}
function MoveWidget() {
  const {
    device
  } = useDeviceContext();
  const [disabled, setDisabled] = useState(true);
  const [distanceInc, setDistanceInc] = useState("1");
  function handleConnect() {
    device.terminal.connect((connected) => {
      console.log("Connected", connected);
      setDisabled(!connected);
    });
  }
  function handleMove(direction) {
    if (isNaN(distanceInc)) {
      return console.error("Distance is not a number", distanceInc);
    }
    distanceInc.toString().replace(",", ".");
    device.terminal.sendMessage("G91");
    let messageParts = ["G0"];
    switch (direction) {
      case "incX":
        messageParts.push(`X${distanceInc}`);
        break;
      case "decX":
        messageParts.push(`X-${distanceInc}`);
        break;
      case "incY":
        messageParts.push(`Y${distanceInc}`);
        break;
      case "decY":
        messageParts.push(`Y-${distanceInc}`);
        break;
      case "incZ":
        messageParts.push(`Z${distanceInc}`);
        break;
      case "decZ":
        messageParts.push(`Z-${distanceInc}`);
        break;
      default:
        return console.error("Unsupported direction:", direction);
    }
    let message = messageParts.join(" ");
    device.terminal.sendMessage(message);
  }
  function handleHome(axis) {
    let message = "G28 R10";
    switch (axis) {
      case "x":
        message += " X";
        break;
      case "y":
        message += " Y";
        break;
      case "z":
        message += " Z";
        break;
    }
    device.terminal.sendMessage(message);
  }
  return /* @__PURE__ */ jsxs(Widget, {
    title: "Manual position",
    version: "0.1",
    children: [/* @__PURE__ */ jsxs("div", {
      children: ["To be removed, just to test device connection and move", /* @__PURE__ */ jsx(Button, {
        onClick: handleConnect,
        children: "Connect"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row space-x-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-3 grid-rows-3 gap-2",
        children: [/* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            onClick: (_) => handleMove("decY"),
            disabled,
            children: /* @__PURE__ */ jsx(ThickArrowUpIcon, {})
          })
        }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            onClick: (_) => handleMove("decX"),
            disabled,
            children: /* @__PURE__ */ jsx(ThickArrowLeftIcon, {})
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative w-full h-full text-[10px] font-mono",
            children: [/* @__PURE__ */ jsx("span", {
              className: "absolute top-1/2 left-1/2 translate-x-[-8px] translate-y-[-12px]",
              children: "X"
            }), /* @__PURE__ */ jsx("span", {
              className: "absolute top-1/2 left-1/2 translate-x-[-1px] translate-y-[-8px]",
              children: "/"
            }), /* @__PURE__ */ jsx("span", {
              className: "absolute top-1/2 left-1/2 translate-x-[5px] translate-y-[-3px]",
              children: "Y"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            onClick: (_) => handleMove("incX"),
            disabled,
            children: /* @__PURE__ */ jsx(ThickArrowRightIcon, {})
          })
        }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            onClick: (_) => handleMove("incY"),
            disabled,
            children: /* @__PURE__ */ jsx(ThickArrowDownIcon, {})
          })
        }), /* @__PURE__ */ jsx("div", {})]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 grid-rows-3 gap-2",
        children: [/* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            disabled,
            onClick: (_) => handleMove("incZ"),
            children: /* @__PURE__ */ jsx(ThickArrowUpIcon, {})
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("div", {
            className: "relative w-full h-full text-[10px] font-mono",
            children: /* @__PURE__ */ jsx("span", {
              className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              children: "Z"
            })
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MoveButton, {
            disabled,
            onClick: (_) => handleMove("decZ"),
            children: /* @__PURE__ */ jsx(ThickArrowDownIcon, {})
          })
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs(ToggleGroup, {
        type: "single",
        value: distanceInc,
        onValueChange: (v) => setDistanceInc(v),
        children: [/* @__PURE__ */ jsx(ToggleGroup.Item, {
          value: "0.1",
          children: "0.1"
        }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
          value: "1",
          children: "1"
        }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
          value: "10",
          children: "10"
        }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
          value: "100",
          children: "100"
        })]
      })
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsxs(Button, {
        onClick: (_) => handleHome("x"),
        disabled,
        children: [/* @__PURE__ */ jsx(HomeIcon, {
          className: "mr-1"
        }), "X"]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: (_) => handleHome("y"),
        disabled,
        children: [/* @__PURE__ */ jsx(HomeIcon, {
          className: "mr-1"
        }), "Y"]
      }), /* @__PURE__ */ jsxs(Button, {
        onClick: (_) => handleHome("z"),
        disabled,
        children: [/* @__PURE__ */ jsx(HomeIcon, {
          className: "mr-1"
        }), "Z"]
      })]
    }), /* @__PURE__ */ jsx(Button, {
      onClick: (_) => handleHome(),
      disabled,
      children: /* @__PURE__ */ jsx(HomeIcon, {})
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Button, {
      className: "w-full",
      onClick: (_) => device.terminal.sendMessage("M410"),
      children: [/* @__PURE__ */ jsx(Cross2Icon, {
        className: "mr-1"
      }), " Quick stop"]
    }), /* @__PURE__ */ jsxs(Button, {
      className: "w-full",
      onClick: (_) => device.terminal.sendMessage("M112"),
      children: [/* @__PURE__ */ jsx(ExclamationTriangleIcon, {
        className: "mr-1"
      }), " Emergency stop"]
    })]
  });
}
export { FeedRateWidget, MoveWidget };
