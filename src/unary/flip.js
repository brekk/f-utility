function makeFlip({ curryN }) {
  return function flip(fn) {
    return curryN(2, function flipped(a, b) {
      return fn(b, a)
    })
  }
}
export default makeFlip
export const GET_FUNCTION = makeFlip
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
