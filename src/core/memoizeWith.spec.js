import exam from '$build/tester'

exam("memoizeWith", F => () => {
  const lockbox = {}
  /* eslint-disable-next-line func-style */
  const triple = (a, b, c) => {
    const value = (a + b) / c
    lockbox[[a, b, c].join("-")] = value
    return value
  }
  const mTriple = F.memoizeWith(([o, t, h]) => `${o}-${t}-${h}`)(triple)
  expect(mTriple(1, 2, 3)).toEqual((1 + 2) / 3)
  expect(mTriple(2, 3, 4)).toEqual((2 + 3) / 4)
  expect(mTriple(1, 2, 3)).toEqual((1 + 2) / 3)
  expect(lockbox).toEqual({ "1-2-3": 1, "2-3-4": 5 / 4 })
})
