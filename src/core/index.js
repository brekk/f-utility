import * as NATIVE from "./native"

import F from "./F"
import T from "./T"
import adjust from "./adjust"
import append from "./append"
import box from "./box"
import call from "./call"
import complement from "./complement"
import constant from "./constant"
import dec from "./dec"
import first from "./first"
import fromPairs from "./fromPairs"
import identity from "./identity"
import inc from "./inc"
import jam from "./jam"
import last from "./last"
import length from "./length"
import mash from "./mash"
import mode from "./mode"
import mean from "./mean"
import not from "./not"
import pipe from "./pipe"
import prepend from "./prepend"
import reverse from "./reverse"
import smash from "./smash"
import smooth from "./smooth"
import temper from "./temper"
import toLower from "./toLower"
import toPairs from "./toPairs"
import toUpper from "./toUpper"
import update from "./update"

export const CORE = temper(NATIVE, {
  F,
  T,
  adjust,
  append,
  box,
  call,
  complement,
  constant,
  dec,
  first,
  fromPairs,
  identity,
  inc,
  jam,
  last,
  length,
  mash,
  mean,
  mode,
  not,
  pipe,
  prepend,
  reverse,
  smash,
  smooth,
  temper,
  toLower,
  toPairs,
  toUpper,
  update
})
export default CORE
