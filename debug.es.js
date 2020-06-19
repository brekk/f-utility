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
    some: F.any,
    sortBy: F.sort,
    tap: F.sideEffect,
    head: F.first
  })
}

function compose() {
  return pipe.apply(null, Array.from(arguments).reverse())
}

const FUNCTION$3 = compose;
const SIGNATURE$3 = ["any", "any"];

function drop(xx, src) {
  if (src && isFunction(src.drop)) {
    return src.drop(xx)
  }
  return src.slice(xx, Infinity)
}
const FUNCTION$4 = drop;
const SIGNATURE$4 = ["number", "Array", "Array"];

function dropLast(xx, src) {
  if (src && isFunction(src.dropLast)) {
    return src.dropLast(xx)
  }
  return src.slice(0, src.length - xx)
}
const FUNCTION$5 = dropLast;
const SIGNATURE$5 = ["number", "Array", "Array"];

const EMPTY_LOOKUPS = Object.freeze({
  "String∋string": "",
  "Array∋array": [],
  "Object∋object": {}
});
function empty(xx) {
  if (xx && isFunction(xx.empty)) return xx.empty()
  return EMPTY_LOOKUPS[system(xx)]
}
const FUNCTION$6 = empty;
const SIGNATURE$6 = ["any", "any"];

function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}
const FUNCTION$7 = length;
const SIGNATURE$7 = ["any", "number|nil"];

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
const FUNCTION$8 = findLast;
const SIGNATURE$8 = ["function", "object", "any"];

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
const FUNCTION$9 = findLastIndex;
const SIGNATURE$9 = ["function", "object", "any"];

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
const FUNCTION$a = findIndex;
const SIGNATURE$a = ["function", "object", "any"];

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
const FUNCTION$b = invert;
const SIGNATURE$b = ["object", "object"];

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
const FUNCTION$c = invertObj;
const SIGNATURE$c = ["object", "object"];

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
const FUNCTION$d = juxt;
const SIGNATURE$d = ["Array", "function"];

function keysIn(xx) {
  const out = [];
  for (let key in xx) {
    out.push(key);
  }
  return out
}
const FUNCTION$e = keysIn;
const SIGNATURE$e = ["object", "Array"];

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
const FUNCTION$f = move;
const SIGNATURE$f = ["number", "number", "Array", "Array"];

function negate(xx) {
  return -xx
}
const FUNCTION$g = negate;
const SIGNATURE$g = ["number", "number"];

function nthArg(nn) {
  return function grabNth() {
    return arguments[nn]
  }
}
const FUNCTION$h = nthArg;
const SIGNATURE$h = ["number", "function"];

function objOf(xx, whatever) {
  return { [xx]: whatever }
}
const FUNCTION$i = objOf;
const SIGNATURE$i = ["string|symbol", "any", "object"];

function once(fn) {
  let saved;
  return function oneTime() {
    {
      saved = fn.apply(null, arguments);
      return saved
    }
  }
}
const FUNCTION$j = once;
const SIGNATURE$j = ["function", "function"];

function pair(aa, zz) {
  return [aa, zz]
}
const FUNCTION$k = pair;
const SIGNATURE$k = ["any", "any", "Array"];

function partial(fn, args1) {
  return function partiallyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2))
  }
}
const FUNCTION$l = partial;
const SIGNATURE$l = ["any", "any", "Array"];

function partialRight(fn, args1) {
  return function partialRightlyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2).reverse())
  }
}
const FUNCTION$m = partialRight;
const SIGNATURE$m = ["any", "any", "Array"];

function repeat(nn, xx) {
  return xx.repeat(nn)
}
const FUNCTION$n = repeat;
const SIGNATURE$n = ["number", "Object|string", "Object|string"];

function splitAt(idx, xx) {
  return [xx.slice(0, idx), xx.slice(idx + 1, Infinity)]
}
const FUNCTION$o = splitAt;
const SIGNATURE$o = ["number", "Array|string", "Array|string"];

function sum(arr) {
  return arr.reduce(function adding(count, x) {
    return count + x
  }, 0)
}
const FUNCTION$p = sum;
const SIGNATURE$p = ["Array", "number"];

function take(nn, xx) {
  if (xx && isFunction(xx.take)) return xx.take(nn)
  return xx.slice(0, nn)
}
const FUNCTION$q = take;
const SIGNATURE$q = ["number", "Array|string", "Array|string"];

