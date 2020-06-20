import exam from "$build/tester"

exam("lastIndexOf", F => () => {
  expect(F.lastIndexOf("a", "banana".split(""))).toEqual(5)
  expect(F.lastIndexOf("x", "banana".split(""))).toEqual(-1)
})
