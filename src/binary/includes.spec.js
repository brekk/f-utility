import exam from "$build/tester"
/* eslint-disable func-style */
exam("includes", F => () => {
  expect(F.includes("cool")("cool.dope.sauce".split("."))).toBeTruthy()
  expect(F.includes("sauce")("cool.dope.sauce".split("."))).toBeTruthy()
  expect(F.includes("zibble", "cool.dope.sauce".split("."))).toBeFalsy()
  expect(F.includes("x", "cool.dope.sauce")).toBeFalsy()
  function IndexableButNotIncludable() {
    this.indexOf = () => 1
    return this
  }
  expect(F.includes("always")(new IndexableButNotIncludable())).toBeTruthy()
  function Whatever() {
    return this
  }
  expect(F.includes("never")(new Whatever())).toBeFalsy()
})
