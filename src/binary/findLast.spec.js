import exam from "$build/tester"
/* eslint-disable func-style */
exam("findLast", F => () => {
  const input = "yes.no?.cool.what.dope.no!".split(".")
  expect(F.findLast(F.includes("cool"))(input)).toEqual("cool")
  expect(F.findLast(F.includes("no"))(input)).toEqual("no!")
})
