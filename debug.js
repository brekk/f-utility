(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.FUTILITYDEBUG = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var flatmapFast = createCommonjsModule(function (module) {
var flatten = function (a) {
  return a.reduce(function (x, y) {
    return x.concat(y);
  });
};
var flatMap = function (a                 , f               ) {
  return (!f) ? flatten(a) : flatten(a.map(f));
};
module.exports = flatMap;
});

var bindInternal4 = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

var reduce$2 = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;
  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }
  return result;
};

var reduce$4 = function fastReduceObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;
  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  }
  else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }
  return result;
};

var reduce$1 = function fastReduce (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduce$2(subject, fn, initialValue, thisContext);
  }
  else {
    return reduce$4(subject, fn, initialValue, thisContext);
  }
};

var bindInternal3 = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

var filter$2 = function fastFilter (subject, fn, thisContext) {
  var length = subject.length,
      result = [],
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      result.push(subject[i]);
    }
  }
  return result;
};

var filter$4 = function fastFilterObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      result = {},
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i, key;
  for (i = 0; i < length; i++) {
    key = keys[i];
    if (iterator(subject[key], key, subject)) {
      result[key] = subject[key];
    }
  }
  return result;
};

var filter$1 = function fastFilter (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return filter$2(subject, fn, thisContext);
  }
  else {
    return filter$4(subject, fn, thisContext);
  }
};

var some$1 = function fastSome (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      return true;
    }
  }
  return false;
};

var every$1 = function fastEvery (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    if (!iterator(subject[i], i, subject)) {
      return false;
    }
  }
  return true;
};

var entrust$1 = createCommonjsModule(function (module, exports) {
(function(a,b){b(exports);})(commonjsGlobal,function(a){function b(b,c,e,a){if(b!==e.length){ throw new Error(c+' expects total args ('+e.length+') to equal the given arity ('+b+')'); }return I(b,c,e,a)}var e=function(a){return function(b){for(var c=a[0],d=a.slice(1),e=c(b),f=0;f<d.length;f++){ e=d[f](e); }return e}},g=function(c,d){return function(e,f,a){return c.call(d,e,f,a)}},i=function(h,a,b){var c,d=h.length,e=void 0===b?a:g(a,b);for(c=0;c<d;c++){ if(e(h[c],c,h)){ return!0; } }return!1},c=function(j){var k=function(b){return b==='\uD83C\uDF5B'};return function b(){for(var a=arguments,c=arguments.length,l=Array(c),d=0;d<c;++d){ l[d]=a[d]; }var e=i(l,k)?function(b){for(var a=b.length;!k(b[a]);){ a--; }return a}(l):l.length;return e>=j.length?j.apply(this,l):function(){for(var c=arguments,a=arguments.length,d=Array(a),e=0;e<a;++e){ d[e]=c[e]; }return b.apply(this,l.map(function(b){return k(b)&&d[0]?d.shift():b}).concat(d))}}},d=c(function(c,a){return a&&c&&a[c]}),f=Object.keys,h=d('length'),j=function(){for(var f=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c){ b[c]=f[c]; }return e(b)}(f,h),k=c(function(d,a,b){return b[d](a)}),l=k('filter'),m=function(a,b){return b[a]()},o=c(m),n=function(b,c,a){return a[b](c)},p=c(n),q=function(c,d,a,b){return b[c](d,a)},r=c(q),s=function(d,e,a,b,c){return c[d](e,a,b)},t=c(s),u=function(e,f,a,b,c,d){return d[e](f,a,b,c)},v=c(u),w=function(f,g,a,b,c,d,e){return e[f](g,a,b,c,d)},x=c(w),y=function(g,h,a,b,c,d,e,f){return f[g](h,a,b,c,d,e)},z=c(y),A=function(h,i,a,b,c,d,e,f,g){return g[h](i,a,b,c,d,e,f)},B=c(A),C=function(i,j,a,b,c,d,e,f,g,h){return h[i](j,a,b,c,d,e,f,g)},D=c(C),E=function(j,k,a,b,c,d,e,f,g,h,i){return i[j](k,a,b,c,d,e,f,g,h)},F=c(E),G=function(k,l,a,b,c,d,e,f,g,h,i,j){return j[k](l,a,b,c,d,e,f,g,h,i)},H=c(G),I=function(a,b,c,d){var e=[b].concat(c,[d]);return[o,p,r,t,v,x,z,B,D,F,H][a].apply(null,e)},J=c(I),K=c(b),L={e0:m,e1:n,e2:q,e3:s,e4:u,e5:w,e6:y,e7:A,e8:C,e9:E,e10:G,eD:b,eN:I};a.raw=L, a.custom=function(a){return Object.keys(L).map(function(b){return c={}, c[b]=a(L[b]), c;var c;}).reduce(function(c,a){return Object.assign({},c,a)},{})}, a.e0=o, a.e1=p, a.e2=r, a.e3=t, a.e4=v, a.e5=x, a.e6=z, a.e7=B, a.e8=D, a.e9=F, a.e10=H, a.eN=J, a.eD=K, Object.defineProperty(a,'__esModule',{value:!0});});
});
unwrapExports(entrust$1);
var entrust_1 = entrust$1.e0;
var entrust_2 = entrust$1.e1;
var entrust_3 = entrust$1.e2;
var entrust_4 = entrust$1.e3;
var entrust_5 = entrust$1.e4;
var entrust_6 = entrust$1.e5;
var entrust_7 = entrust$1.e6;
var entrust_8 = entrust$1.e7;
var entrust_9 = entrust$1.e8;
var entrust_10 = entrust$1.e9;
var entrust_11 = entrust$1.e10;
var entrust_12 = entrust$1.eD;
var entrust_13 = entrust$1.eN;
var entrust_14 = entrust$1.custom;

