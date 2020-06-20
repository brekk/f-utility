import makeIterable from "$helpers/iterable"

export function invert(xx) {
  const loop = makeIterable(xx)
  const out = loop.init
  let idx = 0
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx)
    const current = out[value] || false
    const isArr = Array.isArray(current)
    out[value] =
      current && isArr
        ? current.concat(key)
        : current && !isArr
        ? [current, key]
        : key
    idx += 1
  }
  return out
}
export default invert
export const FUNCTION = invert
export const ARITY = 1
export const SIGNATURE = ["object", "object"]
