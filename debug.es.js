import katsuCurry, { curry, pipe } from 'katsu-curry';
import { e0, e1, e2 } from 'entrust';
import _flatMap from 'flatmap-fast';

var bindInternal4 = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

var reduce = function fastReduce (subject, fn, initialValue, thisContext) {
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

var reduce$1 = function fastReduceObject (subject, fn, initialValue, thisContext) {
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

var reduce$2 = function fastReduce (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduce(subject, fn, initialValue, thisContext);
  }
  else {
    return reduce$1(subject, fn, initialValue, thisContext);
  }
};

var bindInternal3 = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

var filter = function fastFilter (subject, fn, thisContext) {
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

var filter$1 = function fastFilterObject (subject, fn, thisContext) {
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

var filter$2 = function fastFilter (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return filter(subject, fn, thisContext);
  }
  else {
    return filter$1(subject, fn, thisContext);
  }
};

var some = function fastSome (subject, fn, thisContext) {
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

var every = function fastEvery (subject, fn, thisContext) {
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

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var debug_15 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, '__esModule', { value: true });
function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}
function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var debug = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, '__esModule', { value: true });
var PLACEHOLDER = "🍛";
var $ = PLACEHOLDER;
var bindInternal3 = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
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
var curry$$1 = function (fn) {
  var test = function (x) { return x === PLACEHOLDER; };
  return function curried() {
    var arguments$1 = arguments;
    var argLength = arguments.length;
    var args = new Array(argLength);
    for (var i = 0; i < argLength; ++i) {
      args[i] = arguments$1[i];
    }
    var countNonPlaceholders = function (toCount) {
      var count = toCount.length;
      while (!test(toCount[count])) {
        count--;
      }
      return count
    };
    var length = (
      some$1(args, test) ?
        countNonPlaceholders(args) :
        args.length
    );
    function saucy() {
      var arguments$1 = arguments;
      var arg2Length = arguments.length;
      var args2 = new Array(arg2Length);
      for (var j = 0; j < arg2Length; ++j) {
        args2[j] = arguments$1[j];
      }
      return curried.apply(this, args.map(
        function (y) { return (
          test(y) && args2[0] ?
            args2.shift() :
            y
        ); }
      ).concat(args2))
    }
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
};
var delegatee = curry$$1(function (method, arg, x) { return (x[method](arg)); });
var filter = delegatee("filter");
var innerpipe = function (args) { return function (x) {
  var first = args[0];
  var rest = args.slice(1);
  var current = first(x);
  for (var a = 0; a < rest.length; a++) {
    current = rest[a](current);
  }
  return current
}; };
function pipe$1() {
  var arguments$1 = arguments;
  var argLength = arguments.length;
  var args = new Array(argLength);
  for (var i = 0; i < argLength; ++i) {
    args[i] = arguments$1[i];
  }
  return innerpipe(args)
}
var composedToString = function (args, name) {
  if ( args === void 0 ) { args = []; }
  if ( name === void 0 ) { name = "pipe"; }
  var stringifyFunctions = function (x) { return (
    x && x.toString && typeof x.toString === "function" ?
      x.toString() :
      "fn"
  ); };
  var names = args.map(stringifyFunctions);
  return function () { return (
    (name + "(" + (names.join(", ")) + ")")
  ); }
};
var slice = Array.prototype.slice;
var aintFunction = function (x) { return typeof x !== "function"; };
var prepipe = function (a, name) {
  if ( name === void 0 ) { name = "pipe"; }
  var args = slice.call(a);
  if (args.filter(aintFunction).length > 0) {
    throw new Error(
      (name + " expected all arguments to be functions.")
    )
  }
  return args
};
function pipe$$1() {
  var args = prepipe(arguments);
  var piped = innerpipe(args);
  piped.toString = composedToString(args);
  return piped
}
function compose() {
  var args = prepipe(arguments, "compose").reverse();
  var composed = innerpipe(args);
  composed.toString = composedToString(args, "compose");
  return composed
}
var prop = curry$$1(function (property, o) { return o && property && o[property]; });
var _keys = Object.keys;
var keys = _keys;
var propLength = prop("length");
var objectLength = pipe$1(keys, propLength);
var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };
var flipIncludes = curry$$1(function (list, x) { return list.includes(x); });
var matchingKeys = curry$$1(
  function (list, o) { return filter(
    flipIncludes(list),
    keys(o)
  ); }
);
var matchingKeyCount = curry$$1(
  function (list, o) { return pipe$1(
    matchingKeys(list),
    length
  )(o); }
);
var expectKArgs = function (expected, args) { return (
  matchingKeyCount(expected, args) >= Object.keys(expected).length
); };
var join = curry$$1(function (y, x) { return x.join(y); });
var repeat = curry$$1(function (y, x) { return x.repeat(y); });
var split = curry$$1(function (y, x) { return x.split(y); });
var map = curry$$1(function (y, x) { return x.map(y); });
var add = curry$$1(function (y, x) { return x + y; });
var subtract = curry$$1(function (y, x) { return x - y; });
var safeJoin = curry$$1(
  function (joiner, x) { return (
    x.length > 0 ?
      joiner(x) :
      ""
  ); }
);
var wrap = curry$$1(
  function (x, str) { return (
    ("" + (x[0]) + str + (x[1]))
  ); }
);
var parenthesize = wrap("()");
var curlies = wrap("{}");
var commas = join(",");
var toStringJoiner = safeJoin(
  pipe$1(
    commas,
    parenthesize
  )
);
var toObjectStringJoiner = pipe$1(
  safeJoin(pipe$1(
    commas,
    curlies,
    parenthesize
  ))
);
var makeRemainder = curry$$1(function (str, length) { return (
  length > 0 ?
    pipe$1(
      repeat(length),
      split(""),
      commas,
      parenthesize
    )(str) :
    ""
); });
var fillArray = function (x) {
  var list = [];
  while (x > 0) {
    list.push(--x);
  }
  return list.reverse()
};
var question = function (x) { return (
  pipe$1(
    join(":?,"),
    add(x.length > 0 ? ":?" : "")
  )(x)
); };
var without = curry$$1(
  function (x, y) {
    return y.filter(function (z) { return !(x.indexOf(z) > -1); })
  }
);
var keysWhenKeyNumOrRaw = function (x) { return (x && x.k && x.n ? x.k : x); };
var makeObjectRemainder = function (objectKeys, argKeys) {
  if ( objectKeys === void 0 ) { objectKeys = []; }
  if ( argKeys === void 0 ) { argKeys = []; }
  return pipe$1(
  keysWhenKeyNumOrRaw,
  without(argKeys),
  question,
  curlies,
  parenthesize
)(objectKeys);
};
var LAMDA_REMAINDER = "?";
var toString = function (fn, args) {
  if ( args === void 0 ) { args = []; }
  return function () {
  var argString = toStringJoiner(args);
  var remainder = makeRemainder(
    LAMDA_REMAINDER,
    fn.length - args.length
  );
  var name = fn && fn.name || "fn";
  return ("curry(" + name + ")" + argString + remainder)
};
};
var counter = function (x) { return function () { return x++; }; };
var makeNumberObjectRemainder = function (number, keys) {
  var keyLength = keys.length;
  return pipe$1(
    subtract(keyLength),
    fillArray,
    map(add(keyLength)),
    question,
    curlies,
    parenthesize
  )(number)
};
var makeObjectStringSignature = function (name, obj, keys) {
  var argString = toObjectStringJoiner(keys);
  var remainder = makeObjectRemainder(obj, keys);
  return ("" + name + argString + remainder)
};
var makeNumberStringSignature = function (name, number, keys) {
  var remainder = makeNumberObjectRemainder(number, keys);
  return pipe$1(
    map(counter(0)),
    toObjectStringJoiner,
    wrap([name, remainder])
  )(keys)
};
var toObjectString = function (fn, curryCondition, args) {
  if ( curryCondition === void 0 ) { curryCondition = []; }
  if ( args === void 0 ) { args = {}; }
  return function () {
  var argKeys = Object.keys(args);
  var conditionType = typeof curryCondition;
  var name = "curry(" + (fn && fn.name || "fn") + ")";
  if (conditionType === "number") {
    return makeNumberStringSignature(name, curryCondition, argKeys)
  }
  return makeObjectStringSignature(name, curryCondition, argKeys)
};
};
var merge = curry$$1(function (x, y) { return Object.assign({}, x, y); });
var barfWhen = function (dis) {
  var o = Object.freeze({
    keysAreNotAnArray: function (k) {
      if (!Array.isArray(k)) {
        throw new TypeError((dis + " expected an array of wanted keys."))
      }
      return o
    },
    arityIsNotANumber: function (n) {
      if (typeof n !== "number" || isNaN(n)) {
        throw new TypeError((dis + " expected to be given a number for arity."))
      }
      return o
    },
    noFunctionIsGiven: function (fn) {
      if (typeof fn !== "function") {
        throw new TypeError((dis + " expected to be given a function to curry."))
      }
      return o
    }
  });
  return o
};
function curryObjectKN(ref, fn) {
  var k = ref.k;
  var n = ref.n;
  barfWhen("curryObjectKN")
    .keysAreNotAnArray(k)
    .arityIsNotANumber(n)
    .noFunctionIsGiven(fn);
  function λcurryObjectKN(args) {
    var joined = function (z) { return λcurryObjectKN(merge(args, z)); };
    joined.toString = toObjectString(fn, k, args);
    return (
      expectKArgs(k, args) || length(args) >= n ?
        fn(args) :
        joined
    )
  }
  λcurryObjectKN.toString = toObjectString(fn, k);
  return λcurryObjectKN
}
var curryObjectK = curry$$1(
  function (keys, fn) {
    barfWhen("curryObjectK")
      .keysAreNotAnArray(keys)
      .noFunctionIsGiven(fn);
    function λcurryObjectK(args) {
      var joined = function (z) { return λcurryObjectK(merge(args, z)); };
      joined.toString = toObjectString(fn, keys, args);
      return (
        expectKArgs(keys, args) ?
          fn(args) :
          joined
      )
    }
    λcurryObjectK.toString = toObjectString(fn, keys);
    return λcurryObjectK
  }
);
function curryObjectN(arity, fn) {
  barfWhen("curryObjectN")
    .arityIsNotANumber(arity)
    .noFunctionIsGiven(fn);
  function λcurryObjectN(args) {
    var joined = function (z) { return λcurryObjectN(merge(args, z)); };
    joined.toString = toObjectString(fn, arity, args);
    return (
      Object.keys(args).length >= arity ?
        fn(args) :
        joined
    )
  }
  λcurryObjectN.toString = toObjectString(fn, arity);
  return λcurryObjectN
}
var remapParameters = function (indices, arr) {
  var copy = Array.from(arr);
  if (!copy.length) {
    return copy
  }
  return copy.map(
    function (x, index) {
      if (indices.includes(index)) {
        return copy[indices[index]]
      }
      return x
    }
  )
};
var curryify = function (test) { return function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected to be given a function to curry!")
  }
  function curried() {
    var args = Array.from(arguments);
    var countNonPlaceholders = function (toCount) {
      var count = toCount.length;
      while (!test(toCount[count])) {
        count--;
      }
      return count
    };
    var length = some$1(args, test) ? countNonPlaceholders(args) : args.length;
    function saucy() {
      var args2 = Array.from(arguments);
      return curried.apply(this, args.map(
        function (y) { return (
          test(y) && args2[0] ?
            args2.shift() :
            y
        ); }
      ).concat(args2))
    }
    saucy.toString = toString(fn, args);
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
  curried.toString = toString(fn);
  return curried
}; };
var curry$1 = curryify(function (x) { return x === PLACEHOLDER; });
var remapArray = curry$1(remapParameters);
var remap = curry$1(function (indices, fn) {
  var remapArgs = remapArray(indices);
  var curried = curry$1(fn);
  return function remappedFn() {
    var args = remapArgs(Array.from(arguments));
    return curried.apply(null, args)
  }
});
var K = function (x) { return function () { return x; }; };
var I = function (x) { return x; };
var version = "debug";
exports.version = version;
exports.pipe = pipe$$1;
exports.compose = compose;
exports.curryObjectK = curryObjectK;
exports.curryObjectN = curryObjectN;
exports.curryObjectKN = curryObjectKN;
exports.curry = curry$1;
exports.curryify = curryify;
exports.remap = remap;
exports.remapArray = remapArray;
exports.$ = $;
exports.PLACEHOLDER = PLACEHOLDER;
exports.K = K;
exports.I = I;
});
unwrapExports$$1(debug);
var debug_1 = debug.version;
var debug_2 = debug.pipe;
var debug_3 = debug.compose;
var debug_4 = debug.curryObjectK;
var debug_5 = debug.curryObjectN;
var debug_6 = debug.curryObjectKN;
var debug_7 = debug.curry;
var debug_8 = debug.curryify;
var debug_9 = debug.remap;
var debug_10 = debug.remapArray;
var debug_11 = debug.$;
var debug_12 = debug.PLACEHOLDER;
var debug_13 = debug.K;
var debug_14 = debug.I;
var entrust0 = function (fn, x) { return x[fn](); };
var e0$$1 = katsuCurry.curry(entrust0);
var entrust1 = function (fn, a, x) { return x[fn](a); };
var e1$$1 = katsuCurry.curry(entrust1);
var entrust2 = function (fn, a, b, x) { return x[fn](a, b); };
var e2$$1 = katsuCurry.curry(entrust2);
var entrust3 = function (fn, a, b, c, x) { return x[fn](a, b, c); };
var e3 = katsuCurry.curry(entrust3);
var entrust4 = function (fn, a, b, c, d, x) { return x[fn](a, b, c, d); };
var e4 = katsuCurry.curry(entrust4);
var entrust5 = function (fn, a, b, c, d, e, x) { return x[fn](a, b, c, d, e); };
var e5 = katsuCurry.curry(entrust5);
var entrust6 = function (fn, a, b, c, d, e, f, x) { return x[fn](a, b, c, d, e, f); };
var e6 = katsuCurry.curry(entrust6);
var entrust7 = function (fn, a, b, c, d, e, f, g, x) { return x[fn](a, b, c, d, e, f, g); };
var e7 = katsuCurry.curry(entrust7);
var entrust8 = function (fn, a, b, c, d, e, f, g, h, x) { return x[fn](a, b, c, d, e, f, g, h); };
var e8 = katsuCurry.curry(entrust8);
var entrust9 = function (fn, a, b, c, d, e, f, g, h, i, x) { return x[fn](a, b, c, d, e, f, g, h, i); };
var e9 = katsuCurry.curry(entrust9);
var entrust10 = function (fn, a, b, c, d, e, f, g, h, i, j, x) { return x[fn](
  a, b, c, d, e, f, g, h, i, j
); };
var e10 = katsuCurry.curry(entrust10);
var entrustN = function (n, method, args, delegatee) {
  var entrustees = [e0$$1, e1$$1, e2$$1, e3, e4, e5, e6, e7, e8, e9, e10];
  var params = [method ].concat( args, [delegatee]);
  return entrustees[n].apply(null, params)
};
var eN = katsuCurry.curry(entrustN);
function entrustD(n, m, a, d) {
  if (n !== a.length) {
    throw new Error((m + " expects total args (" + (a.length) + ") to equal the given arity (" + n + ")"))
  }
  return entrustN(n, m, a, d)
}
var eD = katsuCurry.curry(
  entrustD
);
var custom = function (curry$$1) {
  var raw = {
    e0: entrust0,
    e1: entrust1,
    e2: entrust2,
    e3: entrust3,
    e4: entrust4,
    e5: entrust5,
    e6: entrust6,
    e7: entrust7,
    e8: entrust8,
    e9: entrust9,
    e10: entrust10,
    eD: entrustD,
    eN: entrustN
  };
  return Object.keys(raw).map(function (k) {
    var obj;
    return (( obj = {}, obj[k] = curry$$1(raw[k]), obj ));
  }).reduce(function (x, y) { return Object.assign({}, x, y); }, {})
};
var debug$2 = custom(debug_7);
var _e0 = debug$2.e0;
var _e1 = debug$2.e1;
var _e2 = debug$2.e2;
var _e3 = debug$2.e3;
var _e4 = debug$2.e4;
var _e5 = debug$2.e5;
var _e6 = debug$2.e6;
var _e7 = debug$2.e7;
var _e8 = debug$2.e8;
var _e9 = debug$2.e9;
var _e10 = debug$2.e10;
var _eD = debug$2.eD;
var _eN = debug$2.eN;
var e0$1 = _e0;
var e1$1 = _e1;
var e2$1 = _e2;
var e3$1 = _e3;
var e4$1 = _e4;
var e5$1 = _e5;
var e6$1 = _e6;
var e7$1 = _e7;
var e8$1 = _e8;
var e9$1 = _e9;
var e10$1 = _e10;
var eN$1 = _eN;
var eD$1 = _eD;
exports.e0 = e0$1;
exports.e1 = e1$1;
exports.e2 = e2$1;
exports.e3 = e3$1;
exports.e4 = e4$1;
exports.e5 = e5$1;
exports.e6 = e6$1;
exports.e7 = e7$1;
exports.e8 = e8$1;
exports.e9 = e9$1;
exports.e10 = e10$1;
exports.eN = eN$1;
exports.eD = eD$1;
});
unwrapExports(debug_15);
var debug_16 = debug_15.e0;
var debug_17 = debug_15.e1;
var debug_18 = debug_15.e2;
var debug_19 = debug_15.e3;
var debug_20 = debug_15.e4;
var debug_21 = debug_15.e5;
var debug_22 = debug_15.e6;
var debug_23 = debug_15.e7;
var debug_24 = debug_15.e8;
var debug_25 = debug_15.e9;
var debug_26 = debug_15.e10;
var debug_27 = debug_15.eN;
var debug_28 = debug_15.eD;

