const __of__ = "∋";
const UNION_TYPE_DELIMITER = "|";
const C = Object.freeze({
  $: "@@FUTILITY::constant.magic",
  UNMATCHED: "@@FUTILITY::constant.unmatched",
  b: "\b",
  f: "\f",
  n: "\n",
  t: "\t",
  r: "\r",
  q: "'",
  qq: '"',
  s: "\\",
  __of__,
  UNION_TYPE_DELIMITER
});
// ∋ indicates "a member of"

function mash(a, b) {
  return Object.assign({}, a, b)
}
const FUNCTION = mash;
const SIGNATURE = ["object", "object", "object"];

function memoizeWith(memoizer) {
  return function memoize(fn) {
    const saved = {};
    function memoized() {
      const args = Array.from(arguments);
      const mem = memoizer(args);
      if (mem && saved[mem]) return saved[mem]
      saved[mem] = fn.apply(null, args);
      return saved[mem]
    }
    return memoized
  }
}

const FUNCTION$1 = memoizeWith;
const SIGNATURE$1 = ["function", "function"];

function symbolToString(s) {
  return "" + s.toString()
}

function defaultMemoizer(raw) {
  let [x, y] = raw;
  return x
    .concat(y)
    .map(z =>
      typeof z === "symbol"
        ? symbolToString(z)
        : z && typeof z === "object"
        ? Object.entries(z).reduce(
            (xx, [kk, vv]) => xx + "-" + kk + ":" + vv,
            ""
          )
        : z
    )
}

const memo = memoizeWith(function basicMemo(x) {
  return x
});
const union = memo(function unionType(x) {
  return x.split("|")
});

const { __of__: __of__$1 } = C;
const memo$1 = memoizeWith(x => x);

const constructor = memo$1(x => {
  const oof = x.indexOf(__of__$1);
  return oof > -1 ? x.slice(0, oof) : x
});

const { __of__: __of__$2 } = C;
const memo$2 = memoizeWith(x => x);

const typeChild = memo$2(x => {
  const oof = x.indexOf(__of__$2);
  return oof > -1 ? x.slice(oof + 1) : x
});

const memo$3 = memoizeWith(x => x);
const compareTypes = memo$3(function _compareTypes(exp, given) {
  const [expectedUnion, givenUnion] = [exp, given].map(union);
  const expectedHasUnions = expectedUnion.length > 1;
  const givenHasUnions = givenUnion.length > 1;
  const comparisons = expectedUnion.map(typeA =>
    givenUnion.map(
      typeB =>
        // any
        typeA === "any" ||
        typeB === "any" ||
        // exact
        typeA === typeB ||
        // 'Number∋number' || 'Number'
        constructor(typeA) === constructor(typeB) ||
        // 'Number∋number' === 'number'
        typeChild(typeA) === typeChild(typeB)
    )
  );
  const noUnionComparisons = comparisons.reduce(
    (all, nextCase) => all.concat(nextCase.filter(z => !z).length === 0),
    []
  );

  const out = noUnionComparisons.filter(Boolean);

  if (!expectedHasUnions && !givenHasUnions) {
    return out.length > 0
  }
  const anyValid = comparisons
    .reduce((a, b) => a.concat(b), [])
    .reduce((xx, cc) => xx || cc, false);
  return anyValid
});

function makeTypechecker(typecheck, useMemoizer = defaultMemoizer) {
  return memoizeWith(useMemoizer)(function rawMakeTypeChecker(expected, given) {
    if (!Array.isArray(expected) || !Array.isArray(expected)) {
      throw new TypeError(
        "makeTypechecker needs two valid lists of types to run"
      )
    }
    const returnType = expected[expected.length - 1];
    const params = expected.slice(0, expected.length - 1);

    const results = params
      .slice(0, given.length)
      .map(function typeCheckParam(ex, ii) {
        const actual = typecheck(given[ii]);
        const success = compareTypes(actual, ex);
        const outcome = {
          idx: ii,
          raw: Object.freeze({ value: given[ii] }),
          actual,
          expected: ex,
          success
        };
        return outcome
      })
      .reduce(
        function typeCheckOutcomes(outcome, ent) {
          const key = ent.success ? "valid" : "invalid";
          const partial = mash(outcome, {
            [key]: outcome[key].concat([ent]),
            rawParams: outcome.rawParams.concat([ent])
          });
          return mash(partial, {
            failures: outcome.failures || partial.invalid.length > 0
          })
        },
        {
          rawParams: [],
          invalid: [],
          valid: [],
          signature: expected.join(" -> "),
          params,
          returnType,
          given
        }
      );
    return results
  })
}

function checkParamsWith(checker) {
  return function checkParams(signature, given) {
    const checked = makeTypechecker(checker)(signature, given);
    return !checked.failures
  }
}

function checkReturnWith(checker) {
  return function checkReturn(outcome) {
    return function checkReturnTypeValidoutcomeAB(a, b) {
      const actual = checker(outcome);
      const expected = makeTypechecker(checker)(a, b).returnType;
      const compared = compareTypes(expected, actual);
      return compared
    }
  }
}

