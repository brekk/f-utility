import test from 'ava'
import {split, trim, trimmer} from '../../src/fp/string'

test(`string.split must be an fp version of str.prototype.split`, (t) => {
  const delim = `,`
  const input = `a,b,c`
  t.plan(3)
  t.is(typeof split, `function`)
  const partial = split(delim)
  t.is(typeof partial, `function`)
  const output = partial(input)
  t.deepEqual(output, `abc`.split(``))
})

test(`string.trim must be an fp version of str.prototype.trim`, (t) => {
  const input = `   a    `
  t.plan(2)
  t.is(typeof trim, `function`)
  const output = trim(input)
  t.is(output, `a`)
})

test(`string.trimmer must be mapped form of string.trim`, (t) => {
  const input = [`   a    `, `   b`, `  c      `, `d    `]
  t.plan(2)
  t.is(typeof trimmer, `function`)
  const output = trimmer(input)
  t.deepEqual(output, `abcd`.split(``))
})
