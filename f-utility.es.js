import { curry, pipe } from 'katsu-curry';
export { pipe, compose, $, PLACEHOLDER, curryify, curry, curryObjectK, curryObjectN, curryObjectKN, remap, remapArray, K, I } from 'katsu-curry';
import { e1, e2, e0 } from 'entrust';
import _flatMap from 'flatmap-fast';

var version = "3.5.7";

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

var keys = Object.keys;
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
  var ks = keys(o);
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
var 𝘍willDelegate = function (method, functor) { return (
  has(method, functor) && !isArray(functor)
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

var filter$3 = delegateFastBinary("filter", filter$2);

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

var 𝘍choice = function (cnFn, b, a) { return cnFn(a, b) ? a : b; };
var choice = curry(𝘍choice);

var flip = function (fn) { return curry(function (a, b) { return fn(b, a); }); };

var fork = e2("fork");

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

var 𝘍ap = function (applicative, functor) {
  if (functor && functor.ap && isFunction(functor.ap)) { return functor.ap(applicative) }
  if (isFunction(functor)) { return function (x) { return (applicative(x)(functor(x))); } }
  return reduce$3(function (agg, f) { return agg.concat(map$3(f, functor)); }, [], applicative)
};
var ap = curry(𝘍ap);

var fold = e2("fold");

var chain = delegateFastBinary("chain", _flatMap);
var flatMap = chain;

var 𝘍equals = function (a, b) { return a === b; };
var equals = curry(𝘍equals);
var equal = equals;
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

var invert = function (x) { return !x; };
var not = function (fn) { return pipe(
  fn,
  invert
); };
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

var 𝘍reject = function (fn, o) { return filter$3(
  function (x) { return !fn(x); }, o
); };
var reject = curry(
  𝘍reject
);

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

var 𝘍ternary = function (cn, b, a) { return cn ? a : b; };
var ternary = curry(𝘍ternary);

var 𝘍triplet = function (cnFn, bFn, aFn, o) { return cnFn(o) ? aFn(o) : bFn(o); };
var triplet = curry(𝘍triplet);

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

var _keys = Object.keys;
var _freeze = Object.freeze;
var _assign = Object.assign;
var keys$1 = _keys;
var freeze = _freeze;
var assign = _assign;
var entries = function (o) { return pipe(
  keys$1,
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
var mapTuple = mapTuples;
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

var propLength = prop("length");
var objectLength = pipe(keys$1, propLength);
var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };

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
var 𝘍which = function (compare, fn, o) {
  var arecomp = flip(compare);
  return triplet(
    Array.isArray,
    arecomp(fn),
    pipe(
      keys$2,
      arecomp(function (key) { return fn(o[key], key); })
    ),
    o
  )
};
var which = curry(𝘍which);
var some$1 = which(some);
var every$1 = which(every);

var version$1 = version;
var random$1 = Object.assign(random, f, t, w, s);

export { version$1 as version, random$1 as random, concat, join, sort, symmetricDifference, difference, alterIndex, alterFirstIndex, alterLastIndex, relativeIndex, choice, filter$3 as filter, flip, fork, iterate, map$3 as map, ap, fold, chain, flatMap, equals, equal, round, add, subtract, divide, multiply, pow, invert, not, not1, not2, not3, reduce$3 as reduce, reject, charAt, codePointAt, endsWith, indexOf, lastIndexOf, match, padEnd, padStart, repeat, replace, search, split, startsWith, substr, trim, ternary, triplet, range, keys$1 as keys, assign, freeze, merge, entries, fromPairs, toPairs, mapTuple, mapTuples, mapKeys, pairwise, pairwiseObject, path, pathOr, prop, propOr, pathEq, pathIs, propIs, propEq, isTypeof, isBoolean, isNumber, isFunction, isString, isObject, isNil, isArray$1 as isArray, isDistinctObject, isPOJO, length, which, some$1 as some, every$1 as every };
