/**
 * Quasar App Extension prompts script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/prompts-api
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
*/
const routeApi = require('./utils/api.default.json')

module.exports = function () {
  return [
    {
      name: 'useModules',
      type: 'confirm',
      message: 'Use folder-by-type (Modules) to project structure',
      default: true
    },

    {
      name: 'baseUrl',
      type: 'input',
      required: true,
      message: 'URL of API server (This will be saved in your .env and .env.prod, and you can change them any time)',
      default: 'http://localhost/api'
    },

    {
      name: 'changeRoutesApi',
      type: 'list',
      message: 'Do you wish to change the api authentication URLs (login, reset etc...)?',
      choices: [
        {
          name: 'No, use the default',
          value: 'no',
          short: 'No'
        },
        {
          name: 'Yes, i will inform each url route',
          value: 'yes',
          short: 'Yes'
        }
      ],
      default: 'no'
    },

    {
      name: 'apiLogin',
      type: 'input',
      required: true,
      message: 'Route for user login',
      default: routeApi.apiLogin,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiLogout',
      type: 'input',
      required: true,
      message: 'Route for user logout',
      default: routeApi.apiLogout,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiLoadUser',
      type: 'input',
      required: true,
      message: 'Route to load authenticated user info',
      default: routeApi.apiLoadUser,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiRegister',
      type: 'input',
      required: true,
      message: 'Route for user register',
      default: routeApi.apiRegister,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiResetPassword',
      type: 'input',
      required: true,
      message: 'Route to reset password',
      default: routeApi.apiResetPassword,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiForgotPassword',
      type: 'input',
      required: true,
      message: 'Route for user forgotten password request',
      default: routeApi.apiForgotPassword,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiEmailVerifyResend',
      type: 'input',
      required: true,
      message: 'Route for user resend verification email',
      default: routeApi.apiEmailVerifyResend,
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'mockApi',
      type: 'confirm',
      message: 'Do you want use mock data in the request to API? (default No)',
      default: false
    },

    {
      name: 'schemeSendToken',
      type: 'list',
      message: 'How do you want to do the api authorization?',
      choices: [
        {
          name: "Don't do anything, the API server will set the cookie with the token and use automatically (recommended)",
          value: 'nothing',
          short: "Don't do anything"
        },
        {
          name: "Set token in the cookie using httponly and secure",
          value: 'cookie',
          short: "Set token in the cookie"
        },
        {
          name: 'Set Authorization in the header of the requests',
          value: 'header',
          short: 'Set Header Authorization'
        },
      ],
      default: 'nothing'
    },

    {
      name: 'authScheme',
      type: 'list',
      message: 'Wich scheme of authorization do you want to use?',
      choices: [
        {
          name: "Bearer",
          value: 'Bearer',
          short: "Bearer"
        },
        {
          name: 'Basic',
          value: 'Basic',
          short: 'Basic'
        },
      ],
      when: (answers) => {
        return answers.schemeSendToken === 'header'
      },
      default: 'bearer'
    },

    {
      name: 'storageToken',
      type: 'list',
      message: 'Where do you want to storage the token?',
      choices: [
        {
          name: "Cookie",
          value: 'cookie',
          short: "Cookie"
        },
        {
          name: 'Local Storage',
          value: 'localStorage',
          short: 'Local Storage'
        },
      ],
      when: (answers) => {
        return answers.schemeSendToken === 'header'
      },
      default: 'cookie'
    },

    {
      name: 'cookieName',
      type: 'input',
      required: true,
      message: 'Name of the cookie to be sent to API in the request',
       when: (answers) => {
        return answers.schemeSendToken === 'cookie'
      },
      default: 'laravel_token'
    },

    {
      name: 'authIndetifierField',
      type: 'input',
      required: false,
      message: 'Field to identifier the login (email, username etc...)',
      default: 'username'
    },

    {
      name: 'routerNested',
      type: 'confirm',
      message: 'Do you want to include router nested feature? (default Yes)',
      default: true
    },

    {
      name: 'splashscreen',
      type: 'confirm',
      message: 'Do you want splashscreen before the app is load? (default Yes)',
      default: true
    }

  ]
}
