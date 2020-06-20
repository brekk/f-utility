import exam from "$build/tester"

exam("empty", F => () => {
  expect(F.empty({ a: 1 })).toEqual({})
  expect(F.empty("banana")).toEqual("")
  expect(F.empty("cool".split(""))).toEqual([])
})
exam("empty - delegatee", F => () => {
  function Emptyable(x) {
    this.coolValue = x
    this.empty = () => "soEmpty"
    return this
  }
  // Emptyable.prototype.empty = () => "so empty inside"
  expect(F.empty(new Emptyable("but full flavor"))).toEqual("soEmpty")
})
