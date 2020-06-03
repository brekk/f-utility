export function fromPairs(ps) {
  return ps.reduce(function pairing(oo, [ke, va]) {
    return Object.assign({}, oo, { [ke]: va })
  }, {})
}

export default fromPairs
export const FUNCTION = fromPairs
export const ARITY = 1
export const SIGNATURE = ["Array", "object"]
