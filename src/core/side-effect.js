export function makeSideEffectsFromEnv(curry) {
  const sideEffect = curry(function _sideEffect(fn, a) {
    fn(a)
    return a
  })
  const binarySideEffect = curry(function _binarySideEffect(fn, a, b) {
    fn(a, b)
    return b
  })
  const trace = binarySideEffect(console.log)
  const inspect = curry(function _inspect(fn, look, tag, x) {
    fn(tag, look(x))
    return x
  })
  return { sideEffect, binarySideEffect, trace, inspect }
}
export default makeSideEffectsFromEnv
