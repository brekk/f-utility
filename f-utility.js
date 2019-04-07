'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var katsuCurry = require('katsu-curry');
var entrust = require('entrust');
var _flatMap = _interopDefault(require('flatmap-fast'));

var version = "3.5.8";

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

var keys = Object.keys;
var take = katsuCurry.curry(function (encase, o) {
  var obj;
  if (o && o[0] && o.length) {
    var found = floor(o.length);
    var selection = o[found];
    return !encase ? selection : [selection]
  }
  var ks = keys(o);
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

var has = function (x, y) { return !!y[x]; };
var isArray = Array.isArray;
var __willDelegate = function (method, functor) { return has(method, functor) && !isArray(functor); };
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

var filter$3 = delegateFastBinary("filter", filter$2);

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

var __choice = function (cnFn, b, a) { return (cnFn(a, b) ? a : b); };
var choice = katsuCurry.curry(__choice);

var flip = function (fn) { return katsuCurry.curry(function (a, b) { return fn(b, a); }); };

var fork = entrust.e2("fork");

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

var __isTypeof = function (type, x) { return type === typeof x; };
var isTypeof = katsuCurry.curry(__isTypeof);
var isBoolean = isTypeof("boolean");
var isNumber = isTypeof("number");
var isFunction = isTypeof("function");
var isString = isTypeof("string");
var isNil = function (x) { return x == null; };
var isObject = isTypeof("object");
var isArray$1 = Array.isArray;
var isDistinctObject = function (x) { return !isNil(x) && isObject(x) && !isArray$1(x); };
var isPOJO = isDistinctObject;

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

var reduce$3 = delegateFastTertiary("reduce", reduce$2);

var __ap = function (applicative, functor) {
  if (functor && functor.ap && isFunction(functor.ap))
    { return functor.ap(applicative) }
  if (isFunction(functor)) { return function (x) { return applicative(x)(functor(x)); } }
  return reduce$3(function (agg, f) { return agg.concat(map$3(f, functor)); }, [], applicative)
};
var ap = katsuCurry.curry(__ap);

var fold = entrust.e2("fold");

var chain = delegateFastBinary("chain", _flatMap);
var flatMap = chain;

var __equals = function (a, b) { return a === b; };
var equals = katsuCurry.curry(__equals);
var equal = equals;
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

var not = function (x) { return !x; };
var invert = function (x) { return Object.keys(x).reduce(function (o, key) {
    var value = x[key];
    o[value] = o[value] ? o[value].concat(key) : [key];
    return o
  }, {}); };

var __reject = function (fn, o) { return filter$3(function (x) { return !fn(x); }, o); };
var reject = katsuCurry.curry(__reject);

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

var __ternary = function (cn, b, a) { return (cn ? a : b); };
var ternary = katsuCurry.curry(__ternary);

var __triplet = function (cnFn, bFn, aFn, o) { return (cnFn(o) ? aFn(o) : bFn(o)); };
var triplet = katsuCurry.curry(__triplet);

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

var _keys = Object.keys;
var _freeze = Object.freeze;
var _assign = Object.assign;
var keys$1 = _keys;
var freeze = _freeze;
var assign = _assign;
var entries = function (o) { return katsuCurry.pipe(
    keys$1,
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
var mapTuple = mapTuples;
var __mapKeys = function (fn, o) { return mapTuples(function (ref) {
  var k = ref[0];
  var v = ref[1];
  return [fn(k), v];
  }, o); };
var mapKeys = katsuCurry.curry(__mapKeys);
var __merge = function (a, b) { return assign({}, a, b); };
var merge = katsuCurry.curry(__merge);

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

var propLength = prop("length");
var objectLength = katsuCurry.pipe(
  keys$1,
  propLength
);
var length = propLength;

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

var keys$2 = Object.keys;
var __which = function (compare, fn, o) {
  var arecomp = flip(compare);
  return triplet(
    Array.isArray,
    arecomp(fn),
    katsuCurry.pipe(
      keys$2,
      arecomp(function (key) { return fn(o[key], key); })
    ),
    o
  )
};
var which = katsuCurry.curry(__which);
var some$1 = which(some);
var every$1 = which(every);

var innerpipe = function (args) { return function (x) {
  var first = args[0];
  var rest = args.slice(1);
  var current = first(x);
  for (var a = 0; a < rest.length; a++) {
    current = rest[a](current);
  }
  return current
}; };
function compose() {
  var arguments$1 = arguments;
  var length = arguments.length;
  var args = new Array(length);
  for (var i = length - 1; i > -1; --i) {
    args[i] = arguments$1[i];
  }
  return innerpipe(args.reverse())
}
var version$1 = version;
var random$1 = Object.assign(random, f, t, w, s);

exports.pipe = katsuCurry.pipe;
exports.$ = katsuCurry.$;
exports.PLACEHOLDER = katsuCurry.PLACEHOLDER;
exports.curryify = katsuCurry.curryify;
exports.curry = katsuCurry.curry;
exports.curryObjectK = katsuCurry.curryObjectK;
exports.curryObjectN = katsuCurry.curryObjectN;
exports.curryObjectKN = katsuCurry.curryObjectKN;
exports.remap = katsuCurry.remap;
exports.remapArray = katsuCurry.remapArray;
exports.K = katsuCurry.K;
exports.I = katsuCurry.I;
exports.compose = compose;
exports.version = version$1;
exports.random = random$1;
exports.concat = concat;
exports.join = join;
exports.sort = sort;
exports.symmetricDifference = symmetricDifference;
exports.difference = difference;
exports.alterIndex = alterIndex;
exports.alterFirstIndex = alterFirstIndex;
exports.alterLastIndex = alterLastIndex;
exports.relativeIndex = relativeIndex;
exports.choice = choice;
exports.filter = filter$3;
exports.flip = flip;
exports.fork = fork;
exports.iterate = iterate;
exports.map = map$3;
exports.ap = ap;
exports.fold = fold;
exports.chain = chain;
exports.flatMap = flatMap;
exports.equals = equals;
exports.equal = equal;
exports.round = round;
exports.add = add;
exports.subtract = subtract;
exports.divide = divide;
exports.multiply = multiply;
exports.pow = pow;
exports.invert = invert;
exports.not = not;
exports.reduce = reduce$3;
exports.reject = reject;
exports.charAt = charAt;
exports.codePointAt = codePointAt;
exports.endsWith = endsWith;
exports.indexOf = indexOf;
exports.lastIndexOf = lastIndexOf;
exports.match = match;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.repeat = repeat;
exports.replace = replace;
exports.search = search;
exports.split = split;
exports.startsWith = startsWith;
exports.substr = substr;
exports.trim = trim;
exports.ternary = ternary;
exports.triplet = triplet;
exports.range = range;
exports.keys = keys$1;
exports.assign = assign;
exports.freeze = freeze;
exports.merge = merge;
exports.entries = entries;
exports.fromPairs = fromPairs;
exports.toPairs = toPairs;
exports.mapTuple = mapTuple;
exports.mapTuples = mapTuples;
exports.mapKeys = mapKeys;
exports.pairwise = pairwise;
exports.pairwiseObject = pairwiseObject;
exports.path = path;
exports.pathOr = pathOr;
exports.pathEq = pathEq;
exports.pathSatisfies = pathSatisfies;
exports.prop = prop;
exports.propOr = propOr;
exports.propIs = propIs;
exports.propEq = propEq;
exports.propSatisfies = propSatisfies;
exports.isTypeof = isTypeof;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.isNil = isNil;
exports.isArray = isArray$1;
exports.isDistinctObject = isDistinctObject;
exports.isPOJO = isPOJO;
exports.length = length;
exports.which = which;
exports.some = some$1;
exports.every = every$1;
