import { isFunction } from "$types/index"

export function endsWith(needle, haystack) {
  if (haystack && isFunction(haystack.endsWith)) {
    return haystack.endsWith(needle)
  }
  return haystack[haystack.length - 1] === needle
}
export default endsWith
export const FUNCTION = endsWith
export const ARITY = 2
export const SIGNATURE = ["object|string", "object|string", "boolean"]
