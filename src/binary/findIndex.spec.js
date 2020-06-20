import exam from "$build/tester"
/* eslint-disable func-style */
exam("findIndex", F => () => {
  const input = "yes.no.cool.what.dope.no".split(".")
  expect(F.findIndex(x => x === "cool")(input)).toEqual(2)
  expect(F.findIndex(x => x === "wah")(input)).toEqual(-1)
  expect(F.findIndex(x => x === "no")(input)).toEqual(1)
})
