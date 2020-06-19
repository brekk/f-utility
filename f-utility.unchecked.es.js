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
    some: F.any,
    sortBy: F.sort,
    tap: F.sideEffect,
    head: F.first
  })
}

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

function F() {
  return true
}

function T() {
  return true
}

function adjust(idx, fn, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = fn(copy[relIdx]);
  return copy
}

function append(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(copy.length, 0, whatever);
  return copy
}

function assoc(key, toSet, xx) {
  return Object.assign({}, xx, { [key]: toSet })
}

function box(bx) {
  return [bx]
}

function call(args) {
  return args[0].apply(null, args.slice(1))
}

function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments);
    return !fn.apply(null, args)
  }
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

function compose() {
  return pipe.apply(null, Array.from(arguments).reverse())
}

function constant(k) {
  return function forever() {
    return k
  }
}

function dec(xx) {
  return xx - 1
}

function dissoc(key, xx) {
  const copy = Object.assign({}, xx);
  delete copy[key];
  return copy
}

function drop(xx, src) {
  if (src && isFunction(src.drop)) {
    return src.drop(xx)
  }
  return src.slice(xx, Infinity)
}

function dropLast(xx, src) {
  if (src && isFunction(src.dropLast)) {
    return src.dropLast(xx)
  }
  return src.slice(0, src.length - xx)
}

const EMPTY_LOOKUPS = Object.freeze({
  "String∋string": "",
  "Array∋array": [],
  "Object∋object": {}
});
function empty(xx) {
  if (xx && isFunction(xx.empty)) return xx.empty()
  return EMPTY_LOOKUPS[system(xx)]
}

function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}

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

function findIndex(fn, xx) {
  const loop = makeIterable(xx);
  let idx = 0;
  while (idx > loop.length) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return idx
    }
    idx += 1;
  }
}

function findLast(fn, xx) {
  const loop = makeIterable(xx);
  let idx = loop.length;
  while (idx > -1) {
    idx = loop.length - idx - 1;
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return value
    }
    idx += 1;
  }
}

function findLastIndex(fn, xx) {
  const loop = makeIterable(xx);
  let idx = 1;
  while (loop.length - idx > -1) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return idx
    }
    idx += 1;
  }
}

function first(x) {
  return x[0]
}

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}

function identity(y) {
  return y
}

function inc(xx) {
  return xx + 1
}

function init(xx) {
  return xx.slice(0, -1)
}

function invert(xx) {
  const loop = makeIterable(xx);
  const out = loop.init;
  let idx = 0;
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx);
    const current = out[value];
    const isArr = Array.isArray(current);
    out.value =
      current && isArr
        ? current.concat(key)
        : current && !isArr
        ? [current, key]
        : key;
    idx += 1;
  }
  return out
}

function invertObj(xx) {
  const loop = makeIterable(xx);
  const out = loop.init;
  let idx = 0;
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx);
    out[value] = key;
    idx += 1;
  }
  return out
}

function jam(a, b) {
  return Object.assign({}, b, a)
}

function juxt(fns) {
  return function juxtapose() {
    const args = Array.from(arguments);
    let idx = 0;
    const loop = makeIterable(fns);
    const out = [];
    while (idx < loop.length) {
      const { value: fn } = loop.iterate(idx);
      out.push(fn.apply(null, args));
      idx += 1;
    }
    return out
  }
}

function keysIn(xx) {
  const out = [];
  for (let key in xx) {
    out.push(key);
  }
  return out
}

function last(x) {
  return x[x.length - 1]
}

function mean(arr) {
  let idx = 0;
  let sum = 0;
  while (idx < arr.length) {
    sum += arr[idx];
    idx += 1;
  }
  return sum / arr.length
}

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

function move(_aa, _zz, arr) {
  const len = arr.length;
  function wrap(q) {
    return q < 0 ? len + q : q
  }
  function outOfBounds(s) {
    return s < 0 || s >= arr.length
  }
  const copy = arr.slice();
  const [aa, zz] = [_aa, _zz].map(wrap);
  const item = arr.splice(aa, 1);
  return outOfBounds(aa) || outOfBounds(zz)
    ? arr
    : []
        .concat(copy.slice(0, aa))
        .concat(item)
        .concat(copy.slice(zz, len))
}

function negate(xx) {
  return -xx
}

