import exam from "$build/tester"
exam("nth", F => () => {
  const THE_LIST = "abcdef".split("")
  expect(F.nth(1, THE_LIST)).toEqual("b")
  expect(F.nth(-1, THE_LIST)).toEqual("f")
  expect(F.nth(-2, THE_LIST)).toEqual("e")
  expect(F.nth(2, THE_LIST)).toEqual("c")
  expect(F.nth(100, THE_LIST)).toBeFalsy()
})
