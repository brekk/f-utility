import fastMap from 'fast.js/map'
import {flip} from './flip'

/**
 * iterable.map(fn) but curried and fast
 * @method map
 * @param {function} transform
 * @param {Array} iterable
 * @returns {Array} mapped iterable
 * @public
 */
export const map = flip(fastMap)
