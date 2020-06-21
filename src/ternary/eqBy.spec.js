import exam from "$build/tester"
/* eslint-disable func-style */
exam("eqBy", F => () => {
  const equality = F.eqBy((x, y) => x % 2 === 0 && y % 2 !== 0)
  expect(equality(2, 3)).toBeTruthy()
  expect(equality(2, 2)).toBeFalsy()
})
