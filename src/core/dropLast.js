import { isFunction } from "$types/index"

export function dropLast(xx, src) {
  if (src && isFunction(src.dropLast)) {
    return src.dropLast(xx)
  }
  return src.slice(0, src.length - xx)
}

export default dropLast
export const FUNCTION = dropLast
export const ARITY = 2
export const SIGNATURE = ["number", "Array", "Array"]