var debug = createCommonjsModule(function (module, exports) {
(function(a,b){b(exports);})(commonjsGlobal,function(a){function b(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d){ c[d]=a[d]; }return j(c)}var c='\uD83C\uDF5B';var d=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var e=function(a,b,c){var e,f=a.length,g=c===void 0?b:d(b,c);for(e=0;e<f;e++){ if(g(a[e],e,a)){ return!0; } }return!1},f=function(a){var b=function(a){return a===c};return function c(){for(var d=arguments,f=arguments.length,g=Array(f),h=0;h<f;++h){ g[h]=d[h]; }var i=e(g,b)?function(a){for(var c=a.length;!b(a[c]);){ c--; }return c}(g):g.length;return i>=a.length?a.apply(this,g):function(){for(var a=arguments,d=arguments.length,e=Array(d),f=0;f<d;++f){ e[f]=a[f]; }return c.apply(this,g.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}},g=f(function(a,b,c){return c[a](b)}),h=g('filter'),j=function(b){return function(c){for(var d=b[0],e=b.slice(1),f=d(c),g=0;g<e.length;g++){ f=e[g](f); }return f}},i=function(a,b){void 0===a&&(a=[]), void 0===b&&(b='pipe');var c=a.map(function(a){return a&&a.toString&&'function'==typeof a.toString?a.toString():'fn'});return function(){return b+'('+c.join(', ')+')'}},k=Array.prototype.slice,l=function(a){return'function'!=typeof a},m=function(b,a){void 0===a&&(a='pipe');var c=k.call(b);if(0<c.filter(l).length){ throw new Error(a+' expected all arguments to be functions.'); }return c},n=f(function(a,b){return b&&a&&b[a]}),o=Object.assign,p=Object.keys,q=p,r=f(function(c,a){}),s=n('length'),t=b(q,s),u=function(a){return'object'==typeof a?t(a):s(a)},v=f(function(a,b){return a.includes(b)}),w=f(function(a,b){return h(v(a),q(b))}),x=f(function(a,c){return b(w(a),u)(c)}),y=function(a,b){return x(a,b)>=Object.keys(a).length},z=f(function(a,b){}),A=f(function(a,b){return b.join(a)}),B=f(function(a,b){return b.repeat(a)}),C=f(function(a,b){return b.split(a)}),D=f(function(a,b){return b.map(a)}),E=f(function(a,b){return b+a}),F=f(function(a,b){return b-a}),G=f(function(a,b){return 0<b.length?a(b):''}),H=f(function(a,b){return''+a[0]+b+a[1]}),I=H('()'),J=H('{}'),K=A(','),L=G(b(K,I)),M=b(G(b(K,J,I))),N=f(function(a,c){return 0<c?b(B(c),C(''),K,I)(a):''}),O=function(a){for(var b=[];0<a;){ b.push(--a); }return b.reverse()},P=function(a){return b(A(':?,'),E(0<a.length?':?':''))(a)},Q=f(function(a,b){return b.filter(function(b){return!(-1<a.indexOf(b))})}),R=function(a){return a&&a.k&&a.n?a.k:a},S=function(a,c){return void 0===a&&(a=[]), void 0===c&&(c=[]), b(R,Q(c),P,J,I)(a)},T=function(a,b){return void 0===b&&(b=[]), function(){var c=L(b),d=N('?',a.length-b.length),e=a&&a.name||'fn';return'curry('+e+')'+c+d}},U=function(a){return function(){return a++}},V=function(a,c){var d=c.length;return b(F(d),O,D(E(d)),P,J,I)(a)},W=function(a,b,c){var d=M(c),e=S(b,c);return''+a+d+e},X=function(a,c,d){var e=V(c,d);return b(D(U(0)),M,H([a,e]))(d)},Y=function(a,b,c){return void 0===b&&(b=[]), void 0===c&&(c={}), function(){var d=Object.keys(c),e=typeof b,f='curry('+(a&&a.name||'fn')+')';return'number'==e?X(f,b,d):W(f,b,d)}},Z=f(function(a,b){return Object.assign({},a,b)}),$=function(a){var b=Object.freeze({keysAreNotAnArray:function(c){if(!Array.isArray(c)){ throw new TypeError(a+' expected an array of wanted keys.'); }return b},arityIsNotANumber:function(c){if('number'!=typeof c||isNaN(c)){ throw new TypeError(a+' expected to be given a number for arity.'); }return b},noFunctionIsGiven:function(c){if('function'!=typeof c){ throw new TypeError(a+' expected to be given a function to curry.'); }return b}});return b},_=f(function(a,b){function c(d){var e=function(a){return c(Z(d,a))};return e.toString=Y(b,a,d), y(a,d)?b(d):e}return $('curryObjectK').keysAreNotAnArray(a).noFunctionIsGiven(b), c.toString=Y(b,a), c}),aa=function(a,b){var c=Array.from(b);return c.length?c.map(function(b,d){return a.includes(d)?c[a[d]]:b}):c},ba=f(aa),ca=f(function(a,b){}),da=function(a){return function(b){function c(){function d(){var b=Array.from(arguments);return c.apply(this,f.map(function(c){return a(c)&&b[0]?b.shift():c}).concat(b))}var f=Array.from(arguments),g=e(f,a)?function(b){for(var c=b.length;!a(b[c]);){ c--; }return c}(f):f.length;return d.toString=T(b,f), g>=b.length?b.apply(this,f):d}if('function'!=typeof b){ throw new TypeError('Expected to be given a function to curry!'); }return c.toString=T(b), c}},ea=da(function(a){return a===c}),fa=ea(aa),ga=ea(function(a,b){var c=fa(a),d=ea(b);return function(){var a=c(Array.from(arguments));return d.apply(null,a)}});a.pipe=function(){var a=m(arguments),b=j(a);return b.toString=i(a), b}, a.compose=function(){var a=m(arguments,'compose').reverse(),b=j(a);return b.toString=i(a,'compose'), b}, a.curryObjectK=_, a.curryObjectKN=function(a,b){function c(a){var f=function(b){return c(Z(a,b))};return f.toString=Y(b,d,a), y(d,a)||u(a)>=e?b(a):f}var d=a.k,e=a.n;return $('curryObjectKN').keysAreNotAnArray(d).arityIsNotANumber(e).noFunctionIsGiven(b), c.toString=Y(b,d), c}, a.curryObjectN=function(a,b){function c(d){var e=function(a){return c(Z(d,a))};return e.toString=Y(b,a,d), Object.keys(d).length>=a?b(d):e}return $('curryObjectN').arityIsNotANumber(a).noFunctionIsGiven(b), c.toString=Y(b,a), c}, a.curry=ea, a.curryify=da, a.remap=ga, a.remapArray=fa, a.version='debug', a.$=c, a.PLACEHOLDER=c, a.K=function(a){return function(){return a}}, a.I=function(a){return a}, Object.defineProperty(a,'__esModule',{value:!0});});
});
unwrapExports(debug);
var debug_1 = debug.pipe;
var debug_2 = debug.compose;
var debug_3 = debug.$;
var debug_4 = debug.PLACEHOLDER;
var debug_5 = debug.curryify;
var debug_6 = debug.curry;
var debug_7 = debug.curryObjectK;
var debug_8 = debug.curryObjectN;
var debug_9 = debug.curryObjectKN;
var debug_10 = debug.remap;
var debug_11 = debug.remapArray;
var debug_12 = debug.K;
var debug_13 = debug.I;

var PLACEHOLDER$1="\uD83C\uDF5B";
var innerpipe=function(b){return function(c){for(var d=b[0],e=b.slice(1),f=d(c),g=0;g<e.length;g++){ f=e[g](f); }return f}};function pipe$1(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d){ c[d]=a[d]; }return innerpipe(c)}var bindInternal3$3=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var some$1$1=function(a,b,c){var d,e=a.length,f=c===void 0?b:bindInternal3$3(b,c);for(d=0;d<e;d++){ if(f(a[d],d,a)){ return!0; } }return!1}; var curry$1=function(a){var b=function(a){return a===PLACEHOLDER$1};return function c(){for(var d=arguments,e=arguments.length,f=Array(e),g=0;g<e;++g){ f[g]=d[g]; }var h=some$1$1(f,b)?function(a){for(var c=a.length;!b(a[c]);){ c--; }return c}(f):f.length;return h>=a.length?a.apply(this,f):function(){for(var a=arguments,d=arguments.length,e=Array(d),g=0;g<d;++g){ e[g]=a[g]; }return c.apply(this,f.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}}; var prop$1=curry$1(function(a,b){return b&&a&&b[a]}); var _keys=Object.keys; var keys=_keys; var propLength$1=prop$1("length"); var objectLength$1=pipe$1(keys,propLength$1); var delegatee=curry$1(function(a,b,c){return c[a](b)}); var filter$6=delegatee("filter");

var 𝘍isTypeof = function (type, x) { return (type === typeof x); };
var isTypeof$1 = curry$1(
  𝘍isTypeof
);
var isBoolean$1 = isTypeof$1("boolean");
var isNumber$1 = isTypeof$1("number");
var isFunction$1 = isTypeof$1("function");
var isString$1 = isTypeof$1("string");
var isNil = function (x) { return x == null; };
var isObject$1 = isTypeof$1("object");
var isArray = Array.isArray;
var isDistinctObject = function (x) { return !isNil(x) && isObject$1(x) && !isArray(x); };
var isPOJO$1 = isDistinctObject;

var has = function (x, y) { return !!y[x]; };
var isArray$1 = Array.isArray;
var 𝘍willDelegate = function (method, functor) { return (
  has(method, functor) && !isArray$1(functor)
); };
var willDelegate = curry$1(𝘍willDelegate);
var 𝘍delegateFastBinary = function (method, fast, fn, functor) {
  return (
    willDelegate(method, functor) ?
      entrust_2(method, fn, functor) :
      fast(functor, fn)
  )
};
var delegateFastBinary$1 = curry$1(
  𝘍delegateFastBinary
);
var 𝘍delegateFastTertiary = function (method, fast, fn, initial, functor) { return (
  willDelegate(method, functor) ?
    entrust_3(method, fn, initial, functor) :
    fast(functor, fn, initial)
); };
var delegateFastTertiary$1 = curry$1(
  𝘍delegateFastTertiary
);

var reduce$6 = delegateFastTertiary$1("reduce", reduce$1);

var map$3 = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

var map$5 = function fastMapObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      result = {},
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i, key;
  for (i = 0; i < length; i++) {
    key = keys[i];
    result[key] = iterator(subject[key], key, subject);
  }
  return result;
};

var map$2 = function fastMap (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return map$3(subject, fn, thisContext);
  }
  else {
    return map$5(subject, fn, thisContext);
  }
};

