/* global test */
import {t} from './test-helpers'
import {pipe, curry, I} from 'katsu-curry'
import E from 'fantasy-eithers'
// import {$, sideEffect} from 'xtrace'
import {ap} from './ap'
import {fold} from './either'
import {map} from './map'

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
