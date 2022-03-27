import { useDeviceContext, ClientPlugin } from "@fuse-labs/core-client";
import { useDeviceStatusListContext, Popover, Button, EmptyView, Progress } from "@fuse-labs/core-ui";
import { LayersIcon, PauseIcon, StopIcon } from "@radix-ui/react-icons";
import isElectron from "is-electron";
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
function MarlinJobQueueHandler() {
  const {
    device
  } = useDeviceContext();
  const {
    addStatus,
    removeStatus
  } = useDeviceStatusListContext();
  const [jobs, setJobs] = useState([]);
  useEffect((_) => {
    const handleJobAdded = (job) => {
      setJobs((jobs2) => [...jobs2, job]);
    };
    const handleJobProgress = (job) => {
      setJobs((jobs2) => {
        let newJobs = [...jobs2];
        let jobIndex = newJobs.findIndex((j) => j.id === job.id);
        if (jobIndex > -1) {
          newJobs.splice(jobIndex, 1, job);
        } else {
          console.warn("Received progress update for a job not in the queue");
        }
        return newJobs;
      });
    };
    const handleJobFinish = (job) => {
      setJobs((jobs2) => jobs2.filter((j) => j.id !== job.id));
      let status = addStatus(`Finished job ${job.name}`, {
        type: "success"
      });
      setTimeout((_2) => removeStatus(status.id), 1500);
      if (isElectron()) {
        let notification = new Notification(device.name, {
          body: `${job.name} has been completed`
        });
        notification.onclick = (_2) => console.log("Clicked notification");
      }
    };
    device.socket.on("job:added", handleJobAdded);
    device.socket.on("job:progress", handleJobProgress);
    device.socket.on("job:finish", handleJobFinish);
    return (_2) => {
      device.socket.off("job:added", handleJobAdded);
      device.socket.off("job:progress", handleJobProgress);
      device.socket.off("job:finish", handleJobFinish);
    };
  }, [device]);
  return /* @__PURE__ */ jsxs(Popover, {
    children: [/* @__PURE__ */ jsx(Popover.Trigger, {
      children: /* @__PURE__ */ jsx(Button, {
        size: "sm",
        mode: "ghost",
        squared: true,
        children: /* @__PURE__ */ jsx(LayersIcon, {})
      })
    }), /* @__PURE__ */ jsx(Popover.Content, {
      align: "end",
      children: /* @__PURE__ */ jsx(JobList, {
        jobs
      })
    })]
  });
}
function JobList({
  jobs
}) {
  return /* @__PURE__ */ jsxs("ul", {
    className: "p-1 divide-y divide-gray-600",
    children: [/* @__PURE__ */ jsx("li", {
      className: "leading-none flex items-center pb-1.5",
      children: /* @__PURE__ */ jsx("span", {
        className: "font-syncopate text-xxs leading-none uppercase",
        children: "Jobs"
      })
    }), (jobs == null ? void 0 : jobs.length) ? jobs == null ? void 0 : jobs.map((job) => /* @__PURE__ */ jsx(JobListItem, {
      job
    }, `job-${job.id}`)) : /* @__PURE__ */ jsx("li", {
      className: "pt-5 pb-4 text-xs text-gray-500",
      children: /* @__PURE__ */ jsx(EmptyView, {
        text: "No jobs in the queue"
      })
    })]
  });
}
function JobListItem({
  job
}) {
  var _a, _b;
  return /* @__PURE__ */ jsxs("li", {
    className: "flex flex-col max-w-[200px] pb-2 last:pb-0",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-row h-10 items-center space-x-2",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex-1 flex flex-col truncate",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-xs truncate font-semibold",
          children: job.name
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-row justify-between",
          children: /* @__PURE__ */ jsx("div", {
            className: "text-xxs text-gray-500",
            children: job.startedAt ? /* @__PURE__ */ jsx("span", {
              children: job.startedAt
            }) : /* @__PURE__ */ jsx("span", {
              children: "Pending..."
            })
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-row items-center",
        children: [/* @__PURE__ */ jsx(Button, {
          size: "sm",
          mode: "ghost",
          rounded: true,
          squared: true,
          className: "text-amber-500",
          children: /* @__PURE__ */ jsx(PauseIcon, {})
        }), /* @__PURE__ */ jsx(Button, {
          size: "sm",
          mode: "ghost",
          rounded: true,
          squared: true,
          className: "text-red-400",
          children: /* @__PURE__ */ jsx(StopIcon, {})
        })]
      })]
    }), /* @__PURE__ */ jsx(Progress, {
      value: ((_a = job.progress) == null ? void 0 : _a.current) || 0,
      max: ((_b = job.progress) == null ? void 0 : _b.total) || 100
    })]
  });
}
class MarlinCoreClientPlugin extends ClientPlugin {
  deviceComponents(device) {
    return {
      page: {
        topBar: MarlinJobQueueHandler
      }
    };
  }
}
export { MarlinCoreClientPlugin as default };
