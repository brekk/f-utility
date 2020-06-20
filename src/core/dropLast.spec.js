import exam from "$build/tester"
/* eslint-disable func-style */
exam("dropLast", F => () => {
  expect(F.dropLast(3, "banana".split(""))).toEqual("ban".split(""))
  function DropLaster() {
    this.dropLast = () => "greedy"
    return this
  }
  expect(F.dropLast(2, new DropLaster())).toEqual("greedy")
})
