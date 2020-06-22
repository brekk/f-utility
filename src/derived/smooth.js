export function makeSmooth({ filter }) {
  return function smooth(x) {
    return filter(Boolean, x)
  }
}
export default makeSmooth
export const GET_FUNCTION = makeSmooth
export const ARITY = 1
export const SIGNATURE = ["object", "any"]
