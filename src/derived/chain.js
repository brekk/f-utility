function makeChain({ curryN, map, pipe, reduce, concat }) {
  return curryN(ARITY, function chain(fn, xx) {
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    return pipe(map(fn), reduce(concat, []))(xx)
  })
}

export default makeChain
export const GET_FUNCTION = makeChain
export const ARITY = 2
export const SIGNATURE = ["function", "function|Array|object", "function|Array"]
