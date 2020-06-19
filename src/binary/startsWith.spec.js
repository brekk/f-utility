import exam from "$build/tester"

exam("startsWith", F => () => {
  function Starter(v) {
    this._value = v
    this.startsWith = () => true
    return this
  }
  // needed because we can't test with strings b/c of delegation
  function NoStarter(v) {
    this._value = [v]
    this.length = this._value.length
    this[0] = this._value[0]
    return this
  }
  expect(F.startsWith("x", "xylophone")).toBeTruthy()
  expect(F.startsWith("x", "zzyzx")).toBeFalsy()
  expect(F.startsWith("x", new Starter("cool"))).toBeTruthy()
  expect(F.startsWith("x", new NoStarter("x"))).toBeTruthy()
})
