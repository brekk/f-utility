import makeIterable from "$helpers/iterable"

function findIndex(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  while (idx < loop.length) {
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return idx
    }
    idx += 1
  }
  return -1
}

export const FUNCTION = findIndex
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any"]
