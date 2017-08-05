import test from 'ava'
import {I} from 'katsu-curry'
import {chain} from './chain'

test(`chain`, (t) => {
  t.is(typeof chain, `function`)
  t.is(typeof chain(I), `function`)
  const double = (x) => x.map((y) => y * 2)
  const split = (x) => x.split(``)
  const flatSplit = chain(split)
  const flatDouble = chain(double)
  const nine = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8, 9]
  ]
  const nested = [
    `alpha`,
    `beta`,
    `gamma`,
    `omega`,
    `whatever`
  ]
  t.deepEqual(flatSplit(nested), `alphabetagammaomegawhatever`.split(``))
  t.deepEqual(flatDouble(nine), [2, 4, 6, 8, 10, 12, 14, 16, 18])
})
