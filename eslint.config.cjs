const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const eslintPluginImport = require('eslint-plugin-import');
const eslintJs = require('@eslint/js');
const globals = require('globals');
const importNewlines = require('eslint-plugin-import-newlines');
const js = require('@eslint/js');
const jsdoc = require('eslint-plugin-jsdoc');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const sortKeysFix = require('eslint-plugin-sort-keys-fix');
const stylistic = require('@stylistic/eslint-plugin');
const tsEslint = require('typescript-eslint');
const tsParser = require('@typescript-eslint/parser');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImports = require('eslint-plugin-unused-imports');

const { rules } = require('./rules');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = tsEslint.config(
  { ignores: ['**/node_modules/', 'dist/*', 'build/*', '**/*.css', '**/*.scss', '**/./', '*.mjs'] },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },

  eslintJs.configs.recommended,

  ...tsEslint.configs.strictTypeChecked,

  ...tsEslint.configs.stylisticTypeChecked,

  ...fixupConfigRules(compat.extends('plugin:import/typescript', 'plugin:typescript-sort-keys/recommended')).map(
    config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx']
    })
  ),

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        JSX: 'readonly',
        process: 'readonly',
        ValueOf: 'readonly',
        globalThis: 'writable'
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parser: tsParser,

      parserOptions: {
        createDefaultProgram: true,
        project: ['**/tsconfig.json', '**/tsconfig.lint.json']
      }
    }
  },

  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslintEslintPlugin,
      'import-newlines': importNewlines,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'unused-imports': unusedImports,
      import: fixupPluginRules(eslintPluginImport),
      jsdoc
    },

    rules
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  }
);
