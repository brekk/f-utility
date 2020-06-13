import makeIterable from "../helpers/iterable"

function makeFlatten({ isArray, forEach }) {
  return function flatten(xx) {
    let idx = 0
    const loop = makeIterable(xx)
    let out = []
    while (idx < loop.length) {
      let { value } = loop.iterate(idx)
      if (isArray(value)) {
        value = flatten(value)
        forEach(x => out.push(x), value)
      } else {
        out.push(value)
      }
      idx += 1
    }
    return out
  }
}

export default makeFlatten
export const GET_FUNCTION = makeFlatten
export const ARITY = 1
export const SIGNATURE = ["Array", "Array"]
