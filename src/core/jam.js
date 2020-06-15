export function jam(a, b) {
  return Object.assign({}, b, a)
}

export default jam
export const FUNCTION = jam
export const ARITY = 2
export const SIGNATURE = ["object", "object", "object"]
