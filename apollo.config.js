module.exports = {
  client: {
    name: 'suddenlygiovanni',
    tagName: 'graphql',
    includes: ['./src/**/*.{ts,tsx}'],
    service: {
      name: 'GatsbyJS',
      url: 'http://localhost:8000/___graphql',
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
}