var 𝘍map = function (fn, functor) {
  if (functor && !Array.isArray(functor) && functor.map) { return functor.map(fn) }
  return map$2(functor, fn)
};
var map$1 = curry$1(
  𝘍map
);

var 𝘍ap = function (applicative, functor) {
  if (functor && functor.ap && isFunction$1(functor.ap)) { return functor.ap(applicative) }
  if (isFunction$1(functor)) { return function (x) { return (applicative(x)(functor(x))); } }
  return reduce$6(function (agg, f) { return agg.concat(map$1(f, functor)); }, [], applicative)
};

var flip$1 = function (fn) { return curry$1(function (a, b) { return fn(b, a); }); };

var 𝘍triplet = function (cnFn, bFn, aFn, o) { return cnFn(o) ? aFn(o) : bFn(o); };
var triplet$1 = curry$1(𝘍triplet);

var keys$1 = Object.keys;
var 𝘍which = function (compare, fn, o) {
  var arecomp = flip$1(compare);
  return triplet$1(
    Array.isArray,
    arecomp(fn),
    pipe$1(
      keys$1,
      arecomp(function (key) { return fn(o[key], key); })
    ),
    o
  )
};
var which$1 = curry$1(𝘍which);
var some$2 = which$1(some$1);
var every$2 = which$1(every$1);

