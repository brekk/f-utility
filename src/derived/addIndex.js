function makeAddIndex({ curryN }) {
  return function addIndex(fn) {
    return curryN(fn.length, function indexAddedIter() {
      let idx = 0
      const args = [].slice.call(arguments, 0)
      const [origFn] = args
      const list = args[args.length - 1]
      args[0] = function indexAdded() {
        const result = origFn.apply(
          this,
          [].concat([].slice.call(arguments, 0)).concat([idx, list])
        )
        idx += 1
        return result
      }
      return fn.apply(this, args)
    })
  }
}
export default makeAddIndex

export const GET_FUNCTION = makeAddIndex
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
