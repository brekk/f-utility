import { FUNCTION as add } from "./add"
import { FUNCTION as find } from "./find"
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
    // infix
    gt,
    gte,
    lt,
    lte,
    and,
    equals,
    or,
    // math
    subtract,
    add,
    divide,
    multiply,
    // predicate
    all,
    any,
    filter,
    find,
    forEach,
    includes,
    // folds
    max,
    min,
    apply,
    ap,
    concat,
    map,
    join,
    cond,
    // accessor
    nth,
    // generator
    range,
    // conversion
    sort,
    split,
    toJSON
  }
  return F.temper(F, BINARY)
}

export default extendBinary
