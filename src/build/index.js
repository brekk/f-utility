import C from "../constants"
import { mash } from "../core/mash"
import { defineFunctionWithParameterTest } from "../define-function"
const { $ } = C

export function DEFAULT_PLACEHOLDER_TEST(x) {
  return x === $
}

export function fabricate(config) {
  const { test = DEFAULT_PLACEHOLDER_TEST } = config
  const def = defineFunctionWithParameterTest(test)
  const curry = def(mash(config, { n: false, check: false }))
  const curryN = curry(function _curryN(nn, fn) {
    return def(mash(config, { n: nn, check: false }))(fn)
  })
  return { def, curry, curryN }
}
export default fabricate(DEFAULT_PLACEHOLDER_TEST)
