import { isFunction } from "$types/index"

export function startsWith(needle, haystack) {
  if (haystack && isFunction(haystack.startsWith)) {
    return haystack.startsWith(needle)
  }
  return haystack[0] === needle
}
export default startsWith
export const FUNCTION = startsWith
export const ARITY = 2
export const SIGNATURE = ["object|string", "object|string", "boolean"]
