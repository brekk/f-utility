import makeIterable from "$helpers/iterable"

export function findLastIndex(fn, xx) {
  const loop = makeIterable(xx)
  let idx = loop.length
  while (idx > -1) {
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return idx
    }
    idx -= 1
  }
  return -1
}

export default findLastIndex
export const FUNCTION = findLastIndex
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any"]
