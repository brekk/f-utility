/* global test */
import {pipe, curry, I} from 'katsu-curry'
import E from 'fantasy-eithers'
import {t} from 'germs'
// import {$, sideEffect} from 'xtrace'
import {ap} from './ap'
import {fold} from './either'
import {map} from './map'
import {add, multiply} from './math'

// const trace = sideEffect(console.log, $, (e) => e.r || e.l || e, $)

test(`ap should allow for inverted mapping`, () => {
  // const a = (b) => ({a: b})
  const abc = curry((a, b, c) => ({a, b, c}))
  const A = E.of(`alpha`)
  const B = E.of(`beta`)
  const C = E.of(`gamma`)
  const output = pipe(
    // trace(`input`),
    E.of,
    // trace(`Righted`),
    ap(A),
    // trace(`ap(A)`),
    ap(B),
    // trace(`ap(B)`),
    ap(C),
    // trace(`ap(C)`),
    map((x) => {
      x.d = `delta`
      return x
    }),
    fold(I, I)
  )(abc)
  t.deepEqual(output, {a: `alpha`, b: `beta`, c: `gamma`, d: `delta`})
})

test(`ap should apply list a functions to a list of values`, () => {
  const output = ap([multiply(3), add(6)], [1, 2, 3])
  t.deepEqual(output, [3, 6, 9, 7, 8, 9])
  const output2 = ap([(x) => x.toUpperCase(), (x) => x + ` battery`], `abc`.split(``))
  t.deepEqual(output2, [`A`, `B`, `C`, `a battery`, `b battery`, `c battery`]) // stutter
})
test(`ap should apply list a functions to a list of values`, () => {
  const output = ap([multiply(3), add(6)], [1, 2, 3])
  t.deepEqual(output, [3, 6, 9, 7, 8, 9])
  const output2 = ap([(x) => x.toUpperCase(), (x) => x + ` battery`], `abc`.split(``))
  t.deepEqual(output2, [`A`, `B`, `C`, `a battery`, `b battery`, `c battery`]) // stutter
  const output3 = ap(multiply, I)
  t.deepEqual(output3(2), 4)
})
