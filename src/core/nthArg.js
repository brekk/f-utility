export function nthArg(nn) {
  return function grabNth() {
    return arguments[nn]
  }
}

export default nthArg
export const FUNCTION = nthArg
export const ARITY = 1
export const SIGNATURE = ["number", "function"]
