/* global test */
import {t} from 'germs'

import {propIs, propEq, pathIs, pathEq, prop, propOr, path, pathOr} from './path'
import {word} from './random-word'
import {floorMin} from './random-floor'
import {equals} from './math'

test(`prop should grab a property from an object or return null`, () => {
  const x = floorMin(1, 1e5)
  t.is(prop(`x`, {x}), x)
  const property = word(10)
  t.is(prop(property, {[property]: x}), x)
})

test(`propOr should grab a property from an object or return default`, () => {
  const x = floorMin(1, 1e5)
  const def = word(10)
  t.is(propOr(def, `x`, {x}), x)
  t.is(propOr(def, `x`, {y: x}), def)
})

test(`pathOr should grab a nested property from an object or return default`, () => {
  const z = floorMin(1, 1e5)
  const def = word(10)
  t.is(pathOr(def, `xyz`.split(``), {x: {y: {z}}}), z)
  t.is(pathOr(def, `xyz`.split(``), {x: {y: {butts: z}}}), def)
})

test(`path should grab a nested property from an object or return null`, () => {
  const z = floorMin(1, 1e5)
  t.is(path(`xyz`.split(``), {x: {y: {z}}}), z)
  t.is(path(`xyz`.split(``), {x: {y: {butts: z}}}), null)
})

test(`pathIs should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const isRandom = equals(rando)
  const pathIsRandom = pathIs(isRandom)
  t.truthy(pathIsRandom(`xyz`.split(``), {x: {y: {z: rando}}}))
  t.falsy(pathIsRandom(`xyz`.split(``), {x: {y: {z: 100}}}))
})

test(`pathEq should grab a nested property from an object and then compare it with ===`, () => {
  const rando = floorMin(1, 1e5)
  const pathIsRandom = pathEq(rando)
  t.truthy(pathIsRandom(`xyz`.split(``), {x: {y: {z: rando}}}))
  t.falsy(pathIsRandom(`xyz`.split(``), {x: {y: {z: 100}}}))
})

test(`propIs should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const isRandom = equals(rando)
  const propIsRandom = propIs(isRandom)
  t.truthy(propIsRandom(`z`, {z: rando}))
  t.falsy(propIsRandom(`z`, {z: 100}))
})

test(`propEq should grab a nested property from an object and then compare it`, () => {
  const rando = floorMin(1, 1e5)
  const propIsRandom = propEq(rando)
  t.truthy(propIsRandom(`z`, {z: rando}))
  t.falsy(propIsRandom(`z`, {z: 100}))
})
