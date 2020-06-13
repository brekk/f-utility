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

const { UNION_TYPE_DELIMITER: U, __of__: __of__$1 } = C;
function unionArchetype(recurse) {
  return function arch(tt) {
    if (tt && tt.indexOf && tt.indexOf(U) > -1 && recurse) {
      return tt.split(U).map(z => unionArchetype(false)(z))
    }
    const match = ARCHETYPES[tt];
    if (match) return match
    if (tt[0].toUpperCase() === tt[0]) return `${tt}${__of__$1}object`
    return tt
  }
}
const archetype = unionArchetype(true);

function mash(a, b) {
  return Object.assign({}, a, b)
}
const FUNCTION = mash;

function symbolToString(s) {
  return "" + s.toString()
}

function defaultMemoizer(raw) {
  let [x, y] = raw;
  return x
    .concat(y)
    .map(z => (typeof z === "symbol" ? symbolToString(z) : z))
    .join("-")
}

const memo = memoizeWith(function basicMemo(x) {
  return x
});
const union = memo(function unionType(x) {
  return x.split("|")
});

const { __of__: __of__$2 } = C;
const memo$1 = memoizeWith(x => x);

const constructor = memo$1(x => {
  const oof = x.indexOf(__of__$2);
  return oof > -1 ? x.slice(0, oof) : x
});

const { __of__: __of__$3 } = C;
const memo$2 = memoizeWith(x => x);

const typeChild = memo$2(x => {
  const oof = x.indexOf(__of__$3);
  return oof > -1 ? x.slice(oof + 1) : x
});

const memo$3 = memoizeWith(x => x);
const compareTypes = memo$3(function _compareTypes(exp, given) {
  const [expectedUnion, givenUnion] = [exp, given].map(union);
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
  const unionComparisons = comparisons.reduce(
    (all, nextCase) => all.concat(nextCase.filter(z => !z).length === 0),
    []
  );
  return unionComparisons.filter(z => !z).length === 0
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

const { UNMATCHED } = C;
function isUnmatched(z) {
  return z === UNMATCHED
}

const { __of__: __of__$4 } = C;
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
  return `${constructor}${__of__$4}${type}`
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
      return compareTypes(expected, actual)
    }
  }
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
    some: F.any
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

function box(bx) {
  return [bx]
}
const FUNCTION$1 = box;

function call(args) {
  return args[0].apply(null, args.slice(1))
}
const FUNCTION$2 = call;

function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
const FUNCTION$3 = complement;

function constant(k) {
  return function forever() {
    return k
  }
}
const FUNCTION$4 = constant;

function F() {
  return true
}
const FUNCTION$5 = F;

function first(x) {
  return x[0]
}
const FUNCTION$6 = first;

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}
const FUNCTION$7 = fromPairs;

function identity(y) {
  return y
}
const FUNCTION$8 = identity;

function jam(a, b) {
  return Object.assign({}, b, a)
}
const FUNCTION$9 = jam;

function last(x) {
  return x[x.length - 1]
}
const FUNCTION$a = last;

function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}
const FUNCTION$b = length;

function not(yy) {
  return !yy
}
const FUNCTION$c = not;

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
const FUNCTION$d = pipe;

function smash(args) {
  const rawArgs = Array.from(arguments);
  if (!Array.isArray(args) && rawArgs.length) {
    args = rawArgs;
  }
  return args.reduce((agg, xx) => Object.assign({}, agg, xx))
}
const FUNCTION$e = smash;

function smooth(x) {
  return x.filter(Boolean)
}
const FUNCTION$f = smooth;

function T() {
  return true
}
const FUNCTION$g = T;

function temper(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}
const FUNCTION$h = temper;

function toLower(z) {
  return z.toLowerCase()
}
const FUNCTION$i = toLower;

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
const FUNCTION$j = toPairs;

function toUpper(z) {
  return z.toUpperCase()
}
const FUNCTION$k = toUpper;

