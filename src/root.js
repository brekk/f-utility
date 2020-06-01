import C from "./constants"
import { jam } from "./basic"
import { category } from "./define"
const { $ } = C

export function DEFAULT_PLACEHOLDER_TEST(x) {
  return x === $
}

export function fabricate(config) {
  const { test = DEFAULT_PLACEHOLDER_TEST } = config
  const def = category(test)
  const curry = def(jam({ n: false, check: false }, config))
  const curryN = curry(function _curryN(nn, fn) {
    return def(jam({ n: nn, check: false }, config))(fn)
  })
  return { def, curry, curryN }
}
export default fabricate(DEFAULT_PLACEHOLDER_TEST)
