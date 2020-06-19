export function regexTest(rg, str) {
  return str.test(rg)
}
export default regexTest
export const FUNCTION = regexTest
export const ARITY = 2
export const SIGNATURE = ["RegExp", "string", "boolean"]
