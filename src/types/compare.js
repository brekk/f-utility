import memoizeWith from "$core/memoize-with"
import separateUnionTypes from "./union"
import typeParent from "./constructor"
import typeChild from "./typeof"

const memo = memoizeWith(x => x)
export const compareTypes = memo(function _compareTypes(exp, given) {
  const [expectedUnion, givenUnion] = [exp, given].map(separateUnionTypes)
  const expectedHasUnions = expectedUnion.length > 1
  const givenHasUnions = givenUnion.length > 1
  const comparisons = expectedUnion.map(typeA =>
    givenUnion.map(
      typeB =>
        // any
        typeA === "any" ||
        typeB === "any" ||
        // exact
        typeA === typeB ||
        // 'Number∋number' || 'Number'
        typeParent(typeA) === typeParent(typeB) ||
        // 'Number∋number' === 'number'
        typeChild(typeA) === typeChild(typeB)
    )
  )
  const noUnionComparisons = comparisons.reduce(
    (all, nextCase) => all.concat(nextCase.filter(z => !z).length === 0),
    []
  )

  const out = noUnionComparisons.filter(Boolean)

  if (!expectedHasUnions && !givenHasUnions) {
    return out.length > 0
  }
  const anyValid = comparisons
    .reduce((a, b) => a.concat(b), [])
    .reduce((xx, cc) => xx || cc, false)
  return anyValid
})
export default compareTypes
