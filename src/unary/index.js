import makeAddIndex from "./addIndex"
import makeFlip from "./flip"

function extendUnary(F) {
  const addIndex = makeAddIndex(F)
  const flip = makeFlip(F)
  return F.mash(F, { addIndex, flip })
}

export default extendUnary