var 𝘍choice = function (cnFn, b, a) { return cnFn(a, b) ? a : b; };

var 𝘍iterate = function (total, fn) {
  var count = total;
  var agg = [];
  if (typeof fn !== "function" || typeof count !== "number") {
    return agg
  }
  while (count > 0) {
    count--;
    agg.push(fn());
  }
  return agg
};
var iterate$1 = curry$1(𝘍iterate);

var 𝘍range = function (start, end) {
  var agg = [];
  var swap = start < end;
  var ref = (swap ? [start, end] : [end + 1, start + 1]);
  var a = ref[0];
  var b = ref[1];
  for (var x = a; x < b; x++) {
    agg.push(x);
  }
  return (swap ? agg : agg.reverse())
};

var filter$7 = delegateFastBinary$1("filter", filter$1);

var 𝘍reject = function (fn, o) { return filter$7(
  function (x) { return !fn(x); }, o
); };

var 𝘍ternary = function (cn, b, a) { return cn ? a : b; };

var _keys$1 = Object.keys;
var _freeze = Object.freeze;
var _assign$1 = Object.assign;
var keys$2 = _keys$1;

var freeze = _freeze;
var assign$1 = _assign$1;
var 𝘍merge = function (a, b) { return assign$1({}, a, b); };
var merge$2 = curry$1(𝘍merge);
var entries = function (o) { return pipe$1(
  keys$2,
  map$1(function (k) { return ([k, o[k]]); })
)(o); };
var toPairs = entries;
var fromPairs = reduce$6(
  function (agg, ref) {
    var k = ref[0];
    var v = ref[1];
    return merge$2(agg, ( obj = {}, obj[k] = v, obj))
    var obj;
},
  {}
);
var 𝘍pairwise = function (hoc, fn, o) { return pipe$1(
  toPairs,
  hoc(fn)
)(o); };
var pairwise$1 = curry$1(𝘍pairwise);
var 𝘍pairwiseObject = function (hoc, fn, o) { return pipe$1(
  pairwise$1(hoc, fn),
  fromPairs
)(o); };
var pairwiseObject$1 = curry$1(𝘍pairwiseObject);
var mapTuples = pairwiseObject$1(map$1);
var mapTuple = mapTuples;
var 𝘍mapKeys = function (fn, o) { return mapTuples(
  function (ref) {
    var k = ref[0];
    var v = ref[1];
    return ([fn(k), v]);
  },
  o
); };

