/* global test */
import {t} from 'germs'
import {
  charAt,
  codePointAt,
  endsWith,
  indexOf,
  lastIndexOf,
  match,
  padEnd,
  padStart,
  repeat,
  replace,
  search,
  split,
  startsWith,
  substr,
  trim
} from './string'

test(`trim`, () => {
  t.is(trim(` cooool `), `cooool`)
})
test(`split`, () => {
  t.deepEqual(split(``, `abcde`), `abcde`.split(``))
})
test(`replace`, () => {
  t.is(replace(/a/g, `butts`, `alphabet`), `buttslphbuttsbet`)
})
test(`charAt`, () => {
  t.is(typeof charAt, `function`)
  t.is(charAt(2, `abc`), `c`)
})
test(`codePointAt`, () => {
  t.is(typeof codePointAt, `function`)
  t.is(codePointAt(0, `b`), 98)
})
test(`endsWith`, () => {
  t.is(typeof endsWith, `function`)
  t.true(endsWith(`x`, `box`))
  t.false(endsWith(`x`, `oxen`))
})
test(`indexOf`, () => {
  t.is(typeof indexOf, `function`)
  t.is(indexOf(`x`, `box`), 2)
  t.is(indexOf(`x`, `zardoz`), -1)
})
test(`lastIndexOf`, () => {
  t.is(typeof lastIndexOf, `function`)
  t.is(lastIndexOf(`t`, `butts`), 3)
  t.is(lastIndexOf(`x`, `butts`), -1)
})
test(`match`, () => {
  t.is(typeof match, `function`)
  t.is(match(/x/, `butts`), null)
  const weirdThing = [ `t` ]
  weirdThing.index = 2
  weirdThing.input = `butts`
  t.deepEqual(match(/t/, `butts`), weirdThing)
})
if (``.padEnd) {
  test(`padEnd`, () => {
    t.is(typeof padEnd, `function`)
    t.is(padEnd(4, `x`, `y`), `yxxx`)
  })
  test(`padStart`, () => {
    t.is(typeof padStart, `function`)
    t.is(padStart(4, `x`, `y`), `xxxy`)
  })
}
test(`repeat`, () => {
  t.is(typeof repeat, `function`)
  t.is(repeat(3, `x`, ``), `xxx`)
})
test(`replace`, () => {
  t.is(typeof replace, `function`)
  t.is(replace(/t/, `x`, `butts`), `buxts`)
  t.is(replace(/t/g, `x`, `butts`), `buxxs`)
})
test(`search`, () => {
  t.is(typeof search, `function`)
  t.is(search(/t/, `butts`), 2)
  t.is(search(/t/, `bugs`), -1)
})
test(`startsWith`, () => {
  t.is(typeof startsWith, `function`)
  t.true(startsWith(`b`, `butts`))
  t.false(startsWith(`b`, `no butts`))
})
test(`substr`, () => {
  t.is(typeof substr, `function`)
  t.is(substr(0, undefined, `cool`), `cool`)
  t.is(substr(2, 1, `abcd`), `c`)
})
