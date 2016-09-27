import fs from 'fs'
import flow from 'lodash/fp/flow'

/**
 * @namespace util.fs
 * @function readFile
 * @param {string} file - file path
 * @return {string} file contents
 */
export const readFile = (file) => fs.readFileSync(file, `utf8`)

/**
 * @namespace util.fs
 * @function json
 * @borrows readFile
 * @param {string} file - file path
 * @param {string} json
 */
export const json = flow(
  readFile,
  JSON.parse
)
