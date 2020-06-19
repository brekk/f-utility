export function makeThunkify({ curryN }) {
  return function thunkify(fn) {
    return curryN(fn.length, function think() {
      const args = arguments
      return function thank() {
        return fn.apply(this, args)
      }
    })
  }
}

export default makeThunkify
export const GET_FUNCTION = makeThunkify
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
