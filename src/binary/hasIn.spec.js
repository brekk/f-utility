import exam from "$build/tester"

exam("hasIn", F => () => {
  function Shape() {}
  Shape.prototype.cool = () => {}
  expect(F.hasIn("cool", new Shape())).toBeTruthy()
  expect(F.hasIn("not cool", new Shape())).toBeFalsy()
})
