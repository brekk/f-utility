import makeIterable from "$helpers/iterable"

export function findLast(fn, xx) {
  const loop = makeIterable(xx)
  let idx = loop.length
  while (idx > -1) {
    idx = loop.length - idx - 1
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return value
    }
    idx += 1
  }
}
export default findLast
export const FUNCTION = findLast
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any"]
