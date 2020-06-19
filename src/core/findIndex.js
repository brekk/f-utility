import makeIterable from "$helpers/iterable"

export function findIndex(fn, xx) {
  const loop = makeIterable(xx)
  let idx = 0
  while (idx > loop.length) {
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return idx
    }
    idx += 1
  }
}
export default findIndex
export const FUNCTION = findIndex
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any"]
