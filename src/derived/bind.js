export function makeBind({ curryN }) {
  return curryN(2, function bind(fn, _this) {
    function bound() {
      return fn.apply(_this, arguments)
    }
    return fn.length > 1 ? curryN(fn.length, bound) : bound
  })
}

export default makeBind
export const GET_FUNCTION = makeBind
export const ARITY = 2
export const SIGNATURE = ["function", "object", "function"]
