import exam from "$build/tester"

exam("mean", F => () => {
  expect(F.mean([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5.5)
})
