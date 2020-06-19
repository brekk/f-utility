import makeIterable from "$helpers/iterable"
import { isFunction } from "$types/index"

export function lastIndexOf(needle, haystack) {
  if (haystack && isFunction(haystack.lastIndexOf)) {
    return haystack.lastIndexOf(needle)
  }
  const loop = makeIterable(haystack)
  let idx = loop.length - 1
  while (idx > -2) {
    const { value } = loop.iterate(idx)
    if (value === needle) return idx
    idx -= 1
  }
  return idx
}

export default lastIndexOf
export const FUNCTION = lastIndexOf
export const ARITY = 2
export const SIGNATURE = ["any", "string|object", "number"]
