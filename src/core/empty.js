import { typeSystem, isFunction } from "$types/index"

const EMPTY_LOOKUPS = Object.freeze({
  "String∋string": "",
  "Array∋object": [],
  "Object∋object": {}
})
export function empty(xx) {
  if (xx && isFunction(xx.empty)) {
    return xx.empty()
  }
  const tt = typeSystem(xx)
  const matched = EMPTY_LOOKUPS[tt]
  if (typeof matched === "undefined") return undefined
  return matched
}

export default empty
export const FUNCTION = empty
export const ARITY = 1
export const SIGNATURE = ["any", "any"]