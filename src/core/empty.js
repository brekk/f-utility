import { typeSystem, isFunction } from "$types/index"

const EMPTY_LOOKUPS = Object.freeze({
  "String∋string": "",
  "Array∋array": [],
  "Object∋object": {}
})
export function empty(xx) {
  if (xx && isFunction(xx.empty)) return xx.empty()
  return EMPTY_LOOKUPS[typeSystem(xx)]
}

export default empty
export const FUNCTION = empty
export const ARITY = 1
export const SIGNATURE = ["any", "any"]