function takeLast(nn, xx) {
  if (xx && isFunction(xx.takeLast)) return xx.takeLast(nn)
  return xx.slice(xx.length - nn, Infinity)
}
const FUNCTION$r = takeLast;
const SIGNATURE$r = ["number", "Array|string", "Array|string"];

function test(rg, str) {
  return str.test(rg)
}
const FUNCTION$s = test;
const SIGNATURE$s = ["RegExp", "string", "boolean"];

function box(bx) {
  return [bx]
}
const FUNCTION$t = box;
const SIGNATURE$t = ["any", "Array"];

function dissoc(key, xx) {
  const copy = Object.assign({}, xx);
  delete copy[key];
  return copy
}
const FUNCTION$u = dissoc;
const SIGNATURE$u = ["string|number", "object", "object"];

function assoc(key, toSet, xx) {
  return Object.assign({}, xx, { [key]: toSet })
}
const FUNCTION$v = assoc;
const SIGNATURE$v = ["any", "string|number", "object", "object"];

function init(xx) {
  return xx.slice(0, -1)
}
const FUNCTION$w = init;
const SIGNATURE$w = ["Array", "Array"];

function tail(xx) {
  return xx.slice(1)
}
const FUNCTION$x = tail;
const SIGNATURE$x = ["Array", "Array"];

function append(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(copy.length, 0, whatever);
  return copy
}

const FUNCTION$y = append;
const SIGNATURE$y = ["any", "Array", "Array"];

function prepend(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(0, 0, whatever);
  return copy
}

const FUNCTION$z = prepend;
const SIGNATURE$z = ["any", "Array", "Array"];

function adjust(idx, fn, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = fn(copy[relIdx]);
  return copy
}

const FUNCTION$A = adjust;
const SIGNATURE$A = ["number", "function", "Array", "Array"];

function update(idx, val, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = val;
  return copy
}

const FUNCTION$B = update;
const SIGNATURE$B = ["number", "any", "Array", "Array"];

function inc(xx) {
  return xx + 1
}
const FUNCTION$C = inc;
const SIGNATURE$C = ["number", "number"];

function dec(xx) {
  return xx - 1
}
const FUNCTION$D = dec;
const SIGNATURE$D = ["number", "number"];

function call(args) {
  return args[0].apply(null, args.slice(1))
}
const FUNCTION$E = call;
const SIGNATURE$E = ["Array", "any"];

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
const FUNCTION$F = mode;
const SIGNATURE$F = ["Array", "any"];

function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
const FUNCTION$G = complement;
const SIGNATURE$G = ["function", "function"];

function constant(k) {
  return function forever() {
    return k
  }
}
const FUNCTION$H = constant;
const SIGNATURE$H = ["any", "function"];

function F() {
  return true
}
const FUNCTION$I = F;
const SIGNATURE$I = ["boolean"];

function first(x) {
  return x[0]
}
const FUNCTION$J = first;
const SIGNATURE$J = ["Array", "any"];

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}
const FUNCTION$K = fromPairs;
const SIGNATURE$K = ["Array", "object"];

function identity(y) {
  return y
}
const FUNCTION$L = identity;
const SIGNATURE$L = ["any", "any"];

function jam(a, b) {
  return Object.assign({}, b, a)
}
const FUNCTION$M = jam;
const SIGNATURE$M = ["object", "object", "object"];

function last(x) {
  return x[x.length - 1]
}
const FUNCTION$N = last;
const SIGNATURE$N = ["Array", "any"];

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
const FUNCTION$O = not;
const SIGNATURE$O = ["any", "boolean"];

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
const FUNCTION$P = reverse;
const SIGNATURE$P = ["Array", "Array"];

function smash(args) {
  return args.reduce((agg, xx) => Object.assign({}, agg, xx), {})
}
const FUNCTION$Q = smash;
const SIGNATURE$Q = ["Array", "object"];

function smooth(x) {
  return x.filter(Boolean)
}
const FUNCTION$R = smooth;
const SIGNATURE$R = ["Array", "any"];

function T() {
  return true
}
const FUNCTION$S = T;
const SIGNATURE$S = ["boolean"];

function temper(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}
const FUNCTION$T = temper;
const SIGNATURE$T = ["object", "object", "object"];

function toLower(z) {
  return z.toLowerCase()
}
const FUNCTION$U = toLower;
const SIGNATURE$U = ["string", "string"];

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
const FUNCTION$V = toPairs;
const SIGNATURE$V = ["object", "Array"];

