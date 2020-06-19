export function keysIn(xx) {
  const out = []
  for (let key in xx) {
    out.push(key)
  }
  return out
}

export default keysIn
export const FUNCTION = keysIn
export const ARITY = 1
export const SIGNATURE = ["object", "Array"]
