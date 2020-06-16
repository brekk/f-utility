import exam from "$build/tester"

exam("tail", F => () => {
  expect(F.tail("banana".split(""))).toEqual("anana".split(""))
})
