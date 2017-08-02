import test from 'ava'

import {prop, propOr, path, pathOr} from './path'
import {word} from './random-word'
import {floorMin} from './random-floor'

test(`prop should grab a property from an object or return null`, (t) => {
  const x = floorMin(1, 1e5)
  t.is(prop(`x`, {x}), x)
  const property = word(10)
  t.is(prop(property, {[property]: x}), x)
})

test(`propOr should grab a property from an object or return default`, (t) => {
  const x = floorMin(1, 1e5)
  const def = word(10)
  t.is(propOr(def, `x`, {x}), x)
  t.is(propOr(def, `x`, {y: x}), def)
})

test(`pathOr should grab a nested property from an object or return default`, (t) => {
  const z = floorMin(1, 1e5)
  const def = word(10)
  t.is(pathOr(def, `xyz`.split(``), {x: {y: {z}}}), z)
  t.is(pathOr(def, `xyz`.split(``), {x: {y: {butts: z}}}), def)
})

test(`path should grab a nested property from an object or return null`, (t) => {
  const z = floorMin(1, 1e5)
  t.is(path(`xyz`.split(``), {x: {y: {z}}}), z)
  t.is(path(`xyz`.split(``), {x: {y: {butts: z}}}), null)
})
