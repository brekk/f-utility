const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps

const GERMS = germs.build(pkg.name, {
  readme: `documentation readme -s API src/*.js`,
  prepublishOnly: `nps care`,
  bundle: {
    description: `generate bundles`,
    script: allNPS(`bundle.commonjs`, `bundle.es6`, `bundle.browser`),
    commonjs: {
      description: `run the commonjs bundle task`,
      script: `rollup -c rollup/config.commonjs.js`
    },
    es6: {
      description: `run the es6 bundle task`,
      script: `rollup -c rollup/config.es6.js`
    },
    browser: {
      description: `run the browser bundle task`,
      script: `rollup -c rollup/config.browser.js`
    }
  }
})

GERMS.scripts.lint.jsdoc = `documentation lint`

module.exports = GERMS
