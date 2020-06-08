import __addIndex from "./addIndex"
import __anyPass from "./anyPass"
import __difference from "./difference"
import __symmetricDifference from "./symmetricDifference"
import __flip from "./flip"
import __isObject from "./isObject"
import __j2 from "./j2"
import __pathOrDerivatives from "./pathOr-derivatives"
import __pathOr from "./pathOr"
import __reject from "./reject"
import __uniq from "./uniq"
import __when from "./when"

const derivedFunctionsSortedByIncreasingDependencies = {
  j2: __j2, // toJSON
  addIndex: __addIndex, // curryN
  flip: __flip, // curryN
  when: __when, // ifElse identity
  reject: __reject, // curryN complement filter
  uniq: __uniq, // curryN reduce
  isObject: __isObject, // curryN both isRawObject
  difference: __difference, // curryN complement filter includes
  symmetricDifference: __symmetricDifference, // curryN difference
  anyPass: __anyPass, // curryN any flip gt length map smooth pipe
  pathOr: __pathOr, // curryN reduce
  pathOrDerivatives: __pathOrDerivatives // curryN equals is pathOr pipe
}
function extendDerived(C) {
  return C.pipe(
    C.toPairs,
    C.reduce(function extendFUtility(__F, [name, maker]) {
      const fn = maker(__F)
      return __F.mash(__F, name !== "pathOrDerivatives" ? { [name]: fn } : fn)
    }, C)
  )(derivedFunctionsSortedByIncreasingDependencies)
}

export default extendDerived
