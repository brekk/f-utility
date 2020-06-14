import makeIterable from "$helpers/iterable"

function forEach(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  const { length } = loop
  while (idx < length) {
    const { value } = loop.iterate(idx)
    fn(value)
    idx += 1
  }
}

export const FUNCTION = forEach
export const ARITY = 2
export const SIGNATURE = ["function", "object", "nil"]
