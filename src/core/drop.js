import { isFunction } from "$types/index"

export function drop(xx, src) {
  if (src && isFunction(src.drop)) {
    return src.drop(xx)
  }
  return src.slice(xx, Infinity)
}

export default drop
export const FUNCTION = drop
export const ARITY = 2
export const SIGNATURE = ["number", "Array", "Array"]
