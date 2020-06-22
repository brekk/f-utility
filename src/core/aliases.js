export function makeAliases(F) {
  return F.weld(F, {
    I: F.identity,
    K: F.constant,
    PLACEHOLDER: F.$,
    __: F.$,
    always: F.constant,
    entries: F.toPairs,
    every: F.all,
    fromEntries: F.fromPairs,
    merge: F.mash,
    mergeAll: F.smash,
    mergeRight: F.jam,
    sideEffect2: F.binarySideEffect,
    some: F.any,
    sortBy: F.sort,
    tap: F.sideEffect,
    head: F.first,
    of: F.box
  })
}

export default makeAliases
