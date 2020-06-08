export function makeAliases(F) {
  return F.temper(F, {
    __: F.$,
    PLACEHOLDER: F.$,
    I: F.identity,
    K: F.constant,
    always: F.constant,
    some: F.any,
    sideEffect2: F.binarySideEffect,
    merge: F.mash,
    mergeRight: F.jam,
    entries: F.toPairs,
    fromEntries: F.fromPairs,
    every: F.all
  })
}

export default makeAliases
