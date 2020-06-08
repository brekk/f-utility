function makeWhen({ ifElse, identity, $ }) {
  return ifElse($, $, identity)
}
export default makeWhen
export const GET_FUNCTION = makeWhen
export const ARITY = 3
export const SIGNATURE = ["function", "function", "any", "any"]
