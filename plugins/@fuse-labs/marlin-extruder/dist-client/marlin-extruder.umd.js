(function(l,c){typeof exports=="object"&&typeof module!="undefined"?c(exports,require("@radix-ui/react-icons"),require("classnames"),require("@fuse-labs/core-ui"),require("react")):typeof define=="function"&&define.amd?define(["exports","@radix-ui/react-icons","classnames","@fuse-labs/core-ui","react"],c):(l=typeof globalThis!="undefined"?globalThis:l||self,c(l["@fuse-labs/marlin-extruder"]={},l.reactIcons,l.classNames,l.coreUi,l.React))})(this,function(l,c,O,i,m){"use strict";function v(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var _=v(O),g=v(m),x={exports:{}},d={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var b=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;function S(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function N(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(o){return t[o]});if(n.join("")!=="0123456789")return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(o){a[o]=o}),Object.keys(Object.assign({},a)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}N();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R=g.default,h=60103;if(d.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var y=Symbol.for;h=y("react.element"),d.Fragment=y("react.fragment")}var P=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};function j(e,t,r){var n,a={},o=null,f=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(f=t.ref);for(n in t)C.call(t,n)&&!I.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:h,type:e,key:o,ref:f,props:a,_owner:P.current}}d.jsx=j,d.jsxs=j,x.exports=d;const s=x.exports.jsx,u=x.exports.jsxs;function T(){const[e,t]=m.useState(),[r,n]=m.useState();return m.useEffect(a=>n(!e),[e]),u(i.Widget,{title:"Extruder",version:"0.1",children:[u("div",{className:"flex flex-col space-y-1",children:[s(i.Label,{htmlFor:"e-motor",children:"Motor"}),s(i.SelectRaw,{id:"e-motor",options:[{value:"all",label:"All motors"},{value:"e1",label:"Extruder 1"},{value:"e2",label:"Extruder 2"}],onChange:a=>t(a)})]}),s(i.Separator,{}),u("div",{className:"flex flex-row space-x-2",children:[u(i.Button,{disabled:r,children:[s(c.ChevronLeftIcon,{}),s("span",{children:"Retract"})]}),u(i.Button,{disabled:r,children:[s("span",{children:"Extrude"}),s(c.ChevronRightIcon,{})]})]}),u("div",{className:"flex flex-col items-stretch space-y-1",children:[u("div",{className:_.default("flex flex-row items-center justify-between text-sm",{"opacity-30":r}),children:[s("span",{className:"font-medium",children:"Flow rate"}),s("span",{className:"font-mono text-xs",children:"100%"})]}),u("div",{className:"flex flex-row space-x-2",children:[s(i.Slider,{defaultValue:[50],max:100,step:.1,className:"flex-1",disabled:r}),s(i.Button,{squared:!0,disabled:r,children:s(c.ReloadIcon,{})})]})]})]})}l.ExtruderWidget=T,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});