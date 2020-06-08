import makeIterable from "../helpers/iterable"
function makeSymmetricDifference({ curryN }) {
  return curryN(ARITY, function symmetricDifference(aa, bb) {
    const aLoop = makeIterable(aa)
    const bLoop = makeIterable(bb)
    const notBoth = []
    let idxA = 0
    while (idxA < aLoop.length) {
      const { value } = aLoop.iterate(idxA)
      if (!bb.includes(value)) notBoth.push(value)
      idxA += 1
    }
    let idxB = 0
    while (idxB < bLoop.length) {
      const { value } = bLoop.iterate(idxB)
      if (!aa.includes(value)) notBoth.push(value)
      idxB += 1
    }
    return notBoth
  })
}

export default makeSymmetricDifference
export const GET_FUNCTION = makeSymmetricDifference
export const ARITY = 2
export const SIGNATURE = ["Array", "Array", "Array"]
