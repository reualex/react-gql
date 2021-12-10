module.exports = {
  ignorePatterns: ['__generated__'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    cy: 'readonly',
    Cypress: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'react'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb/whitespace',
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'prettier/prettier': 'warn',

    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-undef': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-param-reassign': [
      'warn',
      { props: true, ignorePropertyModificationsForRegex: ['.*[Rr]ef'] },
    ],
    'no-use-before-define': 'off',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'any', prev: 'const', next: 'if' },
      { blankLine: 'never', prev: 'let', next: 'if' },
      { blankLine: 'always', prev: 'block-like', next: 'case' },
      { blankLine: 'always', prev: 'expression', next: 'case' },
      { blankLine: 'always', prev: 'return', next: 'case' },
      { blankLine: 'any', prev: 'case', next: 'case' },
      { blankLine: 'never', prev: 'singleline-const', next: 'singleline-const' },
    ],
    'prefer-const': ['error', { destructuring: 'all' }],
    'id-denylist': ['warn', 'COMPONENT_SCHEMAS'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'import/newline-after-import': 'warn',
    'import/namespace': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '_constants',
            group: 'internal',
          },
          {
            pattern: '_configs',
            group: 'internal',
          },
          {
            pattern: '_layers/**',
            group: 'internal',
          },
          {
            pattern: '_pages/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
