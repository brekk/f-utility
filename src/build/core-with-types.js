import { fabricate } from "./module"
import C from "$core/constants"
import memoizeWith from "$core/memoize-with"
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
  isUnmatched
} from "$types/index"
import pipe from "$core/pipe"
import autoCurryWith from "$core/auto-curry"
import addAliases from "$core/aliases"
import makeSignedCore from "$core/index-with-types"
import addSideEffectMethods from "$core/side-effect-with-types"
import extendDerived from "$derived/index-with-types"
import extendBinary from "$binary/index-with-types"
import extendTernary from "$ternary/index-with-types"
import extendQuaternary from "$quaternary/index-with-types"

function coreWithTypes(config) {
  return pipe(fabricate, function basicDefinitions({ def, curry, curryN }) {
    const SIGNED_CORE = makeSignedCore(def)
    const sideEffectMethods = addSideEffectMethods(def)
    const autoCurry = autoCurryWith(curryN)
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
export default coreWithTypes
