import { isFunction } from "$types/index"

export function includes(b, a) {
  if (a && isFunction(a.includes)) return a.includes(b)
  if (a && isFunction(a.indexOf)) return a.indexOf(b) > -1
  return false
}

export default includes
export const FUNCTION = includes
export const ARITY = 2
export const SIGNATURE = ["object|string", "object|string", "boolean"]
