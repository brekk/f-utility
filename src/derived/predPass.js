function makePredicatesPass({
  curryN,
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
    return curryN(2, function predPass(preds, xx) {
      return pipe(map(flip(pred)(xx)), smooth, length, gt(0))(preds)
    })
  }
  return { anyPass: predFor(any), allPass: predFor(all) }
}

export default makePredicatesPass
