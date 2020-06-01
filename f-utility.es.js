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

var isArray = Array.isArray;
var keys = Object.keys;
var freeze = Object.freeze;
function mash(a, b) {
  return Object.assign({}, a, b)
}
function jam(a, b) {
  return mash(b, a)
}
function last(x) {
  return x[x.length - 1]
}
function smooth(x) {
  return x.filter(function (y) { return y; })
}
function identity(y) {
  return y
}
function box(bx) {
  return [bx]
}
function pipe() {
  var fns = Array.from(arguments);
  var nonFuncs = fns.filter(function (z) { return typeof z !== "function"; });
  if (nonFuncs.length !== 0)
    { throw new TypeError(
      ("Expected to receive functions as arguments, but received: " + (nonFuncs
        .map(function (a, i) { return ("[" + i + "] = " + a); })
        .join(" ; ")))
    ) }
  return function composed(x) {
    return fns.reduce(function outputToInput(prev, fn) {
      return fn(prev)
    }, x)
  }
}
function toPairs(oo) {
  return keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
function fromPairs(ps) {
  return ps.reduce(function pairing(oo, ref) {
    var obj;
    var ke = ref[0];
    var va = ref[1];
    return mash(oo, ( obj = {}, obj[ke] = va, obj ))
  }, {})
}
function toUpper(z) {
  return z.toUpperCase()
}
function toLower(z) {
  return z.toLowerCase()
}
function not(yy) {
  return !yy
}
function constant(k) {
  return function forever() {
    return k
  }
}
function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}
function complement(fn) {
  return function subtleComplement() {
    var args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
function T() {
  return true
}
function F() {
  return true
}

var BASICS = /*#__PURE__*/Object.freeze({
  isArray: isArray,
  keys: keys,
  freeze: freeze,
  mash: mash,
  jam: jam,
  last: last,
  smooth: smooth,
  identity: identity,
  box: box,
  pipe: pipe,
  toPairs: toPairs,
  fromPairs: fromPairs,
  toUpper: toUpper,
  toLower: toLower,
  not: not,
  constant: constant,
  length: length,
  complement: complement,
  T: T,
  F: F
});

var UNMATCHED = C.UNMATCHED;
function defaultMemoizer(raw) {
  var x = raw[0];
  var y = raw[1];
  return x.concat(y).join("-")
}
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
        var success = compareType(actual, ex);
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
var memo = memoizeWith(function (x) { return x; });
var __of__ = "∋";
function typeSystem(z) {
  var constructor = (z && z.constructor && z.constructor.name) || "Global";
  var type = typeof z;
  return ("" + constructor + __of__ + type)
}
var PREFERRED_TYPE = Object.freeze({
  string: "String∋string",
  number: "Number∋number",
  boolean: "Boolean∋boolean",
  function: "Function∋function",
  object: "Object∋object"
});
function preferredType(tt) {
  if (tt.indexOf("|") > -1) { return tt.split("|").map(function (ttt) { return preferredType(ttt); }) }
  return PREFERRED_TYPE[tt] || tt
}
var typeParent = memo(function (x) {
  var oof = x.indexOf(__of__);
  return oof > -1 ? x.slice(0, oof) : x
});
var typeChild = memo(function (x) {
  var oof = x.indexOf(__of__);
  return oof > -1 ? x.slice(oof + 1) : x
});
var separateUnionTypes = memo(function (x) { return x.split("|"); });
var compareType = memo(function _compareType(exp, given) {
  var ref = [exp, given].map(separateUnionTypes);
  var expectedUnion = ref[0];
  var givenUnion = ref[1];
  var comparisons = expectedUnion.map(function (typeA) { return givenUnion.map(function (typeB) {
      if (typeA === "any" || typeB === "any") {
        return true
      }
      if (typeA === typeB) {
        return true
      }
      if (typeParent(typeA) === typeParent(typeB)) {
        return true
      }
      if (typeChild(typeA) === typeChild(typeB)) {
        return true
      }
      return false
    }); }
  );
  var allCases = comparisons.reduce(
    function (all, nextCase) { return all.concat(nextCase); },
    []
  );
  var noneFailed = allCases.filter(function (z) { return !z; }).length === 0;
  console.log("given", expectedUnion, "vs.", givenUnion, ">>", noneFailed);
  return noneFailed
});
function checkTypesValid(checker) {
  return function checkTypesValidGivenPattern(signature, given) {
    return !makeTypechecker(checker)(signature, given).failures
  }
}
function checkReturnTypeValid(checker) {
  return function checkReturnTypeValidGiven(given) {
    return function checkReturnTypeValidGivenAB(a, b) {
      var aType = checker(given);
      var bType = makeTypechecker(checker)(a, b).returnType;
      return compareType(aType, bType)
    }
  }
}
function isType(exp) {
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
].map(isType);
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
var isArray$1 = Array.isArray;
function isUnmatched(z) {
  return z === UNMATCHED
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
    var ts = ref.ts; if ( ts === void 0 ) ts = typeSystem;
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
            var isValid = checkTypesValid(ts)(hm, args);
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
            var returnTypeValid = checkReturnTypeValid(ts)(result)(hm, args);
            if (!returnTypeValid) {
              var returnType = tChecker.returnType;
              throw new TypeError(
                ("Expected " + (fn.name) + " to return " + returnType + " but got " + result + ".")
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
var FUNCTION = add;

function and(a, b) {
  return a && b
}
var FUNCTION$1 = and;

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
var FUNCTION$2 = any;

function ap(a, b) {
  if (isFunction(a) && isFunction(b)) {
    return function sCombinator(x) {
      return a(x, b(x))
    }
  }
  if (!isArray$1(a) || !isArray$1(b))
    { throw new TypeError(
      "Expected to receive an array of functions and an array of values"
    ) }
  if (a.filter(isFunction).length !== a.length)
    { throw new TypeError("Expected to receive an array of functions to apply.") }
  return a.reduce(function apReduce(out, fn) {
    return out.concat(b.map(fn))
  }, [])
}
var FUNCTION$3 = ap;

function concat(a, b) {
  return a.concat(b)
}
var FUNCTION$4 = concat;

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
var FUNCTION$5 = cond;

function divide(b, a) {
  return a / b
}
var FUNCTION$6 = divide;

function equals(a, b) {
  return a === b
}
var FUNCTION$7 = equals;

function makeIterable(xx) {
  if (!xx)
    { throw new TypeError(
      "Expected iterable initial value to be either an array or an object."
    ) }
  var len = length(xx);
  var isArray$$1 = Array.isArray(xx);
  var init = isArray$$1 ? Array(len) : {};
  var xKeys = !isArray$$1 && Object.keys(xx);
  return {
    length: len,
    iterate: function iterate(idx) {
      var key = isArray$$1 ? idx : xKeys[idx];
      return { key: key, value: xx[key] }
    },
    init: init,
    isArray: isArray$$1
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
var FUNCTION$8 = filter;

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
var FUNCTION$9 = forEach;

function greaterThan(b, a) {
  return a > b
}
var FUNCTION$a = greaterThan;

function greaterThanOrEqualTo(b, a) {
  return a >= b
}
var FUNCTION$b = greaterThanOrEqualTo;

function join(del, xx) {
  return xx.join(del)
}
var FUNCTION$c = join;

function lessThan(b, a) {
  return a < b
}
var FUNCTION$d = lessThan;

function lessThanOrEqualTo(b, a) {
  return a <= b
}
var FUNCTION$e = lessThanOrEqualTo;

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
var FUNCTION$f = map;

function multiply(b, a) {
  return a * b
}
var FUNCTION$g = multiply;

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}
var FUNCTION$h = nth;

function or(a, b) {
  return a || b
}
var FUNCTION$i = or;

function range(aa, zz) {
  var out = [];
  var down = zz < aa;
  for (var ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}
var FUNCTION$j = range;

function split(del, xx) {
  return xx.split(del)
}
var FUNCTION$k = split;

function subtract(b, a) {
  return a - b
}
var FUNCTION$l = subtract;

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
var FUNCTION$m = toJSON;

function extendBinary(F) {
  var binaryExtension = FUNCTION$f(function (fn) { return F.curryN(2, fn); }, {
    and: FUNCTION$1,
    equals: FUNCTION$7,
    or: FUNCTION$i,
    subtract: FUNCTION$l,
    add: FUNCTION,
    divide: FUNCTION$6,
    any: FUNCTION$2,
    filter: FUNCTION$8,
    forEach: FUNCTION$9,
    multiply: FUNCTION$g,
    ap: FUNCTION$3,
    concat: FUNCTION$4,
    map: FUNCTION$f,
    cond: FUNCTION$5,
    gt: FUNCTION$a,
    gte: FUNCTION$b,
    lt: FUNCTION$d,
    lte: FUNCTION$e,
    nth: FUNCTION$h,
    range: FUNCTION$j,
    join: FUNCTION$c,
    split: FUNCTION$k,
    toJSON: FUNCTION$m
  });
  return F.mash(F, binaryExtension)
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
var FUNCTION$n = both;

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
var FUNCTION$o = either;

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
var FUNCTION$p = reduce;

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}
var FUNCTION$q = slice;

function extendTernary(F) {
  var ternaryExtension = F.map(F.curryN(3), {
    both: FUNCTION$n,
    either: FUNCTION$o,
    reduce: FUNCTION$p,
    slice: FUNCTION$q
  });
  return F.mash(F, ternaryExtension)
}

function custom(config) {
  return pipe(
    fabricate,
    function basicDefinitions(ref) {
      var def = ref.def;
      var curry = ref.curry;
      var curryN = ref.curryN;
      var sideEffectMethods = makeSideEffectsFromEnv(curry);
      return mash(
        mash(
          BASICS,
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
          isArray: isArray$1
        }
      )
    },
    extendUnary,
    extendBinary,
    extendTernary,
    function derived(F$$1) {
      var G = F$$1.mash(F$$1, {
        j2: F$$1.toJSON(2),
        reject: F$$1.curry(function reject(fn, xx) {
          return F$$1.filter(F$$1.complement(fn), xx)
        }),
        isObject: F$$1.both(F$$1.isRawObject, Boolean),
        uniq: F$$1.reduce(function unique(agg, xx) {
          return !agg.includes(xx) ? agg.concat(xx) : agg
        }, []),
        anyPass: F$$1.curry(function anyPass(preds, xx) {
          return F$$1.pipe(
            F$$1.map(F$$1.flip(F$$1.any)(xx)),
            F$$1.smooth,
            F$$1.length,
            F$$1.gt(0)
          )(preds)
        }),
        pathOr: F$$1.curry(function pathOr(dd, ks, src) {
          return F$$1.reduce(
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
          eq: F$$1.curry(function equivalence(ks, ex, src) {
            return F$$1.pipe(
              acc(C.UNMATCHED, ks),
              F$$1.equals(ex)
            )(src)
          }),
          satisfies: F$$1.curry(function satisfaction(fn, ks, src) {
            return F$$1.pipe(
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
      var propOr = F$$1.curry(function _propOr(dd, key, source) {
        return F$$1.pathOr(dd, [key], source)
      });
      var ref$1 = deriveFromAccessor(propOr);
      var prop = ref$1.unsafe;
      var propEq = ref$1.eq;
      var propSatisfies = ref$1.satisfies;
      return F$$1.mash(G, {
        path: path,
        pathEq: pathEq,
        pathSatisfies: pathSatisfies,
        propOr: propOr,
        prop: prop,
        propEq: propEq,
        propSatisfies: propSatisfies
      })
    },
    makeAliases
  )(config)
}
var DEFAULT_CONFIG = {
  ts: typeSystem,
  check: process.env.NODE_ENV !== "production"
};
var FUTILITY = custom(DEFAULT_CONFIG);
FUTILITY.custom = custom;

export default FUTILITY;
