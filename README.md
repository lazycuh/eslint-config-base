# eslint-config-base [![](https://circleci.com/gh/lazycuh/eslint-config-base.svg?style=svg&logo=appveyor)](https://app.circleci.com/pipelines/github/lazycuh/eslint-config-base?branch=main)

Base ESLint rules that work well for any Typescript projects.

## ESLint compatibility

| This library | ESLint |
| ------------ | ------ |
| 2.x.x        | ^9     |
| 1.x.x        | ^8     |

## Installation

- `npm`
  ```
  npm i -S @lazycuh/eslint-config-base
  ```
- `pnpm`
  ```
  pnpm i -S @lazycuh/eslint-config-base
  ```
- `yarn`

  ```
  yarn add @lazycuh/eslint-config-base
  ```

## Setting up

### ESLint 9

`eslint.config.js` file

```js
const eslintConfigBase = require('@lazycuh/eslint-config-base');

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  ...eslintConfigBase.map(config => ({
    ...config,

    files: ['src/**/*.ts'], // Only lint Typescript files under `src` directory.

    rules: {
      ...config.rules
      // Your rule overrides go here
    }
  }))
];
```

_If your `package.json` file has `"type": "module"`, you can change the above `require` and `module.exports` to `import` and `export default` respectively_.

### ESLint 8

`.eslintrc.json` file

```json
{
  "$schema": "https://json.schemastore.org/eslintrc.json",
  "root": true,
  "ignorePatterns": ["!**/*"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  // It's recommended to use an override to not globally change your ESLint configuration.
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": ["@lazycuh/eslint-config-base"],
      "rules": {
        // Add your own rule overrides if desired.
      }
    }
  ]
}
```
