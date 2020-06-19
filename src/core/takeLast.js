import { isFunction } from "$types/index"

export function takeLast(nn, xx) {
  if (xx && isFunction(xx.takeLast)) return xx.takeLast(nn)
  return xx.slice(xx.length - nn, Infinity)
}

export default takeLast
export const FUNCTION = takeLast
export const ARITY = 2
export const SIGNATURE = ["number", "Array|string", "Array|string"]
