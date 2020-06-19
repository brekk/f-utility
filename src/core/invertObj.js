import makeIterable from "$helpers/iterable"

export function invertObj(xx) {
  const loop = makeIterable(xx)
  const out = loop.init
  let idx = 0
  while (idx < loop.length) {
    const { key, value } = loop.iterate(idx)
    out[value] = key
    idx += 1
  }
  return out
}
export default invertObj
export const FUNCTION = invertObj
export const ARITY = 1
export const SIGNATURE = ["object", "object"]
