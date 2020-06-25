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
const SIGNATURE$4 = ["number", "Array|object", "any"];

function dropLast(xx, src) {
  if (src && isFunction(src.dropLast)) {
    return src.dropLast(xx)
  }
  return src.slice(0, src.length - xx)
}
const FUNCTION$5 = dropLast;
const SIGNATURE$5 = ["number", "Array|object", "any"];

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
const FUNCTION$8 = invert;
const SIGNATURE$8 = ["object", "object"];

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
const FUNCTION$9 = invertObj;
const SIGNATURE$9 = ["object", "object"];

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
const FUNCTION$a = juxt;
const SIGNATURE$a = ["Array", "function"];

function keysIn(xx) {
  const out = [];
  for (let key in xx) {
    out.push(key);
  }
  return out
}
const FUNCTION$b = keysIn;
const SIGNATURE$b = ["object", "Array"];

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
const FUNCTION$c = move;
const SIGNATURE$c = ["number", "number", "Array", "Array"];

function negate(xx) {
  return -xx
}
const FUNCTION$d = negate;
const SIGNATURE$d = ["number", "number"];

function nthArg(nn) {
  return function grabNth() {
    return arguments[nn]
  }
}
const FUNCTION$e = nthArg;
const SIGNATURE$e = ["number", "function"];

function objOf(xx, whatever) {
  return { [xx]: whatever }
}
const FUNCTION$f = objOf;
const SIGNATURE$f = ["string|symbol|number", "any", "object"];

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
const FUNCTION$g = once;
const SIGNATURE$g = ["function", "function"];

function pair(aa, zz) {
  return [aa, zz]
}
const FUNCTION$h = pair;
const SIGNATURE$h = ["any", "any", "Array"];

function partial(fn, args1) {
  return function partiallyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2))
  }
}
const FUNCTION$i = partial;
const SIGNATURE$i = ["any", "any", "function"];

function partialRight(fn, args1) {
  return function partialRightlyApplied() {
    const args2 = Array.from(arguments);
    return fn.apply(null, args1.concat(args2).reverse())
  }
}
const FUNCTION$j = partialRight;
const SIGNATURE$j = ["any", "Array", "function"];

function repeat(nn, xx) {
  return xx.repeat(nn)
}
const FUNCTION$k = repeat;
const SIGNATURE$k = ["number", "Object|string", "Object|string"];

function splitAt(idx, xx) {
  return [xx.slice(0, idx), xx.slice(idx, Infinity)]
}
const FUNCTION$l = splitAt;
const SIGNATURE$l = ["number", "Array|string", "Array|string"];

function sum(arr) {
  return arr.reduce(function adding(count, x) {
    return count + x
  }, 0)
}
const FUNCTION$m = sum;
const SIGNATURE$m = ["Array", "number"];

function product(arr) {
  return arr.reduce(function multiplying(count, x) {
    return count * x
  }, 1)
}
const FUNCTION$n = product;
const SIGNATURE$n = ["Array", "number"];

function take(nn, xx) {
  if (xx && isFunction(xx.take)) return xx.take(nn)
  return xx.slice(0, nn)
}
const FUNCTION$o = take;
const SIGNATURE$o = ["number", "object|string", "object|string"];

function takeLast(nn, xx) {
  if (xx && isFunction(xx.takeLast)) return xx.takeLast(nn)
  return xx.slice(xx.length - nn, Infinity)
}
const FUNCTION$p = takeLast;
const SIGNATURE$p = ["number", "object|string", "object|string"];

function regexTest(rg, str) {
  return rg.test(str)
}
const FUNCTION$q = regexTest;
const SIGNATURE$q = ["RegExp", "string", "boolean"];

function box(bx) {
  return [bx]
}
const FUNCTION$r = box;
const SIGNATURE$r = ["any", "Array"];

function dissoc(key, xx) {
  const copy = Object.assign({}, xx);
  delete copy[key];
  return copy
}
const FUNCTION$s = dissoc;
const SIGNATURE$s = ["string|number", "object", "object"];

function assoc(key, toSet, xx) {
  return Object.assign({}, xx, { [key]: toSet })
}
const FUNCTION$t = assoc;
const SIGNATURE$t = ["any", "string|number", "object", "object"];

function init(xx) {
  return xx.slice(0, -1)
}
const FUNCTION$u = init;
const SIGNATURE$u = ["Array", "Array"];

