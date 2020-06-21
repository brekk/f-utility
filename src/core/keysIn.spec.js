import exam from "$build/tester"
/* eslint-disable func-style */
exam("keysIn", F => () => {
  function Cool() {
    this.cool = "cool"
    return this
  }
  function SoCool() {
    Cool.call(this)
    this.soCool = "sehr cool"
    return this
  }
  SoCool.prototype.constructor = Cool
  expect(F.keysIn(new SoCool())).toEqual(["cool", "soCool"])
})
