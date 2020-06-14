import { FUNCTION as ifElse, SIGNATURE as 𝒮ifElse } from "./ifElse"

const QUATERNARY_WITH_SIGNATURES = [[𝒮ifElse, ifElse]]
export function extendQuaternaryWithSignatures(F) {
  const sign = F.map(([hm, fn]) => F.def({ n: 4, check: true, hm })(fn))
  const signed = sign(QUATERNARY_WITH_SIGNATURES)
  return F.mash(F, signed)
}

export default extendQuaternaryWithSignatures
