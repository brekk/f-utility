import {curry} from 'katsu-curry'

export const range = curry((start, end) => {
  const agg = []
  const swap = start < end
  const [a, b] = (swap ? [start, end] : [end + 1, start + 1])
  for (let x = a; x < b; x++) {
    agg.push(x)
  }
  // return agg
  return (swap ? agg : agg.reverse())
})
