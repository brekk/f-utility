import exam from "$build/tester"
exam("concat", F => () => {
  expect(F.concat(["a"], "b")).toEqual("ab".split(""))
})
