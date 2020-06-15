import exam from "$build/tester"

exam("keys", F => () => {
  expect(F.keys({ a: 1, b: 2, c: 3 })).toEqual("abc".split(""))
})