var debug$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, '__esModule', { value: true });
var PLACEHOLDER = "🍛";
var $ = PLACEHOLDER;
var bindInternal3 = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
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
var curry$$1 = function (fn) {
  var test = function (x) { return x === PLACEHOLDER; };
  return function curried() {
    var arguments$1 = arguments;
    var argLength = arguments.length;
    var args = new Array(argLength);
    for (var i = 0; i < argLength; ++i) {
      args[i] = arguments$1[i];
    }
    var countNonPlaceholders = function (toCount) {
      var count = toCount.length;
      while (!test(toCount[count])) {
        count--;
      }
      return count
    };
    var length = (
      some$1(args, test) ?
        countNonPlaceholders(args) :
        args.length
    );
    function saucy() {
      var arguments$1 = arguments;
      var arg2Length = arguments.length;
      var args2 = new Array(arg2Length);
      for (var j = 0; j < arg2Length; ++j) {
        args2[j] = arguments$1[j];
      }
      return curried.apply(this, args.map(
        function (y) { return (
          test(y) && args2[0] ?
            args2.shift() :
            y
        ); }
      ).concat(args2))
    }
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
};
var delegatee = curry$$1(function (method, arg, x) { return (x[method](arg)); });
var filter = delegatee("filter");
var innerpipe = function (args) { return function (x) {
  var first = args[0];
  var rest = args.slice(1);
  var current = first(x);
  for (var a = 0; a < rest.length; a++) {
    current = rest[a](current);
  }
  return current
}; };
function pipe$1() {
  var arguments$1 = arguments;
  var argLength = arguments.length;
  var args = new Array(argLength);
  for (var i = 0; i < argLength; ++i) {
    args[i] = arguments$1[i];
  }
  return innerpipe(args)
}
var composedToString = function (args, name) {
  if ( args === void 0 ) { args = []; }
  if ( name === void 0 ) { name = "pipe"; }
  var stringifyFunctions = function (x) { return (
    x && x.toString && typeof x.toString === "function" ?
      x.toString() :
      "fn"
  ); };
  var names = args.map(stringifyFunctions);
  return function () { return (
    (name + "(" + (names.join(", ")) + ")")
  ); }
};
var slice = Array.prototype.slice;
var aintFunction = function (x) { return typeof x !== "function"; };
var prepipe = function (a, name) {
  if ( name === void 0 ) { name = "pipe"; }
  var args = slice.call(a);
  if (args.filter(aintFunction).length > 0) {
    throw new Error(
      (name + " expected all arguments to be functions.")
    )
  }
  return args
};
function pipe$$1() {
  var args = prepipe(arguments);
  var piped = innerpipe(args);
  piped.toString = composedToString(args);
  return piped
}
function compose() {
  var args = prepipe(arguments, "compose").reverse();
  var composed = innerpipe(args);
  composed.toString = composedToString(args, "compose");
  return composed
}
var prop = curry$$1(function (property, o) { return o && property && o[property]; });
var _keys = Object.keys;
var keys = _keys;
var propLength = prop("length");
var objectLength = pipe$1(keys, propLength);
var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };
var flipIncludes = curry$$1(function (list, x) { return list.includes(x); });
var matchingKeys = curry$$1(
  function (list, o) { return filter(
    flipIncludes(list),
    keys(o)
  ); }
);
var matchingKeyCount = curry$$1(
  function (list, o) { return pipe$1(
    matchingKeys(list),
    length
  )(o); }
);
var expectKArgs = function (expected, args) { return (
  matchingKeyCount(expected, args) >= Object.keys(expected).length
); };
var join = curry$$1(function (y, x) { return x.join(y); });
var repeat = curry$$1(function (y, x) { return x.repeat(y); });
var split = curry$$1(function (y, x) { return x.split(y); });
var map = curry$$1(function (y, x) { return x.map(y); });
var add = curry$$1(function (y, x) { return x + y; });
var subtract = curry$$1(function (y, x) { return x - y; });
var safeJoin = curry$$1(
  function (joiner, x) { return (
    x.length > 0 ?
      joiner(x) :
      ""
  ); }
);
var wrap = curry$$1(
  function (x, str) { return (
    ("" + (x[0]) + str + (x[1]))
  ); }
);
var parenthesize = wrap("()");
var curlies = wrap("{}");
var commas = join(",");
var toStringJoiner = safeJoin(
  pipe$1(
    commas,
    parenthesize
  )
);
var toObjectStringJoiner = pipe$1(
  safeJoin(pipe$1(
    commas,
    curlies,
    parenthesize
  ))
);
var makeRemainder = curry$$1(function (str, length) { return (
  length > 0 ?
    pipe$1(
      repeat(length),
      split(""),
      commas,
      parenthesize
    )(str) :
    ""
); });
var fillArray = function (x) {
  var list = [];
  while (x > 0) {
    list.push(--x);
  }
  return list.reverse()
};
var question = function (x) { return (
  pipe$1(
    join(":?,"),
    add(x.length > 0 ? ":?" : "")
  )(x)
); };
var without = curry$$1(
  function (x, y) {
    return y.filter(function (z) { return !(x.indexOf(z) > -1); })
  }
);
var keysWhenKeyNumOrRaw = function (x) { return (x && x.k && x.n ? x.k : x); };
var makeObjectRemainder = function (objectKeys, argKeys) {
  if ( objectKeys === void 0 ) { objectKeys = []; }
  if ( argKeys === void 0 ) { argKeys = []; }
  return pipe$1(
  keysWhenKeyNumOrRaw,
  without(argKeys),
  question,
  curlies,
  parenthesize
)(objectKeys);
};
var LAMDA_REMAINDER = "?";
var toString = function (fn, args) {
  if ( args === void 0 ) { args = []; }
  return function () {
  var argString = toStringJoiner(args);
  var remainder = makeRemainder(
    LAMDA_REMAINDER,
    fn.length - args.length
  );
  var name = fn && fn.name || "fn";
  return ("curry(" + name + ")" + argString + remainder)
};
};
var counter = function (x) { return function () { return x++; }; };
var makeNumberObjectRemainder = function (number, keys) {
  var keyLength = keys.length;
  return pipe$1(
    subtract(keyLength),
    fillArray,
    map(add(keyLength)),
    question,
    curlies,
    parenthesize
  )(number)
};
var makeObjectStringSignature = function (name, obj, keys) {
  var argString = toObjectStringJoiner(keys);
  var remainder = makeObjectRemainder(obj, keys);
  return ("" + name + argString + remainder)
};
var makeNumberStringSignature = function (name, number, keys) {
  var remainder = makeNumberObjectRemainder(number, keys);
  return pipe$1(
    map(counter(0)),
    toObjectStringJoiner,
    wrap([name, remainder])
  )(keys)
};
var toObjectString = function (fn, curryCondition, args) {
  if ( curryCondition === void 0 ) { curryCondition = []; }
  if ( args === void 0 ) { args = {}; }
  return function () {
  var argKeys = Object.keys(args);
  var conditionType = typeof curryCondition;
  var name = "curry(" + (fn && fn.name || "fn") + ")";
  if (conditionType === "number") {
    return makeNumberStringSignature(name, curryCondition, argKeys)
  }
  return makeObjectStringSignature(name, curryCondition, argKeys)
};
};
var merge = curry$$1(function (x, y) { return Object.assign({}, x, y); });
var barfWhen = function (dis) {
  var o = Object.freeze({
    keysAreNotAnArray: function (k) {
      if (!Array.isArray(k)) {
        throw new TypeError((dis + " expected an array of wanted keys."))
      }
      return o
    },
    arityIsNotANumber: function (n) {
      if (typeof n !== "number" || isNaN(n)) {
        throw new TypeError((dis + " expected to be given a number for arity."))
      }
      return o
    },
    noFunctionIsGiven: function (fn) {
      if (typeof fn !== "function") {
        throw new TypeError((dis + " expected to be given a function to curry."))
      }
      return o
    }
  });
  return o
};
function curryObjectKN(ref, fn) {
  var k = ref.k;
  var n = ref.n;
  barfWhen("curryObjectKN")
    .keysAreNotAnArray(k)
    .arityIsNotANumber(n)
    .noFunctionIsGiven(fn);
  function λcurryObjectKN(args) {
    var joined = function (z) { return λcurryObjectKN(merge(args, z)); };
    joined.toString = toObjectString(fn, k, args);
    return (
      expectKArgs(k, args) || length(args) >= n ?
        fn(args) :
        joined
    )
  }
  λcurryObjectKN.toString = toObjectString(fn, k);
  return λcurryObjectKN
}
var curryObjectK = curry$$1(
  function (keys, fn) {
    barfWhen("curryObjectK")
      .keysAreNotAnArray(keys)
      .noFunctionIsGiven(fn);
    function λcurryObjectK(args) {
      var joined = function (z) { return λcurryObjectK(merge(args, z)); };
      joined.toString = toObjectString(fn, keys, args);
      return (
        expectKArgs(keys, args) ?
          fn(args) :
          joined
      )
    }
    λcurryObjectK.toString = toObjectString(fn, keys);
    return λcurryObjectK
  }
);
function curryObjectN(arity, fn) {
  barfWhen("curryObjectN")
    .arityIsNotANumber(arity)
    .noFunctionIsGiven(fn);
  function λcurryObjectN(args) {
    var joined = function (z) { return λcurryObjectN(merge(args, z)); };
    joined.toString = toObjectString(fn, arity, args);
    return (
      Object.keys(args).length >= arity ?
        fn(args) :
        joined
    )
  }
  λcurryObjectN.toString = toObjectString(fn, arity);
  return λcurryObjectN
}
var remapParameters = function (indices, arr) {
  var copy = Array.from(arr);
  if (!copy.length) {
    return copy
  }
  return copy.map(
    function (x, index) {
      if (indices.includes(index)) {
        return copy[indices[index]]
      }
      return x
    }
  )
};
var curryify = function (test) { return function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected to be given a function to curry!")
  }
  function curried() {
    var args = Array.from(arguments);
    var countNonPlaceholders = function (toCount) {
      var count = toCount.length;
      while (!test(toCount[count])) {
        count--;
      }
      return count
    };
    var length = some$1(args, test) ? countNonPlaceholders(args) : args.length;
    function saucy() {
      var args2 = Array.from(arguments);
      return curried.apply(this, args.map(
        function (y) { return (
          test(y) && args2[0] ?
            args2.shift() :
            y
        ); }
      ).concat(args2))
    }
    saucy.toString = toString(fn, args);
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
  curried.toString = toString(fn);
  return curried
}; };
var curry$1 = curryify(function (x) { return x === PLACEHOLDER; });
var remapArray = curry$1(remapParameters);
var remap = curry$1(function (indices, fn) {
  var remapArgs = remapArray(indices);
  var curried = curry$1(fn);
  return function remappedFn() {
    var args = remapArgs(Array.from(arguments));
    return curried.apply(null, args)
  }
});
var K = function (x) { return function () { return x; }; };
var I = function (x) { return x; };
var version = "debug";
exports.version = version;
exports.pipe = pipe$$1;
exports.compose = compose;
exports.curryObjectK = curryObjectK;
exports.curryObjectN = curryObjectN;
exports.curryObjectKN = curryObjectKN;
exports.curry = curry$1;
exports.curryify = curryify;
exports.remap = remap;
exports.remapArray = remapArray;
exports.$ = $;
exports.PLACEHOLDER = PLACEHOLDER;
exports.K = K;
exports.I = I;
});
unwrapExports(debug$1);
var debug_1 = debug$1.version;
var debug_2 = debug$1.pipe;
var debug_3 = debug$1.compose;
var debug_4 = debug$1.curryObjectK;
var debug_5 = debug$1.curryObjectN;
var debug_6 = debug$1.curryObjectKN;
var debug_7 = debug$1.curry;
var debug_8 = debug$1.curryify;
var debug_9 = debug$1.remap;
var debug_10 = debug$1.remapArray;
var debug_11 = debug$1.$;
var debug_12 = debug$1.PLACEHOLDER;
var debug_13 = debug$1.K;
var debug_14 = debug$1.I;

