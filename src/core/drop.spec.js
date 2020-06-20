import exam from "$build/tester"
/* eslint-disable func-style */
exam("drop", F => () => {
  expect(F.drop(3, "banana".split(""))).toEqual("ana".split(""))
  function Dropper() {
    this.drop = () => "Dropper"
    return this
  }
  expect(F.drop(2, new Dropper())).toEqual("Dropper")
})
