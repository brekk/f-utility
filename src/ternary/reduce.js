import makeIterable from "$helpers/iterable"

function reduce(fn, initial, xx) {
  const loop = makeIterable(xx)
  let idx = 0
  const { length } = loop
  let result = initial
  while (idx < length) {
    const { value } = loop.iterate(idx)
    result = fn(result, value)
    idx += 1
  }
  return result
}

export const FUNCTION = reduce
export const ARITY = 3
export const SIGNATURE = ["function", "any", "array|object", "any"]
