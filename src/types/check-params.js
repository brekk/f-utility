import makeChecker from "./makeChecker"

export function checkParamsWith(checker) {
  return function checkParams(signature, given) {
    const checked = makeChecker(checker)(signature, given)
    return !checked.failures
  }
}

export default checkParamsWith
