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

module.exports = function () {
  return [
    {
      name: 'baseUrl',
      type: 'input',
      required: true,
      message: 'URL of API server (This will be saved in your .env and .env.prod, and you can change them any time)',
      default: 'http://localhost/api'
    },

    {
      name: 'apiClientId',
      type: 'input',
      required: false,
      message: 'API Client ID to login (This will be saved in your .env and .env.prod, and you can change them any time)',
      default: ''
    },

    {
      name: 'apiClientSecret',
      type: 'input',
      required: false,
      message: 'API Client Secret to login (This will be saved in your .env and .env.prod, and you can change them any time)',
      default: ''
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
      default: '/login',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiLogout',
      type: 'input',
      required: true,
      message: 'Route for user logout',
      default: '/logout',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiLoadUser',
      type: 'input',
      required: true,
      message: 'Route to load authenticated user info',
      default: '/user',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiRegister',
      type: 'input',
      required: true,
      message: 'Route for user register',
      default: '/register',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiResetPassword',
      type: 'input',
      required: true,
      message: 'Route to reset password',
      default: '/auth/password/reset',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiForgotPassword',
      type: 'input',
      required: true,
      message: 'Route for user forgotten password request',
      default: '/auth/password/forgot',
      when: (answers) => {
        return answers.changeRoutesApi === 'yes'
      }
    },

    {
      name: 'apiEmailVerifyResend',
      type: 'input',
      required: true,
      message: 'Route for user resend verification email',
      default: '/auth/email/resend',
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
      name: 'authScheme',
      type: 'list',
      message: 'Wich scheme of authentication do you want to use?',
      choices: [
        {
          name: "Don't do anything, the API server will save the token in the cookie and use automatically (recommended)",
          value: 'nothing',
          short: "Don't do anything"
        },
        {
          name: 'Bearer, save and get the token from cookie',
          value: 'Bearer',
          short: 'Bearer'
        },
        {
          name: 'Basic, save and get the token from cookie',
          value: 'Basic',
          short: 'Basic'
        }
      ],
      default: 'nothing'
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
    },

  ]
}
