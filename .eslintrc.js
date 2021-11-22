module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: ['eslint-plugin-react'],
  extends: [
    'eslint-config-next',
    'eslint-config-next/core-web-vitals',
    'plugin:eslint-plugin-react/recommended',
    'eslint-config-airbnb',
    'eslint-config-airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/function-component-definition': [2, {
      namedComponents: 'function-declaration',
      unnamedComponents: 'function-expression',
    }],
    /* Off */
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-danger': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-exports': 'off',

    /* Warn */
    '@next/next/no-img-element': 'warn',
    'react/prop-types': 'warn',

    /* Error */
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
