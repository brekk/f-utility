import * as NATIVE from "./native"

import F from "./F"
import T from "./T"
import adjust from "./adjust"
import append from "./append"
import assoc from "./assoc"
import box from "./box"
import call from "./call"
import complement from "./complement"
import compose from "./compose"
import constant from "./constant"
import dec from "./dec"
import dissoc from "./dissoc"
import drop from "./drop"
import dropLast from "./dropLast"
import empty from "./empty"
import first from "./first"
import fromPairs from "./fromPairs"
import identity from "./identity"
import inc from "./inc"
import init from "./init"
import invert from "./invert"
import invertObj from "./invertObj"
import jam from "./jam"
import juxt from "./juxt"
import keysIn from "./keysIn"
import last from "./last"
import length from "./length"
import mash from "./mash"
import mean from "./mean"
import mode from "./mode"
import move from "./move"
import negate from "./negate"
import not from "./not"
import nthArg from "./nthArg"
import objOf from "./objOf"
import once from "./once"
import pair from "./pair"
import partial from "./partial"
import partialRight from "./partialRight"
import pipe from "./pipe"
import prepend from "./prepend"
import repeat from "./repeat"
import reverse from "./reverse"
import smash from "./smash"
import splitAt from "./splitAt"
import product from "./product"
import sum from "./sum"
import tail from "./tail"
import take from "./take"
import takeLast from "./takeLast"
import weld from "./weld"
import regexTest from "./regexTest"
import toLower from "./toLower"
import toPairs from "./toPairs"
import toUpper from "./toUpper"
import update from "./update"

export const CORE = weld(NATIVE, {
  F,
  T,
  adjust,
  append,
  assoc,
  box,
  call,
  complement,
  compose,
  constant,
  dec,
  dissoc,
  drop,
  dropLast,
  empty,
  first,
  fromPairs,
  identity,
  inc,
  init,
  invert,
  invertObj,
  jam,
  juxt,
  keysIn,
  last,
  length,
  mash,
  mean,
  mode,
  move,
  negate,
  not,
  nthArg,
  objOf,
  once,
  pair,
  partial,
  partialRight,
  pipe,
  prepend,
  repeat,
  reverse,
  smash,
  splitAt,
  sum,
  product,
  tail,
  take,
  takeLast,
  weld,
  test: regexTest,
  toLower,
  toPairs,
  toUpper,
  update
})
export default CORE
