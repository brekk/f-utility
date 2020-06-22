import { FUNCTION as ifElse, SIGNATURE as 𝒮ifElse } from "./ifElse"

const QUATERNARY_WITH_SIGNATURES = [[𝒮ifElse, ifElse]]

export function extendQuaternaryWithSignatures(F) {
  return F.weld(
    F,
    QUATERNARY_WITH_SIGNATURES.reduce((agg, [hm, fn]) => {
      return F.mash(agg, { [fn.name]: F.def({ n: 4, check: true, hm })(fn) })
    }, {})
  )
}

export default extendQuaternaryWithSignatures