function not(yy) {
  return !yy
}

function nthArg(nn) {
  return function grabNth() {
    return arguments[nn]
  }
}

function objOf(xx, whatever) {
  return { [xx]: whatever }
}

function once(fn) {
  let saved;
  return function oneTime() {
    {
      saved = fn.apply(null, arguments);
      return saved
    }
  }
}

function pair(aa, zz) {
  return [aa, zz]
}

function partial(fn, args1) {
  return function partiallyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2))
  }
}

function partialRight(fn, args1) {
  return function partialRightlyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2).reverse())
  }
}

function prepend(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(0, 0, whatever);
  return copy
}

function repeat(nn, xx) {
  return xx.repeat(nn)
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

function smash(args) {
  return args.reduce((agg, xx) => Object.assign({}, agg, xx), {})
}

function smooth(x) {
  return x.filter(Boolean)
}

function splitAt(idx, xx) {
  return [xx.slice(0, idx), xx.slice(idx + 1, Infinity)]
}

function sum(arr) {
  return arr.reduce(function adding(count, x) {
    return count + x
  }, 0)
}

function tail(xx) {
  return xx.slice(1)
}

function take(nn, xx) {
  if (xx && isFunction(xx.take)) return xx.take(nn)
  return xx.slice(0, nn)
}

function takeLast(nn, xx) {
  if (xx && isFunction(xx.takeLast)) return xx.takeLast(nn)
  return xx.slice(xx.length - nn, Infinity)
}

function temper(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}

function test(rg, str) {
  return str.test(rg)
}

function toLower(z) {
  return z.toLowerCase()
}

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}

function toUpper(z) {
  return z.toUpperCase()
}

function update(idx, val, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = val;
  return copy
}

const CORE = temper(NATIVE, {
  F,
  T,
  adjust,
  append,
  assoc,
  box,
  call,
  complement,
  compose,
  constant,
  dec,
  dissoc,
  drop,
  dropLast,
  empty,
  findIndex,
  findLast,
  findLastIndex,
  first,
  fromPairs,
  identity,
  inc,
  init,
  invert,
  invertObj,
  jam,
  juxt,
  keysIn,
  last,
  length,
  mash,
  mean,
  mode,
  move,
  negate,
  not,
  nthArg,
  objOf,
  once,
  pair,
  partial,
  partialRight,
  pipe,
  prepend,
  repeat,
  reverse,
  smash,
  smooth,
  splitAt,
  sum,
  tail,
  take,
  takeLast,
  temper,
  test,
  toLower,
  toPairs,
  toUpper,
  update
});