function tail(xx) {
  return xx.slice(1)
}
const FUNCTION$v = tail;
const SIGNATURE$v = ["Array", "Array"];

function append(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(copy.length, 0, whatever);
  return copy
}

const FUNCTION$w = append;
const SIGNATURE$w = ["any", "Array", "Array"];

function prepend(whatever, xx) {
  const copy = [].concat(xx);
  copy.splice(0, 0, whatever);
  return copy
}

const FUNCTION$x = prepend;
const SIGNATURE$x = ["any", "Array", "Array"];

function adjust(idx, fn, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = fn(copy[relIdx]);
  return copy
}

const FUNCTION$y = adjust;
const SIGNATURE$y = ["number", "function", "Array", "Array"];

function update(idx, val, xx) {
  const copy = [].concat(xx);
  const relIdx = idx < 0 ? copy.length + idx : idx;
  copy[relIdx] = val;
  return copy
}

const FUNCTION$z = update;
const SIGNATURE$z = ["number", "any", "Array", "Array"];

function inc(xx) {
  return xx + 1
}
const FUNCTION$A = inc;
const SIGNATURE$A = ["number", "number"];

function dec(xx) {
  return xx - 1
}
const FUNCTION$B = dec;
const SIGNATURE$B = ["number", "number"];

function call(args) {
  return args[0].apply(null, args.slice(1))
}
const FUNCTION$C = call;
const SIGNATURE$C = ["Array", "any"];

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
const FUNCTION$D = mode;
const SIGNATURE$D = ["Array", "any"];

function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments);
    return !fn.apply(null, args)
  }
}
const FUNCTION$E = complement;
const SIGNATURE$E = ["function", "function"];

function constant(k) {
  return function forever() {
    return k
  }
}
const FUNCTION$F = constant;
const SIGNATURE$F = ["any", "function"];

function F() {
  return true
}
const FUNCTION$G = F;
const SIGNATURE$G = ["boolean"];

function first(x) {
  return x[0]
}
const FUNCTION$H = first;
const SIGNATURE$H = ["Array", "any"];

function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}
const FUNCTION$I = fromPairs;
const SIGNATURE$I = ["Array", "object"];

function identity(y) {
  return y
}
const FUNCTION$J = identity;
const SIGNATURE$J = ["any", "any"];

function jam(a, b) {
  return Object.assign({}, b, a)
}
const FUNCTION$K = jam;
const SIGNATURE$K = ["object", "object", "object"];

function last(x) {
  return x[x.length - 1]
}
const FUNCTION$L = last;
const SIGNATURE$L = ["Array", "any"];

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

function not(yy) {
  return !yy
}
const FUNCTION$M = not;
const SIGNATURE$M = ["any", "boolean"];

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
const FUNCTION$N = reverse;
const SIGNATURE$N = ["Array", "Array"];

function smash(args) {
  return args.reduce((agg, xx) => Object.assign({}, agg, xx), {})
}
const FUNCTION$O = smash;
const SIGNATURE$O = ["Array", "object"];

function T() {
  return true
}
const FUNCTION$P = T;
const SIGNATURE$P = ["boolean"];

function weld(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}
const FUNCTION$Q = weld;
const SIGNATURE$Q = ["object", "object", "object"];

function toLower(z) {
  return z.toLowerCase()
}
const FUNCTION$R = toLower;
const SIGNATURE$R = ["string", "string"];

function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}
const FUNCTION$S = toPairs;
const SIGNATURE$S = ["object", "Array"];

function toUpper(z) {
  return z.toUpperCase()
}
const FUNCTION$T = toUpper;
const SIGNATURE$T = ["string", "string"];

function mean(arr) {
  let idx = 0;
  let sum = 0;
  while (idx < arr.length) {
    sum += arr[idx];
    idx += 1;
  }
  return sum / arr.length
}
const FUNCTION$U = mean;
const SIGNATURE$U = ["Array", "number"];

