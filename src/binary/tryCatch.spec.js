import exam from "$build/tester"
/* eslint-disable func-style */
exam("tryCatch", F => () => {
  const thrower = () => {
    throw new Error("THROWEE")
  }
  const catcher = () => []
  expect(thrower).toThrow()
  expect(F.tryCatch(thrower, catcher)).not.toThrow()
  expect(F.tryCatch(thrower, catcher)()).toEqual([])
})
