export function makeLift({ liftN }) {
  return function lift(fn) {
    return liftN(fn.length, fn)
  }
}

export default makeLift
export const GET_FUNCTION = makeLift
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
