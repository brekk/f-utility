import exam from "$build/tester"
exam("slice", F => () => {
  expect(F.slice(1, Infinity, "abcde".split(""))).toEqual("bcde".split(""))
})
