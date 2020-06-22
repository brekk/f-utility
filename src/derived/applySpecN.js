export function makeApplySpecN({ isFunction, keys, curryN, apply }) {
  function mapper(fn, xx) {
    if (!xx) return
    return keys(xx).reduce((agg, k) => {
      agg[k] = fn(xx[k])
      return agg
    }, {})
  }
  return curryN(2, function applySpecN(givenArity, spec) {
    const applied = mapper(
      v => (isFunction(v) ? v : applySpecN(givenArity, v)),
      spec
    )
    return curryN(givenArity, function specificationApplication() {
      const args = Array.from(arguments)
      return mapper(f => apply(f, args), applied)
    })
  })
}

export default makeApplySpecN
export const GET_FUNCTION = makeApplySpecN
export const ARITY = 2
export const SIGNATURE = ["number", "object", "function"]
