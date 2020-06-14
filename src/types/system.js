import C from "$core/constants"
const { __of__ } = C
export function system(z) {
  let constructor = (z && z.constructor && z.constructor.name) || "Global"
  let type = typeof z
  // deal with undefined / null
  // and the fact that z.constructor.name for boolean is currently Global
  if (!z) {
    if (type === "undefined" || type === "object") {
      type = "nil"
    } else {
      constructor = "Boolean"
    }
  }
  return `${constructor}${__of__}${type}`
}
export default system
