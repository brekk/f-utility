export function memoizeWith(memoizer) {
  return function memoize(fn) {
    const saved = {}
    function memoized() {
      const args = Array.from(arguments)
      const mem = memoizer(args)
      if (mem && saved[mem]) return saved[mem]
      saved[mem] = fn.apply(null, args)
      return saved[mem]
    }
    return memoized
  }
}

export default memoizeWith
