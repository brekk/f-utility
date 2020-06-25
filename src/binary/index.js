import { FUNCTION as tryCatch } from "./tryCatch"
import { FUNCTION as applyTo } from "./applyTo"
import { FUNCTION as endsWith } from "./endsWith"
import { FUNCTION as findIndex } from "./findIndex"
import { FUNCTION as findLastIndex } from "./findLastIndex"
import { FUNCTION as hasIn } from "./hasIn"
import { FUNCTION as has } from "./has"
import { FUNCTION as identical } from "./identical"
import { FUNCTION as indexOf } from "./indexOf"
import { FUNCTION as lastIndexOf } from "./lastIndexOf"
import { FUNCTION as match } from "./match"
import { FUNCTION as none } from "./none"
import { FUNCTION as pickBy } from "./pickBy"
import { FUNCTION as startsWith } from "./startsWith"
import { FUNCTION as add } from "./add"
import { FUNCTION as find } from "./find"
import { FUNCTION as findLast } from "./findLast"
import { FUNCTION as apply } from "./apply"
import { FUNCTION as and } from "./and"
import { FUNCTION as any } from "./any"
import { FUNCTION as all } from "./all"
import { FUNCTION as ap } from "./ap"
import { FUNCTION as concat } from "./concat"
import { FUNCTION as cond } from "./cond"
import { FUNCTION as divide } from "./divide"
import { FUNCTION as equals } from "./equals"
import { FUNCTION as filter } from "./filter"
import { FUNCTION as forEach } from "./forEach"
import { FUNCTION as includes } from "./includes"
import { FUNCTION as gt } from "./gt"
import { FUNCTION as gte } from "./gte"
import { FUNCTION as join } from "./join"
import { FUNCTION as lt } from "./lt"
import { FUNCTION as lte } from "./lte"
import { FUNCTION as map } from "./map"
import { FUNCTION as max } from "./max"
import { FUNCTION as min } from "./min"
import { FUNCTION as multiply } from "./multiply"
import { FUNCTION as nth } from "./nth"
import { FUNCTION as or } from "./or"
import { FUNCTION as range } from "./range"
import { FUNCTION as split } from "./split"
import { FUNCTION as sort } from "./sort"
import { FUNCTION as subtract } from "./subtract"
import { FUNCTION as toJSON } from "./toJSON"

export function extendBinary(F) {
  const BINARY = {
    add,
    all,
    and,
    any,
    ap,
    apply,
    applyTo,
    concat,
    cond,
    divide,
    endsWith,
    equals,
    filter,
    find,
    findLast,
    findIndex,
    findLastIndex,
    forEach,
    gt,
    gte,
    hasIn,
    has,
    identical,
    includes,
    indexOf,
    join,
    lastIndexOf,
    lt,
    lte,
    map,
    match,
    max,
    min,
    multiply,
    none,
    nth,
    or,
    pickBy,
    range,
    sort,
    split,
    startsWith,
    subtract,
    toJSON,
    tryCatch
  }
  return F.weld(F, BINARY)
}

export default extendBinary
