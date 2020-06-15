export function update(idx, val, xx) {
  const copy = [].concat(xx)
  const relIdx = idx < 0 ? copy.length + idx : idx
  copy[relIdx] = val
  return copy
}

export default update

export const FUNCTION = update
export const ARITY = 3
export const SIGNATURE = ["number", "any", "Array", "Array"]
