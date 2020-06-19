export function once(fn) {
  let run = false
  let saved
  return function oneTime() {
    if (!run) {
      saved = fn.apply(null, arguments)
      return saved
    }
    return saved
  }
}

export default once
export const FUNCTION = once
export const ARITY = 1
export const SIGNATURE = ["function", "function"]
