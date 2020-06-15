function makeIfElseDerivatives({ ifElse, identity, $ }) {
  return { when: ifElse($, $, identity), unless: ifElse($, identity) }
}
export default makeIfElseDerivatives
export const GET_FUNCTION = makeIfElseDerivatives
export const ARITY = 3
export const SIGNATURE = ["function", "function", "any", "any"]
