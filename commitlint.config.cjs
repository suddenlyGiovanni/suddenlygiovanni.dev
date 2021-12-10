/**
 * @type {import('@commitlint/types/lib/load').UserConfig}
 */
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-enum': [2, 'always', ['workspace', 'open-graph-protocol', 'open-graph-protocol-react', 'utils']],
    'scope-case': [1, 'always', 'kebab-case'],
    'scope-empty': [1, 'never']
  }

}