const CORE_WITH_SIGNATURES = [
  [SIGNATURE$G, FUNCTION$G],
  [SIGNATURE$P, FUNCTION$P],
  [SIGNATURE$y, FUNCTION$y],
  [SIGNATURE$w, FUNCTION$w],
  [SIGNATURE$t, FUNCTION$t],
  [SIGNATURE$r, FUNCTION$r],
  [SIGNATURE$C, FUNCTION$C],
  [SIGNATURE$E, FUNCTION$E],
  [SIGNATURE$3, FUNCTION$3],
  [SIGNATURE$F, FUNCTION$F],
  [SIGNATURE$B, FUNCTION$B],
  [SIGNATURE$s, FUNCTION$s],
  [SIGNATURE$5, FUNCTION$5],
  [SIGNATURE$4, FUNCTION$4],
  [SIGNATURE$6, FUNCTION$6],
  [SIGNATURE$H, FUNCTION$H],
  [SIGNATURE$I, FUNCTION$I],
  [SIGNATURE$J, FUNCTION$J],
  [SIGNATURE$A, FUNCTION$A],
  [SIGNATURE$u, FUNCTION$u],
  [SIGNATURE$9, FUNCTION$9],
  [SIGNATURE$8, FUNCTION$8],
  [SIGNATURE$K, FUNCTION$K],
  [SIGNATURE$a, FUNCTION$a],
  [SIGNATURE$b, FUNCTION$b],
  [SIGNATURE$L, FUNCTION$L],
  [SIGNATURE$7, FUNCTION$7],
  [SIGNATURE, FUNCTION],
  [SIGNATURE$U, FUNCTION$U],
  [SIGNATURE$1, FUNCTION$1],
  [SIGNATURE$D, FUNCTION$D],
  [SIGNATURE$c, FUNCTION$c],
  [SIGNATURE$d, FUNCTION$d],
  [SIGNATURE$M, FUNCTION$M],
  [SIGNATURE$e, FUNCTION$e],
  [SIGNATURE$f, FUNCTION$f],
  [SIGNATURE$g, FUNCTION$g],
  [SIGNATURE$h, FUNCTION$h],
  [SIGNATURE$j, FUNCTION$j],
  [SIGNATURE$i, FUNCTION$i],
  [SIGNATURE$2, FUNCTION$2],
  [SIGNATURE$x, FUNCTION$x],
  [SIGNATURE$k, FUNCTION$k],
  [SIGNATURE$N, FUNCTION$N],
  [SIGNATURE$O, FUNCTION$O],
  [SIGNATURE$l, FUNCTION$l],
  [SIGNATURE$m, FUNCTION$m],
  [SIGNATURE$n, FUNCTION$n],
  [SIGNATURE$v, FUNCTION$v],
  [SIGNATURE$p, FUNCTION$p],
  [SIGNATURE$o, FUNCTION$o],
  [SIGNATURE$Q, FUNCTION$Q],
  [SIGNATURE$q, FUNCTION$q],
  [SIGNATURE$R, FUNCTION$R],
  [SIGNATURE$S, FUNCTION$S],
  [SIGNATURE$T, FUNCTION$T],
  [SIGNATURE$z, FUNCTION$z]
];

