(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.FUTILITY = {})));
}(this, (function (exports) { 'use strict';

  var version = "3.5.8";

  var random = function (x) {
  	if ( x === void 0 ) x = 1;
  	return Math.round(Math.random() * x);
  };

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
  var innerpipe = function (args) { return function (x) {
    var first = args[0];
    var rest = args.slice(1);
    var current = first(x);
    for (var a = 0; a < rest.length; a++) {
      current = rest[a](current);
    }
    return current
  }; };
  function pipe() {
    var arguments$1 = arguments;
    var argLength = arguments.length;
    var args = new Array(argLength);
    for (var i = 0; i < argLength; ++i) {
      args[i] = arguments$1[i];
    }
    return innerpipe(args)
  }
  var prop = curry(function (property, o) { return o && property && o[property]; });
  var _keys = Object.keys;
  var keys = _keys;
  var propLength = prop("length");
  var objectLength = pipe(keys, propLength);
  var length = function (x) { return (typeof x === "object" ? objectLength(x) : propLength(x)); };
  var delegatee = curry(function (method, arg, x) { return (x[method](arg)); });
  var filter = delegatee("filter");
  var flipIncludes = curry(function (list, x) { return list.includes(x); });
  var matchingKeys = curry(
    function (list, o) { return filter(
      flipIncludes(list),
      keys(o)
    ); }
  );
  var matchingKeyCount = curry(
    function (list, o) { return pipe(
      matchingKeys(list),
      length
    )(o); }
  );
  var expectKArgs = function (expected, args) { return (
    matchingKeyCount(expected, args) >= Object.keys(expected).length
  ); };
  var curryObjectK = curry(
    function (keys, fn) {
      return function λcurryObjectK(args) {
        var includes = function (y) { return keys.includes(y); };
        return (
          Object.keys(args).filter(includes).length === keys.length ?
            fn(args) :
            function (z) { return λcurryObjectK(Object.assign({}, args, z)); }
        )
      }
    }
  );
  function curryObjectN(arity, fn) {
    return function λcurryObjectN(args) {
      var joined = function (z) { return λcurryObjectN(Object.assign({}, args, z)); };
      return (
        args && Object.keys(args).length >= arity ?
          fn(args) :
          joined
      )
    }
  }
  function curryObjectKN(ref, fn) {
    var k = ref.k;
    var n = ref.n;
    return function λcurryObjectKN(args) {
      var joined = function (z) { return λcurryObjectKN(Object.assign({}, args, z)); };
      return (
        expectKArgs(k, args) || Object.keys(args).length >= n ?
          fn(args) :
          joined
      )
    }
  }
  var curryify = function (test) {
    if (typeof test !== "function") {
      throw new TypeError("Expected to be given a function to test placeholders!")
    }
    return function (fn) {
      if (typeof fn !== "function") {
        throw new TypeError("Expected to be given a function to curry!")
      }
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
        var length = some$1(args, test) ? countNonPlaceholders(args) : args.length;
        return (
          length >= fn.length ?
          fn.apply(this, args) :
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
        )
      }
    }
  };
  var K = function (x) { return function () { return x; }; };
  var I = function (x) { return x; };
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
  var remapArray = curry(remapParameters);
  var remapFunction = function (indices, fn) {
    var remapArgs = remapArray(indices);
    var curried = curry(fn);
    return function remappedFn() {
      var args = remapArgs(Array.from(arguments));
      return curried.apply(null, args)
    }
  };
  var remap = curry(remapFunction);

  var floor = function (x) { return Math.floor(Math.random() * x); };
  var floorMin = curry(function (min, x) { return floor(x) + min; });

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
  var iterate = curry(__iterate);

  var keys$1 = Object.keys;
  var take = curry(function (encase, o) {
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
  var allot = curry(function (howMany, ofThing) { return iterate(howMany, function () { return pick(ofThing); }); }
  );

  var t = /*#__PURE__*/Object.freeze({
    take: take,
    pick: pick,
    grab: grab,
    allot: allot
  });

  var entrust0 = function (fn, x) { return x[fn](); };
  var e0 = curry(entrust0);
  var entrust1 = function (fn, a, x) { return x[fn](a); };
  var e1 = curry(entrust1);
  var entrust2 = function (fn, a, b, x) { return x[fn](a, b); };
  var e2 = curry(entrust2);

  var bindInternal3$1 = function bindInternal3 (func, thisContext) {
    return function (a, b, c) {
      return func.call(thisContext, a, b, c);
    };
  };

  var filter$1 = function fastFilter (subject, fn, thisContext) {
    var length = subject.length,
        result = [],
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
        i;
    for (i = 0; i < length; i++) {
      if (iterator(subject[i], i, subject)) {
        result.push(subject[i]);
      }
    }
    return result;
  };

  var filter$2 = function fastFilterObject (subject, fn, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        result = {},
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
        i, key;
    for (i = 0; i < length; i++) {
      key = keys[i];
      if (iterator(subject[key], key, subject)) {
        result[key] = subject[key];
      }
    }
    return result;
  };

  var filter$3 = function fastFilter (subject, fn, thisContext) {
    if (subject instanceof Array) {
      return filter$1(subject, fn, thisContext);
    }
    else {
      return filter$2(subject, fn, thisContext);
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
  var delegateFastBinary = curry(__delegateFastBinary);
  function __delegateFastTertiary(method, fast, fn, initial, functor) {
    return __willDelegate(method, functor)
      ? functor[method](fn, initial)
      : fast(functor, fn, initial)
  }
  var delegateFastTertiary = curry(__delegateFastTertiary);

  var filter$4 = delegateFastBinary("filter", filter$3);

  var join = e1("join");
  var concat = curry(function (a, b) { return a.concat(b); });
  var __sort = function (fn, functor) {
    var copy = Array.from(functor);
    copy.sort(fn);
    return copy
  };
  var sort = curry(__sort);
  var __difference = function (bList, aList) { return filter$4(function (x) { return !aList.includes(x); }, bList); };
  var difference = curry(__difference);
  var __symmetricDifference = function (a, b) {
    var ab = difference(a, b);
    var ba = difference(b, a);
    return ab.concat(ba)
  };
  var symmetricDifference = curry(__symmetricDifference);
  var __relativeIndex = function (length, index) { return index > -1 ? index : length - Math.abs(index); };
  var relativeIndex = curry(__relativeIndex);
  var __alterIndex = function (index, fn, input) {
    var i = relativeIndex(input.length, index);
    var copy = [].concat(input);
    copy[i] = fn(copy[i]);
    return copy
  };
  var alterIndex = curry(__alterIndex);
  var alterFirstIndex = alterIndex(0);
  var alterLastIndex = alterIndex(-1);

  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  var wordSource = curry(function (source, howLong) { return pipe(
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
  var choice = curry(__choice);

  var flip = function (fn) { return curry(function (a, b) { return fn(b, a); }); };

  var fork = e2("fork");

  var map = function fastMap (subject, fn, thisContext) {
    var length = subject.length,
        result = new Array(length),
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
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
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
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
  var map$3 = curry(__map);

  var __isTypeof = function (type, x) { return type === typeof x; };
  var isTypeof = curry(__isTypeof);
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
  var ap = curry(__ap);

  var fold = e2("fold");

  var flatten = function (a) {
    return a.reduce(function (x, y) {
      return x.concat(y);
    });
  };
  var flatMap = function (a                 , f               ) {
    return (!f) ? flatten(a) : flatten(a.map(f));
  };
  var flatmapFast = flatMap;

  var chain = delegateFastBinary("chain", flatmapFast);
  var flatMap$1 = chain;

  var __equals = function (a, b) { return a === b; };
  var equals = curry(__equals);
  var equal = equals;
  var round = Math.round;
  var __add = function (a, b) { return b + a; };
  var add = curry(__add);
  var __subtract = function (a, b) { return a - b; };
  var subtract = curry(__subtract);
  var __multiply = function (a, b) { return b * a; };
  var multiply = curry(__multiply);
  var __divide = function (a, b) { return a / b; };
  var divide = curry(__divide);
  var __pow = function (a, b) { return Math.pow(b, a); };
  var pow = curry(__pow);

  var not = function (x) { return !x; };
  var invert = function (x) { return Object.keys(x).reduce(function (o, key) {
      var value = x[key];
      o[value] = o[value] ? o[value].concat(key) : [key];
      return o
    }, {}); };

  var __reject = function (fn, o) { return filter$4(function (x) { return !fn(x); }, o); };
  var reject = curry(__reject);

  var trim = e0("trim");
  var charAt = e1("charAt");
  var codePointAt = e1("codePointAt");
  var match = curry(function (a, b) {
    var z = b.match(a);
    return z === null ? [] : z
  });
  var repeat = curry(function (x, n) {
    var output = new Array(n);
    for (var i = 0; i < n; i++) {
      output[i] = x;
    }
    return output
  });
  var search = e1("search");
  var split = e1("split");
  var endsWithLength = e2("endsWith");
  var __endsWith = function (x, i) {
    var last = i[i.length - 1];
    return Array.isArray(x) ? last === x[0] : last === x
  };
  var endsWith = curry(__endsWith);
  var indexOfFromIndex = e2("indexOf");
  var __indexOf = function (toSearch, x) { return indexOfFromIndex(toSearch, 0, x); };
  var indexOf = curry(__indexOf);
  var lastIndexOfFromIndex = e2("lastIndexOf");
  var __lastIndexOf = function (toSearch, x) { return lastIndexOfFromIndex(toSearch, Infinity, x); };
  var lastIndexOf = curry(__lastIndexOf);
  var padEnd = e2("padEnd");
  var padStart = e2("padStart");
  var replace = e2("replace");
  var startsWithFromPosition = e2("startsWith");
  var __startsWith = function (x, i) {
    var first = i[0];
    return Array.isArray(x) ? first === x[0] : first === x
  };
  var startsWith = curry(__startsWith);
  var substr = e2("substr");

  var __ternary = function (cn, b, a) { return (cn ? a : b); };
  var ternary = curry(__ternary);

  var __triplet = function (cnFn, bFn, aFn, o) { return (cnFn(o) ? aFn(o) : bFn(o)); };
  var triplet = curry(__triplet);

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
  var range = curry(__range);

  var _keys$1 = Object.keys;
  var _freeze = Object.freeze;
  var _assign$1 = Object.assign;
  var keys$2 = _keys$1;
  var freeze = _freeze;
  var assign$1 = _assign$1;
  var entries = function (o) { return pipe(
      keys$2,
      map$3(function (k) { return [k, o[k]]; })
    )(o); };
  var toPairs = entries;
  var fromPairs = reduce$3(function (agg, ref) {
    var obj;
    var k = ref[0];
    var v = ref[1];
    return merge$1(agg, ( obj = {}, obj[k] = v, obj ));
  }, {});
  var __pairwise = function (hoc, fn, o) { return pipe(
      toPairs,
      hoc(fn)
    )(o); };
  var pairwise = curry(__pairwise);
  var __pairwiseObject = function (hoc, fn, o) { return pipe(
      pairwise(hoc, fn),
      fromPairs
    )(o); };
  var pairwiseObject = curry(__pairwiseObject);
  var mapTuples = pairwiseObject(map$3);
  var mapTuple = mapTuples;
  var __mapKeys = function (fn, o) { return mapTuples(function (ref) {
    var k = ref[0];
    var v = ref[1];
    return [fn(k), v];
    }, o); };
  var mapKeys = curry(__mapKeys);
  var __merge = function (a, b) { return assign$1({}, a, b); };
  var merge$1 = curry(__merge);

  var __pathOr = function (def, lenses, input) { return reduce$3(function (focus, lens) { return focus[lens] || def; }, input, lenses); };
  var pathOr = curry(__pathOr);
  var __pathSatisfies = function (equiv, pathTo, input) { return pipe(
      path(pathTo),
      equiv,
      Boolean
    )(input); };
  var pathSatisfies = curry(__pathSatisfies);
  var __propSatisfies = function (equiv, propTo, input) { return pipe(
      prop$1(propTo),
      equiv,
      Boolean
    )(input); };
  var propSatisfies = curry(__propSatisfies);
  var path = pathOr(null);
  var __propOr = function (def, property, input) { return pathOr(def, [property], input); };
  var propOr = curry(__propOr);
  var prop$1 = propOr(null);
  var __pathEq = function (lenses, equiv, input) { return pathSatisfies(equals(equiv), lenses, input); };
  var pathEq = curry(__pathEq);
  var __propIs = function (type, property, input) { return pipe(
      prop$1(property),
      function (val) { return (val != null && val.constructor === type) || val instanceof type; },
      Boolean
    )(input); };
  var propIs = curry(__propIs);
  var __propEq = function (property, equiv, input) { return pathSatisfies(equals(equiv), [property], input); };
  var propEq = curry(__propEq);

  var propLength$1 = prop$1("length");
  var objectLength$1 = pipe(
    keys$2,
    propLength$1
  );
  var length$1 = propLength$1;
  var anyLength = function (x) { return typeof x === "object" ? objectLength$1(x) : propLength$1(x); };

  var some = function fastSome (subject, fn, thisContext) {
    var length = subject.length,
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
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
        iterator = thisContext !== undefined ? bindInternal3$1(fn, thisContext) : fn,
        i;
    for (i = 0; i < length; i++) {
      if (!iterator(subject[i], i, subject)) {
        return false;
      }
    }
    return true;
  };

  var keys$3 = Object.keys;
  var __which = function (compare, fn, o) {
    var arecomp = flip(compare);
    return triplet(
      Array.isArray,
      arecomp(fn),
      pipe(
        keys$3,
        arecomp(function (key) { return fn(o[key], key); })
      ),
      o
    )
  };
  var which = curry(__which);
  var some$2 = which(some);
  var every$1 = which(every);

  var innerpipe$1 = function (args) { return function (x) {
    var first = args[0];
    var rest = args.slice(1);
    var current = first(x);
    for (var a = 0; a < rest.length; a++) {
      current = rest[a](current);
    }
    return current
  }; };
  function compose$1() {
    var arguments$1 = arguments;
    var length = arguments.length;
    var args = new Array(length);
    for (var i = length - 1; i > -1; --i) {
      args[i] = arguments$1[i];
    }
    return innerpipe$1(args.reverse())
  }
  var version$2 = version;
  var random$1 = Object.assign(random, f, t, w, s);

  exports.compose = compose$1;
  exports.version = version$2;
  exports.random = random$1;
  exports.pipe = pipe;
  exports.$ = $;
  exports.PLACEHOLDER = PLACEHOLDER;
  exports.curryify = curryify;
  exports.curry = curry;
  exports.curryObjectK = curryObjectK;
  exports.curryObjectN = curryObjectN;
  exports.curryObjectKN = curryObjectKN;
  exports.remap = remap;
  exports.remapArray = remapArray;
  exports.K = K;
  exports.I = I;
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
  exports.filter = filter$4;
  exports.flip = flip;
  exports.fork = fork;
  exports.iterate = iterate;
  exports.map = map$3;
  exports.ap = ap;
  exports.fold = fold;
  exports.chain = chain;
  exports.flatMap = flatMap$1;
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
  exports.keys = keys$2;
  exports.assign = assign$1;
  exports.freeze = freeze;
  exports.merge = merge$1;
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
  exports.prop = prop$1;
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
  exports.length = length$1;
  exports.objectLength = objectLength$1;
  exports.anyLength = anyLength;
  exports.which = which;
  exports.some = some$2;
  exports.every = every$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