function makeSideEffectsFromEnv(curry) {
  const sideEffect = curry(function _sideEffect(fn, a) {
    fn(a);
    return a
  });
  const binarySideEffect = curry(function _binarySideEffect(fn, a, b) {
    fn(a, b);
    return b
  });
  const trace = binarySideEffect(console.log);
  const inspect = curry(function _inspect(fn, look, tag, x) {
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

function makeMedian({ $, dec, pipe, length, nth, sort, divide }) {
  return pipe(
    sort((a, b) => a - b),
    xx => pipe(length, dec, divide(2), Math.round, nth($, xx))(xx)
  )
}

function makePluck({ curryN, map, prop }) {
  return curryN(ARITY, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
const ARITY = 2;

function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY$1, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}
const ARITY$1 = 2;

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

function makePredicatesPass({
  curryN,
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
    return curryN(2, function predPass(preds, xx) {
      return pipe(map(flip(pred)(xx)), smooth, length, gt(0))(preds)
    })
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

function makeDifference({ curryN, filter, includes, complement }) {
  return curryN(ARITY$2, function difference(aa, bb) {
    return filter(complement(includes(bb)), aa)
  })
}
const ARITY$2 = 2;

function makeFlip({ curryN }) {
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}

function makeIsObject({ both, isRawObject }) {
  return function isObject(x) {
    return both(isRawObject, Boolean)(x)
  }
}

function makeJ2({ toJSON }) {
  return toJSON(2)
}

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
const ARITY$3 = 3;

function makePathOrDerivatives({ equals, is, curryN, pipe, pathOr }) {
  // pathOr => {hasPath, path, pathEq, pathSatisfies, pathIs}
  // propOr => {hasProp, prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    const run = acc(C.UNMATCHED);
    return {
      hasAcc: curryN(2, function hasProperty(ks, src) {
        return pipe(run(ks), Boolean)(src)
      }),
      accIs: curryN(3, function pathIsOfConstructor(J, ks, src) {
        return pipe(run(ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: curryN(3, function equivalence(ks, ex, src) {
        return pipe(run(ks), equals(ex))(src)
      }),
      satisfies: curryN(3, function satisfaction(fn, ks, src) {
        return pipe(run(ks), fn, Boolean)(src)
      })
    }
  }
  const {
    hasAcc: hasPath,
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr);
  const propOr = curryN(3, function _propOr(dd, key, source) {
    return pathOr(dd, [key], source)
  });
  const {
    hasAcc: hasProp,
    unsafe: prop,
    eq: propEq,
    satisfies: propSatisfies,
    accIs: propIs
  } = deriveFromAccessor(propOr);
  return {
    hasPath,
    path,
    pathEq,
    pathSatisfies,
    pathIs,
    hasProp,
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
const ARITY$4 = 2;

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
const ARITY$5 = 2;

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$6, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const ARITY$6 = 2;

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}

function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}

function makeEqProps({ pipe, map, prop, equals }) {
  return function eqProps(kk, aa, bb) {
    return pipe(map(prop(kk)), ([a2, b2]) => equals(a2, b2))([aa, bb])
  }
}

function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY$7, function groupBy(fn, xx) {
    return reduce(function groupingBy(agg, yy) {
      return mash(agg, objOf(fn(yy), yy)), {}
    })(xx)
  })
}
const ARITY$7 = 2;

function makeIntersection({ uniq, concat, curryN }) {
  return curryN(ARITY$8, function intersection(aa, bb) {
    return uniq(concat(aa, bb))
  })
}
const ARITY$8 = 2;

function makeIsEmpty({ equals, empty }) {
  return function isEmpty(xx) {
    return equals(empty(xx), xx)
  }
}

function makeLift({ liftN }) {
  return function lift(fn) {
    return fn.length > 1 ? fn : liftN(fn.length, fn)
  }
}

function makeLiftN({ curryN, reduce, ap, map }) {
  return curryN(2, function liftN(arity, fn) {
    const lifted = curryN(arity, fn);
    return curryN(arity, function liftedN() {
      const aa = arguments[0];
      const bz = Array.prototype.slice.call(arguments, 1);
      return reduce(ap, map(lifted, aa), bz)
    })
  })
}

function makeOmit({ complement, pickBy, includes }) {
  return function omit(kk, xx) {
    return pickBy(complement(includes)(kk), xx)
  }
}

function makePick({ pickBy, includes }) {
  return function pick(kk, xx) {
    return pickBy(includes(kk), xx)
  }
}

function makeProps({ pipe, ap, prop, box, map, curryN }) {
  return curryN(ARITY$9, function props(toGrab, xx) {
    return pipe(box, ap(map(prop, toGrab)))(xx)
  })
}
const ARITY$9 = 2;

function makeThunkify({ curryN }) {
  return function thunkify(fn) {
    return curryN(fn.length, function think() {
      const args = arguments;
      return function thank() {
        return fn.apply(this, args)
      }
    })
  }
}

const derivedFunctionsSortedByIncreasingDependencies = {
  j2: makeJ2, // toJSON
  addIndex: makeAddIndex, // curryN
  omit: makeOmit, // complement pickBy includes
  pick: makePick, // pickBy includes
  bind: makeBind, // curryN
  flip: makeFlip, // curryN
  liftN: makeLiftN, // curryN reduce ap map
  lift: makeLift, // lift
  thunkify: makeThunkify, // curryN
  groupBy: makeGroupBy, // curryN objOf mash reduce
  intersection: makeIntersection, // curryN uniq concat
  isEmpty: makeIsEmpty, // equals empty
  __ifElse: makeIfElseDerivatives, // ifElse identity
  flatten: makeFlatten, // isArray forEach any
  chain: makeChain, // curryN map reduce concat
  reject: makeReject, // curryN complement filter
  uniq: makeUniq, // curryN reduce
  isObject: makeIsObject, // curryN both isRawObject
  median: makeMedian, // $ pipe length nth sort divide
  union: makeUnion, // curryN filter includes
  difference: makeDifference, // curryN complement filter includes
  symmetricDifference: makeSymmetricDifference, // curryN difference
  __predicatesPass: makePredicatesPass, // curryN all, any flip gt length map smooth pipe
  pathOr: makePathOr, // curryN reduce
  __pathOrDerivatives: makePathOrDerivatives, // curryN equals is pathOr pipe
  props: makeProps, // curryN pipe ap prop box map
  eqProps: makeEqProps, // curryN pipe map prop equals
  pluck: makePluck // curryN prop map
};
function extendDerived(C) {
  return C.pipe(
    C.toPairs,
    C.reduce(function extendFUtility(__F, [name, maker]) {
      const fn = maker(__F);
      return __F.mash(__F, !name.includes("__") ? { [name]: fn } : fn)
    }, C)
  )(derivedFunctionsSortedByIncreasingDependencies)
}

function applyTo(xx, fn) {
  return fn(xx)
}

const FUNCTION = applyTo;

function endsWith(needle, haystack) {
  if (haystack && isFunction(haystack.endsWith)) {
    return haystack.endsWith(needle)
  }
  return haystack[haystack.length - 1] === needle
}
const FUNCTION$1 = endsWith;

function findIndex$1(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  while (idx < loop.length) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return idx
    }
    idx += 1;
  }
}

const FUNCTION$2 = findIndex$1;

function hasIn(pp, xx) {
  return xx in pp
}
const FUNCTION$3 = hasIn;

function identical(aa, bb) {
  return Object.is(aa, bb)
}
const FUNCTION$4 = identical;

function indexOf(needle, haystack) {
  if (haystack && isFunction(haystack.indexOf)) return haystack.indexOf(needle)
  const loop = makeIterable(haystack);
  let idx = -1;
  while (idx <= loop.length) {
    const { value } = loop.iterate(idx);
    if (value === needle) return idx
    idx += 1;
  }
  return idx
}
const FUNCTION$5 = indexOf;

function lastIndexOf(needle, haystack) {
  if (haystack && isFunction(haystack.lastIndexOf)) {
    return haystack.lastIndexOf(needle)
  }
  const loop = makeIterable(haystack);
  let idx = loop.length - 1;
  while (idx > -2) {
    const { value } = loop.iterate(idx);
    if (value === needle) return idx
    idx -= 1;
  }
  return idx
}
const FUNCTION$6 = lastIndexOf;

function match(rx, str) {
  return str.match(rx)
}
const FUNCTION$7 = match;

function none(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  let promised = false;
  while (idx < loop.length && !promised) {
    const { value } = loop.iterate(idx);
    const good = fn(value);
    if (good) promised = true;
    idx += 1;
  }
  return promised
}
const FUNCTION$8 = none;

function pickBy(fn, xx) {
  const loop = makeIterable(xx);
  const out = loop.init;
  let idx = 0;
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx);
    if (fn(value, key)) out[key] = value;
    idx += 1;
  }
  return out
}
const FUNCTION$9 = pickBy;

function startsWith(needle, haystack) {
  if (haystack && isFunction(haystack.startsWith)) {
    return haystack.startsWith(needle)
  }
  return haystack[0] === needle
}
const FUNCTION$a = startsWith;

function add(b, a) {
  return a + b
}

const FUNCTION$b = add;

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

const FUNCTION$c = find;

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$d = apply;

function and(a, b) {
  return a && b
}
const FUNCTION$e = and;

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

const FUNCTION$f = any;

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
const FUNCTION$g = all;

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

const FUNCTION$h = ap;

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$i = concat;

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

const FUNCTION$j = cond;

function divide(b, a) {
  return a / b
}
const FUNCTION$k = divide;

function equals(a, b) {
  return a === b
}
const FUNCTION$l = equals;

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

const FUNCTION$m = filter;

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

const FUNCTION$n = forEach;

function includes(a, b) {
  return a.includes(b)
}
const FUNCTION$o = includes;

function gt(b, a) {
  return a > b
}
const FUNCTION$p = gt;

function gte(b, a) {
  return a >= b
}
const FUNCTION$q = gte;

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$r = join;

function lt(b, a) {
  return a < b
}
const FUNCTION$s = lt;

function lte(b, a) {
  return a <= b
}
const FUNCTION$t = lte;

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
const FUNCTION$u = map;

function max(aa, bb) {
  return Math.max(aa, bb)
}
const FUNCTION$v = max;

function min(aa, bb) {
  return Math.min(aa, bb)
}
const FUNCTION$w = min;

function multiply(b, a) {
  return a * b
}
const FUNCTION$x = multiply;

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$y = nth;

function or(a, b) {
  return a || b
}

const FUNCTION$z = or;

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$A = range;

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$B = split;

function sort(fn, rr) {
  const copy = [].concat(rr);
  copy.sort(fn);
  return copy
}

const FUNCTION$C = sort;

function subtract(b, a) {
  return a - b
}

const FUNCTION$D = subtract;

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$E = toJSON;

function extendBinary(F) {
  const BINARY = {
    add: FUNCTION$b,
    all: FUNCTION$g,
    and: FUNCTION$e,
    any: FUNCTION$f,
    ap: FUNCTION$h,
    apply: FUNCTION$d,
    applyTo: FUNCTION,
    concat: FUNCTION$i,
    cond: FUNCTION$j,
    divide: FUNCTION$k,
    endsWith: FUNCTION$1,
    equals: FUNCTION$l,
    filter: FUNCTION$m,
    find: FUNCTION$c,
    findIndex: FUNCTION$2,
    forEach: FUNCTION$n,
    gt: FUNCTION$p,
    gte: FUNCTION$q,
    hasIn: FUNCTION$3,
    identical: FUNCTION$4,
    includes: FUNCTION$o,
    indexOf: FUNCTION$5,
    join: FUNCTION$r,
    lastIndexOf: FUNCTION$6,
    lt: FUNCTION$s,
    lte: FUNCTION$t,
    map: FUNCTION$u,
    match: FUNCTION$7,
    max: FUNCTION$v,
    min: FUNCTION$w,
    multiply: FUNCTION$x,
    none: FUNCTION$8,
    nth: FUNCTION$y,
    or: FUNCTION$z,
    pickBy: FUNCTION$9,
    range: FUNCTION$A,
    sort: FUNCTION$C,
    split: FUNCTION$B,
    startsWith: FUNCTION$a,
    subtract: FUNCTION$D,
    toJSON: FUNCTION$E
  };
  return F.temper(F, BINARY)
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
const FUNCTION$F = both;

function replace(rx, rep, str) {
  return str.replace(rx, rep)
}
const FUNCTION$G = replace;

function innerJoin(pred, xs, ys) {
  const loopX = makeIterable(xs);
  const out = loopX.init;
  const loopY = makeIterable(ys);
  let idx = 0;
  while (idx < loopX.length) {
    const { value: x } = loopX.iterate(idx);
    let idy = 0;
    while (idy < loopY.length) {
      const { value: y } = loopY.iterate(idy);
      const same = pred(x, y);
      if (same) out.push(x);
      idy += 1;
    }
    idx += 1;
  }
  return out
}
const FUNCTION$H = innerJoin;

function eqBy(fn, a, b) {
  return Boolean(fn(a, b))
}
const FUNCTION$I = eqBy;

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$J = either;

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

const FUNCTION$K = reduce;

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$L = slice;

function extendTernary(F) {
  return F.temper(F, {
    both: FUNCTION$F,
    either: FUNCTION$J,
    eqBy: FUNCTION$I,
    innerJoin: FUNCTION$H,
    reduce: FUNCTION$K,
    replace: FUNCTION$G,
    slice: FUNCTION$L
  })
}

function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

const FUNCTION$M = ifElse;

function extendQuaternary(F) {
  return F.temper(F, {
    ifElse: FUNCTION$M
  })
}

function core(config) {
  return CORE.pipe(fabricate, function basicDefinitions({
    def,
    curry,
    curryN
  }) {
    const sideEffectMethods = makeSideEffectsFromEnv(curry);
    const autoCurry = autoCurryUsing(curryN);
    const BASE = CORE.smash([
      autoCurry(CORE),
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
      extendBinary,
      autoCurry,
      extendTernary,
      autoCurry,
      extendQuaternary,
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

const FUTILITY = core(CONFIG.UNCHECKED);
var production = FUTILITY.temper(FUTILITY, {
  version: "4.0.0",
  configuration: CONFIG.UNCHECKED
});

export default production;
