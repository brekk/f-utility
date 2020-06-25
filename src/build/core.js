import { fabricate } from "./module"
import C from "$core/constants"
import memoizeWith from "$core/memoize-with"
import {
  is,
  isNil,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isRawObject,
  isString,
  isSymbol,
  isUndefined,
  isUnmatched,
  cleanErrorStackFor
} from "$types/index"
import autoCurryWith from "$core/auto-curry"
import addAliases from "$core/aliases"
import CORE from "$core/index"
import addSideEffectMethods from "$core/side-effect"
import extendDerived from "$derived/index"
import extendBinary from "$binary/index"
import extendTernary from "$ternary/index"
import extendQuaternary from "$quaternary/index"

function core(config) {
  return CORE.pipe(fabricate, function basicDefinitions({
    def,
    curry,
    curryN
  }) {
    const sideEffectMethods = addSideEffectMethods(curry)
    const autoCurry = autoCurryWith(curryN)
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
        isNil,
        cleanErrorStackFor
      }
    ])
    return BASE.pipe(
      extendBinary,
      autoCurry,
      extendTernary,
      autoCurry,
      extendQuaternary,
      autoCurry,
      extendDerived,
      addAliases
    )(BASE)
  })(config)
}
export default core
