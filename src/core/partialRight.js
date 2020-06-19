export function partialRight(fn, args1) {
  return function partialRightlyApplied() {
    const args2 = Array.from(arguments)
    return fn.apply(null, args1.concat(args2).reverse())
  }
}

export default partialRight
export const FUNCTION = partialRight
export const ARITY = 2
export const SIGNATURE = ["any", "any", "Array"]
