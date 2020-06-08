function ifElse(condition, yes, no, xx) {
  return condition(xx) ? yes(xx) : no(xx)
}

export const FUNCTION = ifElse
export const ARITY = 4
export const SIGNATURE = ["function", "function", "function", "any", "any"]
