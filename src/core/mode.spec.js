import exam from "$build/tester"

exam("mode", F => () => {
  expect(F.mode([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(1)
  expect(F.mode([1, 2, 3, 4, 5, 5, 6, 7, 8, 9])).toEqual(5)
  expect(F.mode("banana".split(""))).toEqual("a")
})
