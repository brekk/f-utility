import { isFunction } from "$types/index"

export function take(nn, xx) {
  if (xx && isFunction(xx.take)) return xx.take(nn)
  return xx.slice(0, nn)
}

export default take
export const FUNCTION = take
export const ARITY = 2
export const SIGNATURE = ["number", "object|string", "object|string"]
