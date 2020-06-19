export function makeIsEmpty({ equals, empty }) {
  return function isEmpty(xx) {
    return equals(empty(xx), xx)
  }
}
export default makeIsEmpty
export const GET_FUNCTION = makeIsEmpty
export const ARITY = 1
export const SIGNATURE = ["any", "boolean"]
