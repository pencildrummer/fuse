var ye=Object.defineProperty,Ne=Object.defineProperties;var we=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var Y=(l,u,d)=>u in l?ye(l,u,{enumerable:!0,configurable:!0,writable:!0,value:d}):l[u]=d,k=(l,u)=>{for(var d in u||(u={}))K.call(u,d)&&Y(l,d,u[d]);if(I)for(var d of I(u))Q.call(u,d)&&Y(l,d,u[d]);return l},T=(l,u)=>Ne(l,we(u));var N=(l,u)=>{var d={};for(var m in l)K.call(l,m)&&u.indexOf(m)<0&&(d[m]=l[m]);if(l!=null&&I)for(var m of I(l))u.indexOf(m)<0&&Q.call(l,m)&&(d[m]=l[m]);return d};(function(l,u){typeof exports=="object"&&typeof module!="undefined"?u(exports,require("@fuse-labs/core-client"),require("@radix-ui/react-icons"),require("react"),require("@fuse-labs/core-ui"),require("classnames"),require("filesize"),require("react-intl")):typeof define=="function"&&define.amd?define(["exports","@fuse-labs/core-client","@radix-ui/react-icons","react","@fuse-labs/core-ui","classnames","filesize","react-intl"],u):(l=typeof globalThis!="undefined"?globalThis:l||self,u(l["@fuse-labs/file-manager"]={},l.coreClient,l.reactIcons,l.React,l.coreUi,l.classNames,l.filesize,l.reactIntl))})(this,function(l,u,d,m,f,X,Z,A){"use strict";function O(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var E=O(m),P=O(X),U=O(Z),_={exports:{}},F={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var R=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;function te(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function ne(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var n={},o=0;o<10;o++)n["_"+String.fromCharCode(o)]=o;var s=Object.getOwnPropertyNames(n).map(function(a){return n[a]});if(s.join("")!=="0123456789")return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(a){r[a]=a}),Object.keys(Object.assign({},r)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}ne();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var re=E.default,B=60103;if(F.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var L=Symbol.for;B=L("react.element"),F.Fragment=L("react.fragment")}var ae=re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,le=Object.prototype.hasOwnProperty,se={key:!0,ref:!0,__self:!0,__source:!0};function z(e,n,o){var s,r={},a=null,i=null;o!==void 0&&(a=""+o),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(i=n.ref);for(s in n)le.call(n,s)&&!se.hasOwnProperty(s)&&(r[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps,n)r[s]===void 0&&(r[s]=n[s]);return{$$typeof:B,type:e,key:a,ref:i,props:r,_owner:ae.current}}F.jsx=z,F.jsxs=z,_.exports=F;const t=_.exports.jsx,h=_.exports.jsxs,ie=_.exports.Fragment,M=E.default.createContext();M.Consumer;function y(){const e=m.useContext(M);if(!e)throw new Error("useFileManagerContext cannot be used oustide FileManagerProvider");return e}function C(e){const[n,o]=m.useState(),[s,r]=m.useState(),[a,i]=m.useState([]);return m.useEffect(c=>{let g=x=>{console.log("Added file",x)};return u.coreSocket.on("file:added",g),x=>u.coreSocket.off("file:added",g)},[]),t(M.Provider,{value:{file:n,setFile:o,focusItemPath:s,setFocusItemPath:r,pendingFiles:a,setPendingFiles:i},children:e.children})}function oe(s){var r=s,{dirname:e,item:n}=r,o=N(r,["dirname","item"]);const[a,i]=m.useState(!1);function c(){i(w=>!w)}const{focusItemPath:g}=y(),x=m.useMemo(w=>n.path==g,[g,n]);return h(ie,{children:[h(f.List.Item,T(k({},o),{className:P.default("px-0.5 font-bold rounded-md","hover:bg-white hover:bg-opacity-5 transition-colors duration-150 cursor-pointer",{"opacity-50":n.name[0]==".","ring-2 ring-inset ring-blue-600":x}),onClick:c,children:[a?t(d.ChevronDownIcon,{className:"text-gray-200"}):t(d.ChevronRightIcon,{className:"text-gray-200"}),t("span",{className:"select-none",children:n.name})]})),a&&t("div",{className:"pl-4",children:t(D,{path:n.path})})]})}function ce(a){var i=a,{item:e,selected:n,selectable:o=!0,onSelect:s}=i,r=N(i,["item","selected","selectable","onSelect"]);const{focusItemPath:c}=y(),g=m.useMemo(x=>e.path==c,[e,c]);return h(f.List.Item,T(k({},r),{className:P.default("px-0.5 font-semibold rounded-md transition-colors duration-150",{"cursor-pointer":o,"hover:bg-white hover:bg-opacity-5":!n,"bg-blue-700 text-gray-50":n,"opacity-50":e.name[0]==".","ring-2 ring-inset ring-blue-600":g&&!n,"ring-2 ring-inset ring-white":g&&n}),onClick:x=>s(e),children:[t(d.FileIcon,{className:"pointer-events-none text-gray-300"}),t("span",{className:"pointer-events-none",children:e.name})]}))}function D(r){var a=r,{path:e=".",selectedItem:n,onSelect:o}=a,s=N(a,["path","selectedItem","onSelect"]);const i=u.usePlugin("@fuse-labs/file-manager"),{file:c,setFile:g}=y(),[x,w]=m.useState([]);function S(){i.socket.emit("dir:list",{path:e},p=>{w(p)})}function j(p){return p.slice(p.length-1)=="/"?p.slice(0,-1):p}return m.useEffect(p=>{S();const v=b=>{let be=b.relativePath.match(/.*\//)[0]||".";j(e)==j(be)&&S()};return i.socket.on("file:added",v),b=>{i.socket.off("file:added",v)}},[]),t(f.List,{className:"text-gray-400 text-xs",divide:!1,size:"compact",children:x==null?void 0:x.map((p,v)=>p.isDir?t(oe,{"data-path":p.path,dirname:e,item:p},`list-item-${v}`):t(ce,{"data-path":p.path,item:p,onSelect:g,selected:p.path==(c==null?void 0:c.path)},`list-item-${v}`))})}function de(s){var r=s,{file:e,className:n}=r,o=N(r,["file","className"]);return h("div",{className:P.default("p-1 rounded-lg bg-gray-700","flex flex-col space-y-1",n),children:[t("div",{className:"flex flex-row space-x-3 px-1",children:h("div",{className:"text-sm font-semibold",children:[e.name,".",e.ext]})}),t(f.Separator,{}),h("div",{className:"flex flex-row",children:[t(f.Button,{size:"sm",children:"Print"}),t(f.Button,{size:"sm",children:"Action 2"}),t(f.Button,{size:"sm",children:"Action 3"})]})]})}function W(o){var s=o,{onAction:e}=s,n=N(s,["onAction"]);const{focusItemPath:r,setFocusItemPath:a}=y();function i(p){var b;p.preventDefault(),p.stopPropagation();let v=(b=p.target.dataset)==null?void 0:b.path;if(!v)return console.warn("Unable to get path for context clicked item");a(v)}function c(p){a()}function g(){console.log("Handle save",r),e==null||e("save",{path:r})}function x(){console.log("Handle delete",r),e==null||e("delete",{path:r})}function w(){e==null||e("print",{path:r})}const S=[{label:"Save",icon:d.DownloadIcon,action:g},{label:"Delete",icon:d.TrashIcon,detail:"\u232B",action:x},{label:"Share",icon:d.Share2Icon,items:[{label:"Copy"},{label:"Move"}]}];let j=m.useMemo(p=>{let v=[...S],b=[];return(r==null?void 0:r.split(".").pop())=="gcode"&&b.push({label:"Print",action:w}),b.length&&(v=v.concat("-",b)),v},[r]);return t(f.ContextMenu,{modal:!1,items:j,onPointerDown:i,onPointerDownOutside:c,children:n.children})}function G(o){var s=o,{onFileAction:e}=s,n=N(s,["onFileAction"]);const[r,a]=m.useState();function i(c,g){e==null||e(c,g)}return t(f.Widget,{title:"Files",children:t(C,{children:h("div",{className:"h-72 flex flex-col",children:[h("div",{className:"flex flex-row text-xs font-bold text-gray-400 bg-black bg-opacity-60 space-x-1 py-1 px-0.5 rounded-md",children:[t(d.DotsVerticalIcon,{}),t("span",{children:"Resources"})]}),t(f.ScrollArea,{className:"flex-1 overflow-hidden",children:t(W,{onAction:i,children:t(D,{path:"storage",selectedItem:r,onSelect:c=>c.type=="file"&&a(c)})})}),r&&t(de,{file:r,className:"mt-2"})]})})})}function V(){const{device:e}=u.useDeviceContext();function n(s,r){return s=="print"?(o(r.path),!0):!1}function o(s){console.log("PRINTING",s),e.sockets.fuseLabs.marlinCore.emit("print:file",s,r=>{console.log("Result",r)})}return t(G,{onFileAction:n})}function ue(){const{pendingFiles:e}=y();return t("div",{className:"flex flex-col space-y-1",children:e==null?void 0:e.map(n=>t(fe,{file:n},`file-${n.name}`))})}function fe({file:e}){return h("div",{className:"bg-gray-800 rounded-t-md rounded-b-sm text-gray-400 overflow-hidden pb-0",children:[h(f.Group,{className:"p-2",children:[t("span",{className:"font-bold text-xs truncate",children:e.name}),t(f.Button,{size:"xs",mode:"ghost",squared:!0,rounded:!0,children:t(d.Cross2Icon,{})})]}),t("div",{children:t(f.Progress,{value:60,max:100})})]})}function me({file:e}){const{formatMessage:n}=A.useIntl(),o={created_at:new Date(e.birthtimeMs),modified_at:new Date(e.mtimeMs),dimensions:{width:5472,height:3648},resolution:72};function s(a){function i(c){return"mime."+c.replace("/",".")}return a.mime?n({id:i(a.mime)}):null}function r(a,i){return a=="dimensions"?i.width+"x"+i.height:i instanceof Date?i.toString():i}return h("div",{className:"flex flex-col",children:[t(f.Group,{children:t("span",{className:"font-semibold text-xl",children:e.name})}),t(f.Group,{className:"font-semibold text-gray-500",children:t("span",{children:[s(e),U.default(e.size,{round:1})].filter(Boolean).join(" - ")})}),t("div",{className:"pt-5",children:t("ul",{className:"text-xs flex flex-col divide-y divide-gray-700",children:o&&Object.keys(o).map((a,i)=>{let c=o[a];return h("li",{className:"px-0.5 py-1 flex flex-row justify-between",children:[t("span",{className:"font-semibold text-gray-500",children:a}),t("span",{className:"font-semibold text-gray-300",children:r(a,c)})]},a)})})})]})}function q({file:e}){return t("img",{src:e.path,alt:""})}function he(e){switch(e.ext.replace(".","")){case"ico":case"jpeg":case"jpg":case"png":return t(q,{file:e})}}function pe({file:e}){return t("div",{className:"flex items-center justify-center overflow-hidden",children:t("div",{className:"rounded-md overflow-hidden",children:he(e)})})}function H({className:e}){const{file:n}=y();return n?h(f.Widget,{full:!0,className:P.default("h-full",e),children:[h(f.Group,{className:"bg-black/60 px-1 h-9 !space-x-1",children:[t("div",{className:"flex-1",children:t(f.Button,{size:"sm",mode:"ghost",children:"Print"})}),t(f.Separator,{orientation:"vertical"}),t(f.Button,{squared:!0,mode:"ghost",children:t(d.TrashIcon,{})})]}),h("div",{className:"p-3",children:[t(pe,{file:n}),t(me,{file:n})]})]}):null}function ge(){const{setPendingFiles:e}=y(),n=m.useRef();function o(){n.current.click()}function s(r){e(i=>[...i,...r.target.files]),[...r.target.files].forEach((i,c)=>{u.coreSocket.emit("file:add",{filename:i.name,data:i},g=>{e(x=>x.splice(c,1))})})}return h(f.Group,{className:"h-9 bg-black/60 p-1",children:[h("div",{className:"flex flex-row items-center flex-1",children:[t(d.DotsVerticalIcon,{}),t("span",{className:"font-bold",children:"File manager"})]}),h("div",{className:"flex flex-row items-center space-x-0.5",children:[h(f.Button,{squared:!0,mode:"ghost",onClick:o,children:[t(d.FilePlusIcon,{}),t("input",{type:"file",ref:n,onChange:s,className:"hidden invisible"})]}),t(f.Button,{squared:!0,mode:"ghost",children:t(d.CardStackIcon,{})})]})]})}function J(){const{file:e,setFile:n}=y();return h("div",{className:"p-3 h-full flex flex-row space-x-2",children:[t("div",{className:"w-full max-w-[300px]",children:h(f.Widget,{full:!0,className:"h-full w-full",children:[t(ge,{}),t(f.ScrollArea,{className:"flex-1 overflow-hidden px-3",children:t(W,{children:t(D,{path:"storage",onSelect:n,selectedItem:e})})}),t(ue,{})]})}),t("div",{className:"flex-1",children:t(H,{})})]})}function xe(){return t(C,{children:t(J,{})})}class ve extends u.ClientPlugin{components(){return{tab:xe}}deviceComponents(n){return{page:{home:V}}}}l.DeviceFileManagerWidget=V,l.FileManagerIndexTab=J,l.FileManagerProvider=C,l.FileManagerWidget=G,l.FileViewer=H,l.ImageViewer=q,l.default=ve,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
