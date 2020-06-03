'use strict';

var C = Object.freeze({
  $: "@@FUTILITY::constant.magic",
  UNMATCHED: "@@FUTILITY::constant.unmatched",
  b: "\b",
  f: "\f",
  n: "\n",
  t: "\t",
  r: "\r",
  q: "'",
  qq: '"',
  s: "\\"
});

function memoizeWith(memoizer) {
  return function memoize(fn) {
    var saved = {};
    function memoized() {
      var args = Array.from(arguments);
      var mem = memoizer(args);
      if (mem && saved[mem]) { return saved[mem] }
      saved[mem] = fn.apply(null, args);
      return saved[mem]
    }
    return memoized
  }
}

function ofType(exp) {
  return function compareTypeofs(xx) {
    return typeof xx === exp
  }
}

var ref = [
  "string",
  "number",
  "undefined",
  "function",
  "boolean",
  "symbol",
  "object"
].map(ofType);
var _isString = ref[0];
var _isNumber = ref[1];
var _isUndefined = ref[2];
var _isFunction = ref[3];
var _isBoolean = ref[4];
var _isSymbol = ref[5];
var _isRawObject = ref[6];
var isString = _isString;
var isNumber = _isNumber;
var isUndefined = _isUndefined;
var isFunction = _isFunction;
var isBoolean = _isBoolean;
var isSymbol = _isSymbol;
var isRawObject = _isRawObject;
var isArray = Array.isArray;

var ARCHETYPES = Object.freeze({
  string: "String∋string",
  number: "Number∋number",
  boolean: "Boolean∋boolean",
  function: "Function∋function",
  object: "Object∋object",
  undefined: "Global∋nil"
});

var U = C.UNION_TYPE_DELIMITER;

var isArray$1 = Array.isArray;
var keys = Object.keys;
var freeze = Object.freeze;
function mash(a, b) {
  return Object.assign({}, a, b)
}
function jam(a, b) {
  return mash(b, a)
}

function symbolToString(s) {
  return "" + s.toString()
}

function defaultMemoizer(raw) {
  var x = raw[0];
  var y = raw[1];
  return x
    .concat(y)
    .map(function (z) { return (typeof z === "symbol" ? symbolToString(z) : z); })
    .join("-")
}

var memo = memoizeWith(function identity(x) {
  return x
});
var union = memo(function unionType(x) {
  return x.split("|")
});

var __of__$1 = C.__of__;
var memo$1 = memoizeWith(function (x) { return x; });
var constructor = memo$1(function (x) {
  var oof = x.indexOf(__of__$1);
  return oof > -1 ? x.slice(0, oof) : x
});

var __of__$2 = C.__of__;
var memo$2 = memoizeWith(function (x) { return x; });
var typeChild = memo$2(function (x) {
  var oof = x.indexOf(__of__$2);
  return oof > -1 ? x.slice(oof + 1) : x
});

var memo$3 = memoizeWith(function (x) { return x; });
var compareTypes = memo$3(function _compareTypes(exp, given) {
  var ref = [exp, given].map(union);
  var expectedUnion = ref[0];
  var givenUnion = ref[1];
  var comparisons = expectedUnion.map(function (typeA) { return givenUnion.map(
      function (typeB) { return typeA === "any" ||
        typeB === "any" ||
        typeA === typeB ||
        constructor(typeA) === constructor(typeB) ||
        typeChild(typeA) === typeChild(typeB); }
    ); }
  );
  var unionComparisons = comparisons.reduce(
    function (all, nextCase) { return all.concat(nextCase.filter(function (z) { return !z; }).length === 0); },
    []
  );
  return unionComparisons.filter(function (z) { return !z; }).length === 0
});

