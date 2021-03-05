module.exports = {
  env: {
    commonjs: true,
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    test: true,
    expect: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
}
