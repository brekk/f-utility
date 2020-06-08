function makeIsObject({ both, isRawObject }) {
  return function isObject(x) {
    return both(isRawObject, Boolean)(x)
  }
}

export default makeIsObject
export const GET_FUNCTION = makeIsObject
export const ARITY = 1
export const SIGNATURE = ["any", "boolean"]
