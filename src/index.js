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

const plugins = ['Notify', 'Cookies']

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
  conf.boot.push('~quasar-app-extension-twin-starter/src/boot/index.js')

  if (fs.existsSync(api.resolve.app('src/boot/i18n.js'))) {
    conf.boot.push('~quasar-app-extension-twin-starter/src/boot/vue-i18n.js')
  } else {
    conf.boot.push('~quasar-app-extension-twin-starter/src/boot/twin-i18n.js')
  }

  if (api.prompts.routerNested) {
    conf.boot.push('~quasar-app-extension-twin-starter/src/boot/router-nested.js')
  }

  conf.boot.push('~quasar-app-extension-twin-starter/src/boot/register-base-component.js')

  conf.boot.push('~quasar-app-extension-twin-starter/src/boot/validation-rules.js')

  conf.boot.push('~quasar-app-extension-twin-starter/src/boot/authentication.js')
}

function registerProcessEnv(conf, api) {
  conf.build.env[addPrefix('SPLASHSCREEN')] =  api.prompts.splashscreen
  conf.build.env[addPrefix('AUTH_SCHEME')] =  api.prompts.authScheme
  conf.build.env[addPrefix('API_LOGIN')] =  api.prompts.apiLogin || '/login'
  conf.build.env[addPrefix('API_LOGOUT')] =  api.prompts.apiLogout || '/logout'
  conf.build.env[addPrefix('API_LOAD_USER')] =  api.prompts.apiLoadUser || '/user'
  conf.build.env[addPrefix('API_REGISTER')] =  api.prompts.apiRegister || '/register'
  conf.build.env[addPrefix('API_RESET_PASSWORD')] =  api.prompts.apiResetPassword || '/password/reset'
  conf.build.env[addPrefix('API_FORGOT_PASSWORD')] =  api.prompts.apiForgotPassword || '/password/forgot'
  conf.build.env[addPrefix('API_EMAIL_VERIFIY_RESEND')] =  api.prompts.apiEmailVerifyResend || '/email/resend'
}

function addPrefix(name) {
  return 'TWIN_' + name;
}

const chainWebpack = (ctx, chain) => {
  chain.resolve.alias.set('twin-starter', path.resolve(__dirname, './'))
}

module.exports = function (api) {
  api.chainWebpack((chain) => chainWebpack(api.ctx, chain))

  api.extendQuasarConf(extendConf)
}
