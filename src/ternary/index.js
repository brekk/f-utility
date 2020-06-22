import { FUNCTION as both } from "./both"
import { FUNCTION as replace } from "./replace"
import { FUNCTION as innerJoin } from "./innerJoin"
import { FUNCTION as insert } from "./insert"
import { FUNCTION as insertAll } from "./insertAll"
import { FUNCTION as eqBy } from "./eqBy"
import { FUNCTION as either } from "./either"
import { FUNCTION as reduce } from "./reduce"
import { FUNCTION as slice } from "./slice"
export function extendTernary(F) {
  return F.weld(F, {
    both,
    either,
    eqBy,
    innerJoin,
    insert,
    insertAll,
    reduce,
    replace,
    slice
  })
}

export default extendTernary
