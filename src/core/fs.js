/* istanbul ignore next */
import fs from 'fs'
/* istanbul ignore next */
import flow from 'lodash/fp/flow'

/**
 * @namespace util.fs
 * @function readFile
 * @param {string} file - file path
 * @return {string} file contents
 */
/* istanbul ignore next */
export const readFile = (file) => fs.readFileSync(file, `utf8`)

/**
 * @namespace util.fs
 * @function json
 * @borrows readFile
 * @param {string} file - file path
 * @param {string} json
 */
/* istanbul ignore next */
export const json = flow(
  readFile,
  JSON.parse
)
