import memoizeWith from "../memoize-with"
import C from "../constants"
const { __of__ } = C
const memo = memoizeWith(x => x)

export const typeChild = memo(x => {
  const oof = x.indexOf(__of__)
  return oof > -1 ? x.slice(oof + 1) : x
})
export default typeChild
