"use strict";(()=>{var db=Object.create;var Ei=Object.defineProperty;var pb=Object.getOwnPropertyDescriptor;var mb=Object.getOwnPropertyNames;var hb=Object.getPrototypeOf,gb=Object.prototype.hasOwnProperty;var $n=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),wl=(e,n)=>{for(var t in n)Ei(e,t,{get:n[t],enumerable:!0})},bb=(e,n,t,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let u of mb(n))!gb.call(e,u)&&u!==t&&Ei(e,u,{get:()=>n[u],enumerable:!(a=pb(n,u))||a.enumerable});return e};var T=(e,n,t)=>(t=e!=null?db(hb(e)):{},bb(n||!e||!e.__esModule?Ei(t,"default",{value:e,enumerable:!0}):t,e));var od=$n(de=>{"use strict";function Ri(e,n){var t=e.length;e.push(n);e:for(;0<t;){var a=t-1>>>1,u=e[a];if(0<Cl(u,n))e[a]=n,e[t]=u,t=a;else break e}}function et(e){return e.length===0?null:e[0]}function _l(e){if(e.length===0)return null;var n=e[0],t=e.pop();if(t!==n){e[0]=t;e:for(var a=0,u=e.length,o=u>>>1;a<o;){var l=2*(a+1)-1,r=e[l],i=l+1,s=e[i];if(0>Cl(r,t))i<u&&0>Cl(s,r)?(e[a]=s,e[i]=t,a=i):(e[a]=r,e[l]=t,a=l);else if(i<u&&0>Cl(s,t))e[a]=s,e[i]=t,a=i;else break e}}return n}function Cl(e,n){var t=e.sortIndex-n.sortIndex;return t!==0?t:e.id-n.id}de.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Jf=performance,de.unstable_now=function(){return Jf.now()}):(Ti=Date,Pf=Ti.now(),de.unstable_now=function(){return Ti.now()-Pf});var Jf,Ti,Pf,bt=[],Zt=[],vb=1,Rn=null,Je=3,Ni=!1,ro=!1,io=!1,zi=!1,ed=typeof setTimeout=="function"?setTimeout:null,nd=typeof clearTimeout=="function"?clearTimeout:null,Wf=typeof setImmediate<"u"?setImmediate:null;function kl(e){for(var n=et(Zt);n!==null;){if(n.callback===null)_l(Zt);else if(n.startTime<=e)_l(Zt),n.sortIndex=n.expirationTime,Ri(bt,n);else break;n=et(Zt)}}function Li(e){if(io=!1,kl(e),!ro)if(et(bt)!==null)ro=!0,ou||(ou=!0,uu());else{var n=et(Zt);n!==null&&Oi(Li,n.startTime-e)}}var ou=!1,so=-1,td=5,ad=-1;function ud(){return zi?!0:!(de.unstable_now()-ad<td)}function Di(){if(zi=!1,ou){var e=de.unstable_now();ad=e;var n=!0;try{e:{ro=!1,io&&(io=!1,nd(so),so=-1),Ni=!0;var t=Je;try{n:{for(kl(e),Rn=et(bt);Rn!==null&&!(Rn.expirationTime>e&&ud());){var a=Rn.callback;if(typeof a=="function"){Rn.callback=null,Je=Rn.priorityLevel;var u=a(Rn.expirationTime<=e);if(e=de.unstable_now(),typeof u=="function"){Rn.callback=u,kl(e),n=!0;break n}Rn===et(bt)&&_l(bt),kl(e)}else _l(bt);Rn=et(bt)}if(Rn!==null)n=!0;else{var o=et(Zt);o!==null&&Oi(Li,o.startTime-e),n=!1}}break e}finally{Rn=null,Je=t,Ni=!1}n=void 0}}finally{n?uu():ou=!1}}}var uu;typeof Wf=="function"?uu=function(){Wf(Di)}:typeof MessageChannel<"u"?(Mi=new MessageChannel,$f=Mi.port2,Mi.port1.onmessage=Di,uu=function(){$f.postMessage(null)}):uu=function(){ed(Di,0)};var Mi,$f;function Oi(e,n){so=ed(function(){e(de.unstable_now())},n)}de.unstable_IdlePriority=5;de.unstable_ImmediatePriority=1;de.unstable_LowPriority=4;de.unstable_NormalPriority=3;de.unstable_Profiling=null;de.unstable_UserBlockingPriority=2;de.unstable_cancelCallback=function(e){e.callback=null};de.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):td=0<e?Math.floor(1e3/e):5};de.unstable_getCurrentPriorityLevel=function(){return Je};de.unstable_next=function(e){switch(Je){case 1:case 2:case 3:var n=3;break;default:n=Je}var t=Je;Je=n;try{return e()}finally{Je=t}};de.unstable_requestPaint=function(){zi=!0};de.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=Je;Je=e;try{return n()}finally{Je=t}};de.unstable_scheduleCallback=function(e,n,t){var a=de.unstable_now();switch(typeof t=="object"&&t!==null?(t=t.delay,t=typeof t=="number"&&0<t?a+t:a):t=a,e){case 1:var u=-1;break;case 2:u=250;break;case 5:u=1073741823;break;case 4:u=1e4;break;default:u=5e3}return u=t+u,e={id:vb++,callback:n,priorityLevel:e,startTime:t,expirationTime:u,sortIndex:-1},t>a?(e.sortIndex=t,Ri(Zt,e),et(bt)===null&&e===et(Zt)&&(io?(nd(so),so=-1):io=!0,Oi(Li,t-a))):(e.sortIndex=u,Ri(bt,e),ro||Ni||(ro=!0,ou||(ou=!0,uu()))),e};de.unstable_shouldYield=ud;de.unstable_wrapCallback=function(e){var n=Je;return function(){var t=Je;Je=n;try{return e.apply(this,arguments)}finally{Je=t}}}});var rd=$n((w6,ld)=>{"use strict";ld.exports=od()});var vd=$n(F=>{"use strict";var Ui=Symbol.for("react.transitional.element"),xb=Symbol.for("react.portal"),yb=Symbol.for("react.fragment"),wb=Symbol.for("react.strict_mode"),Cb=Symbol.for("react.profiler"),kb=Symbol.for("react.consumer"),_b=Symbol.for("react.context"),Sb=Symbol.for("react.forward_ref"),Ab=Symbol.for("react.suspense"),Eb=Symbol.for("react.memo"),dd=Symbol.for("react.lazy"),Tb=Symbol.for("react.activity"),id=Symbol.iterator;function Db(e){return e===null||typeof e!="object"?null:(e=id&&e[id]||e["@@iterator"],typeof e=="function"?e:null)}var pd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},md=Object.assign,hd={};function ru(e,n,t){this.props=e,this.context=n,this.refs=hd,this.updater=t||pd}ru.prototype.isReactComponent={};ru.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ru.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function gd(){}gd.prototype=ru.prototype;function Bi(e,n,t){this.props=e,this.context=n,this.refs=hd,this.updater=t||pd}var Hi=Bi.prototype=new gd;Hi.constructor=Bi;md(Hi,ru.prototype);Hi.isPureReactComponent=!0;var sd=Array.isArray;function qi(){}var ie={H:null,A:null,T:null,S:null},bd=Object.prototype.hasOwnProperty;function ji(e,n,t){var a=t.ref;return{$$typeof:Ui,type:e,key:n,ref:a!==void 0?a:null,props:t}}function Mb(e,n){return ji(e.type,n,e.props)}function Vi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ui}function Rb(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var cd=/\/+/g;function Fi(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Rb(""+e.key):n.toString(36)}function Nb(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(qi,qi):(e.status="pending",e.then(function(n){e.status==="pending"&&(e.status="fulfilled",e.value=n)},function(n){e.status==="pending"&&(e.status="rejected",e.reason=n)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function lu(e,n,t,a,u){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"bigint":case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Ui:case xb:l=!0;break;case dd:return l=e._init,lu(l(e._payload),n,t,a,u)}}if(l)return u=u(e),l=a===""?"."+Fi(e,0):a,sd(u)?(t="",l!=null&&(t=l.replace(cd,"$&/")+"/"),lu(u,n,t,"",function(s){return s})):u!=null&&(Vi(u)&&(u=Mb(u,t+(u.key==null||e&&e.key===u.key?"":(""+u.key).replace(cd,"$&/")+"/")+l)),n.push(u)),1;l=0;var r=a===""?".":a+":";if(sd(e))for(var i=0;i<e.length;i++)a=e[i],o=r+Fi(a,i),l+=lu(a,n,t,o,u);else if(i=Db(e),typeof i=="function")for(e=i.call(e),i=0;!(a=e.next()).done;)a=a.value,o=r+Fi(a,i++),l+=lu(a,n,t,o,u);else if(o==="object"){if(typeof e.then=="function")return lu(Nb(e),n,t,a,u);throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}return l}function Sl(e,n,t){if(e==null)return e;var a=[],u=0;return lu(e,a,"","",function(o){return n.call(t,o,u++)}),a}function zb(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var fd=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Lb={map:Sl,forEach:function(e,n,t){Sl(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return Sl(e,function(){n++}),n},toArray:function(e){return Sl(e,function(n){return n})||[]},only:function(e){if(!Vi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};F.Activity=Tb;F.Children=Lb;F.Component=ru;F.Fragment=yb;F.Profiler=Cb;F.PureComponent=Bi;F.StrictMode=wb;F.Suspense=Ab;F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ie;F.__COMPILER_RUNTIME={__proto__:null,c:function(e){return ie.H.useMemoCache(e)}};F.cache=function(e){return function(){return e.apply(null,arguments)}};F.cacheSignal=function(){return null};F.cloneElement=function(e,n,t){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var a=md({},e.props),u=e.key;if(n!=null)for(o in n.key!==void 0&&(u=""+n.key),n)!bd.call(n,o)||o==="key"||o==="__self"||o==="__source"||o==="ref"&&n.ref===void 0||(a[o]=n[o]);var o=arguments.length-2;if(o===1)a.children=t;else if(1<o){for(var l=Array(o),r=0;r<o;r++)l[r]=arguments[r+2];a.children=l}return ji(e.type,u,a)};F.createContext=function(e){return e={$$typeof:_b,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:kb,_context:e},e};F.createElement=function(e,n,t){var a,u={},o=null;if(n!=null)for(a in n.key!==void 0&&(o=""+n.key),n)bd.call(n,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(u[a]=n[a]);var l=arguments.length-2;if(l===1)u.children=t;else if(1<l){for(var r=Array(l),i=0;i<l;i++)r[i]=arguments[i+2];u.children=r}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)u[a]===void 0&&(u[a]=l[a]);return ji(e,o,u)};F.createRef=function(){return{current:null}};F.forwardRef=function(e){return{$$typeof:Sb,render:e}};F.isValidElement=Vi;F.lazy=function(e){return{$$typeof:dd,_payload:{_status:-1,_result:e},_init:zb}};F.memo=function(e,n){return{$$typeof:Eb,type:e,compare:n===void 0?null:n}};F.startTransition=function(e){var n=ie.T,t={};ie.T=t;try{var a=e(),u=ie.S;u!==null&&u(t,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(qi,fd)}catch(o){fd(o)}finally{n!==null&&t.types!==null&&(n.types=t.types),ie.T=n}};F.unstable_useCacheRefresh=function(){return ie.H.useCacheRefresh()};F.use=function(e){return ie.H.use(e)};F.useActionState=function(e,n,t){return ie.H.useActionState(e,n,t)};F.useCallback=function(e,n){return ie.H.useCallback(e,n)};F.useContext=function(e){return ie.H.useContext(e)};F.useDebugValue=function(){};F.useDeferredValue=function(e,n){return ie.H.useDeferredValue(e,n)};F.useEffect=function(e,n){return ie.H.useEffect(e,n)};F.useEffectEvent=function(e){return ie.H.useEffectEvent(e)};F.useId=function(){return ie.H.useId()};F.useImperativeHandle=function(e,n,t){return ie.H.useImperativeHandle(e,n,t)};F.useInsertionEffect=function(e,n){return ie.H.useInsertionEffect(e,n)};F.useLayoutEffect=function(e,n){return ie.H.useLayoutEffect(e,n)};F.useMemo=function(e,n){return ie.H.useMemo(e,n)};F.useOptimistic=function(e,n){return ie.H.useOptimistic(e,n)};F.useReducer=function(e,n,t){return ie.H.useReducer(e,n,t)};F.useRef=function(e){return ie.H.useRef(e)};F.useState=function(e){return ie.H.useState(e)};F.useSyncExternalStore=function(e,n,t){return ie.H.useSyncExternalStore(e,n,t)};F.useTransition=function(){return ie.H.useTransition()};F.version="19.2.3"});var je=$n((k6,xd)=>{"use strict";xd.exports=vd()});var wd=$n(tn=>{"use strict";var Ob=je();function yd(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Yt(){}var nn={d:{f:Yt,r:function(){throw Error(yd(522))},D:Yt,C:Yt,L:Yt,m:Yt,X:Yt,S:Yt,M:Yt},p:0,findDOMNode:null},Fb=Symbol.for("react.portal");function qb(e,n,t){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fb,key:a==null?null:""+a,children:e,containerInfo:n,implementation:t}}var co=Ob.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Al(e,n){if(e==="font")return"";if(typeof n=="string")return n==="use-credentials"?n:""}tn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=nn;tn.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)throw Error(yd(299));return qb(e,n,null,t)};tn.flushSync=function(e){var n=co.T,t=nn.p;try{if(co.T=null,nn.p=2,e)return e()}finally{co.T=n,nn.p=t,nn.d.f()}};tn.preconnect=function(e,n){typeof e=="string"&&(n?(n=n.crossOrigin,n=typeof n=="string"?n==="use-credentials"?n:"":void 0):n=null,nn.d.C(e,n))};tn.prefetchDNS=function(e){typeof e=="string"&&nn.d.D(e)};tn.preinit=function(e,n){if(typeof e=="string"&&n&&typeof n.as=="string"){var t=n.as,a=Al(t,n.crossOrigin),u=typeof n.integrity=="string"?n.integrity:void 0,o=typeof n.fetchPriority=="string"?n.fetchPriority:void 0;t==="style"?nn.d.S(e,typeof n.precedence=="string"?n.precedence:void 0,{crossOrigin:a,integrity:u,fetchPriority:o}):t==="script"&&nn.d.X(e,{crossOrigin:a,integrity:u,fetchPriority:o,nonce:typeof n.nonce=="string"?n.nonce:void 0})}};tn.preinitModule=function(e,n){if(typeof e=="string")if(typeof n=="object"&&n!==null){if(n.as==null||n.as==="script"){var t=Al(n.as,n.crossOrigin);nn.d.M(e,{crossOrigin:t,integrity:typeof n.integrity=="string"?n.integrity:void 0,nonce:typeof n.nonce=="string"?n.nonce:void 0})}}else n==null&&nn.d.M(e)};tn.preload=function(e,n){if(typeof e=="string"&&typeof n=="object"&&n!==null&&typeof n.as=="string"){var t=n.as,a=Al(t,n.crossOrigin);nn.d.L(e,t,{crossOrigin:a,integrity:typeof n.integrity=="string"?n.integrity:void 0,nonce:typeof n.nonce=="string"?n.nonce:void 0,type:typeof n.type=="string"?n.type:void 0,fetchPriority:typeof n.fetchPriority=="string"?n.fetchPriority:void 0,referrerPolicy:typeof n.referrerPolicy=="string"?n.referrerPolicy:void 0,imageSrcSet:typeof n.imageSrcSet=="string"?n.imageSrcSet:void 0,imageSizes:typeof n.imageSizes=="string"?n.imageSizes:void 0,media:typeof n.media=="string"?n.media:void 0})}};tn.preloadModule=function(e,n){if(typeof e=="string")if(n){var t=Al(n.as,n.crossOrigin);nn.d.m(e,{as:typeof n.as=="string"&&n.as!=="script"?n.as:void 0,crossOrigin:t,integrity:typeof n.integrity=="string"?n.integrity:void 0})}else nn.d.m(e)};tn.requestFormReset=function(e){nn.d.r(e)};tn.unstable_batchedUpdates=function(e,n){return e(n)};tn.useFormState=function(e,n,t){return co.H.useFormState(e,n,t)};tn.useFormStatus=function(){return co.H.useHostTransitionStatus()};tn.version="19.2.3"});var _d=$n((S6,kd)=>{"use strict";function Cd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Cd)}catch(e){console.error(e)}}Cd(),kd.exports=wd()});var Fh=$n(Pr=>{"use strict";var Se=rd(),Jp=je(),Ub=_d();function S(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Pp(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Po(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Wp(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function $p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Sd(e){if(Po(e)!==e)throw Error(S(188))}function Bb(e){var n=e.alternate;if(!n){if(n=Po(e),n===null)throw Error(S(188));return n!==e?null:e}for(var t=e,a=n;;){var u=t.return;if(u===null)break;var o=u.alternate;if(o===null){if(a=u.return,a!==null){t=a;continue}break}if(u.child===o.child){for(o=u.child;o;){if(o===t)return Sd(u),e;if(o===a)return Sd(u),n;o=o.sibling}throw Error(S(188))}if(t.return!==a.return)t=u,a=o;else{for(var l=!1,r=u.child;r;){if(r===t){l=!0,t=u,a=o;break}if(r===a){l=!0,a=u,t=o;break}r=r.sibling}if(!l){for(r=o.child;r;){if(r===t){l=!0,t=o,a=u;break}if(r===a){l=!0,a=o,t=u;break}r=r.sibling}if(!l)throw Error(S(189))}}if(t.alternate!==a)throw Error(S(190))}if(t.tag!==3)throw Error(S(188));return t.stateNode.current===t?e:n}function e1(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=e1(e),n!==null)return n;e=e.sibling}return null}var fe=Object.assign,Hb=Symbol.for("react.element"),El=Symbol.for("react.transitional.element"),xo=Symbol.for("react.portal"),pu=Symbol.for("react.fragment"),n1=Symbol.for("react.strict_mode"),Cs=Symbol.for("react.profiler"),t1=Symbol.for("react.consumer"),St=Symbol.for("react.context"),bc=Symbol.for("react.forward_ref"),ks=Symbol.for("react.suspense"),_s=Symbol.for("react.suspense_list"),vc=Symbol.for("react.memo"),Qt=Symbol.for("react.lazy");Symbol.for("react.scope");var Ss=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var jb=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Ad=Symbol.iterator;function fo(e){return e===null||typeof e!="object"?null:(e=Ad&&e[Ad]||e["@@iterator"],typeof e=="function"?e:null)}var Vb=Symbol.for("react.client.reference");function As(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Vb?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case pu:return"Fragment";case Cs:return"Profiler";case n1:return"StrictMode";case ks:return"Suspense";case _s:return"SuspenseList";case Ss:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case xo:return"Portal";case St:return e.displayName||"Context";case t1:return(e._context.displayName||"Context")+".Consumer";case bc:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case vc:return n=e.displayName||null,n!==null?n:As(e.type)||"Memo";case Qt:n=e._payload,e=e._init;try{return As(e(n))}catch{}}return null}var yo=Array.isArray,L=Jp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=Ub.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,La={pending:!1,data:null,method:null,action:null},Es=[],mu=-1;function ot(e){return{current:e}}function ze(e){0>mu||(e.current=Es[mu],Es[mu]=null,mu--)}function le(e,n){mu++,Es[mu]=e.current,e.current=n}var ut=ot(null),qo=ot(null),ua=ot(null),lr=ot(null);function rr(e,n){switch(le(ua,n),le(qo,e),le(ut,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?zp(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=zp(n),e=Ch(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}ze(ut),le(ut,e)}function Nu(){ze(ut),ze(qo),ze(ua)}function Ts(e){e.memoizedState!==null&&le(lr,e);var n=ut.current,t=Ch(n,e.type);n!==t&&(le(qo,e),le(ut,t))}function ir(e){qo.current===e&&(ze(ut),ze(qo)),lr.current===e&&(ze(lr),Xo._currentValue=La)}var Gi,Ed;function Ma(e){if(Gi===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Gi=n&&n[1]||"",Ed=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Gi+e+Ed}var Ii=!1;function Zi(e,n){if(!e||Ii)return"";Ii=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(n){var m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(p){var d=p}Reflect.construct(e,[],m)}else{try{m.call()}catch(p){d=p}e.call(m.prototype)}}else{try{throw Error()}catch(p){d=p}(m=e())&&typeof m.catch=="function"&&m.catch(function(){})}}catch(p){if(p&&d&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=a.DetermineComponentFrameRoot(),l=o[0],r=o[1];if(l&&r){var i=l.split(`
`),s=r.split(`
`);for(u=a=0;a<i.length&&!i[a].includes("DetermineComponentFrameRoot");)a++;for(;u<s.length&&!s[u].includes("DetermineComponentFrameRoot");)u++;if(a===i.length||u===s.length)for(a=i.length-1,u=s.length-1;1<=a&&0<=u&&i[a]!==s[u];)u--;for(;1<=a&&0<=u;a--,u--)if(i[a]!==s[u]){if(a!==1||u!==1)do if(a--,u--,0>u||i[a]!==s[u]){var f=`
`+i[a].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=a&&0<=u);break}}}finally{Ii=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?Ma(t):""}function Gb(e,n){switch(e.tag){case 26:case 27:case 5:return Ma(e.type);case 16:return Ma("Lazy");case 13:return e.child!==n&&n!==null?Ma("Suspense Fallback"):Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 15:return Zi(e.type,!1);case 11:return Zi(e.type.render,!1);case 1:return Zi(e.type,!0);case 31:return Ma("Activity");default:return""}}function Td(e){try{var n="",t=null;do n+=Gb(e,t),t=e,e=e.return;while(e);return n}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ds=Object.prototype.hasOwnProperty,xc=Se.unstable_scheduleCallback,Yi=Se.unstable_cancelCallback,Ib=Se.unstable_shouldYield,Zb=Se.unstable_requestPaint,yn=Se.unstable_now,Yb=Se.unstable_getCurrentPriorityLevel,a1=Se.unstable_ImmediatePriority,u1=Se.unstable_UserBlockingPriority,sr=Se.unstable_NormalPriority,Qb=Se.unstable_LowPriority,o1=Se.unstable_IdlePriority,Xb=Se.log,Kb=Se.unstable_setDisableYieldValue,Wo=null,wn=null;function $t(e){if(typeof Xb=="function"&&Kb(e),wn&&typeof wn.setStrictMode=="function")try{wn.setStrictMode(Wo,e)}catch{}}var Cn=Math.clz32?Math.clz32:Wb,Jb=Math.log,Pb=Math.LN2;function Wb(e){return e>>>=0,e===0?32:31-(Jb(e)/Pb|0)|0}var Tl=256,Dl=262144,Ml=4194304;function Ra(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Or(e,n,t){var a=e.pendingLanes;if(a===0)return 0;var u=0,o=e.suspendedLanes,l=e.pingedLanes;e=e.warmLanes;var r=a&134217727;return r!==0?(a=r&~o,a!==0?u=Ra(a):(l&=r,l!==0?u=Ra(l):t||(t=r&~e,t!==0&&(u=Ra(t))))):(r=a&~o,r!==0?u=Ra(r):l!==0?u=Ra(l):t||(t=a&~e,t!==0&&(u=Ra(t)))),u===0?0:n!==0&&n!==u&&(n&o)===0&&(o=u&-u,t=n&-n,o>=t||o===32&&(t&4194048)!==0)?n:u}function $o(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function $b(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function l1(){var e=Ml;return Ml<<=1,(Ml&62914560)===0&&(Ml=4194304),e}function Qi(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function el(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function e3(e,n,t,a,u,o){var l=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var r=e.entanglements,i=e.expirationTimes,s=e.hiddenUpdates;for(t=l&~t;0<t;){var f=31-Cn(t),m=1<<f;r[f]=0,i[f]=-1;var d=s[f];if(d!==null)for(s[f]=null,f=0;f<d.length;f++){var p=d[f];p!==null&&(p.lane&=-536870913)}t&=~m}a!==0&&r1(e,a,0),o!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=o&~(l&~n))}function r1(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var a=31-Cn(n);e.entangledLanes|=n,e.entanglements[a]=e.entanglements[a]|1073741824|t&261930}function i1(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var a=31-Cn(t),u=1<<a;u&n|e[a]&n&&(e[a]|=n),t&=~u}}function s1(e,n){var t=n&-n;return t=(t&42)!==0?1:yc(t),(t&(e.suspendedLanes|n))!==0?0:t}function yc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function wc(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function c1(){var e=P.p;return e!==0?e:(e=window.event,e===void 0?32:zh(e.type))}function Dd(e,n){var t=P.p;try{return P.p=e,n()}finally{P.p=t}}var ba=Math.random().toString(36).slice(2),Ge="__reactFiber$"+ba,mn="__reactProps$"+ba,Gu="__reactContainer$"+ba,Ms="__reactEvents$"+ba,n3="__reactListeners$"+ba,t3="__reactHandles$"+ba,Md="__reactResources$"+ba,nl="__reactMarker$"+ba;function Cc(e){delete e[Ge],delete e[mn],delete e[Ms],delete e[n3],delete e[t3]}function hu(e){var n=e[Ge];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Gu]||t[Ge]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Up(e);e!==null;){if(t=e[Ge])return t;e=Up(e)}return n}e=t,t=e.parentNode}return null}function Iu(e){if(e=e[Ge]||e[Gu]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function wo(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(S(33))}function Su(e){var n=e[Md];return n||(n=e[Md]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ne(e){e[nl]=!0}var f1=new Set,d1={};function Ia(e,n){zu(e,n),zu(e+"Capture",n)}function zu(e,n){for(d1[e]=n,e=0;e<n.length;e++)f1.add(n[e])}var a3=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Rd={},Nd={};function u3(e){return Ds.call(Nd,e)?!0:Ds.call(Rd,e)?!1:a3.test(e)?Nd[e]=!0:(Rd[e]=!0,!1)}function Zl(e,n,t){if(u3(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var a=n.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Rl(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function vt(e,n,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+a)}}function zn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function p1(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function o3(e,n,t){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var u=a.get,o=a.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(l){t=""+l,o.call(this,l)}}),Object.defineProperty(e,n,{enumerable:a.enumerable}),{getValue:function(){return t},setValue:function(l){t=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Rs(e){if(!e._valueTracker){var n=p1(e)?"checked":"value";e._valueTracker=o3(e,n,""+e[n])}}function m1(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),a="";return e&&(a=p1(e)?e.checked?"true":"false":e.value),e=a,e!==t?(n.setValue(e),!0):!1}function cr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var l3=/[\n"\\]/g;function Fn(e){return e.replace(l3,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ns(e,n,t,a,u,o,l,r){e.name="",l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.type=l:e.removeAttribute("type"),n!=null?l==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+zn(n)):e.value!==""+zn(n)&&(e.value=""+zn(n)):l!=="submit"&&l!=="reset"||e.removeAttribute("value"),n!=null?zs(e,l,zn(n)):t!=null?zs(e,l,zn(t)):a!=null&&e.removeAttribute("value"),u==null&&o!=null&&(e.defaultChecked=!!o),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+zn(r):e.removeAttribute("name")}function h1(e,n,t,a,u,o,l,r){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.type=o),n!=null||t!=null){if(!(o!=="submit"&&o!=="reset"||n!=null)){Rs(e);return}t=t!=null?""+zn(t):"",n=n!=null?""+zn(n):t,r||n===e.value||(e.value=n),e.defaultValue=n}a=a??u,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=r?e.checked:!!a,e.defaultChecked=!!a,l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.name=l),Rs(e)}function zs(e,n,t){n==="number"&&cr(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function Au(e,n,t,a){if(e=e.options,n){n={};for(var u=0;u<t.length;u++)n["$"+t[u]]=!0;for(t=0;t<e.length;t++)u=n.hasOwnProperty("$"+e[t].value),e[t].selected!==u&&(e[t].selected=u),u&&a&&(e[t].defaultSelected=!0)}else{for(t=""+zn(t),n=null,u=0;u<e.length;u++){if(e[u].value===t){e[u].selected=!0,a&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function g1(e,n,t){if(n!=null&&(n=""+zn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+zn(t):""}function b1(e,n,t,a){if(n==null){if(a!=null){if(t!=null)throw Error(S(92));if(yo(a)){if(1<a.length)throw Error(S(93));a=a[0]}t=a}t==null&&(t=""),n=t}t=zn(n),e.defaultValue=t,a=e.textContent,a===t&&a!==""&&a!==null&&(e.value=a),Rs(e)}function Lu(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var r3=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function zd(e,n,t){var a=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?a?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":a?e.setProperty(n,t):typeof t!="number"||t===0||r3.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function v1(e,n,t){if(n!=null&&typeof n!="object")throw Error(S(62));if(e=e.style,t!=null){for(var a in t)!t.hasOwnProperty(a)||n!=null&&n.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var u in n)a=n[u],n.hasOwnProperty(u)&&t[u]!==a&&zd(e,u,a)}else for(var o in n)n.hasOwnProperty(o)&&zd(e,o,n[o])}function kc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var i3=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),s3=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Yl(e){return s3.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function At(){}var Ls=null;function _c(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var gu=null,Eu=null;function Ld(e){var n=Iu(e);if(n&&(e=n.stateNode)){var t=e[mn]||null;e:switch(e=n.stateNode,n.type){case"input":if(Ns(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+Fn(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var a=t[n];if(a!==e&&a.form===e.form){var u=a[mn]||null;if(!u)throw Error(S(90));Ns(a,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<t.length;n++)a=t[n],a.form===e.form&&m1(a)}break e;case"textarea":g1(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&Au(e,!!t.multiple,n,!1)}}}var Xi=!1;function x1(e,n,t){if(Xi)return e(n,t);Xi=!0;try{var a=e(n);return a}finally{if(Xi=!1,(gu!==null||Eu!==null)&&(Qr(),gu&&(n=gu,e=Eu,Eu=gu=null,Ld(n),e)))for(n=0;n<e.length;n++)Ld(e[n])}}function Uo(e,n){var t=e.stateNode;if(t===null)return null;var a=t[mn]||null;if(a===null)return null;t=a[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(S(231,n,typeof t));return t}var Rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Os=!1;if(Rt)try{iu={},Object.defineProperty(iu,"passive",{get:function(){Os=!0}}),window.addEventListener("test",iu,iu),window.removeEventListener("test",iu,iu)}catch{Os=!1}var iu,ea=null,Sc=null,Ql=null;function y1(){if(Ql)return Ql;var e,n=Sc,t=n.length,a,u="value"in ea?ea.value:ea.textContent,o=u.length;for(e=0;e<t&&n[e]===u[e];e++);var l=t-e;for(a=1;a<=l&&n[t-a]===u[o-a];a++);return Ql=u.slice(e,1<a?1-a:void 0)}function Xl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Nl(){return!0}function Od(){return!1}function hn(e){function n(t,a,u,o,l){this._reactName=t,this._targetInst=u,this.type=a,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(t=e[r],this[r]=t?t(o):o[r]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Nl:Od,this.isPropagationStopped=Od,this}return fe(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Nl)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Nl)},persist:function(){},isPersistent:Nl}),n}var Za={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fr=hn(Za),tl=fe({},Za,{view:0,detail:0}),c3=hn(tl),Ki,Ji,po,qr=fe({},tl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ac,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==po&&(po&&e.type==="mousemove"?(Ki=e.screenX-po.screenX,Ji=e.screenY-po.screenY):Ji=Ki=0,po=e),Ki)},movementY:function(e){return"movementY"in e?e.movementY:Ji}}),Fd=hn(qr),f3=fe({},qr,{dataTransfer:0}),d3=hn(f3),p3=fe({},tl,{relatedTarget:0}),Pi=hn(p3),m3=fe({},Za,{animationName:0,elapsedTime:0,pseudoElement:0}),h3=hn(m3),g3=fe({},Za,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),b3=hn(g3),v3=fe({},Za,{data:0}),qd=hn(v3),x3={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},y3={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},w3={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function C3(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=w3[e])?!!n[e]:!1}function Ac(){return C3}var k3=fe({},tl,{key:function(e){if(e.key){var n=x3[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Xl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?y3[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ac,charCode:function(e){return e.type==="keypress"?Xl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_3=hn(k3),S3=fe({},qr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ud=hn(S3),A3=fe({},tl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ac}),E3=hn(A3),T3=fe({},Za,{propertyName:0,elapsedTime:0,pseudoElement:0}),D3=hn(T3),M3=fe({},qr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),R3=hn(M3),N3=fe({},Za,{newState:0,oldState:0}),z3=hn(N3),L3=[9,13,27,32],Ec=Rt&&"CompositionEvent"in window,_o=null;Rt&&"documentMode"in document&&(_o=document.documentMode);var O3=Rt&&"TextEvent"in window&&!_o,w1=Rt&&(!Ec||_o&&8<_o&&11>=_o),Bd=" ",Hd=!1;function C1(e,n){switch(e){case"keyup":return L3.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function k1(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var bu=!1;function F3(e,n){switch(e){case"compositionend":return k1(n);case"keypress":return n.which!==32?null:(Hd=!0,Bd);case"textInput":return e=n.data,e===Bd&&Hd?null:e;default:return null}}function q3(e,n){if(bu)return e==="compositionend"||!Ec&&C1(e,n)?(e=y1(),Ql=Sc=ea=null,bu=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return w1&&n.locale!=="ko"?null:n.data;default:return null}}var U3={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!U3[e.type]:n==="textarea"}function _1(e,n,t,a){gu?Eu?Eu.push(a):Eu=[a]:gu=a,n=Tr(n,"onChange"),0<n.length&&(t=new Fr("onChange","change",null,t,a),e.push({event:t,listeners:n}))}var So=null,Bo=null;function B3(e){xh(e,0)}function Ur(e){var n=wo(e);if(m1(n))return e}function Vd(e,n){if(e==="change")return n}var S1=!1;Rt&&(Rt?(Ll="oninput"in document,Ll||(Wi=document.createElement("div"),Wi.setAttribute("oninput","return;"),Ll=typeof Wi.oninput=="function"),zl=Ll):zl=!1,S1=zl&&(!document.documentMode||9<document.documentMode));var zl,Ll,Wi;function Gd(){So&&(So.detachEvent("onpropertychange",A1),Bo=So=null)}function A1(e){if(e.propertyName==="value"&&Ur(Bo)){var n=[];_1(n,Bo,e,_c(e)),x1(B3,n)}}function H3(e,n,t){e==="focusin"?(Gd(),So=n,Bo=t,So.attachEvent("onpropertychange",A1)):e==="focusout"&&Gd()}function j3(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ur(Bo)}function V3(e,n){if(e==="click")return Ur(n)}function G3(e,n){if(e==="input"||e==="change")return Ur(n)}function I3(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var _n=typeof Object.is=="function"?Object.is:I3;function Ho(e,n){if(_n(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),a=Object.keys(n);if(t.length!==a.length)return!1;for(a=0;a<t.length;a++){var u=t[a];if(!Ds.call(n,u)||!_n(e[u],n[u]))return!1}return!0}function Id(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zd(e,n){var t=Id(e);e=0;for(var a;t;){if(t.nodeType===3){if(a=e+t.textContent.length,e<=n&&a>=n)return{node:t,offset:n-e};e=a}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Id(t)}}function E1(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?E1(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function T1(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=cr(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=cr(e.document)}return n}function Tc(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Z3=Rt&&"documentMode"in document&&11>=document.documentMode,vu=null,Fs=null,Ao=null,qs=!1;function Yd(e,n,t){var a=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;qs||vu==null||vu!==cr(a)||(a=vu,"selectionStart"in a&&Tc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ao&&Ho(Ao,a)||(Ao=a,a=Tr(Fs,"onSelect"),0<a.length&&(n=new Fr("onSelect","select",null,n,t),e.push({event:n,listeners:a}),n.target=vu)))}function Da(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var xu={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionrun:Da("Transition","TransitionRun"),transitionstart:Da("Transition","TransitionStart"),transitioncancel:Da("Transition","TransitionCancel"),transitionend:Da("Transition","TransitionEnd")},$i={},D1={};Rt&&(D1=document.createElement("div").style,"AnimationEvent"in window||(delete xu.animationend.animation,delete xu.animationiteration.animation,delete xu.animationstart.animation),"TransitionEvent"in window||delete xu.transitionend.transition);function Ya(e){if($i[e])return $i[e];if(!xu[e])return e;var n=xu[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in D1)return $i[e]=n[t];return e}var M1=Ya("animationend"),R1=Ya("animationiteration"),N1=Ya("animationstart"),Y3=Ya("transitionrun"),Q3=Ya("transitionstart"),X3=Ya("transitioncancel"),z1=Ya("transitionend"),L1=new Map,Us="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Us.push("scrollEnd");function Zn(e,n){L1.set(e,n),Ia(n,[e])}var fr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Nn=[],yu=0,Dc=0;function Br(){for(var e=yu,n=Dc=yu=0;n<e;){var t=Nn[n];Nn[n++]=null;var a=Nn[n];Nn[n++]=null;var u=Nn[n];Nn[n++]=null;var o=Nn[n];if(Nn[n++]=null,a!==null&&u!==null){var l=a.pending;l===null?u.next=u:(u.next=l.next,l.next=u),a.pending=u}o!==0&&O1(t,u,o)}}function Hr(e,n,t,a){Nn[yu++]=e,Nn[yu++]=n,Nn[yu++]=t,Nn[yu++]=a,Dc|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Mc(e,n,t,a){return Hr(e,n,t,a),dr(e)}function Qa(e,n){return Hr(e,null,null,n),dr(e)}function O1(e,n,t){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t);for(var u=!1,o=e.return;o!==null;)o.childLanes|=t,a=o.alternate,a!==null&&(a.childLanes|=t),o.tag===22&&(e=o.stateNode,e===null||e._visibility&1||(u=!0)),e=o,o=o.return;return e.tag===3?(o=e.stateNode,u&&n!==null&&(u=31-Cn(t),e=o.hiddenUpdates,a=e[u],a===null?e[u]=[n]:a.push(n),n.lane=t|536870912),o):null}function dr(e){if(50<Oo)throw Oo=0,oc=null,Error(S(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var wu={};function K3(e,n,t,a){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vn(e,n,t,a){return new K3(e,n,t,a)}function Rc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Tt(e,n){var t=e.alternate;return t===null?(t=vn(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function F1(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Kl(e,n,t,a,u,o){var l=0;if(a=e,typeof e=="function")Rc(e)&&(l=1);else if(typeof e=="string")l=Wv(e,t,ut.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Ss:return e=vn(31,t,n,u),e.elementType=Ss,e.lanes=o,e;case pu:return Oa(t.children,u,o,n);case n1:l=8,u|=24;break;case Cs:return e=vn(12,t,n,u|2),e.elementType=Cs,e.lanes=o,e;case ks:return e=vn(13,t,n,u),e.elementType=ks,e.lanes=o,e;case _s:return e=vn(19,t,n,u),e.elementType=_s,e.lanes=o,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case St:l=10;break e;case t1:l=9;break e;case bc:l=11;break e;case vc:l=14;break e;case Qt:l=16,a=null;break e}l=29,t=Error(S(130,e===null?"null":typeof e,"")),a=null}return n=vn(l,t,n,u),n.elementType=e,n.type=a,n.lanes=o,n}function Oa(e,n,t,a){return e=vn(7,e,a,n),e.lanes=t,e}function es(e,n,t){return e=vn(6,e,null,n),e.lanes=t,e}function q1(e){var n=vn(18,null,null,0);return n.stateNode=e,n}function ns(e,n,t){return n=vn(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Qd=new WeakMap;function qn(e,n){if(typeof e=="object"&&e!==null){var t=Qd.get(e);return t!==void 0?t:(n={value:e,source:n,stack:Td(n)},Qd.set(e,n),n)}return{value:e,source:n,stack:Td(n)}}var Cu=[],ku=0,pr=null,jo=0,Ln=[],On=0,pa=null,nt=1,tt="";function kt(e,n){Cu[ku++]=jo,Cu[ku++]=pr,pr=e,jo=n}function U1(e,n,t){Ln[On++]=nt,Ln[On++]=tt,Ln[On++]=pa,pa=e;var a=nt;e=tt;var u=32-Cn(a)-1;a&=~(1<<u),t+=1;var o=32-Cn(n)+u;if(30<o){var l=u-u%5;o=(a&(1<<l)-1).toString(32),a>>=l,u-=l,nt=1<<32-Cn(n)+u|t<<u|a,tt=o+e}else nt=1<<o|t<<u|a,tt=e}function Nc(e){e.return!==null&&(kt(e,1),U1(e,1,0))}function zc(e){for(;e===pr;)pr=Cu[--ku],Cu[ku]=null,jo=Cu[--ku],Cu[ku]=null;for(;e===pa;)pa=Ln[--On],Ln[On]=null,tt=Ln[--On],Ln[On]=null,nt=Ln[--On],Ln[On]=null}function B1(e,n){Ln[On++]=nt,Ln[On++]=tt,Ln[On++]=pa,nt=n.id,tt=n.overflow,pa=e}var Ie=null,ce=null,Y=!1,oa=null,Un=!1,Bs=Error(S(519));function ma(e){var n=Error(S(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Vo(qn(n,e)),Bs}function Xd(e){var n=e.stateNode,t=e.type,a=e.memoizedProps;switch(n[Ge]=e,n[mn]=a,t){case"dialog":j("cancel",n),j("close",n);break;case"iframe":case"object":case"embed":j("load",n);break;case"video":case"audio":for(t=0;t<Yo.length;t++)j(Yo[t],n);break;case"source":j("error",n);break;case"img":case"image":case"link":j("error",n),j("load",n);break;case"details":j("toggle",n);break;case"input":j("invalid",n),h1(n,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":j("invalid",n);break;case"textarea":j("invalid",n),b1(n,a.value,a.defaultValue,a.children)}t=a.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||a.suppressHydrationWarning===!0||wh(n.textContent,t)?(a.popover!=null&&(j("beforetoggle",n),j("toggle",n)),a.onScroll!=null&&j("scroll",n),a.onScrollEnd!=null&&j("scrollend",n),a.onClick!=null&&(n.onclick=At),n=!0):n=!1,n||ma(e,!0)}function Kd(e){for(Ie=e.return;Ie;)switch(Ie.tag){case 5:case 31:case 13:Un=!1;return;case 27:case 3:Un=!0;return;default:Ie=Ie.return}}function su(e){if(e!==Ie)return!1;if(!Y)return Kd(e),Y=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||cc(e.type,e.memoizedProps)),t=!t),t&&ce&&ma(e),Kd(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));ce=qp(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));ce=qp(e)}else n===27?(n=ce,va(e.type)?(e=mc,mc=null,ce=e):ce=n):ce=Ie?Hn(e.stateNode.nextSibling):null;return!0}function Ba(){ce=Ie=null,Y=!1}function ts(){var e=oa;return e!==null&&(dn===null?dn=e:dn.push.apply(dn,e),oa=null),e}function Vo(e){oa===null?oa=[e]:oa.push(e)}var Hs=ot(null),Xa=null,Et=null;function Kt(e,n,t){le(Hs,n._currentValue),n._currentValue=t}function Dt(e){e._currentValue=Hs.current,ze(Hs)}function js(e,n,t){for(;e!==null;){var a=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,a!==null&&(a.childLanes|=n)):a!==null&&(a.childLanes&n)!==n&&(a.childLanes|=n),e===t)break;e=e.return}}function Vs(e,n,t,a){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var o=u.dependencies;if(o!==null){var l=u.child;o=o.firstContext;e:for(;o!==null;){var r=o;o=u;for(var i=0;i<n.length;i++)if(r.context===n[i]){o.lanes|=t,r=o.alternate,r!==null&&(r.lanes|=t),js(o.return,t,e),a||(l=null);break e}o=r.next}}else if(u.tag===18){if(l=u.return,l===null)throw Error(S(341));l.lanes|=t,o=l.alternate,o!==null&&(o.lanes|=t),js(l,t,e),l=null}else l=u.child;if(l!==null)l.return=u;else for(l=u;l!==null;){if(l===e){l=null;break}if(u=l.sibling,u!==null){u.return=l.return,l=u;break}l=l.return}u=l}}function Zu(e,n,t,a){e=null;for(var u=n,o=!1;u!==null;){if(!o){if((u.flags&524288)!==0)o=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var l=u.alternate;if(l===null)throw Error(S(387));if(l=l.memoizedProps,l!==null){var r=u.type;_n(u.pendingProps.value,l.value)||(e!==null?e.push(r):e=[r])}}else if(u===lr.current){if(l=u.alternate,l===null)throw Error(S(387));l.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Xo):e=[Xo])}u=u.return}e!==null&&Vs(n,e,t,a),n.flags|=262144}function mr(e){for(e=e.firstContext;e!==null;){if(!_n(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ha(e){Xa=e,Et=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ze(e){return H1(Xa,e)}function Ol(e,n){return Xa===null&&Ha(e),H1(e,n)}function H1(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},Et===null){if(e===null)throw Error(S(308));Et=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Et=Et.next=n;return t}var J3=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,a){e.push(a)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},P3=Se.unstable_scheduleCallback,W3=Se.unstable_NormalPriority,Ce={$$typeof:St,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Lc(){return{controller:new J3,data:new Map,refCount:0}}function al(e){e.refCount--,e.refCount===0&&P3(W3,function(){e.controller.abort()})}var Eo=null,Gs=0,Ou=0,Tu=null;function $3(e,n){if(Eo===null){var t=Eo=[];Gs=0,Ou=o0(),Tu={status:"pending",value:void 0,then:function(a){t.push(a)}}}return Gs++,n.then(Jd,Jd),n}function Jd(){if(--Gs===0&&Eo!==null){Tu!==null&&(Tu.status="fulfilled");var e=Eo;Eo=null,Ou=0,Tu=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function ev(e,n){var t=[],a={status:"pending",value:null,reason:null,then:function(u){t.push(u)}};return e.then(function(){a.status="fulfilled",a.value=n;for(var u=0;u<t.length;u++)(0,t[u])(n)},function(u){for(a.status="rejected",a.reason=u,u=0;u<t.length;u++)(0,t[u])(void 0)}),a}var Pd=L.S;L.S=function(e,n){eh=yn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&$3(e,n),Pd!==null&&Pd(e,n)};var Fa=ot(null);function Oc(){var e=Fa.current;return e!==null?e:oe.pooledCache}function Jl(e,n){n===null?le(Fa,Fa.current):le(Fa,n.pool)}function j1(){var e=Oc();return e===null?null:{parent:Ce._currentValue,pool:e}}var Yu=Error(S(460)),Fc=Error(S(474)),jr=Error(S(542)),hr={then:function(){}};function Wd(e){return e=e.status,e==="fulfilled"||e==="rejected"}function V1(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then(At,At),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,ep(e),e;default:if(typeof n.status=="string")n.then(At,At);else{if(e=oe,e!==null&&100<e.shellSuspendCounter)throw Error(S(482));e=n,e.status="pending",e.then(function(a){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=a}},function(a){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=a}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,ep(e),e}throw qa=n,Yu}}function Na(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(qa=t,Yu):t}}var qa=null;function $d(){if(qa===null)throw Error(S(459));var e=qa;return qa=null,e}function ep(e){if(e===Yu||e===jr)throw Error(S(483))}var Du=null,Go=0;function Fl(e){var n=Go;return Go+=1,Du===null&&(Du=[]),V1(Du,e,n)}function mo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function ql(e,n){throw n.$$typeof===Hb?Error(S(525)):(e=Object.prototype.toString.call(n),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function G1(e){function n(g,c){if(e){var h=g.deletions;h===null?(g.deletions=[c],g.flags|=16):h.push(c)}}function t(g,c){if(!e)return null;for(;c!==null;)n(g,c),c=c.sibling;return null}function a(g){for(var c=new Map;g!==null;)g.key!==null?c.set(g.key,g):c.set(g.index,g),g=g.sibling;return c}function u(g,c){return g=Tt(g,c),g.index=0,g.sibling=null,g}function o(g,c,h){return g.index=h,e?(h=g.alternate,h!==null?(h=h.index,h<c?(g.flags|=67108866,c):h):(g.flags|=67108866,c)):(g.flags|=1048576,c)}function l(g){return e&&g.alternate===null&&(g.flags|=67108866),g}function r(g,c,h,v){return c===null||c.tag!==6?(c=es(h,g.mode,v),c.return=g,c):(c=u(c,h),c.return=g,c)}function i(g,c,h,v){var x=h.type;return x===pu?f(g,c,h.props.children,v,h.key):c!==null&&(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Qt&&Na(x)===c.type)?(c=u(c,h.props),mo(c,h),c.return=g,c):(c=Kl(h.type,h.key,h.props,null,g.mode,v),mo(c,h),c.return=g,c)}function s(g,c,h,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==h.containerInfo||c.stateNode.implementation!==h.implementation?(c=ns(h,g.mode,v),c.return=g,c):(c=u(c,h.children||[]),c.return=g,c)}function f(g,c,h,v,x){return c===null||c.tag!==7?(c=Oa(h,g.mode,v,x),c.return=g,c):(c=u(c,h),c.return=g,c)}function m(g,c,h){if(typeof c=="string"&&c!==""||typeof c=="number"||typeof c=="bigint")return c=es(""+c,g.mode,h),c.return=g,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case El:return h=Kl(c.type,c.key,c.props,null,g.mode,h),mo(h,c),h.return=g,h;case xo:return c=ns(c,g.mode,h),c.return=g,c;case Qt:return c=Na(c),m(g,c,h)}if(yo(c)||fo(c))return c=Oa(c,g.mode,h,null),c.return=g,c;if(typeof c.then=="function")return m(g,Fl(c),h);if(c.$$typeof===St)return m(g,Ol(g,c),h);ql(g,c)}return null}function d(g,c,h,v){var x=c!==null?c.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return x!==null?null:r(g,c,""+h,v);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case El:return h.key===x?i(g,c,h,v):null;case xo:return h.key===x?s(g,c,h,v):null;case Qt:return h=Na(h),d(g,c,h,v)}if(yo(h)||fo(h))return x!==null?null:f(g,c,h,v,null);if(typeof h.then=="function")return d(g,c,Fl(h),v);if(h.$$typeof===St)return d(g,c,Ol(g,h),v);ql(g,h)}return null}function p(g,c,h,v,x){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return g=g.get(h)||null,r(c,g,""+v,x);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case El:return g=g.get(v.key===null?h:v.key)||null,i(c,g,v,x);case xo:return g=g.get(v.key===null?h:v.key)||null,s(c,g,v,x);case Qt:return v=Na(v),p(g,c,h,v,x)}if(yo(v)||fo(v))return g=g.get(h)||null,f(c,g,v,x,null);if(typeof v.then=="function")return p(g,c,h,Fl(v),x);if(v.$$typeof===St)return p(g,c,h,Ol(c,v),x);ql(c,v)}return null}function b(g,c,h,v){for(var x=null,w=null,y=c,k=c=0,A=null;y!==null&&k<h.length;k++){y.index>k?(A=y,y=null):A=y.sibling;var E=d(g,y,h[k],v);if(E===null){y===null&&(y=A);break}e&&y&&E.alternate===null&&n(g,y),c=o(E,c,k),w===null?x=E:w.sibling=E,w=E,y=A}if(k===h.length)return t(g,y),Y&&kt(g,k),x;if(y===null){for(;k<h.length;k++)y=m(g,h[k],v),y!==null&&(c=o(y,c,k),w===null?x=y:w.sibling=y,w=y);return Y&&kt(g,k),x}for(y=a(y);k<h.length;k++)A=p(y,g,k,h[k],v),A!==null&&(e&&A.alternate!==null&&y.delete(A.key===null?k:A.key),c=o(A,c,k),w===null?x=A:w.sibling=A,w=A);return e&&y.forEach(function(D){return n(g,D)}),Y&&kt(g,k),x}function C(g,c,h,v){if(h==null)throw Error(S(151));for(var x=null,w=null,y=c,k=c=0,A=null,E=h.next();y!==null&&!E.done;k++,E=h.next()){y.index>k?(A=y,y=null):A=y.sibling;var D=d(g,y,E.value,v);if(D===null){y===null&&(y=A);break}e&&y&&D.alternate===null&&n(g,y),c=o(D,c,k),w===null?x=D:w.sibling=D,w=D,y=A}if(E.done)return t(g,y),Y&&kt(g,k),x;if(y===null){for(;!E.done;k++,E=h.next())E=m(g,E.value,v),E!==null&&(c=o(E,c,k),w===null?x=E:w.sibling=E,w=E);return Y&&kt(g,k),x}for(y=a(y);!E.done;k++,E=h.next())E=p(y,g,k,E.value,v),E!==null&&(e&&E.alternate!==null&&y.delete(E.key===null?k:E.key),c=o(E,c,k),w===null?x=E:w.sibling=E,w=E);return e&&y.forEach(function(M){return n(g,M)}),Y&&kt(g,k),x}function _(g,c,h,v){if(typeof h=="object"&&h!==null&&h.type===pu&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case El:e:{for(var x=h.key;c!==null;){if(c.key===x){if(x=h.type,x===pu){if(c.tag===7){t(g,c.sibling),v=u(c,h.props.children),v.return=g,g=v;break e}}else if(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Qt&&Na(x)===c.type){t(g,c.sibling),v=u(c,h.props),mo(v,h),v.return=g,g=v;break e}t(g,c);break}else n(g,c);c=c.sibling}h.type===pu?(v=Oa(h.props.children,g.mode,v,h.key),v.return=g,g=v):(v=Kl(h.type,h.key,h.props,null,g.mode,v),mo(v,h),v.return=g,g=v)}return l(g);case xo:e:{for(x=h.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===h.containerInfo&&c.stateNode.implementation===h.implementation){t(g,c.sibling),v=u(c,h.children||[]),v.return=g,g=v;break e}else{t(g,c);break}else n(g,c);c=c.sibling}v=ns(h,g.mode,v),v.return=g,g=v}return l(g);case Qt:return h=Na(h),_(g,c,h,v)}if(yo(h))return b(g,c,h,v);if(fo(h)){if(x=fo(h),typeof x!="function")throw Error(S(150));return h=x.call(h),C(g,c,h,v)}if(typeof h.then=="function")return _(g,c,Fl(h),v);if(h.$$typeof===St)return _(g,c,Ol(g,h),v);ql(g,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,c!==null&&c.tag===6?(t(g,c.sibling),v=u(c,h),v.return=g,g=v):(t(g,c),v=es(h,g.mode,v),v.return=g,g=v),l(g)):t(g,c)}return function(g,c,h,v){try{Go=0;var x=_(g,c,h,v);return Du=null,x}catch(y){if(y===Yu||y===jr)throw y;var w=vn(29,y,null,g.mode);return w.lanes=v,w.return=g,w}finally{}}}var ja=G1(!0),I1=G1(!1),Xt=!1;function qc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Is(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function la(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ra(e,n,t){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(J&2)!==0){var u=a.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),a.pending=n,n=dr(e),O1(e,null,t),n}return Hr(e,a,n,t),dr(e)}function To(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var a=n.lanes;a&=e.pendingLanes,t|=a,n.lanes=t,i1(e,t)}}function as(e,n){var t=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,t===a)){var u=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var l={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};o===null?u=o=l:o=o.next=l,t=t.next}while(t!==null);o===null?u=o=n:o=o.next=n}else u=o=n;t={baseState:a.baseState,firstBaseUpdate:u,lastBaseUpdate:o,shared:a.shared,callbacks:a.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var Zs=!1;function Do(){if(Zs){var e=Tu;if(e!==null)throw e}}function Mo(e,n,t,a){Zs=!1;var u=e.updateQueue;Xt=!1;var o=u.firstBaseUpdate,l=u.lastBaseUpdate,r=u.shared.pending;if(r!==null){u.shared.pending=null;var i=r,s=i.next;i.next=null,l===null?o=s:l.next=s,l=i;var f=e.alternate;f!==null&&(f=f.updateQueue,r=f.lastBaseUpdate,r!==l&&(r===null?f.firstBaseUpdate=s:r.next=s,f.lastBaseUpdate=i))}if(o!==null){var m=u.baseState;l=0,f=s=i=null,r=o;do{var d=r.lane&-536870913,p=d!==r.lane;if(p?(I&d)===d:(a&d)===d){d!==0&&d===Ou&&(Zs=!0),f!==null&&(f=f.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var b=e,C=r;d=n;var _=t;switch(C.tag){case 1:if(b=C.payload,typeof b=="function"){m=b.call(_,m,d);break e}m=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=C.payload,d=typeof b=="function"?b.call(_,m,d):b,d==null)break e;m=fe({},m,d);break e;case 2:Xt=!0}}d=r.callback,d!==null&&(e.flags|=64,p&&(e.flags|=8192),p=u.callbacks,p===null?u.callbacks=[d]:p.push(d))}else p={lane:d,tag:r.tag,payload:r.payload,callback:r.callback,next:null},f===null?(s=f=p,i=m):f=f.next=p,l|=d;if(r=r.next,r===null){if(r=u.shared.pending,r===null)break;p=r,r=p.next,p.next=null,u.lastBaseUpdate=p,u.shared.pending=null}}while(!0);f===null&&(i=m),u.baseState=i,u.firstBaseUpdate=s,u.lastBaseUpdate=f,o===null&&(u.shared.lanes=0),ga|=l,e.lanes=l,e.memoizedState=m}}function Z1(e,n){if(typeof e!="function")throw Error(S(191,e));e.call(n)}function Y1(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)Z1(t[e],n)}var Fu=ot(null),gr=ot(0);function np(e,n){e=Ot,le(gr,e),le(Fu,n),Ot=e|n.baseLanes}function Ys(){le(gr,Ot),le(Fu,Fu.current)}function Uc(){Ot=gr.current,ze(Fu),ze(gr)}var Sn=ot(null),Bn=null;function Jt(e){var n=e.alternate;le(ve,ve.current&1),le(Sn,e),Bn===null&&(n===null||Fu.current!==null||n.memoizedState!==null)&&(Bn=e)}function Qs(e){le(ve,ve.current),le(Sn,e),Bn===null&&(Bn=e)}function Q1(e){e.tag===22?(le(ve,ve.current),le(Sn,e),Bn===null&&(Bn=e)):Pt(e)}function Pt(){le(ve,ve.current),le(Sn,Sn.current)}function bn(e){ze(Sn),Bn===e&&(Bn=null),ze(ve)}var ve=ot(0);function br(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||dc(t)||pc(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Nt=0,q=null,ae=null,ye=null,vr=!1,Mu=!1,Va=!1,xr=0,Io=0,Ru=null,nv=0;function me(){throw Error(S(321))}function Bc(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!_n(e[t],n[t]))return!1;return!0}function Hc(e,n,t,a,u,o){return Nt=o,q=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,L.H=e===null||e.memoizedState===null?_m:Pc,Va=!1,o=t(a,u),Va=!1,Mu&&(o=K1(n,t,a,u)),X1(e),o}function X1(e){L.H=Zo;var n=ae!==null&&ae.next!==null;if(Nt=0,ye=ae=q=null,vr=!1,Io=0,Ru=null,n)throw Error(S(300));e===null||ke||(e=e.dependencies,e!==null&&mr(e)&&(ke=!0))}function K1(e,n,t,a){q=e;var u=0;do{if(Mu&&(Ru=null),Io=0,Mu=!1,25<=u)throw Error(S(301));if(u+=1,ye=ae=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}L.H=Sm,o=n(t,a)}while(Mu);return o}function tv(){var e=L.H,n=e.useState()[0];return n=typeof n.then=="function"?ul(n):n,e=e.useState()[0],(ae!==null?ae.memoizedState:null)!==e&&(q.flags|=1024),n}function jc(){var e=xr!==0;return xr=0,e}function Vc(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function Gc(e){if(vr){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}vr=!1}Nt=0,ye=ae=q=null,Mu=!1,Io=xr=0,Ru=null}function an(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ye===null?q.memoizedState=ye=e:ye=ye.next=e,ye}function xe(){if(ae===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=ae.next;var n=ye===null?q.memoizedState:ye.next;if(n!==null)ye=n,ae=e;else{if(e===null)throw q.alternate===null?Error(S(467)):Error(S(310));ae=e,e={memoizedState:ae.memoizedState,baseState:ae.baseState,baseQueue:ae.baseQueue,queue:ae.queue,next:null},ye===null?q.memoizedState=ye=e:ye=ye.next=e}return ye}function Vr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ul(e){var n=Io;return Io+=1,Ru===null&&(Ru=[]),e=V1(Ru,e,n),n=q,(ye===null?n.memoizedState:ye.next)===null&&(n=n.alternate,L.H=n===null||n.memoizedState===null?_m:Pc),e}function Gr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ul(e);if(e.$$typeof===St)return Ze(e)}throw Error(S(438,String(e)))}function Ic(e){var n=null,t=q.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var a=q.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(n={data:a.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=Vr(),q.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),a=0;a<e;a++)t[a]=jb;return n.index++,t}function zt(e,n){return typeof n=="function"?n(e):n}function Pl(e){var n=xe();return Zc(n,ae,e)}function Zc(e,n,t){var a=e.queue;if(a===null)throw Error(S(311));a.lastRenderedReducer=t;var u=e.baseQueue,o=a.pending;if(o!==null){if(u!==null){var l=u.next;u.next=o.next,o.next=l}n.baseQueue=u=o,a.pending=null}if(o=e.baseState,u===null)e.memoizedState=o;else{n=u.next;var r=l=null,i=null,s=n,f=!1;do{var m=s.lane&-536870913;if(m!==s.lane?(I&m)===m:(Nt&m)===m){var d=s.revertLane;if(d===0)i!==null&&(i=i.next={lane:0,revertLane:0,gesture:null,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}),m===Ou&&(f=!0);else if((Nt&d)===d){s=s.next,d===Ou&&(f=!0);continue}else m={lane:0,revertLane:s.revertLane,gesture:null,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},i===null?(r=i=m,l=o):i=i.next=m,q.lanes|=d,ga|=d;m=s.action,Va&&t(o,m),o=s.hasEagerState?s.eagerState:t(o,m)}else d={lane:m,revertLane:s.revertLane,gesture:s.gesture,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null},i===null?(r=i=d,l=o):i=i.next=d,q.lanes|=m,ga|=m;s=s.next}while(s!==null&&s!==n);if(i===null?l=o:i.next=r,!_n(o,e.memoizedState)&&(ke=!0,f&&(t=Tu,t!==null)))throw t;e.memoizedState=o,e.baseState=l,e.baseQueue=i,a.lastRenderedState=o}return u===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function us(e){var n=xe(),t=n.queue;if(t===null)throw Error(S(311));t.lastRenderedReducer=e;var a=t.dispatch,u=t.pending,o=n.memoizedState;if(u!==null){t.pending=null;var l=u=u.next;do o=e(o,l.action),l=l.next;while(l!==u);_n(o,n.memoizedState)||(ke=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,a]}function J1(e,n,t){var a=q,u=xe(),o=Y;if(o){if(t===void 0)throw Error(S(407));t=t()}else t=n();var l=!_n((ae||u).memoizedState,t);if(l&&(u.memoizedState=t,ke=!0),u=u.queue,Yc($1.bind(null,a,u,e),[e]),u.getSnapshot!==n||l||ye!==null&&ye.memoizedState.tag&1){if(a.flags|=2048,qu(9,{destroy:void 0},W1.bind(null,a,u,t,n),null),oe===null)throw Error(S(349));o||(Nt&127)!==0||P1(a,n,t)}return t}function P1(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=q.updateQueue,n===null?(n=Vr(),q.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function W1(e,n,t,a){n.value=t,n.getSnapshot=a,em(n)&&nm(e)}function $1(e,n,t){return t(function(){em(n)&&nm(e)})}function em(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!_n(e,t)}catch{return!0}}function nm(e){var n=Qa(e,2);n!==null&&pn(n,e,2)}function Xs(e){var n=an();if(typeof e=="function"){var t=e;if(e=t(),Va){$t(!0);try{t()}finally{$t(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zt,lastRenderedState:e},n}function tm(e,n,t,a){return e.baseState=t,Zc(e,ae,typeof a=="function"?a:zt)}function av(e,n,t,a,u){if(Zr(e))throw Error(S(485));if(e=n.action,e!==null){var o={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(l){o.listeners.push(l)}};L.T!==null?t(!0):o.isTransition=!1,a(o),t=n.pending,t===null?(o.next=n.pending=o,am(n,o)):(o.next=t.next,n.pending=t.next=o)}}function am(e,n){var t=n.action,a=n.payload,u=e.state;if(n.isTransition){var o=L.T,l={};L.T=l;try{var r=t(u,a),i=L.S;i!==null&&i(l,r),tp(e,n,r)}catch(s){Ks(e,n,s)}finally{o!==null&&l.types!==null&&(o.types=l.types),L.T=o}}else try{o=t(u,a),tp(e,n,o)}catch(s){Ks(e,n,s)}}function tp(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(a){ap(e,n,a)},function(a){return Ks(e,n,a)}):ap(e,n,t)}function ap(e,n,t){n.status="fulfilled",n.value=t,um(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,am(e,t)))}function Ks(e,n,t){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do n.status="rejected",n.reason=t,um(n),n=n.next;while(n!==a)}e.action=null}function um(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function om(e,n){return n}function up(e,n){if(Y){var t=oe.formState;if(t!==null){e:{var a=q;if(Y){if(ce){n:{for(var u=ce,o=Un;u.nodeType!==8;){if(!o){u=null;break n}if(u=Hn(u.nextSibling),u===null){u=null;break n}}o=u.data,u=o==="F!"||o==="F"?u:null}if(u){ce=Hn(u.nextSibling),a=u.data==="F!";break e}}ma(a)}a=!1}a&&(n=t[0])}}return t=an(),t.memoizedState=t.baseState=n,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:om,lastRenderedState:n},t.queue=a,t=wm.bind(null,q,a),a.dispatch=t,a=Xs(!1),o=Jc.bind(null,q,!1,a.queue),a=an(),u={state:n,dispatch:null,action:e,pending:null},a.queue=u,t=av.bind(null,q,u,o,t),u.dispatch=t,a.memoizedState=e,[n,t,!1]}function op(e){var n=xe();return lm(n,ae,e)}function lm(e,n,t){if(n=Zc(e,n,om)[0],e=Pl(zt)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var a=ul(n)}catch(l){throw l===Yu?jr:l}else a=n;n=xe();var u=n.queue,o=u.dispatch;return t!==n.memoizedState&&(q.flags|=2048,qu(9,{destroy:void 0},uv.bind(null,u,t),null)),[a,o,e]}function uv(e,n){e.action=n}function lp(e){var n=xe(),t=ae;if(t!==null)return lm(n,t,e);xe(),n=n.memoizedState,t=xe();var a=t.queue.dispatch;return t.memoizedState=e,[n,a,!1]}function qu(e,n,t,a){return e={tag:e,create:t,deps:a,inst:n,next:null},n=q.updateQueue,n===null&&(n=Vr(),q.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(a=t.next,t.next=e,e.next=a,n.lastEffect=e),e}function rm(){return xe().memoizedState}function Wl(e,n,t,a){var u=an();q.flags|=e,u.memoizedState=qu(1|n,{destroy:void 0},t,a===void 0?null:a)}function Ir(e,n,t,a){var u=xe();a=a===void 0?null:a;var o=u.memoizedState.inst;ae!==null&&a!==null&&Bc(a,ae.memoizedState.deps)?u.memoizedState=qu(n,o,t,a):(q.flags|=e,u.memoizedState=qu(1|n,o,t,a))}function rp(e,n){Wl(8390656,8,e,n)}function Yc(e,n){Ir(2048,8,e,n)}function ov(e){q.flags|=4;var n=q.updateQueue;if(n===null)n=Vr(),q.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function im(e){var n=xe().memoizedState;return ov({ref:n,nextImpl:e}),function(){if((J&2)!==0)throw Error(S(440));return n.impl.apply(void 0,arguments)}}function sm(e,n){return Ir(4,2,e,n)}function cm(e,n){return Ir(4,4,e,n)}function fm(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function dm(e,n,t){t=t!=null?t.concat([e]):null,Ir(4,4,fm.bind(null,n,e),t)}function Qc(){}function pm(e,n){var t=xe();n=n===void 0?null:n;var a=t.memoizedState;return n!==null&&Bc(n,a[1])?a[0]:(t.memoizedState=[e,n],e)}function mm(e,n){var t=xe();n=n===void 0?null:n;var a=t.memoizedState;if(n!==null&&Bc(n,a[1]))return a[0];if(a=e(),Va){$t(!0);try{e()}finally{$t(!1)}}return t.memoizedState=[a,n],a}function Xc(e,n,t){return t===void 0||(Nt&1073741824)!==0&&(I&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=th(),q.lanes|=e,ga|=e,t)}function hm(e,n,t,a){return _n(t,n)?t:Fu.current!==null?(e=Xc(e,t,a),_n(e,n)||(ke=!0),e):(Nt&42)===0||(Nt&1073741824)!==0&&(I&261930)===0?(ke=!0,e.memoizedState=t):(e=th(),q.lanes|=e,ga|=e,n)}function gm(e,n,t,a,u){var o=P.p;P.p=o!==0&&8>o?o:8;var l=L.T,r={};L.T=r,Jc(e,!1,n,t);try{var i=u(),s=L.S;if(s!==null&&s(r,i),i!==null&&typeof i=="object"&&typeof i.then=="function"){var f=ev(i,a);Ro(e,n,f,kn(e))}else Ro(e,n,a,kn(e))}catch(m){Ro(e,n,{then:function(){},status:"rejected",reason:m},kn())}finally{P.p=o,l!==null&&r.types!==null&&(l.types=r.types),L.T=l}}function lv(){}function Js(e,n,t,a){if(e.tag!==5)throw Error(S(476));var u=bm(e).queue;gm(e,u,n,La,t===null?lv:function(){return vm(e),t(a)})}function bm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:La,baseState:La,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zt,lastRenderedState:La},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zt,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function vm(e){var n=bm(e);n.next===null&&(n=e.alternate.memoizedState),Ro(e,n.next.queue,{},kn())}function Kc(){return Ze(Xo)}function xm(){return xe().memoizedState}function ym(){return xe().memoizedState}function rv(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=kn();e=la(t);var a=ra(n,e,t);a!==null&&(pn(a,n,t),To(a,n,t)),n={cache:Lc()},e.payload=n;return}n=n.return}}function iv(e,n,t){var a=kn();t={lane:a,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},Zr(e)?Cm(n,t):(t=Mc(e,n,t,a),t!==null&&(pn(t,e,a),km(t,n,a)))}function wm(e,n,t){var a=kn();Ro(e,n,t,a)}function Ro(e,n,t,a){var u={lane:a,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(Zr(e))Cm(n,u);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var l=n.lastRenderedState,r=o(l,t);if(u.hasEagerState=!0,u.eagerState=r,_n(r,l))return Hr(e,n,u,0),oe===null&&Br(),!1}catch{}finally{}if(t=Mc(e,n,u,a),t!==null)return pn(t,e,a),km(t,n,a),!0}return!1}function Jc(e,n,t,a){if(a={lane:2,revertLane:o0(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Zr(e)){if(n)throw Error(S(479))}else n=Mc(e,t,a,2),n!==null&&pn(n,e,2)}function Zr(e){var n=e.alternate;return e===q||n!==null&&n===q}function Cm(e,n){Mu=vr=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function km(e,n,t){if((t&4194048)!==0){var a=n.lanes;a&=e.pendingLanes,t|=a,n.lanes=t,i1(e,t)}}var Zo={readContext:Ze,use:Gr,useCallback:me,useContext:me,useEffect:me,useImperativeHandle:me,useLayoutEffect:me,useInsertionEffect:me,useMemo:me,useReducer:me,useRef:me,useState:me,useDebugValue:me,useDeferredValue:me,useTransition:me,useSyncExternalStore:me,useId:me,useHostTransitionStatus:me,useFormState:me,useActionState:me,useOptimistic:me,useMemoCache:me,useCacheRefresh:me};Zo.useEffectEvent=me;var _m={readContext:Ze,use:Gr,useCallback:function(e,n){return an().memoizedState=[e,n===void 0?null:n],e},useContext:Ze,useEffect:rp,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,Wl(4194308,4,fm.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Wl(4194308,4,e,n)},useInsertionEffect:function(e,n){Wl(4,2,e,n)},useMemo:function(e,n){var t=an();n=n===void 0?null:n;var a=e();if(Va){$t(!0);try{e()}finally{$t(!1)}}return t.memoizedState=[a,n],a},useReducer:function(e,n,t){var a=an();if(t!==void 0){var u=t(n);if(Va){$t(!0);try{t(n)}finally{$t(!1)}}}else u=n;return a.memoizedState=a.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},a.queue=e,e=e.dispatch=iv.bind(null,q,e),[a.memoizedState,e]},useRef:function(e){var n=an();return e={current:e},n.memoizedState=e},useState:function(e){e=Xs(e);var n=e.queue,t=wm.bind(null,q,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:Qc,useDeferredValue:function(e,n){var t=an();return Xc(t,e,n)},useTransition:function(){var e=Xs(!1);return e=gm.bind(null,q,e.queue,!0,!1),an().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var a=q,u=an();if(Y){if(t===void 0)throw Error(S(407));t=t()}else{if(t=n(),oe===null)throw Error(S(349));(I&127)!==0||P1(a,n,t)}u.memoizedState=t;var o={value:t,getSnapshot:n};return u.queue=o,rp($1.bind(null,a,o,e),[e]),a.flags|=2048,qu(9,{destroy:void 0},W1.bind(null,a,o,t,n),null),t},useId:function(){var e=an(),n=oe.identifierPrefix;if(Y){var t=tt,a=nt;t=(a&~(1<<32-Cn(a)-1)).toString(32)+t,n="_"+n+"R_"+t,t=xr++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=nv++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Kc,useFormState:up,useActionState:up,useOptimistic:function(e){var n=an();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=Jc.bind(null,q,!0,t),t.dispatch=n,[e,n]},useMemoCache:Ic,useCacheRefresh:function(){return an().memoizedState=rv.bind(null,q)},useEffectEvent:function(e){var n=an(),t={impl:e};return n.memoizedState=t,function(){if((J&2)!==0)throw Error(S(440));return t.impl.apply(void 0,arguments)}}},Pc={readContext:Ze,use:Gr,useCallback:pm,useContext:Ze,useEffect:Yc,useImperativeHandle:dm,useInsertionEffect:sm,useLayoutEffect:cm,useMemo:mm,useReducer:Pl,useRef:rm,useState:function(){return Pl(zt)},useDebugValue:Qc,useDeferredValue:function(e,n){var t=xe();return hm(t,ae.memoizedState,e,n)},useTransition:function(){var e=Pl(zt)[0],n=xe().memoizedState;return[typeof e=="boolean"?e:ul(e),n]},useSyncExternalStore:J1,useId:xm,useHostTransitionStatus:Kc,useFormState:op,useActionState:op,useOptimistic:function(e,n){var t=xe();return tm(t,ae,e,n)},useMemoCache:Ic,useCacheRefresh:ym};Pc.useEffectEvent=im;var Sm={readContext:Ze,use:Gr,useCallback:pm,useContext:Ze,useEffect:Yc,useImperativeHandle:dm,useInsertionEffect:sm,useLayoutEffect:cm,useMemo:mm,useReducer:us,useRef:rm,useState:function(){return us(zt)},useDebugValue:Qc,useDeferredValue:function(e,n){var t=xe();return ae===null?Xc(t,e,n):hm(t,ae.memoizedState,e,n)},useTransition:function(){var e=us(zt)[0],n=xe().memoizedState;return[typeof e=="boolean"?e:ul(e),n]},useSyncExternalStore:J1,useId:xm,useHostTransitionStatus:Kc,useFormState:lp,useActionState:lp,useOptimistic:function(e,n){var t=xe();return ae!==null?tm(t,ae,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:Ic,useCacheRefresh:ym};Sm.useEffectEvent=im;function os(e,n,t,a){n=e.memoizedState,t=t(a,n),t=t==null?n:fe({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Ps={enqueueSetState:function(e,n,t){e=e._reactInternals;var a=kn(),u=la(a);u.payload=n,t!=null&&(u.callback=t),n=ra(e,u,a),n!==null&&(pn(n,e,a),To(n,e,a))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var a=kn(),u=la(a);u.tag=1,u.payload=n,t!=null&&(u.callback=t),n=ra(e,u,a),n!==null&&(pn(n,e,a),To(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=kn(),a=la(t);a.tag=2,n!=null&&(a.callback=n),n=ra(e,a,t),n!==null&&(pn(n,e,t),To(n,e,t))}};function ip(e,n,t,a,u,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,l):n.prototype&&n.prototype.isPureReactComponent?!Ho(t,a)||!Ho(u,o):!0}function sp(e,n,t,a){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,a),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,a),n.state!==e&&Ps.enqueueReplaceState(n,n.state,null)}function Ga(e,n){var t=n;if("ref"in n){t={};for(var a in n)a!=="ref"&&(t[a]=n[a])}if(e=e.defaultProps){t===n&&(t=fe({},t));for(var u in e)t[u]===void 0&&(t[u]=e[u])}return t}function Am(e){fr(e)}function Em(e){console.error(e)}function Tm(e){fr(e)}function yr(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(a){setTimeout(function(){throw a})}}function cp(e,n,t){try{var a=e.onCaughtError;a(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Ws(e,n,t){return t=la(t),t.tag=3,t.payload={element:null},t.callback=function(){yr(e,n)},t}function Dm(e){return e=la(e),e.tag=3,e}function Mm(e,n,t,a){var u=t.type.getDerivedStateFromError;if(typeof u=="function"){var o=a.value;e.payload=function(){return u(o)},e.callback=function(){cp(n,t,a)}}var l=t.stateNode;l!==null&&typeof l.componentDidCatch=="function"&&(e.callback=function(){cp(n,t,a),typeof u!="function"&&(ia===null?ia=new Set([this]):ia.add(this));var r=a.stack;this.componentDidCatch(a.value,{componentStack:r!==null?r:""})})}function sv(e,n,t,a,u){if(t.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(n=t.alternate,n!==null&&Zu(n,t,u,!0),t=Sn.current,t!==null){switch(t.tag){case 31:case 13:return Bn===null?Sr():t.alternate===null&&he===0&&(he=3),t.flags&=-257,t.flags|=65536,t.lanes=u,a===hr?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([a]):n.add(a),gs(e,a,u)),!1;case 22:return t.flags|=65536,a===hr?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([a])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([a]):t.add(a)),gs(e,a,u)),!1}throw Error(S(435,t.tag))}return gs(e,a,u),Sr(),!1}if(Y)return n=Sn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,a!==Bs&&(e=Error(S(422),{cause:a}),Vo(qn(e,t)))):(a!==Bs&&(n=Error(S(423),{cause:a}),Vo(qn(n,t))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,a=qn(a,t),u=Ws(e.stateNode,a,u),as(e,u),he!==4&&(he=2)),!1;var o=Error(S(520),{cause:a});if(o=qn(o,t),Lo===null?Lo=[o]:Lo.push(o),he!==4&&(he=2),n===null)return!0;a=qn(a,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=u&-u,t.lanes|=e,e=Ws(t.stateNode,a,e),as(t,e),!1;case 1:if(n=t.type,o=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(ia===null||!ia.has(o))))return t.flags|=65536,u&=-u,t.lanes|=u,u=Dm(u),Mm(u,e,t,a),as(t,u),!1}t=t.return}while(t!==null);return!1}var Wc=Error(S(461)),ke=!1;function Ve(e,n,t,a){n.child=e===null?I1(n,null,t,a):ja(n,e.child,t,a)}function fp(e,n,t,a,u){t=t.render;var o=n.ref;if("ref"in a){var l={};for(var r in a)r!=="ref"&&(l[r]=a[r])}else l=a;return Ha(n),a=Hc(e,n,t,l,o,u),r=jc(),e!==null&&!ke?(Vc(e,n,u),Lt(e,n,u)):(Y&&r&&Nc(n),n.flags|=1,Ve(e,n,a,u),n.child)}function dp(e,n,t,a,u){if(e===null){var o=t.type;return typeof o=="function"&&!Rc(o)&&o.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=o,Rm(e,n,o,a,u)):(e=Kl(t.type,null,a,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,!$c(e,u)){var l=o.memoizedProps;if(t=t.compare,t=t!==null?t:Ho,t(l,a)&&e.ref===n.ref)return Lt(e,n,u)}return n.flags|=1,e=Tt(o,a),e.ref=n.ref,e.return=n,n.child=e}function Rm(e,n,t,a,u){if(e!==null){var o=e.memoizedProps;if(Ho(o,a)&&e.ref===n.ref)if(ke=!1,n.pendingProps=a=o,$c(e,u))(e.flags&131072)!==0&&(ke=!0);else return n.lanes=e.lanes,Lt(e,n,u)}return $s(e,n,t,a,u)}function Nm(e,n,t,a){var u=a.children,o=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((n.flags&128)!==0){if(o=o!==null?o.baseLanes|t:t,e!==null){for(a=n.child=e.child,u=0;a!==null;)u=u|a.lanes|a.childLanes,a=a.sibling;a=u&~o}else a=0,n.child=null;return pp(e,n,o,t,a)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Jl(n,o!==null?o.cachePool:null),o!==null?np(n,o):Ys(),Q1(n);else return a=n.lanes=536870912,pp(e,n,o!==null?o.baseLanes|t:t,t,a)}else o!==null?(Jl(n,o.cachePool),np(n,o),Pt(n),n.memoizedState=null):(e!==null&&Jl(n,null),Ys(),Pt(n));return Ve(e,n,u,t),n.child}function Co(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function pp(e,n,t,a,u){var o=Oc();return o=o===null?null:{parent:Ce._currentValue,pool:o},n.memoizedState={baseLanes:t,cachePool:o},e!==null&&Jl(n,null),Ys(),Q1(n),e!==null&&Zu(e,n,a,!0),n.childLanes=u,null}function $l(e,n){return n=wr({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function mp(e,n,t){return ja(n,e.child,null,t),e=$l(n,n.pendingProps),e.flags|=2,bn(n),n.memoizedState=null,e}function cv(e,n,t){var a=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Y){if(a.mode==="hidden")return e=$l(n,a),n.lanes=536870912,Co(null,e);if(Qs(n),(e=ce)?(e=_h(e,Un),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pa!==null?{id:nt,overflow:tt}:null,retryLane:536870912,hydrationErrors:null},t=q1(e),t.return=n,n.child=t,Ie=n,ce=null)):e=null,e===null)throw ma(n);return n.lanes=536870912,null}return $l(n,a)}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(Qs(n),u)if(n.flags&256)n.flags&=-257,n=mp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(S(558));else if(ke||Zu(e,n,t,!1),u=(t&e.childLanes)!==0,ke||u){if(a=oe,a!==null&&(l=s1(a,t),l!==0&&l!==o.retryLane))throw o.retryLane=l,Qa(e,l),pn(a,e,l),Wc;Sr(),n=mp(e,n,t)}else e=o.treeContext,ce=Hn(l.nextSibling),Ie=n,Y=!0,oa=null,Un=!1,e!==null&&B1(n,e),n=$l(n,a),n.flags|=4096;return n}return e=Tt(e.child,{mode:a.mode,children:a.children}),e.ref=n.ref,n.child=e,e.return=n,e}function er(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(S(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function $s(e,n,t,a,u){return Ha(n),t=Hc(e,n,t,a,void 0,u),a=jc(),e!==null&&!ke?(Vc(e,n,u),Lt(e,n,u)):(Y&&a&&Nc(n),n.flags|=1,Ve(e,n,t,u),n.child)}function hp(e,n,t,a,u,o){return Ha(n),n.updateQueue=null,t=K1(n,a,t,u),X1(e),a=jc(),e!==null&&!ke?(Vc(e,n,o),Lt(e,n,o)):(Y&&a&&Nc(n),n.flags|=1,Ve(e,n,t,o),n.child)}function gp(e,n,t,a,u){if(Ha(n),n.stateNode===null){var o=wu,l=t.contextType;typeof l=="object"&&l!==null&&(o=Ze(l)),o=new t(a,o),n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=Ps,n.stateNode=o,o._reactInternals=n,o=n.stateNode,o.props=a,o.state=n.memoizedState,o.refs={},qc(n),l=t.contextType,o.context=typeof l=="object"&&l!==null?Ze(l):wu,o.state=n.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(os(n,t,l,a),o.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(l=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),l!==o.state&&Ps.enqueueReplaceState(o,o.state,null),Mo(n,a,o,u),Do(),o.state=n.memoizedState),typeof o.componentDidMount=="function"&&(n.flags|=4194308),a=!0}else if(e===null){o=n.stateNode;var r=n.memoizedProps,i=Ga(t,r);o.props=i;var s=o.context,f=t.contextType;l=wu,typeof f=="object"&&f!==null&&(l=Ze(f));var m=t.getDerivedStateFromProps;f=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function",r=n.pendingProps!==r,f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(r||s!==l)&&sp(n,o,a,l),Xt=!1;var d=n.memoizedState;o.state=d,Mo(n,a,o,u),Do(),s=n.memoizedState,r||d!==s||Xt?(typeof m=="function"&&(os(n,t,m,a),s=n.memoizedState),(i=Xt||ip(n,t,i,a,d,s,l))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=a,n.memoizedState=s),o.props=a,o.state=s,o.context=l,a=i):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),a=!1)}else{o=n.stateNode,Is(e,n),l=n.memoizedProps,f=Ga(t,l),o.props=f,m=n.pendingProps,d=o.context,s=t.contextType,i=wu,typeof s=="object"&&s!==null&&(i=Ze(s)),r=t.getDerivedStateFromProps,(s=typeof r=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||d!==i)&&sp(n,o,a,i),Xt=!1,d=n.memoizedState,o.state=d,Mo(n,a,o,u),Do();var p=n.memoizedState;l!==m||d!==p||Xt||e!==null&&e.dependencies!==null&&mr(e.dependencies)?(typeof r=="function"&&(os(n,t,r,a),p=n.memoizedState),(f=Xt||ip(n,t,f,a,d,p,i)||e!==null&&e.dependencies!==null&&mr(e.dependencies))?(s||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(a,p,i),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(a,p,i)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=a,n.memoizedState=p),o.props=a,o.state=p,o.context=i,a=f):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),a=!1)}return o=a,er(e,n),a=(n.flags&128)!==0,o||a?(o=n.stateNode,t=a&&typeof t.getDerivedStateFromError!="function"?null:o.render(),n.flags|=1,e!==null&&a?(n.child=ja(n,e.child,null,u),n.child=ja(n,null,t,u)):Ve(e,n,t,u),n.memoizedState=o.state,e=n.child):e=Lt(e,n,u),e}function bp(e,n,t,a){return Ba(),n.flags|=256,Ve(e,n,t,a),n.child}var ls={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function rs(e){return{baseLanes:e,cachePool:j1()}}function is(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=xn),e}function zm(e,n,t){var a=n.pendingProps,u=!1,o=(n.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(ve.current&2)!==0),l&&(u=!0,n.flags&=-129),l=(n.flags&32)!==0,n.flags&=-33,e===null){if(Y){if(u?Jt(n):Pt(n),(e=ce)?(e=_h(e,Un),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pa!==null?{id:nt,overflow:tt}:null,retryLane:536870912,hydrationErrors:null},t=q1(e),t.return=n,n.child=t,Ie=n,ce=null)):e=null,e===null)throw ma(n);return pc(e)?n.lanes=32:n.lanes=536870912,null}var r=a.children;return a=a.fallback,u?(Pt(n),u=n.mode,r=wr({mode:"hidden",children:r},u),a=Oa(a,u,t,null),r.return=n,a.return=n,r.sibling=a,n.child=r,a=n.child,a.memoizedState=rs(t),a.childLanes=is(e,l,t),n.memoizedState=ls,Co(null,a)):(Jt(n),ec(n,r))}var i=e.memoizedState;if(i!==null&&(r=i.dehydrated,r!==null)){if(o)n.flags&256?(Jt(n),n.flags&=-257,n=ss(e,n,t)):n.memoizedState!==null?(Pt(n),n.child=e.child,n.flags|=128,n=null):(Pt(n),r=a.fallback,u=n.mode,a=wr({mode:"visible",children:a.children},u),r=Oa(r,u,t,null),r.flags|=2,a.return=n,r.return=n,a.sibling=r,n.child=a,ja(n,e.child,null,t),a=n.child,a.memoizedState=rs(t),a.childLanes=is(e,l,t),n.memoizedState=ls,n=Co(null,a));else if(Jt(n),pc(r)){if(l=r.nextSibling&&r.nextSibling.dataset,l)var s=l.dgst;l=s,a=Error(S(419)),a.stack="",a.digest=l,Vo({value:a,source:null,stack:null}),n=ss(e,n,t)}else if(ke||Zu(e,n,t,!1),l=(t&e.childLanes)!==0,ke||l){if(l=oe,l!==null&&(a=s1(l,t),a!==0&&a!==i.retryLane))throw i.retryLane=a,Qa(e,a),pn(l,e,a),Wc;dc(r)||Sr(),n=ss(e,n,t)}else dc(r)?(n.flags|=192,n.child=e.child,n=null):(e=i.treeContext,ce=Hn(r.nextSibling),Ie=n,Y=!0,oa=null,Un=!1,e!==null&&B1(n,e),n=ec(n,a.children),n.flags|=4096);return n}return u?(Pt(n),r=a.fallback,u=n.mode,i=e.child,s=i.sibling,a=Tt(i,{mode:"hidden",children:a.children}),a.subtreeFlags=i.subtreeFlags&65011712,s!==null?r=Tt(s,r):(r=Oa(r,u,t,null),r.flags|=2),r.return=n,a.return=n,a.sibling=r,n.child=a,Co(null,a),a=n.child,r=e.child.memoizedState,r===null?r=rs(t):(u=r.cachePool,u!==null?(i=Ce._currentValue,u=u.parent!==i?{parent:i,pool:i}:u):u=j1(),r={baseLanes:r.baseLanes|t,cachePool:u}),a.memoizedState=r,a.childLanes=is(e,l,t),n.memoizedState=ls,Co(e.child,a)):(Jt(n),t=e.child,e=t.sibling,t=Tt(t,{mode:"visible",children:a.children}),t.return=n,t.sibling=null,e!==null&&(l=n.deletions,l===null?(n.deletions=[e],n.flags|=16):l.push(e)),n.child=t,n.memoizedState=null,t)}function ec(e,n){return n=wr({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function wr(e,n){return e=vn(22,e,null,n),e.lanes=0,e}function ss(e,n,t){return ja(n,e.child,null,t),e=ec(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function vp(e,n,t){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n),js(e.return,n,t)}function cs(e,n,t,a,u,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:a,tail:t,tailMode:u,treeForkCount:o}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=a,l.tail=t,l.tailMode=u,l.treeForkCount=o)}function Lm(e,n,t){var a=n.pendingProps,u=a.revealOrder,o=a.tail;a=a.children;var l=ve.current,r=(l&2)!==0;if(r?(l=l&1|2,n.flags|=128):l&=1,le(ve,l),Ve(e,n,a,t),a=Y?jo:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vp(e,t,n);else if(e.tag===19)vp(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(t=n.child,u=null;t!==null;)e=t.alternate,e!==null&&br(e)===null&&(u=t),t=t.sibling;t=u,t===null?(u=n.child,n.child=null):(u=t.sibling,t.sibling=null),cs(n,!1,u,t,o,a);break;case"backwards":case"unstable_legacy-backwards":for(t=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&br(e)===null){n.child=u;break}e=u.sibling,u.sibling=t,t=u,u=e}cs(n,!0,t,null,o,a);break;case"together":cs(n,!1,null,null,void 0,a);break;default:n.memoizedState=null}return n.child}function Lt(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),ga|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Zu(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(S(153));if(n.child!==null){for(e=n.child,t=Tt(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=Tt(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function $c(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&mr(e)))}function fv(e,n,t){switch(n.tag){case 3:rr(n,n.stateNode.containerInfo),Kt(n,Ce,e.memoizedState.cache),Ba();break;case 27:case 5:Ts(n);break;case 4:rr(n,n.stateNode.containerInfo);break;case 10:Kt(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Qs(n),null;break;case 13:var a=n.memoizedState;if(a!==null)return a.dehydrated!==null?(Jt(n),n.flags|=128,null):(t&n.child.childLanes)!==0?zm(e,n,t):(Jt(n),e=Lt(e,n,t),e!==null?e.sibling:null);Jt(n);break;case 19:var u=(e.flags&128)!==0;if(a=(t&n.childLanes)!==0,a||(Zu(e,n,t,!1),a=(t&n.childLanes)!==0),u){if(a)return Lm(e,n,t);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),le(ve,ve.current),a)break;return null;case 22:return n.lanes=0,Nm(e,n,t,n.pendingProps);case 24:Kt(n,Ce,e.memoizedState.cache)}return Lt(e,n,t)}function Om(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)ke=!0;else{if(!$c(e,t)&&(n.flags&128)===0)return ke=!1,fv(e,n,t);ke=(e.flags&131072)!==0}else ke=!1,Y&&(n.flags&1048576)!==0&&U1(n,jo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var a=n.pendingProps;if(e=Na(n.elementType),n.type=e,typeof e=="function")Rc(e)?(a=Ga(e,a),n.tag=1,n=gp(null,n,e,a,t)):(n.tag=0,n=$s(null,n,e,a,t));else{if(e!=null){var u=e.$$typeof;if(u===bc){n.tag=11,n=fp(null,n,e,a,t);break e}else if(u===vc){n.tag=14,n=dp(null,n,e,a,t);break e}}throw n=As(e)||e,Error(S(306,n,""))}}return n;case 0:return $s(e,n,n.type,n.pendingProps,t);case 1:return a=n.type,u=Ga(a,n.pendingProps),gp(e,n,a,u,t);case 3:e:{if(rr(n,n.stateNode.containerInfo),e===null)throw Error(S(387));a=n.pendingProps;var o=n.memoizedState;u=o.element,Is(e,n),Mo(n,a,null,t);var l=n.memoizedState;if(a=l.cache,Kt(n,Ce,a),a!==o.cache&&Vs(n,[Ce],t,!0),Do(),a=l.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:l.cache},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){n=bp(e,n,a,t);break e}else if(a!==u){u=qn(Error(S(424)),n),Vo(u),n=bp(e,n,a,t);break e}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ce=Hn(e.firstChild),Ie=n,Y=!0,oa=null,Un=!0,t=I1(n,null,a,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling}else{if(Ba(),a===u){n=Lt(e,n,t);break e}Ve(e,n,a,t)}n=n.child}return n;case 26:return er(e,n),e===null?(t=Hp(n.type,null,n.pendingProps,null))?n.memoizedState=t:Y||(t=n.type,e=n.pendingProps,a=Dr(ua.current).createElement(t),a[Ge]=n,a[mn]=e,Ye(a,t,e),Ne(a),n.stateNode=a):n.memoizedState=Hp(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Ts(n),e===null&&Y&&(a=n.stateNode=Sh(n.type,n.pendingProps,ua.current),Ie=n,Un=!0,u=ce,va(n.type)?(mc=u,ce=Hn(a.firstChild)):ce=u),Ve(e,n,n.pendingProps.children,t),er(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Y&&((u=a=ce)&&(a=Bv(a,n.type,n.pendingProps,Un),a!==null?(n.stateNode=a,Ie=n,ce=Hn(a.firstChild),Un=!1,u=!0):u=!1),u||ma(n)),Ts(n),u=n.type,o=n.pendingProps,l=e!==null?e.memoizedProps:null,a=o.children,cc(u,o)?a=null:l!==null&&cc(u,l)&&(n.flags|=32),n.memoizedState!==null&&(u=Hc(e,n,tv,null,null,t),Xo._currentValue=u),er(e,n),Ve(e,n,a,t),n.child;case 6:return e===null&&Y&&((e=t=ce)&&(t=Hv(t,n.pendingProps,Un),t!==null?(n.stateNode=t,Ie=n,ce=null,e=!0):e=!1),e||ma(n)),null;case 13:return zm(e,n,t);case 4:return rr(n,n.stateNode.containerInfo),a=n.pendingProps,e===null?n.child=ja(n,null,a,t):Ve(e,n,a,t),n.child;case 11:return fp(e,n,n.type,n.pendingProps,t);case 7:return Ve(e,n,n.pendingProps,t),n.child;case 8:return Ve(e,n,n.pendingProps.children,t),n.child;case 12:return Ve(e,n,n.pendingProps.children,t),n.child;case 10:return a=n.pendingProps,Kt(n,n.type,a.value),Ve(e,n,a.children,t),n.child;case 9:return u=n.type._context,a=n.pendingProps.children,Ha(n),u=Ze(u),a=a(u),n.flags|=1,Ve(e,n,a,t),n.child;case 14:return dp(e,n,n.type,n.pendingProps,t);case 15:return Rm(e,n,n.type,n.pendingProps,t);case 19:return Lm(e,n,t);case 31:return cv(e,n,t);case 22:return Nm(e,n,t,n.pendingProps);case 24:return Ha(n),a=Ze(Ce),e===null?(u=Oc(),u===null&&(u=oe,o=Lc(),u.pooledCache=o,o.refCount++,o!==null&&(u.pooledCacheLanes|=t),u=o),n.memoizedState={parent:a,cache:u},qc(n),Kt(n,Ce,u)):((e.lanes&t)!==0&&(Is(e,n),Mo(n,null,null,t),Do()),u=e.memoizedState,o=n.memoizedState,u.parent!==a?(u={parent:a,cache:a},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Kt(n,Ce,a)):(a=o.cache,Kt(n,Ce,a),a!==u.cache&&Vs(n,[Ce],t,!0))),Ve(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(S(156,n.tag))}function xt(e){e.flags|=4}function fs(e,n,t,a,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(oh())e.flags|=8192;else throw qa=hr,Fc}else e.flags&=-16777217}function xp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Th(n))if(oh())e.flags|=8192;else throw qa=hr,Fc}function Ul(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?l1():536870912,e.lanes|=n,Uu|=n)}function ho(e,n){if(!Y)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function se(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,a=0;if(n)for(var u=e.child;u!==null;)t|=u.lanes|u.childLanes,a|=u.subtreeFlags&65011712,a|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)t|=u.lanes|u.childLanes,a|=u.subtreeFlags,a|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=a,e.childLanes=t,n}function dv(e,n,t){var a=n.pendingProps;switch(zc(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(n),null;case 1:return se(n),null;case 3:return t=n.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Dt(Ce),Nu(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(su(n)?xt(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,ts())),se(n),null;case 26:var u=n.type,o=n.memoizedState;return e===null?(xt(n),o!==null?(se(n),xp(n,o)):(se(n),fs(n,u,null,a,t))):o?o!==e.memoizedState?(xt(n),se(n),xp(n,o)):(se(n),n.flags&=-16777217):(e=e.memoizedProps,e!==a&&xt(n),se(n),fs(n,u,e,a,t)),null;case 27:if(ir(n),t=ua.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==a&&xt(n);else{if(!a){if(n.stateNode===null)throw Error(S(166));return se(n),null}e=ut.current,su(n)?Xd(n,e):(e=Sh(u,a,t),n.stateNode=e,xt(n))}return se(n),null;case 5:if(ir(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==a&&xt(n);else{if(!a){if(n.stateNode===null)throw Error(S(166));return se(n),null}if(o=ut.current,su(n))Xd(n,o);else{var l=Dr(ua.current);switch(o){case 1:o=l.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:o=l.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":o=l.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":o=l.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":o=l.createElement("div"),o.innerHTML="<script><\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof a.is=="string"?l.createElement("select",{is:a.is}):l.createElement("select"),a.multiple?o.multiple=!0:a.size&&(o.size=a.size);break;default:o=typeof a.is=="string"?l.createElement(u,{is:a.is}):l.createElement(u)}}o[Ge]=n,o[mn]=a;e:for(l=n.child;l!==null;){if(l.tag===5||l.tag===6)o.appendChild(l.stateNode);else if(l.tag!==4&&l.tag!==27&&l.child!==null){l.child.return=l,l=l.child;continue}if(l===n)break e;for(;l.sibling===null;){if(l.return===null||l.return===n)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}n.stateNode=o;e:switch(Ye(o,u,a),u){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&xt(n)}}return se(n),fs(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==a&&xt(n);else{if(typeof a!="string"&&n.stateNode===null)throw Error(S(166));if(e=ua.current,su(n)){if(e=n.stateNode,t=n.memoizedProps,a=null,u=Ie,u!==null)switch(u.tag){case 27:case 5:a=u.memoizedProps}e[Ge]=n,e=!!(e.nodeValue===t||a!==null&&a.suppressHydrationWarning===!0||wh(e.nodeValue,t)),e||ma(n,!0)}else e=Dr(e).createTextNode(a),e[Ge]=n,n.stateNode=e}return se(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(a=su(n),t!==null){if(e===null){if(!a)throw Error(S(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(557));e[Ge]=n}else Ba(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;se(n),e=!1}else t=ts(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(bn(n),n):(bn(n),null);if((n.flags&128)!==0)throw Error(S(558))}return se(n),null;case 13:if(a=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=su(n),a!==null&&a.dehydrated!==null){if(e===null){if(!u)throw Error(S(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(S(317));u[Ge]=n}else Ba(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;se(n),u=!1}else u=ts(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(bn(n),n):(bn(n),null)}return bn(n),(n.flags&128)!==0?(n.lanes=t,n):(t=a!==null,e=e!==null&&e.memoizedState!==null,t&&(a=n.child,u=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(u=a.alternate.memoizedState.cachePool.pool),o=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(o=a.memoizedState.cachePool.pool),o!==u&&(a.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),Ul(n,n.updateQueue),se(n),null);case 4:return Nu(),e===null&&l0(n.stateNode.containerInfo),se(n),null;case 10:return Dt(n.type),se(n),null;case 19:if(ze(ve),a=n.memoizedState,a===null)return se(n),null;if(u=(n.flags&128)!==0,o=a.rendering,o===null)if(u)ho(a,!1);else{if(he!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(o=br(e),o!==null){for(n.flags|=128,ho(a,!1),e=o.updateQueue,n.updateQueue=e,Ul(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)F1(t,e),t=t.sibling;return le(ve,ve.current&1|2),Y&&kt(n,a.treeForkCount),n.child}e=e.sibling}a.tail!==null&&yn()>kr&&(n.flags|=128,u=!0,ho(a,!1),n.lanes=4194304)}else{if(!u)if(e=br(o),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Ul(n,e),ho(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!Y)return se(n),null}else 2*yn()-a.renderingStartTime>kr&&t!==536870912&&(n.flags|=128,u=!0,ho(a,!1),n.lanes=4194304);a.isBackwards?(o.sibling=n.child,n.child=o):(e=a.last,e!==null?e.sibling=o:n.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=yn(),e.sibling=null,t=ve.current,le(ve,u?t&1|2:t&1),Y&&kt(n,a.treeForkCount),e):(se(n),null);case 22:case 23:return bn(n),Uc(),a=n.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(n.flags|=8192):a&&(n.flags|=8192),a?(t&536870912)!==0&&(n.flags&128)===0&&(se(n),n.subtreeFlags&6&&(n.flags|=8192)):se(n),t=n.updateQueue,t!==null&&Ul(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),a=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(a=n.memoizedState.cachePool.pool),a!==t&&(n.flags|=2048),e!==null&&ze(Fa),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),Dt(Ce),se(n),null;case 25:return null;case 30:return null}throw Error(S(156,n.tag))}function pv(e,n){switch(zc(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Dt(Ce),Nu(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return ir(n),null;case 31:if(n.memoizedState!==null){if(bn(n),n.alternate===null)throw Error(S(340));Ba()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(bn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(S(340));Ba()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return ze(ve),null;case 4:return Nu(),null;case 10:return Dt(n.type),null;case 22:case 23:return bn(n),Uc(),e!==null&&ze(Fa),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Dt(Ce),null;case 25:return null;default:return null}}function Fm(e,n){switch(zc(n),n.tag){case 3:Dt(Ce),Nu();break;case 26:case 27:case 5:ir(n);break;case 4:Nu();break;case 31:n.memoizedState!==null&&bn(n);break;case 13:bn(n);break;case 19:ze(ve);break;case 10:Dt(n.type);break;case 22:case 23:bn(n),Uc(),e!==null&&ze(Fa);break;case 24:Dt(Ce)}}function ol(e,n){try{var t=n.updateQueue,a=t!==null?t.lastEffect:null;if(a!==null){var u=a.next;t=u;do{if((t.tag&e)===e){a=void 0;var o=t.create,l=t.inst;a=o(),l.destroy=a}t=t.next}while(t!==u)}}catch(r){ne(n,n.return,r)}}function ha(e,n,t){try{var a=n.updateQueue,u=a!==null?a.lastEffect:null;if(u!==null){var o=u.next;a=o;do{if((a.tag&e)===e){var l=a.inst,r=l.destroy;if(r!==void 0){l.destroy=void 0,u=n;var i=t,s=r;try{s()}catch(f){ne(u,i,f)}}}a=a.next}while(a!==o)}}catch(f){ne(n,n.return,f)}}function qm(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{Y1(n,t)}catch(a){ne(e,e.return,a)}}}function Um(e,n,t){t.props=Ga(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(a){ne(e,n,a)}}function No(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof t=="function"?e.refCleanup=t(a):t.current=a}}catch(u){ne(e,n,u)}}function at(e,n){var t=e.ref,a=e.refCleanup;if(t!==null)if(typeof a=="function")try{a()}catch(u){ne(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(u){ne(e,n,u)}else t.current=null}function Bm(e){var n=e.type,t=e.memoizedProps,a=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&a.focus();break e;case"img":t.src?a.src=t.src:t.srcSet&&(a.srcset=t.srcSet)}}catch(u){ne(e,e.return,u)}}function ds(e,n,t){try{var a=e.stateNode;zv(a,e.type,t,n),a[mn]=n}catch(u){ne(e,e.return,u)}}function Hm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&va(e.type)||e.tag===4}function ps(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Hm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&va(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nc(e,n,t){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=At));else if(a!==4&&(a===27&&va(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(nc(e,n,t),e=e.sibling;e!==null;)nc(e,n,t),e=e.sibling}function Cr(e,n,t){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(a!==4&&(a===27&&va(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(Cr(e,n,t),e=e.sibling;e!==null;)Cr(e,n,t),e=e.sibling}function jm(e){var n=e.stateNode,t=e.memoizedProps;try{for(var a=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Ye(n,a,t),n[Ge]=e,n[mn]=t}catch(o){ne(e,e.return,o)}}var _t=!1,we=!1,ms=!1,yp=typeof WeakSet=="function"?WeakSet:Set,Re=null;function mv(e,n){if(e=e.containerInfo,ic=zr,e=T1(e),Tc(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var u=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var l=0,r=-1,i=-1,s=0,f=0,m=e,d=null;n:for(;;){for(var p;m!==t||u!==0&&m.nodeType!==3||(r=l+u),m!==o||a!==0&&m.nodeType!==3||(i=l+a),m.nodeType===3&&(l+=m.nodeValue.length),(p=m.firstChild)!==null;)d=m,m=p;for(;;){if(m===e)break n;if(d===t&&++s===u&&(r=l),d===o&&++f===a&&(i=l),(p=m.nextSibling)!==null)break;m=d,d=m.parentNode}m=p}t=r===-1||i===-1?null:{start:r,end:i}}else t=null}t=t||{start:0,end:0}}else t=null;for(sc={focusedElem:e,selectionRange:t},zr=!1,Re=n;Re!==null;)if(n=Re,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Re=e;else for(;Re!==null;){switch(n=Re,o=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)u=e[t],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&o!==null){e=void 0,t=n,u=o.memoizedProps,o=o.memoizedState,a=t.stateNode;try{var b=Ga(t.type,u);e=a.getSnapshotBeforeUpdate(b,o),a.__reactInternalSnapshotBeforeUpdate=e}catch(C){ne(t,t.return,C)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)fc(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(S(163))}if(e=n.sibling,e!==null){e.return=n.return,Re=e;break}Re=n.return}}function Vm(e,n,t){var a=t.flags;switch(t.tag){case 0:case 11:case 15:wt(e,t),a&4&&ol(5,t);break;case 1:if(wt(e,t),a&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(l){ne(t,t.return,l)}else{var u=Ga(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(l){ne(t,t.return,l)}}a&64&&qm(t),a&512&&No(t,t.return);break;case 3:if(wt(e,t),a&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{Y1(e,n)}catch(l){ne(t,t.return,l)}}break;case 27:n===null&&a&4&&jm(t);case 26:case 5:wt(e,t),n===null&&a&4&&Bm(t),a&512&&No(t,t.return);break;case 12:wt(e,t);break;case 31:wt(e,t),a&4&&Zm(e,t);break;case 13:wt(e,t),a&4&&Ym(e,t),a&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=kv.bind(null,t),jv(e,t))));break;case 22:if(a=t.memoizedState!==null||_t,!a){n=n!==null&&n.memoizedState!==null||we,u=_t;var o=we;_t=a,(we=n)&&!o?Ct(e,t,(t.subtreeFlags&8772)!==0):wt(e,t),_t=u,we=o}break;case 30:break;default:wt(e,t)}}function Gm(e){var n=e.alternate;n!==null&&(e.alternate=null,Gm(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Cc(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var pe=null,fn=!1;function yt(e,n,t){for(t=t.child;t!==null;)Im(e,n,t),t=t.sibling}function Im(e,n,t){if(wn&&typeof wn.onCommitFiberUnmount=="function")try{wn.onCommitFiberUnmount(Wo,t)}catch{}switch(t.tag){case 26:we||at(t,n),yt(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:we||at(t,n);var a=pe,u=fn;va(t.type)&&(pe=t.stateNode,fn=!1),yt(e,n,t),Fo(t.stateNode),pe=a,fn=u;break;case 5:we||at(t,n);case 6:if(a=pe,u=fn,pe=null,yt(e,n,t),pe=a,fn=u,pe!==null)if(fn)try{(pe.nodeType===9?pe.body:pe.nodeName==="HTML"?pe.ownerDocument.body:pe).removeChild(t.stateNode)}catch(o){ne(t,n,o)}else try{pe.removeChild(t.stateNode)}catch(o){ne(t,n,o)}break;case 18:pe!==null&&(fn?(e=pe,Op(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),Vu(e)):Op(pe,t.stateNode));break;case 4:a=pe,u=fn,pe=t.stateNode.containerInfo,fn=!0,yt(e,n,t),pe=a,fn=u;break;case 0:case 11:case 14:case 15:ha(2,t,n),we||ha(4,t,n),yt(e,n,t);break;case 1:we||(at(t,n),a=t.stateNode,typeof a.componentWillUnmount=="function"&&Um(t,n,a)),yt(e,n,t);break;case 21:yt(e,n,t);break;case 22:we=(a=we)||t.memoizedState!==null,yt(e,n,t),we=a;break;default:yt(e,n,t)}}function Zm(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Vu(e)}catch(t){ne(n,n.return,t)}}}function Ym(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Vu(e)}catch(t){ne(n,n.return,t)}}function hv(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new yp),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new yp),n;default:throw Error(S(435,e.tag))}}function Bl(e,n){var t=hv(e);n.forEach(function(a){if(!t.has(a)){t.add(a);var u=_v.bind(null,e,a);a.then(u,u)}})}function sn(e,n){var t=n.deletions;if(t!==null)for(var a=0;a<t.length;a++){var u=t[a],o=e,l=n,r=l;e:for(;r!==null;){switch(r.tag){case 27:if(va(r.type)){pe=r.stateNode,fn=!1;break e}break;case 5:pe=r.stateNode,fn=!1;break e;case 3:case 4:pe=r.stateNode.containerInfo,fn=!0;break e}r=r.return}if(pe===null)throw Error(S(160));Im(o,l,u),pe=null,fn=!1,o=u.alternate,o!==null&&(o.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Qm(n,e),n=n.sibling}var In=null;function Qm(e,n){var t=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:sn(n,e),cn(e),a&4&&(ha(3,e,e.return),ol(3,e),ha(5,e,e.return));break;case 1:sn(n,e),cn(e),a&512&&(we||t===null||at(t,t.return)),a&64&&_t&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?a:t.concat(a))));break;case 26:var u=In;if(sn(n,e),cn(e),a&512&&(we||t===null||at(t,t.return)),a&4){var o=t!==null?t.memoizedState:null;if(a=e.memoizedState,t===null)if(a===null)if(e.stateNode===null){e:{a=e.type,t=e.memoizedProps,u=u.ownerDocument||u;n:switch(a){case"title":o=u.getElementsByTagName("title")[0],(!o||o[nl]||o[Ge]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=u.createElement(a),u.head.insertBefore(o,u.querySelector("head > title"))),Ye(o,a,t),o[Ge]=e,Ne(o),a=o;break e;case"link":var l=Vp("link","href",u).get(a+(t.href||""));if(l){for(var r=0;r<l.length;r++)if(o=l[r],o.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&o.getAttribute("rel")===(t.rel==null?null:t.rel)&&o.getAttribute("title")===(t.title==null?null:t.title)&&o.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){l.splice(r,1);break n}}o=u.createElement(a),Ye(o,a,t),u.head.appendChild(o);break;case"meta":if(l=Vp("meta","content",u).get(a+(t.content||""))){for(r=0;r<l.length;r++)if(o=l[r],o.getAttribute("content")===(t.content==null?null:""+t.content)&&o.getAttribute("name")===(t.name==null?null:t.name)&&o.getAttribute("property")===(t.property==null?null:t.property)&&o.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&o.getAttribute("charset")===(t.charSet==null?null:t.charSet)){l.splice(r,1);break n}}o=u.createElement(a),Ye(o,a,t),u.head.appendChild(o);break;default:throw Error(S(468,a))}o[Ge]=e,Ne(o),a=o}e.stateNode=a}else Gp(u,e.type,e.stateNode);else e.stateNode=jp(u,a,e.memoizedProps);else o!==a?(o===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):o.count--,a===null?Gp(u,e.type,e.stateNode):jp(u,a,e.memoizedProps)):a===null&&e.stateNode!==null&&ds(e,e.memoizedProps,t.memoizedProps)}break;case 27:sn(n,e),cn(e),a&512&&(we||t===null||at(t,t.return)),t!==null&&a&4&&ds(e,e.memoizedProps,t.memoizedProps);break;case 5:if(sn(n,e),cn(e),a&512&&(we||t===null||at(t,t.return)),e.flags&32){u=e.stateNode;try{Lu(u,"")}catch(b){ne(e,e.return,b)}}a&4&&e.stateNode!=null&&(u=e.memoizedProps,ds(e,u,t!==null?t.memoizedProps:u)),a&1024&&(ms=!0);break;case 6:if(sn(n,e),cn(e),a&4){if(e.stateNode===null)throw Error(S(162));a=e.memoizedProps,t=e.stateNode;try{t.nodeValue=a}catch(b){ne(e,e.return,b)}}break;case 3:if(ar=null,u=In,In=Mr(n.containerInfo),sn(n,e),In=u,cn(e),a&4&&t!==null&&t.memoizedState.isDehydrated)try{Vu(n.containerInfo)}catch(b){ne(e,e.return,b)}ms&&(ms=!1,Xm(e));break;case 4:a=In,In=Mr(e.stateNode.containerInfo),sn(n,e),cn(e),In=a;break;case 12:sn(n,e),cn(e);break;case 31:sn(n,e),cn(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bl(e,a)));break;case 13:sn(n,e),cn(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(Yr=yn()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bl(e,a)));break;case 22:u=e.memoizedState!==null;var i=t!==null&&t.memoizedState!==null,s=_t,f=we;if(_t=s||u,we=f||i,sn(n,e),we=f,_t=s,cn(e),a&8192)e:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(t===null||i||_t||we||za(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){i=t=n;try{if(o=i.stateNode,u)l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none";else{r=i.stateNode;var m=i.memoizedProps.style,d=m!=null&&m.hasOwnProperty("display")?m.display:null;r.style.display=d==null||typeof d=="boolean"?"":(""+d).trim()}}catch(b){ne(i,i.return,b)}}}else if(n.tag===6){if(t===null){i=n;try{i.stateNode.nodeValue=u?"":i.memoizedProps}catch(b){ne(i,i.return,b)}}}else if(n.tag===18){if(t===null){i=n;try{var p=i.stateNode;u?Fp(p,!0):Fp(i.stateNode,!1)}catch(b){ne(i,i.return,b)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}a&4&&(a=e.updateQueue,a!==null&&(t=a.retryQueue,t!==null&&(a.retryQueue=null,Bl(e,t))));break;case 19:sn(n,e),cn(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Bl(e,a)));break;case 30:break;case 21:break;default:sn(n,e),cn(e)}}function cn(e){var n=e.flags;if(n&2){try{for(var t,a=e.return;a!==null;){if(Hm(a)){t=a;break}a=a.return}if(t==null)throw Error(S(160));switch(t.tag){case 27:var u=t.stateNode,o=ps(e);Cr(e,o,u);break;case 5:var l=t.stateNode;t.flags&32&&(Lu(l,""),t.flags&=-33);var r=ps(e);Cr(e,r,l);break;case 3:case 4:var i=t.stateNode.containerInfo,s=ps(e);nc(e,s,i);break;default:throw Error(S(161))}}catch(f){ne(e,e.return,f)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Xm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Xm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function wt(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Vm(e,n.alternate,n),n=n.sibling}function za(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ha(4,n,n.return),za(n);break;case 1:at(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Um(n,n.return,t),za(n);break;case 27:Fo(n.stateNode);case 26:case 5:at(n,n.return),za(n);break;case 22:n.memoizedState===null&&za(n);break;case 30:za(n);break;default:za(n)}e=e.sibling}}function Ct(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var a=n.alternate,u=e,o=n,l=o.flags;switch(o.tag){case 0:case 11:case 15:Ct(u,o,t),ol(4,o);break;case 1:if(Ct(u,o,t),a=o,u=a.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(s){ne(a,a.return,s)}if(a=o,u=a.updateQueue,u!==null){var r=a.stateNode;try{var i=u.shared.hiddenCallbacks;if(i!==null)for(u.shared.hiddenCallbacks=null,u=0;u<i.length;u++)Z1(i[u],r)}catch(s){ne(a,a.return,s)}}t&&l&64&&qm(o),No(o,o.return);break;case 27:jm(o);case 26:case 5:Ct(u,o,t),t&&a===null&&l&4&&Bm(o),No(o,o.return);break;case 12:Ct(u,o,t);break;case 31:Ct(u,o,t),t&&l&4&&Zm(u,o);break;case 13:Ct(u,o,t),t&&l&4&&Ym(u,o);break;case 22:o.memoizedState===null&&Ct(u,o,t),No(o,o.return);break;case 30:break;default:Ct(u,o,t)}n=n.sibling}}function e0(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&al(t))}function n0(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&al(e))}function Gn(e,n,t,a){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Km(e,n,t,a),n=n.sibling}function Km(e,n,t,a){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Gn(e,n,t,a),u&2048&&ol(9,n);break;case 1:Gn(e,n,t,a);break;case 3:Gn(e,n,t,a),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&al(e)));break;case 12:if(u&2048){Gn(e,n,t,a),e=n.stateNode;try{var o=n.memoizedProps,l=o.id,r=o.onPostCommit;typeof r=="function"&&r(l,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(i){ne(n,n.return,i)}}else Gn(e,n,t,a);break;case 31:Gn(e,n,t,a);break;case 13:Gn(e,n,t,a);break;case 23:break;case 22:o=n.stateNode,l=n.alternate,n.memoizedState!==null?o._visibility&2?Gn(e,n,t,a):zo(e,n):o._visibility&2?Gn(e,n,t,a):(o._visibility|=2,fu(e,n,t,a,(n.subtreeFlags&10256)!==0||!1)),u&2048&&e0(l,n);break;case 24:Gn(e,n,t,a),u&2048&&n0(n.alternate,n);break;default:Gn(e,n,t,a)}}function fu(e,n,t,a,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var o=e,l=n,r=t,i=a,s=l.flags;switch(l.tag){case 0:case 11:case 15:fu(o,l,r,i,u),ol(8,l);break;case 23:break;case 22:var f=l.stateNode;l.memoizedState!==null?f._visibility&2?fu(o,l,r,i,u):zo(o,l):(f._visibility|=2,fu(o,l,r,i,u)),u&&s&2048&&e0(l.alternate,l);break;case 24:fu(o,l,r,i,u),u&&s&2048&&n0(l.alternate,l);break;default:fu(o,l,r,i,u)}n=n.sibling}}function zo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,a=n,u=a.flags;switch(a.tag){case 22:zo(t,a),u&2048&&e0(a.alternate,a);break;case 24:zo(t,a),u&2048&&n0(a.alternate,a);break;default:zo(t,a)}n=n.sibling}}var ko=8192;function cu(e,n,t){if(e.subtreeFlags&ko)for(e=e.child;e!==null;)Jm(e,n,t),e=e.sibling}function Jm(e,n,t){switch(e.tag){case 26:cu(e,n,t),e.flags&ko&&e.memoizedState!==null&&$v(t,In,e.memoizedState,e.memoizedProps);break;case 5:cu(e,n,t);break;case 3:case 4:var a=In;In=Mr(e.stateNode.containerInfo),cu(e,n,t),In=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=ko,ko=16777216,cu(e,n,t),ko=a):cu(e,n,t));break;default:cu(e,n,t)}}function Pm(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function go(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var a=n[t];Re=a,$m(a,e)}Pm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Wm(e),e=e.sibling}function Wm(e){switch(e.tag){case 0:case 11:case 15:go(e),e.flags&2048&&ha(9,e,e.return);break;case 3:go(e);break;case 12:go(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,nr(e)):go(e);break;default:go(e)}}function nr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var a=n[t];Re=a,$m(a,e)}Pm(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ha(8,n,n.return),nr(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,nr(n));break;default:nr(n)}e=e.sibling}}function $m(e,n){for(;Re!==null;){var t=Re;switch(t.tag){case 0:case 11:case 15:ha(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var a=t.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:al(t.memoizedState.cache)}if(a=t.child,a!==null)a.return=t,Re=a;else e:for(t=e;Re!==null;){a=Re;var u=a.sibling,o=a.return;if(Gm(a),a===t){Re=null;break e}if(u!==null){u.return=o,Re=u;break e}Re=o}}}var gv={getCacheForType:function(e){var n=Ze(Ce),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Ze(Ce).controller.signal}},bv=typeof WeakMap=="function"?WeakMap:Map,J=0,oe=null,V=null,I=0,ee=0,gn=null,na=!1,Qu=!1,t0=!1,Ot=0,he=0,ga=0,Ua=0,a0=0,xn=0,Uu=0,Lo=null,dn=null,tc=!1,Yr=0,eh=0,kr=1/0,_r=null,ia=null,_e=0,sa=null,Bu=null,Mt=0,ac=0,uc=null,nh=null,Oo=0,oc=null;function kn(){return(J&2)!==0&&I!==0?I&-I:L.T!==null?o0():c1()}function th(){if(xn===0)if((I&536870912)===0||Y){var e=Dl;Dl<<=1,(Dl&3932160)===0&&(Dl=262144),xn=e}else xn=536870912;return e=Sn.current,e!==null&&(e.flags|=32),xn}function pn(e,n,t){(e===oe&&(ee===2||ee===9)||e.cancelPendingCommit!==null)&&(Hu(e,0),ta(e,I,xn,!1)),el(e,t),((J&2)===0||e!==oe)&&(e===oe&&((J&2)===0&&(Ua|=t),he===4&&ta(e,I,xn,!1)),lt(e))}function ah(e,n,t){if((J&6)!==0)throw Error(S(327));var a=!t&&(n&127)===0&&(n&e.expiredLanes)===0||$o(e,n),u=a?yv(e,n):hs(e,n,!0),o=a;do{if(u===0){Qu&&!a&&ta(e,n,0,!1);break}else{if(t=e.current.alternate,o&&!vv(t)){u=hs(e,n,!1),o=!1;continue}if(u===2){if(o=n,e.errorRecoveryDisabledLanes&o)var l=0;else l=e.pendingLanes&-536870913,l=l!==0?l:l&536870912?536870912:0;if(l!==0){n=l;e:{var r=e;u=Lo;var i=r.current.memoizedState.isDehydrated;if(i&&(Hu(r,l).flags|=256),l=hs(r,l,!1),l!==2){if(t0&&!i){r.errorRecoveryDisabledLanes|=o,Ua|=o,u=4;break e}o=dn,dn=u,o!==null&&(dn===null?dn=o:dn.push.apply(dn,o))}u=l}if(o=!1,u!==2)continue}}if(u===1){Hu(e,0),ta(e,n,0,!0);break}e:{switch(a=e,o=u,o){case 0:case 1:throw Error(S(345));case 4:if((n&4194048)!==n)break;case 6:ta(a,n,xn,!na);break e;case 2:dn=null;break;case 3:case 5:break;default:throw Error(S(329))}if((n&62914560)===n&&(u=Yr+300-yn(),10<u)){if(ta(a,n,xn,!na),Or(a,0,!0)!==0)break e;Mt=n,a.timeoutHandle=kh(wp.bind(null,a,t,dn,_r,tc,n,xn,Ua,Uu,na,o,"Throttled",-0,0),u);break e}wp(a,t,dn,_r,tc,n,xn,Ua,Uu,na,o,null,-0,0)}}break}while(!0);lt(e)}function wp(e,n,t,a,u,o,l,r,i,s,f,m,d,p){if(e.timeoutHandle=-1,m=n.subtreeFlags,m&8192||(m&16785408)===16785408){m={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:At},Jm(n,o,m);var b=(o&62914560)===o?Yr-yn():(o&4194048)===o?eh-yn():0;if(b=ex(m,b),b!==null){Mt=o,e.cancelPendingCommit=b(kp.bind(null,e,n,o,t,a,u,l,r,i,f,m,null,d,p)),ta(e,o,l,!s);return}}kp(e,n,o,t,a,u,l,r,i)}function vv(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var a=0;a<t.length;a++){var u=t[a],o=u.getSnapshot;u=u.value;try{if(!_n(o(),u))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ta(e,n,t,a){n&=~a0,n&=~Ua,e.suspendedLanes|=n,e.pingedLanes&=~n,a&&(e.warmLanes|=n),a=e.expirationTimes;for(var u=n;0<u;){var o=31-Cn(u),l=1<<o;a[o]=-1,u&=~l}t!==0&&r1(e,t,n)}function Qr(){return(J&6)===0?(ll(0,!1),!1):!0}function u0(){if(V!==null){if(ee===0)var e=V.return;else e=V,Et=Xa=null,Gc(e),Du=null,Go=0,e=V;for(;e!==null;)Fm(e.alternate,e),e=e.return;V=null}}function Hu(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,Fv(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),Mt=0,u0(),oe=e,V=t=Tt(e.current,null),I=n,ee=0,gn=null,na=!1,Qu=$o(e,n),t0=!1,Uu=xn=a0=Ua=ga=he=0,dn=Lo=null,tc=!1,(n&8)!==0&&(n|=n&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=n;0<a;){var u=31-Cn(a),o=1<<u;n|=e[u],a&=~o}return Ot=n,Br(),t}function uh(e,n){q=null,L.H=Zo,n===Yu||n===jr?(n=$d(),ee=3):n===Fc?(n=$d(),ee=4):ee=n===Wc?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,gn=n,V===null&&(he=1,yr(e,qn(n,e.current)))}function oh(){var e=Sn.current;return e===null?!0:(I&4194048)===I?Bn===null:(I&62914560)===I||(I&536870912)!==0?e===Bn:!1}function lh(){var e=L.H;return L.H=Zo,e===null?Zo:e}function rh(){var e=L.A;return L.A=gv,e}function Sr(){he=4,na||(I&4194048)!==I&&Sn.current!==null||(Qu=!0),(ga&134217727)===0&&(Ua&134217727)===0||oe===null||ta(oe,I,xn,!1)}function hs(e,n,t){var a=J;J|=2;var u=lh(),o=rh();(oe!==e||I!==n)&&(_r=null,Hu(e,n)),n=!1;var l=he;e:do try{if(ee!==0&&V!==null){var r=V,i=gn;switch(ee){case 8:u0(),l=6;break e;case 3:case 2:case 9:case 6:Sn.current===null&&(n=!0);var s=ee;if(ee=0,gn=null,_u(e,r,i,s),t&&Qu){l=0;break e}break;default:s=ee,ee=0,gn=null,_u(e,r,i,s)}}xv(),l=he;break}catch(f){uh(e,f)}while(!0);return n&&e.shellSuspendCounter++,Et=Xa=null,J=a,L.H=u,L.A=o,V===null&&(oe=null,I=0,Br()),l}function xv(){for(;V!==null;)ih(V)}function yv(e,n){var t=J;J|=2;var a=lh(),u=rh();oe!==e||I!==n?(_r=null,kr=yn()+500,Hu(e,n)):Qu=$o(e,n);e:do try{if(ee!==0&&V!==null){n=V;var o=gn;n:switch(ee){case 1:ee=0,gn=null,_u(e,n,o,1);break;case 2:case 9:if(Wd(o)){ee=0,gn=null,Cp(n);break}n=function(){ee!==2&&ee!==9||oe!==e||(ee=7),lt(e)},o.then(n,n);break e;case 3:ee=7;break e;case 4:ee=5;break e;case 7:Wd(o)?(ee=0,gn=null,Cp(n)):(ee=0,gn=null,_u(e,n,o,7));break;case 5:var l=null;switch(V.tag){case 26:l=V.memoizedState;case 5:case 27:var r=V;if(l?Th(l):r.stateNode.complete){ee=0,gn=null;var i=r.sibling;if(i!==null)V=i;else{var s=r.return;s!==null?(V=s,Xr(s)):V=null}break n}}ee=0,gn=null,_u(e,n,o,5);break;case 6:ee=0,gn=null,_u(e,n,o,6);break;case 8:u0(),he=6;break e;default:throw Error(S(462))}}wv();break}catch(f){uh(e,f)}while(!0);return Et=Xa=null,L.H=a,L.A=u,J=t,V!==null?0:(oe=null,I=0,Br(),he)}function wv(){for(;V!==null&&!Ib();)ih(V)}function ih(e){var n=Om(e.alternate,e,Ot);e.memoizedProps=e.pendingProps,n===null?Xr(e):V=n}function Cp(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=hp(t,n,n.pendingProps,n.type,void 0,I);break;case 11:n=hp(t,n,n.pendingProps,n.type.render,n.ref,I);break;case 5:Gc(n);default:Fm(t,n),n=V=F1(n,Ot),n=Om(t,n,Ot)}e.memoizedProps=e.pendingProps,n===null?Xr(e):V=n}function _u(e,n,t,a){Et=Xa=null,Gc(n),Du=null,Go=0;var u=n.return;try{if(sv(e,u,n,t,I)){he=1,yr(e,qn(t,e.current)),V=null;return}}catch(o){if(u!==null)throw V=u,o;he=1,yr(e,qn(t,e.current)),V=null;return}n.flags&32768?(Y||a===1?e=!0:Qu||(I&536870912)!==0?e=!1:(na=e=!0,(a===2||a===9||a===3||a===6)&&(a=Sn.current,a!==null&&a.tag===13&&(a.flags|=16384))),sh(n,e)):Xr(n)}function Xr(e){var n=e;do{if((n.flags&32768)!==0){sh(n,na);return}e=n.return;var t=dv(n.alternate,n,Ot);if(t!==null){V=t;return}if(n=n.sibling,n!==null){V=n;return}V=n=e}while(n!==null);he===0&&(he=5)}function sh(e,n){do{var t=pv(e.alternate,e);if(t!==null){t.flags&=32767,V=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){V=e;return}V=e=t}while(e!==null);he=6,V=null}function kp(e,n,t,a,u,o,l,r,i){e.cancelPendingCommit=null;do Kr();while(_e!==0);if((J&6)!==0)throw Error(S(327));if(n!==null){if(n===e.current)throw Error(S(177));if(o=n.lanes|n.childLanes,o|=Dc,e3(e,t,o,l,r,i),e===oe&&(V=oe=null,I=0),Bu=n,sa=e,Mt=t,ac=o,uc=u,nh=a,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Sv(sr,function(){return mh(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||a){a=L.T,L.T=null,u=P.p,P.p=2,l=J,J|=4;try{mv(e,n,t)}finally{J=l,P.p=u,L.T=a}}_e=1,ch(),fh(),dh()}}function ch(){if(_e===1){_e=0;var e=sa,n=Bu,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=L.T,L.T=null;var a=P.p;P.p=2;var u=J;J|=4;try{Qm(n,e);var o=sc,l=T1(e.containerInfo),r=o.focusedElem,i=o.selectionRange;if(l!==r&&r&&r.ownerDocument&&E1(r.ownerDocument.documentElement,r)){if(i!==null&&Tc(r)){var s=i.start,f=i.end;if(f===void 0&&(f=s),"selectionStart"in r)r.selectionStart=s,r.selectionEnd=Math.min(f,r.value.length);else{var m=r.ownerDocument||document,d=m&&m.defaultView||window;if(d.getSelection){var p=d.getSelection(),b=r.textContent.length,C=Math.min(i.start,b),_=i.end===void 0?C:Math.min(i.end,b);!p.extend&&C>_&&(l=_,_=C,C=l);var g=Zd(r,C),c=Zd(r,_);if(g&&c&&(p.rangeCount!==1||p.anchorNode!==g.node||p.anchorOffset!==g.offset||p.focusNode!==c.node||p.focusOffset!==c.offset)){var h=m.createRange();h.setStart(g.node,g.offset),p.removeAllRanges(),C>_?(p.addRange(h),p.extend(c.node,c.offset)):(h.setEnd(c.node,c.offset),p.addRange(h))}}}}for(m=[],p=r;p=p.parentNode;)p.nodeType===1&&m.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<m.length;r++){var v=m[r];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}zr=!!ic,sc=ic=null}finally{J=u,P.p=a,L.T=t}}e.current=n,_e=2}}function fh(){if(_e===2){_e=0;var e=sa,n=Bu,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=L.T,L.T=null;var a=P.p;P.p=2;var u=J;J|=4;try{Vm(e,n.alternate,n)}finally{J=u,P.p=a,L.T=t}}_e=3}}function dh(){if(_e===4||_e===3){_e=0,Zb();var e=sa,n=Bu,t=Mt,a=nh;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?_e=5:(_e=0,Bu=sa=null,ph(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ia=null),wc(t),n=n.stateNode,wn&&typeof wn.onCommitFiberRoot=="function")try{wn.onCommitFiberRoot(Wo,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=L.T,u=P.p,P.p=2,L.T=null;try{for(var o=e.onRecoverableError,l=0;l<a.length;l++){var r=a[l];o(r.value,{componentStack:r.stack})}}finally{L.T=n,P.p=u}}(Mt&3)!==0&&Kr(),lt(e),u=e.pendingLanes,(t&261930)!==0&&(u&42)!==0?e===oc?Oo++:(Oo=0,oc=e):Oo=0,ll(0,!1)}}function ph(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,al(n)))}function Kr(){return ch(),fh(),dh(),mh()}function mh(){if(_e!==5)return!1;var e=sa,n=ac;ac=0;var t=wc(Mt),a=L.T,u=P.p;try{P.p=32>t?32:t,L.T=null,t=uc,uc=null;var o=sa,l=Mt;if(_e=0,Bu=sa=null,Mt=0,(J&6)!==0)throw Error(S(331));var r=J;if(J|=4,Wm(o.current),Km(o,o.current,l,t),J=r,ll(0,!1),wn&&typeof wn.onPostCommitFiberRoot=="function")try{wn.onPostCommitFiberRoot(Wo,o)}catch{}return!0}finally{P.p=u,L.T=a,ph(e,n)}}function _p(e,n,t){n=qn(t,n),n=Ws(e.stateNode,n,2),e=ra(e,n,2),e!==null&&(el(e,2),lt(e))}function ne(e,n,t){if(e.tag===3)_p(e,e,t);else for(;n!==null;){if(n.tag===3){_p(n,e,t);break}else if(n.tag===1){var a=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ia===null||!ia.has(a))){e=qn(t,e),t=Dm(2),a=ra(n,t,2),a!==null&&(Mm(t,a,n,e),el(a,2),lt(a));break}}n=n.return}}function gs(e,n,t){var a=e.pingCache;if(a===null){a=e.pingCache=new bv;var u=new Set;a.set(n,u)}else u=a.get(n),u===void 0&&(u=new Set,a.set(n,u));u.has(t)||(t0=!0,u.add(t),e=Cv.bind(null,e,n,t),n.then(e,e))}function Cv(e,n,t){var a=e.pingCache;a!==null&&a.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,oe===e&&(I&t)===t&&(he===4||he===3&&(I&62914560)===I&&300>yn()-Yr?(J&2)===0&&Hu(e,0):a0|=t,Uu===I&&(Uu=0)),lt(e)}function hh(e,n){n===0&&(n=l1()),e=Qa(e,n),e!==null&&(el(e,n),lt(e))}function kv(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),hh(e,t)}function _v(e,n){var t=0;switch(e.tag){case 31:case 13:var a=e.stateNode,u=e.memoizedState;u!==null&&(t=u.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(S(314))}a!==null&&a.delete(n),hh(e,t)}function Sv(e,n){return xc(e,n)}var Ar=null,du=null,lc=!1,Er=!1,bs=!1,aa=0;function lt(e){e!==du&&e.next===null&&(du===null?Ar=du=e:du=du.next=e),Er=!0,lc||(lc=!0,Ev())}function ll(e,n){if(!bs&&Er){bs=!0;do for(var t=!1,a=Ar;a!==null;){if(!n)if(e!==0){var u=a.pendingLanes;if(u===0)var o=0;else{var l=a.suspendedLanes,r=a.pingedLanes;o=(1<<31-Cn(42|e)+1)-1,o&=u&~(l&~r),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(t=!0,Sp(a,o))}else o=I,o=Or(a,a===oe?o:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(o&3)===0||$o(a,o)||(t=!0,Sp(a,o));a=a.next}while(t);bs=!1}}function Av(){gh()}function gh(){Er=lc=!1;var e=0;aa!==0&&Ov()&&(e=aa);for(var n=yn(),t=null,a=Ar;a!==null;){var u=a.next,o=bh(a,n);o===0?(a.next=null,t===null?Ar=u:t.next=u,u===null&&(du=t)):(t=a,(e!==0||(o&3)!==0)&&(Er=!0)),a=u}_e!==0&&_e!==5||ll(e,!1),aa!==0&&(aa=0)}function bh(e,n){for(var t=e.suspendedLanes,a=e.pingedLanes,u=e.expirationTimes,o=e.pendingLanes&-62914561;0<o;){var l=31-Cn(o),r=1<<l,i=u[l];i===-1?((r&t)===0||(r&a)!==0)&&(u[l]=$b(r,n)):i<=n&&(e.expiredLanes|=r),o&=~r}if(n=oe,t=I,t=Or(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,t===0||e===n&&(ee===2||ee===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Yi(a),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||$o(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(a!==null&&Yi(a),wc(t)){case 2:case 8:t=u1;break;case 32:t=sr;break;case 268435456:t=o1;break;default:t=sr}return a=vh.bind(null,e),t=xc(t,a),e.callbackPriority=n,e.callbackNode=t,n}return a!==null&&a!==null&&Yi(a),e.callbackPriority=2,e.callbackNode=null,2}function vh(e,n){if(_e!==0&&_e!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(Kr()&&e.callbackNode!==t)return null;var a=I;return a=Or(e,e===oe?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(ah(e,a,n),bh(e,yn()),e.callbackNode!=null&&e.callbackNode===t?vh.bind(null,e):null)}function Sp(e,n){if(Kr())return null;ah(e,n,!0)}function Ev(){qv(function(){(J&6)!==0?xc(a1,Av):gh()})}function o0(){if(aa===0){var e=Ou;e===0&&(e=Tl,Tl<<=1,(Tl&261888)===0&&(Tl=256)),aa=e}return aa}function Ap(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Yl(""+e)}function Ep(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Tv(e,n,t,a,u){if(n==="submit"&&t&&t.stateNode===u){var o=Ap((u[mn]||null).action),l=a.submitter;l&&(n=(n=l[mn]||null)?Ap(n.formAction):l.getAttribute("formAction"),n!==null&&(o=n,l=null));var r=new Fr("action","action",null,a,u);e.push({event:r,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(aa!==0){var i=l?Ep(u,l):new FormData(u);Js(t,{pending:!0,data:i,method:u.method,action:o},null,i)}}else typeof o=="function"&&(r.preventDefault(),i=l?Ep(u,l):new FormData(u),Js(t,{pending:!0,data:i,method:u.method,action:o},o,i))},currentTarget:u}]})}}for(Hl=0;Hl<Us.length;Hl++)jl=Us[Hl],Tp=jl.toLowerCase(),Dp=jl[0].toUpperCase()+jl.slice(1),Zn(Tp,"on"+Dp);var jl,Tp,Dp,Hl;Zn(M1,"onAnimationEnd");Zn(R1,"onAnimationIteration");Zn(N1,"onAnimationStart");Zn("dblclick","onDoubleClick");Zn("focusin","onFocus");Zn("focusout","onBlur");Zn(Y3,"onTransitionRun");Zn(Q3,"onTransitionStart");Zn(X3,"onTransitionCancel");Zn(z1,"onTransitionEnd");zu("onMouseEnter",["mouseout","mouseover"]);zu("onMouseLeave",["mouseout","mouseover"]);zu("onPointerEnter",["pointerout","pointerover"]);zu("onPointerLeave",["pointerout","pointerover"]);Ia("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ia("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ia("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ia("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ia("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ia("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yo));function xh(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var a=e[t],u=a.event;a=a.listeners;e:{var o=void 0;if(n)for(var l=a.length-1;0<=l;l--){var r=a[l],i=r.instance,s=r.currentTarget;if(r=r.listener,i!==o&&u.isPropagationStopped())break e;o=r,u.currentTarget=s;try{o(u)}catch(f){fr(f)}u.currentTarget=null,o=i}else for(l=0;l<a.length;l++){if(r=a[l],i=r.instance,s=r.currentTarget,r=r.listener,i!==o&&u.isPropagationStopped())break e;o=r,u.currentTarget=s;try{o(u)}catch(f){fr(f)}u.currentTarget=null,o=i}}}}function j(e,n){var t=n[Ms];t===void 0&&(t=n[Ms]=new Set);var a=e+"__bubble";t.has(a)||(yh(n,e,2,!1),t.add(a))}function vs(e,n,t){var a=0;n&&(a|=4),yh(t,e,a,n)}var Vl="_reactListening"+Math.random().toString(36).slice(2);function l0(e){if(!e[Vl]){e[Vl]=!0,f1.forEach(function(t){t!=="selectionchange"&&(Dv.has(t)||vs(t,!1,e),vs(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Vl]||(n[Vl]=!0,vs("selectionchange",!1,n))}}function yh(e,n,t,a){switch(zh(n)){case 2:var u=ax;break;case 8:u=ux;break;default:u=c0}t=u.bind(null,n,t,e),u=void 0,!Os||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),a?u!==void 0?e.addEventListener(n,t,{capture:!0,passive:u}):e.addEventListener(n,t,!0):u!==void 0?e.addEventListener(n,t,{passive:u}):e.addEventListener(n,t,!1)}function xs(e,n,t,a,u){var o=a;if((n&1)===0&&(n&2)===0&&a!==null)e:for(;;){if(a===null)return;var l=a.tag;if(l===3||l===4){var r=a.stateNode.containerInfo;if(r===u)break;if(l===4)for(l=a.return;l!==null;){var i=l.tag;if((i===3||i===4)&&l.stateNode.containerInfo===u)return;l=l.return}for(;r!==null;){if(l=hu(r),l===null)return;if(i=l.tag,i===5||i===6||i===26||i===27){a=o=l;continue e}r=r.parentNode}}a=a.return}x1(function(){var s=o,f=_c(t),m=[];e:{var d=L1.get(e);if(d!==void 0){var p=Fr,b=e;switch(e){case"keypress":if(Xl(t)===0)break e;case"keydown":case"keyup":p=_3;break;case"focusin":b="focus",p=Pi;break;case"focusout":b="blur",p=Pi;break;case"beforeblur":case"afterblur":p=Pi;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Fd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=d3;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=E3;break;case M1:case R1:case N1:p=h3;break;case z1:p=D3;break;case"scroll":case"scrollend":p=c3;break;case"wheel":p=R3;break;case"copy":case"cut":case"paste":p=b3;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Ud;break;case"toggle":case"beforetoggle":p=z3}var C=(n&4)!==0,_=!C&&(e==="scroll"||e==="scrollend"),g=C?d!==null?d+"Capture":null:d;C=[];for(var c=s,h;c!==null;){var v=c;if(h=v.stateNode,v=v.tag,v!==5&&v!==26&&v!==27||h===null||g===null||(v=Uo(c,g),v!=null&&C.push(Qo(c,v,h))),_)break;c=c.return}0<C.length&&(d=new p(d,b,null,t,f),m.push({event:d,listeners:C}))}}if((n&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",d&&t!==Ls&&(b=t.relatedTarget||t.fromElement)&&(hu(b)||b[Gu]))break e;if((p||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,p?(b=t.relatedTarget||t.toElement,p=s,b=b?hu(b):null,b!==null&&(_=Po(b),C=b.tag,b!==_||C!==5&&C!==27&&C!==6)&&(b=null)):(p=null,b=s),p!==b)){if(C=Fd,v="onMouseLeave",g="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(C=Ud,v="onPointerLeave",g="onPointerEnter",c="pointer"),_=p==null?d:wo(p),h=b==null?d:wo(b),d=new C(v,c+"leave",p,t,f),d.target=_,d.relatedTarget=h,v=null,hu(f)===s&&(C=new C(g,c+"enter",b,t,f),C.target=h,C.relatedTarget=_,v=C),_=v,p&&b)n:{for(C=Mv,g=p,c=b,h=0,v=g;v;v=C(v))h++;v=0;for(var x=c;x;x=C(x))v++;for(;0<h-v;)g=C(g),h--;for(;0<v-h;)c=C(c),v--;for(;h--;){if(g===c||c!==null&&g===c.alternate){C=g;break n}g=C(g),c=C(c)}C=null}else C=null;p!==null&&Mp(m,d,p,C,!1),b!==null&&_!==null&&Mp(m,_,b,C,!0)}}e:{if(d=s?wo(s):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var w=Vd;else if(jd(d))if(S1)w=G3;else{w=j3;var y=H3}else p=d.nodeName,!p||p.toLowerCase()!=="input"||d.type!=="checkbox"&&d.type!=="radio"?s&&kc(s.elementType)&&(w=Vd):w=V3;if(w&&(w=w(e,s))){_1(m,w,t,f);break e}y&&y(e,d,s),e==="focusout"&&s&&d.type==="number"&&s.memoizedProps.value!=null&&zs(d,"number",d.value)}switch(y=s?wo(s):window,e){case"focusin":(jd(y)||y.contentEditable==="true")&&(vu=y,Fs=s,Ao=null);break;case"focusout":Ao=Fs=vu=null;break;case"mousedown":qs=!0;break;case"contextmenu":case"mouseup":case"dragend":qs=!1,Yd(m,t,f);break;case"selectionchange":if(Z3)break;case"keydown":case"keyup":Yd(m,t,f)}var k;if(Ec)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else bu?C1(e,t)&&(A="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(A="onCompositionStart");A&&(w1&&t.locale!=="ko"&&(bu||A!=="onCompositionStart"?A==="onCompositionEnd"&&bu&&(k=y1()):(ea=f,Sc="value"in ea?ea.value:ea.textContent,bu=!0)),y=Tr(s,A),0<y.length&&(A=new qd(A,e,null,t,f),m.push({event:A,listeners:y}),k?A.data=k:(k=k1(t),k!==null&&(A.data=k)))),(k=O3?F3(e,t):q3(e,t))&&(A=Tr(s,"onBeforeInput"),0<A.length&&(y=new qd("onBeforeInput","beforeinput",null,t,f),m.push({event:y,listeners:A}),y.data=k)),Tv(m,e,s,t,f)}xh(m,n)})}function Qo(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Tr(e,n){for(var t=n+"Capture",a=[];e!==null;){var u=e,o=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||o===null||(u=Uo(e,t),u!=null&&a.unshift(Qo(e,u,o)),u=Uo(e,n),u!=null&&a.push(Qo(e,u,o))),e.tag===3)return a;e=e.return}return[]}function Mv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Mp(e,n,t,a,u){for(var o=n._reactName,l=[];t!==null&&t!==a;){var r=t,i=r.alternate,s=r.stateNode;if(r=r.tag,i!==null&&i===a)break;r!==5&&r!==26&&r!==27||s===null||(i=s,u?(s=Uo(t,o),s!=null&&l.unshift(Qo(t,s,i))):u||(s=Uo(t,o),s!=null&&l.push(Qo(t,s,i)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var Rv=/\r\n?/g,Nv=/\u0000|\uFFFD/g;function Rp(e){return(typeof e=="string"?e:""+e).replace(Rv,`
`).replace(Nv,"")}function wh(e,n){return n=Rp(n),Rp(e)===n}function te(e,n,t,a,u,o){switch(t){case"children":typeof a=="string"?n==="body"||n==="textarea"&&a===""||Lu(e,a):(typeof a=="number"||typeof a=="bigint")&&n!=="body"&&Lu(e,""+a);break;case"className":Rl(e,"class",a);break;case"tabIndex":Rl(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Rl(e,t,a);break;case"style":v1(e,a,o);break;case"data":if(n!=="object"){Rl(e,"data",a);break}case"src":case"href":if(a===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(t);break}a=Yl(""+a),e.setAttribute(t,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof o=="function"&&(t==="formAction"?(n!=="input"&&te(e,n,"name",u.name,u,null),te(e,n,"formEncType",u.formEncType,u,null),te(e,n,"formMethod",u.formMethod,u,null),te(e,n,"formTarget",u.formTarget,u,null)):(te(e,n,"encType",u.encType,u,null),te(e,n,"method",u.method,u,null),te(e,n,"target",u.target,u,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(t);break}a=Yl(""+a),e.setAttribute(t,a);break;case"onClick":a!=null&&(e.onclick=At);break;case"onScroll":a!=null&&j("scroll",e);break;case"onScrollEnd":a!=null&&j("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(S(61));if(t=a.__html,t!=null){if(u.children!=null)throw Error(S(60));e.innerHTML=t}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}t=Yl(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(t,""+a):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":a===!0?e.setAttribute(t,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(t,a):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(t,a):e.removeAttribute(t);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(t):e.setAttribute(t,a);break;case"popover":j("beforetoggle",e),j("toggle",e),Zl(e,"popover",a);break;case"xlinkActuate":vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":vt(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":vt(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":vt(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":vt(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Zl(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=i3.get(t)||t,Zl(e,t,a))}}function rc(e,n,t,a,u,o){switch(t){case"style":v1(e,a,o);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(S(61));if(t=a.__html,t!=null){if(u.children!=null)throw Error(S(60));e.innerHTML=t}}break;case"children":typeof a=="string"?Lu(e,a):(typeof a=="number"||typeof a=="bigint")&&Lu(e,""+a);break;case"onScroll":a!=null&&j("scroll",e);break;case"onScrollEnd":a!=null&&j("scrollend",e);break;case"onClick":a!=null&&(e.onclick=At);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!d1.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(u=t.endsWith("Capture"),n=t.slice(2,u?t.length-7:void 0),o=e[mn]||null,o=o!=null?o[t]:null,typeof o=="function"&&e.removeEventListener(n,o,u),typeof a=="function")){typeof o!="function"&&o!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,a,u);break e}t in e?e[t]=a:a===!0?e.setAttribute(t,""):Zl(e,t,a)}}}function Ye(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":j("error",e),j("load",e);var a=!1,u=!1,o;for(o in t)if(t.hasOwnProperty(o)){var l=t[o];if(l!=null)switch(o){case"src":a=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(S(137,n));default:te(e,n,o,l,t,null)}}u&&te(e,n,"srcSet",t.srcSet,t,null),a&&te(e,n,"src",t.src,t,null);return;case"input":j("invalid",e);var r=o=l=u=null,i=null,s=null;for(a in t)if(t.hasOwnProperty(a)){var f=t[a];if(f!=null)switch(a){case"name":u=f;break;case"type":l=f;break;case"checked":i=f;break;case"defaultChecked":s=f;break;case"value":o=f;break;case"defaultValue":r=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(S(137,n));break;default:te(e,n,a,f,t,null)}}h1(e,o,r,i,s,l,u,!1);return;case"select":j("invalid",e),a=l=o=null;for(u in t)if(t.hasOwnProperty(u)&&(r=t[u],r!=null))switch(u){case"value":o=r;break;case"defaultValue":l=r;break;case"multiple":a=r;default:te(e,n,u,r,t,null)}n=o,t=l,e.multiple=!!a,n!=null?Au(e,!!a,n,!1):t!=null&&Au(e,!!a,t,!0);return;case"textarea":j("invalid",e),o=u=a=null;for(l in t)if(t.hasOwnProperty(l)&&(r=t[l],r!=null))switch(l){case"value":a=r;break;case"defaultValue":u=r;break;case"children":o=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(S(91));break;default:te(e,n,l,r,t,null)}b1(e,a,u,o);return;case"option":for(i in t)if(t.hasOwnProperty(i)&&(a=t[i],a!=null))switch(i){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:te(e,n,i,a,t,null)}return;case"dialog":j("beforetoggle",e),j("toggle",e),j("cancel",e),j("close",e);break;case"iframe":case"object":j("load",e);break;case"video":case"audio":for(a=0;a<Yo.length;a++)j(Yo[a],e);break;case"image":j("error",e),j("load",e);break;case"details":j("toggle",e);break;case"embed":case"source":case"link":j("error",e),j("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(s in t)if(t.hasOwnProperty(s)&&(a=t[s],a!=null))switch(s){case"children":case"dangerouslySetInnerHTML":throw Error(S(137,n));default:te(e,n,s,a,t,null)}return;default:if(kc(n)){for(f in t)t.hasOwnProperty(f)&&(a=t[f],a!==void 0&&rc(e,n,f,a,t,void 0));return}}for(r in t)t.hasOwnProperty(r)&&(a=t[r],a!=null&&te(e,n,r,a,t,null))}function zv(e,n,t,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,o=null,l=null,r=null,i=null,s=null,f=null;for(p in t){var m=t[p];if(t.hasOwnProperty(p)&&m!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":i=m;default:a.hasOwnProperty(p)||te(e,n,p,null,a,m)}}for(var d in a){var p=a[d];if(m=t[d],a.hasOwnProperty(d)&&(p!=null||m!=null))switch(d){case"type":o=p;break;case"name":u=p;break;case"checked":s=p;break;case"defaultChecked":f=p;break;case"value":l=p;break;case"defaultValue":r=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(S(137,n));break;default:p!==m&&te(e,n,d,p,a,m)}}Ns(e,l,r,i,s,f,o,u);return;case"select":p=l=r=d=null;for(o in t)if(i=t[o],t.hasOwnProperty(o)&&i!=null)switch(o){case"value":break;case"multiple":p=i;default:a.hasOwnProperty(o)||te(e,n,o,null,a,i)}for(u in a)if(o=a[u],i=t[u],a.hasOwnProperty(u)&&(o!=null||i!=null))switch(u){case"value":d=o;break;case"defaultValue":r=o;break;case"multiple":l=o;default:o!==i&&te(e,n,u,o,a,i)}n=r,t=l,a=p,d!=null?Au(e,!!t,d,!1):!!a!=!!t&&(n!=null?Au(e,!!t,n,!0):Au(e,!!t,t?[]:"",!1));return;case"textarea":p=d=null;for(r in t)if(u=t[r],t.hasOwnProperty(r)&&u!=null&&!a.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:te(e,n,r,null,a,u)}for(l in a)if(u=a[l],o=t[l],a.hasOwnProperty(l)&&(u!=null||o!=null))switch(l){case"value":d=u;break;case"defaultValue":p=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(S(91));break;default:u!==o&&te(e,n,l,u,a,o)}g1(e,d,p);return;case"option":for(var b in t)if(d=t[b],t.hasOwnProperty(b)&&d!=null&&!a.hasOwnProperty(b))switch(b){case"selected":e.selected=!1;break;default:te(e,n,b,null,a,d)}for(i in a)if(d=a[i],p=t[i],a.hasOwnProperty(i)&&d!==p&&(d!=null||p!=null))switch(i){case"selected":e.selected=d&&typeof d!="function"&&typeof d!="symbol";break;default:te(e,n,i,d,a,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var C in t)d=t[C],t.hasOwnProperty(C)&&d!=null&&!a.hasOwnProperty(C)&&te(e,n,C,null,a,d);for(s in a)if(d=a[s],p=t[s],a.hasOwnProperty(s)&&d!==p&&(d!=null||p!=null))switch(s){case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(S(137,n));break;default:te(e,n,s,d,a,p)}return;default:if(kc(n)){for(var _ in t)d=t[_],t.hasOwnProperty(_)&&d!==void 0&&!a.hasOwnProperty(_)&&rc(e,n,_,void 0,a,d);for(f in a)d=a[f],p=t[f],!a.hasOwnProperty(f)||d===p||d===void 0&&p===void 0||rc(e,n,f,d,a,p);return}}for(var g in t)d=t[g],t.hasOwnProperty(g)&&d!=null&&!a.hasOwnProperty(g)&&te(e,n,g,null,a,d);for(m in a)d=a[m],p=t[m],!a.hasOwnProperty(m)||d===p||d==null&&p==null||te(e,n,m,d,a,p)}function Np(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Lv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),a=0;a<t.length;a++){var u=t[a],o=u.transferSize,l=u.initiatorType,r=u.duration;if(o&&r&&Np(l)){for(l=0,r=u.responseEnd,a+=1;a<t.length;a++){var i=t[a],s=i.startTime;if(s>r)break;var f=i.transferSize,m=i.initiatorType;f&&Np(m)&&(i=i.responseEnd,l+=f*(i<r?1:(r-s)/(i-s)))}if(--a,n+=8*(o+l)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ic=null,sc=null;function Dr(e){return e.nodeType===9?e:e.ownerDocument}function zp(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Ch(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function cc(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ys=null;function Ov(){var e=window.event;return e&&e.type==="popstate"?e===ys?!1:(ys=e,!0):(ys=null,!1)}var kh=typeof setTimeout=="function"?setTimeout:void 0,Fv=typeof clearTimeout=="function"?clearTimeout:void 0,Lp=typeof Promise=="function"?Promise:void 0,qv=typeof queueMicrotask=="function"?queueMicrotask:typeof Lp<"u"?function(e){return Lp.resolve(null).then(e).catch(Uv)}:kh;function Uv(e){setTimeout(function(){throw e})}function va(e){return e==="head"}function Op(e,n){var t=n,a=0;do{var u=t.nextSibling;if(e.removeChild(t),u&&u.nodeType===8)if(t=u.data,t==="/$"||t==="/&"){if(a===0){e.removeChild(u),Vu(n);return}a--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")a++;else if(t==="html")Fo(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,Fo(t);for(var o=t.firstChild;o;){var l=o.nextSibling,r=o.nodeName;o[nl]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&o.rel.toLowerCase()==="stylesheet"||t.removeChild(o),o=l}}else t==="body"&&Fo(e.ownerDocument.body);t=u}while(t);Vu(n)}function Fp(e,n){var t=e;e=0;do{var a=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=a}while(t)}function fc(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":fc(t),Cc(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function Bv(e,n,t,a){for(;e.nodeType===1;){var u=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[nl])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(o=e.getAttribute("rel"),o==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(o!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(o=e.getAttribute("src"),(o!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var o=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===o)return e}else return e;if(e=Hn(e.nextSibling),e===null)break}return null}function Hv(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Hn(e.nextSibling),e===null))return null;return e}function _h(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Hn(e.nextSibling),e===null))return null;return e}function dc(e){return e.data==="$?"||e.data==="$~"}function pc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function jv(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var a=function(){n(),t.removeEventListener("DOMContentLoaded",a)};t.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function Hn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var mc=null;function qp(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return Hn(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Up(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function Sh(e,n,t){switch(n=Dr(t),e){case"html":if(e=n.documentElement,!e)throw Error(S(452));return e;case"head":if(e=n.head,!e)throw Error(S(453));return e;case"body":if(e=n.body,!e)throw Error(S(454));return e;default:throw Error(S(451))}}function Fo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Cc(e)}var jn=new Map,Bp=new Set;function Mr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ft=P.d;P.d={f:Vv,r:Gv,D:Iv,C:Zv,L:Yv,m:Qv,X:Kv,S:Xv,M:Jv};function Vv(){var e=Ft.f(),n=Qr();return e||n}function Gv(e){var n=Iu(e);n!==null&&n.tag===5&&n.type==="form"?vm(n):Ft.r(e)}var Xu=typeof document>"u"?null:document;function Ah(e,n,t){var a=Xu;if(a&&typeof n=="string"&&n){var u=Fn(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof t=="string"&&(u+='[crossorigin="'+t+'"]'),Bp.has(u)||(Bp.add(u),e={rel:e,crossOrigin:t,href:n},a.querySelector(u)===null&&(n=a.createElement("link"),Ye(n,"link",e),Ne(n),a.head.appendChild(n)))}}function Iv(e){Ft.D(e),Ah("dns-prefetch",e,null)}function Zv(e,n){Ft.C(e,n),Ah("preconnect",e,n)}function Yv(e,n,t){Ft.L(e,n,t);var a=Xu;if(a&&e&&n){var u='link[rel="preload"][as="'+Fn(n)+'"]';n==="image"&&t&&t.imageSrcSet?(u+='[imagesrcset="'+Fn(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(u+='[imagesizes="'+Fn(t.imageSizes)+'"]')):u+='[href="'+Fn(e)+'"]';var o=u;switch(n){case"style":o=ju(e);break;case"script":o=Ku(e)}jn.has(o)||(e=fe({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),jn.set(o,e),a.querySelector(u)!==null||n==="style"&&a.querySelector(rl(o))||n==="script"&&a.querySelector(il(o))||(n=a.createElement("link"),Ye(n,"link",e),Ne(n),a.head.appendChild(n)))}}function Qv(e,n){Ft.m(e,n);var t=Xu;if(t&&e){var a=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Fn(a)+'"][href="'+Fn(e)+'"]',o=u;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=Ku(e)}if(!jn.has(o)&&(e=fe({rel:"modulepreload",href:e},n),jn.set(o,e),t.querySelector(u)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(il(o)))return}a=t.createElement("link"),Ye(a,"link",e),Ne(a),t.head.appendChild(a)}}}function Xv(e,n,t){Ft.S(e,n,t);var a=Xu;if(a&&e){var u=Su(a).hoistableStyles,o=ju(e);n=n||"default";var l=u.get(o);if(!l){var r={loading:0,preload:null};if(l=a.querySelector(rl(o)))r.loading=5;else{e=fe({rel:"stylesheet",href:e,"data-precedence":n},t),(t=jn.get(o))&&r0(e,t);var i=l=a.createElement("link");Ne(i),Ye(i,"link",e),i._p=new Promise(function(s,f){i.onload=s,i.onerror=f}),i.addEventListener("load",function(){r.loading|=1}),i.addEventListener("error",function(){r.loading|=2}),r.loading|=4,tr(l,n,a)}l={type:"stylesheet",instance:l,count:1,state:r},u.set(o,l)}}}function Kv(e,n){Ft.X(e,n);var t=Xu;if(t&&e){var a=Su(t).hoistableScripts,u=Ku(e),o=a.get(u);o||(o=t.querySelector(il(u)),o||(e=fe({src:e,async:!0},n),(n=jn.get(u))&&i0(e,n),o=t.createElement("script"),Ne(o),Ye(o,"link",e),t.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},a.set(u,o))}}function Jv(e,n){Ft.M(e,n);var t=Xu;if(t&&e){var a=Su(t).hoistableScripts,u=Ku(e),o=a.get(u);o||(o=t.querySelector(il(u)),o||(e=fe({src:e,async:!0,type:"module"},n),(n=jn.get(u))&&i0(e,n),o=t.createElement("script"),Ne(o),Ye(o,"link",e),t.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},a.set(u,o))}}function Hp(e,n,t,a){var u=(u=ua.current)?Mr(u):null;if(!u)throw Error(S(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=ju(t.href),t=Su(u).hoistableStyles,a=t.get(n),a||(a={type:"style",instance:null,count:0,state:null},t.set(n,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=ju(t.href);var o=Su(u).hoistableStyles,l=o.get(e);if(l||(u=u.ownerDocument||u,l={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},o.set(e,l),(o=u.querySelector(rl(e)))&&!o._p&&(l.instance=o,l.state.loading=5),jn.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},jn.set(e,t),o||Pv(u,e,t,l.state))),n&&a===null)throw Error(S(528,""));return l}if(n&&a!==null)throw Error(S(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Ku(t),t=Su(u).hoistableScripts,a=t.get(n),a||(a={type:"script",instance:null,count:0,state:null},t.set(n,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(S(444,e))}}function ju(e){return'href="'+Fn(e)+'"'}function rl(e){return'link[rel="stylesheet"]['+e+"]"}function Eh(e){return fe({},e,{"data-precedence":e.precedence,precedence:null})}function Pv(e,n,t,a){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?a.loading=1:(n=e.createElement("link"),a.preload=n,n.addEventListener("load",function(){return a.loading|=1}),n.addEventListener("error",function(){return a.loading|=2}),Ye(n,"link",t),Ne(n),e.head.appendChild(n))}function Ku(e){return'[src="'+Fn(e)+'"]'}function il(e){return"script[async]"+e}function jp(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var a=e.querySelector('style[data-href~="'+Fn(t.href)+'"]');if(a)return n.instance=a,Ne(a),a;var u=fe({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Ne(a),Ye(a,"style",u),tr(a,t.precedence,e),n.instance=a;case"stylesheet":u=ju(t.href);var o=e.querySelector(rl(u));if(o)return n.state.loading|=4,n.instance=o,Ne(o),o;a=Eh(t),(u=jn.get(u))&&r0(a,u),o=(e.ownerDocument||e).createElement("link"),Ne(o);var l=o;return l._p=new Promise(function(r,i){l.onload=r,l.onerror=i}),Ye(o,"link",a),n.state.loading|=4,tr(o,t.precedence,e),n.instance=o;case"script":return o=Ku(t.src),(u=e.querySelector(il(o)))?(n.instance=u,Ne(u),u):(a=t,(u=jn.get(o))&&(a=fe({},t),i0(a,u)),e=e.ownerDocument||e,u=e.createElement("script"),Ne(u),Ye(u,"link",a),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(S(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(a=n.instance,n.state.loading|=4,tr(a,t.precedence,e));return n.instance}function tr(e,n,t){for(var a=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=a.length?a[a.length-1]:null,o=u,l=0;l<a.length;l++){var r=a[l];if(r.dataset.precedence===n)o=r;else if(o!==u)break}o?o.parentNode.insertBefore(e,o.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function r0(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function i0(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ar=null;function Vp(e,n,t){if(ar===null){var a=new Map,u=ar=new Map;u.set(t,a)}else u=ar,a=u.get(t),a||(a=new Map,u.set(t,a));if(a.has(e))return a;for(a.set(e,null),t=t.getElementsByTagName(e),u=0;u<t.length;u++){var o=t[u];if(!(o[nl]||o[Ge]||e==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!=="http://www.w3.org/2000/svg"){var l=o.getAttribute(n)||"";l=e+l;var r=a.get(l);r?r.push(o):a.set(l,[o])}}return a}function Gp(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function Wv(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Th(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $v(e,n,t,a){if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var u=ju(a.href),o=n.querySelector(rl(u));if(o){n=o._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Rr.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=o,Ne(o);return}o=n.ownerDocument||n,a=Eh(a),(u=jn.get(u))&&r0(a,u),o=o.createElement("link"),Ne(o);var l=o;l._p=new Promise(function(r,i){l.onload=r,l.onerror=i}),Ye(o,"link",a),t.instance=o}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=Rr.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var ws=0;function ex(e,n){return e.stylesheets&&e.count===0&&ur(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var a=setTimeout(function(){if(e.stylesheets&&ur(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},6e4+n);0<e.imgBytes&&ws===0&&(ws=62500*Lv());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ur(e,e.stylesheets),e.unsuspend)){var o=e.unsuspend;e.unsuspend=null,o()}},(e.imgBytes>ws?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(u)}}:null}function Rr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ur(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Nr=null;function ur(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Nr=new Map,n.forEach(nx,e),Nr=null,Rr.call(e))}function nx(e,n){if(!(n.state.loading&4)){var t=Nr.get(e);if(t)var a=t.get(null);else{t=new Map,Nr.set(e,t);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<u.length;o++){var l=u[o];(l.nodeName==="LINK"||l.getAttribute("media")!=="not all")&&(t.set(l.dataset.precedence,l),a=l)}a&&t.set(null,a)}u=n.instance,l=u.getAttribute("data-precedence"),o=t.get(l)||a,o===a&&t.set(null,u),t.set(l,u),this.count++,a=Rr.bind(this),u.addEventListener("load",a),u.addEventListener("error",a),o?o.parentNode.insertBefore(u,o.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Xo={$$typeof:St,Provider:null,Consumer:null,_currentValue:La,_currentValue2:La,_threadCount:0};function tx(e,n,t,a,u,o,l,r,i){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Qi(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qi(0),this.hiddenUpdates=Qi(null),this.identifierPrefix=a,this.onUncaughtError=u,this.onCaughtError=o,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.incompleteTransitions=new Map}function Dh(e,n,t,a,u,o,l,r,i,s,f,m){return e=new tx(e,n,t,l,i,s,f,m,r),n=1,o===!0&&(n|=24),o=vn(3,null,null,n),e.current=o,o.stateNode=e,n=Lc(),n.refCount++,e.pooledCache=n,n.refCount++,o.memoizedState={element:a,isDehydrated:t,cache:n},qc(o),e}function Mh(e){return e?(e=wu,e):wu}function Rh(e,n,t,a,u,o){u=Mh(u),a.context===null?a.context=u:a.pendingContext=u,a=la(n),a.payload={element:t},o=o===void 0?null:o,o!==null&&(a.callback=o),t=ra(e,a,n),t!==null&&(pn(t,e,n),To(t,e,n))}function Ip(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function s0(e,n){Ip(e,n),(e=e.alternate)&&Ip(e,n)}function Nh(e){if(e.tag===13||e.tag===31){var n=Qa(e,67108864);n!==null&&pn(n,e,67108864),s0(e,67108864)}}function Zp(e){if(e.tag===13||e.tag===31){var n=kn();n=yc(n);var t=Qa(e,n);t!==null&&pn(t,e,n),s0(e,n)}}var zr=!0;function ax(e,n,t,a){var u=L.T;L.T=null;var o=P.p;try{P.p=2,c0(e,n,t,a)}finally{P.p=o,L.T=u}}function ux(e,n,t,a){var u=L.T;L.T=null;var o=P.p;try{P.p=8,c0(e,n,t,a)}finally{P.p=o,L.T=u}}function c0(e,n,t,a){if(zr){var u=hc(a);if(u===null)xs(e,n,a,Lr,t),Yp(e,a);else if(lx(u,e,n,t,a))a.stopPropagation();else if(Yp(e,a),n&4&&-1<ox.indexOf(e)){for(;u!==null;){var o=Iu(u);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var l=Ra(o.pendingLanes);if(l!==0){var r=o;for(r.pendingLanes|=2,r.entangledLanes|=2;l;){var i=1<<31-Cn(l);r.entanglements[1]|=i,l&=~i}lt(o),(J&6)===0&&(kr=yn()+500,ll(0,!1))}}break;case 31:case 13:r=Qa(o,2),r!==null&&pn(r,o,2),Qr(),s0(o,2)}if(o=hc(a),o===null&&xs(e,n,a,Lr,t),o===u)break;u=o}u!==null&&a.stopPropagation()}else xs(e,n,a,null,t)}}function hc(e){return e=_c(e),f0(e)}var Lr=null;function f0(e){if(Lr=null,e=hu(e),e!==null){var n=Po(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=Wp(n),e!==null)return e;e=null}else if(t===31){if(e=$p(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Lr=e,null}function zh(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Yb()){case a1:return 2;case u1:return 8;case sr:case Qb:return 32;case o1:return 268435456;default:return 32}default:return 32}}var gc=!1,ca=null,fa=null,da=null,Ko=new Map,Jo=new Map,Wt=[],ox="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Yp(e,n){switch(e){case"focusin":case"focusout":ca=null;break;case"dragenter":case"dragleave":fa=null;break;case"mouseover":case"mouseout":da=null;break;case"pointerover":case"pointerout":Ko.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jo.delete(n.pointerId)}}function bo(e,n,t,a,u,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:a,nativeEvent:o,targetContainers:[u]},n!==null&&(n=Iu(n),n!==null&&Nh(n)),e):(e.eventSystemFlags|=a,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function lx(e,n,t,a,u){switch(n){case"focusin":return ca=bo(ca,e,n,t,a,u),!0;case"dragenter":return fa=bo(fa,e,n,t,a,u),!0;case"mouseover":return da=bo(da,e,n,t,a,u),!0;case"pointerover":var o=u.pointerId;return Ko.set(o,bo(Ko.get(o)||null,e,n,t,a,u)),!0;case"gotpointercapture":return o=u.pointerId,Jo.set(o,bo(Jo.get(o)||null,e,n,t,a,u)),!0}return!1}function Lh(e){var n=hu(e.target);if(n!==null){var t=Po(n);if(t!==null){if(n=t.tag,n===13){if(n=Wp(t),n!==null){e.blockedOn=n,Dd(e.priority,function(){Zp(t)});return}}else if(n===31){if(n=$p(t),n!==null){e.blockedOn=n,Dd(e.priority,function(){Zp(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function or(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=hc(e.nativeEvent);if(t===null){t=e.nativeEvent;var a=new t.constructor(t.type,t);Ls=a,t.target.dispatchEvent(a),Ls=null}else return n=Iu(t),n!==null&&Nh(n),e.blockedOn=t,!1;n.shift()}return!0}function Qp(e,n,t){or(e)&&t.delete(n)}function rx(){gc=!1,ca!==null&&or(ca)&&(ca=null),fa!==null&&or(fa)&&(fa=null),da!==null&&or(da)&&(da=null),Ko.forEach(Qp),Jo.forEach(Qp)}function Gl(e,n){e.blockedOn===n&&(e.blockedOn=null,gc||(gc=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,rx)))}var Il=null;function Xp(e){Il!==e&&(Il=e,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,function(){Il===e&&(Il=null);for(var n=0;n<e.length;n+=3){var t=e[n],a=e[n+1],u=e[n+2];if(typeof a!="function"){if(f0(a||t)===null)continue;break}var o=Iu(t);o!==null&&(e.splice(n,3),n-=3,Js(o,{pending:!0,data:u,method:t.method,action:a},a,u))}}))}function Vu(e){function n(i){return Gl(i,e)}ca!==null&&Gl(ca,e),fa!==null&&Gl(fa,e),da!==null&&Gl(da,e),Ko.forEach(n),Jo.forEach(n);for(var t=0;t<Wt.length;t++){var a=Wt[t];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Wt.length&&(t=Wt[0],t.blockedOn===null);)Lh(t),t.blockedOn===null&&Wt.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(a=0;a<t.length;a+=3){var u=t[a],o=t[a+1],l=u[mn]||null;if(typeof o=="function")l||Xp(t);else if(l){var r=null;if(o&&o.hasAttribute("formAction")){if(u=o,l=o[mn]||null)r=l.formAction;else if(f0(u)!==null)continue}else r=l.action;typeof r=="function"?t[a+1]=r:(t.splice(a,3),a-=3),Xp(t)}}}function Oh(){function e(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(l){return u=l})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),a||setTimeout(t,20)}function t(){if(!a&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function d0(e){this._internalRoot=e}Jr.prototype.render=d0.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(S(409));var t=n.current,a=kn();Rh(t,a,e,n,null,null)};Jr.prototype.unmount=d0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Rh(e.current,2,null,e,null,null),Qr(),n[Gu]=null}};function Jr(e){this._internalRoot=e}Jr.prototype.unstable_scheduleHydration=function(e){if(e){var n=c1();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Wt.length&&n!==0&&n<Wt[t].priority;t++);Wt.splice(t,0,e),t===0&&Lh(e)}};var Kp=Jp.version;if(Kp!=="19.2.3")throw Error(S(527,Kp,"19.2.3"));P.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=Bb(n),e=e!==null?e1(e):null,e=e===null?null:e.stateNode,e};var ix={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(vo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!vo.isDisabled&&vo.supportsFiber))try{Wo=vo.inject(ix),wn=vo}catch{}var vo;Pr.createRoot=function(e,n){if(!Pp(e))throw Error(S(299));var t=!1,a="",u=Am,o=Em,l=Tm;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=Dh(e,1,!1,null,null,t,a,null,u,o,l,Oh),e[Gu]=n.current,l0(e),new d0(n)};Pr.hydrateRoot=function(e,n,t){if(!Pp(e))throw Error(S(299));var a=!1,u="",o=Am,l=Em,r=Tm,i=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(u=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(l=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError),t.formState!==void 0&&(i=t.formState)),n=Dh(e,1,!0,n,t??null,a,u,i,o,l,r,Oh),n.context=Mh(null),t=n.current,a=kn(),a=yc(a),u=la(a),u.callback=null,ra(t,u,a),t=a,n.current.lanes=t,el(n,t),lt(n),e[Gu]=n.current,l0(e),new Jr(n)};Pr.version="19.2.3"});var Bh=$n((E6,Uh)=>{"use strict";function qh(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qh)}catch(e){console.error(e)}}qh(),Uh.exports=Fh()});var Kh=$n($r=>{"use strict";var fx=Symbol.for("react.transitional.element"),dx=Symbol.for("react.fragment");function Xh(e,n,t){var a=null;if(t!==void 0&&(a=""+t),n.key!==void 0&&(a=""+n.key),"key"in n){t={};for(var u in n)u!=="key"&&(t[u]=n[u])}else t=n;return n=t.ref,{$$typeof:fx,type:e,key:a,ref:n!==void 0?n:null,props:t}}$r.Fragment=dx;$r.jsx=Xh;$r.jsxs=Xh});var R=$n((B6,Jh)=>{"use strict";Jh.exports=Kh()});var J2=T(Bh(),1);var U=T(je(),1);var Ju=null;function sx(){return Ju||(typeof acquireVsCodeApi<"u"?(Ju=acquireVsCodeApi(),Ju):(Ju={postMessage:e=>{console.log("Mock postMessage:",e)},getState:()=>({}),setState:e=>{console.log("Mock setState:",e)}},Ju))}function rt(){return sx()}var Ae=T(je(),1);var Hh=e=>{let[n,t]=(0,Ae.useState)([]),[a,u]=(0,Ae.useState)(null),[o,l]=(0,Ae.useState)("Past Conversations"),[r,i]=(0,Ae.useState)(!1),[s,f]=(0,Ae.useState)(""),[m,d]=(0,Ae.useState)([]),[p,b]=(0,Ae.useState)(void 0),[C,_]=(0,Ae.useState)(!0),[g,c]=(0,Ae.useState)(!1),h=20,v=(0,Ae.useMemo)(()=>{if(!s.trim())return n;let D=s.toLowerCase();return n.filter(M=>(M.title||M.name||"").toLowerCase().includes(D))},[n,s]),x=(0,Ae.useCallback)(()=>{t([]),b(void 0),_(!0),c(!0),e.postMessage({type:"getQwenSessions",data:{size:h}}),i(!0)},[e]),w=(0,Ae.useCallback)(()=>{!C||g||p===void 0||(c(!0),e.postMessage({type:"getQwenSessions",data:{cursor:p,size:h}}))},[C,g,p,e]),y=(0,Ae.useCallback)(()=>{e.postMessage({type:"openNewChatTab",data:{}}),i(!1)},[e]),k=(0,Ae.useCallback)(D=>{if(D===a){console.log("[useSessionManagement] Already on this session, ignoring"),i(!1);return}console.log("[useSessionManagement] Switching to session:",D),e.postMessage({type:"switchQwenSession",data:{sessionId:D}})},[a,e]),A=(0,Ae.useCallback)(D=>{e.postMessage({type:"saveSession",data:{tag:D}})},[e]),E=(0,Ae.useCallback)(D=>{if(D.success){if(D.message){let M=D.message.match(/tag: (.+)$/);M&&d(re=>[...re,M[1]])}}else console.error("Failed to save session:",D.message)},[]);return{qwenSessions:n,currentSessionId:a,currentSessionTitle:o,showSessionSelector:r,sessionSearchQuery:s,filteredSessions:v,savedSessionTags:m,nextCursor:p,hasMore:C,isLoading:g,setQwenSessions:t,setCurrentSessionId:u,setCurrentSessionTitle:l,setShowSessionSelector:i,setSessionSearchQuery:f,setSavedSessionTags:d,setNextCursor:b,setHasMore:_,setIsLoading:c,handleLoadQwenSessions:x,handleNewQwenSession:y,handleSwitchSession:k,handleSaveSession:A,handleSaveSessionResponse:E,handleLoadMoreSessions:w}};var Qe=T(je(),1);var jh=e=>{let[n,t]=(0,Qe.useState)(null),[a,u]=(0,Qe.useState)(null),[o,l]=(0,Qe.useState)(null),[r,i]=(0,Qe.useState)([]),s=(0,Qe.useRef)(new Map),f=(0,Qe.useRef)(!1),m=(0,Qe.useRef)(void 0),d=(0,Qe.useRef)(null),p=(0,Qe.useCallback)(h=>{let v=h?.trim().replace(/^@/,"").replace(/\\/g,"/");v&&v.length>=1?(d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{e.postMessage({type:"getWorkspaceFiles",data:{query:v}})},300),m.current=v):(!f.current||m.current!==void 0)&&(m.current=void 0,f.current=!0,e.postMessage({type:"getWorkspaceFiles",data:{}}))},[e]),b=(0,Qe.useCallback)((h,v)=>{s.current.set(h,v)},[]),C=(0,Qe.useCallback)(h=>s.current.get(h),[]),_=(0,Qe.useCallback)(()=>{s.current.clear()},[]),g=(0,Qe.useCallback)(()=>{e.postMessage({type:"getActiveEditor",data:{}})},[e]),c=(0,Qe.useCallback)(()=>{e.postMessage({type:"focusActiveEditor",data:{}})},[e]);return{activeFileName:n,activeFilePath:a,activeSelection:o,workspaceFiles:r,hasRequestedFiles:f.current,setActiveFileName:t,setActiveFilePath:u,setActiveSelection:l,setWorkspaceFiles:i,addFileReference:b,getFileReference:C,clearFileReferences:_,requestWorkspaceFiles:p,requestActiveEditor:g,focusActiveEditor:c}};var Xe=T(je(),1);var Vh=()=>{let[e,n]=(0,Xe.useState)([]),[t,a]=(0,Xe.useState)(!1),[u,o]=(0,Xe.useState)(!1),[l,r]=(0,Xe.useState)(""),i=(0,Xe.useRef)(null),s=(0,Xe.useRef)(null),f=(0,Xe.useCallback)(c=>{n(h=>[...h,c])},[]),m=(0,Xe.useCallback)(()=>{n([])},[]),d=(0,Xe.useCallback)(c=>{n(h=>(i.current=h.length,[...h,{role:"assistant",content:"",timestamp:typeof c=="number"?c:Date.now()}])),a(!0)},[]),p=(0,Xe.useCallback)(c=>{t&&n(h=>{let v=i.current,x=h.slice();if(v===null&&(v=x.length,i.current=v,x.push({role:"assistant",content:"",timestamp:Date.now()})),v<0||v>=x.length)return h;let w=x[v];return x[v]={...w,content:(w.content||"")+c},x})},[t]),b=(0,Xe.useCallback)(()=>{i.current=null},[]),C=(0,Xe.useCallback)(()=>{a(!1),i.current=null,n(c=>{let h=s.current;if(s.current=null,h===null||h<0||h>=c.length)return c;let v=c.slice();return v.splice(h,1),v})},[]),_=(0,Xe.useCallback)(c=>{o(!0),r(c)},[]),g=(0,Xe.useCallback)(()=>{o(!1),r("")},[]);return{messages:e,isStreaming:t,isWaitingForResponse:u,loadingMessage:l,addMessage:f,clearMessages:m,startStreaming:d,appendStreamChunk:p,endStreaming:C,appendThinkingChunk:c=>{t&&n(h=>{let v=s.current,x=h.slice();if(v===null&&(v=x.length,s.current=v,x.push({role:"thinking",content:"",timestamp:Date.now()})),v>=0&&v<x.length){let w=x[v];x[v]={...w,content:(w.content||"")+c}}return x})},clearThinking:()=>{n(c=>{let h=s.current;if(s.current=null,h===null||h<0||h>=c.length)return c;let v=c.slice();return v.splice(h,1),v})},breakAssistantSegment:b,setWaitingForResponse:_,clearWaitingForResponse:g,setMessages:n}};var sl=T(je(),1);var Gh=()=>{let[e,n]=(0,sl.useState)(new Map),t=(0,sl.useCallback)(l=>{n(r=>{let i=new Map(r),s=i.get(l.toolCallId),f=g=>(g||"").toLowerCase()==="todo_write"||(g||"").toLowerCase()==="todowrite"||(g||"").toLowerCase()==="update_todos",m=g=>typeof g=="string"?g.trim().toLowerCase():"",d=g=>{let c=m(g);return c==="updated plan"||c==="update todos"},p=g=>{if(!g||g.length===0)return"";let c=[];for(let h of g)h.type==="content"&&h.content?.text&&c.push(String(h.content.text));return c.join(`
`)},b=g=>g?g.split(/\r?\n/).map(h=>h.trim()).filter(Boolean).map(h=>{let v=h.indexOf("] ");return v>=0?h.slice(v+2).trim():h}):[],C=(g,c)=>{let h=b(g),v=b(c);if(h.length===v.length&&h.every((k,A)=>k===v[A]))return{same:!0,supplement:!1};let x=new Set(v);return{same:!1,supplement:h.every(y=>x.has(y))}},_=g=>typeof g=="string"?g:g&&typeof g=="object"?JSON.stringify(g):"Tool Call";if(l.type==="tool_call"){let g=l.content?.map(c=>({type:c.type,content:c.content,path:c.path,oldText:c.oldText,newText:c.newText}));if(f(l.kind)&&d(l.title)){let c=p(g),h=null,v="",x=0;for(let w of i.values())f(w.kind)&&d(w.title)&&typeof w.timestamp=="number"&&w.timestamp>=x&&(h=w.toolCallId,v=p(w.content),x=w.timestamp||0);if(h){let w=C(v,c);if(w.same)return i;if(w.supplement){let y=i.get(h);if(y)return i.set(h,{...y,content:g,status:l.status||y.status,timestamp:l.timestamp||Date.now()}),i}}}i.set(l.toolCallId,{toolCallId:l.toolCallId,kind:l.kind||"other",title:_(l.title),status:l.status||"pending",rawInput:l.rawInput,content:g,locations:l.locations,timestamp:l.timestamp||Date.now()})}else if(l.type==="tool_call_update"){let g=l.content?l.content.map(c=>({type:c.type,content:c.content,path:c.path,oldText:c.oldText,newText:c.newText})):void 0;if(s){let c=s.content;g&&(f(l.kind||s.kind)&&(d(l.title)||d(s.title))?c=g:c=[...s.content||[],...g]);let v=l.status==="completed"||l.status==="failed"?Date.now():l.timestamp||s.timestamp||Date.now();i.set(l.toolCallId,{...s,...l.kind&&{kind:l.kind},...l.title&&{title:_(l.title)},...l.status&&{status:l.status},content:c,...l.locations&&{locations:l.locations},timestamp:v})}else i.set(l.toolCallId,{toolCallId:l.toolCallId,kind:l.kind||"other",title:l.title?_(l.title):"",status:l.status||"pending",rawInput:l.rawInput,content:g,locations:l.locations,timestamp:l.timestamp||Date.now()})}return i})},[]),a=(0,sl.useCallback)(()=>{n(new Map)},[]),u=Array.from(e.values()).filter(l=>l.status==="pending"||l.status==="in_progress"),o=Array.from(e.values()).filter(l=>l.status==="completed"||l.status==="failed");return{toolCalls:e,inProgressToolCalls:u,completedToolCalls:o,handleToolCallUpdate:t,clearToolCalls:a}};var qt=T(je(),1);var cx=new Set(["user_cancelled","cancelled","timeout","error","session_expired"]),Ih=e=>{let{sessionManagement:n,fileContext:t,messageHandling:a,handleToolCallUpdate:u,clearToolCalls:o,setPlanEntries:l,handlePermissionRequest:r,handleConfirmActionRequest:i,inputFieldRef:s,setInputText:f,setEditMode:m,setIsAuthenticated:d}=e,p=rt(),b=(0,qt.useRef)(new Set),C=(0,qt.useRef)({sessionManagement:n,fileContext:t,messageHandling:a,handleToolCallUpdate:u,clearToolCalls:o,setPlanEntries:l,handlePermissionRequest:r,handleConfirmActionRequest:i,setIsAuthenticated:d,setAvailableCommands:e.setAvailableCommands}),_=(0,qt.useRef)(null),g=v=>v.map(x=>`- [${x.status==="completed"?"x":x.status==="in_progress"?"-":" "}] ${x.content}`.trim()),c=(v,x)=>{let w=k=>{let A=k.indexOf("] ");return A>=0?k.slice(A+2).trim():k.trim()},y=new Set(x.map(w));for(let k of v)if(!y.has(w(k)))return!1;return!0};(0,qt.useEffect)(()=>{C.current={sessionManagement:n,fileContext:t,messageHandling:a,handleToolCallUpdate:u,clearToolCalls:o,setPlanEntries:l,handlePermissionRequest:r,handleConfirmActionRequest:i,setIsAuthenticated:d,setAvailableCommands:e.setAvailableCommands}});let h=(0,qt.useCallback)(v=>{let x=v.data,w=C.current;switch(x.type){case"modeInfo":{try{let y=x.data?.currentModeId||"default";m?.(y)}catch{}break}case"modeChanged":{try{let y=x.data?.modeId||"default";m?.(y)}catch{}break}case"loginSuccess":{w.messageHandling.clearWaitingForResponse(),w.messageHandling.addMessage({role:"assistant",content:"Successfully logged in. You can continue chatting.",timestamp:Date.now()}),w.setIsAuthenticated?.(!0);break}case"agentConnected":{w.messageHandling.clearWaitingForResponse(),w.setIsAuthenticated?.(!0);break}case"confirm_action":{w.messageHandling.clearWaitingForResponse();let y=x?.data?.prompt||"This action requires confirmation. Proceed?",k=x?.data?.originalInvocation?.raw||"";w.handleConfirmActionRequest?w.handleConfirmActionRequest({prompt:y,raw:k}):w.messageHandling.addMessage({role:"assistant",content:y,timestamp:Date.now()});break}case"agentConnectionError":{w.messageHandling.clearWaitingForResponse();let y=x?.data?.message||"Failed to connect to Qwen agent.";w.messageHandling.addMessage({role:"assistant",content:`Failed to connect to Qwen agent: ${y}
You can still use the chat UI, but messages won't be sent to AI.`,timestamp:Date.now()}),w.setIsAuthenticated?.(!1);break}case"loginError":{w.messageHandling.clearWaitingForResponse();let y=x?.data?.message||"Login failed. Please try again.";w.messageHandling.addMessage({role:"assistant",content:y,timestamp:Date.now()}),w.setIsAuthenticated?.(!1);break}case"authState":{let y=x?.data?.authenticated;typeof y=="boolean"?w.setIsAuthenticated?.(y):w.setIsAuthenticated?.(null);break}case"conversationLoaded":{let y=x.data;w.messageHandling.setMessages(y.messages);break}case"message":{let y=x.data;if(w.messageHandling.addMessage(y),y.role==="assistant"){try{w.messageHandling.endStreaming()}catch(k){console.warn("[PanelManager] Failed to end streaming:",k)}if(b.current.size===0)try{w.messageHandling.clearWaitingForResponse()}catch(k){console.warn("[PanelManager] Failed to clear waiting for response:",k)}}break}case"streamStart":w.messageHandling.startStreaming(x.data?.timestamp);break;case"streamChunk":{w.messageHandling.appendStreamChunk(x.data.chunk);break}case"thoughtChunk":{let y=x.data.content||x.data.chunk||"";w.messageHandling.appendThinkingChunk(y);break}case"streamEnd":{w.messageHandling.endStreaming(),w.messageHandling.clearThinking();try{let y=(x.data?.reason||"").toLowerCase();if(cx.has(y)){b.current.clear(),w.messageHandling.clearWaitingForResponse();break}}catch{}b.current.size===0&&w.messageHandling.clearWaitingForResponse();break}case"error":w.messageHandling.endStreaming(),w.messageHandling.clearThinking(),b.current.clear(),w.messageHandling.clearWaitingForResponse();{let y=x.data,k=y?.message??(typeof y?.error=="string"?y.error:y?.error instanceof Error?y.error.message:""),A=k&&k.trim()?k:"Request failed. Please check CLI logs for details.";w.messageHandling.addMessage({role:"assistant",content:`Error: ${A}`,timestamp:Date.now()})}break;case"permissionRequest":{w.handlePermissionRequest(x.data);let y=x.data?.toolCall;if(y?.toolCallId){let k=y.kind||"execute",A=y.content||[];if(Array.isArray(A)?A.some(M=>!!M&&typeof M=="object"&&M.type==="diff"):!1){k="edit";let M=A.find($e=>!!$e&&typeof $e=="object"&&$e.type==="diff"),re=M?.oldText===void 0||M?.oldText===null?"":M.oldText,We=M?.newText;M?.path&&We!==void 0&&We!==null&&p.postMessage({type:"openDiff",data:{path:M.path,oldText:re,newText:We}})}else if(y.title){let M=y.title.toLowerCase();M.includes("touch")||M.includes("echo")?k="execute":M.includes("read")||M.includes("cat")?k="read":(M.includes("write")||M.includes("edit"))&&(k="edit")}let D=y.status==="pending"||y.status==="in_progress"||y.status==="completed"||y.status==="failed"?y.status:"pending";w.handleToolCallUpdate({type:"tool_call",toolCallId:y.toolCallId,kind:k,title:y.title,status:D,content:y.content,locations:y.locations}),w.messageHandling.breakAssistantSegment()}break}case"permissionResolved":{try{w.handlePermissionRequest(null)}catch(y){console.warn("[useWebViewMessages] failed to close permission UI:",y)}break}case"plan":if(x.data.entries&&Array.isArray(x.data.entries)){let y=x.data.entries;w.setPlanEntries(y);let k=g(y),A=k.join(`
`),E=_.current;if(E&&E.text===A)break;try{let D=Date.now();if(E&&c(E.lines,k))w.handleToolCallUpdate({type:"tool_call_update",toolCallId:E.id,kind:"todo_write",title:"Updated Plan",status:"completed",content:[{type:"content",content:{type:"text",text:A}}],timestamp:D}),_.current={id:E.id,text:A,lines:k};else{let M=`plan-snapshot-${D}`;w.handleToolCallUpdate({type:"tool_call",toolCallId:M,kind:"todo_write",title:"Updated Plan",status:"completed",content:[{type:"content",content:{type:"text",text:A}}],timestamp:D}),_.current={id:M,text:A,lines:k}}w.messageHandling.breakAssistantSegment?.()}catch(D){console.warn("[useWebViewMessages] failed to push/merge plan snapshot toolcall:",D)}}break;case"compression":{let y=x.data;w.messageHandling.addMessage({role:"assistant",content:`IMPORTANT: This conversation approached the input token limit. A compressed context will be sent for future messages (compressed from: ${y.originalTokenCount??"unknown"} to ${y.newTokenCount??"unknown"} tokens).`,timestamp:Date.now()});break}case"toolCall":case"toolCallUpdate":{let y=x.data;y.sessionUpdate&&!y.type&&(y.type=y.sessionUpdate),w.handleToolCallUpdate(y);let k=(y.status||"").toString(),A=y.type==="tool_call",E=y.type==="tool_call_update"&&(k==="completed"||k==="failed");(A||E)&&w.messageHandling.breakAssistantSegment();try{let D=(y.toolCallId||"").toString(),M=(y.kind||"").toString().toLowerCase(),re=M==="execute"||M==="bash"||M==="command",We=b.current.has(D);if(!(re||We)||!D)break;if(k==="pending"||k==="in_progress"){if(re){b.current.add(D);let Dn=y.rawInput,_a="";typeof Dn=="string"?_a=Dn:Dn&&typeof Dn=="object"&&(_a=Dn.command||"");let vl=_a?`Running: ${_a}`:"Running command...";w.messageHandling.setWaitingForResponse(vl)}}else(k==="completed"||k==="failed")&&b.current.delete(D);b.current.size===0&&w.messageHandling.clearWaitingForResponse()}catch{}break}case"qwenSessionList":{let y=x.data.sessions||[],k=!!x.data.append,A=x.data.nextCursor,E=!!x.data.hasMore;if(w.sessionManagement.setQwenSessions(D=>k?[...D,...y]:y),w.sessionManagement.setNextCursor(A),w.sessionManagement.setHasMore(E),w.sessionManagement.setIsLoading(!1),w.sessionManagement.currentSessionId&&y.length>0){let D=y.find(M=>M.id===w.sessionManagement.currentSessionId||M.sessionId===w.sessionManagement.currentSessionId);if(D){let M=D.title||D.name||"Past Conversations";w.sessionManagement.setCurrentSessionTitle(M)}}break}case"qwenSessionSwitched":if(w.sessionManagement.setShowSessionSelector(!1),x.data.sessionId&&w.sessionManagement.setCurrentSessionId(x.data.sessionId),x.data.session){let y=x.data.session,k=y.title||y.name||"Past Conversations";w.sessionManagement.setCurrentSessionTitle(k),p.postMessage({type:"updatePanelTitle",data:{title:k}})}x.data.messages?w.messageHandling.setMessages(x.data.messages):w.messageHandling.clearMessages(),w.messageHandling.clearWaitingForResponse(),b.current.clear(),w.clearToolCalls(),x.data.toolCalls&&Array.isArray(x.data.toolCalls)&&x.data.toolCalls.forEach(y=>{y&&typeof y=="object"&&w.handleToolCallUpdate(y)}),x.data.planEntries&&Array.isArray(x.data.planEntries)?w.setPlanEntries(x.data.planEntries):w.setPlanEntries([]),_.current=null;break;case"conversationCleared":w.messageHandling.clearMessages(),w.clearToolCalls(),w.sessionManagement.setCurrentSessionId(null),w.sessionManagement.setCurrentSessionTitle("Past Conversations"),p.postMessage({type:"updatePanelTitle",data:{title:"Gus Qwen"}}),_.current=null;break;case"sessionTitleUpdated":{let y=x.data?.sessionId,k=x.data?.title;y&&k&&(w.sessionManagement.setCurrentSessionId(y),w.sessionManagement.setCurrentSessionTitle(k),p.postMessage({type:"updatePanelTitle",data:{title:k}}));break}case"activeEditorChanged":{let y=x.data?.fileName,k=x.data?.filePath,A=x.data?.selection;w.fileContext.setActiveFileName(y),w.fileContext.setActiveFilePath(k),w.fileContext.setActiveSelection(A);break}case"fileAttached":{let y=x.data;if(w.fileContext.addFileReference(y.name,y.value),s.current){let k=s.current.textContent||"",A=k?`${k} @${y.name} `:`@${y.name} `;s.current.textContent=A,f(A);let E=document.createRange(),D=window.getSelection();E.selectNodeContents(s.current),E.collapse(!1),D?.removeAllRanges(),D?.addRange(E)}break}case"workspaceFiles":{let y=x.data?.files;y&&(console.log("[WebView] Received workspaceFiles:",y.length),w.fileContext.setWorkspaceFiles(y));break}case"saveSessionResponse":{w.sessionManagement.handleSaveSessionResponse(x.data);break}case"cancelStreaming":w.messageHandling.endStreaming(),w.messageHandling.clearWaitingForResponse(),w.messageHandling.addMessage({role:"assistant",content:"Interrupted",timestamp:Date.now()});break;case"available_commands_update":console.log("[useWebViewMessages] Received available_commands_update message:",x),e.setAvailableCommands&&Array.isArray(x.data.commands)?e.setAvailableCommands(x.data.commands):console.log("[useWebViewMessages] setAvailableCommands is not a function or commands is not an array",{setAvailableCommands:typeof e.setAvailableCommands,commands:x.data.commands});break;default:break}},[s,f,p,m,e]);(0,qt.useEffect)(()=>(window.addEventListener("message",h),()=>window.removeEventListener("message",h)),[h])};var Yh=T(je(),1);var Wr=["I'm Feeling Lucky","Shipping awesomeness... ","Painting the serifs back on...","Navigating the slime mold...","Consulting the digital spirits...","Reticulating splines...","Warming up the AI hamsters...","Asking the magic conch shell...","Generating witty retort...","Polishing the algorithms...","Don't rush perfection (or my code)...","Brewing fresh bytes...","Counting electrons...","Engaging cognitive processors...","Checking for syntax errors in the universe...","One moment, optimizing humor...","Shuffling punchlines...","Untangling neural nets...","Compiling brilliance...","Loading wit.exe...","Summoning the cloud of wisdom...","Preparing a witty response...","Just a sec, I'm debugging reality...","Confuzzling the options...","Tuning the cosmic frequencies...","Crafting a response worthy of your patience...","Compiling the 1s and 0s...","Resolving dependencies... and existential crises...","Defragmenting memories... both RAM and personal...","Rebooting the humor module...","Caching the essentials (mostly cat memes)...","Optimizing for ludicrous speed","Swapping bits... don't tell the bytes...","Garbage collecting... be right back...","Assembling the interwebs...","Converting coffee into code...","Updating the syntax for reality...","Rewiring the synapses...","Looking for a misplaced semicolon...","Greasin' the cogs of the machine...","Pre-heating the servers...","Calibrating the flux capacitor...","Engaging the improbability drive...","Channeling the Force...","Aligning the stars for optimal response...","So say we all...","Loading the next great idea...","Just a moment, I'm in the zone...","Preparing to dazzle you with brilliance...","Just a tick, I'm polishing my wit...","Hold tight, I'm crafting a masterpiece...","Just a jiffy, I'm debugging the universe...","Just a moment, I'm aligning the pixels...","Just a sec, I'm optimizing the humor...","Just a moment, I'm tuning the algorithms...","Warp speed engaged...","Mining for more Dilithium crystals...","Don't panic...","Following the white rabbit...","The truth is in here... somewhere...","Blowing on the cartridge...","Loading... Do a barrel roll!","Waiting for the respawn...","Finishing the Kessel Run in less than 12 parsecs...","The cake is not a lie, it's just still loading...","Fiddling with the character creation screen...","Just a moment, I'm finding the right meme...","Pressing 'A' to continue...","Herding digital cats...","Polishing the pixels...","Finding a suitable loading screen pun...","Distracting you with this witty phrase...","Almost there... probably...","Our hamsters are working as fast as they can...","Giving Cloudy a pat on the head...","Petting the cat...","Rickrolling my boss...","Never gonna give you up, never gonna let you down...","Slapping the bass...","Tasting the snozberries...","I'm going the distance, I'm going for speed...","Is this the real life? Is this just fantasy?...","I've got a good feeling about this...","Poking the bear...","Doing research on the latest memes...","Figuring out how to make this more witty...","Hmmm... let me think...","What do you call a fish with no eyes? A fsh...","Why did the computer go to therapy? It had too many bytes...","Why don't programmers like nature? It has too many bugs...","Why do programmers prefer dark mode? Because light attracts bugs...","Why did the developer go broke? Because they used up all their cache...","What can you do with a broken pencil? Nothing, it's pointless...","Applying percussive maintenance...","Searching for the correct USB orientation...","Ensuring the magic smoke stays inside the wires...","Rewriting in Rust for no particular reason...","Trying to exit Vim...","Spinning up the hamster wheel...","That's not a bug, it's an undocumented feature...","Engage.","I'll be back... with an answer.","My other process is a TARDIS...","Communing with the machine spirit...","Letting the thoughts marinate...","Just remembered where I put my keys...","Pondering the orb...","I've seen things you people wouldn't believe... like a user who reads loading messages.","Initiating thoughtful gaze...","What's a computer's favorite snack? Microchips.","Why do Java developers wear glasses? Because they don't C#.","Charging the laser... pew pew!","Dividing by zero... just kidding!","Looking for an adult superviso... I mean, processing.","Making it go beep boop.","Buffering... because even AIs need a moment.","Entangling quantum particles for a faster response...","Polishing the chrome... on the algorithms.","Are you not entertained? (Working on it!)","Summoning the code gremlins... to help, of course.","Just waiting for the dial-up tone to finish...","Recalibrating the humor-o-meter.","My other loading screen is even funnier.","Pretty sure there's a cat walking on the keyboard somewhere...","Enhancing... Enhancing... Still loading.","It's not a bug, it's a feature... of this loading screen.","Have you tried turning it off and on again? (The loading screen, not me.)","Constructing additional pylons...","New line? That's Ctrl+J."],Zh=()=>Wr[Math.floor(Math.random()*Wr.length)];var Qh=({vscode:e,inputText:n,setInputText:t,inputFieldRef:a,isStreaming:u,isWaitingForResponse:o,skipAutoActiveContext:l=!1,fileContext:r,messageHandling:i})=>({handleSubmit:(0,Yh.useCallback)(f=>{if(f.preventDefault(),!n.trim()||u||o)return;if(n.trim()==="/login"){t(""),a.current&&(a.current.textContent="\u200B",a.current.setAttribute("data-empty","true")),e.postMessage({type:"login",data:{}});try{i.setWaitingForResponse("Logging in to Gus Qwen...")}catch{}return}i.setWaitingForResponse(Zh());let m=[],d=/@([^\s]+)/g,p;for(;(p=d.exec(n))!==null;){let C=p[1],_=r.getFileReference(C);_&&m.push({type:"file",name:C,value:_})}if(r.activeFilePath&&!l){let C=r.activeFileName||"current file";m.push({type:"file",name:C,value:r.activeFilePath,startLine:r.activeSelection?.startLine,endLine:r.activeSelection?.endLine})}let b;r.activeFilePath&&r.activeFileName&&!l&&(b={fileName:r.activeFileName,filePath:r.activeFilePath,startLine:r.activeSelection?.startLine,endLine:r.activeSelection?.endLine}),e.postMessage({type:"sendMessage",data:{text:n,context:m.length>0?m:void 0,fileContext:b}}),t(""),a.current&&(a.current.textContent="\u200B",a.current.setAttribute("data-empty","true")),r.clearFileReferences()},[n,u,t,a,e,r,l,o,i])});var it=T(je(),1),ge=T(R(),1);var p0=({isOpen:e,options:n,toolCall:t,onResponse:a,onClose:u})=>{let[o,l]=(0,it.useState)(0),[r,i]=(0,it.useState)(""),s=(0,it.useRef)(null),f=(0,it.useRef)(null);console.log("PermissionDrawer rendered with isOpen:",e,t);let m=()=>{let p=t.locations?.[0]?.path;if(p)return p.split("/").pop()||p;let b=Array.isArray(t.content)?t.content.find(C=>typeof C=="object"&&C!==null&&"path"in C)?.path:void 0;return typeof b=="string"&&b.length>0?b.split("/").pop()||b:"file"},d=()=>{if(t.kind==="edit"||t.kind==="write"){let p=m();return(0,ge.jsxs)(ge.Fragment,{children:["Make this edit to"," ",(0,ge.jsx)("span",{className:"font-mono text-[var(--app-primary-foreground)]",children:p}),"?"]})}if(t.kind==="execute"||t.kind==="bash")return"Allow this bash command?";if(t.kind==="read"){let p=m();return(0,ge.jsxs)(ge.Fragment,{children:["Allow read from"," ",(0,ge.jsx)("span",{className:"font-mono text-[var(--app-primary-foreground)]",children:p}),"?"]})}return t.title||"Permission Required"};return(0,it.useEffect)(()=>{let p=b=>{if(!e)return;if(b.key.match(/^[1-9]$/)&&!f.current?.contains(document.activeElement)){let _=parseInt(b.key,10)-1;_<n.length&&(b.preventDefault(),a(n[_].optionId));return}if(b.key==="ArrowDown"||b.key==="ArrowUp"){b.preventDefault();let _=n.length+1;b.key==="ArrowDown"?l(g=>(g+1)%_):l(g=>(g-1+_)%_)}if(b.key==="Enter"&&!f.current?.contains(document.activeElement)&&(b.preventDefault(),o<n.length&&a(n[o].optionId)),b.key==="Escape"){b.preventDefault();let _=n.find(g=>g.kind.includes("reject"))?.optionId||n.find(g=>g.optionId==="cancel")?.optionId||"cancel";a(_),u&&u()}};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[e,n,a,u,o]),(0,it.useEffect)(()=>{e&&s.current&&s.current.focus()},[e]),(0,it.useEffect)(()=>{e&&l(0)},[e,n.length]),e?(0,ge.jsx)("div",{className:"fixed inset-x-0 bottom-0 z-[1000] p-2",children:(0,ge.jsxs)("div",{ref:s,className:"relative flex flex-col rounded-large border p-2 outline-none animate-slide-up",style:{backgroundColor:"var(--app-input-secondary-background)",borderColor:"var(--app-input-border)"},tabIndex:0,"data-focused-index":o,children:[(0,ge.jsx)("div",{className:"p-2 absolute inset-0 rounded-large",style:{backgroundColor:"var(--app-input-background)"}}),(0,ge.jsxs)("div",{className:"relative z-[1] text-[1.1em] text-[var(--app-primary-foreground)] flex flex-col min-h-0",children:[(0,ge.jsx)("div",{className:"font-bold text-[var(--app-primary-foreground)] mb-0.5",children:d()}),(t.kind==="edit"||t.kind==="write"||t.kind==="read"||t.kind==="execute"||t.kind==="bash")&&t.title&&(0,ge.jsx)("div",{className:"text-[13px] font-normal text-[var(--app-secondary-foreground)] opacity-90 font-mono whitespace-normal break-words q-line-clamp-3 mb-2",style:{fontSize:".9em",color:"var(--app-secondary-foreground)",marginBottom:"6px"},title:t.title,children:t.title})]}),(0,ge.jsxs)("div",{className:"relative z-[1] flex flex-col gap-1 pb-1",children:[n.map((p,b)=>(0,ge.jsxs)("button",{className:`flex items-center gap-2 px-2 py-1.5 text-left w-full box-border rounded-[4px] border-0 shadow-[inset_0_0_0_1px_var(--app-transparent-inner-border)] transition-colors duration-150 text-[var(--app-primary-foreground)] hover:bg-[var(--app-button-background)] ${o===b?"text-[var(--app-list-active-foreground)] bg-[var(--app-list-active-background)] hover:text-[var(--app-button-foreground)] hover:font-bold hover:relative hover:border-0":"hover:bg-[var(--app-button-background)] hover:text-[var(--app-button-foreground)] hover:font-bold hover:relative hover:border-0"}`,onClick:()=>a(p.optionId),onMouseEnter:()=>l(b),children:[(0,ge.jsx)("span",{className:"inline-flex items-center justify-center min-w-[10px] h-5 font-semibold opacity-60",children:b+1}),(0,ge.jsx)("span",{className:"font-semibold",children:p.name})]},p.optionId)),(()=>{let p=o===n.length,b=n.find(C=>C.kind.includes("reject"))?.optionId;return(0,ge.jsx)(px,{isFocused:p,customMessage:r,setCustomMessage:i,onFocusRow:()=>l(n.length),onSubmitReject:()=>{b&&a(b)},inputRef:f})})()]})]})}):null},px=({isFocused:e,customMessage:n,setCustomMessage:t,onFocusRow:a,onSubmitReject:u,inputRef:o})=>(0,ge.jsx)("div",{className:`flex items-center gap-2 px-2 py-1.5 text-left w-full box-border rounded-[4px] border-0 shadow-[inset_0_0_0_1px_var(--app-transparent-inner-border)] cursor-text text-[var(--app-primary-foreground)] ${e?"text-[var(--app-list-active-foreground)]":""}`,onMouseEnter:a,onClick:()=>o.current?.focus(),children:(0,ge.jsx)("input",{ref:o,type:"text",placeholder:"Tell Qwen what to do instead",spellCheck:!1,className:"flex-1 bg-transparent border-0 outline-none text-sm placeholder:opacity-70",style:{color:"var(--app-input-foreground)"},value:n,onChange:l=>t(l.target.value),onFocus:a,onKeyDown:l=>{l.key==="Enter"&&!l.shiftKey&&n.trim()&&(l.preventDefault(),u())}})});var m0=e=>{if(e==null)return"";if(typeof e=="string"){try{e=JSON.parse(e).output??e}catch{}return e}if(e instanceof Error)return e.message||e.toString();if(typeof e=="object"&&e!==null&&"message"in e)return e.message||String(e);if(typeof e=="object")try{return JSON.stringify(e,null,2)}catch{return String(e)}return String(e)},st=e=>typeof e=="string"&&e.trim()?e:e&&typeof e=="object"?JSON.stringify(e):"",Ph=e=>!e.includes("internal"),Wh=e=>{if(e.status==="failed")return!0;let n=e.kind.toLowerCase();if((n==="execute"||n==="bash"||n==="command")&&e.title&&typeof e.title=="string"&&e.title.trim()||e.locations&&e.locations.length>0)return!0;if(e.content&&e.content.length>0){let t=Ee(e.content);if(t.textOutputs.length>0||t.errors.length>0||t.diffs.length>0||t.otherData.length>0)return!0}return!!(e.title&&typeof e.title=="string"&&e.title.trim())},Ee=e=>{let n=[],t=[],a=[],u=[];return e?.forEach(o=>{if(o.type==="diff")a.push(o);else if(o.content){let l=o.content;if(l.type==="error"||"error"in l){let r="";typeof l.error=="string"?r=l.error:l.error&&typeof l.error=="object"&&"message"in l.error?r=l.error.message:l.text?r=m0(l.text):l.error?r=m0(l.error):r="An error occurred",t.push(r)}else l.text?n.push(m0(l.text)):u.push(l)}}),{textOutputs:n,errors:t,diffs:a,otherData:u}},An=e=>{switch(e){case"pending":case"in_progress":return"loading";case"failed":return"error";case"completed":return"success";default:return"default"}};var xa=T(R(),1);function mx(e){let n=e.split(/[/\\]/);return n[n.length-1]||e}var Le=({path:e,line:n,column:t,showFullPath:a=!1,className:u="",disableClick:o=!1})=>{let l=rt(),r=f=>{if(f.preventDefault(),o)return;f.stopPropagation();let m=e;n!=null&&(m+=`:${n}`,t!=null&&(m+=`:${t}`)),console.log("[FileLink] Opening file:",m),l.postMessage({type:"openFile",data:{path:m}})},i=a?e:mx(e),s=n!=null?t!=null?`${e}:${n}:${t}`:`${e}:${n}`:e;return(0,xa.jsxs)("a",{href:"#",className:["file-link","inline-flex items-center leading-none",o?"pointer-events-none cursor-[inherit] hover:no-underline":"cursor-pointer","text-[11px] no-underline hover:underline","text-[var(--app-primary-foreground)]","transition-colors duration-100 ease-in-out","focus:outline focus:outline-1 focus:outline-[var(--vscode-focusBorder)] focus:outline-offset-2 focus:rounded-[2px]","active:opacity-80",u].join(" "),onClick:r,title:s,role:"button","aria-label":`Open file: ${s}`,children:[(0,xa.jsx)("span",{className:"file-link-path",children:i}),n!=null&&(0,xa.jsxs)("span",{className:"file-link-location opacity-70 text-[0.9em] font-normal dark:opacity-60",children:[":",n,t!=null&&(0,xa.jsxs)(xa.Fragment,{children:[":",t]})]})]})};var $h=document.createElement("style");$h.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * LayoutComponents.css - Tool call layout styles with timeline support
 */

/* ToolCallContainer with timeline support */
.toolcall-container {
  position: relative;
  padding-left: 30px;
  padding-top: 8px;
  padding-bottom: 8px;
  -webkit-user-select: text;
     -moz-user-select: text;
          user-select: text;
  align-items: flex-start;
}

/* Default timeline connector line */
.toolcall-container::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--app-primary-border-color);
}

/* First item: connector starts from status point position */
.toolcall-container:first-child::after {
  top: 24px;
}

/* Last item: connector shows only upper part */
.toolcall-container:last-child::after {
  height: calc(100% - 24px);
  top: 0;
  bottom: auto;
}

/* Status-specific styles using ::before pseudo-element for bullet points */
.toolcall-container.toolcall-status-default::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  padding-top: 2px;
  font-size: 10px;
  color: var(--app-secondary-foreground);
  z-index: 1;
}

.toolcall-container.toolcall-status-success::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  font-size: 10px;
  color: #74c991;
  z-index: 1;
}

.toolcall-container.toolcall-status-error::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  font-size: 10px;
  color: #c74e39;
  z-index: 1;
}

.toolcall-container.toolcall-status-warning::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  padding-top: 2px;
  font-size: 10px;
  color: #e1c08d;
  z-index: 1;
}

.toolcall-container.toolcall-status-loading::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  padding-top: 2px;
  font-size: 10px;
  color: var(--app-secondary-foreground);
  background-color: var(--app-secondary-background);
  animation: toolcallPulse 1s linear infinite;
  z-index: 1;
}

/* Loading animation */
@keyframes toolcallPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Content wrapper */
.toolcall-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
}

/* Legacy card styles */
.toolcall-card {
  grid-template-columns: auto 1fr;
  gap: var(--spacing-medium);
  background: var(--app-input-background);
  border: 1px solid var(--app-input-border);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-large);
  margin: var(--spacing-medium) 0;
  align-items: start;
  animation: fadeIn 0.2s ease-in;
}

/* Legacy row styles */
.toolcall-row {
  grid-template-columns: 80px 1fr;
  gap: var(--spacing-medium);
  min-width: 0;
}

.toolcall-row-label {
  font-size: var(--font-size-xs);
  color: var(--app-secondary-foreground);
  font-weight: 500;
  padding-top: 2px;
}

.toolcall-row-content {
  color: var(--app-primary-foreground);
  min-width: 0;
  word-break: break-word;
}

/* Locations list */
.toolcall-locations-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
}

/* ToolCall header with loading indicator */
.toolcall-header {
  position: relative;
}

.toolcall-header::before {
  content: '\\25cf';
  position: absolute;
  left: -22px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  line-height: 1;
  z-index: 1;
  color: #e1c08d;
  animation: toolcallHeaderPulse 1.5s ease-in-out infinite;
}

/* Loading animation for toolcall header */
@keyframes toolcallHeaderPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* In-progress toolcall specific styles */
.in-progress-toolcall .toolcall-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1;
  min-width: 0;
  max-width: 100%;
}

.in-progress-toolcall .toolcall-header {
  display: flex;
  align-items: center;
  gap: 2;
  position: relative;
  min-width: 0;
}

.in-progress-toolcall .toolcall-content-text {
  word-break: break-word;
  white-space: pre-wrap;
  width: 100%;
}
`;document.head.appendChild($h);var un=T(R(),1);var on=({label:e,status:n="success",children:t,toolCallId:a,labelSuffix:u,className:o})=>(0,un.jsx)("div",{className:`qwen-message message-item ${o||""} relative pl-[30px] py-2 select-text toolcall-container toolcall-status-${n}`,children:(0,un.jsxs)("div",{className:"toolcall-content-wrapper flex flex-col gap-2 min-w-0 max-w-full",children:[(0,un.jsxs)("div",{className:"flex items-baseline gap-1 relative min-w-0",children:[(0,un.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:e}),(0,un.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:u})]}),t&&(0,un.jsx)("div",{className:"text-[var(--app-secondary-foreground)] py-1",children:t})]})}),cl=({icon:e,children:n})=>(0,un.jsx)("div",{className:"grid grid-cols-[auto_1fr] gap-medium bg-[var(--app-input-background)] border border-[var(--app-input-border)] rounded-medium p-large my-medium items-start animate-[fadeIn_0.2s_ease-in] toolcall-card",children:(0,un.jsx)("div",{className:"flex flex-col gap-medium min-w-0",children:n})}),Ka=({label:e,children:n})=>(0,un.jsxs)("div",{className:"grid grid-cols-[80px_1fr] gap-medium min-w-0",children:[(0,un.jsx)("div",{className:"text-xs text-[var(--app-secondary-foreground)] font-medium pt-[2px]",children:e}),(0,un.jsx)("div",{className:"text-[var(--app-primary-foreground)] min-w-0 break-words",children:n})]});var eg=({locations:e})=>(0,un.jsx)("div",{className:"toolcall-locations-list flex flex-col gap-1 max-w-full",children:e.map((n,t)=>(0,un.jsx)(Le,{path:n.path,line:n.line,showFullPath:!0},t))});var Pe=T(R(),1);var ng=({toolCall:e})=>{let{kind:n,title:t,content:a,locations:u,toolCallId:o}=e,l=st(t),{textOutputs:r,errors:i}=Ee(a);if(i.length>0)return(0,Pe.jsxs)(cl,{icon:"\u{1F527}",children:[(0,Pe.jsx)(Ka,{label:n,children:(0,Pe.jsx)("div",{children:l})}),(0,Pe.jsx)(Ka,{label:"Error",children:(0,Pe.jsx)("div",{className:"text-[#c74e39] font-medium",children:i.join(`
`)})})]});if(r.length>0){let s=r.join(`
`);if(s.length>150){let d=s.length>300?s.substring(0,300)+"...":s;return(0,Pe.jsxs)(cl,{icon:"\u{1F527}",children:[(0,Pe.jsx)(Ka,{label:n,children:(0,Pe.jsx)("div",{children:l})}),(0,Pe.jsx)(Ka,{label:"Output",children:(0,Pe.jsx)("div",{className:"whitespace-pre-wrap font-mono text-[13px] opacity-90",children:d})})]})}let m=e.status==="in_progress"||e.status==="pending"?"loading":"success";return(0,Pe.jsx)(on,{label:n,status:m,toolCallId:o,children:l||s})}if(u&&u.length>0){let s=e.status==="in_progress"||e.status==="pending"?"loading":"success";return(0,Pe.jsx)(on,{label:n,status:s,toolCallId:o,children:(0,Pe.jsx)(eg,{locations:u})})}if(l){let s=e.status==="in_progress"||e.status==="pending"?"loading":"success";return(0,Pe.jsx)(on,{label:n,status:s,toolCallId:o,children:l})}return null};var Ut=T(je(),1);var tg=(e,n,t,a)=>{n&&e.postMessage({type:"openDiff",data:{path:n,oldText:t||"",newText:a||""}})};var Te=T(R(),1);var ei=({label:e,status:n="success",children:t,toolCallId:a,labelSuffix:u,className:o})=>(0,Te.jsx)("div",{className:`ReadToolCall qwen-message message-item ${o||""} relative pl-[30px] py-2 select-text toolcall-container toolcall-status-${n}`,children:(0,Te.jsxs)("div",{className:"toolcall-content-wrapper flex flex-col gap-1 min-w-0 max-w-full",children:[(0,Te.jsxs)("div",{className:"flex items-baseline gap-1.5 relative min-w-0",children:[(0,Te.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:e}),(0,Te.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:u})]}),t&&(0,Te.jsx)("div",{className:"text-[var(--app-secondary-foreground)] py-1",children:t})]})}),ag=({toolCall:e})=>{let{content:n,locations:t,toolCallId:a}=e,u=rt(),[o,l]=(0,Ut.useState)(!1),{errors:r,diffs:i,textOutputs:s}=(0,Ut.useMemo)(()=>Ee(n),[n]),f=(0,Ut.useCallback)((d,p,b)=>{tg(u,d,p,b)},[u]);(0,Ut.useEffect)(()=>{if(i.length>0){let d=i[0],p=d.path||t&&t[0]?.path||"";if(p&&d.oldText!==void 0&&d.newText!==void 0){let b=setTimeout(()=>{f(p,d.oldText,d.newText)},100);return()=>b&&clearTimeout(b)}}},[a]),(0,Ut.useEffect)(()=>{l(!1)},[a]);let m=An(e.status);if(r.length>0){let d=t?.[0]?.path||"";return(0,Te.jsx)(ei,{label:"Read",className:"read-tool-call-error",status:"error",toolCallId:a,labelSuffix:d?(0,Te.jsx)(Le,{path:d,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:r.join(`
`)})}if(i.length>0){let d=i[0]?.path||t?.[0]?.path||"";return(0,Te.jsx)(ei,{label:"Read",className:"read-tool-call-success",status:m,toolCallId:a,labelSuffix:d?(0,Te.jsx)(Le,{path:d,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:null})}if(s.length>0){let d=t?.[0]?.path||"",p=s.join(`
`),b=5,C=800,_=p.split(`
`),g=_.length>b||p.length>C,c=p;g&&(c=_.slice(0,b).join(`
`),c.length>C&&(c=c.slice(0,C)),c=`${c}
...`);let h=o||!g?p:c,v=e.status==="failed"?"read-tool-call-error":"read-tool-call-success";return(0,Te.jsxs)(ei,{label:"Read",className:v,status:m,toolCallId:a,labelSuffix:d?(0,Te.jsx)(Le,{path:d,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:[(0,Te.jsx)("div",{className:"bg-[var(--app-input-background)] border border-[var(--app-input-border)] rounded-md p-3 mt-1",children:(0,Te.jsx)("pre",{className:"font-mono text-[13px] whitespace-pre-wrap break-words text-[var(--app-primary-foreground)] opacity-90",children:h})}),g&&(0,Te.jsx)("button",{type:"button",className:"mt-1 text-xs text-[var(--app-secondary-foreground)] underline opacity-80 hover:opacity-100",onClick:()=>l(x=>!x),children:o?"Show less":"Show more"})]})}if(t&&t.length>0){let d=t[0].path;return(0,Te.jsx)(ei,{label:"Read",className:"read-tool-call-success",status:m,toolCallId:a,labelSuffix:d?(0,Te.jsx)(Le,{path:d,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:null})}return null};var ln=T(R(),1);var ug=({toolCall:e})=>{let{content:n,locations:t,rawInput:a,toolCallId:u}=e,{errors:o,textOutputs:l}=Ee(n),r="";if(a&&typeof a=="object"?r=a.content||"":typeof a=="string"&&(r=a),o.length>0){let i=t?.[0]?.path||"",s=o.join(`
`),f=r.length>200?r.substring(0,200)+"...":r;return(0,ln.jsxs)(on,{label:"Write",status:"error",toolCallId:u,labelSuffix:i?(0,ln.jsx)(Le,{path:i,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:[(0,ln.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,ln.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,ln.jsx)("span",{className:"flex-shrink-0 w-full",children:s})]}),f&&(0,ln.jsx)("div",{className:"bg-[var(--app-input-background)] border border-[var(--app-input-border)] rounded-md p-3 mt-1",children:(0,ln.jsx)("pre",{className:"font-mono text-[13px] whitespace-pre-wrap break-words text-[var(--app-primary-foreground)] opacity-90",children:f})})]})}if(t&&t.length>0){let i=t[0].path,s=r.split(`
`).length,f=An(e.status);return(0,ln.jsx)(on,{label:"Created",status:f,toolCallId:u,labelSuffix:i?(0,ln.jsx)(Le,{path:i,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}):void 0,children:(0,ln.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 flex-row items-start w-full gap-1 flex items-center",children:[(0,ln.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,ln.jsxs)("span",{className:"flex-shrink-0 w-full",children:[s," lines"]})]})})}if(l.length>0){let i=An(e.status);return(0,ln.jsx)(on,{label:"Write",status:i,toolCallId:u,children:l.join(`
`)})}return null};var lg=T(je(),1);var Q=T(R(),1);var og=({label:e,status:n="success",children:t,toolCallId:a,labelSuffix:u,className:o})=>(0,Q.jsx)("div",{className:`qwen-message message-item ${o||""} relative pl-[30px] py-2 select-text toolcall-container toolcall-status-${n}`,children:(0,Q.jsxs)("div",{className:"EditToolCall toolcall-content-wrapper flex flex-col gap-1 min-w-0 max-w-full",children:[(0,Q.jsxs)("div",{className:"flex items-baseline gap-1.5 relative min-w-0",children:[(0,Q.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:e}),(0,Q.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:u})]}),t&&(0,Q.jsx)("div",{className:"text-[var(--app-secondary-foreground)]",children:t})]})}),hx=(e,n)=>{let t=e?e.split(`
`).length:0,u=(n?n.split(`
`).length:0)-t;return u>0?`+${u} lines`:u<0?`${u} lines`:"Modified"},rg=({toolCall:e})=>{let{content:n,locations:t,toolCallId:a}=e,{errors:u,diffs:o}=(0,lg.useMemo)(()=>Ee(n),[n]);if(e.status==="failed"){let r=o[0]?.path||t?.[0]?.path||"",i=An(e.status);return(0,Q.jsx)("div",{className:`qwen-message message-item relative py-2 select-text toolcall-container toolcall-status-${i}`,children:(0,Q.jsxs)("div",{className:"toolcall-edit-content flex flex-col gap-1 min-w-0 max-w-full",children:[(0,Q.jsx)("div",{className:"flex items-center justify-between min-w-0",children:(0,Q.jsxs)("div",{className:"flex items-baseline gap-2 min-w-0",children:[(0,Q.jsx)("span",{className:"text-[13px] leading-none font-bold text-[var(--app-primary-foreground)]",children:"Edit"}),r&&(0,Q.jsx)(Le,{path:r,showFullPath:!1,className:"font-mono text-[var(--app-secondary-foreground)] hover:underline"})]})}),(0,Q.jsx)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 flex-row items-start w-full gap-1 flex items-center",children:(0,Q.jsx)("span",{className:"flex-shrink-0 w-full",children:"edit failed"})}),u.length>0&&(0,Q.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 flex-row items-start w-full gap-1",children:[(0,Q.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,Q.jsx)("span",{className:"flex-shrink-0 w-full",children:u.join(`
`)})]})]})})}if(u.length>0){let l=o[0]?.path||t?.[0]?.path||"";return(0,Q.jsx)(og,{label:"Edit",status:"error",toolCallId:a,labelSuffix:l?(0,Q.jsx)(Le,{path:l,showFullPath:!1,className:"text-xs font-mono hover:underline"}):void 0,children:u.join(`
`)})}if(o.length>0){let l=o[0],r=l.path||t&&t[0]?.path||"",i=hx(l.oldText,l.newText),s=An(e.status);return(0,Q.jsx)("div",{className:`qwen-message message-item relative py-2 select-text toolcall-container toolcall-status-${s}`,children:(0,Q.jsxs)("div",{className:"toolcall-edit-content flex flex-col gap-1 min-w-0 max-w-full",children:[(0,Q.jsx)("div",{className:"flex items-center justify-between min-w-0",children:(0,Q.jsxs)("div",{className:"flex items-baseline gap-1.5 min-w-0",children:[(0,Q.jsx)("span",{className:"text-[13px] leading-none font-bold text-[var(--app-primary-foreground)]",children:"Edit"}),r&&(0,Q.jsx)(Le,{path:r,showFullPath:!1,className:"font-mono text-[var(--app-secondary-foreground)] hover:underline"})]})}),(0,Q.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 flex-row items-start w-full gap-1 flex items-baseline",children:[(0,Q.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,Q.jsx)("span",{className:"flex-shrink-0 w-full",children:i})]})]})})}if(t&&t.length>0){let l=An(e.status);return(0,Q.jsx)(og,{label:"Edit",status:l,toolCallId:a,labelSuffix:(0,Q.jsx)(Le,{path:t[0].path,showFullPath:!1,className:"text-xs font-mono text-[var(--app-secondary-foreground)] hover:underline"}),children:(0,Q.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 flex-row items-start w-full gap-1 flex items-center",children:[(0,Q.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,Q.jsx)(Le,{path:t[0].path,line:t[0].line,showFullPath:!0})]})})}return null};async function h0(e,n,t="temp",a=".txt"){e({type:"createAndOpenTempFile",data:{content:n,fileName:t,fileExtension:a}})}var ig=document.createElement("style");ig.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Execute tool call styles - Enhanced styling with semantic class names
 */

/* Root container for execute tool call output */
.bash-toolcall-card {
  border: 0.5px solid var(--app-input-border);
  border-radius: 5px;
  background: var(--app-tool-background);
  margin: 8px 0;
  max-width: 100%;
  font-size: 1em;
  align-items: start;
}

/* Content wrapper inside the card */
.bash-toolcall-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
}

/* Individual input/output row */
.bash-toolcall-row {
  display: grid;
  grid-template-columns: max-content 1fr;
  border-top: 0.5px solid var(--app-input-border);
  padding: 4px;
}

/* First row has no top border */
.bash-toolcall-row:first-child {
  border-top: none;
}

/* Row label (IN/OUT/ERROR) */
.bash-toolcall-label {
  grid-column: 1;
  color: var(--app-secondary-foreground);
  text-align: left;
  opacity: 50%;
  padding: 4px 8px 4px 4px;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Row content area */
.bash-toolcall-row-content {
  grid-column: 2;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 4px;
}

/* Truncated content styling */
.bash-toolcall-row-content:not(.bash-toolcall-full) {
  max-height: 60px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    var(--app-primary-background) 40px,
    transparent 60px
  );
          mask-image: linear-gradient(
    to bottom,
    var(--app-primary-background) 40px,
    transparent 60px
  );
  overflow: hidden;
}

/* Preformatted content */
.bash-toolcall-pre {
  margin-block: 0;
  overflow: hidden;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Code content */
.bash-toolcall-code {
  margin: 0;
  padding: 0;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Output content with subtle styling */
.bash-toolcall-output-subtle {
  background-color: var(--app-code-background);
  white-space: pre;
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

/* Error content styling */
.bash-toolcall-error-content {
  color: #c74e39;
}
`;document.head.appendChild(ig);var X=T(R(),1);var sg=({toolCall:e})=>{let{title:n,content:t,rawInput:a,toolCallId:u}=e,o=st(n),l=rt(),{textOutputs:r,errors:i}=Ee(t),s=o;a&&typeof a=="object"?s=a.command||o:typeof a=="string"&&(s=a);let f=()=>{h0(l.postMessage,s,"bash-input",".sh")},m=()=>{if(r.length>0){let p=r.join(`
`);h0(l.postMessage,p,"bash-output",".txt")}},d=i.length>0?"error":e.status==="in_progress"||e.status==="pending"?"loading":"success";if(i.length>0)return(0,X.jsxs)(on,{label:"Bash",status:d,toolCallId:u,children:[(0,X.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,X.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,X.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]}),(0,X.jsx)("div",{className:"bash-toolcall-card",children:(0,X.jsxs)("div",{className:"bash-toolcall-content",children:[(0,X.jsxs)("div",{className:"bash-toolcall-row",onClick:f,style:{cursor:"pointer"},children:[(0,X.jsx)("div",{className:"bash-toolcall-label",children:"IN"}),(0,X.jsx)("div",{className:"bash-toolcall-row-content",children:(0,X.jsx)("pre",{className:"bash-toolcall-pre",children:s})})]}),(0,X.jsxs)("div",{className:"bash-toolcall-row",children:[(0,X.jsx)("div",{className:"bash-toolcall-label",children:"Error"}),(0,X.jsx)("div",{className:"bash-toolcall-row-content",children:(0,X.jsx)("pre",{className:"bash-toolcall-pre bash-toolcall-error-content",children:i.join(`
`)})})]})]})})]});if(r.length>0){let p=r.join(`
`),b=p.length>500?p.substring(0,500)+"...":p;return(0,X.jsxs)(on,{label:"Bash",status:d,toolCallId:u,children:[(0,X.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,X.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,X.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]}),(0,X.jsx)("div",{className:"bash-toolcall-card",children:(0,X.jsxs)("div",{className:"bash-toolcall-content",children:[(0,X.jsxs)("div",{className:"bash-toolcall-row",onClick:f,style:{cursor:"pointer"},children:[(0,X.jsx)("div",{className:"bash-toolcall-label",children:"IN"}),(0,X.jsx)("div",{className:"bash-toolcall-row-content",children:(0,X.jsx)("pre",{className:"bash-toolcall-pre",children:s})})]}),(0,X.jsxs)("div",{className:"bash-toolcall-row",onClick:m,style:{cursor:"pointer"},children:[(0,X.jsx)("div",{className:"bash-toolcall-label",children:"OUT"}),(0,X.jsx)("div",{className:"bash-toolcall-row-content",children:(0,X.jsx)("div",{className:"bash-toolcall-output-subtle",children:(0,X.jsx)("pre",{className:"bash-toolcall-pre",children:b})})})]})]})})]})}return(0,X.jsx)(on,{label:"Bash",status:d,toolCallId:u,children:(0,X.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",onClick:f,style:{cursor:"pointer"},children:[(0,X.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,X.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]})})};var cg=document.createElement("style");cg.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Execute tool call styles - Enhanced styling with semantic class names
 */

/* Root container for execute tool call output */
.execute-toolcall-card {
  border: 0.5px solid var(--app-input-border);
  border-radius: 5px;
  background: var(--app-tool-background);
  margin: 8px 0;
  max-width: 100%;
  font-size: 1em;
  align-items: start;
}

/* Content wrapper inside the card */
.execute-toolcall-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
}

/* Individual input/output row */
.execute-toolcall-row {
  display: grid;
  grid-template-columns: max-content 1fr;
  border-top: 0.5px solid var(--app-input-border);
  padding: 4px;
}

/* First row has no top border */
.execute-toolcall-row:first-child {
  border-top: none;
}

/* Row label (IN/OUT/ERROR) */
.execute-toolcall-label {
  grid-column: 1;
  color: var(--app-secondary-foreground);
  text-align: left;
  opacity: 50%;
  padding: 4px 8px 4px 4px;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Row content area */
.execute-toolcall-row-content {
  grid-column: 2;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 4px;
}

/* Truncated content styling */
.execute-toolcall-row-content:not(.execute-toolcall-full) {
  max-height: 60px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    var(--app-primary-background) 40px,
    transparent 60px
  );
          mask-image: linear-gradient(
    to bottom,
    var(--app-primary-background) 40px,
    transparent 60px
  );
  overflow: hidden;
}

/* Preformatted content */
.execute-toolcall-pre {
  margin-block: 0;
  overflow: hidden;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Code content */
.execute-toolcall-code {
  margin: 0;
  padding: 0;
  font-family: var(--app-monospace-font-family);
  font-size: 0.85em;
}

/* Output content with subtle styling */
.execute-toolcall-output-subtle {
  background-color: var(--app-code-background);
  white-space: pre;
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

/* Error content styling */
.execute-toolcall-error-content {
  color: #c74e39;
}
`;document.head.appendChild(cg);var B=T(R(),1);var g0=({label:e,status:n="success",children:t,toolCallId:a,labelSuffix:u,className:o})=>(0,B.jsx)("div",{className:`ExecuteToolCall qwen-message message-item ${o||""} relative pl-[30px] py-2 select-text toolcall-container toolcall-status-${n}`,children:(0,B.jsxs)("div",{className:"toolcall-content-wrapper flex flex-col gap-0 min-w-0 max-w-full",children:[(0,B.jsxs)("div",{className:"flex items-baseline gap-1.5 relative min-w-0",children:[(0,B.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:e}),(0,B.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:u})]}),t&&(0,B.jsx)("div",{className:"text-[var(--app-secondary-foreground)]",children:t})]})}),fg=({toolCall:e})=>{let{title:n,content:t,rawInput:a,toolCallId:u}=e,o=st(a?.description||n),{textOutputs:l,errors:r}=Ee(t),i=o;a&&typeof a=="object"?i=a.command||o:typeof a=="string"&&(i=a);let s=r.length>0||e.status==="failed"?"error":e.status==="in_progress"||e.status==="pending"?"loading":"success";if(r.length>0)return(0,B.jsxs)(g0,{label:"Execute",status:s,toolCallId:u,className:"execute-default-toolcall",children:[(0,B.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,B.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,B.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]}),(0,B.jsx)("div",{className:"execute-toolcall-card",children:(0,B.jsxs)("div",{className:"execute-toolcall-content",children:[(0,B.jsxs)("div",{className:"execute-toolcall-row",children:[(0,B.jsx)("div",{className:"execute-toolcall-label",children:"IN"}),(0,B.jsx)("div",{className:"execute-toolcall-row-content",children:(0,B.jsx)("pre",{className:"execute-toolcall-pre",children:i})})]}),(0,B.jsxs)("div",{className:"execute-toolcall-row",children:[(0,B.jsx)("div",{className:"execute-toolcall-label",children:"Error"}),(0,B.jsx)("div",{className:"execute-toolcall-row-content",children:(0,B.jsx)("pre",{className:"execute-toolcall-pre execute-toolcall-error-content",children:r.join(`
`)})})]})]})})]});if(l.length>0){let f=l.join(`
`),m=f.length>500?f.substring(0,500)+"...":f;return(0,B.jsxs)(g0,{label:"Execute",status:s,toolCallId:u,children:[(0,B.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,B.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,B.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]}),(0,B.jsx)("div",{className:"execute-toolcall-card",children:(0,B.jsxs)("div",{className:"execute-toolcall-content",children:[(0,B.jsxs)("div",{className:"execute-toolcall-row",children:[(0,B.jsx)("div",{className:"execute-toolcall-label",children:"IN"}),(0,B.jsx)("div",{className:"execute-toolcall-row-content",children:(0,B.jsx)("pre",{className:"execute-toolcall-pre",children:i})})]}),(0,B.jsxs)("div",{className:"execute-toolcall-row",children:[(0,B.jsx)("div",{className:"execute-toolcall-label",children:"OUT"}),(0,B.jsx)("div",{className:"execute-toolcall-row-content",children:(0,B.jsx)("div",{className:"execute-toolcall-output-subtle",children:(0,B.jsx)("pre",{className:"execute-toolcall-pre",children:m})})})]})]})})]})}return(0,B.jsx)(g0,{label:"Execute",status:s,toolCallId:u,children:(0,B.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,B.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,B.jsx)("span",{className:"flex-shrink-0 w-full",children:o})]})})};var fl=T(R(),1);var dg=({checked:e=!1,indeterminate:n=!1,disabled:t=!0,className:a="",style:u,title:o})=>{let l=!!e&&!n,r=!!n;return(0,fl.jsxs)("span",{role:"checkbox","aria-checked":n?"mixed":!!e,"aria-disabled":t||void 0,title:o,style:u,className:["q m-[2px] shrink-0 w-4 h-4 relative rounded-[2px] box-border","border border-[var(--app-input-border)] bg-[var(--app-input-background)]","inline-flex items-center justify-center",l?"opacity-70":"",a].join(" "),children:[l?(0,fl.jsx)("span",{"aria-hidden":!0,className:["absolute block","left-[3px] top-[3px]","w-2.5 h-1.5","border-l-2 border-b-2","border-[#74c991]","-rotate-45"].join(" ")}):null,r?(0,fl.jsx)("span",{"aria-hidden":!0,className:["absolute inline-block","left-1/2 top-[10px] -translate-x-1/2 -translate-y-1/2","text-[16px] leading-none text-[#e1c08d] select-none"].join(" "),children:"*"}):null]})};var rn=T(R(),1);var pg=({label:e,status:n="success",children:t,toolCallId:a,labelSuffix:u,className:o})=>(0,rn.jsx)("div",{className:`qwen-message message-item ${o||""} relative pl-[30px] py-2 select-text toolcall-container toolcall-status-${n}`,children:(0,rn.jsxs)("div",{className:"UpdatedPlanToolCall toolcall-content-wrapper flex flex-col gap-2 min-w-0 max-w-full",children:[(0,rn.jsxs)("div",{className:"flex items-baseline gap-1 relative min-w-0",children:[(0,rn.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:e}),(0,rn.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:u})]}),t&&(0,rn.jsx)("div",{className:"text-[var(--app-secondary-foreground)] py-1",children:t})]})}),gx=e=>{switch(e){case"completed":return"success";case"failed":return"error";case"in_progress":return"warning";case"pending":return"loading";default:return"default"}},bx=e=>{let t=e.join(`
`).split(/\r?\n/),a=[],u=/^(?:\s*(?:[-*]|\d+[.)])\s*)?\[( |x|X|-|\*)\]\s+(.*)$/;for(let o of t){let l=o.match(u);if(l){let r=l[1],i=l[2].trim(),s=r==="x"||r==="X"?"completed":r==="-"||r==="*"?"in_progress":"pending";i&&a.push({content:i,status:s})}}if(a.length===0)for(let o of t){let l=o.trim();l&&a.push({content:l,status:"pending"})}return a},mg=({toolCall:e})=>{let{content:n,status:t}=e,{errors:a,textOutputs:u}=Ee(n);if(a.length>0)return(0,rn.jsx)(pg,{label:"Updated Plan",status:"error",children:a.join(`
`)});let o=bx(u),l=st(e.title)||"Updated Plan";return(0,rn.jsx)(pg,{label:l,status:gx(t),className:"update-plan-toolcall",children:(0,rn.jsx)("ul",{className:"Fr list-none p-0 m-0 flex flex-col gap-1",children:o.map((r,i)=>{let s=r.status==="completed",f=r.status==="in_progress";return(0,rn.jsxs)("li",{className:["Hr flex items-start gap-2 p-0 rounded text-[var(--app-primary-foreground)]",s?"fo opacity-70":""].join(" "),children:[(0,rn.jsx)("label",{className:"flex items-start gap-2",children:(0,rn.jsx)(dg,{checked:s,indeterminate:f})}),(0,rn.jsx)("div",{className:["vo flex-1 text-xs leading-[1.5] text-[var(--app-primary-foreground)]",s?"line-through text-[var(--app-secondary-foreground)] opacity-70":"opacity-85"].join(" "),children:r.content})]},i)})})})};var H=T(R(),1);var b0=({status:e,labelSuffix:n,children:t,isFirst:a,isLast:u})=>{let o=`toolcall-container toolcall-status-${e}`,l=a?"top-[24px]":"top-0",r=u?"bottom-auto h-[calc(100%-24px)]":"bottom-0";return(0,H.jsxs)("div",{className:'qwen-message message-item relative pl-[30px] py-2 select-text before:absolute before:left-[8px] before:top-2 before:content-["\\25cf"] before:text-[10px] before:z-[1] '+o,children:[(0,H.jsx)("div",{className:`absolute left-[12px] ${l} ${r} w-px bg-[var(--app-primary-border-color)]`,"aria-hidden":!0}),(0,H.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,H.jsxs)("div",{className:"flex items-baseline gap-2 min-w-0",children:[(0,H.jsx)("span",{className:"text-[14px] leading-none font-bold text-[var(--app-primary-foreground)]",children:"Search"}),n?(0,H.jsx)("span",{className:"text-[11px] text-[var(--app-secondary-foreground)]",children:n}):null]}),t?(0,H.jsx)("div",{className:"mt-1 text-[var(--app-secondary-foreground)]",children:t}):null]})]})},hg=({status:e,children:n,isFirst:t,isLast:a})=>{let u=e==="success"?"before:text-qwen-success":e==="error"?"before:text-qwen-error":e==="warning"?"before:text-qwen-warning":"before:text-qwen-loading before:opacity-70 before:animate-pulse-slow",o=t?"top-[24px]":"top-0",l=a?"bottom-auto h-[calc(100%-24px)]":"bottom-0";return(0,H.jsxs)("div",{className:'qwen-message message-item relative pl-[30px] py-2 select-text before:absolute before:left-[8px] before:top-2 before:content-["\\25cf"] before:text-[10px] before:z-[1] '+u,children:[(0,H.jsx)("div",{className:`absolute left-[12px] ${o} ${l} w-px bg-[var(--app-primary-border-color)]`,"aria-hidden":!0}),(0,H.jsx)("div",{className:"bg-[var(--app-input-background)] border border-[var(--app-input-border)] rounded-medium p-large my-medium",children:(0,H.jsx)("div",{className:"flex flex-col gap-3 min-w-0",children:n})})]})},ni=({label:e,children:n})=>(0,H.jsxs)("div",{className:"grid grid-cols-[80px_1fr] gap-medium min-w-0",children:[(0,H.jsx)("div",{className:"text-xs text-[var(--app-secondary-foreground)] font-medium pt-[2px]",children:e}),(0,H.jsx)("div",{className:"text-[var(--app-primary-foreground)] min-w-0 break-words",children:n})]}),gg=({locations:e})=>(0,H.jsx)("div",{className:"flex flex-col gap-1 max-w-full",children:e.map((n,t)=>(0,H.jsx)(Le,{path:n.path,line:n.line,showFullPath:!0},t))}),bg=({toolCall:e,isFirst:n,isLast:t})=>{let{title:a,content:u,locations:o}=e,l=st(a),{errors:r,textOutputs:i}=Ee(u);if(r.length>0)return(0,H.jsxs)(hg,{status:"error",isFirst:n,isLast:t,children:[(0,H.jsx)(ni,{label:"Search",children:(0,H.jsx)("div",{className:"font-mono",children:l})}),(0,H.jsx)(ni,{label:"Error",children:(0,H.jsx)("div",{className:"text-qwen-error font-medium",children:r.join(`
`)})})]});if(o&&o.length>0){let s=An(e.status);return o.length>1?(0,H.jsxs)(hg,{status:s,isFirst:n,isLast:t,children:[(0,H.jsx)(ni,{label:"Search",children:(0,H.jsx)("div",{className:"font-mono",children:l})}),(0,H.jsx)(ni,{label:`Found (${o.length})`,children:(0,H.jsx)(gg,{locations:o})})]}):(0,H.jsxs)(b0,{status:s,labelSuffix:`(${l})`,isFirst:n,isLast:t,children:[(0,H.jsx)("span",{className:"mx-2 opacity-50",children:"\u2192"}),(0,H.jsx)(gg,{locations:o})]})}if(i.length>0){let s=An(e.status);return(0,H.jsx)(b0,{status:s,labelSuffix:l?`(${l})`:void 0,isFirst:n,isLast:t,children:(0,H.jsx)("div",{className:"flex flex-col",children:i.map((f,m)=>(0,H.jsxs)("div",{className:"inline-flex text-[var(--app-secondary-foreground)] text-[0.85em] opacity-70 mt-[2px] mb-[2px] flex-row items-start w-full gap-1",children:[(0,H.jsx)("span",{className:"flex-shrink-0 relative top-[-0.1em]",children:"\u23BF"}),(0,H.jsx)("span",{className:"flex-shrink-0 w-full",children:f})]},m))})})}if(l){let s=An(e.status);return(0,H.jsx)(b0,{status:s,isFirst:n,isLast:t,children:(0,H.jsx)("span",{className:"font-mono",children:l})})}return null};var Ja=T(R(),1);var vg=({toolCall:e})=>{let{content:n}=e,{textOutputs:t,errors:a}=Ee(n);if(a.length>0)return(0,Ja.jsx)(on,{label:"Thinking",status:"error",children:a.join(`
`)});if(t.length>0){let u=t.join(`

`);if(u.length>200){let r=u.length>500?u.substring(0,500)+"...":u;return(0,Ja.jsx)(cl,{icon:"\u{1F4AD}",children:(0,Ja.jsx)(Ka,{label:"Thinking",children:(0,Ja.jsx)("div",{className:"italic opacity-90 leading-relaxed",children:r})})})}let l=e.status==="pending"||e.status==="in_progress"?"loading":"default";return(0,Ja.jsx)(on,{label:"Thinking",status:l,children:(0,Ja.jsx)("span",{className:"italic opacity-90",children:u})})}return null};var yg=T(R(),1);var vx=e=>{switch(e.toLowerCase()){case"read":return ag;case"write":return ug;case"edit":return rg;case"execute":return fg;case"bash":case"command":return sg;case"updated_plan":case"updatedplan":case"todo_write":case"update_todos":case"todowrite":return mg;case"search":case"grep":case"glob":case"find":return bg;case"think":case"thinking":return vg;default:return ng}},xg=({toolCall:e,isFirst:n,isLast:t})=>{if(!Ph(e.kind))return null;let a=vx(e.kind);return(0,yg.jsx)(a,{toolCall:e,isFirst:n,isLast:t})};var Cg=T(R(),1);var wg=({toolCall:e,isFirst:n,isLast:t})=>(0,Cg.jsx)(xg,{toolCall:e,isFirst:n,isLast:t});function xx(){if(window.__EXTENSION_URI__)return window.__EXTENSION_URI__;let e=document.body?.getAttribute("data-extension-uri");if(e)return window.__EXTENSION_URI__=e,e}function kg(e){try{return["vscode-webview-resource:","https-vscode-webview-resource:","vscode-file:","file:","https:"].some(t=>e.startsWith(t))}catch{return!1}}function yx(e){let n=xx();if(!n)return console.warn("[resourceUrl] Extension URI not found in window or body"),"";if(!kg(n))return console.error("[resourceUrl] Invalid extension URI - possible security risk:",n),"";let t=e.startsWith("/")?e.slice(1):e,u=`${n.endsWith("/")?n:`${n}/`}${t}`;return kg(u)?u:(console.error("[resourceUrl] Generated URL failed validation:",u),"")}function ti(e){return yx(`assets/${e}`)}var Bt=T(R(),1);var v0=({isAuthenticated:e=!1,loadingMessage:n})=>{let t=ti("icon.png");return(0,Bt.jsx)("div",{className:"flex flex-col items-center justify-center h-full p-5 md:p-10",children:(0,Bt.jsx)("div",{className:"flex flex-col items-center gap-8 w-full",children:(0,Bt.jsxs)("div",{className:"flex flex-col items-center gap-6",children:[t?(0,Bt.jsx)("img",{src:t,alt:"Qwen Logo",className:"w-[60px] h-[60px] object-contain",onError:u=>{let o=u.target;o.style.display="none";let l=o.parentElement;if(l){let r=document.createElement("div");r.className="w-[60px] h-[60px] flex items-center justify-center text-2xl font-bold",r.textContent="Q",l.appendChild(r)}}}):(0,Bt.jsx)("div",{className:"w-[60px] h-[60px] flex items-center justify-center text-2xl font-bold bg-gray-200 rounded",children:"Q"}),(0,Bt.jsx)("div",{className:"text-center",children:(0,Bt.jsx)("div",{className:"text-[15px] text-app-primary-foreground leading-normal font-normal max-w-[400px]",children:n?"Preparing Gus Qwen\u2026":e?"What would you like to do? Ask about this codebase or we can start writing code.":"Welcome! Please log in to start using Gus Qwen."})})]})})})};var Yn=T(R(),1);var _g=({onLogin:e})=>{let n=ti("icon.png");return(0,Yn.jsx)("div",{className:"flex flex-col items-center justify-center h-full p-5 md:p-10",children:(0,Yn.jsx)("div",{className:"flex flex-col items-center gap-8 w-full max-w-md mx-auto",children:(0,Yn.jsxs)("div",{className:"flex flex-col items-center gap-6",children:[(0,Yn.jsx)("div",{className:"relative",children:(0,Yn.jsx)("img",{src:n,alt:"Gus Qwen Logo",className:"w-[80px] h-[80px] object-contain"})}),(0,Yn.jsxs)("div",{className:"text-center",children:[(0,Yn.jsx)("h1",{className:"text-2xl font-bold text-app-primary-foreground mb-2",children:"Welcome to Gus Qwen"}),(0,Yn.jsx)("p",{className:"text-app-secondary-foreground max-w-sm",children:"Unlock the power of AI to understand, navigate, and transform your codebase faster than ever before."})]}),(0,Yn.jsx)("button",{onClick:e,className:"w-full px-4 py-3 bg-[#4f46e5] text-white font-medium rounded-lg shadow-sm hover:bg-[#4338ca] transition-colors duration-200",children:"Get Started with Gus Qwen"})]})})})};var En=T(je(),1);function Sg(e,n){let t=(0,En.useMemo)(()=>({id:"loading",label:"Loading\u2026",type:"info"}),[]),a=(0,En.useMemo)(()=>({id:"timeout",label:"Timeout",type:"info"}),[]),u=5e3,[o,l]=(0,En.useState)({isOpen:!1,triggerChar:null,query:"",position:{top:0,left:0},items:[]}),r=(0,En.useRef)(null),i=(0,En.useCallback)(()=>{r.current&&(clearTimeout(r.current),r.current=null),l({isOpen:!1,triggerChar:null,query:"",position:{top:0,left:0},items:[]})},[]),s=(0,En.useCallback)(async(d,p,b)=>{r.current&&(clearTimeout(r.current),r.current=null),l({isOpen:!0,triggerChar:d,query:p,position:b,items:[t]}),r.current=setTimeout(()=>{l(_=>_.isOpen&&_.triggerChar===d&&_.query===p&&_.items.length>0&&_.items[0]?.id==="loading"?{..._,items:[a]}:_)},u);let C=await n(d,p);r.current&&(clearTimeout(r.current),r.current=null),l(_=>({..._,isOpen:!0,triggerChar:d,query:p,position:b,items:C}))},[n,t,a]),f=(d,p)=>{if(d.length!==p.length)return!1;for(let b=0;b<d.length;b++){let C=d[b],_=p[b];if(C.id!==_.id||C.label!==_.label||(C.description??"")!==(_.description??"")||C.type!==_.type||(C.value??"")!==(_.value??"")||(C.path??"")!==(_.path??""))return!1}return!0},m=(0,En.useCallback)(async()=>{if(!o.isOpen||!o.triggerChar)return;let d=await n(o.triggerChar,o.query);l(p=>f(p.items,d)?p:{...p,items:d})},[o.isOpen,o.triggerChar,o.query,n]);return(0,En.useEffect)(()=>{let d=e.current;if(!d)return;let p=()=>{let C=window.getSelection();if(!C||C.rangeCount===0)return null;try{let g=C.getRangeAt(0).getBoundingClientRect();if(g.top>0&&g.left>0)return{top:g.top,left:g.left};let c=d.getBoundingClientRect();return{top:c.top,left:c.left}}catch(_){console.error("[useCompletionTrigger] Error getting cursor position:",_);let g=d.getBoundingClientRect();return{top:g.top,left:g.left}}},b=async()=>{let C=d.textContent||"",_=window.getSelection();if(!_||_.rangeCount===0){console.log("[useCompletionTrigger] No selection or rangeCount === 0");return}let g=_.getRangeAt(0),c=C.length;if(g.startContainer===d){let E=g.startOffset,D=0;for(let M=0;M<E&&M<d.childNodes.length;M++)D+=d.childNodes[M].textContent?.length||0;c=D||C.length}else if(g.startContainer.nodeType===Node.TEXT_NODE){let E=document.createTreeWalker(d,NodeFilter.SHOW_TEXT,null),D=0,M=!1,re=E.nextNode();for(;re;){if(re===g.startContainer){D+=g.startOffset,M=!0;break}D+=re.textContent?.length||0,re=E.nextNode()}c=M?D:C.length}let h=c===0&&C.length>0?C.length:c,v="\u200B",x=C.substring(0,h),w=x.lastIndexOf("@"),y=x.lastIndexOf("/"),k=-1,A=null;if(w>=0){let E=w>0?x[w-1]:" ",D=E===" "||E===`
`||E===v||w===0,M=x.substring(w+1),re=M.includes(" ")||M.includes(`
`);D&&!re&&(k=w,A="@")}if(A===null&&y>=0){let E=y>0?x[y-1]:" ";(E===" "||E===`
`||E===v||y===0)&&(k=y,A="/")}if(k>=0&&A){let E=k>0?C[k-1]:" ";if(E===" "||E===`
`||E===v||k===0){let M=C.substring(k+1,h),re=M.includes(`
`),We=M.includes(" ");if(!re&&(A==="/"||!We)){let Dn=p();if(Dn){await s(A,M,Dn);return}}}}o.isOpen&&i()};return d.addEventListener("input",b),()=>d.removeEventListener("input",b)},[e,o.isOpen,s,i]),{isOpen:o.isOpen,triggerChar:o.triggerChar,query:o.query,position:o.position,items:o.items,closeCompletion:i,openCompletion:s,refreshCompletion:m}}var Pu=T(R(),1);var x0=({size:e=16,className:n,...t})=>(0,Pu.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Pu.jsx)("path",{d:"M9 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-5-5zm3 7V3.5L10.5 2H10v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V2H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM6 3h3v2H6V3z"})});var y0=({size:e=16,className:n,...t})=>(0,Pu.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Pu.jsx)("path",{d:"M1.5 3A1.5 1.5 0 0 1 3 1.5h3.086a1.5 1.5 0 0 1 1.06.44L8.5 3H13A1.5 1.5 0 0 1 14.5 4.5v7A1.5 1.5 0 0 1 13 13H3A1.5 1.5 0 0 1 1.5 11.5v-8Z"})});var ct=T(R(),1);var w0=({size:e=20,className:n,...t})=>(0,ct.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,ct.jsx)("path",{fillRule:"evenodd",d:"M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"})}),C0=({size:e=20,className:n,...t})=>(0,ct.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,ct.jsx)("path",{d:"M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"})});var k0=({size:e=20,className:n,...t})=>(0,ct.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,ct.jsx)("path",{fillRule:"evenodd",d:"M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z",clipRule:"evenodd"})});var _0=({size:e=20,className:n,...t})=>(0,ct.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,ct.jsx)("path",{fillRule:"evenodd",d:"M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z",clipRule:"evenodd"})});var Ke=T(R(),1);var S0=({size:e=16,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{fillRule:"evenodd",d:"M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z",clipRule:"evenodd"})}),ai=({size:e=16,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{d:"M2.53 3.956A1 1 0 0 0 1 4.804v6.392a1 1 0 0 0 1.53.848l5.113-3.196c.16-.1.279-.233.357-.383v2.73a1 1 0 0 0 1.53.849l5.113-3.196a1 1 0 0 0 0-1.696L9.53 3.956A1 1 0 0 0 8 4.804v2.731a.992.992 0 0 0-.357-.383L2.53 3.956Z"})}),A0=({size:e=16,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{d:"M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z"})}),E0=({size:e=20,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{fillRule:"evenodd",d:"M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z",clipRule:"evenodd"})}),T0=({size:e=20,className:n,...t})=>(0,Ke.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:[(0,Ke.jsx)("path",{fillRule:"evenodd",d:"M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z",clipRule:"evenodd"}),(0,Ke.jsx)("path",{d:"m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z"})]}),D0=({size:e=20,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{fillRule:"evenodd",d:"M12.528 3.047a.75.75 0 0 1 .449.961L8.433 16.504a.75.75 0 1 1-1.41-.512l4.544-12.496a.75.75 0 0 1 .961-.449Z",clipRule:"evenodd"})}),M0=({size:e=20,className:n,...t})=>(0,Ke.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,Ke.jsx)("path",{fillRule:"evenodd",d:"M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z",clipRule:"evenodd"})});var ui=T(R(),1);var R0=({size:e=16,className:n,...t})=>(0,ui.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,ui.jsx)("path",{d:"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"})});var Ag=T(R(),1);var N0=T(R(),1);var z0=({size:e=16,className:n,...t})=>(0,N0.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor",width:e,height:e,className:n,"aria-hidden":"true",...t,children:(0,N0.jsx)("rect",{x:"4",y:"4",width:"8",height:"8",rx:"1"})});var Ht=T(R(),1);var Eg=({currentSessionTitle:e,onLoadSessions:n,onNewSession:t})=>(0,Ht.jsxs)("div",{className:"chat-header flex items-center select-none w-full border-b border-[var(--app-primary-border-color)] bg-[var(--app-header-background)] py-1.5 px-2.5",style:{borderBottom:"1px solid var(--app-primary-border-color)"},children:[(0,Ht.jsxs)("button",{className:"flex items-center gap-1.5 py-0.5 px-2 bg-transparent border-none rounded cursor-pointer outline-none min-w-0 max-w-[300px] overflow-hidden text-[var(--vscode-chat-font-size,13px)] font-[var(--vscode-chat-font-family)] hover:bg-[var(--app-ghost-button-hover-background)] focus:bg-[var(--app-ghost-button-hover-background)]",onClick:n,title:"Past conversations",children:[(0,Ht.jsx)("span",{className:"whitespace-nowrap overflow-hidden text-ellipsis min-w-0 font-medium",children:e}),(0,Ht.jsx)(w0,{className:"w-4 h-4 flex-shrink-0"})]}),(0,Ht.jsx)("div",{className:"flex-1 min-w-1"}),(0,Ht.jsx)("button",{className:"flex items-center justify-center p-1 bg-transparent border-none rounded cursor-pointer outline-none hover:bg-[var(--app-ghost-button-hover-background)]",onClick:t,title:"New Session",style:{padding:"4px"},children:(0,Ht.jsx)(C0,{className:"w-4 h-4"})})]});var V0={};wl(V0,{arrayReplaceAt:()=>j0,assign:()=>eo,escapeHtml:()=>Vt,escapeRE:()=>ay,fromCodePoint:()=>ml,has:()=>Yx,isMdAsciiPunct:()=>$a,isPunctChar:()=>Wa,isSpace:()=>G,isString:()=>gi,isValidEntityCode:()=>bi,isWhiteSpace:()=>Pa,lib:()=>uy,normalizeReference:()=>eu,unescapeAll:()=>jt,unescapeMd:()=>Px});var si={};wl(si,{decode:()=>dl,encode:()=>ri,format:()=>Wu,parse:()=>pl});var Tg={};function wx(e){let n=Tg[e];if(n)return n;n=Tg[e]=[];for(let t=0;t<128;t++){let a=String.fromCharCode(t);n.push(a)}for(let t=0;t<e.length;t++){let a=e.charCodeAt(t);n[a]="%"+("0"+a.toString(16).toUpperCase()).slice(-2)}return n}function oi(e,n){typeof n!="string"&&(n=oi.defaultChars);let t=wx(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(a){let u="";for(let o=0,l=a.length;o<l;o+=3){let r=parseInt(a.slice(o+1,o+3),16);if(r<128){u+=t[r];continue}if((r&224)===192&&o+3<l){let i=parseInt(a.slice(o+4,o+6),16);if((i&192)===128){let s=r<<6&1984|i&63;s<128?u+="\uFFFD\uFFFD":u+=String.fromCharCode(s),o+=3;continue}}if((r&240)===224&&o+6<l){let i=parseInt(a.slice(o+4,o+6),16),s=parseInt(a.slice(o+7,o+9),16);if((i&192)===128&&(s&192)===128){let f=r<<12&61440|i<<6&4032|s&63;f<2048||f>=55296&&f<=57343?u+="\uFFFD\uFFFD\uFFFD":u+=String.fromCharCode(f),o+=6;continue}}if((r&248)===240&&o+9<l){let i=parseInt(a.slice(o+4,o+6),16),s=parseInt(a.slice(o+7,o+9),16),f=parseInt(a.slice(o+10,o+12),16);if((i&192)===128&&(s&192)===128&&(f&192)===128){let m=r<<18&1835008|i<<12&258048|s<<6&4032|f&63;m<65536||m>1114111?u+="\uFFFD\uFFFD\uFFFD\uFFFD":(m-=65536,u+=String.fromCharCode(55296+(m>>10),56320+(m&1023))),o+=9;continue}}u+="\uFFFD"}return u})}oi.defaultChars=";/?:@&=+$,#";oi.componentChars="";var dl=oi;var Dg={};function Cx(e){let n=Dg[e];if(n)return n;n=Dg[e]=[];for(let t=0;t<128;t++){let a=String.fromCharCode(t);/^[0-9a-z]$/i.test(a)?n.push(a):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function li(e,n,t){typeof n!="string"&&(t=n,n=li.defaultChars),typeof t>"u"&&(t=!0);let a=Cx(n),u="";for(let o=0,l=e.length;o<l;o++){let r=e.charCodeAt(o);if(t&&r===37&&o+2<l&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){u+=e.slice(o,o+3),o+=2;continue}if(r<128){u+=a[r];continue}if(r>=55296&&r<=57343){if(r>=55296&&r<=56319&&o+1<l){let i=e.charCodeAt(o+1);if(i>=56320&&i<=57343){u+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}u+="%EF%BF%BD";continue}u+=encodeURIComponent(e[o])}return u}li.defaultChars=";/?:@&=+$,-_.!~*'()#";li.componentChars="-_.!~*'()";var ri=li;function Wu(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function ii(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var kx=/^([a-z0-9.+-]+:)/i,_x=/:[0-9]*$/,Sx=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Ax=["<",">",'"',"`"," ","\r",`
`,"	"],Ex=["{","}","|","\\","^","`"].concat(Ax),Tx=["'"].concat(Ex),Mg=["%","/","?",";","#"].concat(Tx),Rg=["/","?","#"],Dx=255,Ng=/^[+a-z0-9A-Z_-]{0,63}$/,Mx=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,zg={javascript:!0,"javascript:":!0},Lg={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Rx(e,n){if(e&&e instanceof ii)return e;let t=new ii;return t.parse(e,n),t}ii.prototype.parse=function(e,n){let t,a,u,o=e;if(o=o.trim(),!n&&e.split("#").length===1){let s=Sx.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let l=kx.exec(o);if(l&&(l=l[0],t=l.toLowerCase(),this.protocol=l,o=o.substr(l.length)),(n||l||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(u=o.substr(0,2)==="//",u&&!(l&&zg[l])&&(o=o.substr(2),this.slashes=!0)),!zg[l]&&(u||l&&!Lg[l])){let s=-1;for(let b=0;b<Rg.length;b++)a=o.indexOf(Rg[b]),a!==-1&&(s===-1||a<s)&&(s=a);let f,m;s===-1?m=o.lastIndexOf("@"):m=o.lastIndexOf("@",s),m!==-1&&(f=o.slice(0,m),o=o.slice(m+1),this.auth=f),s=-1;for(let b=0;b<Mg.length;b++)a=o.indexOf(Mg[b]),a!==-1&&(s===-1||a<s)&&(s=a);s===-1&&(s=o.length),o[s-1]===":"&&s--;let d=o.slice(0,s);o=o.slice(s),this.parseHost(d),this.hostname=this.hostname||"";let p=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!p){let b=this.hostname.split(/\./);for(let C=0,_=b.length;C<_;C++){let g=b[C];if(g&&!g.match(Ng)){let c="";for(let h=0,v=g.length;h<v;h++)g.charCodeAt(h)>127?c+="x":c+=g[h];if(!c.match(Ng)){let h=b.slice(0,C),v=b.slice(C+1),x=g.match(Mx);x&&(h.push(x[1]),v.unshift(x[2])),v.length&&(o=v.join(".")+o),this.hostname=h.join(".");break}}}}this.hostname.length>Dx&&(this.hostname=""),p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let r=o.indexOf("#");r!==-1&&(this.hash=o.substr(r),o=o.slice(0,r));let i=o.indexOf("?");return i!==-1&&(this.search=o.substr(i),o=o.slice(0,i)),o&&(this.pathname=o),Lg[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};ii.prototype.parseHost=function(e){let n=_x.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};var pl=Rx;var L0={};wl(L0,{Any:()=>ci,Cc:()=>fi,Cf:()=>Og,P:()=>$u,S:()=>di,Z:()=>pi});var ci=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;var fi=/[\0-\x1F\x7F-\x9F]/;var Og=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;var $u=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;var di=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;var pi=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;var Fg=new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map(e=>e.charCodeAt(0)));var qg=new Uint16Array("\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(e=>e.charCodeAt(0)));var O0,Nx=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),F0=(O0=String.fromCodePoint)!==null&&O0!==void 0?O0:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function q0(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Nx.get(e))!==null&&n!==void 0?n:e}var Fe;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(Fe||(Fe={}));var zx=32,ya;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(ya||(ya={}));function U0(e){return e>=Fe.ZERO&&e<=Fe.NINE}function Lx(e){return e>=Fe.UPPER_A&&e<=Fe.UPPER_F||e>=Fe.LOWER_A&&e<=Fe.LOWER_F}function Ox(e){return e>=Fe.UPPER_A&&e<=Fe.UPPER_Z||e>=Fe.LOWER_A&&e<=Fe.LOWER_Z||U0(e)}function Fx(e){return e===Fe.EQUALS||Ox(e)}var Oe;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(Oe||(Oe={}));var ft;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(ft||(ft={}));var mi=class{constructor(n,t,a){this.decodeTree=n,this.emitCodePoint=t,this.errors=a,this.state=Oe.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=ft.Strict}startEntity(n){this.decodeMode=n,this.state=Oe.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case Oe.EntityStart:return n.charCodeAt(t)===Fe.NUM?(this.state=Oe.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=Oe.NamedEntity,this.stateNamedEntity(n,t));case Oe.NumericStart:return this.stateNumericStart(n,t);case Oe.NumericDecimal:return this.stateNumericDecimal(n,t);case Oe.NumericHex:return this.stateNumericHex(n,t);case Oe.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|zx)===Fe.LOWER_X?(this.state=Oe.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=Oe.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,a,u){if(t!==a){let o=a-t;this.result=this.result*Math.pow(u,o)+parseInt(n.substr(t,o),u),this.consumed+=o}}stateNumericHex(n,t){let a=t;for(;t<n.length;){let u=n.charCodeAt(t);if(U0(u)||Lx(u))t+=1;else return this.addToNumericResult(n,a,t,16),this.emitNumericEntity(u,3)}return this.addToNumericResult(n,a,t,16),-1}stateNumericDecimal(n,t){let a=t;for(;t<n.length;){let u=n.charCodeAt(t);if(U0(u))t+=1;else return this.addToNumericResult(n,a,t,10),this.emitNumericEntity(u,2)}return this.addToNumericResult(n,a,t,10),-1}emitNumericEntity(n,t){var a;if(this.consumed<=t)return(a=this.errors)===null||a===void 0||a.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===Fe.SEMI)this.consumed+=1;else if(this.decodeMode===ft.Strict)return 0;return this.emitCodePoint(q0(this.result),this.consumed),this.errors&&(n!==Fe.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){let{decodeTree:a}=this,u=a[this.treeIndex],o=(u&ya.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){let l=n.charCodeAt(t);if(this.treeIndex=qx(a,u,this.treeIndex+Math.max(1,o),l),this.treeIndex<0)return this.result===0||this.decodeMode===ft.Attribute&&(o===0||Fx(l))?0:this.emitNotTerminatedNamedEntity();if(u=a[this.treeIndex],o=(u&ya.VALUE_LENGTH)>>14,o!==0){if(l===Fe.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==ft.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;let{result:t,decodeTree:a}=this,u=(a[t]&ya.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,u,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,a){let{decodeTree:u}=this;return this.emitCodePoint(t===1?u[n]&~ya.VALUE_LENGTH:u[n+1],a),t===3&&this.emitCodePoint(u[n+2],a),a}end(){var n;switch(this.state){case Oe.NamedEntity:return this.result!==0&&(this.decodeMode!==ft.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case Oe.NumericDecimal:return this.emitNumericEntity(0,2);case Oe.NumericHex:return this.emitNumericEntity(0,3);case Oe.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case Oe.EntityStart:return 0}}};function Ug(e){let n="",t=new mi(e,a=>n+=F0(a));return function(u,o){let l=0,r=0;for(;(r=u.indexOf("&",r))>=0;){n+=u.slice(l,r),t.startEntity(o);let s=t.write(u,r+1);if(s<0){l=r+t.end();break}l=r+s,r=s===0?l+1:l}let i=n+u.slice(l);return n="",i}}function qx(e,n,t,a){let u=(n&ya.BRANCH_LENGTH)>>7,o=n&ya.JUMP_TABLE;if(u===0)return o!==0&&a===o?t:-1;if(o){let i=a-o;return i<0||i>=u?-1:e[t+i]-1}let l=t,r=l+u-1;for(;l<=r;){let i=l+r>>>1,s=e[i];if(s<a)l=i+1;else if(s>a)r=i-1;else return e[i+u]}return-1}var Ux=Ug(Fg),J4=Ug(qg);function wa(e,n=ft.Legacy){return Ux(e,n)}function hi(e){for(let n=1;n<e.length;n++)e[n][0]+=e[n-1][0]+1;return e}var Bx=new Map(hi([[9,"&Tab;"],[0,"&NewLine;"],[22,"&excl;"],[0,"&quot;"],[0,"&num;"],[0,"&dollar;"],[0,"&percnt;"],[0,"&amp;"],[0,"&apos;"],[0,"&lpar;"],[0,"&rpar;"],[0,"&ast;"],[0,"&plus;"],[0,"&comma;"],[1,"&period;"],[0,"&sol;"],[10,"&colon;"],[0,"&semi;"],[0,{v:"&lt;",n:8402,o:"&nvlt;"}],[0,{v:"&equals;",n:8421,o:"&bne;"}],[0,{v:"&gt;",n:8402,o:"&nvgt;"}],[0,"&quest;"],[0,"&commat;"],[26,"&lbrack;"],[0,"&bsol;"],[0,"&rbrack;"],[0,"&Hat;"],[0,"&lowbar;"],[0,"&DiacriticalGrave;"],[5,{n:106,o:"&fjlig;"}],[20,"&lbrace;"],[0,"&verbar;"],[0,"&rbrace;"],[34,"&nbsp;"],[0,"&iexcl;"],[0,"&cent;"],[0,"&pound;"],[0,"&curren;"],[0,"&yen;"],[0,"&brvbar;"],[0,"&sect;"],[0,"&die;"],[0,"&copy;"],[0,"&ordf;"],[0,"&laquo;"],[0,"&not;"],[0,"&shy;"],[0,"&circledR;"],[0,"&macr;"],[0,"&deg;"],[0,"&PlusMinus;"],[0,"&sup2;"],[0,"&sup3;"],[0,"&acute;"],[0,"&micro;"],[0,"&para;"],[0,"&centerdot;"],[0,"&cedil;"],[0,"&sup1;"],[0,"&ordm;"],[0,"&raquo;"],[0,"&frac14;"],[0,"&frac12;"],[0,"&frac34;"],[0,"&iquest;"],[0,"&Agrave;"],[0,"&Aacute;"],[0,"&Acirc;"],[0,"&Atilde;"],[0,"&Auml;"],[0,"&angst;"],[0,"&AElig;"],[0,"&Ccedil;"],[0,"&Egrave;"],[0,"&Eacute;"],[0,"&Ecirc;"],[0,"&Euml;"],[0,"&Igrave;"],[0,"&Iacute;"],[0,"&Icirc;"],[0,"&Iuml;"],[0,"&ETH;"],[0,"&Ntilde;"],[0,"&Ograve;"],[0,"&Oacute;"],[0,"&Ocirc;"],[0,"&Otilde;"],[0,"&Ouml;"],[0,"&times;"],[0,"&Oslash;"],[0,"&Ugrave;"],[0,"&Uacute;"],[0,"&Ucirc;"],[0,"&Uuml;"],[0,"&Yacute;"],[0,"&THORN;"],[0,"&szlig;"],[0,"&agrave;"],[0,"&aacute;"],[0,"&acirc;"],[0,"&atilde;"],[0,"&auml;"],[0,"&aring;"],[0,"&aelig;"],[0,"&ccedil;"],[0,"&egrave;"],[0,"&eacute;"],[0,"&ecirc;"],[0,"&euml;"],[0,"&igrave;"],[0,"&iacute;"],[0,"&icirc;"],[0,"&iuml;"],[0,"&eth;"],[0,"&ntilde;"],[0,"&ograve;"],[0,"&oacute;"],[0,"&ocirc;"],[0,"&otilde;"],[0,"&ouml;"],[0,"&div;"],[0,"&oslash;"],[0,"&ugrave;"],[0,"&uacute;"],[0,"&ucirc;"],[0,"&uuml;"],[0,"&yacute;"],[0,"&thorn;"],[0,"&yuml;"],[0,"&Amacr;"],[0,"&amacr;"],[0,"&Abreve;"],[0,"&abreve;"],[0,"&Aogon;"],[0,"&aogon;"],[0,"&Cacute;"],[0,"&cacute;"],[0,"&Ccirc;"],[0,"&ccirc;"],[0,"&Cdot;"],[0,"&cdot;"],[0,"&Ccaron;"],[0,"&ccaron;"],[0,"&Dcaron;"],[0,"&dcaron;"],[0,"&Dstrok;"],[0,"&dstrok;"],[0,"&Emacr;"],[0,"&emacr;"],[2,"&Edot;"],[0,"&edot;"],[0,"&Eogon;"],[0,"&eogon;"],[0,"&Ecaron;"],[0,"&ecaron;"],[0,"&Gcirc;"],[0,"&gcirc;"],[0,"&Gbreve;"],[0,"&gbreve;"],[0,"&Gdot;"],[0,"&gdot;"],[0,"&Gcedil;"],[1,"&Hcirc;"],[0,"&hcirc;"],[0,"&Hstrok;"],[0,"&hstrok;"],[0,"&Itilde;"],[0,"&itilde;"],[0,"&Imacr;"],[0,"&imacr;"],[2,"&Iogon;"],[0,"&iogon;"],[0,"&Idot;"],[0,"&imath;"],[0,"&IJlig;"],[0,"&ijlig;"],[0,"&Jcirc;"],[0,"&jcirc;"],[0,"&Kcedil;"],[0,"&kcedil;"],[0,"&kgreen;"],[0,"&Lacute;"],[0,"&lacute;"],[0,"&Lcedil;"],[0,"&lcedil;"],[0,"&Lcaron;"],[0,"&lcaron;"],[0,"&Lmidot;"],[0,"&lmidot;"],[0,"&Lstrok;"],[0,"&lstrok;"],[0,"&Nacute;"],[0,"&nacute;"],[0,"&Ncedil;"],[0,"&ncedil;"],[0,"&Ncaron;"],[0,"&ncaron;"],[0,"&napos;"],[0,"&ENG;"],[0,"&eng;"],[0,"&Omacr;"],[0,"&omacr;"],[2,"&Odblac;"],[0,"&odblac;"],[0,"&OElig;"],[0,"&oelig;"],[0,"&Racute;"],[0,"&racute;"],[0,"&Rcedil;"],[0,"&rcedil;"],[0,"&Rcaron;"],[0,"&rcaron;"],[0,"&Sacute;"],[0,"&sacute;"],[0,"&Scirc;"],[0,"&scirc;"],[0,"&Scedil;"],[0,"&scedil;"],[0,"&Scaron;"],[0,"&scaron;"],[0,"&Tcedil;"],[0,"&tcedil;"],[0,"&Tcaron;"],[0,"&tcaron;"],[0,"&Tstrok;"],[0,"&tstrok;"],[0,"&Utilde;"],[0,"&utilde;"],[0,"&Umacr;"],[0,"&umacr;"],[0,"&Ubreve;"],[0,"&ubreve;"],[0,"&Uring;"],[0,"&uring;"],[0,"&Udblac;"],[0,"&udblac;"],[0,"&Uogon;"],[0,"&uogon;"],[0,"&Wcirc;"],[0,"&wcirc;"],[0,"&Ycirc;"],[0,"&ycirc;"],[0,"&Yuml;"],[0,"&Zacute;"],[0,"&zacute;"],[0,"&Zdot;"],[0,"&zdot;"],[0,"&Zcaron;"],[0,"&zcaron;"],[19,"&fnof;"],[34,"&imped;"],[63,"&gacute;"],[65,"&jmath;"],[142,"&circ;"],[0,"&caron;"],[16,"&breve;"],[0,"&DiacriticalDot;"],[0,"&ring;"],[0,"&ogon;"],[0,"&DiacriticalTilde;"],[0,"&dblac;"],[51,"&DownBreve;"],[127,"&Alpha;"],[0,"&Beta;"],[0,"&Gamma;"],[0,"&Delta;"],[0,"&Epsilon;"],[0,"&Zeta;"],[0,"&Eta;"],[0,"&Theta;"],[0,"&Iota;"],[0,"&Kappa;"],[0,"&Lambda;"],[0,"&Mu;"],[0,"&Nu;"],[0,"&Xi;"],[0,"&Omicron;"],[0,"&Pi;"],[0,"&Rho;"],[1,"&Sigma;"],[0,"&Tau;"],[0,"&Upsilon;"],[0,"&Phi;"],[0,"&Chi;"],[0,"&Psi;"],[0,"&ohm;"],[7,"&alpha;"],[0,"&beta;"],[0,"&gamma;"],[0,"&delta;"],[0,"&epsi;"],[0,"&zeta;"],[0,"&eta;"],[0,"&theta;"],[0,"&iota;"],[0,"&kappa;"],[0,"&lambda;"],[0,"&mu;"],[0,"&nu;"],[0,"&xi;"],[0,"&omicron;"],[0,"&pi;"],[0,"&rho;"],[0,"&sigmaf;"],[0,"&sigma;"],[0,"&tau;"],[0,"&upsi;"],[0,"&phi;"],[0,"&chi;"],[0,"&psi;"],[0,"&omega;"],[7,"&thetasym;"],[0,"&Upsi;"],[2,"&phiv;"],[0,"&piv;"],[5,"&Gammad;"],[0,"&digamma;"],[18,"&kappav;"],[0,"&rhov;"],[3,"&epsiv;"],[0,"&backepsilon;"],[10,"&IOcy;"],[0,"&DJcy;"],[0,"&GJcy;"],[0,"&Jukcy;"],[0,"&DScy;"],[0,"&Iukcy;"],[0,"&YIcy;"],[0,"&Jsercy;"],[0,"&LJcy;"],[0,"&NJcy;"],[0,"&TSHcy;"],[0,"&KJcy;"],[1,"&Ubrcy;"],[0,"&DZcy;"],[0,"&Acy;"],[0,"&Bcy;"],[0,"&Vcy;"],[0,"&Gcy;"],[0,"&Dcy;"],[0,"&IEcy;"],[0,"&ZHcy;"],[0,"&Zcy;"],[0,"&Icy;"],[0,"&Jcy;"],[0,"&Kcy;"],[0,"&Lcy;"],[0,"&Mcy;"],[0,"&Ncy;"],[0,"&Ocy;"],[0,"&Pcy;"],[0,"&Rcy;"],[0,"&Scy;"],[0,"&Tcy;"],[0,"&Ucy;"],[0,"&Fcy;"],[0,"&KHcy;"],[0,"&TScy;"],[0,"&CHcy;"],[0,"&SHcy;"],[0,"&SHCHcy;"],[0,"&HARDcy;"],[0,"&Ycy;"],[0,"&SOFTcy;"],[0,"&Ecy;"],[0,"&YUcy;"],[0,"&YAcy;"],[0,"&acy;"],[0,"&bcy;"],[0,"&vcy;"],[0,"&gcy;"],[0,"&dcy;"],[0,"&iecy;"],[0,"&zhcy;"],[0,"&zcy;"],[0,"&icy;"],[0,"&jcy;"],[0,"&kcy;"],[0,"&lcy;"],[0,"&mcy;"],[0,"&ncy;"],[0,"&ocy;"],[0,"&pcy;"],[0,"&rcy;"],[0,"&scy;"],[0,"&tcy;"],[0,"&ucy;"],[0,"&fcy;"],[0,"&khcy;"],[0,"&tscy;"],[0,"&chcy;"],[0,"&shcy;"],[0,"&shchcy;"],[0,"&hardcy;"],[0,"&ycy;"],[0,"&softcy;"],[0,"&ecy;"],[0,"&yucy;"],[0,"&yacy;"],[1,"&iocy;"],[0,"&djcy;"],[0,"&gjcy;"],[0,"&jukcy;"],[0,"&dscy;"],[0,"&iukcy;"],[0,"&yicy;"],[0,"&jsercy;"],[0,"&ljcy;"],[0,"&njcy;"],[0,"&tshcy;"],[0,"&kjcy;"],[1,"&ubrcy;"],[0,"&dzcy;"],[7074,"&ensp;"],[0,"&emsp;"],[0,"&emsp13;"],[0,"&emsp14;"],[1,"&numsp;"],[0,"&puncsp;"],[0,"&ThinSpace;"],[0,"&hairsp;"],[0,"&NegativeMediumSpace;"],[0,"&zwnj;"],[0,"&zwj;"],[0,"&lrm;"],[0,"&rlm;"],[0,"&dash;"],[2,"&ndash;"],[0,"&mdash;"],[0,"&horbar;"],[0,"&Verbar;"],[1,"&lsquo;"],[0,"&CloseCurlyQuote;"],[0,"&lsquor;"],[1,"&ldquo;"],[0,"&CloseCurlyDoubleQuote;"],[0,"&bdquo;"],[1,"&dagger;"],[0,"&Dagger;"],[0,"&bull;"],[2,"&nldr;"],[0,"&hellip;"],[9,"&permil;"],[0,"&pertenk;"],[0,"&prime;"],[0,"&Prime;"],[0,"&tprime;"],[0,"&backprime;"],[3,"&lsaquo;"],[0,"&rsaquo;"],[3,"&oline;"],[2,"&caret;"],[1,"&hybull;"],[0,"&frasl;"],[10,"&bsemi;"],[7,"&qprime;"],[7,{v:"&MediumSpace;",n:8202,o:"&ThickSpace;"}],[0,"&NoBreak;"],[0,"&af;"],[0,"&InvisibleTimes;"],[0,"&ic;"],[72,"&euro;"],[46,"&tdot;"],[0,"&DotDot;"],[37,"&complexes;"],[2,"&incare;"],[4,"&gscr;"],[0,"&hamilt;"],[0,"&Hfr;"],[0,"&Hopf;"],[0,"&planckh;"],[0,"&hbar;"],[0,"&imagline;"],[0,"&Ifr;"],[0,"&lagran;"],[0,"&ell;"],[1,"&naturals;"],[0,"&numero;"],[0,"&copysr;"],[0,"&weierp;"],[0,"&Popf;"],[0,"&Qopf;"],[0,"&realine;"],[0,"&real;"],[0,"&reals;"],[0,"&rx;"],[3,"&trade;"],[1,"&integers;"],[2,"&mho;"],[0,"&zeetrf;"],[0,"&iiota;"],[2,"&bernou;"],[0,"&Cayleys;"],[1,"&escr;"],[0,"&Escr;"],[0,"&Fouriertrf;"],[1,"&Mellintrf;"],[0,"&order;"],[0,"&alefsym;"],[0,"&beth;"],[0,"&gimel;"],[0,"&daleth;"],[12,"&CapitalDifferentialD;"],[0,"&dd;"],[0,"&ee;"],[0,"&ii;"],[10,"&frac13;"],[0,"&frac23;"],[0,"&frac15;"],[0,"&frac25;"],[0,"&frac35;"],[0,"&frac45;"],[0,"&frac16;"],[0,"&frac56;"],[0,"&frac18;"],[0,"&frac38;"],[0,"&frac58;"],[0,"&frac78;"],[49,"&larr;"],[0,"&ShortUpArrow;"],[0,"&rarr;"],[0,"&darr;"],[0,"&harr;"],[0,"&updownarrow;"],[0,"&nwarr;"],[0,"&nearr;"],[0,"&LowerRightArrow;"],[0,"&LowerLeftArrow;"],[0,"&nlarr;"],[0,"&nrarr;"],[1,{v:"&rarrw;",n:824,o:"&nrarrw;"}],[0,"&Larr;"],[0,"&Uarr;"],[0,"&Rarr;"],[0,"&Darr;"],[0,"&larrtl;"],[0,"&rarrtl;"],[0,"&LeftTeeArrow;"],[0,"&mapstoup;"],[0,"&map;"],[0,"&DownTeeArrow;"],[1,"&hookleftarrow;"],[0,"&hookrightarrow;"],[0,"&larrlp;"],[0,"&looparrowright;"],[0,"&harrw;"],[0,"&nharr;"],[1,"&lsh;"],[0,"&rsh;"],[0,"&ldsh;"],[0,"&rdsh;"],[1,"&crarr;"],[0,"&cularr;"],[0,"&curarr;"],[2,"&circlearrowleft;"],[0,"&circlearrowright;"],[0,"&leftharpoonup;"],[0,"&DownLeftVector;"],[0,"&RightUpVector;"],[0,"&LeftUpVector;"],[0,"&rharu;"],[0,"&DownRightVector;"],[0,"&dharr;"],[0,"&dharl;"],[0,"&RightArrowLeftArrow;"],[0,"&udarr;"],[0,"&LeftArrowRightArrow;"],[0,"&leftleftarrows;"],[0,"&upuparrows;"],[0,"&rightrightarrows;"],[0,"&ddarr;"],[0,"&leftrightharpoons;"],[0,"&Equilibrium;"],[0,"&nlArr;"],[0,"&nhArr;"],[0,"&nrArr;"],[0,"&DoubleLeftArrow;"],[0,"&DoubleUpArrow;"],[0,"&DoubleRightArrow;"],[0,"&dArr;"],[0,"&DoubleLeftRightArrow;"],[0,"&DoubleUpDownArrow;"],[0,"&nwArr;"],[0,"&neArr;"],[0,"&seArr;"],[0,"&swArr;"],[0,"&lAarr;"],[0,"&rAarr;"],[1,"&zigrarr;"],[6,"&larrb;"],[0,"&rarrb;"],[15,"&DownArrowUpArrow;"],[7,"&loarr;"],[0,"&roarr;"],[0,"&hoarr;"],[0,"&forall;"],[0,"&comp;"],[0,{v:"&part;",n:824,o:"&npart;"}],[0,"&exist;"],[0,"&nexist;"],[0,"&empty;"],[1,"&Del;"],[0,"&Element;"],[0,"&NotElement;"],[1,"&ni;"],[0,"&notni;"],[2,"&prod;"],[0,"&coprod;"],[0,"&sum;"],[0,"&minus;"],[0,"&MinusPlus;"],[0,"&dotplus;"],[1,"&Backslash;"],[0,"&lowast;"],[0,"&compfn;"],[1,"&radic;"],[2,"&prop;"],[0,"&infin;"],[0,"&angrt;"],[0,{v:"&ang;",n:8402,o:"&nang;"}],[0,"&angmsd;"],[0,"&angsph;"],[0,"&mid;"],[0,"&nmid;"],[0,"&DoubleVerticalBar;"],[0,"&NotDoubleVerticalBar;"],[0,"&and;"],[0,"&or;"],[0,{v:"&cap;",n:65024,o:"&caps;"}],[0,{v:"&cup;",n:65024,o:"&cups;"}],[0,"&int;"],[0,"&Int;"],[0,"&iiint;"],[0,"&conint;"],[0,"&Conint;"],[0,"&Cconint;"],[0,"&cwint;"],[0,"&ClockwiseContourIntegral;"],[0,"&awconint;"],[0,"&there4;"],[0,"&becaus;"],[0,"&ratio;"],[0,"&Colon;"],[0,"&dotminus;"],[1,"&mDDot;"],[0,"&homtht;"],[0,{v:"&sim;",n:8402,o:"&nvsim;"}],[0,{v:"&backsim;",n:817,o:"&race;"}],[0,{v:"&ac;",n:819,o:"&acE;"}],[0,"&acd;"],[0,"&VerticalTilde;"],[0,"&NotTilde;"],[0,{v:"&eqsim;",n:824,o:"&nesim;"}],[0,"&sime;"],[0,"&NotTildeEqual;"],[0,"&cong;"],[0,"&simne;"],[0,"&ncong;"],[0,"&ap;"],[0,"&nap;"],[0,"&ape;"],[0,{v:"&apid;",n:824,o:"&napid;"}],[0,"&backcong;"],[0,{v:"&asympeq;",n:8402,o:"&nvap;"}],[0,{v:"&bump;",n:824,o:"&nbump;"}],[0,{v:"&bumpe;",n:824,o:"&nbumpe;"}],[0,{v:"&doteq;",n:824,o:"&nedot;"}],[0,"&doteqdot;"],[0,"&efDot;"],[0,"&erDot;"],[0,"&Assign;"],[0,"&ecolon;"],[0,"&ecir;"],[0,"&circeq;"],[1,"&wedgeq;"],[0,"&veeeq;"],[1,"&triangleq;"],[2,"&equest;"],[0,"&ne;"],[0,{v:"&Congruent;",n:8421,o:"&bnequiv;"}],[0,"&nequiv;"],[1,{v:"&le;",n:8402,o:"&nvle;"}],[0,{v:"&ge;",n:8402,o:"&nvge;"}],[0,{v:"&lE;",n:824,o:"&nlE;"}],[0,{v:"&gE;",n:824,o:"&ngE;"}],[0,{v:"&lnE;",n:65024,o:"&lvertneqq;"}],[0,{v:"&gnE;",n:65024,o:"&gvertneqq;"}],[0,{v:"&ll;",n:new Map(hi([[824,"&nLtv;"],[7577,"&nLt;"]]))}],[0,{v:"&gg;",n:new Map(hi([[824,"&nGtv;"],[7577,"&nGt;"]]))}],[0,"&between;"],[0,"&NotCupCap;"],[0,"&nless;"],[0,"&ngt;"],[0,"&nle;"],[0,"&nge;"],[0,"&lesssim;"],[0,"&GreaterTilde;"],[0,"&nlsim;"],[0,"&ngsim;"],[0,"&LessGreater;"],[0,"&gl;"],[0,"&NotLessGreater;"],[0,"&NotGreaterLess;"],[0,"&pr;"],[0,"&sc;"],[0,"&prcue;"],[0,"&sccue;"],[0,"&PrecedesTilde;"],[0,{v:"&scsim;",n:824,o:"&NotSucceedsTilde;"}],[0,"&NotPrecedes;"],[0,"&NotSucceeds;"],[0,{v:"&sub;",n:8402,o:"&NotSubset;"}],[0,{v:"&sup;",n:8402,o:"&NotSuperset;"}],[0,"&nsub;"],[0,"&nsup;"],[0,"&sube;"],[0,"&supe;"],[0,"&NotSubsetEqual;"],[0,"&NotSupersetEqual;"],[0,{v:"&subne;",n:65024,o:"&varsubsetneq;"}],[0,{v:"&supne;",n:65024,o:"&varsupsetneq;"}],[1,"&cupdot;"],[0,"&UnionPlus;"],[0,{v:"&sqsub;",n:824,o:"&NotSquareSubset;"}],[0,{v:"&sqsup;",n:824,o:"&NotSquareSuperset;"}],[0,"&sqsube;"],[0,"&sqsupe;"],[0,{v:"&sqcap;",n:65024,o:"&sqcaps;"}],[0,{v:"&sqcup;",n:65024,o:"&sqcups;"}],[0,"&CirclePlus;"],[0,"&CircleMinus;"],[0,"&CircleTimes;"],[0,"&osol;"],[0,"&CircleDot;"],[0,"&circledcirc;"],[0,"&circledast;"],[1,"&circleddash;"],[0,"&boxplus;"],[0,"&boxminus;"],[0,"&boxtimes;"],[0,"&dotsquare;"],[0,"&RightTee;"],[0,"&dashv;"],[0,"&DownTee;"],[0,"&bot;"],[1,"&models;"],[0,"&DoubleRightTee;"],[0,"&Vdash;"],[0,"&Vvdash;"],[0,"&VDash;"],[0,"&nvdash;"],[0,"&nvDash;"],[0,"&nVdash;"],[0,"&nVDash;"],[0,"&prurel;"],[1,"&LeftTriangle;"],[0,"&RightTriangle;"],[0,{v:"&LeftTriangleEqual;",n:8402,o:"&nvltrie;"}],[0,{v:"&RightTriangleEqual;",n:8402,o:"&nvrtrie;"}],[0,"&origof;"],[0,"&imof;"],[0,"&multimap;"],[0,"&hercon;"],[0,"&intcal;"],[0,"&veebar;"],[1,"&barvee;"],[0,"&angrtvb;"],[0,"&lrtri;"],[0,"&bigwedge;"],[0,"&bigvee;"],[0,"&bigcap;"],[0,"&bigcup;"],[0,"&diam;"],[0,"&sdot;"],[0,"&sstarf;"],[0,"&divideontimes;"],[0,"&bowtie;"],[0,"&ltimes;"],[0,"&rtimes;"],[0,"&leftthreetimes;"],[0,"&rightthreetimes;"],[0,"&backsimeq;"],[0,"&curlyvee;"],[0,"&curlywedge;"],[0,"&Sub;"],[0,"&Sup;"],[0,"&Cap;"],[0,"&Cup;"],[0,"&fork;"],[0,"&epar;"],[0,"&lessdot;"],[0,"&gtdot;"],[0,{v:"&Ll;",n:824,o:"&nLl;"}],[0,{v:"&Gg;",n:824,o:"&nGg;"}],[0,{v:"&leg;",n:65024,o:"&lesg;"}],[0,{v:"&gel;",n:65024,o:"&gesl;"}],[2,"&cuepr;"],[0,"&cuesc;"],[0,"&NotPrecedesSlantEqual;"],[0,"&NotSucceedsSlantEqual;"],[0,"&NotSquareSubsetEqual;"],[0,"&NotSquareSupersetEqual;"],[2,"&lnsim;"],[0,"&gnsim;"],[0,"&precnsim;"],[0,"&scnsim;"],[0,"&nltri;"],[0,"&NotRightTriangle;"],[0,"&nltrie;"],[0,"&NotRightTriangleEqual;"],[0,"&vellip;"],[0,"&ctdot;"],[0,"&utdot;"],[0,"&dtdot;"],[0,"&disin;"],[0,"&isinsv;"],[0,"&isins;"],[0,{v:"&isindot;",n:824,o:"&notindot;"}],[0,"&notinvc;"],[0,"&notinvb;"],[1,{v:"&isinE;",n:824,o:"&notinE;"}],[0,"&nisd;"],[0,"&xnis;"],[0,"&nis;"],[0,"&notnivc;"],[0,"&notnivb;"],[6,"&barwed;"],[0,"&Barwed;"],[1,"&lceil;"],[0,"&rceil;"],[0,"&LeftFloor;"],[0,"&rfloor;"],[0,"&drcrop;"],[0,"&dlcrop;"],[0,"&urcrop;"],[0,"&ulcrop;"],[0,"&bnot;"],[1,"&profline;"],[0,"&profsurf;"],[1,"&telrec;"],[0,"&target;"],[5,"&ulcorn;"],[0,"&urcorn;"],[0,"&dlcorn;"],[0,"&drcorn;"],[2,"&frown;"],[0,"&smile;"],[9,"&cylcty;"],[0,"&profalar;"],[7,"&topbot;"],[6,"&ovbar;"],[1,"&solbar;"],[60,"&angzarr;"],[51,"&lmoustache;"],[0,"&rmoustache;"],[2,"&OverBracket;"],[0,"&bbrk;"],[0,"&bbrktbrk;"],[37,"&OverParenthesis;"],[0,"&UnderParenthesis;"],[0,"&OverBrace;"],[0,"&UnderBrace;"],[2,"&trpezium;"],[4,"&elinters;"],[59,"&blank;"],[164,"&circledS;"],[55,"&boxh;"],[1,"&boxv;"],[9,"&boxdr;"],[3,"&boxdl;"],[3,"&boxur;"],[3,"&boxul;"],[3,"&boxvr;"],[7,"&boxvl;"],[7,"&boxhd;"],[7,"&boxhu;"],[7,"&boxvh;"],[19,"&boxH;"],[0,"&boxV;"],[0,"&boxdR;"],[0,"&boxDr;"],[0,"&boxDR;"],[0,"&boxdL;"],[0,"&boxDl;"],[0,"&boxDL;"],[0,"&boxuR;"],[0,"&boxUr;"],[0,"&boxUR;"],[0,"&boxuL;"],[0,"&boxUl;"],[0,"&boxUL;"],[0,"&boxvR;"],[0,"&boxVr;"],[0,"&boxVR;"],[0,"&boxvL;"],[0,"&boxVl;"],[0,"&boxVL;"],[0,"&boxHd;"],[0,"&boxhD;"],[0,"&boxHD;"],[0,"&boxHu;"],[0,"&boxhU;"],[0,"&boxHU;"],[0,"&boxvH;"],[0,"&boxVh;"],[0,"&boxVH;"],[19,"&uhblk;"],[3,"&lhblk;"],[3,"&block;"],[8,"&blk14;"],[0,"&blk12;"],[0,"&blk34;"],[13,"&square;"],[8,"&blacksquare;"],[0,"&EmptyVerySmallSquare;"],[1,"&rect;"],[0,"&marker;"],[2,"&fltns;"],[1,"&bigtriangleup;"],[0,"&blacktriangle;"],[0,"&triangle;"],[2,"&blacktriangleright;"],[0,"&rtri;"],[3,"&bigtriangledown;"],[0,"&blacktriangledown;"],[0,"&dtri;"],[2,"&blacktriangleleft;"],[0,"&ltri;"],[6,"&loz;"],[0,"&cir;"],[32,"&tridot;"],[2,"&bigcirc;"],[8,"&ultri;"],[0,"&urtri;"],[0,"&lltri;"],[0,"&EmptySmallSquare;"],[0,"&FilledSmallSquare;"],[8,"&bigstar;"],[0,"&star;"],[7,"&phone;"],[49,"&female;"],[1,"&male;"],[29,"&spades;"],[2,"&clubs;"],[1,"&hearts;"],[0,"&diamondsuit;"],[3,"&sung;"],[2,"&flat;"],[0,"&natural;"],[0,"&sharp;"],[163,"&check;"],[3,"&cross;"],[8,"&malt;"],[21,"&sext;"],[33,"&VerticalSeparator;"],[25,"&lbbrk;"],[0,"&rbbrk;"],[84,"&bsolhsub;"],[0,"&suphsol;"],[28,"&LeftDoubleBracket;"],[0,"&RightDoubleBracket;"],[0,"&lang;"],[0,"&rang;"],[0,"&Lang;"],[0,"&Rang;"],[0,"&loang;"],[0,"&roang;"],[7,"&longleftarrow;"],[0,"&longrightarrow;"],[0,"&longleftrightarrow;"],[0,"&DoubleLongLeftArrow;"],[0,"&DoubleLongRightArrow;"],[0,"&DoubleLongLeftRightArrow;"],[1,"&longmapsto;"],[2,"&dzigrarr;"],[258,"&nvlArr;"],[0,"&nvrArr;"],[0,"&nvHarr;"],[0,"&Map;"],[6,"&lbarr;"],[0,"&bkarow;"],[0,"&lBarr;"],[0,"&dbkarow;"],[0,"&drbkarow;"],[0,"&DDotrahd;"],[0,"&UpArrowBar;"],[0,"&DownArrowBar;"],[2,"&Rarrtl;"],[2,"&latail;"],[0,"&ratail;"],[0,"&lAtail;"],[0,"&rAtail;"],[0,"&larrfs;"],[0,"&rarrfs;"],[0,"&larrbfs;"],[0,"&rarrbfs;"],[2,"&nwarhk;"],[0,"&nearhk;"],[0,"&hksearow;"],[0,"&hkswarow;"],[0,"&nwnear;"],[0,"&nesear;"],[0,"&seswar;"],[0,"&swnwar;"],[8,{v:"&rarrc;",n:824,o:"&nrarrc;"}],[1,"&cudarrr;"],[0,"&ldca;"],[0,"&rdca;"],[0,"&cudarrl;"],[0,"&larrpl;"],[2,"&curarrm;"],[0,"&cularrp;"],[7,"&rarrpl;"],[2,"&harrcir;"],[0,"&Uarrocir;"],[0,"&lurdshar;"],[0,"&ldrushar;"],[2,"&LeftRightVector;"],[0,"&RightUpDownVector;"],[0,"&DownLeftRightVector;"],[0,"&LeftUpDownVector;"],[0,"&LeftVectorBar;"],[0,"&RightVectorBar;"],[0,"&RightUpVectorBar;"],[0,"&RightDownVectorBar;"],[0,"&DownLeftVectorBar;"],[0,"&DownRightVectorBar;"],[0,"&LeftUpVectorBar;"],[0,"&LeftDownVectorBar;"],[0,"&LeftTeeVector;"],[0,"&RightTeeVector;"],[0,"&RightUpTeeVector;"],[0,"&RightDownTeeVector;"],[0,"&DownLeftTeeVector;"],[0,"&DownRightTeeVector;"],[0,"&LeftUpTeeVector;"],[0,"&LeftDownTeeVector;"],[0,"&lHar;"],[0,"&uHar;"],[0,"&rHar;"],[0,"&dHar;"],[0,"&luruhar;"],[0,"&ldrdhar;"],[0,"&ruluhar;"],[0,"&rdldhar;"],[0,"&lharul;"],[0,"&llhard;"],[0,"&rharul;"],[0,"&lrhard;"],[0,"&udhar;"],[0,"&duhar;"],[0,"&RoundImplies;"],[0,"&erarr;"],[0,"&simrarr;"],[0,"&larrsim;"],[0,"&rarrsim;"],[0,"&rarrap;"],[0,"&ltlarr;"],[1,"&gtrarr;"],[0,"&subrarr;"],[1,"&suplarr;"],[0,"&lfisht;"],[0,"&rfisht;"],[0,"&ufisht;"],[0,"&dfisht;"],[5,"&lopar;"],[0,"&ropar;"],[4,"&lbrke;"],[0,"&rbrke;"],[0,"&lbrkslu;"],[0,"&rbrksld;"],[0,"&lbrksld;"],[0,"&rbrkslu;"],[0,"&langd;"],[0,"&rangd;"],[0,"&lparlt;"],[0,"&rpargt;"],[0,"&gtlPar;"],[0,"&ltrPar;"],[3,"&vzigzag;"],[1,"&vangrt;"],[0,"&angrtvbd;"],[6,"&ange;"],[0,"&range;"],[0,"&dwangle;"],[0,"&uwangle;"],[0,"&angmsdaa;"],[0,"&angmsdab;"],[0,"&angmsdac;"],[0,"&angmsdad;"],[0,"&angmsdae;"],[0,"&angmsdaf;"],[0,"&angmsdag;"],[0,"&angmsdah;"],[0,"&bemptyv;"],[0,"&demptyv;"],[0,"&cemptyv;"],[0,"&raemptyv;"],[0,"&laemptyv;"],[0,"&ohbar;"],[0,"&omid;"],[0,"&opar;"],[1,"&operp;"],[1,"&olcross;"],[0,"&odsold;"],[1,"&olcir;"],[0,"&ofcir;"],[0,"&olt;"],[0,"&ogt;"],[0,"&cirscir;"],[0,"&cirE;"],[0,"&solb;"],[0,"&bsolb;"],[3,"&boxbox;"],[3,"&trisb;"],[0,"&rtriltri;"],[0,{v:"&LeftTriangleBar;",n:824,o:"&NotLeftTriangleBar;"}],[0,{v:"&RightTriangleBar;",n:824,o:"&NotRightTriangleBar;"}],[11,"&iinfin;"],[0,"&infintie;"],[0,"&nvinfin;"],[4,"&eparsl;"],[0,"&smeparsl;"],[0,"&eqvparsl;"],[5,"&blacklozenge;"],[8,"&RuleDelayed;"],[1,"&dsol;"],[9,"&bigodot;"],[0,"&bigoplus;"],[0,"&bigotimes;"],[1,"&biguplus;"],[1,"&bigsqcup;"],[5,"&iiiint;"],[0,"&fpartint;"],[2,"&cirfnint;"],[0,"&awint;"],[0,"&rppolint;"],[0,"&scpolint;"],[0,"&npolint;"],[0,"&pointint;"],[0,"&quatint;"],[0,"&intlarhk;"],[10,"&pluscir;"],[0,"&plusacir;"],[0,"&simplus;"],[0,"&plusdu;"],[0,"&plussim;"],[0,"&plustwo;"],[1,"&mcomma;"],[0,"&minusdu;"],[2,"&loplus;"],[0,"&roplus;"],[0,"&Cross;"],[0,"&timesd;"],[0,"&timesbar;"],[1,"&smashp;"],[0,"&lotimes;"],[0,"&rotimes;"],[0,"&otimesas;"],[0,"&Otimes;"],[0,"&odiv;"],[0,"&triplus;"],[0,"&triminus;"],[0,"&tritime;"],[0,"&intprod;"],[2,"&amalg;"],[0,"&capdot;"],[1,"&ncup;"],[0,"&ncap;"],[0,"&capand;"],[0,"&cupor;"],[0,"&cupcap;"],[0,"&capcup;"],[0,"&cupbrcap;"],[0,"&capbrcup;"],[0,"&cupcup;"],[0,"&capcap;"],[0,"&ccups;"],[0,"&ccaps;"],[2,"&ccupssm;"],[2,"&And;"],[0,"&Or;"],[0,"&andand;"],[0,"&oror;"],[0,"&orslope;"],[0,"&andslope;"],[1,"&andv;"],[0,"&orv;"],[0,"&andd;"],[0,"&ord;"],[1,"&wedbar;"],[6,"&sdote;"],[3,"&simdot;"],[2,{v:"&congdot;",n:824,o:"&ncongdot;"}],[0,"&easter;"],[0,"&apacir;"],[0,{v:"&apE;",n:824,o:"&napE;"}],[0,"&eplus;"],[0,"&pluse;"],[0,"&Esim;"],[0,"&Colone;"],[0,"&Equal;"],[1,"&ddotseq;"],[0,"&equivDD;"],[0,"&ltcir;"],[0,"&gtcir;"],[0,"&ltquest;"],[0,"&gtquest;"],[0,{v:"&leqslant;",n:824,o:"&nleqslant;"}],[0,{v:"&geqslant;",n:824,o:"&ngeqslant;"}],[0,"&lesdot;"],[0,"&gesdot;"],[0,"&lesdoto;"],[0,"&gesdoto;"],[0,"&lesdotor;"],[0,"&gesdotol;"],[0,"&lap;"],[0,"&gap;"],[0,"&lne;"],[0,"&gne;"],[0,"&lnap;"],[0,"&gnap;"],[0,"&lEg;"],[0,"&gEl;"],[0,"&lsime;"],[0,"&gsime;"],[0,"&lsimg;"],[0,"&gsiml;"],[0,"&lgE;"],[0,"&glE;"],[0,"&lesges;"],[0,"&gesles;"],[0,"&els;"],[0,"&egs;"],[0,"&elsdot;"],[0,"&egsdot;"],[0,"&el;"],[0,"&eg;"],[2,"&siml;"],[0,"&simg;"],[0,"&simlE;"],[0,"&simgE;"],[0,{v:"&LessLess;",n:824,o:"&NotNestedLessLess;"}],[0,{v:"&GreaterGreater;",n:824,o:"&NotNestedGreaterGreater;"}],[1,"&glj;"],[0,"&gla;"],[0,"&ltcc;"],[0,"&gtcc;"],[0,"&lescc;"],[0,"&gescc;"],[0,"&smt;"],[0,"&lat;"],[0,{v:"&smte;",n:65024,o:"&smtes;"}],[0,{v:"&late;",n:65024,o:"&lates;"}],[0,"&bumpE;"],[0,{v:"&PrecedesEqual;",n:824,o:"&NotPrecedesEqual;"}],[0,{v:"&sce;",n:824,o:"&NotSucceedsEqual;"}],[2,"&prE;"],[0,"&scE;"],[0,"&precneqq;"],[0,"&scnE;"],[0,"&prap;"],[0,"&scap;"],[0,"&precnapprox;"],[0,"&scnap;"],[0,"&Pr;"],[0,"&Sc;"],[0,"&subdot;"],[0,"&supdot;"],[0,"&subplus;"],[0,"&supplus;"],[0,"&submult;"],[0,"&supmult;"],[0,"&subedot;"],[0,"&supedot;"],[0,{v:"&subE;",n:824,o:"&nsubE;"}],[0,{v:"&supE;",n:824,o:"&nsupE;"}],[0,"&subsim;"],[0,"&supsim;"],[2,{v:"&subnE;",n:65024,o:"&varsubsetneqq;"}],[0,{v:"&supnE;",n:65024,o:"&varsupsetneqq;"}],[2,"&csub;"],[0,"&csup;"],[0,"&csube;"],[0,"&csupe;"],[0,"&subsup;"],[0,"&supsub;"],[0,"&subsub;"],[0,"&supsup;"],[0,"&suphsub;"],[0,"&supdsub;"],[0,"&forkv;"],[0,"&topfork;"],[0,"&mlcp;"],[8,"&Dashv;"],[1,"&Vdashl;"],[0,"&Barv;"],[0,"&vBar;"],[0,"&vBarv;"],[1,"&Vbar;"],[0,"&Not;"],[0,"&bNot;"],[0,"&rnmid;"],[0,"&cirmid;"],[0,"&midcir;"],[0,"&topcir;"],[0,"&nhpar;"],[0,"&parsim;"],[9,{v:"&parsl;",n:8421,o:"&nparsl;"}],[44343,{n:new Map(hi([[56476,"&Ascr;"],[1,"&Cscr;"],[0,"&Dscr;"],[2,"&Gscr;"],[2,"&Jscr;"],[0,"&Kscr;"],[2,"&Nscr;"],[0,"&Oscr;"],[0,"&Pscr;"],[0,"&Qscr;"],[1,"&Sscr;"],[0,"&Tscr;"],[0,"&Uscr;"],[0,"&Vscr;"],[0,"&Wscr;"],[0,"&Xscr;"],[0,"&Yscr;"],[0,"&Zscr;"],[0,"&ascr;"],[0,"&bscr;"],[0,"&cscr;"],[0,"&dscr;"],[1,"&fscr;"],[1,"&hscr;"],[0,"&iscr;"],[0,"&jscr;"],[0,"&kscr;"],[0,"&lscr;"],[0,"&mscr;"],[0,"&nscr;"],[1,"&pscr;"],[0,"&qscr;"],[0,"&rscr;"],[0,"&sscr;"],[0,"&tscr;"],[0,"&uscr;"],[0,"&vscr;"],[0,"&wscr;"],[0,"&xscr;"],[0,"&yscr;"],[0,"&zscr;"],[52,"&Afr;"],[0,"&Bfr;"],[1,"&Dfr;"],[0,"&Efr;"],[0,"&Ffr;"],[0,"&Gfr;"],[2,"&Jfr;"],[0,"&Kfr;"],[0,"&Lfr;"],[0,"&Mfr;"],[0,"&Nfr;"],[0,"&Ofr;"],[0,"&Pfr;"],[0,"&Qfr;"],[1,"&Sfr;"],[0,"&Tfr;"],[0,"&Ufr;"],[0,"&Vfr;"],[0,"&Wfr;"],[0,"&Xfr;"],[0,"&Yfr;"],[1,"&afr;"],[0,"&bfr;"],[0,"&cfr;"],[0,"&dfr;"],[0,"&efr;"],[0,"&ffr;"],[0,"&gfr;"],[0,"&hfr;"],[0,"&ifr;"],[0,"&jfr;"],[0,"&kfr;"],[0,"&lfr;"],[0,"&mfr;"],[0,"&nfr;"],[0,"&ofr;"],[0,"&pfr;"],[0,"&qfr;"],[0,"&rfr;"],[0,"&sfr;"],[0,"&tfr;"],[0,"&ufr;"],[0,"&vfr;"],[0,"&wfr;"],[0,"&xfr;"],[0,"&yfr;"],[0,"&zfr;"],[0,"&Aopf;"],[0,"&Bopf;"],[1,"&Dopf;"],[0,"&Eopf;"],[0,"&Fopf;"],[0,"&Gopf;"],[1,"&Iopf;"],[0,"&Jopf;"],[0,"&Kopf;"],[0,"&Lopf;"],[0,"&Mopf;"],[1,"&Oopf;"],[3,"&Sopf;"],[0,"&Topf;"],[0,"&Uopf;"],[0,"&Vopf;"],[0,"&Wopf;"],[0,"&Xopf;"],[0,"&Yopf;"],[1,"&aopf;"],[0,"&bopf;"],[0,"&copf;"],[0,"&dopf;"],[0,"&eopf;"],[0,"&fopf;"],[0,"&gopf;"],[0,"&hopf;"],[0,"&iopf;"],[0,"&jopf;"],[0,"&kopf;"],[0,"&lopf;"],[0,"&mopf;"],[0,"&nopf;"],[0,"&oopf;"],[0,"&popf;"],[0,"&qopf;"],[0,"&ropf;"],[0,"&sopf;"],[0,"&topf;"],[0,"&uopf;"],[0,"&vopf;"],[0,"&wopf;"],[0,"&xopf;"],[0,"&yopf;"],[0,"&zopf;"]]))}],[8906,"&fflig;"],[0,"&filig;"],[0,"&fllig;"],[0,"&ffilig;"],[0,"&ffllig;"]]));var Hx=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),jx=String.prototype.codePointAt!=null?(e,n)=>e.codePointAt(n):(e,n)=>(e.charCodeAt(n)&64512)===55296?(e.charCodeAt(n)-55296)*1024+e.charCodeAt(n+1)-56320+65536:e.charCodeAt(n);function B0(e,n){return function(a){let u,o=0,l="";for(;u=e.exec(a);)o!==u.index&&(l+=a.substring(o,u.index)),l+=n.get(u[0].charCodeAt(0)),o=u.index+1;return l+a.substring(o)}}var Bg=B0(/[&<>'"]/g,Hx),Hg=B0(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),jg=B0(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]]));var Vg;(function(e){e[e.XML=0]="XML",e[e.HTML=1]="HTML"})(Vg||(Vg={}));var Gg;(function(e){e[e.UTF8=0]="UTF8",e[e.ASCII=1]="ASCII",e[e.Extensive=2]="Extensive",e[e.Attribute=3]="Attribute",e[e.Text=4]="Text"})(Gg||(Gg={}));function Ix(e){return Object.prototype.toString.call(e)}function gi(e){return Ix(e)==="[object String]"}var Zx=Object.prototype.hasOwnProperty;function Yx(e,n){return Zx.call(e,n)}function eo(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(a){e[a]=t[a]})}}),e}function j0(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function bi(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function ml(e){if(e>65535){e-=65536;let n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}var Yg=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Qx=/&([a-z#][a-z0-9]{1,31});/gi,Xx=new RegExp(Yg.source+"|"+Qx.source,"gi"),Kx=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Jx(e,n){if(n.charCodeAt(0)===35&&Kx.test(n)){let a=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return bi(a)?ml(a):e}let t=wa(e);return t!==e?t:e}function Px(e){return e.indexOf("\\")<0?e:e.replace(Yg,"$1")}function jt(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Xx,function(n,t,a){return t||Jx(n,a)})}var Wx=/[&<>"]/,$x=/[&<>"]/g,ey={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function ny(e){return ey[e]}function Vt(e){return Wx.test(e)?e.replace($x,ny):e}var ty=/[.?*+^$[\]\\(){}|-]/g;function ay(e){return e.replace(ty,"\\$&")}function G(e){switch(e){case 9:case 32:return!0}return!1}function Pa(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Wa(e){return $u.test(e)||di.test(e)}function $a(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function eu(e){return e=e.trim().replace(/\s+/g," "),"\u1E9E".toLowerCase()==="\u1E7E"&&(e=e.replace(/ẞ/g,"\xDF")),e.toLowerCase().toUpperCase()}var uy={mdurl:si,ucmicro:L0};var Y0={};wl(Y0,{parseLinkDestination:()=>I0,parseLinkLabel:()=>G0,parseLinkTitle:()=>Z0});function G0(e,n,t){let a,u,o,l,r=e.posMax,i=e.pos;for(e.pos=n+1,a=1;e.pos<r;){if(o=e.src.charCodeAt(e.pos),o===93&&(a--,a===0)){u=!0;break}if(l=e.pos,e.md.inline.skipToken(e),o===91){if(l===e.pos-1)a++;else if(t)return e.pos=i,-1}}let s=-1;return u&&(s=e.pos),e.pos=i,s}function I0(e,n,t){let a,u=n,o={ok:!1,pos:0,str:""};if(e.charCodeAt(u)===60){for(u++;u<t;){if(a=e.charCodeAt(u),a===10||a===60)return o;if(a===62)return o.pos=u+1,o.str=jt(e.slice(n+1,u)),o.ok=!0,o;if(a===92&&u+1<t){u+=2;continue}u++}return o}let l=0;for(;u<t&&(a=e.charCodeAt(u),!(a===32||a<32||a===127));){if(a===92&&u+1<t){if(e.charCodeAt(u+1)===32)break;u+=2;continue}if(a===40&&(l++,l>32))return o;if(a===41){if(l===0)break;l--}u++}return n===u||l!==0||(o.str=jt(e.slice(n,u)),o.pos=u,o.ok=!0),o}function Z0(e,n,t,a){let u,o=n,l={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(a)l.str=a.str,l.marker=a.marker;else{if(o>=t)return l;let r=e.charCodeAt(o);if(r!==34&&r!==39&&r!==40)return l;n++,o++,r===40&&(r=41),l.marker=r}for(;o<t;){if(u=e.charCodeAt(o),u===l.marker)return l.pos=o+1,l.str+=jt(e.slice(n,o)),l.ok=!0,l;if(u===40&&l.marker===41)return l;u===92&&o+1<t&&o++,o++}return l.can_continue=!0,l.str+=jt(e.slice(n,o)),l}var dt={};dt.code_inline=function(e,n,t,a,u){let o=e[n];return"<code"+u.renderAttrs(o)+">"+Vt(o.content)+"</code>"};dt.code_block=function(e,n,t,a,u){let o=e[n];return"<pre"+u.renderAttrs(o)+"><code>"+Vt(e[n].content)+`</code></pre>
`};dt.fence=function(e,n,t,a,u){let o=e[n],l=o.info?jt(o.info).trim():"",r="",i="";if(l){let f=l.split(/(\s+)/g);r=f[0],i=f.slice(2).join("")}let s;if(t.highlight?s=t.highlight(o.content,r,i)||Vt(o.content):s=Vt(o.content),s.indexOf("<pre")===0)return s+`
`;if(l){let f=o.attrIndex("class"),m=o.attrs?o.attrs.slice():[];f<0?m.push(["class",t.langPrefix+r]):(m[f]=m[f].slice(),m[f][1]+=" "+t.langPrefix+r);let d={attrs:m};return`<pre><code${u.renderAttrs(d)}>${s}</code></pre>
`}return`<pre><code${u.renderAttrs(o)}>${s}</code></pre>
`};dt.image=function(e,n,t,a,u){let o=e[n];return o.attrs[o.attrIndex("alt")][1]=u.renderInlineAsText(o.children,t,a),u.renderToken(e,n,t)};dt.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};dt.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};dt.text=function(e,n){return Vt(e[n].content)};dt.html_block=function(e,n){return e[n].content};dt.html_inline=function(e,n){return e[n].content};function no(){this.rules=eo({},dt)}no.prototype.renderAttrs=function(n){let t,a,u;if(!n.attrs)return"";for(u="",t=0,a=n.attrs.length;t<a;t++)u+=" "+Vt(n.attrs[t][0])+'="'+Vt(n.attrs[t][1])+'"';return u};no.prototype.renderToken=function(n,t,a){let u=n[t],o="";if(u.hidden)return"";u.block&&u.nesting!==-1&&t&&n[t-1].hidden&&(o+=`
`),o+=(u.nesting===-1?"</":"<")+u.tag,o+=this.renderAttrs(u),u.nesting===0&&a.xhtmlOut&&(o+=" /");let l=!1;if(u.block&&(l=!0,u.nesting===1&&t+1<n.length)){let r=n[t+1];(r.type==="inline"||r.hidden||r.nesting===-1&&r.tag===u.tag)&&(l=!1)}return o+=l?`>
`:">",o};no.prototype.renderInline=function(e,n,t){let a="",u=this.rules;for(let o=0,l=e.length;o<l;o++){let r=e[o].type;typeof u[r]<"u"?a+=u[r](e,o,n,t,this):a+=this.renderToken(e,o,n)}return a};no.prototype.renderInlineAsText=function(e,n,t){let a="";for(let u=0,o=e.length;u<o;u++)switch(e[u].type){case"text":a+=e[u].content;break;case"image":a+=this.renderInlineAsText(e[u].children,n,t);break;case"html_inline":case"html_block":a+=e[u].content;break;case"softbreak":case"hardbreak":a+=`
`;break;default:}return a};no.prototype.render=function(e,n,t){let a="",u=this.rules;for(let o=0,l=e.length;o<l;o++){let r=e[o].type;r==="inline"?a+=this.renderInline(e[o].children,n,t):typeof u[r]<"u"?a+=u[r](e,o,n,t,this):a+=this.renderToken(e,o,n,t)}return a};var Qg=no;function Qn(){this.__rules__=[],this.__cache__=null}Qn.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};Qn.prototype.__compile__=function(){let e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(a){n.indexOf(a)<0&&n.push(a)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(a){a.enabled&&(t&&a.alt.indexOf(t)<0||e.__cache__[t].push(a.fn))})})};Qn.prototype.at=function(e,n,t){let a=this.__find__(e),u=t||{};if(a===-1)throw new Error("Parser rule not found: "+e);this.__rules__[a].fn=n,this.__rules__[a].alt=u.alt||[],this.__cache__=null};Qn.prototype.before=function(e,n,t,a){let u=this.__find__(e),o=a||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};Qn.prototype.after=function(e,n,t,a){let u=this.__find__(e),o=a||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u+1,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};Qn.prototype.push=function(e,n,t){let a=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:a.alt||[]}),this.__cache__=null};Qn.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);let t=[];return e.forEach(function(a){let u=this.__find__(a);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[u].enabled=!0,t.push(a)},this),this.__cache__=null,t};Qn.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};Qn.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);let t=[];return e.forEach(function(a){let u=this.__find__(a);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+a)}this.__rules__[u].enabled=!1,t.push(a)},this),this.__cache__=null,t};Qn.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};var nu=Qn;function to(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}to.prototype.attrIndex=function(n){if(!this.attrs)return-1;let t=this.attrs;for(let a=0,u=t.length;a<u;a++)if(t[a][0]===n)return a;return-1};to.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};to.prototype.attrSet=function(n,t){let a=this.attrIndex(n),u=[n,t];a<0?this.attrPush(u):this.attrs[a]=u};to.prototype.attrGet=function(n){let t=this.attrIndex(n),a=null;return t>=0&&(a=this.attrs[t][1]),a};to.prototype.attrJoin=function(n,t){let a=this.attrIndex(n);a<0?this.attrPush([n,t]):this.attrs[a][1]=this.attrs[a][1]+" "+t};var Gt=to;function Xg(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}Xg.prototype.Token=Gt;var Kg=Xg;var oy=/\r\n?|\n/g,ly=/\0/g;function Q0(e){let n;n=e.src.replace(oy,`
`),n=n.replace(ly,"\uFFFD"),e.src=n}function X0(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function K0(e){let n=e.tokens;for(let t=0,a=n.length;t<a;t++){let u=n[t];u.type==="inline"&&e.md.inline.parse(u.content,e.md,e.env,u.children)}}function ry(e){return/^<a[>\s]/i.test(e)}function iy(e){return/^<\/a\s*>/i.test(e)}function J0(e){let n=e.tokens;if(e.md.options.linkify)for(let t=0,a=n.length;t<a;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;let u=n[t].children,o=0;for(let l=u.length-1;l>=0;l--){let r=u[l];if(r.type==="link_close"){for(l--;u[l].level!==r.level&&u[l].type!=="link_open";)l--;continue}if(r.type==="html_inline"&&(ry(r.content)&&o>0&&o--,iy(r.content)&&o++),!(o>0)&&r.type==="text"&&e.md.linkify.test(r.content)){let i=r.content,s=e.md.linkify.match(i),f=[],m=r.level,d=0;s.length>0&&s[0].index===0&&l>0&&u[l-1].type==="text_special"&&(s=s.slice(1));for(let p=0;p<s.length;p++){let b=s[p].url,C=e.md.normalizeLink(b);if(!e.md.validateLink(C))continue;let _=s[p].text;s[p].schema?s[p].schema==="mailto:"&&!/^mailto:/i.test(_)?_=e.md.normalizeLinkText("mailto:"+_).replace(/^mailto:/,""):_=e.md.normalizeLinkText(_):_=e.md.normalizeLinkText("http://"+_).replace(/^http:\/\//,"");let g=s[p].index;if(g>d){let x=new e.Token("text","",0);x.content=i.slice(d,g),x.level=m,f.push(x)}let c=new e.Token("link_open","a",1);c.attrs=[["href",C]],c.level=m++,c.markup="linkify",c.info="auto",f.push(c);let h=new e.Token("text","",0);h.content=_,h.level=m,f.push(h);let v=new e.Token("link_close","a",-1);v.level=--m,v.markup="linkify",v.info="auto",f.push(v),d=s[p].lastIndex}if(d<i.length){let p=new e.Token("text","",0);p.content=i.slice(d),p.level=m,f.push(p)}n[t].children=u=j0(u,l,f)}}}}var Jg=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,sy=/\((c|tm|r)\)/i,cy=/\((c|tm|r)\)/ig,fy={c:"\xA9",r:"\xAE",tm:"\u2122"};function dy(e,n){return fy[n.toLowerCase()]}function py(e){let n=0;for(let t=e.length-1;t>=0;t--){let a=e[t];a.type==="text"&&!n&&(a.content=a.content.replace(cy,dy)),a.type==="link_open"&&a.info==="auto"&&n--,a.type==="link_close"&&a.info==="auto"&&n++}}function my(e){let n=0;for(let t=e.length-1;t>=0;t--){let a=e[t];a.type==="text"&&!n&&Jg.test(a.content)&&(a.content=a.content.replace(/\+-/g,"\xB1").replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1\u2014").replace(/(^|\s)--(?=\s|$)/mg,"$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1\u2013")),a.type==="link_open"&&a.info==="auto"&&n--,a.type==="link_close"&&a.info==="auto"&&n++}}function P0(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(sy.test(e.tokens[n].content)&&py(e.tokens[n].children),Jg.test(e.tokens[n].content)&&my(e.tokens[n].children))}var hy=/['"]/,Pg=/['"]/g,Wg="\u2019";function vi(e,n,t){return e.slice(0,n)+t+e.slice(n+1)}function gy(e,n){let t,a=[];for(let u=0;u<e.length;u++){let o=e[u],l=e[u].level;for(t=a.length-1;t>=0&&!(a[t].level<=l);t--);if(a.length=t+1,o.type!=="text")continue;let r=o.content,i=0,s=r.length;e:for(;i<s;){Pg.lastIndex=i;let f=Pg.exec(r);if(!f)break;let m=!0,d=!0;i=f.index+1;let p=f[0]==="'",b=32;if(f.index-1>=0)b=r.charCodeAt(f.index-1);else for(t=u-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){b=e[t].content.charCodeAt(e[t].content.length-1);break}let C=32;if(i<s)C=r.charCodeAt(i);else for(t=u+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){C=e[t].content.charCodeAt(0);break}let _=$a(b)||Wa(String.fromCharCode(b)),g=$a(C)||Wa(String.fromCharCode(C)),c=Pa(b),h=Pa(C);if(h?m=!1:g&&(c||_||(m=!1)),c?d=!1:_&&(h||g||(d=!1)),C===34&&f[0]==='"'&&b>=48&&b<=57&&(d=m=!1),m&&d&&(m=_,d=g),!m&&!d){p&&(o.content=vi(o.content,f.index,Wg));continue}if(d)for(t=a.length-1;t>=0;t--){let v=a[t];if(a[t].level<l)break;if(v.single===p&&a[t].level===l){v=a[t];let x,w;p?(x=n.md.options.quotes[2],w=n.md.options.quotes[3]):(x=n.md.options.quotes[0],w=n.md.options.quotes[1]),o.content=vi(o.content,f.index,w),e[v.token].content=vi(e[v.token].content,v.pos,x),i+=w.length-1,v.token===u&&(i+=x.length-1),r=o.content,s=r.length,a.length=t;continue e}}m?a.push({token:u,pos:f.index,single:p,level:l}):d&&p&&(o.content=vi(o.content,f.index,Wg))}}}function W0(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!hy.test(e.tokens[n].content)||gy(e.tokens[n].children,e)}function $0(e){let n,t,a=e.tokens,u=a.length;for(let o=0;o<u;o++){if(a[o].type!=="inline")continue;let l=a[o].children,r=l.length;for(n=0;n<r;n++)l[n].type==="text_special"&&(l[n].type="text");for(n=t=0;n<r;n++)l[n].type==="text"&&n+1<r&&l[n+1].type==="text"?l[n+1].content=l[n].content+l[n+1].content:(n!==t&&(l[t]=l[n]),t++);n!==t&&(l.length=t)}}var ef=[["normalize",Q0],["block",X0],["inline",K0],["linkify",J0],["replacements",P0],["smartquotes",W0],["text_join",$0]];function nf(){this.ruler=new nu;for(let e=0;e<ef.length;e++)this.ruler.push(ef[e][0],ef[e][1])}nf.prototype.process=function(e){let n=this.ruler.getRules("");for(let t=0,a=n.length;t<a;t++)n[t](e)};nf.prototype.State=Kg;var $g=nf;function pt(e,n,t,a){this.src=e,this.md=n,this.env=t,this.tokens=a,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;let u=this.src;for(let o=0,l=0,r=0,i=0,s=u.length,f=!1;l<s;l++){let m=u.charCodeAt(l);if(!f)if(G(m)){r++,m===9?i+=4-i%4:i++;continue}else f=!0;(m===10||l===s-1)&&(m!==10&&l++,this.bMarks.push(o),this.eMarks.push(l),this.tShift.push(r),this.sCount.push(i),this.bsCount.push(0),f=!1,r=0,i=0,o=l+1)}this.bMarks.push(u.length),this.eMarks.push(u.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}pt.prototype.push=function(e,n,t){let a=new Gt(e,n,t);return a.block=!0,t<0&&this.level--,a.level=this.level,t>0&&this.level++,this.tokens.push(a),a};pt.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};pt.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};pt.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){let a=this.src.charCodeAt(n);if(!G(a))break}return n};pt.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!G(this.src.charCodeAt(--n)))return n+1;return n};pt.prototype.skipChars=function(n,t){for(let a=this.src.length;n<a&&this.src.charCodeAt(n)===t;n++);return n};pt.prototype.skipCharsBack=function(n,t,a){if(n<=a)return n;for(;n>a;)if(t!==this.src.charCodeAt(--n))return n+1;return n};pt.prototype.getLines=function(n,t,a,u){if(n>=t)return"";let o=new Array(t-n);for(let l=0,r=n;r<t;r++,l++){let i=0,s=this.bMarks[r],f=s,m;for(r+1<t||u?m=this.eMarks[r]+1:m=this.eMarks[r];f<m&&i<a;){let d=this.src.charCodeAt(f);if(G(d))d===9?i+=4-(i+this.bsCount[r])%4:i++;else if(f-s<this.tShift[r])i++;else break;f++}i>a?o[l]=new Array(i-a+1).join(" ")+this.src.slice(f,m):o[l]=this.src.slice(f,m)}return o.join("")};pt.prototype.Token=Gt;var e2=pt;var by=65536;function tf(e,n){let t=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];return e.src.slice(t,a)}function n2(e){let n=[],t=e.length,a=0,u=e.charCodeAt(a),o=!1,l=0,r="";for(;a<t;)u===124&&(o?(r+=e.substring(l,a-1),l=a):(n.push(r+e.substring(l,a)),r="",l=a+1)),o=u===92,a++,u=e.charCodeAt(a);return n.push(r+e.substring(l)),n}function af(e,n,t,a){if(n+2>t)return!1;let u=n+1;if(e.sCount[u]<e.blkIndent||e.sCount[u]-e.blkIndent>=4)return!1;let o=e.bMarks[u]+e.tShift[u];if(o>=e.eMarks[u])return!1;let l=e.src.charCodeAt(o++);if(l!==124&&l!==45&&l!==58||o>=e.eMarks[u])return!1;let r=e.src.charCodeAt(o++);if(r!==124&&r!==45&&r!==58&&!G(r)||l===45&&G(r))return!1;for(;o<e.eMarks[u];){let v=e.src.charCodeAt(o);if(v!==124&&v!==45&&v!==58&&!G(v))return!1;o++}let i=tf(e,n+1),s=i.split("|"),f=[];for(let v=0;v<s.length;v++){let x=s[v].trim();if(!x){if(v===0||v===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(x))return!1;x.charCodeAt(x.length-1)===58?f.push(x.charCodeAt(0)===58?"center":"right"):x.charCodeAt(0)===58?f.push("left"):f.push("")}if(i=tf(e,n).trim(),i.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;s=n2(i),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();let m=s.length;if(m===0||m!==f.length)return!1;if(a)return!0;let d=e.parentType;e.parentType="table";let p=e.md.block.ruler.getRules("blockquote"),b=e.push("table_open","table",1),C=[n,0];b.map=C;let _=e.push("thead_open","thead",1);_.map=[n,n+1];let g=e.push("tr_open","tr",1);g.map=[n,n+1];for(let v=0;v<s.length;v++){let x=e.push("th_open","th",1);f[v]&&(x.attrs=[["style","text-align:"+f[v]]]);let w=e.push("inline","",0);w.content=s[v].trim(),w.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let c,h=0;for(u=n+2;u<t&&!(e.sCount[u]<e.blkIndent);u++){let v=!1;for(let w=0,y=p.length;w<y;w++)if(p[w](e,u,t,!0)){v=!0;break}if(v||(i=tf(e,u).trim(),!i)||e.sCount[u]-e.blkIndent>=4||(s=n2(i),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),h+=m-s.length,h>by))break;if(u===n+2){let w=e.push("tbody_open","tbody",1);w.map=c=[n+2,0]}let x=e.push("tr_open","tr",1);x.map=[u,u+1];for(let w=0;w<m;w++){let y=e.push("td_open","td",1);f[w]&&(y.attrs=[["style","text-align:"+f[w]]]);let k=e.push("inline","",0);k.content=s[w]?s[w].trim():"",k.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return c&&(e.push("tbody_close","tbody",-1),c[1]=u),e.push("table_close","table",-1),C[1]=u,e.parentType=d,e.line=u,!0}function uf(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let a=n+1,u=a;for(;a<t;){if(e.isEmpty(a)){a++;continue}if(e.sCount[a]-e.blkIndent>=4){a++,u=a;continue}break}e.line=u;let o=e.push("code_block","code",0);return o.content=e.getLines(n,u,4+e.blkIndent,!1)+`
`,o.map=[n,e.line],!0}function of(e,n,t,a){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||u+3>o)return!1;let l=e.src.charCodeAt(u);if(l!==126&&l!==96)return!1;let r=u;u=e.skipChars(u,l);let i=u-r;if(i<3)return!1;let s=e.src.slice(r,u),f=e.src.slice(u,o);if(l===96&&f.indexOf(String.fromCharCode(l))>=0)return!1;if(a)return!0;let m=n,d=!1;for(;m++,!(m>=t||(u=r=e.bMarks[m]+e.tShift[m],o=e.eMarks[m],u<o&&e.sCount[m]<e.blkIndent));)if(e.src.charCodeAt(u)===l&&!(e.sCount[m]-e.blkIndent>=4)&&(u=e.skipChars(u,l),!(u-r<i)&&(u=e.skipSpaces(u),!(u<o)))){d=!0;break}i=e.sCount[n],e.line=m+(d?1:0);let p=e.push("fence","code",0);return p.info=f,p.content=e.getLines(n+1,m,i,!0),p.markup=s,p.map=[n,e.line],!0}function lf(e,n,t,a){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],l=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==62)return!1;if(a)return!0;let r=[],i=[],s=[],f=[],m=e.md.block.ruler.getRules("blockquote"),d=e.parentType;e.parentType="blockquote";let p=!1,b;for(b=n;b<t;b++){let h=e.sCount[b]<e.blkIndent;if(u=e.bMarks[b]+e.tShift[b],o=e.eMarks[b],u>=o)break;if(e.src.charCodeAt(u++)===62&&!h){let x=e.sCount[b]+1,w,y;e.src.charCodeAt(u)===32?(u++,x++,y=!1,w=!0):e.src.charCodeAt(u)===9?(w=!0,(e.bsCount[b]+x)%4===3?(u++,x++,y=!1):y=!0):w=!1;let k=x;for(r.push(e.bMarks[b]),e.bMarks[b]=u;u<o;){let A=e.src.charCodeAt(u);if(G(A))A===9?k+=4-(k+e.bsCount[b]+(y?1:0))%4:k++;else break;u++}p=u>=o,i.push(e.bsCount[b]),e.bsCount[b]=e.sCount[b]+1+(w?1:0),s.push(e.sCount[b]),e.sCount[b]=k-x,f.push(e.tShift[b]),e.tShift[b]=u-e.bMarks[b];continue}if(p)break;let v=!1;for(let x=0,w=m.length;x<w;x++)if(m[x](e,b,t,!0)){v=!0;break}if(v){e.lineMax=b,e.blkIndent!==0&&(r.push(e.bMarks[b]),i.push(e.bsCount[b]),f.push(e.tShift[b]),s.push(e.sCount[b]),e.sCount[b]-=e.blkIndent);break}r.push(e.bMarks[b]),i.push(e.bsCount[b]),f.push(e.tShift[b]),s.push(e.sCount[b]),e.sCount[b]=-1}let C=e.blkIndent;e.blkIndent=0;let _=e.push("blockquote_open","blockquote",1);_.markup=">";let g=[n,0];_.map=g,e.md.block.tokenize(e,n,b);let c=e.push("blockquote_close","blockquote",-1);c.markup=">",e.lineMax=l,e.parentType=d,g[1]=e.line;for(let h=0;h<f.length;h++)e.bMarks[h+n]=r[h],e.tShift[h+n]=f[h],e.sCount[h+n]=s[h],e.bsCount[h+n]=i[h];return e.blkIndent=C,!0}function rf(e,n,t,a){let u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.bMarks[n]+e.tShift[n],l=e.src.charCodeAt(o++);if(l!==42&&l!==45&&l!==95)return!1;let r=1;for(;o<u;){let s=e.src.charCodeAt(o++);if(s!==l&&!G(s))return!1;s===l&&r++}if(r<3)return!1;if(a)return!0;e.line=n+1;let i=e.push("hr","hr",0);return i.map=[n,e.line],i.markup=Array(r+1).join(String.fromCharCode(l)),!0}function t2(e,n){let t=e.eMarks[n],a=e.bMarks[n]+e.tShift[n],u=e.src.charCodeAt(a++);if(u!==42&&u!==45&&u!==43)return-1;if(a<t){let o=e.src.charCodeAt(a);if(!G(o))return-1}return a}function a2(e,n){let t=e.bMarks[n]+e.tShift[n],a=e.eMarks[n],u=t;if(u+1>=a)return-1;let o=e.src.charCodeAt(u++);if(o<48||o>57)return-1;for(;;){if(u>=a)return-1;if(o=e.src.charCodeAt(u++),o>=48&&o<=57){if(u-t>=10)return-1;continue}if(o===41||o===46)break;return-1}return u<a&&(o=e.src.charCodeAt(u),!G(o))?-1:u}function vy(e,n){let t=e.level+2;for(let a=n+2,u=e.tokens.length-2;a<u;a++)e.tokens[a].level===t&&e.tokens[a].type==="paragraph_open"&&(e.tokens[a+2].hidden=!0,e.tokens[a].hidden=!0,a+=2)}function sf(e,n,t,a){let u,o,l,r,i=n,s=!0;if(e.sCount[i]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[i]-e.listIndent>=4&&e.sCount[i]<e.blkIndent)return!1;let f=!1;a&&e.parentType==="paragraph"&&e.sCount[i]>=e.blkIndent&&(f=!0);let m,d,p;if((p=a2(e,i))>=0){if(m=!0,l=e.bMarks[i]+e.tShift[i],d=Number(e.src.slice(l,p-1)),f&&d!==1)return!1}else if((p=t2(e,i))>=0)m=!1;else return!1;if(f&&e.skipSpaces(p)>=e.eMarks[i])return!1;if(a)return!0;let b=e.src.charCodeAt(p-1),C=e.tokens.length;m?(r=e.push("ordered_list_open","ol",1),d!==1&&(r.attrs=[["start",d]])):r=e.push("bullet_list_open","ul",1);let _=[i,0];r.map=_,r.markup=String.fromCharCode(b);let g=!1,c=e.md.block.ruler.getRules("list"),h=e.parentType;for(e.parentType="list";i<t;){o=p,u=e.eMarks[i];let v=e.sCount[i]+p-(e.bMarks[i]+e.tShift[i]),x=v;for(;o<u;){let $e=e.src.charCodeAt(o);if($e===9)x+=4-(x+e.bsCount[i])%4;else if($e===32)x++;else break;o++}let w=o,y;w>=u?y=1:y=x-v,y>4&&(y=1);let k=v+y;r=e.push("list_item_open","li",1),r.markup=String.fromCharCode(b);let A=[i,0];r.map=A,m&&(r.info=e.src.slice(l,p-1));let E=e.tight,D=e.tShift[i],M=e.sCount[i],re=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=k,e.tight=!0,e.tShift[i]=w-e.bMarks[i],e.sCount[i]=x,w>=u&&e.isEmpty(i+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,i,t,!0),(!e.tight||g)&&(s=!1),g=e.line-i>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=re,e.tShift[i]=D,e.sCount[i]=M,e.tight=E,r=e.push("list_item_close","li",-1),r.markup=String.fromCharCode(b),i=e.line,A[1]=i,i>=t||e.sCount[i]<e.blkIndent||e.sCount[i]-e.blkIndent>=4)break;let We=!1;for(let $e=0,Dn=c.length;$e<Dn;$e++)if(c[$e](e,i,t,!0)){We=!0;break}if(We)break;if(m){if(p=a2(e,i),p<0)break;l=e.bMarks[i]+e.tShift[i]}else if(p=t2(e,i),p<0)break;if(b!==e.src.charCodeAt(p-1))break}return m?r=e.push("ordered_list_close","ol",-1):r=e.push("bullet_list_close","ul",-1),r.markup=String.fromCharCode(b),_[1]=i,e.line=i,e.parentType=h,s&&vy(e,C),!0}function cf(e,n,t,a){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],l=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==91)return!1;function r(c){let h=e.lineMax;if(c>=h||e.isEmpty(c))return null;let v=!1;if(e.sCount[c]-e.blkIndent>3&&(v=!0),e.sCount[c]<0&&(v=!0),!v){let y=e.md.block.ruler.getRules("reference"),k=e.parentType;e.parentType="reference";let A=!1;for(let E=0,D=y.length;E<D;E++)if(y[E](e,c,h,!0)){A=!0;break}if(e.parentType=k,A)return null}let x=e.bMarks[c]+e.tShift[c],w=e.eMarks[c];return e.src.slice(x,w+1)}let i=e.src.slice(u,o+1);o=i.length;let s=-1;for(u=1;u<o;u++){let c=i.charCodeAt(u);if(c===91)return!1;if(c===93){s=u;break}else if(c===10){let h=r(l);h!==null&&(i+=h,o=i.length,l++)}else if(c===92&&(u++,u<o&&i.charCodeAt(u)===10)){let h=r(l);h!==null&&(i+=h,o=i.length,l++)}}if(s<0||i.charCodeAt(s+1)!==58)return!1;for(u=s+2;u<o;u++){let c=i.charCodeAt(u);if(c===10){let h=r(l);h!==null&&(i+=h,o=i.length,l++)}else if(!G(c))break}let f=e.md.helpers.parseLinkDestination(i,u,o);if(!f.ok)return!1;let m=e.md.normalizeLink(f.str);if(!e.md.validateLink(m))return!1;u=f.pos;let d=u,p=l,b=u;for(;u<o;u++){let c=i.charCodeAt(u);if(c===10){let h=r(l);h!==null&&(i+=h,o=i.length,l++)}else if(!G(c))break}let C=e.md.helpers.parseLinkTitle(i,u,o);for(;C.can_continue;){let c=r(l);if(c===null)break;i+=c,u=o,o=i.length,l++,C=e.md.helpers.parseLinkTitle(i,u,o,C)}let _;for(u<o&&b!==u&&C.ok?(_=C.str,u=C.pos):(_="",u=d,l=p);u<o;){let c=i.charCodeAt(u);if(!G(c))break;u++}if(u<o&&i.charCodeAt(u)!==10&&_)for(_="",u=d,l=p;u<o;){let c=i.charCodeAt(u);if(!G(c))break;u++}if(u<o&&i.charCodeAt(u)!==10)return!1;let g=eu(i.slice(1,s));return g?(a||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[g]>"u"&&(e.env.references[g]={title:_,href:m}),e.line=l),!0):!1}var u2=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"];var xy="[a-zA-Z_:][a-zA-Z0-9:._-]*",yy="[^\"'=<>`\\x00-\\x20]+",wy="'[^']*'",Cy='"[^"]*"',ky="(?:"+yy+"|"+wy+"|"+Cy+")",_y="(?:\\s+"+xy+"(?:\\s*=\\s*"+ky+")?)",o2="<[A-Za-z][A-Za-z0-9\\-]*"+_y+"*\\s*\\/?>",l2="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Sy="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Ay="<[?][\\s\\S]*?[?]>",Ey="<![A-Za-z][^>]*>",Ty="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",r2=new RegExp("^(?:"+o2+"|"+l2+"|"+Sy+"|"+Ay+"|"+Ey+"|"+Ty+")"),i2=new RegExp("^(?:"+o2+"|"+l2+")");var ao=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+u2.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(i2.source+"\\s*$"),/^$/,!1]];function ff(e,n,t,a){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(u)!==60)return!1;let l=e.src.slice(u,o),r=0;for(;r<ao.length&&!ao[r][0].test(l);r++);if(r===ao.length)return!1;if(a)return ao[r][2];let i=n+1;if(!ao[r][1].test(l)){for(;i<t&&!(e.sCount[i]<e.blkIndent);i++)if(u=e.bMarks[i]+e.tShift[i],o=e.eMarks[i],l=e.src.slice(u,o),ao[r][1].test(l)){l.length!==0&&i++;break}}e.line=i;let s=e.push("html_block","",0);return s.map=[n,i],s.content=e.getLines(n,i,e.blkIndent,!0),!0}function df(e,n,t,a){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let l=e.src.charCodeAt(u);if(l!==35||u>=o)return!1;let r=1;for(l=e.src.charCodeAt(++u);l===35&&u<o&&r<=6;)r++,l=e.src.charCodeAt(++u);if(r>6||u<o&&!G(l))return!1;if(a)return!0;o=e.skipSpacesBack(o,u);let i=e.skipCharsBack(o,35,u);i>u&&G(e.src.charCodeAt(i-1))&&(o=i),e.line=n+1;let s=e.push("heading_open","h"+String(r),1);s.markup="########".slice(0,r),s.map=[n,e.line];let f=e.push("inline","",0);f.content=e.src.slice(u,o).trim(),f.map=[n,e.line],f.children=[];let m=e.push("heading_close","h"+String(r),-1);return m.markup="########".slice(0,r),!0}function pf(e,n,t){let a=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;let u=e.parentType;e.parentType="paragraph";let o=0,l,r=n+1;for(;r<t&&!e.isEmpty(r);r++){if(e.sCount[r]-e.blkIndent>3)continue;if(e.sCount[r]>=e.blkIndent){let p=e.bMarks[r]+e.tShift[r],b=e.eMarks[r];if(p<b&&(l=e.src.charCodeAt(p),(l===45||l===61)&&(p=e.skipChars(p,l),p=e.skipSpaces(p),p>=b))){o=l===61?1:2;break}}if(e.sCount[r]<0)continue;let d=!1;for(let p=0,b=a.length;p<b;p++)if(a[p](e,r,t,!0)){d=!0;break}if(d)break}if(!o)return!1;let i=e.getLines(n,r,e.blkIndent,!1).trim();e.line=r+1;let s=e.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(l),s.map=[n,e.line];let f=e.push("inline","",0);f.content=i,f.map=[n,e.line-1],f.children=[];let m=e.push("heading_close","h"+String(o),-1);return m.markup=String.fromCharCode(l),e.parentType=u,!0}function mf(e,n,t){let a=e.md.block.ruler.getRules("paragraph"),u=e.parentType,o=n+1;for(e.parentType="paragraph";o<t&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let s=!1;for(let f=0,m=a.length;f<m;f++)if(a[f](e,o,t,!0)){s=!0;break}if(s)break}let l=e.getLines(n,o,e.blkIndent,!1).trim();e.line=o;let r=e.push("paragraph_open","p",1);r.map=[n,e.line];let i=e.push("inline","",0);return i.content=l,i.map=[n,e.line],i.children=[],e.push("paragraph_close","p",-1),e.parentType=u,!0}var xi=[["table",af,["paragraph","reference"]],["code",uf],["fence",of,["paragraph","reference","blockquote","list"]],["blockquote",lf,["paragraph","reference","blockquote","list"]],["hr",rf,["paragraph","reference","blockquote","list"]],["list",sf,["paragraph","reference","blockquote"]],["reference",cf],["html_block",ff,["paragraph","reference","blockquote"]],["heading",df,["paragraph","reference","blockquote"]],["lheading",pf],["paragraph",mf]];function yi(){this.ruler=new nu;for(let e=0;e<xi.length;e++)this.ruler.push(xi[e][0],xi[e][1],{alt:(xi[e][2]||[]).slice()})}yi.prototype.tokenize=function(e,n,t){let a=this.ruler.getRules(""),u=a.length,o=e.md.options.maxNesting,l=n,r=!1;for(;l<t&&(e.line=l=e.skipEmptyLines(l),!(l>=t||e.sCount[l]<e.blkIndent));){if(e.level>=o){e.line=t;break}let i=e.line,s=!1;for(let f=0;f<u;f++)if(s=a[f](e,l,t,!1),s){if(i>=e.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");e.tight=!r,e.isEmpty(e.line-1)&&(r=!0),l=e.line,l<t&&e.isEmpty(l)&&(r=!0,l++,e.line=l)}};yi.prototype.parse=function(e,n,t,a){if(!e)return;let u=new this.State(e,n,t,a);this.tokenize(u,u.line,u.lineMax)};yi.prototype.State=e2;var s2=yi;function hl(e,n,t,a){this.src=e,this.env=t,this.md=n,this.tokens=a,this.tokens_meta=Array(a.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}hl.prototype.pushPending=function(){let e=new Gt("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};hl.prototype.push=function(e,n,t){this.pending&&this.pushPending();let a=new Gt(e,n,t),u=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),a.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],u={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(a),this.tokens_meta.push(u),a};hl.prototype.scanDelims=function(e,n){let t=this.posMax,a=this.src.charCodeAt(e),u=e>0?this.src.charCodeAt(e-1):32,o=e;for(;o<t&&this.src.charCodeAt(o)===a;)o++;let l=o-e,r=o<t?this.src.charCodeAt(o):32,i=$a(u)||Wa(String.fromCharCode(u)),s=$a(r)||Wa(String.fromCharCode(r)),f=Pa(u),m=Pa(r),d=!m&&(!s||f||i),p=!f&&(!i||m||s);return{can_open:d&&(n||!p||i),can_close:p&&(n||!d||s),length:l}};hl.prototype.Token=Gt;var c2=hl;function Dy(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function hf(e,n){let t=e.pos;for(;t<e.posMax&&!Dy(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}var My=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function gf(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;let t=e.pos,a=e.posMax;if(t+3>a||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;let u=e.pending.match(My);if(!u)return!1;let o=u[1],l=e.md.linkify.matchAtStart(e.src.slice(t-o.length));if(!l)return!1;let r=l.url;if(r.length<=o.length)return!1;r=r.replace(/\*+$/,"");let i=e.md.normalizeLink(r);if(!e.md.validateLink(i))return!1;if(!n){e.pending=e.pending.slice(0,-o.length);let s=e.push("link_open","a",1);s.attrs=[["href",i]],s.markup="linkify",s.info="auto";let f=e.push("text","",0);f.content=e.md.normalizeLinkText(r);let m=e.push("link_close","a",-1);m.markup="linkify",m.info="auto"}return e.pos+=r.length-o.length,!0}function bf(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;let a=e.pending.length-1,u=e.posMax;if(!n)if(a>=0&&e.pending.charCodeAt(a)===32)if(a>=1&&e.pending.charCodeAt(a-1)===32){let o=a-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<u&&G(e.src.charCodeAt(t));)t++;return e.pos=t,!0}var vf=[];for(let e=0;e<256;e++)vf.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){vf[e.charCodeAt(0)]=1});function xf(e,n){let t=e.pos,a=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=a))return!1;let u=e.src.charCodeAt(t);if(u===10){for(n||e.push("hardbreak","br",0),t++;t<a&&(u=e.src.charCodeAt(t),!!G(u));)t++;return e.pos=t,!0}let o=e.src[t];if(u>=55296&&u<=56319&&t+1<a){let r=e.src.charCodeAt(t+1);r>=56320&&r<=57343&&(o+=e.src[t+1],t++)}let l="\\"+o;if(!n){let r=e.push("text_special","",0);u<256&&vf[u]!==0?r.content=o:r.content=l,r.markup=l,r.info="escape"}return e.pos=t+1,!0}function yf(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;let u=t;t++;let o=e.posMax;for(;t<o&&e.src.charCodeAt(t)===96;)t++;let l=e.src.slice(u,t),r=l.length;if(e.backticksScanned&&(e.backticks[r]||0)<=u)return n||(e.pending+=l),e.pos+=r,!0;let i=t,s;for(;(s=e.src.indexOf("`",i))!==-1;){for(i=s+1;i<o&&e.src.charCodeAt(i)===96;)i++;let f=i-s;if(f===r){if(!n){let m=e.push("code_inline","code",0);m.markup=l,m.content=e.src.slice(t,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=i,!0}e.backticks[f]=s}return e.backticksScanned=!0,n||(e.pending+=l),e.pos+=r,!0}function Ry(e,n){let t=e.pos,a=e.src.charCodeAt(t);if(n||a!==126)return!1;let u=e.scanDelims(e.pos,!0),o=u.length,l=String.fromCharCode(a);if(o<2)return!1;let r;o%2&&(r=e.push("text","",0),r.content=l,o--);for(let i=0;i<o;i+=2)r=e.push("text","",0),r.content=l+l,e.delimiters.push({marker:a,length:0,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close});return e.pos+=u.length,!0}function f2(e,n){let t,a=[],u=n.length;for(let o=0;o<u;o++){let l=n[o];if(l.marker!==126||l.end===-1)continue;let r=n[l.end];t=e.tokens[l.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[r.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[r.token-1].type==="text"&&e.tokens[r.token-1].content==="~"&&a.push(r.token-1)}for(;a.length;){let o=a.pop(),l=o+1;for(;l<e.tokens.length&&e.tokens[l].type==="s_close";)l++;l--,o!==l&&(t=e.tokens[l],e.tokens[l]=e.tokens[o],e.tokens[o]=t)}}function Ny(e){let n=e.tokens_meta,t=e.tokens_meta.length;f2(e,e.delimiters);for(let a=0;a<t;a++)n[a]&&n[a].delimiters&&f2(e,n[a].delimiters)}var wf={tokenize:Ry,postProcess:Ny};function zy(e,n){let t=e.pos,a=e.src.charCodeAt(t);if(n||a!==95&&a!==42)return!1;let u=e.scanDelims(e.pos,a===42);for(let o=0;o<u.length;o++){let l=e.push("text","",0);l.content=String.fromCharCode(a),e.delimiters.push({marker:a,length:u.length,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close})}return e.pos+=u.length,!0}function d2(e,n){let t=n.length;for(let a=t-1;a>=0;a--){let u=n[a];if(u.marker!==95&&u.marker!==42||u.end===-1)continue;let o=n[u.end],l=a>0&&n[a-1].end===u.end+1&&n[a-1].marker===u.marker&&n[a-1].token===u.token-1&&n[u.end+1].token===o.token+1,r=String.fromCharCode(u.marker),i=e.tokens[u.token];i.type=l?"strong_open":"em_open",i.tag=l?"strong":"em",i.nesting=1,i.markup=l?r+r:r,i.content="";let s=e.tokens[o.token];s.type=l?"strong_close":"em_close",s.tag=l?"strong":"em",s.nesting=-1,s.markup=l?r+r:r,s.content="",l&&(e.tokens[n[a-1].token].content="",e.tokens[n[u.end+1].token].content="",a--)}}function Ly(e){let n=e.tokens_meta,t=e.tokens_meta.length;d2(e,e.delimiters);for(let a=0;a<t;a++)n[a]&&n[a].delimiters&&d2(e,n[a].delimiters)}var Cf={tokenize:zy,postProcess:Ly};function kf(e,n){let t,a,u,o,l="",r="",i=e.pos,s=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let f=e.pos,m=e.posMax,d=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let b=p+1;if(b<m&&e.src.charCodeAt(b)===40){for(s=!1,b++;b<m&&(t=e.src.charCodeAt(b),!(!G(t)&&t!==10));b++);if(b>=m)return!1;if(i=b,u=e.md.helpers.parseLinkDestination(e.src,b,e.posMax),u.ok){for(l=e.md.normalizeLink(u.str),e.md.validateLink(l)?b=u.pos:l="",i=b;b<m&&(t=e.src.charCodeAt(b),!(!G(t)&&t!==10));b++);if(u=e.md.helpers.parseLinkTitle(e.src,b,e.posMax),b<m&&i!==b&&u.ok)for(r=u.str,b=u.pos;b<m&&(t=e.src.charCodeAt(b),!(!G(t)&&t!==10));b++);}(b>=m||e.src.charCodeAt(b)!==41)&&(s=!0),b++}if(s){if(typeof e.env.references>"u")return!1;if(b<m&&e.src.charCodeAt(b)===91?(i=b+1,b=e.md.helpers.parseLinkLabel(e,b),b>=0?a=e.src.slice(i,b++):b=p+1):b=p+1,a||(a=e.src.slice(d,p)),o=e.env.references[eu(a)],!o)return e.pos=f,!1;l=o.href,r=o.title}if(!n){e.pos=d,e.posMax=p;let C=e.push("link_open","a",1),_=[["href",l]];C.attrs=_,r&&_.push(["title",r]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=b,e.posMax=m,!0}function _f(e,n){let t,a,u,o,l,r,i,s,f="",m=e.pos,d=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,b=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(b<0)return!1;if(o=b+1,o<d&&e.src.charCodeAt(o)===40){for(o++;o<d&&(t=e.src.charCodeAt(o),!(!G(t)&&t!==10));o++);if(o>=d)return!1;for(s=o,r=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),r.ok&&(f=e.md.normalizeLink(r.str),e.md.validateLink(f)?o=r.pos:f=""),s=o;o<d&&(t=e.src.charCodeAt(o),!(!G(t)&&t!==10));o++);if(r=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<d&&s!==o&&r.ok)for(i=r.str,o=r.pos;o<d&&(t=e.src.charCodeAt(o),!(!G(t)&&t!==10));o++);else i="";if(o>=d||e.src.charCodeAt(o)!==41)return e.pos=m,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<d&&e.src.charCodeAt(o)===91?(s=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?u=e.src.slice(s,o++):o=b+1):o=b+1,u||(u=e.src.slice(p,b)),l=e.env.references[eu(u)],!l)return e.pos=m,!1;f=l.href,i=l.title}if(!n){a=e.src.slice(p,b);let C=[];e.md.inline.parse(a,e.md,e.env,C);let _=e.push("image","img",0),g=[["src",f],["alt",""]];_.attrs=g,_.children=C,_.content=a,i&&g.push(["title",i])}return e.pos=o,e.posMax=d,!0}var Oy=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Fy=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Sf(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;let a=e.pos,u=e.posMax;for(;;){if(++t>=u)return!1;let l=e.src.charCodeAt(t);if(l===60)return!1;if(l===62)break}let o=e.src.slice(a+1,t);if(Fy.test(o)){let l=e.md.normalizeLink(o);if(!e.md.validateLink(l))return!1;if(!n){let r=e.push("link_open","a",1);r.attrs=[["href",l]],r.markup="autolink",r.info="auto";let i=e.push("text","",0);i.content=e.md.normalizeLinkText(o);let s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}if(Oy.test(o)){let l=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(l))return!1;if(!n){let r=e.push("link_open","a",1);r.attrs=[["href",l]],r.markup="autolink",r.info="auto";let i=e.push("text","",0);i.content=e.md.normalizeLinkText(o);let s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}return!1}function qy(e){return/^<a[>\s]/i.test(e)}function Uy(e){return/^<\/a\s*>/i.test(e)}function By(e){let n=e|32;return n>=97&&n<=122}function Af(e,n){if(!e.md.options.html)return!1;let t=e.posMax,a=e.pos;if(e.src.charCodeAt(a)!==60||a+2>=t)return!1;let u=e.src.charCodeAt(a+1);if(u!==33&&u!==63&&u!==47&&!By(u))return!1;let o=e.src.slice(a).match(r2);if(!o)return!1;if(!n){let l=e.push("html_inline","",0);l.content=o[0],qy(l.content)&&e.linkLevel++,Uy(l.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}var Hy=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,jy=/^&([a-z][a-z0-9]{1,31});/i;function Ef(e,n){let t=e.pos,a=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=a)return!1;if(e.src.charCodeAt(t+1)===35){let o=e.src.slice(t).match(Hy);if(o){if(!n){let l=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),r=e.push("text_special","",0);r.content=bi(l)?ml(l):ml(65533),r.markup=o[0],r.info="entity"}return e.pos+=o[0].length,!0}}else{let o=e.src.slice(t).match(jy);if(o){let l=wa(o[0]);if(l!==o[0]){if(!n){let r=e.push("text_special","",0);r.content=l,r.markup=o[0],r.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function p2(e){let n={},t=e.length;if(!t)return;let a=0,u=-2,o=[];for(let l=0;l<t;l++){let r=e[l];if(o.push(0),(e[a].marker!==r.marker||u!==r.token-1)&&(a=l),u=r.token,r.length=r.length||0,!r.close)continue;n.hasOwnProperty(r.marker)||(n[r.marker]=[-1,-1,-1,-1,-1,-1]);let i=n[r.marker][(r.open?3:0)+r.length%3],s=a-o[a]-1,f=s;for(;s>i;s-=o[s]+1){let m=e[s];if(m.marker===r.marker&&m.open&&m.end<0){let d=!1;if((m.close||r.open)&&(m.length+r.length)%3===0&&(m.length%3!==0||r.length%3!==0)&&(d=!0),!d){let p=s>0&&!e[s-1].open?o[s-1]+1:0;o[l]=l-s+p,o[s]=p,r.open=!1,m.end=l,m.close=!1,f=-1,u=-2;break}}}f!==-1&&(n[r.marker][(r.open?3:0)+(r.length||0)%3]=f)}}function Tf(e){let n=e.tokens_meta,t=e.tokens_meta.length;p2(e.delimiters);for(let a=0;a<t;a++)n[a]&&n[a].delimiters&&p2(n[a].delimiters)}function Df(e){let n,t,a=0,u=e.tokens,o=e.tokens.length;for(n=t=0;n<o;n++)u[n].nesting<0&&a--,u[n].level=a,u[n].nesting>0&&a++,u[n].type==="text"&&n+1<o&&u[n+1].type==="text"?u[n+1].content=u[n].content+u[n+1].content:(n!==t&&(u[t]=u[n]),t++);n!==t&&(u.length=t)}var Mf=[["text",hf],["linkify",gf],["newline",bf],["escape",xf],["backticks",yf],["strikethrough",wf.tokenize],["emphasis",Cf.tokenize],["link",kf],["image",_f],["autolink",Sf],["html_inline",Af],["entity",Ef]],Rf=[["balance_pairs",Tf],["strikethrough",wf.postProcess],["emphasis",Cf.postProcess],["fragments_join",Df]];function gl(){this.ruler=new nu;for(let e=0;e<Mf.length;e++)this.ruler.push(Mf[e][0],Mf[e][1]);this.ruler2=new nu;for(let e=0;e<Rf.length;e++)this.ruler2.push(Rf[e][0],Rf[e][1])}gl.prototype.skipToken=function(e){let n=e.pos,t=this.ruler.getRules(""),a=t.length,u=e.md.options.maxNesting,o=e.cache;if(typeof o[n]<"u"){e.pos=o[n];return}let l=!1;if(e.level<u){for(let r=0;r<a;r++)if(e.level++,l=t[r](e,!0),e.level--,l){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;l||e.pos++,o[n]=e.pos};gl.prototype.tokenize=function(e){let n=this.ruler.getRules(""),t=n.length,a=e.posMax,u=e.md.options.maxNesting;for(;e.pos<a;){let o=e.pos,l=!1;if(e.level<u){for(let r=0;r<t;r++)if(l=n[r](e,!1),l){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(l){if(e.pos>=a)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};gl.prototype.parse=function(e,n,t,a){let u=new this.State(e,n,t,a);this.tokenize(u);let o=this.ruler2.getRules(""),l=o.length;for(let r=0;r<l;r++)o[r](u)};gl.prototype.State=c2;var m2=gl;function h2(e){let n={};e=e||{},n.src_Any=ci.source,n.src_Cc=fi.source,n.src_Z=pi.source,n.src_P=$u.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");let t="[><\uFF5C]";return n.src_pseudo_letter="(?:(?!"+t+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+t+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+n.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+n.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Nf(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(a){e[a]=t[a]})}),e}function Ci(e){return Object.prototype.toString.call(e)}function Vy(e){return Ci(e)==="[object String]"}function Gy(e){return Ci(e)==="[object Object]"}function Iy(e){return Ci(e)==="[object RegExp]"}function g2(e){return Ci(e)==="[object Function]"}function Zy(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}var v2={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Yy(e){return Object.keys(e||{}).reduce(function(n,t){return n||v2.hasOwnProperty(t)},!1)}var Qy={"http:":{validate:function(e,n,t){let a=e.slice(n);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(a)?a.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){let a=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(a)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:a.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){let a=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(a)?a.match(t.re.mailto)[0].length:0}}},Xy="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Ky="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");function Jy(e){e.__index__=-1,e.__text_cache__=""}function Py(e){return function(n,t){let a=n.slice(t);return e.test(a)?a.match(e)[0].length:0}}function b2(){return function(e,n){n.normalize(e)}}function wi(e){let n=e.re=h2(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Xy),t.push(n.src_xn),n.src_tlds=t.join("|");function a(r){return r.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(a(n.tpl_email_fuzzy),"i"),n.link_fuzzy=RegExp(a(n.tpl_link_fuzzy),"i"),n.link_no_ip_fuzzy=RegExp(a(n.tpl_link_no_ip_fuzzy),"i"),n.host_fuzzy_test=RegExp(a(n.tpl_host_fuzzy_test),"i");let u=[];e.__compiled__={};function o(r,i){throw new Error('(LinkifyIt) Invalid schema "'+r+'": '+i)}Object.keys(e.__schemas__).forEach(function(r){let i=e.__schemas__[r];if(i===null)return;let s={validate:null,link:null};if(e.__compiled__[r]=s,Gy(i)){Iy(i.validate)?s.validate=Py(i.validate):g2(i.validate)?s.validate=i.validate:o(r,i),g2(i.normalize)?s.normalize=i.normalize:i.normalize?o(r,i):s.normalize=b2();return}if(Vy(i)){u.push(r);return}o(r,i)}),u.forEach(function(r){e.__compiled__[e.__schemas__[r]]&&(e.__compiled__[r].validate=e.__compiled__[e.__schemas__[r]].validate,e.__compiled__[r].normalize=e.__compiled__[e.__schemas__[r]].normalize)}),e.__compiled__[""]={validate:null,normalize:b2()};let l=Object.keys(e.__compiled__).filter(function(r){return r.length>0&&e.__compiled__[r]}).map(Zy).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><\uFF5C]|"+n.src_ZPCc+"))("+l+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><\uFF5C]|"+n.src_ZPCc+"))("+l+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),Jy(e)}function Wy(e,n){let t=e.__index__,a=e.__last_index__,u=e.__text_cache__.slice(t,a);this.schema=e.__schema__.toLowerCase(),this.index=t+n,this.lastIndex=a+n,this.raw=u,this.text=u,this.url=u}function zf(e,n){let t=new Wy(e,n);return e.__compiled__[t.schema].normalize(t,e),t}function Tn(e,n){if(!(this instanceof Tn))return new Tn(e,n);n||Yy(e)&&(n=e,e={}),this.__opts__=Nf({},v2,n),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Nf({},Qy,e),this.__compiled__={},this.__tlds__=Ky,this.__tlds_replaced__=!1,this.re={},wi(this)}Tn.prototype.add=function(n,t){return this.__schemas__[n]=t,wi(this),this};Tn.prototype.set=function(n){return this.__opts__=Nf(this.__opts__,n),this};Tn.prototype.test=function(n){if(this.__text_cache__=n,this.__index__=-1,!n.length)return!1;let t,a,u,o,l,r,i,s,f;if(this.re.schema_test.test(n)){for(i=this.re.schema_search,i.lastIndex=0;(t=i.exec(n))!==null;)if(o=this.testSchemaAt(n,t[2],i.lastIndex),o){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+o;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(s=n.search(this.re.host_fuzzy_test),s>=0&&(this.__index__<0||s<this.__index__)&&(a=n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(l=a.index+a[1].length,(this.__index__<0||l<this.__index__)&&(this.__schema__="",this.__index__=l,this.__last_index__=a.index+a[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(f=n.indexOf("@"),f>=0&&(u=n.match(this.re.email_fuzzy))!==null&&(l=u.index+u[1].length,r=u.index+u[0].length,(this.__index__<0||l<this.__index__||l===this.__index__&&r>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=l,this.__last_index__=r))),this.__index__>=0};Tn.prototype.pretest=function(n){return this.re.pretest.test(n)};Tn.prototype.testSchemaAt=function(n,t,a){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,a,this):0};Tn.prototype.match=function(n){let t=[],a=0;this.__index__>=0&&this.__text_cache__===n&&(t.push(zf(this,a)),a=this.__last_index__);let u=a?n.slice(a):n;for(;this.test(u);)t.push(zf(this,a)),u=u.slice(this.__last_index__),a+=this.__last_index__;return t.length?t:null};Tn.prototype.matchAtStart=function(n){if(this.__text_cache__=n,this.__index__=-1,!n.length)return null;let t=this.re.schema_at_start.exec(n);if(!t)return null;let a=this.testSchemaAt(n,t[2],t[0].length);return a?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+a,zf(this,0)):null};Tn.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(a,u,o){return a!==o[u-1]}).reverse(),wi(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,wi(this),this)};Tn.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};Tn.prototype.onCompile=function(){};var x2=Tn;var $y=/^xn--/,e6=/[^\0-\x7F]/,n6=/[\x2E\u3002\uFF0E\uFF61]/g,t6={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Lf=35,mt=Math.floor,Of=String.fromCharCode;function Ca(e){throw new RangeError(t6[e])}function a6(e,n){let t=[],a=e.length;for(;a--;)t[a]=n(e[a]);return t}function w2(e,n){let t=e.split("@"),a="";t.length>1&&(a=t[0]+"@",e=t[1]),e=e.replace(n6,".");let u=e.split("."),o=a6(u,n).join(".");return a+o}function C2(e){let n=[],t=0,a=e.length;for(;t<a;){let u=e.charCodeAt(t++);if(u>=55296&&u<=56319&&t<a){let o=e.charCodeAt(t++);(o&64512)==56320?n.push(((u&1023)<<10)+(o&1023)+65536):(n.push(u),t--)}else n.push(u)}return n}var u6=e=>String.fromCodePoint(...e),o6=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:36},y2=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},k2=function(e,n,t){let a=0;for(e=t?mt(e/700):e>>1,e+=mt(e/n);e>Lf*26>>1;a+=36)e=mt(e/Lf);return mt(a+(Lf+1)*e/(e+38))},_2=function(e){let n=[],t=e.length,a=0,u=128,o=72,l=e.lastIndexOf("-");l<0&&(l=0);for(let r=0;r<l;++r)e.charCodeAt(r)>=128&&Ca("not-basic"),n.push(e.charCodeAt(r));for(let r=l>0?l+1:0;r<t;){let i=a;for(let f=1,m=36;;m+=36){r>=t&&Ca("invalid-input");let d=o6(e.charCodeAt(r++));d>=36&&Ca("invalid-input"),d>mt((2147483647-a)/f)&&Ca("overflow"),a+=d*f;let p=m<=o?1:m>=o+26?26:m-o;if(d<p)break;let b=36-p;f>mt(2147483647/b)&&Ca("overflow"),f*=b}let s=n.length+1;o=k2(a-i,s,i==0),mt(a/s)>2147483647-u&&Ca("overflow"),u+=mt(a/s),a%=s,n.splice(a++,0,u)}return String.fromCodePoint(...n)},S2=function(e){let n=[];e=C2(e);let t=e.length,a=128,u=0,o=72;for(let i of e)i<128&&n.push(Of(i));let l=n.length,r=l;for(l&&n.push("-");r<t;){let i=2147483647;for(let f of e)f>=a&&f<i&&(i=f);let s=r+1;i-a>mt((2147483647-u)/s)&&Ca("overflow"),u+=(i-a)*s,a=i;for(let f of e)if(f<a&&++u>2147483647&&Ca("overflow"),f===a){let m=u;for(let d=36;;d+=36){let p=d<=o?1:d>=o+26?26:d-o;if(m<p)break;let b=m-p,C=36-p;n.push(Of(y2(p+b%C,0))),m=mt(b/C)}n.push(Of(y2(m,0))),o=k2(u,s,r===l),u=0,++r}++u,++a}return n.join("")},l6=function(e){return w2(e,function(n){return $y.test(n)?_2(n.slice(4).toLowerCase()):n})},r6=function(e){return w2(e,function(n){return e6.test(n)?"xn--"+S2(n):n})},i6={version:"2.3.1",ucs2:{decode:C2,encode:u6},decode:_2,encode:S2,toASCII:r6,toUnicode:l6};var Ff=i6;var A2={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}};var E2={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}};var T2={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}};var s6={default:A2,zero:E2,commonmark:T2},c6=/^(vbscript|javascript|file|data):/,f6=/^data:image\/(gif|png|jpeg|webp);/;function d6(e){let n=e.trim().toLowerCase();return c6.test(n)?f6.test(n):!0}var D2=["http:","https:","mailto:"];function p6(e){let n=pl(e,!0);if(n.hostname&&(!n.protocol||D2.indexOf(n.protocol)>=0))try{n.hostname=Ff.toASCII(n.hostname)}catch{}return ri(Wu(n))}function m6(e){let n=pl(e,!0);if(n.hostname&&(!n.protocol||D2.indexOf(n.protocol)>=0))try{n.hostname=Ff.toUnicode(n.hostname)}catch{}return dl(Wu(n),dl.defaultChars+"%")}function Vn(e,n){if(!(this instanceof Vn))return new Vn(e,n);n||gi(e)||(n=e||{},e="default"),this.inline=new m2,this.block=new s2,this.core=new $g,this.renderer=new Qg,this.linkify=new x2,this.validateLink=d6,this.normalizeLink=p6,this.normalizeLinkText=m6,this.utils=V0,this.helpers=eo({},Y0),this.options={},this.configure(e),n&&this.set(n)}Vn.prototype.set=function(e){return eo(this.options,e),this};Vn.prototype.configure=function(e){let n=this;if(gi(e)){let t=e;if(e=s6[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};Vn.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));let a=e.filter(function(u){return t.indexOf(u)<0});if(a.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+a);return this};Vn.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));let a=e.filter(function(u){return t.indexOf(u)<0});if(a.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+a);return this};Vn.prototype.use=function(e){let n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};Vn.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");let t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};Vn.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};Vn.prototype.parseInline=function(e,n){let t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};Vn.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var qf=Vn;var M2=document.createElement("style");M2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Styles for MarkdownRenderer component
 */

.markdown-content {
  /* Base styles for markdown content */
  line-height: 1.6;
  color: var(--app-primary-foreground);
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 1.75em;
  border-bottom: 1px solid var(--app-primary-border-color);
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--app-primary-border-color);
  padding-bottom: 0.3em;
}

.markdown-content h3 {
  font-size: 1.25em;
}

.markdown-content h4 {
  font-size: 1.1em;
}

.markdown-content h5,
.markdown-content h6 {
  font-size: 1em;
}

.markdown-content p {
  margin-top: 0;
  /* margin-bottom: 1em; */
}

.markdown-content ul,
.markdown-content ol {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 2em;
}

/* Ensure list markers are visible even with global CSS resets */
.markdown-content ul {
  list-style-type: disc;
  list-style-position: outside;
}

.markdown-content ol {
  list-style-type: decimal;
  list-style-position: outside;
}

/* Nested list styles */
.markdown-content ul ul {
  list-style-type: circle;
}

.markdown-content ul ul ul {
  list-style-type: square;
}

.markdown-content ol ol {
  list-style-type: lower-alpha;
}

.markdown-content ol ol ol {
  list-style-type: lower-roman;
}

/* Style the marker explicitly so themes don't hide it */
.markdown-content li::marker {
  color: var(--app-secondary-foreground);
}

.markdown-content li {
  margin-bottom: 0.25em;
}

.markdown-content li > p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.markdown-content blockquote {
  margin: 0 0 1em;
  padding: 0 1em;
  border-left: 0.25em solid var(--app-primary-border-color);
  color: var(--app-secondary-foreground);
}

.markdown-content a {
  color: var(--app-link-foreground, #007acc);
  text-decoration: none;
}

.markdown-content a:hover {
  color: var(--app-link-active-foreground, #005a9e);
  text-decoration: underline;
}

.markdown-content code {
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.9em;
  background-color: var(--app-code-background, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--app-primary-border-color);
  border-radius: var(--corner-radius-small, 4px);
  padding: 0.2em 0.4em;
  white-space: pre-wrap; /* Support automatic line wrapping */
  word-break: break-word; /* Break words when necessary */
}

.markdown-content pre {
  margin: 1em 0;
  padding: 1em;
  overflow-x: auto;
  background-color: var(--app-code-background, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--app-primary-border-color);
  border-radius: var(--corner-radius-small, 4px);
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.9em;
  line-height: 1.5;
}

.markdown-content pre code {
  background: none;
  border: none;
  padding: 0;
  white-space: pre-wrap; /* Support automatic line wrapping */
  word-break: break-word; /* Break words when necessary */
}

.markdown-content .file-path-link {
  background: transparent;
  border: none;
  padding: 0;
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.95em;
  color: var(--app-link-foreground, #007acc);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.1s ease;
}

.markdown-content .file-path-link:hover {
  color: var(--app-link-active-foreground, #005a9e);
}

.markdown-content hr {
  border: none;
  border-top: 1px solid var(--app-primary-border-color);
  margin: 1.5em 0;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  padding: 0.5em 1em;
  border: 1px solid var(--app-primary-border-color);
  text-align: left;
}

.markdown-content th {
  background-color: var(--app-secondary-background);
  font-weight: 600;
}
`;document.head.appendChild(M2);var N2=T(R(),1);var Uf=/(?:[a-zA-Z]:)?[/\\](?:[\w\-. ]+[/\\])+[\w\-. ]+\.(tsx?|jsx?|css|scss|json|md|py|java|go|rs|c|cpp|h|hpp|sh|yaml|yml|toml|xml|html|vue|svelte)/gi,Bf=/(?:[a-zA-Z]:)?[/\\](?:[\w\-. ]+[/\\])+[\w\-. ]+\.(tsx?|jsx?|css|scss|json|md|py|java|go|rs|c|cpp|h|hpp|sh|yaml|yml|toml|xml|html|vue|svelte)#(\d+)(?:-(\d+))?/gi,R2=({content:e,onFileClick:n,enableFileLinks:t=!0})=>{let a=()=>new qf({html:!1,xhtmlOut:!1,breaks:!0,linkify:!0,typographer:!0}),u=()=>{try{let s=a().render(e);return t&&(s=l(s)),s}catch(i){return console.error("Error rendering markdown:",i),o(e)}},o=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),l=i=>{if(typeof document>"u")return i;let s=new RegExp(Uf.source,Uf.flags.replace("g","")),f=new RegExp(Bf.source,Bf.flags.replace("g","")),m=/[\w\-. ]+\.(tsx?|jsx?|css|scss|json|md|py|java|go|rs|c|cpp|h|hpp|sh|ya?ml|toml|xml|html|vue|svelte)/i,d=document.createElement("div");d.innerHTML=i;let p=new RegExp(`${Bf.source}|${Uf.source}|${m.source}`,"gi"),b=h=>{let v=h,x=h,w=h.indexOf("#");if(w>=0){let k=h.slice(w+1).match(/^L?(\d+)(?:-\d+)?$/i);if(k){let A=parseInt(k[1],10);return x=h.slice(0,w),{displayText:v,dataPath:`${x}:${A}`}}}return{displayText:v,dataPath:x}},C=h=>{let v=document.createElement("a"),{dataPath:x}=b(h);return v.className="file-path-link",v.textContent=h,v.setAttribute("href","#"),v.setAttribute("title",`Open ${h}`),v.setAttribute("data-file-path",x),v},_=h=>{let v=h.getAttribute("href")||"",x=(h.textContent||"").trim(),w=A=>m.test(A)||/[/\\]/.test(A)?!1:/^[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)+$/.test(A);if(v.match(/^https?:\/\/(.+)$/i))try{let A=new URL(v),E=A.hostname||"",D=A.pathname||"",M=D===""||D==="/";if(M&&m.test(x)&&E.toLowerCase()===x.toLowerCase()){let{dataPath:re}=b(x);h.classList.add("file-path-link"),h.setAttribute("href","#"),h.setAttribute("title",`Open ${x}`),h.setAttribute("data-file-path",re);return}if(M&&m.test(E)){let{dataPath:re}=b(E);h.classList.add("file-path-link"),h.setAttribute("href","#"),h.setAttribute("title",`Open ${x||E}`),h.setAttribute("data-file-path",re);return}}catch{}if(/^(https?|mailto|ftp|data):/i.test(v))return;let k=v||x;if(!w(k)){if(f.test(k)||s.test(k)){let{dataPath:A}=b(k);h.classList.add("file-path-link"),h.setAttribute("href","#"),h.setAttribute("title",`Open ${x||v}`),h.setAttribute("data-file-path",A);return}if(m.test(k)){let{dataPath:A}=b(k);h.classList.add("file-path-link"),h.setAttribute("href","#"),h.setAttribute("title",`Open ${x||v}`),h.setAttribute("data-file-path",A)}}},g=h=>m.test(h)||/[/\\]/.test(h)?!1:/^[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)+$/.test(h),c=h=>{if(h.nodeType===Node.ELEMENT_NODE){let v=h;if(v.tagName.toLowerCase()==="a"){_(v);return}let x=v.tagName.toLowerCase();if(x==="code"||x==="pre")return}for(let v=h.firstChild;v;){let x=v.nextSibling;if(v.nodeType===Node.TEXT_NODE){let w=v.nodeValue||"";p.lastIndex=0;let y=p.test(w);if(p.lastIndex=0,y){let k=document.createDocumentFragment(),A=0,E;for(;E=p.exec(w);){let D=E[0],M=E.index;if(g(D)){M>A&&k.appendChild(document.createTextNode(w.slice(A,M))),k.appendChild(document.createTextNode(D)),A=M+D.length;continue}M>A&&k.appendChild(document.createTextNode(w.slice(A,M))),k.appendChild(C(D)),A=M+D.length}A<w.length&&k.appendChild(document.createTextNode(w.slice(A))),h.replaceChild(k,v)}}else v.nodeType===Node.ELEMENT_NODE&&c(v);v=x}};return c(d),d.innerHTML};return(0,N2.jsx)("div",{className:"markdown-content",onClick:i=>{if(!t)return;let s=i.target;if(!s)return;let f=s.closest&&s.closest("a.file-path-link");if(f){let p=f.getAttribute("data-file-path");if(!p)return;i.preventDefault(),i.stopPropagation(),n?.(p);return}let m=s.closest&&s.closest("a");if(!m)return;let d=m.getAttribute("href")||"";if(/^https?:\/\//i.test(d))try{let p=new URL(d),b=p.hostname||"",C=p.pathname||"";if((C===""||C==="/")&&/\.[a-z0-9]+$/i.test(b)){let g=(m.textContent||"").trim(),c=/\.[a-z0-9]+$/i.test(g)?g:b;i.preventDefault(),i.stopPropagation(),n?.(c)}}catch{}},dangerouslySetInnerHTML:{__html:u()},style:{wordWrap:"break-word",overflowWrap:"break-word",whiteSpace:"normal"}})};var z2=T(R(),1);var uo=({content:e,onFileClick:n,enableFileLinks:t})=>(0,z2.jsx)(R2,{content:e,onFileClick:n,enableFileLinks:t});var ka=T(R(),1);var Hf=({content:e,timestamp:n,onFileClick:t,fileContext:a})=>{let o=(()=>{if(!a)return null;let{fileName:l,startLine:r,endLine:i}=a;return r&&i?r===i?`${l}#${r}`:`${l}#${r}-${i}`:l})();return(0,ka.jsxs)("div",{className:"qwen-message user-message-container flex gap-0 my-1 items-start text-left flex-col relative",style:{position:"relative"},children:[(0,ka.jsx)("div",{className:"inline-block relative whitespace-pre-wrap rounded-md max-w-full overflow-x-auto overflow-y-hidden select-text leading-[1.5]",style:{border:"1px solid var(--app-input-border)",borderRadius:"var(--corner-radius-medium)",backgroundColor:"var(--app-input-background)",padding:"4px 6px",color:"var(--app-primary-foreground)"},children:(0,ka.jsx)(uo,{content:e,onFileClick:t,enableFileLinks:!1})}),o&&(0,ka.jsx)("div",{className:"mt-1",children:(0,ka.jsx)("div",{role:"button",tabIndex:0,className:"mr inline-flex items-center py-0 pr-2 gap-1 rounded-sm cursor-pointer relative opacity-50",onClick:()=>a&&t?.(a.filePath),onKeyDown:l=>{(l.key==="Enter"||l.key===" ")&&a&&t?.(a.filePath)},children:(0,ka.jsx)("div",{className:"gr",title:o,style:{fontSize:"12px",color:"var(--app-secondary-foreground)"},children:o})})})]})};var L2=document.createElement("style");L2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * AssistantMessage Component Styles
 * Pseudo-elements (::before) for bullet points and (::after) for timeline connectors
 */

/* Bullet point indicator using ::before pseudo-element */
.assistant-message-container.assistant-message-default::before,
.assistant-message-container.assistant-message-success::before,
.assistant-message-container.assistant-message-error::before,
.assistant-message-container.assistant-message-warning::before,
.assistant-message-container.assistant-message-loading::before {
  content: '\\25cf';
  position: absolute;
  left: 8px;
  padding-top: 2px;
  font-size: 10px;
  z-index: 1;
}

/* Default state - secondary foreground color */
.assistant-message-container.assistant-message-default::before {
  color: var(--app-secondary-foreground);
}

/* Success state - green bullet (maps to .ge) */
.assistant-message-container.assistant-message-success::before {
  color: #74c991;
}

/* Error state - red bullet (maps to .be) */
.assistant-message-container.assistant-message-error::before {
  color: #c74e39;
}

/* Warning state - yellow/orange bullet (maps to .ue) */
.assistant-message-container.assistant-message-warning::before {
  color: #e1c08d;
}

/* Loading state - static bullet (maps to .he) */
.assistant-message-container.assistant-message-loading::before {
  color: var(--app-secondary-foreground);
  background-color: var(--app-secondary-background);
}

.assistant-message-container.assistant-message-loading::after {
  display: none;
}
`;document.head.appendChild(L2);var bl=T(R(),1);var jf=({content:e,timestamp:n,onFileClick:t,status:a="default",hideStatusIcon:u=!1})=>!e||e.trim().length===0?null:(0,bl.jsx)("div",{className:`qwen-message message-item assistant-message-container ${(()=>{if(u)return"";switch(a){case"success":return"assistant-message-success";case"error":return"assistant-message-error";case"warning":return"assistant-message-warning";case"loading":return"assistant-message-loading";default:return"assistant-message-default"}})()}`,style:{width:"100%",alignItems:"flex-start",paddingLeft:"30px",userSelect:"text",position:"relative"},children:(0,bl.jsx)("span",{style:{width:"100%"},children:(0,bl.jsx)("div",{style:{margin:0,width:"100%",wordWrap:"break-word",overflowWrap:"break-word",whiteSpace:"normal"},children:(0,bl.jsx)(uo,{content:e,onFileClick:t,enableFileLinks:!1})})})});var It=T(R(),1);var Vf=({content:e,timestamp:n,onFileClick:t})=>(0,It.jsx)("div",{className:"qwen-message thinking-message flex gap-0 items-start text-left py-2 flex-col relative opacity-80 italic pl-6 animate-[fadeIn_0.2s_ease-in]",children:(0,It.jsxs)("div",{className:"inline-block my-1 relative whitespace-pre-wrap rounded-md max-w-full overflow-x-auto overflow-y-hidden select-text leading-[1.5]",style:{backgroundColor:"var(--app-list-hover-background, rgba(100, 100, 255, 0.1))",border:"1px solid rgba(100, 100, 255, 0.3)",borderRadius:"var(--corner-radius-medium)",padding:"var(--app-spacing-medium)",color:"var(--app-primary-foreground)"},children:[(0,It.jsxs)("span",{className:"inline-flex items-center gap-1 mr-2",children:[(0,It.jsx)("span",{className:"inline-block w-1.5 h-1.5 bg-[var(--app-secondary-foreground)] rounded-full opacity-60 animate-[typingPulse_1.4s_infinite_ease-in-out] [animation-delay:0s]"}),(0,It.jsx)("span",{className:"inline-block w-1.5 h-1.5 bg-[var(--app-secondary-foreground)] rounded-full opacity-60 animate-[typingPulse_1.4s_infinite_ease-in-out] [animation-delay:0.2s]"}),(0,It.jsx)("span",{className:"inline-block w-1.5 h-1.5 bg-[var(--app-secondary-foreground)] rounded-full opacity-60 animate-[typingPulse_1.4s_infinite_ease-in-out] [animation-delay:0.4s]"})]}),(0,It.jsx)(uo,{content:e,onFileClick:t})]})});var tu=T(je(),1);var O2=document.createElement("style");O2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

@import url('../Assistant/AssistantMessage.css');

/* Subtle shimmering highlight across the loading text */
@keyframes waitingMessageShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.loading-text-shimmer {
  /* Use the theme foreground as the base color, with a moving light band */
  background-image: linear-gradient(
    90deg,
    var(--app-secondary-foreground) 0%,
    var(--app-secondary-foreground) 40%,
    rgba(255, 255, 255, 0.95) 50%,
    var(--app-secondary-foreground) 60%,
    var(--app-secondary-foreground) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* text color comes from the gradient */
  animation: waitingMessageShimmer 1.6s linear infinite;
}

.interrupted-item::after {
  display: none;
}
`;document.head.appendChild(O2);var ki=T(R(),1);var h6=3e3,Gf=({loadingMessage:e})=>{let n=(0,tu.useMemo)(()=>{let u=new Set,o=[];e&&e.trim()&&(o.push(e),u.add(e));for(let l of Wr)u.has(l)||o.push(l);return o},[e]),[t,a]=(0,tu.useState)(0);return(0,tu.useEffect)(()=>{a(0)},[n]),(0,tu.useEffect)(()=>{if(n.length<=1)return;let u=setInterval(()=>{a(o=>{let l=Math.floor(Math.random()*n.length);if(n.length>1){let r=0;for(;l===o&&r<5;)l=Math.floor(Math.random()*n.length),r++}return l})},h6);return()=>clearInterval(u)},[n]),(0,ki.jsx)("div",{className:"waiting-message-outer flex gap-0 items-start text-left py-2 flex-col opacity-85",children:(0,ki.jsx)("div",{className:"assistant-message-container assistant-message-loading waiting-message-inner w-full items-start pl-[30px] relative",children:(0,ki.jsx)("span",{className:"waiting-message-text opacity-70 italic loading-text-shimmer",children:n[t]})})})};var _i=T(R(),1);var If=({text:e="Interrupted"})=>(0,_i.jsx)("div",{className:"flex gap-0 items-start text-left py-2 flex-col opacity-85",children:(0,_i.jsx)("div",{className:"interrupted-item w-full relative",children:(0,_i.jsx)("span",{className:"opacity-70 italic",children:e})})});var ht=T(je(),1),Xn=T(R(),1);var F2=({items:e,onSelect:n,onClose:t,title:a,selectedIndex:u=0})=>{let o=(0,ht.useRef)(null),[l,r]=(0,ht.useState)(u),[i,s]=(0,ht.useState)(!1);return(0,ht.useEffect)(()=>r(u),[u]),(0,ht.useEffect)(()=>s(!0),[]),(0,ht.useEffect)(()=>{let f=d=>{o.current&&!o.current.contains(d.target)&&t()},m=d=>{switch(d.key){case"ArrowDown":d.preventDefault(),r(p=>Math.min(p+1,e.length-1));break;case"ArrowUp":d.preventDefault(),r(p=>Math.max(p-1,0));break;case"Enter":d.preventDefault(),e[l]&&n(e[l]);break;case"Escape":d.preventDefault(),t();break;default:break}};return document.addEventListener("mousedown",f),document.addEventListener("keydown",m),()=>{document.removeEventListener("mousedown",f),document.removeEventListener("keydown",m)}},[e,l,n,t]),(0,ht.useEffect)(()=>{let f=o.current?.querySelector(`[data-index="${l}"]`);f&&f.scrollIntoView({block:"nearest"})},[l]),e.length?(0,Xn.jsxs)("div",{ref:o,role:"menu",className:["completion-menu","absolute bottom-full left-0 right-0 mb-2 flex flex-col overflow-hidden","rounded-large border bg-[var(--app-menu-background)]","border-[var(--app-input-border)] max-h-[50vh] z-[1000]",i?"animate-completion-menu-enter":""].join(" "),children:[(0,Xn.jsx)("div",{className:"h-1"}),(0,Xn.jsxs)("div",{className:["completion-menu-list","flex max-h-[300px] flex-col overflow-y-auto","p-[var(--app-list-padding)] pb-2 gap-[var(--app-list-gap)]"].join(" "),children:[a&&(0,Xn.jsx)("div",{className:"completion-menu-section-label px-3 py-1 text-[var(--app-primary-foreground)] opacity-50 text-[0.9em]",children:a}),e.map((f,m)=>{let d=m===l;return(0,Xn.jsx)("div",{"data-index":m,role:"menuitem",onClick:()=>n(f),onMouseEnter:()=>r(m),className:["completion-menu-item","mx-1 cursor-pointer rounded-[var(--app-list-border-radius)]","p-[var(--app-list-item-padding)]",d?"bg-[var(--app-list-active-background)]":""].join(" "),children:(0,Xn.jsxs)("div",{className:"completion-menu-item-row flex items-center justify-between gap-2",children:[f.icon&&(0,Xn.jsx)("span",{className:"completion-menu-item-icon inline-flex h-4 w-4 items-center justify-center text-[var(--vscode-symbolIcon-fileForeground,#cccccc)]",children:f.icon}),(0,Xn.jsx)("span",{className:["completion-menu-item-label flex-1 truncate",d?"text-[var(--app-list-active-foreground)]":"text-[var(--app-primary-foreground)]"].join(" "),children:f.label}),f.description&&(0,Xn.jsx)("span",{className:"completion-menu-item-desc max-w-[50%] truncate text-[0.9em] text-[var(--app-secondary-foreground)] opacity-70",title:f.description,children:f.description})]})},f.id)})]})]}):null};var q2={plan:"plan",default:"default","auto-edit":"auto-edit",yolo:"yolo"},U2={plan:{label:"Plan mode",title:"Qwen will plan before executing. Click to switch modes.",iconType:"plan"},default:{label:"Ask before edits",title:"Qwen will ask before each edit. Click to switch modes.",iconType:"edit"},"auto-edit":{label:"Edit automatically",title:"Qwen will edit files automatically. Click to switch modes.",iconType:"auto"},yolo:{label:"YOLO",title:"Automatically approve all tools. Click to switch modes.",iconType:"yolo"}};function Zf(e){let n=q2[e];return n!==void 0?U2[n]:{label:"Unknown mode",title:"Unknown edit mode",iconType:void 0}}var B2={default:"auto-edit","auto-edit":"yolo",plan:"yolo",yolo:"default"};var W=T(R(),1);var b6=e=>{let n=Zf(e),t=null;switch(n.iconType){case"edit":t=(0,W.jsx)(S0,{});break;case"auto":t=(0,W.jsx)(ai,{});break;case"plan":t=(0,W.jsx)(A0,{});break;case"yolo":t=(0,W.jsx)(ai,{});break;default:t=null;break}return{text:n.label,title:n.title,icon:t}},H2=({inputText:e,inputFieldRef:n,isStreaming:t,isWaitingForResponse:a,isComposing:u,editMode:o,activeFileName:l,activeSelection:r,skipAutoActiveContext:i,onInputChange:s,onCompositionStart:f,onCompositionEnd:m,onKeyDown:d,onSubmit:p,onCancel:b,onToggleEditMode:C,onToggleSkipAutoActiveContext:_,onShowCommandMenu:g,onAttachContext:c,completionIsOpen:h,completionItems:v,onCompletionSelect:x,onCompletionClose:w})=>{let y=b6(o),k=t||a,A=M=>{if(M.key==="Escape"){M.preventDefault(),b();return}if(M.key==="Enter"&&!M.shiftKey&&!u){if(h)return;M.preventDefault(),p(M)}d(M)},E=r?Math.max(1,r.endLine-r.startLine+1):0,D=E>0?`${E} ${E===1?"line":"lines"} selected`:"";return(0,W.jsx)("div",{className:"p-1 px-4 pb-4 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[var(--app-primary-background)]",children:(0,W.jsx)("div",{className:"block",children:(0,W.jsxs)("form",{className:"composer-form",onSubmit:p,children:[(0,W.jsx)("div",{className:"composer-overlay"}),(0,W.jsx)("div",{className:"input-banner"}),(0,W.jsxs)("div",{className:"relative flex z-[1]",children:[h&&v&&v.length>0&&x&&w&&(0,W.jsx)(F2,{items:v,onSelect:x,onClose:w,title:void 0}),(0,W.jsx)("div",{ref:n,contentEditable:"plaintext-only",className:"composer-input",role:"textbox","aria-label":"Message input","aria-multiline":"true","data-placeholder":"Ask Gus Qwen \u2026","data-empty":e.replace(/\u200B/g,"").trim().length===0?"true":"false",onInput:M=>{let We=M.target.textContent?.replace(/\u200B/g,"")||"";s(We)},onCompositionStart:f,onCompositionEnd:m,onKeyDown:A,suppressContentEditableWarning:!0})]}),(0,W.jsxs)("div",{className:"composer-actions",children:[(0,W.jsxs)("button",{type:"button",className:"btn-text-compact btn-text-compact--primary",title:y.title,onClick:C,children:[y.icon,(0,W.jsx)("span",{className:"hidden sm:inline",children:y.text})]}),l&&(0,W.jsxs)("button",{type:"button",className:"btn-text-compact btn-text-compact--primary",title:i?D?`Active selection will NOT be auto-loaded into context: ${D}`:`Active file will NOT be auto-loaded into context: ${l}`:D?`Showing Gus Qwen your current selection: ${D}`:`Showing Gus Qwen your current file: ${l}`,onClick:_,children:[i?(0,W.jsx)(T0,{}):(0,W.jsx)(E0,{}),(0,W.jsx)("span",{className:"hidden sm:inline",children:D||l})]}),(0,W.jsx)("div",{className:"flex-1 min-w-0"}),(0,W.jsx)("button",{type:"button",className:"btn-icon-compact hover:text-[var(--app-primary-foreground)]",title:"Show command menu (/)",onClick:g,children:(0,W.jsx)(D0,{})}),(0,W.jsx)("button",{type:"button",className:"btn-icon-compact hover:text-[var(--app-primary-foreground)]",title:"Attach context (Cmd/Ctrl + /)",onClick:c,children:(0,W.jsx)(M0,{})}),t||a?(0,W.jsx)("button",{type:"button",className:"btn-send-compact [&>svg]:w-5 [&>svg]:h-5",onClick:b,title:"Stop generation",children:(0,W.jsx)(z0,{})}):(0,W.jsx)("button",{type:"submit",className:"btn-send-compact [&>svg]:w-5 [&>svg]:h-5",disabled:k||!e.trim(),children:(0,W.jsx)(k0,{})})]})]})})})};var G2=T(je(),1);var j2=e=>{let n=new Date,t=new Date(n.getFullYear(),n.getMonth(),n.getDate()),a=new Date(t);a.setDate(a.getDate()-1);let u={Today:[],Yesterday:[],"This Week":[],Older:[]};return e.forEach(o=>{let l=o.lastUpdated||o.startTime||"";if(!l){u.Older.push(o);return}let r=new Date(l),i=new Date(r.getFullYear(),r.getMonth(),r.getDate());i.getTime()===t.getTime()?u.Today.push(o):i.getTime()===a.getTime()?u.Yesterday.push(o):i.getTime()>t.getTime()-6048e5?u["This Week"].push(o):u.Older.push(o)}),Object.entries(u).filter(([,o])=>o.length>0).map(([o,l])=>({label:o,sessions:l}))},V2=e=>{if(!e)return"";let n=new Date().getTime(),t=new Date(e).getTime(),a=n-t,u=Math.floor(a/6e4),o=Math.floor(a/36e5),l=Math.floor(a/864e5);return u<1?"now":u<60?`${u}m`:o<24?`${o}h`:l===1?"Yesterday":l<7?`${l}d`:new Date(e).toLocaleDateString()};var De=T(R(),1);var I2=({visible:e,sessions:n,currentSessionId:t,searchQuery:a,onSearchChange:u,onSelectSession:o,onClose:l,hasMore:r=!1,isLoading:i=!1,onLoadMore:s})=>{if(!e)return null;let f=n.length===0;return(0,De.jsxs)(De.Fragment,{children:[(0,De.jsx)("div",{className:"session-selector-backdrop fixed top-0 left-0 right-0 bottom-0 z-[999] bg-transparent",onClick:l}),(0,De.jsxs)("div",{className:"session-dropdown fixed bg-[var(--app-menu-background)] rounded-[var(--corner-radius-small)] w-[min(400px,calc(100vw-32px))] max-h-[min(500px,50vh)] flex flex-col shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[1000] outline-none text-[var(--vscode-chat-font-size,13px)] font-[var(--vscode-chat-font-family)]",tabIndex:-1,style:{top:"30px",left:"10px"},onClick:m=>m.stopPropagation(),children:[(0,De.jsxs)("div",{className:"session-search p-2 flex items-center gap-2",children:[(0,De.jsx)(_0,{className:"session-search-icon w-4 h-4 opacity-50 flex-shrink-0 text-[var(--app-primary-foreground)]"}),(0,De.jsx)("input",{type:"text",className:"session-search-input flex-1 bg-transparent border-none outline-none text-[var(--app-menu-foreground)] text-[var(--vscode-chat-font-size,13px)] font-[var(--vscode-chat-font-family)] p-0 placeholder:text-[var(--app-input-placeholder-foreground)] placeholder:opacity-60",placeholder:"Search sessions\u2026",value:a,onChange:m=>u(m.target.value)})]}),(0,De.jsxs)("div",{className:"session-list-content overflow-y-auto flex-1 select-none p-2",onScroll:m=>{let d=m.currentTarget;d.scrollHeight-(d.scrollTop+d.clientHeight)<48&&r&&!i&&s?.()},children:[f?(0,De.jsx)("div",{className:"p-5 text-center text-[var(--app-secondary-foreground)]",style:{padding:"20px",textAlign:"center",color:"var(--app-secondary-foreground)"},children:a?"No matching sessions":"No sessions available"}):j2(n).map(m=>(0,De.jsxs)(G2.default.Fragment,{children:[(0,De.jsx)("div",{className:"session-group-label p-1 px-2 text-[var(--app-primary-foreground)] opacity-50 text-[0.9em] font-medium [&:not(:first-child)]:mt-2",children:m.label}),(0,De.jsx)("div",{className:"session-group flex flex-col gap-[2px]",children:m.sessions.map(d=>{let p=d.id||d.sessionId||"",b=d.title||d.name||"Untitled",C=d.lastUpdated||d.startTime||"";return(0,De.jsxs)("button",{className:`session-item flex items-center justify-between py-1.5 px-2 bg-transparent border-none rounded-md cursor-pointer text-left w-full text-[var(--vscode-chat-font-size,13px)] font-[var(--vscode-chat-font-family)] text-[var(--app-primary-foreground)] transition-colors duration-100 hover:bg-[var(--app-list-hover-background)] ${p===t?"active bg-[var(--app-list-active-background)] text-[var(--app-list-active-foreground)] font-[600]":""}`,onClick:()=>{o(p),l()},children:[(0,De.jsx)("span",{className:"session-item-title flex-1 overflow-hidden text-ellipsis whitespace-nowrap min-w-0",children:b}),(0,De.jsx)("span",{className:"session-item-time opacity-60 text-[0.9em] flex-shrink-0 ml-3",children:V2(C)})]},p)})})]},m.label)),r&&(0,De.jsx)("div",{className:"p-2 text-center opacity-60 text-[0.9em]",children:i?"Loading\u2026":""})]})]})]})};var $=T(R(),1);var Z2=()=>{let e=rt(),n=Hh(e),t=jh(e),a=Vh(),{inProgressToolCalls:u,completedToolCalls:o,handleToolCallUpdate:l,clearToolCalls:r}=Gh(),[i,s]=(0,U.useState)(""),[f,m]=(0,U.useState)(null),[d,p]=(0,U.useState)(null),[b,C]=(0,U.useState)([]),[_,g]=(0,U.useState)(null),[c,h]=(0,U.useState)(!0),[v,x]=(0,U.useState)([]),w=(0,U.useRef)(null),y=(0,U.useRef)(null),k=(0,U.useRef)(null),[A,E]=(0,U.useState)("default"),[D,M]=(0,U.useState)(!1),[re,We]=(0,U.useState)(!1),[$e,Dn]=(0,U.useState)(!1),_a=U.default.useCallback(N=>N.trim().replace(/^@/,"").replace(/\\/g,"/").toLowerCase(),[]),vl=U.default.useCallback(N=>N.replace(/\\/g,"/").toLowerCase(),[]),Yf=U.default.useCallback(async(N,z)=>{if(N==="@"){console.log("[App] getCompletionItems @ called",{query:z,requested:t.hasRequestedFiles,workspaceFiles:t.workspaceFiles.length}),t.requestWorkspaceFiles(z);let Z=(0,$.jsx)(x0,{}),O=(0,$.jsx)(y0,{}),K=t.workspaceFiles.map(ue=>{let en=ue.type==="folder",Ue=ue.description??ue.label;return{id:ue.id,label:Ue,description:ue.description?ue.label:void 0,type:en?"folder":"file",icon:en?O:Z,value:Ue,path:ue.path}});if(z&&z.length>=1){let ue=_a(z);if(!ue)return K;let en=ue.endsWith("/"),Ue=en?ue.slice(0,-1):ue,gt=Kn=>{let Me=vl(Kn);return en&&Me===Ue?!0:Me.includes(ue)};return K.filter(Kn=>gt(Kn.label)||(Kn.description?gt(Kn.description):!1))}return K.length===0?[{id:"loading-files",label:"Searching files\u2026",description:"Type to filter, or wait a moment\u2026",type:"info"}]:K}else{let Z=(0,$.jsx)(R0,{}),O=be=>be.subcommands??be.subCommands??[],K=(be,Jn,Pn)=>({id:`/${Pn}`,label:be,description:Jn,type:"command",icon:Z,value:Pn}),ue=z??"",en=ue.trim(),Ue=/\s$/.test(ue);if(!en)return v.map(be=>K(`/${be.name}`,be.description,be.name));let gt=en.split(/\s+/),Kn=Ue?gt:gt.slice(0,-1),Me=v,Be=[];for(let be of Kn){let Jn=Me.find(Pn=>Pn.name.toLowerCase()===be.toLowerCase());if(!Jn)return[];Be.push(Jn.name),Me=O(Jn)}let He=(be,Jn,Pn)=>{let Si=Jn.length===0;return be.filter(Aa=>Pn?Aa.name.toLowerCase().startsWith(Pn.toLowerCase()):!0).map(Aa=>{let Ea=Aa.name,yl=Si?`/${Ea}`:Ea,Wn=[...Jn,Ea].join(" ");return K(yl,Aa.description,Wn)})};if(Ue)return He(Me,Be);let Mn=gt[gt.length-1]??"",Sa=Me.find(be=>be.name.toLowerCase()===Mn.toLowerCase());if(Sa){let be=O(Sa);if(be.length>0)return He(be,[...Be,Sa.name])}return He(Me,Be,Mn)}},[t,v,_a,vl]),qe=Sg(k,Yf),W2=(0,U.useMemo)(()=>t.workspaceFiles.map(N=>`${N.id}|${N.label}|${N.description??""}|${N.path}`).join("||"),[t.workspaceFiles]);(0,U.useEffect)(()=>{qe.isOpen&&qe.triggerChar==="@"&&!qe.query&&qe.refreshCompletion()},[W2,qe.isOpen,qe.triggerChar,qe.query]);let{handleSubmit:Qf}=Qh({inputText:i,setInputText:s,messageHandling:a,fileContext:t,skipAutoActiveContext:$e,vscode:e,inputFieldRef:k,isStreaming:a.isStreaming,isWaitingForResponse:a.isWaitingForResponse}),$2=(0,U.useCallback)(()=>{if(a.isStreaming||a.isWaitingForResponse){try{a.endStreaming?.()}catch{}try{a.clearWaitingForResponse?.()}catch{}a.addMessage({role:"assistant",content:"Interrupted",timestamp:Date.now()})}e.postMessage({type:"cancelStreaming",data:{}})},[a,e]);Ih({sessionManagement:n,fileContext:t,messageHandling:a,handleToolCallUpdate:l,clearToolCalls:r,setPlanEntries:C,handlePermissionRequest:m,handleConfirmActionRequest:p,inputFieldRef:k,setInputText:s,setEditMode:E,setIsAuthenticated:g,setAvailableCommands:x});let[xl,Xf]=(0,U.useState)(!0),Kf=(0,U.useRef)({msgLen:0,inProgLen:0,doneLen:0});(0,U.useEffect)(()=>{let N=y.current;if(!N)return;let z=()=>{let O=N.scrollHeight-(N.scrollTop+N.clientHeight);Xf(O<=80)};return z(),N.addEventListener("scroll",z,{passive:!0}),()=>N.removeEventListener("scroll",z)},[]),(0,U.useLayoutEffect)(()=>{let N=y.current;if(!N)return;let z=Kf.current,Z=a.messages.length>z.msgLen,O=u.length>z.inProgLen,K=o.length>z.doneLen;if(Kf.current={msgLen:a.messages.length,inProgLen:u.length,doneLen:o.length},!xl)return;let ue=Z||O||K,en=requestAnimationFrame(()=>{let Ue=N.scrollHeight-N.clientHeight;N.scrollTo({top:Ue,behavior:ue?"smooth":"auto"})});return()=>cancelAnimationFrame(en)},[xl,a.messages,u,o,a.isWaitingForResponse,a.loadingMessage,a.isStreaming,b]),(0,U.useEffect)(()=>{let N=y.current,z=w.current;if(!N||!z)return;let Z=z.previousElementSibling;if(!Z)return;let O=0,K=new ResizeObserver(()=>{xl&&(cancelAnimationFrame(O),O=requestAnimationFrame(()=>{let ue=N.scrollHeight-N.clientHeight;N.scrollTo({top:ue})}))});return K.observe(Z),()=>{cancelAnimationFrame(O),K.disconnect()}},[xl,a.messages,u,o]),(0,U.useEffect)(()=>{_!==null&&h(!1)},[_]);let eb=(0,U.useCallback)(N=>{e.postMessage({type:"permissionResponse",data:{optionId:N}}),m(null)},[e]),nb=(0,U.useMemo)(()=>[{name:"Confirm",kind:"proceed",optionId:"confirm"},{name:"Cancel",kind:"reject",optionId:"cancel"}],[]),tb=(0,U.useCallback)(N=>{let z=d;p(null),z&&(N==="confirm"&&z.raw?e.postMessage({type:"sendMessage",data:{text:z.raw}}):a.addMessage({role:"assistant",content:"Operation cancelled.",timestamp:Date.now()}))},[d,a,e]),ab=(0,U.useCallback)(N=>{Xf(!0);let z=y.current;if(z){let Z=z.scrollHeight-z.clientHeight;z.scrollTo({top:Z})}Qf(N)},[Qf]),ub=(0,U.useCallback)(N=>{let z=k.current;if(!z)return;if(N.type==="info"){qe.closeCompletion();return}if(N.type==="command"){if((N.label||"").trim()==="/login"){e.postMessage({type:"login",data:{}}),qe.closeCompletion();return}let Be=Wn=>Wn.subcommands??Wn.subCommands??[],He=(Wn,oo)=>{let lo=Wn,Ta=null;for(let cb of oo){let Ai=lo.find(fb=>fb.name.toLowerCase()===cb.toLowerCase())||null;if(!Ai)return null;Ta=Ai,lo=Be(Ai)}return Ta},Mn=Wn=>{let oo=window.getSelection();if(oo&&oo.rangeCount>0){let Ta=oo.getRangeAt(0).getBoundingClientRect();if(Ta.top>0&&Ta.left>0)return{top:Ta.top,left:Ta.left}}let lo=Wn.getBoundingClientRect();return{top:lo.top,left:lo.left}},Sa=typeof N.value=="string"?N.value:String(N.label),be=Sa.startsWith("/")?Sa.substring(1):Sa,Jn=be.split(/\s+/).filter(Boolean),Pn=He(v,Jn),Si=Pn&&Be(Pn).length>0,Aa=`/${be} `;z.textContent=Aa,s(Aa);let Ea=document.createRange(),yl=window.getSelection();if(Ea.selectNodeContents(z),Ea.collapse(!1),yl?.removeAllRanges(),yl?.addRange(Ea),Si){let Wn=Mn(z);qe.openCompletion("/",`${be} `,Wn)}else qe.closeCompletion();return}if(N.type==="file"&&N.value&&N.path)try{t.addFileReference(N.value,N.path)}catch(Me){console.warn("[App] addFileReference failed:",Me)}let Z=window.getSelection();if(!Z||Z.rangeCount===0)return;let O=z.textContent||"",K=Z.getRangeAt(0),ue=O.length;if(K.startContainer===z){let Me=K.startOffset,Be=0;for(let He=0;He<Me&&He<z.childNodes.length;He++)Be+=z.childNodes[He].textContent?.length||0;ue=Be||O.length}else if(K.startContainer.nodeType===Node.TEXT_NODE){let Me=document.createTreeWalker(z,NodeFilter.SHOW_TEXT,null),Be=0,He=!1,Mn=Me.nextNode();for(;Mn;){if(Mn===K.startContainer){Be+=K.startOffset,He=!0;break}Be+=Mn.textContent?.length||0,Mn=Me.nextNode()}ue=He?Be:O.length}let en=O.substring(0,ue),Ue=en.lastIndexOf("@"),gt=en.lastIndexOf("/"),Kn=Math.max(Ue,gt);if(Kn>=0){let Me=typeof N.value=="string"?N.value:String(N.label),Be=O.substring(0,Kn+1)+Me+" "+O.substring(ue);z.textContent=Be,s(Be);let He=document.createRange(),Mn=window.getSelection();He.selectNodeContents(z),He.collapse(!1),Mn?.removeAllRanges(),Mn?.addRange(He)}qe.closeCompletion()},[v,qe,k,s,t,e]),ob=(0,U.useCallback)(()=>{e.postMessage({type:"attachFile",data:{}})},[e]),lb=(0,U.useCallback)(()=>{E(N=>{let z=B2[N];try{e.postMessage({type:"setApprovalMode",data:{modeId:z}})}catch{}return z})},[e]),rb=()=>{M(N=>!N)},au=(0,U.useMemo)(()=>{let N=a.messages.map(O=>({type:"message",data:O,timestamp:O.timestamp})),z=u.map(O=>({type:"in-progress-tool-call",data:O,timestamp:O.timestamp||Date.now()})),Z=o.filter(Wh).map(O=>({type:"completed-tool-call",data:O,timestamp:O.timestamp||Date.now()}));return[...N,...z,...Z].sort((O,K)=>(O.timestamp||0)-(K.timestamp||0))},[a.messages,u,o]);console.log("[App] Rendering messages:",au);let ib=(0,U.useCallback)(()=>au.map((N,z)=>{switch(N.type){case"message":{let Z=N.data,O=K=>{e.postMessage({type:"openFile",data:{path:K}})};if(Z.role==="thinking")return(0,$.jsx)(Vf,{content:Z.content||"",timestamp:Z.timestamp||0,onFileClick:O},`message-${z}`);if(Z.role==="user")return(0,$.jsx)(Hf,{content:Z.content||"",timestamp:Z.timestamp||0,onFileClick:O,fileContext:Z.fileContext},`message-${z}`);{let K=(Z.content||"").trim();return K==="Interrupted"||K==="Tool interrupted"?(0,$.jsx)(If,{text:K},`message-${z}`):(0,$.jsx)(jf,{content:K,timestamp:Z.timestamp||0,onFileClick:O},`message-${z}`)}}case"in-progress-tool-call":case"completed-tool-call":{let Z=au[z-1],O=au[z+1],K=Ue=>!!Ue&&typeof Ue=="object"&&"type"in Ue&&(Ue.type==="in-progress-tool-call"||Ue.type==="completed-tool-call"),ue=!K(Z),en=!K(O);return(0,$.jsx)(wg,{toolCall:N.data,isFirst:ue,isLast:en},`toolcall-${N.data.toolCallId}-${N.type}`)}default:return null}}),[au,e]),sb=a.messages.length>0||a.isStreaming||u.length>0||o.length>0||b.length>0||au.length>0;return(0,$.jsxs)("div",{className:"chat-container relative",children:[c&&(0,$.jsx)("div",{className:"bg-background/80 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm",children:(0,$.jsxs)("div",{className:"text-center",children:[(0,$.jsx)("div",{className:"border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"}),(0,$.jsx)("p",{className:"text-muted-foreground text-sm",children:"Preparing Gus Qwen..."})]})}),(0,$.jsx)(I2,{visible:n.showSessionSelector,sessions:n.filteredSessions,currentSessionId:n.currentSessionId,searchQuery:n.sessionSearchQuery,onSearchChange:n.setSessionSearchQuery,onSelectSession:N=>{n.handleSwitchSession(N),n.setSessionSearchQuery("")},onClose:()=>n.setShowSessionSelector(!1),hasMore:n.hasMore,isLoading:n.isLoading,onLoadMore:n.handleLoadMoreSessions}),(0,$.jsx)(Eg,{currentSessionTitle:n.currentSessionTitle,onLoadSessions:n.handleLoadQwenSessions,onNewSession:n.handleNewQwenSession}),(0,$.jsx)("div",{ref:y,className:"chat-messages messages-container flex-1 overflow-y-auto overflow-x-hidden pt-5 pr-5 pl-5 pb-[140px] flex flex-col relative min-w-0 focus:outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:hover:bg-white/30 [&>*]:flex [&>*]:gap-0 [&>*]:items-start [&>*]:text-left [&>*]:py-2 [&>*:not(:last-child)]:pb-[8px] [&>*]:flex-col [&>*]:relative [&>*]:animate-[fadeIn_0.2s_ease-in]",children:!sb&&!c?_===!1?(0,$.jsx)(_g,{onLogin:()=>{e.postMessage({type:"login",data:{}}),a.setWaitingForResponse("Logging in to Gus Qwen...")}}):_===null?(0,$.jsx)(v0,{loadingMessage:"Checking login status\u2026"}):(0,$.jsx)(v0,{isAuthenticated:!0}):(0,$.jsxs)($.Fragment,{children:[ib(),a.isWaitingForResponse&&a.loadingMessage&&(0,$.jsx)("div",{className:"waiting-message-slot min-h-[28px]",children:(0,$.jsx)(Gf,{loadingMessage:a.loadingMessage})}),(0,$.jsx)("div",{ref:w})]})}),_&&(0,$.jsx)(H2,{inputText:i,inputFieldRef:k,isStreaming:a.isStreaming,isWaitingForResponse:a.isWaitingForResponse,isComposing:re,editMode:A,thinkingEnabled:D,activeFileName:t.activeFileName,activeSelection:t.activeSelection,skipAutoActiveContext:$e,onInputChange:s,onCompositionStart:()=>We(!0),onCompositionEnd:()=>We(!1),onKeyDown:()=>{},onSubmit:ab,onCancel:$2,onToggleEditMode:lb,onToggleThinking:rb,onFocusActiveEditor:t.focusActiveEditor,onToggleSkipAutoActiveContext:()=>Dn(N=>!N),onShowCommandMenu:async()=>{if(k.current){k.current.focus();let N=window.getSelection(),z={top:0,left:0};if(N&&N.rangeCount>0)try{let O=N.getRangeAt(0).getBoundingClientRect();if(O.top>0&&O.left>0)z={top:O.top,left:O.left};else{let K=k.current.getBoundingClientRect();z={top:K.top,left:K.left}}}catch(Z){console.error("[App] Error getting cursor position:",Z);let O=k.current.getBoundingClientRect();z={top:O.top,left:O.left}}else{let Z=k.current.getBoundingClientRect();z={top:Z.top,left:Z.left}}await qe.openCompletion("/","",z)}},onAttachContext:ob,completionIsOpen:qe.isOpen,completionItems:qe.items,onCompletionSelect:ub,onCompletionClose:qe.closeCompletion}),d&&!f&&(0,$.jsx)(p0,{isOpen:!!d,options:nb,toolCall:{title:d.prompt,kind:"confirm_action"},onResponse:tb,onClose:()=>p(null)}),f&&(0,$.jsx)(p0,{isOpen:!!f,options:f.options,toolCall:f.toolCall,onResponse:eb,onClose:()=>m(null)})]})};var Y2=document.createElement("style");Y2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

/*! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com
 */

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.\\!container {
  width: 100% !important;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .\\!container {
    max-width: 640px !important;
  }

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .\\!container {
    max-width: 768px !important;
  }

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .\\!container {
    max-width: 1024px !important;
  }

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .\\!container {
    max-width: 1280px !important;
  }

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .\\!container {
    max-width: 1536px !important;
  }

  .container {
    max-width: 1536px;
  }
}
/* Composer: root container anchored to bottom*/
/* Composer: form wrapper */
.composer-form {
  position: relative;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 680px;
  flex-direction: column;
  border-radius: 8px;
  border-width: 1px;
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
    background: var(--app-input-secondary-background);
    border-color: var(--app-input-border);
    color: var(--app-input-foreground);
}
.composer-form:focus-within {
    /* match existing highlight behavior */
    border-color: var(--app-input-highlight);
    box-shadow: 0 1px 2px
      color-mix(in srgb, var(--app-input-highlight), transparent 80%);
  }
/* Composer: input editable area */
.composer-input {
    /* Use plain CSS for font-family inheritance; Tailwind has no \`font-inherit\` utility */
    position: relative;
    max-height: 200px;
    min-height: 1.5em;
    flex: 1 1 0%;
    -webkit-user-select: text;
       -moz-user-select: text;
            user-select: text;
    align-self: stretch;
    overflow-y: auto;
    overflow-x: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    border-radius: 0px;
    border-width: 0px;
    background-color: transparent;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-family: inherit;
    font-size: var(--vscode-chat-font-size, 13px);
    color: var(--app-input-foreground);
  }
/* Show placeholder when truly empty OR when flagged as empty via data attribute.
     The data attribute is needed because some browsers insert a <br> in
     contentEditable, which breaks :empty matching. */
.composer-input:empty:before,
  .composer-input[data-empty='true']::before {
    content: attr(data-placeholder);
    color: var(--app-input-placeholder-foreground);
    pointer-events: none;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 28px);
  }
.composer-input:focus {
    outline: none;
  }
.composer-input:disabled,
  .composer-input[contenteditable='false'] {
    color: #999;
    cursor: not-allowed;
  }
/* Composer: actions row (more compact) */
.composer-actions {
  z-index: 1;
  display: flex;
  min-width: 0px;
  align-items: center;
  gap: 0.25rem;
    padding: 5px;
    color: var(--app-secondary-foreground);
    border-top: 0.5px solid var(--app-input-border);
}
/* Text button (icon + label) */
.btn-text-compact {
  display: inline-flex;
  min-width: 0px;
  flex-shrink: 1;
  cursor: pointer;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  align-items: center;
  gap: 0.25rem;
  border-radius: 2px;
  border-width: 0px;
  background-color: transparent;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  font-size: 0.85em;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
    color: var(--app-secondary-foreground);
}
.btn-text-compact--primary {
    color: var(--app-secondary-foreground);
    /* color: var(--app-primary-foreground); */
  }
.btn-text-compact:hover {
    background-color: var(--app-ghost-button-hover-background);
  }
.btn-text-compact:active:not(:disabled) {
    filter: brightness(1.1);
  }
.btn-text-compact > svg {
    height: 1em;
    width: 1em;
    flex-shrink: 0;
  }
.btn-text-compact > span {
    display: inline-block;
    min-width: 0;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
@media screen and (max-width: 300px) {
    .btn-text-compact > svg {
      display: none;
    }
  }
/* Icon-only button, compact square (26x26) */
.btn-icon-compact {
  display: inline-flex;
  height: 26px;
  width: 26px;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: transparent;
  background-color: transparent;
  padding: 0px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
    color: var(--app-secondary-foreground);
}
.btn-icon-compact:hover {
    background-color: var(--app-ghost-button-hover-background);
  }
.btn-icon-compact > svg {
  height: 1rem;
  width: 1rem;
}
/* Active/primary state for icon button (e.g., Thinking on) */
.btn-icon-compact--active {
    background-color: var(--app-qwen-clay-button-orange);
    color: var(--app-qwen-ivory);
  }
.btn-icon-compact--active > svg {
    stroke: var(--app-qwen-ivory);
    fill: var(--app-qwen-ivory);
  }
.composer-overlay {
  position: absolute;
  inset: 0px;
  z-index: 0;
  border-radius: 8px;
    background: var(--app-input-background);
}
/* Optional: send button variant */
.btn-send-compact {
  display: inline-flex;
  height: 26px;
  width: 26px;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: transparent;
  background-color: transparent;
  padding: 0px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
    color: var(--app-secondary-foreground);
}
.btn-send-compact:hover {
    background-color: var(--app-ghost-button-hover-background);
  }
.btn-send-compact > svg {
  height: 1rem;
  width: 1rem;
}
.btn-send-compact {
  margin-left: auto;
}
.btn-send-compact:hover {
  --tw-brightness: brightness(1.1);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.btn-send-compact:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
.btn-send-compact {
    background-color: var(--app-qwen-clay-button-orange);
    color: var(--app-qwen-ivory);
  }
/*
   * File path styling inside tool call content
   * Applies to: .toolcall-content-wrapper .file-link-path
   * - Use monospace editor font
   * - Slightly smaller size
   * - Link color
   * - Tighten top alignment and allow aggressive breaking for long paths
   */
.toolcall-content-wrapper .file-link-path {
    /* Tailwind utilities where possible */
    min-width: 0px;
    word-break: break-all;
    padding-top: 1px;
    font-size: 0.85em;
    /* Not covered by Tailwind defaults: use CSS vars / properties */
    font-family: var(--app-monospace-font-family);
    color: var(--app-link-color);
    overflow-wrap: anywhere;
  }
.pointer-events-none {
  pointer-events: none;
}
.\\!visible {
  visibility: visible !important;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.collapse {
  visibility: collapse;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.inset-0 {
  inset: 0px;
}
.inset-x-0 {
  left: 0px;
  right: 0px;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-auto {
  bottom: auto;
}
.bottom-full {
  bottom: 100%;
}
.left-0 {
  left: 0px;
}
.left-1\\/2 {
  left: 50%;
}
.left-\\[12px\\] {
  left: 12px;
}
.left-\\[3px\\] {
  left: 3px;
}
.right-0 {
  right: 0px;
}
.top-0 {
  top: 0px;
}
.top-\\[-0\\.1em\\] {
  top: -0.1em;
}
.top-\\[10px\\] {
  top: 10px;
}
.top-\\[24px\\] {
  top: 24px;
}
.top-\\[3px\\] {
  top: 3px;
}
.z-50 {
  z-index: 50;
}
.z-\\[1000\\] {
  z-index: 1000;
}
.z-\\[1\\] {
  z-index: 1;
}
.z-\\[999\\] {
  z-index: 999;
}
.m-0 {
  margin: 0px;
}
.m-\\[2px\\] {
  margin: 2px;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.my-medium {
  margin-top: 8px;
  margin-bottom: 8px;
}
.mb-0\\.5 {
  margin-bottom: 0.125rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-\\[2px\\] {
  margin-bottom: 2px;
}
.ml-3 {
  margin-left: 0.75rem;
}
.mr-1\\.5 {
  margin-right: 0.375rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-\\[2px\\] {
  margin-top: 2px;
}
.box-border {
  box-sizing: border-box;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.grid {
  display: grid;
}
.hidden {
  display: none;
}
.h-1 {
  height: 0.25rem;
}
.h-1\\.5 {
  height: 0.375rem;
}
.h-4 {
  height: 1rem;
}
.h-5 {
  height: 1.25rem;
}
.h-8 {
  height: 2rem;
}
.h-\\[60px\\] {
  height: 60px;
}
.h-\\[80px\\] {
  height: 80px;
}
.h-\\[calc\\(100\\%-24px\\)\\] {
  height: calc(100% - 24px);
}
.h-full {
  height: 100%;
}
.max-h-\\[300px\\] {
  max-height: 300px;
}
.max-h-\\[50vh\\] {
  max-height: 50vh;
}
.max-h-\\[min\\(500px\\2c 50vh\\)\\] {
  max-height: min(500px, 50vh);
}
.min-h-0 {
  min-height: 0px;
}
.min-h-\\[28px\\] {
  min-height: 28px;
}
.w-1\\.5 {
  width: 0.375rem;
}
.w-2\\.5 {
  width: 0.625rem;
}
.w-4 {
  width: 1rem;
}
.w-8 {
  width: 2rem;
}
.w-\\[60px\\] {
  width: 60px;
}
.w-\\[80px\\] {
  width: 80px;
}
.w-\\[min\\(400px\\2c calc\\(100vw-32px\\)\\)\\] {
  width: min(400px, calc(100vw - 32px));
}
.w-full {
  width: 100%;
}
.w-px {
  width: 1px;
}
.min-w-0 {
  min-width: 0px;
}
.min-w-1 {
  min-width: 0.25rem;
}
.min-w-\\[10px\\] {
  min-width: 10px;
}
.max-w-\\[300px\\] {
  max-width: 300px;
}
.max-w-\\[400px\\] {
  max-width: 400px;
}
.max-w-\\[50\\%\\] {
  max-width: 50%;
}
.max-w-full {
  max-width: 100%;
}
.max-w-md {
  max-width: 28rem;
}
.max-w-sm {
  max-width: 24rem;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.shrink-0 {
  flex-shrink: 0;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-rotate-45 {
  --tw-rotate: -45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.animate-\\[fadeIn_0\\.2s_ease-in\\] {
  animation: fadeIn 0.2s ease-in;
}
.animate-\\[typingPulse_1\\.4s_infinite_ease-in-out\\] {
  animation: typingPulse 1.4s infinite ease-in-out;
}
@keyframes completion-menu-enter {

  0% {
    opacity: 0;
    transform: translateY(4px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-completion-menu-enter {
  animation: completion-menu-enter 150ms ease-out both;
}
@keyframes slide-up {

  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slide-up 200ms ease-out both;
}
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.cursor-\\[inherit\\] {
  cursor: inherit;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-text {
  cursor: text;
}
.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.select-text {
  -webkit-user-select: text;
     -moz-user-select: text;
          user-select: text;
}
.list-none {
  list-style-type: none;
}
.appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.grid-cols-\\[80px_1fr\\] {
  grid-template-columns: 80px 1fr;
}
.grid-cols-\\[auto_1fr\\] {
  grid-template-columns: auto 1fr;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.items-start {
  align-items: flex-start;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-0 {
  gap: 0px;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-1\\.5 {
  gap: 0.375rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-6 {
  gap: 1.5rem;
}
.gap-8 {
  gap: 2rem;
}
.gap-\\[2px\\] {
  gap: 2px;
}
.gap-\\[var\\(--app-list-gap\\)\\] {
  gap: var(--app-list-gap);
}
.gap-medium {
  gap: 8px;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.overflow-y-hidden {
  overflow-y: hidden;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text-ellipsis {
  text-overflow: ellipsis;
}
.whitespace-normal {
  white-space: normal;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.break-words {
  overflow-wrap: break-word;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-\\[2px\\] {
  border-radius: 2px;
}
.rounded-\\[4px\\] {
  border-radius: 4px;
}
.rounded-\\[var\\(--app-list-border-radius\\)\\] {
  border-radius: var(--app-list-border-radius);
}
.rounded-\\[var\\(--corner-radius-small\\)\\] {
  border-radius: var(--corner-radius-small);
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-large {
  border-radius: 8px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-medium {
  border-radius: 6px;
}
.rounded-sm {
  border-radius: 0.125rem;
}
.rounded-small {
  border-radius: 4px;
}
.border {
  border-width: 1px;
}
.border-0 {
  border-width: 0px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-b-2 {
  border-bottom-width: 2px;
}
.border-l-2 {
  border-left-width: 2px;
}
.border-none {
  border-style: none;
}
.border-\\[\\#74c991\\] {
  --tw-border-opacity: 1;
  border-color: rgb(116 201 145 / var(--tw-border-opacity, 1));
}
.border-\\[var\\(--app-input-border\\)\\] {
  border-color: var(--app-input-border);
}
.border-\\[var\\(--app-primary-border-color\\)\\] {
  border-color: var(--app-primary-border-color);
}
.bg-\\[\\#2196f3\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(33 150 243 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#4caf50\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(76 175 80 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#4f46e5\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(79 70 229 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#f44336\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(244 67 54 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#ffc107\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(255 193 7 / var(--tw-bg-opacity, 1));
}
.bg-\\[var\\(--app-header-background\\)\\] {
  background-color: var(--app-header-background);
}
.bg-\\[var\\(--app-input-background\\)\\] {
  background-color: var(--app-input-background);
}
.bg-\\[var\\(--app-list-active-background\\)\\] {
  background-color: var(--app-list-active-background);
}
.bg-\\[var\\(--app-menu-background\\)\\] {
  background-color: var(--app-menu-background);
}
.bg-\\[var\\(--app-primary-background\\)\\] {
  background-color: var(--app-primary-background);
}
.bg-\\[var\\(--app-primary-border-color\\)\\] {
  background-color: var(--app-primary-border-color);
}
.bg-\\[var\\(--app-secondary-foreground\\)\\] {
  background-color: var(--app-secondary-foreground);
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.bg-transparent {
  background-color: transparent;
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.from-transparent {
  --tw-gradient-from: transparent var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.to-\\[var\\(--app-primary-background\\)\\] {
  --tw-gradient-to: var(--app-primary-background) var(--tw-gradient-to-position);
}
.object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}
.p-0 {
  padding: 0px;
}
.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-5 {
  padding: 1.25rem;
}
.p-\\[var\\(--app-list-item-padding\\)\\] {
  padding: var(--app-list-item-padding);
}
.p-\\[var\\(--app-list-padding\\)\\] {
  padding: var(--app-list-padding);
}
.p-large {
  padding: 12px;
}
.p-medium {
  padding: 8px;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.pb-\\[140px\\] {
  padding-bottom: 140px;
}
.pl-5 {
  padding-left: 1.25rem;
}
.pl-6 {
  padding-left: 1.5rem;
}
.pl-\\[30px\\] {
  padding-left: 30px;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pr-5 {
  padding-right: 1.25rem;
}
.pt-5 {
  padding-top: 1.25rem;
}
.pt-\\[2px\\] {
  padding-top: 2px;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.align-middle {
  vertical-align: middle;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-\\[0\\.85em\\] {
  font-size: 0.85em;
}
.text-\\[0\\.9em\\] {
  font-size: 0.9em;
}
.text-\\[1\\.1em\\] {
  font-size: 1.1em;
}
.text-\\[11px\\] {
  font-size: 11px;
}
.text-\\[13px\\] {
  font-size: 13px;
}
.text-\\[14px\\] {
  font-size: 14px;
}
.text-\\[15px\\] {
  font-size: 15px;
}
.text-\\[16px\\] {
  font-size: 16px;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-\\[600\\] {
  font-weight: 600;
}
.font-\\[var\\(--vscode-chat-font-family\\)\\] {
  font-weight: var(--vscode-chat-font-family);
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-normal {
  font-weight: 400;
}
.font-semibold {
  font-weight: 600;
}
.italic {
  font-style: italic;
}
.leading-\\[1\\.5\\] {
  line-height: 1.5;
}
.leading-none {
  line-height: 1;
}
.leading-normal {
  line-height: 1.5;
}
.leading-relaxed {
  line-height: 1.625;
}
.text-\\[\\#c74e39\\] {
  --tw-text-opacity: 1;
  color: rgb(199 78 57 / var(--tw-text-opacity, 1));
}
.text-\\[\\#e1c08d\\] {
  --tw-text-opacity: 1;
  color: rgb(225 192 141 / var(--tw-text-opacity, 1));
}
.text-\\[var\\(--app-list-active-foreground\\)\\] {
  color: var(--app-list-active-foreground);
}
.text-\\[var\\(--app-menu-foreground\\)\\] {
  color: var(--app-menu-foreground);
}
.text-\\[var\\(--app-monospace-font-size\\)\\] {
  color: var(--app-monospace-font-size);
}
.text-\\[var\\(--app-primary-foreground\\)\\] {
  color: var(--app-primary-foreground);
}
.text-\\[var\\(--app-secondary-foreground\\)\\] {
  color: var(--app-secondary-foreground);
}
.text-\\[var\\(--vscode-chat-font-size\\2c 13px\\)\\] {
  color: var(--vscode-chat-font-size,13px);
}
.text-\\[var\\(--vscode-symbolIcon-fileForeground\\2c \\#cccccc\\)\\] {
  color: var(--vscode-symbolIcon-fileForeground,#cccccc);
}
.text-qwen-error {
  --tw-text-opacity: 1;
  color: rgb(199 78 57 / var(--tw-text-opacity, 1));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.underline {
  text-decoration-line: underline;
}
.line-through {
  text-decoration-line: line-through;
}
.no-underline {
  text-decoration-line: none;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-60 {
  opacity: 0.6;
}
.opacity-70 {
  opacity: 0.7;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-85 {
  opacity: 0.85;
}
.opacity-90 {
  opacity: 0.9;
}
.shadow-\\[0_4px_16px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.1\\)\\] {
  --tw-shadow: 0 4px 16px rgba(0,0,0,0.1);
  --tw-shadow-colored: 0 4px 16px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-\\[inset_0_0_0_1px_var\\(--app-transparent-inner-border\\)\\] {
  --tw-shadow: inset 0 0 0 1px var(--app-transparent-inner-border);
  --tw-shadow-colored: inset 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.ring {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-100 {
  transition-duration: 100ms;
}
.duration-150 {
  transition-duration: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
/* Multi-line clamp with ellipsis (Chromium-based webview supported) */
.q-line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
.\\[animation-delay\\:0\\.2s\\] {
  animation-delay: 0.2s;
}
.\\[animation-delay\\:0\\.4s\\] {
  animation-delay: 0.4s;
}
.\\[animation-delay\\:0s\\] {
  animation-delay: 0s;
}

/* ===========================
   Reusable Component Classes
   =========================== */

/* ===========================
   Utilities
   =========================== */

.placeholder\\:text-\\[var\\(--app-input-placeholder-foreground\\)\\]::-moz-placeholder {
  color: var(--app-input-placeholder-foreground);
}

.placeholder\\:text-\\[var\\(--app-input-placeholder-foreground\\)\\]::placeholder {
  color: var(--app-input-placeholder-foreground);
}

.placeholder\\:opacity-60::-moz-placeholder {
  opacity: 0.6;
}

.placeholder\\:opacity-60::placeholder {
  opacity: 0.6;
}

.placeholder\\:opacity-70::-moz-placeholder {
  opacity: 0.7;
}

.placeholder\\:opacity-70::placeholder {
  opacity: 0.7;
}

.before\\:absolute::before {
  content: var(--tw-content);
  position: absolute;
}

.before\\:left-\\[8px\\]::before {
  content: var(--tw-content);
  left: 8px;
}

.before\\:top-2::before {
  content: var(--tw-content);
  top: 0.5rem;
}

.before\\:z-\\[1\\]::before {
  content: var(--tw-content);
  z-index: 1;
}

@keyframes pulse-slow {

  0%, 100% {
    content: var(--tw-content);
    opacity: 1;
  }

  50% {
    content: var(--tw-content);
    opacity: 0.5;
  }
}

.before\\:animate-pulse-slow::before {
  content: var(--tw-content);
  animation: pulse-slow 1.5s ease-in-out infinite;
}

.before\\:text-\\[10px\\]::before {
  content: var(--tw-content);
  font-size: 10px;
}

.before\\:text-qwen-error::before {
  content: var(--tw-content);
  --tw-text-opacity: 1;
  color: rgb(199 78 57 / var(--tw-text-opacity, 1));
}

.before\\:text-qwen-loading::before {
  content: var(--tw-content);
  color: var(--app-secondary-foreground);
}

.before\\:text-qwen-success::before {
  content: var(--tw-content);
  --tw-text-opacity: 1;
  color: rgb(116 201 145 / var(--tw-text-opacity, 1));
}

.before\\:text-qwen-warning::before {
  content: var(--tw-content);
  --tw-text-opacity: 1;
  color: rgb(225 192 141 / var(--tw-text-opacity, 1));
}

.before\\:opacity-70::before {
  content: var(--tw-content);
  opacity: 0.7;
}

.before\\:content-\\[\\"\\\\\\\\25cf\\"\\]::before {
  --tw-content: "\\\\25cf";
  content: var(--tw-content);
}

.hover\\:relative:hover {
  position: relative;
}

.hover\\:border-0:hover {
  border-width: 0px;
}

.hover\\:bg-\\[\\#4338ca\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(67 56 202 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[var\\(--app-button-background\\)\\]:hover {
  background-color: var(--app-button-background);
}

.hover\\:bg-\\[var\\(--app-ghost-button-hover-background\\)\\]:hover {
  background-color: var(--app-ghost-button-hover-background);
}

.hover\\:bg-\\[var\\(--app-list-hover-background\\)\\]:hover {
  background-color: var(--app-list-hover-background);
}

.hover\\:font-bold:hover {
  font-weight: 700;
}

.hover\\:text-\\[var\\(--app-button-foreground\\)\\]:hover {
  color: var(--app-button-foreground);
}

.hover\\:text-\\[var\\(--app-primary-foreground\\)\\]:hover {
  color: var(--app-primary-foreground);
}

.hover\\:underline:hover {
  text-decoration-line: underline;
}

.hover\\:no-underline:hover {
  text-decoration-line: none;
}

.hover\\:opacity-100:hover {
  opacity: 1;
}

.focus\\:rounded-\\[2px\\]:focus {
  border-radius: 2px;
}

.focus\\:bg-\\[var\\(--app-ghost-button-hover-background\\)\\]:focus {
  background-color: var(--app-ghost-button-hover-background);
}

.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:outline:focus {
  outline-style: solid;
}

.focus\\:outline-1:focus {
  outline-width: 1px;
}

.focus\\:outline-offset-2:focus {
  outline-offset: 2px;
}

.focus\\:outline-\\[var\\(--vscode-focusBorder\\)\\]:focus {
  outline-color: var(--vscode-focusBorder);
}

.active\\:opacity-80:active {
  opacity: 0.8;
}

@media (min-width: 640px) {

  .sm\\:inline {
    display: inline;
  }
}

@media (min-width: 768px) {

  .md\\:p-10 {
    padding: 2.5rem;
  }
}

@media (prefers-color-scheme: dark) {

  .dark\\:opacity-60 {
    opacity: 0.6;
  }
}

.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:rounded-sm::-webkit-scrollbar-thumb {
  border-radius: 0.125rem;
}

.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-white\\/20::-webkit-scrollbar-thumb {
  background-color: rgb(255 255 255 / 0.2);
}

.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:hover\\:bg-white\\/30:hover::-webkit-scrollbar-thumb {
  background-color: rgb(255 255 255 / 0.3);
}

.\\[\\&\\:\\:-webkit-scrollbar-track\\]\\:bg-transparent::-webkit-scrollbar-track {
  background-color: transparent;
}

.\\[\\&\\:\\:-webkit-scrollbar\\]\\:w-2::-webkit-scrollbar {
  width: 0.5rem;
}

.\\[\\&\\:not\\(\\:first-child\\)\\]\\:mt-2:not(:first-child) {
  margin-top: 0.5rem;
}

.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:pb-\\[8px\\]>*:not(:last-child) {
  padding-bottom: 8px;
}

.\\[\\&\\>\\*\\]\\:relative>* {
  position: relative;
}

.\\[\\&\\>\\*\\]\\:flex>* {
  display: flex;
}

.\\[\\&\\>\\*\\]\\:animate-\\[fadeIn_0\\.2s_ease-in\\]>* {
  animation: fadeIn 0.2s ease-in;
}

.\\[\\&\\>\\*\\]\\:flex-col>* {
  flex-direction: column;
}

.\\[\\&\\>\\*\\]\\:items-start>* {
  align-items: flex-start;
}

.\\[\\&\\>\\*\\]\\:gap-0>* {
  gap: 0px;
}

.\\[\\&\\>\\*\\]\\:py-2>* {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.\\[\\&\\>\\*\\]\\:text-left>* {
  text-align: left;
}

.\\[\\&\\>svg\\]\\:h-5>svg {
  height: 1.25rem;
}

.\\[\\&\\>svg\\]\\:w-5>svg {
  width: 1.25rem;
}
`;document.head.appendChild(Y2);var Q2=document.createElement("style");Q2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

/* ===========================
   CSS Variables (Root Level)
   =========================== */
:root {
  /* Qwen Brand Colors */
  --app-qwen-theme: #615fff;
  --app-qwen-clay-button-orange: #4f46e5;
  --app-qwen-ivory: #f5f5ff;
  --app-qwen-slate: #141420;
  --app-qwen-green: #6bcf7f;

  /* Spacing */
  --app-spacing-small: 4px;
  --app-spacing-medium: 8px;
  --app-spacing-large: 12px;
  --app-spacing-xlarge: 16px;

  /* Border Radius */
  --corner-radius-small: 4px;
  --corner-radius-medium: 6px;
  --corner-radius-large: 8px;

  /* Typography */
  --app-monospace-font-family: var(--vscode-editor-font-family, monospace);
  --app-monospace-font-size: var(--vscode-editor-font-size, 12px);

  /* Foreground & Background */
  --app-primary-foreground: var(--vscode-foreground);
  --app-primary-background: var(--vscode-sideBar-background);
  --app-primary-border-color: var(--vscode-sideBarActivityBarTop-border);
  --app-secondary-foreground: var(--vscode-descriptionForeground);

  /* Input Colors */
  --app-input-foreground: var(--vscode-input-foreground);
  --app-input-background: var(--vscode-input-background);
  --app-input-border: var(--vscode-inlineChatInput-border);
  --app-input-active-border: var(--vscode-inputOption-activeBorder);
  --app-input-placeholder-foreground: var(--vscode-input-placeholderForeground);
  --app-input-secondary-background: var(--vscode-menu-background);
  /* Input Highlight (focus ring/border) */
  --app-input-highlight: var(--app-qwen-theme);

  /* Code Highlighting */
  --app-code-background: var(
    --vscode-textCodeBlock-background,
    rgba(0, 0, 0, 0.05)
  );
  --app-link-foreground: var(--vscode-textLink-foreground, #007acc);
  --app-link-active-foreground: var(
    --vscode-textLink-activeForeground,
    #005a9e
  );

  /* List Styles */
  --app-list-hover-background: var(--vscode-list-hoverBackground);
  --app-list-active-background: var(--vscode-list-activeSelectionBackground);
  --app-list-active-foreground: var(--vscode-list-activeSelectionForeground);

  /* Buttons */
  --app-ghost-button-hover-background: var(--vscode-toolbar-hoverBackground);
  --app-button-foreground: var(--vscode-button-foreground);
  --app-button-background: var(--vscode-button-background);
  --app-button-hover-background: var(--vscode-button-hoverBackground);

  /* Border Transparency */
  --app-transparent-inner-border: rgba(255, 255, 255, 0.1);

  /* Header */
  --app-header-background: var(--vscode-sideBar-background);

  /* List Styles*/
  --app-list-padding: 0px;
  --app-list-item-padding: 4px 8px;
  --app-list-border-color: transparent;
  --app-list-border-radius: 4px;
  --app-list-gap: 2px;

  /* Menu Colors*/
  --app-menu-background: var(--vscode-menu-background);
  --app-menu-border: var(--vscode-menu-border);
  --app-menu-foreground: var(--vscode-menu-foreground);
  --app-menu-selection-background: var(--vscode-menu-selectionBackground);
  --app-menu-selection-foreground: var(--vscode-menu-selectionForeground);

  /* Modal */
  --app-modal-background: rgba(0, 0, 0, 0.75);

  /* Widget */
  --app-widget-border: var(--vscode-editorWidget-border);
  --app-widget-shadow: var(--vscode-widget-shadow);
}

/* Light Theme Overrides */
.vscode-light {
  --app-transparent-inner-border: rgba(0, 0, 0, 0.07);
  /* Slightly different brand shade in light theme for better contrast */
  --app-input-highlight: var(--app-qwen-clay-button-orange);
}

/* Icon SVG styles */
.icon-svg {
  display: block;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--vscode-chat-font-family, var(--vscode-font-family));
  background-color: var(--app-primary-background);
  color: var(--app-primary-foreground);
  overflow: hidden;
  font-size: var(--vscode-chat-font-size, 13px);
  padding: 0;
}

/* Ensure tool call containers keep a consistent left indent even if Tailwind utilities are purged */
.toolcall-container {
  /* Consistent indent for tool call blocks */
  padding-left: 30px;
}

.toolcall-card {
  /* Consistent indent for card-style tool calls */
  padding-left: 30px;
}

button {
  color: var(--app-primary-foreground);
  font-family: var(--vscode-chat-font-family);
  font-size: var(--vscode-chat-font-size, 13px);
}

/* ===========================
   Main Chat Container
   =========================== */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--app-primary-background);
  color: var(--app-primary-foreground);
}

/* Message list container: prevent browser scroll anchoring from fighting our manual pin-to-bottom logic */
.chat-messages > * {
  /* Disable overflow anchoring on individual items so the UA doesn't auto-adjust scroll */
  overflow-anchor: none;
}

/* ===========================
   Animations (used by message components)
   =========================== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes typingPulse {
  0%,
  60%,
  100% {
    transform: scale(0.7);
    opacity: 0.6;
  }
  30% {
    transform: scale(1);
    opacity: 1;
  }
}

/* ===========================
   Input Form Styles
   =========================== */
.input-form {
  display: flex;
  background-color: var(--app-primary-background);
  border-top: 1px solid var(--app-primary-border-color);
}

.input-field {
  flex: 1;
  padding: 10px 12px;
  background-color: var(--app-input-background);
  color: var(--app-input-foreground);
  border: 1px solid var(--app-input-border);
  border-radius: var(--corner-radius-small);
  font-size: var(--vscode-chat-font-size, 13px);
  font-family: var(--vscode-chat-font-family);
  outline: none;
  line-height: 1.5;
}

.input-field:focus {
  border-color: var(--app-qwen-theme);
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-field::-moz-placeholder {
  color: var(--app-input-placeholder-foreground);
}

.input-field::placeholder {
  color: var(--app-input-placeholder-foreground);
}

.send-button {
  padding: 10px 20px;
  background-color: var(--app-qwen-clay-button-orange);
  color: var(--app-qwen-ivory);
  border: none;
  border-radius: var(--corner-radius-small);
  font-size: var(--vscode-chat-font-size, 13px);
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover:not(:disabled) {
  filter: brightness(1.1);
}

.send-button:active:not(:disabled) {
  filter: brightness(0.9);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation for in-progress status (used by pseudo bullets and spinners) */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.code-block {
  font-family: var(--app-monospace-font-family);
  font-size: var(--app-monospace-font-size);
  background: var(--app-primary-background);
  border: 1px solid var(--app-input-border);
  border-radius: var(--corner-radius-small);
  padding: var(--app-spacing-medium);
  overflow-x: auto;
  margin: 4px 0 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
}

/* ===========================
   Diff Display Styles
   =========================== */
.diff-display-container {
  margin: 8px 0;
  border: 1px solid var(--app-input-border);
  border-radius: var(--corner-radius-medium);
  overflow: hidden;
}

.diff-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--app-input-secondary-background);
  border-bottom: 1px solid var(--app-input-border);
}

.diff-file-path {
  font-family: var(--app-monospace-font-family);
  font-size: 13px;
  color: var(--app-primary-foreground);
}

.open-diff-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: transparent;
  border: 1px solid var(--app-input-border);
  border-radius: var(--corner-radius-small);
  color: var(--app-primary-foreground);
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.15s;
}

.open-diff-button:hover {
  background: var(--app-ghost-button-hover-background);
}

.open-diff-button svg {
  width: 16px;
  height: 16px;
}

.diff-section {
  margin: 0;
}

.diff-label {
  padding: 8px 12px;
  background: var(--app-primary-background);
  border-bottom: 1px solid var(--app-input-border);
  font-size: 11px;
  font-weight: 600;
  color: var(--app-secondary-foreground);
  text-transform: uppercase;
}

.diff-section .code-block {
  border: none;
  border-radius: 0;
  margin: 0;
  max-height: none; /* Remove height limit for diffs */
  overflow-y: visible;
}

.diff-section .code-content {
  display: block;
}

/* ===========================
   Permission Request Card Styles
   =========================== */
.permission-request-card {
  background: var(--app-input-background);
  border: 1px solid var(--app-qwen-theme);
  border-radius: var(--corner-radius-medium);
  margin: var(--app-spacing-medium) 0;
  margin-bottom: var(--app-spacing-xlarge);
  overflow: visible;
  animation: fadeIn 0.2s ease-in;
}

.permission-card-body {
  padding: var(--app-spacing-large);
  min-height: -moz-fit-content;
  min-height: fit-content;
  height: auto;
}

.permission-header {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-large);
  margin-bottom: var(--app-spacing-large);
}

.permission-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(97, 95, 255, 0.1);
  border-radius: var(--corner-radius-medium);
  flex-shrink: 0;
}

.permission-icon {
  font-size: 20px;
}

.permission-info {
  flex: 1;
  min-width: 0;
}

.permission-title {
  font-weight: 600;
  color: var(--app-primary-foreground);
  margin-bottom: 2px;
}

.permission-subtitle {
  font-size: 12px;
  color: var(--app-secondary-foreground);
}

.permission-command-section {
  margin-bottom: var(--app-spacing-large);
}

.permission-command-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--app-secondary-foreground);
  margin-bottom: var(--app-spacing-small);
  text-transform: uppercase;
}

.permission-command-code {
  display: block;
  font-family: var(--app-monospace-font-family);
  font-size: var(--app-monospace-font-size);
  color: var(--app-primary-foreground);
  background: var(--app-primary-background);
  padding: var(--app-spacing-medium);
  border-radius: var(--corner-radius-small);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.permission-locations-section {
  margin-bottom: var(--app-spacing-large);
}

.permission-locations-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--app-secondary-foreground);
  margin-bottom: var(--app-spacing-small);
  text-transform: uppercase;
}

.permission-location-item {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-small);
  padding: var(--app-spacing-small) 0;
  font-size: 12px;
}

.permission-location-icon {
  flex-shrink: 0;
}

.permission-location-path {
  color: var(--app-primary-foreground);
  font-family: var(--app-monospace-font-family);
}

.permission-location-line {
  color: var(--app-secondary-foreground);
}

.permission-options-section {
  margin-top: var(--app-spacing-large);
}

.permission-options-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--app-primary-foreground);
  margin-bottom: var(--app-spacing-medium);
}

.permission-options-list {
  display: flex;
  flex-direction: column;
  gap: var(--app-spacing-small);
}

.permission-option {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-medium);
  padding: var(--app-spacing-medium) var(--app-spacing-large);
  background: var(--app-primary-background);
  border: 1px solid var(--app-input-border);
  border-radius: var(--corner-radius-small);
  cursor: pointer;
  transition: all 0.15s ease;
}

.permission-option:hover {
  background: var(--app-list-hover-background);
  border-color: var(--app-input-active-border);
}

.permission-option.selected {
  border-color: var(--app-qwen-theme);
  background: rgba(97, 95, 255, 0.1);
}

.permission-radio {
  flex-shrink: 0;
}

.permission-option-content {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-small);
  flex: 1;
}

.permission-option-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--app-secondary-foreground);
  background-color: var(--app-list-hover-background);
  border-radius: 4px;
  margin-right: 4px;
}

.permission-option.selected .permission-option-number {
  color: var(--app-qwen-ivory);
  background-color: var(--app-qwen-theme);
}

.permission-always-badge {
  font-size: 12px;
}

.permission-no-options {
  text-align: center;
  padding: var(--app-spacing-large);
  color: var(--app-secondary-foreground);
}

.permission-actions {
  margin-top: var(--app-spacing-large);
  display: flex;
  justify-content: flex-end;
}

.permission-confirm-button {
  padding: var(--app-spacing-medium) var(--app-spacing-xlarge);
  background: var(--app-qwen-clay-button-orange);
  color: var(--app-qwen-ivory);
  border: none;
  border-radius: var(--corner-radius-small);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.15s ease;
}

.permission-confirm-button:hover:not(:disabled) {
  filter: brightness(1.1);
}

.permission-confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.permission-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--app-spacing-medium);
  padding: var(--app-spacing-large);
  background: rgba(76, 175, 80, 0.1);
  border-radius: var(--corner-radius-small);
  margin-top: var(--app-spacing-large);
}

.permission-success-icon {
  color: #4caf50;
  font-weight: bold;
}

.permission-success-text {
  color: #4caf50;
  font-size: 13px;
}
`;document.head.appendChild(Q2);var X2=document.createElement("style");X2.textContent=`/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

/* Import component styles */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Unified timeline styles for tool calls and messages
 */

/* ==========================================
   ToolCallContainer timeline styles
   ========================================== */
.toolcall-container {
  position: relative;
  padding-left: 30px;
  padding-top: 8px;
  padding-bottom: 8px;
}

/* ToolCallContainer timeline connector */
.toolcall-container::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--app-primary-border-color);
}

/* First item: connector starts from status point position */
.toolcall-container:first-child::after {
  top: 24px;
}

/* Last item: connector shows only upper part */
.toolcall-container:last-child::after {
  height: calc(100% - 24px);
  top: 0;
  bottom: auto;
}

/* ==========================================
   AssistantMessage timeline styles
   ========================================== */
.assistant-message-container {
  position: relative;
  padding-left: 30px;
  padding-top: 8px;
  padding-bottom: 8px;
}

/* AssistantMessage timeline connector */
.assistant-message-container::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--app-primary-border-color);
}

/* First item: connector starts from status point position */
.assistant-message-container:first-child::after {
  top: 24px;
}

/* Last item: connector shows only upper part */
.assistant-message-container:last-child::after {
  height: calc(100% - 24px);
  top: 0;
  bottom: auto;
}

/* ==========================================
   Custom timeline styles for qwen-message message-item elements
   ========================================== */

/* Default connector style - creates full-height connectors for all AI message items */
.qwen-message.message-item:not(.user-message-container)::after {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--app-primary-border-color);
  z-index: 0;
}

/* Single-item AI sequence (both a start and an end): hide the connector entirely */
.qwen-message.message-item:not(.user-message-container):is(
    :first-child,
    .user-message-container
      + .qwen-message.message-item:not(.user-message-container),
    .chat-messages
      > :not(.qwen-message.message-item)
      + .qwen-message.message-item:not(.user-message-container)
  ):is(
    :has(+ .user-message-container),
    :has(+ :not(.qwen-message.message-item)),
    :last-child
  )::after {
  display: none;
}

/* Handle the start of each AI message sequence - includes the first AI message in the entire message list and new AI messages interrupted by user messages */
.qwen-message.message-item:not(.user-message-container):first-child::after,
.user-message-container + .qwen-message.message-item:not(.user-message-container)::after,
/* If the previous sibling is not .qwen-message.message-item (such as waiting prompts, sentinel elements, or card-style tool calls), also treat as a new group start */
.chat-messages > :not(.qwen-message.message-item)
  + .qwen-message.message-item:not(.user-message-container)::after {
  top: 15px;
}

/* Handle the end of each AI message sequence */
/* When the next sibling is a user message */
.qwen-message.message-item:not(.user-message-container):has(+ .user-message-container)::after,
/* Or when the next sibling is not .qwen-message.message-item (such as waiting prompts, sentinel elements, card-style tool calls, etc.) */
.qwen-message.message-item:not(.user-message-container):has(+ :not(.qwen-message.message-item))::after,
/* When it's truly the last child element of the parent container */
.qwen-message.message-item:not(.user-message-container):last-child::after {
  /* Note: When setting both top and bottom, the height is (container height - top - bottom).
   * Here we expect "15px spacing at the bottom", so bottom should be 15px (not calc(100% - 15px)). */
  top: 0;
  bottom: calc(100% - 15px);
}

.user-message-container:first-child {
  margin-top: 0;
}

.message-item {
  padding: 8px 0;
  width: 100%;
  align-items: flex-start;
  padding-left: 30px;
  -webkit-user-select: text;
     -moz-user-select: text;
          user-select: text;
  position: relative;
  padding-top: 8px;
  padding-bottom: 8px;
}

/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Styles for MarkdownRenderer component
 */

.markdown-content {
  /* Base styles for markdown content */
  line-height: 1.6;
  color: var(--app-primary-foreground);
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 1.75em;
  border-bottom: 1px solid var(--app-primary-border-color);
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--app-primary-border-color);
  padding-bottom: 0.3em;
}

.markdown-content h3 {
  font-size: 1.25em;
}

.markdown-content h4 {
  font-size: 1.1em;
}

.markdown-content h5,
.markdown-content h6 {
  font-size: 1em;
}

.markdown-content p {
  margin-top: 0;
  /* margin-bottom: 1em; */
}

.markdown-content ul,
.markdown-content ol {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 2em;
}

/* Ensure list markers are visible even with global CSS resets */
.markdown-content ul {
  list-style-type: disc;
  list-style-position: outside;
}

.markdown-content ol {
  list-style-type: decimal;
  list-style-position: outside;
}

/* Nested list styles */
.markdown-content ul ul {
  list-style-type: circle;
}

.markdown-content ul ul ul {
  list-style-type: square;
}

.markdown-content ol ol {
  list-style-type: lower-alpha;
}

.markdown-content ol ol ol {
  list-style-type: lower-roman;
}

/* Style the marker explicitly so themes don't hide it */
.markdown-content li::marker {
  color: var(--app-secondary-foreground);
}

.markdown-content li {
  margin-bottom: 0.25em;
}

.markdown-content li > p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.markdown-content blockquote {
  margin: 0 0 1em;
  padding: 0 1em;
  border-left: 0.25em solid var(--app-primary-border-color);
  color: var(--app-secondary-foreground);
}

.markdown-content a {
  color: var(--app-link-foreground, #007acc);
  text-decoration: none;
}

.markdown-content a:hover {
  color: var(--app-link-active-foreground, #005a9e);
  text-decoration: underline;
}

.markdown-content code {
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.9em;
  background-color: var(--app-code-background, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--app-primary-border-color);
  border-radius: var(--corner-radius-small, 4px);
  padding: 0.2em 0.4em;
  white-space: pre-wrap; /* Support automatic line wrapping */
  word-break: break-word; /* Break words when necessary */
}

.markdown-content pre {
  margin: 1em 0;
  padding: 1em;
  overflow-x: auto;
  background-color: var(--app-code-background, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--app-primary-border-color);
  border-radius: var(--corner-radius-small, 4px);
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.9em;
  line-height: 1.5;
}

.markdown-content pre code {
  background: none;
  border: none;
  padding: 0;
  white-space: pre-wrap; /* Support automatic line wrapping */
  word-break: break-word; /* Break words when necessary */
}

.markdown-content .file-path-link {
  background: transparent;
  border: none;
  padding: 0;
  font-family: var(
    --app-monospace-font-family,
    'SF Mono',
    Monaco,
    'Cascadia Code',
    'Roboto Mono',
    Consolas,
    'Courier New',
    monospace
  );
  font-size: 0.95em;
  color: var(--app-link-foreground, #007acc);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.1s ease;
}

.markdown-content .file-path-link:hover {
  color: var(--app-link-active-foreground, #005a9e);
}

.markdown-content hr {
  border: none;
  border-top: 1px solid var(--app-primary-border-color);
  margin: 1.5em 0;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  padding: 0.5em 1em;
  border: 1px solid var(--app-primary-border-color);
  text-align: left;
}

.markdown-content th {
  background-color: var(--app-secondary-background);
  font-weight: 600;
}


/* ===========================
   CSS Variables
   =========================== */
:root {
  /* Colors */
  --app-primary-foreground: var(--vscode-foreground);
  --app-secondary-foreground: var(--vscode-descriptionForeground);
  --app-primary-border-color: var(--vscode-panel-border);
  --app-input-placeholder-foreground: var(--vscode-input-placeholderForeground);

  /* Buttons */
  --app-ghost-button-hover-background: var(--vscode-toolbar-hoverBackground);

  /* Border Radius */
  --corner-radius-small: 6px;

  /* Header */
  --app-header-background: var(--vscode-sideBar-background);

  /* List Styles */
  --app-list-padding: 0px;
  --app-list-item-padding: 4px 8px;
  --app-list-border-color: transparent;
  --app-list-border-radius: 4px;
  --app-list-hover-background: var(--vscode-list-hoverBackground);
  --app-list-active-background: var(--vscode-list-activeSelectionBackground);
  --app-list-active-foreground: var(--vscode-list-activeSelectionForeground);
  --app-list-gap: 2px;

  /* Menu Styles */
  --app-menu-background: var(--vscode-menu-background);
  --app-menu-border: var(--vscode-menu-border);
  --app-menu-foreground: var(--vscode-menu-foreground);
  --app-menu-selection-background: var(--vscode-menu-selectionBackground);
  --app-menu-selection-foreground: var(--vscode-menu-selectionForeground);

  /* Tool Call Styles */
  --app-tool-background: var(--vscode-editor-background);
  --app-code-background: var(--vscode-textCodeBlock-background);

  /* Warning/Error Styles */
  --app-warning-background: var(
    --vscode-editorWarning-background,
    rgba(255, 204, 0, 0.1)
  );
  --app-warning-border: var(--vscode-editorWarning-foreground, #ffcc00);
  --app-warning-foreground: var(--vscode-editorWarning-foreground, #ffcc00);
}
`;document.head.appendChild(X2);var P2=T(R(),1);var K2=document.getElementById("root");K2&&J2.default.createRoot(K2).render((0,P2.jsx)(Z2,{}));})();
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared utility functions for tool call components
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * FileLink component - Clickable file path links
 * Supports clicking to open files and jump to specified line and column numbers
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared layout components for tool call UI
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Generic tool call component - handles all tool call types as fallback
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared utilities for handling diff operations in the webview
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Read tool call component - specialized for file reading operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Write tool call component - specialized for file writing operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Edit tool call component - specialized for file editing operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Temporary file manager for creating and opening temporary files in webview
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Execute tool call component - specialized for command execution operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * UpdatedPlan tool call component - specialized for plan update operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Search tool call component - specialized for search operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Think tool call component - specialized for thinking/reasoning operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Tool call component factory - routes to specialized components by kind
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Main ToolCall component - uses factory pattern to route to specialized components
 *
 * This file serves as the public API for tool call rendering.
 * It re-exports the router and types from the toolcalls module.
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * File and document related icons
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Navigation and action icons
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Edit mode related icons
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Status and state related icons
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Special UI icons
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * Stop icon for canceling operations
 */
/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 *
 * MarkdownRenderer component - renders markdown content with syntax highlighting and clickable file paths
 */
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
