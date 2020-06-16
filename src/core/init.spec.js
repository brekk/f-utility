import exam from "$build/tester"

exam("init", F => () => {
  expect(F.init("banana".split(""))).toEqual("banan".split(""))
})
