const { useGatsbyNode } = require('gatsby-plugin-ts-config')

module.exports = useGatsbyNode(() => require('./gatsby/gatsby-node'), {})
