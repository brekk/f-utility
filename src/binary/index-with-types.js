import { FUNCTION as applyTo, SIGNATURE as 𝒮applyTo } from "./applyTo"
import { FUNCTION as endsWith, SIGNATURE as 𝒮endsWith } from "./endsWith"
import { FUNCTION as findIndex, SIGNATURE as 𝒮findIndex } from "./findIndex"
import {
  FUNCTION as findLastIndex,
  SIGNATURE as 𝒮findLastIndex
} from "./findLastIndex"
import { FUNCTION as hasIn, SIGNATURE as 𝒮hasIn } from "./hasIn"
import { FUNCTION as identical, SIGNATURE as 𝒮identical } from "./identical"
import { FUNCTION as indexOf, SIGNATURE as 𝒮indexOf } from "./indexOf"
import {
  FUNCTION as lastIndexOf,
  SIGNATURE as 𝒮lastIndexOf
} from "./lastIndexOf"
import { FUNCTION as match, SIGNATURE as 𝒮match } from "./match"
import { FUNCTION as none, SIGNATURE as 𝒮none } from "./none"
import { FUNCTION as pickBy, SIGNATURE as 𝒮pickBy } from "./pickBy"
import { FUNCTION as startsWith, SIGNATURE as 𝒮startsWith } from "./startsWith"

import { FUNCTION as add, SIGNATURE as 𝒮add } from "./add"
import { FUNCTION as find, SIGNATURE as 𝒮find } from "./find"
import { FUNCTION as findLast, SIGNATURE as 𝒮findLast } from "./findLast"
import { FUNCTION as apply, SIGNATURE as 𝒮apply } from "./apply"
import { FUNCTION as and, SIGNATURE as 𝒮and } from "./and"
import { FUNCTION as any, SIGNATURE as 𝒮any } from "./any"
import { FUNCTION as all, SIGNATURE as 𝒮all } from "./all"
import { FUNCTION as ap, SIGNATURE as 𝒮ap } from "./ap"
import { FUNCTION as concat, SIGNATURE as 𝒮concat } from "./concat"
import { FUNCTION as cond, SIGNATURE as 𝒮cond } from "./cond"
import { FUNCTION as divide, SIGNATURE as 𝒮divide } from "./divide"
import { FUNCTION as equals, SIGNATURE as 𝒮equals } from "./equals"
import { FUNCTION as filter, SIGNATURE as 𝒮filter } from "./filter"
import { FUNCTION as forEach, SIGNATURE as 𝒮forEach } from "./forEach"
import { FUNCTION as includes, SIGNATURE as 𝒮includes } from "./includes"
import { FUNCTION as gt, SIGNATURE as 𝒮gt } from "./gt"
import { FUNCTION as gte, SIGNATURE as 𝒮gte } from "./gte"
import { FUNCTION as join, SIGNATURE as 𝒮join } from "./join"
import { FUNCTION as lt, SIGNATURE as 𝒮lt } from "./lt"
import { FUNCTION as lte, SIGNATURE as 𝒮lte } from "./lte"
import { FUNCTION as map, SIGNATURE as 𝒮map } from "./map"
import { FUNCTION as max, SIGNATURE as 𝒮max } from "./max"
import { FUNCTION as min, SIGNATURE as 𝒮min } from "./min"
import { FUNCTION as multiply, SIGNATURE as 𝒮multiply } from "./multiply"
import { FUNCTION as nth, SIGNATURE as 𝒮nth } from "./nth"
import { FUNCTION as or, SIGNATURE as 𝒮or } from "./or"
import { FUNCTION as range, SIGNATURE as 𝒮range } from "./range"
import { FUNCTION as split, SIGNATURE as 𝒮split } from "./split"
import { FUNCTION as sort, SIGNATURE as 𝒮sort } from "./sort"
import { FUNCTION as subtract, SIGNATURE as 𝒮subtract } from "./subtract"
import { FUNCTION as toJSON, SIGNATURE as 𝒮toJSON } from "./toJSON"

const BINARY_WITH_SIGNATURES = [
  [𝒮add, add],
  [𝒮all, all],
  [𝒮and, and],
  [𝒮any, any],
  [𝒮ap, ap],
  [𝒮apply, apply],
  [𝒮applyTo, applyTo],
  [𝒮concat, concat],
  [𝒮cond, cond],
  [𝒮divide, divide],
  [𝒮endsWith, endsWith],
  [𝒮equals, equals],
  [𝒮filter, filter],
  [𝒮find, find],
  [𝒮findLast, findLast],
  [𝒮findIndex, findIndex],
  [𝒮findLastIndex, findLastIndex],
  [𝒮forEach, forEach],
  [𝒮gt, gt],
  [𝒮gte, gte],
  [𝒮hasIn, hasIn],
  [𝒮identical, identical],
  [𝒮includes, includes],
  [𝒮indexOf, indexOf],
  [𝒮join, join],
  [𝒮lastIndexOf, lastIndexOf],
  [𝒮lt, lt],
  [𝒮lte, lte],
  [𝒮map, map],
  [𝒮match, match],
  [𝒮max, max],
  [𝒮min, min],
  [𝒮multiply, multiply],
  [𝒮none, none],
  [𝒮nth, nth],
  [𝒮or, or],
  [𝒮pickBy, pickBy],
  [𝒮range, range],
  [𝒮sort, sort],
  [𝒮split, split],
  [𝒮startsWith, startsWith],
  [𝒮subtract, subtract],
  [𝒮toJSON, toJSON]
]

export function extendBinaryWithSignatures(F) {
  return F.temper(
    F,
    BINARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 2, check: true, hm })(fn) })
    }, {})
  )
}

export default extendBinaryWithSignatures