function toUpper(z) {
  return z.toUpperCase()
}
const FUNCTION$W = toUpper;
const SIGNATURE$W = ["string", "string"];

function mean(arr) {
  let idx = 0;
  let sum = 0;
  while (idx < arr.length) {
    sum += arr[idx];
    idx += 1;
  }
  return sum / arr.length
}
const FUNCTION$X = mean;
const SIGNATURE$X = ["Array", "number"];

const CORE_WITH_SIGNATURES = [
  [SIGNATURE$I, FUNCTION$I],
  [SIGNATURE$S, FUNCTION$S],
  [SIGNATURE$A, FUNCTION$A],
  [SIGNATURE$y, FUNCTION$y],
  [SIGNATURE$v, FUNCTION$v],
  [SIGNATURE$t, FUNCTION$t],
  [SIGNATURE$E, FUNCTION$E],
  [SIGNATURE$G, FUNCTION$G],
  [SIGNATURE$3, FUNCTION$3],
  [SIGNATURE$H, FUNCTION$H],
  [SIGNATURE$D, FUNCTION$D],
  [SIGNATURE$u, FUNCTION$u],
  [SIGNATURE$5, FUNCTION$5],
  [SIGNATURE$4, FUNCTION$4],
  [SIGNATURE$6, FUNCTION$6],
  [SIGNATURE$a, FUNCTION$a],
  [SIGNATURE$9, FUNCTION$9],
  [SIGNATURE$8, FUNCTION$8],
  [SIGNATURE$J, FUNCTION$J],
  [SIGNATURE$K, FUNCTION$K],
  [SIGNATURE$L, FUNCTION$L],
  [SIGNATURE$C, FUNCTION$C],
  [SIGNATURE$w, FUNCTION$w],
  [SIGNATURE$c, FUNCTION$c],
  [SIGNATURE$b, FUNCTION$b],
  [SIGNATURE$M, FUNCTION$M],
  [SIGNATURE$d, FUNCTION$d],
  [SIGNATURE$e, FUNCTION$e],
  [SIGNATURE$N, FUNCTION$N],
  [SIGNATURE$7, FUNCTION$7],
  [SIGNATURE, FUNCTION],
  [SIGNATURE$X, FUNCTION$X],
  [SIGNATURE$1, FUNCTION$1],
  [SIGNATURE$F, FUNCTION$F],
  [SIGNATURE$f, FUNCTION$f],
  [SIGNATURE$g, FUNCTION$g],
  [SIGNATURE$O, FUNCTION$O],
  [SIGNATURE$h, FUNCTION$h],
  [SIGNATURE$i, FUNCTION$i],
  [SIGNATURE$j, FUNCTION$j],
  [SIGNATURE$k, FUNCTION$k],
  [SIGNATURE$m, FUNCTION$m],
  [SIGNATURE$l, FUNCTION$l],
  [SIGNATURE$2, FUNCTION$2],
  [SIGNATURE$z, FUNCTION$z],
  [SIGNATURE$n, FUNCTION$n],
  [SIGNATURE$P, FUNCTION$P],
  [SIGNATURE$Q, FUNCTION$Q],
  [SIGNATURE$R, FUNCTION$R],
  [SIGNATURE$o, FUNCTION$o],
  [SIGNATURE$p, FUNCTION$p],
  [SIGNATURE$x, FUNCTION$x],
  [SIGNATURE$r, FUNCTION$r],
  [SIGNATURE$q, FUNCTION$q],
  [SIGNATURE$T, FUNCTION$T],
  [SIGNATURE$s, FUNCTION$s],
  [SIGNATURE$U, FUNCTION$U],
  [SIGNATURE$V, FUNCTION$V],
  [SIGNATURE$W, FUNCTION$W],
  [SIGNATURE$B, FUNCTION$B]
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

function makeEqProps({ pipe, map, prop, equals }) {
  return function eqProps(kk, aa, bb) {
    return pipe(map(prop(kk)), ([a2, b2]) => equals(a2, b2))([aa, bb])
  }
}
const GET_FUNCTION = makeEqProps;
const SIGNATURE$Y = ["string", "object", "object", "boolean"];

function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY, function groupBy(fn, xx) {
    return reduce(function groupingBy(agg, yy) {
      return mash(agg, objOf(fn(yy), yy)), {}
    })(xx)
  })
}
const GET_FUNCTION$1 = makeGroupBy;
const ARITY = 2;
const SIGNATURE$Z = ["function", "array", "object"];