function makeTypechecker(typecheck, useMemoizer) {
  if ( useMemoizer === void 0 ) useMemoizer = defaultMemoizer;
  return memoizeWith(useMemoizer)(function rawMakeTypeChecker(expected, given) {
    if (!Array.isArray(expected) || !Array.isArray(expected)) {
      throw new TypeError(
        "makeTypechecker needs two valid lists of types to run"
      )
    }
    var returnType = expected[expected.length - 1];
    var params = expected.slice(0, expected.length - 1);
    var results = params
      .slice(0, given.length)
      .map(function typeCheckParam(ex, ii) {
        var actual = typecheck(given[ii]);
        var success = compareTypes(actual, ex);
        var outcome = {
          idx: ii,
          raw: Object.freeze({ value: given[ii] }),
          actual: actual,
          expected: ex,
          success: success
        };
        return outcome
      })
      .reduce(
        function typeCheckOutcomes(outcome, ent) {
          var obj;
          var key = ent.success ? "valid" : "invalid";
          var partial = mash(outcome, ( obj = {}, obj[key] = outcome[key].concat([ent]), obj.rawParams = outcome.rawParams.concat([ent]), obj ));
          return mash(partial, {
            failures: outcome.failures || partial.invalid.length > 0
          })
        },
        {
          rawParams: [],
          invalid: [],
          valid: [],
          signature: expected.join(" -> "),
          params: params,
          returnType: returnType,
          given: given
        }
      );
    return results
  })
}

var UNMATCHED = C.UNMATCHED;
function isUnmatched(z) {
  return z === UNMATCHED
}

var __of__$3 = C.__of__;
function system(z) {
  var constructor = (z && z.constructor && z.constructor.name) || "Global";
  var type = typeof z;
  if (!z) {
    if (type === "undefined" || type === "object") {
      type = "nil";
    } else {
      constructor = "Boolean";
    }
  }
  return ("" + constructor + __of__$3 + type)
}

function checkParamsWith(checker) {
  return function checkParams(signature, given) {
    var checked = makeTypechecker(checker)(signature, given);
    return !checked.failures
  }
}

function checkReturnWith(checker) {
  return function checkReturn(outcome) {
    return function checkReturnTypeValidoutcomeAB(a, b) {
      var actual = checker(outcome);
      var expected = makeTypechecker(checker)(a, b).returnType;
      return compareTypes(expected, actual)
    }
  }
}

function makeAliases(F) {
  return F.mash(F, {
    __: F.$,
    I: F.identity,
    K: F.constant,
    always: F.constant,
    some: F.any,
    sideEffect2: F.binarySideEffect,
    merge: F.mash,
    mergeRight: F.jam
  })
}

function box(bx) {
  return [bx]
}
var FUNCTION = box;

function complement(fn) {
  return function subtleComplement() {
    var args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
var FUNCTION$1 = complement;

function constant(k) {
  return function forever() {
    return k
  }
}
var FUNCTION$2 = constant;

function F() {
  return true
}
var FUNCTION$3 = F;

function first(x) {
  return x[0]
}
var FUNCTION$4 = first;

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, ref) {
    var obj;
    var ke = ref[0];
    var va = ref[1];
    return Object.assign({}, oo, ( obj = {}, obj[ke] = va, obj ))
  }, {})
}
var FUNCTION$5 = fromPairs;

function identity(y) {
  return y
}
var FUNCTION$6 = identity;

function last(x) {
  return x[x.length - 1]
}
var FUNCTION$7 = last;

function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}
var FUNCTION$8 = length;

function not(yy) {
  return !yy
}
var FUNCTION$9 = not;

function pipe() {
  var fns = Array.from(arguments);
  var nonFuncs = fns.filter(function (z) { return typeof z !== "function"; });
  if (nonFuncs.length !== 0)
    { throw new TypeError(
      ("Expected to receive functions as arguments, but received: " + (nonFuncs
        .map(function (a, i) { return ("[" + i + "] = " + a); })
        .join(" ; ")))
    ) }
  return function piped(x) {
    var len = fns.length;
    var idx = 0;
    var current = x;
    while (idx < len) {
    var fn = fns[idx];
    current = fn(current);
idx += 1;
    }
    return current
  }
}
var FUNCTION$a = pipe;

