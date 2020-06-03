import { length } from "../core/length"

export function makeIterable(xx) {
  const isArray = Array.isArray(xx)
  const isObject = xx && typeof xx === "object"
  if (!isArray && !isObject) {
    throw new TypeError(
      "Expected iterable initial value to be either an array or an object."
    )
  }
  const len = length(xx)
  const init = isArray ? Array(len) : {}
  const xKeys = !isArray && Object.keys(xx)
  return {
    length: len,
    iterate: function iterate(idx) {
      const key = isArray ? idx : xKeys[idx]
      return { key, value: xx[key] }
    },
    init,
    isArray
  }
}

export default makeIterable
