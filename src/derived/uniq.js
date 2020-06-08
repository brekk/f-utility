function makeUniq({ reduce }) {
  return reduce(function unique(agg, xx) {
    return !agg.includes(xx) ? agg.concat(xx) : agg
  }, [])
}

export default makeUniq
export const GET_FUNCTION = makeUniq
export const ARITY = 1
export const SIGNATURE = ["Array", "Array"]
