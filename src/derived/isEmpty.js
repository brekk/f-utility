export function makeIsEmpty({
  equals,
  empty,
  isArray,
  isRawObject,
  keys,
  length,
  pipe
}) {
  return function isEmpty(xx) {
    const matched = empty(xx)
    if (typeof matched === "undefined") return false
    return isArray(xx)
      ? xx.length === 0
      : isRawObject(xx)
      ? pipe(keys, length)(xx) === 0
      : equals(matched, xx)
  }
}
export default makeIsEmpty
export const GET_FUNCTION = makeIsEmpty
export const ARITY = 1
export const SIGNATURE = ["any", "boolean"]
