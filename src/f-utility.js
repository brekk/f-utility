import PKG from "../package.json"
import C from "./constants"
import memoizeWith from "./memoize-with"
import {
  is,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isRawObject,
  isString,
  isSymbol,
  isUndefined,
  isUnmatched,
  typeSystem
} from "./types"
import addAliases from "./aliases"
import CORE from "./core"
import addSideEffectMethods from "./side-effect"
import { fabricate } from "./root"
import extendDerived from "./derived"
import extendBinary from "./binary"
import extendTernary from "./ternary"
import extendQuaternary from "./quaternary"

function custom(config) {
  return CORE.pipe(
    fabricate,
    function basicDefinitions({ def, curry, curryN }) {
      const sideEffectMethods = addSideEffectMethods(curry)
      function wrapCoreFunctionsWithCurry(CC) {
        return CC.keys(CC)
          .map(function wrapCurry(fnName) {
            const fn = CC[fnName]
            const isBinaryFunctionPlus = isFunction(fn) && fn.length > 1
            return [fnName, isBinaryFunctionPlus ? curryN(fn.length, fn) : fn]
          })
          .reduce((agg, [k, v]) => CC.mash(agg, { [k]: v }), {})
      }
      return CORE.temper(
        CORE.temper(wrapCoreFunctionsWithCurry(CORE), sideEffectMethods),
        {
          memoizeWith,
          def,
          curry,
          curryN,
          C,
          $: C.$,
          is,
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
      )
    },
    extendBinary,
    extendTernary,
    extendQuaternary,
    extendDerived,
    addAliases
  )(config)
}
const DEFAULT_CONFIG = {
  ts: typeSystem,
  check: process.env.NODE_ENV !== "production"
}
const FUTILITY = custom(DEFAULT_CONFIG)
export default FUTILITY.temper(FUTILITY, { custom, version: PKG.version })
