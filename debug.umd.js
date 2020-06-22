!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n=n||self).F=t()}(this,(function(){"use strict";function mash(n,t){return Object.assign({},n,t)}function memoizeWith(n){return function memoize(t){const e={};return function memoized(){const r=Array.from(arguments),o=n(r);return o&&e[o]||(e[o]=t.apply(null,r)),e[o]}}}function defaultMemoizer(n){let[t,e]=n;return t.concat(e).map(n=>"symbol"==typeof n?function symbolToString(n){return""+n.toString()}(n):n&&"object"==typeof n?Object.entries(n).reduce((n,[t,e])=>n+"-"+t+":"+e,""):n)}function makeTypechecker(n,t=defaultMemoizer){return memoizeWith(t)((function rawMakeTypeChecker(t,e){if(!Array.isArray(t)||!Array.isArray(t))throw new TypeError("makeTypechecker needs two valid lists of types to run");const r=t[t.length-1],o=t.slice(0,t.length-1);return o.slice(0,e.length).map((function typeCheckParam(t,r){const o=n(e[r]),c=a(o,t);return{idx:r,raw:Object.freeze({value:e[r]}),actual:o,expected:t,success:c}})).reduce((function typeCheckOutcomes(n,t){const e=t.success?"valid":"invalid",r=mash(n,{[e]:n[e].concat([t]),rawParams:n.rawParams.concat([t])});return mash(r,{failures:n.failures||r.invalid.length>0})}),{rawParams:[],invalid:[],valid:[],signature:t.join(" -> "),params:o,returnType:r,given:e})}))}function checkParamsWith(n){return function checkParams(t,e){return!makeTypechecker(n)(t,e).failures}}function checkReturnWith(n){return function checkReturn(t){return function checkReturnTypeValidoutcomeAB(e,r){const o=n(t),c=makeTypechecker(n)(e,r).returnType;return a(c,o)}}}function system(n){let t=n&&n.constructor&&n.constructor.name||"Global",e=typeof n;return n||("string"===e?t="String":"undefined"===e||"object"===e?e="nil":t="Boolean"),`${t}${f}${e}`}function toString(n,t=[]){return function functionToString(e){return e?n:`curry(${n})${t.length>0?`(${t.join(",")})`:""}`}}function hmError(n,t,e){return`Given ${n}( ${t&&t.join(", ")} ) but expected ${n}( ${e.map(n=>Array.isArray(n)?n.join("|"):n).slice(0,t.length).join(", ")} )`}function DEFAULT_PLACEHOLDER_TEST(n){return n===p}function fabricate(n){const{test:t=DEFAULT_PLACEHOLDER_TEST}=n,e=function defineFunctionWithParameterTest(n){return function funcfunc({ts:t=system,n:e,hm:r,check:o}){if(o){if("function"!=typeof t)throw new TypeError("Expected typeSystem to be a function.");if(!r||!Array.isArray(r))throw new TypeError("Expected hm to be an array of strings.")}return function currified(c){function curried(){function saucy(){const t=Array.from(arguments);return curried.apply(this,a(n,t))}const n=Array.from(arguments),s=r&&Array.isArray(r)?r.length-1:e&&"number"==typeof e?e:c.length,l=f(n)?i(n):n.length;if(saucy.toString=toString(u,n),saucy.hm=r,l>=s){const e=c.apply(this,n);if(o){const o=makeTypechecker(t)(r,n);if(!checkParamsWith(t)(r,n)){const{rawParams:n,params:t}=o;throw new TypeError(hmError(u,n.map(n=>n.actual),t.map(m)))}if(!checkReturnWith(t)(e)(r,n)){const{returnType:n}=o;throw new TypeError(`Expected ${u} to return ${m(n)} but got ${system(e)}.`)}}return e}return saucy}const u=c&&void 0!==c.hm?c.toString(!0):c.name?c.name:"fn",i=function testCurryGaps(n){return function testCurryCapsByTaste(t){return t.reduce((function doesCurryTasteGood(t,e){return n(e)?t:t+1}),0)}}(n),a=function makeParamMerger(n){return function compareParams(t,e){return t.map((function testGaps(t){return n(t)&&e[0]?e.shift():t})).concat(e)}}(n),f=function some(n){return function someInList(t){return t.some(n)}}(n);return curried.toString=toString(u),curried.hm=r,curried}}}(t),r=e(mash(n,{n:!1,check:!1})),o=r((function _curryN(t,r){return e(mash(n,{n:t,check:!1}))(r)}));return{def:e,curry:r,curryN:o}}function ofConstructor(n){return function ofConstructorsAndMagic(t){return t&&t.constructor===n||t instanceof n}}function isUnmatched(n){return n===w}function pipe(){const n=Array.from(arguments),t=n.filter(n=>"function"!=typeof n);if(0!==t.length)throw new TypeError("Expected to receive functions as arguments, but received: "+t.map((n,t)=>`[${t}] = ${n}`).join(" ; "));return function piped(t){const e=n.length;let r=0,o=t;for(;r<e;){o=(0,n[r])(o),r+=1}return o}}function makeAliases(n){return n.weld(n,{I:n.identity,K:n.constant,PLACEHOLDER:n.$,__:n.$,always:n.constant,entries:n.toPairs,every:n.all,fromEntries:n.fromPairs,merge:n.mash,mergeAll:n.smash,mergeRight:n.jam,sideEffect2:n.binarySideEffect,some:n.any,sortBy:n.sort,tap:n.sideEffect,head:n.first,of:n.box})}function length(n){return n&&"object"==typeof n?Object.keys(n).length:n.length}function makeIterable(n){const t=Array.isArray(n);if(!t&&!(n&&"object"==typeof n))throw new TypeError("Expected iterable initial value to be either an array or an object.");const e=length(n),r=t?Array(e):{},o=!t&&Object.keys(n);return{length:e,iterate:function iterate(e){const r=t?e:o[e];return{key:r,value:n[r]}},init:r,isArray:t}}function extendDerived(n){return n.reduce((function extendFUtility(t,[e,r,o]){const c=r(t);if(!e.includes("__")){const r=n.def({check:!0,hm:o})(c);return t.mash(t,{[e]:r})}return t.mash(t,c)}),n,ut)}function extendBinaryWithSignatures(n){return n.weld(n,it.reduce((t,[e,r])=>n.mash(t,{[r.name]:n.def({n:2,check:!0,hm:e})(r)}),{}))}function extendTernaryWithSignatures(n){return n.weld(n,at.reduce((t,[e,r])=>n.mash(t,{[r.name]:n.def({n:3,check:!0,hm:e})(r)}),{}))}function extendQuaternaryWithSignatures(n){return n.weld(n,ft.reduce((t,[e,r])=>n.mash(t,{[r.name]:n.def({n:4,check:!0,hm:e})(r)}),{}))}function coreWithTypes(e){return pipe(fabricate,(function basicDefinitions({def:e,curry:r,curryN:o}){const c=function makeSignedCore(n){return Pn.reduce((function petition(e,[r,o]){return t(e,{["regexTest"===o.name?"test":o.name]:n({hm:r,check:!0})(o)})}),Sn)}(e),u=function makeSideEffectsFromEnvWithTypes(n){const t=n({check:!0,hm:["function","any","any"]})((function _sideEffect(n,t){return n(t),t})),e=n({check:!0,hm:["function","any","any","any"]})((function _binarySideEffect(n,t,e){return n(t,e),e})),r=e(console.log);return{sideEffect:t,binarySideEffect:e,trace:r,inspect:n({check:!0,hm:["function","function","any","any","any"]})((function _inspect(n,t,e,r){return n(e,t(r)),r}))}}(e),i=function autoCurryUsing(n){return function autoCurry(t){return Object.keys(t).map((function wrapCurry(e){const r=t[e];return[e,"function"==typeof r&&r.length?n(r.length,r):r]})).reduce((n,[t,e])=>Object.assign({},n,{[t]:e}),{})}}(o),a=c.smash([i(c),u,{memoizeWith:memoizeWith,def:e,curry:r,curryN:o,C:n,$:n.$,is:ofConstructor,isArray:x,isBoolean:I,isFunction:v,isNumber:O,isRawObject:N,isString:E,isSymbol:_,isUndefined:k,isUnmatched:isUnmatched}]);return a.pipe(extendBinaryWithSignatures,i,extendTernaryWithSignatures,i,extendQuaternaryWithSignatures,i,extendDerived,makeAliases)(a)}))(e)}const n=Object.freeze({$:"@@FUTILITY::constant.magic",UNMATCHED:"@@FUTILITY::constant.unmatched",b:"\b",f:"\f",n:"\n",t:"\t",r:"\r",q:"'",qq:'"',s:"\\",__of__:"∋",UNION_TYPE_DELIMITER:"|"}),t=mash,e=memoizeWith,r=memoizeWith((function basicMemo(n){return n}))((function unionType(n){return n.split("|")})),{__of__:o}=n,c=memoizeWith(n=>n)(n=>{const t=n.indexOf(o);return t>-1?n.slice(0,t):n}),{__of__:u}=n,i=memoizeWith(n=>n)(n=>{const t=n.indexOf(u);return t>-1?n.slice(t+1):n}),a=memoizeWith(n=>n)((function _compareTypes(n,t){const[e,o]=[n,t].map(r),u=e.length>1,a=o.length>1,f=e.map(n=>o.map(t=>"any"===n||"any"===t||n===t||c(n)===c(t)||i(n)===i(t))),s=f.reduce((n,t)=>n.concat(0===t.filter(n=>!n).length),[]).filter(Boolean);if(!u&&!a)return s.length>0;return f.reduce((n,t)=>n.concat(t),[]).reduce((n,t)=>n||t,!1)})),{__of__:f}=n,s=Object.freeze({string:"String∋string",number:"Number∋number",boolean:"Boolean∋boolean",function:"Function∋function",object:"Object∋object",undefined:"Global∋nil",symbol:"Symbol∋symbol",nil:"Global∋nil"}),{UNION_TYPE_DELIMITER:l,__of__:y}=n,m=function unionArchetype(n){return function arch(t){if(t&&t.indexOf&&t.indexOf(l)>-1&&n)return t.split(l).map(n=>unionArchetype(!1)(n));const e=s[t];return e||(t[0].toUpperCase()===t[0]?`${t}${y}object`:t)}}(!0),{$:p}=n;fabricate(DEFAULT_PLACEHOLDER_TEST);const[b,h,d,g,A,j]=[String,Number,Function,Boolean,Symbol,Object].map(ofConstructor),k=function ofType(n){return function compareTypeofs(t){return typeof t===n}}("undefined"),E=b,O=h,v=d,I=g,_=A,N=j,x=Array.isArray,{UNMATCHED:w}=n,S=pipe,C=function compose(){return pipe.apply(null,Array.from(arguments).reverse())},P=function drop(n,t){return t&&v(t.drop)?t.drop(n):t.slice(n,1/0)},L=function dropLast(n,t){return t&&v(t.dropLast)?t.dropLast(n):t.slice(0,t.length-n)},W=Object.freeze({"String∋string":"","Array∋object":[],"Object∋object":{}}),U=function empty(n){if(n&&v(n.empty))return n.empty();const t=system(n),e=W[t];return void 0!==e?e:void 0},D=length,B=function invert(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:o}=t.iterate(r),c=e[o]||!1,u=Array.isArray(c);e[o]=c&&u?c.concat(n):c&&!u?[c,n]:n,r+=1}return e},$=function invertObj(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:o}=t.iterate(r);e[o]=n,r+=1}return e},q=function juxt(n){return function juxtapose(){const t=Array.from(arguments);let e=0;const r=makeIterable(n),o=[];for(;e<r.length;){const{value:n}=r.iterate(e),c=t.slice(1,1/0).reduce((t,e)=>[n.apply(null,t.concat(e))],[t[0]])[0];o.push(c),e+=1}return o}},z=function keysIn(n){const t=[];for(let e in n)t.push(e);return t},R=function move(n,t,e){function outOfBounds(n){return n<0||n>=r}const r=e.length,o=e.slice(),[c,u]=[n,t].map((function wrap(n){return n<0?r+n:n})),i=o.splice(c,1);return outOfBounds(c)||outOfBounds(u)?e:[].concat(o.slice(0,u)).concat(i).concat(o.slice(u,e.length))},M=function negate(n){return-n},H=function nthArg(n){return function grabNth(){return arguments[n]}},Y=function objOf(n,t){return{[n]:t}},G=function once(n){let t,e=!1;return function oneTime(){return e||(t=n.apply(null,arguments),e=!0),t}},K=function pair(n,t){return[n,t]},J=function partial(n,t){return function partiallyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e))}},V=function partialRight(n,t){return function partialRightlyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e).reverse())}},Q=function repeat(n,t){return t.repeat(n)},X=function splitAt(n,t){return[t.slice(0,n),t.slice(n,1/0)]},Z=function sum(n){return n.reduce((function adding(n,t){return n+t}),0)},nn=function product(n){return n.reduce((function multiplying(n,t){return n*t}),1)},tn=function take(n,t){return t&&v(t.take)?t.take(n):t.slice(0,n)},en=function takeLast(n,t){return t&&v(t.takeLast)?t.takeLast(n):t.slice(t.length-n,1/0)},rn=function regexTest(n,t){return n.test(t)},on=function box(n){return[n]},cn=function dissoc(n,t){const e=Object.assign({},t);return delete e[n],e},un=function assoc(n,t,e){return Object.assign({},e,{[n]:t})},an=function init(n){return n.slice(0,-1)},fn=function tail(n){return n.slice(1)},sn=function append(n,t){const e=[].concat(t);return e.splice(e.length,0,n),e},ln=function prepend(n,t){const e=[].concat(t);return e.splice(0,0,n),e},yn=function adjust(n,t,e){const r=[].concat(e),o=n<0?r.length+n:n;return r[o]=t(r[o]),r},mn=function update(n,t,e){const r=[].concat(e);return r[n<0?r.length+n:n]=t,r},pn=function inc(n){return n+1},bn=function dec(n){return n-1},hn=function call(n){return n[0].apply(null,n.slice(1))},dn=function mode(n){const t={};let e=0,r=-1,o=-1;for(;e<n.length;){const r=n[e];t[r]||(t[r]=0),t[r]+=1,e+=1}e=0;const c=Object.keys(t);for(;e<c.length;){const n=t[c[e]];n>r&&(r=n,o=c[e]),e+=1}const u=parseInt(o);return isNaN(u)?o:u},gn=function complement(n){return function subtleComplement(){const t=Array.from(arguments);return!n.apply(null,t)}},An=function constant(n){return function forever(){return n}},jn=function F(){return!0},kn=function first(n){return n[0]},En=function fromPairs(n){return n.reduce((function pairing(n,[t,e]){return Object.assign({},n,{[t]:e})}),{})},On=function identity(n){return n},vn=function jam(n,t){return Object.assign({},t,n)},Tn=function last(n){return n[n.length-1]},In=Array.isArray,_n=Object.keys,Nn=Object.values,xn=Object.freeze,wn=Math.round;var Sn=Object.freeze({__proto__:null,isArray:In,keys:_n,values:Nn,freeze:xn,round:wn,trim:function trim(n){return n.trim()}});const Cn=function not(n){return!n},Pn=[[["boolean"],jn],[["boolean"],function T(){return!0}],[["number","function","Array","Array"],yn],[["any","Array","Array"],sn],[["any","string|number","object","object"],un],[["any","Array"],on],[["Array","any"],hn],[["function","function"],gn],[["any","any"],C],[["any","function"],An],[["number","number"],bn],[["string|number","object","object"],cn],[["number","Array|object","any"],L],[["number","Array|object","any"],P],[["any","any"],U],[["Array","any"],kn],[["Array","object"],En],[["any","any"],On],[["number","number"],pn],[["Array","Array"],an],[["object","object"],$],[["object","object"],B],[["object","object","object"],vn],[["Array","function"],q],[["object","Array"],z],[["Array","any"],Tn],[["any","number|nil"],D],[["object","object","object"],t],[["Array","number"],function mean(n){let t=0,e=0;for(;t<n.length;)e+=n[t],t+=1;return e/n.length}],[["function","function"],e],[["Array","any"],dn],[["number","number","Array","Array"],R],[["number","number"],M],[["any","boolean"],Cn],[["number","function"],H],[["string|symbol|number","any","object"],Y],[["function","function"],G],[["any","any","Array"],K],[["any","Array","function"],V],[["any","any","function"],J],[["any","any"],S],[["any","Array","Array"],ln],[["number","Object|string","Object|string"],Q],[["Array","Array"],function reverse(n){const t=makeIterable(n);let e=t.length;const r=t.init;for(;e>-1;){const{value:n}=t.iterate(e);r[t.length-1-e]=n,e-=1}return r}],[["Array","object"],function smash(n){return n.reduce((n,t)=>Object.assign({},n,t),{})}],[["number","Array|string","Array|string"],X],[["Array","number"],Z],[["Array","number"],nn],[["Array","Array"],fn],[["number","object|string","object|string"],en],[["number","object|string","object|string"],tn],[["object","object","object"],function weld(n,t){return Object.freeze(Object.assign({},n,t))}],[["RegExp","string","boolean"],rn],[["string","string"],function toLower(n){return n.toLowerCase()}],[["object","Array"],function toPairs(n){return Object.keys(n).map((function enpair(t){return[t,n[t]]}))}],[["string","string"],function toUpper(n){return n.toUpperCase()}],[["number","any","Array","Array"],mn]],Ln=function makeEqProps({curryN:n,pipe:t,map:e,prop:r,equals:o}){return n(Wn,(function eqProps(n,c,u){return t(e(r(n)),([n,t])=>o(n,t))([c,u])}))},Wn=3,Un=function makeGroupBy({reduce:n,mash:t,objOf:e,curryN:r}){return r(Dn,(function groupBy(r,o){return n((function groupingBy(n,o){const c=t({},n),u=r(o);if(c[u])return c[u]=c[u].concat(o),c;const i=e(u,[o]);return t(c,i)}),{})(o)}))},Dn=2,Fn=function makeIntersection({uniq:n,concat:t,curryN:e}){return e(Bn,(function intersection(e,r){return n(t(e,r))}))},Bn=2,$n=function makeOmit({curryN:n,pickBy:t,includes:e}){return n(qn,(function omit(n,r){return t((t,r)=>!e(r,n),r)}))},qn=2,zn=function makePick({pickBy:n,includes:t,curryN:e}){return e(Rn,(function pick(e,r){return n((n,r)=>t(r,e),r)}))},Rn=2,Mn=function makeProps({pipe:n,ap:t,prop:e,box:r,map:o,curryN:c}){return c(Hn,(function props(c,u){return n(r,t(o(e,c)))(u)}))},Hn=2,Yn=function makeChain({curryN:n,map:t,pipe:e,reduce:r,concat:o}){return n(Gn,(function chain(n,c){return c&&"function"==typeof c.chain?c.chain(n):"function"==typeof c?t=>n(c(t),t):e(t(n),r(o,[]))(c)}))},Gn=2,Kn=function makePluck({curryN:n,map:t,prop:e}){return n(Jn,(function pluck(n,r){return t(e(n),r)}))},Jn=2,Vn=function makeDifference({curryN:n,filter:t,flip:e,includes:r,complement:o}){return n(Qn,(function difference(n,c){return t(o(e(r)(c)),n)}))},Qn=2,Xn=function makePathOr({curryN:n,reduce:t}){return n(Zn,(function pathOr(n,e,r){return t((function walkPathOr(t,e){return t&&t[e]||n}),r,e)}))},Zn=3,nt=function makeReject({curryN:n,filter:t,complement:e}){return n(tt,(function reject(n,r){return t(e(n),r)}))},tt=2,et=function makeSymmetricDifference({curryN:n}){return n(rt,(function symmetricDifference(n,t){const e=makeIterable(n),r=makeIterable(t),o=[];let c=0;for(;c<e.length;){const{value:n}=e.iterate(c);t.includes(n)||o.push(n),c+=1}let u=0;for(;u<r.length;){const{value:t}=r.iterate(u);n.includes(t)||o.push(t),u+=1}return o}))},rt=2,ot=function makeUnion({uniq:n,curryN:t,pipe:e,concat:r}){return t(ct,(function union(t,o){return e(r(o),n)(t)}))},ct=2,ut=[["smooth",function makeSmooth({filter:n}){return function smooth(t){return n(Boolean,t)}},["object","any"]],["j2",function makeJ2({toJSON:n}){return n(2)},["any","string"]],["addIndex",function makeAddIndex({curryN:n}){return function addIndex(t){return n(t.length,(function indexAddedIter(){let n=0;const e=[].slice.call(arguments,0),[r]=e,o=e[e.length-1];return e[0]=function indexAdded(){const t=r.apply(this,[].concat([].slice.call(arguments,0)).concat([n,o]));return n+=1,t},t.apply(this,e)}))}},["function","function"]],["pick",zn,["Array","object","object"]],["bind",function makeBind({curryN:n}){return n(2,(function bind(t,e){function bound(){return t.apply(e,arguments)}return t.length>1?n(t.length,bound):bound}))},["function","object","function"]],["flip",function makeFlip({curryN:n}){return function flip(t){return n(2,(function flipped(n,e){return t(e,n)}))}},["function","function"]],["liftN",function makeLiftN({curryN:n,reduce:t,ap:e,map:r}){return n(2,(function liftN(o,c){const u=n(o,c);return n(o,(function liftedN(){return t(e,r(u,arguments[0]),Array.prototype.slice.call(arguments,1))}))}))},["number","function","function"]],["lift",function makeLift({liftN:n}){return function lift(t){return n(t.length,t)}},["function","function"]],["thunkify",function makeThunkify({curryN:n}){return function thunkify(t){return n(t.length,(function think(){const n=arguments;return function thank(){return t.apply(this,n)}}))}},["function","function"]],["groupBy",Un,["function","Array","object"]],["isEmpty",function makeIsEmpty({equals:n,empty:t,isArray:e,isRawObject:r,keys:o,length:c,pipe:u}){return function isEmpty(i){const a=t(i);return void 0!==a&&(e(i)?0===i.length:r(i)?0===u(o,c)(i):n(a,i))}},["any","boolean"]],["__ifElse",function makeIfElseDerivatives({ifElse:n,identity:t,$:e}){return{when:n(e,e,t),unless:n(e,t)}},!1],["flatten",function makeFlatten({isArray:n,forEach:t}){return function flatten(e){let r=0;const o=makeIterable(e);let c=[];for(;r<o.length;){let{value:e}=o.iterate(r);n(e)?(e=flatten(e),t(n=>c.push(n),e)):c.push(e),r+=1}return c}},["Array","Array"]],["chain",Yn,["function","function|Array|object","function|Array"]],["reject",nt,["function","object","object"]],["omit",$n,["Array","object","object"]],["uniq",function makeUniq({reduce:n}){return n((function unique(n,t){return n.includes(t)?n:n.concat(t)}),[])},["Array","Array"]],["intersection",Fn,["Array","Array","Array"]],["median",function makeMedian({$:n,dec:t,pipe:e,length:r,nth:o,sort:c,divide:u}){return e(c((n,t)=>n-t),c=>e(r,t,u(2),Math.round,o(n,c))(c))},["Array","number"]],["isObject",function makeIsObject({both:n,isRawObject:t}){return function isObject(e){return n(t,Boolean)(e)}},["any","boolean"]],["union",ot,["Array","Array","Array"]],["difference",Vn,["Array","Array","Array"]],["symmetricDifference",et,["Array","Array","Array"]],["__predicatesPass",function makePredicatesPass({def:n,pipe:t,map:e,flip:r,any:o,all:c,smooth:u,length:i,gt:a}){function predFor(o){return n({check:!0,hm:["Array","Array","boolean"]})((function predPass(n,c){return t(e(r(o)(c)),u,i,a(0))(n)}))}return{anyPass:predFor(o),allPass:predFor(c)}},!1],["pathOr",Xn,["any","Array","Array|object","any"]],["__pathOrDerivatives",function makePathOrDerivatives({equals:t,is:e,def:r,pipe:o,pathOr:c,isUnmatched:u,complement:i}){function deriveFromAccessor(c){const a=c(n.UNMATCHED);return{hasAcc:r({check:!0,hm:["Array|string","object","boolean"]})((function hasProperty(n,t){return o(a(n),i(u))(t)})),accIs:r({check:!0,hm:["function","Array|string","object","boolean"]})((function pathIsOfConstructor(n,t,r){return o(a(t),e(n))(r)})),unsafe:c(null),eq:r({check:!0,hm:["Array|string","any","object","boolean"]})((function equivalence(n,e,r){return o(a(n),t(e))(r)})),satisfies:r({check:!0,hm:["function","Array|string","object","boolean"]})((function satisfaction(n,t,e){return o(a(t),n,Boolean)(e)}))}}const{hasAcc:a,unsafe:f,eq:s,satisfies:l,accIs:y}=deriveFromAccessor(c),m=r({check:!0,hm:["any","number|string","object","any"]})((function _propOr(n,t,e){return c(n,[t],e)})),{hasAcc:p,unsafe:b,eq:h,satisfies:d,accIs:g}=deriveFromAccessor(m);return{hasProp:p,hasPath:a,path:f,pathEq:s,pathSatisfies:l,pathIs:y,propOr:m,prop:b,propEq:h,propSatisfies:d,propIs:g}},!1],["props",Mn,["Array","object","Array"]],["eqProps",Ln,["string","object","object","boolean"]],["pluck",Kn,["string","Array|object","Array|object"]],["applySpecN",function makeApplySpecN({isFunction:n,keys:t,curryN:e,apply:r}){function mapper(n,e){return t(e).reduce((t,r)=>(t[r]=n(e[r]),t),{})}return e(2,(function applySpecN(t,o){const c=mapper(e=>n(e)?e:applySpecN(t,e),o);return e(t,(function specificationApplication(){const n=Array.from(arguments);return mapper(t=>r(t,n),c)}))}))},["number","object","function"]]],it=[[["number","number","number"],function add(n,t){return t+n}],[["function","Array|object","boolean"],function all(n,t){let e=0;const r=makeIterable(t);let o=!0;for(;e<r.length&&o;){const{value:t}=r.iterate(e);n(t)||(o=!1),e+=1}return o}],[["any","any","boolean"],function and(n,t){return n&&t}],[["function","object","boolean"],function any(n,t){let e=0,r=!1;const o=length(t);for(;e<o&&!r;)n(t[e])&&(r=!0),e+=1;return r}],[["function|Array","function|Array","function|Array"],function ap(n,t){if(v(n)&&v(t))return function sCombinator(e){return n(e,t(e))};if(!x(n)||!x(t))throw new TypeError("Expected to receive an array of functions and an array of values.");if(!n.length||n.filter(v).length!==n.length)throw new TypeError("Expected to receive an array of functions to apply.");return n.reduce((function apReduce(n,e){return n.concat(t.map(n=>e(n)))}),[])}],[["function","Array","any"],function apply(n,t){return n.apply(null,t)}],[["any","function","any"],function applyTo(n,t){return t(n)}],[["any","any","Array|String"],function concat(n,t){return n.concat(t)}],[["Array","any","any"],function cond(n,t){let e,r=0,o=!1;const c=length(n);for(;r<c&&!o;){const[c,u]=n[r];c(t)&&(o=!0,e=u(t)),r+=1}return e}],[["number","number","number"],function divide(n,t){return t/n}],[["object|string","object|string","boolean"],function endsWith(n,t){return t&&v(t.endsWith)?t.endsWith(n):t[t.length-1]===n}],[["any","any","boolean"],function equals(n,t){return n&&v(n.equals)?n.equals(t):n===t}],[["function","object","object"],function filter(n,t){let e=0;const r=makeIterable(t),{length:o,isArray:c}=r,u=c?[]:{};for(;e<o;){const{key:t,value:o}=r.iterate(e);n(o)&&(c?u.push(o):u[t]=o),e+=1}return u}],[["function","object","any"],function find(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return t;e+=1}}],[["function","object","any|nil"],function findLast(n,t){const e=makeIterable(t);let r=e.length-1;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return t;r-=1}}],[["function","object","any"],function findIndex(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return e;e+=1}return-1}],[["function","object","any"],function findLastIndex(n,t){const e=makeIterable(t);let r=e.length;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return r;r-=1}return-1}],[["function","object","nil"],function forEach(n,t){let e=0;const r=makeIterable(t),{length:o}=r;for(;e<o;){const{value:t}=r.iterate(e);n(t),e+=1}}],[["number","number","boolean"],function gt(n,t){return t>n}],[["number","number","boolean"],function gte(n,t){return t>=n}],[["string","object","boolean"],function hasIn(n,t){return n in t}],[["string","object","boolean"],function has(n,t){return t&&void 0!==t[n]}],[["any","any","boolean"],function identical(n,t){return Object.is(n,t)}],[["object|string","object|string","boolean"],function includes(n,t){return t&&v(t.includes)?t.includes(n):!(!t||!v(t.indexOf))&&t.indexOf(n)>-1}],[["any","string|object","number"],function indexOf(n,t){return t.indexOf(n)}],[["string","Array","string"],function join(n,t){return t.join(n)}],[["any","string|object","number"],function lastIndexOf(n,t){return t.lastIndexOf(n)}],[["number","number","boolean"],function lt(n,t){return t<n}],[["number","number","boolean"],function lte(n,t){return t<=n}],[["function","object","object"],function map(n,t){let e=0;const r=makeIterable(t),{length:o,init:c}=r,u=c;for(;e<o;){const{key:t,value:o}=r.iterate(e);u[t]=n(o),e+=1}return u}],[["RegExp","string","Array|nil"],function match(n,t){return t.match(n)}],[["number","number"],function max(n,t){return Math.max(n,t)}],[["number","number"],function min(n,t){return Math.min(n,t)}],[["number","number","number"],function multiply(n,t){return t*n}],[["function","Array|object","boolean"],function none(n,t){let e=0;const r=makeIterable(t);let o=!0;for(;e<r.length&&o;){const{value:t}=r.iterate(e);n(t)||(o=!1),e+=1}return o}],[["number","Array","any"],function nth(n,t){return n<0&&t.length+n?t[t.length+n]:t[n]}],[["any","any","boolean"],function or(n,t){return n||t}],[["function","object","object"],function pickBy(n,t){const e=makeIterable(t),r=e.init;let o=0;for(;o<e.length;){const{key:t,value:c}=e.iterate(o);n(c,t)&&(r[t]=c),o+=1}return r}],[["number","number","Array"],function range(n,t){const e=[],r=t<n;for(let o=n;r?o>=t:o<=t;r?o--:o++)e.push(o);return e}],[["function","Array","Array"],function sort(n,t){const e=[].concat(t);return e.sort(n),e}],[["string","string","Array"],function split(n,t){return t.split(n)}],[["object|string","object|string","boolean"],function startsWith(n,t){return t&&v(t.startsWith)?t.startsWith(n):t[0]===n}],[["number","number","number"],function subtract(n,t){return t-n}],[["number","any","string"],function toJSON(n,t){return JSON.stringify(t,null,n)}]],at=[[["function","function","any","boolean"],function both(n,t,e){return n(e)&&t(e)}],[["function","function","any"],function either(n,t,e){return n(e)||t(e)}],[["function","any","any","boolean"],function eqBy(n,t,e){return Boolean(n(t,e))}],[["function","Array","Array","Array"],function innerJoin(n,t,e){const r=makeIterable(t),o=[],c=makeIterable(e);let u=0;for(;u<r.length;){const{value:t}=r.iterate(u);let e=0;for(;e<c.length;){const{value:r}=c.iterate(e);n(t,r)&&o.push(t),e+=1}u+=1}return o}],[["number","any","Array","Array"],function insert(n,t,e){const r=[].concat(e);return r.splice(n,0,t),r}],[["number","any","Array","Array"],function insertAll(n,t,e){return[].concat(e.slice(0,n),t,e.slice(n,1/0))}],[["function","any","object","any"],function reduce(n,t,e){const r=makeIterable(e);let o=0;const{length:c}=r;let u=t;for(;o<c;){const{value:t}=r.iterate(o);u=n(u,t),o+=1}return u}],[["RegExp|string","string","string","string"],function replace(n,t,e){return e.replace(n,t)}],[["number","number","object","object"],function slice(n,t,e){return e.slice(n,t)}]],ft=[[["function","function","function","any","any"],function ifElse(n,t,e,r){return n(r)?t(r):e(r)}]],st=Object.freeze({UNCHECKED:{name:"@@FUTILITY::config.unchecked",ts:()=>"any",check:!1},CHECKED:{name:"@@FUTILITY::config.checked",ts:system,check:!0},AUTO:{name:"@@FUTILITY::config.auto",ts:system,check:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.NODE_ENV&&"production"!==process.env.NODE_ENV||"undefined"!=typeof window&&"boolean"==typeof window.__FUTILITY_TYPE_CHECK&&window.__FUTILITY_TYPE_CHECK}}),yt=coreWithTypes(st.CHECKED);return yt.weld(yt,{custom:coreWithTypes,version:"4.0.0",configuration:st.CHECKED})}));
