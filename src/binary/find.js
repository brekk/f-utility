import makeIterable from "$helpers/iterable"

function find(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  while (idx < loop.length) {
    const { value } = loop.iterate(idx)
    if (fn(value)) {
      return value
    }
    idx += 1
  }
}

export const FUNCTION = find
export const ARITY = 2
export const SIGNATURE = ["function", "object", "any"]
