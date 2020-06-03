export function pipe() {
  const fns = Array.from(arguments)
  const nonFuncs = fns.filter(z => typeof z !== "function")
  if (nonFuncs.length !== 0)
    throw new TypeError(
      `Expected to receive functions as arguments, but received: ${nonFuncs
        .map((a, i) => `[${i}] = ${a}`)
        .join(" ; ")}`
    )

  return function piped(x) {
    const len = fns.length
    let idx = 0
    let current = x 
    while (idx < len) {
    const fn = fns[idx]
    current = fn(current)
idx += 1
    }
    return current
    /*
    return fns.reduce(function aToB(prev, fn) {
      return fn(prev)
    }, x)
    */
  }
}

export default pipe
export const FUNCTION = pipe
export const ARITY = 'VARIADIC'
export const SIGNATURE = ['any', 'any']