var invert$1 = function (x) { return !x; };

var trim$1 = entrust_1("trim");
var charAt$1 = entrust_2("charAt");
var codePointAt$1 = entrust_2("codePointAt");
var match$1 = entrust_2("match");
var repeat$1 = entrust_2("repeat");
var search$1 = entrust_2("search");
var split$1 = entrust_2("split");
var endsWithLength = entrust_3("endsWith");
var 𝘍endsWith = function (end, x) { return endsWithLength(end, x.length, x); };

var indexOfFromIndex = entrust_3("indexOf");
var 𝘍indexOf = function (toSearch, x) { return indexOfFromIndex(toSearch, 0, x); };

var lastIndexOfFromIndex = entrust_3("lastIndexOf");
var 𝘍lastIndexOf = function (toSearch, x) { return lastIndexOfFromIndex(toSearch, Infinity, x); };

var padEnd$1 = entrust_3("padEnd");
var padStart$1 = entrust_3("padStart");
var replace$1 = entrust_3("replace");
var startsWithFromPosition = entrust_3("startsWith");
var 𝘍startsWith = function (toSearch, x) { return startsWithFromPosition(toSearch, 0, x); };

var substr$1 = entrust_3("substr");

var join$1 = entrust_2("join");
var concat$1 = entrust_2("concat");
var 𝘍sort = function (fn, functor) {
  var copy = Array.from(functor);
  copy.sort(fn);
  return copy
};

