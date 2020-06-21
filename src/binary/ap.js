import { isFunction, isArray } from "$types/index"

function ap(aa, bb) {
  // S combinator
  if (isFunction(aa) && isFunction(bb)) {
    return function sCombinator(x) {
      return aa(x, bb(x))
    }
  }
  if (!isArray(aa) || !isArray(bb))
    throw new TypeError(
      "Expected to receive an array of functions and an array of values."
    )
  if (!aa.length || aa.filter(isFunction).length !== aa.length)
    throw new TypeError("Expected to receive an array of functions to apply.")
  return aa.reduce(function apReduce(out, fn) {
    return out.concat(bb.map(x => fn(x)))
  }, [])
}

export const FUNCTION = ap
export const ARITY = 2
export const SIGNATURE = ["function|Array", "function|Array", "function|Array"]
