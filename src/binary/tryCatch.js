export function tryCatch(tryer, catcher) {
  return function safetyCatch() {
    try {
      return tryer.apply(null, arguments)
    } catch (e) {
      return catcher(e)
    }
  }
}

export default tryCatch
export const FUNCTION = tryCatch
export const ARITY = 2
export const SIGNATURE = ["function", "function", "function"]
