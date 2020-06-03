export function constant(k) {
  return function forever() {
    return k
  }
}

export default constant
export const FUNCTION = constant
export const ARITY = 1
export const SIGNATURE = ["any", "function"]