var 𝘍isTypeof = function (type, x) { return (type === typeof x); };
var isTypeof = curry(
  𝘍isTypeof
);
var isBoolean = isTypeof("boolean");
var isNumber = isTypeof("number");
var isFunction = isTypeof("function");
var isString = isTypeof("string");
var isNil = function (x) { return x == null; };
var isObject = isTypeof("object");
var isArray = Array.isArray;
var isDistinctObject = function (x) { return !isNil(x) && isObject(x) && !isArray(x); };

var has = function (x, y) { return !!y[x]; };
var isArray$1 = Array.isArray;
var 𝘍willDelegate = function (method, functor) { return (
  has(method, functor) && !isArray$1(functor)
); };
function 𝘍delegateFastBinary(method, fast, fn, functor) {
  return (
    𝘍willDelegate(method, functor) ?
      functor[method](fn) :
      fast(functor, fn)
  )
}
var delegateFastBinary = curry(
  𝘍delegateFastBinary
);
function 𝘍delegateFastTertiary(method, fast, fn, initial, functor) {
  return (
    𝘍willDelegate(method, functor) ?
      functor[method](fn, initial) :
      fast(functor, fn, initial)
  )
}
var delegateFastTertiary = curry(
  𝘍delegateFastTertiary
);

var reduce$3 = delegateFastTertiary("reduce", reduce$2);

