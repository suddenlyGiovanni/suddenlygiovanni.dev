// @ts-check

/**
 * @type { import('@commitlint/types/lib/load.d.ts').UserConfig }
 */
const Config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['workspace', 'open-graph-protocol', 'open-graph-protocol-react', 'open-graph-protocol-utils'],
    ],
    'scope-case': [1, 'always', 'kebab-case'],
    'scope-empty': [1, 'never'],
  },
}

module.exports = Config
