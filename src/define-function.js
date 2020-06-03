import {
  makeTypechecker,
  checkParamsWith,
  checkReturnWith,
  typeSystem,
  archetype
} from "./types"

export function makeParamMerger(taste) {
  return function compareParams(aa, bb) {
    return aa
      .map(function testGaps(yy) {
        return taste(yy) && bb[0] ? bb.shift() : yy
      })
      .concat(bb)
  }
}
export function testCurryGaps(taste) {
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

export function toString(fn, args = []) {
  return function functionToString() {
    return `curry(${fn.name || "fn"})${
      args.length > 0 ? `(${args.join(`,`)})` : ``
    }`
  }
}

export function hmError(name, actual, params) {
  return `Given ${name}( ${actual &&
    actual.join(", ")} ) but expected ${name}( ${params
    .slice(0, actual.length)
    .join(", ")} )`
}

export function category(test) {
  return function testedCategory({
    ts = typeSystem,
    n: givenLength,
    hm,
    check
  }) {
    if (check) {
      if (typeof ts !== "function")
        throw new TypeError("Expected typeSystem to be a function.")
      if (!hm || !Array.isArray(hm))
        throw new TypeError("Expected hm to be an array of strings.")
    }
    return function currified(fn) {
      const heat = testCurryGaps(test)
      const mergeParams = makeParamMerger(test)
      const isSpicy = some(test)
      function curried() {
        const args = Array.from(arguments)

        const nArgs =
          hm && Array.isArray(hm)
            ? hm.length - 1
            : givenLength && typeof givenLength === "number"
            ? givenLength
            : fn.length
        const length = isSpicy(args) ? heat(args) : args.length
        function saucy() {
          const args2 = Array.from(arguments)
          return curried.apply(this, mergeParams(args, args2))
        }
        saucy.toString = toString(fn, args)
        if (length >= nArgs) {
          const result = fn.apply(this, args)
          if (check) {
            const tChecker = makeTypechecker(ts)(hm, args)
            const isValid = checkParamsWith(ts)(hm, args)

            if (!isValid) {
              const { rawParams, params } = tChecker
              throw new TypeError(
                hmError(
                  fn.name,
                  rawParams.map(z => z.actual),
                  params.map(archetype)
                )
              )
            }
            const returnTypeValid = checkReturnWith(ts)(result)(hm, args)

            if (!returnTypeValid) {
              /* tChecker = makeTypechecker(ts)(hm, args) */
              const { returnType } = tChecker
              throw new TypeError(
                `Expected ${fn.name} to return ${archetype(
                  returnType
                )} but got ${typeSystem(result)}.`
              )
            }
          }
          return result
        }
        return saucy
      }
      curried.toString = toString(fn)
      return curried
    }
  }
}