var map = function fastMap (subject, fn, thisContext) {
  var length = subject.length,
      result = new Array(length),
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    result[i] = iterator(subject[i], i, subject);
  }
  return result;
};

var map$1 = function fastMapObject (subject, fn, thisContext) {
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
    return map(subject, fn, thisContext);
  }
  else {
    return map$1(subject, fn, thisContext);
  }
};

var 𝘍map = function (fn, functor) {
  if (functor && !Array.isArray(functor) && functor.map) { return functor.map(fn) }
  return map$2(functor, fn)
};
var map$3 = curry(
  𝘍map
);

var 𝘍ap = function (applicative, functor) {
  if (functor && functor.ap && isFunction(functor.ap)) { return functor.ap(applicative) }
  if (isFunction(functor)) { return function (x) { return (applicative(x)(functor(x))); } }
  return reduce$3(function (agg, f) { return agg.concat(map$3(f, functor)); }, [], applicative)
};
var ap = curry(𝘍ap);

var 𝘍choice = function (cnFn, b, a) { return cnFn(a, b) ? a : b; };
var choice = curry(𝘍choice);

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
var iterate = curry(𝘍iterate);

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
var range = curry(𝘍range);

var filter$3 = delegateFastBinary("filter", filter$2);

var 𝘍reject = function (fn, o) { return filter$3(
  function (x) { return !fn(x); }, o
); };
var reject = curry(
  𝘍reject
);

