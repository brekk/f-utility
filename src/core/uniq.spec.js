import exam from "$build/tester"
exam("uniq", F => () => {
  expect(F.uniq("bananasplitfiresunday".split(""))).toEqual(
    "bansplitfreudy".split("")
  )
})
