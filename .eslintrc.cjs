module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'sort-imports': ['error', {
      ignoreDeclarationSort: true
    }],
    'import/order': ['error', {
      alphabetize: {
        order: 'asc'
      }
    }]
  }
}