var 𝘍ternary = function (cn, b, a) { return cn ? a : b; };
var ternary = curry(𝘍ternary);

var 𝘍triplet = function (cnFn, bFn, aFn, o) { return cnFn(o) ? aFn(o) : bFn(o); };
var triplet = curry(𝘍triplet);

var _keys = Object.keys;
var _freeze = Object.freeze;
var _assign = Object.assign;
var keys = _keys;
var freeze = _freeze;
var assign = _assign;
var entries = function (o) { return pipe(
  keys,
  map$3(function (k) { return ([k, o[k]]); })
)(o); };
var toPairs = entries;
var fromPairs = reduce$3(
  function (agg, ref) {
    var obj;
    var k = ref[0];
    var v = ref[1];
    return merge(agg, ( obj = {}, obj[k] = v, obj ));
},
  {}
);
var 𝘍pairwise = function (hoc, fn, o) { return pipe(
  toPairs,
  hoc(fn)
)(o); };
var pairwise = curry(𝘍pairwise);
var 𝘍pairwiseObject = function (hoc, fn, o) { return pipe(
  pairwise(hoc, fn),
  fromPairs
)(o); };
var pairwiseObject = curry(𝘍pairwiseObject);
var mapTuples = pairwiseObject(map$3);
var 𝘍mapKeys = function (fn, o) { return mapTuples(
  function (ref) {
    var k = ref[0];
    var v = ref[1];
    return ([fn(k), v]);
  },
  o
); };
var mapKeys = curry(𝘍mapKeys);
var 𝘍merge = function (a, b) { return entries(a)
  .concat(entries(b))
  .reduce(
    function (hash, ref) {
      var obj;
      var k = ref[0];
      var v = ref[1];
      return (
      k !== "__proto__" ?
        assign(hash, ( obj = {}, obj[k] = v, obj )) :
        hash
    );
  },
    {}
  ); };
