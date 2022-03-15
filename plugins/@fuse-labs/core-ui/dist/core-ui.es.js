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
import * as React from "react";
import React__default, { useRef, useState, useEffect, useMemo as useMemo$1, useContext } from "react";
import classNames from "classnames";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useField, Formik, Form as Form$1, useFormikContext, FieldArray, Field } from "formik";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as icons from "@radix-ui/react-icons";
import { Cross2Icon, ChevronDownIcon, CheckIcon, ChevronRightIcon, InfoCircledIcon, PlusIcon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon, CaretRightIcon, StarIcon, CameraIcon, LinkBreak1Icon, LinkNone1Icon, Link1Icon, QuestionMarkCircledIcon, GearIcon, LightningBoltIcon, CaretDownIcon, LinkBreak2Icon, Pencil1Icon, DotsHorizontalIcon, CheckCircledIcon, ExclamationTriangleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Label as Label$1 } from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { pathCase, titleCase, getSuggestedName, getProductInfo, generateUniqueID } from "@fuse-labs/shared-utils";
import * as Yup from "yup";
import { coreSocket, useAppContext, useSerialPorts, DeviceProvider, ClientDeviceType, useDeviceContext } from "@fuse-labs/core-client";
import Link from "next/link";
import * as Toolbar from "@radix-ui/react-toolbar";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
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
      if (hasOwnProperty$4.call(from, key)) {
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
function BlockingView(props) {
  return /* @__PURE__ */ jsx("div", {
    className: "w-full h-full flex items-center justify-center",
    children: props.children
  });
}
function WidgetTitle(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx("div", {
    className: classNames("flex flex-row items-center", "dark:text-gray-500", "border-b dark:border-gray-800", "text-xxs uppercase", "font-syncopate leading-none", "pb-1.5"),
    children: props.children
  });
}
function WidgetVersion(_b) {
  var props = __objRest(_b, []);
  return /* @__PURE__ */ jsx("div", {
    className: "relative !mt-auto pt-2 h-0 flex items-center justify-end",
    children: /* @__PURE__ */ jsxs("span", {
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
  } = _d, props = __objRest(_d, [
    "title",
    "version",
    "full",
    "className"
  ]);
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    ref
  }, props), {
    className: classNames("relative", "flex flex-col items-stretch justify-start", {
      "p-3": !full
    }, "space-y-3", "rounded-md", "overflow-hidden", "text-sm", "text-gray-900 dark:text-gray-200", "bg-gray-300 dark:bg-gray-900", className),
    children: [title && /* @__PURE__ */ jsx(WidgetTitle, {
      children: title
    }), props.children, version && /* @__PURE__ */ jsx(WidgetVersion, {
      children: version
    })]
  }));
});
Widget.displayName = "Widget";
const ToggleGroup = (_e) => {
  var _f = _e, {
    type = "single"
  } = _f, props = __objRest(_f, [
    "type"
  ]);
  return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Root, __spreadProps(__spreadValues({
    type
  }, props), {
    className: classNames("flex flex-row justify-evenly", "dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-100", "rounded-md overflow-hidden", "text-xs font-mono", props.className)
  }));
};
const Item$1 = (props) => {
  return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Item, __spreadProps(__spreadValues({}, props), {
    className: classNames("p-1.5", "flex-initial", "w-full text-center", "hover:bg-white hover:bg-opacity-5 transition-colors duration-150", "radix-state-on:bg-blue-700", props.className)
  }));
};
ToggleGroup.Item = Item$1;
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
  } = _h, props = __objRest(_h, [
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
  return /* @__PURE__ */ jsx(ButtonComponent, __spreadValues({
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
function Slider(_i) {
  var _j = _i, {
    className
  } = _j, props = __objRest(_j, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs(SliderPrimitive.Root, __spreadProps(__spreadValues({}, props), {
    className: classNames("relative flex items-center", "disabled:select-none disabled:touch-none", "disabled:opacity-30 radix-disabled:opacity-30", className),
    children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
      className: "relative w-full h-[4px] rounded-md bg-gray-500 dark:bg-gray-700",
      children: /* @__PURE__ */ jsx(SliderPrimitive.Range, {
        className: "absolute bg-gray-100 dark:bg-gray-400 rounded-full h-full"
      })
    }), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, {
      className: "block w-4 h-4 rounded-full shadow-sm bg-gray-50 dark:bg-gray-300"
    })]
  }));
}
function Switch(props) {
  const [field, meta, helpers] = useField(props.name);
  const {
    value,
    initialValue,
    error,
    touched
  } = meta;
  const {
    setValue,
    setTouched
  } = helpers;
  function handleChange(value2) {
    setValue(value2);
    setTouched(true);
  }
  return /* @__PURE__ */ jsx(SwitchRaw, __spreadProps(__spreadValues(__spreadValues({}, field), props), {
    checked: Boolean(value),
    onCheckedChange: handleChange,
    error: field.name && error && touched,
    dirty: touched && !error && value != initialValue
  }));
}
function SwitchRaw(_k) {
  var _l = _k, {
    error,
    dirty
  } = _l, props = __objRest(_l, [
    "error",
    "dirty"
  ]);
  return /* @__PURE__ */ jsx(SwitchPrimitive.Root, __spreadProps(__spreadValues({
    className: classNames("w-8 h-4 rounded-full bg-current", "transition-colors duration-150", "ring-2", {
      "ring-current": !dirty && !error,
      "ring-offset-2 ring-offset-current ring-red-500": error,
      "ring-offset-2 ring-offset-current ring-yellow-500": dirty && !error
    }, "radix-state-unchecked:text-gray-50 dark:radix-state-unchecked:text-gray-700", "radix-state-checked:text-blue-600", "disabled:opacity-30")
  }, props), {
    children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, {
      className: classNames("block w-4 h-4 rounded-full shadow-sm bg-gray-50 dark:bg-gray-300", "radix-state-checked:ring-1 radix-state-checked:ring-blue-700", "transition-transform duration-150", "radix-state-checked:translate-x-4")
    })
  }));
}
function Dialog(_m) {
  var _n = _m, {
    children,
    content
  } = _n, props = __objRest(_n, [
    "children",
    "content"
  ]);
  return /* @__PURE__ */ jsxs(DialogRoot, __spreadProps(__spreadValues({}, props), {
    children: [/* @__PURE__ */ jsx(DialogTrigger, {
      asChild: true,
      children
    }), /* @__PURE__ */ jsx(DialogContent, {
      className: props.className,
      children: content
    })]
  }));
}
function DialogRoot(props) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, __spreadValues({}, props));
}
function DialogTrigger(props) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, __spreadValues({}, props));
}
function DialogContent(_o) {
  var _p = _o, {
    title,
    description,
    className,
    showClose = false
  } = _p, props = __objRest(_p, [
    "title",
    "description",
    "className",
    "showClose"
  ]);
  return /* @__PURE__ */ jsxs(DialogPrimitive.Portal, {
    children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
      className: "fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
    }), /* @__PURE__ */ jsx(DialogPrimitive.Content, {
      className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
      children: /* @__PURE__ */ jsxs(Widget, {
        className: classNames("w-[90vw] max-h-[85vh]", className),
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: [title && /* @__PURE__ */ jsx(DialogPrimitive.Title, {
            children: title
          }), showClose && /* @__PURE__ */ jsx(DialogPrimitive.Close, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Button, {
              squared: true,
              rounded: true,
              className: "ml-auto",
              children: /* @__PURE__ */ jsx(Cross2Icon, {})
            })
          })]
        }),
        children: [description && /* @__PURE__ */ jsx(DialogPrimitive.Description, {
          children: description
        }), props.children]
      })
    })]
  });
}
Dialog.Root = DialogRoot;
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
function Group(_q) {
  var _r = _q, {
    orientation = "horizontal",
    className
  } = _r, props = __objRest(_r, [
    "orientation",
    "className"
  ]);
  return /* @__PURE__ */ jsx("div", __spreadValues({
    className: classNames("flex", {
      "flex-row space-x-2 items-center justify-between": orientation == "horizontal",
      "flex-col space-y-2": orientation == "vertical"
    }, className)
  }, props));
}
function ConfirmDialog(_s) {
  var _t = _s, {
    children,
    content,
    open,
    onOpenChange
  } = _t, props = __objRest(_t, [
    "children",
    "content",
    "open",
    "onOpenChange"
  ]);
  return /* @__PURE__ */ jsxs(ConfirmDialogRoot, {
    open,
    onOpenChange,
    children: [/* @__PURE__ */ jsx(ConfirmDialogTrigger, {
      children
    }), /* @__PURE__ */ jsx(ConfirmDialogContent, __spreadProps(__spreadValues({}, props), {
      children: content
    }))]
  });
}
function ConfirmDialogRoot(props) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Root, __spreadValues({}, props));
}
function ConfirmDialogTrigger(props) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, __spreadValues({}, props));
}
function ConfirmDialogContent(_u) {
  var _v = _u, {
    title,
    description,
    confirmText = "Confirm",
    onConfirm,
    className
  } = _v, props = __objRest(_v, [
    "title",
    "description",
    "confirmText",
    "onConfirm",
    "className"
  ]);
  return /* @__PURE__ */ jsxs(AlertDialogPrimitive.Portal, {
    children: [/* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
      className: "fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
    }), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
      className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      children: /* @__PURE__ */ jsxs(Widget, {
        className: classNames("w-[50vw] max-h-[85vh]", className),
        title,
        children: [description && /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
          children: description
        }), props.children, /* @__PURE__ */ jsxs(Group, {
          className: "pt-3 !justify-end",
          children: [/* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
            asChild: true,
            children: /* @__PURE__ */ jsx(Button, {
              children: "Cancel"
            })
          }), /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
            children: /* @__PURE__ */ jsx(Button, {
              onClick: onConfirm,
              children: confirmText
            })
          })]
        })]
      })
    })]
  });
}
ConfirmDialog.Root = ConfirmDialogRoot;
ConfirmDialog.Trigger = ConfirmDialogTrigger;
ConfirmDialog.Content = ConfirmDialogContent;
function Form(_w) {
  var _x = _w, {
    children
  } = _x, props = __objRest(_x, [
    "children"
  ]);
  return /* @__PURE__ */ jsx(Formik, __spreadProps(__spreadValues({}, props), {
    children: (formikProps) => /* @__PURE__ */ jsx(Form$1, {
      className: props.className,
      children: typeof children === "function" ? children(formikProps) : children
    })
  }));
}
function Label(_y) {
  var _z = _y, {
    className
  } = _z, props = __objRest(_z, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(LabelPrimitive.Root, __spreadValues({
    className: classNames("font-semibold", "select-none cursor-default", "text-gray-800 dark:text-gray-300", className)
  }, props));
}
function DisplayLabel(props) {
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({}, props), {
    className: classNames("font-semibold", "select-none cursor-default", "text-gray-800 dark:text-gray-400", "truncate", props.className)
  }));
}
function DisplayValue(props) {
  return /* @__PURE__ */ jsxs("div", {
    className: classNames("font-bold", "font-semibold", "cursor-default", "text-gray-200"),
    children: [props.value, props.children]
  });
}
function DisplayGroup(_A) {
  var _B = _A, {
    label,
    value
  } = _B, props = __objRest(_B, [
    "label",
    "value"
  ]);
  return /* @__PURE__ */ jsxs(Group, __spreadProps(__spreadValues({}, props), {
    children: [/* @__PURE__ */ jsx(DisplayLabel, {
      children: label
    }), /* @__PURE__ */ jsx(DisplayValue, {
      children: value
    })]
  }));
}
const Separator = React__default.forwardRef((_C, ref) => {
  var props = __objRest(_C, []);
  return /* @__PURE__ */ jsx(SeparatorPrimitive.Root, __spreadProps(__spreadValues({
    ref
  }, props), {
    asChild: true,
    children: /* @__PURE__ */ jsx("div", {
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
function SelectOption(props) {
  return /* @__PURE__ */ jsxs(DropdownMenuPrimitive.Item, __spreadProps(__spreadValues({
    className: classNames("flex flex-row space-x-2 items-center", "text-sm font-medium", "py-0.5 px-1.5", "w-full", "rounded-sm", "transition-colors duration-75", "focus:outline-none border-0", "cursor-default", "text-gray-800 dark:text-gray-300", "focus:text-gray-50 focus:bg-blue-600")
  }, props), {
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex-1",
      children: props.children
    }), props.selected && /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(CheckIcon, {
        className: "text-gray-800 bg-blue-600 rounded-full"
      })
    })]
  }));
}
function SelectRaw(_D) {
  var _E = _D, {
    trigger: TriggerComponent,
    error,
    options,
    className,
    defaultValue,
    onChange,
    onBlur,
    onOpenChange
  } = _E, props = __objRest(_E, [
    "trigger",
    "error",
    "options",
    "className",
    "defaultValue",
    "onChange",
    "onBlur",
    "onOpenChange"
  ]);
  const triggerContainerEl = useRef();
  const [selectedOption, setSelectedOption] = useState((_) => {
    if (!defaultValue)
      return void 0;
    return getOptionForValue(defaultValue);
  });
  const [contentWidth, setContentWidth] = useState();
  useEffect((_) => {
    if (selectedOption)
      return;
    setSelectedOption(getOptionForValue(defaultValue));
  }, [defaultValue]);
  function getOptionForValue(value) {
    return options == null ? void 0 : options.find((o) => typeof o == "object" ? o.value == value : o === value);
  }
  useEffect((_) => {
    let size = triggerContainerEl.current.getBoundingClientRect();
    setContentWidth(size.width);
  }, [triggerContainerEl.current]);
  useEffect((_) => {
    if (typeof selectedOption == "object")
      onChange == null ? void 0 : onChange(selectedOption == null ? void 0 : selectedOption.value);
    else
      onChange == null ? void 0 : onChange(selectedOption);
  }, [selectedOption]);
  let selectedOptionDisplayText = useMemo$1((_) => {
    if (!selectedOption)
      return "No option selected";
    return selectedOption.label || selectedOption.value || selectedOption;
  }, [selectedOption]);
  function isSelected(option) {
    return typeof option === "object" ? (selectedOption == null ? void 0 : selectedOption.value) === option.value : selectedOption === option;
  }
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs(DropdownMenuPrimitive.Root, {
      onOpenChange,
      children: [/* @__PURE__ */ jsx("div", {
        ref: triggerContainerEl,
        className: classNames("flex flex-row items-center space-x-2", className),
        children: TriggerComponent || props.children ? /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
          asChild: true,
          disabled: props.disabled,
          children: TriggerComponent ? /* @__PURE__ */ jsx(TriggerComponent, {}) : props.children
        }) : /* @__PURE__ */ jsxs(DropdownMenuPrimitive.Trigger, {
          disabled: props.disabled,
          onBlur,
          className: classNames("w-full min-w-[180px]", "flex flex-row items-center justify-between space-x-2", "text-xs", "px-1.5 h-[26px]", "leading-none", "rounded-md", "select-none touch-none", "font-mono font-medium", "bg-gray-900 border border-gray-600 text-gray-300", "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600", "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800", {
            "border-red-600 ring-1 ring-red-600": error
          }),
          children: [/* @__PURE__ */ jsx("span", {
            className: "whitespace-nowrap truncate",
            children: selectedOptionDisplayText
          }), /* @__PURE__ */ jsx(ChevronDownIcon, {})]
        })
      }), /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
        className: classNames("w-full", "flex flex-col items-start", "bg-gray-300 dark:bg-gray-800", "shadow-md", "p-1", "rounded-md"),
        style: {
          width: contentWidth || "auto"
        },
        align: "end",
        sideOffset: 6,
        children: options == null ? void 0 : options.map((option, i) => /* @__PURE__ */ jsx(SelectOption, {
          value: option.value || option,
          selected: isSelected(option),
          onClick: (_) => setSelectedOption(option),
          children: option.label || option.value || option
        }, `option-${i}`))
      })]
    })
  });
}
function Select(props) {
  const [field, meta, helpers] = useField(props.name);
  const {
    initialValue
  } = meta;
  const {
    setValue,
    setTouched
  } = helpers;
  return /* @__PURE__ */ jsx(SelectRaw, __spreadValues({
    error: meta.touched && meta.error,
    defaultValue: initialValue,
    onChange: setValue,
    onOpenChange: (open) => open && setTouched(true),
    onBlur: (_) => field.onBlur(field.name)
  }, props));
}
function Input(props) {
  const [field, meta, helpers] = useField(props);
  return /* @__PURE__ */ jsx(InputRaw, __spreadProps(__spreadValues(__spreadValues({}, field), props), {
    error: field.name && meta.error && meta.touched,
    dirty: meta.touched && !meta.error && meta.value != meta.initialValue
  }));
}
function InputRaw(_F) {
  var _G = _F, {
    error,
    dirty,
    detailContent
  } = _G, props = __objRest(_G, [
    "error",
    "dirty",
    "detailContent"
  ]);
  if (props.type == "hidden") {
    return /* @__PURE__ */ jsx("input", __spreadProps(__spreadValues({}, props), {
      hidden: true
    }));
  }
  return /* @__PURE__ */ jsxs("div", {
    className: classNames("flex flex-row items-center", "rounded-md overflow-hidden flex-shrink-0", "h-[26px]", "font-mono font-medium", "bg-gray-900 border border-gray-600 text-gray-300", "focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600", {
      "border-red-600 ring-1 ring-red-600": error,
      "border-yellow-500 ring-1 ring-yellow-500": !error && dirty
    }, props.className),
    children: [/* @__PURE__ */ jsx("input", __spreadProps(__spreadValues({}, props), {
      className: classNames("text-xs px-1.5", "h-full min-w-0 w-full", "ring-0 outline-none", "bg-gray-900 text-gray-300", "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800", "transition-colors duration-150"),
      style: {
        textAlign: "inherit"
      }
    })), detailContent && /* @__PURE__ */ jsx(Label$1, {
      htmlFor: props.id,
      className: "flex-none select-none cursor-default text-xs bg-white/10 border-l border-gray-600 self-stretch flex items-center px-1",
      children: detailContent
    })]
  });
}
function CheckboxRaw(_H) {
  var _I = _H, {
    error
  } = _I, props = __objRest(_I, [
    "error"
  ]);
  return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, __spreadProps(__spreadValues({}, props), {
    className: classNames("h-[24px] w-[24px]", "rounded-md", "bg-gray-900 border border-gray-600 text-gray-300", "focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600", "disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800", {
      "border-red-600 ring-1 ring-red-600": error
    }, "transition-colors duration-150", props.className),
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
      className: classNames("flex items-center justify-center"),
      children: /* @__PURE__ */ jsx(CheckIcon, {})
    })
  }));
}
function Checkbox(props) {
  const [field, meta, helpers] = useField(props);
  return /* @__PURE__ */ jsx(CheckboxRaw, __spreadProps(__spreadValues(__spreadValues({}, field), props), {
    error: field.name && meta.error && meta.touched
  }));
}
function Progress(props) {
  const value = Math.max(0, props.value);
  const max = Math.max(0, props.max);
  const progress = useMemo$1((_) => {
    return value / max * 100;
  }, [value, max]);
  return /* @__PURE__ */ jsx(ProgressPrimitive.Root, __spreadProps(__spreadValues({}, props), {
    value,
    max,
    className: classNames("relative", "h-[2px]", "w-full", "bg-gray-800", props.className),
    children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, {
      className: "h-full transition-[width] duration-150 bg-blue-600",
      style: {
        width: `${progress}%`
      }
    })
  }));
}
const ReactComponent$4 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues({
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: 15,
  height: 15,
  fill: "none",
  viewBox: "0 0 15 15"
}, props), /* @__PURE__ */ React.createElement("path", {
  d: "M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z",
  fill: "currentColor",
  style: {
    opacity: "50%"
  },
  fillRule: "evenodd",
  clipRule: "evenodd"
}), /* @__PURE__ */ React.createElement("path", {
  d: "M291.761,420.578a5.673,5.673,0,0,1,5.673-5.673v-.95a6.623,6.623,0,0,0-4.683,11.306l.671-.671A5.659,5.659,0,0,1,291.761,420.578Z",
  transform: "translate(-289.811 -412.955)",
  fill: "currentColor"
}));
function LoaderIcon(props) {
  return /* @__PURE__ */ jsx(ReactComponent$4, __spreadValues({}, props));
}
function Loader(_J) {
  var _K = _J, {
    size = "normal"
  } = _K, props = __objRest(_K, [
    "size"
  ]);
  return /* @__PURE__ */ jsx("div", {
    className: classNames({
      "scale-75": size == "sm",
      "scale-110": size == "md",
      "scale-125": size == "lg",
      "scale-150": size == "xl"
    }),
    children: /* @__PURE__ */ jsx(LoaderIcon, {
      className: "animate-spin"
    })
  });
}
function Tooltip(_L) {
  var _M = _L, {
    size,
    showArrow = false,
    delayDuration,
    content
  } = _M, props = __objRest(_M, [
    "size",
    "showArrow",
    "delayDuration",
    "content"
  ]);
  const preferredDelayDuration = useMemo$1((_) => {
    if (size == "hint") {
      return 750;
    } else {
      return 150;
    }
  }, [size]);
  const sizeClassNames = useMemo$1((_) => {
    switch (size) {
      case "hint":
        return "text-xxs font-normal rounded-sm p-1 border border-gray-500";
      case "sm":
        return "text-xxs font-medium rounded-md px-1.5 py-1";
      default:
        return "text-xs rounded-md p-2";
    }
  }, [size]);
  const defaultProps = useMemo$1((_) => {
    switch (size) {
      case "hint":
        return {
          side: "bottom",
          sideOffset: 3,
          align: "start",
          alignOffset: 15
        };
    }
  }, [size]);
  return /* @__PURE__ */ jsxs(TooltipPrimitive.Root, {
    delayDuration: delayDuration || preferredDelayDuration,
    children: [/* @__PURE__ */ jsx(TooltipPrimitive.Trigger, {
      asChild: true,
      children: props.children
    }), /* @__PURE__ */ jsxs(TooltipPrimitive.Content, __spreadProps(__spreadValues(__spreadValues({}, defaultProps), props), {
      className: classNames("leading-none", "bg-gray-700 text-gray-100 font-bold shadow-sm", sizeClassNames),
      children: [showArrow && /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, {
        className: "fill-gray-700"
      }), content]
    }))]
  });
}
function Table(_N) {
  var _O = _N, {
    headers,
    className
  } = _O, props = __objRest(_O, [
    "headers",
    "className"
  ]);
  return /* @__PURE__ */ jsxs("table", __spreadProps(__spreadValues({}, props), {
    className: `table-auto border-collapse border border-transparent rounded-lg overflow-hidden ${className}`,
    children: [(headers == null ? void 0 : headers.length) && /* @__PURE__ */ jsx(TableHead, {
      headers
    }), /* @__PURE__ */ jsx("tbody", {
      children: props.children
    })]
  }));
}
function TableHead(_P) {
  var _Q = _P, {
    headers
  } = _Q, props = __objRest(_Q, [
    "headers"
  ]);
  return /* @__PURE__ */ jsx("thead", __spreadProps(__spreadValues({}, props), {
    children: /* @__PURE__ */ jsx("tr", {
      children: headers.map((header, i) => /* @__PURE__ */ jsx("th", {
        className: "bg-gray-800 text-gray-300 font-semibold text-left p-1",
        children: /* @__PURE__ */ jsx("div", {
          children: header
        })
      }, `header-${i}`))
    })
  }));
}
function TableRow(_R) {
  var props = __objRest(_R, []);
  return /* @__PURE__ */ jsx("tr", __spreadProps(__spreadValues({}, props), {
    className: classNames("font-medium group border-l border-gray-100 last:border-l-0", props.className),
    children: props.children
  }));
}
Table.Row = TableRow;
function TableData(_S) {
  var props = __objRest(_S, []);
  return /* @__PURE__ */ jsx("td", __spreadProps(__spreadValues({}, props), {
    className: classNames("border-b border-gray-700 px-1 py-2 group-hover:bg-gray-600/10 transition-colors duration-150", props.className),
    children: props.children
  }));
}
Table.Data = TableData;
const ListContext = React__default.createContext();
function List(_T) {
  var _U = _T, {
    size = "normal",
    divide = true,
    className
  } = _U, props = __objRest(_U, [
    "size",
    "divide",
    "className"
  ]);
  return /* @__PURE__ */ jsx("ul", {
    className: classNames("flex flex-col", {
      "divide-y divide-gray-700": divide
    }, className),
    children: /* @__PURE__ */ jsx(ListContext.Provider, {
      value: {
        size,
        divide
      },
      children: props.children
    })
  });
}
function Item(_V) {
  var _W = _V, {
    className
  } = _W, props = __objRest(_W, [
    "className"
  ]);
  const {
    size
  } = useContext(ListContext);
  return /* @__PURE__ */ jsx("li", __spreadValues({
    className: classNames("flex flex-row items-center", {
      "space-x-3 py-2": size == "normal",
      "space-x-1 py-1": size == "compact"
    }, className)
  }, props));
}
List.Item = Item;
function isPrimitive(val) {
  if (val === null)
    return true;
  return !(typeof val == "object" || typeof val == "function");
}
function CompactListItem(_X) {
  var _Y = _X, {
    item,
    selected,
    selectable = true,
    className
  } = _Y, props = __objRest(_Y, [
    "item",
    "selected",
    "selectable",
    "className"
  ]);
  const content = useMemo$1((_) => {
    if (props.children)
      return props.children;
    if (typeof item == "object") {
      return JSON.stringify(item);
    } else if (typeof item == "function") {
      return item(item);
    } else {
      return item;
    }
  }, [item, props.children]);
  return /* @__PURE__ */ jsx(List.Item, __spreadProps(__spreadValues({}, props), {
    className: classNames("px-0.5 transition-colors duration-150", "select-none", "rounded-md", "font-semibold", {
      "cursor-pointer": selectable,
      "hover:bg-white hover:bg-opacity-5": !selected,
      "bg-blue-700 text-gray-50": selected
    }, className),
    children: content
  }));
}
function GroupCompactListItem(_Z) {
  var __ = _Z, {
    items,
    itemComponent
  } = __, props = __objRest(__, [
    "items",
    "itemComponent"
  ]);
  const {
    selectedItemKey
  } = React__default.useContext(ListSelectionContext);
  const [open, setOpen] = useState(false);
  const showGroupSelection = useMemo$1((_) => {
    let groupKey = props["data-group-key"];
    return !open && (selectedItemKey == null ? void 0 : selectedItemKey.startsWith(groupKey));
  }, [open, props, selectedItemKey]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(List.Item, __spreadProps(__spreadValues({}, props), {
      className: classNames("px-0.5 transition-colors duration-150", "select-none", "rounded-md", "font-semibold", {
        "cursor-pointer": props.selectable,
        "hover:bg-white hover:bg-opacity-5": !props.selected,
        "bg-blue-700 text-gray-50": props.selected
      }, props.className),
      onClick: (_) => setOpen((o) => !o),
      children: [open ? /* @__PURE__ */ jsx(ChevronDownIcon, {
        className: "text-gray-200"
      }) : /* @__PURE__ */ jsx(ChevronRightIcon, {
        className: "text-gray-200"
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-1",
        children: props.children
      }), showGroupSelection && /* @__PURE__ */ jsx("div", {
        className: "w-[15px] h-[15px] flex items-center justify-center",
        children: /* @__PURE__ */ jsx("div", {
          className: "w-2 h-2 rounded-full bg-blue-700 self-center"
        })
      })]
    })), open && /* @__PURE__ */ jsx("div", {
      className: "pl-3",
      children: /* @__PURE__ */ jsx(CompactListRoot, {
        "data-group-key": props["data-group-key"],
        "data-internal-key": props["data-internal-key"],
        items,
        itemComponent
      })
    })]
  });
}
function CompactListRoot(_$) {
  var _aa = _$, {
    items,
    itemComponent: ItemComponent = CompactListItem,
    itemDisplayTransform,
    groupDisplayTransform,
    isGroupTransform,
    hideEmptyGroups = false
  } = _aa, props = __objRest(_aa, [
    "items",
    "itemComponent",
    "itemDisplayTransform",
    "groupDisplayTransform",
    "isGroupTransform",
    "hideEmptyGroups"
  ]);
  const {
    selectedItemKey,
    selectedItemInternalKey,
    handleSelect,
    maxDepth,
    keyTransform,
    itemProps
  } = React__default.useContext(ListSelectionContext);
  useEffect((_) => {
    if (selectedItemInternalKey) {
      let value = selectedItemInternalKey.split(".").reduce((obj, key) => obj ? obj[key] : void 0, items);
      if (value)
        handleSelect(selectedItemKey, value, selectedItemInternalKey);
    }
  }, [items]);
  const contents = (items2) => {
    if (!items2)
      return null;
    if (typeof items2 == "object") {
      return Object.keys(items2).map((key) => {
        var _a;
        let currentDepth = ((_a = props["data-group-key"]) == null ? void 0 : _a.split(".").length) || 0;
        let value = items2[key];
        let isGroup = (isGroupTransform == null ? void 0 : isGroupTransform(key, value)) || !isPrimitive(value) && currentDepth < maxDepth;
        let itemKey = (keyTransform == null ? void 0 : keyTransform(key, value, isGroup)) || key;
        let dataItemKey = [props["data-group-key"], itemKey].filter(Boolean).join(".");
        let dataInternalKey = [props["data-internal-key"], key.replace(".", "-")].filter(Boolean).join(".");
        if (isGroup) {
          if (hideEmptyGroups && !(value == null ? void 0 : value.length)) {
            return null;
          } else {
            return /* @__PURE__ */ jsx(GroupCompactListItem, {
              "data-group-key": dataItemKey,
              "data-internal-key": dataInternalKey,
              items: value,
              itemComponent: ItemComponent,
              children: groupDisplayTransform ? groupDisplayTransform(key, value) : key
            }, `group-${itemKey}`);
          }
        } else {
          return /* @__PURE__ */ jsx(ItemComponent, __spreadValues({
            "data-item-key": dataItemKey,
            "data-internal-key": dataInternalKey,
            selected: selectedItemKey === dataItemKey,
            item: itemDisplayTransform ? itemDisplayTransform(value) : value,
            onClick: (_) => handleSelect(dataItemKey, value, dataInternalKey)
          }, itemProps), `item-${itemKey}`);
        }
      });
    } else {
      throw new Error(`Unsupport type of items: ${typeof items2}`);
    }
  };
  return /* @__PURE__ */ jsxs(List, __spreadProps(__spreadValues({}, props), {
    className: "text-xs",
    size: "compact",
    children: [contents(items), props.children]
  }));
}
const ListSelectionContext = React__default.createContext();
function CompactList(props) {
  const [selectedItemKey, setSelectedItemKey] = useState(props.defaultValue);
  const [selectedItemInternalKey, setSelectedItemInternalKey] = useState(props.defaultValue);
  function handleSelect(key, value, internalKey) {
    var _a;
    setSelectedItemKey(key);
    setSelectedItemInternalKey(internalKey);
    (_a = props.onSelect) == null ? void 0 : _a.call(props, key, value);
  }
  let itemProps = Object.keys(props).filter((prop) => prop.startsWith("itemOn")).reduce((prev, propKey) => __spreadProps(__spreadValues({}, prev), {
    [propKey.replace("itemOn", "on")]: props[propKey]
  }), {});
  return /* @__PURE__ */ jsx(ListSelectionContext.Provider, {
    value: {
      selectedItemKey,
      setSelectedItemKey,
      selectedItemInternalKey,
      setSelectedItemInternalKey,
      handleSelect,
      maxDepth: props.maxDepth,
      keyTransform: props.keyTransform,
      itemProps
    },
    children: /* @__PURE__ */ jsx(CompactListRoot, __spreadProps(__spreadValues({}, props), {
      className: "text-xs",
      size: "compact"
    }))
  });
}
CompactList.Item = CompactListItem;
const ScrollArea = React__default.forwardRef((_ba, ref) => {
  var _ca = _ba, {
    type = "scroll",
    onScroll,
    children
  } = _ca, props = __objRest(_ca, [
    "type",
    "onScroll",
    "children"
  ]);
  return /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, __spreadProps(__spreadValues({
    ref,
    type
  }, props), {
    className: classNames("overflow-hidden", "flex", props.className),
    children: [/* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, {
      className: "flex-1",
      onScroll,
      children
    }), /* @__PURE__ */ jsx(ScrollAreaPrimitive.Scrollbar, {
      orientation: "vertical",
      className: "flex select-none touch-none px-0.5 py-1 radix-orientation-vertical:w-[11px]",
      children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, {
        className: "flex-1 dark:bg-black dark:bg-opacity-50 hover:dark:bg-opacity-75 dark:shadow-gray-700 shadow-sm rounded-full relative"
      })
    })]
  }));
});
ScrollArea.displayName = "ScrollArea";
const Popover = PopoverPrimitive.Root;
Popover.Trigger = PopoverPrimitive.Trigger;
function PopoverContent(_da) {
  var _ea = _da, {
    className
  } = _ea, props = __objRest(_ea, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(PopoverPrimitive.Content, __spreadProps(__spreadValues({
    sideOffset: 3
  }, props), {
    className: classNames("rounded-lg text-gray-300 bg-gray-700", "shadow-md", "min-w-[180px]", "p-1", className)
  }));
}
Popover.Content = PopoverContent;
const MenuContent = React__default.forwardRef((_fa, ref) => {
  var _ga = _fa, {
    items
  } = _ga, props = __objRest(_ga, [
    "items"
  ]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
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
  } = _ia, props = __objRest(_ia, [
    "item",
    "children"
  ]);
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    ref,
    className: classNames("relative", "rounded-md", "text-xs leading-none font-medium", "flex flex-row items-center", "pl-6 pr-1 h-6", "focus:bg-blue-700 focus:outline-none", "radix-state-open:bg-blue-900", "radix-disabled:opacity-60 disabled:opacity-60", {
      "cursor-default": !item.action && !item.items,
      "cursor-pointer": item.action || item.items
    })
  }, props), {
    children: [item.icon && /* @__PURE__ */ jsx("div", {
      className: "absolute left-0 w-6 inline-flex items-center justify-center",
      children: /* @__PURE__ */ jsx(item.icon, {
        className: "opacity-60"
      })
    }), item.label, item.detail && /* @__PURE__ */ jsx("div", {
      className: "ml-auto text-gray-400 text-xs",
      children: item.detail
    }), item.items && /* @__PURE__ */ jsx("div", {
      className: "ml-auto",
      children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
    }), children]
  }));
});
MenuItem$1.displayName = "MenuItem";
const DropdownMenu = (_ja) => {
  var _ka = _ja, {
    items,
    asSubmenu = false
  } = _ka, props = __objRest(_ka, [
    "items",
    "asSubmenu"
  ]);
  return /* @__PURE__ */ jsxs(DropdownMenuPrimitive.Root, __spreadProps(__spreadValues({}, props), {
    children: [/* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
      asChild: true,
      children: props.children
    }), /* @__PURE__ */ jsx(DropdownMenuContent, {
      children: items == null ? void 0 : items.map((item, i) => {
        if (typeof item == "object") {
          if (item.items) {
            return /* @__PURE__ */ jsx(DropdownMenuItem, {
              item,
              asSubmenu: true,
              items: item.items
            }, `menu-item-${i}`);
          } else {
            return /* @__PURE__ */ jsx(DropdownMenuItem, {
              item,
              disabled: !item.action,
              onSelect: (_) => {
                var _a;
                return (_a = item.action) == null ? void 0 : _a.call(item);
              }
            }, `menu-item-${i}`);
          }
        } else if (item === "-") {
          return /* @__PURE__ */ jsx(DropdownMenuSeparator, {}, `menu-item-${i}`);
        } else {
          console.warn("Unsupported item in DropdownMenu", item);
          return null;
        }
      })
    })]
  }));
};
function DropdownMenuContent(props) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, __spreadProps(__spreadValues({
    sideOffset: 3
  }, props), {
    asChild: true,
    children: /* @__PURE__ */ jsx(MenuContent, {
      children: props.children
    })
  }));
}
function DropdownMenuItem(props) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, __spreadProps(__spreadValues({}, props), {
    asChild: true,
    children: /* @__PURE__ */ jsx(MenuItem$1, {})
  }));
}
function DropdownMenuSeparator(props) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
    asChild: true,
    children: /* @__PURE__ */ jsx(Separator, {
      className: "my-1"
    })
  });
}
DropdownMenu.Root = DropdownMenuPrimitive.Root;
DropdownMenu.Trigger = DropdownMenuPrimitive.Trigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Separator = DropdownMenuSeparator;
const badge = "_badge_1knwz_1";
var styles$1 = {
  badge
};
function Badge(_la) {
  var _ma = _la, {
    className,
    size
  } = _ma, props = __objRest(_ma, [
    "className",
    "size"
  ]);
  return /* @__PURE__ */ jsx("div", {
    className: classNames(styles$1.badge, {
      "badge-sm": size == "sm"
    }, className),
    children: props.children
  });
}
function ContextMenu(_na) {
  var _oa = _na, {
    items,
    modal,
    asSubmenu = false,
    onPointerDown,
    onPointerDownOutside
  } = _oa, props = __objRest(_oa, [
    "items",
    "modal",
    "asSubmenu",
    "onPointerDown",
    "onPointerDownOutside"
  ]);
  let TriggerItem = asSubmenu ? ContextMenuPrimitive.TriggerItem : ContextMenuPrimitive.Trigger;
  const [open, setOpen] = useState(false);
  function handlePointerDown(e) {
    onPointerDown == null ? void 0 : onPointerDown(e);
  }
  function handlePointerDownOutside(e) {
    onPointerDownOutside == null ? void 0 : onPointerDownOutside(e);
  }
  return /* @__PURE__ */ jsxs(ContextMenuPrimitive.Root, {
    modal,
    onOpenChange: setOpen,
    children: [/* @__PURE__ */ jsx(TriggerItem, {
      asChild: asSubmenu,
      onPointerDown: handlePointerDown,
      children: props.children
    }), /* @__PURE__ */ jsx(ContextMenuPrimitive.Content, {
      onPointerDownOutside: handlePointerDownOutside,
      asChild: true,
      children: /* @__PURE__ */ jsx(MenuContent, {
        children: items == null ? void 0 : items.map((item, i) => {
          if (typeof item == "object") {
            if (item.items) {
              return /* @__PURE__ */ jsx(ContextMenu, {
                asSubmenu: true,
                items: item.items,
                children: /* @__PURE__ */ jsx(MenuItem$1, {
                  item
                })
              }, `menu-item-${i}`);
            } else {
              return /* @__PURE__ */ jsx(ContextMenuPrimitive.Item, {
                asChild: true,
                disabled: !item.action,
                onSelect: (_) => {
                  var _a;
                  return (_a = item.action) == null ? void 0 : _a.call(item);
                },
                children: /* @__PURE__ */ jsx(MenuItem$1, {
                  item
                })
              }, `menu-item-${i}`);
            }
          } else if (item === "-") {
            return /* @__PURE__ */ jsx(ContextMenuPrimitive.Separator, {
              asChild: true,
              children: /* @__PURE__ */ jsx(Separator, {
                className: "my-1"
              })
            }, `menu-item-${i}`);
          } else {
            console.warn("Unsupported item in ContextMenu", item);
            return null;
          }
        })
      })
    })]
  });
}
function BaudRateSelect(_pa) {
  var props = __objRest(_pa, []);
  const rates = [
    4800,
    9600,
    14400,
    19200,
    38400,
    57600,
    115200
  ];
  return /* @__PURE__ */ jsx(Select, __spreadValues({
    options: rates
  }, props));
}
function DeviceProfilePickerTypeFilter({
  defaultValue,
  onChange
}) {
  const [type, setType] = useState(defaultValue);
  useEffect((_) => onChange == null ? void 0 : onChange(type), [type]);
  return /* @__PURE__ */ jsxs(ToggleGroup, {
    value: type,
    onValueChange: (v) => setType((v == null ? void 0 : v.length) ? v : null),
    className: "flex-none",
    children: [/* @__PURE__ */ jsx(ToggleGroup.Item, {
      value: "fdm_printer",
      className: "rounded-md",
      children: /* @__PURE__ */ jsx(FDMPrinterIcon, {})
    }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
      value: "msla_printer",
      className: "rounded-md",
      children: /* @__PURE__ */ jsx(MSLAPrinterIcon, {})
    }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
      value: "cnc",
      className: "rounded-md",
      children: /* @__PURE__ */ jsx(CNCIcon, {})
    }), /* @__PURE__ */ jsx(ToggleGroup.Item, {
      value: "laser",
      className: "rounded-md",
      children: /* @__PURE__ */ jsx(LaserIcon, {})
    })]
  });
}
function DeviceProfileList(_qa) {
  var _ra = _qa, {
    itemComponent = DeviceProfileListItem$1
  } = _ra, props = __objRest(_ra, [
    "itemComponent"
  ]);
  return /* @__PURE__ */ jsx(CompactList, __spreadValues({
    divide: false,
    hideEmptyGroups: true,
    itemComponent,
    maxDepth: 1,
    keyTransform: (key, value, isGroup) => isGroup ? key : pathCase(value.model),
    groupDisplayTransform: (group) => titleCase(group)
  }, props));
}
function DeviceProfileListItem$1(_sa) {
  var _ta = _sa, {
    item
  } = _ta, props = __objRest(_ta, [
    "item"
  ]);
  return /* @__PURE__ */ jsx(CompactList.Item, __spreadProps(__spreadValues({
    selectable: true
  }, props), {
    children: /* @__PURE__ */ jsx(Group, {
      orientation: "vertical",
      className: "flex-1",
      children: /* @__PURE__ */ jsxs(Group, {
        className: "flex-1",
        children: [/* @__PURE__ */ jsx("span", {
          className: "mr-auto",
          children: item.model
        }), /* @__PURE__ */ jsx("div", {
          className: "text-gray-500 hover:text-gray-300 transition-colors duration-150",
          children: /* @__PURE__ */ jsx(Tooltip, {
            content: /* @__PURE__ */ jsx(DeviceProfileTooltipContent, {
              profile: item
            }),
            side: "right",
            sideOffset: 10,
            align: "center",
            showArrow: true,
            children: /* @__PURE__ */ jsx(InfoCircledIcon, {})
          })
        })]
      })
    })
  }));
}
function DeviceProfileTooltipContent({
  profile
}) {
  var _a;
  let infos = useMemo((_) => {
    switch (profile.type) {
      case "fdm_printer":
        return {
          "Max speed": profile.max_speed,
          "Printing volume": [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join("x"),
          "Extrudes": profile.extruders
        };
      case "msla_printer":
        return {
          "Printing volume": [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join("x")
        };
      case "cnc":
        return {
          "Max speed": profile.max_speed,
          "Volume": [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join("x")
        };
    }
  }, [profile]);
  return /* @__PURE__ */ jsx(Group, {
    orientation: "vertical",
    className: "w-full min-w-[200px]",
    children: (_a = Object.keys(infos)) == null ? void 0 : _a.map((key) => /* @__PURE__ */ jsxs(Group, {
      className: "justify-between",
      children: [/* @__PURE__ */ jsx(Label, {
        children: /* @__PURE__ */ jsx("span", {
          className: "text-gray-400",
          children: key
        })
      }), /* @__PURE__ */ jsx("span", {
        className: "font-semibold",
        children: infos[key] || "-"
      })]
    }, `info-${key}`))
  });
}
function DeviceTypeSelect(props) {
  return /* @__PURE__ */ jsx(Select, __spreadValues({
    options: [{
      value: "fdm_printer",
      label: "FDM Printer"
    }, {
      value: "msla_printer",
      label: "MSLA Printer"
    }, {
      value: "cnc",
      label: "CNC"
    }]
  }, props));
}
function FDMPrinterDeviceProfileFormContent() {
  var _a;
  const {
    values
  } = useFormikContext();
  return /* @__PURE__ */ jsxs(Group, {
    orientation: "vertical",
    children: [/* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "volume.width",
        children: "X (Width)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "volume.width",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "volume.depth",
        children: "Y (Depth)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "volume.depth",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "volume.height",
        children: "Z (Height)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "volume.height",
        type: "number",
        disabled: ((_a = values.volume) == null ? void 0 : _a.formFactor) != "rectangular"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "volume.formFactor",
        children: "Form factor"
      }), /* @__PURE__ */ jsx(Select, {
        name: "volume.formFactor",
        options: [{
          value: "rectangular",
          label: "Rectangular"
        }, {
          value: "elliptic",
          label: "Elliptic"
        }]
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "bed.heated",
        children: "Heated bed"
      }), /* @__PURE__ */ jsx(Checkbox, {
        name: "bed.heated"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "volume.origin",
        children: "Origin"
      }), /* @__PURE__ */ jsx(Select, {
        name: "volume.origin",
        options: [{
          value: "lower-left",
          label: "Default"
        }, {
          value: "center",
          label: "Center"
        }]
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "gCodeVersion",
        children: "GCode version"
      }), /* @__PURE__ */ jsx(Select, {
        name: "gCodeVersion",
        options: ["marlin"]
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "xAxis.maxSpeed",
        children: "Feedrate Max X"
      }), /* @__PURE__ */ jsx(Input, {
        name: "xAxis.maxSpeed",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "yAxis.maxSpeed",
        children: "Feedrate Max Y"
      }), /* @__PURE__ */ jsx(Input, {
        name: "yAxis.maxSpeed",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "zAxis.maxSpeed",
        children: "Feedrate Max Z"
      }), /* @__PURE__ */ jsx(Input, {
        name: "zAxis.maxSpeed",
        type: "number"
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(FieldArray, {
      name: "extruders",
      children: ({
        push,
        remove
      }) => {
        var _a2;
        return /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(Group, {
            children: [/* @__PURE__ */ jsx(Label, {
              children: "Extruders"
            }), /* @__PURE__ */ jsx(Button, {
              size: "sm",
              squared: true,
              onClick: (_) => push({
                nozzleDiameter: 0.4,
                xOffset: 0,
                yOffset: 0
              }),
              children: /* @__PURE__ */ jsx(PlusIcon, {})
            })]
          }), /* @__PURE__ */ jsx(List, {
            className: "space-y-2",
            children: (_a2 = values == null ? void 0 : values.extruders) == null ? void 0 : _a2.map((extruder, i) => {
              return /* @__PURE__ */ jsx(List.Item, {
                className: "group border-dashed border border-gray-700 rounded-md p-2",
                children: /* @__PURE__ */ jsxs(Group, {
                  orientation: "vertical",
                  className: "flex-1",
                  children: [/* @__PURE__ */ jsxs(Group, {
                    className: "border-b border-gray-700 border-dashed pb-2 -mx-2 px-2",
                    children: [/* @__PURE__ */ jsxs(Label, {
                      children: ["Extruder #", i]
                    }), /* @__PURE__ */ jsx(Button, {
                      size: "xs",
                      squared: true,
                      rounded: true,
                      onClick: (_) => remove(i),
                      className: "opacity-0 group-hover:opacity-100 transition duration-150",
                      children: /* @__PURE__ */ jsx(Cross2Icon, {})
                    })]
                  }), /* @__PURE__ */ jsx(ExtruderFormContent, {
                    index: i
                  })]
                })
              }, `extruder-${i}`);
            })
          })]
        });
      }
    })]
  });
}
function ExtruderFormContent({
  index
}) {
  return /* @__PURE__ */ jsxs(Group, {
    orientation: "vertical",
    children: [/* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: `extruders[${index}].nozzleDiameter`,
        children: "Nozzle diameter"
      }), /* @__PURE__ */ jsx(Input, {
        name: `extruders[${index}].nozzleDiameter`,
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: `extruders[${index}].xOffset`,
        children: "X offset"
      }), /* @__PURE__ */ jsx(Input, {
        name: `extruders[${index}].xOffset`,
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: `extruders[${index}].yOffset`,
        children: "Y offset"
      }), /* @__PURE__ */ jsx(Input, {
        name: `extruders[${index}].yOffset`,
        type: "number"
      })]
    })]
  });
}
function MSLAPrinterDeviceProfileFormContent() {
  return /* @__PURE__ */ jsxs(Group, {
    orientation: "vertical",
    children: [/* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        children: "X (Width)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "width",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        children: "Y (Depth)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "depth",
        type: "number"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        children: "Z (Height)"
      }), /* @__PURE__ */ jsx(Input, {
        name: "height",
        type: "number"
      })]
    })]
  });
}
function DeviceProfileForm({
  profile
}) {
  const [deviceType, setDeviceType] = useState("fdm_printer");
  const defaults = useMemo$1((_) => ({
    brand: "",
    model: "",
    type: deviceType
  }), [deviceType]);
  const validationSchema = useMemo$1((_) => {
    return Yup.object({
      brand: Yup.string().required("Missing device brand"),
      model: Yup.string().required("Missing device model")
    });
  }, []);
  const initialValues = useMemo$1((_) => {
    switch (deviceType) {
      case "fdm_printer":
        return __spreadValues(__spreadProps(__spreadValues({}, defaults), {
          volume: {
            width: 200,
            depth: 200,
            height: 200,
            origin: "lower-left",
            formFactor: "rectangular"
          },
          bed: {
            heated: true
          },
          gCodeVersion: "marlin",
          xAxis: {
            maxSpeed: 6e3
          },
          yAxis: {
            maxSpeed: 6e3
          },
          zAxis: {
            maxSpeed: 3e3
          }
        }), profile);
      case "msla_printer":
        return __spreadValues(__spreadProps(__spreadValues({}, defaults), {
          volume: {
            width: 120,
            depth: 85,
            height: 130
          }
        }), profile);
      default:
        return __spreadValues(__spreadValues({}, defaults), profile);
    }
  }, [defaults, deviceType, profile]);
  function handleSubmit(values) {
    if (profile.id) {
      coreSocket.emit("profiles:update", profile.id, values, (profile2) => {
        console.log("Updated profile", profile2);
      });
    } else {
      coreSocket.emit("profiles:add", values, (profile2) => {
        console.log("Added profile", profile2);
      });
    }
  }
  return /* @__PURE__ */ jsx(Form, {
    onSubmit: handleSubmit,
    validationSchema,
    initialValues,
    enableReinitialize: true,
    children: /* @__PURE__ */ jsx(DeviceProfileFormContent, {
      deviceType,
      onDeviceTypeChange: setDeviceType
    })
  });
}
function DeviceProfileFormContent(_ua) {
  var _va = _ua, {
    deviceType,
    onDeviceTypeChange
  } = _va, props = __objRest(_va, [
    "deviceType",
    "onDeviceTypeChange"
  ]);
  let {
    values
  } = useFormikContext();
  useEffect((_) => {
    onDeviceTypeChange == null ? void 0 : onDeviceTypeChange(values == null ? void 0 : values.type);
  }, [onDeviceTypeChange, values == null ? void 0 : values.type]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(Group, {
      orientation: "vertical",
      children: [/* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          children: "Brand"
        }), /* @__PURE__ */ jsx(Input, {
          name: "brand",
          disabled: values == null ? void 0 : values.id
        })]
      }), /* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          children: "Model"
        }), /* @__PURE__ */ jsx(Input, {
          name: "model",
          disabled: values == null ? void 0 : values.id
        })]
      }), /* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          children: "Device type"
        }), /* @__PURE__ */ jsx(DeviceTypeSelect, {
          name: "type",
          disabled: values == null ? void 0 : values.id
        })]
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex-1",
      children: [deviceType == "fdm_printer" && /* @__PURE__ */ jsx(FDMPrinterDeviceProfileFormContent, {}), deviceType == "msla_printer" && /* @__PURE__ */ jsx(MSLAPrinterDeviceProfileFormContent, {})]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(Group, {
      className: "justify-end",
      children: /* @__PURE__ */ jsx(Button, {
        type: "submit",
        children: "Save"
      })
    })]
  });
}
function DeviceProfilesListManager(_wa) {
  var props = __objRest(_wa, []);
  const {
    profiles
  } = useAppContext();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const groupedProfiles = useMemo$1((_) => {
    return Object.keys(profiles).reduce((grouped, profileId) => {
      let profile = profiles[profileId];
      let brand = profile.brand || "Generic";
      if (!grouped[brand])
        grouped[brand] = [];
      grouped[brand].push(profile);
      return grouped;
    }, {});
  }, [profiles]);
  const filteredProfiles = useMemo$1((_) => {
    let filtered = __spreadValues({}, groupedProfiles);
    if (filters.type) {
      Object.keys(filtered).map((brand) => {
        filtered[brand] = filtered[brand].filter((device) => device.type == filters.type);
      });
    }
    if (query == null ? void 0 : query.length) {
      let regex = new RegExp(`.?(${query}).?`, "i");
      Object.keys(filtered).map((brand) => {
        filtered[brand] = filtered[brand].filter((device) => regex.test(device.model));
      });
    }
    return filtered;
  }, [groupedProfiles, filters, query]);
  const itemsCount = useMemo$1((_) => Object.keys(filteredProfiles).reduce((count, brand) => count + filteredProfiles[brand].length, 0), [filteredProfiles]);
  const [showForm, setShowForm] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState();
  const [editingProfile, setEditingProfile] = useState();
  const [deletingProfile, setDeletingProfile] = useState();
  function handleEditItem(item) {
    console.log("Edit", item);
    setEditingProfile(item);
    setShowForm(true);
  }
  function handleDeleteItem(item) {
    console.log("Delete", item);
    setDeletingProfile(item);
    setShowDeleteConfirm(true);
  }
  function handleConfirmDelete() {
    console.log("Should delete");
    coreSocket.emit("profiles:delete", deletingProfile.id, (profile) => {
      console.log("Deleted profile", profile);
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(ScrollArea, {
      className: classNames("bg-gray-800 rounded-lg overflow-hidden", props.className),
      children: [/* @__PURE__ */ jsxs("div", {
        className: "h-10 px-2 py-1 flex flex-row space-x-2 absolute top-0 inset-x-0 items-center border-b border-gray-700 bg-gray-800/80 rounded-t-lg overflow-hidden",
        children: [/* @__PURE__ */ jsx(DeviceProfilePickerTypeFilter, {
          onChange: (type) => setFilters((f2) => __spreadProps(__spreadValues({}, f2), {
            type
          }))
        }), /* @__PURE__ */ jsx(Separator, {
          orientation: "vertical"
        }), /* @__PURE__ */ jsx(MagnifyingGlassIcon, {
          className: "flex-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative flex items-center",
          children: [/* @__PURE__ */ jsx(InputRaw, {
            className: classNames("w-full bg-gray-800", {
              "!pr-[22px]": query == null ? void 0 : query.length
            }),
            placeholder: "Search model...",
            value: query,
            onChange: (e) => setQuery(e.target.value)
          }), Boolean(query == null ? void 0 : query.length) && /* @__PURE__ */ jsx("div", {
            className: "absolute right-0 inset-y-0 px-1 flex items-center",
            children: /* @__PURE__ */ jsx("div", {
              className: " bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-150",
              onClick: (_) => setQuery(""),
              children: /* @__PURE__ */ jsx(Cross2Icon, {
                className: "scale-75"
              })
            })
          })]
        }), /* @__PURE__ */ jsx(Separator, {
          orientation: "vertical"
        }), /* @__PURE__ */ jsx(Tooltip, {
          size: "hint",
          content: "Add profile",
          children: /* @__PURE__ */ jsx(Button, {
            squared: true,
            size: "sm",
            onClick: (_) => {
              setEditingProfile(void 0);
              setShowForm(true);
            },
            children: /* @__PURE__ */ jsx(PlusIcon, {})
          })
        })]
      }), itemsCount ? /* @__PURE__ */ jsx("div", {
        className: "pt-11 px-1",
        children: /* @__PURE__ */ jsx(DeviceProfileList, __spreadValues({
          items: filteredProfiles,
          itemComponent: DeviceProfileListItem,
          itemOnEdit: handleEditItem,
          itemOnDelete: handleDeleteItem
        }, props))
      }) : /* @__PURE__ */ jsx(EmptyView, {
        className: "absolute inset-0 top-10",
        text: "No profiles"
      })]
    }), /* @__PURE__ */ jsx(Dialog.Root, {
      open: showForm,
      onOpenChange: setShowForm,
      children: /* @__PURE__ */ jsx(Dialog.Content, {
        title: "Device profile",
        children: /* @__PURE__ */ jsx(ScrollArea, {
          className: "h-full",
          children: /* @__PURE__ */ jsx(DeviceProfileForm, {
            profile: editingProfile
          })
        })
      })
    }), /* @__PURE__ */ jsx(ConfirmDialog.Root, {
      open: showDeleteConfirm,
      onOpenChange: setShowDeleteConfirm,
      children: /* @__PURE__ */ jsx(ConfirmDialog.Content, {
        title: "Delete profile",
        onConfirm: handleConfirmDelete,
        children: /* @__PURE__ */ jsxs("span", {
          className: "font-medium",
          children: ["Are you sure you want do delete ", /* @__PURE__ */ jsx("span", {
            className: "font-bold text-blue-500",
            children: deletingProfile == null ? void 0 : deletingProfile.id
          }), " profile?"]
        })
      })
    })]
  });
}
function DeviceProfileListItem(_xa) {
  var _ya = _xa, {
    item,
    onEdit,
    onDelete
  } = _ya, props = __objRest(_ya, [
    "item",
    "onEdit",
    "onDelete"
  ]);
  function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onDelete == null ? void 0 : onDelete(item);
  }
  return /* @__PURE__ */ jsx(CompactList.Item, __spreadProps(__spreadValues({
    selectable: true
  }, props), {
    className: "group",
    children: /* @__PURE__ */ jsx(Group, {
      orientation: "vertical",
      className: "flex-1",
      children: /* @__PURE__ */ jsxs(Group, {
        className: "flex-1",
        children: [/* @__PURE__ */ jsx("span", {
          className: "mr-auto",
          children: item.model
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-row items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors duration-150",
          children: [/* @__PURE__ */ jsx(Tooltip, {
            content: "Edit",
            size: "hint",
            children: /* @__PURE__ */ jsx(Pencil2Icon, {
              className: "invisible group-hover:visible",
              onClick: (_) => onEdit == null ? void 0 : onEdit(item)
            })
          }), /* @__PURE__ */ jsx(Tooltip, {
            content: "Delete",
            size: "hint",
            children: /* @__PURE__ */ jsx(TrashIcon, {
              className: "invisible group-hover:visible",
              onClick: handleDeleteClick
            })
          })]
        })]
      })
    })
  }));
}
function DeviceProfilePicker(_za) {
  var props = __objRest(_za, []);
  function handleSelect(key, profile) {
    var _a, _b;
    if (((_a = props.field) == null ? void 0 : _a.name) && typeof ((_b = props.form) == null ? void 0 : _b.setFieldValue) === "function") {
      props.form.setFieldValue(props.field.name, profile.id);
    }
  }
  return /* @__PURE__ */ jsx(DeviceProfilesListManager, {
    onSelect: handleSelect,
    className: "h-[200px]"
  });
}
function DeviceForm({
  device
}) {
  var _a;
  const ports = useSerialPorts();
  function handleSubmit(values, options) {
    if (!device.id) {
      coreSocket.emit("devices:add", values, (deviceData) => {
        console.log("Created device");
      });
    } else {
      coreSocket.emit("devices:update", device.id, values, (deviceData) => {
        console.log("Updated device");
      });
    }
  }
  return /* @__PURE__ */ jsx(Form, {
    enableReinitialize: true,
    initialValues: {
      "id": device.id || "",
      "name": device.name || getSuggestedName(device == null ? void 0 : device.vendorId, device == null ? void 0 : device.productId),
      "profileId": ((_a = device.profile) == null ? void 0 : _a.id) || device.profileId || "",
      "port": (device == null ? void 0 : device.port) || "",
      "baudrate": (device == null ? void 0 : device.baudrate) || "auto",
      "serialNumber": device == null ? void 0 : device.serialNumber,
      "vendorId": device == null ? void 0 : device.vendorId,
      "productId": device == null ? void 0 : device.productId
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      profileId: Yup.string().required(),
      port: Yup.string().required(),
      baudrate: Yup.mixed().required()
    }),
    onSubmit: handleSubmit,
    children: (_b) => {
      var _c = _b, {
        values,
        initialValues,
        errors,
        touched
      } = _c, formProps = __objRest(_c, [
        "values",
        "initialValues",
        "errors",
        "touched"
      ]);
      return /* @__PURE__ */ jsxs(Group, {
        orientation: "vertical",
        children: [/* @__PURE__ */ jsx(Input, {
          type: "hidden",
          name: "id"
        }), /* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "name",
            children: "Name"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "name",
            className: "w-full",
            autoComplete: "off"
          })]
        }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          className: "text-xs",
          children: [/* @__PURE__ */ jsx(DisplayGroup, {
            label: "Serial number",
            value: values.serialNumber || "-"
          }), /* @__PURE__ */ jsx(DisplayGroup, {
            label: "Vendor ID",
            value: values.vendorId || "-"
          }), /* @__PURE__ */ jsx(DisplayGroup, {
            label: "Product ID",
            value: values.productId || "-"
          })]
        }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          children: [/* @__PURE__ */ jsxs(Group, {
            className: "justify-between",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "profile",
              children: "Device profile"
            }), /* @__PURE__ */ jsx(InputRaw, {
              placeholder: "No profile selected",
              className: "!bg-transparent !border-dashed !ring-0",
              error: formProps.submitCount && errors.profileId,
              disabled: true,
              value: values.profileId
            })]
          }), /* @__PURE__ */ jsx(Field, {
            name: "profileId",
            component: DeviceProfilePicker
          })]
        }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          children: [/* @__PURE__ */ jsxs(Group, {
            className: "justify-between",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "port",
              children: "Port"
            }), initialValues.port ? /* @__PURE__ */ jsx(InputRaw, {
              value: initialValues.port,
              disabled: true,
              className: "w-max"
            }) : /* @__PURE__ */ jsx(Select, {
              name: "port",
              options: ports == null ? void 0 : ports.map((p2) => p2.path),
              defaultValue: device == null ? void 0 : device.port.path
            })]
          }), /* @__PURE__ */ jsxs(Group, {
            className: "justify-between",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "baudrate",
              children: "Baudrate"
            }), /* @__PURE__ */ jsx(BaudRateSelect, {
              name: "baudrate"
            })]
          })]
        }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(Group, {
          className: "justify-end",
          children: /* @__PURE__ */ jsx(Button, {
            type: "submit",
            children: "Save"
          })
        })]
      });
    }
  });
}
function ListDeviceWizardStep({
  onSelectDevice
}) {
  const ports = useSerialPorts();
  function handleSelectPort(port) {
    let device = port.device || {};
    device.port = port.path;
    device.vendorId = port.vendorId;
    device.productId = port.productId;
    onSelectDevice == null ? void 0 : onSelectDevice(device);
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      className: "text-gray-500 text-sm font-normal",
      children: "Select the device on the listed ports below. If no device has been automatically detected, you can manually select the port and proceed to the manual configuration."
    }), /* @__PURE__ */ jsx(Table, {
      headers: ["Port", "Info", null],
      className: "text-sm",
      children: ports == null ? void 0 : ports.map((port) => /* @__PURE__ */ jsx(PortRow, {
        port,
        onClick: (e) => handleSelectPort(port)
      }, `port-${port.path}`))
    })]
  });
}
function PortRow(_Aa) {
  var _Ba = _Aa, {
    port
  } = _Ba, props = __objRest(_Ba, [
    "port"
  ]);
  const productInfo = useMemo$1((_) => {
    if (!port.vendorId)
      return null;
    return getProductInfo(port.vendorId, port.productId);
  }, [port.vendorId, port.productId]);
  return /* @__PURE__ */ jsxs(Table.Row, __spreadProps(__spreadValues({
    className: "select-none cursor-pointer h-14 max-h-14"
  }, props), {
    children: [/* @__PURE__ */ jsx(Table.Data, {
      className: "w-52",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col",
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-sm font-semibold",
          children: port.manufacturer || "-"
        }), /* @__PURE__ */ jsx("span", {
          className: "text-xs text-gray-600",
          children: port.path
        })]
      })
    }), /* @__PURE__ */ jsx(Table.Data, {
      className: "text-xs",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col",
        children: [/* @__PURE__ */ jsx("span", {
          children: (productInfo == null ? void 0 : productInfo.vendorName) || (port.vendorId ? `VID: ${port.vendorId}` : "Unknown")
        }), /* @__PURE__ */ jsx("span", {
          children: (productInfo == null ? void 0 : productInfo.productName) || (port.productId ? `PID: ${port.productId}` : "Unknown")
        })]
      })
    }), /* @__PURE__ */ jsx(Table.Data, {
      children: /* @__PURE__ */ jsx(CaretRightIcon, {})
    })]
  }));
}
function AddDeviceWizard({
  device,
  props
}) {
  const [selectedDevice, setSelectedDevice] = useState(device);
  if (selectedDevice)
    return /* @__PURE__ */ jsx(DeviceForm, {
      device: selectedDevice
    });
  return /* @__PURE__ */ jsx(ListDeviceWizardStep, {
    onSelectDevice: setSelectedDevice
  });
}
function AppLoader() {
  return /* @__PURE__ */ jsx(BlockingView, {
    children: /* @__PURE__ */ jsx("div", {
      className: "flex flex-col space-y-2",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-row space-x-3 text-gray-300 items-center",
        children: [/* @__PURE__ */ jsx(Loader, {
          size: "xl"
        }), /* @__PURE__ */ jsx("span", {
          className: "font-semibold",
          children: "Loading app data..."
        })]
      })
    })
  });
}
function GCodeViewer(_Ca) {
  var _Da = _Ca, {
    className
  } = _Da, props = __objRest(_Da, [
    "className"
  ]);
  const canvas = useRef();
  useEffect((_) => {
    let size = canvas.current.parentElement.getBoundingClientRect();
    canvas.current.width = size.width;
    canvas.current.height = size.height;
    let canvasRect = canvas.current.getBoundingClientRect();
    let centerX = canvasRect.width / 2;
    let centerY = canvasRect.height / 2;
    let radius = 30;
    let angle = 0;
    const k = 100;
    let draw = (_2) => {
      if (radius < 1) {
        clearInterval(timer);
        return;
      }
      let ctx = canvas.current.getContext("2d");
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#164e63";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle, angle + Math.PI / k);
      ctx.closePath();
      ctx.stroke();
      radius -= Math.PI / k;
      angle += Math.PI / k;
    };
    let timer = setInterval(draw, 100);
    return (_2) => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({
    className: classNames("relative", "bg-gray-500", className)
  }, props), {
    children: /* @__PURE__ */ jsx("canvas", {
      ref: canvas,
      className: "absolute inset-0"
    })
  }));
}
function DeviceCard({
  device
}) {
  var _a, _b;
  const percentage = 0;
  return /* @__PURE__ */ jsx(Link, {
    href: `/workspace/devices/${device.id}`,
    passHref: true,
    children: /* @__PURE__ */ jsx(Widget, {
      className: classNames("h-80 cursor-pointer"),
      children: /* @__PURE__ */ jsx(DeviceProvider, {
        device,
        children: /* @__PURE__ */ jsx("div", {
          className: "card-body",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex-1 flex flex-col space-y-2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col items-stretch font-medium text-sm border-b border-gray-600 pb-0.5",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-row",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-1",
                  children: device.name
                }), /* @__PURE__ */ jsx("button", {
                  children: /* @__PURE__ */ jsx(StarIcon, {})
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-row space-x-1 items-center text-[10px] font-mono font-normal dark:text-gray-500",
                children: [/* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsx(DeviceTypeIcon, {
                    device
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex-1",
                  children: [(_a = device.profile) == null ? void 0 : _a.brand, " ", (_b = device.profile) == null ? void 0 : _b.model]
                }), /* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsx(DeviceConnectionStatus, {
                    device
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-[11px] font-medium text-gray-500",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-row items-center justify-between",
                children: [/* @__PURE__ */ jsx("div", {
                  children: "Nome_file.m3f"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [percentage, " %"]
                })]
              }), /* @__PURE__ */ jsx(Progress, {
                value: 20,
                max: 100
              })]
            }), device.camera && /* @__PURE__ */ jsx("div", {
              className: "relative w-full h-[160px] rounded-md overflow-hidden",
              children: /* @__PURE__ */ jsx("div", {
                className: "absolute inset-x-0 bottom-0 flex flex-row",
                children: device.camera.live ? /* @__PURE__ */ jsxs("div", {
                  className: "m-1 p-1 bg-gray-900 bg-opacity-75 text-red-700 flex flex-row items-center space-x-1 rounded-sm",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-1 h-1 rounded-full bg-current"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-medium",
                    children: "LIVE"
                  })]
                }) : /* @__PURE__ */ jsxs("div", {
                  className: "m-1 p-1 bg-gray-900 bg-opacity-75 text-gray-400 rounded-sm text-[10px] flex flex-row items-center space-x-1",
                  children: [/* @__PURE__ */ jsx(CameraIcon, {}), /* @__PURE__ */ jsx("span", {
                    className: "font-mono",
                    children: "15:32:12"
                  })]
                })
              })
            }), device.type == "cnc" && /* @__PURE__ */ jsx(GCodeViewer, {
              className: "w-full h-[160px] rounded-md overflow-hidden"
            })]
          })
        })
      })
    })
  });
}
const ConnectionStatus = Object.freeze({
  Loading: 0,
  PortNotFound: 1,
  DifferentDevice: 2,
  Connected: 10
});
function DeviceConnectionStatus({
  device
}) {
  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.Loading);
  useEffect((_) => {
    coreSocket.emit("devices:connection:check", device.id, (port) => {
      if (port) {
        if (port.serialNumber == device.serialNumber && port.vendorId == device.vendorId && port.productId == device.productId) {
          setConnectionStatus(ConnectionStatus.Connected);
        } else {
          setConnectionStatus(ConnectionStatus.DifferentDevice);
        }
      } else {
        setConnectionStatus(ConnectionStatus.PortNotFound);
      }
    });
  }, [device]);
  const tooltipContent = useMemo$1((_) => {
    switch (connectionStatus) {
      case ConnectionStatus.Loading:
        return /* @__PURE__ */ jsx("span", {
          children: "Checking connection..."
        });
      case ConnectionStatus.PortNotFound:
        return /* @__PURE__ */ jsxs("span", {
          className: "text-red-300",
          children: ["Port ", device.port, " not found"]
        });
      case ConnectionStatus.DifferentDevice:
        return /* @__PURE__ */ jsxs("span", {
          className: "text-yellow-600",
          children: ["A different device is connected to port ", device.port]
        });
      case ConnectionStatus.Connected:
        return /* @__PURE__ */ jsxs("span", {
          className: "text-lime-500",
          children: ["Device connected on ", device.port]
        });
    }
  }, [connectionStatus, device.port]);
  return /* @__PURE__ */ jsx(Tooltip, {
    content: tooltipContent,
    size: "sm",
    className: "font-normal",
    side: "left",
    sideOffset: 18,
    alignOffset: 0,
    children: /* @__PURE__ */ jsxs("div", {
      children: [connectionStatus == ConnectionStatus.Loading && /* @__PURE__ */ jsx(Loader, {}), connectionStatus == ConnectionStatus.PortNotFound && /* @__PURE__ */ jsx(LinkBreak1Icon, {
        className: "text-red-600"
      }), connectionStatus == ConnectionStatus.DifferentDevice && /* @__PURE__ */ jsx(LinkNone1Icon, {
        className: "text-yellow-600"
      }), connectionStatus == ConnectionStatus.Connected && /* @__PURE__ */ jsx(Link1Icon, {
        className: "text-lime-600"
      })]
    })
  });
}
function DevicePluginsSettingsWidget() {
  return /* @__PURE__ */ jsx(Widget, {
    title: "Plugins",
    children: /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-2 gap-3",
      children: [/* @__PURE__ */ jsxs(Group, {
        className: "justify-between",
        children: [/* @__PURE__ */ jsx(Label, {
          children: "Plugin install directory"
        }), /* @__PURE__ */ jsx(InputRaw, {
          value: "/plugins",
          disabled: true
        })]
      }), /* @__PURE__ */ jsx(Group, {
        children: /* @__PURE__ */ jsx(Button, {
          size: "sm",
          children: "Install plugin"
        })
      })]
    })
  });
}
function DevicesGrid() {
  const {
    devices
  } = useAppContext();
  return /* @__PURE__ */ jsx("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2",
    children: devices == null ? void 0 : devices.map((device) => /* @__PURE__ */ jsx(DeviceCard, {
      device
    }, device.id))
  });
}
const ReactComponent$3 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues({
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
  return /* @__PURE__ */ jsx(ReactComponent$3, __spreadValues({
    viewBox: "0 0 15 15"
  }, props));
}
const ReactComponent$2 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues({
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
  return /* @__PURE__ */ jsx(ReactComponent$2, __spreadValues({}, props));
}
const ReactComponent$1 = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues({
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
  return /* @__PURE__ */ jsx(ReactComponent$1, __spreadValues({}, props));
}
const ReactComponent = (props) => /* @__PURE__ */ React.createElement("svg", __spreadValues({
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
  return /* @__PURE__ */ jsx(ReactComponent, __spreadValues({}, props));
}
function DeviceTypeIcon(_Ea) {
  var _Fa = _Ea, {
    device
  } = _Fa, props = __objRest(_Fa, [
    "device"
  ]);
  const IconComponent = useMemo$1((_) => {
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
  return /* @__PURE__ */ jsx(IconComponent, __spreadValues({}, props));
}
var styles = {
  "corner-bl": "_corner-bl_1r540_1",
  "corner-br": "_corner-br_1r540_2",
  "tab-item": "_tab-item_1r540_43"
};
var router$2 = {};
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
_interopRequireDefault$4(getAssetPathFromRoute$1);
var _requestIdleCallback = requestIdleCallback$1;
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const MS_MAX_IDLE_DELAY = 3800;
function withFuture(key, map, generator) {
  let entry = map.get(key);
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
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? generator().then((value) => (resolver(value), value)).catch((err) => {
    map.delete(key);
    throw err;
  }) : prom;
}
function hasPrefetch(link) {
  try {
    link = document.createElement("link");
    return !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports("prefetch");
  } catch (e) {
    return false;
  }
}
const canPrefetch = hasPrefetch();
function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
    if (document.querySelector(selector)) {
      return res();
    }
    link = document.createElement("link");
    if (as)
      link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = {}.__NEXT_CROSS_ORIGIN;
    link.onload = res;
    link.onerror = rej;
    link.href = href;
    document.head.appendChild(link);
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
    p2.then((r) => {
      cancelled = true;
      resolve(r);
    }).catch(reject);
    {
      _requestIdleCallback.requestIdleCallback(() => setTimeout(() => {
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
      scripts: allFiles.filter((v) => v.endsWith(".js")),
      css: allFiles.filter((v) => v.endsWith(".css"))
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
    loadRoute(route, prefetch) {
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
        }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({ entrypoint, styles: styles2 }) => {
          const res = Object.assign({
            styles: styles2
          }, entrypoint);
          return "error" in entrypoint ? entrypoint : res;
        }).catch((err) => {
          if (prefetch) {
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
        _requestIdleCallback.requestIdleCallback(() => this.loadRoute(route, true).catch(() => {
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
      for (let i = 0; i < routeKeyCharLength; i++) {
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
  let protocol = urlObj.protocol || "";
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
  if (protocol && protocol.substr(-1) !== ":")
    protocol += ":";
  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
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
  return `${protocol}${host}${pathname}${search}${hash}`;
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
var _react$2 = React__default;
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
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? ":" + port : ""}`;
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
function normalizeRepeatedSlashes(url) {
  const urlParts = url.split("?");
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
function formatWithValidation(url) {
  return _formatUrl.formatUrl(url);
}
const SP = typeof performance !== "undefined";
utils.SP = SP;
const ST = SP && typeof performance.mark === "function" && typeof performance.measure === "function";
utils.ST = ST;
class DecodeError extends Error {
}
utils.DecodeError = DecodeError;
const HtmlContext = _react$2.createContext(null);
utils.HtmlContext = HtmlContext;
Object.defineProperty(routeMatcher, "__esModule", {
  value: true
});
routeMatcher.getRouteMatcher = getRouteMatcher;
var _utils$3 = utils;
function getRouteMatcher(routeRegex2) {
  const { re, groups } = routeRegex2;
  return (pathname) => {
    const routeMatch = re.exec(pathname);
    if (!routeMatch) {
      return false;
    }
    const decode = (param) => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        throw new _utils$3.DecodeError("failed to decode param");
      }
    };
    const params = {};
    Object.keys(groups).forEach((slugName) => {
      const g2 = groups[slugName];
      const m2 = routeMatch[g2.pos];
      if (m2 !== void 0) {
        params[slugName] = ~m2.indexOf("/") ? m2.split("/").map((entry) => decode(entry)) : g2.repeat ? [
          decode(m2)
        ] : decode(m2);
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
    const routes = childrenPaths.map((c) => this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr) => [
      ...prev,
      ...curr
    ], []);
    if (this.slugName !== null) {
      routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
    }
    if (!this.placeholder) {
      const r = prefix === "/" ? "/" : prefix.slice(0, -1);
      if (this.optionalRestSlugName != null) {
        throw new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`);
      }
      routes.unshift(r);
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
function parseRelativeUrl(url, base) {
  const globalBase = new URL(typeof window === "undefined" ? "http://n" : _utils$1.getLocationOrigin());
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const { pathname, searchParams, search, hash, href, origin } = new URL(url, resolvedBase);
  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
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
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at " + i);
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
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
        throw new TypeError("Unbalanced pattern at " + i);
      if (!pattern)
        throw new TypeError("Missing pattern at " + i);
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
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
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
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
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:" + token.pattern + ")$", reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
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
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
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
  var keys = [];
  var re = pathToRegexp$1(str, keys, options);
  return regexpToFunction(re, keys, options);
}
pathToRegexp$2.match = match;
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m2 = re.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m2[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m2[i2], key);
      }
    };
    for (var i = 1; i < m2.length; i++) {
      _loop_1(i);
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
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      });
    }
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp$1(path, keys, options).source;
  });
  return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d;
  var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
  var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
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
function pathToRegexp$1(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
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
var _default = (customRoute = false) => {
  return (path, regexModifier) => {
    const keys = [];
    let matcherRegex = pathToRegexp.pathToRegexp(path, keys, customRoute ? customRouteMatcherOptions : matcherOptions);
    if (regexModifier) {
      const regexSource = regexModifier(matcherRegex.source);
      matcherRegex = new RegExp(regexSource, matcherRegex.flags);
    }
    const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys);
    return (pathname, params) => {
      const res = pathname == null ? false : matcher(pathname);
      if (!res) {
        return false;
      }
      if (customRoute) {
        for (const key of keys) {
          if (typeof key.name === "number") {
            delete res.params[key.name];
          }
        }
      }
      return __spreadValues(__spreadValues({}, params), res.params);
    };
  };
};
pathMatch.default = _default;
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
function parseUrl(url) {
  if (url.startsWith("/")) {
    return _parseRelativeUrl$2.parseRelativeUrl(url);
  }
  const parsedURL = new URL(url);
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
function matchHas(req, has, query) {
  const params = {};
  const allMatch = has.every((hasItem) => {
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
  for (let i = 0; i < paramName.length; i++) {
    const charCode = paramName.charCodeAt(i);
    if (charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123) {
      newParamName += paramName[i];
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
var _pathMatch = _interopRequireDefault$3(pathMatch);
var _prepareDestination = prepareDestination$1;
var _normalizeTrailingSlash$1 = normalizeTrailingSlash;
var _normalizeLocalePath$1 = normalizeLocalePath$1;
var _parseRelativeUrl$1 = parseRelativeUrl$1;
var _router$1 = router$1;
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const customRouteMatcher = _pathMatch.default(true);
function resolveRewrites(asPath, pages, rewrites, query, resolveHref2, locales) {
  let matchedPage = false;
  let externalDest = false;
  let parsedAs = _parseRelativeUrl$1.parseRelativeUrl(asPath);
  let fsPathname = _normalizeTrailingSlash$1.removePathTrailingSlash(_normalizeLocalePath$1.normalizeLocalePath(_router$1.delBasePath(parsedAs.pathname), locales).pathname);
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
      fsPathname = _normalizeTrailingSlash$1.removePathTrailingSlash(_normalizeLocalePath$1.normalizeLocalePath(_router$1.delBasePath(asPath), locales).pathname);
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
  for (let i = 0; i < rewrites.beforeFiles.length; i++) {
    finished = handleRewrite(rewrites.beforeFiles[i]) || false;
  }
  matchedPage = pages.includes(fsPathname);
  if (!matchedPage) {
    if (!finished) {
      for (let i = 0; i < rewrites.afterFiles.length; i++) {
        if (handleRewrite(rewrites.afterFiles[i])) {
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
      for (let i = 0; i < rewrites.fallback.length; i++) {
        if (handleRewrite(rewrites.fallback[i])) {
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
var _mitt = _interopRequireDefault$2(mitt$1);
var _utils = utils;
var _isDynamic = isDynamic;
var _parseRelativeUrl = parseRelativeUrl$1;
var _querystring = querystring$1;
var _resolveRewrites = _interopRequireDefault$2(resolveRewrites$1);
var _routeMatcher = routeMatcher;
var _routeRegex = routeRegex;
var _getMiddlewareRegex = getMiddlewareRegex$1;
function _interopRequireDefault$2(obj) {
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
function isLocalURL(url) {
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?"))
    return true;
  try {
    const locationOrigin = (0, _utils).getLocationOrigin();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
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
  } catch (_) {
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
function stripOrigin(url) {
  const origin = _utils.getLocationOrigin();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}
function prepareUrlAs(router2, url, as) {
  let [resolvedHref, resolvedAs] = resolveHref(router2, url, true);
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
    let v = "__next";
    return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), true;
  } catch (n2) {
  }
}();
const SSG_DATA_NOT_FOUND = Symbol("SSG_DATA_NOT_FOUND");
function fetchRetry(url, attempts, opts) {
  return fetch(url, {
    credentials: "same-origin"
  }).then((res) => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1, opts);
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
    this.onPopState = (e) => {
      const state = e.state;
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
      const { url, as: as2, options, idx } = state;
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
              const v = sessionStorage.getItem("__next_scroll_" + idx);
              forcedScroll = JSON.parse(v);
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
      const { pathname: pathname2 } = _parseRelativeUrl.parseRelativeUrl(url);
      if (this.isSsr && as2 === addBasePath(this.asPath) && pathname2 === addBasePath(this.pathname)) {
        return;
      }
      if (this._bps && !this._bps(state)) {
        return;
      }
      this.change("replaceState", url, as2, Object.assign({}, options, {
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
  push(url, as, options = {}) {
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
    ({ url, as } = prepareUrlAs(this, url, as));
    return this.change("pushState", url, as, options);
  }
  replace(url, as, options = {}) {
    ({ url, as } = prepareUrlAs(this, url, as));
    return this.change("replaceState", url, as, options);
  }
  async change(method, url, as, options, forcedScroll) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }
    const shouldResolveHref = options._h || options._shouldResolveHref || pathNoQueryHash(url) === pathNoQueryHash(as);
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
        url = addBasePath(_normalizeLocalePath.normalizeLocalePath(hasBasePath(url) ? delBasePath(url) : url, this.locales).pathname);
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
      this.changeState(method, url, as, __spreadProps(__spreadValues({}, options), {
        scroll: false
      }));
      if (scroll) {
        this.scrollToHash(cleanedAs);
      }
      this.set(nextState, this.components[nextState.route], null);
      Router.events.emit("hashChangeComplete", as, routeProps);
      return true;
    }
    let parsed = _parseRelativeUrl.parseRelativeUrl(url);
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
          url = _utils.formatWithValidation(parsed);
        }
      } else {
        parsed.pathname = resolveDynamicRoute(pathname, pages);
        if (parsed.pathname !== pathname) {
          pathname = parsed.pathname;
          parsed.pathname = addBasePath(pathname);
          url = _utils.formatWithValidation(parsed);
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
        url = _utils.formatWithValidation(parsed);
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
          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? "href-interpolation-failed" : "incompatible-href-as"}`);
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
          } catch (_) {
            notFoundRoute = "/_error";
          }
          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          }, nextState.locale, nextState.isPreview);
        }
      }
      Router.events.emit("beforeHistoryChange", as, routeProps);
      this.changeState(method, url, as, options);
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
      }), routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch((e) => {
        if (e.cancelled)
          error = error || e;
        else
          throw e;
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
  changeState(method, url, as, options = {}) {
    if (method !== "pushState" || _utils.getURL() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
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
  async prefetch(url, asPath = url, options = {}) {
    let parsed = _parseRelativeUrl.parseRelativeUrl(url);
    let { pathname, query } = parsed;
    if ({}.__NEXT_I18N_SUPPORT) {
      if (options.locale === false) {
        pathname = _normalizeLocalePath.normalizeLocalePath(pathname, this.locales).pathname;
        parsed.pathname = pathname;
        url = _utils.formatWithValidation(parsed);
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
        url = _utils.formatWithValidation(parsed);
      }
    } else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);
      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        parsed.pathname = pathname;
        url = _utils.formatWithValidation(parsed);
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
      url = _utils.formatWithValidation(parsed);
    }
    const route = _normalizeTrailingSlash.removePathTrailingSlash(pathname);
    await Promise.all([
      this.pageLoader._isSsg(route).then((isSsg) => {
        return isSsg ? fetchNextData(this.pageLoader.getDataHref({
          href: url,
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
var routerContext = {};
Object.defineProperty(routerContext, "__esModule", {
  value: true
});
routerContext.RouterContext = void 0;
var _react$1 = _interopRequireDefault$1(React__default);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const RouterContext = _react$1.default.createContext(null);
routerContext.RouterContext = RouterContext;
var withRouter$1 = {};
Object.defineProperty(withRouter$1, "__esModule", {
  value: true
});
withRouter$1.default = withRouter;
var _react = _interopRequireDefault(React__default);
var _router = router$2;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /* @__PURE__ */ _react.default.createElement(ComposedComponent, Object.assign({
      router: _router.useRouter()
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
    for (const property of urlPropertyFields) {
      if (typeof scopedRouter[property] === "object") {
        instance[property] = Object.assign(Array.isArray(scopedRouter[property]) ? [] : {}, scopedRouter[property]);
        continue;
      }
      instance[property] = scopedRouter[property];
    }
    instance.events = _router2.default.events;
    coreMethodFields.forEach((field) => {
      instance[field] = (...args) => {
        return scopedRouter[field](...args);
      };
    });
    return instance;
  }
})(router$2);
var router = router$2;
function TabItem(_Ga) {
  var _Ha = _Ga, {
    href
  } = _Ha, props = __objRest(_Ha, [
    "href"
  ]);
  const router$12 = router.useRouter();
  const active = useMemo$1((_) => router$12 == null ? void 0 : router$12.asPath.startsWith(href), [href, router$12]);
  return /* @__PURE__ */ jsxs("li", {
    className: classNames("relative", "z-0 hover:z-20", "flex items-center", "text-sm leading-none", "font-medium", "rounded-t-lg", "transition-all duration-300", "group", {
      "z-30": active,
      "hover:bg-gray-800/40": !active,
      "bg-gray-800 text-gray-100": active
    }, {
      "active": active
    }, styles["tab-item"]),
    children: [/* @__PURE__ */ jsx(Link, {
      href,
      passHref: true,
      children: /* @__PURE__ */ jsx("a", {
        className: "w-full h-full flex flex-row items-center space-x-2 px-3 py-2.5",
        children: props.children
      })
    }), /* @__PURE__ */ jsx("div", {
      className: classNames("text-gray-800", {
        "opacity-0 group-hover:opacity-40": !active
      }, "transition-opacity duration-300", styles["corner-bl"])
    }), /* @__PURE__ */ jsx("div", {
      className: classNames("text-gray-800", {
        "opacity-0 group-hover:opacity-40": !active
      }, "transition-opacity duration-300", styles["corner-br"])
    })]
  });
}
function Navbar() {
  const {
    plugins
  } = useAppContext();
  return /* @__PURE__ */ jsxs(Toolbar.Root, {
    className: "relative flex flex-row items-center h-11 dark:bg-gray-900 dark:text-gray-200",
    children: [/* @__PURE__ */ jsx("div", {
      className: "w-[74px]"
    }), /* @__PURE__ */ jsxs("div", {
      className: "h-full flex-1 flex flex-row px-3 items-end",
      children: [/* @__PURE__ */ jsxs("ul", {
        className: "flex-1 flex flex-row items-end",
        children: [/* @__PURE__ */ jsxs(TabItem, {
          href: "/workspace",
          children: [/* @__PURE__ */ jsx(icons.HomeIcon, {}), /* @__PURE__ */ jsx("span", {
            className: "ml-2",
            children: "Workspace"
          })]
        }), plugins == null ? void 0 : plugins.map((plugin) => {
          if (!plugin.hasTabs)
            return;
          let Icon = icons[plugin._fuse.icon];
          return /* @__PURE__ */ jsxs(TabItem, {
            href: `/${plugin.url}`,
            children: [Icon && /* @__PURE__ */ jsx(Icon, {
              className: "mr-2"
            }), /* @__PURE__ */ jsx("span", {
              children: plugin.displayTitle
            })]
          }, `tab-${plugin.name}`);
        })]
      }), /* @__PURE__ */ jsxs("ul", {
        className: "flex flex-row items-end",
        children: [/* @__PURE__ */ jsx(TabItem, {
          href: "/marketplace",
          children: /* @__PURE__ */ jsx(icons.CubeIcon, {})
        }), /* @__PURE__ */ jsx(TabItem, {
          href: "/settings",
          children: /* @__PURE__ */ jsx(icons.GearIcon, {})
        })]
      })]
    })]
  });
}
function PluginListItem(_Ia) {
  var _Ja = _Ia, {
    plugin
  } = _Ja, props = __objRest(_Ja, [
    "plugin"
  ]);
  var _a, _b;
  function setPluginActive(name, activate) {
    if (activate) {
      coreSocket.emit("plugins:activate", name, (res) => {
        console.log("Activated:", res);
      });
    } else {
      coreSocket.emit("plugins:deactivate", name, (res) => {
        console.log("Deactivated:", res);
      });
    }
  }
  return /* @__PURE__ */ jsxs("li", {
    className: "flex flex-row items-stretch space-x-3 py-2",
    children: [/* @__PURE__ */ jsx("div", {
      className: "w-10 h-10 bg-gray-700 bg-opacity-25 rounded-full overflow-hidden"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col flex-1",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-row space-x-2 items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-gray-50",
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-bold",
            children: ((_a = plugin.fuse) == null ? void 0 : _a.title) || plugin.name
          }), plugin.author && /* @__PURE__ */ jsxs("span", {
            className: "text-xs text-gray-600 ml-1",
            children: [/* @__PURE__ */ jsx("span", {
              children: "by "
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs text-gray-500 font-medium",
              children: plugin.author
            })]
          })]
        }), plugin.system && /* @__PURE__ */ jsx(Badge, {
          size: "sm",
          className: "bg-blue-600",
          children: "SYSTEM"
        }), ((_b = plugin.fuse) == null ? void 0 : _b.type) == "driver" && /* @__PURE__ */ jsx(Badge, {
          size: "sm",
          className: "bg-amber-600 text-amber-50",
          children: "DRIVER"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-row items-center space-x-3",
        children: /* @__PURE__ */ jsx("div", {
          className: "text-xxs font-mono",
          children: /* @__PURE__ */ jsxs("span", {
            className: "rounded-[3px] bg-gray-800 px-1 py-0.5",
            children: [plugin.name, "@", plugin.version]
          })
        })
      })]
    }), plugin.settings && /* @__PURE__ */ jsx("div", {
      className: "w-20 flex items-center justify-center",
      children: /* @__PURE__ */ jsx(Link, {
        href: `/settings/plugins/${plugin.name}`,
        passHref: true,
        children: /* @__PURE__ */ jsx(Button, {
          rounded: true,
          squared: true,
          size: "sm",
          children: /* @__PURE__ */ jsx(GearIcon, {})
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "flex items-center",
      children: /* @__PURE__ */ jsx(SwitchRaw, {
        defaultChecked: plugin.active,
        disabled: plugin.system,
        onCheckedChange: (v) => setPluginActive(plugin.name, v)
      })
    })]
  });
}
function PluginsList(_Ka) {
  var _La = _Ka, {
    plugins
  } = _La, props = __objRest(_La, [
    "plugins"
  ]);
  return /* @__PURE__ */ jsx(Widget, {
    title: "Installed plugins",
    children: /* @__PURE__ */ jsx("ul", {
      className: "flex flex-col divide-y divide-gray-700",
      children: plugins == null ? void 0 : plugins.map((plugin, i) => /* @__PURE__ */ jsx(PluginListItem, {
        plugin
      }, `plugin-${i}`))
    })
  });
}
function SerialPortListItem({
  port
}) {
  const deviceDisplayText = useMemo$1((_) => {
    let text = "Unknown device";
    if (port.manufacturer) {
      text = port.manufacturer;
    } else if (port.vendorId) {
      text = "VENDOR";
      if (port.productId) {
        text = [text, "PRODUCT"].join(" ");
      }
    }
    return text;
  }, [port]);
  return /* @__PURE__ */ jsxs(List.Item, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex-1 flex flex-col",
      children: [/* @__PURE__ */ jsx("div", {
        className: "font-bold text-gray-200",
        children: deviceDisplayText
      }), /* @__PURE__ */ jsx("div", {
        className: "text-xs text-gray-400",
        children: port.path
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex items-center",
      children: /* @__PURE__ */ jsxs(Popover, {
        children: [/* @__PURE__ */ jsx(Popover.Trigger, {
          children: /* @__PURE__ */ jsx(Button, {
            squared: true,
            children: /* @__PURE__ */ jsx(InfoCircledIcon, {})
          })
        }), /* @__PURE__ */ jsx(Popover.Content, {
          align: "end",
          side: "bottom",
          sideOffset: 5,
          className: "min-w-[300px]",
          children: /* @__PURE__ */ jsxs(List, {
            size: "compact",
            className: "px-1",
            children: [/* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Manufacturer"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.manufacturer || "-"
                })]
              })
            }), /* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Serial number"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.serialNumber || "-"
                })]
              })
            }), /* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Vendor ID"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.vendorId || "-"
                })]
              })
            }), /* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Product ID"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.productId || "-"
                })]
              })
            }), /* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "Location ID"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.locationId || "-"
                })]
              })
            }), /* @__PURE__ */ jsx(List.Item, {
              children: /* @__PURE__ */ jsxs(Group, {
                className: "w-full justify-between",
                children: [/* @__PURE__ */ jsx(Label, {
                  children: "PNP ID"
                }), /* @__PURE__ */ jsx(Label, {
                  children: port.pnpId || "-"
                })]
              })
            })]
          })
        })]
      })
    })]
  });
}
function SerialPortListWidget() {
  const ports = useSerialPorts();
  return /* @__PURE__ */ jsx(Widget, {
    title: "Connected devices",
    children: /* @__PURE__ */ jsx(List, {
      children: ports == null ? void 0 : ports.map((port) => /* @__PURE__ */ jsx(SerialPortListItem, {
        port
      }, port.path))
    })
  });
}
function SettingsWidget(_Ma) {
  var _Na = _Ma, {
    className
  } = _Na, props = __objRest(_Na, [
    "className"
  ]);
  return /* @__PURE__ */ jsx("div", {
    className: classNames("relative", "flex flex-col items-stretch justify-start", "p-3", "space-y-2", "rounded-md", "overflow-hidden", "text-sm", "text-gray-900 dark:text-gray-200", "bg-gray-300 dark:bg-gray-900", className),
    children: props.children
  });
}
function InactivePluginView() {
  return /* @__PURE__ */ jsx(BlockingView, {
    children: /* @__PURE__ */ jsxs(Group, {
      orientation: "vertical",
      className: "items-center",
      children: [/* @__PURE__ */ jsx(LightningBoltIcon, {
        className: "w-20 h-20 text-gray-700"
      }), /* @__PURE__ */ jsx("span", {
        className: "font-bold text-gray-500",
        children: "Plugin not active"
      })]
    })
  });
}
function PrinterProfileForm(_Oa) {
  var props = __objRest(_Oa, []);
  return /* @__PURE__ */ jsxs(Form, {
    className: "grid grid-cols-2 gap-3",
    children: [/* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "brand",
        children: "Brand"
      }), /* @__PURE__ */ jsx(Input, {
        id: "brand"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "model",
        children: "Model"
      }), /* @__PURE__ */ jsx(Input, {
        id: "model"
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "form-factor",
        children: "Form factor"
      }), /* @__PURE__ */ jsx(Select, {
        id: "form-factor",
        options: ["rectangular", "circular"]
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "origin",
        children: "Origin"
      }), /* @__PURE__ */ jsx(Select, {
        id: "origin",
        options: ["lower-left", "center"]
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      className: "col-span-2",
      children: [/* @__PURE__ */ jsx(Label, {
        htmlFor: "heated-bed",
        children: "Heated bed"
      }), /* @__PURE__ */ jsx(Select, {
        id: "heated-bed",
        options: ["yes", "add-on"]
      })]
    }), /* @__PURE__ */ jsxs(Group, {
      orientation: "vertical",
      children: [/* @__PURE__ */ jsx(Label, {
        children: "Printing volume"
      }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "width",
          children: "Width"
        }), /* @__PURE__ */ jsx(Input, {
          id: "width"
        })]
      }), /* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "height",
          children: "Height"
        }), /* @__PURE__ */ jsx(Input, {
          id: "height"
        })]
      }), /* @__PURE__ */ jsxs(Group, {
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "depth",
          children: "Depth"
        }), /* @__PURE__ */ jsx(Input, {
          id: "depth"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-2",
      children: /* @__PURE__ */ jsx(Group, {
        className: "justify-end",
        children: /* @__PURE__ */ jsx(Button, {
          children: "Save"
        })
      })
    })]
  });
}
function EmptyView(_Pa) {
  var _Qa = _Pa, {
    text
  } = _Qa, props = __objRest(_Qa, [
    "text"
  ]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({}, props), {
    className: classNames("flex items-center justify-center", props.className),
    children: /* @__PURE__ */ jsxs("span", {
      className: "font-bold",
      children: [text, props.children]
    })
  }));
}
function FDMPrinterDeviceProfilePreview({
  profile
}) {
  var _a, _b, _c, _d, _e, _f;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(DisplayGroup, {
      label: "X (Width)",
      value: profile.volume.width
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Y (Depth)",
      value: profile.volume.depth
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Z (Height)",
      value: profile.volume.height
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Form factor",
      value: profile.volume.formFactor
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Heated bed",
      value: ((_a = profile.bed) == null ? void 0 : _a.heated) ? "Yes" : "No"
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Origin",
      value: profile.volume.origin
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "GCode version",
      value: profile.gCodeVersion
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Feedrate max X",
      value: (_b = profile.xAxis) == null ? void 0 : _b.maxSpeed
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Feedrate max Y",
      value: (_c = profile.yAxis) == null ? void 0 : _c.maxSpeed
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Feedrate max Z",
      value: (_d = profile.zAxis) == null ? void 0 : _d.maxSpeed
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Extruders",
      value: ((_e = profile.extruders) == null ? void 0 : _e.length) || 0
    }), (_f = profile.extruders) == null ? void 0 : _f.map((extruder, i) => /* @__PURE__ */ jsxs(Group, {
      orientation: "vertical",
      children: [/* @__PURE__ */ jsx(DisplayGroup, {
        label: "Nozzle diameter",
        value: extruder.nozzleDiameter
      }), /* @__PURE__ */ jsx(DisplayGroup, {
        label: "X offset",
        value: extruder.xOffset
      }), /* @__PURE__ */ jsx(DisplayGroup, {
        label: "Y offset",
        value: extruder.yOffset
      })]
    }, `extruder-${i}`))]
  });
}
function DeviceProfilePreview({
  profile
}) {
  if (!profile)
    return null;
  return /* @__PURE__ */ jsxs(Group, {
    orientation: "vertical",
    className: "text-sm",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-row items-center space-x-3 border-b border-gray-500 pb-2",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex-none w-[40px] h-[40px] flex items-center justify-center rounded-md bg-gray-600 text-gray-800 p-2",
        children: /* @__PURE__ */ jsx(FDMPrinterIcon, {
          className: "w-full h-full"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex-1 text-xl font-bold flex flex-col",
        children: [/* @__PURE__ */ jsxs("span", {
          className: "leading-1",
          children: [profile.brand, " ", profile.model]
        }), /* @__PURE__ */ jsx("span", {
          className: "text-sm text-gray-400",
          children: profile.id
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-none",
        children: /* @__PURE__ */ jsx(Button, {
          squared: true,
          children: /* @__PURE__ */ jsx(Pencil2Icon, {})
        })
      })]
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Brand",
      value: profile.brand
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Model",
      value: profile.model
    }), /* @__PURE__ */ jsx(DisplayGroup, {
      label: "Device type",
      value: profile.type
    }), /* @__PURE__ */ jsx(Separator, {}), profile.type == "fdm_printer" && /* @__PURE__ */ jsx(FDMPrinterDeviceProfilePreview, {
      profile
    })]
  });
}
function DeviceProfilesWidget() {
  const [selectedProfile, setSelectedProfile] = useState();
  return /* @__PURE__ */ jsx(Widget, {
    title: "Profiles",
    children: /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-2 gap-2",
      children: [/* @__PURE__ */ jsx(DeviceProfilesListManager, {
        className: "h-[400px]",
        onSelect: (k, profile) => setSelectedProfile(profile)
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-1",
        children: /* @__PURE__ */ jsx(DeviceProfilePreview, {
          profile: selectedProfile
        })
      })]
    })
  });
}
function SerialPortSelect(_Ra) {
  var props = __objRest(_Ra, []);
  const ports = [{
    label: "/dev/susb.001",
    value: "/dev/susb.001"
  }, {
    label: "/dev/susb.002",
    value: "/dev/susb.002"
  }];
  return /* @__PURE__ */ jsx(SelectRaw, __spreadValues({
    options: ports
  }, props));
}
function DeviceConnectionWidget() {
  const {
    device
  } = useDeviceContext();
  return /* @__PURE__ */ jsxs(Widget, {
    title: "Connection",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-2 gap-3",
      children: [/* @__PURE__ */ jsxs(Form, {
        initialValues: device,
        children: [/* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "serial-port",
            children: "Serial port"
          }), /* @__PURE__ */ jsx(SerialPortSelect, {
            name: "port",
            id: "serial-port"
          })]
        }), /* @__PURE__ */ jsxs(Group, {
          orientation: "vertical",
          children: [/* @__PURE__ */ jsx(Label, {
            htmlFor: "baud-rate",
            children: "Baud rate"
          }), /* @__PURE__ */ jsx(BaudRateSelect, {
            name: "baudrate",
            id: "baud-rate"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsxs(Group, {
        className: "grid grid-cols-2",
        children: [/* @__PURE__ */ jsx(Button, {
          children: "Test connection"
        }), /* @__PURE__ */ jsx(Button, {
          children: "Save"
        })]
      })]
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs(Group, {
        className: "justify-between",
        children: [/* @__PURE__ */ jsx(Label, {
          htmlFor: "auto-connect",
          children: "Automatically connect on startup"
        }), /* @__PURE__ */ jsx(SwitchRaw, {
          id: "auto-connect"
        })]
      })
    })]
  });
}
function MainLayout(props) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("div", {
      className: "flex-1 overflow-hidden",
      children: props.children
    })]
  });
}
function Page(props) {
  return /* @__PURE__ */ jsx(MainLayout, {
    children: /* @__PURE__ */ jsx(ScrollArea, {
      className: "flex-1 h-full",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-col space-y-2",
        children: props.children
      })
    })
  });
}
function PageTopBar(props) {
  return /* @__PURE__ */ jsx("div", {
    className: "h-10 flex flex-row space-x-2 items-center text-gray-50 font-medium text-sm mx-1.5 px-1.5 py-2 border-b border-gray-700",
    children: props.children
  });
}
function DevicePageSidebar() {
  const {
    activePlugins
  } = useAppContext();
  const {
    device
  } = useDeviceContext();
  return /* @__PURE__ */ jsx("div", {
    className: "flex-none dark:bg-gray-900 dark:text-gray-200 rounded-lg m-2 mr-0 w-20 flex flex-col items-center justify-center",
    children: /* @__PURE__ */ jsxs(SidebarMenu, {
      children: [/* @__PURE__ */ jsx(Tooltip, {
        content: "Dashboard",
        side: "right",
        sideOffset: 10,
        children: /* @__PURE__ */ jsx(SidebarMenuItem, {
          icon: icons.DashboardIcon,
          href: `/workspace/devices/${device.id}/`
        })
      }), activePlugins == null ? void 0 : activePlugins.map((plugin) => {
        var _a;
        if (!((_a = plugin.deviceTypes) == null ? void 0 : _a.includes(device.profile.type)))
          return;
        if (!plugin.hasPages)
          return;
        let icon = icons[plugin._fuse.icon] || icons.QuestionMarkIcon;
        let href = `/workspace/devices/${device.id}/` + plugin.url;
        return /* @__PURE__ */ jsx(Tooltip, {
          content: plugin._fuse.tooltip || plugin.title || plugin.name,
          side: "right",
          sideOffset: 10,
          children: /* @__PURE__ */ jsx(SidebarMenuItem, {
            icon,
            href
          })
        }, plugin.name);
      })]
    })
  });
}
function SidebarMenu(props) {
  return /* @__PURE__ */ jsx("ul", {
    className: "flex flex-col space-y-10 rounded-md",
    children: props.children
  });
}
const SidebarMenuItem = React__default.forwardRef((_Sa, ref) => {
  var _Ta = _Sa, {
    icon: Icon,
    iconClassName,
    href
  } = _Ta, props = __objRest(_Ta, [
    "icon",
    "iconClassName",
    "href"
  ]);
  const contents = /* @__PURE__ */ jsxs(Fragment, {
    children: [Icon && /* @__PURE__ */ jsx(Icon, {
      className: classNames("w-5 h-5", iconClassName)
    }), props.children]
  });
  return /* @__PURE__ */ jsx("li", __spreadProps(__spreadValues({
    ref,
    className: "flex items-center justify-center"
  }, props), {
    children: href ? /* @__PURE__ */ jsx(Link, {
      href,
      children: /* @__PURE__ */ jsx("a", {
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
  } = _Va, props = __objRest(_Va, [
    "device",
    "open"
  ]);
  return /* @__PURE__ */ jsxs("div", __spreadProps(__spreadValues({
    ref
  }, props), {
    className: classNames("relative", "group", "cursor-pointer", "select-none", "flex flex-row space-x-2 items-center", "rounded-sm", "ring-[3px]", {
      "bg-transparent ring-transparent": !open,
      "hover:ring-gray-700 hover:bg-gray-700": !open,
      "bg-gray-700 ring-gray-700": open
    }, "pl-[3px] ml-[-3px]", "transition-all duration-300"),
    children: [/* @__PURE__ */ jsx(DeviceTypeIcon, {
      device
    }), /* @__PURE__ */ jsx("span", {
      children: device.name
    }), /* @__PURE__ */ jsx("span", {
      className: "text-gray-500",
      children: "\u2022"
    }), /* @__PURE__ */ jsxs("span", {
      className: "text-xxs text-gray-500",
      children: [device.profile.brand, " ", device.profile.model]
    }), /* @__PURE__ */ jsx("div", {
      className: classNames("absolute right-0", "bg-gray-700", "pl-1", {
        "opacity-0 group-hover:opacity-100 duration-300": !open
      }),
      children: /* @__PURE__ */ jsx(CaretDownIcon, {})
    })]
  }));
});
DevicePickerTrigger.displayName = "DevicePickerTrigger";
function DevicePicker({
  devices
}) {
  const router$12 = router.useRouter();
  const {
    device
  } = useDeviceContext();
  const [open, setOpen] = useState(false);
  const triggerEl = useRef();
  const [width, setWidth] = useState("auto");
  useEffect((_) => {
    setWidth(triggerEl.current.offsetWidth + 3 + 3);
  }, [open]);
  function handleDeviceClick(device2) {
    setOpen(false);
    router$12.push(`/workspace/devices/${device2.id}`);
  }
  return /* @__PURE__ */ jsxs(PopoverPrimitive.Root, {
    open,
    onOpenChange: setOpen,
    children: [/* @__PURE__ */ jsx(PopoverPrimitive.Trigger, {
      asChild: true,
      children: /* @__PURE__ */ jsx(DevicePickerTrigger, {
        device,
        open,
        ref: triggerEl
      })
    }), /* @__PURE__ */ jsx(PopoverPrimitive.Content, {
      className: classNames("w-full", "flex flex-col items-start", "bg-gray-300 dark:bg-gray-700", "shadow-md shadow-gray-900", "p-1", "focus:outline-none", "rounded-md"),
      style: {
        minWidth: width
      },
      sideOffset: 6,
      align: "start",
      alignOffset: -3,
      children: devices == null ? void 0 : devices.map((device2) => {
        return /* @__PURE__ */ jsxs("li", {
          className: classNames("cursor-pointer select-none", "flex flex-row space-x-1 items-center", "text-sm font-medium", "py-0.5 px-1", "w-full", "rounded-[4px]", "transition-colors duration-75", "cursor-default", "text-gray-800 dark:text-gray-300", "hover:text-gray-50 hover:bg-blue-600", "group", "flex-nowrap truncate"),
          onClick: (_) => handleDeviceClick(device2),
          children: [/* @__PURE__ */ jsx(DeviceTypeIcon, {
            device: device2
          }), /* @__PURE__ */ jsx("span", {
            children: device2.name
          }), /* @__PURE__ */ jsx("span", {
            className: "text-gray-500 group-hover:text-gray-300",
            children: "\u2022"
          }), /* @__PURE__ */ jsxs("span", {
            className: "text-xxs text-gray-500 group-hover:text-gray-300 truncate flex-1",
            children: [device2.profile.brand, " ", device2.profile.model]
          }), /* @__PURE__ */ jsx(Separator, {
            orientation: "vertical",
            className: "!border-gray-500 pl-2"
          }), /* @__PURE__ */ jsx("div", {
            className: "pl-1",
            children: /* @__PURE__ */ jsx(DeviceConnectionStatus, {
              device: device2
            })
          })]
        }, `device-${device2.id}`);
      })
    })]
  });
}
function DevicePageTopBarMenu() {
  const {
    device
  } = useDeviceContext();
  const [editDevice, setEditDevice] = useState();
  const [removeDevice, setRemoveDevice] = useState();
  function handleEdit() {
    setEditDevice(true);
  }
  function handleDelete() {
    setRemoveDevice(true);
  }
  function handleDeleteConfirm() {
    coreSocket.emit("devices:remove", device.id, (deviceData) => {
      console.log("Removed device");
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(DropdownMenu, {
      items: [{
        label: "Disconnect",
        icon: LinkBreak2Icon
      }, "-", {
        label: "Edit",
        icon: Pencil1Icon,
        action: handleEdit
      }, {
        label: "Remove",
        icon: TrashIcon,
        action: handleDelete
      }],
      children: /* @__PURE__ */ jsx(Button, {
        size: "sm",
        mode: "ghost",
        squared: true,
        children: /* @__PURE__ */ jsx(DotsHorizontalIcon, {})
      })
    }), /* @__PURE__ */ jsx(Dialog, {
      content: /* @__PURE__ */ jsx(DeviceForm, {
        device
      }),
      open: editDevice,
      onOpenChange: setEditDevice
    }), /* @__PURE__ */ jsx(ConfirmDialog, {
      open: removeDevice,
      onOpenChange: setRemoveDevice,
      title: "Remove device?",
      content: /* @__PURE__ */ jsxs("span", {
        children: ["Are you sure you want to remove ", /* @__PURE__ */ jsx("strong", {
          children: device.name
        }), " ?"]
      }),
      onConfirm: handleDeleteConfirm
    })]
  });
}
const DeviceStatusListContext = React__default.createContext();
function useDeviceStatusListContext() {
  const ctx = React__default.useContext(DeviceStatusListContext);
  if (!ctx)
    throw new Error("useDeviceStatusListContext can only be used inside DeviceStatusListProvider");
  return ctx;
}
function DeviceStatusListProvider(props) {
  const [statusList, setStatusList] = useState([]);
  function addStatus(message, opts) {
    let statusObj = __spreadValues({
      id: Date.now(),
      message,
      date: Date.now(),
      type: "normal"
    }, opts);
    setStatusList((prev) => {
      return [...prev, statusObj];
    });
    return statusObj;
  }
  function removeStatus(id) {
    setStatusList((prev) => prev.filter((s) => s.id != id));
  }
  return /* @__PURE__ */ jsx(DeviceStatusListContext.Provider, {
    value: {
      statusList,
      addStatus,
      removeStatus
    },
    children: props.children
  });
}
function DeviceStatusList() {
  const {
    statusList
  } = useDeviceStatusListContext();
  if (!statusList.length)
    return null;
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-1",
    children: /* @__PURE__ */ jsx(DeviceStatusItem, {
      status: statusList[0]
    })
  });
}
function DeviceStatusItem(_Wa) {
  var _Xa = _Wa, {
    status
  } = _Xa, props = __objRest(_Xa, [
    "status"
  ]);
  let Icon = useMemo$1((_) => {
    if (status.icon)
      return status.icon;
    switch (status.type) {
      case "error":
        return CrossCircledIcon;
      case "warning":
        return ExclamationTriangleIcon;
      case "success":
        return CheckCircledIcon;
      default:
        return InfoCircledIcon;
    }
  }, [status]);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex-1 flex flex-row space-x-1.5 items-center",
    children: [/* @__PURE__ */ jsx(Icon, {
      className: classNames("w-3 h-3", {
        "text-red-300": status.type == "error",
        "text-orange-400": status.type == "warning",
        "text-green-400": status.type == "success",
        "text-blue-400": status.type == "normal"
      })
    }), /* @__PURE__ */ jsx("span", {
      className: classNames({
        "text-red-400": status.type == "error",
        "text-orange-200": status.type == "warning",
        "text-green-200": status.type == "success",
        "text-gray-300": status.type == "normal"
      }),
      children: status.message
    })]
  });
}
var isArray$3 = Array.isArray;
var isArray_1 = isArray$3;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$3 = freeGlobal || freeSelf || Function("return this")();
var _root = root$3;
var root$2 = _root;
var Symbol$4 = root$2.Symbol;
var _Symbol = Symbol$4;
var Symbol$3 = _Symbol;
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var nativeObjectToString$1 = objectProto$4.toString;
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
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
var _getRawTag = getRawTag$1;
var objectProto$3 = Object.prototype;
var nativeObjectToString = objectProto$3.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$2 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag$2(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$2;
function isObjectLike$1(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$1;
var baseGetTag$1 = _baseGetTag, isObjectLike = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$3(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag$1(value) == symbolTag;
}
var isSymbol_1 = isSymbol$3;
var isArray$2 = isArray_1, isSymbol$2 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$1(value, object) {
  if (isArray$2(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$1;
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$2;
var baseGetTag = _baseGetTag, isObject$1 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$1;
var root$1 = _root;
var coreJsData$1 = root$1["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$1;
var isFunction = isFunction_1, isMasked = _isMasked, isObject = isObject_1, toSource = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$1(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$2(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$2;
var getNative$1 = _getNative;
var nativeCreate$4 = getNative$1(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$1(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$1;
var eq = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
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
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$1.prototype.clear = listCacheClear;
ListCache$1.prototype["delete"] = listCacheDelete;
ListCache$1.prototype.get = listCacheGet;
ListCache$1.prototype.has = listCacheHas;
ListCache$1.prototype.set = listCacheSet;
var _ListCache = ListCache$1;
var getNative = _getNative, root = _root;
var Map$2 = getNative(root, "Map");
var _Map = Map$2;
var Hash = _Hash, ListCache = _ListCache, Map$1 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype["delete"] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;
var _MapCache = MapCache$1;
var MapCache = _MapCache;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}
memoize$1.Cache = MapCache;
var memoize_1 = memoize$1;
var memoize = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match2, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
  });
  return result;
});
var _stringToPath = stringToPath$1;
function arrayMap$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$1;
var Symbol$1 = _Symbol, arrayMap = _arrayMap, isArray$1 = isArray_1, isSymbol$1 = isSymbol_1;
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
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
function toString$1(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$1;
var isArray = isArray_1, isKey = _isKey, stringToPath = _stringToPath, toString = toString_1;
function castPath$1(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}
var _castPath = castPath$1;
var isSymbol = isSymbol_1;
var INFINITY = 1 / 0;
function toKey$1(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey = toKey$1;
var castPath = _castPath, toKey = _toKey;
function baseGet$1(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var _baseGet = baseGet$1;
var baseGet = _baseGet;
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get;
function useDeviceComponents(device, keyPath) {
  return useMemo$1((_) => {
    var _a;
    return (_a = device == null ? void 0 : device.plugins) == null ? void 0 : _a.map((plugin) => {
      if (typeof plugin.deviceComponents === "function") {
        let components = plugin.deviceComponents(device);
        return get_1(components, keyPath, false);
      }
    }).filter(Boolean);
  }, [device, keyPath]);
}
function DevicePageTopBar() {
  const {
    devices
  } = useAppContext();
  const {
    device
  } = useDeviceContext();
  const pluginComponents = useDeviceComponents(device, "page.topBar");
  return /* @__PURE__ */ jsxs(PageTopBar, {
    children: [/* @__PURE__ */ jsx(DevicePicker, {
      devices
    }), /* @__PURE__ */ jsx("div", {
      className: "w-px h-full bg-gray-600"
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-1 text-xxs font-bold text-gray-400",
      children: /* @__PURE__ */ jsx(DeviceStatusList, {})
    }), (pluginComponents == null ? void 0 : pluginComponents.length) > 0 && /* @__PURE__ */ jsx(Separator, {
      orientation: "vertical"
    }), pluginComponents == null ? void 0 : pluginComponents.map((PluginComponent) => /* @__PURE__ */ jsx(PluginComponent, {}, `device-plg-comp-${generateUniqueID()}`)), /* @__PURE__ */ jsx(Separator, {
      orientation: "vertical"
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(DeviceConnectionStatus, {
        device
      })
    }), /* @__PURE__ */ jsx(Separator, {
      orientation: "vertical"
    }), /* @__PURE__ */ jsx("div", {
      className: "relative",
      children: /* @__PURE__ */ jsx(DevicePageTopBarMenu, {})
    })]
  });
}
function DevicePage(_Ya) {
  var _Za = _Ya, {
    device
  } = _Za, props = __objRest(_Za, [
    "device"
  ]);
  if (!device) {
    throw new Error("DevicePage requires a device");
  }
  return /* @__PURE__ */ jsx(MainLayout, {
    children: /* @__PURE__ */ jsx(DeviceProvider, {
      device,
      children: /* @__PURE__ */ jsx(DeviceStatusListProvider, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "w-full h-full flex flex-col",
          children: [/* @__PURE__ */ jsx(DevicePageTopBar, {
            device
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex-1 flex flex-row overflow-hidden",
            children: [/* @__PURE__ */ jsx(DevicePageSidebar, {}), /* @__PURE__ */ jsx(ScrollArea, {
              className: "flex-1",
              children: /* @__PURE__ */ jsx("div", {
                className: "p-2 pr-3 flex flex-col space-y-3",
                children: props.children
              })
            })]
          })]
        })
      })
    })
  });
}
function PrinterDevicePage(__a) {
  var _$a = __a, {
    children
  } = _$a, props = __objRest(_$a, [
    "children"
  ]);
  return /* @__PURE__ */ jsx(DevicePage, __spreadProps(__spreadValues({}, props), {
    children
  }));
}
function CNCDevicePage(_ab) {
  var _bb = _ab, {
    children
  } = _bb, props = __objRest(_bb, [
    "children"
  ]);
  return /* @__PURE__ */ jsx(DevicePage, __spreadProps(__spreadValues({}, props), {
    children
  }));
}
function MenuItem(_cb) {
  var _db = _cb, {
    href
  } = _db, props = __objRest(_db, [
    "href"
  ]);
  const router$12 = router.useRouter();
  const active = useMemo$1((_) => router$12.pathname.startsWith(href), [href, router$12.pathname]);
  return /* @__PURE__ */ jsx("li", {
    className: classNames("rounded-md text-sm font-medium", "transition-colors duration-150", {
      "hover:bg-gray-800 hover:bg-opacity-40": !active,
      "bg-blue-600": active
    }),
    children: href ? /* @__PURE__ */ jsx(Link, {
      href,
      passHref: true,
      children: /* @__PURE__ */ jsx("a", {
        className: "block px-2 py-1 w-full h-full",
        children: props.children
      })
    }) : props.children
  });
}
function SettingPage(props) {
  return /* @__PURE__ */ jsx(MainLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex-1 h-full flex flex-row",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex-none py-2 pl-2",
        children: [/* @__PURE__ */ jsx("div", {
          className: classNames("dark:bg-gray-900 dark:text-gray-200", "w-44", "rounded-lg", "flex flex-col", "py-2"),
          children: /* @__PURE__ */ jsxs("ul", {
            className: "px-2 flex flex-col space-y-1",
            children: [/* @__PURE__ */ jsx(MenuItem, {
              href: "/settings/general",
              children: "General"
            }), /* @__PURE__ */ jsx(MenuItem, {
              href: "/settings/devices",
              children: "Devices"
            }), /* @__PURE__ */ jsx(MenuItem, {
              href: "/settings/plugins",
              children: "Plugins"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "text-xs font-bold text-center py-1 text-gray-600",
          children: "v. 0.1"
        })]
      }), /* @__PURE__ */ jsx(ScrollArea, {
        className: "flex-1 max-w-screen-lg",
        children: /* @__PURE__ */ jsx("div", {
          className: "p-2 flex flex-col space-y-3",
          children: props.children
        })
      })]
    })
  });
}
function getDevicePageComponent(deviceType) {
  switch (deviceType) {
    case "fdm_printer":
      return PrinterDevicePage;
    case "cnc":
      return CNCDevicePage;
    default:
      return DevicePage;
  }
}
export { AddDeviceWizard, AppLoader, Badge, BlockingView, Button, CNCDevicePage, CNCIcon, Checkbox, CheckboxRaw, CompactList, ConfirmDialog, ContextMenu, DeviceCard, DeviceConnectionStatus, DeviceConnectionWidget, DeviceForm, DevicePage, DevicePluginsSettingsWidget, DeviceProfilesWidget, DeviceTypeIcon, DevicesGrid, Dialog, DisplayGroup, DisplayLabel, DisplayValue, DropdownMenu, EmptyView, FDMPrinterIcon, Form, Group, InactivePluginView, Input, InputRaw, Label, LaserIcon, List, Loader, MSLAPrinterIcon, MainLayout, Navbar, Page, PageTopBar, PluginsList, Popover, PrinterDevicePage, PrinterProfileForm, Progress, ScrollArea, Select, SelectRaw, Separator, SerialPortListWidget, SettingPage, SettingsWidget, Slider, Switch, SwitchRaw, Table, ToggleGroup, Tooltip, Widget, getDevicePageComponent, useDeviceComponents, useDeviceStatusListContext };
