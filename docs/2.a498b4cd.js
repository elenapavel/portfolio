(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{13:function(e,t,r){"use strict";var n=r(152),a=r(1),o=r.n(a);function c(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(){for(var e=[],t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];for(var a=0,o=r;a<o.length;a++){var u=o[a];e.push.apply(e,c(u.split("/")))}for(var i=[],l=0,s=e;l<s.length;l++){var f=s[l];f&&"."!==f&&(".."===f&&i.pop(),i.push(f))}var d=i.join("/");return""===e[0]&&(d="/"+d),d}var i=r(2);function l(e,t,r){return t?Object(a.isValidElement)(t)?t:Object(a.createElement)(t,{scope:r}):Object(i.g)(e)?e({scope:r}):e}var s=o.a.createContext(null);function f(e,t,r){var n=Object.create(e);return"/"===t[0]?n.route=t:n.route=u(e?e.route:"/",t),r&&(n["@".concat(r)]=n.route),n.matched=[],n}function d(e){var t=e.children,r=e.render,n=e.match,c=e.exact,u=e.name,i=Object(a.useContext)(s);if(!i)throw new Error('<Scope match="'.concat(n,'"> was rendered outsite of a <Scope.Root>'));var d=f(i,n?n.toLowerCase():i.route,u);return function(e,t,r){var n=r?e.path===t.route:0===e.path.indexOf(t.route);return n&&e.matched.push(t.route),n}(i,d,c)?o.a.createElement(s.Provider,{value:d},l(t,r,d)):null}d.Context=s,d.Root=function(e){var t=e.children,r=e.render,n=e.context,a=e.path,c=f(n||null,e.route||"/");return c.path=a||"/",o.a.createElement(s.Provider,{value:c},l(t,r,c))},d.NotMatched=function(e){var t=e.children,r=e.render,n=Object(a.useContext)(s);return n.matched.length?null:l(t,r,n)};var h=d;function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(n=(c=u.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(i){a=!0,o=i}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(r,!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var m=o.a.createContext(null),O=o.a.createContext(null);function g(e,t){var r=t.type,n=t.name,a=t.ref,o=v({},e);switch(r){case"add":(o[n]||(o[n]=[])).push(a);break;case"remove":o[n].splice(o[n].indexOf(a)>>>0,1);break;default:throw Error("Slot: action not found.")}return o}function j(e){var t=e.children,r=e.render,n=e.name,o=e.order,c=void 0===o?1:o,u=Object(a.useContext)(m)[n],i=function(e,t){return e.order>t.order?1:-1},l=u?u.map((function(e){return e.current})):[];return r?l.sort(i).map((function(e,t){return Object(a.createElement)(r,v({},e.args,{key:t}))})):(null!=t&&l.push({order:c,content:t}),l.sort(i).map((function(e){return e.content})))}j.State=m,j.Dispatch=O,j.Portal=function(e){var t=e.children,r=e.to,n=e.render,o=e.order,c=void 0===o?1:o,u=Object(a.useContext)(O),i=Object(a.useRef)("\xa1!");return Object(a.useEffect)((function(){return i.current={order:c,content:t,args:n},u({type:"add",name:r,ref:i}),function(){return u({type:"remove",name:r,ref:i})}}),[r,t,n,c]),null},j.Provider=function(e){var t=p(Object(a.useReducer)(g,{}),2),r=t[0],n=t[1];return o.a.createElement(O.Provider,{value:n},o.a.createElement(m.Provider,{value:r},e.children))};var w=j,E=r(35),P=r(61),x=Object(P.c)();x.push=function(e,t){E.a.history.pushState(t,"",e)},x.replace=function(e,t){E.a.history.replaceState(t,"",e)},x.back=function(){E.a.history.go(-1)},x.forward=function(){E.a.history.go(1)},E.a.addEventListener("popstate",(function(e){x.emit("popstate",e)})),E.a.addEventListener("hashchange",(function(e){location.hash&&document.querySelector(location.hash).scrollIntoView({behavior:"smooth"})}));var S=x,T=r(50),A=r(79),C=r(26);var k=r(154);function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var R={title:"",root:"/",url:{path:"/",query:{},hash:""},network:{inProgress:!1,isOffline:!1}};R.title=document.title,R.url.path=location.pathname,location.search&&(R.url.query=C.a.parse(location.search.slice(1))),location.hash&&(R.url.hash=location.hash);var I=R,L=Object(a.createContext)(null),N=Object(a.createContext)(null);var K={reducer:Object(a.createRef)(),dispatch:Object(a.createRef)(),state:Object(a.createRef)()};K.reducer.current=function(e,t){var r=t.type,n=t.data,a=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(r,!0).forEach((function(t){D(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e);switch(r){case"pwa.reset":return n;case"pwa.change":return n.title&&(document.title=n.title),Object(T.c)(a,n);case"pwa.navigate":var o=n.scroll,c=n.replace,u=n.root,l=c?"replace":"push",s=function(e){if(!e)throw Error("toURL expects a string or an object");if(Object(i.m)(e)){var t=Object(k.a)(e);return{path:t.pathname.toLowerCase(),query:t.query?C.a.parse(t.query):{},hash:t.hash||""}}return{path:e.path?e.path.toLowerCase():"/",query:e.query||{},hash:e.hash||""}}(n.to);a.root=u||a.root,a.url=s,S[l](function(e){var t="";return Object(A.a)(e.query).length&&(t="?"+C.a.stringify(e.query)),e.path+t+e.hash}(s),a),o&&window.scrollTo({top:0,left:0,behavior:"smooth"})}return a},K.state.current=I;var _={refs:K,reducer:function(e,t){return K.reducer.current(e,t)},dispatch:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};K.dispatch.current({type:e,data:t})},get:function(e){return e?Object(T.a)(K.state.current,e):K.state.current},set:function(e,t){K.dispatch.current("change",Object(T.d)({},e,t))}};function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(n=(c=u.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(i){a=!0,o=i}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function G(e){var t=J(Object(a.useReducer)(_.reducer,K.state.current),2),r=t[0],n=t[1];K.dispatch.current=n,K.state.current=r,Object(a.useEffect)((function(){function t(e){e.state&&n({type:"pwa.reset",data:e.state})}return e.reducer&&(K.dispatch.current=function(t,r){return e.reducer(K.reducer.current(t,r),r)}),S.on("popstate",t),n({type:"pwa.navigate",data:{root:e.root,to:r.url,replace:!0}}),function(){S.off("popstate",t)}}),[]);var c="/"!==r.root?r.url.path.replace(r.root,""):r.url.path;return o.a.createElement(h.Root,{context:r,path:c},o.a.createElement(w.Provider,null,o.a.createElement(N.Provider,{value:n},o.a.createElement(L.Provider,{value:r},e.children))))}function H(e){var t=e.protocol,r=e.hostname,n=e.port;return t+"//"+r+(n?":"+n:"")}function M(e,t,r){var n,a=t.onClick,o=t.target,c=t.newtab,u=t.native,l=t.delay,s=t.scroll;if(("function"===typeof a&&a(e,t,r),!(u||o||c))&&(n=e.currentTarget,H(E.a.location)===H(n)&&"#"!==r.charAt(0)&&0===e.button&&!(e.altKey||e.metaKey||e.ctrlKey||e.shiftKey)))return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(i.m)(e)?_.dispatch("pwa.navigate",{to:e}):Object(i.j)(e.delay)?setTimeout((function(){return _.dispatch("pwa.navigate",e)}),e.delay):_.dispatch("pwa.navigate",e)}({to:r,delay:l,scroll:s}),function(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}(e)}function U(e){var t=e.id,r=e.className,n=e.style,o=e.target,c=e.to,i=e.newtab,l=e.label,f=e.children,d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;if("/"===e[0])return u(t.root,e);if(0===e.indexOf("http"))return e;if("@"===e[0]){var r=e.slice(0,e.indexOf("/")>>>0),n=e.slice(r.length);return u(t.root,t[r],n)}return u(t.root,t.route,e)}(c,Object(a.useContext)(s));return Object(a.createElement)("a",{id:t,className:r,style:n,href:d,target:o||i&&"_blank",children:f||l,onClick:function(t){return M(t,e,d)}})}function V(e){if("string"!==typeof e.children)throw Error("<Title> accepts only 'string' as children.");return Object(a.useEffect)((function(){_.set("title",e.children)}),[e.children]),e.hidden?null:e.className?o.a.createElement("div",e,e.children):e.children}var B=r(155);function F(e){return e.json().then((function(t){return{message:e.statusText,code:e.status,body:t}})).catch((function(e){return{message:"HTTP response error",code:400,body:e.message}}))}function X(e){var t=e.url,r=e.method,n=void 0===r?"GET":r,a=e.data,o=void 0===a?null:a,c=e.headers,u={method:n,headers:void 0===c?{}:c,credentials:"include"};return o&&(u.body=JSON.stringify(o),u.headers["content-type"]="application/json"),Object(B.a)(t,u).then(F).then((function(e){if(e.code>=500)throw e;if(e.code>=400)throw e;return e}))}var z={get:function(e,t){return t&&(e+="?"+C.a.stringify(t)),X({url:e,method:"GET"})},post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.data,n=t.query,a=t.headers;return n&&(e+="?"+C.a.stringify(n)),X({url:e,data:r,headers:a,method:"POST"})},put:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.data,n=t.query,a=t.headers;return n&&(e+="?"+C.a.stringify(n)),X({url:e,data:r,headers:a,method:"PUT"})},delete:function(e,t){return t&&(e+="?"+C.a.stringify(t)),X({url:e,method:"DELETE"})}};r.d(t,"a",(function(){return G})),r.d(t,"c",(function(){return h})),r.d(t,"b",(function(){return U})),r.d(t,"d",(function(){return V})),r.d(t,"e",(function(){return z})),r.d(t,"f",(function(){return n.a}))},156:function(e,t,r){r(157),e.exports=r(378)},378:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r.n(n),o=r(147),c=r.n(o),u=r(13),i=r(50);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(n=(c=u.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(i){a=!0,o=i}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=Object(u.f)((function(){return r.e(11).then(r.bind(null,413))})),f=Object(u.f)((function(){return r.e(6).then(r.bind(null,411))})),d=Object(u.f)((function(){return Promise.all([r.e(0),r.e(8)]).then(r.bind(null,409))})),h=Object(u.f)((function(){return Promise.all([r.e(0),r.e(9)]).then(r.bind(null,412))})),p=Object(u.f)((function(){return r.e(10).then(r.bind(null,407))})),b=Object(u.f)((function(){return r.e(7).then(r.bind(null,410))})),v=Object(u.f)((function(){return r.e(4).then(r.bind(null,406))})),y=Object(u.f)((function(){return Promise.all([r.e(0),r.e(5)]).then(r.bind(null,408))})),m=Object(u.f)((function(){return r.e(12).then(r.bind(null,414))})),O={"/":s,"/gradient":f,"/plants":d,"/architecture":h,"/calendar":p,"/books":b,"/structure":v,"/universe-facts":y},g=a.a.createElement(m,null),j=function(e){var t=e.layout,r=e.path,a=l(Object(n.useState)(null),2),o=a[0],c=a[1];Object(n.useEffect)((function(){var e="/"==r?"/home":r;u.e.get("data.json",{}).then((function(t){var r=t.body.find((function(t){return"/"+t.id==e}));c(r)})).catch((function(e){console.log("HTTP Error",e)}))}),[r]);var i=o?Object(n.createElement)(t,{data:o}):g;return o?i:null},w=a.a.createElement(a.a.Fragment,null,a.a.createElement(u.c,{exact:!0,match:"404",render:m}),Object(i.b)(O).map((function(e){return a.a.createElement(u.c,{exact:!0,match:e,render:function(){return a.a.createElement(j,{layout:O[e],path:e})},key:e})})),a.a.createElement(u.c.NotMatched,{render:m}));const E={container:"_1sXmyn"};r(109).a.bind(null,E);var P=E,x=document.getElementById("application"),S="/portfolio";!function(){var e=a.a.createElement(u.a,{root:S},a.a.createElement("b",{className:P.container},w));c.a.render(e,x,(function(){x.classList.replace("is_loading","is_loaded")}))}()}},[[156,3,1]]]);