var merge = curry(𝘍merge);

var invert = function (x) { return !x; };
var not1 = curry(function (fn, a) { return pipe(
  fn(a),
  invert
); });
var not2 = curry(function (fn, a, b) { return pipe(
  fn(a, b),
  invert
); });
var not3 = curry(function (fn, a, b, c) { return pipe(
  fn(a, b, c),
  invert
); });

var trim = e0("trim");
var charAt = e1("charAt");
var codePointAt = e1("codePointAt");
var match = e1("match");
var repeat = e1("repeat");
var search = e1("search");
var split = e1("split");
var endsWithLength = e2("endsWith");
var 𝘍endsWith = function (end, x) { return endsWithLength(end, x.length, x); };
var endsWith = curry(𝘍endsWith);
var indexOfFromIndex = e2("indexOf");
var 𝘍indexOf = function (toSearch, x) { return indexOfFromIndex(toSearch, 0, x); };
var indexOf = curry(𝘍indexOf);
var lastIndexOfFromIndex = e2("lastIndexOf");
var 𝘍lastIndexOf = function (toSearch, x) { return lastIndexOfFromIndex(toSearch, Infinity, x); };
var lastIndexOf = curry(𝘍lastIndexOf);
var padEnd = e2("padEnd");
var padStart = e2("padStart");
var replace = e2("replace");
var startsWithFromPosition = e2("startsWith");
var 𝘍startsWith = function (toSearch, x) { return startsWithFromPosition(toSearch, 0, x); };
var startsWith = curry(𝘍startsWith);
var substr = e2("substr");

var join = e1("join");
var concat = e1("concat");
var 𝘍sort = function (fn, functor) {
  var copy = Array.from(functor);
  copy.sort(fn);
  return copy
};
var sort = curry(𝘍sort);
var 𝘍difference = function (bList, aList) { return filter$3(function (x) { return !bList.includes(x); }, aList); };
var difference = curry(𝘍difference);
var 𝘍symmetricDifference = function (a, b) {
  var ab = difference(a, b);
  var ba = difference(b, a);
  return (
    ab.length > ba.length ?
      ab :
      ba
  )
};
var symmetricDifference = curry(𝘍symmetricDifference);
var 𝘍relativeIndex = function (length, index) { return (
  index > -1 ?
    index :
    length - Math.abs(index)
); };
var relativeIndex = curry(𝘍relativeIndex);
var 𝘍alterIndex = function (index, fn, input) {
  var i = relativeIndex(input.length, index);
  var copy = [].concat(input);
  copy[i] = fn(copy[i]);
  return copy
};
var alterIndex = curry(𝘍alterIndex);
var alterFirstIndex = alterIndex(0);
var alterLastIndex = alterIndex(-1);

