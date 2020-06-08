import C from "../constants"
function makePathOrDerivatives({ equals, is, curryN, pipe, pathOr }) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    return {
      accIs: curryN(3, function pathIsOfConstructor(J, ks, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          is(J)
        )(src)
      }),
      unsafe: acc(null),
      eq: curryN(3, function equivalence(ks, ex, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          equals(ex)
        )(src)
      }),
      satisfies: curryN(3, function satisfaction(fn, ks, src) {
        return pipe(
          acc(C.UNMATCHED, ks),
          fn,
          Boolean
        )(src)
      })
    }
  }
  const {
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr)
  const propOr = curryN(3, function _propOr(dd, key, source) {
    return pathOr(dd, [key], source)
  })
  const {
    unsafe: prop,
    eq: propEq,
    satisfies: propSatisfies,
    accIs: propIs
  } = deriveFromAccessor(propOr)
  return {
    path,
    pathEq,
    pathSatisfies,
    pathIs,
    propOr,
    prop,
    propEq,
    propSatisfies,
    propIs
  }
}
export default makePathOrDerivatives
