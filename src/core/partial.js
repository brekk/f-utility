export function partial(fn, args1) {
  return function partiallyApplied() {
    const args2 = Array.from(arguments)
    return fn.apply(null, args1.concat(args2))
  }
}

export default partial
export const FUNCTION = partial
export const ARITY = 2
export const SIGNATURE = ["any", "any", "function"]
