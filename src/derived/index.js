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

const derivedFunctionsSortedByIncreasingDependencies = {
  j2, // toJSON
  addIndex, // curryN
  bind, // curryN
  flip, // curryN
  __ifElse, // ifElse identity
  flatten, // isArray forEach any
  chain, // curryN map reduce concat
  reject, // curryN complement filter
  uniq, // curryN reduce
  isObject, // curryN both isRawObject
  median, // $ pipe length nth sort divide
  union, // curryN filter includes
  difference, // curryN complement filter includes
  symmetricDifference, // curryN difference
  __predicatesPass, // curryN all, any flip gt length map smooth pipe
  pathOr, // curryN reduce
  __pathOrDerivatives, // curryN equals is pathOr pipe
  pluck // curryN prop map
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
