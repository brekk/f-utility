import __addIndex from "./addIndex"
import __chain from "./chain"
import __flatten from "./flatten"
import __predicatesPass from "./predPass"
import __bind from "./bind"
import __difference from "./difference"
import __flip from "./flip"
import __isObject from "./isObject"
import __j2 from "./j2"
import __pathOr from "./pathOr"
import __pathOrDerivatives from "./pathOr-derivatives"
import __reject from "./reject"
import __symmetricDifference from "./symmetricDifference"
import __union from "./union"
import __uniq from "./uniq"
import __when from "./when"

const derivedFunctionsSortedByIncreasingDependencies = {
  j2: __j2, // toJSON
  addIndex: __addIndex, // curryN
  bind: __bind, // curryN
  flip: __flip, // curryN
  when: __when, // ifElse identity
  flatten: __flatten, // isArray forEach any
  chain: __chain, // curryN map reduce concat
  reject: __reject, // curryN complement filter
  uniq: __uniq, // curryN reduce
  isObject: __isObject, // curryN both isRawObject
  union: __union, // curryN filter includes
  difference: __difference, // curryN complement filter includes
  symmetricDifference: __symmetricDifference, // curryN difference
  __predicatesPass: __predicatesPass, // curryN all, any flip gt length map smooth pipe
  pathOr: __pathOr, // curryN reduce
  __derived: __pathOrDerivatives // curryN equals is pathOr pipe
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
