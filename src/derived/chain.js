function makeChain({ curryN, map, pipe, reduce, concat }) {
  // chain maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries.
  return curryN(ARITY, function chain(fn, xx) {
    // Dispatches to the chain method of the second argument, if present, according to the FantasyLand Chain spec.
    if (xx && typeof xx.chain === "function") return xx.chain(fn)
    // If second argument is a function, chain(f, g)(x) is equivalent to f(g(x), x).
    if (typeof xx === "function") return yy => fn(xx(yy), yy)
    // (skipping this for now) Acts as a transducer if a transformer is given in list position.
    return pipe(
      map(fn),
      reduce(concat, [])
    )(xx)
  })
}

export default makeChain
export const GET_FUNCTION = makeChain
export const ARITY = 2
export const SIGNATURE = ["function", "function|Array|object", "Array"]
