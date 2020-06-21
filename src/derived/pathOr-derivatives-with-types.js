import C from "$core/constants"
function makePathOrDerivatives({
  equals,
  is,
  def,
  pipe,
  pathOr,
  isUnmatched,
  complement
}) {
  // pathOr => {path, pathEq, pathSatisfies, pathIs}
  // propOr => {prop, propEq, propSatisfies, propIs}
  function deriveFromAccessor(acc) {
    const run = acc(C.UNMATCHED)
    return {
      hasAcc: def({ check: true, hm: ["Array|string", "object", "boolean"] })(
        function hasProperty(ks, src) {
          return pipe(run(ks), complement(isUnmatched))(src)
        }
      ),
      accIs: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function pathIsOfConstructor(J, ks, src) {
        return pipe(run(ks), is(J))(src)
      }),
      unsafe: acc(null),
      eq: def({
        check: true,
        hm: ["Array|string", "any", "object", "boolean"]
      })(function equivalence(ks, ex, src) {
        return pipe(run(ks), equals(ex))(src)
      }),
      satisfies: def({
        check: true,
        hm: ["function", "Array|string", "object", "boolean"]
      })(function satisfaction(fn, ks, src) {
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
  const propOr = def({
    check: true,
    hm: ["any", "number|string", "object", "any"]
  })(function _propOr(dd, key, source) {
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
    hasProp,
    hasPath,
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
