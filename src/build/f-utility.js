import C from "../constants"
import memoizeWith from "../memoize-with"
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
} from "../types/index"
import autoCurryWith from "../auto-curry"
import addAliases from "../aliases"
import CORE from "../core/index"
import addSideEffectMethods from "../side-effect"
import extendDerived from "../derived/index"
import extendBinary from "../binary/index"
import extendTernary from "../ternary/index"
import extendQuaternary from "../quaternary/index"

import { fabricate } from "./index"

function custom(config) {
  return CORE.pipe(fabricate, function basicDefinitions({
    def,
    curry,
    curryN
  }) {
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
  })(config)
}
const DEFAULT_CONFIG = {
  ts: typeSystem,
  check: process.env.NODE_ENV !== "production"
}
const FUTILITY = custom(DEFAULT_CONFIG)
export default FUTILITY.temper(FUTILITY, { custom, version: "4.0.0" })
