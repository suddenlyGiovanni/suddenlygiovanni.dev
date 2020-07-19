// gatsby-config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const { generateConfig } = require('gatsby-plugin-ts-config')

module.exports = generateConfig({
  configDir: '.gatsby',
  projectRoot: __dirname, // <- not required.  If omitted, projectRoot will be process.cwd()
})
