import makeIterable from "$helpers/iterable"
import { isFunction } from "$types/index"

export function indexOf(needle, haystack) {
  if (haystack && isFunction(haystack.indexOf)) return haystack.indexOf(needle)
  const loop = makeIterable(haystack)
  let idx = -1
  while (idx <= loop.length) {
    const { value } = loop.iterate(idx)
    if (value === needle) return idx
    idx += 1
  }
  return idx
}

export default indexOf
export const FUNCTION = indexOf
export const ARITY = 2
export const SIGNATURE = ["any", "string|object", "number"]
