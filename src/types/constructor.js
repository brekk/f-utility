import memoizeWith from "../memoize-with"
import C from "../constants"
const { __of__ } = C
const memo = memoizeWith(x => x)

export const constructor = memo(x => {
  const oof = x.indexOf(__of__)
  return oof > -1 ? x.slice(0, oof) : x
})

export default constructor
