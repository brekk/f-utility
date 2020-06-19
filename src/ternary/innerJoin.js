import makeIterable from "$helpers/iterable"

export function innerJoin(pred, xs, ys) {
  const loopX = makeIterable(xs)
  const out = []
  const loopY = makeIterable(ys)
  let idx = 0
  while (idx < loopX.length) {
    const { value: x } = loopX.iterate(idx)
    let idy = 0
    while (idy < loopY.length) {
      const { value: y } = loopY.iterate(idy)
      const same = pred(x, y)
      if (same) out.push(x)
      idy += 1
    }
    idx += 1
  }
  return out
}
export default innerJoin
export const FUNCTION = innerJoin
export const ARITY = 3
export const SIGNATURE = ["function", "Array", "Array", "Array"]