const CORE = FUNCTION$h(NATIVE, {
  F: FUNCTION$5,
  T: FUNCTION$g,
  box: FUNCTION$1,
  call: FUNCTION$2,
  complement: FUNCTION$3,
  constant: FUNCTION$4,
  first: FUNCTION$6,
  fromPairs: FUNCTION$7,
  identity: FUNCTION$8,
  jam: FUNCTION$9,
  last: FUNCTION$a,
  length: FUNCTION$b,
  smash: FUNCTION$e,
  mash: FUNCTION,
  not: FUNCTION$c,
  pipe: FUNCTION$d,
  smooth: FUNCTION$f,
  temper: FUNCTION$h,
  toLower: FUNCTION$i,
  toPairs: FUNCTION$j,
  toUpper: FUNCTION$k
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

function makeChain({ curryN, map, pipe, reduce, concat }) {
  // chain maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries.
  return curryN(ARITY, function chain(fn, xx) {
    // Dispatches to the chain method of the second argument, if present, according to the FantasyLand Chain spec.
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    // If second argument is a function, chain(f, g)(x) is equivalent to f(g(x), x).
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    // (skipping this for now) Acts as a transducer if a transformer is given in list position.
    return pipe(
      map(fn),
      reduce(concat, [])
    )(xx)
  })
}
const ARITY = 2;

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
      return pipe(
        map(flip(pred)(xx)),
        smooth,
        length,
        gt(0)
      )(preds)
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
  return curryN(ARITY$1, function difference(aa, bb) {
    return filter(complement(includes(bb)), aa)
  })
}
const ARITY$1 = 2;

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
  return curryN(ARITY$2, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}
const ARITY$2 = 3;

function makePathOrDerivatives({ equals, is, curryN, pipe, pathOr }) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    return {
      accIs: curryN(3, function pathIsOfConstructor(J, ks, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          is(J)
        )(src)
      }),
      unsafe: acc(null),
      eq: curryN(3, function equivalence(ks, ex, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          equals(ex)
        )(src)
      }),
      satisfies: curryN(3, function satisfaction(fn, ks, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          fn,
          Boolean
        )(src)
      })
    }
  }
  const {
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr);
  const propOr = curryN(3, function _propOr(dd, key, source) {
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
  return curryN(ARITY$3, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}
const ARITY$3 = 2;

function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY$4, function symmetricDifference(aa, bb) {
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
const ARITY$4 = 2;

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$5, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const ARITY$5 = 2;

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}

function makeWhen({ ifElse, identity, $ }) {
  return ifElse($, $, identity)
}

const derivedFunctionsSortedByIncreasingDependencies = {
  j2: makeJ2, // toJSON
  addIndex: makeAddIndex, // curryN
  bind: makeBind, // curryN
  flip: makeFlip, // curryN
  when: makeWhen, // ifElse identity
  flatten: makeFlatten, // isArray forEach any
  chain: makeChain, // curryN map reduce concat
  reject: makeReject, // curryN complement filter
  uniq: makeUniq, // curryN reduce
  isObject: makeIsObject, // curryN both isRawObject
  union: makeUnion, // curryN filter includes
  difference: makeDifference, // curryN complement filter includes
  symmetricDifference: makeSymmetricDifference, // curryN difference
  __predicatesPass: makePredicatesPass, // curryN all, any flip gt length map smooth pipe
  pathOr: makePathOr, // curryN reduce
  __derived: makePathOrDerivatives // curryN equals is pathOr pipe
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

function add(b, a) {
  return a + b
}

const FUNCTION$l = add;

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$m = apply;

function and(a, b) {
  return a && b
}
const FUNCTION$n = and;

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

const FUNCTION$o = any;

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
const FUNCTION$p = all;

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

const FUNCTION$q = ap;

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$r = concat;

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

const FUNCTION$s = cond;

function divide(b, a) {
  return a / b
}
const FUNCTION$t = divide;

function equals(a, b) {
  return a === b
}
const FUNCTION$u = equals;

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

const FUNCTION$v = filter;

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

const FUNCTION$w = forEach;

function includes(a, b) {
  return a.includes(b)
}
const FUNCTION$x = includes;

function greaterThan(b, a) {
  return a > b
}
const FUNCTION$y = greaterThan;

function greaterThanOrEqualTo(b, a) {
  return a >= b
}
const FUNCTION$z = greaterThanOrEqualTo;

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$A = join;

function lessThan(b, a) {
  return a < b
}

const FUNCTION$B = lessThan;

function lessThanOrEqualTo(b, a) {
  return a <= b
}
const FUNCTION$C = lessThanOrEqualTo;

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
const FUNCTION$D = map;

function multiply(b, a) {
  return a * b
}
const FUNCTION$E = multiply;

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$F = nth;

function or(a, b) {
  return a || b
}

const FUNCTION$G = or;

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$H = range;

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$I = split;

function sort(fn, rr) {
  return [].concat(rr).sort(fn)
}

const FUNCTION$J = sort;

function subtract(b, a) {
  return a - b
}

const FUNCTION$K = subtract;

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$L = toJSON;

function extendBinary(F) {
  const BINARY = {
    // infix
    gt: FUNCTION$y,
    gte: FUNCTION$z,
    lt: FUNCTION$B,
    lte: FUNCTION$C,
    and: FUNCTION$n,
    equals: FUNCTION$u,
    or: FUNCTION$G,
    // math
    subtract: FUNCTION$K,
    add: FUNCTION$l,
    divide: FUNCTION$t,
    multiply: FUNCTION$E,
    // predicate
    all: FUNCTION$p,
    any: FUNCTION$o,
    filter: FUNCTION$v,
    forEach: FUNCTION$w,
    includes: FUNCTION$x,
    // folds
    apply: FUNCTION$m,
    ap: FUNCTION$q,
    concat: FUNCTION$r,
    map: FUNCTION$D,
    join: FUNCTION$A,
    cond: FUNCTION$s,
    // accessor
    nth: FUNCTION$F,
    // generator
    range: FUNCTION$H,
    // conversion
    sort: FUNCTION$J,
    split: FUNCTION$I,
    toJSON: FUNCTION$L
  };
  return F.temper(F, BINARY)
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
const FUNCTION$M = both;

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$N = either;

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

const FUNCTION$O = reduce;

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$P = slice;

function extendTernary(F) {
  const ternaryExtension = {
    // logic
    both: FUNCTION$M,
    either: FUNCTION$N,
    // folds
    reduce: FUNCTION$O,
    // alteration
    slice: FUNCTION$P
  };
  return F.temper(F, ternaryExtension)
}

function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

const FUNCTION$Q = ifElse;

function extendQuaternary(F) {
  const quaternaryExtension = {
    ifElse: FUNCTION$Q
  };
  return F.temper(F, quaternaryExtension)
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

function custom(config) {
  return CORE.pipe(fabricate, function basicDefinitions({
    def,
    curry,
    curryN
  }) {
    const sideEffectMethods = makeSideEffectsFromEnv(curry);
    const autoCurry = autoCurryUsing(curryN);
    const BASE = CORE.smash(autoCurry(CORE), sideEffectMethods, {
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
    });
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
const DEFAULT_CONFIG = {
  ts: system,
  check: process.env.NODE_ENV !== "production"
};
const FUTILITY = custom(DEFAULT_CONFIG);
var fUtility = FUTILITY.temper(FUTILITY, { custom, version: "4.0.0" });

export default fUtility;
