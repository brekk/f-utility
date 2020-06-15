import exam from "$build/tester"

exam("sort", F => () => {
  const items = [
    { name: "Alpha", value: 34 },
    { name: "Beta", value: 32 },
    { name: "Gamma", value: 45 },
    { name: "Delta", value: 200 },
    { name: "Delta", value: -100 },
    { name: "Delta", value: -12 }
  ]

  // sort by value
  const valSorted = F.sort((a, b) => a.value - b.value, items)
  expect(valSorted).toEqual([
    { name: "Delta", value: -100 },
    { name: "Delta", value: -12 },
    { name: "Beta", value: 32 },
    { name: "Alpha", value: 34 },
    { name: "Gamma", value: 45 },
    { name: "Delta", value: 200 }
  ])
})
exam("sort - alphabetic", F => () => {
  const items = [
    { name: "Gamma", value: 45 },
    { name: "Beta", value: 32 },
    { name: "Alpha", value: 34 },
    { name: "Delta", value: 200 },
    { name: "Delta", value: -100 },
    { name: "Delta", value: -12 }
  ]
  // sort by name
  const nameSorted = F.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  }, items)
  expect(nameSorted).toEqual([
    { name: "Alpha", value: 34 },
    { name: "Beta", value: 32 },
    { name: "Delta", value: 200 },
    { name: "Delta", value: -100 },
    { name: "Delta", value: -12 },
    { name: "Gamma", value: 45 }
  ])
})
