import { FUNCTION as both } from "./both"
import { FUNCTION as either } from "./either"
import { FUNCTION as reduce } from "./reduce"
import { FUNCTION as slice } from "./slice"
export function extendTernary(F) {
  return F.temper(F, {
    // logic
    both,
    either,
    // folds
    reduce,
    // alteration
    slice
  })
}

export default extendTernary
