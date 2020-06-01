import makeIterable from "../helpers/iterable"

function filter(fn, xx) {
  let idx = 0
  const loop = makeIterable(xx)
  const { length, isArray } = loop
  const result = isArray ? [] : {}
  while (idx < length) {
    const { key, value } = loop.iterate(idx)
    if (fn(value)) {
      if (isArray) {
        result.push(value)
      } else {
        result[key] = value
      }
    }
    idx += 1
  }
  return result
}

export const FUNCTION = filter
export const ARITY = 2
export const SIGNATURE = ["function", "array|object", "array|object"]