const { __of__: __of__$3 } = C;
function system(z) {
  let constructor = (z && z.constructor && z.constructor.name) || "Global";
  let type = typeof z;
  // deal with undefined / null
  // and the fact that z.constructor.name for boolean is currently Global
  if (!z) {
    if (type === "undefined" || type === "object") {
      type = "nil";
    } else {
      constructor = "Boolean";
    }
  }
  return `${constructor}${__of__$3}${type}`
}

const ARCHETYPES = Object.freeze({
  string: "String∋string",
  number: "Number∋number",
  boolean: "Boolean∋boolean",
  function: "Function∋function",
  object: "Object∋object",
  undefined: "Global∋nil",
  symbol: "Symbol∋symbol",
  nil: "Global∋nil"
});

const { UNION_TYPE_DELIMITER: U, __of__: __of__$4 } = C;
function unionArchetype(recurse) {
  return function arch(tt) {
    if (tt && tt.indexOf && tt.indexOf(U) > -1 && recurse) {
      return tt.split(U).map(z => unionArchetype(false)(z))
    }
    const match = ARCHETYPES[tt];
    if (match) return match
    if (tt[0].toUpperCase() === tt[0]) return `${tt}${__of__$4}object`
    return tt
  }
}
const archetype = unionArchetype(true);

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

function toString(fn, args = []) {
  return function functionToString() {
    return `curry(${fn.name || "fn"})${
      args.length > 0 ? `(${args.join(`,`)})` : ``
    }`
  }
}

function hmError(name, actual, params) {
  return `Given ${name}( ${actual &&
    actual.join(", ")} ) but expected ${name}( ${params
    .map(z => (Array.isArray(z) ? z.join("|") : z))
    .slice(0, actual.length)
    .join(", ")} )`
}

