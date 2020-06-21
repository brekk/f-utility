import { isFunction } from "$types/index"
function equals(a, b) {
  if (a && isFunction(a.equals)) return a.equals(b)
  return a === b
}
export const FUNCTION = equals
export const ARITY = 2
export const SIGNATURE = ["any", "any", "boolean"]