function smooth(x) {
  return x.filter(function identity(y) {
    return y
  })
}
var FUNCTION$b = smooth;

function T() {
  return true
}
var FUNCTION$c = T;

function toLower(z) {
  return z.toLowerCase()
}
var FUNCTION$d = toLower;

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
var FUNCTION$e = toPairs;

function toUpper(z) {
  return z.toUpperCase()
}
var FUNCTION$f = toUpper;

var CORE = freeze({
  freeze: freeze,
  mash: mash,
  jam: jam,
  isArray: isArray$1,
  keys: keys,
  box: FUNCTION,
  complement: FUNCTION$1,
  identity: FUNCTION$6,
  constant: FUNCTION$2,
  F: FUNCTION$3,
  first: FUNCTION$4,
  fromPairs: FUNCTION$5,
  last: FUNCTION$7,
  length: FUNCTION$8,
  not: FUNCTION$9,
  pipe: FUNCTION$a,
  smooth: FUNCTION$b,
  T: FUNCTION$c,
  toLower: FUNCTION$d,
  toPairs: FUNCTION$e,
  toUpper: FUNCTION$f
});

function makeSideEffectsFromEnv(curry) {
  var sideEffect = curry(function _sideEffect(fn, a) {
    fn(a);
    return a
  });
  var binarySideEffect = curry(function _binarySideEffect(fn, a, b) {
    fn(a, b);
    return b
  });
  var trace = binarySideEffect(console.log);
  var inspect = curry(function _inspect(fn, look, tag, x) {
    fn(tag, look(x));
    return x
  });
  return { sideEffect: sideEffect, binarySideEffect: binarySideEffect, trace: trace, inspect: inspect }
}

function makeParamMerger(taste) {
  return function compareParams(aa, bb) {
    return aa
      .map(function testGaps(yy) {
        return taste(yy) && bb[0] ? bb.shift() : yy
      })
      .concat(bb)
  }
}
function testCurryGaps(taste) {
  return function testCurryCapsByTaste(args) {
    return args.reduce(function doesCurryTasteGood(pp, x) {
      return taste(x) ? pp : pp + 1
    }, 0)
  }
}
function some(fn) {
  return function someInList(x) {
    return x.some(fn)
  }
}
function toString(fn, args) {
  if ( args === void 0 ) args = [];
  return function functionToString() {
    return ("curry(" + (fn.name || "fn") + ")" + (args.length > 0 ? ("(" + (args.join(",")) + ")") : ""))
  }
}
function hmError(name, actual, params) {
  return ("Given " + name + "( " + (actual &&
    actual.join(", ")) + " ) but expected " + name + "( " + (params
    .slice(0, actual.length)
    .join(", ")) + " )")
}
function category(test) {
  return function testedCategory(ref) {
    var ts = ref.ts; if ( ts === void 0 ) ts = system;
    var givenLength = ref.n;
    var hm = ref.hm;
    var check = ref.check;
    if (check) {
      if (typeof ts !== "function")
        { throw new TypeError("Expected typeSystem to be a function.") }
      if (!hm || !Array.isArray(hm))
        { throw new TypeError("Expected hm to be an array of strings.") }
    }
    return function currified(fn) {
      var heat = testCurryGaps(test);
      var mergeParams = makeParamMerger(test);
      var isSpicy = some(test);
      function curried() {
        var args = Array.from(arguments);
        var nArgs =
          hm && Array.isArray(hm)
            ? hm.length - 1
            : givenLength && typeof givenLength === "number"
            ? givenLength
            : fn.length;
        var length = isSpicy(args) ? heat(args) : args.length;
        function saucy() {
          var args2 = Array.from(arguments);
          return curried.apply(this, mergeParams(args, args2))
        }
        saucy.toString = toString(fn, args);
        if (length >= nArgs) {
          var result = fn.apply(this, args);
          if (check) {
            var tChecker = makeTypechecker(ts)(hm, args);
            var isValid = checkParamsWith(ts)(hm, args);
            if (!isValid) {
              var rawParams = tChecker.rawParams;
              var params = tChecker.params;
              throw new TypeError(
                hmError(
                  fn.name,
                  rawParams.map(function (z) { return z.actual; }),
                  params.map(preferredType)
                )
              )
            }
            var returnTypeValid = checkReturnWith(ts)(result)(hm, args);
            if (!returnTypeValid) {
              var returnType = tChecker.returnType;
              throw new TypeError(
                ("Expected " + (fn.name) + " to return " + (preferredType(
                  returnType
                )) + " but got " + (system(result)) + ".")
              )
            }
          }
          return result
        }
        return saucy
      }
      curried.toString = toString(fn);
      return curried
    }
  }
}

