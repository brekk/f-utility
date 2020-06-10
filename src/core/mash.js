export function mash(a, b) {
  return Object.assign({}, a, b)
}

export default mash
export const FUNCTION = mash
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
