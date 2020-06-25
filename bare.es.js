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
    if (type === "string") {
      constructor = "String";
    } else if (type === "undefined" || type === "object") {
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
  return function functionToString(rawName) {
    return rawName
      ? fn
      : `curry(${fn})${args.length > 0 ? `(${args.join(`,`)})` : ``}`
  }
}

function hmError(name, actual, params) {
  return `Given ${name}( ${actual &&
    actual.join(", ")} ) but expected ${name}( ${params
    .map(z => (Array.isArray(z) ? z.join("|") : z))
    .slice(0, actual.length)
    .join(", ")} )`
}
const rLine = /\n\s+at ((\w\.?)+) \((.*)\)/g;
const BLACKLIST = ["null", "curried", "saucy"];

function cleanErrorStackFor({
  blacklist = BLACKLIST,
  files = ["f-utility"],
  prefix: pp = "F"
}) {
  return function cleanStack(e) {
    if (e && e.stack) {
      const { stack } = e;
      let once = false;
      e.stack = stack.replace(rLine, (match, fn, __file) => {
        const file = __file.replace(/:\d+:\d+/, "");

        console.log(">>>", fn, "@>>@>@", file, "!!!!!!!", __file);
        const loc = `(${file})`;
        const isHighlight = files.includes(file);
        const badFunction = blacklist.includes(fn);
        console.log("isHighlight", isHighlight, "badFunction?", badFunction);
        const newline = !once ? "\n\t" : "";
        once = true;
        return isHighlight && !badFunction
          ? `${newline}-> ${fn === "piped" ? `${pp}.pipe` : `${pp}.` + fn} ${
              isHighlight ? "" : loc
            }`
          : badFunction
          ? ""
          : match
      });
    }
    return e
  }
}