var 𝘍difference = function (bList, aList) { return filter$7(function (x) { return !bList.includes(x); }, aList); };
var difference$1 = curry$1(𝘍difference);
var 𝘍symmetricDifference = function (a, b) {
  var ab = difference$1(a, b);
  var ba = difference$1(b, a);
  return (
    ab.length > ba.length ?
      ab :
      ba
  )
};

var 𝘍relativeIndex = function (length, index) { return (
  index > -1 ?
    index :
    length - Math.abs(index)
); };
var relativeIndex$1 = curry$1(𝘍relativeIndex);
var 𝘍alterIndex = function (index, fn, input) {
  var i = relativeIndex$1(input.length, index);
  var copy = [].concat(input);
  copy[i] = fn(copy[i]);
  return copy
};
var alterIndex$1 = curry$1(𝘍alterIndex);
var alterFirstIndex$1 = alterIndex$1(0);
var alterLastIndex$1 = alterIndex$1(-1);

var 𝘍equals = function (a, b) { return a === b; };
var equals$1 = curry$1(𝘍equals);













var round = Math.round;
var 𝘍add = function (a, b) { return b + a; };

var 𝘍subtract = function (a, b) { return b - a; };

var 𝘍multiply = function (a, b) { return b * a; };

var 𝘍divide = function (a, b) { return b / a; };

var 𝘍pow = function (a, b) { return Math.pow(b, a); };

var 𝘍pathOr = function (def, lenses, input) { return reduce$6(
  function (focus, lens) { return focus[lens] || def; },
  input,
  lenses
); };
var pathOr$1 = curry$1(𝘍pathOr);
var path$1 = pathOr$1(null);
var 𝘍propOr = function (def, property, input) { return pathOr$1(def, [property], input); };
var propOr$1 = curry$1(𝘍propOr);
var prop$2 = propOr$1(null);
var 𝘍pathIs = function (is, lenses, input) { return pipe$1(
  path$1(lenses),
  is,
  Boolean
)(input); };
var pathIs$1 = curry$1(𝘍pathIs);
var 𝘍pathEq = function (equiv, lenses, input) { return pathIs$1(
  equals$1(equiv),
  lenses,
  input
); };

var 𝘍propIs = function (equiv, property, input) { return pipe$1(
  prop$2([property]),
  equiv,
  Boolean
)(input); };

