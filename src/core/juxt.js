import makeIterable from "$helpers/iterable"

export function juxt(fns) {
  return function juxtapose() {
    const args = Array.from(arguments)
    let idx = 0
    const loop = makeIterable(fns)
    const out = []
    while (idx < loop.length) {
      const { value: fn } = loop.iterate(idx)
      const iter = args
        .slice(1, Infinity)
        .reduce((a, b) => [fn.apply(null, a.concat(b))], [args[0]])[0]
      out.push(iter)
      idx += 1
    }
    return out
  }
}
export default juxt
export const FUNCTION = juxt
export const ARITY = 1
export const SIGNATURE = ["Array", "function"]
