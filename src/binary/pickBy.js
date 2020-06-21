import makeIterable from "$helpers/iterable"
export function pickBy(fn, xx) {
  const loop = makeIterable(xx)
  const out = loop.init
  let idx = 0
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx)
    const matched = fn(value, key)
    if (matched) out[key] = value
    idx += 1
  }
  return out
}

export default pickBy
export const FUNCTION = pickBy
export const ARITY = 2
export const SIGNATURE = ["function", "object", "object"]
