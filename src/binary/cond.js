import { length } from "$core/length"
function cond(conditions, input) {
  let idx = 0
  let found = false
  let match
  const len = length(conditions)
  while (idx < len && !found) {
    const [test, out] = conditions[idx]
    if (test(input)) {
      found = true
      match = out(input)
    }
    idx += 1
  }
  return match
}

export const FUNCTION = cond
export const ARITY = 2
export const SIGNATURE = ["array", "any", "any"]
