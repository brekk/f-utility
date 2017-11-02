const germs = require(`germs`)
const pkg = require(`./package.json`)
// const utils = require(`nps-utils`)
// const allNPS = utils.concurrent.nps

const GERMS = germs.build(pkg.name, {
  readme: `documentation readme -s API src/*.js`,
  prepublishOnly: `nps care`
})

GERMS.scripts.lint.jsdoc = `documentation lint`

module.exports = GERMS
