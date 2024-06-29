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

    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like'
        },
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        }
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple'
        }
      ],
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            Object: {
              message: 'Avoid using the `Object` type. Did you mean `object`?'
            },
            Function: {
              message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
            },
            Boolean: {
              message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
            },
            Number: {
              message: 'Avoid using the `Number` type. Did you mean `number`?'
            },
            String: {
              message: 'Avoid using the `String` type. Did you mean `string`?'
            },
            Symbol: {
              message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
            }
          }
        }
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit'
        }
      ],
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['PascalCase', 'camelCase']
        },
        {
          selector: 'class',
          format: ['PascalCase']
        },
        {
          selector: ['classProperty'],
          format: ['UPPER_CASE'],
          leadingUnderscore: 'require',
          trailingUnderscore: 'require',
          modifiers: ['private', 'readonly', 'static']
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false
          }
        },
        {
          selector: ['classProperty', 'classMethod', 'parameterProperty'],
          modifiers: ['private'],
          leadingUnderscore: 'require',
          format: ['camelCase']
        }
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['constructors']
        }
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          fixToUnknown: true
        }
      ],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true
        }
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false
        }
      ],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/quotes': ['error', 'single'],
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always'
        }
      ],
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      'arrow-parens': ['off', 'always'],
      'brace-style': ['error', '1tbs'],
      camelcase: 'error',
      'comma-dangle': ['error', 'never'],
      complexity: 'error',
      'constructor-super': 'error',
      curly: ['error', 'all'],
      'consistent-return': 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-denylist': 'off',
      'import/newline-after-import': [
        'error',
        {
          considerComments: true
        }
      ],
      'import-newlines/enforce': [
        'error',
        {
          items: 1024,
          'max-len': 120
        }
      ],
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx', '**/test/**/*.*']
        }
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^express', '@common', '^firebase-admin']
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type']
        }
      ],
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'off',
      'jsdoc/newline-after-description': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/tag-lines': [
        'error',
        'any',
        {
          startLines: 1
        }
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true
        }
      ],
      'max-classes-per-file': 'off',
      'max-len': [
        'error',
        {
          code: 120
        }
      ],
      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': [
        'error',
        {
          allow: ['error', 'info', 'warn']
        }
      ],
      'no-cond-assign': 'error',
      'no-invalid-this': 'error',
      'no-multiple-empty-lines': 'error',
      'no-debugger': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-new-wrappers': 'error',
      'no-restricted-imports': ['error', 'rxjs/Rx'],
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'error',
      'no-useless-return': 'error',
      'no-undef': 'off',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^__.*?__$',
          varsIgnorePattern: '^__.*?__$'
        }
      ],
      'no-use-before-define': 'off',
      'no-useless-rename': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'quote-props': ['error', 'as-needed'],
      radix: 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^(@common)'],
            ['^test'],
            ['^\\.\\.'],
            ['^\\.'],
            ['^.+\\.?(s?css)$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      'sort-keys-fix/sort-keys-fix': 'warn',
      'sort-imports': 'off',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/']
        }
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          asyncArrow: 'always',
          named: 'never'
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error'
    }
  }
);