function makeSignedCore(def) {
  return CORE_WITH_SIGNATURES.reduce(function petition(agg, [hm, fn]) {
    return FUNCTION(agg, {
      [fn.name === "regexTest" ? "test" : fn.name]: def({ hm, check: true })(fn)
    })
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

function makeOrDefault({ curryN, isNil, isUnmatched }) {
  return curryN(ARITY, function orDefault(def, given) {
    return isNil(given) || isUnmatched(given) ? def : given
  })
}
const GET_FUNCTION = makeOrDefault;
const ARITY = 2;
const SIGNATURE$V = ["any", "any", "any"];

function makeSmooth({ filter }) {
  return function smooth(x) {
    return filter(Boolean, x)
  }
}
const GET_FUNCTION$1 = makeSmooth;
const SIGNATURE$W = ["object", "any"];

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
const GET_FUNCTION$2 = makeApplySpecN;
const SIGNATURE$X = ["number", "object", "function"];

function makeEqProps({ curryN, pipe, map, prop, equals }) {
  return curryN(ARITY$1, function eqProps(kk, aa, bb) {
    return pipe(map(prop(kk)), ([a2, b2]) => equals(a2, b2))([aa, bb])
  })
}
const GET_FUNCTION$3 = makeEqProps;
const ARITY$1 = 3;
const SIGNATURE$Y = ["string", "object", "object", "boolean"];

function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY$2, function groupBy(fn, xx) {
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
const GET_FUNCTION$4 = makeGroupBy;
const ARITY$2 = 2;
const SIGNATURE$Z = ["function", "Array", "object"];

function makeIntersection({ uniq, concat, curryN }) {
  return curryN(ARITY$3, function intersection(aa, bb) {
    return uniq(concat(aa, bb))
  })
}
const GET_FUNCTION$5 = makeIntersection;
const ARITY$3 = 2;
const SIGNATURE$_ = ["Array", "Array", "Array"];

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
const GET_FUNCTION$6 = makeIsEmpty;
const SIGNATURE$$ = ["any", "boolean"];

function makeLift({ liftN }) {
  return function lift(fn) {
    return liftN(fn.length, fn)
  }
}
const GET_FUNCTION$7 = makeLift;
const SIGNATURE$10 = ["function", "function"];

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
const GET_FUNCTION$8 = makeLiftN;
const SIGNATURE$11 = ["number", "function", "function"];

function makeOmit({ curryN, pickBy, includes }) {
  return curryN(ARITY$4, function omit(kk, xx) {
    return pickBy((v, k) => !includes(k, kk), xx)
  })
}
const GET_FUNCTION$9 = makeOmit;
const ARITY$4 = 2;
const SIGNATURE$12 = ["Array", "object", "object"];

function makePick({ pickBy, includes, curryN }) {
  return curryN(ARITY$5, function pick(kk, xx) {
    return pickBy((v, k) => includes(k, kk), xx)
  })
}
const GET_FUNCTION$a = makePick;
const ARITY$5 = 2;
const SIGNATURE$13 = ["Array", "object", "object"];

function makeProps({ pipe, ap, prop, box, map, curryN }) {
  return curryN(ARITY$6, function props(toGrab, xx) {
    return pipe(box, ap(map(prop, toGrab)))(xx)
  })
}
const GET_FUNCTION$b = makeProps;
const ARITY$6 = 2;
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
const GET_FUNCTION$c = makeThunkify;
const SIGNATURE$15 = ["function", "function"];

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

const GET_FUNCTION$d = makeAddIndex;
const SIGNATURE$16 = ["function", "function"];

function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY$7, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}
const GET_FUNCTION$e = makeChain;
const ARITY$7 = 2;
const SIGNATURE$17 = ["function", "function|Array|object", "function|Array"];

function makePluck({ curryN, map, prop }) {
  return curryN(ARITY$8, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
const GET_FUNCTION$f = makePluck;
const ARITY$8 = 2;
const SIGNATURE$18 = ["string", "Array|object", "Array|object"];

function makeMedian({ $, dec, pipe, length, nth, sort, divide }) {
  return pipe(
    sort((a, b) => a - b),
    xx => pipe(length, dec, divide(2), Math.round, nth($, xx))(xx)
  )
}
const GET_FUNCTION$g = makeMedian;
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
const GET_FUNCTION$h = makeFlatten;
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
const GET_FUNCTION$i = makeBind;
const SIGNATURE$1b = ["function", "object", "function"];

function makeDifference({ curryN, filter, flip, includes, complement }) {
  return curryN(ARITY$9, function difference(aa, bb) {
    return filter(complement(flip(includes)(bb)), aa)
  })
}
const GET_FUNCTION$j = makeDifference;
const ARITY$9 = 2;
const SIGNATURE$1c = ["Array", "Array", "Array"];

function makeFlip({ curryN }) {
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}
const GET_FUNCTION$k = makeFlip;
const SIGNATURE$1d = ["function", "function"];

function makeIsObject({ both, isRawObject }) {
  return function isObject(x) {
    return both(isRawObject, Boolean)(x)
  }
}
const GET_FUNCTION$l = makeIsObject;
const SIGNATURE$1e = ["any", "boolean"];

function makeJ2({ toJSON }) {
  return toJSON(2)
}
const GET_FUNCTION$m = makeJ2;
const SIGNATURE$1f = ["any", "string"];

function makePathOr({ curryN, reduce }) {
  return curryN(ARITY$a, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}
const GET_FUNCTION$n = makePathOr;
const ARITY$a = 3;
const SIGNATURE$1g = ["any", "Array", "any", "any"];

function makePathOrDerivatives({
  equals,
  is,
  def,
  pipe,
  pathOr,
  isUnmatched,
  complement
}) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    const run = acc(C.UNMATCHED);
    return {
      hasAcc: def({ check: true, hm: ["Array|string", "any", "boolean"] })(
        function _hasPath(ks, src) {
          return pipe(run(ks), complement(isUnmatched))(src)
        }
      ),
      accIs: def({
        check: true,
        hm: ["function", "Array|string", "any", "boolean"]
      })(function _pathIs(J, ks, src) {
        return pipe(run(ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: def({
        check: true,
        hm: ["Array|string", "any", "any", "boolean"]
      })(function _pathEq(ks, ex, src) {
        return pipe(run(ks), equals(ex))(src)
      }),
      satisfies: def({
        check: true,
        hm: ["function", "Array|string", "any", "boolean"]
      })(function _pathSatisfies(fn, ks, src) {
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
  const propOr = def({
    check: true,
    hm: ["any", "number|string", "any", "any"]
  })(function _propOr(dd, key, source) {
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
    hasProp,
    hasPath,
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
  return curryN(ARITY$b, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}
const GET_FUNCTION$o = makeReject;
const ARITY$b = 2;
const SIGNATURE$1h = ["function", "object", "object"];

function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY$c, function symmetricDifference(aa, bb) {
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
const GET_FUNCTION$p = makeSymmetricDifference;
const ARITY$c = 2;
const SIGNATURE$1i = ["Array", "Array", "Array"];

function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY$d, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}
const GET_FUNCTION$q = makeUnion;
const ARITY$d = 2;
const SIGNATURE$1j = ["Array", "Array", "Array"];

function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}
const GET_FUNCTION$r = makeUniq;
const SIGNATURE$1k = ["Array", "Array"];

function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}
const GET_FUNCTION$s = makeIfElseDerivatives;

const derivedFunctionsSortedByIncreasingDependencies = [
  ['orDefault', GET_FUNCTION, SIGNATURE$V],
  ["smooth", GET_FUNCTION$1, SIGNATURE$W],
  ["j2", GET_FUNCTION$m, SIGNATURE$1f], // toJSON
  ["addIndex", GET_FUNCTION$d, SIGNATURE$16], // curryN
  ["pick", GET_FUNCTION$a, SIGNATURE$13], // pickBy includes

  ["bind", GET_FUNCTION$i, SIGNATURE$1b], // curryN
  ["flip", GET_FUNCTION$k, SIGNATURE$1d], // curryN
  ["liftN", GET_FUNCTION$8, SIGNATURE$11], // curryN reduce ap map
  ["lift", GET_FUNCTION$7, SIGNATURE$10], // lift
  ["thunkify", GET_FUNCTION$c, SIGNATURE$15], // curryN
  ["groupBy", GET_FUNCTION$4, SIGNATURE$Z], // curryN objOf mash reduce
  ["isEmpty", GET_FUNCTION$6, SIGNATURE$$], // equals empty

  ["__ifElse", GET_FUNCTION$s, false], // ifElse identity
  ["flatten", GET_FUNCTION$h, SIGNATURE$1a], // isArray forEach any
  ["chain", GET_FUNCTION$e, SIGNATURE$17], // curryN map reduce concat
  ["reject", GET_FUNCTION$o, SIGNATURE$1h], // curryN complement filter
  ["omit", GET_FUNCTION$9, SIGNATURE$12], // complement pickBy includes
  ["uniq", GET_FUNCTION$r, SIGNATURE$1k], // curryN reduce
  ["intersection", GET_FUNCTION$5, SIGNATURE$_], // curryN uniq concat
  ["median", GET_FUNCTION$g, SIGNATURE$19], // $ pipe length nth sort divide
  ["isObject", GET_FUNCTION$l, SIGNATURE$1e], // curryN both isRawObject
  ["union", GET_FUNCTION$q, SIGNATURE$1j], // curryN filter includes
  ["difference", GET_FUNCTION$j, SIGNATURE$1c], // curryN complement filter includes
  ["symmetricDifference", GET_FUNCTION$p, SIGNATURE$1i], // curryN difference
  ["__predicatesPass", makePredicatesPass, false], // curryN all, any flip gt length map smooth pipe
  ["pathOr", GET_FUNCTION$n, SIGNATURE$1g], // curryN reduce
  ["__pathOrDerivatives", makePathOrDerivatives, false], // curryN equals is pathOr pipe
  ["props", GET_FUNCTION$b, SIGNATURE$14],
  ["eqProps", GET_FUNCTION$3, SIGNATURE$Y],
  ["pluck", GET_FUNCTION$f, SIGNATURE$18],
  ["applySpecN", GET_FUNCTION$2, SIGNATURE$X]
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

function tryCatch(tryer, catcher) {
  return function safetyCatch() {
    try {
      return tryer.apply(null, arguments)
    } catch (e) {
      return catcher(e)
    }
  }
}
const FUNCTION$V = tryCatch;
const SIGNATURE$1l = ["function", "function", "function"];

function applyTo(xx, fn) {
  return fn(xx)
}

const FUNCTION$W = applyTo;
const SIGNATURE$1m = ["any", "function", "any"];

function endsWith(needle, haystack) {
  if (haystack && isFunction(haystack.endsWith)) {
    return haystack.endsWith(needle)
  }
  return haystack[haystack.length - 1] === needle
}
const FUNCTION$X = endsWith;
const SIGNATURE$1n = ["object|string", "object|string", "boolean"];

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

const FUNCTION$Y = findIndex;
const SIGNATURE$1o = ["function", "object", "any"];

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
const FUNCTION$Z = findLastIndex;
const SIGNATURE$1p = ["function", "object", "any"];

function hasIn(pp, xx) {
  return pp in xx
}
const FUNCTION$_ = hasIn;
const SIGNATURE$1q = ["string", "object", "boolean"];

function has(pp, xx) {
  return xx && typeof xx[pp] !== "undefined"
}
const FUNCTION$$ = has;
const SIGNATURE$1r = ["string", "object", "boolean"];

function identical(aa, bb) {
  return Object.is(aa, bb)
}
const FUNCTION$10 = identical;
const SIGNATURE$1s = ["any", "any", "boolean"];

function indexOf(needle, haystack) {
  return haystack.indexOf(needle)
}
const FUNCTION$11 = indexOf;
const SIGNATURE$1t = ["any", "string|object", "number"];

function lastIndexOf(needle, haystack) {
  return haystack.lastIndexOf(needle)
}
const FUNCTION$12 = lastIndexOf;
const SIGNATURE$1u = ["any", "string|object", "number"];

function match(rx, str) {
  return str.match(rx)
}
const FUNCTION$13 = match;
const SIGNATURE$1v = ["RegExp", "string", "Array|nil"];

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
const FUNCTION$14 = none;
const SIGNATURE$1w = ["function", "Array|object", "boolean"];

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
const FUNCTION$15 = pickBy;
const SIGNATURE$1x = ["function", "object", "object"];

function startsWith(needle, haystack) {
  if (haystack && isFunction(haystack.startsWith)) {
    return haystack.startsWith(needle)
  }
  return haystack[0] === needle
}
const FUNCTION$16 = startsWith;
const SIGNATURE$1y = ["object|string", "object|string", "boolean"];

function add(b, a) {
  return a + b
}

const FUNCTION$17 = add;
const SIGNATURE$1z = ["number|string", "number|string", "number|string"];

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
const SIGNATURE$1A = ["function", "object", "any"];

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

const FUNCTION$19 = findLast;
const SIGNATURE$1B = ["function", "object", "any|nil"];

function apply(fn, args) {
  return fn.apply(null, args)
}
const FUNCTION$1a = apply;
const SIGNATURE$1C = ["function", "Array", "any"];

function and(a, b) {
  return a && b
}
const FUNCTION$1b = and;
const SIGNATURE$1D = ["any", "any", "boolean"];

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

const FUNCTION$1c = any;
const SIGNATURE$1E = ["function", "object", "boolean"];

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
const FUNCTION$1d = all;
const SIGNATURE$1F = ["function", "Array|object", "boolean"];

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

const FUNCTION$1e = ap;
const SIGNATURE$1G = ["function|Array", "function|Array", "function|Array"];

function concat(a, b) {
  return a.concat(b)
}
const FUNCTION$1f = concat;
const SIGNATURE$1H = ["any", "any", "Array|String"];

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

const FUNCTION$1g = cond;
const SIGNATURE$1I = ["Array", "any", "any"];

function divide(b, a) {
  return a / b
}
const FUNCTION$1h = divide;
const SIGNATURE$1J = ["number", "number", "number"];

function equals(a, b) {
  if (a && isFunction(a.equals)) return a.equals(b)
  return a === b
}
const FUNCTION$1i = equals;
const SIGNATURE$1K = ["any", "any", "boolean"];

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

const FUNCTION$1j = filter;
const SIGNATURE$1L = ["function", "object", "object"];

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

const FUNCTION$1k = forEach;
const SIGNATURE$1M = ["function", "object", "nil"];

function includes(b, a) {
  if (a && isFunction(a.includes)) return a.includes(b)
  if (a && isFunction(a.indexOf)) return a.indexOf(b) > -1
  return false
}
const FUNCTION$1l = includes;
const SIGNATURE$1N = ["object|string", "object|string", "boolean"];

function gt(b, a) {
  return a > b
}
const FUNCTION$1m = gt;
const SIGNATURE$1O = ["number", "number", "boolean"];

function gte(b, a) {
  return a >= b
}
const FUNCTION$1n = gte;
const SIGNATURE$1P = ["number", "number", "boolean"];

function join(del, xx) {
  return xx.join(del)
}

const FUNCTION$1o = join;
const SIGNATURE$1Q = ["string", "Array", "string"];

function lt(b, a) {
  return a < b
}
const FUNCTION$1p = lt;
const SIGNATURE$1R = ["number", "number", "boolean"];

function lte(b, a) {
  return a <= b
}
const FUNCTION$1q = lte;
const SIGNATURE$1S = ["number", "number", "boolean"];

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
const SIGNATURE$1T = ["function", "object", "object"];
const FUNCTION$1r = map;

function max(aa, bb) {
  return Math.max(aa, bb)
}
const FUNCTION$1s = max;
const SIGNATURE$1U = ['number', 'number'];

function min(aa, bb) {
  return Math.min(aa, bb)
}
const FUNCTION$1t = min;
const SIGNATURE$1V = ["number", "number"];

function multiply(b, a) {
  return a * b
}
const FUNCTION$1u = multiply;
const SIGNATURE$1W = ["number", "number", "number"];

function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

const FUNCTION$1v = nth;
const SIGNATURE$1X = ["number", "Array", "any"];

function or(a, b) {
  return a || b
}

const FUNCTION$1w = or;
const SIGNATURE$1Y = ["any", "any", "boolean"];

function range(aa, zz) {
  const out = [];
  const down = zz < aa;
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix);
  }
  return out
}

const FUNCTION$1x = range;
const SIGNATURE$1Z = ["number", "number", "Array"];

function split(del, xx) {
  return xx.split(del)
}

const FUNCTION$1y = split;
const SIGNATURE$1_ = ["string", "string", "Array"];

function sort(fn, rr) {
  const copy = [].concat(rr);
  copy.sort(fn);
  return copy
}

const FUNCTION$1z = sort;
const SIGNATURE$1$ = ["function", "Array", "Array"];

function subtract(b, a) {
  return a - b
}

const FUNCTION$1A = subtract;
const SIGNATURE$20 = ["number", "number", "number"];

function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
const FUNCTION$1B = toJSON;
const SIGNATURE$21 = ["number", "any", "string"];

const BINARY_WITH_SIGNATURES = [
  [SIGNATURE$1z, FUNCTION$17],
  [SIGNATURE$1F, FUNCTION$1d],
  [SIGNATURE$1D, FUNCTION$1b],
  [SIGNATURE$1E, FUNCTION$1c],
  [SIGNATURE$1G, FUNCTION$1e],
  [SIGNATURE$1C, FUNCTION$1a],
  [SIGNATURE$1m, FUNCTION$W],
  [SIGNATURE$1H, FUNCTION$1f],
  [SIGNATURE$1I, FUNCTION$1g],
  [SIGNATURE$1J, FUNCTION$1h],
  [SIGNATURE$1n, FUNCTION$X],
  [SIGNATURE$1K, FUNCTION$1i],
  [SIGNATURE$1L, FUNCTION$1j],
  [SIGNATURE$1A, FUNCTION$18],
  [SIGNATURE$1B, FUNCTION$19],
  [SIGNATURE$1o, FUNCTION$Y],
  [SIGNATURE$1p, FUNCTION$Z],
  [SIGNATURE$1M, FUNCTION$1k],
  [SIGNATURE$1O, FUNCTION$1m],
  [SIGNATURE$1P, FUNCTION$1n],
  [SIGNATURE$1q, FUNCTION$_],
  [SIGNATURE$1r, FUNCTION$$],
  [SIGNATURE$1s, FUNCTION$10],
  [SIGNATURE$1N, FUNCTION$1l],
  [SIGNATURE$1t, FUNCTION$11],
  [SIGNATURE$1Q, FUNCTION$1o],
  [SIGNATURE$1u, FUNCTION$12],
  [SIGNATURE$1R, FUNCTION$1p],
  [SIGNATURE$1S, FUNCTION$1q],
  [SIGNATURE$1T, FUNCTION$1r],
  [SIGNATURE$1v, FUNCTION$13],
  [SIGNATURE$1U, FUNCTION$1s],
  [SIGNATURE$1V, FUNCTION$1t],
  [SIGNATURE$1W, FUNCTION$1u],
  [SIGNATURE$1w, FUNCTION$14],
  [SIGNATURE$1X, FUNCTION$1v],
  [SIGNATURE$1Y, FUNCTION$1w],
  [SIGNATURE$1x, FUNCTION$15],
  [SIGNATURE$1Z, FUNCTION$1x],
  [SIGNATURE$1$, FUNCTION$1z],
  [SIGNATURE$1_, FUNCTION$1y],
  [SIGNATURE$1y, FUNCTION$16],
  [SIGNATURE$20, FUNCTION$1A],
  [SIGNATURE$21, FUNCTION$1B],
  [SIGNATURE$1l, FUNCTION$V]
];

function extendBinaryWithSignatures(F) {
  return F.weld(
    F,
    BINARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 2, check: true, hm })(fn) })
    }, {})
  )
}

function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
const FUNCTION$1C = both;
const SIGNATURE$22 = ["function", "function", "any", "boolean"];

function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
const FUNCTION$1D = either;
const SIGNATURE$23 = ["function", "function", "any"];

function eqBy(fn, a, b) {
  return Boolean(fn(a, b))
}
const FUNCTION$1E = eqBy;
const SIGNATURE$24 = ["function", "any", "any", "boolean"];

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
const FUNCTION$1F = innerJoin;
const SIGNATURE$25 = ["function", "Array", "Array", "Array"];

function insert(ind, ins, what) {
  const copy = [].concat(what);
  copy.splice(ind, 0, ins);
  return copy
}
const FUNCTION$1G = insert;
const SIGNATURE$26 = ["number", "any", "Array", "Array"];

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
const FUNCTION$1H = insertAll;
const SIGNATURE$27 = ["number", "any", "Array", "Array"];

function replace(rx, rep, str) {
  return str.replace(rx, rep)
}
const FUNCTION$1I = replace;
const SIGNATURE$28 = ["RegExp|string", "string", "string", "string"];

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

const FUNCTION$1J = reduce;
const SIGNATURE$29 = ["function", "any", "object", "any"];

function slice(aa, bb, xx) {
  return xx.slice(aa, bb)
}

const FUNCTION$1K = slice;
const SIGNATURE$2a = ["number", "number", "object", "object"];

const TERNARY_WITH_SIGNATURES = [
  [SIGNATURE$22, FUNCTION$1C],
  [SIGNATURE$23, FUNCTION$1D],
  [SIGNATURE$24, FUNCTION$1E],
  [SIGNATURE$25, FUNCTION$1F],
  [SIGNATURE$26, FUNCTION$1G],
  [SIGNATURE$27, FUNCTION$1H],
  [SIGNATURE$29, FUNCTION$1J],
  [SIGNATURE$28, FUNCTION$1I],
  [SIGNATURE$2a, FUNCTION$1K]
];

function extendTernaryWithSignatures(F) {
  return F.weld(
    F,
    TERNARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 3, check: true, hm })(fn) })
    }, {})
  )
}

function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

const FUNCTION$1L = ifElse;
const SIGNATURE$2b = ["function", "function", "function", "any", "any"];

const QUATERNARY_WITH_SIGNATURES = [[SIGNATURE$2b, FUNCTION$1L]];

function extendQuaternaryWithSignatures(F) {
  return F.weld(
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
        isUnmatched,
        isNil,
        cleanErrorStackFor
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
var debug = FUTILITY.weld(FUTILITY, {
  custom: coreWithTypes,
  version: "4.0.0",
  configuration: CONFIG.CHECKED
});

export default debug;
