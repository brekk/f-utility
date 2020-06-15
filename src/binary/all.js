import makeIterable from "$helpers/iterable"

function all(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  let promised = true
  while (idx < loop.length && promised) {
    const { value } = loop.iterate(idx)
    const good = fn(value)
    if (!good) promised = false
    idx += 1
  }
  return promised
}

export default all
export const FUNCTION = all
export const ARITY = 2
export const SIGNATURE = ["function", "Array|object", "boolean"]
