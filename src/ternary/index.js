import { FUNCTION as both } from "./both"
import { FUNCTION as replace } from "./replace"
import { FUNCTION as innerJoin } from "./innerJoin"
import { FUNCTION as eqBy } from "./eqBy"
import { FUNCTION as either } from "./either"
import { FUNCTION as reduce } from "./reduce"
import { FUNCTION as slice } from "./slice"
export function extendTernary(F) {
  return F.temper(F, {
    both,
    either,
    eqBy,
    innerJoin,
    reduce,
    replace,
    slice
  })
}

export default extendTernary
