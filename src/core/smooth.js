export function smooth(x) {
  return x.filter(function identity(y) {
    return y
  })
}
export default smooth
export const FUNCTION = smooth
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
