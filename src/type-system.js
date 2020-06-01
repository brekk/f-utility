import { mash } from "./basic"
import C from "./constants"
import memoizeWith from "./memoize-with"
const { UNMATCHED } = C

export function defaultMemoizer(raw) {
  const [x, y] = raw
  return x.concat(y).join("-")
}

export function makeTypechecker(typecheck, useMemoizer = defaultMemoizer) {
  return memoizeWith(useMemoizer)(function rawMakeTypeChecker(expected, given) {
    if (!Array.isArray(expected) || !Array.isArray(expected)) {
      throw new TypeError(
        "makeTypechecker needs two valid lists of types to run"
      )
    }
    const returnType = expected[expected.length - 1]
    const params = expected.slice(0, expected.length - 1)

    const results = params
      .slice(0, given.length)
      .map(function typeCheckParam(ex, ii) {
        const actual = typecheck(given[ii])
        const success = compareType(actual, ex)
        const outcome = {
          idx: ii,
          raw: Object.freeze({ value: given[ii] }),
          actual,
          expected: ex,
          success
        }
        return outcome
      })
      .reduce(
        function typeCheckOutcomes(outcome, ent) {
          const key = ent.success ? "valid" : "invalid"
          const partial = mash(outcome, {
            [key]: outcome[key].concat([ent]),
            rawParams: outcome.rawParams.concat([ent])
          })
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
      )
    return results
  })
}
const memo = memoizeWith(x => x)
// ∋ indicates "a member of"
const __of__ = "∋"
export function typeSystem(z) {
  let constructor = (z && z.constructor && z.constructor.name) || "Global"
  let type = typeof z
  // deal with undefined / null
  // and the fact that z.constructor.name for boolean is currently Global
  if (!z) {
    if (type === "undefined" || type === "object") {
      type = "nil"
    } else {
      constructor = "Boolean"
    }
  }
  return `${constructor}${__of__}${type}`
}
export const PREFERRED_TYPE = Object.freeze({
  string: "String∋string",
  number: "Number∋number",
  boolean: "Boolean∋boolean",
  function: "Function∋function",
  object: "Object∋object",
  undefined: "Global∋nil"
})
export function preferredType(tt) {
  if (tt.indexOf("|") > -1) return tt.split("|").map(ttt => preferredType(ttt))
  return PREFERRED_TYPE[tt] || tt
}
const typeParent = memo(x => {
  const oof = x.indexOf(__of__)
  return oof > -1 ? x.slice(0, oof) : x
})
const typeChild = memo(x => {
  const oof = x.indexOf(__of__)
  return oof > -1 ? x.slice(oof + 1) : x
})
const separateUnionTypes = memo(x => x.split("|"))
export const compareType = memo(function _compareType(exp, given) {
  const [expectedUnion, givenUnion] = [exp, given].map(separateUnionTypes)
  const comparisons = expectedUnion.map(typeA =>
    givenUnion.map(typeB => {
      if (typeA === "any" || typeB === "any") {
        return true
      }

      if (typeA === typeB) {
        return true
      }
      // 'Number∋number' || 'Number'
      if (typeParent(typeA) === typeParent(typeB)) {
        return true
      }
      // 'Number∋number' === 'number'
      if (typeChild(typeA) === typeChild(typeB)) {
        return true
      }
      return false
    })
  )
  const allCases = comparisons.reduce(
    (all, nextCase) => all.concat(nextCase),
    []
  )
  const noneFailed = allCases.filter(z => !z).length === 0
  return noneFailed
})
export function checkTypesValid(checker) {
  return function checkTypesValidGivenPattern(signature, given) {
    return !makeTypechecker(checker)(signature, given).failures
  }
}
export function checkReturnTypeValid(checker) {
  return function checkReturnTypeValidGiven(given) {
    return function checkReturnTypeValidGivenAB(a, b) {
      const aType = checker(given)
      const bType = makeTypechecker(checker)(a, b).returnType
      return compareType(aType, bType)
    }
  }
}

export function isType(exp) {
  return function compareTypeofs(xx) {
    return typeof xx === exp // eslint-disable-line valid-typeof
  }
}
export function is(Ctor) {
  return function isInstanceOf(xx) {
    return (xx && xx.constructor === Ctor) || xx instanceof Ctor
  }
}

const [
  _isString,
  _isNumber,
  _isUndefined,
  _isFunction,
  _isBoolean,
  _isSymbol,
  _isRawObject
] = [
  "string",
  "number",
  "undefined",
  "function",
  "boolean",
  "symbol",
  "object"
].map(isType)
export const isString = _isString
export const isNumber = _isNumber
export const isUndefined = _isUndefined
export const isFunction = _isFunction
export const isBoolean = _isBoolean
export const isSymbol = _isSymbol
export const isRawObject = _isRawObject
export const isArray = Array.isArray
export function isUnmatched(z) {
  return z === UNMATCHED
}
