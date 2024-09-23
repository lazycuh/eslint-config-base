// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';
import importNewlines from 'eslint-plugin-import-newlines';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';

import { rules } from './rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default tsEslint.config(
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