var 𝘍equals = function (a, b) { return a === b; };
var equals = curry(𝘍equals);
var 𝘍greaterThan = function (b, a) { return a > b; };
var greaterThan = curry(𝘍greaterThan);
var 𝘍greaterThanOrEqualTo = function (b, a) { return a >= b; };
var greaterThanOrEqualTo = curry(𝘍greaterThanOrEqualTo);
var 𝘍lessThan = function (b, a) { return a < b; };
var lessThan = curry(𝘍lessThan);
var 𝘍lessThanOrEqualTo = function (b, a) { return a <= b; };
var lessThanOrEqualTo = curry(𝘍lessThanOrEqualTo);
var round = Math.round;
var 𝘍add = function (a, b) { return b + a; };
var add = curry(𝘍add);
var 𝘍subtract = function (a, b) { return b - a; };
var subtract = curry(𝘍subtract);
var 𝘍multiply = function (a, b) { return b * a; };
var multiply = curry(𝘍multiply);
var 𝘍divide = function (a, b) { return b / a; };
var divide = curry(𝘍divide);
var 𝘍pow = function (a, b) { return Math.pow(b, a); };
var pow = curry(𝘍pow);

var 𝘍pathOr = function (def, lenses, input) { return reduce$3(
  function (focus, lens) { return focus[lens] || def; },
  input,
  lenses
); };
var pathOr = curry(𝘍pathOr);
var path = pathOr(null);
var 𝘍propOr = function (def, property, input) { return pathOr(def, [property], input); };
var propOr = curry(𝘍propOr);
var prop = propOr(null);
var 𝘍pathIs = function (is, lenses, input) { return pipe(
  path(lenses),
  is,
  Boolean
)(input); };
var pathIs = curry(𝘍pathIs);
var 𝘍pathEq = function (equiv, lenses, input) { return pathIs(
  equals(equiv),
  lenses,
  input
); };
var pathEq = curry(
  𝘍pathEq
);
var 𝘍propIs = function (equiv, property, input) { return pipe(
  prop([property]),
  equiv,
  Boolean
)(input); };
var propIs = curry(𝘍propIs);
var 𝘍propEq = function (equiv, property, input) { return pathIs(
  equals(equiv),
  [property],
  input
); };
var propEq = curry(
  𝘍propEq
);

var random = function (x) {
	if ( x === void 0 ) x = 1;
	return Math.round(Math.random() * x);
};

var floor = function (x) { return Math.floor(Math.random() * x); };
var floorMin = curry(function (min, x) { return floor(x) + min; });

var f = /*#__PURE__*/Object.freeze({
  floor: floor,
  floorMin: floorMin
});

var keys$1 = Object.keys;
var take = curry(function (encase, o) {
  var obj;
  if (o && o[0] && o.length) {
    var found = floor(o.length);
    var selection = o[found];
    return (
      !encase ?
        selection :
        [selection]
    )
  }
  var ks = keys$1(o);
  var index = floor(ks.length);
  var key = ks[index];
  var value = o[key];
  return (
    !encase ?
      value :
      ( obj = {}, obj[key] = value, obj )
  )
});
var pick = take(false);
var grab = take(true);
var allot = curry(
  function (howMany, ofThing) { return iterate(howMany, function () { return grab(ofThing); }); }
);

var t = /*#__PURE__*/Object.freeze({
  take: take,
  pick: pick,
  grab: grab,
  allot: allot
});

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var wordSource = curry(
  function (source, howLong) { return pipe(
    allot(howLong),
    join("")
  )(source); }
);
var word = function (x) {
  if ( x === void 0 ) x = 5;
  return wordSource(alphabet, x);
};

