
/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

const { log } = require('./utils/logger')

const helper = require('./utils/files')

const routeApi = require('./utils/api.default.json')

module.exports = async function (api) {
  api.compatibleWith('quasar', '^1.8.5')

  api.compatibleWith('@quasar/app', '^1.0.0  || >= 2')

  api.render('./templates/default', {
    prompts: { ...routeApi, ...api.prompts }
  })

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
