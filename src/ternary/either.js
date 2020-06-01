function either(aPred, bPred, x) {
  return aPred(x) || bPred(x)
}
export const FUNCTION = either
export const ARITY = 3
export const SIGNATURE = ["function", "function", "any"]
