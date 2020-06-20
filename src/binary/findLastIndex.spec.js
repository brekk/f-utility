import exam from "$build/tester"
/* eslint-disable func-style */
exam("findLastIndex", F => () => {
  const input = "yes.no.cool.what.dope.no".split(".")
  expect(F.findLastIndex(x => x === "cool")(input)).toEqual(2)
  expect(F.findLastIndex(x => x === "wah")(input)).toEqual(-1)
  expect(F.findLastIndex(x => x === "no")(input)).toEqual(5)
})
