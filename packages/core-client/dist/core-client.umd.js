var Pe=Object.defineProperty;var D=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var I=(n,l,f)=>l in n?Pe(n,l,{enumerable:!0,configurable:!0,writable:!0,value:f}):n[l]=f,C=(n,l)=>{for(var f in l||(l={}))W.call(l,f)&&I(n,f,l[f]);if(D)for(var f of D(l))Y.call(l,f)&&I(n,f,l[f]);return n};var T=(n,l)=>{var f={};for(var a in n)W.call(n,a)&&l.indexOf(a)<0&&(f[a]=n[a]);if(n!=null&&D)for(var a of D(n))l.indexOf(a)<0&&Y.call(n,a)&&(f[a]=n[a]);return f};var d=(n,l,f)=>(I(n,typeof l!="symbol"?l+"":l,f),f);(function(n,l){typeof exports=="object"&&typeof module!="undefined"?l(exports,require("socket.io-client"),require("lodash"),require("yup"),require("@radix-ui/react-icons"),require("react"),require("@fuse-labs/shared-utils"),require("react-intl")):typeof define=="function"&&define.amd?define(["exports","socket.io-client","lodash","yup","@radix-ui/react-icons","react","@fuse-labs/shared-utils","react-intl"],l):(n=typeof globalThis!="undefined"?globalThis:n||self,l(n["@fuse-labs/core-client"]={},n.socket_ioClient,n.lodash,n.yup,n.reactIcons,n.React,n.sharedUtils,n.reactIntl))})(this,function(n,l,f,a,R,v,S,V){"use strict";function A(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}var E=A(f),O=A(v);function M(i,e){return fetch(i,e).then(t=>t.json())}function X(i,e){return M(i,{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}const Z="http://localhost:8888";function b(i){let e=[Z,i].join("/").replace("@","scope:"),t=l.io(e);return t.on("connect",s=>{}),t}const _=b("@fuse-labs/core"),ee=Object.freeze({FDMPrinter:"fdm_printer",MSLAPrinter:"msla_printer",CNC:"cnc",Laser:"laser"}),te=a.object({name:a.string().required(),version:a.string().required(),deviceTypes:a.array().required(),_settings:a.boolean().required(),_hasPages:a.boolean().required(),_hasTabs:a.boolean().required(),_hasSocket:a.boolean().required(),_hasDeviceSocket:a.boolean().required(),_active:a.boolean().required(),_system:a.boolean().required()});a.object({name:a.string().required(),version:a.string().required(),fuse:a.object().required()});class N{constructor(e){d(this,"name");d(this,"version");d(this,"_settings",!1);d(this,"_hasPages",!1);d(this,"_hasTabs",!1);d(this,"_hasSocket");d(this,"_hasDeviceSocket");d(this,"_active",!1);d(this,"_system");let t=te.validateSync(e);Object.assign(this,t),this.hasSocket&&(this.socket=b(this.name)),typeof this.provision=="function"&&this.provision()}get settings(){return this._settings}get hasPages(){return this._hasPages}get url(){return this.name}get hasTabs(){return this._hasTabs}get tabsUrl(){return this.name}get hasSocket(){return this._hasSocket}get hasDeviceSocket(){return this._hasDeviceSocket}get active(){return this._active}get system(){return this._system}get icon(){return R.QuestionMarkIcon}get displayTitle(){return this.name}components(){return{}}deviceComponents(e){return{}}}const w=class{constructor(){d(this,"_initialized",!1);d(this,"_plugins",[]);d(this,"_activePluginsNames",[])}get initialized(){return this._initialized}get plugins(){return this._plugins}get activePluginsNames(){return this._activePluginsNames}get activePlugins(){return this._plugins.filter(e=>e.active)}getPlugin(e){return this._plugins.find(t=>t.name==e)}init(e){this._plugins=(e==null?void 0:e.map(t=>{let s=w._registeredPlugins[t.name];return s?new s(t):new N(t)}))||[],console.log("INIT MANAGER Plugins",this._plugins),this._initialized=!0}static registerPlugin(e,t){w._registeredPlugins[e]=t}};let j=w;d(j,"_registeredPlugins",{});class h{constructor(){throw new Error("Use ClienPluginManager.shared instead")}static get shared(){return h.sharedInstance||(h.sharedInstance=new j),h.sharedInstance}}h.registerPlugin=j.registerPlugin;const x=a.object({id:a.string().required(),name:a.string().defined().required(),port:a.string().defined().required(),baudrate:a.number().defined().required(),profileId:a.string().defined().required(),serialNumber:a.string().nullable().default(null),vendorId:a.string().nullable().default(null),productId:a.string().nullable().default(null)});class y{constructor(e){d(this,"id");d(this,"name");d(this,"port");d(this,"baudrate");d(this,"profileId");d(this,"profile");d(this,"serialNumber");d(this,"vendorId");d(this,"productId");d(this,"plugins");var s,o;let t=x.validateSync(e);Object.assign(this,t),this.socket||(this.socket=b(`device:${t.id}`)),this.plugins=(s=h.shared.plugins)==null?void 0:s.filter(r=>{var u;return(u=r.deviceTypes)==null?void 0:u.includes(t.profile.type)}),(o=this.plugins)==null||o.forEach(r=>{if(!r.hasDeviceSocket)return;let u=r.name.split("/").map(c=>E.default.camelCase(c)).join(".");if(!E.default.get(this,"sockets."+u)){let c=b(`device:${this.id}/${r.name}`);E.default.set(this,"sockets."+u,c)}})}get immutableKeys(){return["id","profile","serialNumber","vendorId","productId"]}update(e){let t=Object.keys(e).reduce((o,r)=>(this.immutableKeys.includes(r)?console.warn("Trying to update an immutable ClientDevice property:",r):(console.log("RES",o),o[r]=e[r]),o),C({},this)),s=x.validateSync(t);Object.assign(this,s)}}class ie extends EventTarget{constructor(){super();d(this,"_initialized",!1);d(this,"_devices",[])}get initialized(){return this._initialized}get devices(){return this._devices}init(e){this._devices=(e==null?void 0:e.map(t=>new y(t)))||[],this.dispatchEvent(new Event("updatedDevices")),_.on("devices:added",this._handleDeviceAdded),_.on("devices:updated",this._handleDeviceUpdated),_.on("devices:removed",this._handleDeviceRemoved),console.log("INITED MANAGER Devices",this._devices),this._initialized=!0}getDevice(e){return this._devices.find(t=>t.id==e)}_handleDeviceAdded(e){let t=new y(e);this._devices=[...this._devices,t],this.dispatchEvent(new Event("updatedDevices"))}_handleDeviceUpdated(e){let t=this._devices.find(s=>s.id===e.id);t?t.update(e):console.log("Received request to update local device but no device has been found with id",e.id),this.dispatchEvent(new Event("updatedDevices"))}_handleDeviceRemoved(e){this._devices=this._devices.filter(t=>t.id!==e.id),this.dispatchEvent(new Event("updatedDevices"))}}class p{constructor(){throw new Error("Use ClientDeviceManager.shared instead")}static get shared(){return p.sharedInstance||(p.sharedInstance=new ie),p.sharedInstance}}const z=O.default.createContext();function k(){const i=v.useContext(z);if(!i)throw new Error("useAppContext can only be used inside an AppProvider");return i}const L=O.default.createContext();function ne(){const i=v.useContext(L);if(!i)throw new Error("useDeviceContext can be used only inside a DeviceProvider");return i}function F(i){const{devices:e}=k();return v.useMemo(t=>e.find(s=>s.id==i),[i,e])}function re(i,e){let t=F(i);return v.useMemo(s=>{var o;return(o=t==null?void 0:t.plugins)==null?void 0:o.find(r=>r.url==e||r.name===e)},[t,e])}function se(i){const{plugins:e}=k();return v.useMemo(t=>e.find(s=>s.url==i||s.name===i),[i,e])}function U(i){p.shared.initialized||p.shared.init(i);const[e,t]=v.useState(p.shared.devices);return v.useEffect(s=>{const o=r=>t(p.shared.devices);return p.shared.addEventListener("updatedDevices",o),r=>{p.shared.removeEventListener("updatedDevices",o)}},[]),e}function H(i){h.shared.initialized||h.shared.init(i),v.useEffect(s=>{function o(u){let c=h.shared.getPlugin(u);c._active=!0,t(g=>[...g])}function r(u){let c=h.shared.getPlugin(u);c._active=!1,t(g=>[...g])}_.on("plugins:activated",o),_.on("plugins:deactivated",r)},[]);const[e,t]=v.useState(h.shared.plugins);return e}function K(i){const[e,t]=v.useState(i||{});return v.useEffect(s=>{_.on("profiles:added",o=>{const r=S.pathCase(o.brand);t(u=>{let c=C({},u);return c[r]=c[r]||[],c[r].push(o),c})}),_.on("profiles:updated",o=>{t(r=>{let u=S.pathCase(o.brand),c=r[u].findIndex(m=>m.id==o.id);if(c==-1)return console.error("Unable to find index for received updated profile with id",o.id),r;let g=C({},r);return g[u].splice(c,1,o),g})}),_.on("profiles:deleted",o=>{t(r=>{let u=o.split("."),c=S.pathCase(u[0]);if(S.pathCase(u[1]),r[c]){let g=C({},r);return g[c]=g[c].filter(m=>m.id!=o),g}else return console.warn('Received deleted profile event for profile "'+o+'" but profile is not found'),r})})},[]),e}function oe(){const[i,e]=v.useState([]);return v.useEffect(t=>{_.emit("serial:list",s=>{e(s)})},[]),i}var $={exports:{}},P={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var G=Object.getOwnPropertySymbols,ae=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;function de(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function ue(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;var s=Object.getOwnPropertyNames(e).map(function(r){return e[r]});if(s.join("")!=="0123456789")return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(r){o[r]=r}),Object.keys(Object.assign({},o)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}ue();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var le=O.default,J=60103;if(P.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var B=Symbol.for;J=B("react.element"),P.Fragment=B("react.fragment")}var fe=le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ve=Object.prototype.hasOwnProperty,he={key:!0,ref:!0,__self:!0,__source:!0};function Q(i,e,t){var s,o={},r=null,u=null;t!==void 0&&(r=""+t),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(u=e.ref);for(s in e)ve.call(e,s)&&!he.hasOwnProperty(s)&&(o[s]=e[s]);if(i&&i.defaultProps)for(s in e=i.defaultProps,e)o[s]===void 0&&(o[s]=e[s]);return{$$typeof:J,type:i,key:r,ref:u,props:o,_owner:fe.current}}P.jsx=Q,P.jsxs=Q,$.exports=P;const q=$.exports.jsx;function ge(u){var c=u,{devices:i,profiles:e,plugins:t,locale:s="en",messages:o}=c,r=T(c,["devices","profiles","plugins","locale","messages"]);const g=K(e),m=H(t),_e=v.useMemo(Ce=>m==null?void 0:m.filter(be=>be.active),[m]),me=U(i);return q(z.Provider,{value:{devices:me,profiles:g,plugins:m,activePlugins:_e},children:q(V.IntlProvider,{defaultLocale:"en",locale:s,messages:o,children:r.children})})}function pe(t){var s=t,{device:i}=s,e=T(s,["device"]);return q(L.Provider,{value:{device:i},children:e.children})}n.AppProvider=ge,n.ClientDevice=y,n.ClientDeviceManager=p,n.ClientDeviceType=ee,n.ClientPlugin=N,n.ClientPluginManager=h,n.DeviceProvider=pe,n.coreSocket=_,n.fetcher=M,n.fetcherPOST=X,n.socket=b,n.useAppContext=k,n.useDevice=F,n.useDeviceContext=ne,n.useDevicePlugin=re,n.usePlugin=se,n.useProviderDevices=U,n.useProviderPlugins=H,n.useProviderProfiles=K,n.useSerialPorts=oe,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});