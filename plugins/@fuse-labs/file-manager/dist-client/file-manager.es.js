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
import { coreSocket, usePlugin, useDeviceContext, ClientPlugin } from "@fuse-labs/core-client";
import { ChevronDownIcon, ChevronRightIcon, FileIcon, DownloadIcon, TrashIcon, Share2Icon, DotsVerticalIcon, Cross2Icon, FilePlusIcon, CardStackIcon } from "@radix-ui/react-icons";
import require$$0, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { List, Separator, Button, ContextMenu, Widget, ScrollArea, Group, Progress } from "@fuse-labs/core-ui";
import classNames from "classnames";
import filesize from "filesize";
import { useIntl } from "react-intl";
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
const FileManagerContext = require$$0.createContext();
FileManagerContext.Consumer;
function useFileManagerContext() {
  const ctx = useContext(FileManagerContext);
  if (!ctx)
    throw new Error("useFileManagerContext cannot be used oustide FileManagerProvider");
  return ctx;
}
function FileManagerProvider(props) {
  const [file, setFile] = useState();
  const [focusItemPath, setFocusItemPath] = useState();
  const [pendingFiles, setPendingFiles] = useState([]);
  useEffect((_) => {
    let listener = (file2) => {
      console.log("Added file", file2);
    };
    coreSocket.on("file:added", listener);
    return (_2) => coreSocket.off("file:added", listener);
  }, []);
  return /* @__PURE__ */ jsx(FileManagerContext.Provider, {
    value: {
      file,
      setFile,
      focusItemPath,
      setFocusItemPath,
      pendingFiles,
      setPendingFiles
    },
    children: props.children
  });
}
function DirectoryItem(_a) {
  var _b = _a, {
    dirname,
    item
  } = _b, props = __objRest(_b, [
    "dirname",
    "item"
  ]);
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen((o) => !o);
  }
  const {
    focusItemPath
  } = useFileManagerContext();
  const isFocused = useMemo((_) => item.path == focusItemPath, [focusItemPath, item]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(List.Item, __spreadProps(__spreadValues({}, props), {
      className: classNames("px-0.5 font-bold rounded-md", "hover:bg-white hover:bg-opacity-5 transition-colors duration-150 cursor-pointer", {
        "opacity-50": item.name[0] == ".",
        "ring-2 ring-inset ring-blue-600": isFocused
      }),
      onClick: handleClick,
      children: [isOpen ? /* @__PURE__ */ jsx(ChevronDownIcon, {
        className: "text-gray-200"
      }) : /* @__PURE__ */ jsx(ChevronRightIcon, {
        className: "text-gray-200"
      }), /* @__PURE__ */ jsx("span", {
        className: "select-none",
        children: item.name
      })]
    })), isOpen && /* @__PURE__ */ jsx("div", {
      className: "pl-4",
      children: /* @__PURE__ */ jsx(DirectoryListing, {
        path: item.path
      })
    })]
  });
}
function FileItem(_c) {
  var _d = _c, {
    item,
    selected,
    selectable = true,
    onSelect
  } = _d, props = __objRest(_d, [
    "item",
    "selected",
    "selectable",
    "onSelect"
  ]);
  const {
    focusItemPath
  } = useFileManagerContext();
  const isFocused = useMemo((_) => item.path == focusItemPath, [item, focusItemPath]);
  return /* @__PURE__ */ jsxs(List.Item, __spreadProps(__spreadValues({}, props), {
    className: classNames("px-0.5 font-semibold rounded-md transition-colors duration-150", {
      "cursor-pointer": selectable,
      "hover:bg-white hover:bg-opacity-5": !selected,
      "bg-blue-700 text-gray-50": selected,
      "opacity-50": item.name[0] == ".",
      "ring-2 ring-inset ring-blue-600": isFocused && !selected,
      "ring-2 ring-inset ring-white": isFocused && selected
    }),
    onClick: (_) => onSelect(item),
    children: [/* @__PURE__ */ jsx(FileIcon, {
      className: "pointer-events-none text-gray-300"
    }), /* @__PURE__ */ jsx("span", {
      className: "pointer-events-none",
      children: item.name
    })]
  }));
}
function DirectoryListing(_e) {
  var _f = _e, {
    path = ".",
    selectedItem,
    onSelect
  } = _f, props = __objRest(_f, [
    "path",
    "selectedItem",
    "onSelect"
  ]);
  const plugin = usePlugin("@fuse-labs/file-manager");
  const {
    file,
    setFile
  } = useFileManagerContext();
  const [items, setItems] = useState([]);
  function readDir() {
    plugin.socket.emit("dir:list", {
      path
    }, (data) => {
      setItems(data);
    });
  }
  function cleanPath(path2) {
    return path2.slice(path2.length - 1) == "/" ? path2.slice(0, -1) : path2;
  }
  useEffect((_) => {
    readDir();
    const fileAddedListener = (file2) => {
      let dirname = file2.relativePath.match(/.*\//)[0] || ".";
      if (cleanPath(path) == cleanPath(dirname)) {
        readDir();
      }
    };
    plugin.socket.on("file:added", fileAddedListener);
    return (_2) => {
      plugin.socket.off("file:added", fileAddedListener);
    };
  }, []);
  return /* @__PURE__ */ jsx(List, {
    className: "text-gray-400 text-xs",
    divide: false,
    size: "compact",
    children: items == null ? void 0 : items.map((item, i) => {
      return item.isDir ? /* @__PURE__ */ jsx(DirectoryItem, {
        "data-path": item.path,
        dirname: path,
        item
      }, `list-item-${i}`) : /* @__PURE__ */ jsx(FileItem, {
        "data-path": item.path,
        item,
        onSelect: setFile,
        selected: item.path == (file == null ? void 0 : file.path)
      }, `list-item-${i}`);
    })
  });
}
function FileBanner(_g) {
  var _h = _g, {
    file,
    className
  } = _h, props = __objRest(_h, [
    "file",
    "className"
  ]);
  return /* @__PURE__ */ jsxs("div", {
    className: classNames("p-1 rounded-lg bg-gray-700", "flex flex-col space-y-1", className),
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-row space-x-3 px-1",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-sm font-semibold",
        children: [file.name, ".", file.ext]
      })
    }), /* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row",
      children: [/* @__PURE__ */ jsx(Button, {
        size: "sm",
        children: "Print"
      }), /* @__PURE__ */ jsx(Button, {
        size: "sm",
        children: "Action 2"
      }), /* @__PURE__ */ jsx(Button, {
        size: "sm",
        children: "Action 3"
      })]
    })]
  });
}
function FileManagerWidgetContextMenu(_i) {
  var _j = _i, {
    onAction
  } = _j, props = __objRest(_j, [
    "onAction"
  ]);
  const {
    focusItemPath,
    setFocusItemPath
  } = useFileManagerContext();
  function handlePointerDown(e) {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    let itemPath = (_a = e.target.dataset) == null ? void 0 : _a.path;
    if (!itemPath)
      return console.warn("Unable to get path for context clicked item");
    setFocusItemPath(itemPath);
  }
  function handlePointerDownOutside(e) {
    setFocusItemPath();
  }
  function handleSave() {
    console.log("Handle save", focusItemPath);
    onAction == null ? void 0 : onAction("save", {
      path: focusItemPath
    });
  }
  function handleDelete() {
    console.log("Handle delete", focusItemPath);
    onAction == null ? void 0 : onAction("delete", {
      path: focusItemPath
    });
  }
  function handlePrintGCode() {
    onAction == null ? void 0 : onAction("print", {
      path: focusItemPath
    });
  }
  const defaultItems = [{
    label: "Save",
    icon: DownloadIcon,
    action: handleSave
  }, {
    label: "Delete",
    icon: TrashIcon,
    detail: "\u232B",
    action: handleDelete
  }, {
    label: "Share",
    icon: Share2Icon,
    items: [{
      label: "Copy"
    }, {
      label: "Move"
    }]
  }];
  let items = useMemo((_) => {
    let items2 = [...defaultItems];
    let actions = [];
    if ((focusItemPath == null ? void 0 : focusItemPath.split(".").pop()) == "gcode") {
      actions.push({
        label: "Print",
        action: handlePrintGCode
      });
    }
    if (actions.length) {
      items2 = items2.concat("-", actions);
    }
    return items2;
  }, [focusItemPath]);
  return /* @__PURE__ */ jsx(ContextMenu, {
    modal: false,
    items,
    onPointerDown: handlePointerDown,
    onPointerDownOutside: handlePointerDownOutside,
    children: props.children
  });
}
function FileManagerWidget(_k) {
  var _l = _k, {
    onFileAction
  } = _l, props = __objRest(_l, [
    "onFileAction"
  ]);
  const [selectedFile, setSelectedFile] = useState();
  function handleFileAction(action, args) {
    onFileAction == null ? void 0 : onFileAction(action, args);
  }
  return /* @__PURE__ */ jsx(Widget, {
    title: "Files",
    children: /* @__PURE__ */ jsx(FileManagerProvider, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "h-72 flex flex-col",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-row text-xs font-bold text-gray-400 bg-black bg-opacity-60 space-x-1 py-1 px-0.5 rounded-md",
          children: [/* @__PURE__ */ jsx(DotsVerticalIcon, {}), /* @__PURE__ */ jsx("span", {
            children: "Resources"
          })]
        }), /* @__PURE__ */ jsx(ScrollArea, {
          className: "flex-1 overflow-hidden",
          children: /* @__PURE__ */ jsx(FileManagerWidgetContextMenu, {
            onAction: handleFileAction,
            children: /* @__PURE__ */ jsx(DirectoryListing, {
              path: "storage",
              selectedItem: selectedFile,
              onSelect: (item) => item.type == "file" && setSelectedFile(item)
            })
          })
        }), selectedFile && /* @__PURE__ */ jsx(FileBanner, {
          file: selectedFile,
          className: "mt-2"
        })]
      })
    })
  });
}
function DeviceFileManagerWidget() {
  const {
    device
  } = useDeviceContext();
  function handleFileAction(action, args) {
    if (action == "print") {
      handlePrint(args.path);
      return true;
    } else {
      return false;
    }
  }
  function handlePrint(path) {
    console.log("PRINTING", path);
    device.sockets.fuseLabs.marlinCore.emit("print:file", path, (res) => {
      console.log("Result", res);
    });
  }
  return /* @__PURE__ */ jsx(FileManagerWidget, {
    onFileAction: handleFileAction
  });
}
function PendingFilesList() {
  const {
    pendingFiles
  } = useFileManagerContext();
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col space-y-1",
    children: pendingFiles == null ? void 0 : pendingFiles.map((file) => /* @__PURE__ */ jsx(PendingFileListItem, {
      file
    }, `file-${file.name}`))
  });
}
function PendingFileListItem({
  file
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-gray-800 rounded-t-md rounded-b-sm text-gray-400 overflow-hidden pb-0",
    children: [/* @__PURE__ */ jsxs(Group, {
      className: "p-2",
      children: [/* @__PURE__ */ jsx("span", {
        className: "font-bold text-xs truncate",
        children: file.name
      }), /* @__PURE__ */ jsx(Button, {
        size: "xs",
        mode: "ghost",
        squared: true,
        rounded: true,
        children: /* @__PURE__ */ jsx(Cross2Icon, {})
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Progress, {
        value: 60,
        max: 100
      })
    })]
  });
}
function FileInfo({
  file
}) {
  const {
    formatMessage
  } = useIntl();
  const metadata = {
    created_at: new Date(file.birthtimeMs),
    modified_at: new Date(file.mtimeMs),
    dimensions: {
      width: 5472,
      height: 3648
    },
    resolution: 72
  };
  function formatFileType(file2) {
    function parseMimeForIntl(mime) {
      return "mime." + mime.replace("/", ".");
    }
    if (!file2.mime)
      return null;
    return formatMessage({
      id: parseMimeForIntl(file2.mime)
    });
  }
  function parseMeta(key, value) {
    if (key == "dimensions") {
      return value.width + "x" + value.height;
    } else if (value instanceof Date) {
      return value.toString();
    } else {
      return value;
    }
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col",
    children: [/* @__PURE__ */ jsx(Group, {
      children: /* @__PURE__ */ jsx("span", {
        className: "font-semibold text-xl",
        children: file.name
      })
    }), /* @__PURE__ */ jsx(Group, {
      className: "font-semibold text-gray-500",
      children: /* @__PURE__ */ jsx("span", {
        children: [formatFileType(file), filesize(file.size, {
          round: 1
        })].filter(Boolean).join(" - ")
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "pt-5",
      children: /* @__PURE__ */ jsx("ul", {
        className: "text-xs flex flex-col divide-y divide-gray-700",
        children: metadata && Object.keys(metadata).map((key, i) => {
          let value = metadata[key];
          return /* @__PURE__ */ jsxs("li", {
            className: "px-0.5 py-1 flex flex-row justify-between",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-semibold text-gray-500",
              children: key
            }), /* @__PURE__ */ jsx("span", {
              className: "font-semibold text-gray-300",
              children: parseMeta(key, value)
            })]
          }, key);
        })
      })
    })]
  });
}
function ImageViewer({
  file
}) {
  return /* @__PURE__ */ jsx("img", {
    src: file.path,
    alt: ""
  });
}
function getFileViewer(file) {
  switch (file.ext.replace(".", "")) {
    case "ico":
    case "jpeg":
    case "jpg":
    case "png":
      return /* @__PURE__ */ jsx(ImageViewer, {
        file
      });
  }
}
function FilePreview({
  file
}) {
  return /* @__PURE__ */ jsx("div", {
    className: "flex items-center justify-center overflow-hidden",
    children: /* @__PURE__ */ jsx("div", {
      className: "rounded-md overflow-hidden",
      children: getFileViewer(file)
    })
  });
}
function FileViewer({
  className
}) {
  const {
    file
  } = useFileManagerContext();
  if (!file)
    return null;
  return /* @__PURE__ */ jsxs(Widget, {
    full: true,
    className: classNames("h-full", className),
    children: [/* @__PURE__ */ jsxs(Group, {
      className: "bg-black/60 px-1 h-9 !space-x-1",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex-1",
        children: /* @__PURE__ */ jsx(Button, {
          size: "sm",
          mode: "ghost",
          children: "Print"
        })
      }), /* @__PURE__ */ jsx(Separator, {
        orientation: "vertical"
      }), /* @__PURE__ */ jsx(Button, {
        squared: true,
        mode: "ghost",
        children: /* @__PURE__ */ jsx(TrashIcon, {})
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "p-3",
      children: [/* @__PURE__ */ jsx(FilePreview, {
        file
      }), /* @__PURE__ */ jsx(FileInfo, {
        file
      })]
    })]
  });
}
function FileManagerTabTopBar() {
  const {
    setPendingFiles
  } = useFileManagerContext();
  const fileInputRef = useRef();
  function handleAddFileClick() {
    fileInputRef.current.click();
  }
  function handleChangedFile(e) {
    setPendingFiles((files) => [...files, ...e.target.files]);
    let filesArray = [...e.target.files];
    filesArray.forEach((file, i) => {
      coreSocket.emit("file:add", {
        filename: file.name,
        data: file
      }, (file2) => {
        setPendingFiles((files) => files.splice(i, 1));
      });
    });
  }
  return /* @__PURE__ */ jsxs(Group, {
    className: "h-9 bg-black/60 p-1",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-row items-center flex-1",
      children: [/* @__PURE__ */ jsx(DotsVerticalIcon, {}), /* @__PURE__ */ jsx("span", {
        className: "font-bold",
        children: "File manager"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row items-center space-x-0.5",
      children: [/* @__PURE__ */ jsxs(Button, {
        squared: true,
        mode: "ghost",
        onClick: handleAddFileClick,
        children: [/* @__PURE__ */ jsx(FilePlusIcon, {}), /* @__PURE__ */ jsx("input", {
          type: "file",
          ref: fileInputRef,
          onChange: handleChangedFile,
          className: "hidden invisible"
        })]
      }), /* @__PURE__ */ jsx(Button, {
        squared: true,
        mode: "ghost",
        children: /* @__PURE__ */ jsx(CardStackIcon, {})
      })]
    })]
  });
}
function FileManagerIndexTab() {
  const {
    file,
    setFile
  } = useFileManagerContext();
  return /* @__PURE__ */ jsxs("div", {
    className: "p-3 h-full flex flex-row space-x-2",
    children: [/* @__PURE__ */ jsx("div", {
      className: "w-full max-w-[300px]",
      children: /* @__PURE__ */ jsxs(Widget, {
        full: true,
        className: "h-full w-full",
        children: [/* @__PURE__ */ jsx(FileManagerTabTopBar, {}), /* @__PURE__ */ jsx(ScrollArea, {
          className: "flex-1 overflow-hidden px-3",
          children: /* @__PURE__ */ jsx(FileManagerWidgetContextMenu, {
            children: /* @__PURE__ */ jsx(DirectoryListing, {
              path: "storage",
              onSelect: setFile,
              selectedItem: file
            })
          })
        }), /* @__PURE__ */ jsx(PendingFilesList, {})]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-1",
      children: /* @__PURE__ */ jsx(FileViewer, {})
    })]
  });
}
class FileManagerClientPlugin extends ClientPlugin {
  deviceComponents(device) {
    return {
      page: {
        home: DeviceFileManagerWidget
      }
    };
  }
}
export { DeviceFileManagerWidget, FileManagerIndexTab, FileManagerProvider, FileManagerWidget, FileViewer, ImageViewer, FileManagerClientPlugin as default };
