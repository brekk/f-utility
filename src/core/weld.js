export function weld(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}

export default weld
export const FUNCTION = weld
export const ARITY = 2
export const SIGNATURE = ["object", "object", "object"]