var $ = C.$;
function DEFAULT_PLACEHOLDER_TEST(x) {
  return x === $
}
function fabricate(config) {
  var test = config.test; if ( test === void 0 ) test = DEFAULT_PLACEHOLDER_TEST;
  var def = category(test);
  var curry = def(jam({ n: false, check: false }, config));
  var curryN = curry(function _curryN(nn, fn) {
    return def(jam({ n: nn, check: false }, config))(fn)
  });
  return { def: def, curry: curry, curryN: curryN }
}
fabricate(DEFAULT_PLACEHOLDER_TEST);

function makeAddIndex(ref) {
  var curryN = ref.curryN;
  return function addIndex(fn) {
    return curryN(fn.length, function indexAddedIter() {
      var idx = 0;
      var args = Array.prototype.slice.call(arguments, 0);
      var origFn = args[0];
      var list = args[args.length - 1];
      args[0] = function indexAdded() {
        var result = origFn.apply(
          this,
          [].concat(arguments).concat([idx, list])
        );
        idx += 1;
        return result
      };
      return fn.apply(this, args)
    })
  }
}

function makeFlip(ref) {
  var curryN = ref.curryN;
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}

function extendUnary(F) {
  var addIndex = makeAddIndex(F);
  var flip = makeFlip(F);
  return F.mash(F, { addIndex: addIndex, flip: flip })
}

function add(b, a) {
  return a + b
}
var FUNCTION$g = add;

function and(a, b) {
  return a && b
}
var FUNCTION$h = and;

function any(fn, xx) {
  var idx = 0;
  var found = false;
  var len = length(xx);
  while (idx < len && !found) {
    if (fn(xx[idx])) { found = true; }
    idx += 1;
  }
  return found
}
var FUNCTION$i = any;

function ap(a, b) {
  if (isFunction(a) && isFunction(b)) {
    return function sCombinator(x) {
      return a(x, b(x))
    }
  }
  if (!isArray(a) || !isArray(b))
    { throw new TypeError(
      "Expected to receive an array of functions and an array of values."
    ) }
  if (!a.length || a.filter(isFunction).length !== a.length)
    { throw new TypeError("Expected to receive an array of functions to apply.") }
  return a.reduce(function apReduce(out, fn) {
    return out.concat(b.map(fn))
  }, [])
}
var FUNCTION$j = ap;

function concat(a, b) {
  return a.concat(b)
}
var FUNCTION$k = concat;

function cond(conditions, input) {
  var idx = 0;
  var found = false;
  var match;
  var len = length(conditions);
  while (idx < len && !found) {
    var ref = conditions[idx];
    var test = ref[0];
    var out = ref[1];
    if (test(input)) {
      found = true;
      match = out(input);
    }
    idx += 1;
  }
  return match
}
var FUNCTION$l = cond;

function divide(b, a) {
  return a / b
}
var FUNCTION$m = divide;

function equals(a, b) {
  return a === b
}
var FUNCTION$n = equals;

