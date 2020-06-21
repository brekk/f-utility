import C from "$core/constants"
function makePathOrDerivatives({
  equals,
  is,
  curryN,
  complement,
  isUnmatched,
  pipe,
  pathOr
}) {
  // pathOr => {hasPath, path, pathEq, pathSatisfies, pathIs}
  // propOr => {hasProp, prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    const run = acc(C.UNMATCHED)
    return {
      hasAcc: curryN(2, function hasProperty(ks, src) {
        return pipe(run(ks), complement(isUnmatched))(src)
      }),
      accIs: curryN(3, function pathIsOfConstructor(J, ks, src) {
        return pipe(run(ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: curryN(3, function equivalence(ks, ex, src) {
        return pipe(run(ks), equals(ex))(src)
      }),
      satisfies: curryN(3, function satisfaction(fn, ks, src) {
        return pipe(run(ks), fn, Boolean)(src)
      })
    }
  }
  const {
    hasAcc: hasPath,
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr)
  const propOr = curryN(3, function _propOr(dd, key, source) {
    return pathOr(dd, [key], source)
  })
  const {
    hasAcc: hasProp,
    unsafe: prop,
    eq: propEq,
    satisfies: propSatisfies,
    accIs: propIs
  } = deriveFromAccessor(propOr)
  return {
    hasPath,
    path,
    pathEq,
    pathSatisfies,
    pathIs,
    hasProp,
    propOr,
    prop,
    propEq,
    propSatisfies,
    propIs
  }
}
export default makePathOrDerivatives