function makeIntersection({ uniq, concat, curryN }) {
  return curryN(ARITY$1, function intersection(aa, bb) {
    return uniq(concat(aa, bb))
  })
}
const GET_FUNCTION$2 = makeIntersection;
const ARITY$1 = 2;
const SIGNATURE$_ = ["Array", "Array", "Array"];

function makeIsEmpty({ equals, empty }) {
  return function isEmpty(xx) {
    return equals(empty(xx), xx)
  }
}
const GET_FUNCTION$3 = makeIsEmpty;
const SIGNATURE$$ = ["any", "boolean"];

function makeLift({ liftN }) {
  return function lift(fn) {
    return fn.length > 1 ? fn : liftN(fn.length, fn)
  }
}
const GET_FUNCTION$4 = makeLift;
const SIGNATURE$10 = ["number", "function", "function"];

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
const GET_FUNCTION$5 = makeLiftN;
const SIGNATURE$11 = ["number", "function", "function"];

function makeOmit({ complement, pickBy, includes }) {
  return function omit(kk, xx) {
    return pickBy(complement(includes)(kk), xx)
  }
}
const GET_FUNCTION$6 = makeOmit;
const SIGNATURE$12 = ["Array", "object", "object"];

function makePick({ pickBy, includes }) {
  return function pick(kk, xx) {
    return pickBy(includes(kk), xx)
  }
}
const GET_FUNCTION$7 = makePick;
const SIGNATURE$13 = ["Array", "object", "object"];

function makeProps({ pipe, ap, prop, box, map, curryN }) {
  return curryN(ARITY$2, function props(toGrab, xx) {
    return pipe(box, ap(map(prop, toGrab)))(xx)
  })
}
const GET_FUNCTION$8 = makeProps;
const ARITY$2 = 2;
const SIGNATURE$14 = ["Array", "object", "Array"];

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
const GET_FUNCTION$9 = makeThunkify;
const SIGNATURE$15 = ["function", "function"];

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

const GET_FUNCTION$a = makeAddIndex;
const SIGNATURE$16 = ["function", "function"];

function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY$3, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}
const GET_FUNCTION$b = makeChain;
const ARITY$3 = 2;
const SIGNATURE$17 = ["function", "function|Array|object", "function|Array"];

