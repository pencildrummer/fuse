var h=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var O=(n,o)=>{var l={};for(var u in n)I.call(n,u)&&o.indexOf(u)<0&&(l[u]=n[u]);if(n!=null&&h)for(var u of h(n))o.indexOf(u)<0&&A.call(n,u)&&(l[u]=n[u]);return l};(function(n,o){typeof exports=="object"&&typeof module!="undefined"?o(exports,require("@fuse-labs/core-ui"),require("react"),require("@radix-ui/react-aspect-ratio")):typeof define=="function"&&define.amd?define(["exports","@fuse-labs/core-ui","react","@radix-ui/react-aspect-ratio"],o):(n=typeof globalThis!="undefined"?globalThis:n||self,o(n["@fuse-labs/camera"]={},n.coreUi,n.React,n.AspectRatio))})(this,function(n,o,l,u){"use strict";function _(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}function w(e){if(e&&e.__esModule)return e;var r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});return e&&Object.keys(e).forEach(function(t){if(t!=="default"){var a=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,a.get?a:{enumerable:!0,get:function(){return e[t]}})}}),r.default=e,Object.freeze(r)}var x=_(l),S=w(u),m={exports:{}},d={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var y=Object.getOwnPropertySymbols,N=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;function R(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function C(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;var a=Object.getOwnPropertyNames(r).map(function(s){return r[s]});if(a.join("")!=="0123456789")return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(s){i[s]=s}),Object.keys(Object.assign({},i)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}C();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=x.default,j=60103;if(d.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var v=Symbol.for;j=v("react.element"),d.Fragment=v("react.fragment")}var T=E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,W=Object.prototype.hasOwnProperty,q={key:!0,ref:!0,__self:!0,__source:!0};function g(e,r,t){var a,i={},s=null,f=null;t!==void 0&&(s=""+t),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(f=r.ref);for(a in r)W.call(r,a)&&!q.hasOwnProperty(a)&&(i[a]=r[a]);if(e&&e.defaultProps)for(a in r=e.defaultProps,r)i[a]===void 0&&(i[a]=r[a]);return{$$typeof:j,type:e,key:s,ref:f,props:i,_owner:T.current}}d.jsx=g,d.jsxs=g,m.exports=d;const c=m.exports.jsx,b=m.exports.jsxs;function L(){const e=[{label:"Camera 1",value:"camera_1"},{label:"Camera 2",value:"camera_2"}];return b(o.SettingsWidget,{children:[b(o.Group,{className:"justify-between",children:[c(o.Label,{htmlFor:"device",children:"Camera device"}),c(o.SelectRaw,{id:"device",options:e})]}),b(o.Group,{className:"justify-between",children:[c(o.Label,{htmlFor:"snapshot-directory",children:"Snapshot storage directory"}),c(o.InputRaw,{id:"snapshot-directory"})]})]})}function M(r){var e=O(r,[]);return c(o.Widget,{full:!0,children:c(S.Root,{ratio:16/9,children:c("img",{src:"https://unsplash.com/photos/HsefvbLbNWc/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQzNzAyOTQ5&force=true&w=640",width:"100%",alt:"",className:"object-cover w-full h-full"})})})}n.CameraSettingsWidget=L,n.CameraWidget=M,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
