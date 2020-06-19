export function makeLift({ liftN }) {
  return function lift(fn) {
    return fn.length > 1 ? fn : liftN(fn.length, fn)
  }
}

export default makeLift
export const GET_FUNCTION = makeLift
export const ARITY = 2
export const SIGNATURE = ["number", "function", "function"]
