export function dissoc(key, xx) {
  const copy = Object.assign({}, xx)
  delete copy[key]
  return copy
}

export default dissoc
export const FUNCTION = dissoc
export const ARITY = 2
export const SIGNATURE = ["string|number", "object", "object"]
