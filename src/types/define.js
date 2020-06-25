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
const rLine = /\n\s+at ((\w\.?)+) \((.*)\)/g
const BLACKLIST = ["null", "curried", "saucy"]

export function cleanErrorStackFor({
  blacklist = BLACKLIST,
  files = ["f-utility"],
  prefix: pp = "F"
}) {
  return function cleanStack(e) {
    if (e && e.stack) {
      const { stack } = e
      let once = false
      e.stack = stack.replace(rLine, (match, fn, __file) => {
        const file = __file.replace(/:\d+:\d+/, "")

        console.log(">>>", fn, "@>>@>@", file, "!!!!!!!", __file)
        const loc = `(${file})`
        const isHighlight = files.includes(file)
        const badFunction = blacklist.includes(fn)
        console.log("isHighlight", isHighlight, "badFunction?", badFunction)
        const newline = !once ? "\n\t" : ""
        once = true
        return isHighlight && !badFunction
          ? `${newline}-> ${fn === "piped" ? `${pp}.pipe` : `${pp}.` + fn} ${
              isHighlight ? "" : loc
            }`
          : badFunction
          ? ""
          : match
      })
    }
    return e
  }
}

export function defineFunctionWithParameterTest(test) {
  return function funcfunc({
    ts = typeSystem,
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
    const __cleanStack = cleanErrorStackFor({})
    return function currified(fn) {
      try {
        const fnName =
          fn && typeof fn.hm !== "undefined"
            ? fn.toString(true)
            : fn.name
            ? fn.name
            : "fn"
        const heat = testCurryGaps(test)
        const mergeParams = makeParamMerger(test)
        const isSpicy = some(test)
        /* eslint-disable-next-line no-inner-declarations */
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
            let result
            try {
              result = fn.apply(this, args)
            } catch (e) {
              throw cleanErrors ? __cleanStack(e) : e
            }
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
      } catch (e) {
        if (typeof tryCatch === "function") {
          return tryCatch(e)
        }
        throw e
      }
    }
  }
}
