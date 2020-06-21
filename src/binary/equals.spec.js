import exam from "$build/tester"
exam("equals", F => () => {
  function Equaler(xx) {
    this.value = xx
    this.equals = a =>
      a instanceof Equaler ? this.value === a.value : this.value === a
    return this
  }
  expect(F.equals(123, 123)).toBeTruthy()
  expect(F.equals(321, 123)).toBeFalsy()
  expect(F.equals(new Equaler(22), new Equaler(22))).toBeTruthy()
})
