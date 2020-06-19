import { FUNCTION as both, SIGNATURE as 𝒮both } from "./both"
import { FUNCTION as either, SIGNATURE as 𝒮either } from "./either"
import { FUNCTION as eqBy, SIGNATURE as 𝒮eqBy } from "./eqBy"
import { FUNCTION as innerJoin, SIGNATURE as 𝒮innerJoin } from "./innerJoin"
import { FUNCTION as replace, SIGNATURE as 𝒮replace } from "./replace"
import { FUNCTION as reduce, SIGNATURE as 𝒮reduce } from "./reduce"
import { FUNCTION as slice, SIGNATURE as 𝒮slice } from "./slice"
const TERNARY_WITH_SIGNATURES = [
  [𝒮both, both],
  [𝒮either, either],
  [𝒮eqBy, eqBy],
  [𝒮innerJoin, innerJoin],
  [𝒮reduce, reduce],
  [𝒮replace, replace],
  [𝒮slice, slice]
]

export function extendTernaryWithSignatures(F) {
  return F.temper(
    F,
    TERNARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 3, check: true, hm })(fn) })
    }, {})
  )
}

export default extendTernaryWithSignatures
