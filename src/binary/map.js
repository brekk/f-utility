import makeIterable from "$helpers/iterable"

function map(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  const { length, init } = loop
  const result = init
  while (idx < length) {
    const { key, value } = loop.iterate(idx)
    result[key] = fn(value)
    idx += 1
  }
  return result
}

export const ARITY = 2
export const SIGNATURE = ["function", "object", "object"]
export const FUNCTION = map
