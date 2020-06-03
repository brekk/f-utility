import makeTypechecker from "./makeChecker"
import compareType from "./compare"

export function checkReturnWith(checker) {
  return function checkReturn(outcome) {
    return function checkReturnTypeValidoutcomeAB(a, b) {
      const actual = checker(outcome)
      const expected = makeTypechecker(checker)(a, b).returnType
      return compareType(expected, actual)
    }
  }
}
export default checkReturnWith
