export function makeAliases(F) {
  return F.mash(F, {
    __: F.$,
    I: F.identity,
    K: F.constant,
    always: F.constant,
    some: F.any,
    sideEffect2: F.binarySideEffect,
    merge: F.mash,
    mergeRight: F.jam
  })
}

export default makeAliases
