import makeIterable from "$helpers/iterable"

function none(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  let promised = false
  while (idx < loop.length && !promised) {
    const { value } = loop.iterate(idx)
    const good = fn(value)
    if (good) promised = true
    idx += 1
  }
  return promised
}

export default none
export const FUNCTION = none
export const ARITY = 2
export const SIGNATURE = ["function", "Array|object", "boolean"]
