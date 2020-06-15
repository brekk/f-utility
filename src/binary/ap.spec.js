import exam from "$build/tester"
exam("ap", F => () => {
  const aa = [F.toUpper, F.toLower, z => F.toUpper(z[0]) + z.substr(1)]
  const bb = ["cool", "shit"]
  expect(F.ap(aa, bb)).toEqual(["COOL", "SHIT", "cool", "shit", "Cool", "Shit"])
  expect(() => F.ap(aa, undefined)).toThrow(
    "Expected to receive an array of functions and an array of values."
  )
  expect(() => F.ap([], bb)).toThrow(
    "Expected to receive an array of functions to apply."
  )
  expect(F.ap(F.concat, F.toLower)("cOOl")).toEqual("cOOlcool")
})

