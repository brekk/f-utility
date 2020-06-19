export function applyTo(xx, fn) {
  return fn(xx)
}

export const FUNCTION = applyTo
export const ARITY = 2
export const SIGNATURE = ["any", "function", "any"]
