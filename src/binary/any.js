import { length } from "$core/length"
function any(fn, xx) {
  let idx = 0
  let found = false
  const len = length(xx)
  while (idx < len && !found) {
    if (fn(xx[idx])) found = true
    idx += 1
  }
  return found
}

export const FUNCTION = any
export const ARITY = 2
export const SIGNATURE = ["function", "array|object", "boolean"]
