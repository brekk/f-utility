export function jam(a, b) {
  return Object.assign({}, b, a)
}

export default jam
export const FUNCTION = jam
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
