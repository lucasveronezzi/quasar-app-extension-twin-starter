/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const fs = require('fs')

const path = require('path')

const { log, fatal } = require('./utils/logger')

const routeApi = require('./utils/api.default.json')

const plugins = ['Notify', 'Cookies', 'Loading']

function extendConf (conf, api) {
  if (!fs.existsSync(api.resolve.app('src/components/base'))) {
    fatal('Error. Unable to locate the directory \'src/components/base\' to register the components base.\n')
  }

  registerBootFiles(conf, api)

  registerProcessEnv(conf, api)

  // make sure boot & component files get transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-twin-starter[\\/]src/)

  plugins.forEach(plugin => {
    if (!conf.framework.plugins.includes(plugin)) {
      conf.framework.plugins.push(plugin)
      log(`Adding plugin ${plugin} to your quasar.conf.js`)
    }
  })

  conf.preFetch = true

  log('Adding twin-starter boot file to your quasar.conf.js')
}

function registerBootFiles (conf, api) {
  conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/index.js')

  if (fs.existsSync(api.resolve.app('src/boot/i18n.js'))) {
    conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/vue-i18n.js')
  } else {
    conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/twin-i18n.js')
  }

  if (api.prompts.routerNested) {
    conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/router-nested.js')
  }

  conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/register-base-component.js')

  conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/validation-rules.js')

  conf.boot.push('~@lucasveronezzi/quasar-app-extension-twin-starter/src/boot/authentication.js')
}

function registerProcessEnv (conf, api) {
  let prompts = { ...routeApi, ...api.prompts }

  let dotEnv = require('@lucasveronezzi/load-dotenv')

  conf.build.env = { ...dotEnv }

  conf.build.env[addPrefix('USE_MODULES')] = prompts.useModules

  conf.build.env[addPrefix('SPLASHSCREEN')] = prompts.splashscreen
  conf.build.env[addPrefix('AUTH_SCHEME_SEND_TOKEN')] = prompts.schemeSendToken
  conf.build.env[addPrefix('AUTH_SCHEME')] = prompts.authScheme
  conf.build.env[addPrefix('AUTH_STORAGE_TOKEN')] = prompts.storageToken
  conf.build.env[addPrefix('AUTH_COOKIE_NAME')] = prompts.cookieName
  conf.build.env[addPrefix('API_LOGIN')] = prompts.apiLogin
  conf.build.env[addPrefix('API_LOGOUT')] = prompts.apiLogout
  conf.build.env[addPrefix('API_LOAD_USER')] = prompts.apiLoadUser
  conf.build.env[addPrefix('API_REGISTER')] = prompts.apiRegister
  conf.build.env[addPrefix('API_RESET_PASSWORD')] = prompts.apiResetPassword
  conf.build.env[addPrefix('API_FORGOT_PASSWORD')] = prompts.apiForgotPassword
  conf.build.env[addPrefix('API_EMAIL_VERIFIY_RESEND')] = prompts.apiEmailVerifyResend
}

function addPrefix (name) {
  return 'TWIN_' + name
}

const chainWebpack = (api, chain) => {
  chain.resolve.alias.set('twin-starter', path.resolve(__dirname, './'))
  if (api.prompts.useModules) {
    chain.resolve.alias.set('modules', api.resolve.src('modules'))
  }
}

module.exports = function (api) {
  api.chainWebpack((chain) => chainWebpack(api, chain))

  api.extendQuasarConf(extendConf)
}
