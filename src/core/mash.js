export function mash(a, b) {
  return Object.assign({}, a, b)
}

export default mash
export const FUNCTION = mash
export const ARITY = 2
export const SIGNATURE = ["object", "object", "object"]
