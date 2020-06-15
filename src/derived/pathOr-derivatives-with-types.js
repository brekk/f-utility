import C from "$core/constants"
function makePathOrDerivatives({ equals, is, def, pipe, pathOr }) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    return {
      accIs: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function pathIsOfConstructor(J, ks, src) {
        return pipe(acc(C.UNMATCHED, ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: def({
        check: true,
        hm: ["Array|string", "any", "object", "boolean"]
      })(function equivalence(ks, ex, src) {
        return pipe(acc(C.UNMATCHED, ks), equals(ex))(src)
      }),
      satisfies: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function satisfaction(fn, ks, src) {
        return pipe(acc(C.UNMATCHED, ks), fn, Boolean)(src)
      })
    }
  }
  const {
    unsafe: path,
    eq: pathEq,
    satisfies: pathSatisfies,
    accIs: pathIs
  } = deriveFromAccessor(pathOr)
  const propOr = def({
    check: true,
    hm: ["any", "number|string", "object", "any"]
  })(function _propOr(dd, key, source) {
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
