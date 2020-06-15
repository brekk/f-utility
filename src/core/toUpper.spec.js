import exam from "$build/tester"

exam("toUpper / toLower", F => () => {
  expect(F.toUpper("WhAtEverman")).toEqual("WHATEVERMAN")
  expect(F.toLower("WhAtEverman")).toEqual("whateverman")
})
