export function adjust(idx, fn, xx) {
  const copy = [].concat(xx)
  const relIdx = idx < 0 ? copy.length + idx : idx
  copy[relIdx] = fn(copy[relIdx])
  return copy
}

export default adjust

export const FUNCTION = adjust
export const ARITY = 3
export const SIGNATURE = ["number", "function", "Array", "Array"]
