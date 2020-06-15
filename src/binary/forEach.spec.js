import exam from "$build/tester"
exam("forEach", F => done => {
  let jam = []
  F.forEach(() => jam.push("cool"), [0, 1, 2])
  expect(jam).toEqual("cool.cool.cool".split("."))
  done()
})
