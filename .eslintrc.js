module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  globals: {
    JSX: true,
    browser: true,
    cy: true, // for cypress test
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/resolver": {
      "typescript": {} // This tells ESLint to use the TypeScript resolver
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'react', 'import', 'react-hooks'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_' }],
    'import/no-named-as-default': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/no-unresolved': ['error'],
    'import/export': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    curly: ['error', 'all'],
  },
};