function makeIterable(xx) {
  var isArray = Array.isArray(xx);
  var isObject = xx && typeof xx === "object";
  if (!isArray && !isObject) {
    throw new TypeError(
      "Expected iterable initial value to be either an array or an object."
    )
  }
  var len = length(xx);
  var init = isArray ? Array(len) : {};
  var xKeys = !isArray && Object.keys(xx);
  return {
    length: len,
    iterate: function iterate(idx) {
      var key = isArray ? idx : xKeys[idx];
      return { key: key, value: xx[key] }
    },
    init: init,
    isArray: isArray
  }
}

function filter(fn, xx) {
  var idx = 0;
  var loop = makeIterable(xx);
  var length = loop.length;
  var isArray = loop.isArray;
  var result = isArray ? [] : {};
  while (idx < length) {
    var ref = loop.iterate(idx);
    var key = ref.key;
    var value = ref.value;
    if (fn(value)) {
      if (isArray) {
        result.push(value);
      } else {
        result[key] = value;
      }
    }
    idx += 1;
  }
  return result
}
var FUNCTION$o = filter;

function forEach(fn, xx) {
  var idx = 0;
  var loop = makeIterable(xx);
  var length = loop.length;
  while (idx < length) {
    var ref = loop.iterate(idx);
    var value = ref.value;
    fn(value);
    idx += 1;
  }
}
var FUNCTION$p = forEach;

function greaterThan(b, a) {
  return a > b
}
var FUNCTION$q = greaterThan;

function greaterThanOrEqualTo(b, a) {
  return a >= b
}
var FUNCTION$r = greaterThanOrEqualTo;

function join(del, xx) {
  return xx.join(del)
}
var FUNCTION$s = join;

function lessThan(b, a) {
  return a < b
}
var FUNCTION$t = lessThan;

function lessThanOrEqualTo(b, a) {
  return a <= b
}
var FUNCTION$u = lessThanOrEqualTo;

function map(fn, xx) {
  var idx = 0;
  var loop = makeIterable(xx);
  var length = loop.length;
  var init = loop.init;
  var result = init;
  while (idx < length) {
    var ref = loop.iterate(idx);
    var key = ref.key;
    var value = ref.value;
    result[key] = fn(value);
    idx += 1;
  }
  return result
}
var FUNCTION$v = map;

function multiply(b, a) {
  return a * b
}
var FUNCTION$w = multiply;

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}
var FUNCTION$x = nth;

function or(a, b) {
  return a || b
}
var FUNCTION$y = or;

