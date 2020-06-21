import exam from "$build/tester"
/* eslint-disable func-style */
exam("groupBy", F => () => {
  const grader = F.groupBy(({ grade }) =>
    grade > 90
      ? "A"
      : grade > 80
      ? "B"
      : grade > 70
      ? "C"
      : grade > 60
      ? "D"
      : "F"
  )
  const classOf2020 = [
    { name: "alice", grade: 100 },
    { name: "bob", grade: 98 },
    { name: "cedric", grade: 92 },
    { name: "davis", grade: 89 },
    { name: "eugenia", grade: 85 },
    { name: "francis", grade: 83 },
    { name: "garbage george", grade: 3 },
    { name: "harriet", grade: 74 },
    { name: "ike", grade: 66 }
  ]
  expect(grader(classOf2020)).toEqual({
    A: [
      { grade: 100, name: "alice" },
      { grade: 98, name: "bob" },
      { grade: 92, name: "cedric" }
    ],
    B: [
      { grade: 89, name: "davis" },
      { grade: 85, name: "eugenia" },
      { grade: 83, name: "francis" }
    ],
    C: [{ grade: 74, name: "harriet" }],
    D: [{ grade: 66, name: "ike" }],
    F: [{ grade: 3, name: "garbage george" }]
  })
})
