import exam from "$build/tester"

exam("innerJoin", F => () => {
  const outcome = F.innerJoin(
    (record, id) => record.id === id,
    [
      { id: 101, name: "Kumail" },
      { id: 202, name: "Martin" },
      { id: 303, name: "Jimmy" }
    ],
    [101, 303]
  )
  expect(outcome).toEqual([
    { id: 101, name: "Kumail" },
    { id: 303, name: "Jimmy" }
  ])
})
