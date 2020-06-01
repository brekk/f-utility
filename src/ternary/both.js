function both(aPred, bPred, x) {
  return aPred(x) && bPred(x)
}
export const FUNCTION = both
export const ARITY = 3
export const SIGNATURE = ["function", "function", "any", "boolean"]
