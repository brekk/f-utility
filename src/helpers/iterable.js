import { length } from "../basic"

export function makeIterable(xx) {
  if (!xx)
    throw new TypeError(
      "Expected iterable initial value to be either an array or an object."
    )
  const len = length(xx)
  const isArray = Array.isArray(xx)
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
