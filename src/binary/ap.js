import { isFunction, isArray } from "$types/index"

function ap(a, b) {
  // S combinator
  if (isFunction(a) && isFunction(b)) {
    return function sCombinator(x) {
      return a(x, b(x))
    }
  }
  if (!isArray(a) || !isArray(b))
    throw new TypeError(
      "Expected to receive an array of functions and an array of values."
    )
  if (!a.length || a.filter(isFunction).length !== a.length)
    throw new TypeError("Expected to receive an array of functions to apply.")
  return a.reduce(function apReduce(out, fn) {
    return out.concat(b.map(fn))
  }, [])
}

export const FUNCTION = ap
export const ARITY = 2
export const SIGNATURE = ["function|Array", "function|Array", "function|Array"]
