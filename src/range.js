import {curry} from 'katsu-curry'

export const 𝘍range = (start, end) => {
  const agg = []
  const swap = start < end
  const [a, b] = (swap ? [start, end] : [end + 1, start + 1])
  for (let x = a; x < b; x++) {
    agg.push(x)
  }
  // return agg
  return (swap ? agg : agg.reverse())
}
export const range = curry(𝘍range)
