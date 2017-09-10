const pkg = require('./package.json')
module.exports = function configureWallaby(wallaby) {
  return {
    name: pkg.name,
    files: [
      `src/**/*.js`,
      `!src/**/*.spec.js`,
      `src/*.js`,
      `!src/*.spec.js`
    ],

    tests: [
      `tests/**/*.spec.js`,
      `tests/*.spec.js`
    ],

    env: {
      type: `node`,
      kind: `electron`
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: `jest`,

    setup: function setupWallaby() {
      require(`babel-polyfill`)
    },

    debug: true,
    filesWithNoCoverageCalculated: [
      `src/core/fs.js`
    ]
  }
}
