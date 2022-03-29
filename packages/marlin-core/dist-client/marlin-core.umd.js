(function(d,m){typeof exports=="object"&&typeof module!="undefined"?m(exports,require("@fuse-labs/core-client"),require("@fuse-labs/core-ui"),require("@radix-ui/react-icons"),require("is-electron"),require("react")):typeof define=="function"&&define.amd?define(["exports","@fuse-labs/core-client","@fuse-labs/core-ui","@radix-ui/react-icons","is-electron","react"],m):(d=typeof globalThis!="undefined"?globalThis:d||self,m(d["@fuse-labs/marlin-core"]={},d.coreClient,d.coreUi,d.reactIcons,d.isElectron,d.React))})(this,function(d,m,u,v,J,g){"use strict";function j(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var q=j(J),L=j(g),y={exports:{}},h={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var _=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;function T(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function B(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var t={},o=0;o<10;o++)t["_"+String.fromCharCode(o)]=o;var s=Object.getOwnPropertyNames(t).map(function(i){return t[i]});if(s.join("")!=="0123456789")return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(i){r[i]=i}),Object.keys(Object.assign({},r)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}B();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D=L.default,O=60103;if(h.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var k=Symbol.for;O=k("react.element"),h.Fragment=k("react.fragment")}var $=D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,A=Object.prototype.hasOwnProperty,F={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,o){var s,r={},i=null,c=null;o!==void 0&&(i=""+o),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(c=t.ref);for(s in t)A.call(t,s)&&!F.hasOwnProperty(s)&&(r[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)r[s]===void 0&&(r[s]=t[s]);return{$$typeof:O,type:e,key:i,ref:c,props:r,_owner:$.current}}h.jsx=w,h.jsxs=w,y.exports=h;const n=y.exports.jsx,b=y.exports.jsxs;function z(){const{device:e}=m.useDeviceContext(),{addStatus:t,removeStatus:o}=u.useDeviceStatusListContext(),[s,r]=g.useState([]);return g.useEffect(i=>{e.sockets.fuseLabs.marlinCore.emit("queue:jobs",c=>{console.log("List of jobs",c),r(c)})},[e]),g.useEffect(i=>{const c=a=>{r(p=>[...p,a]),t(`Added job "${a.name}"`)},l=a=>{r(p=>p.filter(f=>f.id!=a.id)),t(`Removed job "${a.name}"`)},P=a=>{t(`Started job "${a.name}"`)},N=a=>{t(`Paused job "${a.name}"`,{type:"warning"})},S=a=>{t(`Resumed job "${a.name}"`)},C=a=>{r(p=>{let f=[...p],x=f.findIndex(V=>V.id===a.id);return x>-1?f.splice(x,1,a):console.warn("Received progress update for a job not in the queue"),f})},E=a=>{r(f=>f.filter(x=>x.id!==a.id));let p=t(`Finished job "${a.name}"`,{type:"success"});if(setTimeout(f=>o(p.id),1500),q.default()){let f=new Notification(e.name,{body:`${a.name} has been completed`});f.onclick=x=>console.log("Clicked notification")}};return e.socket.on("job:added",c),e.socket.on("job:removed",l),e.socket.on("job:start",P),e.socket.on("job:pause",N),e.socket.on("job:resume",S),e.socket.on("job:progress",C),e.socket.on("job:finish",E),a=>{e.socket.off("job:added",c),e.socket.off("job:removed",l),e.socket.off("job:start",P),e.socket.off("job:pause",N),e.socket.off("job:resume",S),e.socket.off("job:progress",C),e.socket.off("job:finish",E)}},[e]),b(u.Popover,{children:[n(u.Popover.Trigger,{children:n(u.Button,{size:"sm",mode:"ghost",squared:!0,children:n(v.LayersIcon,{})})}),n(u.Popover.Content,{align:"end",children:n(H,{jobs:s})})]})}function H({jobs:e}){return b("ul",{className:"p-1 divide-y divide-gray-600",children:[n("li",{className:"leading-none flex items-center pb-1.5",children:n("span",{className:"font-syncopate text-xxs leading-none uppercase",children:"Jobs"})}),e!=null&&e.length?e==null?void 0:e.map(t=>n(M,{job:t},`job-${t.id}`)):n("li",{className:"pt-5 pb-4 text-xs text-gray-500",children:n(u.EmptyView,{text:"No jobs in the queue"})})]})}function M({job:e}){var i,c;const{device:t}=m.useDeviceContext();function o(){t.sockets.fuseLabs.marlinCore.emit("job:start",e.id,l=>{console.log("Handle start res:",l)})}function s(){t.sockets.fuseLabs.marlinCore.emit("job:pause",e.id,l=>{console.log("Handle pause res:",l)})}function r(){t.sockets.fuseLabs.marlinCore.emit("job:stop",e.id,l=>{console.log("Handle stop res:",l)})}return b("li",{className:"flex flex-col max-w-[200px] pb-2 last:pb-0",children:[b("div",{className:"flex flex-row h-10 items-center space-x-2",children:[b("div",{className:"flex-1 flex flex-col truncate",children:[n("div",{className:"text-xs truncate font-semibold",children:e.name}),n("div",{className:"flex flex-row justify-between",children:n("div",{className:"text-xxs text-gray-500",children:e.startedAt?n("span",{children:e.startedAt}):n("span",{children:"Pending..."})})})]}),b("div",{className:"flex flex-row items-center",children:[!e.paused&&e.running&&n(u.Button,{size:"sm",mode:"ghost",rounded:!0,squared:!0,className:"text-amber-500",onClick:s,children:n(v.PauseIcon,{})}),(e.paused||!e.running)&&n(u.Button,{size:"sm",mode:"ghost",rounded:!0,squared:!0,className:"text-lime-500",onClick:o,children:n(v.PlayIcon,{})}),n(u.Button,{size:"sm",mode:"ghost",rounded:!0,squared:!0,className:"text-red-400",onClick:r,children:n(v.StopIcon,{})})]})]}),n(u.Progress,{value:((i=e.progress)==null?void 0:i.current)||0,max:((c=e.progress)==null?void 0:c.total)||100})]})}class Q extends m.ClientPlugin{deviceComponents(t){return{page:{topBar:z}}}}d.default=Q,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