var w = /*#__PURE__*/Object.freeze({
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

var s = /*#__PURE__*/Object.freeze({
  shuffle: shuffle
});

var round$1 = round;
round$1.toString = function () { return "~(?)"; };
var random$1 = Object.assign(random, f, t, w, s);
random$1.toString = function () { return "👾 (?)"; };
var curry$1 = debug_7;
curry$1.toString = function () { return "🍛 (?)"; };
var pipe$1 = debug_2;
pipe$1.toString = function () { return "🍡 (?)"; };
var compose$$1 = debug_3;
compose$$1.toString = function () { return "🙃 🍡 (?)"; };
var isDistinctObject$1 = isDistinctObject;
isDistinctObject$1.toString = function () { return "isTrueObject(?)"; };
var isPOJO$1 = isDistinctObject$1;
var toPairs$1 = toPairs;
toPairs$1.toString = function () { return "ᗕ(?)"; };
var fromPairs$1 = fromPairs;
fromPairs$1.toString = function () { return "ᗒ(?)"; };
var isNil$1 = curry$1(isNil);
isNil$1.toString = function () { return "curry(𝘍isTypeof)(null)(?)"; };
var trim$1 = debug_16("trim");
var charAt$1 = debug_17("charAt");
var codePointAt$1 = debug_17("codePointAt");
var concat$1 = debug_17("concat");
var fold = debug_18("fold");
var fork = debug_18("fork");
var join$1 = debug_17("join");
var match$1 = debug_17("match");
var repeat$1 = debug_17("repeat");
var search$1 = debug_17("search");
var split$1 = debug_17("split");
var padEnd$1 = debug_18("padEnd");
var padStart$1 = debug_18("padStart");
var replace$1 = debug_18("replace");
var substr$1 = debug_18("substr");
var isTypeof$1 = curry$1(𝘍isTypeof);
var isBoolean$1 = isTypeof$1("boolean");
var isNumber$1 = isTypeof$1("number");
var isFunction$1 = isTypeof$1("function");
var isString$1 = isTypeof$1("string");
var isObject$1 = isTypeof$1("object");
var add$1 = curry$1(𝘍add);
var alterIndex$1 = curry$1(𝘍alterIndex);
var ap$1 = curry$1(𝘍ap);
var choice$1 = curry$1(𝘍choice);
var difference$1 = curry$1(𝘍difference);
var divide$1 = curry$1(𝘍divide);
var endsWith$1 = curry$1(𝘍endsWith);
var equal$1 = curry$1(𝘍equals);
var equals$1 = equal$1;
var indexOf$1 = curry$1(𝘍indexOf);
var iterate$1 = curry$1(𝘍iterate);
var lastIndexOf$1 = curry$1(𝘍lastIndexOf);
var map$4 = curry$1(𝘍map);
var merge$1 = curry$1(𝘍merge);
var multiply$1 = curry$1(𝘍multiply);
var pairwise$1 = curry$1(𝘍pairwise);
var pairwiseObject$1 = curry$1(𝘍pairwiseObject);
var pathEq$1 = curry$1(𝘍pathEq);
var pathIs$1 = curry$1(𝘍pathIs);
var pathOr$1 = curry$1(𝘍pathOr);
var path$1 = pathOr$1(null);
var pow$1 = curry$1(𝘍pow);
var propEq$1 = curry$1(𝘍propEq);
var propIs$1 = curry$1(𝘍propIs);
var propOr$1 = curry$1(𝘍propOr);
var prop$1 = propOr$1(null);
var range$1 = curry$1(𝘍range);
var reject$1 = curry$1(𝘍reject);
var relativeIndex$1 = curry$1(𝘍relativeIndex);
var sort$1 = curry$1(𝘍sort);
var startsWith$1 = curry$1(𝘍startsWith);
var subtract$1 = curry$1(𝘍subtract);
var symmetricDifference$1 = curry$1(𝘍symmetricDifference);
var ternary$1 = curry$1(𝘍ternary);
var triplet$1 = curry$1(𝘍triplet);
var chain = curry$1(function 𝘍chain(fn, functor) {
  return 𝘍delegateFastBinary("chain", _flatMap, fn, functor)
});
var flatMap = chain;
var filter$4 = curry$1(function 𝘍filter(fn, functor) {
  return 𝘍delegateFastBinary("filter", filter$2, fn, functor)
});
var reduce$4 = curry$1(function 𝘍reduce(fn, initial, functor) {
  return 𝘍delegateFastTertiary("reduce", reduce$2, fn, initial, functor)
});
var mapTuples$1 = pairwiseObject$1(map$4);
var mapTuple$1 = mapTuples$1;
var 𝘍mapKeys$1 = function (fn, o) { return mapTuples$1(
  function (ref) {
    var k = ref[0];
    var v = ref[1];
    return ([fn(k), v]);
  },
  o
); };
var mapKeys$1 = curry$1(𝘍mapKeys$1);
var flip = function (fn) { return curry$1(function 𝘍flip(a, b) {
  return fn(b, a)
}); };
flip.toString = function () { return "🙃 🍛 (?)"; };
var alterLastIndex$1 = alterIndex$1(-1);
var alterFirstIndex$1 = alterIndex$1(0);
var invert$1 = invert;
var not$1 = function (fn) { return pipe$1(
  fn,
  invert$1
); };
not$1.toString = function () { return "❗️(?)"; };
var not1$1 = curry$1(function (fn, a) { return pipe$1(
  fn(a),
  invert$1
); });
not1$1.toString = function () { return "❗️1(?,?)"; };
var not2$1 = curry$1(function (fn, a, b) { return pipe$1(
  fn(a, b),
  invert$1
); });
not2$1.toString = function () { return "❗️2(?,?,?)"; };
var not3$1 = curry$1(function (fn, a, b, c) { return pipe$1(
  fn(a, b, c),
  invert$1
); });
not3$1.toString = function () { return "❗️3(?,?,?,?)"; };
var propLength = prop$1("length");
var objectLength = pipe$1(Object.keys, propLength);
var length = function (x) { return (
  typeof x === "object" ?
    objectLength(x) :
    propLength(x)
); };
length.toString = function () { return "length(?)"; };
var which = curry$1(function 𝘍which(compare, fn, o) {
  var arecomp = flip(compare);
  return triplet$1(
    Array.isArray,
    arecomp(fn),
    pipe$1(
      Object.keys,
      arecomp(function (key) { return fn(o[key], key); })
    ),
    o
  )
});
some.toString = function () { return "some"; };
var some$1 = which(some);
every.toString = function () { return "every"; };
var every$1 = which(every);

export { round$1 as round, random$1 as random, curry$1 as curry, pipe$1 as pipe, compose$$1 as compose, isDistinctObject$1 as isDistinctObject, isPOJO$1 as isPOJO, toPairs$1 as toPairs, fromPairs$1 as fromPairs, isNil$1 as isNil, trim$1 as trim, charAt$1 as charAt, codePointAt$1 as codePointAt, concat$1 as concat, fold, fork, join$1 as join, match$1 as match, repeat$1 as repeat, search$1 as search, split$1 as split, padEnd$1 as padEnd, padStart$1 as padStart, replace$1 as replace, substr$1 as substr, isTypeof$1 as isTypeof, isBoolean$1 as isBoolean, isNumber$1 as isNumber, isFunction$1 as isFunction, isString$1 as isString, isObject$1 as isObject, add$1 as add, alterIndex$1 as alterIndex, ap$1 as ap, choice$1 as choice, difference$1 as difference, divide$1 as divide, endsWith$1 as endsWith, equal$1 as equal, equals$1 as equals, indexOf$1 as indexOf, iterate$1 as iterate, lastIndexOf$1 as lastIndexOf, map$4 as map, merge$1 as merge, multiply$1 as multiply, pairwise$1 as pairwise, pairwiseObject$1 as pairwiseObject, pathEq$1 as pathEq, pathIs$1 as pathIs, pathOr$1 as pathOr, path$1 as path, pow$1 as pow, propEq$1 as propEq, propIs$1 as propIs, propOr$1 as propOr, prop$1 as prop, range$1 as range, reject$1 as reject, relativeIndex$1 as relativeIndex, sort$1 as sort, startsWith$1 as startsWith, subtract$1 as subtract, symmetricDifference$1 as symmetricDifference, ternary$1 as ternary, triplet$1 as triplet, chain, flatMap, filter$4 as filter, reduce$4 as reduce, mapTuples$1 as mapTuples, mapTuple$1 as mapTuple, mapKeys$1 as mapKeys, flip, alterLastIndex$1 as alterLastIndex, alterFirstIndex$1 as alterFirstIndex, invert$1 as invert, not$1 as not, not1$1 as not1, not2$1 as not2, not3$1 as not3, length, which, some$1 as some, every$1 as every, keys, assign, freeze, entries, isArray, debug_11 as $, debug_12 as PLACEHOLDER, debug_8 as curryify, debug_4 as curryObjectK, debug_5 as curryObjectN, debug_6 as curryObjectKN, debug_9 as remap, debug_10 as remapArray, debug_13 as K, debug_14 as I };
