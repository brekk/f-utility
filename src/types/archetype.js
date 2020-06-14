import ARCHETYPES from "./archetypes"
import C from "$core/constants"
const { UNION_TYPE_DELIMITER: U, __of__ } = C
export function unionArchetype(recurse) {
  return function arch(tt) {
    if (tt && tt.indexOf && tt.indexOf(U) > -1 && recurse) {
      return tt.split(U).map(z => unionArchetype(false)(z))
    }
    const match = ARCHETYPES[tt]
    if (match) return match
    if (tt[0].toUpperCase() === tt[0]) return `${tt}${__of__}object`
    return tt
  }
}
export const archetype = unionArchetype(true)

export default archetype
