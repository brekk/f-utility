import exam from "$build/tester"

exam("endsWith", F => () => {
  function Ender(v) {
    this._value = v
    this.endsWith = () => true
    return this
  }
  // needed because we can't test with strings b/c of delegation
  function NoEnder(v) {
    this._value = [v]
    this.length = this._value.length
    this[0] = this._value[0]
    return this
  }
  expect(F.endsWith("x", "tax")).toBeTruthy()
  expect(F.endsWith("x", "pay")).toBeFalsy()
  expect(F.endsWith("x", new Ender("cool"))).toBeTruthy()
  expect(F.endsWith("x", new NoEnder("x"))).toBeTruthy()
})
