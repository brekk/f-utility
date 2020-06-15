export function temper(a, b) {
  return Object.freeze(Object.assign({}, a, b))
}

export default temper
export const FUNCTION = temper
export const ARITY = 2
export const SIGNATURE = ["object", "object", "object"]