function defineFunctionWithParameterTest(test) {
  return function funcfunc({ ts = system, n: givenLength, hm, check }) {
    if (check) {
      if (typeof ts !== "function")
        throw new TypeError("Expected typeSystem to be a function.")
      if (!hm || !Array.isArray(hm))
        throw new TypeError("Expected hm to be an array of strings.")
    }
    return function currified(fn) {
      const heat = testCurryGaps(test);
      const mergeParams = makeParamMerger(test);
      const isSpicy = some(test);
      function curried() {
        const args = Array.from(arguments);

        const nArgs =
          hm && Array.isArray(hm)
            ? hm.length - 1
            : givenLength && typeof givenLength === "number"
            ? givenLength
            : fn.length;
        const length = isSpicy(args) ? heat(args) : args.length;
        function saucy() {
          const args2 = Array.from(arguments);
          return curried.apply(this, mergeParams(args, args2))
        }
        saucy.toString = toString(fn, args);
        if (length >= nArgs) {
          const result = fn.apply(this, args);
          if (check) {
            const tChecker = makeTypechecker(ts)(hm, args);
            const isValid = checkParamsWith(ts)(hm, args);

            if (!isValid) {
              const { rawParams, params } = tChecker;
              throw new TypeError(
                hmError(
                  fn.name,
                  rawParams.map(z => z.actual),
                  params.map(archetype)
                )
              )
            }
            const returnTypeValid = checkReturnWith(ts)(result)(hm, args);

            if (!returnTypeValid) {
              const { returnType } = tChecker;
              throw new TypeError(
                `Expected ${fn.name} to return ${archetype(
                  returnType
                )} but got ${system(result)}.`
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

const { $ } = C;

function DEFAULT_PLACEHOLDER_TEST(x) {
  return x === $
}

function fabricate(config) {
  const { test = DEFAULT_PLACEHOLDER_TEST } = config;
  const def = defineFunctionWithParameterTest(test);
  const curry = def(mash(config, { n: false, check: false }));
  const curryN = curry(function _curryN(nn, fn) {
    return def(mash(config, { n: nn, check: false }))(fn)
  });
  return { def, curry, curryN }
}
fabricate(DEFAULT_PLACEHOLDER_TEST);

function ofConstructor(Ctor) {
  return function ofConstructorsAndMagic(xx) {
    return (xx && xx.constructor === Ctor) || xx instanceof Ctor
  }
}

function ofType(exp) {
  return function compareTypeofs(xx) {
    return typeof xx === exp // eslint-disable-line valid-typeof
  }
}

const [
  _isString,
  _isNumber,
  _isFunction,
  _isBoolean,
  _isSymbol,
  _isRawObject
] = [String, Number, Function, Boolean, Symbol, Object].map(ofConstructor);
const isUndefined = ofType("undefined");
const isString = _isString;
const isNumber = _isNumber;
const isFunction = _isFunction;
const isBoolean = _isBoolean;
const isSymbol = _isSymbol;
const isRawObject = _isRawObject;
const isArray = Array.isArray;

const { UNMATCHED } = C;
function isUnmatched(z) {
  return z === UNMATCHED
}

function pipe() {
  const fns = Array.from(arguments);
  const nonFuncs = fns.filter(z => typeof z !== "function");
  if (nonFuncs.length !== 0)
    throw new TypeError(
      `Expected to receive functions as arguments, but received: ${nonFuncs
        .map((a, i) => `[${i}] = ${a}`)
        .join(" ; ")}`
    )

  return function piped(x) {
    const len = fns.length;
    let idx = 0;
    let current = x;
    while (idx < len) {
      const fn = fns[idx];
      current = fn(current);
      idx += 1;
    }
    return current
    /*
    return fns.reduce(function aToB(prev, fn) {
      return fn(prev)
    }, x)
    */
  }
}
const FUNCTION$2 = pipe;
const SIGNATURE$2 = ["any", "any"];

function autoCurryUsing(curryN) {
  return function autoCurry(CC) {
    return Object.keys(CC)
      .map(function wrapCurry(fnName) {
        const fn = CC[fnName];
        const isBinaryFunctionPlus = typeof fn === "function" && fn.length;
        return [fnName, isBinaryFunctionPlus ? curryN(fn.length, fn) : fn]
      })
      .reduce((agg, [k, v]) => Object.assign({}, agg, { [k]: v }), {})
  }
}

function makeAliases(F) {
  return F.temper(F, {
    I: F.identity,
    K: F.constant,
    PLACEHOLDER: F.$,
    __: F.$,
    always: F.constant,
    entries: F.toPairs,
    every: F.all,
    fromEntries: F.fromPairs,
    merge: F.mash,
    mergeAll: F.smash,
    mergeRight: F.jam,
    sideEffect2: F.binarySideEffect,
    some: F.any
  })
}

function box(bx) {
  return [bx]
}
const FUNCTION$3 = box;
const SIGNATURE$3 = ["any", "Array"];

function dissoc(key, xx) {
  const copy = Object.assign({}, xx);
  delete copy[key];
  return copy
}
const FUNCTION$4 = dissoc;
const SIGNATURE$4 = ["string|number", "object", "object"];

function assoc(key, toSet, xx) {
  return Object.assign({}, xx, { [key]: toSet })
}
const FUNCTION$5 = assoc;
const SIGNATURE$5 = ["any", "string|number", "object", "object"];

function init(xx) {
  return xx.slice(0, -1)
}
const FUNCTION$6 = init;
const SIGNATURE$6 = ["Array", "Array"];

function tail(xx) {
  return xx.slice(1)
}
const FUNCTION$7 = tail;
const SIGNATURE$7 = ["Array", "Array"];

function append(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(copy.length, 0, whatever);
  return copy
}

const FUNCTION$8 = append;
const SIGNATURE$8 = ["any", "Array", "Array"];

function prepend(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(0, 0, whatever);
  return copy
}

const FUNCTION$9 = prepend;
const SIGNATURE$9 = ["any", "Array", "Array"];

function adjust(idx, fn, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = fn(copy[relIdx]);
  return copy
}

const FUNCTION$a = adjust;
const SIGNATURE$a = ["number", "function", "Array", "Array"];

function update(idx, val, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = val;
  return copy
}

const FUNCTION$b = update;
const SIGNATURE$b = ["number", "any", "Array", "Array"];

function inc(xx) {
  return xx + 1
}
const FUNCTION$c = inc;
const SIGNATURE$c = ["number", "number"];

function dec(xx) {
  return xx - 1
}
const FUNCTION$d = dec;
const SIGNATURE$d = ["number", "number"];

function call(args) {
  return args[0].apply(null, args.slice(1))
}
const FUNCTION$e = call;
const SIGNATURE$e = ["Array", "any"];

function mode(arr) {
  const keymap = {};
  let idx = 0;
  let out = -1;
  let outIdx = -1;
  while (idx < arr.length) {
    const value = arr[idx];
    if (!keymap[value]) keymap[value] = 0;
    keymap[value] += 1;
    idx += 1;
  }
  idx = 0;
  const keykey = Object.keys(keymap);
  while (idx < keykey.length) {
    const value = keymap[keykey[idx]];
    if (value > out) {
      out = value;
      outIdx = keykey[idx];
    }
    idx += 1;
  }
  const parsed = parseInt(outIdx);
  return isNaN(parsed) ? outIdx : parsed
}
const FUNCTION$f = mode;
const SIGNATURE$f = ["Array", "any"];

function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
const FUNCTION$g = complement;
const SIGNATURE$g = ["function", "function"];

function constant(k) {
  return function forever() {
    return k
  }
}
const FUNCTION$h = constant;
const SIGNATURE$h = ["any", "function"];

function F() {
  return true
}
const FUNCTION$i = F;
const SIGNATURE$i = ["boolean"];

function first(x) {
  return x[0]
}
const FUNCTION$j = first;
const SIGNATURE$j = ["Array", "any"];

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}
const FUNCTION$k = fromPairs;
const SIGNATURE$k = ["Array", "object"];

function identity(y) {
  return y
}
const FUNCTION$l = identity;
const SIGNATURE$l = ["any", "any"];

function jam(a, b) {
  return Object.assign({}, b, a)
}
const FUNCTION$m = jam;
const SIGNATURE$m = ["object", "object", "object"];

function last(x) {
  return x[x.length - 1]
}
const FUNCTION$n = last;
const SIGNATURE$n = ["Array", "any"];

function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}
const FUNCTION$o = length;
const SIGNATURE$o = ["any", "number|nil"];

const isArray$1 = Array.isArray;
const keys = Object.keys;
const freeze = Object.freeze;
const round = Math.round;

var NATIVE = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isArray: isArray$1,
  keys: keys,
  freeze: freeze,
  round: round
});

function not(yy) {
  return !yy
}
const FUNCTION$p = not;
const SIGNATURE$p = ["any", "boolean"];

function makeIterable(xx) {
  const isArray = Array.isArray(xx);
  const isObject = xx && typeof xx === "object";

  if (!isArray && !isObject) {
    throw new TypeError(
      "Expected iterable initial value to be either an array or an object."
    )
  }
  const len = length(xx);
  const init = isArray ? Array(len) : {};
  const xKeys = !isArray && Object.keys(xx);
  return {
    length: len,
    iterate: function iterate(idx) {
      const key = isArray ? idx : xKeys[idx];
      return { key, value: xx[key] }
    },
    init,
    isArray
  }
}

function reverse(xx) {
  // if (typeof xx.reverse === "function") return xx.reverse()
  const loop = makeIterable(xx);
  let idx = loop.length;
  const out = loop.init;
  while (idx > -1) {
    const { value } = loop.iterate(idx);
    out[loop.length - 1 - idx] = value;
    idx -= 1;
  }
  return out
}
const FUNCTION$q = reverse;
const SIGNATURE$q = ["Array", "Array"];

function smash(args) {
  return args.reduce((agg, xx) => Object.assign({}, agg, xx), {})
}
const FUNCTION$r = smash;
const SIGNATURE$r = ["Array", "object"];

function smooth(x) {
  return x.filter(Boolean)
}
const FUNCTION$s = smooth;
const SIGNATURE$s = ["Array", "any"];

function T() {
  return true
}
const FUNCTION$t = T;
const SIGNATURE$t = ["boolean"];

function temper(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}
const FUNCTION$u = temper;
const SIGNATURE$u = ["object", "object", "object"];

function toLower(z) {
  return z.toLowerCase()
}
const FUNCTION$v = toLower;
const SIGNATURE$v = ["string", "string"];

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
const FUNCTION$w = toPairs;
const SIGNATURE$w = ["object", "Array"];

function toUpper(z) {
  return z.toUpperCase()
}
const FUNCTION$x = toUpper;
const SIGNATURE$x = ["string", "string"];

function mean(arr) {
  let idx = 0;
  let sum = 0;
  while (idx < arr.length) {
    sum += arr[idx];
    idx += 1;
  }
  return sum / arr.length
}
const FUNCTION$y = mean;
const SIGNATURE$y = ["Array", "number"];

const CORE_WITH_SIGNATURES = [
  [SIGNATURE$i, FUNCTION$i],
  [SIGNATURE$t, FUNCTION$t],
  [SIGNATURE$a, FUNCTION$a],
  [SIGNATURE$8, FUNCTION$8],
  [SIGNATURE$5, FUNCTION$5],
  [SIGNATURE$4, FUNCTION$4],
  [SIGNATURE$3, FUNCTION$3],
  [SIGNATURE$e, FUNCTION$e],
  [SIGNATURE$g, FUNCTION$g],
  [SIGNATURE$h, FUNCTION$h],
  [SIGNATURE$d, FUNCTION$d],
  [SIGNATURE$j, FUNCTION$j],
  [SIGNATURE$k, FUNCTION$k],
  [SIGNATURE$l, FUNCTION$l],
  [SIGNATURE$c, FUNCTION$c],
  [SIGNATURE$m, FUNCTION$m],
  [SIGNATURE$n, FUNCTION$n],
  [SIGNATURE$6, FUNCTION$6],
  [SIGNATURE$7, FUNCTION$7],
  [SIGNATURE$o, FUNCTION$o],
  [SIGNATURE, FUNCTION],
  [SIGNATURE$y, FUNCTION$y],
  [SIGNATURE$f, FUNCTION$f],
  [SIGNATURE$1, FUNCTION$1],
  [SIGNATURE$p, FUNCTION$p],
  [SIGNATURE$2, FUNCTION$2],
  [SIGNATURE$9, FUNCTION$9],
  [SIGNATURE$q, FUNCTION$q],
  [SIGNATURE$r, FUNCTION$r],
  [SIGNATURE$s, FUNCTION$s],
  [SIGNATURE$u, FUNCTION$u],
  [SIGNATURE$v, FUNCTION$v],
  [SIGNATURE$w, FUNCTION$w],
  [SIGNATURE$x, FUNCTION$x],
  [SIGNATURE$b, FUNCTION$b]
];

function makeSignedCore(def) {
  return CORE_WITH_SIGNATURES.reduce(function petition(agg, [hm, fn]) {
    return FUNCTION(agg, { [fn.name]: def({ hm, check: true })(fn) })
  }, NATIVE)
}

function makeSideEffectsFromEnvWithTypes(def) {
  const sideEffect = def({ check: true, hm: ["function", "any", "any"] })(
    function _sideEffect(fn, a) {
      fn(a);
      return a
    }
  );
  const binarySideEffect = def({
    check: true,
    hm: ["function", "any", "any", "any"]
  })(function _binarySideEffect(fn, a, b) {
    fn(a, b);
    return b
  });
  const trace = binarySideEffect(console.log);
  const inspect = def({
    check: true,
    hm: ["function", "function", "any", "any", "any"]
  })(function _inspect(fn, look, tag, x) {
    fn(tag, look(x));
    return x
  });
  return { sideEffect, binarySideEffect, trace, inspect }
}

function makeAddIndex({ curryN }) {
  return function addIndex(fn) {
    return curryN(fn.length, function indexAddedIter() {
      let idx = 0;
      const args = Array.prototype.slice.call(arguments, 0);
      const [origFn] = args;
      const list = args[args.length - 1];
      args[0] = function indexAdded() {
        const result = origFn.apply(
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

const GET_FUNCTION = makeAddIndex;
const SIGNATURE$z = ["function", "function"];

function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}
const GET_FUNCTION$1 = makeChain;
const ARITY = 2;
const SIGNATURE$A = ["function", "function|Array|object", "function|Array"];

function makePluck({ curryN, map, prop }) {
  return curryN(ARITY$1, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
const GET_FUNCTION$2 = makePluck;
const ARITY$1 = 2;
const SIGNATURE$B = ["string", "Array|object", "Array|object"];

function makeMedian({ $, dec, pipe, length, nth, sort, divide }) {
  return pipe(
    sort((a, b) => a - b),
    xx => pipe(length, dec, divide(2), Math.round, nth($, xx))(xx)
  )
}
const GET_FUNCTION$3 = makeMedian;
const SIGNATURE$C = ["Array", "number"];

function makeFlatten({ isArray, forEach }) {
  return function flatten(xx) {
    let idx = 0;
    const loop = makeIterable(xx);
    let out = [];
    while (idx < loop.length) {
      let { value } = loop.iterate(idx);
      if (isArray(value)) {
        value = flatten(value);
        forEach(x => out.push(x), value);
      } else {
        out.push(value);
      }
      idx += 1;
    }
    return out
  }
}
const GET_FUNCTION$4 = makeFlatten;
const SIGNATURE$D = ["Array", "Array"];

function makePredicatesPass({
  def,
  pipe,
  map,
  flip,
  any,
  all,
  smooth,
  length,
  gt
}) {
  function predFor(pred) {
    return def({ check: true, hm: ["Array", "Array", "boolean"] })(
      function predPass(preds, xx) {
        return pipe(map(flip(pred)(xx)), smooth, length, gt(0))(preds)
      }
    )
  }
  return { anyPass: predFor(any), allPass: predFor(all) }
}

function makeBind({ curryN }) {
  return curryN(2, function bind(fn, _this) {
    function bound() {
      return fn.apply(_this, arguments)
    }
    return fn.length > 1 ? curryN(fn.length, bound) : bound
  })
}
const GET_FUNCTION$5 = makeBind;
const SIGNATURE$E = ["function", "object", "function"];

function makeDifference({ curryN, filter, includes, complement }) {
  return curryN(ARITY$2, function difference(aa, bb) {
    return filter(complement(includes(bb)), aa)
  })
}
const GET_FUNCTION$6 = makeDifference;
const ARITY$2 = 2;
const SIGNATURE$F = ["Array", "Array", "Array"];

function makeFlip({ curryN }) {
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}
const GET_FUNCTION$7 = makeFlip;
const SIGNATURE$G = ["function", "function"];

function makeIsObject({ both, isRawObject }) {
  return function isObject(x) {
    return both(isRawObject, Boolean)(x)
  }
}
const GET_FUNCTION$8 = makeIsObject;
const SIGNATURE$H = ["any", "boolean"];

function makeJ2({ toJSON }) {
  return toJSON(2)
}
const GET_FUNCTION$9 = makeJ2;
const SIGNATURE$I = ["any", "string"];

function makePathOr({ curryN, reduce }) {
  return curryN(ARITY$3, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}
const GET_FUNCTION$a = makePathOr;
const ARITY$3 = 3;
const SIGNATURE$J = ["any", "Array", "Array|object", "any"];

function makePathOrDerivatives({ equals, is, def, pipe, pathOr }) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    return {
      accIs: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function pathIsOfConstructor(J, ks, src) {
        return pipe(acc(C.UNMATCHED, ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: def({
        check: true,
        hm: ["Array|string", "any", "object", "boolean"]
      })(function equivalence(ks, ex, src) {
        return pipe(acc(C.UNMATCHED, ks), equals(ex))(src)
      }),
      satisfies: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function satisfaction(fn, ks, src) {
        return pipe(acc(C.UNMATCHED, ks), fn, Boolean)(src)
      })
    }
  }
  const {
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr);
  const propOr = def({
    check: true,
    hm: ["any", "number|string", "object", "any"]
  })(function _propOr(dd, key, source) {
    return pathOr(dd, [key], source)
  });
  const {
    unsafe: prop,
    eq: propEq,
    satisfies: propSatisfies,
    accIs: propIs
  } = deriveFromAccessor(propOr);
  return {
    path,
    pathEq,
    pathSatisfies,
    pathIs,
    propOr,
    prop,
    propEq,
    propSatisfies,
    propIs
  }
}

function makeReject({ curryN, filter, complement }) {
  return curryN(ARITY$4, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}
const GET_FUNCTION$b = makeReject;
const ARITY$4 = 2;
const SIGNATURE$K = ["function", "object", "object"];

function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY$5, function symmetricDifference(aa, bb) {
    const aLoop = makeIterable(aa);
    const bLoop = makeIterable(bb);
    const notBoth = [];
    let idxA = 0;
    while (idxA < aLoop.length) {
      const { value } = aLoop.iterate(idxA);
      if (!bb.includes(value)) notBoth.push(value);
      idxA += 1;
    }
    let idxB = 0;
    while (idxB < bLoop.length) {
      const { value } = bLoop.iterate(idxB);
      if (!aa.includes(value)) notBoth.push(value);
      idxB += 1;
    }
    return notBoth
  })
}
const GET_FUNCTION$c = makeSymmetricDifference;
const ARITY$5 = 2;
const SIGNATURE$L = ["Array", "Array", "Array"];

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$6, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const GET_FUNCTION$d = makeUnion;
const ARITY$6 = 2;
const SIGNATURE$M = ["Array", "Array", "Array"];

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}
const GET_FUNCTION$e = makeUniq;
const SIGNATURE$N = ["Array", "Array"];

function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}
const GET_FUNCTION$f = makeIfElseDerivatives;

const derivedFunctionsSortedByIncreasingDependencies = [
  ["j2", GET_FUNCTION$9, SIGNATURE$I], // toJSON
  ["addIndex", GET_FUNCTION, SIGNATURE$z], // curryN
  ["bind", GET_FUNCTION$5, SIGNATURE$E], // curryN
  ["flip", GET_FUNCTION$7, SIGNATURE$G], // curryN
  ["__ifElse", GET_FUNCTION$f, false], // ifElse identity
  ["flatten", GET_FUNCTION$4, SIGNATURE$D], // isArray forEach any
  ["chain", GET_FUNCTION$1, SIGNATURE$A], // curryN map reduce concat
  ["reject", GET_FUNCTION$b, SIGNATURE$K], // curryN complement filter
  ["uniq", GET_FUNCTION$e, SIGNATURE$N], // curryN reduce
  ["median", GET_FUNCTION$3, SIGNATURE$C], // $ pipe length nth sort divide
  ["isObject", GET_FUNCTION$8, SIGNATURE$H], // curryN both isRawObject
  ["union", GET_FUNCTION$d, SIGNATURE$M], // curryN filter includes
  ["difference", GET_FUNCTION$6, SIGNATURE$F], // curryN complement filter includes
  ["symmetricDifference", GET_FUNCTION$c, SIGNATURE$L], // curryN difference
  ["__predicatesPass", makePredicatesPass, false], // curryN all, any flip gt length map smooth pipe
  ["pathOr", GET_FUNCTION$a, SIGNATURE$J], // curryN reduce
  ["__pathOrDerivatives", makePathOrDerivatives, false], // curryN equals is pathOr pipe
  ["pluck", GET_FUNCTION$2, SIGNATURE$B]
];
function extendDerived(C) {
  return C.reduce(
    function extendFUtility(__F, [name, maker, hm]) {
      const fn = maker(__F);
      const multi = name.includes("__");
      // the Ms count different when baby divides the pie
      if (!multi) {
        const safeFn = C.def({ check: true, hm })(fn);
        return __F.mash(__F, { [name]: safeFn })
      }
      return __F.mash(__F, fn)
    },
    C,
    derivedFunctionsSortedByIncreasingDependencies
  )
}

function add(b, a) {
  return a + b
}

const FUNCTION$z = add;
const SIGNATURE$O = ["number", "number", "number"];

function find(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  while (idx < loop.length) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return value
    }
    idx += 1;
  }
}

const FUNCTION$A = find;
const SIGNATURE$P = ["function", "object", "any"];

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$B = apply;
const SIGNATURE$Q = ["function", "Array", "any"];

function and(a, b) {
  return a && b
}
const FUNCTION$C = and;
const SIGNATURE$R = ["any", "any", "boolean"];

function any(fn, xx) {
  let idx = 0;
  let found = false;
  const len = length(xx);
  while (idx < len && !found) {
    if (fn(xx[idx])) found = true;
    idx += 1;
  }
  return found
}

const FUNCTION$D = any;
const SIGNATURE$S = ["function", "object", "boolean"];

function all(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  let promised = true;
  while (idx < loop.length && promised) {
    const { value } = loop.iterate(idx);
    const good = fn(value);
    if (!good) promised = false;
    idx += 1;
  }
  return promised
}
const FUNCTION$E = all;
const SIGNATURE$T = ["function", "Array|object", "boolean"];

function ap(a, b) {
  // S combinator
  if (isFunction(a) && isFunction(b)) {
    return function sCombinator(x) {
      return a(x, b(x))
    }
  }
  if (!isArray(a) || !isArray(b))
    throw new TypeError(
      "Expected to receive an array of functions and an array of values."
    )
  if (!a.length || a.filter(isFunction).length !== a.length)
    throw new TypeError("Expected to receive an array of functions to apply.")
  return a.reduce(function apReduce(out, fn) {
    return out.concat(b.map(fn))
  }, [])
}

const FUNCTION$F = ap;
const SIGNATURE$U = ["function|Array", "function|Array", "function|Array"];

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$G = concat;
const SIGNATURE$V = ["any", "any", "Array|String"];

function cond(conditions, input) {
  let idx = 0;
  let found = false;
  let match;
  const len = length(conditions);
  while (idx < len && !found) {
    const [test, out] = conditions[idx];
    if (test(input)) {
      found = true;
      match = out(input);
    }
    idx += 1;
  }
  return match
}

const FUNCTION$H = cond;
const SIGNATURE$W = ["Array", "any", "any"];

function divide(b, a) {
  return a / b
}
const FUNCTION$I = divide;
const SIGNATURE$X = ["number", "number", "number"];

function equals(a, b) {
  return a === b
}
const FUNCTION$J = equals;
const SIGNATURE$Y = ["any", "any", "boolean"];

function filter(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  const { length, isArray } = loop;
  const result = isArray ? [] : {};
  while (idx < length) {
    const { key, value } = loop.iterate(idx);
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

const FUNCTION$K = filter;
const SIGNATURE$Z = ["function", "object", "object"];

function forEach(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  const { length } = loop;
  while (idx < length) {
    const { value } = loop.iterate(idx);
    fn(value);
    idx += 1;
  }
}

const FUNCTION$L = forEach;
const SIGNATURE$_ = ["function", "object", "nil"];

function includes(a, b) {
  return a.includes(b)
}
const FUNCTION$M = includes;
const SIGNATURE$$ = ["Array|string", "Array|string", "boolean"];

function gt(b, a) {
  return a > b
}
const FUNCTION$N = gt;
const SIGNATURE$10 = ["number", "number", "boolean"];

function gte(b, a) {
  return a >= b
}
const FUNCTION$O = gte;
const SIGNATURE$11 = ["number", "number", "boolean"];

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$P = join;
const SIGNATURE$12 = ["string", "Array", "string"];

function lt(b, a) {
  return a < b
}
const FUNCTION$Q = lt;
const SIGNATURE$13 = ["number", "number", "boolean"];

function lte(b, a) {
  return a <= b
}
const FUNCTION$R = lte;
const SIGNATURE$14 = ["number", "number", "boolean"];

function map(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  const { length, init } = loop;
  const result = init;
  while (idx < length) {
    const { key, value } = loop.iterate(idx);
    result[key] = fn(value);
    idx += 1;
  }
  return result
}
const SIGNATURE$15 = ["function", "object", "object"];
const FUNCTION$S = map;

function max(aa, bb) {
  return Math.max(aa, bb)
}
const FUNCTION$T = max;
const SIGNATURE$16 = ['number', 'number'];

function min(aa, bb) {
  return Math.min(aa, bb)
}
const FUNCTION$U = min;
const SIGNATURE$17 = ["number", "number"];

function multiply(b, a) {
  return a * b
}
const FUNCTION$V = multiply;
const SIGNATURE$18 = ["number", "number", "number"];

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$W = nth;
const SIGNATURE$19 = ["number", "Array", "any"];

function or(a, b) {
  return a || b
}

const FUNCTION$X = or;
const SIGNATURE$1a = ["any", "any", "boolean"];

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$Y = range;
const SIGNATURE$1b = ["number", "number", "Array"];

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$Z = split;
const SIGNATURE$1c = ["string", "string", "Array"];

function sort(fn, rr) {
  const copy = [].concat(rr);
  copy.sort(fn);
  return copy
}

const FUNCTION$_ = sort;
const SIGNATURE$1d = ["function", "Array", "Array"];

function subtract(b, a) {
  return a - b
}

const FUNCTION$$ = subtract;
const SIGNATURE$1e = ["number", "number", "number"];

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$10 = toJSON;
const SIGNATURE$1f = ["number", "any", "string"];

const BINARY_WITH_SIGNATURES = [
  // infix
  [SIGNATURE$10, FUNCTION$N],
  [SIGNATURE$11, FUNCTION$O],
  [SIGNATURE$13, FUNCTION$Q],
  [SIGNATURE$14, FUNCTION$R],
  [SIGNATURE$R, FUNCTION$C],
  [SIGNATURE$Y, FUNCTION$J],
  [SIGNATURE$1a, FUNCTION$X],
  // math
  [SIGNATURE$1e, FUNCTION$$],
  [SIGNATURE$O, FUNCTION$z],
  [SIGNATURE$X, FUNCTION$I],
  [SIGNATURE$18, FUNCTION$V],
  // predicate
  [SIGNATURE$T, FUNCTION$E],
  [SIGNATURE$S, FUNCTION$D],
  [SIGNATURE$Z, FUNCTION$K],
  [SIGNATURE$P, FUNCTION$A],
  [SIGNATURE$_, FUNCTION$L],
  [SIGNATURE$$, FUNCTION$M],
  // folds
  [SIGNATURE$17, FUNCTION$U],
  [SIGNATURE$16, FUNCTION$T],
  [SIGNATURE$U, FUNCTION$F],
  [SIGNATURE$V, FUNCTION$G],
  [SIGNATURE$15, FUNCTION$S],
  [SIGNATURE$W, FUNCTION$H],
  [SIGNATURE$Q, FUNCTION$B],
  // accessor
  [SIGNATURE$19, FUNCTION$W],
  // generator
  [SIGNATURE$1b, FUNCTION$Y],
  // conversion
  [SIGNATURE$12, FUNCTION$P],
  [SIGNATURE$1d, FUNCTION$_],
  [SIGNATURE$1c, FUNCTION$Z],
  [SIGNATURE$1f, FUNCTION$10]
];

function extendBinaryWithSignatures(F) {
  return F.temper(
    F,
    BINARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 2, check: true, hm })(fn) })
    }, {})
  )
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
const FUNCTION$11 = both;
const SIGNATURE$1g = ["function", "function", "any", "boolean"];

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$12 = either;
const SIGNATURE$1h = ["function", "function", "any"];

function reduce(fn, initial, xx) {
  const loop = makeIterable(xx);
  let idx = 0;
  const { length } = loop;
  let result = initial;
  while (idx < length) {
    const { value } = loop.iterate(idx);
    result = fn(result, value);
    idx += 1;
  }
  return result
}

const FUNCTION$13 = reduce;
const SIGNATURE$1i = ["function", "any", "object", "any"];

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$14 = slice;
const SIGNATURE$1j = ["number", "number", "object", "object"];

const TERNARY_WITH_SIGNATURES = [
  [SIGNATURE$1g, FUNCTION$11],
  [SIGNATURE$1h, FUNCTION$12],
  [SIGNATURE$1i, FUNCTION$13],
  [SIGNATURE$1j, FUNCTION$14]
];

function extendTernaryWithSignatures(F) {
  return F.temper(
    F,
    TERNARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 3, check: true, hm })(fn) })
    }, {})
  )
}

