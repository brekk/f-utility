import * as NATIVE from "./native"
import { FUNCTION as box, SIGNATURE as 𝒮box } from "./box"
import { FUNCTION as complement, SIGNATURE as 𝒮complement } from "./complement"
import { FUNCTION as constant, SIGNATURE as 𝒮constant } from "./constant"
import { FUNCTION as F, SIGNATURE as 𝒮F } from "./F"
import { FUNCTION as first, SIGNATURE as 𝒮first } from "./first"
import { FUNCTION as fromPairs, SIGNATURE as 𝒮fromPairs } from "./fromPairs"
import { FUNCTION as identity, SIGNATURE as 𝒮identity } from "./identity"
import { FUNCTION as last, SIGNATURE as 𝒮last } from "./last"
import { FUNCTION as length, SIGNATURE as 𝒮length } from "./length"
import { FUNCTION as not, SIGNATURE as 𝒮not } from "./not"
import { FUNCTION as pipe, SIGNATURE as 𝒮pipe } from "./pipe"
import { FUNCTION as smooth, SIGNATURE as 𝒮smooth } from "./smooth"
import { FUNCTION as T, SIGNATURE as 𝒮T } from "./T"
import { FUNCTION as toLower, SIGNATURE as 𝒮toLower } from "./toLower"
import { FUNCTION as toPairs, SIGNATURE as 𝒮toPairs } from "./toPairs"
import { FUNCTION as toUpper, SIGNATURE as 𝒮toUpper } from "./toUpper"

export const CORE = NATIVE.temper(NATIVE, {
  box,
  complement,
  identity,
  constant,
  F,
  first,
  fromPairs,
  last,
  length,
  not,
  pipe,
  smooth,
  T,
  toLower,
  toPairs,
  toUpper
})
export default CORE
