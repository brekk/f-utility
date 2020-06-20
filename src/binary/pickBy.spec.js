import exam from "$build/tester"

exam("pickBy", F => () => {
  const out = F.pickBy((v, k) => k.indexOf("__") === 0, {
    __a: 1,
    b: 2,
    __c: 3,
    d: 4,
    __d: 5
  })
  expect(out).toEqual({ __a: 1, __c: 3, __d: 5 })
})
