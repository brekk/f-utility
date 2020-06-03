import C from "./constants"
import memoizeWith from "./memoize-with"
import {
  typeSystem,
  isUnmatched,
  isString,
  isNumber,
  isUndefined,
  isFunction,
  isBoolean,
  isSymbol,
  isRawObject,
  isArray
} from "./types"
import addAliases from "./aliases"
import CORE from "./core"
import addSideEffectMethods from "./side-effect"
import { fabricate } from "./root"
import extendUnary from "./unary"
import extendBinary from "./binary"
import extendTernary from "./ternary"

function custom(config) {
  return CORE.pipe(
    fabricate,
    function basicDefinitions({ def, curry, curryN }) {
      const sideEffectMethods = addSideEffectMethods(curry)
      return CORE.mash(
        CORE.mash(
          CORE,

          sideEffectMethods
        ),
        {
          memoizeWith,
          def,
          curry,
          curryN,
          C,
          $: C.$,
          isUnmatched,
          isString,
          isNumber,
          isUndefined,
          isFunction,
          isBoolean,
          isSymbol,
          isRawObject,
          isArray
        }
      )
    },
    extendUnary,
    extendBinary,
    extendTernary,
    function derived(F) {
      const G = F.mash(F, {
        j2: F.toJSON(2),
        reject: F.curry(function reject(fn, xx) {
          return F.filter(F.complement(fn), xx)
        }),
        isObject: F.both(F.isRawObject, Boolean),
        uniq: F.reduce(function unique(agg, xx) {
          return !agg.includes(xx) ? agg.concat(xx) : agg
        }, []),

        // PREDICATES
        anyPass: F.curry(function anyPass(preds, xx) {
          return F.pipe(
            F.map(F.flip(F.any)(xx)),
            F.smooth,
            F.length,
            F.gt(0)
          )(preds)
        }),

        // ACCESSORS
        pathOr: F.curry(function pathOr(dd, ks, src) {
          return F.reduce(
            function walkPathOr(agg, st) {
              return (agg && agg[st]) || dd
            },
            src,
            ks
          )
        })
      })
      // pathOr => {path, pathEq, pathSatisfies}
      // propOr => {prop, propEq, propSatisfies}
      function deriveFromAccessor(acc) {
        return {
          unsafe: acc(null),
          eq: F.curry(function equivalence(ks, ex, src) {
            return F.pipe(
              acc(C.UNMATCHED, ks),
              F.equals(ex)
            )(src)
          }),
          satisfies: F.curry(function satisfaction(fn, ks, src) {
            return F.pipe(
              acc(C.UNMATCHED, ks),
              fn,
              Boolean
            )(src)
          })
        }
      }
      const {
        unsafe: path,
        eq: pathEq,
        satisfies: pathSatisfies
      } = deriveFromAccessor(G.pathOr)
      const propOr = F.curry(function _propOr(dd, key, source) {
        return G.pathOr(dd, [key], source)
      })
      const {
        unsafe: prop,
        eq: propEq,
        satisfies: propSatisfies
      } = deriveFromAccessor(propOr)
      return F.mash(G, {
        path,
        pathEq,
        pathSatisfies,
        propOr,
        prop,
        propEq,
        propSatisfies
      })
    },
    addAliases,
    CORE.freeze
  )(config)
}
const DEFAULT_CONFIG = {
  ts: typeSystem,
  check: process.env.NODE_ENV !== "production"
}
const FUTILITY = custom(DEFAULT_CONFIG)
export default FUTILITY.mash(FUTILITY, { custom })
