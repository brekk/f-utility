import { FUNCTION as both, SIGNATURE as 𝒮both } from "./both"
import { FUNCTION as either, SIGNATURE as 𝒮either } from "./either"
import { FUNCTION as reduce, SIGNATURE as 𝒮reduce } from "./reduce"
import { FUNCTION as slice, SIGNATURE as 𝒮slice } from "./slice"
const TERNARY_WITH_SIGNATURES = [
  [𝒮both, both],
  [𝒮either, either],
  [𝒮reduce, reduce],
  [𝒮slice, slice]
]
export function extendTernaryWithSignatures(F) {
  const sign = F.map(([hm, fn]) => F.def({ n: 3, check: true, hm })(fn))
  const signed = sign(TERNARY_WITH_SIGNATURES)
  return F.mash(F, signed)
}
export function extendTernary(F) {
  const ternaryExtension = {
    // logic
    both,
    either,
    // folds
    reduce,
    // alteration
    slice
  }
  return F.temper(F, ternaryExtension)
}

export default extendTernary