function makePluck({ curryN, map, prop }) {
  return curryN(ARITY$4, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
const GET_FUNCTION$c = makePluck;
const ARITY$4 = 2;
const SIGNATURE$18 = ["string", "Array|object", "Array|object"];

function makeMedian({ $, dec, pipe, length, nth, sort, divide }) {
  return pipe(
    sort((a, b) => a - b),
    xx => pipe(length, dec, divide(2), Math.round, nth($, xx))(xx)
  )
}
const GET_FUNCTION$d = makeMedian;
const SIGNATURE$19 = ["Array", "number"];

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
const GET_FUNCTION$e = makeFlatten;
const SIGNATURE$1a = ["Array", "Array"];

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
const GET_FUNCTION$f = makeBind;
const SIGNATURE$1b = ["function", "object", "function"];

function makeDifference({ curryN, filter, includes, complement }) {
  return curryN(ARITY$5, function difference(aa, bb) {
    return filter(complement(includes(bb)), aa)
  })
}
const GET_FUNCTION$g = makeDifference;
const ARITY$5 = 2;
const SIGNATURE$1c = ["Array", "Array", "Array"];

function makeFlip({ curryN }) {
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}
const GET_FUNCTION$h = makeFlip;
const SIGNATURE$1d = ["function", "function"];

function makeIsObject({ both, isRawObject }) {
  return function isObject(x) {
    return both(isRawObject, Boolean)(x)
  }
}
const GET_FUNCTION$i = makeIsObject;
const SIGNATURE$1e = ["any", "boolean"];

function makeJ2({ toJSON }) {
  return toJSON(2)
}
const GET_FUNCTION$j = makeJ2;
const SIGNATURE$1f = ["any", "string"];

function makePathOr({ curryN, reduce }) {
  return curryN(ARITY$6, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}
const GET_FUNCTION$k = makePathOr;
const ARITY$6 = 3;
const SIGNATURE$1g = ["any", "Array", "Array|object", "any"];

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
  return curryN(ARITY$7, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}
const GET_FUNCTION$l = makeReject;
const ARITY$7 = 2;
const SIGNATURE$1h = ["function", "object", "object"];

function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY$8, function symmetricDifference(aa, bb) {
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
const GET_FUNCTION$m = makeSymmetricDifference;
const ARITY$8 = 2;
const SIGNATURE$1i = ["Array", "Array", "Array"];

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$9, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const GET_FUNCTION$n = makeUnion;
const ARITY$9 = 2;
const SIGNATURE$1j = ["Array", "Array", "Array"];

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}
const GET_FUNCTION$o = makeUniq;
const SIGNATURE$1k = ["Array", "Array"];

function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}
const GET_FUNCTION$p = makeIfElseDerivatives;

const derivedFunctionsSortedByIncreasingDependencies = [
  ["j2", GET_FUNCTION$j, SIGNATURE$1f], // toJSON
  ["addIndex", GET_FUNCTION$a, SIGNATURE$16], // curryN
  ["omit", GET_FUNCTION$6, SIGNATURE$12], // complement pickBy includes
  ["pick", GET_FUNCTION$7, SIGNATURE$13], // pickBy includes

  ["bind", GET_FUNCTION$f, SIGNATURE$1b], // curryN
  ["flip", GET_FUNCTION$h, SIGNATURE$1d], // curryN
  ["liftN", GET_FUNCTION$5, SIGNATURE$11], // curryN reduce ap map
  ["lift", GET_FUNCTION$4, SIGNATURE$10], // lift
  ["thunkify", GET_FUNCTION$9, SIGNATURE$15], // curryN
  ["groupBy", GET_FUNCTION$1, SIGNATURE$Z], // curryN objOf mash reduce
  ["intersection", GET_FUNCTION$2, SIGNATURE$_], // curryN uniq concat
  ["isEmpty", GET_FUNCTION$3, SIGNATURE$$], // equals empty

  ["__ifElse", GET_FUNCTION$p, false], // ifElse identity
  ["flatten", GET_FUNCTION$e, SIGNATURE$1a], // isArray forEach any
  ["chain", GET_FUNCTION$b, SIGNATURE$17], // curryN map reduce concat
  ["reject", GET_FUNCTION$l, SIGNATURE$1h], // curryN complement filter
  ["uniq", GET_FUNCTION$o, SIGNATURE$1k], // curryN reduce
  ["median", GET_FUNCTION$d, SIGNATURE$19], // $ pipe length nth sort divide
  ["isObject", GET_FUNCTION$i, SIGNATURE$1e], // curryN both isRawObject
  ["union", GET_FUNCTION$n, SIGNATURE$1j], // curryN filter includes
  ["difference", GET_FUNCTION$g, SIGNATURE$1c], // curryN complement filter includes
  ["symmetricDifference", GET_FUNCTION$m, SIGNATURE$1i], // curryN difference
  ["__predicatesPass", makePredicatesPass, false], // curryN all, any flip gt length map smooth pipe
  ["pathOr", GET_FUNCTION$k, SIGNATURE$1g], // curryN reduce
  ["__pathOrDerivatives", makePathOrDerivatives, false], // curryN equals is pathOr pipe
  ["props", GET_FUNCTION$8, SIGNATURE$14],
  ["eqProps", GET_FUNCTION, SIGNATURE$Y],
  ["pluck", GET_FUNCTION$c, SIGNATURE$18]
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

function applyTo(xx, fn) {
  return fn(xx)
}

const FUNCTION$Y = applyTo;
const SIGNATURE$1l = ["any", "function", "any"];

function endsWith(needle, haystack) {
  if (haystack && isFunction(haystack.endsWith)) {
    return haystack.endsWith(needle)
  }
  return haystack[haystack.length - 1] === needle
}
const FUNCTION$Z = endsWith;
const SIGNATURE$1m = ["Array|string", "Array|string", "boolean"];

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

const FUNCTION$_ = findIndex$1;
const SIGNATURE$1n = ["function", "object", "any"];

function hasIn(pp, xx) {
  return xx in pp
}
const FUNCTION$$ = hasIn;
const SIGNATURE$1o = ["string", "object", "boolean"];

function identical(aa, bb) {
  return Object.is(aa, bb)
}
const FUNCTION$10 = identical;
const SIGNATURE$1p = ["any", "any", "boolean"];

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
const FUNCTION$11 = indexOf;
const SIGNATURE$1q = ["any", "string|object", "number"];

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
const FUNCTION$12 = lastIndexOf;
const SIGNATURE$1r = ["any", "string|object", "number"];

function match(rx, str) {
  return str.match(rx)
}
const FUNCTION$13 = match;
const SIGNATURE$1s = ["RegExp", "string", "boolean"];

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
const FUNCTION$14 = none;
const SIGNATURE$1t = ["function", "Array|object", "boolean"];

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
const FUNCTION$15 = pickBy;
const SIGNATURE$1u = ["function", "object", "object"];

function startsWith(needle, haystack) {
  if (haystack && isFunction(haystack.startsWith)) {
    return haystack.startsWith(needle)
  }
  return haystack[0] === needle
}
const FUNCTION$16 = startsWith;
const SIGNATURE$1v = ["Array|string", "Array|string", "boolean"];

function add(b, a) {
  return a + b
}

const FUNCTION$17 = add;
const SIGNATURE$1w = ["number", "number", "number"];

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

const FUNCTION$18 = find;
const SIGNATURE$1x = ["function", "object", "any"];

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$19 = apply;
const SIGNATURE$1y = ["function", "Array", "any"];

function and(a, b) {
  return a && b
}
const FUNCTION$1a = and;
const SIGNATURE$1z = ["any", "any", "boolean"];

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

const FUNCTION$1b = any;
const SIGNATURE$1A = ["function", "object", "boolean"];

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
const FUNCTION$1c = all;
const SIGNATURE$1B = ["function", "Array|object", "boolean"];

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

const FUNCTION$1d = ap;
const SIGNATURE$1C = ["function|Array", "function|Array", "function|Array"];

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$1e = concat;
const SIGNATURE$1D = ["any", "any", "Array|String"];

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

const FUNCTION$1f = cond;
const SIGNATURE$1E = ["Array", "any", "any"];

function divide(b, a) {
  return a / b
}
const FUNCTION$1g = divide;
const SIGNATURE$1F = ["number", "number", "number"];

function equals(a, b) {
  return a === b
}
const FUNCTION$1h = equals;
const SIGNATURE$1G = ["any", "any", "boolean"];

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

const FUNCTION$1i = filter;
const SIGNATURE$1H = ["function", "object", "object"];

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

const FUNCTION$1j = forEach;
const SIGNATURE$1I = ["function", "object", "nil"];

function includes(a, b) {
  return a.includes(b)
}
const FUNCTION$1k = includes;
const SIGNATURE$1J = ["Array|string", "Array|string", "boolean"];

function gt(b, a) {
  return a > b
}
const FUNCTION$1l = gt;
const SIGNATURE$1K = ["number", "number", "boolean"];

function gte(b, a) {
  return a >= b
}
const FUNCTION$1m = gte;
const SIGNATURE$1L = ["number", "number", "boolean"];

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$1n = join;
const SIGNATURE$1M = ["string", "Array", "string"];

function lt(b, a) {
  return a < b
}
const FUNCTION$1o = lt;
const SIGNATURE$1N = ["number", "number", "boolean"];

function lte(b, a) {
  return a <= b
}
const FUNCTION$1p = lte;
const SIGNATURE$1O = ["number", "number", "boolean"];

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
const SIGNATURE$1P = ["function", "object", "object"];
const FUNCTION$1q = map;

function max(aa, bb) {
  return Math.max(aa, bb)
}
const FUNCTION$1r = max;
const SIGNATURE$1Q = ['number', 'number'];

function min(aa, bb) {
  return Math.min(aa, bb)
}
const FUNCTION$1s = min;
const SIGNATURE$1R = ["number", "number"];

function multiply(b, a) {
  return a * b
}
const FUNCTION$1t = multiply;
const SIGNATURE$1S = ["number", "number", "number"];

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$1u = nth;
const SIGNATURE$1T = ["number", "Array", "any"];

function or(a, b) {
  return a || b
}

const FUNCTION$1v = or;
const SIGNATURE$1U = ["any", "any", "boolean"];

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$1w = range;
const SIGNATURE$1V = ["number", "number", "Array"];

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$1x = split;
const SIGNATURE$1W = ["string", "string", "Array"];

function sort(fn, rr) {
  const copy = [].concat(rr);
  copy.sort(fn);
  return copy
}

const FUNCTION$1y = sort;
const SIGNATURE$1X = ["function", "Array", "Array"];

function subtract(b, a) {
  return a - b
}

const FUNCTION$1z = subtract;
const SIGNATURE$1Y = ["number", "number", "number"];

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$1A = toJSON;
const SIGNATURE$1Z = ["number", "any", "string"];

const BINARY_WITH_SIGNATURES = [
  [SIGNATURE$1w, FUNCTION$17],
  [SIGNATURE$1B, FUNCTION$1c],
  [SIGNATURE$1z, FUNCTION$1a],
  [SIGNATURE$1A, FUNCTION$1b],
  [SIGNATURE$1C, FUNCTION$1d],
  [SIGNATURE$1y, FUNCTION$19],
  [SIGNATURE$1l, FUNCTION$Y],
  [SIGNATURE$1D, FUNCTION$1e],
  [SIGNATURE$1E, FUNCTION$1f],
  [SIGNATURE$1F, FUNCTION$1g],
  [SIGNATURE$1m, FUNCTION$Z],
  [SIGNATURE$1G, FUNCTION$1h],
  [SIGNATURE$1H, FUNCTION$1i],
  [SIGNATURE$1x, FUNCTION$18],
  [SIGNATURE$1n, FUNCTION$_],
  [SIGNATURE$1I, FUNCTION$1j],
  [SIGNATURE$1K, FUNCTION$1l],
  [SIGNATURE$1L, FUNCTION$1m],
  [SIGNATURE$1o, FUNCTION$$],
  [SIGNATURE$1p, FUNCTION$10],
  [SIGNATURE$1J, FUNCTION$1k],
  [SIGNATURE$1q, FUNCTION$11],
  [SIGNATURE$1M, FUNCTION$1n],
  [SIGNATURE$1r, FUNCTION$12],
  [SIGNATURE$1N, FUNCTION$1o],
  [SIGNATURE$1O, FUNCTION$1p],
  [SIGNATURE$1P, FUNCTION$1q],
  [SIGNATURE$1s, FUNCTION$13],
  [SIGNATURE$1Q, FUNCTION$1r],
  [SIGNATURE$1R, FUNCTION$1s],
  [SIGNATURE$1S, FUNCTION$1t],
  [SIGNATURE$1t, FUNCTION$14],
  [SIGNATURE$1T, FUNCTION$1u],
  [SIGNATURE$1U, FUNCTION$1v],
  [SIGNATURE$1u, FUNCTION$15],
  [SIGNATURE$1V, FUNCTION$1w],
  [SIGNATURE$1X, FUNCTION$1y],
  [SIGNATURE$1W, FUNCTION$1x],
  [SIGNATURE$1v, FUNCTION$16],
  [SIGNATURE$1Y, FUNCTION$1z],
  [SIGNATURE$1Z, FUNCTION$1A]
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
const FUNCTION$1B = both;
const SIGNATURE$1_ = ["function", "function", "any", "boolean"];

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$1C = either;
const SIGNATURE$1$ = ["function", "function", "any"];

function eqBy(fn, a, b) {
  return Boolean(fn(a, b))
}
const FUNCTION$1D = eqBy;
const SIGNATURE$20 = ["function", "any", "any", "boolean"];

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
const FUNCTION$1E = innerJoin;
const SIGNATURE$21 = ["function", "Array", "Array", "Array"];

function replace(rx, rep, str) {
  return str.replace(rx, rep)
}
const FUNCTION$1F = replace;
const SIGNATURE$22 = ["RegExp|string", "string", "string", "string"];

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

const FUNCTION$1G = reduce;
const SIGNATURE$23 = ["function", "any", "object", "any"];

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$1H = slice;
const SIGNATURE$24 = ["number", "number", "object", "object"];

const TERNARY_WITH_SIGNATURES = [
  [SIGNATURE$1_, FUNCTION$1B],
  [SIGNATURE$1$, FUNCTION$1C],
  [SIGNATURE$20, FUNCTION$1D],
  [SIGNATURE$21, FUNCTION$1E],
  [SIGNATURE$23, FUNCTION$1G],
  [SIGNATURE$22, FUNCTION$1F],
  [SIGNATURE$24, FUNCTION$1H]
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

const FUNCTION$1I = ifElse;
const SIGNATURE$25 = ["function", "function", "function", "any", "any"];

const QUATERNARY_WITH_SIGNATURES = [[SIGNATURE$25, FUNCTION$1I]];

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
