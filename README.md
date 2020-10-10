Quasar App Extension twin-starter
===

This README is being prepared...

# Install
```bash
quasar ext add twin-starter
```
Quasar CLI will retrieve it from the NPM registry and install the extension to your project.

## Prompts

> Explain the prompts here

## Eslint
Add to quasar.config.js

```js
options: {
  fix: true,
  formatter: require('eslint').CLIEngine.getFormatter('stylish')
}
```

# Uninstall
```bash
quasar ext remove twin-starter
```
