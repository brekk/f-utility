test("not", () => {
  expect(F.not(true)).toBeFalsy()
  expect(F.not(false)).toBeTruthy()
})
