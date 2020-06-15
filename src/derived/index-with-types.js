import {
  GET_FUNCTION as addIndex,
  SIGNATURE as addIndexSignature
} from "./addIndex"
import { GET_FUNCTION as chain, SIGNATURE as chainSignature } from "./chain"
import { GET_FUNCTION as median, SIGNATURE as medianSignature } from "./median"
import {
  GET_FUNCTION as flatten,
  SIGNATURE as flattenSignature
} from "./flatten"
import __predicatesPass from "./predPass-with-types"
import { GET_FUNCTION as bind, SIGNATURE as bindSignature } from "./bind"
import {
  GET_FUNCTION as difference,
  SIGNATURE as differenceSignature
} from "./difference"
import { GET_FUNCTION as flip, SIGNATURE as flipSignature } from "./flip"
import {
  GET_FUNCTION as isObject,
  SIGNATURE as isObjectSignature
} from "./isObject"
import { GET_FUNCTION as j2, SIGNATURE as j2Signature } from "./j2"
import { GET_FUNCTION as pathOr, SIGNATURE as pathOrSignature } from "./pathOr"
import __pathOrDerivatives from "./pathOr-derivatives-with-types"
import { GET_FUNCTION as reject, SIGNATURE as rejectSignature } from "./reject"
import {
  GET_FUNCTION as symmetricDifference,
  SIGNATURE as symmetricDifferenceSignature
} from "./symmetricDifference"
import { GET_FUNCTION as union, SIGNATURE as unionSignature } from "./union"
import { GET_FUNCTION as uniq, SIGNATURE as uniqSignature } from "./uniq"
import { GET_FUNCTION as __ifElse } from "./ifElse-derivatives"

const derivedFunctionsSortedByIncreasingDependencies = [
  ["j2", j2, j2Signature], // toJSON
  ["addIndex", addIndex, addIndexSignature], // curryN
  ["bind", bind, bindSignature], // curryN
  ["flip", flip, flipSignature], // curryN
  ["__ifElse", __ifElse, false], // ifElse identity
  ["flatten", flatten, flattenSignature], // isArray forEach any
  ["chain", chain, chainSignature], // curryN map reduce concat
  ["reject", reject, rejectSignature], // curryN complement filter
  ["uniq", uniq, uniqSignature], // curryN reduce
  ["median", median, medianSignature], // $ pipe length nth sort divide
  ["isObject", isObject, isObjectSignature], // curryN both isRawObject
  ["union", union, unionSignature], // curryN filter includes
  ["difference", difference, differenceSignature], // curryN complement filter includes
  ["symmetricDifference", symmetricDifference, symmetricDifferenceSignature], // curryN difference
  ["__predicatesPass", __predicatesPass, false], // curryN all, any flip gt length map smooth pipe
  ["pathOr", pathOr, pathOrSignature], // curryN reduce
  ["__pathOrDerivatives", __pathOrDerivatives, false] // curryN equals is pathOr pipe
]
function extendDerived(C) {
  return C.reduce(
    function extendFUtility(__F, [name, maker, hm]) {
      const fn = maker(__F)
      const multi = name.includes("__")
      if (!multi) {
        const safeFn = C.def({ check: true, hm })(fn)
        return __F.mash(__F, { [name]: safeFn })
      }
      return __F.mash(__F, fn)
    },
    C,
    derivedFunctionsSortedByIncreasingDependencies
  )
}

export default extendDerived
