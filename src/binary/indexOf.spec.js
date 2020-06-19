import exam from "$build/tester"

exam("indexOf", F => () => {
  expect(F.indexOf("a", "banana".split(""))).toEqual(1)
  expect(F.indexOf("x", "banana".split(""))).toEqual(-1)
})
