(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var gr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw St(e)},St=function(n){return new Error("Firebase Database ("+Fo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},dc=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},_s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),i.push(t[u],t[h],t[d],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Bo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new fc;const d=r<<2|a>>4;if(i.push(d),c!==64){const f=a<<4&240|c>>2;if(i.push(f),h!==64){const m=c<<6&192|h;i.push(m)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $o=function(n){const e=Bo(n);return _s.encodeByteArray(e,!0)},Mn=function(n){return $o(n).replace(/\./g,"")},xn=function(n){try{return _s.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){return Wo(void 0,n)}function Wo(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!mc(t)||(n[t]=Wo(n[t],e[t]));return n}function mc(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=()=>gc().__FIREBASE_DEFAULTS__,vc=()=>{if(typeof process>"u"||typeof gr>"u")return;const n=gr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},yc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&xn(n[1]);return e&&JSON.parse(e)},vs=()=>{try{return _c()||vc()||yc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ho=n=>{var e,t;return(t=(e=vs())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Vo=n=>{const e=Ho(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},jo=()=>{var n;return(n=vs())===null||n===void 0?void 0:n.config},qo=n=>{var e;return(e=vs())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Mn(JSON.stringify(t)),Mn(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ys(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Y())}function wc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function bc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Go(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ec(){const n=Y();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ic(){return Fo.NODE_ADMIN===!0}function Cc(){try{return typeof indexedDB=="object"}catch{return!1}}function Tc(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc="FirebaseError";class ke extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Sc,Object.setPrototypeOf(this,ke.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ln.prototype.create)}}class ln{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Rc(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new ke(s,a,i)}}function Rc(n,e){return n.replace(kc,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const kc=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(n){return JSON.parse(n)}function F(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Kt(xn(r[0])||""),t=Kt(xn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Ac=function(n){const e=Ko(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Nc=function(n){const e=Ko(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function vt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Un(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Fn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Bn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(_r(r)&&_r(o)){if(!Bn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function _r(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Bt(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function $t(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)i[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(s<<5|s>>>27)+c+l+u+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Oc(n,e){const t=new Dc(n,e);return t.subscribe.bind(t)}class Dc{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Lc(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Ri),s.error===void 0&&(s.error=Ri),s.complete===void 0&&(s.complete=Ri);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Lc(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ri(){}function yt(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ai=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n){return n&&n._delegate?n._delegate:n}class He{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ce;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fc(e))try{this.getOrInitializeService({instanceIdentifier:Qe})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Qe){return this.instances.has(e)}getOptions(e=Qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Uc(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Qe){return this.component?this.component.multipleInstances?e:Qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uc(n){return n===Qe?void 0:n}function Fc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var R;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(R||(R={}));const $c={debug:R.DEBUG,verbose:R.VERBOSE,info:R.INFO,warn:R.WARN,error:R.ERROR,silent:R.SILENT},Wc=R.INFO,Hc={[R.DEBUG]:"log",[R.VERBOSE]:"log",[R.INFO]:"info",[R.WARN]:"warn",[R.ERROR]:"error"},Vc=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Hc[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ws{constructor(e){this.name=e,this._logLevel=Wc,this._logHandler=Vc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in R))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$c[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,R.DEBUG,...e),this._logHandler(this,R.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,R.VERBOSE,...e),this._logHandler(this,R.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,R.INFO,...e),this._logHandler(this,R.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,R.WARN,...e),this._logHandler(this,R.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,R.ERROR,...e),this._logHandler(this,R.ERROR,...e)}}const jc=(n,e)=>e.some(t=>n instanceof t);let vr,yr;function qc(){return vr||(vr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zc(){return yr||(yr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yo=new WeakMap,Vi=new WeakMap,Qo=new WeakMap,ki=new WeakMap,bs=new WeakMap;function Gc(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Fe(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Yo.set(t,n)}).catch(()=>{}),bs.set(e,n),e}function Kc(n){if(Vi.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Vi.set(n,e)}let ji={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Vi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Qo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Fe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Yc(n){ji=n(ji)}function Qc(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Ai(this),e,...t);return Qo.set(i,e.sort?e.sort():[e]),Fe(i)}:zc().includes(n)?function(...e){return n.apply(Ai(this),e),Fe(Yo.get(this))}:function(...e){return Fe(n.apply(Ai(this),e))}}function Jc(n){return typeof n=="function"?Qc(n):(n instanceof IDBTransaction&&Kc(n),jc(n,qc())?new Proxy(n,ji):n)}function Fe(n){if(n instanceof IDBRequest)return Gc(n);if(ki.has(n))return ki.get(n);const e=Jc(n);return e!==n&&(ki.set(n,e),bs.set(e,n)),e}const Ai=n=>bs.get(n);function Xc(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Fe(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Fe(o.result),l.oldVersion,l.newVersion,Fe(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Zc=["get","getKey","getAll","getAllKeys","count"],eu=["put","add","delete","clear"],Ni=new Map;function wr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ni.get(e))return Ni.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=eu.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Zc.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Ni.set(e,r),r}Yc(n=>({...n,get:(e,t,i)=>wr(e,t)||n.get(e,t,i),has:(e,t)=>!!wr(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nu(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function nu(n){const e=n.getComponent();return e?.type==="VERSION"}const qi="@firebase/app",br="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce=new ws("@firebase/app"),iu="@firebase/app-compat",su="@firebase/analytics-compat",ru="@firebase/analytics",ou="@firebase/app-check-compat",au="@firebase/app-check",lu="@firebase/auth",cu="@firebase/auth-compat",uu="@firebase/database",hu="@firebase/data-connect",du="@firebase/database-compat",fu="@firebase/functions",pu="@firebase/functions-compat",mu="@firebase/installations",gu="@firebase/installations-compat",_u="@firebase/messaging",vu="@firebase/messaging-compat",yu="@firebase/performance",wu="@firebase/performance-compat",bu="@firebase/remote-config",Eu="@firebase/remote-config-compat",Iu="@firebase/storage",Cu="@firebase/storage-compat",Tu="@firebase/firestore",Su="@firebase/vertexai-preview",Ru="@firebase/firestore-compat",ku="firebase",Au="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi="[DEFAULT]",Nu={[qi]:"fire-core",[iu]:"fire-core-compat",[ru]:"fire-analytics",[su]:"fire-analytics-compat",[au]:"fire-app-check",[ou]:"fire-app-check-compat",[lu]:"fire-auth",[cu]:"fire-auth-compat",[uu]:"fire-rtdb",[hu]:"fire-data-connect",[du]:"fire-rtdb-compat",[fu]:"fire-fn",[pu]:"fire-fn-compat",[mu]:"fire-iid",[gu]:"fire-iid-compat",[_u]:"fire-fcm",[vu]:"fire-fcm-compat",[yu]:"fire-perf",[wu]:"fire-perf-compat",[bu]:"fire-rc",[Eu]:"fire-rc-compat",[Iu]:"fire-gcs",[Cu]:"fire-gcs-compat",[Tu]:"fire-fst",[Ru]:"fire-fst-compat",[Su]:"fire-vertex","fire-js":"fire-js",[ku]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new Map,Pu=new Map,Gi=new Map;function Er(n,e){try{n.container.addComponent(e)}catch(t){Ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function nt(n){const e=n.name;if(Gi.has(e))return Ce.debug(`There were multiple attempts to register component ${e}.`),!1;Gi.set(e,n);for(const t of Yt.values())Er(t,n);for(const t of Pu.values())Er(t,n);return!0}function li(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ee(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Be=new ln("app","Firebase",Ou);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new He("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Be.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=Au;function Jo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:zi,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Be.create("bad-app-name",{appName:String(s)});if(t||(t=jo()),!t)throw Be.create("no-options");const r=Yt.get(s);if(r){if(Bn(t,r.options)&&Bn(i,r.config))return r;throw Be.create("duplicate-app",{appName:s})}const o=new Bc(s);for(const l of Gi.values())o.addComponent(l);const a=new Du(t,i,o);return Yt.set(s,a),a}function ci(n=zi){const e=Yt.get(n);if(!e&&n===zi&&jo())return Jo();if(!e)throw Be.create("no-app",{appName:n});return e}function Lu(){return Array.from(Yt.values())}function he(n,e,t){var i;let s=(i=Nu[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ce.warn(a.join(" "));return}nt(new He(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="firebase-heartbeat-database",xu=1,Qt="firebase-heartbeat-store";let Pi=null;function Xo(){return Pi||(Pi=Xc(Mu,xu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Qt)}catch(t){console.warn(t)}}}}).catch(n=>{throw Be.create("idb-open",{originalErrorMessage:n.message})})),Pi}async function Uu(n){try{const t=(await Xo()).transaction(Qt),i=await t.objectStore(Qt).get(Zo(n));return await t.done,i}catch(e){if(e instanceof ke)Ce.warn(e.message);else{const t=Be.create("idb-get",{originalErrorMessage:e?.message});Ce.warn(t.message)}}}async function Ir(n,e){try{const i=(await Xo()).transaction(Qt,"readwrite");await i.objectStore(Qt).put(e,Zo(n)),await i.done}catch(t){if(t instanceof ke)Ce.warn(t.message);else{const i=Be.create("idb-set",{originalErrorMessage:t?.message});Ce.warn(i.message)}}}function Zo(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=1024,Bu=30*24*60*60*1e3;class $u{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Hu(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Cr();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Bu}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Ce.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Cr(),{heartbeatsToSend:i,unsentEntries:s}=Wu(this._heartbeatsCache.heartbeats),r=Mn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Ce.warn(t),""}}}function Cr(){return new Date().toISOString().substring(0,10)}function Wu(n,e=Fu){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Tr(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Tr(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Hu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cc()?Tc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Uu(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ir(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ir(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Tr(n){return Mn(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n){nt(new He("platform-logger",e=>new tu(e),"PRIVATE")),nt(new He("heartbeat",e=>new $u(e),"PRIVATE")),he(qi,br,n),he(qi,br,"esm2017"),he("fire-js","")}Vu("");function Es(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function ea(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ju=ea,ta=new ln("auth","Firebase",ea());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new ws("@firebase/auth");function qu(n,...e){$n.logLevel<=R.WARN&&$n.warn(`Auth (${lt}): ${n}`,...e)}function An(n,...e){$n.logLevel<=R.ERROR&&$n.error(`Auth (${lt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(n,...e){throw Cs(n,...e)}function ae(n,...e){return Cs(n,...e)}function Is(n,e,t){const i=Object.assign(Object.assign({},ju()),{[e]:t});return new ln("auth","Firebase",i).create(e,{appName:n.name})}function de(n){return Is(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function zu(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&ne(n,"argument-error"),Is(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Cs(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return ta.create(n,...e)}function _(n,e,...t){if(!n)throw Cs(e,...t)}function ve(n){const e="INTERNAL ASSERTION FAILED: "+n;throw An(e),new Error(e)}function Te(n,e){n||ve(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Gu(){return Sr()==="http:"||Sr()==="https:"}function Sr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gu()||bc()||"connection"in navigator)?navigator.onLine:!0}function Yu(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Te(t>e,"Short delay should be less than long delay!"),this.isMobile=ys()||Go()}get(){return Ku()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(n,e){Te(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ve("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ve("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ve("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju=new cn(3e4,6e4);function Ae(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function me(n,e,t,i,s={}){return ia(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Rt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return wc()||(c.referrerPolicy="no-referrer"),na.fetch()(sa(n,n.config.apiHost,t,a),c)})}async function ia(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Qu),e);try{const s=new Zu(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw wn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw wn(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw wn(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw wn(n,"user-disabled",o);const u=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Is(n,u,c);ne(n,u)}}catch(s){if(s instanceof ke)throw s;ne(n,"network-request-failed",{message:String(s)})}}async function un(n,e,t,i,s={}){const r=await me(n,e,t,i,s);return"mfaPendingCredential"in r&&ne(n,"multi-factor-auth-required",{_serverResponse:r}),r}function sa(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Ts(n.config,s):`${n.config.apiScheme}://${s}`}function Xu(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zu{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ae(this.auth,"network-request-failed")),Ju.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function wn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ae(n,e,i);return s.customData._tokenResponse=t,s}function Rr(n){return n!==void 0&&n.enterprise!==void 0}class eh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xu(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function th(n,e){return me(n,"GET","/v2/recaptchaConfig",Ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nh(n,e){return me(n,"POST","/v1/accounts:delete",e)}async function ra(n,e){return me(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ih(n,e=!1){const t=L(n),i=await t.getIdToken(e),s=Ss(i);_(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Wt(Oi(s.auth_time)),issuedAtTime:Wt(Oi(s.iat)),expirationTime:Wt(Oi(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Oi(n){return Number(n)*1e3}function Ss(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return An("JWT malformed, contained fewer than 3 sections"),null;try{const s=xn(t);return s?JSON.parse(s):(An("Failed to decode base64 JWT payload"),null)}catch(s){return An("Caught error parsing JWT payload as JSON",s?.toString()),null}}function kr(n){const e=Ss(n);return _(e,"internal-error"),_(typeof e.exp<"u","internal-error"),_(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof ke&&sh(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function sh({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wt(this.lastLoginAt),this.creationTime=Wt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wn(n){var e;const t=n.auth,i=await n.getIdToken(),s=await wt(n,ra(t,{idToken:i}));_(s?.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?oa(r.providerUserInfo):[],a=ah(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!a?.length,u=l?c:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Yi(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function oh(n){const e=L(n);await Wn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ah(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function oa(n){return n.map(e=>{var{providerId:t}=e,i=Es(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lh(n,e){const t=await ia(n,{},async()=>{const i=Rt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=sa(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",na.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ch(n,e){return me(n,"POST","/v2/accounts:revokeToken",Ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_(e.idToken,"internal-error"),_(typeof e.idToken<"u","internal-error"),_(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):kr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){_(e.length!==0,"internal-error");const t=kr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(_(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await lh(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new ft;return i&&(_(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(_(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(_(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ft,this.toJSON())}_performRefresh(){return ve("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(n,e){_(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ye{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Es(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Yi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await wt(this,this.stsTokenManager.getToken(this.auth,e));return _(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ih(this,e)}reload(){return oh(this)}_assign(e){this!==e&&(_(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ye(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){_(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Wn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ee(this.auth.app))return Promise.reject(de(this.auth));const e=await this.getIdToken();return await wt(this,nh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,u;const h=(i=t.displayName)!==null&&i!==void 0?i:void 0,d=(s=t.email)!==null&&s!==void 0?s:void 0,f=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,m=(o=t.photoURL)!==null&&o!==void 0?o:void 0,v=(a=t.tenantId)!==null&&a!==void 0?a:void 0,I=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,T=(c=t.createdAt)!==null&&c!==void 0?c:void 0,B=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:P,emailVerified:N,isAnonymous:Ge,providerData:Ke,stsTokenManager:yn}=t;_(P&&yn,e,"internal-error");const Dt=ft.fromJSON(this.name,yn);_(typeof P=="string",e,"internal-error"),Pe(h,e.name),Pe(d,e.name),_(typeof N=="boolean",e,"internal-error"),_(typeof Ge=="boolean",e,"internal-error"),Pe(f,e.name),Pe(m,e.name),Pe(v,e.name),Pe(I,e.name),Pe(T,e.name),Pe(B,e.name);const Si=new ye({uid:P,auth:e,email:d,emailVerified:N,displayName:h,isAnonymous:Ge,photoURL:m,phoneNumber:f,tenantId:v,stsTokenManager:Dt,createdAt:T,lastLoginAt:B});return Ke&&Array.isArray(Ke)&&(Si.providerData=Ke.map(hc=>Object.assign({},hc))),I&&(Si._redirectEventId=I),Si}static async _fromIdTokenResponse(e,t,i=!1){const s=new ft;s.updateFromServerResponse(t);const r=new ye({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Wn(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];_(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?oa(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new ft;a.updateFromIdToken(i);const l=new ye({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Yi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new Map;function we(n){Te(n instanceof Function,"Expected a class definition");let e=Ar.get(n);return e?(Te(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ar.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}aa.type="NONE";const Nr=aa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(n,e,t){return`firebase:${n}:${e}:${t}`}class pt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Nn(this.userKey,s.apiKey,r),this.fullPersistenceKey=Nn("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ye._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new pt(we(Nr),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||we(Nr);const o=Nn(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const u=await c._get(o);if(u){const h=ye._fromJSON(e,u);c!==r&&(a=h),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new pt(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new pt(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ha(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(la(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(fa(e))return"Blackberry";if(pa(e))return"Webos";if(ca(e))return"Safari";if((e.includes("chrome/")||ua(e))&&!e.includes("edge/"))return"Chrome";if(da(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function la(n=Y()){return/firefox\//i.test(n)}function ca(n=Y()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ua(n=Y()){return/crios\//i.test(n)}function ha(n=Y()){return/iemobile/i.test(n)}function da(n=Y()){return/android/i.test(n)}function fa(n=Y()){return/blackberry/i.test(n)}function pa(n=Y()){return/webos/i.test(n)}function Rs(n=Y()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function uh(n=Y()){var e;return Rs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function hh(){return Ec()&&document.documentMode===10}function ma(n=Y()){return Rs(n)||da(n)||pa(n)||fa(n)||/windows phone/i.test(n)||ha(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n,e=[]){let t;switch(n){case"Browser":t=Pr(Y());break;case"Worker":t=`${Pr(Y())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${lt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fh(n,e={}){return me(n,"GET","/v2/passwordPolicy",Ae(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=6;class mh{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:ph,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Or(this),this.idTokenSubscription=new Or(this),this.beforeStateQueue=new dh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ta,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=we(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await pt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ra(this,{idToken:e}),i=await ye._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ee(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&l?.user&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return _(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Wn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Yu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ee(this.app))return Promise.reject(de(this));const t=e?L(e):null;return t&&_(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&_(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ee(this.app)?Promise.reject(de(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ee(this.app)?Promise.reject(de(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(we(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await fh(this),t=new mh(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ln("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await ch(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&we(e)||this._popupRedirectResolver;_(t,this,"argument-error"),this.redirectPersistenceManager=await pt.create(this,[we(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(_(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ga(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&qu(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ge(n){return L(n)}class Or{constructor(e){this.auth=e,this.observer=null,this.addObserver=Oc(t=>this.observer=t)}get next(){return _(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ui={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _h(n){ui=n}function _a(n){return ui.loadJS(n)}function vh(){return ui.recaptchaEnterpriseScript}function yh(){return ui.gapiScript}function wh(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const bh="recaptcha-enterprise",Eh="NO_RECAPTCHA";class Ih{constructor(e){this.type=bh,this.auth=ge(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{th(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new eh(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function s(r,o,a){const l=window.grecaptcha;Rr(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(c=>{o(c)}).catch(()=>{o(Eh)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(a=>{if(!t&&Rr(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=vh();l.length!==0&&(l+=a),_a(l).then(()=>{s(a,r,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function Dr(n,e,t,i=!1){const s=new Ih(n);let r;try{r=await s.verify(t)}catch{r=await s.verify(t,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Hn(n,e,t,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Dr(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Dr(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ch(n,e){const t=li(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Bn(r,e??{}))return s;ne(s,"already-initialized")}return t.initialize({options:e})}function Th(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(we);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Sh(n,e,t){const i=ge(n);_(i._canInitEmulator,i,"emulator-config-failed"),_(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=va(e),{host:o,port:a}=Rh(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),kh()}function va(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rh(n){const e=va(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Lr(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Lr(o)}}}function Lr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kh(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ve("not implemented")}_getIdTokenResponse(e){return ve("not implemented")}_linkToIdToken(e,t){return ve("not implemented")}_getReauthenticationResolver(e){return ve("not implemented")}}async function Ah(n,e){return me(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nh(n,e){return un(n,"POST","/v1/accounts:signInWithPassword",Ae(n,e))}async function Ph(n,e){return me(n,"POST","/v1/accounts:sendOobCode",Ae(n,e))}async function Oh(n,e){return Ph(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dh(n,e){return un(n,"POST","/v1/accounts:signInWithEmailLink",Ae(n,e))}async function Lh(n,e){return un(n,"POST","/v1/accounts:signInWithEmailLink",Ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt extends ks{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Jt(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Jt(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Hn(e,t,"signInWithPassword",Nh);case"emailLink":return Dh(e,{email:this._email,oobCode:this._password});default:ne(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Hn(e,i,"signUpPassword",Ah);case"emailLink":return Lh(e,{idToken:t,email:this._email,oobCode:this._password});default:ne(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mt(n,e){return un(n,"POST","/v1/accounts:signInWithIdp",Ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh="http://localhost";class it extends ks{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new it(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ne("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Es(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new it(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return mt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,mt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mt(e,t)}buildRequest(){const e={requestUri:Mh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Rt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Uh(n){const e=Bt($t(n)).link,t=e?Bt($t(e)).deep_link_id:null,i=Bt($t(n)).deep_link_id;return(i?Bt($t(i)).link:null)||i||t||e||n}class As{constructor(e){var t,i,s,r,o,a;const l=Bt($t(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,u=(i=l.oobCode)!==null&&i!==void 0?i:null,h=xh((s=l.mode)!==null&&s!==void 0?s:null);_(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=Uh(e);try{return new As(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(){this.providerId=kt.PROVIDER_ID}static credential(e,t){return Jt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=As.parseLink(t);return _(i,"argument-error"),Jt._fromEmailAndCode(e,i.code,i.tenantId)}}kt.PROVIDER_ID="password";kt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";kt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends Ns{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De extends hn{constructor(){super("facebook.com")}static credential(e){return it._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return De.credential(e.oauthAccessToken)}catch{return null}}}De.FACEBOOK_SIGN_IN_METHOD="facebook.com";De.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends hn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return it._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return _e.credentialFromTaggedObject(e)}static credentialFromError(e){return _e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return _e.credential(t,i)}catch{return null}}}_e.GOOGLE_SIGN_IN_METHOD="google.com";_e.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le extends hn{constructor(){super("github.com")}static credential(e){return it._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Le.credentialFromTaggedObject(e)}static credentialFromError(e){return Le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Le.credential(e.oauthAccessToken)}catch{return null}}}Le.GITHUB_SIGN_IN_METHOD="github.com";Le.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me extends hn{constructor(){super("twitter.com")}static credential(e,t){return it._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Me.credentialFromTaggedObject(e)}static credentialFromError(e){return Me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Me.credential(t,i)}catch{return null}}}Me.TWITTER_SIGN_IN_METHOD="twitter.com";Me.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ya(n,e){return un(n,"POST","/v1/accounts:signUp",Ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await ye._fromIdTokenResponse(e,i,s),o=Mr(i);return new Se({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Mr(i);return new Se({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Mr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fh(n){var e;if(ee(n.app))return Promise.reject(de(n));const t=ge(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Se({user:t.currentUser,providerId:null,operationType:"signIn"});const i=await ya(t,{returnSecureToken:!0}),s=await Se._fromIdTokenResponse(t,"signIn",i,!0);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends ke{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Vn.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Vn(e,t,i,s)}}function wa(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Vn._fromErrorAndOperation(n,r,e,i):r})}async function Bh(n,e,t=!1){const i=await wt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Se._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $h(n,e,t=!1){const{auth:i}=n;if(ee(i.app))return Promise.reject(de(i));const s="reauthenticate";try{const r=await wt(n,wa(i,s,e,n),t);_(r.idToken,i,"internal-error");const o=Ss(r.idToken);_(o,i,"internal-error");const{sub:a}=o;return _(n.uid===a,i,"user-mismatch"),Se._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&ne(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ba(n,e,t=!1){if(ee(n.app))return Promise.reject(de(n));const i="signIn",s=await wa(n,i,e),r=await Se._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Wh(n,e){return ba(ge(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ea(n){const e=ge(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Hh(n,e,t){const i=ge(n);await Hn(i,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",Oh)}async function Vh(n,e,t){if(ee(n.app))return Promise.reject(de(n));const i=ge(n),o=await Hn(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ya).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Ea(n),l}),a=await Se._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(a.user),a}function jh(n,e,t){return ee(n.app)?Promise.reject(de(n)):Wh(L(n),kt.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Ea(n),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qh(n,e){return me(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=L(n),r={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await wt(i,qh(i.auth,r));i.displayName=o.displayName||null,i.photoURL=o.photoUrl||null;const a=i.providerData.find(({providerId:l})=>l==="password");a&&(a.displayName=i.displayName,a.photoURL=i.photoURL),await i._updateTokensIfNecessary(o)}function zh(n,e,t,i){return L(n).onIdTokenChanged(e,t,i)}function Gh(n,e,t){return L(n).beforeAuthStateChanged(e,t)}function Kh(n,e,t,i){return L(n).onAuthStateChanged(e,t,i)}function Yh(n){return L(n).signOut()}const jn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(jn,"1"),this.storage.removeItem(jn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=1e3,Jh=10;class Ca extends Ia{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ma(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);hh()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Jh):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Qh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ca.type="LOCAL";const Xh=Ca;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta extends Ia{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ta.type="SESSION";const Sa=Ta;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zh(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new hi(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await Zh(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}hi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Ps("",20);s.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===c)switch(d.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(d.data.response);break;default:clearTimeout(u),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(){return window}function td(n){fe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(){return typeof fe().WorkerGlobalScope<"u"&&typeof fe().importScripts=="function"}async function nd(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function id(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function sd(){return Ra()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka="firebaseLocalStorageDb",rd=1,qn="firebaseLocalStorage",Aa="fbase_key";class dn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function di(n,e){return n.transaction([qn],e?"readwrite":"readonly").objectStore(qn)}function od(){const n=indexedDB.deleteDatabase(ka);return new dn(n).toPromise()}function Qi(){const n=indexedDB.open(ka,rd);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(qn,{keyPath:Aa})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(qn)?e(i):(i.close(),await od(),e(await Qi()))})})}async function Ur(n,e,t){const i=di(n,!0).put({[Aa]:e,value:t});return new dn(i).toPromise()}async function ad(n,e){const t=di(n,!1).get(e),i=await new dn(t).toPromise();return i===void 0?null:i.value}function Fr(n,e){const t=di(n,!0).delete(e);return new dn(t).toPromise()}const ld=800,cd=3;class Na{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>cd)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ra()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hi._getInstance(sd()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await nd(),!this.activeServiceWorker)return;this.sender=new ed(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||id()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qi();return await Ur(e,jn,"1"),await Fr(e,jn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ur(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>ad(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Fr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=di(s,!1).getAll();return new dn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ld)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Na.type="LOCAL";const ud=Na;new cn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(n,e){return e?we(e):(_(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends ks{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return mt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return mt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hd(n){return ba(n.auth,new Os(n),n.bypassAuthState)}function dd(n){const{auth:e,user:t}=n;return _(t,e,"internal-error"),$h(t,new Os(n),n.bypassAuthState)}async function fd(n){const{auth:e,user:t}=n;return _(t,e,"internal-error"),Bh(t,new Os(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hd;case"linkViaPopup":case"linkViaRedirect":return fd;case"reauthViaPopup":case"reauthViaRedirect":return dd;default:ne(this.auth,"internal-error")}}resolve(e){Te(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Te(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=new cn(2e3,1e4);async function md(n,e,t){if(ee(n.app))return Promise.reject(ae(n,"operation-not-supported-in-this-environment"));const i=ge(n);zu(n,e,Ns);const s=Pa(i,t);return new Xe(i,"signInViaPopup",e,s).executeNotNull()}class Xe extends Oa{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Xe.currentPopupAction&&Xe.currentPopupAction.cancel(),Xe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _(e,this.auth,"internal-error"),e}async onExecution(){Te(this.filter.length===1,"Popup operations only handle one event");const e=Ps();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ae(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ae(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ae(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pd.get())};e()}}Xe.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="pendingRedirect",Pn=new Map;class _d extends Oa{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Pn.get(this.auth._key());if(!e){try{const i=await vd(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Pn.set(this.auth._key(),e)}return this.bypassAuthState||Pn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vd(n,e){const t=bd(e),i=wd(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function yd(n,e){Pn.set(n._key(),e)}function wd(n){return we(n._redirectPersistence)}function bd(n){return Nn(gd,n.config.apiKey,n.name)}async function Ed(n,e,t=!1){if(ee(n.app))return Promise.reject(de(n));const i=ge(n),s=Pa(i,e),o=await new _d(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id=10*60*1e3;class Cd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Td(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Da(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(ae(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Id&&this.cachedEventUids.clear(),this.cachedEventUids.has(Br(e))}saveEventToCache(e){this.cachedEventUids.add(Br(e)),this.lastProcessedEventTime=Date.now()}}function Br(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Da({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Td(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Da(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sd(n,e={}){return me(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kd=/^https?/;async function Ad(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Sd(n);for(const t of e)try{if(Nd(t))return}catch{}ne(n,"unauthorized-domain")}function Nd(n){const e=Ki(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!kd.test(t))return!1;if(Rd.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=new cn(3e4,6e4);function $r(){const n=fe().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Od(n){return new Promise((e,t)=>{var i,s,r;function o(){$r(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$r(),t(ae(n,"network-request-failed"))},timeout:Pd.get()})}if(!((s=(i=fe().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=fe().gapi)===null||r===void 0)&&r.load)o();else{const a=wh("iframefcb");return fe()[a]=()=>{gapi.load?o():t(ae(n,"network-request-failed"))},_a(`${yh()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw On=null,e})}let On=null;function Dd(n){return On=On||Od(n),On}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=new cn(5e3,15e3),Md="__/auth/iframe",xd="emulator/auth/iframe",Ud={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bd(n){const e=n.config;_(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ts(e,xd):`https://${n.config.authDomain}/${Md}`,i={apiKey:e.apiKey,appName:n.name,v:lt},s=Fd.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Rt(i).slice(1)}`}async function $d(n){const e=await Dd(n),t=fe().gapi;return _(t,n,"internal-error"),e.open({where:document.body,url:Bd(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ud,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ae(n,"network-request-failed"),a=fe().setTimeout(()=>{r(o)},Ld.get());function l(){fe().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hd=500,Vd=600,jd="_blank",qd="http://localhost";class Wr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zd(n,e,t,i=Hd,s=Vd){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Wd),{width:i.toString(),height:s.toString(),top:r,left:o}),c=Y().toLowerCase();t&&(a=ua(c)?jd:t),la(c)&&(e=e||qd,l.scrollbars="yes");const u=Object.entries(l).reduce((d,[f,m])=>`${d}${f}=${m},`,"");if(uh(c)&&a!=="_self")return Gd(e||"",a),new Wr(null);const h=window.open(e||"",a,u);_(h,n,"popup-blocked");try{h.focus()}catch{}return new Wr(h)}function Gd(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="__/auth/handler",Yd="emulator/auth/handler",Qd=encodeURIComponent("fac");async function Hr(n,e,t,i,s,r){_(n.config.authDomain,n,"auth-domain-config-required"),_(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:lt,eventId:s};if(e instanceof Ns){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Un(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof hn){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const l=await n._getAppCheckToken(),c=l?`#${Qd}=${encodeURIComponent(l)}`:"";return`${Jd(n)}?${Rt(a).slice(1)}${c}`}function Jd({config:n}){return n.emulator?Ts(n,Yd):`https://${n.authDomain}/${Kd}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Di="webStorageSupport";class Xd{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Sa,this._completeRedirectFn=Ed,this._overrideRedirectResult=yd}async _openPopup(e,t,i,s){var r;Te((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Hr(e,t,i,Ki(),s);return zd(e,o,Ps())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Hr(e,t,i,Ki(),s);return td(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Te(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await $d(e),i=new Cd(e);return t.register("authEvent",s=>(_(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Di,{type:Di},s=>{var r;const o=(r=s?.[0])===null||r===void 0?void 0:r[Di];o!==void 0&&t(!!o),ne(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ad(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ma()||ca()||Rs()}}const Zd=Xd;var Vr="@firebase/auth",jr="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nf(n){nt(new He("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;_(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ga(n)},c=new gh(i,s,r,l);return Th(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),nt(new He("auth-internal",e=>{const t=ge(e.getProvider("auth").getImmediate());return(i=>new ef(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),he(Vr,jr,tf(n)),he(Vr,jr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf=5*60,rf=qo("authIdTokenMaxAge")||sf;let qr=null;const of=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>rf)return;const s=t?.token;qr!==s&&(qr=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function af(n=ci()){const e=li(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ch(n,{popupRedirectResolver:Zd,persistence:[ud,Xh,Sa]}),i=qo("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=of(r.toString());Gh(t,o,()=>o(t.currentUser)),zh(t,a=>o(a))}}const s=Ho("auth");return s&&Sh(t,`http://${s}`),t}function lf(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}_h({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ae("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",lf().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nf("Browser");var zr={};const Gr="@firebase/database",Kr="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let La="";function cf(n){La=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),F(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Kt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return pe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new uf(e)}}catch{}return new hf},Ze=Ma("localStorage"),df=Ma("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=new ws("@firebase/database"),ff=function(){let n=1;return function(){return n++}}(),xa=function(n){const e=Mc(n),t=new Pc;t.update(e);const i=t.digest();return _s.encodeByteArray(i)},fn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=fn.apply(null,i):typeof i=="object"?e+=F(i):e+=i,e+=" "}return e};let Ht=null,Yr=!0;const pf=function(n,e){p(!0,"Can't turn on custom loggers persistently."),gt.logLevel=R.VERBOSE,Ht=gt.log.bind(gt)},j=function(...n){if(Yr===!0&&(Yr=!1,Ht===null&&df.get("logging_enabled")===!0&&pf()),Ht){const e=fn.apply(null,n);Ht(e)}},pn=function(n){return function(...e){j(n,...e)}},Ji=function(...n){const e="FIREBASE INTERNAL ERROR: "+fn(...n);gt.error(e)},Re=function(...n){const e=`FIREBASE FATAL ERROR: ${fn(...n)}`;throw gt.error(e),new Error(e)},K=function(...n){const e="FIREBASE WARNING: "+fn(...n);gt.warn(e)},mf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&K("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},fi=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},gf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},bt="[MIN_NAME]",st="[MAX_NAME]",ct=function(n,e){if(n===e)return 0;if(n===bt||e===st)return-1;if(e===bt||n===st)return 1;{const t=Qr(n),i=Qr(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},_f=function(n,e){return n===e?0:n<e?-1:1},Lt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+F(e))},Ds=function(n){if(typeof n!="object"||n===null)return F(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=F(e[i]),t+=":",t+=Ds(n[e[i]]);return t+="}",t},Ua=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function q(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Fa=function(n){p(!fi(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},vf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},yf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function wf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const bf=new RegExp("^-?(0*)\\d{1,10}$"),Ef=-2147483648,If=2147483647,Qr=function(n){if(bf.test(n)){const e=Number(n);if(e>=Ef&&e<=If)return e}return null},At=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw K("Exception was thrown by user callback.",t),e},Math.floor(0))}},Cf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Vt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){K(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(j("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',K(e)}}class Dn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Dn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="5",Ba="v",$a="s",Wa="r",Ha="f",Va=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ja="ls",qa="p",Xi="ac",za="websocket",Ga="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ze.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ze.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Rf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ya(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===za)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ga)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Rf(n)&&(t.ns=n.namespace);const s=[];return q(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(){this.counters_={}}incrementCounter(e,t=1){pe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return pc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li={},Mi={};function Ms(n){const e=n.toString();return Li[e]||(Li[e]=new kf),Li[e]}function Af(n,e){const t=n.toString();return Mi[t]||(Mi[t]=e()),Mi[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&At(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="start",Pf="close",Of="pLPCommand",Df="pRTLPCB",Qa="id",Ja="pw",Xa="ser",Lf="cb",Mf="seg",xf="ts",Uf="d",Ff="dframe",Za=1870,el=30,Bf=Za-el,$f=25e3,Wf=3e4;class dt{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=pn(e),this.stats_=Ms(t),this.urlFn=l=>(this.appCheckToken&&(l[Xi]=this.appCheckToken),Ya(t,Ga,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Nf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Wf)),gf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new xs((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Jr)this.id=a,this.password=l;else if(o===Pf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Jr]="t",i[Xa]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Lf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ba]=Ls,this.transportSessionId&&(i[$a]=this.transportSessionId),this.lastSessionId&&(i[ja]=this.lastSessionId),this.applicationId&&(i[qa]=this.applicationId),this.appCheckToken&&(i[Xi]=this.appCheckToken),typeof location<"u"&&location.hostname&&Va.test(location.hostname)&&(i[Wa]=Ha);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){dt.forceAllow_=!0}static forceDisallow(){dt.forceDisallow_=!0}static isAvailable(){return dt.forceAllow_?!0:!dt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!vf()&&!yf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=F(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=$o(t),s=Ua(i,Bf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Ff]="t",i[Qa]=e,i[Ja]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=F(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class xs{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ff(),window[Of+this.uniqueCallbackIdentifier]=e,window[Df+this.uniqueCallbackIdentifier]=t,this.myIFrame=xs.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){j("frame writing exception"),a.stack&&j(a.stack),j(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||j("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Qa]=this.myID,e[Ja]=this.myPW,e[Xa]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+el+i.length<=Za;){const o=this.pendingSegs.shift();i=i+"&"+Mf+s+"="+o.seg+"&"+xf+s+"="+o.ts+"&"+Uf+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor($f)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{j("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=16384,Vf=45e3;let zn=null;typeof MozWebSocket<"u"?zn=MozWebSocket:typeof WebSocket<"u"&&(zn=WebSocket);class re{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=pn(this.connId),this.stats_=Ms(t),this.connURL=re.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Ba]=Ls,typeof location<"u"&&location.hostname&&Va.test(location.hostname)&&(o[Wa]=Ha),t&&(o[$a]=t),i&&(o[ja]=i),s&&(o[Xi]=s),r&&(o[qa]=r),Ya(e,za,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ze.set("previous_websocket_failure",!0);try{let i;Ic(),this.mySock=new zn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){re.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&zn!==null&&!re.forceDisallow_}static previouslyFailed(){return Ze.isInMemoryStorage||Ze.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ze.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Kt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=F(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Ua(t,Hf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Vf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}re.responsesRequiredToBeHealthy=2;re.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[dt,re]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=re&&re.isAvailable();let i=t&&!re.previouslyFailed();if(e.webSocketOnly&&(t||K("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[re];else{const s=this.transports_=[];for(const r of Xt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Xt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf=6e4,qf=5e3,zf=10*1024,Gf=100*1024,xi="t",Xr="d",Kf="s",Zr="r",Yf="e",eo="o",to="a",no="n",io="p",Qf="h";class Jf{constructor(e,t,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=pn("c:"+this.id+":"),this.transportManager_=new Xt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Vt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Gf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>zf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(xi in e){const t=e[xi];t===to?this.upgradeIfSecondaryHealthy_():t===Zr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===eo&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Lt("t",e),i=Lt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:io,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:to,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:no,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Lt("t",e),i=Lt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Lt(xi,e);if(Xr in e){const i=e[Xr];if(t===Qf){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===no){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Kf?this.onConnectionShutdown_(i):t===Zr?this.onReset_(i):t===Yf?Ji("Server Error: "+i):t===eo?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ji("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Ls!==i&&K("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Vt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(jf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Vt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:io,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ze.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends nl{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ys()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Gn}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so=32,ro=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function C(){return new S("")}function w(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ve(n){return n.pieces_.length-n.pieceNum_}function k(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function Us(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Xf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Zt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function il(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function O(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new S(t,0)}function b(n){return n.pieceNum_>=n.pieces_.length}function G(n,e){const t=w(n),i=w(e);if(t===null)return e;if(t===i)return G(k(n),k(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Zf(n,e){const t=Zt(n,0),i=Zt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=ct(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Fs(n,e){if(Ve(n)!==Ve(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function te(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Ve(n)>Ve(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class ep{constructor(e,t){this.errorPrefix_=t,this.parts_=Zt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ai(this.parts_[i]);sl(this)}}function tp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ai(e),sl(n)}function np(n){const e=n.parts_.pop();n.byteLength_-=ai(e),n.parts_.length>0&&(n.byteLength_-=1)}function sl(n){if(n.byteLength_>ro)throw new Error(n.errorPrefix_+"has a key path longer than "+ro+" bytes ("+n.byteLength_+").");if(n.parts_.length>so)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+so+") or object contains a cycle "+Je(n))}function Je(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs extends nl{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Bs}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=1e3,ip=60*5*1e3,oo=30*1e3,sp=1.3,rp=3e4,op="server_kill",ao=3;class Ie extends tl{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ie.nextPersistentConnectionId_++,this.log_=pn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Mt,this.maxReconnectDelay_=ip,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Bs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Gn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(F(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ce,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ie.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&pe(e,"w")){const i=vt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();K(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Nc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=oo)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Ac(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+F(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ji("Unrecognized action received from server: "+F(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Mt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Mt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rp&&(this.reconnectDelay_=Mt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*sp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ie.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?j("getToken() completed but was canceled"):(j("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Jf(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{K(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(op)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&K(h),l())}}}interrupt(e){j("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){j("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Un(this.interruptReasons_)&&(this.reconnectDelay_=Mt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Ds(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){j("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ao&&(this.reconnectDelay_=oo,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){j("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ao&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+La.replace(/\./g,"-")]=1,ys()?e["framework.cordova"]=1:Go()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Gn.getInstance().currentlyOnline();return Un(this.interruptReasons_)&&e}}Ie.nextPersistentConnectionId_=0;Ie.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new E(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new E(bt,e),s=new E(bt,t);return this.compare(i,s)!==0}minPost(){return E.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bn;class rl extends pi{static get __EMPTY_NODE(){return bn}static set __EMPTY_NODE(e){bn=e}compare(e,t){return ct(e.name,t.name)}isDefinedOn(e){throw St("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return E.MIN}maxPost(){return new E(st,bn)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,bn)}toString(){return".key"}}const _t=new rl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class V{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??V.RED,this.left=s??Q.EMPTY_NODE,this.right=r??Q.EMPTY_NODE}copy(e,t,i,s,r){return new V(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return Q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,V.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,V.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}V.RED=!0;V.BLACK=!1;class ap{copy(e,t,i,s,r){return this}insert(e,t,i){return new V(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Q{constructor(e,t=Q.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Q(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,V.BLACK,null,null))}remove(e){return new Q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,V.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new En(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new En(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new En(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new En(this.root_,null,this.comparator_,!0,e)}}Q.EMPTY_NODE=new ap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(n,e){return ct(n.name,e.name)}function $s(n,e){return ct(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zi;function cp(n){Zi=n}const ol=function(n){return typeof n=="number"?"number:"+Fa(n):"string:"+n},al=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&pe(e,".sv"),"Priority must be a string or number.")}else p(n===Zi||n.isEmpty(),"priority of unexpected type.");p(n===Zi||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lo;class H{constructor(e,t=H.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),al(this.priorityNode_)}static set __childrenNodeConstructor(e){lo=e}static get __childrenNodeConstructor(){return lo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new H(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return b(e)?this:w(e)===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:H.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=w(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Ve(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,H.__childrenNodeConstructor.EMPTY_NODE.updateChild(k(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ol(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Fa(this.value_):e+=this.value_,this.lazyHash_=xa(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===H.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof H.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=H.VALUE_TYPE_ORDER.indexOf(t),r=H.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}H.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ll,cl;function up(n){ll=n}function hp(n){cl=n}class dp extends pi{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?ct(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return E.MIN}maxPost(){return new E(st,new H("[PRIORITY-POST]",cl))}makePost(e,t){const i=ll(e);return new E(t,new H("[PRIORITY-POST]",i))}toString(){return".priority"}}const D=new dp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp=Math.log(2);class pp{constructor(e){const t=r=>parseInt(Math.log(r)/fp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Kn=function(n,e,t,i){n.sort(e);const s=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new V(d,h.node,V.BLACK,null,null);{const f=parseInt(u/2,10)+l,m=s(l,f),v=s(f+1,c);return h=n[f],d=t?t(h):h,new V(d,h.node,V.BLACK,m,v)}},r=function(l){let c=null,u=null,h=n.length;const d=function(m,v){const I=h-m,T=h;h-=m;const B=s(I+1,T),P=n[I],N=t?t(P):P;f(new V(N,P.node,v,null,B))},f=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<l.count;++m){const v=l.nextBitIsOne(),I=Math.pow(2,l.count-(m+1));v?d(I,V.BLACK):(d(I,V.BLACK),d(I,V.RED))}return u},o=new pp(n.length),a=r(o);return new Q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui;const ht={};class be{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return p(ht&&D,"ChildrenNode.ts has not been loaded"),Ui=Ui||new be({".priority":ht},{".priority":D}),Ui}get(e){const t=vt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Q?t:null}hasIndex(e){return pe(this.indexSet_,e.toString())}addIndex(e,t){p(e!==_t,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(E.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Kn(i,e.getCompare()):a=ht;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new be(u,c)}addToIndexes(e,t){const i=Fn(this.indexes_,(s,r)=>{const o=vt(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===ht)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Kn(a,o.getCompare())}else return ht;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new be(i,this.indexSet_)}removeFromIndexes(e,t){const i=Fn(this.indexes_,s=>{if(s===ht)return s;{const r=t.get(e.name);return r?s.remove(new E(e.name,r)):s}});return new be(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xt;class g{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&al(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return xt||(xt=new g(new Q($s),null,be.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||xt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?xt:t}}getChild(e){const t=w(e);return t===null?this:this.getImmediateChild(t).getChild(k(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new E(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?xt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=w(e);if(i===null)return t;{p(w(e)!==".priority"||Ve(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(k(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(D,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ol(this.getPriority().val())+":"),this.forEachChild(D,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":xa(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new E(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new E(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new E(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===mn?-1:0}withIndex(e){if(e===_t||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===_t||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(D),s=t.getIterator(D);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===_t?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class mp extends g{constructor(){super(new Q($s),g.EMPTY_NODE,be.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const mn=new mp;Object.defineProperties(E,{MIN:{value:new E(bt,g.EMPTY_NODE)},MAX:{value:new E(st,mn)}});rl.__EMPTY_NODE=g.EMPTY_NODE;H.__childrenNodeConstructor=g;cp(mn);hp(mn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=!0;function M(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new H(t,M(e))}if(!(n instanceof Array)&&gp){const t=[];let i=!1;if(q(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=M(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new E(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=Kn(t,lp,o=>o.name,$s);if(i){const o=Kn(t,D.getCompare());return new g(r,M(e),new be({".priority":o},{".priority":D}))}else return new g(r,M(e),be.Default)}else{let t=g.EMPTY_NODE;return q(n,(i,s)=>{if(pe(n,i)&&i.substring(0,1)!=="."){const r=M(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(M(e))}}up(M);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p extends pi{constructor(e){super(),this.indexPath_=e,p(!b(e)&&w(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?ct(e.name,t.name):r}makePost(e,t){const i=M(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new E(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,mn);return new E(st,e)}toString(){return Zt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp extends pi{compare(e,t){const i=e.node.compareTo(t.node);return i===0?ct(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,t){const i=M(e);return new E(t,i)}toString(){return".value"}}const yp=new vp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ul(n){return{type:"value",snapshotNode:n}}function Et(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function en(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function tn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function wp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(en(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Et(t,i)):o.trackChildChange(tn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(D,(s,r)=>{t.hasChild(s)||i.trackChildChange(en(s,r))}),t.isLeafNode()||t.forEachChild(D,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(tn(s,r,o))}else i.trackChildChange(Et(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.indexedFilter_=new Ws(e.getIndex()),this.index_=e.getIndex(),this.startPost_=nn.getStartPost_(e),this.endPost_=nn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new E(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(D,(o,a)=>{r.matches(new E(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new nn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new E(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,f)=>h(f,d)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new E(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(tn(t,i,h)),a.updateImmediateChild(t,i);{r?.trackChildChange(en(t,h));const v=a.updateImmediateChild(t,g.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(Et(d.name,d.node)),v.updateImmediateChild(d.name,d.node)):v}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(en(c.name,c.node)),r.trackChildChange(Et(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=D}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:bt}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:st}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===D}copy(){const e=new Hs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ep(n){return n.loadsAllData()?new Ws(n.getIndex()):n.hasLimit()?new bp(n):new nn(n)}function Ip(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function co(n){const e={};if(n.isDefault())return e;let t;if(n.index_===D?t="$priority":n.index_===yp?t="$value":n.index_===_t?t="$key":(p(n.index_ instanceof _p,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=F(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=F(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+F(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=F(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+F(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function uo(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==D&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends tl{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=pn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Yn.getListenId_(e,i),a={};this.listens_[o]=a;const l=co(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),vt(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,t){const i=Yn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=co(e._queryParams),i=e._path.toString(),s=new ce;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Rt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Kt(a.responseText)}catch{K("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&K("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(){return{value:null,children:new Map}}function Nt(n,e,t){if(b(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=w(e);n.children.has(i)||n.children.set(i,Qn());const s=n.children.get(i);e=k(e),Nt(s,e,t)}}function es(n,e){if(b(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(D,(i,s)=>{Nt(n,new S(i),s)}),es(n,e)}}else if(n.children.size>0){const t=w(e);return e=k(e),n.children.has(t)&&es(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function ts(n,e,t){n.value!==null?t(e,n.value):Tp(n,(i,s)=>{const r=new S(e.toString()+"/"+i);ts(s,r,t)})}function Tp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&q(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho=10*1e3,Rp=30*1e3,kp=5*60*1e3;class Ap{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Sp(e);const i=ho+(Rp-ho)*Math.random();Vt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;q(e,(s,r)=>{r>0&&pe(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Vt(this.reportStats_.bind(this),Math.floor(Math.random()*2*kp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(oe||(oe={}));function Vs(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function js(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function qs(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=oe.ACK_USER_WRITE,this.source=Vs()}operationForChild(e){if(b(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new Jn(C(),t,this.revert)}}else return p(w(this.path)===e,"operationForChild called for unrelated child."),new Jn(k(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t){this.source=e,this.path=t,this.type=oe.LISTEN_COMPLETE}operationForChild(e){return b(this.path)?new sn(this.source,C()):new sn(this.source,k(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=oe.OVERWRITE}operationForChild(e){return b(this.path)?new rt(this.source,C(),this.snap.getImmediateChild(e)):new rt(this.source,k(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=oe.MERGE}operationForChild(e){if(b(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new rt(this.source,C(),t.value):new It(this.source,C(),t)}else return p(w(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new It(this.source,k(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(b(e))return this.isFullyInitialized()&&!this.filtered_;const t=w(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Pp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(wp(o.childName,o.snapshotNode))}),Ut(n,s,"child_removed",e,i,t),Ut(n,s,"child_added",e,i,t),Ut(n,s,"child_moved",r,i,t),Ut(n,s,"child_changed",e,i,t),Ut(n,s,"value",e,i,t),s}function Ut(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Dp(n,a,l)),o.forEach(a=>{const l=Op(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Op(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Dp(n,e,t){if(e.childName==null||t.childName==null)throw St("Should only compare child_ events.");const i=new E(e.childName,e.snapshotNode),s=new E(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(n,e){return{eventCache:n,serverCache:e}}function jt(n,e,t,i){return mi(new je(e,t,i),n.serverCache)}function hl(n,e,t,i){return mi(n.eventCache,new je(e,t,i))}function Xn(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ot(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi;const Lp=()=>(Fi||(Fi=new Q(_f)),Fi);class A{constructor(e,t=Lp()){this.value=e,this.children=t}static fromObject(e){let t=new A(null);return q(e,(i,s)=>{t=t.set(new S(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:C(),value:this.value};if(b(e))return null;{const i=w(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(k(e),t);return r!=null?{path:O(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(b(e))return this;{const t=w(e),i=this.children.get(t);return i!==null?i.subtree(k(e)):new A(null)}}set(e,t){if(b(e))return new A(t,this.children);{const i=w(e),r=(this.children.get(i)||new A(null)).set(k(e),t),o=this.children.insert(i,r);return new A(this.value,o)}}remove(e){if(b(e))return this.children.isEmpty()?new A(null):new A(null,this.children);{const t=w(e),i=this.children.get(t);if(i){const s=i.remove(k(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new A(null):new A(this.value,r)}else return this}}get(e){if(b(e))return this.value;{const t=w(e),i=this.children.get(t);return i?i.get(k(e)):null}}setTree(e,t){if(b(e))return t;{const i=w(e),r=(this.children.get(i)||new A(null)).setTree(k(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new A(this.value,o)}}fold(e){return this.fold_(C(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(O(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,C(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(b(e))return null;{const r=w(e),o=this.children.get(r);return o?o.findOnPath_(k(e),O(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,C(),t)}foreachOnPath_(e,t,i){if(b(e))return this;{this.value&&i(t,this.value);const s=w(e),r=this.children.get(s);return r?r.foreachOnPath_(k(e),O(t,s),i):new A(null)}}foreach(e){this.foreach_(C(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(O(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.writeTree_=e}static empty(){return new le(new A(null))}}function qt(n,e,t){if(b(e))return new le(new A(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=G(s,e);return r=r.updateChild(o,t),new le(n.writeTree_.set(s,r))}else{const s=new A(t),r=n.writeTree_.setTree(e,s);return new le(r)}}}function ns(n,e,t){let i=n;return q(t,(s,r)=>{i=qt(i,O(e,s),r)}),i}function fo(n,e){if(b(e))return le.empty();{const t=n.writeTree_.setTree(e,new A(null));return new le(t)}}function is(n,e){return ut(n,e)!=null}function ut(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(G(t.path,e)):null}function po(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(D,(i,s)=>{e.push(new E(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new E(i,s.value))}),e}function $e(n,e){if(b(e))return n;{const t=ut(n,e);return t!=null?new le(new A(t)):new le(n.writeTree_.subtree(e))}}function ss(n){return n.writeTree_.isEmpty()}function Ct(n,e){return dl(C(),n.writeTree_,e)}function dl(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=dl(O(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(O(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(n,e){return gl(e,n)}function Mp(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=qt(n.visibleWrites,e,t)),n.lastWriteId=i}function xp(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=ns(n.visibleWrites,e,t),n.lastWriteId=i}function Up(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Fp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Bp(a,i.path)?s=!1:te(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return $p(n),!0;if(i.snap)n.visibleWrites=fo(n.visibleWrites,i.path);else{const a=i.children;q(a,l=>{n.visibleWrites=fo(n.visibleWrites,O(i.path,l))})}return!0}else return!1}function Bp(n,e){if(n.snap)return te(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&te(O(n.path,t),e))return!0;return!1}function $p(n){n.visibleWrites=fl(n.allWrites,Wp,C()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Wp(n){return n.visible}function fl(n,e,t){let i=le.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)te(t,o)?(a=G(t,o),i=qt(i,a,r.snap)):te(o,t)&&(a=G(o,t),i=qt(i,C(),r.snap.getChild(a)));else if(r.children){if(te(t,o))a=G(t,o),i=ns(i,a,r.children);else if(te(o,t))if(a=G(o,t),b(a))i=ns(i,C(),r.children);else{const l=vt(r.children,w(a));if(l){const c=l.getChild(k(a));i=qt(i,C(),c)}}}else throw St("WriteRecord should have .snap or .children")}}return i}function pl(n,e,t,i,s){if(!i&&!s){const r=ut(n.visibleWrites,e);if(r!=null)return r;{const o=$e(n.visibleWrites,e);if(ss(o))return t;if(t==null&&!is(o,C()))return null;{const a=t||g.EMPTY_NODE;return Ct(o,a)}}}else{const r=$e(n.visibleWrites,e);if(!s&&ss(r))return t;if(!s&&t==null&&!is(r,C()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(te(c.path,e)||te(e,c.path))},a=fl(n.allWrites,o,e),l=t||g.EMPTY_NODE;return Ct(a,l)}}}function Hp(n,e,t){let i=g.EMPTY_NODE;const s=ut(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(D,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=$e(n.visibleWrites,e);return t.forEachChild(D,(o,a)=>{const l=Ct($e(r,new S(o)),a);i=i.updateImmediateChild(o,l)}),po(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=$e(n.visibleWrites,e);return po(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Vp(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=O(e,t);if(is(n.visibleWrites,r))return null;{const o=$e(n.visibleWrites,r);return ss(o)?s.getChild(t):Ct(o,s.getChild(t))}}function jp(n,e,t,i){const s=O(e,t),r=ut(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=$e(n.visibleWrites,s);return Ct(o,i.getNode().getImmediateChild(t))}else return null}function qp(n,e){return ut(n.visibleWrites,e)}function zp(n,e,t,i,s,r,o){let a;const l=$e(n.visibleWrites,e),c=ut(l,C());if(c!=null)a=c;else if(t!=null)a=Ct(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=d.getNext();for(;f&&u.length<s;)h(f,i)!==0&&u.push(f),f=d.getNext();return u}else return[]}function Gp(){return{visibleWrites:le.empty(),allWrites:[],lastWriteId:-1}}function Zn(n,e,t,i){return pl(n.writeTree,n.treePath,e,t,i)}function zs(n,e){return Hp(n.writeTree,n.treePath,e)}function mo(n,e,t,i){return Vp(n.writeTree,n.treePath,e,t,i)}function ei(n,e){return qp(n.writeTree,O(n.treePath,e))}function Kp(n,e,t,i,s,r){return zp(n.writeTree,n.treePath,e,t,i,s,r)}function Gs(n,e,t){return jp(n.writeTree,n.treePath,e,t)}function ml(n,e){return gl(O(n.treePath,e),n.writeTree)}function gl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,tn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,en(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Et(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,tn(i,e.snapshotNode,s.oldSnap));else throw St("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const _l=new Qp;class Ks{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new je(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Gs(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ot(this.viewCache_),r=Kp(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jp(n){return{filter:n}}function Xp(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Zp(n,e,t,i,s){const r=new Yp;let o,a;if(t.type===oe.OVERWRITE){const c=t;c.source.fromUser?o=rs(n,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!b(c.path),o=ti(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===oe.MERGE){const c=t;c.source.fromUser?o=tm(n,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=os(n,e,c.path,c.children,i,s,a,r))}else if(t.type===oe.ACK_USER_WRITE){const c=t;c.revert?o=sm(n,e,c.path,i,s,r):o=nm(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===oe.LISTEN_COMPLETE)o=im(n,e,t.path,i,r);else throw St("Unknown operation type: "+t.type);const l=r.getChanges();return em(e,o,l),{viewCache:o,changes:l}}function em(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Xn(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(ul(Xn(e)))}}function vl(n,e,t,i,s,r){const o=e.eventCache;if(ei(i,t)!=null)return e;{let a,l;if(b(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ot(e),u=c instanceof g?c:g.EMPTY_NODE,h=zs(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Zn(i,ot(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=w(t);if(c===".priority"){p(Ve(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=mo(i,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=k(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=mo(i,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=Gs(i,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,s,r):a=o.getNode()}}return jt(e,a,o.isFullyInitialized()||b(t),n.filter.filtersNodes())}}function ti(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(b(t))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=u.updateFullNode(l.getNode(),f,null)}else{const f=w(t);if(!l.isCompleteForPath(t)&&Ve(t)>1)return e;const m=k(t),I=l.getNode().getImmediateChild(f).updateChild(m,i);f===".priority"?c=u.updatePriority(l.getNode(),I):c=u.updateChild(l.getNode(),f,I,m,_l,null)}const h=hl(e,c,l.isFullyInitialized()||b(t),u.filtersNodes()),d=new Ks(s,h,r);return vl(n,h,t,s,d,a)}function rs(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const u=new Ks(s,e,r);if(b(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=jt(e,c,!0,n.filter.filtersNodes());else{const h=w(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=jt(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=k(t),f=a.getNode().getImmediateChild(h);let m;if(b(d))m=i;else{const v=u.getCompleteChild(h);v!=null?Us(d)===".priority"&&v.getChild(il(d)).isEmpty()?m=v:m=v.updateChild(d,i):m=g.EMPTY_NODE}if(f.equals(m))l=e;else{const v=n.filter.updateChild(a.getNode(),h,m,d,u,o);l=jt(e,v,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function go(n,e){return n.eventCache.isCompleteForChild(e)}function tm(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=O(t,l);go(e,w(u))&&(a=rs(n,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=O(t,l);go(e,w(u))||(a=rs(n,a,u,c,s,r,o))}),a}function _o(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function os(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;b(t)?c=i:c=new A(null).setTree(t,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),m=_o(n,f,d);l=ti(n,l,new S(h),m,s,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const f=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!f){const m=e.serverCache.getNode().getImmediateChild(h),v=_o(n,m,d);l=ti(n,l,new S(h),v,s,r,o,a)}}),l}function nm(n,e,t,i,s,r,o){if(ei(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(b(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return ti(n,e,t,l.getNode().getChild(t),s,r,a,o);if(b(t)){let c=new A(null);return l.getNode().forEachChild(_t,(u,h)=>{c=c.set(new S(u),h)}),os(n,e,t,c,s,r,a,o)}else return e}else{let c=new A(null);return i.foreach((u,h)=>{const d=O(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),os(n,e,t,c,s,r,a,o)}}function im(n,e,t,i,s){const r=e.serverCache,o=hl(e,r.getNode(),r.isFullyInitialized()||b(t),r.isFiltered());return vl(n,o,t,i,_l,s)}function sm(n,e,t,i,s,r){let o;if(ei(i,t)!=null)return e;{const a=new Ks(i,e,s),l=e.eventCache.getNode();let c;if(b(t)||w(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Zn(i,ot(e));else{const h=e.serverCache.getNode();p(h instanceof g,"serverChildren would be complete if leaf node"),u=zs(i,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=w(t);let h=Gs(i,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,k(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,g.EMPTY_NODE,k(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zn(i,ot(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||ei(i,C())!=null,jt(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ws(i.getIndex()),r=Ep(i);this.processor_=Jp(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),u=new je(l,o.isFullyInitialized(),s.filtersNodes()),h=new je(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=mi(h,u),this.eventGenerator_=new Np(this.query_)}get query(){return this.query_}}function om(n){return n.viewCache_.serverCache.getNode()}function am(n){return Xn(n.viewCache_)}function lm(n,e){const t=ot(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!b(e)&&!t.getImmediateChild(w(e)).isEmpty())?t.getChild(e):null}function vo(n){return n.eventRegistrations_.length===0}function cm(n,e){n.eventRegistrations_.push(e)}function yo(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function wo(n,e,t,i){e.type===oe.MERGE&&e.source.queryId!==null&&(p(ot(n.viewCache_),"We should always have a full cache before handling merges"),p(Xn(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Zp(n.processor_,s,e,t,i);return Xp(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,yl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function um(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(D,(r,o)=>{i.push(Et(r,o))}),t.isFullyInitialized()&&i.push(ul(t.getNode())),yl(n,i,t.getNode(),e)}function yl(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Pp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni;class wl{constructor(){this.views=new Map}}function hm(n){p(!ni,"__referenceConstructor has already been defined"),ni=n}function dm(){return p(ni,"Reference.ts has not been loaded"),ni}function fm(n){return n.views.size===0}function Ys(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),wo(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(wo(o,e,t,i));return r}}function bl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Zn(t,s?i:null),l=!1;a?l=!0:i instanceof g?(a=zs(t,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=mi(new je(a,l,!1),new je(i,s,!1));return new rm(e,c)}return o}function pm(n,e,t,i,s,r){const o=bl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),cm(o,t),um(o,t)}function mm(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=qe(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(yo(c,t,i)),vo(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(yo(l,t,i)),vo(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!qe(n)&&r.push(new(dm())(e._repo,e._path)),{removed:r,events:o}}function El(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function We(n,e){let t=null;for(const i of n.views.values())t=t||lm(i,e);return t}function Il(n,e){if(e._queryParams.loadsAllData())return _i(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Cl(n,e){return Il(n,e)!=null}function qe(n){return _i(n)!=null}function _i(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ii;function gm(n){p(!ii,"__referenceConstructor has already been defined"),ii=n}function _m(){return p(ii,"Reference.ts has not been loaded"),ii}let vm=1;class bo{constructor(e){this.listenProvider_=e,this.syncPointTree_=new A(null),this.pendingWriteTree_=Gp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Tl(n,e,t,i,s){return Mp(n.pendingWriteTree_,e,t,i,s),s?Pt(n,new rt(Vs(),e,t)):[]}function ym(n,e,t,i){xp(n.pendingWriteTree_,e,t,i);const s=A.fromObject(t);return Pt(n,new It(Vs(),e,s))}function Ue(n,e,t=!1){const i=Up(n.pendingWriteTree_,e);if(Fp(n.pendingWriteTree_,e)){let r=new A(null);return i.snap!=null?r=r.set(C(),!0):q(i.children,o=>{r=r.set(new S(o),!0)}),Pt(n,new Jn(i.path,r,t))}else return[]}function gn(n,e,t){return Pt(n,new rt(js(),e,t))}function wm(n,e,t){const i=A.fromObject(t);return Pt(n,new It(js(),e,i))}function bm(n,e){return Pt(n,new sn(js(),e))}function Em(n,e,t){const i=Js(n,t);if(i){const s=Xs(i),r=s.path,o=s.queryId,a=G(r,e),l=new sn(qs(o),a);return Zs(n,r,l)}else return[]}function si(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Cl(o,e))){const l=mm(o,e,t,i);fm(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,f)=>qe(f));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=Tm(d);for(let m=0;m<f.length;++m){const v=f[m],I=v.query,T=Al(n,v);n.listenProvider_.startListening(zt(I),rn(n,I),T.hashFn,T.onComplete)}}}!h&&c.length>0&&!i&&(u?n.listenProvider_.stopListening(zt(e),null):c.forEach(d=>{const f=n.queryToTagMap.get(vi(d));n.listenProvider_.stopListening(zt(d),f)}))}Sm(n,c)}return a}function Sl(n,e,t,i){const s=Js(n,i);if(s!=null){const r=Xs(s),o=r.path,a=r.queryId,l=G(o,e),c=new rt(qs(a),l,t);return Zs(n,o,c)}else return[]}function Im(n,e,t,i){const s=Js(n,i);if(s){const r=Xs(s),o=r.path,a=r.queryId,l=G(o,e),c=A.fromObject(t),u=new It(qs(a),l,c);return Zs(n,o,u)}else return[]}function as(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(d,f)=>{const m=G(d,s);r=r||We(f,m),o=o||qe(f)});let a=n.syncPointTree_.get(s);a?(o=o||qe(a),r=r||We(a,C())):(a=new wl,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,m)=>{const v=We(m,C());v&&(r=r.updateImmediateChild(f,v))}));const c=Cl(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=vi(e);p(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=Rm();n.queryToTagMap.set(d,f),n.tagToQueryMap.set(f,d)}const u=gi(n.pendingWriteTree_,s);let h=pm(a,e,t,u,r,l);if(!c&&!o&&!i){const d=Il(a,e);h=h.concat(km(n,e,d))}return h}function Qs(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=G(o,e),c=We(a,l);if(c)return c});return pl(s,e,r,t,!0)}function Cm(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=G(c,t);i=i||We(u,h)});let s=n.syncPointTree_.get(t);s?i=i||We(s,C()):(s=new wl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new je(i,!0,!1):null,a=gi(n.pendingWriteTree_,e._path),l=bl(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return am(l)}function Pt(n,e){return Rl(e,n.syncPointTree_,null,gi(n.pendingWriteTree_,C()))}function Rl(n,e,t,i){if(b(n.path))return kl(n,e,t,i);{const s=e.get(C());t==null&&s!=null&&(t=We(s,C()));let r=[];const o=w(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=ml(i,o);r=r.concat(Rl(a,l,c,u))}return s&&(r=r.concat(Ys(s,n,i,t))),r}}function kl(n,e,t,i){const s=e.get(C());t==null&&s!=null&&(t=We(s,C()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=ml(i,o),u=n.operationForChild(o);u&&(r=r.concat(kl(u,a,l,c)))}),s&&(r=r.concat(Ys(s,n,i,t))),r}function Al(n,e){const t=e.query,i=rn(n,t);return{hashFn:()=>(om(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Em(n,t._path,i):bm(n,t._path);{const r=wf(s,t);return si(n,t,null,r)}}}}function rn(n,e){const t=vi(e);return n.queryToTagMap.get(t)}function vi(n){return n._path.toString()+"$"+n._queryIdentifier}function Js(n,e){return n.tagToQueryMap.get(e)}function Xs(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function Zs(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=gi(n.pendingWriteTree_,e);return Ys(i,t,s,null)}function Tm(n){return n.fold((e,t,i)=>{if(t&&qe(t))return[_i(t)];{let s=[];return t&&(s=El(t)),q(i,(r,o)=>{s=s.concat(o)}),s}})}function zt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(_m())(n._repo,n._path):n}function Sm(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=vi(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Rm(){return vm++}function km(n,e,t){const i=e._path,s=rn(n,e),r=Al(n,t),o=n.listenProvider_.startListening(zt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!qe(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!b(c)&&u&&qe(u))return[_i(u).query];{let d=[];return u&&(d=d.concat(El(u).map(f=>f.query))),q(h,(f,m)=>{d=d.concat(m)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(zt(u),rn(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new er(t)}node(){return this.node_}}class tr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=O(this.path_,e);return new tr(this.syncTree_,t)}node(){return Qs(this.syncTree_,this.path_)}}const Am=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Eo=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Nm(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Pm(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Nm=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},Pm=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Nl=function(n,e,t,i){return nr(e,new tr(t,n),i)},Pl=function(n,e,t){return nr(n,new er(e),t)};function nr(n,e,t){const i=n.getPriority().val(),s=Eo(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Eo(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new H(a,M(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new H(s))),o.forEachChild(D,(a,l)=>{const c=nr(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function sr(n,e){let t=e instanceof S?e:new S(e),i=n,s=w(t);for(;s!==null;){const r=vt(i.node.children,s)||{children:{},childCount:0};i=new ir(s,i,r),t=k(t),s=w(t)}return i}function Ot(n){return n.node.value}function Ol(n,e){n.node.value=e,ls(n)}function Dl(n){return n.node.childCount>0}function Om(n){return Ot(n)===void 0&&!Dl(n)}function yi(n,e){q(n.node.children,(t,i)=>{e(new ir(t,n,i))})}function Ll(n,e,t,i){t&&e(n),yi(n,s=>{Ll(s,e,!0)})}function Dm(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function _n(n){return new S(n.parent===null?n.name:_n(n.parent)+"/"+n.name)}function ls(n){n.parent!==null&&Lm(n.parent,n.name,n)}function Lm(n,e,t){const i=Om(t),s=pe(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,ls(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,ls(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mm=/[\[\].#$\/\u0000-\u001F\u007F]/,xm=/[\[\].#$\u0000-\u001F\u007F]/,Bi=10*1024*1024,rr=function(n){return typeof n=="string"&&n.length!==0&&!Mm.test(n)},Ml=function(n){return typeof n=="string"&&n.length!==0&&!xm.test(n)},Um=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Ml(n)},xl=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!fi(n)||n&&typeof n=="object"&&pe(n,".sv")},ri=function(n,e,t,i){i&&e===void 0||wi(yt(n,"value"),e,t)},wi=function(n,e,t){const i=t instanceof S?new ep(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Je(i));if(typeof e=="function")throw new Error(n+"contains a function "+Je(i)+" with contents = "+e.toString());if(fi(e))throw new Error(n+"contains "+e.toString()+" "+Je(i));if(typeof e=="string"&&e.length>Bi/3&&ai(e)>Bi)throw new Error(n+"contains a string greater than "+Bi+" utf8 bytes "+Je(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(q(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!rr(o)))throw new Error(n+" contains an invalid key ("+o+") "+Je(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);tp(i,o),wi(n,a,i),np(i)}),s&&r)throw new Error(n+' contains ".value" child '+Je(i)+" in addition to actual children.")}},Fm=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Zt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!rr(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Zf);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&te(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Ul=function(n,e,t,i){const s=yt(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];q(e,(o,a)=>{const l=new S(o);if(wi(s,a,O(t,l)),Us(l)===".priority"&&!xl(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Fm(s,r)},Bm=function(n,e,t){if(fi(e))throw new Error(yt(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!xl(e))throw new Error(yt(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Fl=function(n,e,t,i){if(!Ml(t))throw new Error(yt(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},$m=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Fl(n,e,t)},et=function(n,e){if(w(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Wm=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!rr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Um(t))throw new Error(yt(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function bi(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Fs(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Bl(n,e,t){bi(n,t),$l(n,i=>Fs(i,e))}function ie(n,e,t){bi(n,t),$l(n,i=>te(i,e)||te(e,i))}function $l(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Vm(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Vm(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Ht&&j("event: "+t.toString()),At(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm="repo_interrupt",qm=25;class zm{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Hm,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Qn(),this.transactionQueueTree_=new ir,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Gm(n,e,t){if(n.stats_=Ms(n.repoInfo_),n.forceRestClient_||Cf())n.server_=new Yn(n.repoInfo_,(i,s,r,o)=>{Io(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Co(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{F(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ie(n.repoInfo_,e,(i,s,r,o)=>{Io(n,i,s,r,o)},i=>{Co(n,i)},i=>{Km(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Af(n.repoInfo_,()=>new Ap(n.stats_,n.server_)),n.infoData_=new Cp,n.infoSyncTree_=new bo({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=gn(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),or(n,"connected",!1),n.serverSyncTree_=new bo({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ie(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Wl(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Ei(n){return Am({timestamp:Wl(n)})}function Io(n,e,t,i,s){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Fn(t,c=>M(c));o=Im(n.serverSyncTree_,r,l,s)}else{const l=M(t);o=Sl(n.serverSyncTree_,r,l,s)}else if(i){const l=Fn(t,c=>M(c));o=wm(n.serverSyncTree_,r,l)}else{const l=M(t);o=gn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Tt(n,r)),ie(n.eventQueue_,a,o)}function Co(n,e){or(n,"connected",e),e===!1&&Xm(n)}function Km(n,e){q(e,(t,i)=>{or(n,t,i)})}function or(n,e,t){const i=new S("/.info/"+e),s=M(t);n.infoData_.updateSnapshot(i,s);const r=gn(n.infoSyncTree_,i,s);ie(n.eventQueue_,i,r)}function ar(n){return n.nextWriteId_++}function Ym(n,e,t){const i=Cm(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=M(s).withIndex(e._queryParams.getIndex());as(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=gn(n.serverSyncTree_,e._path,r);else{const a=rn(n.serverSyncTree_,e);o=Sl(n.serverSyncTree_,e._path,r,a)}return ie(n.eventQueue_,e._path,o),si(n.serverSyncTree_,e,t,null,!0),r},s=>(vn(n,"get for query "+F(e)+" failed: "+s),Promise.reject(new Error(s))))}function Qm(n,e,t,i,s){vn(n,"set",{path:e.toString(),value:t,priority:i});const r=Ei(n),o=M(t,i),a=Qs(n.serverSyncTree_,e),l=Pl(o,a,r),c=ar(n),u=Tl(n.serverSyncTree_,e,l,c,!0);bi(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,f)=>{const m=d==="ok";m||K("set at "+e+" failed: "+d);const v=Ue(n.serverSyncTree_,c,!m);ie(n.eventQueue_,e,v),ze(n,s,d,f)});const h=cr(n,e);Tt(n,h),ie(n.eventQueue_,h,[])}function Jm(n,e,t,i){vn(n,"update",{path:e.toString(),value:t});let s=!0;const r=Ei(n),o={};if(q(t,(a,l)=>{s=!1,o[a]=Nl(O(e,a),M(l),n.serverSyncTree_,r)}),s)j("update() called with empty data.  Don't do anything."),ze(n,i,"ok",void 0);else{const a=ar(n),l=ym(n.serverSyncTree_,e,o,a);bi(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const h=c==="ok";h||K("update at "+e+" failed: "+c);const d=Ue(n.serverSyncTree_,a,!h),f=d.length>0?Tt(n,e):e;ie(n.eventQueue_,f,d),ze(n,i,c,u)}),q(t,c=>{const u=cr(n,O(e,c));Tt(n,u)}),ie(n.eventQueue_,e,[])}}function Xm(n){vn(n,"onDisconnectEvents");const e=Ei(n),t=Qn();ts(n.onDisconnect_,C(),(s,r)=>{const o=Nl(s,r,n.serverSyncTree_,e);Nt(t,s,o)});let i=[];ts(t,C(),(s,r)=>{i=i.concat(gn(n.serverSyncTree_,s,r));const o=cr(n,s);Tt(n,o)}),n.onDisconnect_=Qn(),ie(n.eventQueue_,C(),i)}function Zm(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&es(n.onDisconnect_,e),ze(n,t,i,s)})}function To(n,e,t,i){const s=M(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&Nt(n.onDisconnect_,e,s),ze(n,i,r,o)})}function eg(n,e,t,i,s){const r=M(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&Nt(n.onDisconnect_,e,r),ze(n,s,o,a)})}function tg(n,e,t,i){if(Un(t)){j("onDisconnect().update() called with empty data.  Don't do anything."),ze(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&q(t,(o,a)=>{const l=M(a);Nt(n.onDisconnect_,O(e,o),l)}),ze(n,i,s,r)})}function ng(n,e,t){let i;w(e._path)===".info"?i=as(n.infoSyncTree_,e,t):i=as(n.serverSyncTree_,e,t),Bl(n.eventQueue_,e._path,i)}function cs(n,e,t){let i;w(e._path)===".info"?i=si(n.infoSyncTree_,e,t):i=si(n.serverSyncTree_,e,t),Bl(n.eventQueue_,e._path,i)}function ig(n){n.persistentConnection_&&n.persistentConnection_.interrupt(jm)}function vn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),j(t,...e)}function ze(n,e,t,i){e&&At(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Hl(n,e,t){return Qs(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function lr(n,e=n.transactionQueueTree_){if(e||Ii(n,e),Ot(e)){const t=jl(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&sg(n,_n(e),t)}else Dl(e)&&yi(e,t=>{lr(n,t)})}function sg(n,e,t){const i=t.map(c=>c.currentWriteId),s=Hl(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const u=t[c];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=G(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{vn(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(Ue(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Ii(n,sr(n.transactionQueueTree_,e)),lr(n,n.transactionQueueTree_),ie(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)At(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{K("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}Tt(n,e)}},o)}function Tt(n,e){const t=Vl(n,e),i=_n(t),s=jl(n,t);return rg(n,s,i),i}function rg(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=G(t,l.path);let u=!1,h;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,s=s.concat(Ue(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=qm)u=!0,h="maxretry",s=s.concat(Ue(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Hl(n,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){wi("transaction failed: Data returned ",f,l.path);let m=M(f);typeof f=="object"&&f!=null&&pe(f,".priority")||(m=m.updatePriority(d.getPriority()));const I=l.currentWriteId,T=Ei(n),B=Pl(m,d,T);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=B,l.currentWriteId=ar(n),o.splice(o.indexOf(I),1),s=s.concat(Tl(n.serverSyncTree_,l.path,B,l.currentWriteId,l.applyLocally)),s=s.concat(Ue(n.serverSyncTree_,I,!0))}else u=!0,h="nodata",s=s.concat(Ue(n.serverSyncTree_,l.currentWriteId,!0))}ie(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Ii(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)At(i[a]);lr(n,n.transactionQueueTree_)}function Vl(n,e){let t,i=n.transactionQueueTree_;for(t=w(e);t!==null&&Ot(i)===void 0;)i=sr(i,t),e=k(e),t=w(e);return i}function jl(n,e){const t=[];return ql(n,e,t),t.sort((i,s)=>i.order-s.order),t}function ql(n,e,t){const i=Ot(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);yi(e,s=>{ql(n,s,t)})}function Ii(n,e){const t=Ot(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ol(e,t.length>0?t:void 0)}yi(e,i=>{Ii(n,i)})}function cr(n,e){const t=_n(Vl(n,e)),i=sr(n.transactionQueueTree_,e);return Dm(i,s=>{$i(n,s)}),$i(n,i),Ll(i,s=>{$i(n,s)}),t}function $i(n,e){const t=Ot(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ue(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ol(e,void 0):t.length=r+1,ie(n.eventQueue_,_n(e),s);for(let o=0;o<i.length;o++)At(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function ag(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):K(`Invalid query segment '${t}' in query '${n}'`)}return e}const So=function(n,e){const t=lg(n),i=t.namespace;t.domain==="firebase.com"&&Re(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Re("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||mf();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ka(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new S(t.pathString)}},lg=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(s=og(n.substring(u,h)));const d=ag(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const m=e.indexOf(".");i=e.substring(0,m).toLowerCase(),t=e.substring(m+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",cg=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Ro.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Ro.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+F(this.snapshot.exportVal())}}class hg{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new ce;return Zm(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){et("OnDisconnect.remove",this._path);const e=new ce;return To(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){et("OnDisconnect.set",this._path),ri("OnDisconnect.set",e,this._path,!1);const t=new ce;return To(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){et("OnDisconnect.setWithPriority",this._path),ri("OnDisconnect.setWithPriority",e,this._path,!1),Bm("OnDisconnect.setWithPriority",t);const i=new ce;return eg(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){et("OnDisconnect.update",this._path),Ul("OnDisconnect.update",e,this._path);const t=new ce;return tg(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return b(this._path)?null:Us(this._path)}get ref(){return new Ne(this._repo,this._path)}get _queryIdentifier(){const e=uo(this._queryParams),t=Ds(e);return t==="{}"?"default":t}get _queryObject(){return uo(this._queryParams)}isEqual(e){if(e=L(e),!(e instanceof Ci))return!1;const t=this._repo===e._repo,i=Fs(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Xf(this._path)}}class Ne extends Ci{constructor(e,t){super(e,t,new Hs,!1)}get parent(){const e=il(this._path);return e===null?null:new Ne(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class on{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),i=an(this.ref,e);return new on(this._node.getChild(t),i,D)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new on(s,an(this.ref,i),D)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function $(n,e){return n=L(n),n._checkNotDeleted("ref"),e!==void 0?an(n._root,e):n._root}function an(n,e){return n=L(n),w(n._path)===null?$m("child","path",e):Fl("child","path",e),new Ne(n._repo,O(n._path,e))}function fg(n){return n=L(n),new dg(n._repo,n._path)}function ko(n,e){n=L(n),et("push",n._path),ri("push",e,n._path,!0);const t=Wl(n._repo),i=cg(t),s=an(n,i),r=an(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function In(n){return et("remove",n._path),Ee(n,null)}function Ee(n,e){n=L(n),et("set",n._path),ri("set",e,n._path,!1);const t=new ce;return Qm(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function us(n,e){Ul("update",e,n._path);const t=new ce;return Jm(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function hs(n){n=L(n);const e=new zl(()=>{}),t=new Ti(e);return Ym(n._repo,n,t).then(i=>new on(i,new Ne(n._repo,n._path),n._queryParams.getIndex()))}class Ti{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new ug("value",this,new on(e.snapshotNode,new Ne(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new hg(this,e,t):null}matches(e){return e instanceof Ti?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function pg(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(u,h)=>{cs(n._repo,n,a),l(u,h)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new zl(t,r||void 0),a=new Ti(o);return ng(n._repo,n,a),()=>cs(n._repo,n,a)}function Ln(n,e,t,i){return pg(n,"value",e,t,i)}function Cn(n,e,t){cs(n._repo,n,null)}class mg{}class gg extends mg{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ci(e._repo,e._path,Ip(e._queryParams,this._limit),e._orderByCalled)}}function _g(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new gg(n)}function vg(n,...e){let t=L(n);for(const i of e)t=i._apply(t);return t}hm(Ne);gm(Ne);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg="FIREBASE_DATABASE_EMULATOR_HOST",ds={};let wg=!1;function bg(n,e,t,i){n.repoInfo_=new Ka(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Eg(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Re("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),j("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=So(r,s),a=o.repoInfo,l;typeof process<"u"&&zr&&(l=zr[yg]),l?(r=`http://${l}?ns=${a.namespace}`,o=So(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Sf(n.name,n.options,e);Wm("Invalid Firebase Database URL",o),b(o.path)||Re("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Cg(a,n,c,new Tf(n.name,t));return new Tg(u,n)}function Ig(n,e){const t=ds[e];(!t||t[n.key]!==n)&&Re(`Database ${e}(${n.repoInfo_}) has already been deleted.`),ig(n),delete t[n.key]}function Cg(n,e,t,i){let s=ds[e.name];s||(s={},ds[e.name]=s);let r=s[n.toURLString()];return r&&Re("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new zm(n,wg,t,i),s[n.toURLString()]=r,r}class Tg{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Gm(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ne(this._repo,C())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ig(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Re("Cannot call "+e+" on a deleted database.")}}function Sg(n=ci(),e){const t=li(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Vo("database");i&&Rg(t,...i)}return t}function Rg(n,e,t,i={}){n=L(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Re("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Re('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Dn(Dn.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:zo(i.mockUserToken,n.app.options.projectId);r=new Dn(o)}bg(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(n){cf(lt),nt(new He("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Eg(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),he(Gr,Kr,n),he(Gr,Kr,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag={".sv":"timestamp"};function Z(){return Ag}Ie.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ie.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};kg();var Ng="firebase",Pg="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */he(Ng,Pg,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="firebasestorage.googleapis.com",Kl="storageBucket",Og=2*60*1e3,Dg=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U extends ke{constructor(e,t,i=0){super(Wi(e),`Firebase Storage: ${t} (${Wi(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,U.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Wi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var x;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(x||(x={}));function Wi(n){return"storage/"+n}function ur(){const n="An unknown error occurred, please check the error payload for server response.";return new U(x.UNKNOWN,n)}function Lg(n){return new U(x.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Mg(n){return new U(x.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function xg(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new U(x.UNAUTHENTICATED,n)}function Ug(){return new U(x.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Fg(n){return new U(x.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Bg(){return new U(x.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function $g(){return new U(x.CANCELED,"User canceled the upload/download.")}function Wg(n){return new U(x.INVALID_URL,"Invalid URL '"+n+"'.")}function Hg(n){return new U(x.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Vg(){return new U(x.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Kl+"' property when initializing the app?")}function jg(){return new U(x.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function qg(){return new U(x.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function zg(n){return new U(x.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function fs(n){return new U(x.INVALID_ARGUMENT,n)}function Yl(){return new U(x.APP_DELETED,"The Firebase app was deleted.")}function Gg(n){return new U(x.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Gt(n,e){return new U(x.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Ft(n){throw new U(x.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=X.makeFromUrl(e,t)}catch{return new X(e,"")}if(i.path==="")return i;throw Hg(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(N){N.path.charAt(N.path.length-1)==="/"&&(N.path_=N.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(N){N.path_=decodeURIComponent(N.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",f=new RegExp(`^https?://${h}/${u}/b/${s}/o${d}`,"i"),m={bucket:1,path:3},v=t===Gl?"(?:storage.googleapis.com|storage.cloud.google.com)":t,I="([^?#]*)",T=new RegExp(`^https?://${v}/${s}/${I}`,"i"),P=[{regex:a,indices:l,postModify:r},{regex:f,indices:m,postModify:c},{regex:T,indices:{bucket:1,path:2},postModify:c}];for(let N=0;N<P.length;N++){const Ge=P[N],Ke=Ge.regex.exec(e);if(Ke){const yn=Ke[Ge.indices.bucket];let Dt=Ke[Ge.indices.path];Dt||(Dt=""),i=new X(yn,Dt),Ge.postModify(i);break}}if(i==null)throw Wg(e);return i}}class Kg{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yg(n,e,t){let i=1,s=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...I){c||(c=!0,e.apply(null,I))}function h(I){s=setTimeout(()=>{s=null,n(f,l())},I)}function d(){r&&clearTimeout(r)}function f(I,...T){if(c){d();return}if(I){d(),u.call(null,I,...T);return}if(l()||o){d(),u.call(null,I,...T);return}i<64&&(i*=2);let P;a===1?(a=2,P=0):P=(i+Math.random())*1e3,h(P)}let m=!1;function v(I){m||(m=!0,d(),!c&&(s!==null?(I||(a=2),clearTimeout(s),h(0)):I||(a=1)))}return h(0),r=setTimeout(()=>{o=!0,v(!0)},t),v}function Qg(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(n){return n!==void 0}function Xg(n){return typeof n=="object"&&!Array.isArray(n)}function hr(n){return typeof n=="string"||n instanceof String}function Ao(n){return dr()&&n instanceof Blob}function dr(){return typeof Blob<"u"}function No(n,e,t,i){if(i<e)throw fs(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw fs(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(n,e,t){let i=e;return t==null&&(i=`https://${e}`),`${t}://${i}/v0${n}`}function Ql(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var tt;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(tt||(tt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||s||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t,i,s,r,o,a,l,c,u,h,d=!0){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((f,m)=>{this.resolve_=f,this.reject_=m,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new Tn(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===tt.NO_ERROR,l=r.getStatus();if(!a||Zg(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===tt.ABORT;i(!1,new Tn(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;i(!0,new Tn(c,r))})},t=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());Jg(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=ur();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?Yl():$g();o(l)}else{const l=Bg();o(l)}};this.canceled_?t(!1,new Tn(!1,null,!0)):this.backoffId_=Yg(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Qg(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Tn{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function t_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function n_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function i_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function s_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function r_(n,e,t,i,s,r,o=!0){const a=Ql(n.urlParams),l=n.url+a,c=Object.assign({},n.headers);return i_(c,e),t_(c,t),n_(c,r),s_(c,i),new e_(l,n.method,c,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function a_(...n){const e=o_();if(e!==void 0){const t=new e;for(let i=0;i<n.length;i++)t.append(n[i]);return t.getBlob()}else{if(dr())return new Blob(n);throw new U(x.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function l_(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(n){if(typeof atob>"u")throw zg("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Hi{constructor(e,t){this.data=e,this.contentType=t||null}}function u_(n,e){switch(n){case ue.RAW:return new Hi(Jl(e));case ue.BASE64:case ue.BASE64URL:return new Hi(Xl(n,e));case ue.DATA_URL:return new Hi(d_(e),f_(e))}throw ur()}function Jl(n){const e=[];for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const r=i,o=n.charCodeAt(++t);i=65536|(r&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function h_(n){let e;try{e=decodeURIComponent(n)}catch{throw Gt(ue.DATA_URL,"Malformed data URL.")}return Jl(e)}function Xl(n,e){switch(n){case ue.BASE64:{const s=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(s||r)throw Gt(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case ue.BASE64URL:{const s=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(s||r)throw Gt(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=c_(e)}catch(s){throw s.message.includes("polyfill")?s:Gt(n,"Invalid character found")}const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}class Zl{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Gt(ue.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=t[1]||null;i!=null&&(this.base64=p_(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function d_(n){const e=new Zl(n);return e.base64?Xl(ue.BASE64,e.rest):h_(e.rest)}function f_(n){return new Zl(n).contentType}function p_(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){let i=0,s="";Ao(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Ao(this.data_)){const i=this.data_,s=l_(i,e,t);return s===null?null:new xe(s)}else{const i=new Uint8Array(this.data_.buffer,e,t-e);return new xe(i,!0)}}static getBlob(...e){if(dr()){const t=e.map(i=>i instanceof xe?i.data_:i);return new xe(a_.apply(null,t))}else{const t=e.map(o=>hr(o)?u_(ue.RAW,o).data:o.data_);let i=0;t.forEach(o=>{i+=o.byteLength});const s=new Uint8Array(i);let r=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)s[r++]=o[a]}),new xe(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n){let e;try{e=JSON.parse(n)}catch{return null}return Xg(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function g_(n,e){const t=e.split("/").filter(i=>i.length>0).join("/");return n.length===0?t:n+"/"+t}function tc(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function __(n,e){return e}class z{constructor(e,t,i,s){this.server=e,this.local=t||e,this.writable=!!i,this.xform=s||__}}let Sn=null;function v_(n){return!hr(n)||n.length<2?n:tc(n)}function nc(){if(Sn)return Sn;const n=[];n.push(new z("bucket")),n.push(new z("generation")),n.push(new z("metageneration")),n.push(new z("name","fullPath",!0));function e(r,o){return v_(o)}const t=new z("name");t.xform=e,n.push(t);function i(r,o){return o!==void 0?Number(o):o}const s=new z("size");return s.xform=i,n.push(s),n.push(new z("timeCreated")),n.push(new z("updated")),n.push(new z("md5Hash",null,!0)),n.push(new z("cacheControl",null,!0)),n.push(new z("contentDisposition",null,!0)),n.push(new z("contentEncoding",null,!0)),n.push(new z("contentLanguage",null,!0)),n.push(new z("contentType",null,!0)),n.push(new z("metadata","customMetadata",!0)),Sn=n,Sn}function y_(n,e){function t(){const i=n.bucket,s=n.fullPath,r=new X(i,s);return e._makeStorageReference(r)}Object.defineProperty(n,"ref",{get:t})}function w_(n,e,t){const i={};i.type="file";const s=t.length;for(let r=0;r<s;r++){const o=t[r];i[o.local]=o.xform(i,e[o.server])}return y_(i,n),i}function ic(n,e,t){const i=ec(e);return i===null?null:w_(n,i,t)}function b_(n,e,t,i){const s=ec(e);if(s===null||!hr(s.downloadTokens))return null;const r=s.downloadTokens;if(r.length===0)return null;const o=encodeURIComponent;return r.split(",").map(c=>{const u=n.bucket,h=n.fullPath,d="/b/"+o(u)+"/o/"+o(h),f=fr(d,t,i),m=Ql({alt:"media",token:c});return f+m})[0]}function E_(n,e){const t={},i=e.length;for(let s=0;s<i;s++){const r=e[s];r.writable&&(t[r.server]=n[r.local])}return JSON.stringify(t)}class sc{constructor(e,t,i,s){this.url=e,this.method=t,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(n){if(!n)throw ur()}function I_(n,e){function t(i,s){const r=ic(n,s,e);return rc(r!==null),r}return t}function C_(n,e){function t(i,s){const r=ic(n,s,e);return rc(r!==null),b_(r,s,n.host,n._protocol)}return t}function oc(n){function e(t,i){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=Ug():s=xg():t.getStatus()===402?s=Mg(n.bucket):t.getStatus()===403?s=Fg(n.path):s=i,s.status=t.getStatus(),s.serverResponse=i.serverResponse,s}return e}function T_(n){const e=oc(n);function t(i,s){let r=e(i,s);return i.getStatus()===404&&(r=Lg(n.path)),r.serverResponse=s.serverResponse,r}return t}function S_(n,e,t){const i=e.fullServerUrl(),s=fr(i,n.host,n._protocol),r="GET",o=n.maxOperationRetryTime,a=new sc(s,r,C_(n,t),o);return a.errorHandler=T_(e),a}function R_(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function k_(n,e,t){const i=Object.assign({},t);return i.fullPath=n.path,i.size=e.size(),i.contentType||(i.contentType=R_(null,e)),i}function A_(n,e,t,i,s){const r=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let P="";for(let N=0;N<2;N++)P=P+Math.random().toString().slice(2);return P}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const c=k_(e,i,s),u=E_(c,t),h="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+u+`\r
--`+l+`\r
Content-Type: `+c.contentType+`\r
\r
`,d=`\r
--`+l+"--",f=xe.getBlob(h,i,d);if(f===null)throw jg();const m={name:c.fullPath},v=fr(r,n.host,n._protocol),I="POST",T=n.maxUploadRetryTime,B=new sc(v,I,I_(n,t),T);return B.urlParams=m,B.headers=o,B.body=f.uploadData(),B.errorHandler=oc(e),B}class N_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=tt.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=tt.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=tt.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,i,s){if(this.sent_)throw Ft("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ft("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ft("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Ft("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ft("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class P_ extends N_{initXhr(){this.xhr_.responseType="text"}}function ac(){return new P_}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,t){this._service=e,t instanceof X?this._location=t:this._location=X.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new at(e,t)}get root(){const e=new X(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return tc(this._location.path)}get storage(){return this._service}get parent(){const e=m_(this._location.path);if(e===null)return null;const t=new X(this._location.bucket,e);return new at(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Gg(e)}}function O_(n,e,t){n._throwIfRoot("uploadBytes");const i=A_(n.storage,n._location,nc(),new xe(e,!0),t);return n.storage.makeRequestWithTokens(i,ac).then(s=>({metadata:s,ref:n}))}function D_(n){n._throwIfRoot("getDownloadURL");const e=S_(n.storage,n._location,nc());return n.storage.makeRequestWithTokens(e,ac).then(t=>{if(t===null)throw qg();return t})}function L_(n,e){const t=g_(n._location.path,e),i=new X(n._location.bucket,t);return new at(n.storage,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M_(n){return/^[A-Za-z]+:\/\//.test(n)}function x_(n,e){return new at(n,e)}function lc(n,e){if(n instanceof pr){const t=n;if(t._bucket==null)throw Vg();const i=new at(t,t._bucket);return e!=null?lc(i,e):i}else return e!==void 0?L_(n,e):n}function U_(n,e){if(e&&M_(e)){if(n instanceof pr)return x_(n,e);throw fs("To use ref(service, url), the first argument must be a Storage instance.")}else return lc(n,e)}function Po(n,e){const t=e?.[Kl];return t==null?null:X.makeFromBucketSpec(t,n)}function F_(n,e,t,i={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=i;s&&(n._overrideAuthToken=typeof s=="string"?s:zo(s,n.app.options.projectId))}class pr{constructor(e,t,i,s,r){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=Gl,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Og,this._maxUploadRetryTime=Dg,this._requests=new Set,s!=null?this._bucket=X.makeFromBucketSpec(s,this._host):this._bucket=Po(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=X.makeFromBucketSpec(this._url,e):this._bucket=Po(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){No("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){No("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new at(this,e)}_makeRequest(e,t,i,s,r=!0){if(this._deleted)return new Kg(Yl());{const o=r_(e,this._appId,i,s,t,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const Oo="@firebase/storage",Do="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="storage";function Lo(n,e,t){return n=L(n),O_(n,e,t)}function Mo(n){return n=L(n),D_(n)}function xo(n,e){return n=L(n),U_(n,e)}function B_(n=ci(),e){n=L(n);const i=li(n,cc).getImmediate({identifier:e}),s=Vo("storage");return s&&$_(i,...s),i}function $_(n,e,t,i={}){F_(n,e,t,i)}function W_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new pr(t,i,s,e,lt)}function H_(){nt(new He(cc,W_,"PUBLIC").setMultipleInstances(!0)),he(Oo,Do,""),he(Oo,Do,"esm2017")}H_();const Oe={},ps={FIREBASE:{apiKey:Oe?.VITE_FIREBASE_API_KEY||"AIzaSyApwujErcMv2TN0SDOBPf0DeZM3uVwEZDI",authDomain:Oe?.VITE_FIREBASE_AUTH_DOMAIN||"messenger-fbbf9.firebaseapp.com",projectId:Oe?.VITE_FIREBASE_PROJECT_ID||"messenger-fbbf9",databaseURL:Oe?.VITE_FIREBASE_DATABASE_URL||"https://messenger-fbbf9-default-rtdb.asia-southeast1.firebasedatabase.app",storageBucket:Oe?.VITE_FIREBASE_STORAGE_BUCKET||"messenger-fbbf9.firebasestorage.app",messagingSenderId:Oe?.VITE_FIREBASE_MESSAGING_SENDER_ID||"964023347209",appId:Oe?.VITE_FIREBASE_APP_ID||"1:964023347209:web:d50f81c15d1dd2a981b0d8",measurementId:Oe?.VITE_FIREBASE_MEASUREMENT_ID||"G-VSR1VWE445"},COMPRESSION_MAX_WIDTH:1200,COMPRESSION_QUALITY:.8},mr=Lu().length?ci():Jo(ps.FIREBASE),Ye=af(mr),W=Sg(mr),Uo=B_(mr);function uc(n){try{return`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(n)))}`}catch{return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}}const V_='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="50" fill="#2b2d37"/><path d="M50 48a16 16 0 1 0 0-32 16 16 0 0 0 0 32zm0 8c-18.7 0-34 11.5-34 26v2h68v-2c0-14.5-15.3-26-34-26z" fill="#5865f2"/></svg>',ms=uc(V_);function J(n){if(!n||typeof n!="string")return"";const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return n.replace(/[&<>"']/g,t=>e[t])}function gs(n){if(!n||typeof n!="string")return!1;const e=n.trim().toLowerCase();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:image/")}function oi(n,e){if(n&&gs(n))return n;const t=e&&typeof e=="string"&&e.trim()?e.trim():"User",i=t.charAt(0).toUpperCase();let s=0;for(let l=0;l<t.length;l++)s=t.charCodeAt(l)+((s<<5)-s);const r=Math.abs(s)%360,o=(r+40)%360,a=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="hsl(${r}, 75%, 55%)"/><stop offset="100%" stop-color="hsl(${o}, 85%, 45%)"/></linearGradient></defs><rect width="100" height="100" rx="50" fill="url(#g)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700">${i}</text></svg>`;return uc(a)}function Rn(n){return oi(null,n)}const j_=new _e,kn={currentUser:null,userProfile:null,presenceBound:!1,onAuthStateChanged(n){return Kh(Ye,async e=>{e?(this.currentUser=e,this.userProfile=await this.fetchUserProfile(e.uid,e.displayName||e.email?.split("@")[0]||"Guest User"),this.bindPresence(e.uid,this.userProfile.name),n(e,this.userProfile)):(this.unbindPresence(),this.currentUser=null,this.userProfile=null,n(null,null))})},async register(n,e,t){const s=(await Vh(Ye,n,e)).user,r=Rn(t);await xr(s,{displayName:t,photoURL:r});const o={uid:s.uid,name:t,email:n,status:"Online",avatarUrl:r,lastSeen:Z(),createdAt:Z()};return await Ee($(W,`users/${s.uid}`),o),this.userProfile=o,s},async login(n,e){const i=(await jh(Ye,n,e)).user,s=await this.fetchUserProfile(i.uid,i.displayName||n.split("@")[0]);return await this.updateStatus(i.uid,"Online"),s},async loginWithGoogle(){const e=(await md(Ye,j_)).user,t=e.photoURL||Rn(e.displayName||e.email),i={uid:e.uid,name:e.displayName||e.email.split("@")[0],email:e.email,status:"Online",avatarUrl:t,lastSeen:Z(),createdAt:Z()};return await Ee($(W,`users/${e.uid}`),i),this.userProfile=i,e},async loginAsGuest(n){const e=n.trim()||"Guest_"+Math.floor(1e3+Math.random()*9e3),i=(await Fh(Ye)).user,s=Rn(e);await xr(i,{displayName:e,photoURL:s});const r={uid:i.uid,name:e,isGuest:!0,status:"Online",avatarUrl:s,lastSeen:Z()};return await Ee($(W,`users/${i.uid}`),r),this.userProfile=r,i},async resetPassword(n){return Hh(Ye,n)},async logout(){return this.currentUser&&await this.updateStatus(this.currentUser.uid,"Offline"),Yh(Ye)},async fetchUserProfile(n,e="User"){const t=$(W,`users/${n}`),i=await hs(t);if(i.exists())return i.val();{const s=Rn(e),r={uid:n,name:e,status:"Online",avatarUrl:s,lastSeen:Z()};return await Ee(t,r),r}},async updateStatus(n,e){if(n)return us($(W,`users/${n}`),{status:e,lastSeen:Z()})},bindPresence(n,e){if(this.presenceBound)return;const t=$(W,".info/connected"),i=$(W,`users/${n}`);Ln(t,s=>{s.val()===!0&&(fg(i).update({status:"Offline",lastSeen:Z()}),us(i,{name:e||"User",status:"Online",lastSeen:Z()}))}),this.presenceBound=!0},unbindPresence(){this.presenceBound=!1}},se={activeListeners:{contactsRef:null,messagesRef:null,typingRef:null,statusRef:null},getChatChannelId(n,e){return!n||!e?null:[n,e].sort().join("_")},subscribeToContacts(n,e,t){const i=$(W,"users");this.activeListeners.contactsRef&&Cn(this.activeListeners.contactsRef),this.activeListeners.contactsRef=i,Ln(i,async s=>{if(!s.exists()){e([]);return}const r=s.val(),o=[];for(const a in r){if(a===n)continue;const l=r[a];if(!l||!l.name)continue;const c=this.getChatChannelId(n,a),u=await this.fetchLastMessageSummary(c,n);o.push({uid:a,name:l.name,status:l.status||"Offline",lastSeen:l.lastSeen,avatarUrl:l.avatarUrl,lastMessage:u.text,lastMessageTime:u.timestamp,unreadCount:u.unreadCount})}o.sort((a,l)=>{const c=a.lastMessageTime||0,u=l.lastMessageTime||0;return c!==u?u-c:a.status==="Online"?-1:1}),e(o)},s=>{console.error("Error fetching contacts:",s),t&&t(s)})},async fetchLastMessageSummary(n,e){if(!n)return{text:"",timestamp:0,unreadCount:0};try{const t=vg($(W,`chats/${n}/messages`),_g(20)),i=await hs(t);if(!i.exists())return{text:"",timestamp:0,unreadCount:0};const s=i.val(),r=Object.keys(s);let o=null,a=0;return r.forEach(c=>{const u=s[c];u.senderUid!==e&&u.status!=="read"&&a++,o=u}),{text:o?o.mediaType==="image"?"📷 Photo":o.message:"",timestamp:o?o.timestamp:0,unreadCount:a}}catch{return{text:"",timestamp:0,unreadCount:0}}},subscribeToMessages(n,e,t){if(this.activeListeners.messagesRef&&(Cn(this.activeListeners.messagesRef),this.activeListeners.messagesRef=null),!n)return;const i=$(W,`chats/${n}/messages`);this.activeListeners.messagesRef=i,Ln(i,s=>{if(!s.exists()){t([]);return}const r=s.val(),o=[];for(const a in r){const l=r[a];l.id=a,o.push(l),l.senderUid!==e&&l.status!=="read"&&us($(W,`chats/${n}/messages/${a}`),{status:"read"})}o.sort((a,l)=>(a.timestamp||0)-(l.timestamp||0)),t(o)})},setTypingStatus(n,e,t){if(!n||!e)return;const i=$(W,`chats/${n}/typing/${e}`);t?Ee(i,{timestamp:Z()}):In(i)},subscribeToTyping(n,e,t){if(this.activeListeners.typingRef&&(Cn(this.activeListeners.typingRef),this.activeListeners.typingRef=null),!n)return;const i=$(W,`chats/${n}/typing`);this.activeListeners.typingRef=i,Ln(i,s=>{if(!s.exists()){t(!1);return}const r=s.val();let o=!1;for(const a in r)if(a!==e){o=!0;break}t(o)})},async sendMessage(n,e,t,i,s=null){if(!n||!i.trim())return;const r=$(W,`chats/${n}/messages`),o=ko(r),a={id:o.key,senderUid:e,senderName:t,message:i.trim(),timestamp:Z(),status:"sent"};return s&&(a.replyTo={id:s.id,message:s.message||"[Media]",senderName:s.senderName}),Ee(o,a)},async sendFileAttachment(n,e,t,i){if(!n||!i)return;const s=$(W,`chats/${n}/messages`),r=ko(s),o=i.isImage,a={id:r.key,senderUid:e,senderName:t,message:o?"[Image]":i.fileName,mediaType:o?"image":"document",mediaUrl:i.url,fileName:i.fileName,fileSize:i.fileSize,fileType:i.fileType,timestamp:Z(),status:"sent"};return Ee(r,a)},async sendMediaMessage(n,e,t,i){return this.sendFileAttachment(n,e,t,{isImage:!0,url:i,fileName:"image.jpg",fileSize:0,fileType:"image/jpeg"})},async toggleReaction(n,e,t,i){if(!n||!e||!t)return;const s=$(W,`chats/${n}/messages/${e}/reactions/${t}`),r=await hs(s);return r.exists()&&r.val()===i?In(s):Ee(s,i)},async deleteMessage(n,e){if(!(!n||!e))return In($(W,`chats/${n}/messages/${e}`))},async deleteChatHistory(n){if(n)return In($(W,`chats/${n}`))},clearAllListeners(){for(const n in this.activeListeners)this.activeListeners[n]&&(Cn(this.activeListeners[n]),this.activeListeners[n]=null)}},q_={compressImage(n,e=ps.COMPRESSION_MAX_WIDTH,t=ps.COMPRESSION_QUALITY){return new Promise((i,s)=>{if(!n||!n.type.startsWith("image/"))return s(new Error("Invalid file type for image compression."));if(n.type==="image/gif"){const a=new FileReader;a.onload=l=>i({blob:n,dataUrl:l.target.result}),a.onerror=l=>s(l),a.readAsDataURL(n);return}const r=new Image,o=URL.createObjectURL(n);r.onload=()=>{URL.revokeObjectURL(o);let a=r.width,l=r.height;a>e&&(l=Math.round(l*e/a),a=e);const c=document.createElement("canvas");c.width=a,c.height=l,c.getContext("2d").drawImage(r,0,0,a,l);const h=c.toDataURL("image/jpeg",t);c.toBlob(d=>{if(!d)return s(new Error("Canvas compression to Blob failed."));i({blob:d,dataUrl:h})},"image/jpeg",t)},r.onerror=a=>{URL.revokeObjectURL(o),s(a)},r.src=o})},async uploadAttachment(n,e){const t=n.type.startsWith("image/"),i=n.name,s=n.size,r=n.type||"application/octet-stream";if(t)try{const{blob:o,dataUrl:a}=await this.compressImage(n);try{const l=Date.now(),c=i.replace(/[^a-zA-Z0-9.-]/g,"_"),u=`chat_media/${e}/${l}_${c}`,h=xo(Uo,u),d=await Lo(h,o,{contentType:"image/jpeg"});return{isImage:!0,url:await Mo(d.ref),fileName:i,fileSize:s,fileType:r}}catch(l){return console.warn("Firebase Storage warning (using inline dataUrl fallback):",l),{isImage:!0,url:a,fileName:i,fileSize:s,fileType:r}}}catch(o){throw console.error("Image compression error:",o),new Error("Failed to process image attachment.")}else try{const o=Date.now(),a=i.replace(/[^a-zA-Z0-9.-]/g,"_"),l=`chat_docs/${e}/${o}_${a}`,c=xo(Uo,l),u=await Lo(c,n,{contentType:r});return{isImage:!1,url:await Mo(u.ref),fileName:i,fileSize:s,fileType:r}}catch(o){return console.warn("Firebase Storage document upload fallback:",o),{isImage:!1,url:await this.readFileAsDataUrl(n),fileName:i,fileSize:s,fileType:r}}},readFileAsDataUrl(n){return new Promise((e,t)=>{const i=new FileReader;i.onload=s=>e(s.target.result),i.onerror=s=>t(s),i.readAsDataURL(n)})},async uploadImage(n,e){return(await this.uploadAttachment(n,e)).url}};function y(n,e=20,t=""){const i=e,s=t?`class="lucide-icon ${t}"`:'class="lucide-icon"';switch(n){case"message-square":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;case"search":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;case"paperclip":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;case"send":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;case"logout":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`;case"trash":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;case"arrow-left":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`;case"file-text":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;case"download":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`;case"check":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;case"check-check":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`;case"smile":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`;case"reply":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>`;case"copy":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;case"x":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;case"thumbs-up":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>`;case"heart":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;case"flame":return`<svg ${s} xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;default:return""}}class z_{constructor({onGuest:e,onGoogleLogin:t,onOpenAbout:i}){this.onGuest=e,this.onGoogleLogin=t,this.onOpenAbout=i,this.element=null,this.init()}init(){this.element=document.getElementById("auth-modal"),this.element?this.element.style.display="none":(this.element=document.createElement("div"),this.element.id="auth-modal",this.element.className="auth-overlay",this.element.style.display="none",document.body.appendChild(this.element)),this.render()}render(){this.element.innerHTML=`
            <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                <div class="auth-header">
                    <div class="brand-title">
                        <svg class="brand-logo" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span id="auth-title">Whispr</span>
                    </div>
                    <p class="brand-subtitle">Real-time messaging, beautifully simple</p>
                </div>

                <div id="auth-error-msg" class="auth-error-msg" style="display: none;" role="alert"></div>

                <div class="sso-container">
                    <button id="btn-google-sso" type="button" class="sso-google-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div class="divider"><span>OR</span></div>

                    <form id="email-instant-form" class="auth-form" novalidate>
                        <div class="form-group">
                            <label for="instant-email">Email address</label>
                            <input
                                id="instant-email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                autocomplete="email"
                                spellcheck="false"
                            >
                        </div>
                        <button class="auth-submit-btn" type="submit">Continue with Email</button>
                    </form>
                </div>

                <div class="auth-footer-links">
                    <button type="button" class="auth-link-btn" id="auth-terms-btn">Terms</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" class="auth-link-btn" id="auth-privacy-btn">Privacy</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" class="auth-link-btn" id="auth-about-btn">About</button>
                </div>
            </div>
        `,this.bindEvents()}bindEvents(){const e=this.element.querySelector("#btn-google-sso");e&&e.addEventListener("click",async()=>{this.clearError(),e.disabled=!0,e.style.opacity="0.6";try{await this.onGoogleLogin(),this.hide()}catch(s){this.showError(this.formatAuthError(s))}finally{e.disabled=!1,e.style.opacity=""}});const t=this.element.querySelector("#email-instant-form");t&&t.addEventListener("submit",async s=>{s.preventDefault(),this.clearError();const o=this.element.querySelector("#instant-email").value.trim();if(!o)return;const a=o.split("@")[0],l=t.querySelector(".auth-submit-btn");l&&(l.disabled=!0,l.textContent="Connecting…");try{await this.onGuest(a),this.hide()}catch(c){this.showError(this.formatAuthError(c)),l&&(l.disabled=!1,l.textContent="Continue with Email")}}),Object.entries({"#auth-terms-btn":"terms","#auth-privacy-btn":"privacy","#auth-about-btn":"about"}).forEach(([s,r])=>{const o=this.element.querySelector(s);o&&this.onOpenAbout&&o.addEventListener("click",()=>this.onOpenAbout(r))})}formatAuthError(e){const t=e?.code||"";return t==="auth/popup-closed-by-user"?"Sign-in was cancelled.":t==="auth/operation-not-allowed"||t==="auth/admin-restricted-operation"?"Google Sign-In is not enabled. Go to Firebase Console → Authentication → Sign-in method and enable Google.":e?.message||"Authentication failed. Please try again."}showError(e){const t=this.element.querySelector("#auth-error-msg");t&&(t.textContent=e,t.style.display="block")}clearError(){const e=this.element.querySelector("#auth-error-msg");e&&(e.textContent="",e.style.display="none")}show(){this.element.style.display="flex"}hide(){this.element.style.display="none"}}class G_{constructor(){this.activeTab="about",this.element=null,this.init()}init(){this.element=document.getElementById("about-modal"),this.element||(this.element=document.createElement("div"),this.element.id="about-modal",this.element.className="auth-overlay",this.element.style.display="none",document.body.appendChild(this.element)),this.render()}setTab(e){this.activeTab=e,this.render()}render(){this.element.innerHTML=`
            <div class="auth-card about-card">
                <div class="about-card-header">
                    <div class="brand-title">
                        ${y("message-square",28,"brand-logo")}
                        <span>Whispr</span>
                        <span class="version-tag">v1.0.0</span>
                    </div>
                    <button type="button" class="close-modal-btn" id="close-about-btn" title="Close">${y("x",20)}</button>
                </div>

                <div class="about-tabs" role="tablist">
                    <button class="about-tab-btn ${this.activeTab==="about"?"active":""}" data-tab="about" type="button">About</button>
                    <button class="about-tab-btn ${this.activeTab==="privacy"?"active":""}" data-tab="privacy" type="button">Privacy</button>
                    <button class="about-tab-btn ${this.activeTab==="terms"?"active":""}" data-tab="terms" type="button">Terms</button>
                    <button class="about-tab-btn ${this.activeTab==="support"?"active":""}" data-tab="support" type="button">Support</button>
                </div>

                <div class="about-content-body">
                    ${this.renderTabContent()}
                </div>
            </div>
        `,this.bindEvents()}renderTabContent(){return this.activeTab==="about"?`
                <div class="info-section">
                    <h3>About Whispr</h3>
                    <p>Whispr is a modern, high-performance real-time web messenger built for fast, secure, and seamless communication. Designed with a minimal agency-grade dark aesthetic and client-side optimization.</p>
                    
                    <div class="feature-list-grid">
                        <div class="feature-item">
                            <span class="feature-icon">${y("check",16)}</span>
                            <div><strong>Real-Time Sync:</strong> Sub-second message delivery powered by Firebase WebSockets.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${y("check",16)}</span>
                            <div><strong>Smart Compression:</strong> Client-side Canvas image optimization reducing payload sizes by 90%.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${y("check",16)}</span>
                            <div><strong>Document Sharing:</strong> Native support for PDFs, DOCX, TXT, and ZIP archives up to 25MB.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${y("check",16)}</span>
                            <div><strong>Single Sign-On:</strong> One-click Google OAuth and passwordless authentication.</div>
                        </div>
                    </div>
                </div>
            `:this.activeTab==="privacy"?`
                <div class="info-section">
                    <h3>Privacy Policy</h3>
                    <p>Your privacy is fundamental to Whispr. We operate under strict data minimization and protection standards.</p>
                    
                    <div class="legal-block">
                        <h4>1. Data Collection</h4>
                        <p>We collect only essential account information (display name, email, avatar URL) and message payload metadata required to deliver real-time chat sessions.</p>
                        
                        <h4>2. Media & Storage Security</h4>
                        <p>Uploaded photos are compressed locally on your device prior to transmission. All document and photo attachments are stored securely in isolated Firebase Storage buckets.</p>
                        
                        <h4>3. User Data Control</h4>
                        <p>You retain full ownership of your data. You can delete individual messages or clear full conversation history at any time with permanent server deletion.</p>
                    </div>
                </div>
            `:this.activeTab==="terms"?`
                <div class="info-section">
                    <h3>Terms of Service</h3>
                    <p>By using Whispr, you agree to the following terms and community standards.</p>
                    
                    <div class="legal-block">
                        <h4>1. Acceptable Use</h4>
                        <p>Whispr must be used solely for lawful communication. Spamming, automated bot harassment, or transmitting illegal content is strictly prohibited.</p>
                        
                        <h4>2. Account Responsibility</h4>
                        <p>You are responsible for maintaining the security of your account credentials and all activities occurring under your authenticated session.</p>
                        
                        <h4>3. Service Availability</h4>
                        <p>Whispr is provided "as is" with high-availability cloud infrastructure. We continuously monitor uptime and system health.</p>
                    </div>
                </div>
            `:`
                <div class="info-section">
                    <h3>Help & Support</h3>
                    <p>Need assistance or have feedback? We're here to help.</p>
                    
                    <div class="support-card-grid">
                        <div class="support-card">
                            <span class="support-icon">${y("message-square",20)}</span>
                            <div>
                                <strong>Community & Issues</strong>
                                <p>Report bugs or request features on our official repository.</p>
                            </div>
                        </div>
                        <div class="support-card">
                            <span class="support-icon">${y("file-text",20)}</span>
                            <div>
                                <strong>Documentation</strong>
                                <p>Learn about Whispr architecture and deployment guides.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}bindEvents(){this.element.querySelectorAll(".about-tab-btn").forEach(i=>{i.addEventListener("click",()=>{this.setTab(i.getAttribute("data-tab"))})});const t=this.element.querySelector("#close-about-btn");t&&t.addEventListener("click",()=>this.hide()),this.element.addEventListener("click",i=>{i.target===this.element&&this.hide()})}show(e){e&&this.setTab(e),this.element.style.display="flex"}hide(){this.element.style.display="none"}}function K_(n){if(!n)return"";const e=new Date(n);if(isNaN(e.getTime()))return"";const t=new Date,i=e.toDateString()===t.toDateString(),s=new Date(t);s.setDate(t.getDate()-1);const r=e.toDateString()===s.toDateString(),o=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return i?`Today at ${o}`:r?`Yesterday at ${o}`:`${e.toLocaleDateString([],{month:"short",day:"numeric",year:"numeric"})}, ${o}`}function Y_(n){if(!n)return"";const e=new Date(n);if(isNaN(e.getTime()))return"";const t=new Date;return e.toDateString()===t.toDateString()?e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):e.toLocaleDateString([],{month:"numeric",day:"numeric"})}function Q_(n){if(!n)return"Offline";const e=new Date(n);if(isNaN(e.getTime()))return"Offline";const t=Math.floor((Date.now()-e.getTime())/1e3);return t<60?"Last seen just now":t<3600?`Last seen ${Math.floor(t/60)}m ago`:t<86400?`Last seen ${Math.floor(t/3600)}h ago`:`Last seen ${e.toLocaleDateString()}`}class J_{constructor({containerEl:e,profileEl:t,onSelectContact:i,onLogout:s,onOpenAbout:r}){this.containerEl=e,this.profileEl=t,this.onSelectContact=i,this.onLogout=s,this.onOpenAbout=r,this.contacts=[],this.filterQuery="",this.tabFilter="all",this.activeUid=null}setProfile(e){if(!this.profileEl||!e)return;const t=oi(e.avatarUrl,e.name);this.profileEl.innerHTML=`
            <div class="user-avatar-wrap">
                <img src="${t}" alt="" class="avatar-img">
                <span class="status-indicator online"></span>
            </div>
            <div class="user-meta">
                <div class="name">${J(e.name)}</div>
                <div class="user-status-text">${e.isGuest?"Guest session":"Active now"}</div>
            </div>
            <div class="user-profile-actions">
                <button id="about-button" class="icon-nav-btn" type="button" aria-label="About Whispr" title="About & Legal">
                    ${y("file-text",16)}
                </button>
                <button id="logout-button" class="logout-button" type="button" aria-label="Logout" title="Sign out">
                    ${y("logout",16)}
                </button>
            </div>
        `;const i=this.profileEl.querySelector(".avatar-img");i&&i.addEventListener("error",()=>{i.src=ms},{once:!0});const s=this.profileEl.querySelector("#about-button");s&&this.onOpenAbout&&s.addEventListener("click",()=>this.onOpenAbout());const r=this.profileEl.querySelector("#logout-button");r&&r.addEventListener("click",()=>this.onLogout())}setContacts(e){this.contacts=e,this.render()}setFilter(e){this.filterQuery=(e||"").toLowerCase().trim(),this.render()}setTabFilter(e){this.tabFilter=e||"all",this.render()}setActiveContact(e){this.activeUid=e,this.render()}render(){if(!this.containerEl)return;this.containerEl.innerHTML="";const e=this.contacts.filter(t=>t.name.toLowerCase().includes(this.filterQuery)?this.tabFilter==="unread"?(t.unreadCount||0)>0:this.tabFilter==="online"?t.status==="Online":!0:!1);if(e.length===0&&this.contacts.length===0){for(let t=0;t<5;t++){const i=document.createElement("div");i.className="contact-skeleton",i.setAttribute("aria-hidden","true"),i.innerHTML=`
                    <div class="skeleton-avatar"></div>
                    <div class="skeleton-text">
                        <div class="skeleton-line w-${t%2===0?"80":"60"}"></div>
                        <div class="skeleton-line w-${t%2===0?"60":"40"}"></div>
                    </div>
                `,this.containerEl.appendChild(i)}return}if(e.length===0){const t=document.createElement("div");t.className="contacts-empty",t.textContent=this.filterQuery?"No matching conversations":"No contacts yet",this.containerEl.appendChild(t);return}e.forEach(t=>{const i=t.uid===this.activeUid,s=t.status==="Online",r=document.createElement("div");r.className=`contact-card${i?" active":""}`,r.setAttribute("role","listitem"),r.setAttribute("tabindex","0"),r.setAttribute("aria-label",`Chat with ${t.name}${s?", online":""}`);const o=t.lastMessageTime?Y_(t.lastMessageTime):"",a=oi(t.avatarUrl,t.name);r.innerHTML=`
                <div class="contact-avatar-wrap${s?" online":""}">
                    <img src="${a}" alt="" class="avatar-img">
                    <span class="status-indicator ${s?"online":"offline"}"></span>
                </div>
                <div class="contact-info">
                    <div class="contact-top">
                        <span class="contact-name">${J(t.name)}</span>
                        ${o?`<span class="contact-time">${o}</span>`:""}
                    </div>
                    <div class="contact-bottom">
                        <span class="contact-snippet">${J(t.lastMessage||(s?"Online now":"Offline"))}</span>
                        ${t.unreadCount>0?`<span class="unread-badge">${t.unreadCount}</span>`:""}
                    </div>
                </div>
            `;const l=r.querySelector(".avatar-img");l&&l.addEventListener("error",()=>{l.src=ms},{once:!0});const c=()=>{this.setActiveContact(t.uid),this.onSelectContact(t)};r.addEventListener("click",c),r.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),c())}),this.containerEl.appendChild(r)})}}class X_{constructor({headerEl:e,onBack:t,onDeleteHistory:i}){this.headerEl=e,this.onBack=t,this.onDeleteHistory=i,this.contact=null,this.isTyping=!1}setContact(e){this.contact=e,this.render()}setTyping(e){this.isTyping=e,this.renderStatus()}render(){if(!this.headerEl)return;if(!this.contact){this.headerEl.style.display="none";return}this.headerEl.style.display="flex";const e=this.contact.status==="Online",t=oi(this.contact.avatarUrl,this.contact.name);this.headerEl.innerHTML=`
            <div class="header-left">
                <button class="back-button" type="button" aria-label="Back to contacts" title="Back">
                    ${y("arrow-left",18)}
                </button>
                <div class="header-contact-avatar">
                    <img src="${t}" alt="" class="avatar-img">
                    <span class="status-indicator ${e?"online":"offline"}"></span>
                </div>
                <div class="header-contact-meta">
                    <div class="header-contact-name">${J(this.contact.name)}</div>
                    <div class="header-contact-status ${e?"online":""}" id="header-status-text">
                    </div>
                </div>
            </div>
            <div class="header-actions">
                <button class="icon-nav-btn" type="button" aria-label="Voice call" title="Voice call (coming soon)" disabled style="opacity:0.4;cursor:default;">
                    ${y("phone",16)}
                </button>
                <button class="icon-nav-btn" type="button" aria-label="Video call" title="Video call (coming soon)" disabled style="opacity:0.4;cursor:default;">
                    ${y("video",16)}
                </button>
                <button class="icon-nav-btn delete-chat-btn" type="button" aria-label="Delete chat history" title="Delete History">
                    ${y("trash",16)}
                </button>
            </div>
        `;const i=this.headerEl.querySelector(".avatar-img");i&&i.addEventListener("error",()=>{i.src=ms},{once:!0});const s=this.headerEl.querySelector(".back-button");s&&s.addEventListener("click",()=>this.onBack());const r=this.headerEl.querySelector(".delete-chat-btn");r&&r.addEventListener("click",()=>this.onDeleteHistory()),this.renderStatus()}renderStatus(){const e=this.headerEl.querySelector("#header-status-text");if(!(!e||!this.contact))if(this.isTyping)e.className="header-contact-status typing",e.innerHTML=`
                <div class="typing-indicator" aria-label="Typing">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span class="typing-label">typing</span>
            `;else{const t=this.contact.status==="Online";e.className=`header-contact-status${t?" online":""}`,t?e.innerHTML='<span class="status-pulse-dot"></span> Online':e.textContent=Q_(this.contact.lastSeen)}}}class Z_{constructor({outputEl:e,currentUid:t,onReply:i,onDeleteMessage:s,onToggleReaction:r,onImageClick:o}){this.outputEl=e,this.currentUid=t,this.onReply=i,this.onDeleteMessage=s,this.onToggleReaction=r,this.onImageClick=o,this.messages=[]}setCurrentUid(e){this.currentUid=e}setMessages(e){this.messages=e,this.render()}render(){if(!this.outputEl)return;if(this.outputEl.innerHTML="",this.messages.length===0){this.renderEmptyState();return}let e="";this.messages.forEach((t,i)=>{const r=new Date(t.timestamp||Date.now()).toLocaleDateString([],{month:"long",day:"numeric",year:"numeric"});if(r!==e){e=r;const T=document.createElement("div");T.className="date-divider",T.innerHTML=`<span>${r}</span>`,this.outputEl.appendChild(T)}const o=t.senderUid===this.currentUid,a=this.messages[i-1],l=this.messages[i+1],c=a&&a.senderUid===t.senderUid,u=l&&l.senderUid===t.senderUid;let h="solo";c&&u?h="middle":c?h="last":u&&(h="first");const d=document.createElement("div");d.className=`message-group ${o?"sent":"received"}${c?"":" group-start"}`,d.setAttribute("data-msg-id",t.id);let f="";if(t.replyTo&&(f+=`
                    <div class="reply-quote-preview">
                        <span class="reply-sender">${J(t.replyTo.senderName||"User")}</span>
                        <span class="reply-text">${J(t.replyTo.message)}</span>
                    </div>
                `),t.mediaType==="image"&&gs(t.mediaUrl))f+=`
                    <div class="media-bubble">
                        <img src="${t.mediaUrl}" alt="Shared image" class="chat-image-attachment" loading="lazy">
                    </div>
                `;else if(t.mediaType==="document"&&gs(t.mediaUrl)){const T=t.fileSize?t.fileSize>1048576?`${(t.fileSize/1048576).toFixed(1)} MB`:`${(t.fileSize/1024).toFixed(0)} KB`:"";f+=`
                    <div class="document-card">
                        <div class="doc-icon">${y("file-text",20)}</div>
                        <div class="doc-info">
                            <span class="doc-title">${J(t.fileName||t.message||"Document")}</span>
                            ${T?`<span class="doc-size">${T}</span>`:""}
                        </div>
                        <a href="${t.mediaUrl}" target="_blank" rel="noopener noreferrer" class="doc-download-btn" title="Download" download="${J(t.fileName||"Document")}">
                            ${y("download",16)}
                        </a>
                    </div>
                `}else f+=`<div class="message-text">${J(t.message||"")}</div>`;let m="";if(t.reactions){const T={};for(const P in t.reactions){const N=t.reactions[P];T[N]=(T[N]||0)+1}const B=Object.entries(T).map(([P,N])=>`
                    <span class="reaction-pill" data-emoji="${P}" role="button" title="React">
                        ${y(P,12)} ${N>1?N:""}
                    </span>
                `).join("");B&&(m=`<div class="reactions-bar">${B}</div>`)}let v="";if(o){const T=t.status==="read";v=`
                    <span class="status-check ${T?"read":"sent"}" title="${T?"Read":"Sent"}">
                        ${y(T?"check-check":"check",12)}
                    </span>
                `}const I=h==="first"||h==="middle"?" is-"+h:"";d.innerHTML=`
                <div class="bubble ${o?"sent":"received"}${I}">
                    ${f}
                    ${m}
                    <div class="message-meta">
                        <span class="time">${K_(t.timestamp)}</span>
                        ${v}
                    </div>
                </div>
                <div class="message-hover-actions" role="toolbar" aria-label="Message actions">
                    <button class="action-btn react-btn" title="React" type="button">${y("smile",14)}</button>
                    <button class="action-btn reply-btn" title="Reply" type="button">${y("reply",14)}</button>
                    <button class="action-btn copy-btn" title="Copy text" type="button">${y("copy",14)}</button>
                    ${o?`<button class="action-btn delete-btn" title="Delete" type="button">${y("trash",14)}</button>`:""}
                </div>
                <div class="emoji-picker-popover" style="display: none;" role="dialog" aria-label="Choose reaction">
                    <button type="button" class="reaction-opt" data-emoji="thumbs-up" title="Like">${y("thumbs-up",16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="heart" title="Love">${y("heart",16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="smile" title="Smile">${y("smile",16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="flame" title="Fire">${y("flame",16)}</button>
                </div>
            `,this.bindMessageEvents(d,t),this.outputEl.appendChild(d)}),this.scrollToBottom()}bindMessageEvents(e,t){const i=e.querySelector(".chat-image-attachment");i&&i.addEventListener("click",()=>this.onImageClick(t.mediaUrl));const s=e.querySelector(".react-btn"),r=e.querySelector(".emoji-picker-popover");s&&r&&(s.addEventListener("click",c=>{c.stopPropagation();const u=r.style.display==="flex";r.style.display=u?"none":"flex"}),e.querySelectorAll(".reaction-opt").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-emoji");this.onToggleReaction(t.id,u),r.style.display="none"})}),document.addEventListener("click",c=>{e.contains(c.target)||(r.style.display="none")},{passive:!0})),e.querySelectorAll(".reaction-pill").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-emoji");this.onToggleReaction(t.id,u)})});const o=e.querySelector(".reply-btn");o&&o.addEventListener("click",()=>this.onReply(t));const a=e.querySelector(".copy-btn");a&&a.addEventListener("click",()=>{t.message&&navigator.clipboard.writeText(t.message).catch(()=>{})});const l=e.querySelector(".delete-btn");l&&l.addEventListener("click",()=>this.onDeleteMessage(t.id))}renderEmptyState(){this.outputEl.innerHTML=`
            <div class="welcome-placeholder" aria-label="No messages yet">
                <div class="welcome-content">
                    <div class="welcome-left">
                        <div class="welcome-logo-wrap">
                            ${y("message-square",34)}
                        </div>
                        <h2>Start a conversation</h2>
                        <p>Select a contact and say hello. Messages are synced in real-time across all your devices.</p>
                    </div>
                    <div class="welcome-right">
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${y("zap",16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Real-time sync</strong>
                                <span>Messages delivered instantly via WebSockets</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${y("image",16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Media sharing</strong>
                                <span>Photos and documents up to 25 MB</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${y("shield",16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Secure by default</strong>
                                <span>Authenticated sessions with Firebase</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${y("smile",16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Reactions & replies</strong>
                                <span>Express yourself with emoji reactions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}scrollToBottom(){if(!this.outputEl)return;const e=this.outputEl.parentElement;e&&(e.scrollTop=e.scrollHeight)}}class ev{constructor({inputAreaEl:e,onSendMessage:t,onSendMedia:i,onTypingChange:s}){this.inputAreaEl=e,this.onSendMessage=t,this.onSendMedia=i,this.onTypingChange=s,this.replyMessage=null,this.selectedFile=null,this.typingTimeout=null,this.init()}init(){this.inputAreaEl&&this.render()}setReplyMessage(e){this.replyMessage=e,this.renderReplyPreview()}clearReply(){this.replyMessage=null,this.renderReplyPreview()}setSelectedFile(e){this.selectedFile=e,this.renderFilePreview()}clearFile(){this.selectedFile=null;const e=this.inputAreaEl.querySelector("#media-file-input");e&&(e.value=""),this.renderFilePreview()}render(){this.inputAreaEl.innerHTML=`
            <div id="reply-banner" class="reply-banner" style="display: none;"></div>
            <div id="file-banner" class="file-banner" style="display: none;"></div>
            <div class="composer-row">
                <input type="file" id="media-file-input" style="display: none;" accept="image/*, application/pdf, .pdf, .doc, .docx, .txt, .zip, .csv, .xlsx">
                <button id="attachment-button" type="button" class="composer-icon-btn" aria-label="Attach file or photo" title="Attach file (up to 25 MB)">
                    ${y("paperclip",18)}
                </button>
                <div class="emoji-picker-container" style="position: relative;">
                    <button id="emoji-picker-btn" type="button" class="composer-icon-btn" aria-label="Insert emoji" title="Emoji">
                        ${y("smile",18)}
                    </button>
                    <div id="quick-emoji-popover" class="quick-emoji-popover" style="display: none;" role="dialog" aria-label="Quick emoji">
                        <button type="button" class="emoji-chip" data-emoji="👍" title="Thumbs up">👍</button>
                        <button type="button" class="emoji-chip" data-emoji="❤️" title="Heart">❤️</button>
                        <button type="button" class="emoji-chip" data-emoji="🔥" title="Fire">🔥</button>
                        <button type="button" class="emoji-chip" data-emoji="😊" title="Smile">😊</button>
                        <button type="button" class="emoji-chip" data-emoji="🙌" title="Raise hands">🙌</button>
                        <button type="button" class="emoji-chip" data-emoji="✨" title="Sparkles">✨</button>
                        <button type="button" class="emoji-chip" data-emoji="🎉" title="Party">🎉</button>
                        <button type="button" class="emoji-chip" data-emoji="🚀" title="Rocket">🚀</button>
                    </div>
                </div>
                <textarea
                    id="message-input"
                    class="message-input"
                    placeholder="Write a message…"
                    rows="1"
                    aria-label="Type a message"
                    autocomplete="off"
                    spellcheck="true"
                ></textarea>
                <button id="send-button" type="button" class="send-btn" aria-label="Send message" title="Send (Enter)">
                    ${y("send",16)}
                </button>
            </div>
        `,this.bindEvents()}bindEvents(){const e=this.inputAreaEl.querySelector("#message-input"),t=this.inputAreaEl.querySelector("#send-button"),i=this.inputAreaEl.querySelector("#attachment-button"),s=this.inputAreaEl.querySelector("#media-file-input");e.addEventListener("input",()=>{e.style.height="auto",e.style.height=Math.min(e.scrollHeight,120)+"px",this.onTypingChange(!0),this.typingTimeout&&clearTimeout(this.typingTimeout),this.typingTimeout=setTimeout(()=>this.onTypingChange(!1),2e3)}),e.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),this.handleSend())}),t.addEventListener("click",()=>this.handleSend());const r=this.inputAreaEl.querySelector("#emoji-picker-btn"),o=this.inputAreaEl.querySelector("#quick-emoji-popover");r&&o&&(r.addEventListener("click",a=>{a.stopPropagation();const l=o.style.display==="flex";o.style.display=l?"none":"flex"}),this.inputAreaEl.querySelectorAll(".emoji-chip").forEach(a=>{a.addEventListener("click",()=>{const l=a.getAttribute("data-emoji");e.value+=l,e.focus(),e.style.height="auto",e.style.height=Math.min(e.scrollHeight,120)+"px",o.style.display="none"})}),document.addEventListener("click",a=>{!o.contains(a.target)&&a.target!==r&&(o.style.display="none")},{passive:!0})),i.addEventListener("click",()=>s.click()),s.addEventListener("change",a=>{const l=a.target.files[0];l&&this.setSelectedFile(l)})}renderReplyPreview(){const e=this.inputAreaEl.querySelector("#reply-banner");e&&(this.replyMessage?(e.style.display="flex",e.innerHTML=`
                <div class="banner-content">
                    <span class="banner-label">Replying to ${J(this.replyMessage.senderName||"User")}</span>
                    <span class="banner-text">${J(this.replyMessage.message||"[Attachment]")}</span>
                </div>
                <button type="button" class="cancel-banner-btn" aria-label="Cancel reply">${y("x",14)}</button>
            `,e.querySelector(".cancel-banner-btn").addEventListener("click",()=>this.clearReply())):e.style.display="none")}renderFilePreview(){const e=this.inputAreaEl.querySelector("#file-banner");if(e)if(this.selectedFile){e.style.display="flex";const t=this.selectedFile.type.startsWith("image/"),i=this.selectedFile.size>1024*1024?`${(this.selectedFile.size/(1024*1024)).toFixed(2)} MB`:`${(this.selectedFile.size/1024).toFixed(1)} KB`;e.innerHTML=`
                <div class="banner-content">
                    <span class="banner-label">${t?"Photo":"Document"} ready to send</span>
                    <span class="banner-text">${J(this.selectedFile.name)} · ${i}</span>
                </div>
                <button type="button" class="cancel-banner-btn" aria-label="Remove attachment">${y("x",14)}</button>
            `,e.querySelector(".cancel-banner-btn").addEventListener("click",()=>this.clearFile())}else e.style.display="none"}async handleSend(){const e=this.inputAreaEl.querySelector("#message-input"),t=e?e.value.trim():"";if(this.selectedFile){const i=this.selectedFile;this.clearFile(),await this.onSendMedia(i)}if(t){const i=this.replyMessage;e.value="",e.style.height="auto",this.clearReply(),this.typingTimeout&&clearTimeout(this.typingTimeout),this.onTypingChange(!1),await this.onSendMessage(t,i)}}show(){this.inputAreaEl.style.display="flex"}hide(){this.inputAreaEl.style.display="none"}}class tv{constructor(){this.element=null,this.init()}init(){this.element=document.getElementById("image-lightbox"),this.element||(this.element=document.createElement("div"),this.element.id="image-lightbox",this.element.className="lightbox-overlay",this.element.style.display="none",document.body.appendChild(this.element)),this.element.addEventListener("click",e=>{(e.target===this.element||e.target.closest(".lightbox-close"))&&this.hide()}),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.element.style.display==="flex"&&this.hide()})}show(e){e&&(this.element.innerHTML=`
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close image viewer">${y("x",24)}</button>
                <img src="${e}" alt="Full preview" class="lightbox-img">
            </div>
        `,this.element.style.display="flex")}hide(){this.element.style.display="none",this.element.innerHTML=""}}class nv{constructor(){this.container=null,this.networkBanner=null,this.init()}init(){this.container=document.getElementById("toast-container"),this.container||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container)),this.networkBanner=document.getElementById("network-banner"),this.networkBanner||(this.networkBanner=document.createElement("div"),this.networkBanner.id="network-banner",this.networkBanner.className="network-banner offline",this.networkBanner.style.display="none",document.body.appendChild(this.networkBanner)),window.addEventListener("online",()=>this.handleNetworkChange(!0)),window.addEventListener("offline",()=>this.handleNetworkChange(!1))}handleNetworkChange(e){e?(this.networkBanner.textContent="Connection restored.",this.networkBanner.className="network-banner online",this.networkBanner.style.display="block",setTimeout(()=>{this.networkBanner.style.display="none"},3e3)):(this.networkBanner.textContent="You are currently offline. Attempting to reconnect...",this.networkBanner.className="network-banner offline",this.networkBanner.style.display="block")}show(e,t="info",i=4e3){const s=document.createElement("div");s.className=`toast-item toast-${t}`,s.innerHTML=`
            <div class="toast-content">${J(e)}</div>
            <button class="toast-close" aria-label="Dismiss toast">${y("x",14)}</button>
        `,s.querySelector(".toast-close").addEventListener("click",()=>{s.remove()}),this.container.appendChild(s),setTimeout(()=>{s.parentElement&&(s.classList.add("fade-out"),setTimeout(()=>s.remove(),300))},i)}}class iv{constructor(){this.currentUser=null,this.userProfile=null,this.activeContact=null,this.activeChatId=null,this.toast=new nv,this.lightbox=new tv,this.isInitialAuthResolved=!1,this.init()}async init(){this.cacheDOM(),this.initComponents(),this.bindGlobalEvents(),kn.onAuthStateChanged((e,t)=>{e&&t?(this.currentUser=e,this.userProfile=t):(this.currentUser=null,this.userProfile=null),this.isInitialAuthResolved?this.currentUser&&this.userProfile?this.onUserLoggedIn():this.onUserLoggedOut():(this.isInitialAuthResolved=!0,this.hideAppLoader(()=>{this.currentUser&&this.userProfile?this.onUserLoggedIn():this.onUserLoggedOut()}))}),setTimeout(()=>{this.isInitialAuthResolved||(this.isInitialAuthResolved=!0,this.hideAppLoader(()=>this.onUserLoggedOut()))},8e3)}cacheDOM(){this.dom={appLoader:document.getElementById("app-loader"),appContainer:document.getElementById("app-container"),contactsSection:document.querySelector(".contacts-section"),chatSection:document.querySelector(".chat-section"),userProfileNav:document.getElementById("user-profile"),searchBar:document.getElementById("search-bar"),newChatBtn:document.getElementById("new-chat-btn"),contactsContainer:document.getElementById("contacts"),chatHeaderContainer:document.getElementById("chat-header"),chatOutputContainer:document.getElementById("output"),inputAreaContainer:document.getElementById("input-area"),confirmDialogModal:document.getElementById("custom-alert"),confirmDialogBtn:document.getElementById("confirm-delete-chat"),cancelDialogBtn:document.getElementById("cancel-delete-chat")}}initComponents(){this.aboutModal=new G_,this.authModal=new z_({onGuest:e=>kn.loginAsGuest(e),onGoogleLogin:()=>kn.loginWithGoogle(),onOpenAbout:e=>this.aboutModal.show(e)}),this.contactList=new J_({containerEl:this.dom.contactsContainer,profileEl:this.dom.userProfileNav,onSelectContact:e=>this.selectContact(e),onLogout:()=>this.handleLogout(),onOpenAbout:()=>this.aboutModal.show()}),this.chatHeader=new X_({headerEl:this.dom.chatHeaderContainer,onBack:()=>this.toggleMobileDrawer(!0),onDeleteHistory:()=>this.showDeleteChatConfirmation()}),this.messageStream=new Z_({outputEl:this.dom.chatOutputContainer,currentUid:null,onReply:e=>this.inputArea.setReplyMessage(e),onDeleteMessage:e=>this.handleDeleteMessage(e),onToggleReaction:(e,t)=>this.handleToggleReaction(e,t),onImageClick:e=>this.lightbox.show(e)}),this.inputArea=new ev({inputAreaEl:this.dom.inputAreaContainer,onSendMessage:(e,t)=>this.handleSendMessage(e,t),onSendMedia:e=>this.handleSendMedia(e),onTypingChange:e=>this.handleTypingChange(e)})}bindGlobalEvents(){this.dom.searchBar&&this.dom.searchBar.addEventListener("input",t=>{this.contactList.setFilter(t.target.value)});const e=document.querySelectorAll(".filter-tab");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("active")),t.classList.add("active");const i=t.getAttribute("data-filter")||"all";this.contactList.setTabFilter(i)})}),window.addEventListener("resize",()=>{window.innerWidth>=768?(this.dom.contactsSection.classList.remove("hidden-mobile"),this.dom.chatSection.classList.remove("hidden-mobile")):this.activeContact||(this.dom.contactsSection.classList.remove("hidden-mobile"),this.dom.chatSection.classList.add("hidden-mobile"))}),this.dom.confirmDialogBtn&&this.dom.confirmDialogBtn.addEventListener("click",()=>this.handleConfirmDeleteChat()),this.dom.cancelDialogBtn&&this.dom.cancelDialogBtn.addEventListener("click",()=>{this.dom.confirmDialogModal?.close&&this.dom.confirmDialogModal.close()}),this.dom.newChatBtn&&this.dom.newChatBtn.addEventListener("click",()=>{this.dom.searchBar&&(this.dom.searchBar.focus(),this.dom.searchBar.select())}),window.addEventListener("keydown",t=>{const i=t.key.toLowerCase();(t.metaKey||t.ctrlKey)&&(i==="k"||i==="n")?(t.preventDefault(),this.dom.searchBar&&(this.dom.searchBar.focus(),this.dom.searchBar.select())):t.key==="Escape"&&document.activeElement===this.dom.searchBar&&(this.dom.searchBar.value="",this.contactList.setFilter(""),this.dom.searchBar.blur())})}hideAppLoader(e){if(!this.dom.appLoader){e&&e();return}this.dom.appLoader.classList.add("fade-out"),setTimeout(()=>{this.dom.appLoader&&(this.dom.appLoader.style.display="none"),e&&e()},380)}onUserLoggedIn(){this.authModal.hide(),this.dom.appContainer.style.display="flex",this.contactList.setProfile(this.userProfile),this.messageStream.setCurrentUid(this.currentUser.uid),se.subscribeToContacts(this.currentUser.uid,e=>this.contactList.setContacts(e),e=>this.toast.show("Error updating contacts directory","error")),this.showWelcomeView()}onUserLoggedOut(){se.clearAllListeners(),this.activeContact=null,this.activeChatId=null,this.dom.appContainer.style.display="none",this.authModal.show()}async handleLogout(){try{await kn.logout(),this.toast.show("Logged out successfully.","info")}catch(e){this.toast.show("Logout error: "+e.message,"error")}}selectContact(e){!e||!this.currentUser||(this.activeContact=e,this.activeChatId=se.getChatChannelId(this.currentUser.uid,e.uid),this.chatHeader.setContact(e),this.inputArea.show(),this.inputArea.clearReply(),se.subscribeToMessages(this.activeChatId,this.currentUser.uid,t=>{this.messageStream.setMessages(t)}),se.subscribeToTyping(this.activeChatId,this.currentUser.uid,t=>{this.chatHeader.setTyping(t)}),window.innerWidth<768&&this.toggleMobileDrawer(!1))}toggleMobileDrawer(e){e?(this.dom.contactsSection.classList.remove("hidden-mobile"),this.dom.chatSection.classList.add("hidden-mobile")):(this.dom.contactsSection.classList.add("hidden-mobile"),this.dom.chatSection.classList.remove("hidden-mobile"))}showWelcomeView(){this.activeContact=null,this.activeChatId=null,this.chatHeader.setContact(null),this.inputArea.hide(),this.messageStream.setMessages([]),window.innerWidth<768&&this.toggleMobileDrawer(!0)}async handleSendMessage(e,t){if(!(!this.activeChatId||!this.currentUser))try{await se.sendMessage(this.activeChatId,this.currentUser.uid,this.userProfile.name,e,t)}catch{this.toast.show("Failed to send message.","error")}}async handleSendMedia(e){if(!(!this.activeChatId||!this.currentUser||!e))try{const t=e.type.startsWith("image/");this.toast.show(t?"Compressing and uploading photo...":"Uploading document...","info");const i=await q_.uploadAttachment(e,this.currentUser.uid);await se.sendFileAttachment(this.activeChatId,this.currentUser.uid,this.userProfile.name,i),this.toast.show(t?"Photo sent!":"Document sent!","success")}catch(t){this.toast.show("File upload failed: "+t.message,"error")}}handleTypingChange(e){this.activeChatId&&this.currentUser&&se.setTypingStatus(this.activeChatId,this.currentUser.uid,e)}async handleToggleReaction(e,t){if(!(!this.activeChatId||!this.currentUser))try{await se.toggleReaction(this.activeChatId,e,this.currentUser.uid,t)}catch(i){console.error(i)}}async handleDeleteMessage(e){if(this.activeChatId)try{await se.deleteMessage(this.activeChatId,e),this.toast.show("Message deleted.","info")}catch{this.toast.show("Could not delete message.","error")}}showDeleteChatConfirmation(){this.dom.confirmDialogModal?.showModal?this.dom.confirmDialogModal.showModal():this.dom.confirmDialogModal&&(this.dom.confirmDialogModal.style.display="flex")}async handleConfirmDeleteChat(){if(this.dom.confirmDialogModal?.close&&this.dom.confirmDialogModal.close(),!!this.activeChatId)try{await se.deleteChatHistory(this.activeChatId),this.toast.show("Chat history deleted.","info"),this.showWelcomeView()}catch{this.toast.show("Failed to delete chat history.","error")}}}window.addEventListener("DOMContentLoaded",()=>{window.whisprApp=new iv});
//# sourceMappingURL=index-uUM_LFKh.js.map
