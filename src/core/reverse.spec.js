import exam from "$build/tester"

exam("reverse", F => () => {
  expect(F.reverse("reverse".split(""))).toEqual("reverse".split("").reverse())
})
