import {curry} from 'katsu-curry'
const {keys: _keys, freeze: _freeze, assign: _assign} = Object
export const keys = _keys
export const freeze = _freeze
export const assign = _assign
export const merge = curry((a, b) => assign({}, a, b))