function defineFunctionWithParameterTest(test) {
  return function funcfunc({
    ts = system,
    n: givenLength,
    hm,
    check,
    tryCatch,
    cleanErrors = true
  }) {
    if (check) {
      if (typeof ts !== "function")
        throw new TypeError("Expected typeSystem to be a function.")
      if (!hm || !Array.isArray(hm))
        throw new TypeError("Expected hm to be an array of strings.")
    }
    const __cleanStack = cleanErrorStackFor({});
    return function currified(fn) {
      try {
        const fnName =
          fn && typeof fn.hm !== "undefined"
            ? fn.toString(true)
            : fn.name
            ? fn.name
            : "fn";
        const heat = testCurryGaps(test);
        const mergeParams = makeParamMerger(test);
        const isSpicy = some(test);
        /* eslint-disable-next-line no-inner-declarations */
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
          if (check) {
            saucy.toString = toString(fnName, args);
            saucy.hm = hm;
          }
          if (length >= nArgs) {
            let result;
            try {
              result = fn.apply(this, args);
            } catch (e) {
              throw cleanErrors ? __cleanStack(e) : e
            }
            if (check) {
              const tChecker = makeTypechecker(ts)(hm, args);
              const isValid = checkParamsWith(ts)(hm, args);

              if (!isValid) {
                const { rawParams, params } = tChecker;
                throw new TypeError(
                  hmError(
                    fnName,
                    rawParams.map(z => z.actual),
                    params.map(archetype)
                  )
                )
              }
              const returnTypeValid = checkReturnWith(ts)(result)(hm, args);

              if (!returnTypeValid) {
                const { returnType } = tChecker;
                throw new TypeError(
                  `Expected ${fnName} to return ${archetype(
                    returnType
                  )} but got ${system(result)}.`
                )
              }
            }
            return result
          }
          return saucy
        }
        if (check) {
          curried.toString = toString(fnName);
          curried.hm = hm;
        }
        return curried
      } catch (e) {
        if (typeof tryCatch === "function") {
          return tryCatch(e)
        }
        throw e
      }
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
function isNil(xx) {
  return typeof xx === "undefined" || (typeof xx === "object" && !xx)
}

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
  return F.weld(F, {
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
    head: F.first,
    of: F.box
  })
}

const isArray$1 = Array.isArray;
const keys = Object.keys;
const values = Object.values;
const freeze = Object.freeze;
const round = Math.round;
function trim(xx) {
  return xx.trim()
}

var NATIVE = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isArray: isArray$1,
  keys: keys,
  values: values,
  freeze: freeze,
  round: round,
  trim: trim
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
  "Array∋object": [],
  "Object∋object": {}
});
function empty(xx) {
  if (xx && isFunction(xx.empty)) {
    return xx.empty()
  }
  const tt = system(xx);
  const matched = EMPTY_LOOKUPS[tt];
  if (typeof matched === "undefined") return undefined
  return matched
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

function invert(xx) {
  const loop = makeIterable(xx);
  const out = loop.init;
  let idx = 0;
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx);
    const current = out[value] || false;
    const isArr = Array.isArray(current);
    out[value] =
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
      const iter = args
        .slice(1, Infinity)
        .reduce((a, b) => [fn.apply(null, a.concat(b))], [args[0]])[0];
      out.push(iter);
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
  const copy = arr.slice();
  function wrap(q) {
    return q < 0 ? len + q : q
  }
  function outOfBounds(s) {
    return s < 0 || s >= len
  }
  const [aa, zz] = [_aa, _zz].map(wrap);
  const item = copy.splice(aa, 1);
  return outOfBounds(aa) || outOfBounds(zz)
    ? arr
    : []
        .concat(copy.slice(0, zz))
        .concat(item)
        .concat(copy.slice(zz, arr.length))
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
  let run = false;
  let saved;
  return function oneTime() {
    if (!run) {
      saved = fn.apply(null, arguments);
      run = true;
      return saved
    }
    return saved
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

function splitAt(idx, xx) {
  return [xx.slice(0, idx), xx.slice(idx, Infinity)]
}

function product(arr) {
  return arr.reduce(function multiplying(count, x) {
    return count * x
  }, 1)
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

function weld(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}

function regexTest(rg, str) {
  return rg.test(str)
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

const CORE = weld(NATIVE, {
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
  splitAt,
  sum,
  product,
  tail,
  take,
  takeLast,
  weld,
  test: regexTest,
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

function makeOrDefault({ curryN, isNil, isUnmatched }) {
  return curryN(ARITY, function orDefault(def, given) {
    return isNil(given) || isUnmatched(given) ? def : given
  })
}
const ARITY = 2;

function makeApplySpecN({ isFunction, keys, curryN, apply }) {
  function mapper(fn, xx) {
    return keys(xx).reduce((agg, k) => {
      agg[k] = fn(xx[k]);
      return agg
    }, {})
  }
  return curryN(2, function applySpecN(givenArity, spec) {
    const applied = mapper(
      v => (isFunction(v) ? v : applySpecN(givenArity, v)),
      spec
    );
    return curryN(givenArity, function specificationApplication() {
      const args = Array.from(arguments);
      return mapper(f => apply(f, args), applied)
    })
  })
}

function makeAddIndex({ curryN }) {
  return function addIndex(fn) {
    return curryN(fn.length, function indexAddedIter() {
      let idx = 0;
      const args = [].slice.call(arguments, 0);
      const [origFn] = args;
      const list = args[args.length - 1];
      args[0] = function indexAdded() {
        const result = origFn.apply(
          this,
          [].concat([].slice.call(arguments, 0)).concat([idx, list])
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
  return curryN(ARITY$1, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
const ARITY$1 = 2;

function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY$2, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}
const ARITY$2 = 2;

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

function makeDifference({ curryN, filter, flip, includes, complement }) {
  return curryN(ARITY$3, function difference(aa, bb) {
    return filter(complement(flip(includes)(bb)), aa)
  })
}
const ARITY$3 = 2;

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
  return curryN(ARITY$4, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}
const ARITY$4 = 3;

function makePathOrDerivatives({
  equals,
  is,
  curryN,
  complement,
  isUnmatched,
  pipe,
  pathOr
}) {
  // pathOr => {hasPath, path, pathEq, pathSatisfies, pathIs}
  // propOr => {hasProp, prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    const run = acc(C.UNMATCHED);
    return {
      hasAcc: curryN(2, function _hasPath(ks, src) {
        return pipe(run(ks), complement(isUnmatched))(src)
      }),
      accIs: curryN(3, function _pathIs(J, ks, src) {
        return pipe(run(ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: curryN(3, function _pathEq(ks, ex, src) {
        return pipe(run(ks), equals(ex))(src)
      }),
      satisfies: curryN(3, function _pathSatisifes(fn, ks, src) {
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
  return curryN(ARITY$5, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}
const ARITY$5 = 2;

function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY$6, function symmetricDifference(aa, bb) {
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
const ARITY$6 = 2;

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$7, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const ARITY$7 = 2;

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}

function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}

function makeEqProps({ curryN, pipe, map, prop, equals }) {
  return curryN(ARITY$8, function eqProps(kk, aa, bb) {
    return pipe(map(prop(kk)), ([a2, b2]) => equals(a2, b2))([aa, bb])
  })
}
const ARITY$8 = 3;

function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY$9, function groupBy(fn, xx) {
    return reduce(function groupingBy(agg, yy) {
      const copy = mash({}, agg);
      const key = fn(yy);
      if (copy[key]) {
        copy[key] = copy[key].concat(yy);
        return copy
      }
      const toMash = objOf(key, [yy]);
      return mash(copy, toMash)
    }, {})(xx)
  })
}
const ARITY$9 = 2;

function makeIntersection({ uniq, concat, curryN }) {
  return curryN(ARITY$a, function intersection(aa, bb) {
    return uniq(concat(aa, bb))
  })
}
const ARITY$a = 2;

function makeIsEmpty({
  equals,
  empty,
  isArray,
  isRawObject,
  keys,
  length,
  pipe
}) {
  return function isEmpty(xx) {
    const matched = empty(xx);
    if (typeof matched === "undefined") return false
    return isArray(xx)
      ? xx.length === 0
      : isRawObject(xx)
      ? pipe(keys, length)(xx) === 0
      : equals(matched, xx)
  }
}

function makeLift({ liftN }) {
  return function lift(fn) {
    return liftN(fn.length, fn)
  }
}

function makeLiftN({ curryN, reduce, ap, map }) {
  return curryN(2, function liftN(arity, fn) {
    const lifted = curryN(arity, fn);
    return curryN(arity, function liftedN() {
      return reduce(
        ap,
        map(lifted, arguments[0]),
        Array.prototype.slice.call(arguments, 1)
      )
    })
  })
}

function makeOmit({ curryN, pickBy, includes }) {
  return curryN(ARITY$b, function omit(kk, xx) {
    return pickBy((v, k) => !includes(k, kk), xx)
  })
}
const ARITY$b = 2;

function makePick({ pickBy, includes, curryN }) {
  return curryN(ARITY$c, function pick(kk, xx) {
    return pickBy((v, k) => includes(k, kk), xx)
  })
}
const ARITY$c = 2;

function makeProps({ pipe, ap, prop, box, map, curryN }) {
  return curryN(ARITY$d, function props(toGrab, xx) {
    return pipe(box, ap(map(prop, toGrab)))(xx)
  })
}
const ARITY$d = 2;

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

function makeSmooth({ filter }) {
  return function smooth(x) {
    return filter(Boolean, x)
  }
}

const derivedFunctionsSortedByIncreasingDependencies = {
  orDefault: makeOrDefault,
  smooth: makeSmooth,
  j2: makeJ2, // toJSON
  addIndex: makeAddIndex, // curryN
  pick: makePick, // pickBy includes
  bind: makeBind, // curryN
  flip: makeFlip, // curryN
  liftN: makeLiftN, // curryN reduce ap map
  lift: makeLift, // lift
  thunkify: makeThunkify, // curryN
  groupBy: makeGroupBy, // curryN objOf mash reduce
  isEmpty: makeIsEmpty, // equals empty
  __ifElse: makeIfElseDerivatives, // ifElse identity
  flatten: makeFlatten, // isArray forEach any
  chain: makeChain, // curryN map reduce concat
  reject: makeReject, // curryN complement filter
  omit: makeOmit, // complement pickBy includes
  uniq: makeUniq, // curryN reduce
  intersection: makeIntersection, // curryN uniq concat
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
  pluck: makePluck, // curryN prop map
  applySpecN: makeApplySpecN
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

function tryCatch(tryer, catcher) {
  return function safetyCatch() {
    try {
      return tryer.apply(null, arguments)
    } catch (e) {
      return catcher(e)
    }
  }
}
const FUNCTION = tryCatch;

function applyTo(xx, fn) {
  return fn(xx)
}

const FUNCTION$1 = applyTo;

function endsWith(needle, haystack) {
  if (haystack && isFunction(haystack.endsWith)) {
    return haystack.endsWith(needle)
  }
  return haystack[haystack.length - 1] === needle
}
const FUNCTION$2 = endsWith;

function findIndex(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  while (idx < loop.length) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return idx
    }
    idx += 1;
  }
  return -1
}

const FUNCTION$3 = findIndex;

function findLastIndex(fn, xx) {
  const loop = makeIterable(xx);
  let idx = loop.length;
  while (idx > -1) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return idx
    }
    idx -= 1;
  }
  return -1
}
const FUNCTION$4 = findLastIndex;

function hasIn(pp, xx) {
  return pp in xx
}
const FUNCTION$5 = hasIn;

function has(pp, xx) {
  return xx && typeof xx[pp] !== "undefined"
}
const FUNCTION$6 = has;

function identical(aa, bb) {
  return Object.is(aa, bb)
}
const FUNCTION$7 = identical;

function indexOf(needle, haystack) {
  return haystack.indexOf(needle)
}
const FUNCTION$8 = indexOf;

function lastIndexOf(needle, haystack) {
  return haystack.lastIndexOf(needle)
}
const FUNCTION$9 = lastIndexOf;

function match(rx, str) {
  return str.match(rx)
}
const FUNCTION$a = match;

function none(fn, xx) {
  let idx = 0;
  const loop = makeIterable(xx);
  let promised = true;
  while (idx < loop.length && promised) {
    const { value } = loop.iterate(idx);
    const bad = fn(value);
    if (!bad) promised = false;
    idx += 1;
  }
  return promised
}
const FUNCTION$b = none;

function pickBy(fn, xx) {
  const loop = makeIterable(xx);
  const out = loop.init;
  let idx = 0;
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx);
    const matched = fn(value, key);
    if (matched) out[key] = value;
    idx += 1;
  }
  return out
}
const FUNCTION$c = pickBy;

function startsWith(needle, haystack) {
  if (haystack && isFunction(haystack.startsWith)) {
    return haystack.startsWith(needle)
  }
  return haystack[0] === needle
}
const FUNCTION$d = startsWith;

function add(b, a) {
  return a + b
}

const FUNCTION$e = add;

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

const FUNCTION$f = find;

function findLast(fn, xx) {
  const loop = makeIterable(xx);
  let idx = loop.length - 1;
  while (idx > -1) {
    const { value } = loop.iterate(idx);
    if (fn(value)) {
      return value
    }
    idx -= 1;
  }
}

const FUNCTION$g = findLast;

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$h = apply;

function and(a, b) {
  return a && b
}
const FUNCTION$i = and;

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

const FUNCTION$j = any;

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
const FUNCTION$k = all;

function ap(aa, bb) {
  // S combinator
  if (isFunction(aa) && isFunction(bb)) {
    return function sCombinator(x) {
      return aa(x, bb(x))
    }
  }
  if (!isArray(aa) || !isArray(bb))
    throw new TypeError(
      "Expected to receive an array of functions and an array of values."
    )
  if (!aa.length || aa.filter(isFunction).length !== aa.length)
    throw new TypeError("Expected to receive an array of functions to apply.")
  return aa.reduce(function apReduce(out, fn) {
    return out.concat(bb.map(x => fn(x)))
  }, [])
}

const FUNCTION$l = ap;

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$m = concat;

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

const FUNCTION$n = cond;

function divide(b, a) {
  return a / b
}
const FUNCTION$o = divide;

function equals(a, b) {
  if (a && isFunction(a.equals)) return a.equals(b)
  return a === b
}
const FUNCTION$p = equals;

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

const FUNCTION$q = filter;

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

const FUNCTION$r = forEach;

function includes(b, a) {
  if (a && isFunction(a.includes)) return a.includes(b)
  if (a && isFunction(a.indexOf)) return a.indexOf(b) > -1
  return false
}
const FUNCTION$s = includes;

function gt(b, a) {
  return a > b
}
const FUNCTION$t = gt;

function gte(b, a) {
  return a >= b
}
const FUNCTION$u = gte;

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$v = join;

function lt(b, a) {
  return a < b
}
const FUNCTION$w = lt;

function lte(b, a) {
  return a <= b
}
const FUNCTION$x = lte;

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
const FUNCTION$y = map;

function max(aa, bb) {
  return Math.max(aa, bb)
}
const FUNCTION$z = max;

function min(aa, bb) {
  return Math.min(aa, bb)
}
const FUNCTION$A = min;

function multiply(b, a) {
  return a * b
}
const FUNCTION$B = multiply;

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$C = nth;

function or(a, b) {
  return a || b
}

const FUNCTION$D = or;

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$E = range;

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$F = split;

function sort(fn, rr) {
  const copy = [].concat(rr);
  copy.sort(fn);
  return copy
}

const FUNCTION$G = sort;

function subtract(b, a) {
  return a - b
}

const FUNCTION$H = subtract;

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$I = toJSON;

function extendBinary(F) {
  const BINARY = {
    add: FUNCTION$e,
    all: FUNCTION$k,
    and: FUNCTION$i,
    any: FUNCTION$j,
    ap: FUNCTION$l,
    apply: FUNCTION$h,
    applyTo: FUNCTION$1,
    concat: FUNCTION$m,
    cond: FUNCTION$n,
    divide: FUNCTION$o,
    endsWith: FUNCTION$2,
    equals: FUNCTION$p,
    filter: FUNCTION$q,
    find: FUNCTION$f,
    findLast: FUNCTION$g,
    findIndex: FUNCTION$3,
    findLastIndex: FUNCTION$4,
    forEach: FUNCTION$r,
    gt: FUNCTION$t,
    gte: FUNCTION$u,
    hasIn: FUNCTION$5,
    has: FUNCTION$6,
    identical: FUNCTION$7,
    includes: FUNCTION$s,
    indexOf: FUNCTION$8,
    join: FUNCTION$v,
    lastIndexOf: FUNCTION$9,
    lt: FUNCTION$w,
    lte: FUNCTION$x,
    map: FUNCTION$y,
    match: FUNCTION$a,
    max: FUNCTION$z,
    min: FUNCTION$A,
    multiply: FUNCTION$B,
    none: FUNCTION$b,
    nth: FUNCTION$C,
    or: FUNCTION$D,
    pickBy: FUNCTION$c,
    range: FUNCTION$E,
    sort: FUNCTION$G,
    split: FUNCTION$F,
    startsWith: FUNCTION$d,
    subtract: FUNCTION$H,
    toJSON: FUNCTION$I,
    tryCatch: FUNCTION
  };
  return F.weld(F, BINARY)
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
const FUNCTION$J = both;

function replace(rx, rep, str) {
  return str.replace(rx, rep)
}
const FUNCTION$K = replace;

function innerJoin(pred, xs, ys) {
  const loopX = makeIterable(xs);
  const out = [];
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
const FUNCTION$L = innerJoin;

function insert(ind, ins, what) {
  const copy = [].concat(what);
  copy.splice(ind, 0, ins);
  return copy
}
const FUNCTION$M = insert;

function insertAll(ind, ins, what) {
  return [].concat(
    // one
    what.slice(0, ind),
    // two
    ins,
    // three
    what.slice(ind, Infinity)
  )
}
const FUNCTION$N = insertAll;

function eqBy(fn, a, b) {
  return Boolean(fn(a, b))
}
const FUNCTION$O = eqBy;

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$P = either;

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

const FUNCTION$Q = reduce;

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$R = slice;

function extendTernary(F) {
  return F.weld(F, {
    both: FUNCTION$J,
    either: FUNCTION$P,
    eqBy: FUNCTION$O,
    innerJoin: FUNCTION$L,
    insert: FUNCTION$M,
    insertAll: FUNCTION$N,
    reduce: FUNCTION$Q,
    replace: FUNCTION$K,
    slice: FUNCTION$R
  })
}

function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

const FUNCTION$S = ifElse;

function extendQuaternary(F) {
  return F.weld(F, {
    ifElse: FUNCTION$S
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
        isUnmatched,
        isNil,
        cleanErrorStackFor
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
var production = FUTILITY.weld(FUTILITY, {
  version: "4.0.0",
  configuration: CONFIG.UNCHECKED
});

export default production;
