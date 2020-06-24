import orDefault from "./orDefault"
import applySpecN from "./applySpecN"
import addIndex from "./addIndex"
import median from "./median"
import pluck from "./pluck"
import chain from "./chain"
import flatten from "./flatten"
import __predicatesPass from "./predPass"
import bind from "./bind"
import difference from "./difference"
import flip from "./flip"
import isObject from "./isObject"
import j2 from "./j2"
import pathOr from "./pathOr"
import __pathOrDerivatives from "./pathOr-derivatives"
import reject from "./reject"
import symmetricDifference from "./symmetricDifference"
import union from "./union"
import uniq from "./uniq"
import __ifElse from "./ifElse-derivatives"
import eqProps from "./eqProps"
import groupBy from "./groupBy"
import intersection from "./intersection"
import isEmpty from "./isEmpty"
import lift from "./lift"
import liftN from "./liftN"
import omit from "./omit"
import pick from "./pick"
import props from "./props"
import thunkify from "./thunkify"
import smooth from "./smooth"

const derivedFunctionsSortedByIncreasingDependencies = {
  orDefault,
  smooth,
  j2, // toJSON
  addIndex, // curryN
  pick, // pickBy includes
  bind, // curryN
  flip, // curryN
  liftN, // curryN reduce ap map
  lift, // lift
  thunkify, // curryN
  groupBy, // curryN objOf mash reduce
  isEmpty, // equals empty
  __ifElse, // ifElse identity
  flatten, // isArray forEach any
  chain, // curryN map reduce concat
  reject, // curryN complement filter
  omit, // complement pickBy includes
  uniq, // curryN reduce
  intersection, // curryN uniq concat
  isObject, // curryN both isRawObject
  median, // $ pipe length nth sort divide
  union, // curryN filter includes
  difference, // curryN complement filter includes
  symmetricDifference, // curryN difference
  __predicatesPass, // curryN all, any flip gt length map smooth pipe
  pathOr, // curryN reduce
  __pathOrDerivatives, // curryN equals is pathOr pipe
  props, // curryN pipe ap prop box map
  eqProps, // curryN pipe map prop equals
  pluck, // curryN prop map
  applySpecN
}
function extendDerived(C) {
  return C.pipe(
    C.toPairs,
    C.reduce(function extendFUtility(__F, [name, maker]) {
      const fn = maker(__F)
      return __F.mash(__F, !name.includes("__") ? { [name]: fn } : fn)
    }, C)
  )(derivedFunctionsSortedByIncreasingDependencies)
}

export default extendDerived
