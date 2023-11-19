# eslint-config-base [![](https://circleci.com/gh/babybeet/eslint-config-base.svg?style=svg&logo=appveyor)](https://app.circleci.com/pipelines/github/babybeet/eslint-config-base?branch=main)

Base ESLint rules that work well for any Typescript projects.

## Installation

- `npm`
  ```
  npm i -S @babybeet/eslint-config-base
  ```
- `pnpm`
  ```
  pnpm i -S @babybeet/eslint-config-base
  ```
- `yarn`

  ```
  yarn add @babybeet/eslint-config-base
  ```

## Setting up

In your `.eslintrc.json` file, add the followings:

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
      "extends": ["@babybeet/eslint-config-base"],
      "rules": {
        // Add your own rule overrides if desired.
      }
    }
  ]
}
```
