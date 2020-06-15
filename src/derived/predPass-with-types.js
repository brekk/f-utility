function makePredicatesPass({
  def,
  pipe,
  map,
  flip,
  any,
  all,
  smooth,
  length,
  gt
}) {
  function predFor(pred) {
    return def({ check: true, hm: ["Array", "Array", "boolean"] })(
      function predPass(preds, xx) {
        return pipe(map(flip(pred)(xx)), smooth, length, gt(0))(preds)
      }
    )
  }
  return { anyPass: predFor(any), allPass: predFor(all) }
}

export default makePredicatesPass