var 𝘍propEq = function (equiv, property, input) { return pathIs$1(
  equals$1(equiv),
  [property],
  input
); };

var random$1 = function (x) {
	if ( x === void 0 ) x = 1;
	return Math.round(Math.random() * x);
};

var floor = function (x) { return Math.floor(Math.random() * x); };
var floorMin = curry$1(function (min, x) { return floor(x) + min; });


var f = Object.freeze({
	floor: floor,
	floorMin: floorMin
});

var keys$3 = Object.keys;
var take = curry$1(function (encase, o) {
  if (o && o[0] && o.length) {
    var found = floor(o.length);
    var selection = o[found];
    return (
      !encase ?
        selection :
        [selection]
    )
  }
  var ks = keys$3(o);
  var index = floor(ks.length);
  var key = ks[index];
  var value = o[key];
  return (
    !encase ?
      value :
      ( obj = {}, obj[key] = value, obj)
  )
  var obj;
});
var pick = take(false);
var grab = take(true);
var allot = curry$1(
  function (howMany, ofThing) { return iterate$1(howMany, function () { return grab(ofThing); }); }
);


var t = Object.freeze({
	take: take,
	pick: pick,
	grab: grab,
	allot: allot
});

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var wordSource = curry$1(
  function (source, howLong) { return pipe$1(
    allot(howLong),
    join$1("")
  )(source); }
);
var word = function (x) {
  if ( x === void 0 ) x = 5;
  return wordSource(alphabet, x);
};


var w = Object.freeze({
	wordSource: wordSource,
	word: word
});

var shuffle = function (list) {
  var newList = [].concat( list );
  var start = newList.length;
  while (start-- > 0) {
    var index = Math.floor(Math.random() * start + 1);
    var current = newList[index];
    var newer = newList[start];
    newList[index] = newer;
    newList[start] = current;
  }
  return newList
};


var s = Object.freeze({
	shuffle: shuffle
});

var random$$1 = Object.assign(random$1, f, t, w, s);
var curry = debug_6;
var pipe = debug_1;
var compose = debug_2;
var isPOJO$$1 = isPOJO$1;
var entrust = entrust_14(curry);
var e0 = entrust.e0;
var e1 = entrust.e1;
var e2 = entrust.e2;
var trim = e0("trim");
var charAt = e1("charAt");
var codePointAt = e1("codePointAt");
var concat = e1("concat");
var fold = e2("fold");
var fork = e2("fork");
var join = e1("join");
var match = e1("match");
var repeat = e1("repeat");
var search = e1("search");
var split = e1("split");
var padEnd = e2("padEnd");
var padStart = e2("padStart");
var replace = e2("replace");
var substr = e2("substr");
var isTypeof = curry(𝘍isTypeof);
var isBoolean = isTypeof("boolean");
var isNumber = isTypeof("number");
var isFunction = isTypeof("function");
var isString = isTypeof("string");
var isObject = isTypeof("object");
var delegateFastBinary = curry(𝘍delegateFastBinary);
var delegateFastTertiary = curry(𝘍delegateFastTertiary);
var reduce = delegateFastTertiary("reduce", reduce$1);
var add = curry(𝘍add);
var alterIndex = curry(𝘍alterIndex);
var ap = curry(𝘍ap);
var choice = curry(𝘍choice);
var difference = curry(𝘍difference);
var divide = curry(𝘍divide);
var endsWith = curry(𝘍endsWith);
var equal = curry(𝘍equals);
var equals = equal;
var indexOf = curry(𝘍indexOf);
var iterate = curry(𝘍iterate);
var lastIndexOf = curry(𝘍lastIndexOf);
var map = curry(𝘍map);
var mapKeys = curry(𝘍mapKeys);
var merge = curry(𝘍merge);
var multiply = curry(𝘍multiply);
var pairwise = curry(𝘍pairwise);
var pairwiseObject = curry(𝘍pairwiseObject);
var pathEq = curry(𝘍pathEq);
var pathIs = curry(𝘍pathIs);
var pathOr = curry(𝘍pathOr);
var path = pathOr(null);
var pow = curry(𝘍pow);
var propEq = curry(𝘍propEq);
var propIs = curry(𝘍propIs);
var propOr = curry(𝘍propOr);
var prop = propOr(null);
var range = curry(𝘍range);
var reject = curry(𝘍reject);
var relativeIndex = curry(𝘍relativeIndex);
var sort = curry(𝘍sort);
var startsWith = curry(𝘍startsWith);
var subtract = curry(𝘍subtract);
var symmetricDifference = curry(𝘍symmetricDifference);
var ternary = curry(𝘍ternary);
var triplet = curry(𝘍triplet);
var chain = delegateFastBinary("chain", flatmapFast);
var flatMap = chain;
var filter = delegateFastBinary("filter", filter$1);
var flip = function (fn) { return curry(function (a, b) { return fn(b, a); }); };
var alterLastIndex = alterIndex(-1);
var alterFirstIndex = alterIndex(0);
var invert$$1 = invert$1;
var not = function (fn) { return pipe(
  fn,
  invert$$1
); };
var not1 = curry(function (fn, a) { return pipe(
  fn(a),
  invert$$1
); });
var not2 = curry(function (fn, a, b) { return pipe(
  fn(a, b),
  invert$$1
); });
var not3 = curry(function (fn, a, b, c) { return pipe(
  fn(a, b, c),
  invert$$1
); });
var propLength = prop("length");
var objectLength = pipe(Object.keys, propLength);
var length = function (x) { return (
  typeof x === "object" ?
    objectLength(x) :
    propLength(x)
); };
var which = curry(𝘍which);
var some = which(some$1);
var every = which(every$1);