function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

const FUNCTION$15 = ifElse;
const SIGNATURE$1k = ["function", "function", "function", "any", "any"];

const QUATERNARY_WITH_SIGNATURES = [[SIGNATURE$1k, FUNCTION$15]];

function extendQuaternaryWithSignatures(F) {
  return F.temper(
    F,
    QUATERNARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 4, check: true, hm })(fn) })
    }, {})
  )
}

function coreWithTypes(config) {
  return pipe(fabricate, function basicDefinitions({ def, curry, curryN }) {
    const SIGNED_CORE = makeSignedCore(def);
    const sideEffectMethods = makeSideEffectsFromEnvWithTypes(def);
    const autoCurry = autoCurryUsing(curryN);
    const BASE = SIGNED_CORE.smash([
      autoCurry(SIGNED_CORE),
      sideEffectMethods,
      {
        memoizeWith,
        def,
        curry,
        curryN,
        C,
        $: C.$,
        is: ofConstructor,
        isArray,
        isBoolean,
        isFunction,
        isNumber,
        isRawObject,
        isString,
        isSymbol,
        isUndefined,
        isUnmatched
      }
    ]);
    return BASE.pipe(
      extendBinaryWithSignatures,
      autoCurry,
      extendTernaryWithSignatures,
      autoCurry,
      extendQuaternaryWithSignatures,
      autoCurry,
      extendDerived,
      makeAliases
    )(BASE)
  })(config)
}

const CONFIG = Object.freeze({
  UNCHECKED: {
    name: "@@FUTILITY::config.unchecked",
    ts: () => "any",
    check: false
  },
  CHECKED: {
    name: "@@FUTILITY::config.checked",
    ts: system,
    check: true
  },
  AUTO: {
    name: "@@FUTILITY::config.auto",
    ts: system,
    check:
      /* istanbul ignore next */
      (typeof process !== "undefined" &&
        typeof process.env !== "undefined" &&
        typeof process.env.NODE_ENV !== "undefined" &&
        process.env.NODE_ENV !== "production") ||
      /* istanbul ignore next */
      (typeof window !== "undefined" &&
        typeof window.__FUTILITY_TYPE_CHECK === "boolean" &&
        window.__FUTILITY_TYPE_CHECK)
  }
});

const FUTILITY = coreWithTypes(CONFIG.CHECKED);
var debug = FUTILITY.temper(FUTILITY, {
  custom: coreWithTypes,
  version: "4.0.0",
  configuration: CONFIG.CHECKED
});

export default debug;
