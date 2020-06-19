export function makeLiftN({ curryN, reduce, ap, map }) {
  return curryN(2, function liftN(arity, fn) {
    const lifted = curryN(arity, fn)
    return curryN(arity, function liftedN() {
      const aa = arguments[0]
      const bz = Array.prototype.slice.call(arguments, 1)
      return reduce(ap, map(lifted, aa), bz)
    })
  })
}

export default makeLiftN
export const GET_FUNCTION = makeLiftN
export const ARITY = 2
export const SIGNATURE = ["number", "function", "function"]
