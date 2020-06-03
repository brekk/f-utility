import memoizeWith from "../memoize-with"
import separateUnionTypes from "./union"
import typeParent from "./constructor"
import typeChild from "./typeof"

const memo = memoizeWith(x => x)
export const compareTypes = memo(function _compareTypes(exp, given) {
  const [expectedUnion, givenUnion] = [exp, given].map(separateUnionTypes)
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
  const unionComparisons = comparisons.reduce(
    (all, nextCase) => all.concat(nextCase.filter(z => !z).length === 0),
    []
  )
  return unionComparisons.filter(z => !z).length === 0
})
export default compareTypes
