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
import autoCurryWith from "./auto-curry"
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
      const autoCurry = autoCurryWith(curryN)
      const BASE = CORE.smash(autoCurry(CORE), sideEffectMethods, {
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
      })
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
    }
  )(config)
}
const DEFAULT_CONFIG = {
  ts: typeSystem,
  check: process.env.NODE_ENV !== "production"
}
const FUTILITY = custom(DEFAULT_CONFIG)
export default FUTILITY.temper(FUTILITY, { custom, version: PKG.version })
