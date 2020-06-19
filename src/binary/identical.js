export function identical(aa, bb) {
  return Object.is(aa, bb)
}
export default identical
export const FUNCTION = identical
export const ARITY = 2
export const SIGNATURE = ["any", "any", "boolean"]