exports.random = random$$1;
exports.curry = curry;
exports.compose = compose;
exports.isPOJO = isPOJO$$1;
exports.trim = trim;
exports.charAt = charAt;
exports.codePointAt = codePointAt;
exports.concat = concat;
exports.fold = fold;
exports.fork = fork;
exports.join = join;
exports.match = match;
exports.repeat = repeat;
exports.search = search;
exports.split = split;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.replace = replace;
exports.substr = substr;
exports.isTypeof = isTypeof;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.reduce = reduce;
exports.add = add;
exports.alterIndex = alterIndex;
exports.ap = ap;
exports.choice = choice;
exports.difference = difference;
exports.divide = divide;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
exports.indexOf = indexOf;
exports.iterate = iterate;
exports.lastIndexOf = lastIndexOf;
exports.map = map;
exports.mapKeys = mapKeys;
exports.merge = merge;
exports.multiply = multiply;
exports.pairwise = pairwise;
exports.pairwiseObject = pairwiseObject;
exports.pathEq = pathEq;
exports.pathIs = pathIs;
exports.pathOr = pathOr;
exports.path = path;
exports.pow = pow;
exports.propEq = propEq;
exports.propIs = propIs;
exports.propOr = propOr;
exports.prop = prop;
exports.range = range;
exports.reject = reject;
exports.relativeIndex = relativeIndex;
exports.sort = sort;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.symmetricDifference = symmetricDifference;
exports.ternary = ternary;
exports.triplet = triplet;
exports.chain = chain;
exports.flatMap = flatMap;
exports.filter = filter;
exports.flip = flip;
exports.alterLastIndex = alterLastIndex;
exports.alterFirstIndex = alterFirstIndex;
exports.invert = invert$$1;
exports.not = not;
exports.not1 = not1;
exports.not2 = not2;
exports.not3 = not3;
exports.length = length;
exports.which = which;
exports.some = some;
exports.every = every;
exports.keys = keys$2;
exports.assign = assign$1;
exports.freeze = freeze;
exports.entries = entries;
exports.fromPairs = fromPairs;
exports.toPairs = toPairs;
exports.mapTuple = mapTuple;
exports.mapTuples = mapTuples;
exports.isNil = isNil;
exports.isArray = isArray;
exports.isDistinctObject = isDistinctObject;
exports.round = round;

Object.defineProperty(exports, '__esModule', { value: true });

})));
