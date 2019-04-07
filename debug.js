'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var katsuCurry = require('katsu-curry');
var katsuCurry__default = _interopDefault(katsuCurry);
var entrust = require('entrust');
var _flatMap = _interopDefault(require('flatmap-fast'));

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
var curry = function (fn) {
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
var delegatee = curry(function (method, arg, x) { return (x[method](arg)); });
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
function pipe() {
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
var prop = curry(function (property, o) { return o && property && o[property]; });
var _keys = Object.keys;
var keys = _keys;
var propLength = prop("length");
var objectLength = pipe$1(keys, propLength);
var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };
var flipIncludes = curry(function (list, x) { return list.includes(x); });
var matchingKeys = curry(
  function (list, o) { return filter(
    flipIncludes(list),
    keys(o)
  ); }
);
var matchingKeyCount = curry(
  function (list, o) { return pipe$1(
    matchingKeys(list),
    length
  )(o); }
);
var expectKArgs = function (expected, args) { return (
  matchingKeyCount(expected, args) >= Object.keys(expected).length
); };
var join = curry(function (y, x) { return x.join(y); });
var repeat = curry(function (y, x) { return x.repeat(y); });
var split = curry(function (y, x) { return x.split(y); });
var map = curry(function (y, x) { return x.map(y); });
var add = curry(function (y, x) { return x + y; });
var subtract = curry(function (y, x) { return x - y; });
var safeJoin = curry(
  function (joiner, x) { return (
    x.length > 0 ?
      joiner(x) :
      ""
  ); }
);
var wrap = curry(
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
var makeRemainder = curry(function (str, length) { return (
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
var without = curry(
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
var merge = curry(function (x, y) { return Object.assign({}, x, y); });
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
var curryObjectK = curry(
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
exports.pipe = pipe;
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
var e0 = katsuCurry__default.curry(entrust0);
var entrust1 = function (fn, a, x) { return x[fn](a); };
var e1 = katsuCurry__default.curry(entrust1);
var entrust2 = function (fn, a, b, x) { return x[fn](a, b); };
var e2 = katsuCurry__default.curry(entrust2);
var entrust3 = function (fn, a, b, c, x) { return x[fn](a, b, c); };
var e3 = katsuCurry__default.curry(entrust3);
var entrust4 = function (fn, a, b, c, d, x) { return x[fn](a, b, c, d); };
var e4 = katsuCurry__default.curry(entrust4);
var entrust5 = function (fn, a, b, c, d, e, x) { return x[fn](a, b, c, d, e); };
var e5 = katsuCurry__default.curry(entrust5);
var entrust6 = function (fn, a, b, c, d, e, f, x) { return x[fn](a, b, c, d, e, f); };
var e6 = katsuCurry__default.curry(entrust6);
var entrust7 = function (fn, a, b, c, d, e, f, g, x) { return x[fn](a, b, c, d, e, f, g); };
var e7 = katsuCurry__default.curry(entrust7);
var entrust8 = function (fn, a, b, c, d, e, f, g, h, x) { return x[fn](a, b, c, d, e, f, g, h); };
var e8 = katsuCurry__default.curry(entrust8);
var entrust9 = function (fn, a, b, c, d, e, f, g, h, i, x) { return x[fn](a, b, c, d, e, f, g, h, i); };
var e9 = katsuCurry__default.curry(entrust9);
var entrust10 = function (fn, a, b, c, d, e, f, g, h, i, j, x) { return x[fn](
  a, b, c, d, e, f, g, h, i, j
); };
var e10 = katsuCurry__default.curry(entrust10);
var entrustN = function (n, method, args, delegatee) {
  var entrustees = [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10];
  var params = [method ].concat( args, [delegatee]);
  return entrustees[n].apply(null, params)
};
var eN = katsuCurry__default.curry(entrustN);
function entrustD(n, m, a, d) {
  if (n !== a.length) {
    throw new Error((m + " expects total args (" + (a.length) + ") to equal the given arity (" + n + ")"))
  }
  return entrustN(n, m, a, d)
}
var eD = katsuCurry__default.curry(
  entrustD
);
var custom = function (curry) {
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
    return (( obj = {}, obj[k] = curry(raw[k]), obj ));
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
var curry = function (fn) {
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
var delegatee = curry(function (method, arg, x) { return (x[method](arg)); });
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
function pipe() {
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
var prop = curry(function (property, o) { return o && property && o[property]; });
var _keys = Object.keys;
var keys = _keys;
var propLength = prop("length");
var objectLength = pipe$1(keys, propLength);
var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };
var flipIncludes = curry(function (list, x) { return list.includes(x); });
var matchingKeys = curry(
  function (list, o) { return filter(
    flipIncludes(list),
    keys(o)
  ); }
);
var matchingKeyCount = curry(
  function (list, o) { return pipe$1(
    matchingKeys(list),
    length
  )(o); }
);
var expectKArgs = function (expected, args) { return (
  matchingKeyCount(expected, args) >= Object.keys(expected).length
); };
var join = curry(function (y, x) { return x.join(y); });
var repeat = curry(function (y, x) { return x.repeat(y); });
var split = curry(function (y, x) { return x.split(y); });
var map = curry(function (y, x) { return x.map(y); });
var add = curry(function (y, x) { return x + y; });
var subtract = curry(function (y, x) { return x - y; });
var safeJoin = curry(
  function (joiner, x) { return (
    x.length > 0 ?
      joiner(x) :
      ""
  ); }
);
var wrap = curry(
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
var makeRemainder = curry(function (str, length) { return (
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
var without = curry(
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
var merge = curry(function (x, y) { return Object.assign({}, x, y); });
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
var curryObjectK = curry(
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
exports.pipe = pipe;
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

var __isTypeof = function (type, x) { return type === typeof x; };
var isTypeof = katsuCurry.curry(__isTypeof);
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
var __willDelegate = function (method, functor) { return has(method, functor) && !isArray$1(functor); };
function __delegateFastBinary(method, fast, fn, functor) {
  return __willDelegate(method, functor)
    ? functor[method](fn)
    : fast(functor, fn)
}
var delegateFastBinary = katsuCurry.curry(__delegateFastBinary);
function __delegateFastTertiary(method, fast, fn, initial, functor) {
  return __willDelegate(method, functor)
    ? functor[method](fn, initial)
    : fast(functor, fn, initial)
}
var delegateFastTertiary = katsuCurry.curry(__delegateFastTertiary);

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

var __map = function (fn, functor) {
  if (functor && !Array.isArray(functor) && functor.map) { return functor.map(fn) }
  return map$2(functor, fn)
};
var map$3 = katsuCurry.curry(__map);

var __ap = function (applicative, functor) {
  if (functor && functor.ap && isFunction(functor.ap))
    { return functor.ap(applicative) }
  if (isFunction(functor)) { return function (x) { return applicative(x)(functor(x)); } }
  return reduce$3(function (agg, f) { return agg.concat(map$3(f, functor)); }, [], applicative)
};
var ap = katsuCurry.curry(__ap);

var __choice = function (cnFn, b, a) { return (cnFn(a, b) ? a : b); };
var choice = katsuCurry.curry(__choice);

var __iterate = function (total, fn) {
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
var iterate = katsuCurry.curry(__iterate);

var __range = function (start, end) {
  var agg = [];
  var swap = start < end;
  var ref = swap ? [start, end] : [end + 1, start + 1];
  var a = ref[0];
  var b = ref[1];
  for (var x = a; x < b; x++) {
    agg.push(x);
  }
  return swap ? agg : agg.reverse()
};
var range = katsuCurry.curry(__range);

var filter$3 = delegateFastBinary("filter", filter$2);

var __reject = function (fn, o) { return filter$3(function (x) { return !fn(x); }, o); };
var reject = katsuCurry.curry(__reject);

var __ternary = function (cn, b, a) { return (cn ? a : b); };
var ternary = katsuCurry.curry(__ternary);

var __triplet = function (cnFn, bFn, aFn, o) { return (cnFn(o) ? aFn(o) : bFn(o)); };
var triplet = katsuCurry.curry(__triplet);

var _keys = Object.keys;
var _freeze = Object.freeze;
var _assign = Object.assign;
var keys = _keys;
var freeze = _freeze;
var assign = _assign;
var entries = function (o) { return katsuCurry.pipe(
    keys,
    map$3(function (k) { return [k, o[k]]; })
  )(o); };
var toPairs = entries;
var fromPairs = reduce$3(function (agg, ref) {
  var obj;
  var k = ref[0];
  var v = ref[1];
  return merge(agg, ( obj = {}, obj[k] = v, obj ));
}, {});
var __pairwise = function (hoc, fn, o) { return katsuCurry.pipe(
    toPairs,
    hoc(fn)
  )(o); };
var pairwise = katsuCurry.curry(__pairwise);
var __pairwiseObject = function (hoc, fn, o) { return katsuCurry.pipe(
    pairwise(hoc, fn),
    fromPairs
  )(o); };
var pairwiseObject = katsuCurry.curry(__pairwiseObject);
var mapTuples = pairwiseObject(map$3);
var __mapKeys = function (fn, o) { return mapTuples(function (ref) {
  var k = ref[0];
  var v = ref[1];
  return [fn(k), v];
  }, o); };
var mapKeys = katsuCurry.curry(__mapKeys);
var __merge = function (a, b) { return assign({}, a, b); };
var merge = katsuCurry.curry(__merge);

var not = function (x) { return !x; };
var invert = function (x) { return Object.keys(x).reduce(function (o, key) {
    var value = x[key];
    o[value] = o[value] ? o[value].concat(key) : [key];
    return o
  }, {}); };

var trim = entrust.e0("trim");
var charAt = entrust.e1("charAt");
var codePointAt = entrust.e1("codePointAt");
var match = katsuCurry.curry(function (a, b) {
  var z = b.match(a);
  return z === null ? [] : z
});
var repeat = katsuCurry.curry(function (x, n) {
  var output = new Array(n);
  for (var i = 0; i < n; i++) {
    output[i] = x;
  }
  return output
});
var search = entrust.e1("search");
var split = entrust.e1("split");
var endsWithLength = entrust.e2("endsWith");
var __endsWith = function (x, i) {
  var last = i[i.length - 1];
  return Array.isArray(x) ? last === x[0] : last === x
};
var endsWith = katsuCurry.curry(__endsWith);
var indexOfFromIndex = entrust.e2("indexOf");
var __indexOf = function (toSearch, x) { return indexOfFromIndex(toSearch, 0, x); };
var indexOf = katsuCurry.curry(__indexOf);
var lastIndexOfFromIndex = entrust.e2("lastIndexOf");
var __lastIndexOf = function (toSearch, x) { return lastIndexOfFromIndex(toSearch, Infinity, x); };
var lastIndexOf = katsuCurry.curry(__lastIndexOf);
var padEnd = entrust.e2("padEnd");
var padStart = entrust.e2("padStart");
var replace = entrust.e2("replace");
var startsWithFromPosition = entrust.e2("startsWith");
var __startsWith = function (x, i) {
  var first = i[0];
  return Array.isArray(x) ? first === x[0] : first === x
};
var startsWith = katsuCurry.curry(__startsWith);
var substr = entrust.e2("substr");

var join = entrust.e1("join");
var concat = katsuCurry.curry(function (a, b) { return a.concat(b); });
var __sort = function (fn, functor) {
  var copy = Array.from(functor);
  copy.sort(fn);
  return copy
};
var sort = katsuCurry.curry(__sort);
var __difference = function (bList, aList) { return filter$3(function (x) { return !aList.includes(x); }, bList); };
var difference = katsuCurry.curry(__difference);
var __symmetricDifference = function (a, b) {
  var ab = difference(a, b);
  var ba = difference(b, a);
  return ab.concat(ba)
};
var symmetricDifference = katsuCurry.curry(__symmetricDifference);
var __relativeIndex = function (length, index) { return index > -1 ? index : length - Math.abs(index); };
var relativeIndex = katsuCurry.curry(__relativeIndex);
var __alterIndex = function (index, fn, input) {
  var i = relativeIndex(input.length, index);
  var copy = [].concat(input);
  copy[i] = fn(copy[i]);
  return copy
};
var alterIndex = katsuCurry.curry(__alterIndex);
var alterFirstIndex = alterIndex(0);
var alterLastIndex = alterIndex(-1);

var __equals = function (a, b) { return a === b; };
var equals = katsuCurry.curry(__equals);
var __greaterThan = function (b, a) { return a > b; };
var greaterThan = katsuCurry.curry(__greaterThan);
var __greaterThanOrEqualTo = function (b, a) { return a >= b; };
var greaterThanOrEqualTo = katsuCurry.curry(__greaterThanOrEqualTo);
var __lessThan = function (b, a) { return a < b; };
var lessThan = katsuCurry.curry(__lessThan);
var __lessThanOrEqualTo = function (b, a) { return a <= b; };
var lessThanOrEqualTo = katsuCurry.curry(__lessThanOrEqualTo);
var round = Math.round;
var __add = function (a, b) { return b + a; };
var add = katsuCurry.curry(__add);
var __subtract = function (a, b) { return a - b; };
var subtract = katsuCurry.curry(__subtract);
var __multiply = function (a, b) { return b * a; };
var multiply = katsuCurry.curry(__multiply);
var __divide = function (a, b) { return a / b; };
var divide = katsuCurry.curry(__divide);
var __pow = function (a, b) { return Math.pow(b, a); };
var pow = katsuCurry.curry(__pow);

var __pathOr = function (def, lenses, input) { return reduce$3(function (focus, lens) { return focus[lens] || def; }, input, lenses); };
var pathOr = katsuCurry.curry(__pathOr);
var __pathSatisfies = function (equiv, pathTo, input) { return katsuCurry.pipe(
    path(pathTo),
    equiv,
    Boolean
  )(input); };
var pathSatisfies = katsuCurry.curry(__pathSatisfies);
var __propSatisfies = function (equiv, propTo, input) { return katsuCurry.pipe(
    prop(propTo),
    equiv,
    Boolean
  )(input); };
var propSatisfies = katsuCurry.curry(__propSatisfies);
var path = pathOr(null);
var __propOr = function (def, property, input) { return pathOr(def, [property], input); };
var propOr = katsuCurry.curry(__propOr);
var prop = propOr(null);
var __pathEq = function (lenses, equiv, input) { return pathSatisfies(equals(equiv), lenses, input); };
var pathEq = katsuCurry.curry(__pathEq);
var __propIs = function (type, property, input) { return katsuCurry.pipe(
    prop(property),
    function (val) { return (val != null && val.constructor === type) || val instanceof type; },
    Boolean
  )(input); };
var propIs = katsuCurry.curry(__propIs);
var __propEq = function (property, equiv, input) { return pathSatisfies(equals(equiv), [property], input); };
var propEq = katsuCurry.curry(__propEq);

var random = function (x) {
	if ( x === void 0 ) x = 1;
	return Math.round(Math.random() * x);
};

var floor = function (x) { return Math.floor(Math.random() * x); };
var floorMin = katsuCurry.curry(function (min, x) { return floor(x) + min; });

var f = /*#__PURE__*/Object.freeze({
  floor: floor,
  floorMin: floorMin
});

var keys$1 = Object.keys;
var take = katsuCurry.curry(function (encase, o) {
  var obj;
  if (o && o[0] && o.length) {
    var found = floor(o.length);
    var selection = o[found];
    return !encase ? selection : [selection]
  }
  var ks = keys$1(o);
  var index = floor(ks.length);
  var key = ks[index];
  var value = o[key];
  if (encase) { return ( obj = {}, obj[key] = value, obj ) }
  return value
});
var pick = take(false);
var grab = take(true);
var allot = katsuCurry.curry(function (howMany, ofThing) { return iterate(howMany, function () { return pick(ofThing); }); }
);

var t = /*#__PURE__*/Object.freeze({
  take: take,
  pick: pick,
  grab: grab,
  allot: allot
});

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var wordSource = katsuCurry.curry(function (source, howLong) { return katsuCurry.pipe(
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
var curry$$1 = debug_7;
curry$$1.toString = function () { return "🍛 (?)"; };
var pipe$$1 = debug_2;
pipe$$1.toString = function () { return "🍡 (?)"; };
var compose$$1 = debug_3;
compose$$1.toString = function () { return "🙃 🍡 (?)"; };
var isDistinctObject$1 = isDistinctObject;
isDistinctObject$1.toString = function () { return "isTrueObject(?)"; };
var isPOJO$1 = isDistinctObject$1;
var toPairs$1 = toPairs;
toPairs$1.toString = function () { return "ᗕ(?)"; };
var fromPairs$1 = fromPairs;
fromPairs$1.toString = function () { return "ᗒ(?)"; };
var isNil$1 = curry$$1(isNil);
isNil$1.toString = function () { return "curry(__isTypeof)(null)(?)"; };
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
var isTypeof$1 = curry$$1(__isTypeof);
var isBoolean$1 = isTypeof$1("boolean");
var isNumber$1 = isTypeof$1("number");
var isFunction$1 = isTypeof$1("function");
var isString$1 = isTypeof$1("string");
var isObject$1 = isTypeof$1("object");
var add$1 = curry$$1(__add);
var alterIndex$1 = curry$$1(__alterIndex);
var ap$1 = curry$$1(__ap);
var choice$1 = curry$$1(__choice);
var difference$1 = curry$$1(__difference);
var divide$1 = curry$$1(__divide);
var endsWith$1 = curry$$1(__endsWith);
var equal$1 = curry$$1(__equals);
var equals$1 = equal$1;
var indexOf$1 = curry$$1(__indexOf);
var iterate$1 = curry$$1(__iterate);
var lastIndexOf$1 = curry$$1(__lastIndexOf);
var map$4 = curry$$1(__map);
var merge$1 = curry$$1(__merge);
var multiply$1 = curry$$1(__multiply);
var pairwise$1 = curry$$1(__pairwise);
var pairwiseObject$1 = curry$$1(__pairwiseObject);
var pathEq$1 = curry$$1(__pathEq);
var pathOr$1 = curry$$1(__pathOr);
var pathSatisfies$1 = curry$$1(__pathSatisfies);
var path$1 = pathOr$1(null);
var pow$1 = curry$$1(__pow);
var propEq$1 = curry$$1(__propEq);
var propIs$1 = curry$$1(__propIs);
var propOr$1 = curry$$1(__propOr);
var propSatisfies$1 = curry$$1(__propSatisfies);
var prop$1 = propOr$1(null);
var range$1 = curry$$1(__range);
var reject$1 = curry$$1(__reject);
var relativeIndex$1 = curry$$1(__relativeIndex);
var sort$1 = curry$$1(__sort);
var startsWith$1 = curry$$1(__startsWith);
var subtract$1 = curry$$1(__subtract);
var symmetricDifference$1 = curry$$1(__symmetricDifference);
var ternary$1 = curry$$1(__ternary);
var triplet$1 = curry$$1(__triplet);
var chain = curry$$1(function __chain(fn, functor) {
  return __delegateFastBinary("chain", _flatMap, fn, functor)
});
var flatMap = chain;
var filter$4 = curry$$1(function __filter(fn, functor) {
  return __delegateFastBinary("filter", filter$2, fn, functor)
});
var reduce$4 = curry$$1(function __reduce(fn, initial, functor) {
  return __delegateFastTertiary("reduce", reduce$2, fn, initial, functor)
});
var mapTuples$1 = pairwiseObject$1(map$4);
var mapTuple$1 = mapTuples$1;
var __mapKeys$1 = function (fn, o) { return mapTuples$1(function (ref) {
  var k = ref[0];
  var v = ref[1];
  return [fn(k), v];
  }, o); };
var mapKeys$1 = curry$$1(__mapKeys$1);
var flip = function (fn) { return curry$$1(function __flip(a, b) {
    return fn(b, a)
  }); };
flip.toString = function () { return "🙃 🍛 (?)"; };
var alterLastIndex$1 = alterIndex$1(-1);
var alterFirstIndex$1 = alterIndex$1(0);
var invert$1 = invert;
var not$1 = not;
var propLength = prop$1("length");
var objectLength = pipe$$1(
  Object.keys,
  propLength
);
var length = function (x) { return typeof x === "object" ? objectLength(x) : propLength(x); };
length.toString = function () { return "length(?)"; };
var which = curry$$1(function __which(compare, fn, o) {
  var arecomp = flip(compare);
  return triplet$1(
    Array.isArray,
    arecomp(fn),
    pipe$$1(
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

exports.round = round$1;
exports.random = random$1;
exports.curry = curry$$1;
exports.pipe = pipe$$1;
exports.compose = compose$$1;
exports.isDistinctObject = isDistinctObject$1;
exports.isPOJO = isPOJO$1;
exports.toPairs = toPairs$1;
exports.fromPairs = fromPairs$1;
exports.isNil = isNil$1;
exports.trim = trim$1;
exports.charAt = charAt$1;
exports.codePointAt = codePointAt$1;
exports.concat = concat$1;
exports.fold = fold;
exports.fork = fork;
exports.join = join$1;
exports.match = match$1;
exports.repeat = repeat$1;
exports.search = search$1;
exports.split = split$1;
exports.padEnd = padEnd$1;
exports.padStart = padStart$1;
exports.replace = replace$1;
exports.substr = substr$1;
exports.isTypeof = isTypeof$1;
exports.isBoolean = isBoolean$1;
exports.isNumber = isNumber$1;
exports.isFunction = isFunction$1;
exports.isString = isString$1;
exports.isObject = isObject$1;
exports.add = add$1;
exports.alterIndex = alterIndex$1;
exports.ap = ap$1;
exports.choice = choice$1;
exports.difference = difference$1;
exports.divide = divide$1;
exports.endsWith = endsWith$1;
exports.equal = equal$1;
exports.equals = equals$1;
exports.indexOf = indexOf$1;
exports.iterate = iterate$1;
exports.lastIndexOf = lastIndexOf$1;
exports.map = map$4;
exports.merge = merge$1;
exports.multiply = multiply$1;
exports.pairwise = pairwise$1;
exports.pairwiseObject = pairwiseObject$1;
exports.pathEq = pathEq$1;
exports.pathOr = pathOr$1;
exports.pathSatisfies = pathSatisfies$1;
exports.path = path$1;
exports.pow = pow$1;
exports.propEq = propEq$1;
exports.propIs = propIs$1;
exports.propOr = propOr$1;
exports.propSatisfies = propSatisfies$1;
exports.prop = prop$1;
exports.range = range$1;
exports.reject = reject$1;
exports.relativeIndex = relativeIndex$1;
exports.sort = sort$1;
exports.startsWith = startsWith$1;
exports.subtract = subtract$1;
exports.symmetricDifference = symmetricDifference$1;
exports.ternary = ternary$1;
exports.triplet = triplet$1;
exports.chain = chain;
exports.flatMap = flatMap;
exports.filter = filter$4;
exports.reduce = reduce$4;
exports.mapTuples = mapTuples$1;
exports.mapTuple = mapTuple$1;
exports.mapKeys = mapKeys$1;
exports.flip = flip;
exports.alterLastIndex = alterLastIndex$1;
exports.alterFirstIndex = alterFirstIndex$1;
exports.invert = invert$1;
exports.not = not$1;
exports.length = length;
exports.which = which;
exports.some = some$1;
exports.every = every$1;
exports.keys = keys;
exports.assign = assign;
exports.freeze = freeze;
exports.entries = entries;
exports.isArray = isArray;
exports.$ = debug_11;
exports.PLACEHOLDER = debug_12;
exports.curryify = debug_8;
exports.curryObjectK = debug_4;
exports.curryObjectN = debug_5;
exports.curryObjectKN = debug_6;
exports.remap = debug_9;
exports.remapArray = debug_10;
exports.K = debug_13;
exports.I = debug_14;
