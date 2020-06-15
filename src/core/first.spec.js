
import exam from "$build/tester"

exam("first / last", F => () => {
  const cool = "abcdefghijk".split("")
  expect(F.first(cool)).toEqual("a")
  expect(F.last(cool)).toEqual("k")
})
