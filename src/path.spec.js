/* global test */
import { t } from "jest-t-assert"

import {
  propIs,
  propEq,
  pathEq,
  pathSatisfies,
  propSatisfies,
  prop,
  propOr,
  path,
  pathOr
} from "./path"
import { word } from "./random-word"
import { floorMin } from "./random-floor"
import { equals } from "./math"

test(`prop should grab a property from an object or return null`, () => {
  const x = floorMin(1, 1e5)
  t.is(prop(`x`, { x }), x)
  const property = word(10)
  t.is(prop(property, { [property]: x }), x)
})

test(`propOr should grab a property from an object or return default`, () => {
  const x = floorMin(1, 1e5)
  const def = word(10)
  t.is(propOr(def, `x`, { x }), x)
  t.is(propOr(def, `x`, { y: x }), def)
})

test(`pathOr should grab a nested property from an object or return default`, () => {
  const z = floorMin(1, 1e5)
  const def = word(10)
  t.is(pathOr(def, `xyz`.split(``), { x: { y: { z } } }), z)
  t.is(pathOr(def, `xyz`.split(``), { x: { y: { butts: z } } }), def)
})

test(`path should grab a nested property from an object or return null`, () => {
  const z = floorMin(1, 1e5)
  t.is(path(`xyz`.split(``), { x: { y: { z } } }), z)
  t.is(path(`xyz`.split(``), { x: { y: { butts: z } } }), null)
})

test(`pathSatifies should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const isRandom = equals(rando)
  const pathSatifiesRandom = pathSatisfies(isRandom)
  t.truthy(pathSatifiesRandom(`xyz`.split(``), { x: { y: { z: rando } } }))
  t.falsy(pathSatifiesRandom(`xyz`.split(``), { x: { y: { z: 100 } } }))
})

test(`propSatifies should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const isRandom = equals(rando)
  const propSatifiesRandom = propSatisfies(isRandom)
  t.truthy(propSatifiesRandom(`z`, { z: rando }))
  t.falsy(propSatifiesRandom(`z`, { z: 100 }))
})

test(`propEq should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const input = { x: rando }
  t.truthy(propEq(`x`, rando, input))
  t.falsy(propEq(`x`, -1, input))
})

test(`propIs`, () => {
  t.truthy(propIs(Number, `x`, { x: 100 }))
  t.falsy(propIs(Number, `x`, { x: `x-ray` }))
})
test(`pathEq`, () => {
  const rando = floorMin(1, 1e5)
  const input = { a: { b: { c: { d: { e: rando } } } } }
  t.truthy(pathEq(`abcde`.split(``), rando, input))
  t.falsy(pathEq(`abcde`.split(``), -1, input))
})
