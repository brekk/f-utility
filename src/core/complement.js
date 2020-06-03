export function complement(fn) {
  return function subtleComplement() {
    const args = Array.from(arguments)
    return !fn.apply(null, args)
  }
}

export default complement
export const FUNCTION = complement
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
