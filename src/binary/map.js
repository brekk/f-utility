import makeIterable from "../helpers/iterable"

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

/*
function map(fn, xx) {
  let idx = 0
  const len = length(xx)
  const isIter = Array.isArray(xx)
  const result = isIter ? Array(len) : {}
  const xKeys = Object.keys(xx)
  while (idx < len) {
    const key = isIter ? idx : xKeys[idx]
    const current = xx[key]
    const present = fn(current)
    result[key] = present
    idx += 1
  }
  return result
}
*/
export const ARITY = 2
export const SIGNATURE = ["function", "Array|object", "Array|object"]
export const FUNCTION = map
