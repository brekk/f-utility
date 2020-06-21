import exam from "$build/tester"
/* eslint-disable func-style */
exam("thunkify", F => done => {
  const theAnswerLater = F.thunkify(F.identity)(42)
  setTimeout(() => {
    expect(theAnswerLater()).toEqual(42)
    done()
  })
})
