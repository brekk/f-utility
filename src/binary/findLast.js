import makeIterable from "$helpers/iterable"

function findLast(fn, xx) {
  const loop = makeIterable(xx)
  let idx = loop.length - 1
  while (idx > -1) {
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return value
    }
    idx -= 1
  }
}

export const FUNCTION = findLast
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any|nil"]
