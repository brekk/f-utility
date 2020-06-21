import exam from "$build/tester"
/* eslint-disable func-style */
exam("eqProps", F => () => {
  const jimmy = {
    likes: "birds",
    name: "jimmy",
    hates: "water"
  }
  const birdy = {
    likes: "birds",
    name: "birdy",
    hates: "predators"
  }
  const salazar = {
    hates: "water",
    likes: "fire",
    name: "salazar"
  }
  expect(F.eqProps("likes")(jimmy, birdy)).toBeTruthy()
  expect(F.eqProps("hates")(jimmy, salazar)).toBeTruthy()
  expect(F.eqProps("hates")(jimmy, birdy)).toBeFalsy()
})
