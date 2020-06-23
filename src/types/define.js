import { makeTypechecker } from "./makeChecker"
import { checkParamsWith } from "./check-params"
import { checkReturnWith } from "./check-return"
import { system as typeSystem } from "./system"
import { archetype } from "./archetype"

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
  return function functionToString(rawName) {
    return rawName
      ? fn
      : `curry(${fn})${args.length > 0 ? `(${args.join(`,`)})` : ``}`
  }
}

export function hmError(name, actual, params) {
  return `Given ${name}( ${actual &&
    actual.join(", ")} ) but expected ${name}( ${params
    .map(z => (Array.isArray(z) ? z.join("|") : z))
    .slice(0, actual.length)
    .join(", ")} )`
}

export function defineFunctionWithParameterTest(test) {
  return function funcfunc({ ts = typeSystem, n: givenLength, hm, check }) {
    if (check) {
      if (typeof ts !== "function")
        throw new TypeError("Expected typeSystem to be a function.")
      if (!hm || !Array.isArray(hm))
        throw new TypeError("Expected hm to be an array of strings.")
    }
    return function currified(fn) {
      const fnName =
        fn && typeof fn.hm !== "undefined"
          ? fn.toString(true)
          : fn.name
          ? fn.name
          : "fn"
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
        if (check) {
          saucy.toString = toString(fnName, args)
          saucy.hm = hm
        }
        if (length >= nArgs) {
          const result = fn.apply(this, args)
          if (check) {
            const tChecker = makeTypechecker(ts)(hm, args)
            const isValid = checkParamsWith(ts)(hm, args)

            if (!isValid) {
              const { rawParams, params } = tChecker
              throw new TypeError(
                hmError(
                  fnName,
                  rawParams.map(z => z.actual),
                  params.map(archetype)
                )
              )
            }
            const returnTypeValid = checkReturnWith(ts)(result)(hm, args)

            if (!returnTypeValid) {
              const { returnType } = tChecker
              throw new TypeError(
                `Expected ${fnName} to return ${archetype(
                  returnType
                )} but got ${typeSystem(result)}.`
              )
            }
          }
          return result
        }
        return saucy
      }
      if (check) {
        curried.toString = toString(fnName)
        curried.hm = hm
      }
      return curried
    }
  }
}