function range(aa, zz) {
  var out = [];
  var down = zz < aa;
  for (var ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}
var FUNCTION$z = range;

function split(del, xx) {
  return xx.split(del)
}
var FUNCTION$A = split;

function subtract(b, a) {
  return a - b
}
var FUNCTION$B = subtract;

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
var FUNCTION$C = toJSON;

function extendBinary(F) {
  var binaryExtension = FUNCTION$v(function (fn) { return F.curryN(2, fn); }, {
    and: FUNCTION$h,
    equals: FUNCTION$n,
    or: FUNCTION$y,
    subtract: FUNCTION$B,
    add: FUNCTION$g,
    divide: FUNCTION$m,
    any: FUNCTION$i,
    filter: FUNCTION$o,
    forEach: FUNCTION$p,
    multiply: FUNCTION$w,
    ap: FUNCTION$j,
    concat: FUNCTION$k,
    map: FUNCTION$v,
    cond: FUNCTION$l,
    gt: FUNCTION$q,
    gte: FUNCTION$r,
    lt: FUNCTION$t,
    lte: FUNCTION$u,
    nth: FUNCTION$x,
    range: FUNCTION$z,
    join: FUNCTION$s,
    split: FUNCTION$A,
    toJSON: FUNCTION$C
  });
  return F.mash(F, binaryExtension)
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
var FUNCTION$D = both;

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
var FUNCTION$E = either;

function reduce(fn, initial, xx) {
  var loop = makeIterable(xx);
  var idx = 0;
  var length = loop.length;
  var result = initial;
  while (idx < length) {
    var ref = loop.iterate(idx);
    var value = ref.value;
    result = fn(result, value);
    idx += 1;
  }
  return result
}
var FUNCTION$F = reduce;

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}
var FUNCTION$G = slice;

function extendTernary(F) {
  var ternaryExtension = F.map(F.curryN(3), {
    both: FUNCTION$D,
    either: FUNCTION$E,
    reduce: FUNCTION$F,
    slice: FUNCTION$G
  });
  return F.mash(F, ternaryExtension)
}

function custom(config) {
  return CORE.pipe(
    fabricate,
    function basicDefinitions(ref) {
      var def = ref.def;
      var curry = ref.curry;
      var curryN = ref.curryN;
      var sideEffectMethods = makeSideEffectsFromEnv(curry);
      return CORE.mash(
        CORE.mash(
          CORE,
          sideEffectMethods
        ),
        {
          memoizeWith: memoizeWith,
          def: def,
          curry: curry,
          curryN: curryN,
          C: C,
          $: C.$,
          isUnmatched: isUnmatched,
          isString: isString,
          isNumber: isNumber,
          isUndefined: isUndefined,
          isFunction: isFunction,
          isBoolean: isBoolean,
          isSymbol: isSymbol,
          isRawObject: isRawObject,
          isArray: isArray
        }
      )
    },
    extendUnary,
    extendBinary,
    extendTernary,
    function derived(F) {
      var G = F.mash(F, {
        j2: F.toJSON(2),
        reject: F.curry(function reject(fn, xx) {
          return F.filter(F.complement(fn), xx)
        }),
        isObject: F.both(F.isRawObject, Boolean),
        uniq: F.reduce(function unique(agg, xx) {
          return !agg.includes(xx) ? agg.concat(xx) : agg
        }, []),
        anyPass: F.curry(function anyPass(preds, xx) {
          return F.pipe(
            F.map(F.flip(F.any)(xx)),
            F.smooth,
            F.length,
            F.gt(0)
          )(preds)
        }),
        pathOr: F.curry(function pathOr(dd, ks, src) {
          return F.reduce(
            function walkPathOr(agg, st) {
              return (agg && agg[st]) || dd
            },
            src,
            ks
          )
        })
      });
      function deriveFromAccessor(acc) {
        return {
          unsafe: acc(null),
          eq: F.curry(function equivalence(ks, ex, src) {
            return F.pipe(
              acc(C.UNMATCHED, ks),
              F.equals(ex)
            )(src)
          }),
          satisfies: F.curry(function satisfaction(fn, ks, src) {
            return F.pipe(
              acc(C.UNMATCHED, ks),
              fn,
              Boolean
            )(src)
          })
        }
      }
      var ref = deriveFromAccessor(G.pathOr);
      var path = ref.unsafe;
      var pathEq = ref.eq;
      var pathSatisfies = ref.satisfies;
      var propOr = F.curry(function _propOr(dd, key, source) {
        return G.pathOr(dd, [key], source)
      });
      var ref$1 = deriveFromAccessor(propOr);
      var prop = ref$1.unsafe;
      var propEq = ref$1.eq;
      var propSatisfies = ref$1.satisfies;
      return F.mash(G, {
        path: path,
        pathEq: pathEq,
        pathSatisfies: pathSatisfies,
        propOr: propOr,
        prop: prop,
        propEq: propEq,
        propSatisfies: propSatisfies
      })
    },
    makeAliases,
    CORE.freeze
  )(config)
}
var DEFAULT_CONFIG = {
  ts: system,
  check: process.env.NODE_ENV !== "production"
};
var FUTILITY = custom(DEFAULT_CONFIG);
FUTILITY.custom = custom;

module.exports = FUTILITY;
