
/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

const { log } = require('./utils/logger')

const helper = require('./utils/files')

const routeApi = require('./utils/api.default.json')

function renderModules (api) {
  const useModules = api.prompts.useModules

  const modules = [
    'Auth/layouts/AuthLayout.vue',
    'Auth/pages/LoginPage.vue',
    'Auth/pages/RegisterPage.vue',
    'Auth/pages/ForgotPasswordPage.vue',
    'Auth/pages/ResetPasswordPage.vue',
    'Auth/store/actions.js',
    'Auth/store/getters.js',
    'Auth/store/mutations.js',
    'Auth/store/state.js',
    'Auth/store/index.js'
  ]

  modules.forEach( file => {
    api.renderFile('./templates/modules/' + file, 'src/' + addPrefixToPath(file, useModules), { prompts: api.prompts })
  })

  if (useModules) {
    api.renderFile('./templates/modules/boot/modules.js', 'src/boot/modules.js', { prompts: api.prompts })
    api.renderFile('./templates/modules/Auth/router/index.js', 'src/modules/Auth/router/index.js', { prompts: api.prompts })
  }
  
}

function addPrefixToPath (value, modules) {
  if (modules) {
    return 'modules/' + value
  } else {
    let x = value.split('/', 3)
    if (x[1] === 'layouts') {
      return x[1] + '/' + x[2]
    } else {
      return x[1] + '/' + x[0] + '/' + x[2]
    }
    
  }
}

module.exports = async function (api) {
  api.compatibleWith('quasar', '^1.8.5')

  api.compatibleWith('@quasar/app', '^1.0.0  || >= 2')

  api.render('./templates/default', {
    prompts: { ...routeApi, ...api.prompts }
  })

  renderModules(api)

  if (api.prompts.splashscreen) {
    api.renderFile('./templates/App.vue', 'src/App.vue', {
      prompts: api.prompts
    })
  }

  var file = null

  file = helper.renderIfNotExist(api, 'css/app.sass', /app\./)

  if (file) {
    helper.appendTemplateToFile(api, 'css/' + file)
  } else {
    log('File app.sass was created in src/css. Make sura that this file was added to the file quasar.conf.js inside the css array.')
  }

  file = helper.renderIfNotExist(api, 'css/quasar.variables.sass', /quasar\.variables\./)

  if (file) {
    helper.appendTemplateToFile(api, 'css/' + file)
  } else {
    log('File quasar.variables.sass was created in src/css.')
  }
}
