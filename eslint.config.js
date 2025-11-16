// eslint.config.js

const globals = {
  // Node.js
  require: 'readonly',
  module: 'readonly',
  __dirname: 'readonly',
  process: 'readonly',
  console: 'readonly',

  // Jest (tests)
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
};

module.exports = [
  {
    files: ['src/**/*.js', 'tests/**/*.js', 'scripts/**/*.js'],
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
