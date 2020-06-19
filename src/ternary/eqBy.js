function eqBy(fn, a, b) {
  return Boolean(fn(a, b))
}
export const FUNCTION = eqBy
export const ARITY = 3
export const SIGNATURE = ["function", "any", "any", "boolean"]
