import exam from '$build/tester'

exam("jam", F => () => {
  expect(F.mergeRight({ a: 1, b: 2 }, { b: 1 })).toEqual({ a: 1, b: 2 })
  expect(F.mergeRight({ a: 1, b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})
