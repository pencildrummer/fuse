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
import { useRouter } from "next/router";
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
      className: "fixed inset-0 bg-black/70 z-40"
    }), /* @__PURE__ */ jsx(DialogPrimitive.Content, {
      className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
      children: /* @__PURE__ */ jsxs(Widget, {
        className: classNames("w-[90vw] max-h-[85vh]", "ring-1 ring-white/20", className),
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
function TabItem(_Ga) {
  var _Ha = _Ga, {
    href
  } = _Ha, props = __objRest(_Ha, [
    "href"
  ]);
  const router = useRouter();
  const active = useMemo$1((_) => router == null ? void 0 : router.asPath.startsWith(href), [href, router]);
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
          let pluginComponents = plugin.components();
          if (pluginComponents.tab) {
            let Icon = icons[plugin.icon];
            return /* @__PURE__ */ jsxs(TabItem, {
              href: `/${plugin.url}`,
              children: [Icon && /* @__PURE__ */ jsx(Icon, {
                className: "mr-2"
              }), /* @__PURE__ */ jsx("span", {
                children: plugin.displayTitle
              })]
            }, `tab-${plugin.name}`);
          }
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
        var _a, _b;
        if (!((_a = plugin.deviceTypes) == null ? void 0 : _a.includes(device.profile.type)))
          return;
        let pluginComponents = plugin.deviceComponents(device);
        console.log(plugin, plugin.deviceComponents());
        let PluginPageComponent = (_b = pluginComponents.page) == null ? void 0 : _b.plugin;
        if (!PluginPageComponent)
          return null;
        let href = `/workspace/devices/${device.id}/` + plugin.url;
        return /* @__PURE__ */ jsx(Tooltip, {
          content: plugin.title || plugin.name,
          side: "right",
          sideOffset: 10,
          children: /* @__PURE__ */ jsx(SidebarMenuItem, {
            icon: plugin.icon,
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
  const router = useRouter();
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
    router.push(`/workspace/devices/${device2.id}`);
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
var isArray = Array.isArray;
var isArray$1 = isArray;
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
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
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
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
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
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
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
var hasOwnProperty = objectProto.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
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
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
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
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root$1, "Map");
var Map$1 = Map;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
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
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
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
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath$1 = stringToPath;
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}
var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
function useDeviceComponents(device, keyPath) {
  return useMemo$1((_) => {
    var _a;
    return (_a = device == null ? void 0 : device.plugins) == null ? void 0 : _a.map((plugin) => {
      if (typeof plugin.deviceComponents === "function") {
        let components = plugin.deviceComponents(device);
        return get(components, keyPath, false);
      }
    }).filter(Boolean);
  }, [device, keyPath]);
}
function usePluginComponents(plugin, keyPath) {
  return useMemo$1((_) => {
    let components = plugin.components();
    return get(components, keyPath, false);
  }, [plugin, keyPath]);
}
function useDevicePluginComponents(device, plugin, keyPath) {
  return useMemo$1((_) => {
    var _a;
    let devicePlugin = (_a = device == null ? void 0 : device.plugins) == null ? void 0 : _a.find((p2) => p2.name === plugin.name);
    if (!devicePlugin)
      return null;
    if (typeof devicePlugin.deviceComponents === "function") {
      let components = devicePlugin.deviceComponents(device);
      return get(components, keyPath, false);
    }
    return null;
  }, [device, plugin, keyPath]);
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
  const router = useRouter();
  const active = useMemo$1((_) => router.pathname.startsWith(href), [href, router.pathname]);
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
export { AddDeviceWizard, AppLoader, Badge, BlockingView, Button, CNCDevicePage, CNCIcon, Checkbox, CheckboxRaw, CompactList, ConfirmDialog, ContextMenu, DeviceCard, DeviceConnectionStatus, DeviceConnectionWidget, DeviceForm, DevicePage, DevicePluginsSettingsWidget, DeviceProfilesWidget, DeviceTypeIcon, DevicesGrid, Dialog, DisplayGroup, DisplayLabel, DisplayValue, DropdownMenu, EmptyView, FDMPrinterIcon, Form, Group, InactivePluginView, Input, InputRaw, Label, LaserIcon, List, Loader, MSLAPrinterIcon, MainLayout, Navbar, Page, PageTopBar, PluginsList, Popover, PrinterDevicePage, PrinterProfileForm, Progress, ScrollArea, Select, SelectRaw, Separator, SerialPortListWidget, SettingPage, SettingsWidget, Slider, Switch, SwitchRaw, Table, ToggleGroup, Tooltip, Widget, getDevicePageComponent, useDeviceComponents, useDevicePluginComponents, useDeviceStatusListContext, usePluginComponents };
