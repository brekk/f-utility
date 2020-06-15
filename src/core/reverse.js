import makeIterable from "$helpers/iterable"

function reverse(xx) {
  // if (typeof xx.reverse === "function") return xx.reverse()
  const loop = makeIterable(xx)
  let idx = loop.length
  const out = loop.init
  while (idx > -1) {
    const { value } = loop.iterate(idx)
    out[loop.length - 1 - idx] = value
    idx -= 1
  }
  return out
}

export default reverse
export const FUNCTION = reverse
export const ARITY = 1
export const SIGNATURE = ["Array", "Array"]
