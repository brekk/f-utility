export function apply(fn, args) {
  return fn.apply(null, args)
}

export default apply
export const FUNCTION = apply
export const ARITY = 2
export const SIGNATURE = ["function", "Array", "any"]
