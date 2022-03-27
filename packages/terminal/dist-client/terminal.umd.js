var ne=Object.defineProperty;var F=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var ie=(s,u,i)=>u in s?ne(s,u,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[u]=i;var C=(s,u)=>{var i={};for(var c in s)re.call(s,c)&&u.indexOf(c)<0&&(i[c]=s[c]);if(s!=null&&F)for(var c of F(s))u.indexOf(c)<0&&se.call(s,c)&&(i[c]=s[c]);return i};var h=(s,u,i)=>(ie(s,typeof u!="symbol"?u+"":u,i),i);(function(s,u){typeof exports=="object"&&typeof module!="undefined"?u(exports,require("@fuse-labs/core-client"),require("@fuse-labs/core-ui"),require("react"),require("@radix-ui/react-icons"),require("classnames"),require("@fuse-labs/shared-utils")):typeof define=="function"&&define.amd?define(["exports","@fuse-labs/core-client","@fuse-labs/core-ui","react","@radix-ui/react-icons","classnames","@fuse-labs/shared-utils"],u):(s=typeof globalThis!="undefined"?globalThis:s||self,u(s["@fuse-labs/terminal"]={},s.coreClient,s.coreUi,s.React,s.reactIcons,s.classNames,s.sharedUtils))})(this,function(s,u,i,c,A,B,W){"use strict";function j(n){return n&&typeof n=="object"&&"default"in n?n:{default:n}}var S=j(c),T=j(B),_={exports:{}},v={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var N=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;function z(n){if(n==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(n)}function H(){try{if(!Object.assign)return!1;var n=new String("abc");if(n[5]="de",Object.getOwnPropertyNames(n)[0]==="5")return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;var r=Object.getOwnPropertyNames(e).map(function(a){return e[a]});if(r.join("")!=="0123456789")return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(a){o[a]=a}),Object.keys(Object.assign({},o)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}H();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J=S.default,k=60103;if(v.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var E=Symbol.for;k=E("react.element"),v.Fragment=E("react.fragment")}var V=J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Y=Object.prototype.hasOwnProperty,K={key:!0,ref:!0,__self:!0,__source:!0};function R(n,e,t){var r,o={},a=null,d=null;t!==void 0&&(a=""+t),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(d=e.ref);for(r in e)Y.call(e,r)&&!K.hasOwnProperty(r)&&(o[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:k,type:n,key:a,ref:d,props:o,_owner:V.current}}v.jsx=R,v.jsxs=R,_.exports=v;const l=_.exports.jsx,f=_.exports.jsxs,Q=_.exports.Fragment;function P(e){var n=C(e,[]);const{device:t}=u.useDeviceContext(),{addStatus:r,removeStatus:o}=i.useDeviceStatusListContext();function a(){t.terminal.connect();let m=r("Prova messaggio di testo dello stato device",{type:"warning"});setTimeout(y=>o(m.id),1500)}function d(){t.terminal.disconnect()}return f(i.SettingsWidget,{children:[f(i.Group,{className:"!justify-start",children:[l(i.Button,{onClick:a,children:"Connect"}),l(i.Button,{onClick:d,children:"Disconnect"})]}),f("div",{className:"grid grid-cols-2 gap-4",children:[f(i.Group,{orientation:"vertical",children:[l(i.Label,{htmlFor:"serial-port",children:"Serial port"}),l(i.InputRaw,{id:"serial-port",disabled:!0,value:t.port})]}),f(i.Group,{orientation:"vertical",children:[l(i.Label,{htmlFor:"baud-rate",children:"Baud rate"}),l(i.InputRaw,{id:"baud-rate",value:t.baudrate,disabled:!0})]})]})]})}const D=S.default.createContext();function O(){let n=c.useContext(D);if(!n)throw new Error("useTerminalContext can only be used inside a TerminalProvider");return n}function I(t){var r=t,{terminal:n}=r,e=C(r,["terminal"]);const[o,a]=c.useState(n.log),[d,m]=c.useState(!0),y=p=>{a(g=>{let x=g.findIndex(w=>w.id==p.id);if(x>-1){let w=[...g];return w[x]=p,w}else return[...g,p]})};return l(D.Provider,{value:{terminal:n,data:o,appendData:y,autoscroll:d,setAutoscroll:m},children:e.children})}function X(){const{terminal:n,appendData:e}=O(),[t,r]=c.useState("");function o(a){if(a.preventDefault(),a.stopPropagation(),t.length){let d=n.sendMessage(t);e(d),r("")}}return f("form",{onSubmit:o,className:"flex flex-row space-x-2",children:[l(i.InputRaw,{type:"text",value:t,onChange:a=>r(a.target.value),className:T.default("flex-1","text-xs px-1.5 py-1","rounded-md","font-mono font-medium","bg-gray-900 border border-gray-600 text-gray-300","focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"),autoCorrect:"false",autoComplete:"false",spellCheck:"false"}),l(i.Button,{type:"submit",children:l(A.PaperPlaneIcon,{})})]})}function Z(){const n=["\u28FE","\u28FD","\u28FB","\u28BF","\u287F","\u28DF","\u28EF","\u28F7"],[e,t]=c.useState(0);return c.useEffect(r=>{let o=setInterval(a=>t(d=>d>=n.length-1?0:d+1),80);return a=>clearInterval(o)}),n[e]}function U({data:n}){const{message:e,from:t,received:r}=n;return f("div",{children:[f("span",{className:T.default("font-bold","whitespace-pre",{"text-purple-500":t=="user","text-cyan-400":t=="server","text-amber-400":t=="device","text-pink-500":t=="controller"}),children:[t.padEnd(10," "),"\xA0",t=="user"&&!r?l(Z,{}):">","\xA0"]}),l("span",{children:e})]})}function $(){const{terminal:n,data:e,appendData:t,autoscroll:r,setAutoscroll:o}=O(),a=c.useRef(),d=c.useRef();function m(){a.current&&(d.current||(d.current=Array.from(a.current.children).find(p=>p.hasAttribute("data-radix-scroll-area-viewport"))),d.current.scrollTop=d.current.scrollHeight)}c.useEffect(p=>{r&&setTimeout(g=>{m(),o(!0)},50)},[r,e,o]),c.useEffect(p=>{if(!n)return;let g=x=>t(x);return n.onMessageReceived(g),x=>n.offMessageReceived(g)},[t,n]);function y(p){r&&o(!1)}return f("div",{className:"flex-1 flex flex-col space-y-3 overflow-hidden",children:[l("div",{className:"flex-1 overflow-hidden",children:l(i.ScrollArea,{ref:a,className:"h-full px-1 rounded-md bg-gray-800 text-gray-200 font-semibold font-mono text-xs",onScroll:y,children:e==null?void 0:e.map((p,g)=>l(U,{data:p},`line-${p.id}`))})}),f(i.Group,{className:"!justify-start text-xs font-normal",children:[l(i.CheckboxRaw,{checked:r,onCheckedChange:o}),l(i.Label,{children:"Scroll automatically to bottom on new message"})]})]})}function M(){const{device:n}=u.useDeviceContext();return l(i.Widget,{title:"Terminal",version:"0.1",className:"h-96",children:f(I,{terminal:n.terminal,children:[l($,{}),l(X,{})]})})}const b=Object.freeze({None:0,CarriageReturn:1,NewLine:2,CarriageReturnAndNewLine:3});class L{constructor(e,{autoConnect:t=!0}={}){h(this,"_socket");h(this,"_isOpen",!1);h(this,"deviceId");h(this,"lineEnding",b.NewLine);h(this,"useCarriageReturn",!1);h(this,"_log",[]);if(console.log("Creating terminal for device ID",e.id),this.deviceId=e.id,this._socket=e.sockets.fuseLabs.terminal,!this._socket)throw console.log(e),new Error("Missing terminal socket for device");this.onMessageReceived(r=>{this._log.push(r),this._log.length>30&&this._log.shift()}),t&&this.connect()}get isOpen(){return this._isOpen}get log(){return this._log}connect(e){this._socket.emit("open",this.deviceId,t=>{console.log("Callback on connect, result:",t),this._isOpen=t,t&&(e==null||e(t))})}disconnect(){this._socket.emit("close",this.deviceId)}sendMessage(e){console.log("Sending message:",e);let t={id:W.generateUniqueID(),message:this._formatMessage(e),from:"user",deviceId:this.deviceId};return this._socket.emit("message",t),t}onMessageReceived(e){this._socket.on("message",e)}offMessageReceived(e){this._socket.off("message",e)}clearLog(){this._log=[]}_formatMessage(e){switch(this.lineEnding){case b.NewLine:return e.trim()+`
`;case b.CarriageReturn:return e.trim()+"\r";case b.CarriageReturnAndNewLine:return e.trim()+`\r
`;case b.None:default:return e.trim()}}}function ee(){return f(Q,{children:[l(M,{}),l(P,{})]})}class te extends u.ClientPlugin{constructor(e){super(e);u.ClientDeviceManager.shared.addEventListener("updatedDevices",this.provision)}deviceComponents(e){return{page:{plugin:ee}}}provision(){const e=u.ClientDeviceManager.shared.devices;return e.forEach(t=>{t.terminal?console.warn("Trying setting terminal on device but device.terminal already exists"):(t.terminal=new L(t),console.log("Added terminal plugin to device",t.name))}),t=>{e.forEach(r=>{typeof r.terminal==L&&delete r.terminal})}}}s.MarlinTerminalSettingsWidget=P,s.MarlinTerminalWidget=M,s.TerminalProvider=I,s.default=te,s.useTerminalContext=O,Object.defineProperties(s,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
