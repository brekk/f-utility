import exam from "$build/tester"

exam("median", F => () => {
  expect(F.median([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(5)
  expect(F.median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(6)
})
