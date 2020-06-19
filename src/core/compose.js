import pipe from "./pipe"
export function compose() {
  return pipe.apply(null, Array.from(arguments).reverse())
}
export default compose

export const FUNCTION = compose
export const ARITY = "VARIADIC"
export const SIGNATURE = ["any", "any"]
