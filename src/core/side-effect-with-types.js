export function makeSideEffectsFromEnvWithTypes(def) {
  const sideEffect = def({ check: true, hm: ["function", "any", "any"] })(
    function _sideEffect(fn, a) {
      fn(a)
      return a
    }
  )
  const binarySideEffect = def({
    check: true,
    hm: ["function", "any", "any", "any"]
  })(function _binarySideEffect(fn, a, b) {
    fn(a, b)
    return b
  })
  const trace = binarySideEffect(console.log)
  const inspect = def({
    check: true,
    hm: ["function", "function", "any", "any", "any"]
  })(function _inspect(fn, look, tag, x) {
    fn(tag, look(x))
    return x
  })
  return { sideEffect, binarySideEffect, trace, inspect }
}
export default makeSideEffectsFromEnvWithTypes
